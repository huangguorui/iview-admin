import axios from '@/libs/api.request'

export default {
  getListApi (params) {
    return axios.request({
      url: '/admin/list',
      method: 'get',
      params: params

    })
  },

  postSaveApi (params) {
    return axios.request({
      url: '/admin/save',
      data: params,
      method: 'post'
    })
  },
  postDeleteApi (params) {
    return axios.request({
      url: '/admin/delete',
      data: params,
      method: 'post'
    })
  }

}
