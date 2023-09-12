<template>
  <div class="guide__inner">
    <div class="guide-lnb__wrap">
      <GuideLnb :menuData="guideLnbList" />
    </div>
    <div class="user-guide__wrap">
      <div class="guide-page__title">
        <h3>RCS 기업 메시지</h3>
      </div>
      <div class="guide__item" id="section01">
        <div class="subtitle-wrap">
          <h4>1. 서비스 구조</h4>
          <p class="description">기업 담당자는 RBC에서 직접 또는 대행사를 통하여 브랜드를 등록/관리할 수 있습니다. <br>RCS 기업 메시지 또한 지정한 대행사를 통하여 발송할 수 있습니다.</p>
        </div>
        <div class="guide-img__wrap">
          <img src="@/assets/images/guide/feature_company_msg_01.png" alt="">
          <p class="guide-text">대행사별로 지원하는 RCS 기업 메시지 종류가 상이할 수 있습니다.</p>
        </div>
      </div>
      <div class="guide__item" id="section02">
        <div class="subtitle-wrap">
          <h4>2. RCS 기업 메시지 활용 팁</h4>
        </div>
        <div class="subtitle-wrap">
          <h5 id="guide_2_1">2.1 미디어 활용하기</h5>
        </div>
        <div class="text-box__wrap">
          <div class="text-box">
            <p class="title">동적 이미지 (GIF)</p>
            <div class="text-two-box">
              <div class="text-two-box__inner">
                <p class="content">단조로운 메시지에 강조하고 싶은 내용을 동적 이미지로 만들어 제공할 수 <br>있습니다.<br>빠른 움직임이 자칫 메시지의 피로도를 줄 수 있으므로 이미지 제작 시 <br>적절한 속도감과 pause를 주는 것을 추천드립니다.</p>
                <img src="@/assets/images/guide/feature_company_msg_02.png" alt="">
              </div>
              <p class="content">RBC에서는 따로 GIF 이미지를 제작하지 않아도 바로 사용하실 수 있도록 <br>RBC에서는 메시지에 포인트를 줄 수 있는 GIF 로고를 제공하고 있습니다.</p>
            </div>
          </div>
          <img src="@/assets/images/guide/feature_company_msg_03.png" alt="">
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 메시지 전송 전 미디어 파일 등록 시, memeType : image/png로 등록하세요.</p>
            </div>
          </div>
        </div>
        <div class="btn__warp right multiline">
          <p><router-link to="" class="side-btn">미디어를 포함한 메시지 발송</router-link></p>
          <p><router-link to="" class="side-btn">GIF 만들기는 “미리 캔버스”</router-link></p>
        </div>
        <div class="text-box__wrap">
          <div class="text-box">
            <p class="title">동영상 스트리밍 (유튜브)</p>
            <div class="text-two-box">
              <div class="text-two-box__inner">
                <img src="@/assets/images/guide/feature_company_msg_04.png" alt="">
                <div class="text-two-box__inner-des">
                  <p class="content">RCS 기업 메시지에서 동영상 메시지를 보낼 수 있습니다.</p>
                  <p class="content">MMS처럼 이미지를 첨부하면서, 이미지 클릭 시 재생될 영상 URL만 추가하면 됩니다.</p>
                  <p class="content">첨부한 이미지는 동영상 미리보기 화면으로 사용되며, 이미지 클릭 시 단말기 상단에 PIP <br>형태로 영상이 재생 됩니다.</p>
                  <div class="gray-box__wrap">
                    <div class="gray-box">
                      <ul class="content">
                          <li>- 썸네일 이미지 : 1MB 이하 (Play 아이콘은 자동으로 표현 됩니다.)</li>
                          <li>- 영상 URL타입
                            <ul>
                              <li>https://www.youtube.com/watch?v=[videoId]</li>
                              <li>https://youtu.be[videoId]</li>
                              <li>https://m.youtube.com/watch?v=[videoId]</li>
                            </ul>
                          </li>
                          <li>- 이미지 동영상 재생 시점부터 사용자 데이터 과금이 됩니다.</li>
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="@/assets/images/guide/feature_company_msg_05.png" alt="">
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 메시지 전송 전 미디어 파일 등록 시, memeType : image/png로 등록하세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="guide-side__wrap">
      <div class="side__item">
        <div class="side__list">
          <div class="guide-lnb__wrap">
              <GuideLnb :menuData="brandMenu" />
          </div>
        </div>
      </div>
      <GuideSide />
    </div>
  </div>
</template>

<script>
import GuideLnb from '@/views/service/components/AccMenu.vue'
import GuideSide from '@/views/service/components/GuideSide.vue'
import guideLnbList from '@/views/service/components/guideLnb.js'

export default {
  components: {
    GuideLnb,
    GuideSide
  },
  data() {
    return {
      guideLnbList,
      brandMenu: [
        {
          'label': '2.1. 미디어 활용하기',
          'to': '#guide_2_1',
          'anchorIndex': 0,
          'children': [
            {
              'label': '동적 이미지 (GIF)',
              'to': '#guide_2_1_1',
              'anchorIndex': 0
            },
            {
              'label': '동영상 스트리밍 (유튜브)',
              'to': '#guide_2_1_2',
              'anchorIndex': 1
            },
            {
              'label': '투명한 이미지 (PNG)',
              'to': '#guide_2_1_3',
              'anchorIndex': 2
            },
            {
              'label': '버튼처럼 이용하기',
              'to': '#guide_2_1_4',
              'anchorIndex': 3
            }
          ]
        },
        {
          'label': '2.2. 메시지 연결하기',
          'to': '#guide_2_2',
          'anchorIndex': 1,
          'children': [
            {
              'label': '양방향 대화로 연결하기',
              'to': '#guide_2_2_1',
              'anchorIndex': 0
            },
            {
              'label': '자동응답 메시지 연결하기',
              'to': '#guide_2_2_2',
              'anchorIndex': 1
            }
          ]
        },
        {
          'label': '2.3. 그룹 아이디',
          'to': '#guide_2_3',
          'anchorIndex': 2
        },
        {
          'label': '2.4. 버튼',
          'to': '#guide_2_4',
          'anchorIndex': 3
        },
        {
          'label': '3.1. 발송 준비 체크 리스트',
          'to': '#guide_3_1',
          'anchorIndex': 4
        },
        {
          'label': '3.2. 메시지 발송',
          'to': '#guide_3_2',
          'anchorIndex': 5,
          'children': [
            {
              'label': '미디어를 포함한 메시지 발송',
              'to': '#guide_3_2_1',
              'anchorIndex': 0
            },
            {
              'label': '템플릿 메시지 발송',
              'to': '#guide_3_2_2',
              'anchorIndex': 1
            },
            {
              'label': '레이아웃 메시지 발송',
              'to': '#guide_3_2_3',
              'anchorIndex': 2
            },
            {
              'label': '메시지별 추가 설정',
              'to': '#guide_3_2_4',
              'anchorIndex': 3
            }
          ]
        }
      ]
    }
  },
  methods: {
  }
}
</script>
