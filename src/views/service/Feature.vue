<template>
  <div class="feature__wrap" ref="featureTop">
    <PageTitle pagetitle="RCS 특장점" />
    <div class="fix-box" ref="fix">
      <div class="category-tab" :class="{fixed: isMenuFixed, hidden: ishidden}" ref="categoryTabS">
        <ul ref="categoryTab"
          :style="{ transform: 'translate3d(' + pos + ', 0, 0)' }"
        >
          <li  v-for="(item, i) in featureList"
            :key="i"
            :class="{active: activeTab === i}">
            <a role="button" @click="MenuClick(i)">{{ item.list }}</a>
          </li>
        </ul>
      </div>
      <!-- 템플릿 메시지 -->
      <div class="feature_1" ref="feature1">
        <div class="one-box">
          <div class="feature-txt">
            <div class="txt-tit">
              고객의 마음까지 한 눈에 <br class="max-br only-mo">사로잡는 비주얼!
            </div>
            <div class="txt-des">
              외면받는 무미건조한 문자메시지, <span class="des-strong">한번을 보내도 제대로!</span><br>
              RCS로 고객의 <span class="des-strong">마음까지 한 눈에 사로잡는</span> 메시지를<br class="only-mo"> 보내세요.<br class="only-pc">
              <span class="des-strong">이미지, 동영상</span>은 물론 RCS만의 <span class="des-strong">다양한<br class="only-mo"> 액션버튼</span>을 활용하여<br class="only-pc">
              제대로 어필할 수 있습니다.
            </div>
          </div>
          <div class="feature-img first-img">
            <img src="@/assets/images/feature/feature_msg_01.png" alt="" class="only-pc">
            <img src="@/assets/images/feature/feature_msg_01_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="one-gray-box">
          <div class="feature-txt">
            <div class="txt-top">
              <div class="txt-tit">
                이것이 진정한 가성비!
              </div>
              <div class="txt-des">
                같은 단가에서도 문자보다 <br class="only-mo"><span class="des-strong">최대 2.5배 더 많은 정보</span>를 전달!<br>
                RCS 문자는 광고 표시 영역, 수신거부 표시 영역,<br class="only-mo"> 액션 버튼 영역이 제공되며, <br class="only-pc">
                <span class="des-strong">세 영역 모두 글자수에<br class="only-mo"> 포함되지 않아 더 많은 글자 수를 이용</span>할 수 있어요.
              </div>
            </div>
            <div class="txt-middle">
              <img src="@/assets/images/feature/feature_msg_01_01.png" alt="" class="phone-img only-pc">
              <img src="@/assets/images/feature/feature_msg_01_01_mo.png" alt="" class="phone-img only-mo">
            </div>
          </div>
          <div class="feature-big-txt">
            <div class="big-txt">
              이렇게 아름다운 <br class="only-mo"><span class="big-txt-black">RCS 메시지가 </span><br class="only-pc">
              오히려<br class="only-mo"><span class="big-txt-black"> 기존 MMS 메시지 대비</span><br>
              건당 가격은 <span class="blue-gradient">30% </span><br class="only-mo">저렴하답니다!
            </div>
            <div class="feature-img">
              <img src="@/assets/images/feature/feature_msg_01_02.png" alt="" class="only-pc">
              <img src="@/assets/images/feature/feature_msg_01_02_mo.png" alt="" class="only-mo">
            </div>
          </div>
        </div>
      </div>
      <!-- 대화방 메뉴 -->
      <div class="feature_2" ref="feature2">
        <div class="one-box">
          <div class="feature-txt">
            <div class="txt-tit">
              꼭! 필요한 내용은<br>대화방 메뉴로
            </div>
            <div class="txt-des">
              추가로 메시지를 보내지 않아도, <span class="des-strong">대화방 메뉴</span>를 통해 <br class="only-mo"><span class="des-strong">고객과의 소통</span>을<br class="only-pc">
              주고받을 수 있으며 매장 위치 안내,<br class="only-mo"> 영업시간안내, 진행 중인 이벤트 등<br class="only-pc">
              <span class="des-strong">다양한 정보</span>를 추가로 <br class="only-mo"><span class="des-strong">전달</span>해 보세요.
            </div>
          </div>
          <div class="feature-img bg-img">
            <img src="@/assets/images/feature/feature_msg_02.png" alt="" class="only-pc">
            <img src="@/assets/images/feature/feature_msg_02_mo.png" alt="" class="only-mo">
          </div>
        </div>
      </div>
      <!-- 브랜드 프로필 -->
      <div class="feature_3" ref="feature3">
        <div class="feature-box">
          <div class="feature-txt">
            <div class="txt-tit">
              내 브랜드의 진정성을!
            </div>
            <div class="txt-des">
              수신 메시지에 <span class="des-strong">브랜드 로고</span>가 자동 노출되어 고객에게 <br class="only-mo"><span class="des-strong">홍보와
              신뢰도</span>를 동시에 얻을 수 있습니다.<br>
              브랜드 등록은 <span class="des-strong">무료</span>이며 RCS Biz Center에 브랜드와<br class="only-mo"> 발신번호를
              등록하면 RCS가 아닌<br class="only-pc"> 기존 문자로 전송<br class="only-mo"> 시에도 발신번호 대신
              <span class="des-strong">브랜드 로고가 표시</span>됩니다.
            </div>
          </div>
          <div class="feature-img only-bd">
            <img src="@/assets/images/feature/feature_msg_03.png" alt="" class="only-pc">
            <img src="@/assets/images/feature/feature_msg_03_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="feature-box">
          <div class="feature-txt">
            <div class="txt-tit">
              국가기관의 공인 안심마크
            </div>
            <div class="txt-des">
              <span class="des-strong">한국인터넷진흥원(KISA)에서 인증</span>한 금융/공공기관에서<br class="only-mo"> 발행하는 RCS메시지는<br class="only-pc">
              <span class="des-strong">‘안심마크’</span>를 표시하여 <br class="only-mo"><span class="des-strong">사칭문자로 인한 스미싱 범죄 등에 안전함</span>을<br class="only-mo"> 안내할 수 있습니다.
            </div>
          </div>
          <div class="feature-img only-bd">
            <div class="txt-notice only-safetymark">
              <div class="title">
                <h5>안심마크란?</h5>
              </div>
              <p>
                사칭문자 구별을 위해 RCS메시지 상단에 인증마크(<span class="safetymark-img"></span>)와,<br class="only-mo"> 안심문구(확인된 발신번호)<br class="only-pc">
                를 결합하여 표시해주며, 실제<br class="only-mo"> 해당 기업이 발송했음을 증명합니다.
              </p>
              <p>
                스미싱 사고가 자주 발생하는 금융/공공기관등을 대상으로 <br class="only-mo">
                안심마크 사용권한을 부여하고 있으니, <br class="only-pc">도입을 희망하시는 경우 <br class="only-mo">
                한국 인터넷 진흥원(<a class="safety-url" href="mailto:numbers@kisa.or.kr">numbers@kisa.or.kr</a>)으로 문의해주세요.
              </p>
            </div>
            <img src="@/assets/images/feature/feature_msg_03_01.png" alt="" class="only-pc">
            <img src="@/assets/images/feature/feature_msg_03_01_mo.png" alt="" class="only-mo">
          </div>
        </div>
      </div>
      <!-- 브랜드 소식 -->
      <div class="feature_4" ref="feature4">
        <div class="one-box">
          <div class="feature-txt top-box">
            <div class="txt-tit">
              새로운 브랜드 소식!
            </div>
            <div class="txt-des">
              고객의 <span class="des-strong">수신 이력에 남아있는</span> 브랜드만 클릭해도 브랜드의 <br class="only-mo">
              <span class="des-strong">새로운 소식</span>을 전할 수 있습니다.<br>
              내 브랜드의 이벤트, 신상 소개 등을 <span class="des-strong">채팅플러스</span>에<br class="only-mo"> 올려보세요!
            </div>
          </div>
          <div class="feature-img bg-img">
            <img src="@/assets/images/feature/feature_msg_04.png" alt="" class="only-pc">
            <img src="@/assets/images/feature/feature_msg_04_mo.png" alt="" class="only-mo">
          </div>
        </div>
      </div>
      <!-- 고객반응 분석 -->
      <div class="feature_5" ref="feature5">
        <div class="feature-box">
          <div class="feature-txt">
            <div class="txt-tit">
              정확한! 고객 반응 분석
            </div>
            <div class="txt-des">
              발송한 메시지를 고객이 실제로 <span class="des-strong">읽었는지</span>,<br class="only-mo"> 버튼별로 얼마나
              <span class="des-strong">반응했는지 </span><br class="only-pc"><span class="des-strong">그래프로 확인</span><br class="only-mo">할 수 있습니다.
            </div>
          </div>
          <div class="feature-img">
            <img src="@/assets/images/feature/feature_msg_05.png" alt="" class="only-pc">
            <img src="@/assets/images/feature/feature_msg_05_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="feature-box">
          <div class="feature-txt">
            <div class="txt-tit">
              내 브랜드의<br class="only-mo"> 진정한 고객은 누구?
            </div>
            <div class="txt-des">
              전체 및 반응 고객의 <span class="des-strong">특성</span>(성별, 연령, 지역)과<br class="only-mo"><span class="des-strong"> Lifestyle의 분석</span>으로<br class="only-pc">
              고객의 내면을 이해하고 다음 <br class="only-mo"><span class="des-strong">마케팅 방향</span>을 다듬어보세요.
            </div>
          </div>
          <div class="feature-img">
            <img src="@/assets/images/feature/feature_msg_05_01.png" alt="" class="only-pc">
            <img src="@/assets/images/feature/feature_msg_05_01_mo.png" alt="" class="only-mo">
          </div>
        </div>
      </div>
      <!-- 문자의 장점 그대로 -->
      <div class="feature_6" ref="feature6">
        <div class="feature-box">
          <div class="feature-txt">
            <div class="txt-tit">
              추가 동의를 받지 않아도 <br>광고 문자 전송 가능!
            </div>
            <div class="txt-des">
              <span class="des-strong">기존에 광고 문자</span>를 전송하던 사용자에게 <span class="des-strong">그대로</span> RCS로<br class="only-mo"> 광고 문자<span class="des-strong"> 전송이 가능</span>합니다.<br class="only-pc">
              즉, 힘들게 광고 문자 수신<br class="only-mo"> 동의를 다시 받거나, 채널 추가 등의 번거로운 과정이<br>
              필요하지 않습니다.
            </div>
          </div>
          <div class="feature-img">
            <img src="@/assets/images/feature/feature_msg_06.png" alt="" class="only-pc">
            <img src="@/assets/images/feature/feature_msg_06_mo.png" alt="" class="only-mo">
          </div>
        </div>
      </div>
    </div>
    <!-- scroll-to-Top -->
    <button
      ref="topButton"
      class="scroll-to-top"
      :class="{ isFixed: isScrollTop }"
      @click="scrollToTop"
    >
      <span class="blind">위로</span>
    </button>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'

