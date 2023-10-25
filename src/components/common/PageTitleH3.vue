<template>
  <div class="page-title__wrap">
    <h3>
      {{ titleh3 }}<span v-if="totalCount !== null">({{ totalCount }})</span>
    </h3>
    <p v-if="noticeinfo !== null">
      {{ noticeinfo }}
    </p>
    <Dropdown
      v-if="DropData !== null"
      :options="DropData"/>
<!--    <Dropdown searchable
      v-if="DropDataSearchable !== null"
      :options="DropDataSearchable"/>-->
</div>
</template>

<script>
import Dropdown from '@/components/common/Dropdown.vue'

export default {
  components: {
    Dropdown
  },
  props: {
    titleh3: String,
    noticeinfo: {
      type: String,
      default: null
    },
    totalCount: {
      type: Number,
      default: null
    },
    DropData: {
      type: Array,
      default: null
    },
    DropDataSearchable: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss">

</style>
