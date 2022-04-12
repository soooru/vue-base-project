import auth from '../middleware/authenticate.js'
import express from 'express'
const router = express.Router()

// Log in a user with a username and password
router.post('/login', (req, res) => {
  auth
    .authenticate(req.body, req.db)
    .then(({ id, userId, name }) => {
      res.status(200).json({
        code: 2000,
        message: 'success',
        accessToken: `access-token-${userId}-${id}`,
        refreshToken: `refresh-token-${userId}-${id}`,
        name,
      })
    })
    .catch((error) => {
      res.status(401).json({ message: error.message })
    })
})

// Get the user of a provided token, if valid
router.get('/session', (req, res) => {
  res.status(200).json({
    code: 2000,
    msg: 'success',
  })
  // const currentUser = Users.findBy('token', req.headers.authorization)
  // if (!currentUser) {
  //   return res.status(401).json({
  //     message:
  //       'The token is either invalid or has expired. Please log in again.',
  //   })
  // }
  // res.json(currentUser)
})

// A simple ping for checking online status
router.get('/ping', (req, res) => {
  res.send('OK')
})

export default router
