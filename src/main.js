import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import jquery from 'jquery'
import lodash from 'lodash'
import dayjs from 'dayjs'
// vuescroll 추가
import vuescroll from 'vuescroll/dist/vuescroll-native'
import 'vuescroll/dist/vuescroll.css'
// 커스텀 라이브러리
import jglib from '@/utils/jglib'
// 에디터
import Vue2Editor from 'vue2-editor'
// 플러그인
import MessagePlugin from '@/plugins/message'
import FilterPlugin from '@/plugins/filter'
import VueMasonry from 'vue-masonry-css'

// 에러 관리
// import ErrorTracer from 'error-tracer'

require('vue2-animate/dist/vue2-animate.min.css')

// jquery 호환 라이브러리를 위한 조치
window.$ = window.jQuery = window.jquery = jquery
// Lodash window 전체 영역 부여
window._ = lodash
// framework내 커스텀 라이브러리 셋
window.jglib = jglib
// dayjs
window.dayjs = dayjs

// element ui의 기본 locale 정보를 셋팅한다.
let elLocale = require('element-ui/lib/locale/lang/ko')

Vue.use(ElementUI, { locale: elLocale.default })
Vue.use(vuescroll)
Vue.use(MessagePlugin)
Vue.use(FilterPlugin)
Vue.use(Vue2Editor)
Vue.use(VueMasonry)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
