<template>
    <div class="sub-menu__wrap" v-if="visibleLevel2Menus">
      <ul>
        <li
          class="node2"
          v-for="menu in level2Menus"
          :key="menu.menuId"
          :command="menu.path"
        >
          <a href="#"
            @click="goMenu(menu, $event)"
            :class="{ 'active': menu.isActive }"
          >
            {{ menu.name }}
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
// import store from '@/store'

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
    },
    isMobileNavOpen: Boolean
  },
  data() {
    return {
      subDepthActive: false
    }
  },
  computed: {
    visibleLevel2Menus() {
      return this.level2Menus.length > 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    goMenu(menu, event) {
      event.preventDefault()
      const navigationResult = this.$router.push(menu.path)
      if (navigationResult) {
        this.$emit('update:isMobileNavOpen', !this.isMobileNavOpen)
      }
      // 액티브 상태 변경
      this.level2Menus.forEach(m => {
        m.isActive = (m.menuId === menu.menuId)
      })
    }
  }
}
</script>

<style>
</style>
