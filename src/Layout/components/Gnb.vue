<template>
  <el-dropdown @command="handleCommand">
    <a href="javascript:void(0);" @click="goMenu(level1Menus)">{{ level1Menus.name }}</a>
    <el-dropdown-menu slot="dropdown" class="sub_menu" v-if="visibleLevel2Menus">
      <el-dropdown-item
        class="node2"
        v-for="menu in level2Menus"
        :key="menu.menuId"
        :command="menu.path"
      >
        <a href="javascript:void(0);">{{ menu.name }}</a>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import store from '@/store'

export default {
  name: 'Gnb',
  props: {
    level1Menus: {
      type: Object,
      required: true
    },
    level2Menus: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    visibleLevel2Menus() {
      return this.level2Menus.length > 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    goMenu(menu) {
      this.routerPush(menu.path)
    },
    handleCommand(command) {
      if (
        command === '/cs/qna' &&
        jglib.isEmpty(this.$store.state.user.accessToken)
      ) {
        command = '/cs/qna/form'
      }
      this.routerPush(command)
    },
    routerPush(path) {
      this.$store.commit('searchcondition/allClearSearchCondition')
      let hashName = location.hash.split('#')[1]
      let pathName = location.pathname
      if (pathName === path || hashName === path) {
        // TODO: 동일메뉴 리프래쉬

        store.dispatch('SetLoading', true)
        if (path === '/cs/notice') {
          this.$router.go()
        } else if (path === '/feed/list') {
          this.$router.go()
        } else {
          this.$router.replace('/terms/use')
          this.$nextTick(() => this.$router.replace(path))
        }
        store.dispatch('SetLoading', false)
      } else {
        this.$router.push({ path: path }).catch(() => {
          let route = {
            path: path,
            hash: Math.floor(Math.random() * 10000)
          }
          this.$store.dispatch('SetRoute', route)
        })
      }
    }
  }
}
</script>

<style>
</style>
