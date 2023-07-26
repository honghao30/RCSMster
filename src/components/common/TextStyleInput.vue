<template>
  <div class="custom-textarea" v-click-outside="onClickOutside">
    <input type="text"
      @input="setText" class="input"
      @focus="isShow = true"
      :style="textStyle"
    />
    <div class="style-picker" v-show="isShow" >
      <div class="style-picker__inner">
        <span class="custom-radio align">
          <input type="radio" name="align" :id="`alignL_${target}`" value="left" v-model="textAlignment"  class="blind"/>
          <label :for="`alignL_${target}`"><i class="icon-align--left"></i><span class="irtext">좌측정렬</span></label>
        </span>
        <span class="custom-radio align">
          <input type="radio" name="align" :id="`alignR_${target}`" value="right" v-model="textAlignment" class="blind" />
          <label :for="`alignR_${target}`"><i class="icon-align--right"></i><span class="irtext">우측정렬</span></label>
        </span>
        <span class="custom-radio bold">
          <input type="checkbox" name="fontStyle" :id="`bold_${target}`" class="blind" v-model="textBold"/>
          <label :for="`bold_${target}`">가</label>
        </span>
        <span class="custom-radio sml">
          <input type="radio" name="fontSize" :id="`smSize_${target}`" value="14"
            v-model="textSize" class="blind"
          />
          <label :for="`smSize_${target}`">가</label>
        </span>
        <span class="custom-radio mid">
          <input type="radio" name="fontSize" :id="`midSize_${target}`" value="16"
          v-model="textSize" class="blind"
          />
          <label :for="`midSize_${target}`">가</label>
        </span>
        <span class="custom-radio big">
          <input type="radio" name="fontSize" :id="`bigSize_${target}`" value="18"
          v-model="textSize" class="blind"
          />
          <label :for="`bigSize_${target}`">가</label>
        </span>
        <div class="color-palette" v-click-outside="onPaletteClickOutside">
          <div class="btn-font--color" :style="`color: ${textColor}`" :class="{'active' : textColor}" @click="isShowPalette = !isShowPalette"><em :style="`border-color: ${textColor}`">가</em></div>
          <div class="palette" v-if="isShowPalette" >
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
      inputText: '',
      textBold: false,
      textAlignment: 'textStart',
      textSize: 14,
      textColor: '',
      colors: ['#232323', '#404040', '#941527', '#b91724', '#bd462d', '#641432', '#c0537e', '#ac3f68', '#af6d4c', '#967240', '#583029', '#816d33', '#69692b', '#004326', '#155a10', '#3b7728', '#46804c', '#1a8b9e', '#1888c0', '#4483cf', '#0a386c', '#4d65cb', '#6264bb', '#665ba6', '#764f93', '#4e2d56', '#86487b', '#b85c9f', '#252525', '#58AEF2'],
      textColorSketch: '',
      isShow: false,
      isShowPalette: false
    }
  },
  computed: {
    textStyle() {
      let bold = '400'
      if (this.textBold) {
        bold = '700'
      }
      let style = {
        fontWeight: bold,
        textAlign: this.textAlignment,
        fontSize: `${this.textSize}px`,
        color: this.textColor
      }
      this.$emit('onSetStyle', style)
      return style
    }
  },
  components: {
    Sketch
  },
  emits: [
    'update:modelValue'
  ],
  props: {
    value: String,
    target: {
      type: String,
      default: ''
    }
  },
  watch: {
    textColorSketch(val) {
      this.textColor = val.hex
    }
  },
  methods: {
    setText(e) {
      this.$emit('input', e.target.value)
    },
    onClickOutside() {
      this.isShow = false
      this.isShowPalette = false
    },
    onPaletteClickOutside() {
      this.isShowPalette = false
    }
  }
}
</script>
