<template>
  <div class="guide__inner">
    <div class="guide-lnb__wrap">
      <GuideLnb :menuData="guideLnbList" />
    </div>
    <div class="guide__wrap">
      <div class="first__wrap">
        <h1 class="first-title">RCS 기업 메시지 종류</h1>
        <p class="content">비즈니스 목적으로 보내는 모든 메시지를 RCS 기업 메시지로 바꿔보세요.</p>
      </div>
      <div class="guide__item" id="section01">
        <div class="second-box">
          <h2 class="second-title"><span>1.</span>RCS 기업 메시지 구분</h2>
          <p>
            RCS 기업 메시지는 다양한 레이아웃을 포맷 형태로 제공합니다.<br>
            각 상품별로 지원하는 RCS 기업 메시지 포맷이 다르므로 사전에 확인해주시기 바랍니다.
          </p>
        </div>
        <div class="table-box">
            <table>
              <caption>RCS 기업 메시지 구분</caption>
              <colgroup>
                <col width="13%">
                <col width="13%">
                <col width="">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
                <col width="8%">
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
                  <th>
                     <ul class="guide-list-dot">
                        <li>기존 문자처럼 즉시 발송이
                          가능한 RCS 기업 메시지</li>
                        <li>모든 브랜드 공통 사용 가능</li>
                     </ul>
                  </th>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                </tr>
                <tr>
                  <th rowspan="2">브랜드 포맷</th>
                  <th>레이아웃<br><span class="small-text-blue">(coming soon)</span></th>
                  <th>
                    <ul class="guide-list-dot">
                        <li>원하는 레이아웃으로 조합할수 있는 RCS 기업 메시지</li>
                     </ul>
                  </th>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                </tr>
                <tr>
                  <th>템플릿</th>
                  <th>
                    <ul class="guide-list-dot">
                        <li>메시지 본문 내용을 사전에 등록하는 RCS 기업 메시지</li>
                        <li>사전 등록  필수</li>
                        <li>승인 필수<br>(발송 방식 free 제외)</li>
                     </ul>
                  </th>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <img src="@/assets/images/guide/ico_check.png" alt="">
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="guide-text">대행사별로 지원하는 RCS 기업 메시지 종류가 상이할 수 있습니다.</p>
        </div>
        <div class="table-box">
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
                <th rowspan="2">RCS SMS</th>
                <th rowspan="2">RCS LMS</th>
                <th rowspan="2">RCS MMS</th>
                <th colspan="3">RCS 정보성 템플릿</th>
                <th rowspan="2">RCS<br>이미지 템플릿</th>
                <th rowspan="2">RCS<br>LMS 템플릿</th>
              </tr>
              <tr>
                <th>
                  서술<br>(description)
                </th>
                <th>
                  스타일<br>(cell)
                </th>
                <th>
                  기본<br>(free)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>사전등록</th>
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
                <th>운영자 승인</th>
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
                <th>메시지 내용</th>
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
      <div class="guide__item">
        <div class="second-box">
          <h2 class="second-title">2. 공통 포맷</h2>
          <p class="content">기존 문자처럼 필수 입력항목만 넣어 즉시 발송이 가능한 RCS 기업 메시지입니다.</p>
        </div>
        <div class="guide__box--blue">
          상품 코드별, 포맷 ID별로 샘플 메시지를 확인하고 싶다면?
          <ButtonCmp
            type="btn-blue"
            size="medium"
          >
            공통 포맷 샘플 보기
          </ButtonCmp>
        </div>
      </div>
      <div class="guide__item">
        <div class="second-box">
          <h2 class="second-title"><span>3.</span>레이아웃</h2>
          <p>
            브랜드별로 등록하여 사용할 수 있는 RCS 기업 메시지입니다.
          </p>
        </div>
        <div class="third-box__wrap">
            <div class="third-box">
                <h3 class="third-title"><span>3.1</span> 대화방 등록 가이드</h3>
                <p class="content">
                  RBC에서 제공하는 표준 메시지 컴포넌트를 이용하여 업무에 필요한 메시지 포맷을 만들어 사용할 수 있습니다.<br>
                  사용 전, 함께하는 대행사가 레이아웃을 지원하는지 확인하세요.
                </p>
            </div>
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
              <img src="@/assets/images/guide/guide_msg_type01.png" alt="">
            </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <p class="title">조합 방식</p>
            <p class="content">
              각 상품별로 조합 가능한 최대 컴포넌트 수를 확인해주세요.<br>
              조합된 브랜드 포맷은 별도의 승인절차 없이 <span class="red">등록 시점으로부터 D+1일 0시부터 (운영 정책 결정 필요)</span> 이용 가능합니다.
            </p>
          </div>
        </div>
        <div class="table-box">
            <table>
              <caption>RCS 기업 메시지 구분</caption>
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">RCS SMS</th>
                  <th scope="col">RCS LMS</th>
                  <th scope="col">RCS MMS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    조합 가능 컴포넌트 수
                  </th>
                  <td>
                    1~2
                  </td>
                  <td>
                    1~6
                  </td>
                  <td>
                    1~6
                  </td>
                </tr>
                <tr>
                  <th>버튼 컴포넌트 수</th>
                  <td>
                    1
                  </td>
                  <td>
                    3
                  </td>
                  <td>
                    2
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
                <p class="content">- 같은 컴포넌트 그룹에서는 1개의 컴포넌트만 사용할 수 있습니다.</p>
                <p class="content">- 메인타이틀은 최 상단에만 위치할 수 있습니다.</p>
                <p class="content">- 버튼 컴포넌트는 최 상단에 위치할 수 없습니다.</p>
            </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <p class="title">레이아웃 발송</p>
            <p class="content">
              레이아웃을 RBC에서 먼저 등록 후, 메시지를 발송하셔야 합니다.<br>
              템플릿과 달리, 레이아웃은 RBC의 심사 승인 없이 바로 등록하여 사용 가능합니다.
            </p>
          </div>
        </div>
        <div class="gray-box__wrap">
            <img src="@/assets/images/guide/guide_msg_type02.png" alt="">
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <p class="content">
              공통포맷과 동일 발송하는 방식은 동일합니다.<br>
              각 컴포넌트별로 메시지 발송 시, 값이 없을 경우 발송 실패되는 요소와 해당 컴포넌트 영역이 보여지지않는 요소가 다르니, 유의해
              주시기 바랍니다.<br>
              각 컴포넌트별 필수 요소를 확인해주시기 바랍니다.
            </p>
          </div>
        </div>

      </div>
      <div class="guide__item">
        <div class="third-box__wrap">
            <div class="third-box">
                <h3 class="third-title"><span>3.2</span> 컴포넌트</h3>
                <p class="content">
                  다양한 기업의 요구사항에 맞추면서도 쉽게 적용할 수 있도록 RCS 기업 메시지를 새로이 정의하였습니다.
                </p>
            </div>
        </div>
      </div>
      <div class="third-box__wrap">
        <div class="third-box">
          <p class="title">컴포넌트 란?</p>
          <p class="content">
            RCS 기업 메시지의 구성을 정의하는 단위입니다.
          </p>
        </div>
      </div>
      <div class="third-box__wrap">
        <div class="third-box">
          <p class="title">컴포넌트 종류</p>
        </div>
      </div>
      <div class="gray-box__wrap">
          <img src="@/assets/images/guide/guide_msg_type03.png" alt="">
      </div>
      <div class="guide__box--blue">
        컴포넌트 상세 규격 가이드가 궁금하다면?
        <ButtonCmp
          type="btn-blue"
          size="medium"
        >
          컴포넌트 규격 가이드 다운로드
        </ButtonCmp>
      </div>
      <div class="guide__item">
        <div class="second-box">
          <h2 class="second-title"><span>4.</span>템플릿</h2>
          <p>
            템플릿은 브랜드별로  메시지 내용 / 스타일을 미리 등록하여 사용하는 RCS 기업 메시지입니다.
          </p>
        </div>
        <div class="third-box__wrap">
            <div class="third-box">
                <h3 class="third-title"><span>4.1</span> 템플릿 상품 구분</h3>
                <p class="content">
                  템플릿은 상품 코드 기준으로 정보성 템플릿, 이미지 템플릿, LMS 템플릿으로 구분됩니다.<br>
                상품 코드는 과금 기준이며, 계약한 대행사의 단가에 따라 다를 수 있습니다.
                </p>
            </div>
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
              <img src="@/assets/images/guide/guide_msg_type04.png" alt="">
            </div>
        </div>

        <div class="table-box">
            <table>
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">정보성 템플릿</th>
                  <th scope="col">이미지 템플릿</th>
                  <th scope="col">LMS 템플릿</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    상품코드
                  </th>
                  <td>
                    tmplt
                  </td>
                  <td>
                    1itmpl
                  </td>
                  <td>
                    lms
                  </td>
                </tr>
                <tr>
                  <th>글자수 / 용량제한</th>
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
                  <th>메시지 내용</th>
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
                  <th>발송 방식</th>
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
        <div class="third-box__wrap">
          <div class="third-box">
            <p class="title">승인 심사 기준</p>
            <p class="content">
              템플릿의 승인 심사는 템플릿의 긴급성 및 승인 요청 건수, 상품 기준에 따라 상이합니다.
            </p>
          </div>
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">
                <strong>정보성 템플릿 :</strong>  승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.
              </p>
              <p class="content">
                  <strong>이미지 템플릿 / LMS 템플릿 :</strong> 12시 전 신청 건은 당일 오후, 12시 이후 신청 건에 대해서는 익일 오전 중 심사 예정입니다. (주말 신청 건에 대해서는 차주 월요일 중 심사) 내부 사정상 지체될 수 있습니다.
              </p>
            </div>
        </div>
        <div class="third-box__wrap">
            <div class="third-box">
                <h3 class="third-title"><span>4.2</span> 템플릿 발송</h3>
                <p class="content">
                  다양한 기업의 요구사항에 맞추면서도 쉽게 적용할 수 있도록 RCS 기업 메시지를 새로이 정의하였습니다.
                </p>
            </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <p class="title">발송 방식</p>
            <p class="content">
              템플릿은 세 가지 타입의 발송 방식을 제공하고 있습니다.<br>
