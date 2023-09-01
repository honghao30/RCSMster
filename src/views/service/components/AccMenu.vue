<template>
  <div class="guide-lnb">
    <nav>
      <ul>
        <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
        <li class="menu-item"
          :class="{ 'current active' :  activeIndex === i}"
          v-for="(item, i) in menuData" :key="i"
        >
          <a role="button" :class="{'children': item.children}" v-if="item.children" @click="handleOpen(i)">{{ item.label }}</a>
          <router-link
            :to="item.to"
            v-if="!item.children"
            class="link"
            :class="{ 'current': $route.path === item.to }"
          >{{ item.label }}</router-link>
          <Transition name="slide">
            <ul class="sub-menu" v-if="activeIndex === i"> <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
              <li v-for="(sub, j) in item.children" :key="j" :class="{ 'current': subActiveIndex === j }">
                <a role="button" @click="goSubMenu($event, j)">{{ sub.label }}</a>
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    menuData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeIndex: '',
      subActiveIndex: '',
      guideId: ''
    }
  },
  mounted() {
    console.log(this.$router.currentRoute)
  },
  methods: {
    handleOpen (index) {
      if (this.activeIndex === index) {
        this.activeIndex = ''
      } else {
        this.activeIndex = index
      }
    },
    goSubMenu(event, j) {
      const sub = this.menuData[this.activeIndex].children[j]
      this.$router.replace(sub.to)
      if (this.subActiveIndex === j) {
        this.subActiveIndex = ''
      } else {
        this.subActiveIndex = j
      }
    }
  }
}
</script>

<style>

</style>
