import axios from 'axios'
import store from '@/store'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const {
    statusText,
    status,
    request: {
      responseURL
    }
  } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
        'Content-Type': 'application/json',
        'Access-control-Expose-Header': 'Authorization',
        // 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTk2MjkxNTIwLCJleHAiOjE1OTY4OTYzMjB9.NoUaKyXIuBKsEXLWM_NaLHDNP-OophGJfGxXfMAEX3ZRXBg4aupRin-SdEh31OyKP_1aczzx2-fxFNbJJzK7Qw '
        'Authorization': localStorage.getItem('token')
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(response => {
      this.destroy(url)
      // console.log(response)
      let page = response.data.data
      let list = []
      let pageInfo = {}
      if (page != null) {
        pageInfo = {
          currentPage: page.current,
          size: page.size,
          pages: page.pages,
          total: page.total
        }
        list = page.records
        // 整合分页数据
        response = Object.assign(response.data, {
          pageInfo: pageInfo,
          list: list
        })
      } else {
        response = response.data
      }
      // console.log(response)

      return response
    }, error => {
      this.destroy(url)
      addErrorLog(error.response)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
