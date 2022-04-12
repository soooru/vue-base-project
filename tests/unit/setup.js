import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(Vuelidate)

const app = '<div id="app" data-app="true"><div></div></div>'
document.body.innerHTML += app
