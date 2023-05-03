<template>
  <div class="rcs_container main">
    <article id="content" class="content">
      <!-- 여기서부터 이전 배너 시작
      <div class="visual_wrap">
        <div class="visual_bg"></div>
        <div class="inner_visual">
          <div class="mockup_wrap">
            <div class="mockup_cont">
              <img v-show="!startVideoYn" src="../assets/images/main/bg_main_mov2.png"/>
              <video v-show="startVideoYn" type="video/mp4" loop muted="muted" preload="none" playsinline poster="../assets/images/main/bg_main_mov2.png" style="width:287px; height:607px;" id="videoTag">
                <source src="../assets/images/main/main_mob2.mp4">
              </video>
            </div>
          </div>
          <div class="title_wrap">
            <h2 class="visual_title">
              <img src="../assets/images/main/main_visual_title.png" alt="RCS Biz Center">
            </h2>
            <span class="visual_desc">문자 메시지 본연의 사용성을 개선하여<br>진화된 메시징 경험과 기업 브랜딩을 제공합니다.</span>
            <div class="btn_wrap" v-if="loginCheck">
              <a href="javascript:void(0);" class="btn point" @click="goJoin"><span>서비스 가입</span></a>
              <a href="javascript:void(0);" class="btn" @click="goLogin"><span>로그인</span></a>
            </div>
          </div>
        </div>
      </div>
      여기서부터 이전 배너 끝 -->

      <!-- Start : 신규배너 2022 SI 고도화 (남미라)  -->
      <carousel v-bind="optionsMain" class="visual2_main" @changed="changedMain">

        <div class="slides slide1">
          <div class="slide_left">
            <h4>기존보다 합리적인 가격,<br/>광고로도 이용 가능한<br/>새로운 템플릿이 추가되었습니다.</h4>
            <p>정보 및 광고용으로 모두 이용 가능한 이미지 템플릿.<br/>기존 RCS MMS보다 저렴한 가격으로 이용해보세요!</p>
            <div class="btn_wrap">
                <a href="/intro/service#themeIntro">더 알아보기</a>
                <!-- <a href="javascript:void(0);" @click="commTplView">더 알아보기</a> -->
            </div>
          </div>
          <div class="slide_right slidingIn">
            <div class="gallery_wrap">
              <div class="gallery_column column1">
                <div class="gallery_tile tile_fade"><img src="@/assets/images/theme/card1.png" alt="sample image"/></div>
                <div class="gallery_tile"><img src="@/assets/images/theme/card6.png" alt="sample image"/></div>
                <div class="gallery_tile tile_fade"><img src="@/assets/images/theme/card7.png" alt="sample image"/></div>
              </div>
              <div class="gallery_column column2">
                <div class="gallery_tile"><img src="@/assets/images/theme/card4.png" alt="sample image"/></div>
                <div class="gallery_tile"><img src="@/assets/images/theme/card5.png" alt="sample image"/></div>
              </div>
              <div class="gallery_column column3">
                <div class="gallery_tile tile_fade"><img src="@/assets/images/theme/card1.png" alt="sample image"/></div>
                <div class="gallery_tile"><img src="@/assets/images/theme/card3.png" alt="sample image"/></div>
                <div class="gallery_tile tile_fade"><img src="@/assets/images/theme/card2.png" alt="sample image"/></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2302232 미리캔버스 이벤트 추가 -->
        <div class="slides slide4 miri">
          <div class="slide_left">
            <p style="color: #6287E4; margin-bottom: 8px; font-size: 24px; letter-spacing: -1px;">미리캔버스를 활용한 RCS 이미지 제작 지원</p>
            <h4 style="color:#333957;">RCS 메시지에 필요한 이미지를<br>쉽게 만들어보세요</h4>
            <p style="color:#333957;">다양한 소식을 이미지로 풍부하게 전달할 수 있는<br>이미지형 RCS를 쉽게 제작할 수 있도록 미리캔버스가 도와드립니다.</p>
            <div class="btn_wrap">
                <a href="javascript:void(0)" @click="goMiriCanvas">더 알아보기</a>
            </div>
          </div>
          <div class="slide_right slidingIn">
            <div class="slide_miri"><img src="@/assets/images/theme/main_miri.png"/></div>
          </div>
        </div>
        <!-- //2302232 미리캔버스 이벤트 추가 -->

        <div class="slides slide2">
          <div class="slide_left">
            <h5>깔끔하게 정리된<br/>알림 메시지</h5>
            <p>타이틀 자유형 테마로 가시성 뛰어난 메시지 템플릿을<br/>만들 수 있습니다.<br/>새로운 타이틀 자유형 테마를 만나보세요.</p>
            <div class="btn_wrap">
                <a href="/intro/service#themeIntro">더 알아보기</a>
              </div>
          </div>
          <div class="slide_right slidingIn">
            <div class="slide2_right_small"><img src="@/assets/images/theme/examplepic1.png" alt="banner img1"/></div>
            <div class="slide2_right_large"><img src="@/assets/images/theme/examplepic2.png" alt="banner img2"/></div>
          </div>
        </div>

        <div class="slides slide3">
          <div class="slide_left">
            <h5 style="display:none;"><b>RCS</b> Biz Center</h5>
            <img src="../assets/images/main/main_visual_title.png" alt="RCS Biz Center" style="width:Auto; height:45px; margin-bottom:30px;">
            <p>문자 메시지 본연의 사용성을 개선하여<br/>진화된 메시징 경험과 기업 브랜딩을 제공합니다.</p>
            <div class="btn_wrap" v-if="loginCheck">
              <a href="javascript:void(0);"  @click="goJoin"><span>서비스 가입</span></a>
              <a href="javascript:void(0);" class="btn_border" @click="goLogin"><span>로그인</span></a>
            </div>
          </div>
          <div class="slide_right" style="padding-left:440px;box-sizing: border-box;">
            <div class="phone_frame_outer">
              <div class="phone_frame_inner">
                <video type="video/mp4" loop muted="muted" poster="../assets/images/main/bg_main_mov2.png" autoplay><source src="../assets/images/main/main_mob2.mp4"/></video>
              </div>
            </div>
          </div>
        </div>
      </carousel>
       <!-- End : 신규배너 2022 SI 고도화 (남미라)  -->

      <section class="section MainMoPT">
        <div class="inner_sec">
          <h3 class="h3_sec_title character">RCS 특징</h3>
          <carousel v-bind="optionsFeature" @init="initialized" class="feature_list">
            <div class="slides">
              <div class="con">
                <span class="rcs_icon icon_app"></span>
                <h4 class="title">기본 문자 앱 기반 사용성</h4>
                <span class="desc">
                  별도의 앱 설치없이
                  <br>기본 문자 앱을 바탕으로
                  <br>메시지를 전달 받을 수 있습니다.
                </span>
              </div>
            </div>
            <div class="slides">
              <div class="con">
                <span class="rcs_icon icon_message"></span>
                <h4 class="title">신뢰할 수 있는 메시지</h4>
                <span class="desc">
                  RCS 서비스는 사전 검증
                  <br>프로세스를 통해 인증받은
                  <br>기업과 브랜드만 이용 가능합니다.
                </span>
              </div>
            </div>
            <div class="slides">
              <div class="con">
                <span class="rcs_icon icon_format"></span>
                <h4 class="title">다양한 메시지포맷</h4>
                <span class="desc">
                  여러 형태의 레이아웃을 기반으로
                  <br>GIF 이미지, 동영상 등을 활용하여
                  <br>직관적이고 매력있는 메시지를 보낼 수 있습니다.
                </span>
              </div>
            </div>
            <div class="slides">
              <div class="con">
                <span class="rcs_icon icon_comm"></span>
                <h4 class="title">고객 소통</h4>
                <span class="desc">
                  대화형 메시지로
                  <br>고객에게 신속하고 정확한 서비스
                  <br>제공이 가능합니다.
                </span>
              </div>
            </div>
            <div class="slides">
              <div class="con">
                <span class="rcs_icon icon_get"></span>
                <h4 class="title">고객 관심 수집</h4>
                <span class="desc">
                  대화방 메뉴, 칩리스트 제공으로
                  <br>고객 needs를 파악할 수 있고,
                  <br>관심분야 데이터 수집이 가능합니다.
                </span>
              </div>
            </div>
            <div class="slides">
              <div class="con">
                <span class="rcs_icon icon_brand"></span>
                <h4 class="title">브랜드 홍보</h4>
                <span class="desc">
                  브랜드 공지, 이벤트 등
                  <br>상시 소식 등록으로
                  <br>브랜드 홍보가 가능 합니다.
                </span>
              </div>
            </div>
          </carousel>
        </div>
      </section>
      <section class="section slide_area">
        <div class="inner_sec">
          <h3 class="h3_sec_title servie">
            <strong>RCS</strong> 서비스
          </h3>
          <div class="service_title">
            <div class="title_wrap" v-bind:class="[{ active : index === activeIndex }]" v-for="(item, index) in items" v-bind:key="index">
              <h4 class="title">{{ item.title }}</h4>
              <span class="desc">{{ item.desc }}</span>
            </div>
          </div>

          <div class="service_slider_wrap">
            <carousel v-bind="options" @changed="changed" @init="initialized" class="service_slide">
              <div class="slides">
                <div class="inner">
                  <div class="video_area">
                    <video type="video/mp4" loop muted="muted" poster="../assets/images/main/bg_service_slide01_2.png" autoplay>
                      <source src="../assets/images/main/main_service01_2.mp4">
                    </video>
                  </div>
                </div>
              </div>
              <div class="slides">
                <div class="inner">
                  <div class="video_area">
                    <video type="video/mp4" loop muted="muted" poster="../assets/images/main/bg_service_slide03_2.png">
                      <source src="../assets/images/main/main_service03_2.mp4">
                    </video>
                  </div>
                </div>
              </div>
              <div class="slides">
                <div class="inner">
                  <div class="video_area">
                    <video type="video/mp4" loop muted="muted" poster="../assets/images/main/bg_service_slide02.png">
                      <source src="../assets/images/main/main_service02.mp4">
                    </video>
                  </div>
                </div>
              </div>
              <div class="slides">
                <div class="inner">
                  <div class="video_area">
                    <video type="video/mp4" loop muted="muted" poster="../assets/images/main/bg_service_slide04_2.png">
                      <source src="../assets/images/main/main_service04_2.mp4">
                    </video>
                  </div>
                </div>
              </div>
            </carousel>
          </div>
        </div>
      </section>
      <div class="MainServiceManagement">
      <section class="section service_preview">
        <div class="inner_sec">
          <div class="title_wrap">
            <h3 class="title">
              <img src="../assets/images/main/main_preview_title.png" alt="RCS Business Center">
              <br>서비스 관리
            </h3>
            <div class="btn_wrap">
              <a href="javascript:void(0);" class="btn" @click="goIntroService">
                <span>미리보기</span>
              </a>
            </div>
          </div>
          <div class="preview_list">
            <ul>
              <li>
                <span class="rcs_icon icon_brand"></span>
                <h4 class="title">브랜드 관리</h4>
                <span class="desc">
                  운영 중인 브랜드의 정보
                  <br>(홈페이지, 주소, 전화번호) 등록 및 권한 관리
                </span>
              </li>
              <li>
                <span class="rcs_icon icon_chat"></span>
                <h4 class="title">대화방 관리</h4>
                <span class="desc">
                  브랜드에서 사용하는 A2P, 양방향 메시지 수신을
                  <br>위한 대화방 정보(발신번호, 대화방ID, 챗봇 중계사,
                  <br>대화방 메뉴, 발신자명, 로고) 관리
                </span>
              </li>
              <li>
                <span class="rcs_icon icon_temp"></span>
                <h4 class="title">템플릿 관리</h4>
                <span class="desc">
                  기업의 특성에 맞는 메시지 템플릿에 대한
                  <br>사전 등록 기능을 제공
                </span>
              </li>
            </ul>
            <ul>
              <li>
                <span class="rcs_icon icon_message"></span>
                <h4 class="title">자동응답 메시지 관리</h4>
                <span class="desc">
                  양방향 메시지에 사용할 자동 응답에 대한
                  <br>사전 등록 기능을 제공
                </span>
              </li>
              <li>
                <span class="rcs_icon icon_agency"></span>
                <h4 class="title">대행사 관리</h4>
                <span class="desc">
                  브랜드의 대행사를 지정할 수 있으며,
                  <br>지정된 대행사를 통해서만 메시지를 발송
                  <br><br>
                </span>
              </li>
              <li>
                <span class="rcs_icon icon_news"></span>
                <h4 class="title">소식 관리</h4>
                <span class="desc">
                  브랜드의 소식, 행사에 대한
                  <br>등록 및 관리 기능을 제공
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      </div>
    </article>
    <notice-popup/>
    <comm-tpl-view-popup v-if="commTplViewVisible" :commTplViewVisible.sync="commTplViewVisible" default-product="M"/>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import noticePopup from '@/components/popupSet/NoticePopup'
