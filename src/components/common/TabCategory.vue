<template>
  <div class="category-tab">
      <ul>
        <li
          v-for="(item, i) in category"
          :key="i"
          :class="[{active: activeTabIndex === i}, {new: newTabIndex === i}]"
        >
          <a role="button" @click="tabCtrl(i)">{{ item }}</a>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: {
    category: Object,
    newTabIndex: Number
  },
  data () {
    return {
      activeTabIndex: 0
    }
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
