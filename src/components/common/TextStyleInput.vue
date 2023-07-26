<template>
  <div class="custom-textarea" v-click-outside="onClickOutside">
    <textarea
      v-model="info.text"
      class="input"
      @focus="isShow = true"
      row="1"
    ></textarea>
    <div class="style-picker" v-show="isShow" >
      <div class="style-picker__inner">
        <span class="custom-radio bold">
          <input type="checkbox" :name="`${index}_fontStyle`" :id="`${index}_bold`" class="blind" v-model="info.textBold" value="700"/>
          <label :for="`${index}_bold`">가</label>
        </span>
        <span class="custom-radio align">
          <input type="radio" :name="`${index}_align`" :id="`${index}_alignL`" value="left" v-model="info.textAlign" class="blind"/>
          <label :for="`${index}_alignL`"><i class="icon-align--left"></i><span class="irtext">좌측정렬</span></label>
        </span>
        <span class="custom-radio align">
          <input type="radio" :name="`${index}_align`" :id="`${index}_alignR`" value="right" v-model="info.textAlign" class="blind" />
          <label :for="`${index}_alignR`"><i class="icon-align--right"></i><span class="irtext">우측정렬</span></label>
        </span>
        <span class="custom-radio sml">
          <input type="radio" :name="`${index}_fontSize`" :id="`${index}_smSize`" value="14"
            v-model="info.textSize" class="blind"
          />
          <label :for="`${index}_smSize`">가</label>
        </span>
        <span class="custom-radio mid">
          <input type="radio" :name="`${index}_fontSize`" :id="`${index}_midSize`" value="16"
          v-model="info.textSize" class="blind"
          />
          <label :for="`${index}_midSize`">가</label>
        </span>
        <span class="custom-radio big">
          <input type="radio" :name="`${index}_fontSize`" :id="`${index}_bigSize`" value="18"
          v-model="info.textSize" class="blind"
          />
          <label :for="`${index}_bigSize`">가</label>
        </span>
        <div class="color-palette" v-click-outside="onPaletteClickOutside">
          <span class="btn-font--color" :style="`color: ${info.textColor}`" @click="isShowPalette = !isShowPalette">가</span>
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
      textColor: '',
      colors: ['#232323', '#404040', '#941527', '#b91724', '#bd462d', '#641432', '#c0537e', '#ac3f68', '#af6d4c', '#967240', '#583029', '#816d33', '#69692b', '#004326', '#155a10', '#3b7728', '#46804c', '#1a8b9e', '#1888c0', '#4483cf', '#0a386c', '#4d65cb', '#6264bb', '#665ba6', '#764f93', '#4e2d56', '#86487b', '#b85c9f', '#252525', '#58AEF2'],
      textColorSketch: '',
      isShow: false,
      isShowPalette: false
    }
  },
  components: {
    Sketch
  },
  props: {
    index: {
      type: String,
      default: 'textView'
    },
    info: {
      type: Object,
      default: () => {
        return {
          text: '',
          textAlign: 'left',
          textBold: '400',
          textColor: '#000000',
          textSize: '14'
        }
      }
    }
  },
  watch: {
    textColorSketch: {
      handler(val) {
        this.info.textColor = val.hex
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
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
