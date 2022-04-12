import Vue from 'vue'
import Vuex from 'vuex'
import pathify from '@/plugins/vuex-pathify'
import createPersistedState from 'vuex-persistedstate'
import { isNullOrUndefined } from '@/utils/type'

import * as modules from './modules'

Vue.use(Vuex)

const vuePersist = {
  key: 'state', // 저장소에 저장할 key명
  reducer: (state) => {
    /* vuex 상태가 변경될 때 저장소에 넣을 항목을 정한다. */
    // 제외할 state 목록
    const exclusionList = [
      // app
      'windowSize',
      'drawer',
      // shop
      'shopItems',
    ]
    const result = Object.entries(state).reduce((acc, cur) => {
      const subObj = Object.entries(cur[1]).reduce((subAcc, subCur) => {
        if (
          !exclusionList.includes(subCur[0]) &&
          !isNullOrUndefined(subCur[1])
        ) {
          subAcc[subCur[0]] = subCur[1]
        }
        return subAcc
      }, {})
      if (Object.keys(subObj).length > 0) {
        acc[cur[0]] = subObj
      }
      return acc
    }, {})

    return result
  },
}

const store = new Vuex.Store({
  modules,
  plugins: [createPersistedState(vuePersist), pathify.plugin],
  strict: process.env.NODE_ENV !== 'production',
})

export default store
