const path = require('path')

module.exports = {

  publicPath: './',
  devServer: {
    proxy: { // proxyTable 설정
      '/BF': { // api 로 시작하는 소스 는 traget으로 잡아준다. > 사용할때 url 이 api 가 있어야 한다.
        target: 'http://localhost:8082',
        changeOrigin: true
      },
      '/BP': { // aw로 url 이 시작하면 이렇게 target을 잡아준다.
        // target: 'http://localhost:7071',
        // target: 'https://www-dev.rcsbizcenter.com/',
        target: 'https://si-www-dev.rcsbizcenter.com',
        changeOrign: true
      },
      '/MO': { // 모바일용 api의 경우, token 체크 하지 않음
        // target: 'http://localhost:7071',
        // target: 'https://www-dev.rcsbizcenter.com/',
        target: 'https://si-www-dev.rcsbizcenter.com',
        changeOrign: true
      },
      '/insta': { // api 로 시작하는 소스 는 traget으로 잡아준다. > 사용할때 url 이 api 가 있어야 한다.
        target: 'https://www.instagram.com',
        pathRewrite: { '^/insta': '' },
        changeOrigin: true
      }
    }
    /*
    publicPath: './',
    devServer: {
      proxy: 'http://localhost:7071' // 개발서버
      // proxy: 'https://www-dev.rcsbizcenter.com' // 개발서버
    },
    */
  },
  productionSourceMap: false, // sourcemap 제외
  // 웹팩의 설정을 바로 사용하기 위해서는 configureWebpack에서 정의를 한다.
  configureWebpack: {
    resolve: {
      alias: {
        // 예전 라이브리러들 중 jquery-ui를 사용하는 것들이 있는데, jquery-ui/ui를 가르키게 만들어야 한다.
        'jquery-ui': path.resolve(__dirname, 'node_modules/jquery-ui/ui'),
        // vue-echart에서 해당 기능을 사용하는데, 기본 제공은 esm 디렉토리 내부, ie11에서 에러가 있음. 이를 우회
        'resize-detector': path.resolve(__dirname, 'node_modules/resize-detector/dist')
      }
    }
  }
}
