<template>
  <div class="guide__inner">
    <div class="guide-lnb__wrap">
      <GuideLnb :menuData="guideLnbList" />
    </div>
    <div class="user-guide__wrap">
      <div class="guide-page__title">
        <h3>계정</h3>
      </div>
      <div class="guide__item" id="section01">
        <div class="subtitle-wrap">
          <h4>1. 계정 종류</h4>
          <p class="description">RCS Biz Center (이하 RBC)는 브랜드를 등록하여 사용하는 기업 계정과 브랜드 운영 및 메시지 발송을 대행할 수 있는 대행사 계정으로 구분됩니다.</p>
        </div>
        <div class="box-gray-line">
            <div class="title">
              <strong>기업 계정 생성</strong> <span>|</span>문자 서비스를 이용하는 사업자가 가입할 수 있는 계정
              <router-link to="/utility/join/corp" class="btn-join-link">가입하기</router-link>
            </div>
            <p class="content"><strong>마스터 권한 :</strong> 브랜드를 생성 및 운영 할 수 있으며, 사업자 등록증 제출이 필요합니다.</p>
            <p class="content"><strong>매니저 권한 :</strong> 다른 사용자가 생성한 브랜드의 운영만 가능하며, 추가 서류가 필요하지 않습니다.</p>
        </div>
        <div class="box-gray-line">
            <div class="title">
              <strong>대행사 계정</strong> <span>|</span>문자 서비스를 제공하는 특수한 유형의 부가통신사업자가 가입할 수 있는 계정
              <router-link to="/utility/join/agency" class="btn-join-link">가입하기</router-link>
            </div>
            <p class="content">특수한 유형의 부가통신사업자는 국내 권역 별 전파관리소로부터 자격을 취득해야 합니다.<br>
