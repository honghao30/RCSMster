<template>
  <div class="color-palette" v-click-outside="onPaletteClickOutside">
    <span class="btn-font--color" :style="`background-color: ${brandColor}`" @click="isShowPalette = !isShowPalette"></span>
    <div class="palette" v-if="isShowPalette" >
      <Sketch v-model="brandColorSketch" :preset-colors="colors" @input="colorChoose">
      </Sketch>
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    Sketch
  },
  props: {
    brandColor: String
  },
  data () {
    return {
      colors: [
        '#232323',
        '#404040', '#941527', '#b91724', '#bd462d',
        '#641432', '#c0537e', '#ac3f68', '#af6d4c',
        '#967240', '#583029', '#816d33', '#69692b',
        '#004326', '#155a10', '#3b7728', '#46804c',
        '#1a8b9e', '#1888c0', '#4483cf', '#0a386c',
        '#4d65cb', '#6264bb', '#665ba6', '#764f93',
        '#4e2d56', '#86487b', '#b85c9f', '#252525',
        '#58AEF2'
      ],
      brandColorSketch: '',
      isShow: false,
      isShowPalette: false
    }
  },
  watch: {
    brandColorSketch() {
      this.$emit('update:brandColor', this.brandColorSketch.hex)
    }
  },
  methods: {
    showPopup() {
      this.isShowPalette = true
    },
    onClickOutside() {
      this.isShow = false
      this.isShowPalette = false
    },
    onPaletteClickOutside() {
      this.isShowPalette = false
    },
    colorChoose() {
      this.$emit('colorChoose', this.brandColorSketch)
    }
  }
}
</script>

<style>

</style>
