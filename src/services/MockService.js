import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false, // This is the default
  timeout: 10000,
})

export default {
  // content
  postLogIn(params) {
    return apiClient.post('/api/auth/login', params)
  },
  // shop
  getShopItems() {
    return apiClient.get('/api/shop/items')
  },
}
