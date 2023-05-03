<template>
  <div
    :class="kind ? 'block' : 'hidden'"
    :style="`z-index: ${zIndex};`"
    v-if="visible"
    class="layer"
  >
    <div class="layer_cont">
      <div class="layer_head">
        <slot name="header">
          <h2>{{title}}</h2>
        </slot>
      </div>
      <div class="layer_body">
        <scroll :settings="scrollSettings">
          <slot>
            <p>{{content}}</p>
          </slot>
        </scroll>
      </div>
      <div class="layer_foot">
        <!-- 동의 체크 박스가 있을 경우 아래 영역 노출 -->
        <div class="check_wrap" v-if="checkLabel">
          <span class="custom_checkbox">
            <input type="checkbox" id="checkbox01" v-model="checked">
            <label for="checkbox01">{{checkLabel}}</label>
          </span>
        </div>
        <slot name="checkMsg"></slot>
        <!--// -->
        <slot name="footer">
          <div class="btn_wrap center" v-if="yesBtn || noBtn">
            <button v-if="noBtn" @click="handleWrapperClick(kind)" class="btn sml bd_black type2">
              <span>{{noBtn}}</span>
            </button>
            <button v-if="yesBtn" @click="handleWrapperClick(kind, 'yes')" class="btn sml black" :class="{'disabled': disableBtn.yes }">
              <span>{{yesBtn}}</span>
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from 'vue-custom-scrollbar'

export default {
  name: 'CustomPopup',
  components: { Scroll },
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    title: {
      type: String,
      require: true
    },
    checkLabel: {
      type: String,
      require: true
    },
    searchProp: {
      type: Boolean,
      require: true,
      default: false
    },
    kind: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: false
    },
    widths: {
      type: Object,
      require: false,
      default() {
        return {
          widthLg: 'w-1/2',
          widthXl: 'w-2/5'
        }
      }
    },
    zIndex: {
      type: Number,
      require: false,
      default() {
        return 99999
      }
    },
    marginTop: {
      type: String,
      require: false,
      default() {
        return '40' // px 단위
      }
    },
    maxHeight: {
      type: String,
      require: false,
      default() {
        return '80' // px 단위
      }
    },
    boxPX: {
      type: String,
      require: false,
      default() {
        return 'px-4'
      }
    },
    boxPY: {
      type: String,
      require: false,
      default() {
        return 'py-8'
      }
    },
    uiframeBox: {
      type: Boolean,
      require: false,
      default: true
    },
    yesBtn: {
      type: String,
      require: false
    },
    noBtn: {
      type: String,
      require: false
    },
    close: Function,
    inBody: {
      type: Boolean,
      require: false,
      default: false
    },
    visibleScroll: {
      type: Boolean,
      default: true
    },
    disableBtn: {
      type: Object,
      require: false,
      default() {
        return {
          yes: false,
          no: false
        }
      }
    }
  },
  data() {
    return {
      contents: false,
      options: {},
      checked: true,
      scrollSettings: {
        suppressScrollY: false
      }
    }
  },
  created() {
    this.scrollOps()
  },
  mounted() {
    if (this.inBody) {
      document.body.appendChild(this.$el)
    }
  },
  methods: {
    handleWrapperClick(id, callback) {
      this.$emit('close', {
        id: id,
        ok: callback === 'yes'
      })
    },
    scrollOps() {
      this.scrollSettings.suppressScrollY = !this.visibleScroll
    }
  }
}
</script>

<style lang="less" scoped>
.block {
  animation: fadein 0.5s;
  -webkit-animation: fadein 0.5s;
  -ms-animation: fadein 0.5s;
}
.height_60 {
  height: 60px;
  padding-top: 10px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 1rem;
    width: calc(100% - 2rem);
    height: 1px;
    background: #eff3f6;
  }
}
.content_h {
  height: calc(100% - 50px);
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
