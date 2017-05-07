import Status from '../src/Status'
import '../src/test-list.tag'

window.riot = require('riot')

const generate = (testPatterns, opts = {}) => {
  Status.opts = opts
  return {
    list: window.riot.mount('test-list', {testPatterns})
  }
}

export default generate
