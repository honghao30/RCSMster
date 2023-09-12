<template>
  <div class="guide__inner">
    <div class="guide-lnb__wrap">
      <GuideLnb :menuData="guideLnbList" />
    </div>
    <div class="guide__wrap">
      <div class="first__wrap">
        <h1 class="first-title">브랜드</h1>
        <p class="content">RCS 기업 메시지와 RBC에서 제공하는 기능은 브랜드 단위로 이용할 수 있습니다.</p>
      </div>
      <div class="guide__item"id="section01">
        <div class="second-box">
          <h2 class="second-title" id="guide_1"><span>1.</span>브랜드 홈 소개</h2>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <h3 class="third-title" id="guide_1-1"><span>1.</span><span>1.</span>브랜드 홈 구성</h3>
            <p class="content">브랜드 홈은 다음과 같은 항목으로 구성되어 있으며, 각 항목은 RBC에서 브랜드를 만들때 함께 등록할 수 있습니다.</p>
          </div>
          <div class="gray-box__wrap">
            <div class="brand_img">
              <div class="guide_img brand_01"></div>
            </div>
          </div>
          <div class="text-box__wrap" id="guide_1_1-1">
            <div class="text-box">
              <p class="title">퀵버튼</p>
              <p class="content">브랜드와 관련된 링크를 아이콘으로 보여줍니다.</p>
            </div>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box brand_img">
              <div class="guide_img brand_02"></div>
            </div>
          </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <h3 class="third-title" id="guide_1-2"><span>1.</span><span>2.</span>브랜드 프로필 노출</h3>
            <p class="content">브랜드 프로필을 등록하면, 메시지 앱에서 다음과 같은 곳에 노출됩니다.<br/>브랜드 프로필 이미지는 브랜드 하위의 모든 대화방에서 공통적으로 사용되며, 브랜드 명은 사용자가 앱에서 대화방 프로필을 선택 하였을 때, 진입되는 브랜드 홈에서 노출됩니다.</p>
          </div>
          <div class="gray-box__wrap">
            <div class="brand_img">
              <div class="guide_img brand_03"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="guide__item" id="section02">
        <div class="second-box">
          <h2 class="second-title" id="guide_2"><span>2.</span>브랜드 구조</h2>
          <p class="content">브랜드는 하나의 프로필 이미지와 브랜드 정보를 기준으로 다수의 대화방으로 이루어져 있습니다.<br/>브랜드 단위로 다음과 같은 기능을 함께 사용할 수 있습니다.</p>
        </div>
        <div class="gray-box__wrap">
          <div class="brand_img">
            <div class="guide_img brand_04"></div>
          </div>
        </div>
      </div>
      <div class="guide__item" id="section03">
        <div class="second-box">
          <h2 class="second-title" id="guide_3"><span>3.</span>브랜드 등록</h2>
          <p class="content">메시지 앱을 사용하는 수신자들에게 신뢰감가는 메시지를 보내고 싶다면, 브랜드 프로필 등록이 필요합니다.<br/>브랜드 프로필을 등록하면, 문자를 받는 고객의 대화방 정보가, 기업에서 등록한 브랜드 로고/브랜드 명 등으로 보여집니다.</p>
        </div>
        <div class="gray-box__wrap">
          <div class="brand_img">
            <div class="guide_img brand_05"></div>
          </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <h3 class="third-title" id="guide_3-1"><span>3.</span><span>1.</span>브랜드 가이드</h3>
            <p class="content">브랜드 명과 브랜드 프로필을 적절히 사용할 수 있도록 브랜드 등록 시, 심사 승인 과정을 거치게 됩니다.<br/>브랜드 명과 브랜드 프로필을 올바르게 등록할 수 있도록 브랜드 개설 안내 가이드를 꼭 확인해주시기 바랍니다.</p>
            <div class="btn-box__wrap right">
              <div class="btn__warp">
                <a href="" download class="side-btn black">
                  브랜드 개설 pdf
                </a>
                <i class="download"></i>
              </div>
            </div>
          </div>
          <div class="gray-box__wrap">
            <p class="content">RBC는 비즈니스 계정 기반으로 운영되므로, 다음과 같은 케이스에서의 브랜드 명은 온라인 문의를 해주시기 바랍니다.</p>
            <div class="gray-box">
              <p class="content">- 사업자 등록증과 브랜드 명이 다른 경우</p>
              <p class="content">- 개인의 이름으로 브랜드를 만드는 경우</p>
              <p class="content">- 기간이 정해져있는 직함을 포함하는 경우</p>
            </div>
            <div class="btn__warp right">
              <router-link to="/OnlineInquire" class="side-btn">온라인 문의하기</router-link>
              <i class="next"></i>
            </div>
          </div>
          <div class="gray-box__wrap">
            <p class="content">다음과 같은 케이스로 브랜드를 만드는 경우는 별도 확인이 필요합니다.</p>
            <div class="gray-box">
              <p class="content">- 선거 후보자입니다.</p>
            </div>
            <div class="btn__warp right">
              <router-link to="" class="side-btn">시즌 계정</router-link>
              <i class="next"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="guide__item" id="section04">
        <div class="second-box">
          <h2 class="second-title" id="guide_4"><span>4.</span>브랜드 관리</h2>
          <p class="content">브랜드의 정보 수정은 비즈니스 계정의 마스터 / 매니저 모두 가능합니다.<br/>만약 브랜드명 / 브랜드 프로필 이미지를 수정하는 경우, 재 승인 심사 단계를 거쳐야 합니다.</p>
          <div class="btn-box__wrap right">
            <div class="btn__warp">
              <router-link to="" class="side-btn">화면 가이드 / 브랜드</router-link>
              <i class="next"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="guide__item" id="section05">
        <div class="second-box">
          <h2 class="second-title" id="guide_5"><span>5.</span>브랜드 운영 권한</h2>
          <p class="content">브랜드 운영을 보다 효율적으로 하기 위하여 같은 기업의 동료 혹은 대행사에게 운영 권한을 줄 수 있습니다.</p>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <h3 class="third-title" id="guide_5-1"><span>5.</span><span>1.</span>브랜드 운영 권한 종류</h3>
          </div>
          <div class="border-box__wrap">
            <ul class="border-box">
              <li>
                <p class="title-blue">대표 운영자</p>
                <p class="content">브랜드를 최초 생성한 사용자로 브랜드 삭제 가능</p>
              </li>
              <li>
                <p class="title-blue">운영자</p>
                <p class="content">마스터 권한의 운영자로 부터 브랜드 운영권한을 받은 운영자</p>
              </li>
              <li>
                <p class="title-blue">대행사</p>
                <p class="content">마스터 권한의 운영자로 부터 브랜드 운영권한을 받은 대행사</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <h3 class="third-title" id="guide_5-2"><span>5.</span><span>2.</span>브랜드 운영 권한을 얻는 방법</h3>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title-blue">브랜드 직접 만들기</p>
              <p class="content">직접 생성한 경우, 대표 운영자로서 브랜드 관리의 최종적인 책임을 가지게 됩니다.<br/>매니저 권한인 운영자가 브랜드를 생성하는 경우, 사업자등록증 등 소속을 증명할 증빙서류를 등록하여 마스터 권한으로 변경 후 실제 이용이 가능합니다.</p>
            </div>
            <div class="text-box">
              <p class="title-blue">동료 초대하기</p>
              <p class="content">마스터 권한인 브랜드의 운영자는 같은 기업/소속의 인원을 초대할 수 있습니다.</p>
            </div>
          </div>
          <div class="gray-box__wrap">
            <div class="brand_img">
              <div class="guide_img brand_06"></div>
            </div>
          </div>
          <div class="list-title-box__wrap">
            <div class="list-title-box">
              <i class="list1"></i>
              <div class="list-title-box-item">
                <p class="title">RBC에 가입되어 있지 않은 동료 초대하기</p>
                <p class="content">&lt;브랜드 운영 권한 초대&gt; 메뉴에서 신규 운영자의 이메일 주소와 함께 운영권한을 줄 브랜드를 선택하여 초대할 수 있습니다.<br/>신규 운영자에게는 이메일로 초대 링크가 전송됩니다.<br/>링크를 통하여 운영자 등록을 하게 되면, 등록과 함께 자동으로 브랜드 운영권한도 함께 설정되어 바로 이용할 수 있습니다.</p>
              </div>
            </div>
            <div class="list-title-box">
              <i class="list2"></i>
              <div class="list-title-box-item">
                <p class="title">RBC에 이미 가입되어 있는 동료 초대하기</p>
                <p class="content">&lt;브랜드 운영 권한 초대&gt; 메뉴에서 브랜드 운영 권한을 줄 수 있습니다.</p>
              </div>
            </div>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title-blue">브랜드 운영 권한 요청하기</p>
              <p class="content">동일한 기업 계정에서 다른 운영자가 관리하는 브랜드인 경우, 대시보드에서 브랜드 운영 권한을 각각 요청할 수 있습니다.<br/>해당 브랜드의 대표 운영자가 요청 수락 시, 운영 권한을 가지게 됩니다.</p>
            </div>
            <div class="text-gray-box">
              <div class="text-box">
                <p class="title-blue">(대행사) 브랜드 운영 권한 설정</p>
                <p class="content">대행사에게 운영권한을 준다는 것은 다음과 같은 역할을 대행사가 할 수 있다는 것입니다.</p>
              </div>
              <div class="gray-box__wrap">
                <div class="gray-box">
                  <p class="content">- 사업자 등록증과 브랜드 명이 다른 경우</p>
                  <p class="content">- 개인의 이름으로 브랜드를 만드는 경우</p>
                  <p class="content">- 기간이 정해져있는 직함을 포함하는 경우</p>
                </div>
              </div>
              <p class="content">대행사에게 운영권한을 준다는 것은 다음과 같은 역할을 대행사가 할 수 있다는 것입니다.</p>
              <div class="btn-box__wrap right">
              <div class="btn__warp">
                <router-link to="" class="side-btn">계정별 사용 가능 메뉴</router-link>
                <i class="next"></i>
              </div>
            </div>
            </div>
          </div>
          <p class="content">대행사 운영권한 설정 전에는 사전에 브랜드와 대행사 간 계약이 체결되어야 합니다.</p>
          <div class="gray-box__wrap">
            <div class="brand_img">
              <div class="guide_img brand_07"></div>
            </div>
          </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <h3 class="third-title" id="guide_5-3"><span>5.</span><span>3.</span>대표 운영자</h3>
            <p class="content">대표 운영자란, 브랜드 관리를 책임지는 운영자입니다.<br/>브랜드의 대표 운영자가 될 수 있는 방법은 다음과 같습니다.</p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 브랜드를 생성한 경우</p>
              <p class="content">- 이전 대표 운영자로부터 위임받은 경우</p>
            </div>
          </div>
          <div class="gray-box__wrap">
            <p class="content">대표 운영자는 다른 브랜드 운영자들과 달리 다음과 같은 권한을 추가적으로 가질 수 있습니다.</p>
            <div class="gray-box">
              <p class="content">- 브랜드 삭제</p>
              <p class="content">- 대표 운영자 변경</p>
              <p class="content">- 운영 권한 해제</p>
            </div>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title-blue" id="guide_5-3-1">대표 운영자 변경</p>
              <p class="content">대표 운영자가 업무 변경 등의 사유로 브랜드 관리를 더 이상 하지 않게 되는 경우,<br/>&lt;브랜드 운영 관리&gt; 메뉴에서 다른 운영자(마스터 권한)를 대표 운영자로 지정할 수 있습니다.</p>
            </div>
            <div class="text-box">
              <p class="title-blue" id="guide_5-3-2">운영 권한 해제</p>
              <p class="content">브랜드의 대표 운영자는 운영자 / 대행사의 브랜드 운영 권한을 해제할 수 있습니다.<br/>운영 권한이 해제된 운영자 혹은 대행사에게 개별적으로 안내 메시지가 전송됩니다.<br/>해제된 운영 권한은 다시 설정할 수 있습니다.</p>
            </div>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box brand_img">
              <div class="guide_img brand_08"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="guide__item" id="section06">
        <div class="second-box">
          <h2 class="second-title" id="guide_6"><span>6.</span>브랜드 삭제</h2>
          <p class="content">대표 운영자만 브랜드 삭제가 가능합니다. 브랜드 삭제는 &lt;브랜드 홈 수정&gt;화면에서 가능합니다.<br/>대표 운영자의 휴대폰 인증 이후, 삭제 처리가 진행됩니다.<br/>단, 실제 메시지 발송 및 API 업데이트 등이 진행 중인 케이스를 고려하여 아래에 해당하는 경우 브랜드 삭제가 불가합니다.</p>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <h3 class="third-title" id="guide_6-1"><span>6.</span><span>1.</span>브랜드 삭제 전 확인 사항</h3>
          </div>
          <div class="table-box">
            <table class="brand-table">
              <caption>브랜드 삭제 전 확인 사항 표</caption>
              <tbody>
                <tr class="thead">
                  <th>분류</th>
                  <th>확인사항</th>
                </tr>
                <tr>
                  <td>브랜드</td>
                  <td class="text-left">&lt;승인요청&gt; &lt;검수&gt; &lt;반려&gt; 상태인 경우</td>
                </tr>
                <tr>
                  <td>대화방 중 1개 이상</td>
                  <td class="text-left">&lt;승인요청&gt; &lt;검수&gt; &lt;반려&gt; 상태인 경우</td>
                </tr>
                <tr>
                  <td>템플릿 중 1개 이상</td>
                  <td class="text-left">&lt;승인요청&gt; &lt;검수&gt; &lt;반려&gt; 상태인 경우</td>
                </tr>
                <tr>
                  <td>대행사</td>
                  <td class="text-left">대행사가 1개 이상 설정되어 있는 경우, 사용자가 대행사 운영권한을 모두 해지해야함</td>
                </tr>
                <tr>
                  <td>운영자</td>
                  <td class="text-left">본인을 제외한 마스터/매니저가 운영 권한이 있는 경우</td>
                </tr>
              </tbody>
            </table>
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
          'label': '1.1 브랜드 홈 구성',
          'to': '#guide_1-1',
          'anchorIndex': 0,
          'children': [
            {
              'label': '퀵 버튼',
              'to': '#guide_1_1-1',
              'anchorIndex': 0
            }
          ]
        },
        {
          'label': '1.2 브랜드 프로필 노출',
          'to': '#guide_1-2',
          'anchorIndex': 1
        },
        {
          'label': '3.1 브랜드 가이드',
          'to': '#guide_3-1',
          'anchorIndex': 2
        },
        {
          'label': '5.1 브랜드 운영 권한 종류',
          'to': '#guide_5-1',
          'anchorIndex': 3
        },
        {
          'label': '5.2 브랜드 운영 권한을 얻는 방법',
          'to': '',
          'children': [
            {
              'label': '브랜드 직접 만들기',
              'to': '#guide_5_2-1',
              'anchorIndex': 0
            },
            {
              'label': '동료 초대하기',
              'to': '#guide_5_2-1',
              'anchorIndex': 1
            },
            {
              'label': '브랜드 운영 권한 요청하기',
              'to': '#guide_5_2-3',
              'anchorIndex': 2
            },
            {
              'label': '(대행사) 브랜드 운영 권한 설정',
              'to': '#guide_5_2-4',
              'anchorIndex': 3
            }
          ]
        },
        {
          'label': '5.3 대표 운영자',
          'to': '',
          'children': [
            {
              'label': '대표 운영자 변경',
              'to': '#guide_5_3-1',
              'anchorIndex': 0
            },
            {
              'label': '운영 권한 해제',
              'to': '#guide_5_3-2',
              'anchorIndex': 1
            }
          ]
        },
        {
          'label': '6.1 브랜드 삭제 전 확인 사항',
          'to': '#guide_6-1',
          'anchorIndex': 4
        }
      ]
    }
  },
  methods: {
  }
}
</script>
