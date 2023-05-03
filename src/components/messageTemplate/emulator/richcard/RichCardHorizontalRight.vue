<template>
  <!-- Standalone Horizontal 가로형(Right) -->
  <div class="tempate-richcard-horizontal template-richcard-horizontal-right">
    <div class="template-richard-horizontal-warp">
      <title-view :componentData="title"/>
      <description-view :componentData="description"/>
    </div>
    <div class="template-richard-horizontal-warp template-richcard-imageview">
      <media-view :componentData="media" :cardType="'SH'"/>
    </div>
  </div>
</template>

<script>
import MediaView from './components/MediaView'
import TitleView from './components/TitleView'
import DescriptionView from './components/DescriptionView'
import comlib from '../../js/common'
export default {
  name: 'RichCardHorizontalRight',
  components: {
    MediaView,
    TitleView,
    DescriptionView
  },
  props: {
    message: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      sample: {
        mediaUrl: 'MMS_LeftRight_122x252.png',
        title: '구매 이벤트',
        description: '요금 걱정 없이 안심하고 이용할 수 있는 정액 상품'
      }
    }
  },
  computed: {
    title() {
      if (comlib.isEmpty(this.message) || comlib.isEmpty(this.message.generalPurposeCard.content) || comlib.isEmpty(this.message.generalPurposeCard.content.title)) {
        return ''
      }
      return this.sample.title
    },
    description() {
      if (comlib.isEmpty(this.message) || comlib.isEmpty(this.message.generalPurposeCard.content) || comlib.isEmpty(this.message.generalPurposeCard.content.description)) {
        return ''
      }
      return this.sample.description
    },
    media() {
      if (comlib.isEmpty(this.message) || comlib.isEmpty(this.message.generalPurposeCard.content) || comlib.isEmpty(this.message.generalPurposeCard.content.media)) {
        return {}
      }
      return this.sample
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
