import { createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Onboarding from '@/pages/Onboarding.vue'
import AuthLayout from '@/pages/AuthLayout.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Counter from '@/components/counter/Counter.vue'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Onboarding',
      component: Onboarding
    },
    {
      path: '/auth',
      name: 'Auth',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    },
    {
      path: '/counter',
      name: 'Counter',
      component: Counter
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router   