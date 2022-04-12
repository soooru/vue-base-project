module.exports = {
  // 상대 경로 설정 : <rootDir>를 붙이고 그 다음 경로를 작성한다.
  // preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup'], // 테스트가 실행되기전에 실행
  roots: ['<rootDir>/src/', '<rootDir>/tests/unit/'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  // snapshotSerializers: ['<rootDir>/node_modules/jset-serializer-vue'],
}
