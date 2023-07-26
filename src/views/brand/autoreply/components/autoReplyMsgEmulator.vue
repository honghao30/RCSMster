<template>
  <div class="chat-emulator__wrap">
    <div class="chat-emulator">
      <div class="emulator-header">
        <div class="emulator-header__inner">
          <button class="btn-back"><span class="blind">이전으로</span></button>
          <div class="profile">
            <div class="profile__image">
              <img src='../../../../assets/images/dummy/brand_logo.png' alt="">
            </div>
            <p :class="{name: true, short: isShort}"><span v-if="brandInfoData.name">{{ brandInfoData.name }}</span><span v-else>대화방 명</span></p>
            <button class="btn-down" :class="{open: isOpen}" @click="btnToggle"></button>
          </div>
        </div>
        <button class="btn-more" :class="{open: isBlind}"><span class="blind">정보</span></button>
      </div>
      <!--<div class="emulator-body" v-if="chatInfoData.mode !== 'registration'">
        <transition name="bodyshow">
           <template v-if="chatInfoData.chatRoomName">
            <div class="chat-item__wrap">
              <p class="chat-date">{{ todayData }}</p>
              <p class="safty-icon" v-if="chatInfoData.saftyMark == 'Y'">확인된 발신번호</p>
              <div class="chat-bubble__wrap sender">
                <div class="chat-bubble">
                  <p>문의사항이 있으시다면 채팅방에 문의 내용과 성함/연락처를 남겨주세요.<br>
                    {{ chatInfoData.chatRoomName }}의 MD팀이 최대한 빠르게 답변 드리도록 하겠습니다!
                  </p>
                </div>
                <div class="chat-bubble">
                  <p>{{ chatInfoData.chatRoomName }} 가입을 환영합니다.<br>더 풍부해진 문자서비스를 지금 만나보세요!</p>
                </div>
                <span class="chat-time">{{ currentTime }}</span>
              </div>
            </div>
          </template>
        </transition>
      </div>-->
      <div class="emulator-body">
        <transition name="bodyshow">
          <div class="chat-item__wrap">
            <p class="safty-icon" v-if="chatInfoData.saftyMark === 'Y'">확인된 발신번호</p>

            <div class="chat-bubble__wrap sender" v-if="chatInfoData.chatType === 'chatBubble'">
              <div class="chat-bubble message">
                <p v-if="chatInfoData.bubbleContentBasic">문의사항이 있으시다면 채팅방에 문의 내용과 성함/연락처를 남겨주세요.<br>
                  {{ brandInfoData.name }}의 MD팀이 최대한 빠르게 답변 드리도록 하겠습니다!
                </p> <!-- 기획서 v1.0 수정 (v-if 추가 / 간편챗봇에서 미사용)-->
                <p v-if="!chatInfoData.cardData[0].description">내용을 입력해주세요.</p>
                <p v-else v-html="chatInfoData.cardData[0].description"> </p>
              </div>
            </div>
            <div class="chat-bubble__wrap carousel" v-if="chatInfoData.chatType === 'card'">
              <div class="chat-bubble chatcard-innerbox">
                <div
                  v-if="chatInfoData.cardData[0].fileUrl" class="image-area chatcard-box"
                  :class="{'full' : chatInfoData.imgSize == 'full', 'medium' : chatInfoData.imgSize == 'medium'}"
                >
                  <span class="image" :style="{backgroundImage: `url(${chatInfoData.cardData[0].fileUrl})`}"></span>
                </div>

                <div class="item--none chatcard-box" v-else :class="{'full' : chatInfoData.imgSize === 'full', 'medium' : chatInfoData.imgSize === 'medium'}">
                  <p class="img">이미지를 등록해주세요.</p>
                </div>
                <div class="text-area" v-if="chatInfoData.cardData[0].title || chatInfoData.cardData[0].description">
                  <p class="msg-title" v-html="chatInfoData.cardData[0].title"></p>
                  <p class="msg-text" v-html="chatInfoData.cardData[0].description"></p>
                </div>
                <div class="btn-area column"
                     v-if="chatInfoData.cardData[0].suggestions.length"
                >
                  <template v-for="(btn, k) in chatInfoData.cardData[0].suggestions" >
                    <a href="" :key="k" v-if="btn.btnName">{{ btn.btnName }}</a>
                  </template>
                </div>
              </div>
            </div>
            <div class="chat-bubble__wrap carousel"  v-if="chatInfoData.chatType === 'slider'">
              <swiper
                ref="carousel"
                :options="swiperOption"
                :class="{'inactive': chatInfoData.cardData.length < 2}"
              >
                <swiper-slide v-for="(msg, i) in chatInfoData.cardData" :key="i" class='cards'>
                  <div class="chat-bubble">
                    <div
                      v-if="msg.fileUrl" class="image-area"
                      :class="{'full' : chatInfoData.imgSize === 'full'}"
                    >
                      <span class="image" :style="{backgroundImage: `url(${msg.fileUrl})`}"></span>
                    </div>

                    <div class="item--none" v-else>
                      <p class="img">이미지를 등록해주세요.</p>
                    </div>
                    <div class="text-area" v-if="msg.title || msg.description">
                      <p class="msg-title" v-html="msg.title"></p>
                      <p class="msg-text" v-html="msg.description"></p>
                    </div>
                    <div class="btn-area column"
                      v-if="msg.suggestions"
                    >
                      <template v-for="(btn, k) in msg.suggestions" >
                        <a href="javascript:return false" :key="k" v-if="btn.btnName">{{ btn.btnName }}</a>
                      </template>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <ul class="chip-buttons" :class="{ 'not-response-box': chatInfoData.chipSuggestions.length === 0 }" v-if="chatInfoData.chipBtnUse === 'Y'">
