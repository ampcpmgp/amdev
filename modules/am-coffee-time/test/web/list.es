import 'am-coffee-time/browser/parse'
import Test from 'am-coffee-time/browser/Test'
import AutoEvent from 'am-autoevent'

class Actions {
  helpをクリック () {
    autoEvent.wait(600).click('test-list svg.question').exists('help section.show')
  }
  透過背景をクリック () {
    autoEvent.wait(1000).click('help section.background').notExists('help section.show')
  }
}

const autoEvent = new AutoEvent()
autoEvent.register()
Test.start(new Actions())
autoEvent.start()
