<template>
  <div class="join">
    <PageTitle pagetitle="기업정보 관리" />
    <div class="top-progress-area">
      <span class="flag-progress done">승인완료</span>
      <!-- <span class="flag-progress reject">반려</span> 반려 될 경우 -->
      <p class="date">최종변경 : 2023. 03. 30</p>
    </div>
    <div class="top-notice--gray">
      <p>-기업 정보는 운영자 심사 후 변경이 완료됩니다.</p>
      <p>-운영자 심사 대기 상태에서는 정보 수정이 불가합니다.</p>
    </div>
    <PageTitleH3 titleh3="기업정보" noticeinfo="필수 입력값" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label required">사업자등록번호</span></th>
              <td>
                  <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="form.certificate" disabled></span>
                          <ButtonCmp
                            type="btn-default-line"
                            @click="checkCertificate"
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
                      <span class="input"><input type="text" class="input" :value="filesName" disabled></span>
                      <input type="file" id="fileUp" class="input">
                      <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&middot; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">법인명(단체명)</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input"><input type="text" class="input" placeholder="사업자등록증에 등록된 법인명(단체명)을 입력해주세요." v-model="form.companyname"></span>
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
                      <span class="input"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 업태명을 입력해주세요."  v-model="form.biztype"></span>
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
                      <span class="input"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 종목명을 입력해주세요."   v-model="form.bizevent"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="bizeventErrorMsg">사업자등록증에 등록된 첫번째 종목명을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">기업주소</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item post">
                      <span class="input"><input type="text" class="input" v-model="form.postcode" disabled></span>
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
                      <span class="input">
                        <input type="text" class="input" v-model="form.addr1" disabled>
                      </span>
                      <span class="input">
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
    <div class="button__wrap">
      <ButtonCmp
        type="btn-line"
      >취소</ButtonCmp>
      <router-link
        to="/myinfo"
        class="btn btn-blue-line"
      >개인정보 관리</router-link>
      <ButtonCmp
        type="btn-blue"
      >저장</ButtonCmp>
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
      filesName: '사업자등록증_2023.pdf'
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>
