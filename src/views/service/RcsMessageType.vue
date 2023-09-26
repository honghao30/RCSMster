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
          <h3>RCS 기업 메시지 종류</h3>
          <p class="description">비즈니스 목적으로 보내는 모든 메시지를 RCS 기업 메시지로 바꿔보세요.</p>
        </div>
        <div class="guide__item" id="section01">
          <div class="subtitle-wrap">
            <h4>1. RCS 기업 메시지 구분</h4>
            <p class="description">RCS 기업 메시지는 다양한 레이아웃을 포맷 형태로 제공합니다.<br>
            각 상품별로 지원하는 RCS 기업 메시지 포맷이 다르므로 사전에 확인해주시기 바랍니다.</p>
          </div>
          <div class="table-box color-custom-table mt-t8">
            <table>
              <caption>RCS 기업 메시지 구분</caption>
              <colgroup>
                <col width="80px">
                <col width="70px">
                <col width="180px">
                <col width="70.17px">
                <col width="70.17px">
                <col width="70.17px">
                <col width="70.17px">
                <col width="70.17px">
                <col width="70.17px">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" colspan="3">RCS 기업 메시지</th>
                  <th scope="col">SMS</th>
                  <th scope="col">LMS</th>
                  <th scope="col">MMS</th>
                  <th scope="col">정보성<br>템플릿</th>
                  <th scope="col">이미지<br>템플릿</th>
                  <th scope="col">양방향</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colspan="2">공통 포맷</th>
                  <th class="dot-th">
                    <ul class="guide-list__dot">
                      <li class="arrow">기존 문자처럼 즉시 발송이<br>
                        가능한 RCS 기업 메시지</li>
                      <li class="arrow">모든 브랜드 공통 사용 가능</li>
                    </ul>
                  </th>
                  <td>
                    <img src="@/assets/images/guide/ico_check-table.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check-table.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check-table.png" alt="">
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <img src="@/assets/images/guide/ico_check-table.png" alt="">
                  </td>
                </tr>
                <tr>
                  <th rowspan="2" class="top-th">브랜드 포맷</th>
                  <th class="pd-th">레이아웃<br><span class="small-text-blue">(준비중)</span></th>
                  <th class="dot-th">
                    <ul class="guide-list__dot">
                      <li class="arrow">원하는 레이아웃으로 조합할 수 있는 RCS 기업 메시지</li>
                    </ul>
                  </th>
                  <td>
                    <img src="@/assets/images/guide/ico_check-table.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check-table.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check-table.png" alt="">
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th class="pd-th2">템플릿</th>
                  <th class="dot-th">
                    <ul class="guide-list__dot">
                      <li class="arrow">메시지 본문 내용을 사전에<br> 등록하는 RCS 기업 메시지</li>
                      <li class="arrow">사전 등록 필수</li>
                      <li class="arrow">승인 필수<br>(발송 방식 free 제외)</li>
                    </ul>
                  </th>
                  <td></td>
                  <td>
                    <img src="@/assets/images/guide/ico_check-table.png" alt="">
                  </td>
                  <td></td>
                  <td>
                    <img src="@/assets/images/guide/ico_check-table.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check-table.png" alt="">
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="guide-list__dot">
            <li>대행사별로 지원하는 RCS 기업 메시지 종류가 상이할 수 있습니다.</li>
          </ul>
          <div class="table-box color-custom-table mt-t24">
            <table>
              <caption>RCS 기업 메시지 종류</caption>
              <colgroup>
                <col width="">
                <col width="11%">
                <col width="11%">
                <col width="11%">
                <col width="11%">
                <col width="11%">
                <col width="11%">
                <col width="11%">
                <col width="11%">
              </colgroup>
              <thead>
                <tr>
                  <th rowspan="2"></th>
                  <th rowspan="2" class="pd-th3">RCS SMS</th>
                  <th rowspan="2" class="pd-th3">RCS LMS</th>
                  <th rowspan="2" class="pd-th3">RCS MMS</th>
                  <th colspan="3" class="pd-th4">RCS 정보성 템플릿</th>
                  <th rowspan="2" class="pd-th5">RCS<br>이미지 템플릿</th>
                  <th rowspan="2" class="pd-th5">RCS<br>LMS 템플릿</th>
                </tr>
                <tr>
                  <th class="pd-th6">
                    서술<br><span>(description)</span>
                  </th>
                  <th class="pd-th6">
                    스타일<br><span>(cell)</span>
                  </th>
                  <th class="pd-th6">
                    기본<br><span>(free)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="pd-th7">사전등록</th>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>필요</td>
                  <td>필요</td>
                  <td>-</td>
                  <td>필요</td>
                  <td>필요</td>
                </tr>
                <tr>
                  <th class="pd-th7">운영자 승인</th>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>필요</td>
                  <td>필요</td>
                  <td>-</td>
                  <td>필요</td>
                  <td>필요</td>
                </tr>
                <tr>
                  <th class="pd-th8">메시지 내용</th>
                  <td>정보성<br>광고성</td>
                  <td>정보성<br>광고성</td>
                  <td>정보성<br>광고성</td>
                  <td>정보성</td>
                  <td>정보성</td>
                  <td>정보성</td>
                  <td>정보성<br>광고성</td>
                  <td>정보성<br>광고성</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="guide__item" id="section02">
          <div class="subtitle-wrap">
            <h4>2. 공통 포맷</h4>
            <p class="description">기존 문자처럼 필수 입력항목만 넣어 즉시 발송이 가능한 RCS 기업 메시지입니다.</p>
          </div>
          <div class="blue-box__wrap">
            <div class="blue-left">
              <p class="content">상품 코드별, 포맷 ID별로<br class="only-mo"> 샘플 메시지를 확인하고 싶다면?</p>
            </div>
            <div class="blue-right">
              <ButtonCmp
                type="btn-blue"
                size="medium"
                @click="guideSampleMsg"
              >
                공통 포맷 샘플 보기
              </ButtonCmp>
            </div>
          </div>
        </div>
        <div class="guide__item" id="section03">
          <div class="subtitle-wrap">
            <h4>3. 레이아웃</h4>
            <p class="description">브랜드별로 등록하여 사용할 수 있는 RCS 기업 메시지입니다.</p>
          </div>
          <div class="subtitle-wrap mt-t8">
            <h5 id="guide_3_1">3. 1. 레이아웃</h5>
            <p class="description">
              RBC에서 제공하는 표준 메시지 컴포넌트를 이용하여 업무에 필요한 메시지 포맷을 만들어 사용할 수 있습니다.<br>
              사용 전, 함께하는 대행사가 레이아웃을 지원하는지 확인하세요.
            </p>
          </div>
          <div class="guide-img__wrap mt-t16">
            <img src="@/assets/images/guide/guide_msg_type01.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_msg_type01_mo.png" alt="" class="only-mo">
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_3_1_1">조합 방식</p>
              <p class="content">
                각 상품별로 조합 가능한 최대 컴포넌트 수를 확인해주세요.<br>
                조합된 브랜드 포맷은 별도의 승인절차 없이 <span class="color-red">등록 시점으로부터 D+1일 0시부터 (운영 정책 결정 필요)</span> 이용 가능합니다.
              </p>
            </div>
          </div>
          <div class="table-box color-custom-table">
            <table>
              <caption>RCS 기업 메시지 조합 방식</caption>
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" class="pd-th10"></th>
                  <th scope="col" class="pd-th10">RCS SMS</th>
                  <th scope="col" class="pd-th10">RCS LMS</th>
                  <th scope="col" class="pd-th10">RCS MMS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="pd-th9">
                    조합 가능 컴포넌트 수
                  </th>
                  <td class="pd-td">
                    1~2
                  </td>
                  <td class="pd-td">
                    1~6
                  </td>
                  <td class="pd-td">
                    1~6
                  </td>
                </tr>
                <tr>
                  <th class="pd-th9">버튼 컴포넌트 수</th>
                  <td class="pd-td">
                    1
                  </td>
                  <td class="pd-td">
                    3
                  </td>
                  <td class="pd-td">
                    2
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-t16 mt-b0">
              <p class="content">같은 컴포넌트 그룹에서는 1개의 컴포넌트만 사용할 수 있습니다.</p>
              <p class="content">메인타이틀은 최 상단에만 위치할 수 있습니다.</p>
              <p class="content">버튼 컴포넌트는 최 상단에 위치할 수 없습니다.</p>
            </div>
          </div>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title" id="guide_3_1_2">레이아웃 발송</p>
              <p class="content">
                레이아웃을 RBC에서 먼저 등록 후, 메시지를 발송하셔야 합니다.<br>
                템플릿과 달리, 레이아웃은 RBC의 심사 승인 없이 바로 등록하여 사용 가능합니다.
              </p>
            </div>
          </div>
          <div class="guide-img__wrap no-full">
            <img src="@/assets/images/guide/guide_msg_type02.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_msg_type02_mo.png" alt="" class="only-mo">

          </div>
          <p class="content">
            공통포맷과 동일 발송하는 방식은 동일합니다.<br>
            각 컴포넌트별로 메시지 발송 시, 값이 없을 경우 발송 실패되는 요소와 해당 컴포넌트<br>
            영역이 보여지지않는 요소가 다르니, 유의해 주시기 바랍니다.<br>
            각 컴포넌트별 필수 요소를 확인해주시기 바랍니다.
          </p>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_3_2">3. 2. 컴포넌트</h5>
            <p class="description">
              다양한 기업의 요구사항에 맞추면서도 쉽게 적용할 수 있도록 RCS 기업 메시지를 새로이 정의하였습니다.
            </p>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title" id="guide_3_2_1">컴포넌트 란?</p>
              <p class="content">RCS 기업 메시지의 구성을 정의하는 단위입니다.</p>
            </div>
          </div>
          <p class="title add-tit mt-t32" id="guide_3_2_2">컴포넌트 종류</p>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_msg_type03.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_msg_type03_mo.png" alt="" class="only-mo">
          </div>
          <div class="blue-box__wrap mt-t0">
            <div class="blue-left">
              <p class="content">컴포넌트 상세 규격 가이드가 궁금하다면?</p>
            </div>
            <div class="blue-right">
              <!-- <ButtonCmp
                type="btn-blue"
                size="medium"
              >
                컴포넌트 규격 가이드 다운로드
              </ButtonCmp> -->
              <a href="" download class="btn btn-blue medium">컴포넌트 규격 가이드 다운로드</a>
            </div>
          </div>
        </div>
        <div class="guide__item" id="section04">
          <div class="subtitle-wrap">
            <h4>4. 템플릿</h4>
            <p class="description">템플릿은 브랜드별로  메시지 내용 / 스타일을 미리 등록하여 사용하는 RCS 기업 메시지입니다.</p>
          </div>
          <div class="subtitle-wrap mt-t8">
            <h5 id="guide_4_1">4. 1. 템플릿 상품 구분</h5>
            <p class="description">
              템플릿은 상품 코드 기준으로 정보성 템플릿, 이미지 템플릿, LMS 템플릿으로 구분됩니다.<br>
              상품 코드는 과금 기준이며, 계약한 대행사의 단가에 따라 다를 수 있습니다.
            </p>
          </div>
          <div class="guide-img__wrap mt-t0 mt-b8">
            <img src="@/assets/images/guide/guide_msg_type04.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_msg_type04_mo.png" alt="" class="only-mo">
          </div>
          <div class="table-box color-custom-table">
            <table>
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" class="pd-th10"></th>
                  <th scope="col" class="pd-th10">정보성 템플릿</th>
                  <th scope="col" class="pd-th10">이미지 템플릿</th>
                  <th scope="col" class="pd-th10">LMS 템플릿</th>
                </tr>
              </thead>
              <tbody class="pd-only-td">
                <tr>
                  <th class="pd-th9">
                    상품코드
                  </th>
                  <td>
                    tmplt
                  </td>
                  <td>
                    itmpl
                  </td>
                  <td>
                    lms
                  </td>
                </tr>
                <tr>
                  <th class="pd-th8">글자수 / 용량제한</th>
                  <td>
                    최대 글자수 90자
                  </td>
                  <td>
                    최대 글자수 500자<br>미디어 1MB 내
                  </td>
                  <td>
                    최대 글자수 1,300자
                  </td>
                </tr>
                <tr>
                  <th class="pd-th8">메시지 내용</th>
                  <td>
                    정보성
                  </td>
                  <td>
                    정보성<br>광고성
                  </td>
                  <td>
                    정보성<br>광고성
                  </td>
                </tr>
                <tr>
                  <th class="pd-th11">발송 방식</th>
                  <td>
                    기본 (free)<br>
                    서술 (description)<br>
                    스타일 (cell)
                  </td>
                  <td>
                    서술 (description)
                  </td>
                  <td>
                    서술 (description)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title" id="guide_4_1_1">승인 심사 기준</p>
              <p class="content">템플릿의 승인 심사는 템플릿의 긴급성 및 승인 요청 건수, 상품 기준에 따라 상이합니다.</p>
            </div>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-t16 mt-b0">
              <p class="content line-before-none"><span class="color-blue">정보성 템플릿</span> :  승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</p>
              <p class="content line-before-none"><span class="color-blue">이미지 템플릿 / LMS 템플릿</span> : 12시 전 신청 건은 당일 오후, 12시 이후 신청 건에 대해서는 익일 오전 중 심사 예정입니다.<br>
              (주말 신청 건에 대해서는 차주 월요일 중 심사) 내부 사정상 지체될 수 있습니다.</p>
            </div>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_4_2">4. 2. 템플릿 발송</h5>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title" id="guide_4_2_1">발송 방식</p>
              <p class="content">템플릿은 세 가지 타입의 발송 방식을 제공하고 있습니다.<br>
              템플릿 유형에 따라 지원되는 발송 방식이 상이하므로, 운영 대행사에서 지원하는 방식과 발송 환경에 따라서 발송 방식을<br>
              선택하세요.</p>
            </div>
          </div>
          <div class="table-box color-custom-table">
            <table>
              <colgroup>
                <col width="20%">
                <col width="40%">
                <col width="40%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">발송방식</th>
                  <th scope="col">내용</th>
                  <th scope="col">예시</th>
                </tr>
              </thead>
              <tbody class="pd-only-td-10">
                <tr>
                  <th rowspan="2">
                    기본 (free)
                  </th>
                  <td rowspan="2">
                    <p>사전 등록 없이 문자 메시지 처럼 필요한 항목만 입력하여 발송합니다.</p>
                    <p>템플릿 유형별로 브랜드당 1개씩만 허용됩니다.</p>
                    <p>‣ 최대 글자수 / 용량 준수</p>
                  </td>
                  <td>
                    <div class="sub-title">템플릿 등록</div>
                    <div class="sub-description">N/A</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="sub-title">메시지 발송</div>
                    <div class="sub-description">“description : “홍길동, 인증번호는 123456입니다.”</div>
                  </td>
                </tr>
                <tr>
                  <th rowspan="2">
                    서술 (description)
                  </th>
                  <td rowspan="2">
                    <p>템플릿으로 등록한 메시지 내용을 모두 입력하여<br>발송합니다.</p>
                    <p>본문 내용을 변수 만으로 구성할 수 없습니다.<br>(변수 이외 문자 필수 입력)</p>
                    <p>‣ 최대 글자수 / 용량 준수<br>‣ 패턴 체크</p>
                  </td>
                  <td>
                    <div class="sub-title">템플릿 등록</div>
                    <div class="sub-description">“{{name}}”님, 인증번호는 “{{phone}}”입니다.</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="sub-title">메시지 발송</div>
                    <div class="sub-description">“description : “홍길동, 인증번호는 123456입니다.”</div>
                  </td>
                </tr>
                <tr>
                  <th rowspan="2">
                    스타일 (cell)
                  </th>
                  <td rowspan="2">
                    <p>템플릿 등록시 메시지 내용에 {{variable}}로 정의한 항목만 발송합니다.</p>
                    <p>복잡한 메시지 형태에 적합합니다.</p>
                    <p>테이블 의 볼드, 정렬, 글자색을 지정하실 수 있습니다.</p>
                    <p>‣ 최대 글자수 / 용량 준수<br>‣ 지정한 변수 입력</p>
                  </td>
                  <td>
                    <div class="sub-title">템플릿 등록</div>
                    <div class="sub-description">“{{name}}”님, 인증번호는 “{{phone}}”입니다.</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="sub-title">메시지 발송</div>
                    <div class="sub-description">
                      “이름” : “홍길동”
                    </div>
                    <div class="sub-description">
                      “인증번호” : “123456”
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="gray-box__wrap mt-t16">
            <div class="gray-box">
              <p class="content">기본(free) 템플릿 : 사전 등록이나 승인 없이 정보성 메시지를 발송할 수 있습니다.</p>
              <p class="content">서술(description), 스타일(cell) 템플릿 : 메시지 내용을 사전 등록하여 운영자 승인 완료 후 발송 가능합니다.</p>
            </div>
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_4_2_2">템플릿 작성 가이드</p>
              <ul class="guide-list__dot color-black">
                <li>템플릿 메시지는 승인 이후 사용 할 수 있습니다.</li>
                <li>고정부 메시지와 변수명 포함하여 각 영역 별 최대 입력 글자 수 초과 시 전송 불가합니다.</li>
                <li>텍스트 내용이 잘 드러나게 작성해야 하며, 내용 확인이 어려울 경우 반려 처리될 수 있습니다.</li>
                <li>템플릿 등록 완료 후 내용 변경 시 추가 승인 절차가 필요합니다.</li>
              </ul>
            </div>
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_4_2_3">변수 사용하기</p>
              <p class="content">서술(description) 과 스타일(cell) 방식으로 템플릿을 이용하는 경우, 변수 활용을 숙지하셔야 합니다.</p>
            </div>
          </div>
          <ul class="guide-list__dot color-black">
            <li>각 영역 별로 변수명은 최대 20자 이내로 작성해 주세요.</li>
            <li class="ver-top">변수로 설정하고자 하는 내용을 {{ sign }} 표시로 작성해 주세요. <br>
              예&#41; {{name}}, {{date}}</li>
            <li>변수명은 20자 이내의 한글, 영문, 숫자, ‘_’ 만 가능합니다.</li>
            <li>특수문자, 공란, 줄바꿈 그리고 {{description}} 변수명 사용 불가합니다.</li>
          </ul>
          <div class="table-box color-custom-table">
            <table>
              <colgroup>
                <col width="110px">
                <col width="70px">
                <col width="150px">
                <col width="140px">
                <col width="140px">
                <col width="140px">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" colspan="3">구분</th>
                  <th scope="col">고정부만으로 구성</th>
                  <th scope="col">변수부만으로 구성</th>
                  <th scope="col">고정부 + 변수부</th>
                </tr>
              </thead>
              <tbody class="pd-only-td">
                <tr>
                  <th rowspan="9" class="pd-th12">
                    이미지 템플릿<br>텍스트 템플릿
                  </th>
                  <th colspan="2" class="pd-th14">
                    메시지 본문
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                </tr>
                <tr>
                  <th colspan="2" class="pd-th14">
                    버튼명
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                </tr>
                <tr>
                  <th rowspan="7" class="pd-th13">
                    버튼액션
                  </th>
                  <th class="pd-th14">
                    URL 연결하기
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                  <td class="pd-th14 fs13">
                    URL(고정) + URL(변수)
                  </td>
                </tr>
                <tr>
                  <th class="pd-th14">
                    전화하기
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="pd-th14">
                    복사하기
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="pd-th14">
                    지도 보여주기(좌표/쿼리)
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="pd-th14">
                    현재 위치 공유
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="pd-th14">
                    캘린더 등록
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="pd-th14">
                    메시지 작성
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                </tr>
                <tr>
                  <th rowspan="4" colspan="2" class="c-align">
                    이미지 템플릿
                  </th>
                  <th class="pd-th14">
                    제목
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="pd-th14">
                    상세 제목
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                </tr>
                <tr>
                  <th class="pd-th14">
                    상세 내용
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                </tr>
                <tr>
                  <th class="pd-th14">
                    이미지 URL 연결
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                  <td class="fs13">
                    URL(고정) + URL(변수)
                  </td>
                </tr>
                <tr>
                  <th rowspan="2" colspan="2" class="c-align">
                    텍스트 템플릿<br>타이틀 자유형
                  </th>
                  <th class="pd-th14">
                    제목 (Left)
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                </tr>
                <tr>
                  <th class="pd-th14">
                    제목 (Right)
                  </th>
                  <td class="fs14">
                    ○
                  </td>
                  <td class="fs14">
                    ○<br>
                    <span class="fs12">(메시지 본문 내<br>변수 불러오기만 가능)</span>
                  </td>
                  <td class="fs16">
                    ×
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_4_3">4. 3. 정보성 템플릿 유형</h5>
            <p class="description">
              RBC에서는 다양한 모양의 템플릿 유형을 제공하고 있습니다.<br>
              메시지 목적에 맞게 템플릿 유형을 선택하여 사용해주세요.<br>
              정보 전달 목적으로만 이용가능 하며, <strong>광고 내용을 포함할 경우 패널티를 받을 수 있습니다.</strong><br>
              템플릿 승인 단계에서 메시지 내용 중 광고 내용이 포함되어 있다고 판단될 경우, 승인 반려 처리 됩니다.
            </p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해 주세요. (90자 초과시 전송 불가)</p>
            </div>
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_4_3_1">(New) 아이템 강조형</p>
              <p class="content"> 강조하고 싶은 문구와 로고 이미지를 넣어보세요.<br>
              추천 사용 예 : 승인 문자 / 프로세스 진행 단계 안내 등</p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_msg_type05.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_msg_type05_mo.png" alt="" class="only-mo">
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content"><span class="wd100">지원 발송 방식</span>:<span class="wd70"> ○  기본</span><span class="wd70">●  서술</span><span class="wd70">●  스타일</span></p>
              <p class="content"><span class="wd100">메시지 내용</span>:<span class="wd70"> ●  정보</span><span class="wd70">○  광고</span></p>
            </div>
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_4_3_2">타이틀 선택형</p>
              <p class="content"> 유형을 선택하면 로고와 타이틀이 자동으로 지정됩니다.<br>
              추천 사용 예 : 신뢰감 가는 인증된 정보성 메시지로 보이고 싶을 때</p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_msg_type06.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_msg_type06_mo.png" alt="" class="only-mo">
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content"><span class="wd100">지원 발송 방식</span>:<span class="wd70"> ●  기본</span><span class="wd70">●  서술</span><span class="wd70">●  스타일</span></p>
              <p class="content"><span class="wd100">메시지 내용</span>:<span class="wd70"> ●  정보</span><span class="wd70">○  광고</span></p>
            </div>
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_4_3_3">타이틀 자유형</p>
              <p class="content"> 타이틀을 직접 입력할 수 있으며 (8자), 타이틀 우측에 본문에서 사용한 변수를 강조할 수 있습니다.<br>
                추천 사용 예 : 인증 번호 문자 / 프로세스 진행 단계 안내 등</p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_msg_type07.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_msg_type07_mo.png" alt="" class="only-mo">
          </div>
          <div class="gray-box__wrap mt-b0">
            <div class="gray-box">
              <p class="content"><span class="wd100">지원 발송 방식</span>:<span class="wd70"> ●  기본</span><span class="wd70">●  서술</span><span class="wd70">●  스타일</span></p>
              <p class="content"><span class="wd100">메시지 내용</span>:<span class="wd70"> ●  정보</span><span class="wd70">○  광고</span></p>
            </div>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_4_4">4. 4. 이미지 템플릿 유형</h5>
            <p class="description">
              이미지 템플릿은 정보성과 광고성 메시지 발송이 가능한 ”RCS 이미지 템플릿” 요금제 상품입니다.<br>
              템플릿 승인 단계에서 메시지 내용 중 불법적인 내용이 포함되어 있다고 판단될 경우, 승인 반려 처리 됩니다.
            </p>
            <p class="description">
              <strong class="color-blue">불법적인 내용에 대한 예시</strong> : 음란 / 선정물, 마약, 불법 대출 (불법 금융 서비스), 도박, 폭력 / 혐오 / 공포 / 비속, 위법 / <br class="only-pc">
              부적절한 서비스 및 관계법령에 따라 인터넷 광고가 금지되거나 인터넷 판매, 유통 등이 불가능한 상품 등
            </p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content"><span class="wd100">지원 발송 방식</span>:<span class="wd70"> ○  기본</span><span class="wd70">●  서술</span><span class="wd70">○  스타일</span></p>
              <p class="content"><span class="wd100">메시지 내용</span>:<span class="wd70"> ●  정보</span><span class="wd70">●  광고</span></p>
            </div>
          </div>
          <div class="guide-img__wrap mt-b0">
            <img src="@/assets/images/guide/guide_msg_type08.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_msg_type08_mo.png" alt="" class="only-mo">
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_4_5">4. 5. LMS 템플릿 유형</h5>
            <p class="description">
              LMS 메시지에 브랜드 로고 등을 넣거나, 복잡한 레이아웃의 메시지를 만들 때 등록하여 발송할 수 있는 “RCS LMS 상품" 입니다.<br>
              템플릿 승인 단계에서 메시지 내용 중 불법적인 내용이 포함되어 있다고 판단될 경우, 승인 반려 처리 됩니다.
            </p>
            <p class="description">
              <strong class="color-blue">불법적인 내용에 대한 예시</strong> : 음란 / 선정물, 마약, 불법 대출 (불법 금융 서비스), 도박, 폭력 / 혐오 / 공포 / 비속, 위법 / <br class="only-pc">
              부적절한 서비스 및 관계법령에 따라 인터넷 광고가 금지되거나 인터넷 판매, 유통 등이 불가능한 상품 등
            </p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content only-pc"><span class="wd100">지원 발송 방식</span>:<span class="wd70"> ○  기본</span><span>●  서술 cardType : description</span><span class="wd70">○  스타일</span></p>
              <p class="content only-mo">
                <ul class="wd-mo">
                  <li>지원 발송 방식: <span class="wd100">○  기본</span></li>
                  <li>●  서술 cardType : description</li>
                  <li>○  스타일</li>
                </ul>
              </p>
              <p class="content"><span class="wd100">메시지 내용</span>:<span class="wd70"> ●  정보</span><span class="wd70 txt-start">●  광고</span></p>
            </div>
          </div>
          <div class="guide-img__wrap mt-b0">
            <img src="@/assets/images/guide/guide_msg_type09.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_msg_type09_mo.png" alt="" class="only-mo">
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
      <ModalView
        v-if="isModalViewed"
        @closeModal="isModalViewed = false"
      >
        <GuideSampleMsg
          v-if="isSamlpeMsg"
          @closeModal="isModalViewed = false"
          modalsize="Max1080"
          class="only-pc"
        >
        </GuideSampleMsg>
        <GuideSampleMsg
        v-if="isSamlpeMsg"
        @closeModal="isModalViewed = false"
        modalsize="Max656"
        class="only-mo"
        >
        </GuideSampleMsg>
      </ModalView>
    </div>
  </div>
