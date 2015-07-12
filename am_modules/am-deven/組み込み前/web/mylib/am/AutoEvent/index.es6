function mouseEvent(type, sx, sy, cx, cy) {
  var evt;
  var e = {
    bubbles: true,
    cancelable: (type != "mousemove"),
    view: window,
    detail: 0,
    screenX: sx,
    screenY: sy,
    clientX: cx,
    clientY: cy,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    relatedTarget: undefined
  };
  if (typeof( document.createEvent ) == "function") {
    evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(type,
      e.bubbles, e.cancelable, e.view, e.detail,
      e.screenX, e.screenY, e.clientX, e.clientY,
      e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
      e.button, document.body.parentNode);
  } else if (document.createEventObject) {
    evt = document.createEventObject();
    for (prop in e) {
    evt[prop] = e[prop];
  }
    evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
  }
  return evt;
}
function dispatchEvent (el, evt) {
  if (el.dispatchEvent) {
    el.dispatchEvent(evt);
  } else if (el.fireEvent) {
    el.fireEvent('on' + type, evt);
  }
  return evt;
}

class AutoEvent {
  later() { // 追加
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000)
    })
  }
  constructor(){
  }
  *contoller(){
    let i = -1
    while(this.funcs[++i]) {
      this.inner_funcs[i].push(() => this.gen.next())
      yield this.funcs[i]()
    }
  }
  register(){
    this.funcs = []
    this.inner_funcs = []
    this.gen = this.contoller()
    this.func_num = -1
    return this
  }
  // event群
  add_event(callback) {
    let func_num = this.func_num
    let inner_func =this.inner_funcs[func_num]
    inner_func.push(callback)
    return this
  }
  set_value(selector, value, iframe=null) {
    let dom = iframe? document.querySelector(iframe).contentDocument.querySelector(selector): document.querySelector(selector)
    return this.add_event(() => dom.value = value)
  }
  click(selector, iframe=null){
    let dom = iframe? document.querySelector(iframe).contentDocument.querySelector(selector): document.querySelector(selector)
    return this.add_event(() => dom.click())
  }
  click_xy(selector,x,y,iframe=null){
    let dom = iframe? document.querySelector(iframe).contentDocument.querySelector(selector): document.querySelector(selector)
    let evt = mouseEvent("click", 0, 0, x, y);
    return this.add_event(() => dispatchEvent(document.querySelector(selector), evt))

  }
  // async群
  wait_event(callback){
    this.funcs.push(callback)
    return this
  }
  wait(msec) {
    let func_num = ++this.func_num
    let inner_func = this.inner_funcs[func_num] = []
    let func = () => {
      for(let func of inner_func) func()
    }
    let testTimer = null
    return this.wait_event(() => setTimeout(func, msec))
  }
  wait_selector(selector, exists=true){
    let func_num = ++this.func_num
    let inner_func = this.inner_funcs[func_num] = []
    let func = () => {
      for(let func of inner_func) func()
    }
    let testTimer = null
    let stop_timer = ()=>{
      clearInterval(testTimer)
      func()
    }
    return this.wait_event(() => {
      testTimer=setInterval(function(){
        if(document.querySelector(selector)&&exists) stop_timer()
      }, 100);
    })
  }
}
