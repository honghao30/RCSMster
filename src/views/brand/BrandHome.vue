<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 홈" />
        <div class="top-progress-area">
          <span class="flag-progress">승인대기</span>
          <span class="flag-progress ing">처리중</span>
          <span class="flag-progress reject">반려</span>
          <span class="flag-progress done">승인완료</span>
          <p class="date">최종변경 : 2023. 03. 30</p>
          <p class="reject-text">반려사유 : 위법/부적절성 메시지 </p>
        </div>
        <div class="top-notice--gray">
          <p>-신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 이메일로 알려드립니다.</p>
          <p>-승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
        </div>
        <PageTitleH3 titleh3="기본 정보"/>
        <div class="table__wrap">
          <table class="table table-bodyonly form-table">
            <colgroup>
              <col width="230px">
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row"><span class="form-item__label">브랜드 ID</span></th>
                <td>
                  <span class="text">BR.bwpczvZDy9</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">브랜드 key</span></th>
                <td>
                  <span class="text">BK.POfd50S48pot0fu</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">브랜드명</span></th>
                <td>
                  <span class="text">SYSTEM STUDIOS</span>
                  <span class="flag-approval">승인필요</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">브랜드 소개</span></th>
                <td>
                  <span class="text">모던함과 세련된 터치가 돋보이는 SYSTEM STUDIO</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <span class="form-item__label">백그라운드 이미지</span>
                </th>
                <td>
                  <span class="text">SYSTEM STUDIOS_bg.png</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <span class="form-item__label">프로필 이미지</span>
                </th>
                <td>
                  <span class="text">기본이미지<span class="division"></span>금융
                  </span>
                  <span class="flag-approval">승인필요</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">카테고리</span></th>
                <td>
                  <span class="text">쇼핑<span class="division"></span>
                    의류<span class="division"></span>시스템 스튜디오
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">전화번호</span></th>
                <td>
                  <span class="text">
                    010-5151-5151
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">이메일</span></th>
                <td>
                  <span class="text">
                    studios@daum.com
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">주소</span></th>
                <td>
                  <span class="text">
                    06128 서울특별시 강남구 봉은사로 18길 58(역삼동,건영빌딩) 더피프티원
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PageTitleH3 titleh3="퀵 버튼"/>
        <div class="table__wrap">
          <table class="table table-bodyonly form-table">
            <colgroup>
              <col width="230px">
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row"><span class="form-item__label">Chat</span></th>
                <td>
                  <span class="text"></span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">Call</span></th>
                <td>
                  <span class="text">010-5151-5151</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">More info</span></th>
                <td>
                  <span class="text">http://www.portal.com</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">Web</span></th>
                <td>
                  <span class="text">http://www.brandportal.com</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PageTitleH3 titleh3="브랜드 홈 탭"/>
        <div class="table__wrap">
          <table class="table table-bodyonly form-table">
            <colgroup>
              <col width="230px">
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row"><span class="form-item__label">우선 노출 탭</span></th>
                <td>
                  <span class="text">소식 탭 우선</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">예약하기</span></th>
                <td>
                  <span class="text">http:// www.portal.com</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">앱 다운로드</span></th>
                <td>
                  <span class="text">market://details?id=com.systemstudios.mail</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">상담채팅 시작하기</span></th>
                <td>
                  <span class="text">http://www.chatportal/start</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="button__wrap">
          <ButtonCmp
            type="btn-line"
          >삭제</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
          >승인 요청 취소</ButtonCmp>
          <ButtonCmp
            type="btn-blue"
          >수정</ButtonCmp>
        </div>
      </div>
      <div class="brand-aside sticky">
        <BrandEmulator :brandInfoData="brandInfoData" curTab="info"/>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    BrandEmulator
  },
  data() {
    return {
      brandInfoData: {
        name: '네스프레소',
        desc: '최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업',
        bgImgFileUrl: 'dummy/brand_image.png',
        profileImgFileUrl: 'dummy/brand_logo.png',
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111',
        quickButton: ['call']
      }
    }
  }
}
</script>
