import { createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import AuthLayout from '@/pages/AuthLayout.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import GuessNumber from '@/pages/GuessNumber.vue'
import Home from "@/pages/Home.vue"
import PartyQueryNumber from '@/pages/PartyQueryNumber.vue'
import PartyQueryAll from '@/pages/PartyQueryAll.vue'
import PartyQueryDisplay from '@/pages/PartyQueryDisplay.vue'
import PartyQueryVariant from '@/pages/PartyQueryVariant.vue'
import PartyQueryWinner from '@/pages/PartyQueryWinner.vue'
import Play from '@/pages/Play.vue'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      path: '/play',
      name: 'Play',
      component: Play
    },
    {
      path: '/guess-number',
      name: 'GuessNumber',
      component: GuessNumber
    },
    {
      path: '/party-query-number',
      name: 'PartyQueryNumber',
      component: PartyQueryNumber
    },
    {
      path: '/party-query-all',
      name: 'PartyQueryAll',
      component: PartyQueryAll
    },
    {
      path: '/party-query-display',
      name: 'PartyQueryDisplay',
      component: PartyQueryDisplay
    },
    {
      path: '/party-query-variant',
      name: 'PartyQueryVariant',
      component: PartyQueryVariant
    },
    {
      path: '/party-query-winner',
      name: 'PartyQueryWinner',
      component: PartyQueryWinner
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router   