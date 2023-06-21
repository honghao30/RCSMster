<!-- 0620: 추가 된 페이지 대행사_비지니스 정보 관리 -->
<template>
  <div class="join">
    <PageTitle pagetitle="비지니스 정보 관리" />
    <div class="top-progress-area">
      <!-- 승인대기 -->
      <span class="flag-progress">승인대기</span>
      <!-- 승인완료 -->
      <span class="flag-progress done">승인완료</span>
      <!-- 반려 -->
      <span class="flag-progress reject">반려</span>
    </div>
    <PageTitleH3 titleh3="비지니스 정보"/>
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="230px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">사업자등록번호</span></th>
              <td>
                  <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="text">{{ form.certificate }}</span>
                        </div>
                      </div>
                  </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">사업자등록증</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ filesName }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">법인명(단체명)</span></th>
              <td>
                <span class="text">{{ form.companyname }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">업태</span></th>
              <td>
                <span class="text">{{ form.biztype }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">종목</span></th>
              <td>
                <span class="text">{{ form.bizevent }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">기업주소</span></th>
              <td>
                <span class="text">{{ form.postcode }} {{ form.addr1 }} {{ form.addr2 }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <PageTitleH3 titleh3="서비스정보 입력"/>
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="230px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">수신서버 URL</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ form.url }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">제공 서비스</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ form.service }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">중계사</span></th>
              <td>
                <div class="form-item__content agency">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ form.agency }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">특수부가통신<br>사업자등록증</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ form.certificateFile2 }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">대행사 서비스 범위</span></th>
              <td>
                <div class="form-item__content service-range">
                  <div class="form-item-row">
                    <span class="form-item-row__title">제공서비스</span>
                      <span class="text">{{ form.agencyService1 }}</span>
                  </div>
                  <div class="form-item-row">
                    <span class="form-item-row__title">계약가능 서비스</span>
                      <span class="text">{{ form.agencyService2 }}</span>
                  </div>
                  <div class="form-item-row">
                    <span class="form-item-row__title">제공 상품(템플릿)</span>
                      <span class="text">{{ form.agencyService3 }}</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">대행사 로고</span></th>
              <td>
                <div class="form-item__content agency">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ form.agencyLogoFile }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <div class="top-notice--gray gray__bottom">
      <!-- 승인대기 일 때 -->
      <p>- 승인대기 : 운영자 심사 대기중입니다.</p>
      <!-- 승인완료 일 때 -->
      <p>- 승인완료 : 승인이 완료 되었습니다.</p>
      <!-- 반려 일 때 -->
      <p class="error">- 반려 : 사업자등록증의 퀄리티가 안 좋아서 확인할 수 없습니다. 다시 올려주세요.</p>
      <p>- 기업 정보는 운영자 심사 후 변경이 완료됩니다.</p>
      <p>- 운영자 심사 대기 상태에서는 정보 수정이 불가합니다.</p>
    </div>
    <div class="button__wrap space-between">
      <ButtonCmp
        type="btn-line"
      >취소</ButtonCmp>
      <div class="button__wrap button__left">
        <ButtonCmp
          type="btn btn-line"
          @click="myInfo"
        >개인정보 관리</ButtonCmp>
        <!-- 승인대기 일 때 -->
        <ButtonCmp
          type="btn-blue"
          :disabled="!isDisabled"
          @click="onSubmit"
        >수정</ButtonCmp>
        <!-- 승인완료, 반려 일 때 -->
        <ButtonCmp
          type="btn-blue"
          @click="onSubmit"
        >수정</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3
  },
  data() {
    return {
      form: {
        certificate: '1058778973',
        certificateFile: '사업자등록증_2023.pdf',
        companyname: '더피프티원',
        biztype: '서비스',
        bizevent: '광고업',
        postcode: '06128',
        addr1: '서울특별시 강남구 봉은사로18길 58(역삼동, 건영빌딩)',
        addr2: '1층',
        url: 'https://www-qa.rcsbizcenter.com/main',
        service: 'RCS A2P / RCS 챗봇(양방향)',
        agency: '중계사임',
        certificateFile2: '특수부가통신_첨부파일.pdf',
        agencyService1: '웹 발송 / API 연동',
        agencyService2: '없음',
        agencyService3: '이미지 템플릿',
        agencyLogoFile: 'Logo_final.jpg'
      },
      selecteAuth: ['Auth_1'],
      filesName: '사업자등록증_2023.pdf'
    }
  },
  watch: {
  },
  methods: {
    onSubmit () {
      this.$router.push('./AgencyCorpInfoEdit')
    },
    corpInfo () {
      this.$router.push('./myInfo')
    }
  }
}
</script>