템플릿 유형에 따라 지원되는 발송 방식이 상이하므로, 운영 대행사에서 지원하는 방식과 발송 환경에 따라서 발송 방식을
선택하세요.
            </p>
          </div>
        </div>
        <div class="table-box">
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
              <tbody>
                <tr>
                  <th rowspan="2">
                    기본 (free)
                  </th>
                  <td rowspan="2" class="text-l">
                    사전 등록 없이 문자 메시지 처럼 필요한 항목만 입력하여 발송합니다.<br>
                    템플릿 유형별로 브랜드당 1개씩만 허용됩니다.<br>
                    ‣ 최대 글자수 / 용량 준수
                  </td>
                  <td class="text-l">
                    <div class="sub-title">템플릿 등록</div>
                  </td>
                </tr>
                <tr>
                  <td class="text-l">
                    <div class="sub-title">템플릿 등록</div>
                    <div class="sub-description">“{{이름}}”님, 인증번호는 “{{인증번호}}”입니다.</div>
                  </td>
                </tr>
                <tr>
                  <th rowspan="2">
                    서술 (description)
                  </th>
                  <td rowspan="2" class="text-l">
                    템플릿으로 등록한 메시지 내용을 모두 입력하여 발송합니다.<br>
                    본문 내용을 변수 만으로 구성할 수 없습니다.<br>(변수 이외 문자 필수 입력)<br>
                    ‣ 최대 글자수 / 용량 준수<br>
                    ‣ 패턴 체크
                  </td>
                  <td class="text-l">
                    <div class="sub-title">템플릿 등록</div>
                    <div class="sub-description">“{{이름}}”님, 인증번호는 “{{인증번호}}”입니다.</div>
                  </td>
                </tr>
                <tr>
                  <td class="text-l">
                    <div class="sub-title">템플릿 등록</div>
                    <div class="sub-description">“description : “홍길동, 인증번호는 123456입니다.”</div>
                  </td>
                </tr>
                <tr>
                  <th rowspan="2">
                    스타일 (cell)
                  </th>
                  <td rowspan="2" class="text-l">
                    템플릿 등록시 메시지 내용에 {{변수}}로 정의한 항목만 발송합니다.<br>
                    복잡한 메시지 형태에 적합합니다.<br>
                    테이블 의 볼드, 정렬, 글자색을 지정하실 수 있습니다.<br>
                    ‣ 최대 글자수 / 용량 준수<br>
                          ‣ 지정한 변수 입력<br>
                  </td>
                  <td class="text-l">
                    <div class="sub-title">템플릿 등록</div>
                    <div class="sub-description">“{{이름}}”님, 인증번호는 “{{인증번호}}”입니다.</div>
                  </td>
                </tr>
                <tr>
                  <td class="text-l">
                    <div class="sub-title">메시지 발송</div>
                    <div class="sub-description">
                      “이름” : “홍길동”<br>
                      “인증번호” : “123456”
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 기본(free) 템플릿 : 사전 등록이나 승인 없이 정보성 메시지를 발송할 수 있습니다.</p>
              <p class="content">- 서술(description), 스타일(cell) 템플릿 : 메시지 내용을 사전 등록하여 운영자 승인 완료 후 발송 가능합니다.</p>
            </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <p class="title">템플릿 작성 가이드</p>
          </div>
        </div>
        <ul class="guide-list-dot">
          <li>템플릿 메시지는 승인 이후 사용 할 수 있습니다.</li>
          <li>고정부 메시지와 변수명 포함하여 각 영역 별 최대 입력 글자 수 초과 시 전송 불가합니다.</li>
          <li>텍스트 내용이 잘 드러나게 작성해야 하며, 내용 확인이 어려울 경우 반려 처리될 수 있습니다.</li>
          <li>템플릿 등록 완료 후 내용 변경 시 추가 승인 절차가 필요합니다.</li>
        </ul>
        <div class="third-box__wrap">
          <div class="third-box">
            <p class="title">변수 사용하기</p>
            <p class="content">서술(description) 과 스타일(cell) 방식으로 템플릿을 이용하는 경우, 변수 활용을 숙지하셔야 합니다.</p>
          </div>
        </div>
        <ul class="guide-list-dot">
          <li>각 영역 별로 변수명은 최대 20자 이내로 작성해 주세요.</li>
          <li>변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요.<br>예) {{이름}}, {{date}}</li>
            <li>변수명은 20자 이내의 한글, 영문, 숫자, ‘_’ 만 가능합니다.</li>
            <li>특수문자, 공란, 줄바꿈 그리고 {{description}} 변수명 사용 불가합니다.</li>
        </ul>
        <div class="table-box">
            <table>
              <colgroup>
                <col width="17%">
                <col width="15%">
                <col width="17%">
                <col width="17%">
                <col width="17%">
                <col width="17%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" colspan="3">구분</th>
                  <th scope="col">고정부만으로 구성</th>
                  <th scope="col">변수부만으로 구성</th>
                  <th scope="col">고정부 + 변수부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th rowspan="9">
                    이미지 템플릿<br>텍스트 템플릿
                  </th>
                  <td colspan="2" class="text-l">
                    메시지 본문
                  </td>
                  <td>
                    ○
                  </td>
                  <td>
                    ×
                  </td>
                  <td>
                    ○
                  </td>
                </tr>
                <tr>
                  <th colspan="2">
                    버튼명
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ×
                  </td>
                  <td>
                    ×
                  </td>
                </tr>
                <tr>
                  <th rowspan="7">
                    버튼액션
                  </th>
                  <th class="text-l">
                    URL 연결하기
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ×
                  </td>
                  <td>
                    URL(고정) + URL(변수)
                  </td>
                </tr>
                <tr>
                  <th class="text-l">
                    전화하기
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="text-l">
                    복사하기
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="text-l">
                    지도 보여주기(좌표/쿼리)
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="text-l">
                    현재 위치 공유
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="text-l">
                    캘린더 등록
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                </tr>
                <tr>
                  <th class="text-l">
                    메시지 작성
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                </tr>
                <tr>
                  <th rowspan="4" colspan="2">
                    이미지 템플릿
                  </th>
                  <td class="text-l">
                    제목
                  </td>
                  <td>
                    ○
                  </td>
                  <td>
                    ×
                  </td>
                  <td>
                    ○
                  </td>
                </tr>
                <tr>
                  <th>
                    상세 제목
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ×
                  </td>
                  <td>
                    ×
                  </td>
                </tr>
                <tr>
                  <th>
                    상세 내용
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ○
                  </td>
                  <td>
                    ×
                  </td>
                </tr>
                <tr>
                  <th>
                    이미지 URL 연결
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ×
                  </td>
                  <td>
                    URL(고정) + URL(변수)
                  </td>
                </tr>
                <tr>
                  <th rowspan="2" colspan="2">
                    텍스트 템플릿<br>타이틀 자유형
                  </th>
                  <td class="text-l">
                    제목 (Left)
                  </td>
                  <td>
                    ○
                  </td>
                  <td>
                    ×
                  </td>
                  <td>
                    ×
                  </td>
                </tr>
                <tr>
                  <th>
                    제목 (Right)
                  </th>
                  <td>
                    ○
                  </td>
                  <td>
                    ○<br>(매시지 본문 내<br>변수 불러오기만 가능)
                  </td>
                  <td>
                    ×
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div class="guide__item">
        <div class="third-box__wrap">
            <div class="third-box">
                <h3 class="third-title"><span>4.3</span> 정보성 템플릿 유형</h3>
                <p class="content">
                  RBC에서는 다양한 모양의 템플릿 유형을 제공하고 있습니다.<br>
