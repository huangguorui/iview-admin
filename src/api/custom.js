import axios from '@/libs/api.request'

export default {
  getListApi (params) {
    return axios.request({
      url: '/custom/list',
      method: 'get',
      params: params

    })
  },

  postSaveApi (params) {
    return axios.request({
      url: '/custom/save',
      data: params,
      method: 'post'
    })
  },
  postDeleteApi (params) {
    return axios.request({
      url: '/custom/delete',
      data: params,
      method: 'post'
    })
  }

}
