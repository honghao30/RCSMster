<template>
  <div class="template-openrichcard-imageview">
    <img v-if="imageUrl === '' || imageError" src="../../../image/img_placeholder.png">
    <img v-else :src="imageUrl" @error="handleErrorImage">
  </div>
</template>

<script>
import comlib from '../../../js/common'
import { getImageUrlEmulator } from '@/api/common/code'

const MAAPFILE_PREFIX = 'maapfile://'

export default {
  name: 'ImageView',
  components: {},
  props: {
    componentData: {
      type: Object,
      default() {
        return {
          mediaUrl: ''
        }
      }
    }
  },
  data() {
    return {
      imageError: false,
      imageUrl: ''
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
      this.$nextTick(() => {
        this.setImageUrl()
      })
    },
    handleErrorImage() {
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
        getImageUrlEmulator(params).then(res => {
          this.imageUrl = res.downloadUrl
        })
      } else {
        this.imageUrl = mediaUrl
      }
    }
  }
}
</script>

<style>
</style>
