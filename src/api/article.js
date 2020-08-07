import axios from '@/libs/api.request'

export default {
  getListApi (params) {
    return axios.request({
      url: '/article/list',
      method: 'get',
      params: params

    })
  },
  getProject (params) {
    return axios.request({
      url: '/article/' + params,
      method: 'get'
    })
  },
  postSaveApi (params) {
    return axios.request({
      url: '/article/save',
      data: params,
      method: 'post'
    })
  },
  postDeleteApi (params) {
    return axios.request({
      url: '/article/delete',
      data: params,
      method: 'post'
    })
  }

}
