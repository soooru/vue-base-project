// Pathify
import { make } from 'vuex-pathify'
// service
import MockService from '@/services/MockService'

const state = {
  shopItems: [],
}

const getters = {}

const mutations = {
  ...make.mutations(state),
}

const actions = {
  fetchShopItems({ commit }) {
    MockService.getShopItems()
      .then((res) => {
        // console.log('getShopItems res', res)
        commit('SET_SHOP_ITEMS', res.data?.data || [])
        return
      })
      .catch((err) => {
        // console.log('getShopItems err', err)
        throw err
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
