<template>
  <div class="custom-textarea" v-click-outside="onClickOutside">
    <div class="emoji-table">
      <Emoji @input="onSelectEmoji($event, cellBindType, `${index}`)" />
      <textarea
        @input="inputTableCell($event)"
        :ref='`${index}`'
        v-model="info.text"
        @change="textFind()"
        class="input"
        @focus="isShow = true"
        :row="`${index}`"
        rows="1"
        onkeydown="resizeCellInput(this)"
        onkeyup="resizeCellInput(this)"
        placeholder="내용 입력해 주세요."
      >
      </textarea>
    </div>
    <div class="style-picker" v-show="isStyleTable && isShow" :class="{'simple': type === 'simple'}">
      <div class="style-picker__inner">
        <span class="custom-radio align">
          <input type="radio" :name="`${index}_align`" :id="`${index}_alignL`" value="left" v-model="info.textAlign" class="blind"/>
          <label :for="`${index}_alignL`"><i class="icon-align--left"></i><span class="irtext">좌측정렬</span></label>
        </span>
        <span class="custom-radio align">
          <input type="radio" :name="`${index}_align`" :id="`${index}_alignR`" value="right" v-model="info.textAlign" class="blind" />
          <label :for="`${index}_alignR`"><i class="icon-align--right"></i><span class="irtext">우측정렬</span></label>
        </span>
        <span class="custom-radio sml" v-if="type !== 'simple'">
          <input type="radio" :name="`${index}_fontSize`" :id="`${index}_smSize`" value="14"
            v-model="info.textSize" class="blind"
          />
          <label :for="`${index}_smSize`">가</label>
        </span>
        <span class="custom-radio mid" v-if="type !== 'simple'">
          <input type="radio" :name="`${index}_fontSize`" :id="`${index}_midSize`" value="16"
          v-model="info.textSize" class="blind"
          />
          <label :for="`${index}_midSize`" >가</label>
        </span>
        <span class="custom-radio big" v-if="type !== 'simple'">
          <input type="radio" :name="`${index}_fontSize`" :id="`${index}_bigSize`" value="18"
          v-model="info.textSize" class="blind"
          />
          <label :for="`${index}_bigSize`">가</label>
        </span>
        <span class="custom-radio bold">
          <input type="checkbox" :name="`${index}_fontStyle`" :id="`${index}_bold`" class="blind" v-model="info.textBold" value="700"/>
          <label :for="`${index}_bold`">가</label>
        </span>
        <!-- 테이블 글자색 -->
        <div class="color-palette" v-click-outside="onPaletteClickOutside">
          <span class="btn-font--color" :style="`background-color: ${info.textColor}`" @click="isShowPalette = !isShowPalette"></span>
          <div class="palette" v-if="isShowPalette" >
            <Sketch v-model="textColorSketch" :preset-colors="colors">
            </Sketch>
          </div>
        </div>

        <div class="color-palette" v-if='this.brandColor && this.brandColor !== "#E4E4E4"'>
          <span class='btn-font--color' :style='`background-color:${this.brandColor}`' @click='setBrandColor'></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'
import vClickOutside from 'v-click-outside'
import Emoji from '@/components/common/Emoji.vue'
import componentUtilsV2 from '../../views/brand/message/utils/js/componentUtilsV2'

export default {
  components: {
    Emoji,
    Sketch
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      colors: ['#232323', '#404040', '#941527', '#b91724', '#bd462d', '#641432', '#c0537e', '#ac3f68', '#af6d4c', '#967240', '#583029', '#816d33', '#69692b', '#004326', '#155a10', '#3b7728', '#46804c', '#1a8b9e', '#1888c0', '#4483cf', '#0a386c', '#4d65cb', '#6264bb', '#665ba6', '#764f93', '#4e2d56', '#86487b', '#b85c9f', '#252525', '#58AEF2'],
      textColorSketch: '',
      isShow: false,
      isShowPalette: false
    }
  },
  props: {
    isStyleTable: {
      type: Boolean,
      default: true
    },
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
    },
    type: {
      type: String,
      default: null
    },
    cellBindType: {
      type: String,
      default: null
    },
    brandColor: {
      type: String,
      default: () => {
        return '#E4E4E4'
      }
    }
  },
  watch: {
    textColorSketch: {
      handler(val) {
        if (val) {
          this.info.textColor = val.hex
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onSelectEmoji(e, target, refName) {
      console.log('emit onSelectEmoji(TextInput)', e, target, refName)
      this.$emit('onSelectEmoji', e, target, this.$refs[refName])
    },
    onClickOutside() {
      this.isShow = false
      this.isShowPalette = false
    },
    onPaletteClickOutside() {
      this.isShowPalette = false
    },
    textFind() {
      console.log(this.info.text)
    },
    inputTableCell(e) {
      this.$emit('inputTableCell', e)
    },
    setBrandColor() {
      console.log('setBrandColor', this.brandColor)
      this.$set(this.info, 'textColor', this.brandColor)
    }
  }
}
window.resizeCellInput = function(obj) {
  obj.style.height = '0px'
  obj.style.height = 2 + obj.scrollHeight + 'px'
  if (obj.value === '') {
    obj.style.height = '36px'
  }
}
</script>
