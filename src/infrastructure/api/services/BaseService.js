const { default: AxiosEngine } = require('../engine/AxiosEngine')

class BaseService {
  //Default options
  options = {
    apiHost: 'http://localhost:8080',
    getHeaders: () => ({}),
    getToken: () => '',
  }

  engine = null

  constructor(options) {
    this.options.apiHost = options.apiHost
    const { getHeaders, getToken } = options

    this.getToken = getToken || this.options['getToken']
    this.engine = new AxiosEngine({
      getHeaders: getHeaders || this.options['getHeaders'],
    })
  }

  generateRESTMethod = (method) => (route, init) => {
    const query = init && init.query
    const body = init && init.body
  }
}
