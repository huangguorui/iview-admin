import axios from '@/libs/api.request'

export default {
  getListApi (params) {
    return axios.request({
      url: '/link/list',
      method: 'get',
      params: params

    })
  },
  postSaveApi (params) {
    return axios.request({
      url: '/link/save',
      data: params,
      method: 'post'
    })
  },
  postDeleteApi (params) {
    return axios.request({
      url: '/link/delete',
      data: params,
      method: 'post'
    })
  }
}

// export const getListApi = () => {
//   return axios.request({
//     url: '/permission/list',
//     method: 'get'
//   })
// }
// export const postSaveApi = params => {
//   return axios.request({
//     url: 'user/save',
//     data: params,
//     method: 'post'
//   })
// }

// export const postDeleteApi = params => {
//   return axios.request({
//     url: 'user/delete',
//     data: params,
//     method: 'post'
//   })
// }

// // getListApi(params) {
// //   return http.get(`user/list`, params)
// // },
// // postSaveApi(params) {
// //   return http.post(`user/save`, params)
// // },
// // postDeleteApi(params) {
// //   return http.post(`user/delete`, params)
// // }

// export const getDragList = () => {
//   return axios.request({
//     url: 'get_drag_list',
//     method: 'get'
//   })
// }

// export const errorReq = () => {
//   return axios.request({
//     url: 'error_url',
//     method: 'post'
//   })
// }

// export const saveErrorLogger = info => {
//   return axios.request({
//     url: 'save_error_logger',
//     data: info,
//     method: 'post'
//   })
// }
