<template>
  <span class="custom_textarea max_h67" tabindex="-1" style="outline: none" ref="cellInput" v-click-outside-app="blur">
    <textarea onkeydown="resizeCellInput(this)" :id="index" ref="input" onkeyup="resizeCellInput(this)" @input="setText" v-model="cellData.text" placeholder="text입력" @focus="showStyle = true" :readonly="tplBizSrv == '' && cardTheme !== 'TA'"></textarea>
    <div class="color_picker_wrap" v-show="showStyle" tabindex="-1" ref="cellOptions" v-if="tplBizSrv != ''">
      <div class="inner">
        <span class="custom_checkbox bold" @mousedown.prevent="setBold">
          <input type="checkbox" :id="`${index}_bold`" v-model="isBold">
          <label :for="`${index}_bold`">가</label>
        </span>
        <!-- <span class="custom_checkbox italic" @mousedown.prevent="setItalic">
          <input type="checkbox" :id="`${index}_italic`" v-model="isItalic">
          <label :for="`${index}_italic`">가</label>
        </span> -->
        <span class="custom_radio alginL" @mousedown.prevent="setAlign('textStart')">
          <input type="radio" :name="`${index}_align`" :id="`${index}_alignL`" v-model="cellData.textAlignment" value="textStart">
          <label :for="`${index}_alignL`"></label>
        </span>
        <span class="custom_radio alginR" @mousedown.prevent="setAlign('textEnd')">
          <input type="radio" :name="`${index}_align`" :id="`${index}_alignR`" v-model="cellData.textAlignment" value="textEnd">
          <label :for="`${index}_alignR`"></label>
        </span>
        <div class="box_radio_size">
          <span class="custom_radio sml" @mousedown.prevent="setTextSize('14dp')">
            <input type="radio" :name="`${index}_size`" :id="`${index}_size01`" v-model="cellData.textSize" value="14dp">
            <label :for="`${index}_size01`">가</label>
          </span>
          <span class="custom_radio mid" @mousedown.prevent="setTextSize('16dp')">
            <input type="radio" :name="`${index}_size`" :id="`${index}_size02`" v-model="cellData.textSize" value="16dp">
            <label :for="`${index}_size02`">가</label>
          </span>
          <span class="custom_radio big" @mousedown.prevent="setTextSize('18dp')">
            <input type="radio" :name="`${index}_size`" :id="`${index}_size03`" v-model="cellData.textSize" value="18dp">
            <label :for="`${index}_size03`">가</label>
          </span>
        </div>
        <div class="box_palette">
          <span ref="buttonTextColor" class="btn_color cursor-pointer" :class="textColorId" @mousedown.prevent="showColor = !showColor">가</span>
          <div class="palette" v-if="showColor" ref="palette" tabindex="-1">
            <Sketch v-model='textColorSketch' :preset-colors="colors"/>
            <!-- <ul>
              <li v-for="color in colors" :key="color.id">
                <span class="custom_radio palette" :class="color.id" @mousedown.prevent="setColor(color.color)">
                  <input ref="paletteColors" type="radio" name="palette" :id="color.id" v-model="textColor" :value="color.color">
                  <label :for="color.id" :data-color="color.color" @click.prevent>{{ color.color }}</label>
                </span>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
// import { Chrome, Sketch } from 'vue-color'
import { Sketch } from 'vue-color'

