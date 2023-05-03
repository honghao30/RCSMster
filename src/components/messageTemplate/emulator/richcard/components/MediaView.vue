<template>
  <div class="template-richcard-mediaview">
    <!-- <img v-if="imageUrl === '' || imageError" src="../../../image/img_placeholder.png"> -->
    <img v-if="componentData.mediaUrl" :src="require('@/assets/images/emulator/' + componentData.mediaUrl)">
    <img v-else :src="require('@/assets/images/common/' + imgFile)" :style="{'height': imgHeight + 'px'}">
  </div>
</template>

<script>
import comlib from '../../../js/common'
import { getImageUrl } from '@/api/common/code'

const MAAPFILE_PREFIX = 'maapfile://'

export default {
  name: 'MediaView',
  props: {
    componentData: {
      type: Object,
      default() {
        return {
          mediaUrl: ''
        }
      }
    },
    cardType: {
      type: String,
      default: ''
    }
  },
  components: {},
  data() {
    return {
      imageUrl: '',
      imageError: false,
      imgFile: 'img_placeholder02.png',
      imgHeight: ''
    }
  },
  computed: {},
  watch: {
    componentData: {
      deep: true,
      handler(componentData) {
        this.init()
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      if (!this.componentData.mediaUrl) {
        this.getBaseSrc()
      }
      // this.getBaseSrc()
      // this.setImageUrl()
    },
    handleErrorImage(event) {
      this.imageError = true
    },
    setImageUrl() {
      let mediaUrl = this.componentData.mediaUrl
      if (comlib.isEmpty(mediaUrl)) {
        this.imageUrl = ''
      } else if (mediaUrl.startsWith(MAAPFILE_PREFIX)) {
        let fileId = mediaUrl.substring(
          mediaUrl.indexOf(MAAPFILE_PREFIX) + MAAPFILE_PREFIX.length
        )
        let params = {
          fileId: fileId,
          fileNo: '1'
        }
        getImageUrl(params).then(res => {
          this.imageUrl = res.downloadUrl
        })
      } else {
        this.imageUrl = mediaUrl
      }
    },
    getBaseSrc() {
      if (!comlib.isEmpty(this.componentData.height)) {
        let height = this.componentData.height
        if (this.cardType === 'SH') {
          this.imgFile = '256_528.jpg'
        } else if (this.cardType === 'CR') {
          if (height === 'TALL_HEIGHT') {
            this.imgFile = '464_528.jpg'
            this.imgHeight = 528 * 0.5
          } else if (height === 'MEDIUM_HEIGHT') {
            this.imgFile = '464_336.jpg'
            this.imgHeight = 336 * 0.5
          } else if (height === 'SHORT_HEIGHT') {
            this.imgFile = '464_224.jpg'
            this.imgHeight = 224 * 0.5
          }
        } else if (this.cardType === 'CS') {
          let height = this.componentData.height
          if (height === 'MEDIUM_HEIGHT') {
            this.imgFile = '240_336.jpg'
            this.imgHeight = 336 * 0.5
          } else if (height === 'SHORT_HEIGHT') {
            this.imgFile = '240_224.jpg'
            this.imgHeight = 224 * 0.5
          }
        } else if (this.cardType === 'SM') {
          let height = this.componentData.height
          if (height === 'TALL_HEIGHT') {
            this.imgFile = '568_528.jpg'
            this.imgHeight = 528 * 0.43
          } else if (height === 'MEDIUM_HEIGHT') {
            this.imgFile = '568_336.jpg'
            this.imgHeight = 336 * 0.43
          } else if (height === 'SHORT_HEIGHT') {
            this.imgFile = '568_224.jpg'
            this.imgHeight = 224 * 0.43
          }
        }
      }
    },
    reSize() {}
  }
}
</script>

<style>
</style>
