import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import vchart from '@/components/vchart'
import vchart2 from '@/components/vchart2'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/vchart',
      name: 'vchart',
      component: vchart
    },
    {
      path: '/vchart2',
      name: 'vchart2',
      component: vchart2
    }
  ]
})
