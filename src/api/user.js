import axios from '@/libs/api.request'

export default {
  getListApi (params) {
    return axios.request({
      url: '/user/list',
      method: 'get',
      params: params

    })
  },

  postSaveApi (params) {
    return axios.request({
      url: 'user/save',
      data: params,
      method: 'post'
    })
  },
  postDeleteApi (params) {
    return axios.request({
      url: 'user/delete',
      data: params,
      method: 'post'
    })
  }

}