메시지 목적에 맞게 템플릿 유형을 선택하여 사용해주세요.<br>
정보 전달 목적으로만 이용가능 하며, <strong>광고 내용을 포함할 경우 패널티를 받을 수 있습니다.</strong><br>
템플릿 승인 단계에서 메시지 내용 중 광고 내용이 포함되어 있다고 판단될 경우, 승인 반려 처리 됩니다.
                </p>
            </div>
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해 주세요. (90자 초과시 전송 불가)</p>
            </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <p class="title">(New) 아이템 강조형</p>
            <p class="content">
              강조하고 싶은 문구와 로고 이미지를 넣어보세요.<br>
추천 사용 예 : 승인 문자 / 프로세스 진행 단계 안내 등
            </p>
          </div>
        </div>
        <div class="gray-box__wrap">
            <img src="@/assets/images/guide/guide_msg_type05.png" alt="">
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 지원 발송 방식 : ○ 기본 ● 서술 ● 스타일</p>
              <p class="content">- 메시지 내용 : ● 정보 ○ 광고</p>
            </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <p class="title">타이틀 선택형</p>
            <p class="content">
              유형을 선택하면 로고와 타이틀이 자동으로 지정됩니다. <br>
추천 사용 예 : 신뢰감 가는 인증된 정보성 메시지로 보이고 싶을 때
            </p>
          </div>
        </div>
        <div class="gray-box__wrap">
            <img src="@/assets/images/guide/guide_msg_type06.png" alt="">
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 지원 발송 방식 : ● 기본 ● 서술 ● 스타일</p>
              <p class="content">- 메시지 내용 : ● 정보 ○ 광고</p>
            </div>
        </div>
        <div class="third-box__wrap">
          <div class="third-box">
            <p class="title">타이틀 자유형</p>
            <p class="content">
              타이틀을 직접 입력할 수 있으며 (8자), 타이틀 우측에 본문에서 사용한 변수를 강조할 수 있습니다.<br>
