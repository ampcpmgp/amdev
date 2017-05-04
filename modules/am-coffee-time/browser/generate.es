import riot from 'riot'

import Status from '../src/Status'
import '../src/test-list.tag'

window.riot = riot

const generate = (testPatterns, opts = {}) => {
  Status.opts = opts
  return {
    list: riot.mount('test-list', {testPatterns})
  }
}

export default generate
