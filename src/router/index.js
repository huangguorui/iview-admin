import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
// import {
//   setToken,
//   getToken,
//   canTurnTo
// } from '@/libs/util'
// import config from '@/config'
// const {
//   homeName
// } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
// console.log(homeName)
// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  // localStorage.setItem('token', '')
  //   // 没有值跳转到登录页面
  //   if (!token.length) {
  //     next({
  //       path: '/login'
  //     })
  //   } else {
  //     next()
  //   }

  next()
  document.title = to.meta.title + ' - 学习网'

  if (localStorage.getItem('token') === null) {
    localStorage.setItem('token', '')
  }

  // let token = localStorage.getItem('token')
  // let flag = to.path.indexOf('Manage')

  // if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
  //   // if (localStorage.getItem('username')) { // 判断是否登录
  //   let flag = true
  //   if (flag) {
  //     console.log('执行登录')

  //   } else { // 没登录则跳转到登录界面
  //     next({
  //       path: '/Register',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   }
  // } else {
  //   next()

  // }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
