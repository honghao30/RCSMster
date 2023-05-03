<template>
  <div class="new-emu_wrapper_top">
    <div class="new-emu_wrapper" :class="emulatorTypeClass">
      <!-- TOP MENU -->
      <div v-if="chatbot"  class="new-emu_top" :class="{ 'new-emu_top_open' : isProfileOpen }">
        <div class="new-emu_top_arrow">
          <button @click="isProfileOpen = true"><img src="@/assets/images/icons/ico-emu-chevron-up.svg"/></button>
        </div>
        <div class="new-emu_top_profile" :class="{ 'new-emu_top_profile2' : !display }">
          <div class="new-emu_top_icon" @click="isProfileOpen = false">
            <img v-if="profileImgUrl !== ''" :src="profileImgUrl" alt="" @error="this.src = '@/assets/images/icons/ico-emu-profile2.svg'"/>
          </div>
          <div class="new-emu_top_info" @click="isProfileOpen = false">
            <p>{{  display ? title : sendNum }}</p>
            <span :style="{'display: none': !display }">{{ sendNum }}</span>
          </div>
        </div>
        <div class="new-emu_top_call">
          <button><img src="@/assets/images/icons/ico-emu-call.svg" alt=""/></button>
        </div>
      </div>
      <!-- 기본 메시지 출력 -->
      <template v-if="isShowDefMsg">
        <!-- 양방향 대화방 -->
        <div v-if="type === 'twoway'" class="new-emu_mid">
          <p class="new-emu_mid_date">12월 26일 월요일</p>
          <div class="new-emu_mid_sender">
            <p>
              안녕하세요!<br>
              {{ brandNm }} 고객센터 입니다.<br><br>
              문의사항을 채팅창에 입력해 주세요.<br>
            </p>
            <span class="new-emu_mid_date">오전 7:38</span>
          </div>
          <div class="new-emu_mid_reciever">
            <p>아이디와 패스워드가<br/>기억나지 않아요.</p>
            <span class="new-emu_mid_date">오전 7:40</span>
          </div>
          <div class="new-emu_mid_card new-emu_mid_sender new-emu_mid_card_noimg">
            <div class="new-emu_mid_card_text">
              <span>아이디, 패스워드 찾기</span>
              <div>
                <p>아이디와 패스워드를 분실하셨나요?<br/>아래 버튼을 눌러 필요한 정보를 찾아보세요!</p>
              </div>
              <button><span>아이디 찾기</span></button>
              <button><span>비밀번호 찾기</span></button>
            </div>
            <!-- <span class="new-emu_mid_date">오전 7:38</span> -->
          </div>
        </div>
        <!-- 단방향 대화방  -->
        <div v-else class="new-emu_mid">
          <p class="new-emu_mid_date">12월 26일 월요일</p>
          <div class="new-emu_mid_sender">
            <p>
              {{ brandNm }} 브랜드의 가입을 환영합니다.<br><br>
              더 풍부해진 문자 서비스를 지금 만나보세요!
            </p>
            <span class="new-emu_mid_date">오전 7:38</span>
          </div>
        </div>
      </template>
      <!-- 사용자 입력 메시지 출력(자동응답메시지) -->
      <div v-else class="new-emu_mid">
        <!-- 자동응답Al메시지 상품에 따라 -->
        <!-- 1) Standone(sms, lms) -->
        <div v-if="isStandaloneText" class="new-emu_mid_card new-emu_mid_card_noimg">
          <div class="new-emu_mid_card_text">
            <span v-if="autoReplyTemplate.cardType === 'SAL' && (autoReply.cardData[0].title || autoReplyMode === 'write')" v-html="getStrVal(autoReply.cardData[0].title, '제목을 입력해주세요')"></span>
            <div>
              <p v-html="getStrVal(autoReply.cardData[0].description, '본문을 입력해주세요')"></p>
            </div>
            <template v-if="autoReplyTemplate.cardType === 'SAL'">
              <button v-for="(btn, bIdx) in autoReply.cardData[0].suggestions" :key="bIdx">
                <span v-html="getStrVal(btn.action.displayText, `버튼 ${ bIdx + 1 }`)"></span>
              </button>
            </template>
          </div>
        </div>
        <!-- 2) StandAlone MediaTop(small, medium) -->
        <div v-if="isStandaloneMedia" class="new-emu_mid_card" :class="autoReplyTemplate.mediaHeight === 'T' ? 'new-emu_mid_card_tall' : 'new-emu_mid_card_med'" >
          <div v-if="autoReply.cardData[0].fileName !== ''" class="new-emu_mid_card_img">
            <img :src="autoReply.cardData[0].fileUrl"/>
          </div>
          <div v-else class="new-emu_mid_card_img">
            <img v-if="autoReplyTemplate.mediaHeight === 'T'" src="@/assets/images/dummy/img_brand_test_568x528.jpg"/>
            <img v-else-if="autoReplyTemplate.mediaHeight === 'M'" src="@/assets/images/dummy/img_brand_test_568x336.jpg"/>
          </div>
          <div class="new-emu_mid_card_text">
            <span v-if="autoReply.cardData[0].title || autoReplyMode === 'write'" v-html="getStrVal(autoReply.cardData[0].title, '제목을 입력해주세요')"></span>
            <div v-if="autoReply.cardData[0].description || autoReplyMode === 'write'">
              <p v-html="getStrVal(autoReply.cardData[0].description, '본문을 입력해주세요')"></p>
            </div>
            <button v-for="(btn, bIdx) in autoReply.cardData[0].suggestions" :key="bIdx">
              <span v-html="getStrVal(btn.action.displayText, `버튼 ${ bIdx + 1 }`)"></span>
            </button>
          </div>
        </div>
        <!-- 3) Carousel(small, medium) -->
        <swiper ref="swiper" :key="`${type}_${swiperKey}`" v-if="isCarousel" class="new-emu_mid_carousel" :slides-per-view="slidePerView" :space-between="spaceBetween" @swiper="onSwiper">
          <swiper-slide v-for="idx in autoReplyTemplate.maxCardCnt" :key="`${type}_slide_${idx - 1}`" class="new-emu_mid_card" :class="type" :data-idx="idx - 1">
            <div v-if="autoReply.cardData[idx - 1].fileName !== ''" class="new-emu_mid_card_img">
              <img :src="autoReply.cardData[idx - 1].fileUrl"/>
            </div>
            <div class="new-emu_mid_card_text">
              <span v-if="autoReply.cardData[idx - 1].title || autoReplyMode === 'write'" v-html="getStrVal(autoReply.cardData[idx - 1].title, '제목을 입력해주세요')"></span>
              <div v-if="autoReply.cardData[idx - 1].description || autoReplyMode === 'write'">
                <p v-html="getStrVal(autoReply.cardData[idx - 1].description, '본문을 입력해주세요')"></p>
              </div>
              <button v-for="(btn, bIdx) in autoReply.cardData[idx - 1].suggestions" :key="bIdx">
                <span v-html="getStrVal(btn.action.displayText, `버튼 ${ bIdx + 1 }`)"></span>
              </button>
            </div>
          </swiper-slide>
          <swiper-slide></swiper-slide>
        </swiper>
      </div>
      <!-- BOT MENU -->
      <div class="new-emu_bot">
        <!-- 칩리스트 -->
        <carousel :key="chipsKey" v-if="isShowChips" class="new-emu_bot_chip" v-bind="carouselOption">
          <span v-for="(chip, cIdx) in autoReply.chipSuggestions" :key="cIdx">
            <a href="javascript:void(0)"><span v-html="getStrVal(chip.action.displayText, `칩 ${ cIdx + 1 }`)"></span></a>
          </span>
        </carousel>
        <!-- 대화방 메뉴 -->
        <div v-if="isShowPsMenu" class="new-emu_bot_drawer" :class="{ drawerUp : isDrawerUp }">
          <button @click="isDrawerUp = !isDrawerUp"></button>
          <!-- 하위메뉴인 경우, 상위 메뉴의 이름을 출력한다  -->
          <div :class="{ 'new-emu_bot_rootmenu': psMenuDepth == 1 }">
            <p v-if="psMenuDepth === 2"><a href="javascript:void(0)" @click="goTopPsMenu">{{ selectedPsMenu.title || `대화방 메뉴 ${psMenuSelectedMenuIdx + 1} 메뉴명 입력` }}</a></p>
            <p v-for="(menu, idx) in targetPsMenuList" :key="idx">
              <a href="javascript:void(0)" @click="selectPsMenu(idx)" :class="{'new-emu_bot_hassub': menu.type === 'sub_menu'}">
                <span v-html="getStrVal(menu.title, (psMenuDepth === 1 ? `대화방 메뉴 ${idx+1} 메뉴명` : `대화방 메뉴 ${psMenuSelectedMenuIdx + 1}-${idx + 1} 메뉴명`))"></span>
              </a>
            </p>
          </div>
        </div>
        <!-- 메시지 입력란 -->
        <template v-if="chatbot">
          <div class="new-emu_bot_input" v-if="chatbot.inputFieldYn === 'Y'">
            <button><img src="@/assets/images/icons/ico-emu-photo.svg" alt=""/></button>
            <button><img src="@/assets/images/icons/ico-emu-camera.svg" alt=""/></button>
            <button><img src="@/assets/images/icons/ico-emu-plus.svg" alt=""/></button>
            <input type="text"/>
          </div>
          <div class="new-emu_bot_input new-emu_bot_input_off" v-else>
            <input type="text" disabled placeholder="입력할 수 없는 대화방 입니다."/>
          </div>
        </template>
        <template v-else>
          <div class="new-emu_bot_input">
            <button><img src="@/assets/images/icons/ico-emu-photo.svg" alt=""/></button>
            <button><img src="@/assets/images/icons/ico-emu-camera.svg" alt=""/></button>
            <button><img src="@/assets/images/icons/ico-emu-plus.svg" alt=""/></button>
            <input type="text"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'