추천 사용 예 : 인증 번호 문자 / 프로세스 진행 단계 안내 등
            </p>
          </div>
        </div>
        <div class="gray-box__wrap">
            <img src="@/assets/images/guide/guide_msg_type07.png" alt="">
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 지원 발송 방식 : ● 기본 ● 서술 ● 스타일</p>
              <p class="content">- 메시지 내용 : ● 정보 ○ 광고</p>
            </div>
        </div>
        <div class="third-box__wrap" id="#guide_12">
            <div class="third-box">
                <h3 class="third-title"><span>4.4</span> 이미지 템플릿 유형</h3>
                <p class="content">
                  이미지 템플릿은 정보성과 광고성 메시지 발송이 가능한 ”RCS 이미지 템플릿” 요금제 상품입니다.<br>
템플릿 승인 단계에서 메시지 내용 중 불법적인 내용이 포함되어 있다고 판단될 경우, 승인 반려 처리 됩니다.<br>
<strong>불법적인 내용에 대한 예시 :</strong> 음란 / 선정물, 마약, 불법 대출 (불법 금융 서비스), 도박, 폭력 / 혐오 / 공포 / 비속, 위법 / 부적절한 서비스 및 관계법령에 따라 인터넷 광고가 금지되거나 인터넷 판매, 유통 등이 불가능한 상품 등
                </p>
            </div>
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 지원 발송 방식 : ○  기본  ●  서술 ○  스타일</p>
              <p class="content">- 메시지 내용 : ●  정보 ●  광고</p>
            </div>
        </div>
        <div class="gray-box__wrap">
            <img src="@/assets/images/guide/guide_msg_type08.png" alt="">
        </div>
        <div class="third-box__wrap" id="#guide_13">
            <div class="third-box">
                <h3 class="third-title"><span>4.5</span> LMS 템플릿 유형</h3>
                <p class="content">
                  LMS 메시지에 브랜드 로고 등을 넣거나, 복잡한 레이아웃의 메시지를 만들 때 등록하여 발송할 수 있는 “RCS LMS 상품" 입니다.<br>
