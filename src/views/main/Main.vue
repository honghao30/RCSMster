<template>
  <div class="main__wrap">
       <!-- // 팝업창 -->
       <notice-popup/>
      <div class="key-visual__wrap" ref="keyVi">
        <div class="key-visual__inner--box">
          <div class="key-visual__text">
            <p class="text">
              브랜드에 딱! 맞는<br class="mo"> 메시지 만들기,<br>
              RCS에서 가능합니다!
            </p>
            <p class="btn-more">
              <router-link to="#">
                메시지 템플릿 가이드
              </router-link>
            </p>
          </div>
        </div>
        <div class="key-visual__bar--bottom"
          :class="{ isfixed : keyVisualLinks}"
          :style="{ top: keyVisualLinks ? keyBarPs + 'px' : 'auto', bottom: keyVisualLinks ? '0' : '' }"
        >
          <div class="key-visual__inner">
            <div class="bottom-logo">
              <img src="@/assets/images/main/key-visual-logo.png" alt="">
            </div>
            <ul class="key-vi__links">
              <li><router-link to="">RCS 시작</router-link></li>
              <li><router-link to="">온라인 문의</router-link></li>
            </ul>
          </div>
        </div>
        <div class="video-frame">
          <div class="video-frame__inner">
            <video type="video/mp4" class="pc" loop muted="muted" poster="@/assets/images/dummy/main_visual.png" autoplay>
              <source src="@/assets/images/main/main.mp4"/>
            </video>
            <video type="video/mp4"  class="mo"  loop muted="muted" poster="@/assets/images/dummy/main_visual.png" autoplay>
              <source  src="@/assets/images/main/main_mo.mp4"/>
            </video>
          </div>
        </div>
      </div>
      <!-- // key visual  -->
      <div class="section section01 slideup"
        ref="section1"
        data-color="color-white"
        :class="{ slideInUp: scrolled}"
      >
          <div class="section__inner--fixed">
              <div
                class="section-title"
              >
                <h2>
                  RCS Service<br>Communication
                </h2>
                <p class="title-description">RCS 서비스는 브랜드와 고객의<br>커뮤니케이션을 돕습니다</p>
              </div>
              <div class="rcs-service__wrap">
                <div class="rcs-service__wrap--top">
                  <div class="service service01 slideup"
                    :class="{ slideInUp: scrolled}"
                  >
                    <router-link to="#" class="section__list--inner-wrap">
                      <div class="tit">
                        <p>#템플릿 메시지</p>
                        <h3>
                          가격이 저렴하면서<br>
                          가독성 높은 메시지를<br>
                          보내고 싶다면?
                        </h3>
                      </div>
                    </router-link>
                  </div>
                  <div class="service service02 slideup"
                    :class="{ slideInUp: scrolled}"
                    style="animation-delay: 0.5s"
                  >
                    <router-link to="#"  class="section__list--inner-wrap">
                      <div class="tit">
                        <p>#브랜드 소식</p>
                        <h3>이벤트소식을 빠르게<br>전달하는 방법!</h3>
                      </div>
                    </router-link>
                  </div>
                  <div class="service service03 slideup"
                    :class="{ slideInUp: scrolled}"
                    style="animation-delay: 0.6s"
                  >
                    <router-link to="#" class="section__list--inner-wrap">
                      <div class="tit">
                        <p>#고객반응 분석</p>
                        <h3>내가 보낸 메시지에<br>대한 고객의 반응을<br>알고싶다면?</h3>
                      </div>
                    </router-link>
                  </div>
                </div>
                <div class="rcs-service__wrap--bottom">
                  <div class="service service04 slideup"
                    :class="{ slideInUp: scrolled}"
                    style="animation-delay: 0.7s"
                  >
                    <router-link to="#" class="section__list--inner-wrap">
                      <div class="tit">
                        <p>#대화방 메뉴</p>
                        <h3>고객과 24시간<br>커뮤니케이션하고<br class="pc"> 싶다면?</h3>
                      </div>
                    </router-link>
                  </div>
                  <div class="service service05 slideup"
                    :class="{ slideInUp: scrolled}"
                    style="animation-delay: 0.8s"
                  >
                    <router-link to="#" class="section__list--inner-wrap">
                      <div class="tit">
                        <p>#브랜드 프로필</p>
                        <h3>
                          모르는 발신번호는 그만!<br>고객이 안심하고 열어 보는<br>내 브랜드 표시
                        </h3>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
          </div>
      </div>
      <!-- // section 01 :-->
      <div class="section section02"
        ref="section2"
        data-color="color-black"
        >
        <div class="section-title  slideup">
          <h2 class="full-wd">
            <div class="transition-title">
              Message<br class="mo">Type
            </div>
          </h2>
          <p class="title-description">RCS의 다양한 타입의<br class="mo"> 메시지 상품을 경험해 보세요!</p>
          <p class="btn-link">
            <router-link to="">메시지 템플릿 더보기</router-link>
          </p>
        </div>
        <div class="message-swiper__container">
          <div class="section-content__full-width"
            ref="CardFixContainer"
          >
              <swiper
                :options="messageSwiper"
              >
                <swiper-slide
                  v-for="(item, index) in messageType"
                  :key="index"
                  :class="{ 'title-w-custom': index === 3 }"
                >
                  <div class="message-card__templetion">
                    <div class="card-img"><img :src="item.cardUrl" :alt="item.type"></div>
                    <div class="card-title">{{ item.type }}</div>
                  </div>
                </swiper-slide>
              </swiper>
          </div>
        </div>
      </div>
      <!-- // section02 -->
      <div class="section section03 slideup" ref="swiperEl"
        data-color="color-white"
      >
        <div class="section-title">
          <h2>
            Success Stories
          </h2>
          <p class="title-description">RCS 서비스의 다양한 기업체에<br class="pc"> 도입된<br class="mo"> 사례를 접해보세요!</p>
        </div>
        <div class="slider__wrap" ref="sliderSwiper">
          <swiper
            :options="caseSwiper"
            @swiper="onSwiper"
            @slideChangeTransitionStart="onSlideChangeStart"
            @slideChangeTransitionEnd="onSlideChangeEnd"
            ref="caseSwiper"
          >
            <swiper-slide
              v-for="(item, index) in rbcCase"
              :key="index"
              :class="item.customer"
            >
              <!-- <div class="inner-rapper">
                  <div class="inner__text--left">
                    <h4 class="ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="1.5s" swiper-animate-delay="0s" v-html="item.title"></h4>
                    <p class="description  ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="2.0s" swiper-animate-delay="0s" v-html="item.description"></p>
                    <p class="btn-more ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="2.2s" swiper-animate-delay="0s">
                      <router-link :to="item.link">자세히 보기</router-link>
                    </p>
                  </div>
                  <div class="card__list">
                    <div class="card__list--innerbox">
                      <div v-for="(card, index) in item.card"
                          swiper-animate-effect="rotate" swiper-animate-duration="1.0s" swiper-animate-delay="0.5s"
                          class="card-item"
                          :key="index"
                          :class="`card0${index + 1}`"
                        >
                        <img :src="card.cardUrl" alt="">
                      </div>
                    </div>
                  </div>
              </div> -->
              <div class="inner-rapper">
                  <div class="inner-rapper-blue">
                      <div class="inner__text--left">
                        <div class="inner__text--top">
                            <h4 class="ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="1.5s" swiper-animate-delay="0s" v-html="item.title"></h4>
                            <p class="description  ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="2.0s" swiper-animate-delay="0s" v-html="item.description"></p>
                            <p class="btn-more ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="2.2s" swiper-animate-delay="0s">
                              <router-link :to="item.link">자세히 보기</router-link>
                            </p>
                        </div>
                        <div class="card__list mo">
                          <div class="card__list--innerbox">
                            <div v-for="(card, index) in item.card"
                                swiper-animate-effect="rotate" swiper-animate-duration="1.0s" swiper-animate-delay="0.5s"
                                class="card-item"
                                :key="index"
                                :class="`card0${index + 1}`"
                              >
                              <img :src="card.cardUrl" alt="">
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div class="inner-rapper-white pc">
                      <div class="card__list">
                        <div class="card__list--innerbox">
                          <div v-for="(card, index) in item.card"
                              swiper-animate-effect="rotate" swiper-animate-duration="1.0s" swiper-animate-delay="0.5s"
                              class="card-item"
                              :key="index"
                              :class="`card0${index + 1}`"
                            >
                            <img :src="card.cardUrl" alt="">
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
            </swiper-slide>
            <div class="swiper-etc">
              <div class="etc-box">
                  <div class="etc">
                    <div class="swiper-scrollbar" slot="scrollbar"></div>
                    <!-- pagination -->
                    <div class="swiper-pagination" slot="pagination"></div>
                    <!-- navigation -->
                    <div class="swiper-button-prev swiper-btn-prev" slot="button-prev"></div>
                    <div class="swiper-button-next swiper-btn-next" slot="button-next"></div>
                  </div>
              </div>
            </div>
          </swiper>
        </div>
      </div>
      <!-- // section03 -->
      <div class="section section04"
        ref="section4"
        data-color="color-white"
        :style="{ 'background-color': '#fff' }"
      >
        <div class="section-inner slideup">
          <div  ref="section4"  class="section-title">
            <h2>
              RCS Service<br class="mo"> Guide
            </h2>
            <p class="title-description">RCS 서비스의 이해도에<br class="mo"> 따른 가이드를 참고하세요</p>
          </div>
          <ul class="rcs-service-guide__list">
            <li>
                <router-link to="">
                  <h3>RCS 비즈 메시지</h3>
                  <p>RCS서비스를 처음 사용하는 고객을<br>
                  위한 메시지 발송 팁 & 메시지 종류</p>
                </router-link>
            </li>
            <li>
                <router-link to="">
                  <h3>RBC 이용하기</h3>
                  <p>계정관리, 브랜드관리, 대화방관리를<br>위한 종류와 권한 안내</p>
                </router-link>
            </li>
            <li>
                <router-link to="">
                  <h3>RBC 화면 가이드</h3>
                  <p>RCS 전체 서비스의 효율적인<br>활용을 위한 사용 가이드</p>
                </router-link>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import '@/assets/swiper/animate.css'
