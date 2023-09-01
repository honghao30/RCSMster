<template>
  <div class="guide__inner">
    <div class="guide-lnb__wrap">
      <GuideLnb :menuData="guideLnbList" />
    </div>
    <div class="guide__wrap company-msg" id="companyMsgFrist">
      <div class="first__wrap">
        <h1 class="first-title">RCS 기업 메시지</h1>
        <div class="guide__item" id="section01">
          <div class="second-box">
            <h2 class="second-title" id="guide_1"><span>1.</span>서비스 구조</h2>
            <p>기업 담당자는 RBC에서 직접 또는 대행사를 통하여 브랜드를 등록/관리할 수 있습니다. <br>
              RCS 기업 메시지 또한 지정한 대행사를 통하여 발송할 수 있습니다.</p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <div style="width:100%;height: 300px;background: #F8F8F8">이미지</div>
            </div>
            <p class="guide-text">대행사별로 지원하는 RCS 기업 메시지 종류가 상이할 수 있습니다.</p>
          </div>
        </div>
      </div>
      <div class="guide__item" id="section02">
        <div class="second-box">
          <h2 class="second-title">2. RCS 기업 메시지 활용 팁</h2>
          <div class="third-box__wrap">
            <div class="third-box">
              <h3 class="third-title" id="guide_2_1"><span>2.1.</span> 미디어 활용하기</h3>
              <p class="content">RCS MMS와 이미지템플릿에서 1MB 내의 미디어를 메시지에 넣어 보낼 수 있습니다.<br>
                미디어를 적절히 활용하여 더 효과적인 메시지를 만들어보세요.</p>
              <div class="gray-box__wrap flex-gray">
                <p class="title" id="guide_2_1_1">동적 이미지 (GIF)</p>
                <div class="flex-gray__inner">
                  <div class="flex-gray-des">
                    <p class="content">단조롤운 메시지에 강조하고 싶은 내용을 동적 이미지로 만들어 제공할 수 <br>
                      있습니다.<br>빠른 움직임이 자칫 메시지의 피로도를 줄 수 있으므로 이미지 제작 시적절한 속<br>
                      도감과 pause를 주는 것을 추천드립니다.
                    </p>
                  </div>
                  <div>
                    <img src="@/assets/images/guide/guide_msg_01.png" alt="">
                  </div>
                </div>
              </div>
              <div class="gray-box__wrap">
                <div>
                  <img src="@/assets/images/guide/guide_msg_02.png" alt="">
                </div>
                <div class="gray-box">
                  <p class="content">- 메시지 전송 전 미디어 파일 등록 시, memeType : image/png로 등록하세요.</p>
                </div>
                <div class="btn-box__wrap right">
                  <div class="btn__warp">
                    <router-link to="" class="side-btn">미디어를 포함한 메시지 발송</router-link>
                    <i class="next"></i>
                  </div>
                  <div class="btn__warp">
                    <router-link to="" class="side-btn">GIF 만들기는 “미리 캔버스”</router-link>
                    <i class="next"></i>
                  </div>
                </div>
              </div>
              <div class="gray-box__wrap flex-gray">
                <p class="title" id="guide_2_1_2">동영상 스트리밍 (유튜브)</p>
                <div class="flex-gray__inner">
                  <div style="flex: 0 0 224px; margin: 0 auto;">
                    <img src="@/assets/images/guide/guide_msg_03.png" alt="">
                  </div>
                  <div class="flex-gray-des">
                    <p class="content">RCS 기업 메시지에서 동영상 메시지를 보낼 수 있습니다.<br><br>
                      MMS처럼 이미지를 첨부하면서, 이미지 클릭 시 재생될 영상 URL만 추가하면 됩니다.<br>
                      첨부한 이미지는 동영상 미리보기 화면으로 사용되며, 이미지 클릭 시 단말기 상단에 PIP 형태로 영상이 재생 됩니다.
                    </p>
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
              <div class="gray-box__wrap">
                <p class="title" id="guide_2_1_3">투명한 이미지 (PNG)</p>
                <p class="content">RCS 기업 메시지는 투명 배경 이미지를 지원합니다. 정형화된 스타일에서 벗어나 창의적인 메시지를 만들어보세요.</p>
                <div>
                  <img src="@/assets/images/guide/guide_msg_04.png" alt="">
                </div>
              </div>
              <div class="gray-box__wrap">
                <p class="title" id="guide_2_1_4">버튼처럼 이용하기</p>
                <p class="content">미디어에 연결 URL을 설정하면, 웹페이지로 이동할 수 있는 버튼처럼 사용이 가능합니다.</p>
                <div>
                  <img src="@/assets/images/guide/guide_msg_05.png" alt="">
                </div>
                <div class="gray-box">
                  <p class="content">- 메시지 전송 전 미디어 파일 등록 시, memeType : image/png로 등록하세요.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="third-box__wrap">
            <div class="third-box">
              <h3 class="third-title" id="guide_2_2"><span>2.2.</span> 메시지 연결하기</h3>
              <p class="title" id="guide_2_2_1">양방향 대화로 연결하기</p>
              <p class="content">RCS 메시지 구성 시, 메시지 버튼에 양방향 메시지를 수신하기 위한 발화 메시지를 넣을 수 있습니다.</p>
              <div class="gray-box__wrap">
                <div>
                  <img src="@/assets/images/guide/guide_msg_06.png" alt="">
                </div>
                <div class="gray-box">
                  <p class="content">- RCS 양방향 대화방인 경우만, 가능합니다.</p>
                </div>
                <div class="btn-box__wrap right">
                  <div class="btn__warp">
                    <router-link to="" class="side-btn">RCS 양방향 대화방</router-link>
                    <i class="next"></i>
                  </div>
                </div>
              </div>
              <div class="gray-box__wrap">
                <p class="title" id="guide_2_2_2">자동응답 메시지 연결하기</p>
                <p class="content">RCS 메시지 구성 시, 메시지 버튼에 양방향 메시지를 수신하기 위한 발화 메시지를 넣을 수 있습니다. <br>
                  자동응답메시지와 자동응답메시지를 연결하여 완성도 높은 시나리오를 만들어보세요. <br>
                  대화방에 들어온 고객들에게 1차적 문의/응대가 가능해집니다.</p>
                <div class="gray-box">
                  <div style="width:100%;height: 300px;background: #F8F8F8">이미지</div>
                </div>
                <div class="gray-box">
                  <p class="content">- 메시지 전송 전 미디어 파일 등록 시, memeType : image/png로 등록하세요.</p>
                </div>
                <div class="btn-box__wrap right">
                  <div class="btn__warp">
                    <router-link to="" class="side-btn">자동응답 메시지</router-link>
                    <i class="next"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="third-box__wrap">
            <div class="third-box">
              <h3 class="third-title" id="guide_2_3"><span>2.3.</span> 그룹 아이디</h3>
              <p class="content">개별 메시지가 아닌 동보 메시지 전송 또는 동일한 캠페인의 메시지를 발송한다면, 그룹 아이디 (group id)를 이용하세요.<br>
                메시지 발송 시, 그룹 아이디를 동일하게 설정하면 상품코드나 메시지 유형과 상관없이 발송 결과를 합산하여 확인할 수 있습니다.<br>
                RCS 기업 메시지는 그룹 아이디 기반으로 다은과 같은 수신자의 행동 결과 정보를 제공합니다.</p>
              <div class="gray-box__wrap">
                <div class="gray-box">
                  <h3 class="content">그룹 아이디 기반 통계</h3>
                  <ul>
                    <li class="content">- 발송 결과</li>
                    <li class="content">- 버튼 사용 통계</li>
                    <li class="content">- 이미지 클릭 통계</li>
                  </ul>
                </div>
                <div class="btn-box__wrap right">
                  <div class="btn__warp">
                    <router-link to="" class="side-btn">메시지 통계 화면 가이드</router-link>
                    <i class="next"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="third-box__wrap">
            <div class="third-box">
              <h3 class="third-title" id="guide_2_4"><span>2.4.</span> 버튼</h3>
              <p class="content">개별 메시지가 아닌 동보 메시지 전송 또는 동일한 캠페인의 메시지를 발송한다면, 그룹 아이디 (group id)를 이용하세요.<br>
                메시지 발송 시, 그룹 아이디를 동일하게 설정하면 상품코드나 메시지 유형과 상관없이 발송 결과를 합산하여 확인할 수 있습니다.<br>
                RCS 기업 메시지는 그룹 아이디 기반으로 다은과 같은 수신자의 행동 결과 정보를 제공합니다.</p>
              <div class="gray-box__wrap">
                <p class="title">액션 종류</p>
                <p class="content">메시지의 버튼으로 사용할 수 있는 기능을 액션이라고 합니다.</p>
                <div class="des-box">
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
            </div>
          </div>
        </div>
      </div>
      <div class="guide__item" id="section03">
        <div class="second-box">
          <h2 class="second-title">3. 발송 과정 안내</h2>
          <div class="third-box__wrap">
            <div class="third-box">
              <h3 class="third-title" id="guide_3_1"><span>3.1.</span> 발송 준비 체크리스트</h3>
              <ul class="content chk-box">
                <li>
                  <img src="@/assets/images/icon/icon_check_black_small.png" alt="">
                  <span>기업 계정 / 브랜드 / 대화방을 생성하였습니까?</span>
                </li>
                <li>
                  <img src="@/assets/images/icon/icon_check_black_small.png" alt="">
                  <span>등록한 기업계정 / 브랜드 / 대화방이 모두 승인완료 상태입니까?</span>
                </li>
                <li>
                  <img src="@/assets/images/icon/icon_check_black_small.png" alt="">
                  <span>RCS 기업 메시지를 보내줄 문자 대행사와 계약을 체결하셨습니까?</span>
                </li>
                <li>
                  <img src="@/assets/images/icon/icon_check_black_small.png" alt="">
                  <span>해당 대행사에 운영 권한을 설정하였습니까?</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="third-box__wrap">
            <div class="third-box">
              <h3 class="third-title" id="guide_3_2"><span>3.2.</span> 메시지 발송</h3>
              <p class="content">RCS 기업 메시지는 상품 코드와 상관없이 하나의 API를 이용하여 발송할 수 있습니다. (/message)</p>
              <div class="gray-box__wrap">
                <div class="gray-box">
                  <div style="width:100%;height: 300px;background: #F8F8F8">이미지</div>
                </div>
                <div class="gray-box">
                  <p class="content">- RCS SMS / LMS / MMS / 템플릿 / 양방향</p>
                </div>
                <div class="gray-box__wrap">
                  <p class="title" id="guide_3_2_1">미디어를 포함한 메시지 발송</p>
                  <p class="content">이미지/동영상 등 미디어 파일을 함께 보내야하는 경우, 미디어 파일을 먼저 등록하셔서 파일의 웹 경로가 정의되어야 합니다. (/file)</p>
                  <div class="gray-box">
                    <div style="width:100%;height: 300px;background: #F8F8F8">이미지</div>
                  </div>
                  <div class="gray-box">
                    <p class="content">- 메시지에 사용된 모든 미디어의 총 용량이 1MB 이하여야 발송됩니다.</p>
                  </div>
                </div>
                <div class="gray-box__wrap">
                  <p class="title" id="guide_3_2_2">템플릿 메시지 발송</p>
                  <p class="content">템플릿의 경우, 사전 등록 및 승인 심사후, 메시지 발송이 가능합니다.</p>
                  <div class="gray-box">
                    <div style="width:100%;height: 300px;background: #F8F8F8">이미지</div>
                  </div>
                </div>
                <div class="gray-box__wrap">
                  <p class="title" id="guide_3_2_3">레이아웃 메시지 발송</p>
                  <p class="content">레이아웃의 경우, 사전 등록 후, 메시지 발송이 가능합니다.</p>
                  <div class="gray-box">
                    <div style="width:100%;height: 300px;background: #F8F8F8">이미지</div>
                  </div>
                </div>
                <div class="gray-box__wrap">
                  <p class="title" id="guide_3_2_4">메시지별 추가 설정</p>
                  <p class="content">RCS 기업 메시지를 전송하는 시점에 메시지 성격에 따라 다음과 같은 설정을 추가적으로 할 수 있습니다. (/message)</p>
                  <div class="gray-box">
                    <h3 class="content">메시지 설정</h3>
                    <ul>
                      <li class="content">- 발송 옵션</li>
                      <li class="content">- [광고] 표시 여부 및 무료수신거부 전화번호 표시</li>
                      <li class="content">- 복사 기능 여부</li>
                      <li class="content">- 캠페인 그룹 설정</li>
                    </ul>
                  </div>
                  <p class="content">메시지 전송시, 설정 방식 등 자세한 사항은 기술 지원을 확인하시기 바랍니다.</p>
                  <div class="btn-box__wrap right">
                    <div class="btn__warp">
                      <router-link to="" class="side-btn">기술지원</router-link>
                      <i class="next"></i>
                    </div>
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
                          <td>clientMsgId*</td>
                          <td>메시지 전송 요청 ID</td>
                          <td rowspan="15" class="code-img-box">
                            <div class="code-img">
                              <img src="@/assets/images/guide/guide_msg_code.png" alt="">
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>agencyId*</td>
                          <td>운영 대행사 ID</td>
                        </tr>
                        <tr>
                          <td>agencyKey*</td>
                          <td>중계사 Key</td>
                        </tr>
                        <tr>
                          <td>brandKey*</td>
                          <td>브랜드 Key</td>
                        </tr>
                        <tr>
                          <td>chatbotId*</td>
                          <td>대화방 ID / 발신번호</td>
                        </tr>
                        <tr>
                          <td>userContact*</td>
                          <td>수신자 핸드폰번호</td>
                        </tr>
                        <tr>
                          <td>messagebaseId*</td>
                          <td>포맷 / 탬플릿 ID</td>
                        </tr>
                        <tr>
                          <td>productCode</td>
                          <td>상품 코드</td>
                        </tr>
                        <tr>
                          <td>expiryOption</td>
                          <td>발송 옵션<br>
                            (시도 후, revoke & 결과 return)<br>
                            1 : 1일 간<br>
                            2 : 2일 간<br>
                            3 : 80초 간<br>
                            4 : 1시간
                          </td>
                        </tr>
                        <tr>
                          <td>groupId</td>
                          <td>캠페인 구분자<br>RBC에서 제공하는 통계 단위</td>
                        </tr>
                        <tr>
                          <td>copyAllowed</td>
                          <td>true : 수신자가 메시지 내용을<br>복사할 수 있음<br>false : 메시지 내용 복사 불가</td>
                        </tr>
                        <tr>
                          <td>header*</td>
                          <td>0 : 정보성 메시지<br>1 : 광고성 메시지, 카드 위 “광고”<br>표시</td>
                        </tr>
                        <tr>
                          <td>footer</td>
                          <td>무료수신거부 전화번호 번호<br>입력 영역</td>
                        </tr>
                        <tr>
                          <td>body* { }</td>
                          <td>메시지 내용</td>
                        </tr>
                        <tr>
                          <td>buttons [ ]</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
