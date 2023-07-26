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
        :class="[{active: activeIndex === i}, {new: tab.tabIsNew}]"
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
    activeIndex: {
      type: Number,
      default: 0
    },
    size: String
  },
  data() {
    return {
      tabs: []
    }
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    this.tabs[this.activeIndex].isActive = true
  },
  watch: {
    activeIndex(newValue, oldValue){
      this.tabCtrl(newValue);
    }
  },
  methods: {
    tabCtrl: function(num) {
      this.activeIndex = num
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === this.activeIndex)
      })
    }
  }

}
</script>