import { getToken } from '@/utils/token'
import CommTplViewPopup from '@/views/service/components/CommTplViewPopup'

export default {
  name: 'Main',
  components: {
    carousel,
    noticePopup,
    CommTplViewPopup
  },
  data() {
    return {
      activeIndex: 0,
      options: {
        autoplay: false,
        nav: true,
        items: 3,
        center: true,
        dots: true,
        loop: true
      },
      commTplViewVisible: false,
      optionsFeature: {
        autoplay: true,
        autoplayTimeout: 3000,
        nav: true,
        items: 3,
        margin: 12,
        dots: false,
        loop: true
      },
      optionsMain: {
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 10000,
        nav: true,
        items: 1,
        center: true,
        dots: true,
        loop: true,
        video: true
      },
      items: [
        {
          title: '브랜드 홈',
          desc: '기업과 고객 간 연결을 위한 브랜드 정보를 제공합니다.'
        },
        {
          title: '단방향 메시지(기업→개인)',
          desc:
            '고객에게 노출하고 싶은 정보를 다양한 포맷으로 제공할 수 있습니다.'
        },
        {
          title: '양방향 메시지(기업↔고객)',
          desc:
            '고객과 시스템 간 대화형 인터렉션을 통해 즉각적이고 완결성 있는 서비스를 제공합니다.'
        },
        {
          title: '브랜드 소식',
          desc:
            '브랜드의 다양한 소식과 이벤트를 홍보할 수 있습니다.'
        }
      ],
      startVideoYn: false
    }
  },
  created() {},
  mounted() {
    this.startplay()
  },
  computed: {
    loginCheck() {
      return jglib.isEmpty(getToken())
    }
  },
  methods: {
    initialized(e) {
      this.activeIndex = e.item.index
    },
    startplay() {
      document.querySelector('#videoTag').play()
      window.setTimeout(() => {
        this.startVideoYn = true
      }, 1500)
    },
    autoplay() {
      let list = document.querySelectorAll('.slides .inner .video_area > video')
      Array.prototype.forEach.call(list, function(item) {
        item.pause()
        item.currentTime = 0
      })
      window.setTimeout(() => {
        document.querySelector('.center.active .slides .inner .video_area > video').play()
      }, 300)
    },
    changed(e) {
      this.activeIndex = e.page.index
      this.autoplay()
    },
    goJoin() {
      this.$router.push('/login')
    },
    goLogin() {
      this.$router.push('/login')
    },
    goIntroService() {
      this.$router.push('/intro/service')
    },
    goMiriCanvas() {
      this.$router.push('/intro/miricanvas')
    },
    changedMain() {
      let mainBann = document.querySelectorAll('.slide_right')
      mainBann.forEach(e => e.classList.remove('slidingIn'))
      window.setTimeout(() => {
        document.querySelector('.center.active .slides .slide_right').classList.add('slidingIn')
      }, 100)
    },
    commTplView() {
      this.commTplViewVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
/** test purging */
.not-used {
  display: block;
  border: 1px #000000 solid;
}
</style>
