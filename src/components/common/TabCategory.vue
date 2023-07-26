<template>
  <div class="category-tab">
      <ul>
        <li
          v-show="allTabUseYn"
          :class="{active: activeTab === 'ALL' || activeTab === ''}"
        >
          <a role="button" @click="tabCtrl(-1, null)">전체</a>
        </li>
        <li
          v-for="(item, i) in category"
          :key="i"
          :class="[{active: activeTab === item.code}, {new: newTabList.includes(item.code)}]"
        >
          <a role="button" @click="tabCtrl(i, item)">{{ item.codeNm }}</a>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: {
    allTabUseYn: {
      type: Boolean,
      default: false
    },
    category: Array,
    activeTab: String,
    newTabList: {
      type: Array,
      default() {
        return []
      }
    }
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
    tabCtrl: function(index, item) {
      this.$emit('click', index, item)
    }
  }
}
</script>

<style>

</style>
