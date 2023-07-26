<template>
    <div class="sub-menu__wrap" v-if="visibleLevel2Menus">
      <ul>
        <li
          class="node2"
          v-for="menu in level2Menus"
          :key="menu.menuId"
          :command="menu.path"
        >
          <router-link :to="menu.path">
            {{ menu.name }}
          </router-link>
        </li>
      </ul>
    </div>
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
    }
  }
}
</script>

<style>
</style>
