import { isJWT } from 'validator'
import jwt_decode from 'jwt-decode'

export const decodeJWT = (token) => {
  if (!token || !isJWT(token)) return
  return jwt_decode(token)
}
