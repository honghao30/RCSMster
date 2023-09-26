<template>
  <div class="guide_bg">
    <div class="guide__inner">
      <div class="guide-lnb__wrap" v-if="OnlyPcNav">
        <GuideLnb :menuData="guideLnbList" />
      </div>
      <div class="user-guide__wrap">
        <!-- 모바일 네비 -->
        <div class="user-guide__mo-nav--wrap">
            <div class="user-guide-nav"
              :class="{isActive: this.openGuidNav == true}"
            >
              <button type="button" ref="guideTriger" @click="movePage($event)">{{ this.$route.meta.tittle }}</button>
              <div class="guide-lnb__wrap" v-if="openGuidNav">
                <GuideLnb :menuData="guideLnbList"  :allOpen="true" @subItemClick="handleSubItemClick"  />
              </div>
            </div>
        </div>
        <!-- // 모바일 네비 -->
        <div class="guide-page__title">
          <h3>RCS 기업 메시지</h3>
        </div>
        <div class="guide__item" id="section01">
          <div class="subtitle-wrap">
            <h4>1. 서비스 구조</h4>
            <p class="description">기업 담당자는 RBC에서 직접 또는 대행사를 통하여 브랜드를 등록/관리할 수 있습니다.<br>RCS 기업 메시지 또한 지정한 대행사를 통하여 발송할 수 있습니다.</p>
          </div>
          <div class="guide-img__wrap mt-t8 mt-b0">
            <img src="@/assets/images/guide/feature_company_msg_01.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/feature_company_msg_01_mo.png" alt="" class="only-mo">
          </div>
          <ul class="guide-list__dot">
            <li>대행사별로 지원하는 RCS 기업 메시지 종류가 상이할 수 있습니다.</li>
          </ul>
        </div>
        <div class="guide__item" id="section02">
          <div class="subtitle-wrap">
            <h4>2. RCS 기업 메시지 활용 팁</h4>
          </div>
          <div class="subtitle-wrap mt-t8">
            <h5 id="guide_2_1">2. 1. 미디어 활용하기</h5>
            <p class="description">RCS MMS와 이미지템플릿에서 1MB 내의 미디어를 메시지에 넣어 보낼 수 있습니다.<br>미디어를 적절히 활용하여 더 효과적인 메시지를 만들어보세요.</p>
          </div>
          <div class="text-box__wrap">
            <div class="text-two-box">
              <div class="text-box">
                <p class="title" id="guide_2_1_1">동적 이미지 (GIF)</p>
                <p class="content">단조로운 메시지에 강조하고 싶은 내용을 동적 이미지로 만들어 제공할 수 있습니다.<br>빠른 움직임이 자칫 메시지의 피로도를 줄 수 있으므로 이미지 제작 시, 적절한 속도감과<br class="only-pc"> Pause(멈춤)를 주는 것을 추천드립니다.</p>
              </div>
              <div class="text-two-box__inner inner-gif">
                <img src="@/assets/images/guide/feature_company_msg_02.png" alt="" class="only-pc">
                <img src="@/assets/images/guide/feature_company_msg_02_mo.png" alt="" class="only-mo">
              </div>
            </div>
          </div>
          <p class="content mt-t16">RBC에서는 따로 GIF 이미지를 제작하지 않아도 바로 사용하실 수 있도록 메시지에 포인트를 줄 수 있는 GIF 로고를 제공하고<br class="only-pc"> 있습니다.</p>
          <div class="box-gray-line type2">
            <div class="icon-gif-box">
              <div class="title">RBC에서 제공하는 로고</div>
              <img src="@/assets/images/guide/feature_company_msg_icon_01.gif" alt="">
              <img src="@/assets/images/guide/feature_company_msg_icon_02.gif" alt="">
              <img src="@/assets/images/guide/feature_company_msg_icon_03.gif" alt="">
              <img src="@/assets/images/guide/feature_company_msg_icon_04.gif" alt="">
              <img src="@/assets/images/guide/feature_company_msg_icon_05.gif" alt="">
              <img src="@/assets/images/guide/feature_company_msg_icon_06.gif" alt="">
            </div>
            <div class="msg-gif-box">
              <div class="title">RBC에서 제공하는 로고로 만든 메시지</div>
              <div class="msg-gif-box-flex">
                <div class="guide-use-msg">
                  <img src="@/assets/images/guide/feature_company_msg_icon_msg_01.png" alt="" class="guide-use-msg only-pc">
                  <img src="@/assets/images/guide/feature_company_msg_icon_msg_01_mo.png" alt="" class="guide-use-msg only-mo">
                </div>
                <div class="use-only-msg">
                  <img src="@/assets/images/guide/feature_company_msg_icon_msg_02.png" alt="" class="only-pc">
                  <img src="@/assets/images/guide/feature_company_msg_icon_msg_02_mo.png" alt="" class="only-mo">
                </div>
                <div class="reservation-msg">
                  <img src="@/assets/images/guide/feature_company_msg_icon_msg_03.png" alt="" class="only-pc">
                  <img src="@/assets/images/guide/feature_company_msg_icon_msg_03_mo.png" alt="" class="only-mo">
                </div>
              </div>
            </div>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-t16 mt-b0">
              <p class="content">메시지 전송 전 미디어 파일 등록 시, memeType : image/png로 등록하세요.</p>
            </div>
          </div>
          <div class="btn__warp right multiline">
            <p><router-link to="#guide_3_2_1" class="side-btn">미디어를 포함한 메시지 발송</router-link></p>
            <p><a class="side-btn" href="https://www-qa.rcsbizcenter.com/intro/miricanvas" target="_blank">GIF 만들기는 “미리 캔버스”</a></p>
          </div>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title" id="guide_2_1_2">동영상 스트리밍 (유튜브)</p>
              <div class="text-two-box-flex">
                <div class="total-gif">
                  <img src="@/assets/images/guide/feature_company_msg_04.gif" alt="">
                </div>
                <div class="text-two-box__des">
                  <p class="content">RCS 기업 메시지에서 동영상 메시지를 보낼 수 있습니다.</p>
                  <br class="only-pc">
                  <p class="content">MMS처럼 이미지를 첨부하면서, 이미지 클릭 시 재생될 영상 URL만 추가하면 됩니다.</p>
                  <p class="content">첨부한 이미지는 동영상 미리보기 화면으로 사용되며, 이미지 클릭 시 단말기 상단에 PIP 형태로 영상이 재생 됩니다.</p>
                  <div class="gray-box__wrap">
                    <div class="gray-box mt-t24 mt-b0">
                      <p class="content">썸네일 이미지 : 1MB 이하 (Play 아이콘은 자동으로 표현 됩니다.)</p>
                      <p class="content">
                        영상 URL타입
                        <ul>
                          <li>https://www.youtube.com/watch?v=[videoId]</li>
                          <li>https://youtu.be[videoId]</li>
                          <li>https://m.youtube.com/watch?v=[videoId]</li>
                        </ul>
                      </p>
                      <p class="content">이미지 동영상 재생 시점부터 사용자 데이터 과금이 됩니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title" id="guide_2_1_3">투명한 이미지 (PNG)</p>
              <p class="content">RCS 기업 메시지는 투명 배경 이미지를 지원합니다. 정형화된 스타일에서 벗어나 창의적인 메시지를 만들어보세요.</p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/feature_company_msg_05.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/feature_company_msg_05_mo.png" alt="" class="only-mo">
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">메시지 전송 전 미디어 파일 등록 시, memeType : image/png로 등록하세요.</p>
            </div>
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_2_1_4">버튼처럼 이용하기</p>
              <p class="content">미디어에 연결 URL을 설정하면, 웹페이지로 이동할 수 있는 버튼처럼 사용이 가능합니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/feature_company_msg_06.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/feature_company_msg_06_mo.png" alt="" class="only-mo">

          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-b0">
              <p class="content">메시지 발송시, ~mediaUrl에 web link를 넣으세요.</p>
            </div>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_2_2">2. 2. 메시지 연결하기</h5>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title" id="guide_2_2_1">양방향 대화로 연결하기</p>
              <p class="content">RCS 메시지 구성 시, 메시지 버튼에 양방향 메시지를 수신하기 위한 발화 메시지를 넣을 수 있습니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap mt-t24 mt-b24">
            <img src="@/assets/images/guide/feature_company_msg_07.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/feature_company_msg_07_mo.png" alt="" class="only-mo">

          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-b0">
              <p class="content">RCS 양방향 대화방인 경우만, 가능합니다.</p>
            </div>
          </div>
          <div class="btn__warp right">
            <router-link to="/Chatbot#guide_2_2" class="side-btn">RCS 양방향 대화방</router-link>
          </div>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title" id="guide_2_2_2">자동응답 메시지 연결하기</p>
              <p class="content">
                RCS 메시지 구성 시, 메시지 버튼에 양방향 메시지를 수신하기 위한 발화 메시지를 넣을 수 있습니다.<br>
                자동응답 메시지와 자동응답 메시지를 연결하여 완성도 높은 시나리오를 만들어보세요.<br>
                대화방에 들어온 고객들에게 1차적 문의/응대가 가능해집니다.
              </p>
            </div>
          </div>
          <div class="guide-img__wrap gif-radius">
            <img src="@/assets/images/guide/feature_company_msg_08.gif" alt="">
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-b0">
              <p class="content">RCS 양방향 대화방인 경우만, 가능합니다.</p>
            </div>
          </div>
          <div class="btn__warp right">
            <router-link to="/KeyFeatures#section04" class="side-btn">자동응답 메시지</router-link>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_2_3">2. 3. 그룹 아이디</h5>
            <p class="description">
              개별 메시지가 아닌 동보 메시지 전송 또는 동일한 캠페인의 메시지를 발송한다면, 그룹 아이디 (group id)를 이용하세요.<br>
              메시지 발송 시, 그룹 아이디를 동일하게 설정하면 상품코드나 메시지 유형과 상관없이 발송 결과를 합산하여 확인할 수 있습니다.<br>
              RCS 기업 메시지는 그룹 아이디 기반으로 다은과 같은 수신자의 행동 결과 정보를 제공합니다.
            </p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-b0">
              <p class="title">그룹 아이디 기반 통계</p>
              <p class="content">발송 결과</p>
              <p class="content">버튼 사용 통계</p>
              <p class="content">이미지 클릭 통계</p>
            </div>
          </div>
          <div class="btn__warp right">
            <router-link to="/ScreenGuide11" class="side-btn">메시지 통계 화면 가이드</router-link>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_2_4">2. 4. 버튼</h5>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title">액션 종류</p>
              <p class="content">메시지의 버튼으로 사용할 수 있는 기능을 액션이라고 합니다.</p>
            </div>
          </div>
          <div class="description-total__wrap type2">
            <dl>
              <dt>URL 연결</dt>
              <dd>Web page 또는 App으로 이동할 수 있습니다.</dd>
            </dl>
            <dl>
              <dt>지도 / 위치</dt>
              <dd>미리 지정된 지도의 위치를 보여주거나 사용자의 현재 위치를 서버로 전송할 수 있습니다.</dd>
            </dl>
            <dl>
              <dt>일정 등록</dt>
              <dd>사용자의 캘린더에 특정 일정을 등록할 수 있습니다.</dd>
            </dl>
            <dl>
              <dt>복사하기</dt>
              <dd>특정 문구를 사용자 단말이 자동 복사할 수 있게 합니다.</dd>
            </dl>
            <dl>
              <dt>대화방 열기</dt>
              <dd>다른 번호로 메시지를 보낼 수 있도록 대화방을 엽니다.</dd>
            </dl>
            <dl>
              <dt>전화 연결</dt>
              <dd>특정 전화번호로 전화를 걸 수 있습니다.</dd>
            </dl>
          </div>
        </div>
        <div class="guide__item" id="section03">
          <div class="subtitle-wrap mt-b24">
            <h4>3. 발송 과정 안내</h4>
          </div>
          <div class="subtitle-wrap mt-t0">
            <h5 id="guide_3_1">3. 1. 발송 준비 체크리스트</h5>
            <p class="description">RCS 기업 메시지 발송을 위해서 아래의 사항을 확인해 주세요.</p>
          </div>
          <div class="guide-chk">
            <p class="content chk">기업 계정 / 브랜드 / 대화방을 생성하였습니까?</p>
            <p class="content chk">등록한 기업계정 / 브랜드 / 대화방이 모두 승인완료 상태입니까?</p>
            <p class="content chk">RCS 기업 메시지를 보내줄 문자 대행사와 계약을 체결하였습니까?</p>
            <p class="content chk">해당 대행사에 운영 권한을 설정하였습니까?</p>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_3_2">3. 2. 메시지 발송</h5>
            <p class="description">RCS 기업 메시지는 상품 코드와 상관없이 하나의 API를 이용하여 발송할 수 있습니다. (/message)</p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-b0">
              <p class="content">RCS SMS / LMS / MMS / 템플릿 / 양방향</p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/feature_company_msg_09.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/feature_company_msg_09_mo.png" alt="" class="only-mo">
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_3_2_1">미디어를 포함한 메시지 발송 <span class="thin-weight">(MMS / 이미지 템플릿인 경우)</span></p>
              <p class="content">이미지/동영상 등 미디어 파일을 함께 보내야하는 경우, 미디어 파일을 먼저 등록하셔서 파일의 웹 경로가 정의되어야 합니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/feature_company_msg_10.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/feature_company_msg_10_mo.png" alt="" class="only-mo">
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">메시지에 사용된 모든 미디어의 총 용량이 1MB 이하여야 발송됩니다.</p>
            </div>
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_3_2_2">템플릿 메시지 발송</p>
              <p class="content">템플릿의 경우, 사전 등록 및 승인 심사후, 메시지 발송이 가능합니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/feature_company_msg_11.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/feature_company_msg_11_mo.png" alt="" class="only-mo">
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_3_2_3">레이아웃 메시지 발송</p>
              <p class="content">레이아웃의 경우, 사전 등록 후, 메시지 발송이 가능합니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/feature_company_msg_12.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/feature_company_msg_12_mo.png" alt="" class="only-mo">
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_3_2_4">메시지별 추가 설정</p>
              <p class="content">RCS 기업 메시지를 전송하는 시점에 메시지 성격에 따라 다음과 같은 설정을 추가적으로 할 수 있습니다. (/message)</p>
            </div>
          </div>
          <div class="gray-box__wrap  mt-t16">
            <div class="gray-box">
              <p class="title">메시지 설정</p>
              <p class="content">발송 옵션</p>
              <p class="content">[광고] 표시 여부 및 무료수신거부 전화번호 표시</p>
              <p class="content">복사 기능 여부</p>
              <p class="content">캠페인 그룹 설정</p>
            </div>
          </div>
          <p class="content">메시지 전송시, 설정 방식 등 자세한 사항은 기술 지원을 확인하시기 바랍니다.</p>
          <div class="btn__warp right">
            <router-link to="/TechnicalSupport" class="side-btn" target="_blank">기술지원</router-link>
          </div>
          <div class="table-box">
            <table class="table table-msg">
              <colgroup>
                <col width="140px"/>
                <col width="190px"/>
                <col width="421px"/>
              </colgroup>
              <thead>
                <tr>
                  <th>메시지 전송 입력 항목</th>
                  <th>설명</th>
                  <th>샘플코드</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="only-bg">clientMsgId*</td>
                  <td>메시지 전송 요청 ID</td>
                  <td rowspan="15" class="code-img-box">
                    <div class="code-img">
                      <img src="@/assets/images/guide/guide_msg_code.png" alt="">
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="only-bg">agencyId*</td>
                  <td>운영 대행사 ID</td>
                </tr>
                <tr>
                  <td class="only-bg">agencyKey*</td>
                  <td>중계사 Key</td>
                </tr>
                <tr>
                  <td class="only-bg">brandKey*</td>
                  <td>브랜드 Key</td>
                </tr>
                <tr>
                  <td class="only-bg">chatbotId*</td>
                  <td>대화방 ID / 발신번호</td>
                </tr>
                <tr>
                  <td class="only-bg">userContact*</td>
                  <td>수신자 핸드폰번호</td>
                </tr>
                <tr>
                  <td class="only-bg">messagebaseId*</td>
                  <td>포맷 / 탬플릿 ID</td>
                </tr>
                <tr>
                  <td class="only-bg">productCode</td>
                  <td>상품 코드</td>
                </tr>
                <tr>
                  <td class="only-bg">expiryOption</td>
                  <td>발송 옵션<br>
                    (시도 후, revoke & 결과 return)<br>
                    1 : 1일 간<br>
                    2 : 2일 간<br>
                    3 : 80초 간<br>
                    4 : 1시간
                  </td>
                </tr>
                <tr>
                  <td class="only-bg">groupId</td>
                  <td>캠페인 구분자<br>RBC에서 제공하는 통계 단위</td>
                </tr>
                <tr>
                  <td class="only-bg">copyAllowed</td>
                  <td>true : 수신자가 메시지 내용을<br>복사할 수 있음<br>false : 메시지 내용 복사 불가</td>
                </tr>
                <tr>
                  <td class="only-bg">header*</td>
                  <td>0 : 정보성 메시지<br>1 : 광고성 메시지, 카드 위 “광고”<br>표시</td>
                </tr>
                <tr>
                  <td class="only-bg">footer</td>
                  <td>무료수신거부 전화번호 번호<br>입력 영역</td>
                </tr>
                <tr>
                  <td class="only-bg">body* { }</td>
                  <td>메시지 내용</td>
                </tr>
                <tr>
                  <td class="only-bg">buttons [ ]</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="guide-side__wrap">
        <div class="side__item">
          <div class="side__list">
            <div class="guide-lnb__wrap">
              <GuideLnbSide :rightMenuData="brandMenu" />
            </div>
          </div>
        </div>
        <GuideSide />
      </div>
    </div>
  </div>
