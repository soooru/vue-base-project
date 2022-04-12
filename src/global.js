import Vue from 'vue'
//lodash
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

//vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//Basecomponents import
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/,
)
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''),
    ),
  )

  // 컴포넌트를 전역적으로 등록
  Vue.component(
    componentName,
    // `export default`를 이용한 컴포넌트는 `.default`로 컴포넌트
    // 옵션을 추출하고 그렇지 않은 컴포넌트는 모듈의 루트를 호출
    componentConfig.default || componentConfig,
  )
})

//Vue config
Vue.config.silent = process.env.NODE_ENV === 'development'
Vue.config.productionTip = process.env.NODE_ENV === 'development'
Vue.config.performance = process.env.NODE_ENV === 'development'
