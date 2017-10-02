import Status from '../src/Status'
import '../src/test-list'

window.riot = require('riot')

export default (testPatterns, opts = {}) => {
  Status.opts = opts
  return {
    list: window.riot.mount('test-list', {testPatterns})
  }
}