기업 계정의 운영자(마스터 권한)로 부터 브랜드의 대행사로 지정을 받으면 브랜드의 운영을 대행할 수 있습니다.<br>
대행사는 제공가능한 RCS 서비스를 지정해야 합니다.(RCS 단방향, RCS 양방향)</p>
        </div>
        <div class="subtitle-wrap">
          <h5>1.1. 계정별 사용 가능 메뉴</h5>
          <p class="description">계정의 권한에 따라 RBC에서 사용할 수 있는 기능에 차이가 있습니다.</p>
        </div>
        <div class="table-box">
          <table>
            <caption>계정별 사용 가능 메뉴 표</caption>
            <tbody>
              <tr class="thead">
                <td colspan="2" rowspan="2"></td>
                <th colspan="3">기업</th>
                <th colspan="3">브랜드</th>
                <th rowspan="2">대화방</th>
                <th rowspan="2">대화방<br/>메뉴</th>
                <th rowspan="2">브랜드<br/>소식</th>
                <th rowspan="2">자동응답<br/>메시지</th>
                <th rowspan="2">초대&권한<br/>설정</th>
              </tr>
              <tr class="thead">
                <th>등록</th>
                <th>수정</th>
                <th>삭제</th>
                <th>등록</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
              <tr>
                <th rowspan="3" class="thead">기업<br/>계정</th>
                <th class="thead no-line right">마스터</th>
                <td class="no-line right">○</td>
                <td class="no-line right">○</td>
                <td class="no-line right">○</td>
                <td class="no-line right">○</td>
                <td class="no-line right">○</td>
                <td class="no-line right">○</td>
                <td class="no-line right">○</td>
                <td class="no-line right">○</td>
                <td class="no-line right">○</td>
                <td class="no-line right">○</td>
                <td class="no-line right">○</td>
              </tr>
              <tr class="rowspan-wrap">
                <th class="no-line right"></th>
                <td class="no-line right"></td>
                <td class="no-line right"></td>
                <td class="no-line right"></td>
                <td class="no-line right"></td>
                <td class="no-line right"></td>
                <td class="no-line right"></td>
                <td class="no-line right">대표<br/>운영자만<br/>가능</td>
                <td class="no-line right"></td>
                <td class="no-line right"></td>
                <td class="no-line right"></td>
                <td class="no-line right"></td>
              </tr>
              <tr>
                <th class="thead">매니저</th>
                <td>임시등록</td>
                <td>○</td>
                <td></td>
                <td>임시등록</td>
                <td>○</td>
                <td></td>
                <td>○</td>
                <td>○</td>
                <td>○</td>
                <td>○</td>
                <td></td>
              </tr>
              <tr>
                <th colspan="2" class="thead">대행사 계정</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>○</td>
                <td></td>
                <td>○</td>
                <td>○</td>
                <td>○</td>
                <td>○</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul class="guide-list__dot">
          <li>임시 등록 : 매니저 권한으로 기업 계정과 브랜드를 최초 생성할 수 있으나, 실제 사용을 위해서는 소속 증명(사업자등록증 등 제출)을 해야 합니다.</li>
        </ul>
        <div class="btn__warp right">
          <a href="" class="side-btn color-blue">브랜드 운영 권한 종류</a>
          <i class="next"></i>
        </div>
      </div>
      <div class="guide__item" id="section02">
        <div class="subtitle-wrap">
          <h4>2. 기업 계정</h4>
          <p class="description">RBC의 브랜드를 관리할 수 있는 사업자번호 기준의 계정입니다.<br/>하나의 사업자등록번호 기준으로 여러 브랜드를 만들어 관리할 수 있습니다.</p>
        </div>
        <div class="gray-box__wrap">
          <div class="gray-box">
            <p class="content">- 같은 기업 계정이라도, 운영 권한이 없는 브랜드는 관리할 수 없습니다.</p>
          </div>
        </div>
        <div class="subtitle-wrap">
          <h5 id="guide_2">2.1 기업 계정 생성</h5>
          <p class="description">RBC 기업 계정은 &lt;사업자등록번호&gt; 기준으로 생성되며, 소속 인증 확인을 위하여 사업자등록증 제출이 필요합니다.</p>
        </div>
        <div class="gray-box__wrap">
          <div class="gray-box">
            <p class="title">소속 인증 서류</p>
            <div>
              <p class="content">- 일반 기업 : 사업자등록증 사본</p>
              <p class="content">- 공공기관 / 단체 : 고유번호증 등 소속을 인증할 수 있는 서류 사본</p>
            </div>
          </div>
          <p class="content">사업자등록증 제출 여부에 따라 마스터 권한 / 매니저 권한으로 구분합니다.</p>
          <div class="guide-process">
            <div  class="title">
              기업 정보 입력
            </div>
            <ol class="guide-list__num">
              <li><span class="num">1</span> RBC 사이트에서 기업 계정을 등록하실 수 있습니다. &lt;회원가입&gt; 메뉴를 선택하시면, <br/>사업자등록번호 기반으로 기업 계정을 등록할 수 있습니다.</li>
              <li><span class="num">2</span> 최초로 등록되는 사업자등록 번호인 경우, 비즈니스 정보를 추가적으로 입력합니다.</li>
            </ol>
            <div  class="title">
              운영자 정보 입력
            </div>
            <ol class="guide-list__num">
              <li><span class="num">1</span> 운영자의 기본 정보를 입력합니다.</li>
              <li><span class="num">2</span> 사업자등록증 등 소속을 증명할 수 있는 서류를 제출하면, 심사 승인을 통하여 <마스터> 권한으로 변경됩니다.</li>
            </ol>
            <div  class="title">
              가입 신청
            </div>
            <ol class="guide-list__num">
              <li><span class="num">1</span> 승인 요청 버튼을 선택합니다. 승인 전에도 바로 브랜드 등록 및 브랜드 운영 기능을 이용하실 수 있습니다.</li>
              <li><span class="num">2</span> 기업 계정 가입 신청이 완료되면, 운영자 가입도 함께 완료됩니다.</li>
            </ol>
            <div  class="title">
              승인
            </div>
            <ol class="guide-list__num">
              <li><span class="num">1</span> RBC에서 기업명과 사업자등록증의 실제 이름을 확인하여 승인 여부를 결정합니다.<br>승인기간은 평균적으로 업무일 기준 24시간 내 승인되나, 심사에 시간이 더 필요할 수도 있습니다.</li>
              <li><span class="num">2</span> 기업 계정 승인이 완료되면, 문자 알림으로 확인 가능합니다.</li>
            </ol>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 기업계정 승인이 완료되어야 하위 브랜드와 대화방 다른 기능들을 이용할 수 있습니다.</p>
              <p class="content">- 이용 약관에 명시된 미풍양속 및 사회 통념상 부정적인 업종의 경우, 사용이 제한될 수 있습니다.</p>
            </div>
          </div>
          <dl class="guide-qna__list">
            <dt>사업자등록번호, 사업자등록증이 없는 개인, 단체 입니다.</dt>
            <dd>사업자등록증이 없는 상태로 기업을 등록하게 되면, 7일간 임시저장 상태로 유지됩니다.<br/>단, 잘못된 정보 입력 등으로 점유되는 상황을 막기 위해, 기간내 사업자등록증을 제출하지 않을 경우 자동삭제 됩니다.</dd>
            <dt>사업자등록번호, 사업자등록증이 없는 개인, 단체 입니다.</dt>
            <dd>RBC는 RCS 기반의 비즈 메시지 플랫폼으로 사업자를 대상으로 제공하고 있습니다.<br/>신분이 증명될 수 있는 위임장, 단체 증빙서류를 제출하셔야 하며, 자세한 사항은 고객센터에 문의해주시기 바랍니다.</dd>
            <dt>사업자등록번호로 이미 기업 계정이 등록되어 있습니다.</dt>
            <dd>동일한 사업자등록번호로 여러 브랜드가 등록될 수 있습니다.<br/>하지만 각 브랜드는 브랜드의 운영권한을 얻지 못하면, 조회 및 관리할 수 없습니다.<br/>기업 계정을 등록하는 절차 중에는 신규로 운영자 등록이 되지 않으며, 기업 계정이 승인완료 된 이후 운영자 등록이 가능합니다.</dd>
            <dt>사업자등록번호를 도용당한 것 같습니다.</dt>
            <dd>온라인 문의를 통하여 고객센터에 문의해주시기 바랍니다.</dd>
          </dl>
          <div class="btn__warp right">
            <router-link to="/RequireList" class="side-btn">온라인 문의하기</router-link>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_3">2.2 기업 계정의 운영자 탈퇴</h5>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <div class="title-item">
                <p class="title">브랜드 대표 운영자인 경우</p>
                <div class="btn__warp right">
                  <router-link to="" class="side-btn black">대표자 운영자 란?</router-link>
                  <i class="question"></i>
                </div>
              </div>
              <p class="content">브랜드의 대표 운영자인 경우, 다른 마스터에게 권한 위임을 하거나 브랜드 삭제 후, 탈퇴할 수 있습니다.<br/>탈퇴 후, 동일 아이디로 재 가입이 불가합니다. 재 가입시, 이전의 회원 정보와 서비스 정보는 복구되지 않습니다.<br/>유일한 기업 계정의 운영자인 경우, 탈퇴와 함께 기업 계정도 함께 삭제됩니다.</p>
            </div>
            </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title">운영자인 경우</p>
              <p class="content">탈퇴 후, 동일 아이디로 재 가입이 불가합니다. 재 가입시, 이전의 회원 정보와 서비스 정보는 복구되지 않습니다.<br/>유일한 기업 계정의 운영자인 경우, 탈퇴와 함께 기업 계정도 함께 삭제됩니다.</p>
            </div>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_4">2.3 기업 계정 삭제</h5>
            <p class="description">기업 계정은 사업자번호 기준으로 공동 운영이 가능하기 때문에 다음과 같은 조건이 충족되어야 기업 계정을 삭제할 수 있습니다.</p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 모든 브랜드가 삭제 되어야 합니다.</p>
              <p class="content">- 기업 계정 내 다른 마스터 권한을 가진 운영자가 없어야 합니다.</p>
            </div>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title">자동 삭제 케이스</p>
              <p class="content">기업 계정은 다음과 같은 케이스로 자동 삭제될 수 있습니다.<br/>자동 삭제 전, 등록된 연락처로 사전 고지되며, 삭제 이후 복구가 불가하니 주의해주시기 바랍니다.</p>
            </div>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 기업 계정 생성 후, 사업자등록증 등 증빙서류를 7일내 제출하지 않은 경우</p>
              <p class="content">- 특수 목적으로 만들어진 기간제 기업 계정의 사용 기한이 종료된 경우</p>
              <p class="content">- 이용 약관에 명시된 미풍양속에 어긋나거나 불법 용도로 RCS 및 RBC 서비스를 이용한 경우</p>
            </div>
          </div>
        </div>
      </div>
      <div class="guide__item" id="section03">
        <div class="subtitle-wrap">
          <h4>3. 대행사 계정</h4>
        </div>
        <div class="subtitle-wrap">
          <h5 id="guide_3">3.1. 대행사 계정의 권한</h5>
        </div>
        <div class="text-box__wrap">
          <div class="text-box">
            <p class="content">대행사는 1개의 아이디를 여러 운영자가 함께 사용합니다.<br/>운영자는 대표자를 제외하고 최대 10명까지 추가될 수 있습니다.</p>
          </div>
          <div class="text-box">
            <p class="content">대행사는 여러 기업의 브랜드 운영 대행 권한을 가질 수 있습니다.<br/>브랜드 운영 대행 권한을 가지고 있어야 RCS 기업 메시지의 대행 발송이 가능합니다.</p>
          </div>
          <div class="text-box">
            <p class="content">대행사가 각 기업 계정의 브랜드별 운영 권한을 가지기 위해서는 다음과 같은 작업이 선행되어야 합니다.</p>
          </div>
        </div>

        <div class="text-box__wrap">
          <div class="text-box">
            <p class="title">1. 브랜드와 대행사 간 계약</p>
            <p class="content">브랜드와 대행사 간 계약 여부와 계약 정보는 RBC에서 관리하지 않습니다.</p>
          </div>
          <div class="text-box">
            <p class="title">2. 브랜드의 대행사 운영 권한 설정</p>
            <p class="content">브랜드의 운영자는 브랜드별로 대행사를 설정할 수 있으며, &lt;브랜드 운영권한&gt; 메뉴에서 확인할 수 있습니다. <br/>하나의 브랜드는 다수의 대행사를 설정할 수 있습니다. <br/>계약된 브랜드의 운영자에게 대행사 운영 권한 설정을 요청하세요.</p>
          </div>
          <div class="text-box">
            <p class="title">3. 브랜드-대행사 간 확인되어야 하는 정보</p>
            <p class="content">RCS 메시지 발송 및 RBC 기능 대행 업무를 위하여 다음과 같은 정보를 서로 교환해야 합니다.<br/><span class="content blue">브랜드 운영자의 API Key &lt; &gt; 대행사의 Agency IP</span></p>
          </div>
        </div>
        <ol class="guide-list__num">
          <li><span class="num">1</span> 운영자의 API Key 확인 방법 : <개인정보> 화면에서 확인할 수 있으며, 필요시 변경 가능합니다. </li>
          <li><span class="num">2</span> 대행사의 Agency IP 확인 방법 : 대행사 계정의 <기업정보>에서 확인할 수 있으며, 다수의 IP 주소를 등록할 수 있습니다. </li>
        </ol>
        <div class="guide-img__wrap">
          <img src="@/assets/images/guide/guide_account_03.png" alt="">
        </div>
        <div class="gray-box__wrap">
          <div class="gray-box">
            <p class="content">- API / Agency Key 등이 도용/유출될 경우 메시지 발송이 중단될 수 있으니, Key 관리에 주의해주세요.</p>
          </div>
        </div>
        <dl class="guide-qna__list">
          <dt>운영 대행 권한으로 어떤 것을 할 수 있나요?</dt>
          <dd>브랜드의 운영 대행 권한을 얻은 후, 브랜드 정보의 수정 및 하위 기능들의 추가/수정/삭제 등이 가능합니다.<br/>자세한 사항은 계정별 사용 가능 메뉴에서 확인하세요.</dd>
        </dl>
        <div class="btn__warp right">
          <router-link to="" class="side-btn">계정별 사용 가능 메뉴</router-link>
        </div>
        <hr class="hr-dot-line">
        <div class="subtitle-wrap">
          <h5 id="guide_3">3.2. 대행사 계정의 등록</h5>
          <p class="description">등록된 대행사 정보는 심사승인을 거쳐 등록 여부를 결정하게 됩니다. 승인기간은 평균적으로 업무일 기준 24시간 내 승인되나,<br/>심사에 시간이 더 필요할 수도 있습니다.</p>
        </div>
        <div class="gray-box__wrap">
          <div class="gray-box">
            <p class="title">필요 서류</p>
            <p class="content">- 사업자등록증 사본</p>
            <p class="content">- 특수부가통신서비스이용증명원 사본 (중계사/재판매사인 경우)</p>
          </div>
        </div>
        <p class="content">- 해당 대행사가 중계 업무를 진행하지 않을 경우, 연동 중계사를 설정하셔야 합니다.</p>
        <div class="btn__warp right">
          <router-link to="" class="side-btn">화면 가이드 / 마이페이지</router-link>
        </div>
        <hr class="hr-dot-line">
        <div class="subtitle-wrap">
          <h5 id="guide_3">3.3. 대행사 계정의 탈퇴</h5>
          <p class="description">탈퇴 후, 동일 아이디로 재 가입이 불가합니다. 재 가입시, 이전의 회원 정보와 서비스 정보는 복구되지 않습니다.<br/>대행사는 관리하는 브랜드가 있는 경우, 탈퇴가 불가합니다.</p>
        </div>
        <div class="gray-box__wrap">
          <div class="gray-box">
            <p class="content">- 탈퇴 전, 브랜드 운영 권한을 모두 삭제해야 합니다.</p>
          </div>
          <div class="btn__warp right">
            <router-link to="" class="side-btn">계정별 사용 가능 메뉴</router-link>
            <i class="next"></i>
          </div>
        </div>
        <div class="third-box">
          <h3 class="third-title" id="guide_6"><span>6.</span>대행사 계정의 등록</h3>
          <p class="content">등록된 대행사 정보는 심사승인을 거쳐 등록 여부를 결정하게 됩니다. 승인기간은 평균적으로 업무일 기준 24시간 내 승인되나,<br/>심사에 시간이 더 필요할 수도 있습니다.</p>
        </div>
        <div class="line-box__wrap">
          <div class="line-box">
            <p class="title">필요 서류</p>
            <div>
              <p class="content">- 사업자등록증 사본</p>
              <p class="content">- 특수부가통신서비스이용증명원 사본 (중계사/재판매사인 경우)</p>
            </div>
          </div>
          <p class="content">중계사가 아닌 경우, 연동 중계사를 설정하셔야 합니다.</p>
          <div class="btn__warp right">
            <router-link to="" class="side-btn">화면 가이드 / 마이페이지</router-link>
            <i class="next"></i>
          </div>
        </div>
        <div class="third-box">
          <h3 class="third-title" id="guide_7"><span>7.</span>대행사 계정의 탈퇴</h3>
          <p class="content">탈퇴 후, 동일 아이디로 재 가입이 불가합니다. 재 가입시, 이전의 회원 정보와 서비스 정보는 복구되지 않습니다.<br/>대행사는 관리하는 브랜드가 있는 경우, 탈퇴가 불가합니다.</p>
        </div>
        <div class="gray-box__wrap">
          <div class="gray-box">
            <p class="content">- 탈퇴 전, 브랜드 운영 권한을 모두 삭제해야 합니다.</p>
          </div>
        </div>
      </div>
      <div class="guide__item" id="section04">
        <div class="subtitle-wrap">
          <h4>4. 시즌 계정</h4>
          <p class="description">특수 목적에 의하여 한시적으로만 사용 가능한 기업 계정입니다.<br/>제한된 기간 동안 이용 가능하며, 기간 종료 시 관련 정보들은 자동 삭제됩니다.</p>
        </div>
        <div class="gray-box__wrap">
          <div class="gray-box">
            <p class="content">- 사용 목적 예 : 선거 후보자</p>
          </div>
        </div>
        <div class="subtitle-wrap"  id="guide_8">
          <h5>4.1 시즌의 정의정</h5>
          <p class="description">RCS 기업 메시지가 필요한 주요 이벤트가 있을 때마다 RBC에서는 시즌 계정을 관리할 수 있도록 정의할 예정입니다.<br/>시즌 계정이 필요한 경우, 대행사를 통해 제공되므로 계약한 대행사로 문의주시기 바랍니다.<br/>만약 추가적으로 기간 설정/연장이 필요한 경우, RBC에 문의해주시기 바랍니다.</p>
        </div>
        <div class="box-gray-line">
            <div class="title">
              <strong>시즌 계정</strong> <span>|</span>사용 기한이 정해져 있는 가상의 비즈니스 계정 (등록을 위한 별도 문의 필요)
            </div>
            <p class="content"><strong>마스터 권한 :</strong> 시즌 계정을 관리하는 대행사</p>
            <p class="content"><strong>매니저 권한 :</strong> 대행사와 계약된 별도의 사용자 (ex. 선거 후보자, 임기직 등 기간이 정해져있는 특수 신분)</p>
        </div>
        <div class="btn__warp right multiline">
          <p><router-link to="" class="side-btn">온라인 문의</router-link></p>
          <p><router-link to="" class="side-btn">파트너사 소개</router-link></p>
        </div>
        <hr class="hr-dot-line">
        <div class="subtitle-wrap"  id="guide_9">
          <h5>시즌 계정 등록 절차</h5>
          <p class="description">기업 계정은 사업자번호 기준으로 공동 운영이 가능하기 때문에 다음과 같은 조건이 충족되어야 기업 계정을 삭제할 수 있습니다.</p>
        </div>

        <div class="text-box__wrap">
          <div class="text-box">
            <p class="title">1. 시즌 공지</p>
            <p class="content">RBC 사이트 등에서 시즌 계정 오픈에 대한 공지를 게시합니다.</p>
          </div>
          <div class="text-box">
            <p class="title">2. 시즌 계정 신청 및 계정 정보 생성</p>
            <p class="content">대행사는 &lt;기업 정보&gt; 화면에서 &lt;시즌 관리&gt; 메뉴를 통하여 시즌 계정 신청을 하게 됩니다.<br/>시즌 계정 신청 시, 가상 사업자번호를 기반으로 시즌 계정 정보가 생성됩니다.</p>
          </div>
        </div>
        <div class="guide-img__wrap">
          <img src="@/assets/images/guide/guide_account_02.png" alt="">
        </div>
        <div class="text-box">
          <p class="title">3. 시즌 계정 이용</p>
          <p class="content">생성된 계정 정보로 로그인을 할 수 있습니다. 운영자 계정은 대행사의 대표 운영자 정보로 생성됩니다. 최초 등록 시, 비밀번호 변경을 해주셔야 합니다.<br>
