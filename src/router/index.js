import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () =>
      import ('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () =>
    import ('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () =>
    import ('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () =>
    import ('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
    import ('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
      import ('@/views/dashboard/index'),
    name: '首页',
    meta: {
      title: '首页',
      icon: 'dashboard',
      affix: true,
      requireAuth: true
    }
  }]
},
{
  path: '/user',
  component: () =>
    import ('@/views/user/Login'),
  redirect: '/user/login',
  children: [{
    path: 'login',
    name: 'userLogin',
    meta: { title: '登录', icon: '' },
    hidden: true
  }]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
  path: '/problem',
  component: Layout,
  redirect: '/problem/problemList',
  children: [{
    path: 'problemList',
    component: () =>
      import ('@/views/problem/ProblemList'),
    name: 'problemList',
    meta: { title: '问题', icon: 'problem' }
  },
  {
    path: 'problem',
    component: () =>
      import ('@/views/problem/Problem'),
    name: 'problem',
    meta: { title: '问题详情', icon: 'problem' },
    hidden: true
  },
  {
    path: 'submit',
    component: () =>
      import ('@/views/problem/Submit'),
    name: 'submit',
    meta: { title: '问题提交', icon: 'problem' },
    hidden: true
  }
  ]
},
{
  path: '/status',
  component: Layout,
  redirect: '/status',
  children: [{
    path: '',
    component: () =>
      import ('@/views/status/Status'),
    name: 'status',
    meta: { title: '提交状态', icon: 'skill' }
  },
  {
    path: 'code',
    component: () =>
      import ('@/views/status/Code'),
    name: 'code',
    meta: { title: '完整代码', icon: 'skill' },
    hidden: true
  }
  ]
},
{
  path: '/blog',
  component: Layout,
  redirect: '/blog/blogList',
  children: [{
    path: 'blogList',
    component: () =>
      import ('@/views/blog/BlogList'),
    name: 'blogList',
    meta: { title: '博客', icon: 'education' }
  }, {
    path: 'edit',
    component: () =>
      import ('@/views/blog/BlogEdit'),
    name: 'edit',
    meta: { title: '博客编辑', icon: 'education' },
    hidden: true
  }, {
    path: 'blogDetail',
    component: () =>
      import ('@/views/blog/BlogDetail'),
    name: 'blogDetail',
    meta: { title: '博客详情', icon: 'education' },
    hidden: true
  }]
},

{
  path: '/profile',
  component: Layout,
  redirect: '/profile/user',
  meta: { title: '用户中心', icon: 'example' },
  children: [{
    path: 'user',
    component: () =>
      import ('@/views/profile/User'),
    name: 'user',
    meta: { title: '用户信息', icon: 'peoples' }
  },
  {
    path: 'userStatus',
    component: () =>
      import ('@/views/profile/UserStatus'),
    name: 'userStatus',
    meta: { title: '提交记录', icon: 'edit' }
  },
  {
    path: 'userBlogList',
    component: () =>
      import ('@/views/profile/UserBlogList'),
    name: 'userBlogList',
    meta: { title: '个人博客', icon: 'list' }
  }
  ]
},
{
  path: '/news',
  component: Layout,
  redirect: '/news/newsList',
  children: [{
    path: 'newsList',
    component: () =>
      import ('@/views/news/News'),
    name: 'newsList',
    meta: { title: '极客资讯', icon: 'documentation' }
  }]
},

// 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