<!--              <template v-if="chatInfoData.chipSuggestions">
                <li v-for="(btn, k) in chatInfoData.chipSuggestions" :key="k" >
                  <a href="javascript:return false">{{ btn.displayText }}</a>
                </li>
              </template>
              <li v-else>
                <span>응답버튼을 등록해주세요.</span>
              </li>-->
              <template v-if="chatInfoData.chipSuggestions.length > 0">
                <li>
                  <swiper
                    ref="responsecarousel"
                    :options="chipSwiperOption"
                    :class="{'inactive': chatInfoData.chipSuggestions.length < 2}"
                  > <!-- 기획서 v1.0 수정 (inactive 클래스 조건 변경) -->
                    <swiper-slide v-for="(btn, k) in chatInfoData.chipSuggestions" :key="k">
                      <a href="" class="response-box" v-if='btn.btnName'>{{ btn.btnName }}</a>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev" @click="$refs.responsecarousel.swiperInstance.slidePrev()"></div>
                    <div class="swiper-button-next" slot="button-next" @click="$refs.responsecarousel.swiperInstance.slideNext()"></div>
                  </swiper>
                </li>
              </template>
              <li v-else-if="chatInfoData.chipSuggestions.length === 0">
                <span>응답버튼을 등록해주세요.</span>
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
        </transition>
      </div>
      <div class="emulator-footer" v-if="!chatInfoData.hideInputFooter">
        <div class="emulator-footer__inner" v-if="this.chatInfoData.allowMsg === 'Y'">
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
                v-for="(list, idx) in chatMenuList"
                :key="idx"
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
        <!-- 메시지 입력 불가로 선택시 -->
        <div class="emulator-footer__inner chat-dissable" v-else>
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
                v-for="(list, idx) in chatMenuList"
                :key="idx"
              >
                <router-link to="#">{{ list.label }}</router-link>
              </li>
            </ul>
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
      type: Array
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
          hideInputFooter: false,
          cardData: [],
          chipSuggestions: []
        }
      }
    },
    brandInfoData: {
      type: Object,
      default: () => {}
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
      },
      collapse: false,
      chipSwiperOption: {
        spaceBetween: 12,
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  watch: {},
  mounted() {
    [this.todayDateFull, this.todayData, this.currentTime] = getTodayDate()
  },
  methods: {
    btnToggle () {
      this.isOpen = !this.isOpen
      this.isBlind = !this.isBlind
      this.isShort = !this.isShort
    },
    btnToggleMenu () {
      this.collapse = !this.collapse
    }
  }
}
</script>
<style>
@import '/swiper/css/swiper.css';
</style>
