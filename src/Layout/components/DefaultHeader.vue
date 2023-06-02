<template>
  <header class="header">
  <div class="inner">
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
      <div class="header__util">
        <router-link to="/dashboard" class="link-dashboard">기업 대시보드</router-link>
        <div class="user">
          <a role="button"><span class="name">홍길동</span>님</a>
          <!-- <ul class="user-menu">
            <li><router-link to="/">내 계정관리</router-link></li>
            <li><a role="button">로그아웃</a></li>
          </ul> -->
        </div>
        <a role="button" class="alarm">
          <span class="blind">알람</span>
          <span class="alarm__num">9+</span>
        </a>
      </div>
    </div>
  </div>
  </header>
</template>
<script>
import navMenu from './nav'
import { getMenus } from '@/api/common/menu'

export default {
  name: 'DefaultHeader',
  data() {
    return {
      navMenu,
      menus: []
    }
  },
  created() {
    this.init()
  },
  computed: {
    level1Menus() {
      let level1Menus = []
      if (this.menus.length > 0) {
        level1Menus = this.menus.filter(m => m.level === 1)
      }
      return level1Menus
    }
  },
  methods: {
    init() {
      getMenus().then(res => {
        this.menus = res
        console.log(this.menus)
      })
    },
    getLevel2Menus(level1Menu) {
      return this.menus.filter(m => {
        return m.parentMenuId === level1Menu.menuId
      })
    }
  }
}
</script>

<style>

</style>
