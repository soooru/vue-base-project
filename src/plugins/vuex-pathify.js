import pathify from 'vuex-pathify'

// options
pathify.options.mapping = 'standard'
pathify.options.strict = true
pathify.options.deep = 1 // 하위 속성까지 접근가능, 2: 새로운 하위 속성 생성 가능, 0: 하위 속성 접근 불가

export default pathify