</template>

<script>
import GuideLnb from '@/views/service/components/AccMenu.vue'
import GuideSide from '@/views/service/components/GuideSide.vue'
import GuideLnbSide from '@/views/service/components/GuideLnbSide.vue'
import guideLnbList from '@/views/service/components/guideLnb.js'
import ButtonCmp from '../../components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import GuideSampleMsg from '@/views/service/components/GuideSampleMsg.vue'

export default {
  components: {
    GuideLnb,
    GuideLnbSide,
    GuideSide,
    ButtonCmp,
    ModalView,
    GuideSampleMsg
  },
  data() {
    return {
      guideLnbList,
      openGuidNav: false,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768,
      isMobileSize: 768,
      OnlyPcNav: false,
      name: '{{이름}}',
      phone: '{{인증번호}}',
      variable: '{{변수}}',
      date: '{{date}}',
      description: '{{description}}',
      sign: '{{ }}',
      brandMenu: [
        {
          'label': '3. 1. 레이아웃',
          'to': '#guide_3_1',
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '조합 방식',
              'to': '#guide_3_1_1'
            },
            {
              'label': '레이아웃 발송',
              'to': '#guide_3_1_2'
            }
          ]
        },
        {
          'label': '3. 2. 컴포넌트',
          'to': '#guide_3_2',
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '컴포넌트 란?',
              'to': '#guide_3_2_1'
            },
            {
              'label': '컴포넌트 종류',
              'to': '#guide_3_2_2'
            }
          ]
        },
        {
          'label': '4. 1. 템플릿 상품 구분',
          'to': '#guide_4_1',
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '승인 심사 기준',
              'to': '#guide_4_1_1'
            }
          ]
        },
        {
          'label': '4. 2. 템플릿 발송',
          'to': '#guide_4_2',
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '발송 방식',
              'to': '#guide_4_2_1'
            },
            {
              'label': '템플릿 작성 가이드',
              'to': '#guide_4_2_2'
            },
            {
              'label': '변수 사용하기',
              'to': '#guide_4_2_3'
            }
          ]
        },
        {
          'label': '4. 3. 정보성 템플릿 유형',
          'to': '#guide_4_3',
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '(NEW) 아이템 강조형',
              'to': '#guide_4_3_1'
            },
            {
              'label': '타이틀 선택형',
              'to': '#guide_4_3_2'
            },
            {
              'label': '타이틀 자유형',
              'to': '#guide_4_3_3'
            }
          ]
        },
        {
          'label': '4. 4. 이미지 템플릿 유형',
          'to': '#guide_4_4'
        },
        {
          'label': '4. 5. LMS 템플릿 유형',
          'to': '#guide_4_5'
        }
      ],
      isModalViewed: false,
      isSamlpeMsg: false
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
    guideSampleMsg () {
      this.isModalViewed = true
      this.isSamlpeMsg = true
    },
    closeModal () {
      this.isModalViewed = false
    },
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
