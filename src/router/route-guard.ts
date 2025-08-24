import type { NavigationGuard } from 'vue-router'
import { routeNames } from '@/router/route-names'

export const authGuard: NavigationGuard = async (to, _from, next) => {
  const authStore = useAuthStore()

  const isAuthenticated = await authStore.getToken()

  if (isAuthenticated && !authStore.user) {
    try {
      await authStore.getUserProfile()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.error('Error in auth guard: user not available')
    }
  }

  if (!authStore.user && !to.meta.notRequireAuth) {
    return next({ name: routeNames.login })
  }

  if (authStore.user && (to.path.includes('login') || to.path.includes('register'))) {
    return next('/posts')
  }

  next()
}
