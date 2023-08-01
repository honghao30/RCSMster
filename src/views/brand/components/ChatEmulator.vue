<template>
  <div class="chat-emulator__wrap"
  >
    <div class="chat-emulator">
      <div class="emulator-header">
        <div class="emulator-header__inner">
          <button class="btn-back"><span class="blind">이전으로</span></button>
          <div class="profile">
            <div class="profile__image">
              <img src="@/assets/images/dummy/brand_logo.png" alt="">
            </div>
            <p :class="{name: true, short: isShort}"><span v-if="chatInfoData.chatRoomName">{{ chatInfoData.chatRoomName }}</span><span v-else>대화방 명</span></p>
            <button class="btn-down" :class="{open: isOpen}" @click="btnToggle"></button>
          </div>
        </div>
        <button class="btn-more" :class="{open: isBlind}"><span class="blind">정보</span></button>
      </div>
      <div class="emulator-body" v-if="chatInfoData.mode !== 'registration'">
      <!-- <template v-if="chatInfoData.chatType == 'chatRoom'"> -->
        <transition name="bodyshow">
           <template v-if="chatInfoData.chatRoomName">
            <div class="chat-item__wrap">
              <p class="chat-date">{{ todayData }}</p>
              <p class="safty-icon" v-if="chatInfoData.saftyMark">확인된 발신번호</p>
              <div class="chat-bubble__wrap sender">
                <div class="chat-bubble">
                  <p>문의사항이 있으시다면 채팅방에 문의 내용과 성함/연락처를 남겨주세요.<br><br>
                    {{ chatInfoData.chatRoomName }}의 MD팀이 최대한 빠르게 답변 드리도록 하겠습니다!
                  </p>
                </div>
                <!-- <div class="chat-bubble">
                  <p>{{ chatInfoData.chatRoomName }} 가입을 환영합니다.<br>더 풍부해진 문자서비스를 지금 만나보세요!</p>
                </div> -->
                <span class="chat-time">{{ currentTime }}</span>
              </div>
            </div>
          </template>
        </transition>
      <!-- </template> -->
      </div>
      <div class="emulator-body">
        <transition name="bodyshow">
          <div class="chat-item__wrap">
            <p class="safty-icon" v-if="chatInfoData.saftyMark === 'Y'">확인된 발신번호</p>
            <div class="chat-bubble__wrap sender" v-if="chatMsgData.chatType == 'chatBubble'" :class="{ 'bubblenot-box': !chatMsgData.bubbleContent }"> <!-- 기획서 v1.0 수정 (클래스 추가) -->
              <div class="chat-bubble message">
                <p v-if="chatMsgData.bubbleContentBasic">문의사항이 있으시다면 채팅방에 문의 내용과 성함/연락처를 남겨주세요.<br>
                    {{ chatInfoData.chatRoomName }}의 MD팀이 최대한 빠르게 답변 드리도록 하겠습니다!
                </p> <!-- 기획서 v1.0 수정 (v-if 추가 / 간편챗봇에서 미사용)-->
                <p v-if="!chatMsgData.bubbleContent" class="bubblenot-box_txt">내용을 입력해주세요.</p> <!-- 기획서 v1.0 수정 (클래스 추가) -->
                <p v-else v-html="chatMsgData.bubbleContent"> </p>
              </div>
            </div>
            <!-- 기획서 v1.0 수정 / 카드 추가 -->
            <template v-if="chatMsgData.chatType == 'card'">
                <div class="chat-bubble__wrap carousel">
                    <swiper
                      ref="carousel"
                      :options="swiperOption"
                      :class="{'inactive': chatMsgData.msgCardData.length < 2}"
                    >
                      <swiper-slide v-for="(msg, i) in chatMsgData.msgCardData" :key="i">
                        <div class="chat-bubble chatcard-innerbox">
                          <div
                            v-if="msg.imgFile" class="image-area chatcard-box"
                            :class="{'full' : msg.imgSize == 'full', 'medium' : msg.imgSize == 'medium'}"
                          >
                            <span class="image" :style="{backgroundImage: `url(${require('@/assets/images/'+ msg.imgFile)})`}"></span>
                          </div>

                          <div class="item--none chatcard-box" v-else :class="{'full' : msg.imgSize == 'full', 'medium' : msg.imgSize == 'medium'}">
                            <p class="img">이미지를 등록해주세요.</p>
                          </div>
                          <div class="text-area" v-if="msg.title || msg.cardContent">
                            <p class="msg-title" v-html="msg.title"></p>
                            <p class="msg-text" v-html="msg.cardContent"></p>
                          </div>
                          <div class="btn-area"
                            v-if="msg.buttons.length"
                            :class="{'column' : msg.btnDirection === 'column'}"
                          >
                            <template v-for="(btn, k) in msg.buttons" >
                              <a href="" :key="k" v-if="btn.btnName">{{ btn.btnName }}</a>
                            </template>
                          </div>
                        </div>
                      </swiper-slide>
                  </swiper>
                </div>
            </template>
            <!-- // 기획서 v1.0 수정 / 카드 추가 -->
            <!-- 기획서 v1.0 수정 / 슬라이드 추가 -->
            <!-- 기획서 v1.0 수정 (card에서 slider로 변경)-->
            <template   v-if="chatMsgData.chatType == 'slider'">
              <div class="chat-bubble__wrap carousel">
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
                        <p class="msg-title" v-html="msg.title"></p>
                        <p class="msg-text" v-html="msg.cardContent"></p>
                      </div>
                      <div class="btn-area"
                        v-if="msg.buttons.length"
                        :class="{'column' : msg.btnDirection === 'column'}"
                      >
                        <template v-for="(btn, k) in msg.buttons" >
                          <a href="" :key="k" v-if="btn.btnName">{{ btn.btnName }}</a>
                        </template>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </template>
            <!-- // 기획서 v1.0 수정 / 슬라이드 추가 -->
            <!-- 기획서 v1.0 수정 / 응답버튼 수정 / 응답버튼 미사용 하는 경우도 있어서 v-if 추가 -->
            <ul class="chip-buttons"  :class="{ 'not-response-box': !chatMsgData.chipButtons.length }" v-if="!chatInfoData.chipButtons">
              <!-- <template v-if="chatMsgData.chipButtons.length">
                <li v-for="(btn, k) in chatMsgData.chipButtons" :key="k" >
                  <a href="">{{ btn.btnName }}</a>
                </li>
              </template>
              <li v-else>
                <span>응답버튼을 등록해주세요.</span>
              </li> -->
              <template v-if="chatMsgData.chipButtons.length">
                <li>
                  <swiper
                    ref="responsecarousel"
                    :options="chipSwiperOption"
                    :class="{'inactive': chatMsgData.chipButtons.length < 2}"
                  > <!-- 기획서 v1.0 수정 (inactive 클래스 조건 변경) -->
                    <swiper-slide v-for="(btn, k) in chatMsgData.chipButtons" :key="k">
                      <a href="" class="response-box">{{ btn.btnName }}</a>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev" @click="$refs.responsecarousel.swiperInstance.slidePrev()"></div>
                    <div class="swiper-button-next" slot="button-next" @click="$refs.responsecarousel.swiperInstance.slideNext()"></div>
                  </swiper>
                </li>
              </template>
              <li v-else-if="!chatMsgData.chipButtons.length">
                <span>응답버튼을 등록해주세요.</span>
              </li>
            </ul>
            <!-- // 기획서 v1.0 수정 / 응답버튼 수정 / 응답버튼 미사용 하는 경우도 있어서 v-if 추가 -->
          </div>
          <div class="chat-bubble__wrap receiver">
            <div class="chat-bubble">
              <p>가입을 환영합니다.<br>더 풍부해진 문자서비스를 지금 만나보세요!</p>
            </div>
            <span class="chat-time">오후 5:22</span>
          </div>
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
                v-for="(list, index) in chatMenuList"
                :key="index"
                :class="{ 'active': list.isActive === true}"
              >
                <router-link to="#" v-if="list.menuTitle == ''">대화방 메뉴명을 입력하세요</router-link>
                <router-link to="#" v-else>{{ list.menuTitle }}</router-link>
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
                v-for="list in chatMenuList"
                :key="list"
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
    mode: {
      type: String,
      defalut: 'views'
    },
    chatMenuList: {
      type: Array,
      default: null
    },
    isActive: {
      type: String
    },
    chatInfoData: {
      type: Object,
      default: () => {
        return {
          chatRoomName: '',
          chatbotMsgName: '',
          allowMsg: 'N',
          mode: 'views',
          hideInputFooter: false,
          chipButtons: false // 응답버튼 미사용 하는 경우도 있어서 v-if 추가
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
          chipBtnUse: 'N',
          chipButtons: [],
          msgData: [{
            index: 0,
            imgFile: '',
            title: '',
            cardContent: '',
            bubbleContent: '',
            btnUse: 'N',
            btnDirection: 'row',
            buttons: [{
              btnName: '',
              btnEvent: '',
              isActive: true
            }]
          }],
          msgCardData: [{
            index: 0,
            imgSize: 'full',
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
      },
      chipSwiperOption: {
        spaceBetween: 12,
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      collapse: false
    }
  },
  mounted() {
    [this.todayDateFull, this.todayData, this.currentTime] = getTodayDate()
    console.log(this.chatMenuList)
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