템플릿 승인 단계에서 메시지 내용 중 불법적인 내용이 포함되어 있다고 판단될 경우, 승인 반려 처리 됩니다.<br>
<strong>불법적인 내용에 대한 예시 :</strong> 음란 / 선정물, 마약, 불법 대출 (불법 금융 서비스), 도박, 폭력 / 혐오 / 공포 / 비속, 위법 / 부적절한 서비스 및 관계법령에 따라 인터넷 광고가 금지되거나 인터넷 판매, 유통 등이 불가능한 상품 등
                </p>
            </div>
        </div>
        <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">- 지원 발송 방식 : ○  기본  ●  서술 cardType : description   ○  스타일</p>
              <p class="content">- 메시지 내용 : ●  정보 ●  광고</p>
            </div>
        </div>
        <div class="gray-box__wrap">
            <img src="@/assets/images/guide/guide_msg_type09.png" alt="">
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
import ButtonCmp from '../../components/common/ButtonCmp.vue'

export default {
  components: {
    GuideLnb,
    GuideSide,
    ButtonCmp
  },
  data() {
    return {
      guideLnbList,
      brandMenu: [
        {
          'label': '3.1 레이아웃',
          'to': '',
          'children': [
            {
              'label': '조합 방식',
              'to': '#guide_1'
            },
            {
              'label': '레이아웃 발송',
              'to': '#guide_2'
            }
          ]
        },
        {
          'label': '3.2 컴포넌트',
          'to': '',
          'children': [
            {
              'label': '컴포넌트 란?',
              'to': '#guide_3'
            },
            {
              'label': '컴포넌트 종류',
              'to': '#guide_4'
            }
          ]
        },
        {
          'label': '4.1 템플릿 상품 구분',
          'to': '',
          'children': [
            {
              'label': '승인 심사 기준',
              'to': '#guide_5'
            }
          ]
        },
        {
          'label': '4.2 템플릿 발송',
          'to': '',
          'children': [
            {
              'label': '발송 방식',
              'to': '#guide_6'
            },
            {
              'label': '템플릿 작성 가이드',
              'to': '#guide_7'
            },
            {
              'label': '변수 사용하기',
              'to': '#guide_8'
            }
          ]
        },
        {
          'label': '4.3 정보성 템플릿 유형',
          'to': '',
          'children': [
            {
              'label': '(NEW) 아이템 강조형',
              'to': '#guide_9'
            },
            {
              'label': '타이틀 선택형',
              'to': '#guide_10'
            },
            {
              'label': '타이틀 자유형',
              'to': '#guide_11'
            }
          ]
        },
        {
          'label': '이미지 템플릿 유형',
          'to': '#guide_12'
        },
        {
          'label': 'LMS 템플릿 유형',
          'to': '#guide_13'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
