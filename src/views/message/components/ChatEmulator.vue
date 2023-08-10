<template>
  <div class="chat-emulator__wrap">
    <div class="chat-emulator layout">
      <div class="emulator-header">
        <div class="emulator-header__inner">
          <button class="btn-back"><span class="blind">이전으로</span></button>
          <div class="profile">
            <div class="profile__image">
              <img src="@/assets/images/dummy/brand_logo.png" alt="">
            </div>
            <p>대화방 명</p>
            <button class="btn-down"></button>
          </div>
        </div>
        <button class="btn-more"><span class="blind">정보</span></button>
      </div>
      <div class="emulator-body">
        <div class="chat-item__wrap">
          <div class="chat-time">{{ currentTime }}</div>
          <div class="safty-icon-wrap">[WEB발신]<span class="safty-icon">확인된 발신번호</span></div>
          <div class="message-box">
            <TemplateItem
              :infoData="templateData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { getTodayDate } from '@/utils/time.js'
// import draggable from 'vuedraggable'
import TemplateItem from '@/views/brand/message/components/TemplateItem.vue'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    ButtonCmp,
    TemplateItem,
    // draggable
  },
  props: {
    templateData: {
      type: Array,
      default: null
    },
    templateType: {
      type: String,
      defalut: ''
    }
  },
  data () {
    return {
      chatMenuList: [{
        menuTitle: '😍 상담직원 연결 👌🏻'
      }],
      todayDateFull: '',
      todayData: '',
      currentTime: '',
      isOpen: false,
      isBlind: false,
      isShort: true,
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 'auto'
      },
      collapse: false,
      isShowLayerIndex: undefined,
      isCmpEdit: false
    }
  },
  mounted() {
    [this.todayDateFull, this.todayData, this.currentTime] = getTodayDate()
    console.log('체크1', this.viewMode)
  },
  methods: {
    btnToggleMenu () {
      this.collapse = !this.collapse
    },
    showLayerMenu(idx) {
      if (this.isShowLayerIndex !== idx) {
        this.isShowLayerIndex = idx
      } else {
        this.isShowLayerIndex = undefined
      }
    },
    removeCmp(idx) {
      let cmpItem = {
        type: '',
        info: {}
      }
      this.templateData.splice(idx, 1, cmpItem)
    },
    onClickOutside() {
      this.isShowLayerIndex = undefined
    },
    onEditComp() {
      this.isCmpEdit = !this.isCmpEdit
      this.templateData.every((item, i) => {
        if (!item.type) {
          this.isActiveCmpIndex = i
          return false
        } else {
          return true
        }
      })
      this.$emit('setActiveCmp', this.isActiveCmpIndex)
    }
  }
}
</script>
