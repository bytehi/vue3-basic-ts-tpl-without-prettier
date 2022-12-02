import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface IRequestInterceptor<T> {
  beforeRequestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailInterceptor: (error: any) => any
  responseSuccessInterceptor: (result: T) => T
  responseFailInterceptor: (error: any) => any
}

interface IContentType {
  [key: string]: any
}

// Partial:Typescript 内置类型，将定义的类型注解全部变为可选的属性
type TRequestInterceptor<T = AxiosResponse> = Partial<IRequestInterceptor<T>>

interface IHttpRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 内容类型
  type?: 'json' | 'form' | 'formData'
  // 拦截器
  interceptors?: TRequestInterceptor<T>
}

interface IResponseData {
  success: boolean
  data: any
  code: number
  message: string | null
}

class Http {
  axios: AxiosInstance
  interceptors?: TRequestInterceptor

  // 请求类型
  contentType: IContentType = {
    json: 'application/json;charset=utf-8',
    form: 'application/x-www-form-urlencoded',
    formData: 'multipart/form-data',
  }

  constructor(config: IHttpRequestConfig) {
    const { interceptors, ...requestConfig } = config

    // 实例axios
    this.axios = axios.create(requestConfig)

    this.interceptors = interceptors

    // 注册单个实例拦截器
    this.axios.interceptors.request.use(
      this.interceptors?.beforeRequestInterceptor,
      this.interceptors?.requestFailInterceptor,
    )

    this.axios.interceptors.response.use(
      this.interceptors?.responseSuccessInterceptor,
      this.interceptors?.responseFailInterceptor,
    )

    // 注册全局拦截器
    this.axios.interceptors.request.use(
      this.beforeRequestInterceptor.bind(this),
      this.requestFailInterceptor.bind(this),
    )

    this.axios.interceptors.response.use(
      this.responseSuccessInterceptor.bind(this),
      this.responseFailInterceptor.bind(this),
    )
  }

  beforeRequestInterceptor(config) {
    // 添加token
    const token = this.getToken()
    if (token)
      config.headers.Authorization = token

    const transformRequest = (data: any, headers: { [x: string]: any }) => {
      const type = config.type || 'json'
      headers['Content-Type'] = this.contentType[type]

      if (!config.data)
        return config.data

      if (type === 'form') {
        data = new URLSearchParams(data)
      }
      else if (type === 'json') {
        data = JSON.stringify(data)
      }
      else if (type === 'formData') {
        data = new FormData()
        for (const k in data)
          data.append(k, data[k])
      }
      return data
    }

    const method = config.method.toUpperCase()
    // https://github.com/axios/axios (api: transformRequest)
    if (['PUT', 'POST', 'DELETE', 'PATCH'].includes(method))
      config.transformRequest = [transformRequest]

    return config
  }

  requestFailInterceptor(error) {
    return Promise.reject(error)
  }

  responseSuccessInterceptor(response: AxiosResponse): IResponseData {
    const res = response.data

    const { data } = res
    return {
      success: true,
      data,
      code: 1,
      message: 'success',
    }
  }

  responseFailInterceptor(error: any) {
    const { status } = error?.response
    // let msg = ''
    if (status < 200 || status >= 300) {
      // msg = this.handleStatusError(status)
    }

    if (!window.navigator.onLine) {
      // TODO: add toaster
      // msg = '网络连接失败'
    }
    return Promise.reject(error)
  }

  handleCodeError() {
  }

  handleStatusError(status: number) {
    let message = ''
    switch (status) {
      case 400:
        message = '请求错误(400)'
        break
      case 401:
        message = '未授权，请重新登录(401)'
        break
      case 403:
        message = '拒绝访问(403)'
        break
      case 404:
        message = '请求地址出错(404)'
        break
      case 408:
        message = '请求超时(408)'
        break
      case 500:
        message = '服务器错误(500)'
        break
      case 501:
        message = '服务未实现(501)'
        break
      case 502:
        message = '网络错误(502)'
        break
      case 503:
        message = '服务不可用(503)'
        break
      case 504:
        message = '网络超时(504)'
        break
      case 505:
        message = 'HTTP版本不受支持(505)'
        break
      default:
        message = `连接出错(${status})!`
    }
    return `${message}，请检查网络或联系管理员！`
  }

  getToken() {
    return window.localStorage.getItem('token') || ''
  }

  request(config: IHttpRequestConfig) {
    return new Promise((resolve, reject) => {
      this.axios.request(config).then((res): void => {
        if (config.interceptors?.responseSuccessInterceptor)
          res = config.interceptors.responseSuccessInterceptor(res)

        resolve(res)
      }).catch((err) => {
        if (config.interceptors?.responseFailInterceptor)
          err = config.interceptors.responseFailInterceptor(err)

        reject(err)
      })
    })
  }

  get(url: string, config?: IHttpRequestConfig) {
    return new Promise((resolve, reject) => {
      this.axios.get(url, config).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  post(url: string, data: any, config?: IHttpRequestConfig) {
    return new Promise((resolve, reject) => {
      this.axios.post(url, data, config).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  download() {}
}

const http = new Http({
  baseURL: '/api',
  timeout: 1200,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

const mockHttp = new Http({
  baseURL: '/mock',
  timeout: 1200,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

window.$http = http
window.$mockHttp = mockHttp

export { http, mockHttp }
