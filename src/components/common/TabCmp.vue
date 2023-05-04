<template>
  <div class="tab__wrap">
    <ul
      class="tab-list"
      role="tablist"
      :class="[{scroll: tabs.length > 10}, {fixed: tabWidth}]"
    >
      <li
        v-for="(tab, i) in tabs"
        :key=i
        class="tab-item"
        :class="[{active: activeTabIndex === i}]"
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
    tabWidth: Number
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
    this.tabs[0].isActive = true
    console.log(this.tabWidth)
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
