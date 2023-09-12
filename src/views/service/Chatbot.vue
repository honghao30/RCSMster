<template>
    <div class="guide__inner">
      <div class="guide-lnb__wrap">
        <GuideLnb :menuData="guideLnbList" />
      </div>
      <div class="guide__wrap">
        <div class="first__wrap">
          <h1 class="first-title">대화방</h1>
          <p class="content">
            메시지 앱에서 고객들이 메시지를 받고 확인할 수 있는 것이 대화방입니다.<br>
            대화방 단위로 메시지를 보내고, 확인할 수 있습니다.
          </p>
        </div>
        <div class="guide__item" id="section01">
          <div class="second-box">
            <h2 class="second-title">1. 대화방 프로필</h2>
            <ol class="guide-list__num">
              <li><div class="num">1</div> 대화방 프로필 이미지 : 대화방 프로필 이미지는 브랜드 프로필 이미지와 같습니다.</li>
              <li><div class="num">2</div> 대화방 명 : 대화방 등록시, 설정한 대화방 명이 표시됩니다.</li>
              <li><div class="num">3</div> 발신번호 또는 회신번호가 표시됩니다.</li>
            </ol>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
                <img src="@/assets/images/guide/guide_chatbot_01.png" alt="">
            </div>
          </div>
        </div>
        <div class="guide__item" id="section02">
         <div class="second-box">
            <h2 class="second-title">2. 대화방 종류</h2>
            <p class="content">메시지 앱에서 대화방은 다음과 같이 구분되며, 이용 가능한 메시지 상품이 상이합니다.</p>
          </div>
          <div class="table-box">
            <table>
                <colgroup>
                    <col width="18%">
                    <col width="18%">
                    <col width="16%">
                    <col width="16%">
                    <col width="16%">
                    <col width="16%">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" colspan="2" rowspan="2"></th>
                        <th scope="col" colspan="4">A2P(기업 메시징)</th>
                    </tr>
                    <tr>
                        <th scope="col">기본<br>대화방</th>
                        <th scope="col">RCS<br>대화방</th>
                        <th scope="col">RCS MO<br>대화방</th>
                        <th scope="col">RCS 양방향<br>대화방</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-blue">
                        <th colspan="2" class="text-l">RCS 등록 필요</th>
                        <td></td>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                    </tr>
                    <tr>
                        <th rowspan="6" class="text-l">메시지 상품</th>
                        <th class="text-l">문자 메시지</th>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                    </tr>
                    <tr>
                        <th class="text-l">RCS P2P 채팅+</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="text-l">RCS 공통 포맷<br>(SMS/LMS/MMS)</th>
                        <td></td>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                    </tr>
                    <tr>
                        <th class="text-l">RCS 정보성 템플릿</th>
                        <td></td>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                    </tr>
                    <tr>
                        <th class="text-l">RCS 이미지 템플릿</th>
                        <td></td>
                        <td>○</td>
                        <td>○</td>
                        <td>○</td>
                    </tr>
                    <tr>
                        <th class="text-l">RCS 양방향</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>○</td>
                    </tr>
                    <tr  class="bg-bgren">
                        <th colspan="2" class="text-l">사용자 반응 결과 집게 (버튼)</th>
                        <td></td>
                        <td>○</td>
                        <td></td>
                        <td>○</td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
                <p class="content"><strong>RCS 대화방 :</strong> RBC에 등록한 가장 기본적인 대화방</p>
                <p class="content"><strong>RCS MO 대화방 :</strong> 대표번호 문자수신 서비스(MO)를 이용중인 발신번호로 만든 RCS 대화방</p>
                <p class="content"><strong>RCS 양방향 대화방 :</strong> RCS 양방향 메시지 / 자동응답 메시지 등을 이용할 수 있는 RCS 대화방</p>
            </div>
          </div>

          <div class="third-box__wrap">
            <div class="third-box">
              <h3 class="third-title" id="guide_2_1"><span>2.1</span>RCS MO 대화방</h3>
              <p class="content">
                기존에 대표번호문자수신서비스(MO)를 이용하던 발신번호로 대화방을 만든다면, 대화방 설정에서 꼭! 대표번호 문자수신 서비스를
체크해 주셔야 합니다.<br>
RCS MO 대화방은 아래와 같은 기능을 이용할 수 없습니다.
             </p>
            </div>
            <div class="gray-box__wrap">
                <div class="gray-box">
                    <p class="content">- 버튼 사용 통계를 받을 수 없습니다.</p>
                    <p class="content">- RCS 양방향 서비스를 이용할 수 없습니다.</p>
                </div>
            </div>
          </div>
        </div>
        <div class="guide__item">
            <div class="third-box__wrap">
                <div class="third-box" id="guide_2_2">
                    <h3 class="third-title"><span>2.2</span>RCS 양방향 대화방</h3>
                    <p class="title" id="guide_2_2_1">양방향 대화방 설정</p>
                    <p class="content">
                        메시지 앱 사용자의 요청에 대해 기업에서 실시간으로 응답할 수 있는 대화방입니다.<br>
