// Imports
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/home/Index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/Index.vue'),
        },
        {
          path: 'pro',
          name: 'Pro',
          component: () => import('@/views/pro/Index.vue'),
          meta: { src: require('@/assets/pro.jpg') },
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/login/Index.vue'),
          meta: { src: require('@/assets/pro.jpg') },
        },
        {
          path: 'cadastro',
          name: 'Cadastro',
          component: () => import('@/views/cadastro/Index.vue'),
          meta: { src: require('@/assets/pro.jpg') },
        },
        {
          path: 'dashboardCliente',
          name: 'DashboardCliente',
          component: () => import('@/views/dashboardCliente/Index.vue'),
          meta: { src: require('@/assets/pro.jpg') },
        },
        {
          path: 'novoPedido',
          name: 'NovoPedido',
          component: () => import('@/views/novoPedido/Index.vue'),
          meta: { src: require('@/assets/pro.jpg') },
        },
      ],
    },

  ],
})

export default router
