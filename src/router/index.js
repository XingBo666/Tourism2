import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/index')
    },
    {
      path: '/tourism',
      name: '主页',
      component: () => import('@/views/tourism/index'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/tourism/home/index'),
        },
        {
          path: '/tourism/user/user-list',
          name: '会员列表',
          component: () => import('@/views/tourism/user/index'),
        },
        {
          path: '/tourism/user/user-update',
          name: '个人资料修改',
          component: () => import('@/views/tourism/user/user-update'),
        },
        {
          path: '/tourism/user/members-update',
          name: '会员资料修改',
          component: () => import('@/views/tourism/user/members-update'),
        },
        {
          path: '/tourism/group/index',
          name: '队伍列表',
          component: () => import('@/views/tourism/group/index'),
        },
        {
          path: '/tourism/group/group-add',
          name: '创建队伍',
          component: () => import('@/views/tourism/group/group-add'),
        },
        {
          path: '/tourism/team/index',
          name: '团队活动',
          component: () => import('@/views/tourism/team/index'),
          children: [
            { path: 'join', name: '我参与的活动', component: () => import('@/views/tourism/team/join') },
            { path: 'create', name: '我创建的活动', component: () => import('@/views/tourism/team/create') }
          ]
        },
      ]
    },
    /*
    * 一定要放到最底部
    * 不然匹配不到其它路由就被拦截到404界面了
    * */
    {
      path: '*',
      name: '404',
      component: () => import('@/components/404'),
    }
  ]
})
