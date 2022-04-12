module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    // 파일 불러올 때 사용
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
  productionSourceMap: false, //프로덕트 빌드 시 속도 향샹을 위해 false로 처리, 대신 소스맵은 pass
  lintOnSave: process.env.NODE_ENV === 'production',
  devServer: {
    disableHostCheck: true,
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 7070,
    https: false,
    hotOnly: false,
    proxy: null, //
  },
}
