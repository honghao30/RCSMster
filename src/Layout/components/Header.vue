<template>
  <div class="header_wrap">
    <header class="header">
      <h1 class="logo">
        <a href="javascript:void(0);" @click="goMain">
          <img
            src="../../assets/images/common/logo.png"
            alt="RCS Business Center"
            class="logo_black"
          >
          <img
            src="../../assets/images/common/logo_w.png"
            alt="RCS Business Center"
            class="logo_white"
          >
        </a>
      </h1>
      <nav>
        <ul>
          <li class="node1" v-for="menu in level1Menus" :key="menu.menuId">
            <gnb :level1Menus="menu" :level2Menus="getLevel2Menus(menu)"/>
          </li>
        </ul>
        <!-- 퍼블리싱 안나왔으므로 임시 -->
        <div class="util_wrap">
          <!-- 로그인 후 -->
          <a href="javascript:void(0);" class="btn_user login" v-if="!isLogin" @click="goLogin">
            <span>로그인</span>
          </a>
          <!-- 로그인 후 -->
          <a href="javascript:void(0);" class="btn_user logout" v-if="isLogin" @click="logout">
            <span>로그아웃</span>
          </a>
          <a href="javascript:void(0);" class="btn_user myinfo" v-if="isLogin" @click="goMyInfo">
            <span>내 정보관리</span>
          </a>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { getMenus } from '@/api/common/menu'
import Gnb from './Gnb.vue'

export default {
  name: 'Header',
  components: {
    Gnb
  },
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  computed: {
    isLogin() {
      return (
        this.$store.state.user.accessToken !== undefined &&
        this.$store.state.user.accessToken !== ''
      )
    },
    level1Menus() {
      let level1Menus = []
      if (this.menus.length > 0) {
        level1Menus = this.menus.filter(m => m.level === 1)
      }
      return level1Menus
    }
  },
  watch: {},
  methods: {
    init() {
      getMenus().then(res => {
        this.menus = res
      })
    },
    getLevel2Menus(level1Menu) {
      return this.menus.filter(m => {
        return m.parentMenuId === level1Menu.menuId
      })
    },
    goMain() {
      // 메인에서 클릭 시 리프레시 요구 발생 시 완전 재조회로 변경
      this.$router.push('/').catch(() => {
        window.scrollTo(0, 0)
      })
    },
    goLogin() {
      this.$router.push('/login').catch(() => {
        let route = {
          path: '/login',
          hash: Math.floor(Math.random() * 10000)
        }
        this.$store.dispatch('SetRoute', route)
      })
    },
    goMyInfo() {
      // 페이지 리로드
      let pathname = location.pathname
      let path = '/utility/my-info'
      if (pathname === path) {
        this.$router.replace('/terms/use')
        this.$nextTick(() => this.$router.replace(path))
      } else {
        this.$router.push(path).catch(() => {})
      }
    },
    logout() {
      this.$store.dispatch('Logout').then(res => {
        // document.location.href = document.location.pathname
        document.location.href = '/main'
      })
    }
  }
}
</script>
