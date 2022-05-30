import AxiosEngine from './AxiosEngine'

const API_BASE_URL = 'http://localhost:8080'

const DEFAULT_OPTIONS = {
  apiHost: `${API_BASE_URL}`,
}

class ZlcaClient {
  options = null
  engine = null

  constructor(options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options }
    this.engine = new AxiosEngine()

    this.post = this.generateRestMethod('post').bind(this)
    this.get = this.generateRestMethod('get').bind(this)
    this.put = this.generateRestMethod('put').bind(this)
    this.delete = this.generateRestMethod('delete').bind(this)
  }

  _isAbsoluteURL(url) {
    const http = /^https?:\/\//i
    const https = /^https?:\/\/|^\/\//i
    if (http.test(url) || https.test(url)) {
      return true
    }
    return false
  }

  getAPIUrl(route, query) {
    //TODO: check route có phải là absolute url
    let url = null
    if (this._isAbsoluteURL(route)) {
      url = new URL(route)
    } else {
      url = new URL(this.options.apiHost)
      url.pathname = `${route}`
    }

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, value.toString())
        }
      })
    }

    return url
  }

  generateRestMethod(method) {
    return (route, init, rtOptions) => {
      const query = init && init.query
      const body = init && init.body
      const signal = init && init.signal
      console.log({ body })

      return this.engine.request(
        Object.assign(
          {
            url: this.getAPIUrl(route, query),
            method: method.toUpperCase(),
            signal,
          },
          !!(method !== 'get') && { data: body }
        ),
        !!rtOptions ? rtOptions : {}
      )
    }
  }
}

const zlcaClient = new ZlcaClient()
export default zlcaClient
