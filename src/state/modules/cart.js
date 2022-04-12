// Pathify
import { make } from 'vuex-pathify'
import { cloneDeep } from 'lodash'
import router from '../../router'

const state = {
  cart: [],
}

const getters = {
  cartLength(state) {
    if (state.cart.length < 1) return '0'
    const sum = state.cart.reduce((acc, cur) => {
      acc += cur.quantity
      return acc
    }, 0)
    return String(sum)
  },
  totalPrice(state) {
    return state.cart.reduce((acc, cur) => {
      const sum = Number(cur.price) * cur.quantity
      acc = acc + sum
      return acc
    }, 0)
  },
}

const mutations = {
  ...make.mutations(state),
}

const actions = {
  insertItem({ state, commit, dispatch }, selectedItem) {
    if (!this.getters['auth/loggedIn']) {
      commit(
        'app/SET_MODAL',
        {
          active: true,
          title: '알림',
          text: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
          mode: 'confirm',
          action: () => {
            router.push({ name: 'login' })
          },
        },
        { root: true },
      )
      return
    }
    // 기존 카트에 같은 상품이 있는 경우는 업데이트
    const isExist = state.cart.find((item) => item.id === selectedItem.id)
    if (isExist) return dispatch('addItem', selectedItem)
    commit('SET_CART', [...state.cart, { ...selectedItem, quantity: 1 }])
  },
  addItem({ state, commit }, selectedItem) {
    const findIdx = state.cart.findIndex((item) => item.id === selectedItem.id)
    if (findIdx === -1) return
    const copied = cloneDeep(state.cart)
    copied[findIdx].quantity++
    commit('SET_CART', copied)
  },
  substractItem({ state, commit }, selectedItem) {
    const findIdx = state.cart.findIndex((item) => item.id === selectedItem.id)
    if (findIdx === -1) return
    const copied = cloneDeep(state.cart)
    if (copied[findIdx].quantity > 1) {
      copied[findIdx].quantity--
    } else {
      copied.splice(findIdx, 1)
    }
    commit('SET_CART', copied)
  },
  deleteItem({ state, commit }, selectedItem) {
    const findIdx = state.cart.findIndex((item) => item.id === selectedItem.id)
    if (findIdx === -1) return
    const copied = cloneDeep(state.cart)
    copied.splice(findIdx, 1)
    commit('SET_CART', copied)
  },
  resetCart({ commit }) {
    commit('SET_CART', [])
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
