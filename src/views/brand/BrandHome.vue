<template>
  <div class="brand__wrap brand_create">
    <div class="brand__inner">
      <BrandLnb />
      <!-- 1차 디자인 수정 -->
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 홈" progress="승인완료" />
        <PageTitleH3 titleh3="기본 정보"/>
        <div class="brand-home__innerbox">
          <div class="brand-info__view">
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="196px">
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
                    <th scope="row"><span class="form-item__label">브랜드 명</span></th> <!-- 기획서 v1.0 수정: 띄워쓰기 변경 -->
                    <td>
                      <span class="text">SYSTEM STUDIOS</span>
                      <!-- <span class="flag-approval">승인필요</span> 기획서 v1.0 수정: 삭제 -->
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
                      <!-- <span class="flag-approval">승인필요</span> 기획서 v1.0 수정: 삭제 -->
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
                    <th scope="row"><span class="form-item__label">브랜드 컬러</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row colunl-type">
                          <div class="input-item">
                              <span class="colorbox" :style="{ background: brandInfoData.brandColor }"></span>
                              <span class="input">
                                #0C22E1
                              </span>
                            </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <PageTitleH3 titleh3="퀵 버튼"/>
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="196px">
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row" colspan="2"><span class="form-item__label">대화방</span></th>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">전화번호</span></th> <!-- 기획서 v1.0 수정: 텍스트 변경 -->
                    <td>
                      <span class="text">010-5151-5151</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">정보</span></th>
                    <td>
                      <span class="text">http://www.portal.com</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">웹사이트</span></th>  <!-- 기획서 v1.0 수정: 텍스트 변경 -->
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
                  <col width="196px">
                  <col width="100px" />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">우선 노출 탭</span></th>
                    <td colspan="2">
                      <span class="text">정보 탭 우선</span>
                    </td>
                  </tr>
                  <!-- <tr>
                    <th scope="row"><span class="form-item__label">알림판</span></th>
                    <td colspan="2">
                      <span class="text">미사용</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" rowspan="2"><span class="form-item__label">소식</span></th>
                    <th scope="row"><span class="form-item__label">전화</span></th>
                    <td>
                      <span class="text">010-5151-5151</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">웹</span></th>
                    <td>
                      <span class="text">http://www.chatportal/start</span>
                    </td>
                  </tr> 기획서 v1.0 수정: 알림판, 소식 영역 삭제 -->
                  <tr>
                    <th scope="row" rowspan="4"><span class="form-item__label">노출 정보</span></th>
                    <th scope="row"><span class="form-item__label sub">전화번호</span></th>
                    <td>
                      <span class="text">010-5151-5151</span>
                    </td>
                  </tr> <!-- 기획서 v1.0 수정: 전화번호 항목 추가 -->
                  <tr>
                    <th scope="row"><span class="form-item__label sub">웹사이트</span></th> <!--기획서 v1.0 수정: inner th 에다가 sub 클래스 추가 -->
                    <td>
                      <span class="text">https://system</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label sub">이메일</span></th>
                    <td>
                      <span class="text">studio@naver.com</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label sub">주소</span></th>
                    <td>
                      <span class="text">016128<br>서울특별시 강남구 봉은사로 18길 58(역삼동,건영빌딩) 더피프티원</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="brand-aside sticky">
            <BrandEmulator :brandInfoData="brandInfoData" curTab="info"/>
          </div>
          <!-- // 에뮬 -->
        </div>
        <div class="top-notice--gray">
            <p>- 신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 이메일로 알려드립니다.</p>
            <p>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
            type="btn-line"
          >삭제</ButtonCmp>
          <!-- <ButtonCmp
            type="btn-blue-line"
          >승인 요청 취소</ButtonCmp> --> <!-- 기획서 v1.0 수정: 승인요청 취소 버튼 삭제 -->
          <ButtonCmp
            type="btn-blue"
          >수정</ButtonCmp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import BrandLnb from '@/views/brand/components/BrandLnb.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    BrandEmulator,
    BrandLnb
  },
  data() {
    return {
      brandInfoData: {
        name: '네스프레소',
        desc: '최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업',
        bgImgFileUrl: 'https://file.rcsbizcenter.com/brand/common/LT-common-yeHC_1.png',
        profileImgFileUrl: 'https://file.rcsbizcenter.com/brand/common/LT-common-yeHC_1.png',
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111',
        address: '016128 서울특별시 강남구 봉은사로 18길 58(역삼동,건영빌딩) 더피프티원',
        brandColor: '#0C22E1',
        quickButton: ['call', 'web']
      }
    }
  }
}
</script>