let colors = [
  '#232323',
  '#404040', '#941527', '#b91724', '#bd462d',
  '#641432', '#c0537e', '#ac3f68', '#af6d4c',
  '#967240', '#583029', '#816d33', '#69692b',
  '#004326', '#155a10', '#3b7728', '#46804c',
  '#1a8b9e', '#1888c0', '#4483cf', '#0a386c',
  '#4d65cb', '#6264bb', '#665ba6', '#764f93',
  '#4e2d56', '#86487b', '#b85c9f', '#252525',
  '#58AEF2'
]
// let colors = [
//   { id: 'list00', color: '#404040' }, { id: 'list01', color: '#941527' }, { id: 'list02', color: '#b91724' }, { id: 'list03', color: '#bd462d' },
//   { id: 'list04', color: '#641432' }, { id: 'list05', color: '#c0537e' }, { id: 'list06', color: '#ac3f68' }, { id: 'list07', color: '#af6d4c' },
//   { id: 'list08', color: '#967240' }, { id: 'list09', color: '#583029' }, { id: 'list10', color: '#816d33' }, { id: 'list11', color: '#69692b' },
//   { id: 'list12', color: '#004326' }, { id: 'list13', color: '#155a10' }, { id: 'list14', color: '#3b7728' }, { id: 'list15', color: '#46804c' },
//   { id: 'list16', color: '#1a8b9e' }, { id: 'list17', color: '#1888c0' }, { id: 'list18', color: '#4483cf' }, { id: 'list19', color: '#0a386c' },
//   { id: 'list20', color: '#4d65cb' }, { id: 'list21', color: '#6264bb' }, { id: 'list22', color: '#665ba6' }, { id: 'list23', color: '#764f93' },
//   { id: 'list24', color: '#4e2d56' }, { id: 'list25', color: '#86487b' }, { id: 'list26', color: '#b85c9f' }, { id: 'list27', color: '#252525' }
// ]
export default {
  name: 'MessageBaseCellInput',
  components: {
    // Chrome,
    Sketch
  },
  props: {
    index: {
      type: String,
      default: 'textView'
    },
    cellData: {
      type: Object
    },
    tplBizSrv: {
      type: String
    },
    cardTheme: {
      type: String
    }
  },
  data() {
    return {
      colors: [],
      textColorSketch: '',
      textColor: '',
      view: {
        visiablePalette: false,
        visibleCellOptions: false
      },
      focus: {
        input: false,
        options: false
      },
      isBold: false,
      isItalic: false,
      showStyle: false,
      showColor: false
    }
  },
  directives: {
    'click-outside-app': {
      bind: function(el, binding) {
        // Define ourClickEventHandler
        const ourClickEventHandler = event => {
          if (!el.contains(event.target) && el !== event.target) {
            // as we are attaching an click event listern to the document (below)
            // ensure the events target is outside the element or a child of it
            binding.value(event) // before binding it
          }
        }
        // attached the handler to the element so we can remove it later easily
        el.__vueClickEventHandler__ = ourClickEventHandler

        // attaching ourClickEventHandler to a listener on the document here
        document.addEventListener('click', ourClickEventHandler)
      },
      unbind: function(el) {
        // Remove Event Listener
        document.removeEventListener('click', el.__vueClickEventHandler__)
      }
    }
  },
  computed: {
    textColorId() {
      const filtered = this.colors.filter(c => {
        return c.color === this.textColor
      })
      if (filtered && filtered.length > 0) {
        return filtered[0].id
      } else {
        return this.colors[0].id
      }
    },
    isFocus() {
      return this.focus.input || this.focus.options
    }
  },
  watch: {
    tplBizSrv(string) {
      this.$nextTick().then(() => {
        this.isBold = false
        this.isItalic = false
        this.textColor = ''
      })
    },
    textColorSketch() {
      this.textColor = this.textColorSketch.hex
      this.cellData.textColor = this.textColorSketch.hex
      // this.showColor = false
    },
    // 'cellData.textStyle': {
    //   deep: true,
    //   handler() {
    //     this.setTextStyleView()
    //   }
    // },
    // textColor(value) {
    //   this.cellData.textColor = value
    //   this.setVisiblePalette(false)
    // },
    isBold(value) {
      this.setBold(value)
    }
    // isItalic(value) {
    //   this.setItalic(value)
    // }
  },
  created() {
    this.colors = colors
    this.textColor = this.cellData.textColor
    this.setTextStyleView()
  },
  mounted() {},
  methods: {
    allowed(type) {
      if (this.cellData.widgetPolicy && this.cellData.widgetPolicy.allowedAttributes) {
        if (type) {
          return this.cellData.widgetPolicy.allowedAttributes.includes(type)
        }
        return this.cellData.widgetPolicy.allowedAttributes.length > 0
      }
      return false
    },
    blur() {
      this.showStyle = false
      this.showColor = false
    },
    // toggleVisiblePalette() {
    //   let flag = !this.view.visiablePalette
    //   this.setVisiblePalette(flag)
    // },
    // setVisiblePalette(flag) {
    //   this.view.visiablePalette = flag
    //   if (flag) {
    //     this.$nextTick(() => {
    //       this.$refs.palette.focus()
    //     })
    //   } else {
    //     this.$nextTick(() => {
    //       this.$refs.cellOptions.focus()
    //       this.setFocusElement('options', false)
    //     })
    //   }
    // },
    // setFocusElement(el, flag) {
    //   this.focus[el] = flag
    // },
    setText() {
      this.cellData.text = document.getElementById(this.index).value
    },
    setFocus() {
      this.$refs.input.focus()
    },
    setTextStyleView() {
      if (!this.cellData.textStyle) {
        this.cellData.textStyle = ''
      }
      let textStyle = this.cellData.textStyle
      if (textStyle.indexOf('bold') > -1) {
        this.isBold = true
      } else {
        this.isBold = false
      }
      if (textStyle.indexOf('italic') > -1) {
        this.isItalic = true
      } else {
        this.isItalic = false
      }
    },
    setColor(color) {
      this.textColor = color
      this.cellData.textColor = color
      this.showColor = false
    },
    setBold() {
      if (!this.isBold) {
        this.removeTextStyle('bold')
      } else {
        this.setTextStyle('bold')
      }
    },
    setItalic() {
      if (this.isItalic) {
        this.removeTextStyle('italic')
      } else {
        this.setTextStyle('italic')
      }
    },
    setAlign(style) {
      this.cellData.textAlignment = style
    },
    setTextSize(size) {
      this.cellData.textSize = size
    },
    setTextStyle(style) {
      if (!this.cellData.textStyle) {
        this.cellData.textStyle = ''
      }
      let textStyle = this.cellData.textStyle
      let delimiter = '|'

      if (textStyle.length === 0) {
        textStyle = style
      } else {
        let ts = textStyle.split(delimiter)
        if (ts.indexOf(style) === -1) {
          ts.push(style)
        }
        textStyle = ts.join(delimiter)
      }
      this.cellData.textStyle = textStyle
    },
    removeTextStyle(style) {
      if (!this.cellData.textStyle) {
        this.cellData.textStyle = ''
      }
      let textStyle = this.cellData.textStyle
      let delimiter = '|'
      if (textStyle.length > 0) {
        let ts = textStyle.split(delimiter)
        if (ts.indexOf(style) > -1) {
          ts.splice(ts.indexOf(style), 1)
          textStyle = ts.join(delimiter)
        }
      }
      this.cellData.textStyle = textStyle
    }
  },
  beforeDestroy() {}
}
window.resizeCellInput = function(obj) {
  obj.style.height = '0px'
  obj.style.height = 2 + obj.scrollHeight + 'px'
}
</script>

<style>
.color_picker_wrap:focus,
.palette:focus {
  outline: 0;
}
.picker {
  display: inline-block;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(3, 1, 1, 0.08);
}
</style>
