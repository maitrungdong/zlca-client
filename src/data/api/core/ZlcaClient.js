import AxiosEngine from './AxiosEngine.js'

const API_BASE_URL = 'http://localhost:8080'
const DEFAULT_OPTIONS = {
  apiHost: `${API_BASE_URL}`,
}

class ZlcaClient {
  options = null
  engine = null
  isOnline = null

  pendingRequests = []

  constructor(options = {}) {
    this.isOnline = true
    this.options = { ...DEFAULT_OPTIONS, ...options }
    this.engine = new AxiosEngine()

    this.post = this._generateRestMethod('post').bind(this)
    this.get = this._generateRestMethod('get').bind(this)
    this.put = this._generateRestMethod('put').bind(this)
    this.delete = this._generateRestMethod('delete').bind(this)
  }

  _isAbsoluteURL(url) {
    const http = /^https?:\/\//i
    const https = /^https?:\/\/|^\/\//i

    return http.test(url) || https.test(url)
  }

  _getAPIUrl(route, query) {
    //TODO: check if route is absolute url
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

  _generateRestMethod(method) {
    return (route, init, rtOptions) => {
      const query = init && init.query
      const body = init && init.body
      const signal = init && init.signal

      //TODO: add request to array
      this.pendingRequests.push({
        route,
        init,
        rtOptions,
      })

      console.log('Pending requests: ', this.pendingRequests)

      const response = this.engine.request(
        Object.assign(
          {
            url: this._getAPIUrl(route, query),
            method: method.toUpperCase(),
            signal,
          },
          !!(method !== 'get') && { data: body }
        ),
        !!rtOptions ? rtOptions : {}
      )

      console.log(response)

      return response
    }
  }
}

const zlcaClient = new ZlcaClient()
export default zlcaClient
