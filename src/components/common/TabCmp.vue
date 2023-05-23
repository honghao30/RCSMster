<template>
  <div class="tab__wrap"
  :class="[tabClass, size]"
  >
    <ul
      class="tab-list"
      role="tablist"
    >
      <li
        v-for="(tab, i) in tabs"
        :key=i
        class="tab-item"
        :class="[{active: activeTabIndex === i}, {new: tab.tabIsNew}]"
        :style="{ width: tabWidth + 'px' }"
      >
        <a role="tab"
          @click="tabCtrl(i)"
        >
          <span>{{ tab.tabTitle }}</span>
        </a>
      </li>
    </ul>
    <div class="tab-contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabClass: String,
    activeIndex: Number,
    size: String
  },
  data() {
    return {
      tabs: [],
      activeTabIndex: 0
    }
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    if (this.activeIndex) {
      this.activeTabIndex = this.activeIndex
    }
    this.tabs[this.activeTabIndex].isActive = true
  },
  methods: {
    tabCtrl: function(num) {
      this.activeTabIndex = num
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === this.activeTabIndex)
      })
    }
  }

}
</script>
