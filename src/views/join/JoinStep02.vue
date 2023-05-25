<template>
  <div class="join">
    <PageTitle pagetitle="기업담당자 회원가입" />
    <StepList :stepActiveIndex="2" :stepTitle="stepTitle" />
    <PageTitleH3 titleh3="기업정보 입력" noticeinfo="필수 입력값" />
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
                <div class="form-item__content" v-if="showall">
                  <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input ref="certificate" type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="form.certificate"></span>
                        <ButtonCmp
                          type="btn-default-line"
                          @click="checkCertificate"
                        >
                        사업자등록번호 인증
                        </ButtonCmp>
                      </div>
                    </div>
                    <p class="guide-text">※ 사업자등록번호 인증 후 회원가입을 진행 할 수 있습니다.</p>
                    <p class="guide-text error" v-if="certificateErrorMsg">사업자등록번호를 입력해주세요.</p>
                  </div>
                  <div class="form-item__content" v-else>
                      <div class="form-item-row">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" :value="certificatetemp" disabled></span>
                          </div>
                      </div>
                      <p class="guide-text black">※ 사업자등록번호 인증이 완료되었습니다.</p>
                  </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">사업자등록증</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input"><input type="text" class="input" :value="filesName" :disabled="disabled" placeholder="사업자등록증을 등록해주세요."></span>
                      <input type="file" id="fileUp" class="input" @change="onFileChanged">
                      <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&middot; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  <p class="guide-text"> ※ 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요. </p>
                  <p class="guide-text"> ※ 비영리법인/국가기관인 경우 고유번호증을 등록해주세요. </p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">법인명(단체명)</span></th>
              <td>
                <div v-if="joinIng" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input"><input type="text" class="input" placeholder="사업자등록증에 등록된 법인명(단체명)을 입력해주세요." :disabled="disabled" v-model="form.companyname"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="companynameErrorMsg">법인명(단체명)을 입력해주세요.</p>
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
                      <span class="input"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 업태명을 입력해주세요."  :disabled="disabled"  v-model="form.biztype"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="biztypeErrorMsg">사업자등록증에 등록된 첫번째 업태명을 입력해주세요.</p>
                  <p class="guide-text">※ 비영리법인/국가기관인 경우 ‘기업/단체’로 입력해주세요.</p>
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
                      <span class="input"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 종목명을 입력해주세요." :disabled="disabled" v-model="form.bizevent"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="bizeventErrorMsg">사업자등록증에 등록된 첫번째 종목명을 입력해주세요.</p>
                  <p class="guide-text">※ 비영리법인/국가기관인 경우 ‘비영리, 공공/행정, 정치/사회, 복지, 종교, 모임, 기관/단체일반’ 중에서 해당하는 항목을 입력해주세요.</p>
                </div>
                <div v-else class="form-item__content">IT</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">기업주소</span></th>
              <td>
                <div v-if="joinIng" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item post">
                      <span class="input"><input type="text" class="input" v-model="form.postcode"></span>
                      <ButtonCmp
                          type="btn-default-line"
                          @click="findPost"
                      >
                        우편번호
                      </ButtonCmp>
                    </div>
                    <p class="guide-text error" v-if="postcodeErrorMsg">기업주소를 입력해주세요.</p>
                  </div>
                  <div class="form-item-row">
                    <div class="input-item address">
                      <span class="input"><input type="text" class="input" v-model="form.addr1"></span> <span class="input"><input type="text" class="input" v-model="form.addr2"></span>
                    </div>
                  </div>
                </div>
                <div v-else class="form-item__content">06128 서울시 강남구 봉은사로 18길</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue-line"
      >이전</ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        @click="onSubmit"
      >다음</ButtonCmp>
    </div>
  <ModalView
    v-if="isModalViewed" @closeModal="isModalViewed = false"
  >
    <ConfirmMsg
      v-if="certifMessage"
      @closeModal="isModalViewed = false"
    >
      <div slot="msg">
        <div class="msg">
          동일한 사업자등록번호로<br /> 회원가입을 진행하고 있습니다. <br /><br />
          최초의 회원가입 완료 후<br /> 추가 회원가입이 가능합니다.
        </div>
        <div class="msg2">
          홍*동(hkp***@the-51.com)
        </div>
      </div>
      <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-blue-line"
            @click="closeMsg"
          >닫기
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            온라인 문의
          </ButtonCmp>
        </div>
      </ConfirmMsg>
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
      stepTitle: ['약관동의', '기업정보 입력', '회원정보 입력', '가입완료'],
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
    onSubmit () {
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
