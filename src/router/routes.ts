import type { RouteRecordRaw } from 'vue-router'
import { routeNames } from './route-names'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
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
