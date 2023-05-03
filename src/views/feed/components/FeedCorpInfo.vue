<template>
  <div>
    <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0300'" :depth2MenuId="this.depth2MenuId"/>
    </div>
    <div class="top_business_area">
        <div class="inner">
        <strong class="title">{{corpInfoData.name}}</strong>
        <div class="desc_area">
            <span>{{userInfoData.corpId}}</span>
            <span>{{ corpInfoData.aprvReqDt | prettyDate('YYYY-MM-DD') }}</span>
        </div>
        </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/global/Breadcrumb'

export default {
  name: 'FeedCorpInfo',
  props: {
    depth2MenuId: {
      type: String,
      default: ''
    },
    userInfoData: {
      type: Object
    },
    corpInfoData: {
      type: Object
    }
  },
  components: { Breadcrumb },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {

  }
}
</script>
<style>
</style>
