import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/state'
import vuetify from '@/plugins/vuetify'
import { i18n } from '@/plugins/i18n'

// Global StyleSheet
import './styles/global_style.css'

// Global JS
import './global.js'

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
