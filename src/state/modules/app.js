const state = {
  windowSize: 0,
  drawer: false,
  language: '',
  modal: false,
  modalContent: {
    title: '',
    text: '',
    mode: 'alert',
    action: null,
  },
}

const getters = {
  isMobile(state) {
    return state.windowSize < 960
  },
}

const mutations = {
  SET_WINDOW_SIZE(state, payload) {
    state.windowSize = payload
  },
  SET_DRAWER(state, payload) {
    state.drawer = typeof payload === 'boolean' ? payload : !state.drawer
  },
  SET_LANGUAGE(state, language) {
    state.language = language
  },
  SET_MODAL(state, payload) {
    state.modal =
      typeof payload.active === 'boolean' ? payload.active : !state.modal
    if (payload.active) {
      state.modalContent.title = payload.title ? payload.title : ''
      state.modalContent.text = payload.text ? payload.text : ''
      state.modalContent.mode = payload.mode ? payload.mode : 'alert'
      state.modalContent.action = payload.action ? payload.action : null
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
