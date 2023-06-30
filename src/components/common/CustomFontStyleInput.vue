<template>
  <div class="custom-textarea" v-click-outside="onClickOutside">
    <textarea
      @input="textValue" class="input"
      @focus="isShow = true"
      row="1"
      ></textarea>
    <div class="style-picker" v-show="isShow">
      <div class="style-picker__inner">
        <span class="custom-radio bold">
          <input type="checkbox" name="fontStyle" id="bold" class="blind" v-model="textBold"/>
          <label for="bold">가</label>
        </span>
        <span class="custom-radio align">
          <input type="radio" name="align" id="alignL" value="textStart" v-model="textAlignment"  class="blind"/>
          <label for="alignL"><i class="icon-align--left"></i><span class="irtext">좌측정렬</span></label>
        </span>
        <span class="custom-radio align">
          <input type="radio" name="align" id="alignR" value="textEnd" v-model="textAlignment" class="blind"/>
          <label for="alignR"><i class="icon-align--right"></i><span class="irtext">우측정렬</span></label>
        </span>
        <span class="custom-radio sml">
          <input type="radio" name="fontSize" id="smSize" value="14dp"
            v-model="textSize" class="blind"
          />
          <label for="smSize">가</label>
        </span>
        <span class="custom-radio mid">
          <input type="radio" name="fontSize" id="midSize" value="16dp"
          v-model="textSize" class="blind"
          />
          <label for="midSize">가</label>
        </span>
        <span class="custom-radio big">
          <input type="radio" name="fontSize" id="bigSize" value="18dp"
          v-model="textSize" class="blind"
          />
          <label for="bigSize">가</label>
        </span>
        <div class="color-palette">
          <span class="btn-font--color" :style="`color: ${textColor}`" @click="isShowPalette = !isShowPalette">가</span>
          <div class="palette" v-if="isShowPalette">
            <Sketch v-model="textColorSketch" :preset-colors="colors">
            </Sketch>
          </div>
        </div>
      </div>
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
  data() {
    return {
      colors: ['#232323', '#404040', '#941527', '#b91724', '#bd462d', '#641432', '#c0537e', '#ac3f68', '#af6d4c', '#967240', '#583029', '#816d33', '#69692b', '#004326', '#155a10', '#3b7728', '#46804c', '#1a8b9e', '#1888c0', '#4483cf', '#0a386c', '#4d65cb', '#6264bb', '#665ba6', '#764f93', '#4e2d56', '#86487b', '#b85c9f', '#252525', '#58AEF2'],
      inputText: '',
      textBold: false,
      textColor: '',
      textColorSketch: '',
      textAlignment: '',
      textSize: '',
      isShow: false,
      isShowPalette: false
    }
  },
  components: {
    Sketch
  },
  props: {
    value: String
  },
  emits: [
    'update:modelValue'
  ],
  watch: {
    textColorSketch() {
      this.textColor = this.textColorSketch.hex
    }
  },
  methods: {
    onClickOutside() {
      this.isShow = false
      this.isShowPalette = false
    },
    textValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>

</style>
