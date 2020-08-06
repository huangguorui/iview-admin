import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () => import('@/view/login/login.vue')
},
{
  path: '/reg',
  name: 'reg',
  meta: {
    title: 'reg - 注册',
    hideInMenu: true
  },
  component: () => import('@/view/reg/reg.vue')
}, {
  path: '/', // 必须项
  name: 'index', // 必须项，后面缓存页面需要用到，且这个name是唯一的
  meta: {
    title: '首页',
    hideInMenu: true // 是否在左侧菜单中隐藏，默认为false
  },
  component: () => import('@/view/user/index.vue')
},

{
  path: '/custom',
  name: 'custom',
  meta: {
    title: '首页',
    hideInMenu: true
  },
  component: () => import('@/view/user/custom.vue')
},
{
  path: '/help',
  name: 'help',
  meta: {
    title: '帮助中心',
    hideInMenu: true
  },
  component: () => import('@/view/user/help.vue')
},
{
  path: '/pay',
  name: 'pay',
  meta: {
    title: '支付方式',
    hideInMenu: true
  },
  component: () => import('@/view/user/pay.vue')
},
{
  path: '/admin',
  name: '_home',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true
  },
  children: [{
    path: '/home',
    name: 'home',
    meta: {
      hideInMenu: true,
      title: '首页',
      notCache: true,
      icon: 'md-home'
    },
    component: () => import('@/view/single-page/home')
  }]
},
  // {
  //   path: '/home',
  //   name: 'home',
  //   meta: {
  //     title: '首页',
  //     icon: 'ios-book'
  //   },
  //   component: () => import('@/view/single-page/home')
  // },
{
  path: '',
  name: 'doc',
  meta: {
    title: '文档',
    href: 'https://lison16.github.io/iview-admin-doc/#/',
    icon: 'ios-book'
  }
}, {
  path: '/adminManage',
  name: 'adminManage',
  meta: {
    icon: 'md-menu',
    title: '管理员管理'
  },
  component: Main,
  children: [{
    path: 'adminList',
    name: 'adminList',
    meta: {
      icon: 'md-funnel',
      title: '管理员列表'
    },
    component: () => import('@/view/admin/adminManage/adminList.vue')
  },
  {
    path: 'roleList',
    name: 'roleList',
    meta: {
      icon: 'md-funnel',
      title: '权限列表'
    },
    component: () => import('@/view/admin/adminManage/roleList.vue')
  },
  {
    path: 'permissionList',
    name: 'permissionList',
    meta: {
      icon: 'md-funnel',
      title: '资源列表'
    },
    component: () => import('@/view/admin/adminManage/permissionList.vue')
  }
  ]
},

{
  path: '/article',
  name: 'article',
  meta: {
    icon: 'md-menu',
    title: '文章管理'
  },
  component: Main,
  children: [{
    path: 'articleAdd',
    name: 'articleAdd',
    meta: {
      icon: 'md-funnel',
      title: '文章添加'
    },
    component: () => import('@/view/admin/articleManage/articleAdd.vue')
  },
  {
    path: 'articleList',
    name: 'articleList',
    meta: {
      icon: 'md-funnel',
      title: '文章列表'
    },
    component: () => import('@/view/admin/articleManage/articleList.vue')
  },
  {
    path: 'articleColumn',
    name: 'articleColumn',
    meta: {
      icon: 'md-funnel',
      title: '文章分类'
    },
    component: () => import('@/view/admin/articleManage/articleColumn.vue')
  },
  {
    path: 'articleTag',
    name: 'articleTag',
    meta: {
      icon: 'md-funnel',
      title: '文章标签'
    },
    component: () => import('@/view/admin/articleManage/articleTag.vue')
  }

  ]
}, {
  path: '/user',
  name: 'user',
  meta: {
    icon: 'md-menu',
    title: '用户管理'
  },
  component: Main,
  children: [{
    path: 'userList',
    name: 'userList',
    meta: {
      icon: 'md-funnel',
      title: '用户列表'
    },
    component: () => import('@/view/admin/userManage/userList.vue')
  },
  {
    path: 'userC',
    name: 'userC',
    meta: {
      icon: 'md-funnel',
      title: '用户操作'
    },
    component: () => import('@/view/admin/userManage/userList.vue')
  }
  ]
},

{
  path: '/articleInfo/id/:id',
  name: 'articleInfo',
  meta: {
    title: '文章详情',
    hideInMenu: true
  },
  component: () => import('@/view/user/articleInfo.vue')
},
{
  path: '/linkManage',
  name: 'linkManage',
  meta: {
    icon: 'md-menu',
    title: '百度云盘链接管理'
  },
  component: Main,
  children: [{
    path: 'linkList',
    name: 'linkList',
    meta: {
      icon: 'md-funnel',
      title: '百度云盘链接列表'
    },
    component: () => import('@/view/admin/linkManage/linkList.vue')
  }

  ]
},
{
  path: '/customManage',
  name: 'customManage',
  meta: {
    icon: 'md-menu',
    title: '定制管理'
  },
  component: Main,
  children: [{
    path: 'customList',
    name: 'customList',
    meta: {
      icon: 'md-funnel',
      title: '定制列表'
    },
    component: () => import('@/view/admin/customManage/customList.vue')
  }

  ]
},
{
  path: '/multilevel',
  name: 'multilevel',
  meta: {
    icon: 'md-menu',
    title: '多级菜单'
  },
  component: Main,
  children: [{
    path: 'level_2_1',
    name: 'level_2_1',
    meta: {
      icon: 'md-funnel',
      title: '二级-1'
    },
    component: () => import('@/view/multilevel/level-2-1.vue')
  },
  {
    path: 'level_2_2',
    name: 'level_2_2',
    meta: {
      access: ['super_admin'],
      icon: 'md-funnel',
      showAlways: true,
      title: '二级-2'
    },
    component: parentView,
    children: [{
      path: 'level_2_2_1',
      name: 'level_2_2_1',
      meta: {
        icon: 'md-funnel',
        title: '三级'
      },
      component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
    }]
  },
  {
    path: 'level_2_3',
    name: 'level_2_3',
    meta: {
      icon: 'md-funnel',
      title: '二级-3'
    },
    component: () => import('@/view/multilevel/level-2-3.vue')
  }
  ]
}, {
  path: '/401',
  name: 'error_401',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/401.vue')
}, {
  path: '/500',
  name: 'error_500',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/500.vue')
}, {
  path: '*',
  name: 'error_404',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/404.vue')
}
]
