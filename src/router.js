import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const DefaultContainer = () => import('@/containers/DefaultContainer')

export default new Router({
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    scrollBehavior(to, from, savedPosition) {
      if(savedPosition)
        return savedPosition;
      if(to.hash) {
        return { selector: to.hash };
      }
      return { x: 0, y: 0};
    },
    routes: [{
        path: '/',
        name: 'default',
        component: DefaultContainer,
        children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/ImageUpload')
        }]
    }]
})
