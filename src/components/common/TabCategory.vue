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
          <a role="button" @click="tabCtrl(i, item)">{{ item.codeNm }}</a>
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
