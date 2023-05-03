<template>
  <div class="box_breadcrumb">
    <ul class="breadcrumb">
      <li class="home">
        <a href="javascript:void(0);" @click="goMain">홈</a>
      </li>
      <li>
        <a href="javascript:void(0);" @click="moveRoute(depth1Menus.path)">{{depth1Menus.name}}</a>
      </li>
      <li>
        <span>{{depth2Menus.name}}</span>
      </li>
      <li v-if="depth3Menus">
        <span>{{depth3Menus}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { getMenus } from '@/api/common/menu'
export default {
  name: 'Breadcrumb',
  components: {},
  props: {
    depth1MenuId: {
      type: String
    },
    depth2MenuId: {
      type: String
    },
    depth3MenuId: {
      type: String
    }
  },
  data() {
    return {
      menus: []
    }
  },
  computed: {
    depth1Menus() {
      if (this.menus.length > 0) {
        return this.menus.filter(menuObj => {
          if (menuObj.level === 1 && menuObj.menuId === this.depth1MenuId) {
            return menuObj
          }
        })[0]
      } else {
        return ''
      }
    },
    depth2Menus() {
      if (this.menus.length > 0) {
        return this.menus.filter(menuObj => {
          if (menuObj.level === 2 && menuObj.menuId === this.depth2MenuId) {
            return menuObj
          }
        })[0]
      } else {
        return ''
      }
    },
    depth3Menus() {
      if (jglib.isEmpty(this.depth3MenuId)) {
        return false
      } else {
        return this.depth3MenuId
      }
    }
  },
  watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      getMenus().then(res => {
        this.menus = res
      })
    },
    goMain() {
      this.$router.push('/')
    },
    moveRoute(path) {
      this.$router.push(path).catch(e => {})
    }
  }
}
</script>
<style>
</style>
