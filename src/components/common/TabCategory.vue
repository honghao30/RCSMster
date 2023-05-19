<template>
  <div class="category-tab">
      <ul>
        <li
          v-show="allTabUseYn"
          :class="[{active: activeTabIndex === -1}, {new: newTabIndex.includes(i)}]"
        >
          <a role="button" @click="tabCtrl(-1, null)">전체</a>
        </li>
        <li
          v-for="(item, i) in category"
          :key="i"
          :class="[{active: activeTabIndex === i}, {new: newTabIndex.includes(i)}]"
        >
          <a role="button" @click="tabCtrl(i, item)">{{ item }}</a>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: {
    allTabUseYn: Boolean,
    category: Object,
    activeTabIndex: Number,
    newTabIndex: Array
  },
  created() {
    if (!this.newTabIndex) {
      this.newTabIndex = []
    }
  },
  mounted() {
    if (!this.activeTabIndex && this.allTabUseYn) {
      this.activeTabIndex = -1
    } else if (!this.activeTabIndex && !this.allTabUseYn) {
      this.activeTabIndex = 0
    }
  },
  data () {
    return {}
  },
  methods: {
    tabCtrl: function(num) {
      this.activeTabIndex = num
    }
  }
}
</script>

<style>

</style>
