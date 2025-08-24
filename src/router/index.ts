import { createRouter, createWebHistory } from 'vue-router'

import { authGuard } from './route-guard'
import { routes } from './routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(authGuard)
