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
            <p :class="{name: true, short: isShort}"><span v-if="chatInfoData.subTitle">{{ chatInfoData.subTitle }}</span><span v-else>대화방 명</span></p>
            <button class="btn-down" :class="{open: isOpen}" @click="btnToggle"></button>
          </div>
        </div>
        <button class="btn-more" :class="{open: isBlind}"><span class="blind">정보</span></button>
      </div>
      <div class="emulator-body" v-if="chatInfoData.mode !== 'registration'">
        <transition name="bodyshow">
          <template v-if="chatInfoData.subTitle">
            <div class="chat-item__wrap">
              <p class="chat-date">{{ todayData }}</p>
              <p class="safty-icon" v-if="chatInfoData.saftyStatus == 'SET'">확인된 발신번호</p>
              <div class="chat-bubble__wrap sender">
                <!-- <div class="chat-bubble">
                  <p>문의사항이 있으시다면 채팅방에 문의 내용과 성함/연락처를 남겨주세요.<br>
                    {{ chatInfoData.subTitle }}의 MD팀이 최대한 빠르게 답변 드리도록 하겠습니다!
                  </p>
                </div> -->
                <div class="chat-bubble">
                  <p>{{ chatInfoData.subTitle }} 가입을 환영합니다.<br>더 풍부해진 문자서비스를 지금 만나보세요!</p>
                </div>
                <span class="chat-time">{{ currentTime }}</span>
              </div>
            </div>
          </template>
        </transition>
      </div>
      <div class="emulator-body" v-else>
        <div class="chat-item__wrap">
          <p class="safty-icon" v-if="chatInfoData.saftyMark == 'Y'">확인된 발신번호</p>
          <div class="chat-bubble__wrap sender" v-if="chatMsgData.chatType == 'chatBubble'">
            <div class="chat-bubble message">
              <p v-if="!chatMsgData.bubbleContent">내용을 입력해주세요.</p>
              <p v-else>{{ chatMsgData.bubbleContent }}</p>
            </div>
          </div>
          <div class="chat-bubble__wrap carousel"  v-if="chatMsgData.chatType == 'card'">
            <swiper
              ref="carousel"
              :options="swiperOption"
              :class="{'inactive': chatMsgData.msgData.length < 2}"
            >
              <swiper-slide v-for="(msg, i) in chatMsgData.msgData" :key="i">
                <div class="chat-bubble">
                  <div
                    v-if="msg.imgFile" class="image-area"
                    :class="{'full' : chatMsgData.imgSize == 'full'}"
                  >
                    <span class="image" :style="{backgroundImage: `url(${require('@/assets/images/'+ msg.imgFile)})`}"></span>
                  </div>

                  <div class="item--none" v-else>
                    <p class="img">이미지를 등록해주세요.</p>
                  </div>
                  <div class="text-area" v-if="msg.title || msg.cardContent">
                    <p class="msg-title">{{ msg.title }}</p>
                    <p class="msg-text">{{ msg.cardContent }}</p>
                  </div>
                  <div class="btn-area"
                    v-if="msg.buttons[0].btnName"
                    :class="{'column' : msg.btnDirection === 'column'}"
                  >
                    <template v-for="(btn, k) in msg.buttons" >
                      <a href="" :key="k" v-if="k < 2 && btn.btnName">{{ btn.btnName }}</a>
                    </template>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <ul class="chip-buttons" v-if="chatMsgData.chipButtons[0].btnName">
            <li v-for="(btn, j) in chatMsgData.chipButtons" :key="btn">
              <a href="" v-if="j < 2 && btn.btnName">{{ btn.btnName }}</a>
            </li>
          </ul>
        </div>
          <!-- <div class="chat-bubble__wrap receiver">
            <div class="chat-bubble">
              <p>가입을 환영합니다.<br>더 풍부해진 문자서비스를 지금 만나보세요!</p>
            </div>
            <span class="chat-time">오후 5:22</span>
          </div> -->
          <!-- carousel case -->

      </div>
      <div class="emulator-footer">
        <div class="emulator-footer__inner">
          <div class="emulator-footer__top">
            <ButtonCmp
              type="btn-bar-toggle"
            >
              <span class="irtext">토글</span>
            </ButtonCmp>
            <ul class="chat-menu__list-inemul">
              <li
                v-for="(list, index) in chatMenuList"
                :key="index"
              >
                <router-link to="#">{{ list.title }}</router-link>
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    ButtonCmp,
    Swiper,
    SwiperSlide
  },
  props: {
    mode: String,
    chatMenuList: {
      type: Array,
      required: true
    },
    chatInfoData: {
      type: Object,
      default: () => {
        return {
          chatRoomName: '',
          allowMsg: 'Y',
          saftyMark: 'N',
          mode: 'views',
          chatType: '',
          showInputFooter: true
        }
      }
    },
    chatMsgData: {
      type: Object,
      default: () => {
        return {
          chatbotMsgName: '',
          btnUse: 'btnUseN',
          copyMsg: 'Y',
          msgData: [{
            index: 0,
            imgFile: '',
            title: '',
            cardContent: '',
            btnUse: 'N',
            btnDirection: 'row',
            buttons: [{
              btnName: '',
              btnEvent: '',
              isActive: true
            }]
          }]
        }
      }
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
      isShort: true,
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 'auto'
      }
    }
  },
  mounted() {
    [this.todayDateFull, this.todayData, this.currentTime] = getTodayDate()
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
