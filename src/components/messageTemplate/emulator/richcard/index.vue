<template>
  <div>
    <component :is="richcardType" :message="richcardMessage"></component>
  </div>
</template>

<script>
import RichCardGeneral from './RichCardGeneral.vue'
import RichCardHorizontal from './RichCardHorizontal.vue'
import RichCardHorizontalRight from './RichCardHorizontalRight.vue'
import RichCardCarousel from './RichCardCarousel.vue'
import comlib from '../../js/common'
export default {
  name: 'richcardEmulator',
  components: {
    general: RichCardGeneral,
    generalHorizontal: RichCardHorizontal,
    generalHorizontalRight: RichCardHorizontalRight,
    carousel: RichCardCarousel
  },
  props: {
    jsonData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    richcardType() {
      if (
        comlib.isEmpty(this.jsonData) ||
        comlib.isEmpty(this.jsonData.RCSMessage.richcardMessage) ||
        comlib.isEmpty(this.jsonData.RCSMessage.richcardMessage.message)
      ) {
        return ''
      }

      if (
        !this.jsonData.RCSMessage.richcardMessage.message.generalPurposeCard
      ) {
        return 'carousel'
      }

      if (
        this.jsonData.RCSMessage.richcardMessage.message.generalPurposeCard.layout.cardOrientation.toLowerCase() ===
        'horizontal'
      ) {
        if (
          this.jsonData.RCSMessage.richcardMessage.message.generalPurposeCard
            .layout.imageAlignment &&
          this.jsonData.RCSMessage.richcardMessage.message.generalPurposeCard.layout.imageAlignment.toLowerCase() ===
            'right'
        ) {
          return 'generalHorizontalRight'
        } else {
          return 'generalHorizontal'
        }
      } else {
        return 'general'
      }
    },
    richcardMessage() {
      if (
        comlib.isEmpty(this.jsonData) ||
        !this.jsonData.RCSMessage.richcardMessage.message
      ) {
        return undefined
      }
      return this.jsonData.RCSMessage.richcardMessage.message
    },
    isHorizontal() {
      if (
        comlib.isEmpty(this.message) ||
        comlib.isEmpty(this.message.generalPurposeCard) ||
        comlib.isEmpty(this.message.generalPurposeCard.layout) ||
        comlib.isEmpty(
          this.message.generalPurposeCard.layout.cardOrientation
        ) ||
        this.message.generalPurposeCard.layout.cardOrientation.toLowerCase() ===
          'vertical'
      ) {
        return false
      }

      return true
    }
  },
  watch: {
    jsonData() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {}
  }
}
</script>

<style>
</style>
