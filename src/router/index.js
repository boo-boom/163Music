import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend'
import Hot from '@/components/hot'
import Search from '@/components/search'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/hot',
      component: Hot
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
