// Pathify
import { make } from 'vuex-pathify'
// utils
import { isNullOrUndefined } from '@/utils/type'
import { setCookie, delCookie } from '@/utils/cookie'
// library
import NProgress from 'nprogress'
import moment from 'moment-timezone'
// service
import MockService from '@/services/MockService'
// router
import router from '@/router'

const deployMode = process.env.VUE_APP_DEPLOY_MODE.charAt(0)

const state = {
  userData: null,
  autoLogin: false,
}

const getters = {
  loggedIn(state) {
    return !!state.userData
  },
}

const mutations = {
  ...make.mutations(state),
}

const actions = {
  logIn({ commit, dispatch }, params) {
    if (isNullOrUndefined(params)) return false
    NProgress.start()
    return MockService.postLogIn(params)
      .then((res) => {
        console.log('postLogIn', res)
        const { accessToken, refreshToken, name } = res.data
        // // 정상 로그인
        commit('SET_USER_DATA', {
          id: params.userId,
          name: name || '',
        })
        setCookie(`${deployMode}_access`, accessToken)
        setCookie(`${deployMode}_refresh`, refreshToken)
        return
      })
      .catch(async (err) => {
        console.log('/auth/login err', err)
        const notification = {
          type: 'error',
          message: '로그인을 실패했습니다.',
        }
        if (err.response && err.response.status === 401) {
          notification.message = '아이디 또는 비밀번호를 확인해 주세요'
          await dispatch('notification/add', notification, { root: true })
        } else {
          router.push({ name: 'network-issue' })
        }
      })
      .finally(() => {
        NProgress.done()
      })
  },
  validate() {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  },
  async logOut({ commit, dispatch }) {
    commit('SET_USER_DATA', null)
    delCookie(`${deployMode}_access`)
    delCookie(`${deployMode}_refresh`)
    await dispatch('cart/resetCart', null, { root: true })
    return router.push({ name: 'login' })
  },
}

function getTokenPeriod(autoLogin, expTimestamp) {
  if (!autoLogin) return
  return moment.unix(expTimestamp).format()
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
