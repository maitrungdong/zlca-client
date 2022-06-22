import axiosEngine from './AxiosEngine.js'
import AbortablePendingRequest from './helpers/Types/AbortableRequestPromise.js'
import 'utils/networkStatus.js'
import interceptor from './helpers/interceptor.js'

const BASE_API_URL = 'http://localhost:8080'
/**
 * Prepare configs and set up default configs
 * Intercept requests before pass them to AxiosEngine
 */
class ZlcaClient {
  //Default retrySchema setting:
  _defaultRetrySchema = {
    maxRetries: 3,
    msBackoff: 200,

    //[ISSUE]: Tại sao mình cần phải retry lại các mã lỗi này...
    //(Mình chỉ retry khi nào network bị lỗi - cần retry để cho chắc chắn,
    //hoặc server bị nháy chập chờn, quá tải cần thử lại.)
    //Chứ nếu nó trả về một lỗi thực sự rồi thì retry để làm gì?
    //Ví dụ: nó trả 404 - not found, 400 - bad request,... thì request để làm gì?
    //Ngoài ra, nếu server đang bị sập thực sự thì khi mình cứ retry thì nó sẽ
    //làm cho sự cố trở nên trầm trọng hơn.
    errorCodes: [408, 500, 502, 503, 504], //Các mã lỗi cho cái retry schema này!
  }

  _requestOptions = {
    baseApiURL: `${BASE_API_URL}`,
    headers: {},
  }

  _engine = null
  _interceptor = null

  constructor(retrySchema = {}, requestOptions = {}) {
    this._configRequestOptions(requestOptions)
    this._configRetrySchema(retrySchema)

    this.post = this._generateRestMethod('post').bind(this)
    this.get = this._generateRestMethod('get').bind(this)
    this.put = this._generateRestMethod('put').bind(this)
    this.delete = this._generateRestMethod('delete').bind(this)
  }

  useInterceptor(interceptor) {
    if (typeof interceptor === 'object') {
      this._interceptor = interceptor
    }
  }

  useAxiosEngine(engine) {
    if (typeof engine === 'object') {
      this._engine = engine
    }
  }

  _configRequestOptions = (options = {}) => {
    if (typeof options.baseApiURL === 'string') {
      this._requestOptions.baseApiURL = options.baseApiURL
    }
    if (typeof options.headers === 'object') {
      this._requestOptions.headers = options.headers
    }
  }

  _configRetrySchema = (schema = {}) => {
    if (typeof schema.maxRetries === 'number') {
      this._defaultRetrySchema.maxRetries = schema.maxRetries
    }
    if (typeof schema.shouldRetry === 'boolean') {
      this._defaultRetrySchema.shouldRetry = schema.shouldRetry
    }
    if (typeof schema.msBackoff === 'number') {
      this._defaultRetrySchema.msBackoff = schema.msBackoff
    }
    if (Array.isArray(schema.retryableErrors)) {
      this._defaultRetrySchema.retryableErrors = [...schema.retryableErrors]
    }
  }

  _generateRestMethod(method) {
    return (route, requestInit) => {
      const query = requestInit?.query
      const body = requestInit?.body
      const isAbortable = requestInit?.isAbortable
      const headers = {
        ...this._requestOptions.headers,
        ...requestInit?.headers,
      }
      const shouldHold = requestInit?.shouldHold
      const waitNetworkTime = requestInit?.waitNetworkTime
      const retrySchms = requestInit?.retrySchemas

      const abortCtrl = isAbortable ? new AbortController() : null
      const url = this._getAPIUrl(route, query).toString()

      const request = Object.assign(
        {
          url: url,
          headers: headers,
          method: method.toUpperCase(),
        },
        isAbortable && { signal: abortCtrl.signal },
        method !== 'get' && { data: body }
      )

      //TODO: check if it's in blacklist.
      this._interceptor.interceptRequest(request)

      let retrySchemas = null
      if (retrySchms) {
        retrySchemas =
          retrySchms === 'default'
            ? { ...this._defaultRetrySchema }
            : [...retrySchms]
      }

      //TODO: Thêm một cái wrapper (đánh chặn cho thằng interceptor ở đây!)
      const response = this._engine.request(request, retrySchemas, {
        shouldHold,
        waitNetworkTime,
      })
      const pendingRequest = this._interceptor.interceptResponse(response)

      return new AbortablePendingRequest(pendingRequest, abortCtrl)
    }
  }

  _getAPIUrl(route, query) {
    //TODO: check if route is absolute url
    let url = null
    if (this._isAbsoluteURL(route)) {
      url = new URL(route)
    } else {
      url = new URL(this._requestOptions.baseApiURL)
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

  _isAbsoluteURL(url) {
    const http = /^https?:\/\//i
    const https = /^https?:\/\/|^\/\//i
    return http.test(url) || https.test(url)
  }
}

const zlcaClient = new ZlcaClient()
zlcaClient.useAxiosEngine(axiosEngine)
zlcaClient.useInterceptor(interceptor)

export default zlcaClient
