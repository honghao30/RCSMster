<template>
  <div class="custom-textarea" v-click-outside="onClickOutside">
    <textarea
      @input="setText" class="input"
      @focus="isShow = true"
      row="1"
      :style="textStyle"
    ></textarea>
    <div class="style-picker" v-show="isShow" >
      <div class="style-picker__inner">
        <span class="custom-radio bold">
          <input type="checkbox" name="fontStyle" id="bold" class="blind" v-model="textBold"/>
          <label for="bold">가</label>
        </span>
        <span class="custom-radio align">
          <input type="radio" name="align" id="alignL" value="left" v-model="textAlignment"  class="blind"/>
          <label for="alignL"><i class="icon-align--left"></i><span class="irtext">좌측정렬</span></label>
        </span>
        <span class="custom-radio align">
          <input type="radio" name="align" id="alignR" value="right" v-model="textAlignment" class="blind" />
          <label for="alignR"><i class="icon-align--right"></i><span class="irtext">우측정렬</span></label>
        </span>
        <span class="custom-radio sml">
          <input type="radio" name="fontSize" id="smSize" value="14"
            v-model="textSize" class="blind"
          />
          <label for="smSize">가</label>
        </span>
        <span class="custom-radio mid">
          <input type="radio" name="fontSize" id="midSize" value="16"
          v-model="textSize" class="blind"
          />
          <label for="midSize">가</label>
        </span>
        <span class="custom-radio big">
          <input type="radio" name="fontSize" id="bigSize" value="18"
          v-model="textSize" class="blind"
          />
          <label for="bigSize">가</label>
        </span>
        <div class="color-palette" v-click-outside="onPaletteClickOutside">
          <span class="btn-font--color" :style="`color: ${textColor}`" @click="isShowPalette = !isShowPalette">가</span>
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
  created() {
    this.textStyle()
  },
  components: {
    Sketch
  },
  emits: [
    'update:modelValue'
  ],
  props: {
    value: String
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
