import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'
import store from '@/state'
import { redirectToLogin } from '@/utils/redirect'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

router.beforeEach((routeTo, routeFrom, next) => {
  if (routeFrom.name !== null) {
    NProgress.start()
  }
  if (typeof routeTo.meta.requiresAuth !== 'boolean') return next()
  const loggedIn = store.getters['auth/loggedIn']
  if (routeTo.matched.some((route) => route.meta.requiresAuth)) {
    /* 회원 인증이 필요한 페이지 */
    if (!loggedIn) redirectToLogin(routeTo, next)
    // 토큰 확인
    return store.dispatch('auth/validate').then((isValidUser) => {
      isValidUser ? next() : redirectToLogin(routeTo, next)
    })
  } else {
    /* 회원 인증이 있으면 안되는 페이지 */
    if (!loggedIn) return next()
    next({ name: 'my-page' })
  }
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name !== 'NavigationDuplicated') throw err
  })
}

export default router