import swiperAni from '@/assets/swiper/swiper.animate.js'
import NoticePopup from '@/views/mypage/components/popupSet/NoticePopup.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    NoticePopup
  },
  data() {
    return {
      activeSlide: 0,
      isSliderEnter: false,
      keyVisualLinks: true,
      rbcCase: [
        {
          customer: 'lgu',
          title: 'Smart Score (스마트 스코어) ',
          description: '회원 대상 타겟 마케팅 매체의 문자를 RCS로 변경하면서<br>반응이 늘고 매출액도 향상되었습니다.',
          link: '#',
          card: [
            {
              type: 'card',
              cardUrl: require('@/assets/images/main/lgu_card01.png')
            },
            {
              type: 'card',
              cardUrl: require('@/assets/images/main/lgu_card02.png')
            }
          ]
        },
        {
          customer: 'skt',
          title: 'SK텔레콤 (티 딜)',
          description: 'SK 텔레콤 고객을 대상으로 AI로 큐레이션한 다양한<br class="mo"> 상품의<br class="pc"> 핫딜을 제공하는 서비스로 RCS 메시지를 통해<br class="mo"> 고객에게<br class="pc"> 다양한 제안을 제공하며 좋은 성과를 내고<br class="mo"> 있습니다.',
          link: '#',
          card: [
            {
              type: 'card',
              cardUrl: require('@/assets/images/main/skt_card01.png')
            },
            {
              type: 'card',
              cardUrl: require('@/assets/images/main/skt_card02.png')
            },
            {
              type: 'card',
              cardUrl: require('@/assets/images/main/skt_card03.png')
            }
          ]
        },
        {
          customer: 'kt',
          title: 'BC Card (BC 카드)',
          description: '이미지, 액션버튼등 클릭 가능 영역이 확대되어<br>이벤트 페이지 진입율이 증가했습니다.',
          link: '#',
          card: [
            {
              type: 'card',
              cardUrl: require('@/assets/images/main/kt_card01.png')
            },
            {
              type: 'card',
              cardUrl: require('@/assets/images/main/kt_card03.png')
            },
            {
              type: 'card',
              cardUrl: require('@/assets/images/main/kt_card02.png')
            }
          ]
        }
      ],
      messageType: [
        {
          type: '이미지 강조 타입',
          cardUrl: require('@/assets/images/main/message_card01.png')
        },
        {
          type: 'LMS 템플릿 서술형',
          cardUrl: require('@/assets/images/main/message_card02.png')
        },
        {
          type: '이미지 템플릿 캐로셀형',
          cardUrl: require('@/assets/images/main/message_card03.png')
        },
        {
          type: '이미지 템플릿 아이템 상세형',
          cardUrl: require('@/assets/images/main/message_card04.png')
        },
        {
          type: 'LMS 템플릿 청구서형',
          cardUrl: require('@/assets/images/main/message_card05.png')
        },
        {
          type: '이미지 & 타이틀 강조형',
          cardUrl: require('@/assets/images/main/message_card06.png')
        },
        {
          type: '썸네일형',
          cardUrl: require('@/assets/images/main/message_card07.png')
        },
        {
          type: 'LMS 템플릿 문단형',
          cardUrl: require('@/assets/images/main/message_card08.png')
        },
        {
          type: 'SNS형',
          cardUrl: require('@/assets/images/main/message_card09.png')
        },
        {
          type: 'SNS형 (중간버튼)',
          cardUrl: require('@/assets/images/main/message_card10.png')
        }
      ],
      messageSwiper: {
        spaceBetween: 10,
        // watchOverflow: true,
        slidesPerView: 1.5,
        // mousewheel: {
        //   releaseOnEdges: true
        // },
        autoplay: {
          delay: 0,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        speed: 8000,
        loop: true,
        breakpoints: {
          768: {
            spaceBetween: 20,
            slidesPerView: 3.8
          },
          1280: {
            spaceBetween: 20,
            slidesPerView: 4.8
          }
        }
      },
      caseSwiper: {
        spaceBetween: 0,
        slidesPerView: 1,
        parallax: true,
        observer: true,
        observeParents: true,
        speed: 1500,
        effect: 'fade',
        // autoplay: {
        //   delay: 5000,
        //   pauseOnMouseEnter: true
        // },
        on: {
          init: function () {
            swiperAni.swiperAnimateCache(this)
            swiperAni.swiperAnimate(this)
          },
          slideChange: function () {
            swiperAni.swiperAnimate(this)
          }
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          formatFractionCurrent: function (number) {
            return ('0' + number).slice(-2)
          },
          formatFractionTotal: function (number) {
            return ('0' + number).slice(-2)
          },
          renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span> <span class="${totalClass}"></span>`
          }
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
          hide: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          768: {
            spaceBetween: 0,
            slidesPerView: 'auto'
          }
        }
      },
      scrolled: false,
      scrollY: null,
      cardElWid: null,
      ScrollEl: false,
      bgLiveColor: 'rgb(255,255,255)',
      backgroundColor: '#fff',
      scrollLeft: 0,
      scrollTimeout: null,
      bodyColor: '',
      currentSection: 0,
      calculatedFontSize: 0,
      keyBarPs: ''
    }
  },
  computed: {
    swiper() {
      return this.$refs.caseSwiper.$swiper
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollY = Math.round(window.scrollY)
    })
    this.windowHeight = window.innerHeight
    this.applyStyles()
    this.calcPos()
    window.addEventListener('resize', this.resizeHandler)
  },
  methods: {
    onSwiper (swiper) {
      console.log(swiper)
    },
    onSlideChangeStart(swiper) {
      this.ActiveSlide = this.$refs.caseSwiper.$swiper.activeIndex
      console.log(this.ActiveSlide)
    },
    onSlideChangeEnd(swiper) {
      this.ActiveSlide = this.$refs.caseSwiper.$swiper.activeIndex
      const caseList = this.$el.querySelectorAll('.section03 .swiper-slide')
      caseList.forEach((item, index) => {
        if (index === this.ActiveSlide) {
          const cardList = document.querySelectorAll('.card-item')
          cardList.forEach(card => {
            card.classList.add('ani')
          })
        }
      })
    },
    handleScroll() {
      // 스크롤 up animation event
      let obj = document.querySelectorAll('.slideup')
      let height = document.documentElement.clientHeight
      obj.forEach(section => {
        let { top, bottom } = section.getBoundingClientRect() // 각 섹션의 위치를 가져옵니다.
        let isInViewport = top < height && bottom > 0 // 섹션이 뷰포트 안에 있는지 확인합니다.
        if (isInViewport) {
          section.classList.add('slideInUp')
        }
      })
      // 스크롤 swiper event
      let slideElement = document.querySelector('.section03 .slider__wrap')
      this.$nextTick(function() {
        let { top, bottom } = slideElement.getBoundingClientRect()
        let InViewport = top < height && bottom > 0
        let AllSlider = document.querySelectorAll('.section03 .slider__wrap .swiper-slide .card-item')
        let activeSlider = document.querySelectorAll('.section03 .slider__wrap .swiper-slide.swiper-slide-active .card-item')
        if (InViewport) {
          AllSlider.forEach(slide => {
            slide.classList.add('ani')
          })
          activeSlider.forEach(card => {
            card.classList.add('rotate', 'animated')
          })
        }
      })

      // 배경칼라 변경
      const sections = this.$refs
      const scrollVal = window.scrollY
      const docBody = document.body

      for (const key in sections) {
        const section = sections[key]
        if (section && section.offsetTop <= scrollVal && section.offsetTop + section.clientHeight > scrollVal) {
          const color = section.dataset.color
          if (color) {
            this.bodyColor = color
          }
        }
      }
      docBody.className = this.bodyColor
      // 키비 제어
      if (window.scrollY > 100 && window.innerWidth > 768) {
        this.keyVisualLinks = false
      } else {
        this.keyVisualLinks = true
      }
    },
    applyStyles() {
      // .swiper-etc 클래스에 스타일을 동적으로 적용
      let isMobile = window.innerWidth <= 768
      const swiperEtcElement = this.$el.querySelector('.swiper-etc')
      const etcBox = this.$el.querySelector('.swiper-etc .etc-box')
      const etc = this.$el.querySelector('.swiper-etc .etc-box .etc')
      if (!isMobile) {
        swiperEtcElement.style.position = 'absolute'
        swiperEtcElement.style.width = '60%'
        swiperEtcElement.style.height = '30px'
        swiperEtcElement.style.bottom = '270px'
        etcBox.style.position = 'relative'
        etcBox.style.width = '100%'
        etcBox.style.height = '100%'
        etcBox.style.display = 'flex'
        etcBox.style.justifyContent = 'center'
        etc.style.position = 'absolute'
        etc.style.width = '650px'
        etc.style.height = '24px'
        etc.style.top = '67%'
        etc.style.left = '50%'
        etc.style.marginLeft = '-325px'
      } else {
        swiperEtcElement.style.position = ''
        swiperEtcElement.style.width = ''
        swiperEtcElement.style.height = ''
        swiperEtcElement.style.bottom = ''
        etcBox.style.position = ''
        etcBox.style.width = ''
        etcBox.style.height = ''
        etcBox.style.display = ''
        etcBox.style.justifyContent = ''
        etc.style.position = ''
        etc.style.width = ''
        etc.style.height = ''
        etc.style.top = ''
        etc.style.left = ''
        etc.style.marginLeft = ''
      }
    },
    // 키비 높이 계산
    calcPos() {
      if (window.innerWidth > 768) {
        const keyViheight = this.$refs.keyVi.clientHeight
        const MainViHeight = document.querySelector('.video-frame').clientHeight
        const winHeight = window.innerHeight
        this.keyBarPs = winHeight - 100
        // const thisPos1 = keyViheight - winHeight
        if (MainViHeight <= winHeight || winHeight >= MainViHeight) {
          this.keyBarPs = 'auto'
        } else {
          this.keyBarPs = winHeight - 100
        }
      }
    },
    resizeHandler() {
      this.calcPos()
      this.applyStyles()
    }
  }
}
</script>
