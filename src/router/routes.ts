import type { RouteRecordRaw } from 'vue-router'
import { routeNames } from './route-names'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/login',
    name: routeNames.login,
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      notRequireAuth: true
    }
  },
  {
    path: '/register',
    name: routeNames.register,
    component: () => import('@/views/auth/Register.vue'),
    meta: {
      notRequireAuth: true
    }
  },
  {
    path: '/posts',
    name: routeNames.posts,
    component: () => import('@/views/posts/Posts.vue')
  },
  {
    path: '/post/:id',
    name: routeNames.postDetails,
    component: () => import('@/views/posts/PostDetails.vue')
  }
]

export {
  routes
}
