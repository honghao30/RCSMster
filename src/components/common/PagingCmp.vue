<template>
  <div class="paging" :class="{className: true}">
    <a role="button" class="btn-first" @click="changePageFirst"><span class="blind">처음으로</span></a>
    <a role="button" class="btn-prev" @click="changeRangePrev"><span class="blind">이전으로</span></a>
    <a
      role="button"
      class="btn-num"
      v-for="page in visiblePage"
      :key="`page-${page}`"
      :class="{'active': parseInt(currentPage) === page}"
      @click="changePage(page)"
    >{{ page }}</a>
    <a role="button" class="btn-next" @click="changeRangeNext"><span class="blind">다음으로</span></a>
    <a role="button" class="btn-last" @click="changePageLast"><span class="blind">마지막으로</span></a>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: [Number, String],
      default: 0
    },
    pageSize: {
      type: [Number, String],
      default: 10
    },
    currentPage: {
      type: [Number, String],
      default: 1
    },
    className: {
      type: String,
      default: ''
    },
    rangeMax: {
      type: [Number, String],
      default: 10
    }
  },
  data() {
    return {
      range: 0
    }
  },
  created() {},
  mounted() {},
  computed: {
    visiblePage() {
      let range = []
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        range.push(i)
      }
      return range
    },
    lastPage() {
      return parseInt(this.total) > 0
        ? Math.ceil(parseInt(this.total) / parseInt(this.pageSize))
        : 1
    },
    rangeStart() {
      return parseInt(this.rangeMax) * this.range + 1
    },
    rangeEnd() {
      return parseInt(this.rangeMax) * (this.range + 1) < this.lastPage
        ? parseInt(this.rangeMax) * (this.range + 1)
        : this.lastPage
    },
    lastRange() {
      return parseInt(this.total) > 0
        ? Math.ceil(
          parseInt(this.total) /
          (parseInt(this.pageSize) * parseInt(this.rangeMax))
        ) : 0
    }
  },
  watch: {
    total() {
      this.init()
    },
    currentPage() {
      this.setRange()
    }
  },
  methods: {
    init() {
      this.range = 0
    },
    setRange() {
      this.range = Math.floor(
        (parseInt(this.currentPage) - 1) / parseInt(this.rangeMax)
      )
    },
    changePage(page) {
      this.$emit('update:currentPage', page)
      this.$emit('change', page)
    },
    changeRangePrev() {
      if (this.range > 0) {
        this.range -= 1
        this.$emit('update:currentPage', this.rangeStart)
        this.$emit('change', this.rangeStart)
      }
    },
    changeRangeNext() {
      if (this.range < this.lastRange - 1) {
        this.range += 1
        this.$emit('update:currentPage', this.rangeStart)
        this.$emit('change', this.rangeStart)
      }
    },
    changePageFirst() {
      this.range = 0
      this.$emit('update:currentPage', 1)
      this.$emit('change', 1)
    },
    changePageLast() {
      if (parseInt(this.total) > 0) {
        this.range = this.lastRange - 1
      } else {
        this.range = 0
      }
      this.$emit('update:currentPage', this.lastPage)
      this.$emit('change', this.lastPage)
    }
  }
}
</script>

<style lang="scss">

</style>
