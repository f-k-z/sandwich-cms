import Vue from 'vue'
import Router from 'vue-router'

// components
import HomeBack from '@/components/back/home/HomeBack'
import Home from '@/components/front/Home'
import PageEdit from '@/components/back/page-edit/PageEdit'
import PageView from '@/components/front/PageView'
import Login from '@/components/back/login/Login'

// router
Vue.use(Router)

//see nested views https://router.vuejs.org/en/essentials/nested-routes.html

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {title: 'Home'}
    },
    {
      path: '/admin',
      name: 'HomeBack',
      component: HomeBack
    },
    {
      path: '/admin/edit/:page_id',
      name: 'PageEdit',
      component: PageEdit
    },
    {
      path: '/page/:page_slug',
      name: 'PageView',
      component: PageView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
})
