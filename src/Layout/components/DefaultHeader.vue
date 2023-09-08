<template>
  <header class="header"
      :class="{ respons: respons }"
    >
  <div class="inner"
  :class="{ respons: respons }"
  >
    <div class="header__logo">
      <h1><router-link to="/"><span class="blind">RCS Biz Center</span></router-link></h1>
    </div>
    <div class="header__menu">
      <nav class="nav">
          <a role="button" class="nav__button" @click="openNav">
          <span class="blind">메뉴</span>
        </a>
          <div class="nav__inner"
            :class="{ ismonav : isMobileNavOpen}"
          >
            <div class="mobile-nav__top">
              <span class="user-name-mo" v-if="isLogin">홍길동</span>
              <h1 v-else><router-link to="/"><span class="blind">RCS Biz Center</span></router-link></h1>
              <a role="button" @click="closeNav" class="nav__button--close"><span class="irtext">닫기</span></a>
            </div>
          <ul>
              <li v-for="menu in level1Menus"
                :key="menu.menuId"
                class="nav-item"
                :class="[{'children': getLevel2Menus(menu).length > 0}, {'active': activeParent === menu.menuId}]"
                @mouseover="mouseOver(menu)"
                @mouseout="mouseOut(menu)"
              >
                <router-link @click.native="moMenu(menu, $event)" :to="menu.path">{{ menu.name }}</router-link>
                <gnb
                  :level1Menus="menu"
                  :level2Menus="getLevel2Menus(menu)"
                  :isMobileNavOpen="isMobileNavOpen"
                  @update:isMobileNavOpen="updateMobileNavOpen"
                  v-show="!isMoSize && menu.showDepthMenu"
                />
            </li>
          </ul>
        </div>
      </nav>
      <!-- <div class="header__util" v-if="!isLogin">
        <router-link :to="{path: '/login'}" class="is-login">로그인</router-link>
        <router-link :to="{path: '/utility/join'}">회원가입</router-link>
      </div> -->
      <div class="header__util">
          <router-link  class="link-dashboard">기업 대시보드</router-link>
          <div class="user">
            <!-- <a href="javascript:void(0);" class="btn_user login" v-if="!isLogin" @click="goLogin">
            <span>로그인</span>
             </a> -->
            <a role="button" :class="{isActive : userInfoLy}"  @click="toggleUserInfoLy"><span class="name">홍길동</span>님</a>
            <ul class="user-menu" v-if="userInfoLy">
              <li><router-link to="/utility/my-info" @click="closeUserInfoLy">내 계정관리</router-link></li>
            <li><a role="button" @click="logout">로그아웃</a></li>
          </ul>
        </div>
          <a role="button" class="alarm" @click="viewAlarm">
          <span class="blind">알람</span>
          <span class="alarm__num">9+</span>
        </a>
      </div>
        <!-- 알림 레이어 -->
        <AlarmList
          v-if="alarmLayer"
          @closeAlarmLayer="closeAlarmLayer"
        />
        <div class="gnb_full_bg" v-if="gnbDepthBg && !isMoSize"></div>
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
import Gnb from './Gnb.vue'
import AlarmList from './AlarmList.vue'

export default {
  name: 'DefaultHeader',
  components: { Loading, Gnb, AlarmList },
  data() {
    return {
      navMenu,
      menus: [],
      login: false,
      userInfoLy: false,
      alarmLayer: false,
      corpDashboardPath: '',
      gnbDepthBg: false,
      isMobileNavOpen: false,
      hasChildren: false,
      isMoSize: false,
      activeParent: null,
      showDepthMenu: false
    }
  },
  created() {
    this.init()
    window.addEventListener('resize', this.onResize)
    this.onResize()
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
      return jglib.isEmpty(this.$store.getters.corpInfo.corpId) ? '' : this.$store.getters.corpInfo.corpId
    },
    getUserName() {
      return this.$store.getters.userName
    },
    respons () {
      return this.$route.meta.respons === true
    }
  },
  mounted () {
    document.addEventListener('click', this.closeUserInfoLy)
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
    console.log(this.isMoSize)
  },
  beforeDestory () {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  destroyed() {
    document.removeEventListener('click', this.closeUserInfoLy)
  },
  methods: {
    init() {
      getMenus().then(res => {
        this.menus = res.map(menu => ({
          ...menu,
          showDepthMenu: false
        }))
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
    toggleUserInfoLy() {
      this.userInfoLy = !this.userInfoLy
      if (this.userInfoLy) {
        document.addEventListener('click', this.closeUserInfoLy)
      } else {
        document.removeEventListener('click', this.closeUserInfoLy)
      }
    },
    closeUserInfoLy(event) {
      if (!this.$el.contains(event.target)) {
        this.userInfoLy = false
        document.removeEventListener('click', this.closeUserInfoLy)
      }
    },
    mouseOver(menu) {
      let level2Menus = this.getLevel2Menus(menu)
      if (level2Menus.length > 0 && !this.isMoSize) {
        menu.showDepthMenu = true
        this.gnbDepthBg = true
      }
    },
    mouseOut(menu) {
      if (!this.isMoSize) {
        menu.showDepthMenu = false
        this.gnbDepthBg = false
      }
    },
    moMenu(menu, event) {
      event.preventDefault()
      let level2Menus = this.getLevel2Menus(menu)
      if (level2Menus.length > 0 && this.isMoSize) {
        console.log(this.isMoSize)
        menu.showDepthMenu = !menu.showDepthMenu
        this.gnbDepthBg = !this.gnbDepthBg
      }
      this.activeParent = menu.menuId
    },
    viewAlarm () {
      this.alarmLayer = true
    },
    closeAlarmLayer () {
      this.alarmLayer = false
    },
    openNav () {
      this.isMobileNavOpen = true
    },
    closeNav () {
      this.isMobileNavOpen = false
    },
    onResize () {
      this.isMoSize = window.innerWidth < 768
    },
    updateMobileNavOpen(value) {
      this.isMobileNavOpen = value
    }
  }
}
</script>

<style>

</style>
