<template>
  <header class="header">
  <div class="inner"
  :class="{ respons: respons }"
  >
  <!-- :class="{ respons: $route.meta.respon === 'true' }"> -->
    <div class="header__logo">
      <h1><router-link to="/"><span class="blind">RCS Biz Center</span></router-link></h1>
    </div>
    <div class="header__menu">
      <nav class="nav">
        <a role="button" class="nav__button" @click="openNav()">
          <span class="blind">메뉴</span>
        </a>
        <div class="nav__inner">
          <a role="button" @click="closeNav()" class="nav__button--close">닫기</a>
          <ul>
            <li v-for="menu in level1Menus" :key="menu.menuId" class="nav-item">
              <router-link :to="menu.path">{{ menu.name }}</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <div class="header__util" v-if="!isLogin">
        <router-link :to="{path: '/login'}" class="is-login">로그인</router-link>
        <router-link :to="{path: '/utility/join'}">회원가입</router-link>
      </div>
      <div class="header__util" v-else>
        <router-link :to="{name: 'corpDashboardUrl', params: { corpId: getCorpDashboardPath}}"
                     class="link-dashboard">기업 대시보드</router-link>
        <div class="user" v-if="isLogin">
<!--          <a href="javascript:void(0);" class="btn_user login" v-if="!isLogin" @click="goLogin">
            <span>로그인</span>
          </a>-->
          <a role="button" @click="isOpenMymenu"><span class="name">{{getUserName}}</span>님</a>
          <ul class="user-menu" v-if="dreopMenu">
            <li><router-link to="/utility/my-info">내 계정관리</router-link></li>
            <li><a role="button" @click="logout">로그아웃</a></li>
          </ul>
        </div>
        <a role="button" class="alarm">
          <span class="blind">알람</span>
          <span class="alarm__num">9+</span>
        </a>
      </div>
    </div>
  </div>
    <Loading
      size="50"
      v-if="isLoading"
    />
  </header>
</template>
<script>
import navMenu from './nav'
import { getMenus } from '@/api/common/menu'
import Loading from '@/components/common/loading.vue'

export default {
  name: 'DefaultHeader',
  components: { Loading },
  data() {
    return {
      navMenu,
      menus: [],
      login: false,
      dreopMenu: false,
      corpDashboardPath: ''
    }
  },
  created() {
    this.init()
  },
  computed: {
    isLoading () {
      return this.$store.state.ui.visibleLoading
    },
    level1Menus() {
      let level1Menus = []
      if (this.menus.length > 0) {
        level1Menus = this.menus.filter(m => m.level === 1)
      }
      return level1Menus
    },
    isLogin() {
      return (
        this.$store.state.user.accessToken !== undefined &&
        this.$store.state.user.accessToken !== ''
      )
    },
    getCorpDashboardPath() {
      return jglib.isEmpty(this.$store.getters.corpInfo.corpId) ? null : this.$store.getters.corpInfo.corpId
    },
    getUserName() {
      return this.$store.getters.userName
    },
    respons () {
      return this.$route.meta.respons === true
    }
  },
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
    goLogin() {
      this.$router.push('/login').catch(() => {
        let route = {
          path: '/login',
          hash: Math.floor(Math.random() * 10000)
        }
        this.$store.dispatch('SetRoute', route)
      })
    },
    logout() {
      this.$store.dispatch('Logout').then(res => {
        // document.location.href = document.location.pathname
        document.location.href = '/main'
      })
    },
    isOpenMymenu() {
      this.dreopMenu = !this.dreopMenu
    }
  }
}
</script>

<style>

</style>
