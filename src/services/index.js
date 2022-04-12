import axios from 'axios'

const apiCall = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  timeout: 5000,
})

export default apiCall
