import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend'
import Hot from '@/components/hot'
import Search from '@/components/search'
import PlayList from '@/components/play_list'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: '/recommend/list',
          component: PlayList
        }
      ]
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
