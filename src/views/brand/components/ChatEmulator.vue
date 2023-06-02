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
            <p :class="{name: true, short: isShort}"><span v-if="chatName !== ''">{{ chatName }}</span><span v-else>대화방 명</span></p>
            <button class="btn-down" :class="{open: isOpen}" @click="btnToggle"></button>
          </div>
        </div>
        <button class="btn-more" :class="{open: isBlind}"><span class="blind">정보</span></button>
      </div>
      <div class="emulator-body">
        <template v-if="showChatWelcome">
          <p class="chat-date">{{ todayData }}</p>
          <p class="safty-icon" v-if="showSaftyMark">확인된 발신번호</p>
          <div class="chat-bubble__wrap sender">
            <div class="chat-bubble">
              <p>{{ chatName }} 가입을 환영합니다.<br>더 풍부해진 문자서비스를 지금 만나보세요!</p>
            </div>
            <span class="chat-time">{{ currentTime }}</span>
          </div>
        </template>
        <!-- <div class="chat-bubble__wrap receiver">
          <div class="chat-bubble">
            <p>가입을 환영합니다.<br>더 풍부해진 문자서비스를 지금 만나보세요!</p>
          </div>
          <span class="chat-time">오후 5:22</span>
        </div> -->
        <!-- carousel case -->
        <!-- <div class="chat-bubble__wrap carousel">
          <swiper
            ref="carousel"
            :options="swiperOption"
          >
            <swiper-slide>
              <div class="chat-bubble">
                <p>가입을 환영합니다.<br>더 풍부해진 문자서비스를 지금 만나보세요!</p>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="chat-bubble">
                <p>가입을 환영합니다.<br>더 풍부해진 문자서비스를 지금 만나보세요!</p>
              </div>
            </swiper-slide>
          </swiper>
        </div> -->
      </div>
      <div class="emulator-footer">
        <div class="emulator-footer__inner" v-if="defautFooter">
          <div class="emulator-footer__allow-input">
            <button class="btn-photo" disabled><span class="blind">사진</span></button>
            <button class="btn-camera" disabled><span class="blind">카메라</span></button>
            <button class="btn-plus" disabled><span class="blind">더보기</span></button>
            <span class="input">
              <input type="text" />
              <button class="btn-emoji"></button>
            </span>
          </div>
        </div>
        <!-- 메시지 입력 불가로 선택시 -->
        <div class="emulator-footer__inner chat-dissable" v-else>
          <div class="emulator-footer__top">
            <ButtonCmp
              type="btn-bar-toggle"
            >
              <span class="irtext">토글</span>
            </ButtonCmp>
            <p class="contac-msg"><router-link to="#">😍 상담직원 연결 👌🏻</router-link></p>
          </div>
          <div class="form-item__content">
            <span class="input">
              <input type="text" disabled placeholder="입력할 수 없는 대화방 입니다."/>
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
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    ButtonCmp
    // Swiper,
    // SwiperSlide
  },
  props: {
    saftyMark: String,
    allowMsg: {
      type: String,
      default: 'Y'
    },
    chatName: {
      type: String
    }
  },
  data () {
    return {
      chatbot: {
        inputFileldYn: true
      },
      todayDateFull: '',
      todayData: '',
      currentTime: '',
      isOpen: false,
      isBlind: false,
      isShort: true
    }
  },
  mounted() {
    [this.todayDateFull, this.todayData, this.currentTime] = getTodayDate()
  },
  computed: {
    showSaftyMark() {
      return this.saftyMark === 'Y'
    },
    defautFooter() {
      return this.allowMsg === 'Y'
    },
    showChatWelcome() {
      return this.chatName !== ''
    }
  },
  watch: {
    showSaftyMark(newValue) {
      // update DOM here
    },
    defautFooter(newValue) {
      // update DOM here
    }
  },
  methods: {
    btnToggle () {
      this.isOpen = !this.isOpen
      this.isBlind = !this.isBlind
      this.isShort = !this.isShort
    }
  }
}
</script>
<style>
@import '/swiper/css/swiper.css';
</style>
