<template>
   <div class="pager">
      <span class="num">{{currentPage}}/{{totalPage}}</span>
      <a role="button" class="btn-prev" @click="prev"><span class="blind">이전으로</span></a>
      <a role="button" class="btn-next" @click="next"><span class="blind">다음으로</span></a>
    </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    ButtonCmp
  },
  props: {
    total: {
      type: [Number, String],
      default: 0
    },
    pageSize: {
      type: [Number, String],
      default: 5
    },
    currentPage: {
      type: [Number, String],
      default: 1
    }
  },
  created() {},
  mounted() {},
  computed: {
    totalPage() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.total / this.pageSize) < 1 ? 1 : Math.ceil(this.total / this.pageSize)
    }
  },
  watch: {},
  methods: {
    prev () {
      if (this.currentPage === 1) {
        return false
      }
      this.changePage(-1)
    },
    next () {
      if (this.currentPage === this.totalPage) {
        return false
      }
      this.changePage(1)
    },
    changePage(page) {
      this.$emit('change', page)
    }
  }
}
</script>

<style>

</style>