export default {
  components: {
    PageTitle
  },
  data() {
    return {
      activeTab: 0,
      isMenuFixed: false,
      ishidden: false,
      listIWidth: '',
      pos: 0,
      transitionDuration: '500ms',
      featureList: [{
        list: '템플릿 메시지'
      },
      {
        list: '대화방 메뉴'
      },
      {
        list: '브랜드 프로필'
      },
      {
        list: '브랜드 소식'
      },
      {
        list: '고객반응 분석'
      },
      {
        list: '문자의 장점 그대로'
      }],
      scrollY: null, // scroll-to-Top
      isScrollTop: false // scroll-to-Top
    }
  },
  mounted() {
    window.addEventListener('scroll', this.MenuScroll)
    this.MenuScroll()
    // scroll-to-Top
    window.addEventListener('scroll', () => {
      this.scrollY = Math.round(window.scrollY)
    })
    this.ActiveMove()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.MenuScroll)
  },
  // scroll-to-Top
  watch: {
    scrollY(newValue) {
      if (newValue >= 100) {
        this.isScrollTop = true
      } else {
        this.isScrollTop = false
      }
      this.scrollPosition = window.scrollY
    }
  },
  methods: {
    async MenuClick(index) {
      window.removeEventListener('scroll', this.MenuScroll) // MenuScroll 활성화랑 겹쳐서 삭제
      // 클릭 시, 메뉴가 잠깐 사라졌다가 transtion으로 나오도록 해야함
      this.ishidden = true
      await this.$nextTick()

      // 0.1초 지난 후 MenuScroll 실행
      setTimeout(() => {
        this.ishidden = false
        window.addEventListener('scroll', this.MenuScroll)
      }, 1000)

      this.activeTab = index // 활성화 상태
      const refs = [this.$refs.feature1, this.$refs.feature2, this.$refs.feature3, this.$refs.feature4, this.$refs.feature5, this.$refs.feature6]
      const target = refs[index]
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        this.isMenuFixed = true
      }
      this.ActiveMove()
    },
    MenuScroll() {
      const featureTab = this.$refs.categoryTabS
      let featureTop = featureTab.offsetTop
      const featureHeight = featureTab.offsetHeight + featureTop
      const scrollY = window.scrollY
      const featurePannels = [this.$refs.feature1, this.$refs.feature2, this.$refs.feature3, this.$refs.feature4, this.$refs.feature5, this.$refs.feature6]
      if (scrollY > featureHeight) {
        featureTab.classList.add('fixed')
      } else {
        featureTab.classList.remove('fixed')
      }
      for (let i = 0; i < featurePannels.length; i++) {
        let thisSection = featurePannels[i]
        let currenTop = featurePannels[i].offsetTop
        if (scrollY >= currenTop) {
          if (this.activeTab !== i) {
            this.activeTab = i
            this.ActiveMove()
          }
          // 마지막 일때 체크
          const recentFinal = featurePannels[5].getBoundingClientRect()
          if (recentFinal.bottom <= window.innerHeight) {
            this.activeTab = 5
          }
        }
      }
    },
    ActiveMove() {
      const AllTabEl = this.$refs.categoryTab.querySelectorAll('li')
      let listIWidth = 0
      let targetLeft = 0
      if (window.innerWidth <= 768) {
        const currentTap = this.activeTab
        const isActiveTab = this.$refs.categoryTab.querySelectorAll('li')[currentTap]
        const selectTarget = isActiveTab.offsetLeft
        const selectTargetPos = selectTarget + (isActiveTab.offsetWidth / 2)

        const tabListWdth = this.$refs.categoryTab.offsetWidth
        const scrollBoxHalf = Math.ceil(tabListWdth / 2)

        for (let i = 0; i < AllTabEl.length; i++) {
          listIWidth += AllTabEl[i].offsetWidth
        }
        if (selectTargetPos <= scrollBoxHalf) {
          this.pos = 0
        } else if ((listIWidth - selectTargetPos) <= scrollBoxHalf) {
          this.pos = listIWidth - tabListWdth
        } else {
          this.pos = selectTargetPos - scrollBoxHalf
        }
        // 실시간으로 반영하기 위한 추가 코드
        this.$nextTick(() => {
          this.$refs.categoryTab.style.transform = `translate3d(${-this.pos}px, 0, 0)`
          this.$refs.categoryTab.style.transitionDuration = this.transitionDuration
        })
      } else {
        this.$nextTick(() => {
          this.$refs.categoryTab.style.transform = `translate3d(0, 0, 0)`
        })
      }
    },
    // scroll-to-Top
    scrollToTop (refName) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      if (this.isMenuFixed === true) {
        document.querySelector('.feature__wrap .category-tab.fixed').classList.remove('fixed')
      }
    }
  }
}
</script>