</template>

<script>
import GuideLnb from '@/views/service/components/AccMenu.vue'
import GuideSide from '@/views/service/components/GuideSide.vue'
import GuideLnbSide from '@/views/service/components/GuideLnbSide.vue'
import guideLnbList from '@/views/service/components/guideLnb.js'

export default {
  components: {
    GuideLnb,
    GuideLnbSide,
    GuideSide
  },
  data() {
    return {
      guideLnbList,
      openGuidNav: false,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768,
      isMobileSize: 768,
      OnlyPcNav: false,
      activeIndex: -1,
      activeSubIndex: -1,
      brandMenu: [
        {
          'label': '2. 1. 미디어 활용하기',
          'to': '#guide_2_1',
          'anchorIndex': 0,
          'isOpen': false,
          'isSubMenu': false,
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
          'label': '2. 2. 메시지 연결하기',
          'to': '#guide_2_2',
          'anchorIndex': 1,
          'isOpen': false,
          'isSubMenu': false,
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
          'label': '2. 3. 그룹 아이디',
          'to': '#guide_2_3',
          'anchorIndex': 2,
          'isOpen': false,
          'isSubMenu': false
        },
        {
          'label': '2. 4. 버튼',
          'to': '#guide_2_4',
          'anchorIndex': 3
        },
        {
          'label': '3. 1. 발송 준비 체크 리스트',
          'to': '#guide_3_1',
          'anchorIndex': 4
        },
        {
          'label': '3. 2. 메시지 발송',
          'to': '#guide_3_2',
          'anchorIndex': 5,
          'isOpen': false,
          'isSubMenu': false,
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
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  mounted () {
    if (!this.isMobileSize) {
      this.OnlyPcNav = true
    }
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    movePage () {
      console.log('movePage')
      this.openGuidNav = !this.openGuidNav
    },
    handleSubItemClick(subLabel, j) {
      this.$refs.guideTriger.innerText = subLabel
      this.openGuidNav = !this.openGuidNav
    },
    handleResize() {
      this.isMobileSize = window.innerWidth < 768
      this.OnlyPcNav = !this.isMobileSize
      if (!this.isMobileSize) {
        this.openGuidNav = false
      }
    }
  }
}
</script>
