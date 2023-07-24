<!-- 0620: 기존 파일 명 사용 매니저,마스터_비지니스 정보 관리 편집 -->
<template>
  <div class="join">
    <PageTitle pagetitle="비지니스 정보 관리" progress="승인완료"/>
    <!-- 기획서 v1.0 수정 - flag 삭제 -->
    <PageTitleH3 titleh3="비지니스 정보"/>
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
        <!-- 0620: 디자인 1차 수정 - colgroup width값 수정 -->
          <colgroup>
            <col width="230px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label required">사업자등록번호</span></th>
              <td>
                <div class="form-item__content"
                  v-if="changeCertificate"
                >
                  <div class="form-item-row">
                    <div class="input-item">
                    <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                      <span class="input input-info"><input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="form.certificate"></span>
                      <ButtonCmp
                        type="btn-default-line"
                        @click="checkCertificate"
                      >
                        인증
                      </ButtonCmp>
                      <ButtonCmp
                        type="btn-default-line"
                        @click="cancelChange"
                      >
                        취소
                      </ButtonCmp>
                    </div>
                    <p class="guide-text error" v-if="certificateErrorMsg">사업자등록번호를 입력해주세요.</p>
                  </div>
                </div>
                  <div class="form-item__content"
                    v-else
                  >
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="text">{{ form.certificate }}</span>
                        <!-- <span class="input input-info"><input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="form.certificate" disabled></span> -->
                        <ButtonCmp
                          type="btn-default-line"
                          @click="changeCert"
                        >
                        사업자등록번호 변경
                        </ButtonCmp>
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
                    <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                      <span class="input input-info"><input type="text" class="input" :value="filesName" disabled></span>
                      <input type="file" id="fileUp" class="input">
                      <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&bull; 사업자등록증을 변경하는 경우 재 승인을 받아야 합니다</p>
                  <p class="guide-text black">&bull; 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요.</p>
                  <p class="guide-text black">&bull; 비영리법인/국가기관인 경우 고유번호증을 등록해주세요.</p>
                  <p class="guide-text black">&bull; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">법인명</span></th> <!-- 기획서 v1.0 수정 - 문구 수정 -->
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                      <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 법인명을 입력해주세요." v-model="form.companyname"></span> <!-- 기획서 v1.0 수정 - 문구 수정 -->
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">업태</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                      <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 업태명을 입력해주세요."  v-model="form.biztype"></span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">종목</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                      <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 종목명을 입력해주세요."   v-model="form.bizevent"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="bizeventErrorMsg">사업자등록증에 등록된 첫번째 종목명을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">주소</span></th> <!-- 기획서 v1.0 수정 - 문구 수정 -->
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item post">
                    <!-- 0620: 디자인 1차 수정 - 'input-post' class명 추가 -->
                      <span class="input input-post"><input type="text" class="input" v-model="form.postcode" disabled></span>
                      <ButtonCmp
                          type="btn-default-line"
                          @click="findPost"
                      >
                        우편번호
                      </ButtonCmp>
                    </div>
                  </div>
                  <div class="form-item-row">
                    <div class="input-item address">
                    <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                      <span class="input input-info">
                        <input type="text" class="input" v-model="form.addr1" disabled>
                      </span>
                      <span class="input input-info">
                        <input type="text" class="input" v-model="form.addr2" disabled>
                      </span>
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
        <!-- 기획서 v1.0 수정 - 저장 -> 승인 요청 -->
        <ButtonCmp
          type="btn-blue"
          @click="onSubmit"
        >승인 요청</ButtonCmp>
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
        certificateFile: '',
        companyname: '더피프티원',
        biztype: '서비스',
        bizevent: '광고업',
        postcode: '06128',
        addr1: '서울특별시 강남구 봉은사로18길 58(역삼동, 건영빌딩)',
        addr2: '1층'
      },
      selecteAuth: ['Auth_1'],
      filesName: '사업자등록증_2023.pdf',
      changeCertificate: false,
      certificateErrorMsg: false
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
    },
    changeCert () {
      this.changeCertificate = true
      this.form.certificate = ''
    },
    cancelChange () {
      this.changeCertificate = false
    },
    checkCertificate () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
      }
    }
  }
}
</script>