각 브랜드를 생성 후, 매니저 권한의 운영자를 초대하고 서비스를 이용할 수 있습니다.<br>
각 기능별 심사 승인 등의 절차는 기업 계정과 동일합니다.</p>
        </div>
        <dl class="guide-qna__list">
          <dt>대행사에서만 시즌 계정 신청이 가능한가요?</dt>
          <dd>현재는 대행사에서 관리하는 시즌 계정만 지원되고 있습니다.</dd>
          <dt>여러 시즌 계정을 만들고 싶습니다.</dt>
          <dd>한 시즌당 한 개의 시즌 계정만 생성 가능합니다.</dd>
          <dt>시즌이 종료된 뒤에도 연장하고 싶습니다.</dt>
          <dd>현재 시즌 종료 시, 연장이 불가합니다. 추가 이용이 가능한 경우, 별도 기업 계정 등록을 진행해주시기 바랍니다.</dd>
        </dl>
        <div class="subtitle-wrap">
          <h5 id="guide_10">4.3. 시즌 계정과 기업 계정의 차이점</h5>
        </div>
        <div class="text-box__wrap">
          <div class="text-box">
            <p class="title">대시보드</p>
            <p class="content">마스터 권한의 경우, 시즌 계정 하위 모든 브랜드의 정보를 확인/관리할 수 있습니다.<br/>매니저 권한의 경우, 본인이 운영 권한을 가진 브랜드의 정보만 확인할 수 있습니다. 다른 브랜드의 정보는 노출되지 않습니다.<br/>대시보드에서 시즌 계정의 기간이 표시되며, 삭제 예정일이 도래되면 각 운영자에게 문자로 안내됩니다.</p>
          </div>
          <div class="text-box">
            <p class="title">브랜드</p>
            <p class="content">브랜드의 경우, 시즌 등록 시 추가적인 증빙서류를 추가 등록해야합니다.<br/>증빙서류는 시즌 계정을 이용할 수 있는 권한 증명의 용도입니다.<br/>주요 시즌별 증명 방식은 다음과 같습니다.</p>
          </div>
        </div>
        <div class="gray-box__wrap">
          <div class="gray-box">
            <p class="title">증빙 서류</p>
            <p class="content">- 선거 : 선거관리위원회 서식 / 개인 신분증 사본 혹은 인증서 / 대행사 위임장</p>
          </div>
        </div>
        <div class="subtitle-wrap">
          <h5 id="guide_11">4.3. 시즌 종료와 계정 삭제</h5>
          <p class="description">시즌 계정은 정해진 기간동안만 사용할 수 있으므로, 기간 종료 시 자동 삭제처리됩니다.</p>
        </div>
        <div class="text-box__wrap">
          <div class="text-box">
            <p class="title">대시보드</p>
            <p class="content">마스터 권한의 경우, 시즌 계정 하위 모든 브랜드의 정보를 확인/관리할 수 있습니다.<br/>매니저 권한의 경우, 본인이 운영 권한을 가진 브랜드의 정보만 확인할 수 있습니다. 다른 브랜드의 정보는 노출되지 않습니다.<br/>대시보드에서 시즌 계정의 기간이 표시되며, 삭제 예정일이 도래되면 각 운영자에게 문자로 안내됩니다.</p>
          </div>
          <div class="text-box">
            <p class="title">브랜드</p>
            <p class="content">브랜드의 경우, 시즌 등록 시 추가적인 증빙서류를 추가 등록해야합니다.<br/>증빙서류는 시즌 계정을 이용할 수 있는 권한 증명의 용도입니다.<br/>주요 시즌별 증명 방식은 다음과 같습니다.</p>
          </div>
        </div>
        <div class="gray-box__wrap">
          <div class="gray-box">
            <p class="title">기간 종료 시,</p>
            <p class="content">- 사이트 접속이 불가합니다.</p>
            <p class="content">- 등록했던 모든 정보의 사용이 불가합니다.</p>
            <p class="content">- RCS 기업 메시지 발송을 할 수 없으며, 브랜드 프로필이 문자앱에서 표시되지 않습니다.</p>
            <p class="content">- 소유한 발신번호로의 일반 문자 메시지는 계속 발송 가능하며, 신규로 계정 등록 후 다시 이용 가능합니다.</p>
          <div>
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
          'label': '1. 계정별 사용 가능한 메뉴',
          'to': '#guide_1',
          'anchorIndex': 0
        },
        {
          'label': '2. 기업 계정 생성',
          'to': '#guide_2',
          'anchorIndex': 1
        },
        {
          'label': '3. 브랜드 가이드',
          'to': '2',
          'anchorIndex': 2,
          'children': [
            {
              'label': '대표 운영자인 경우',
              'to': '#guide_3',
              'anchorIndex': 0
            },
            {
              'label': '운영자인 경우',
              'to': '#guide_4',
              'anchorIndex': 1
            }
          ]
        },
        {
          'label': '4. 기업 계정 삭제',
          'to': '',
          'anchorIndex': 3,
          'children': [
            {
              'label': '자동 삭제 케이스',
              'to': '#guide_5',
              'anchorIndex': 0
            }
          ]
        },
        {
          'label': '5. 대행사 계정의 권한',
          'to': '',
          'anchorIndex': 5,
          'children': [
            {
              'label': '대행사 계정의 운영 권한',
              'to': '#guide_6',
              'anchorIndex': 0
            }
          ]
        },
        {
          'label': '6. 대행사 계정의 등록',
          'to': '#guide_7',
          'anchorIndex': 6
        },
        {
          'label': '7. 대행사 계정의 탈퇴',
          'to': '#guide_8',
          'anchorIndex': 7
        },
        {
          'label': '8. 시즌 정의',
          'to': '#guide_9',
          'anchorIndex': 8
        },
        {
          'label': '9. 시즌 계정 등록 절차',
          'to': '#guide_10',
          'anchorIndex': 9
        },
        {
          'label': '10. 시즌 계정과 기업 계정의 차이점',
          'to': '#guide_11',
          'anchorIndex': 10
        }
      ]
    }
  },
  methods: {
  }
}
</script>