양방향 대화방으로 설정하기 위해서는 대행사가 사전에 계약되어야 하며, RBC 대화방 등록 화면에서 양방향 대행사를 선택하면
됩니다.<br>
최초로 등록되는 사업자등록 번호인 경우, 비즈니스 정보를 추가적으로 입력합니다.
                    </p>
                </div>
            </div>
            <div class="gray-box__wrap">
                <img src="@/assets/images/guide/guide_chatbot_02.png" alt="">
            </div>
            <div class="gray-box__wrap">
                <div class="gray-box">
                    <p class="content">- RCS MO 대화방은 양방향 대화방으로 설정할 수 없습니다.</p>
                    <p class="content">- 대표번호 문자수신 서비스(MO) 선택을 해지하셔야 설정 가능합니다.</p>
                </div>
            </div>
            <div class="btn__warp right">
                <a href="/partnerInfo" class="side-btn">양방향 대행사 보기</a>
                <i class="next"></i>
            </div>
            <div class="third-box__wrap" id="guide_2_2_1">
                <div class="third-box">
                    <p class="title">양방향 대화방 특화 기능</p>
                    <p class="content">
                        대화방을 양방향 대화방으로 설정하면 RCS의 장점을 최대한 활용하실 수 있습니다.
                    </p>
                </div>
            </div>
            <div class="gray-box__wrap">
                <div class="gray-box">
                    <p class="content">- RCS 양방향 상품 발송</p>
                    <p class="content">- 자동응답 메시지</p>
                    <p class="content">- 대화방 메뉴에 자동응답 메시지 연결하기</p>
                </div>
            </div>
            <div class="btn__warp right multiline">
                <p>
                    <a href="/brand/BR.Gz8TLt7xe0/autoReplyMsg/list" class="side-btn">자동응답 메시지</a>
                    <i class="next"></i>
                </p>
                <p>
                    <a href="/brand/BR.Gz8TLt7xe0/psmenu" class="side-btn">대화방 메뉴</a>
                    <i class="next"></i>
                </p>
            </div>
            <div class="third-box__wrap">
                <div class="third-box">
                    <p class="title" id="guide_2_2_3">양방향 대화방 검색</p>
                    <p class="content">
                        채팅 + 앱에서 고객이 브랜드명을 검색하여, 양방향 대화방을 찾을 수 있습니다.
                    </p>
                </div>
            </div>
            <div class="gray-box__wrap">
                <img src="@/assets/images/guide/guide_chatbot_03.png" alt="">
            </div>
        </div>
        <div class="guide__item" id="section03">
            <div class="second-box">
                <h2 class="second-title">3. 대화방 등록</h2>
            </div>
            <div class="third-box__wrap">
                <div class="third-box">
                    <h3 class="third-title" id="guide_3_1"><span>3.1</span> 대화방 등록 가이드</h3>
                    <p class="content">
                        대화방은 발신번호 혹은 양방향 ID를 기준으로 생성할 수 있습니다.<br>
                        발신번호로 대화방을 만드는 경우, 통신 서비스 가입 증명원이 필요합니다.
                    </p>
                </div>
            </div>
            <div class="qna-box__wrap">
                <div class="qna-box">
                    <i class="qna-q"></i>
                    <div class="qna-item">
                        <p class="title">통신서비스가입증명원이란?</p>
                        <p class="content">
                            통신서비스가입증명원(이용증명원)은 이용자 본인이 사용하는 전화번호를 증명하는 서류입니다.<br>
    2022년 3월 2일 전기통신사업법 84조의 2항이 개정되면서 문자발신번호에 규제가 강화되었습니다. 이에 따라 문자 메시지<br>
    발송을 위해 RCS 대화방을 만들 때 함께 제출하셔야 합니다.
                        </p>
                        <div class="gray-box__wrap">
                            <div class="gray-box">
                                <p class="content">- 대화방의 발신번호와 통신서비스가입증명원의 전화번호가 동일해야 합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="qna-box">
                    <i class="qna-q"></i>
                    <div class="qna-item">
                        <p class="title">통신이용증명원은 어떻게 발급받나요?</p>
                        <div class="content">
                            <ol class="guide-list__num">
                                <li class="multiline">
                                    <div class="item">
                                        <div class="num">1</div>
                                        <div class="text">
                                            각 통신사의 웹사이트에서 로그인 후 증명원을 찾아 다운로드 받으세요.
                                        </div>
                                    </div>
                                    <div class="content">
                                        <p><strong>SK 브로드밴드 :</strong> <a href="http://biz.skbroadband.com" target="_blank">http://biz.skbroadband.com</a></p>
                                        <p><strong>KT :</strong> <a href="kt.com" target="_blank">kt.com</a> / <a href="http://mybiz.kt.com" target="_blank">http://mybiz.kt.com</a></p>
                                        <p><strong>유플러스 :</strong> <a href="http://www.lguplus.com/biz" target="_blank">http://www.lguplus.com/biz</a></p>
                                    </div>
                                </li>
                                <li class="multiline">
                                    <div class="item">
                                        <div class="num">2</div>
                                        <div class="text">
                                            각 통신사의 고객센터로 문의해 주세요.
                                        </div>
                                    </div>
                                    <div class="content">
                                        <p><strong>SK 브로드밴드 :</strong> 1600-0108</p>
                                        <p><strong>KT :</strong> 1600-0108 / 1588-0114</p>
                                        <p><strong>유플러스 :</strong> 1544-0001</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="third-box__wrap">
                    <div class="third-box"  id="guide_3_2">
                        <p class="title">등록 가능한 발신번호</p>
                        <p class="content">
                            RCS 기업 메시지를 발송할 때 사용할 전화번호(이하 발신번호)를 사전에 등록해야 합니다.<br>
                            브랜드 별 다수의 발신번호를 등록 가능하나 번호를 중복하여 사용할 수 없습니다.
                        </p>
                    </div>
                </div>
                <div class="table-box">
                    <table>
                        <caption>등록 가능한 발신번호</caption>
                        <colgroup>
                            <col width="40%">
                            <col width="60%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">구분</th>
                                <th scope="col">설명</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>유선 전화번호</td>
                                <td>지역번호 포함한 전화번호 (17개 지역번호)</td>
                            </tr>
                            <tr>
                                <td>전국 대표번호</td>
                                <td>15XX, 16XX, 18XX 등 대표 번호</td>
                            </tr>
                            <tr>
                                <td>공통서비스식별번호(0N0계열)</td>
                                <td>030, 050, 070 등 번호</td>
                            </tr>
                            <tr>
                                <td>특수번호</td>
                                <td>112, 1355 등은 해당 사용자 (국가, 지방단체, 공공기관, 등)에 한하여 사용 가능</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="gray-box__wrap">
                    <div class="gray-box">
                        <div class="qna-box">
                            <i class="qna-q"></i>
                            <div class="qna-item">
                                <p class="title">010 번호로 등록할 수 있나요?</p>
                                <p class="content">
                                    현재 RCS 기업 메시지는 010 번호를 지원하지 않습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="third-box__wrap">
                    <div class="third-box"  id="guide_3_3">
                        <p class="title">타인 명의 발신번호</p>
                        <p class="content">
                            타인 명의 발신번호로 대화방 등록 시, 발신번호 소유주의 위탁서 및 발신번호 소유 인증 자료(아래 표)를 함께 등록하시면 됩니다.
                        </p>
                    </div>
                </div>
                <div class="table-box">
                    <table>
                        <caption>등록 가능한 발신번호</caption>
                        <colgroup>
                            <col width="14%">
                            <col width="14%">
                            <col width="24%">
                            <col width="24%">
                            <col width="24%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col" colspan="2" rowspan="2"></th>
                                <th scope="col" colspan="3">타인 소유의 발신번호인 경우</th>
                            </tr>
                            <tr>
                                <th scope="col">발신번호 : 개인</th>
                                <th scope="col">발신번호 : 개인사업자</th>
                                <th scope="col">발신번호 : 법인</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" colspan="2">RCS 발신번호 위탁서</th>
                                <td>○</td>
                                <td>○</td>
                                <td>○</td>
                            </tr>
                            <tr>
                                <th rowspan="4">발신번호 소유주</th>
                                <th>신분증 사본</th>
                                <td>○</td>
                                <td>○</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>개인인감증명서</th>
                                <td>○</td>
                                <td>○</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>사업자등록증</th>
                                <td></td>
                                <td>○</td>
                                <td>○</td>
                            </tr>
                            <tr>
                                <th>법인인감증명서</th>
                                <td></td>
                                <td></td>
                                <td>○</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="third-box__wrap">
                    <div class="third-box">
                        <p class="content">
                            발신번호 위탁서는 <공지사항 / 서식> 에서 다운로드 가능합니다.
                        </p>
                    </div>
                </div>
                <div class="btn__warp right">
                    <p>
                        <a href="/notice" class="side-btn">공지사항 / 서식</a>
                        <i class="next"></i>
                    </p>
                </div>
                <div class="third-box__wrap" id="guide_3_4">
                    <div class="third-box">
                        <p class="title">대화방 명 가이드</p>
                        <p class="content">
                            대화방 명은 문자 수신 시, 프로필 이미지와 함께 가장 먼저 노출됩니다.<br>
                            대화방 명은 승신 심사 과정을 거친 후 반영되며, 대화방 명 심사 기준 및 권장 가이드를 확인해 주시기 바랍니다.
                        </p>
                    </div>
                </div>
                <div class="btn__warp right file-link">
                    <p>
                        <a href="/KeyFeatures" class="side-btn">
                            <img src="@/assets/images/guide/ico_pdf.png" alt="">
                            대화방명 가이드 안내.pdf
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <div class="guide__item" id="section05">
            <div class="second-box">
                <h2 class="second-title">4. 대화방 삭제</h2>
            </div>
            <div class="third-box__wrap">
                <div class="third-box">
                    <h3 class="third-title" id="guide_4_1"><span>4.1</span>대화방 삭제 가이드</h3>
                    <p class="content">
                        대화방 삭제 시, 다음과 같이 처리됩니다.
                    </p>
                </div>
            </div>
            <div class="gray-box__wrap">
                <div class="gray-box">
                    <p class="content">- 대화방 명과 프로필 이미지가 메시지 앱에서 표시되지 않습니다.</p>
                    <p class="content">- 더 이상 RCS 기업 메시지를 발송할 수 없습니다.</p>
                    <p class="content">- 연결된 대화방이 있는 경우, 함께 삭제됩니다. (삭제하는 대화방의 발신번호를 회신번호로 이용)</p>
                    <p class="content">- 마지막 대화방을 삭제하는 경우, 브랜드도 함께 삭제됩니다.</p>
                </div>
            </div>
            <div class="third-box__wrap">
                <div class="third-box">
                    <p class="title" id="guide_4_1_1">
                        대화방 삭제가 안되는 경우
                    </p>
                    <p class="content">
                        다음과 같은 경우, 대화방 삭제를 할 수 없습니다.
                    </p>
                </div>
            </div>
            <div class="gray-box__wrap">
                <div class="gray-box">
                    <p class="content">- 대화방의 상태가 <승인요청> <검수증> <반려> 인 경우</p>
                </div>
            </div>
            <div class="third-box__wrap">
                <div class="third-box">
                    <p class="title" id="guide_4_1_2">
                        자동 삭제 케이스
                    </p>
                    <p class="content">
                        다음과 같은 경우, 대화방이 자동 삭제 됩니다.
                    </p>
                </div>
            </div>
            <div class="gray-box__wrap">
                <div class="gray-box">
                    <p class="content">- 최초 등록 시, 반려 상태로 30일 경과 시</p>
                    <p class="content">- 최소 등록 시, 통신서비스가입증명원 서류 미제출 30일 경과 시</p>
                    <p class="content">- 대화방 사용 여부가 <미사용>인 상태로 30일 경과 시</p>
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
          'label': '2.1 RCS MO 대화방',
          'to': '#guide_2_1',
          'anchorIndex': 0
        },
        {
          'label': '2.2 RCS 양방향 대화방',
          'to': 'guide_2_2',
          'anchorIndex': 1,
          'children': [
            {
              'label': '양방향 대화방 설정',
              'to': '#guide_2_2_1',
              'anchorIndex': 0
            },
            {
              'label': '양방향 대화방 특화 기능',
              'to': '#guide_2_2_2',
              'anchorIndex': 1
            }
          ]
        },
        {
          'label': '3.1 대화방 등록 절차',
          'to': '#guide_3_1',
          'anchorIndex': 2
        },
        {
          'label': '3.2 등록 가능한 발신번호',
          'to': '#guide_3_2',
          'anchorIndex': 3
        },
        {
          'label': '3.3 타인 명의 발신번호',
          'to': '#guide_3_3',
          'anchorIndex': 4
        },
        {
          'label': '3.4 대화방 명 가이드',
          'to': '#guide_3_4',
          'anchorIndex': 5
        },
        {
          'label': '4.1 대화방 삭제 가이드',
          'to': '',
          'anchorIndex': 6,
          'children': [
            {
              'label': '대화방 삭제가 안되는 경우',
              'to': '#guide_4_1_1',
              'anchorIndex': 0
            },
            {
              'label': '자동삭제 케이스',
              'to': '#guide_4_1_2',
              'anchorIndex': 1
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
