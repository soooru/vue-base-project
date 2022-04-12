import _ from 'lodash'

export default {
  authenticate({ userId, password }, db) {
    return new Promise((resolve, reject) => {
      const matchedUser = db.get('users').find({ userId, password }).value()
      if (matchedUser) {
        resolve(this.json(matchedUser))
      } else {
        reject(new Error('Invalid user credentials.'))
      }
    })
  },
  json(user) {
    return user && _.omit(user, ['password'])
  },
}
