import axios from '@/libs/api.request'

export default {
  postLoginApi (params) {
    return axios.request({
      url: '/admin',
      data: params,
      method: 'post'
    })
  },
  postLoginOutApi (params) {
    return axios.request({
      url: '/adminLogout',
      data: params,
      method: 'post'
    })
  }

}
