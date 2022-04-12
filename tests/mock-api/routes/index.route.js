import express from 'express'
import authRoutes from './auth.route.js'
import shopRoutes from './shop.route.js'

const router = express.Router()

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/shop',
    route: shopRoutes,
  },
]

routes.forEach(({ path, route }) => {
  router.use(path, route)
})

export default router
