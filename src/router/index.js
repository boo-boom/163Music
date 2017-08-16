import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Recommend = (resolve) => {
  import('@/components/recommend').then((module) => {
    resolve(module);
  });
};
const Hot = (resolve) => {
  import('@/components/hot').then((module) => {
    resolve(module);
  });
};
const Search = (resolve) => {
  import('@/components/search').then((module) => {
    resolve(module);
  });
};
const PlayList = (resolve) => {
  import('@/components/play_list').then((module) => {
    resolve(module);
  });
};

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
          path: ':id',
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
