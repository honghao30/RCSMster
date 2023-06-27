<template>
  <div class="chat-emulator__wrap">
    <div class="chat-emulator">
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
        <transition name="bodyshow">
          <div class="chat-item__wrap">
            <p class="safty-icon">확인된 발신번호</p>
            <div class="message-box">
              <TemplateItem
                :templateData="messageTemplate"
                mode="msgOnly"
              />
            </div>
          </div>
        </transition>
      </div>
      <div class="emulator-footer">
        <div class="emulator-footer__inner">
          <div class="emulator-footer__top">
            <ButtonCmp
              type="btn-bar-toggle"
              @click="btnToggleMenu"
            >
              <span class="irtext">토글</span>
            </ButtonCmp>
            <ul class="chat-menu__list-inemul"
              :class="{ collapse : collapse }"
            >
              <li
                v-for="list in chatMenuList"
                :key="list"
              >
                <router-link to="#">{{ list.menuTitle }}</router-link>
              </li>
            </ul>
          </div>
          <div class="emulator-footer__allow-input">
            <ButtonCmp
              type="btn-only-icon"
              iconname='icon-photo'
              disabled
            ><span class="irtext">사진</span>
            </ButtonCmp>
            <ButtonCmp
              type="btn-only-icon"
              iconname='icon-camera'
              disabled
            ><span class="irtext">카메라</span>
            </ButtonCmp>
            <ButtonCmp
              type="btn-only-icon"
              iconname='icon-plus'
              disabled
            > <span class="irtext">더보기</span>
            </ButtonCmp>
            <span class="input">
              <input type="text" />
              <ButtonCmp
                type="btn-only-icon"
                iconname='icon-emoji'
                disabled
              > <span class="irtext">더보기</span>
              </ButtonCmp>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { getTodayDate } from '@/utils/time.js'
import TemplateItem from '@/views/brand/message/components/TemplateItem.vue'

export default {
  components: {
    ButtonCmp,
    TemplateItem
  },
  props: {
    messageTemplate: {
      type: Array,
      default: null
    },
    messageData: {
      type: Object,
      default: null
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
      collapse: false
    }
  },
  mounted() {
    [this.todayDateFull, this.todayData, this.currentTime] = getTodayDate()
  },
  methods: {
    btnToggleMenu () {
      this.collapse = !this.collapse
    }
  }
}
</script>