import { Navigation } from 'swiper'
import 'swiper/swiper-bundle.css'

import { getApprovalBrand } from '@/api/service/approvalBrand'

SwiperCore.use([ Navigation ])

export default {
  name: 'ChatbotEmulator',
  components: {
    carousel,
    Swiper,
    SwiperSlide
  },
  props: {
    type: { type: String, default: '' }, // 에뮬레이터의 타입(단방향:'oneway' / 양방향:'twoway' / 대화방메뉴: 'psMenu' / 자동응답: 'autoReply')
    brandId: { type: String, default: '' },
    isShowDefMsg: { type: Boolean, default: true },
    chatbot: { type: Object, default: null }, // 대화방 정보
    psMenu: { type: Array, default: null }, // 대화방 메뉴 정보
    psMenuSelectedMenuIdx: { type: Number, default: 0 }, // 현재 선택된 상위 대화방 메뉴 index
    autoReply: { type: Object, default: null }, // 자동응답 메시지 정보
    autoReplyMode: { type: String, default: '' }, // 자동응답메시지를 작성하는 경우('write')만 디폴트 텍스트를 보여준다. 그 외에는 사용자 입력 데이터만 출력
    autoReplyTemplate: { type: Object, default: null }, // 자동응담 메시지 템플릿 정보
    autoReplySelectedCardIdx: { type: Number, default: 0 } // 자동응답 메시지 선택된 카드 index
  },
  data() {
    return {
      isProfileOpen: true,
      profileImgUrl: '', // 브랜드 프로필 이미지 url
      isDrawerUp: true, // 대화방 메뉴 펼침상태 여부
      psMenuDepth: 1, // 현재 대화방메뉴 depth
      curSlideIndex: 0, // 현재 에뮬레이터에서 선택된 카드의 index
      carouselSwiper: null, // (carousel일 경우 사용)swiper
      slidePerView: 0, // (carousel일 경우 사용)
      spaceBetween: 4, // (carousel일 경우 사용)
      selectedPsMenu: null, // 현재 선택된 대화방 메뉴
      carouselOption: { autoWidth: true, dots: false, margin: 4, stagePadding: 16 },
      swiperKey: 0,
      chipsKey: 0
    }
  },
  computed: {
    emulatorTypeClass() {
      if (this.type === 'oneway') return 'eHeight_01' // 발신번호
      else if (this.type === 'twoway') return 'eHeight_02' // 양방향 대화방
      else if (this.type === 'psMenu') return 'eHeight_03' // 대화방메뉴
      else return 'eHeight_04' // 자동응답관리
    },
    /** 브랜드 명 */
    brandNm() {
      return localStorage.getItem('curBrandNm') || 'RCS Biz Center'
    },
    /** 대화방 상단 */
    display() { // 전시/비전시
      if (!jglib.isEmpty(this.chatbot) && !jglib.isEmpty(this.chatbot.display)) {
        return this.chatbot.display.substring(1, 2) === '1'
      } else return true
    },
    title() {
      if (!jglib.isEmpty(this.chatbot) && !jglib.isEmpty(this.chatbot.subTitle)) return this.chatbot.subTitle
      else return '대화방명'
    },
    sendNum() {
      if (this.type === 'oneway') return this.chatbot.mdn || '발신번호'
      else if (this.type === 'twoway') {
        if (!this.chatbot.service) return '발신번호'
        else return this.chatbot.subNum || '회신번호'
      } else if (this.type === 'autoReply') return '발신번호'
      else return this.chatbot.subNum || this.chatbot.mdn || '발신번호'
    },
    inputFieldYn() {
      if (!jglib.isEmpty(this.chatbot)) {
        return this.chatbot.inputFieldYn === 'Y' ? '입력 가능' : '입력 불가능'
      } else return '정보 없음'
    },
    /** 자동응답 메시지 - standalone */
    isStandaloneText() {
      if (!jglib.isEmpty(this.autoReplyTemplate)) {
        return this.autoReplyTemplate.cardType === 'SAS' || this.autoReplyTemplate.cardType === 'SAL'
      } else return false
    },
    /** 자동응답 메시지 - standalone Media top */
    isStandaloneMedia() {
      if (!jglib.isEmpty(this.autoReplyTemplate)) {
        return this.autoReplyTemplate.cardType === 'SM'
      } else return false
    },
    /** 자동응답 메시지 - carousel */
    isCarousel() {
      if (!jglib.isEmpty(this.autoReplyTemplate)) {
        return this.autoReplyTemplate.cardType === 'CR' || this.autoReplyTemplate.cardType === 'CS'
      } else return false
    },
    /** 자동응답메시지 - 칩리스트 show 여부 */
    isShowChips() {
      if (!jglib.isEmpty(this.autoReply) && !jglib.isEmpty(this.autoReply.chipSuggestions)) return true
      else return false
    },
    /** 대화방 메뉴 show 여부 */
    isShowPsMenu() {
      if (!jglib.isEmpty(this.chatbot)) {
        if (this.chatbot.psMenuYn === 'Y' && !jglib.isEmpty(this.psMenu)) return true
        else return false
      } else return false
    },
    /** 선택된 대화방 */
    targetPsMenuList() {
      if (this.psMenuDepth === 1) return this.psMenu
      else return this.selectedPsMenu.subMenu // 서브메뉴가 선택되었을때
    }
  },
  watch: {
    autoReplyTemplate() {
      if (this.isCarousel) {
        this.swiperKey++
        if (this.autoReplyTemplate.mediaHeight === 'S') this.slidePerView = 1.7
        else this.slidePerView = 1.2
      }
    },
    /** 대화방 메뉴 - 선택된 상위 메뉴 변경시 동작 */
    psMenuSelectedMenuIdx(idx) {
      if (idx > -1) {
        let menu = this.psMenu[idx]
        if (menu.type === 'sub_menu') this.psMenuDepth = 2
        else this.psMenuDepth = 1
        this.selectedPsMenu = menu
      }
    },
    /** 대화방 메뉴 - 응답유형 변경되는 경우 */
    psMenu: {
      deep: true,
      handler() {
        if (this.psMenu[this.psMenuSelectedMenuIdx].type === 'sub_menu') this.psMenuDepth = 2
        else this.psMenuDepth = 1
        this.selectedPsMenu = this.psMenu[this.psMenuSelectedMenuIdx] // 현재메뉴
      }
    },
    /** 자동응답 메시지 - 선택된 카드 변경시 동작 */
    autoReplySelectedCardIdx(idx) {
      this.carouselSwiper.slideTo(idx, 500)
    },
    autoReply: {
      immediate: true,
      deep: true,
      handler() {
        if (!jglib.isEmpty(this.autoReply)) {
          this.autoReply.cardData.forEach(x => {
            if (jglib.isEmpty(x.fileUrl) && !jglib.isEmpty(x.fileRaw)) {
              let self = this
              let reader = new FileReader()
              reader.readAsDataURL(x.fileRaw)
              reader.onload = (e) => {
                x.fileUrl = e.target.result
                self.$forceUpdate()
              }
            } else this.$forceUpdate()
          })
        }
      }
    },
    // 자동응답 메시지 - 칩리스트 변경시 key 값을 변경하여 칩 리스트를 reRendering 처리함
    'autoReply.chipSuggestions'() {
      this.chipsKey++
    },
    carouselSwiper() {
      let _self = this
      let carouselItems = document.getElementsByClassName(`new-emu_mid_card ${_self.type}`)
      // carousel slide 변경 이벤트
      this.carouselSwiper.on('slideChangeTransitionEnd', function(e) {
        let target = document.getElementsByClassName(`swiper-slide-active ${_self.type}`)[0]
        _self.slideClick($(target).data('idx'))
      })
      for (let i = 0; i < carouselItems.length; i++) {
        let item = carouselItems[i]
        // carousel slide 클릭 이벤트
        item.addEventListener('click', function(e) {
          _self.slideClick($(item).data('idx'))
        })
      }
    },
    isCarousel: {
      immediate: true,
      handler() {
        if (this.isCarousel) {
          if (this.autoReplyTemplate.mediaHeight === 'S') this.slidePerView = 1.7
          else this.slidePerView = 1.2
        }
      }
    }
  },
  mounted() {
    if (!jglib.isEmpty(this.psMenu)) {
      this.selectedPsMenu = this.psMenu[0]
    }
    if (!jglib.isEmpty(this.chatbot)) {
      getApprovalBrand({ brandId: this.brandId }).then(res => {
        if (res.code === '20000000' && !jglib.isEmpty(res.result.profileImgFileUrl)) {
          this.profileImgUrl = res.result.profileImgFileUrl
        } else {
          this.profileImgUrl = ''
        }
      }).catch(() => {})
    }
  },
  methods: {
    /** 자동응답메시지 - swiper 객체 저장 */
    onSwiper(swiper) {
      this.carouselSwiper = swiper
    },
    slideClick(idx) {
      this.$emit('update:autoReplySelectedCardIdx', idx)
    },
    selectPsMenu(idx) {
      if (this.psMenuDepth === 1) {
        this.$emit('update:psMenuSelectedMenuIdx', idx)
      } else {
        this.psMenu[this.psMenuSelectedMenuIdx].selectedSubMenuIdx = idx
        this.$emit('updateSelectedSubMenu', { to: 'psMenuWrite', subIdx: idx })
      }
      let menu = this.psMenu[this.psMenuSelectedMenuIdx]
      if (menu.type === 'sub_menu') this.psMenuDepth = 2
    },
    updateSelectedSubPsMenu(subIdx) {
      this.psMenuDepth = 2
      this.psMenu[this.psMenuSelectedMenuIdx].selectedSubMenuIdx = subIdx
    },
    /** 대화방 메뉴 - 상위 메뉴로 이동 */
    goTopPsMenu() {
      this.psMenuDepth = 1
    },
    getStrVal(str, defStr) {
      if (!jglib.isEmpty(str)) return str.replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp;')
      else return defStr
    }
  }
}
</script>

<style scoped>
.new-emu_wrapper_top{
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 20px;
  margin-bottom: 90px;
}
</style>
