<template>
  <div class="join">
    <PageTitle pagetitle="운영자 가입" /> <!-- 기획서 v1.0 수정 (문구 수정) -->
    <StepList :stepActiveIndex="2" :stepTitle="stepTitle" />
    <PageTitleH3 titleh3="비지니스 정보 입력" />
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
                <div class="form-item__content" v-if="showall">
                  <div class="form-item-row">
                      <div class="input-item">
                        <span class="input input-info"><input ref="certificate" type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="form.certificate"></span>
                        <ButtonCmp
                          type="btn-default-line"
                          @click="checkCertificate"
                        >
                        사업자등록번호 인증
                        </ButtonCmp>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="certificateErrorMsg">사업자등록번호를 입력해주세요.</p>
                    <p class="guide-text black">&bull; 사업자등록번호 인증 후 회원가입을 진행 할 수 있습니다.</p>
                    <p class="guide-text black guide-text__link">선거 후보자/정치/공인입니다. <router-link to="/FAQ">FAQ</router-link><router-link to="/OnlineInquire">온라인 문의</router-link></p> <!-- 기획서 v1.0 수정 (공통으로 수정) -->
                    <p class="guide-text black">&bull; 최대 5개까지 첨부 가능합니다.</p>
                  </div>
                  <div class="form-item__content" v-else>
                      <div class="form-item-row">
                          <div class="input-item">
                            <span class="input input-info"><input type="text" class="input" :value="certificatetemp" disabled></span>
                          </div>
                      </div>
                      <p class="guide-text validation">사업자등록번호 인증이 완료되었습니다.</p>
                      <p class="guide-text validation">동일한 사업자등록번호가 등록되어 있습니다. 사업자등록증 등록 후 회원정보를 입력해주세요.</p>
                  </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">사업자등록증</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input input-info"><input type="text" class="input" :value="filesName" :disabled="disabled" placeholder="사업자등록증을 등록해주세요."></span>
                      <input type="file" id="fileUp" class="input" @change="onFileChanged">
                      <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&bull; 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요.</p>
                  <p class="guide-text black">&bull; 비영리법인/국가기관인 경우 고유번호증을 등록해주세요.</p>
                  <p class="guide-text black">&bull; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  <p class="guide-text black">&bull; 사업자등록증 제출 : 마스터 권한 / 사업자등록증 미 제출 : 매니저 권한</p> <!-- 기획서 v1.0 수정 (문구 추가) -->
                  <p class="guide-text black">&bull; 최대 5개까지 첨부 가능합니다.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">법인명</span></th> <!-- 기획서 v1.0 수정 (문구 수정) -->
              <td>
                <div v-if="joinIng" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item"> <!-- 기획서 v1.0 수정 (placeholder 수정) -->
                      <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 법인명을 입력해주세요." :disabled="disabled" v-model="form.companyname"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="companynameErrorMsg">법인명을 입력해주세요.</p> <!-- 기획서 v1.0 수정 (문구 수정) -->
                </div>
                <div v-else class="form-item__content">더피프티원</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">업태</span></th>
              <td>
                <div v-if="joinIng" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 업태명을 입력해주세요."  :disabled="disabled"  v-model="form.biztype"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="biztypeErrorMsg">사업자등록증에 등록된 첫번째 업태명을 입력해주세요.</p>
                  <p class="guide-text black">&bull; 비영리법인/국가기관인 경우 ‘기업/단체’로 입력해주세요.</p>
                </div>
                <div v-else class="form-item__content">서비스업</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">종목</span></th>
              <td>
                <div  v-if="joinIng" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 종목명을 입력해주세요." :disabled="disabled" v-model="form.bizevent"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="bizeventErrorMsg">사업자등록증에 등록된 첫번째 종목명을 입력해주세요.</p>
                  <p class="guide-text black">&bull; 비영리법인/국가기관인 경우 ‘비영리, 공공/행정, 정치/사회, 복지, 종교, 모임, 기관/단체일반’ 중에서 해당하는 항목을 입력해주세요.</p>
                </div>
                <div v-else class="form-item__content">IT</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">주소</span></th> <!-- 기획서 v1.0 수정 (문구 수정) -->
              <td>
                <div v-if="joinIng" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item post">
                      <span class="input input-post"><input type="text" class="input" placeholder="" v-model="form.postcode"></span>
                      <ButtonCmp
                          type="btn-default-line"
                          @click="findPost"
                      >
                        우편번호
                      </ButtonCmp>
                    </div>
                    <!-- <p class="guide-text error">ⓘ 도로명 또는 건물명(아파트)을 입력해주세요.</p> -->
                  </div>
                  <div class="form-item-row">
                    <div class="input-item address">
                      <span class="input input-info"><input type="text" class="input" placeholder="" v-model="form.addr1"></span>
                      <span class="input input-info"><input type="text" class="input" placeholder="" v-model="form.addr2"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="postcodeErrorMsg">주소를 입력해주세요.</p> <!-- 기획서 v1.0 수정 (문구 수정) -->
                </div>
                <div v-else class="form-item__content">06128 서울시 강남구 봉은사로 18길</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <div class="button__wrap space-between">
      <ButtonCmp
        type="btn-line"
      >이전</ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        @click="nextStep"
      >다음</ButtonCmp>
    </div>
  <ModalView
    v-if="isModalViewed" @closeModal="isModalViewed = false"
  >
  <!-- 기획서 v1.0 수정 (동일한 사업자등록번호 회원가입 진행중 경우) -->
    <ConfirmMsg
      v-if="certifMessage"
      @closeModal="isModalViewed = false"
    >
      <div slot="msg">
        <div class="msg"> <!-- 기획서 v1.0 수정 (문구수정) -->
          동일한 사업자등록번호로 기업 등록을 이미 진행하고 <br />
          있습니다. 기업 등록이 완료된 이후 회원가입이 가능하오니
          아래 담당자에게 기업 등록 완료를 확인하신 후 <br />
          회원가입을 진행해 주시기 바랍니다.
        </div>
        <div class="msg2 same-box"> <!-- 기획서 v1.0 수정 (same-box 이중클래스 추가) -->
          홍*동(hkp***@the-51.com)
        </div>
      </div>
      <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-line"
            @click="closeMsg"
          >닫기
          </ButtonCmp> <!-- 기획서 v1.0 수정 (type 변경) -->
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            온라인 문의
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- 기획서 v1.0 수정 (동일한 사업자등록번호 회원가입 진행중 경우) -->
      <ZipCode
        @closeModal="isModalViewed = false"
        v-else
      />
  </ModalView>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import StepList from '@/components/common/StepList.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import ZipCode from '@/views/join/components/ZipCode.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    StepList,
    ConfirmMsg,
    ZipCode
  },
  data() {
    return {
      form: {
        certificate: '',
        certificateFile: '',
        companyname: '',
        biztype: '',
        bizevent: '',
        postcode: '',
        addr1: '',
        addr2: ''
      },
      selecteAuth: ['Auth_1'],
      certificateErrorMsg: false,
      companynameErrorMsg: false,
      biztypeErrorMsg: false,
      bizeventErrorMsg: false,
      postcodeErrorMsg: false,
      certifMessage: false,
      showall: true,
      files: '',
      filesName: '',
      isModalViewed: false,
      joinIng: true,
      certificatetemp: '123456789',
      stepTitle: ['약관동의', '비지니스 정보 입력', '회원정보 입력', '가입 신청 완료'], //  기획서 v1.0 수정 (문구 수정)
      disabled: true
    }
  },
  watch: {
    isModalViewed () {
      if (this.isModalViewed) {
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  methods: {
    nextStep () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
        return
      }
      if (this.form.companyname === '') {
        this.companynameErrorMsg = true
        return
      }
      if (this.form.biztype === '') {
        this.biztypeErrorMsg = true
        return
      }
      if (this.form.bizevent === '') {
        this.bizeventErrorMsg = true
        return
      }
      if (this.form.postcode === '') {
        this.postcodeErrorMsg = true
        return
      }
      // if (this.form.addr2 === '') {
      //   this.postcodeErrorMsg = true
      //   return
      // }
      this.$router.push('./JoinStep03')
    },
    checkCertificate () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
      } else if (this.form.certificate === '123') {
        this.isModalViewed = true
        this.certifMessage = true
        this.joinIng = false
      } else {
        this.showall = false
        this.disabled = false
      }
    },
    closeModal () {
      this.isModalViewed = false
    },
    closeMsg  () {
      this.isModalViewed = false
    },
    onFileChanged (e) {
      const files = e.target.files
      this.files = files
      const filesName = files[0].name
      this.filesName = filesName
    },
    findPost () {
      this.isModalViewed = true
      this.certifMessage = false
    }
  }
}
</script>
