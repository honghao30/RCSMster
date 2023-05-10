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
                        <span class="input"><input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="form.certificate"></span>
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
                      <span class="input"><input type="text" class="input" :value="filesName"></span>
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
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input"><input type="text" class="input" placeholder="사업자등록증에 등록된 법인명(단체명)을 입력해주세요." v-model="form.companyname"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="companynameErrorMsg">법인명(단체명)을 입력해주세요.</p>
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
                  <p class="guide-text error" v-if="biztypeErrorMsg">사업자등록증에 등록된 첫번째 업태명을 입력해주세요.</p>
                  <p class="guide-text">※ 비영리법인/국가기관인 경우 ‘기업/단체’로 입력해주세요.</p>
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
                  <p class="guide-text">※ 비영리법인/국가기관인 경우 ‘비영리, 공공/행정, 정치/사회, 복지, 종교, 모임, 기관/단체일반’ 중에서 해당하는 항목을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">기업주소</span></th>
              <td>
                <div class="form-item__content">
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
                  </div>
                  <div class="form-item-row">
                    <div class="input-item address">
                      <span class="input"><input type="text" class="input" v-model="form.addr1"></span> <span class="input"><input type="text" class="input" v-model="form.addr2"></span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <span class="form-item__label required">권한</span>
              </th>
              <td>
                <div class="form-item__content authority">
                  <dl class="isSelect">
                    <dt>
                      <!-- 체크박스가 아닌 라디오 박스가 맞는거 아닌지 기획 확인필요
                      두개 동시에 체크 되는 경우는 없으니
                      기획서는 선택 된 권한 활성화 형태인데 디자인은 체크박스로 되어 있으니 정식으로 디자인 받은 후 확인 필요 -->
                      <span class="checkbox">
                        <input type="checkbox"  v-model="selecteAuth" id="Auth_1" value="Auth_1"  />
                        <label for="Auth_1"><span class="checkbox__text">마스터 권한</span></label>
                      </span>
                    </dt>
                    <dd>
                      <ul>
                        <li>사업자등록증 제출 필수 (○)</li>
                        <li>브랜드를 직접 개설 (○)</li>
                        <li>브랜드 관리자로 위임을 받음(○)</li>
                        <li>운영자 승인 없이 바로 가입 완료(○)</li>
                      </ul>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      <span class="checkbox">
                        <input type="checkbox" v-model="selecteAuth" id="Auth_2" value="Auth_2" />
                        <label for="Auth_2"><span class="checkbox__text">매니저 권한</span></label>
                      </span>
                    </dt>
                    <dd>
                      <ul>
                        <li>사업자등록증 제출 필수 (X)</li>
                        <li>브랜드를 직접 개설 (X)</li>
                        <li>브랜드 관리자로 위임을 받음(○)</li>
                        <li>운영자 승인 없이 바로 가입 완료(○)</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
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
      <CertificateMsg @closeModal="isModalViewed = false" status="done"/>
      <!-- 기 가입자일 경우 done, 진행 중인 경우는 ing  -->
  </ModalView>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import CertificateMsg from '@/views/publish/join/CertificateMsg.vue'
import StepList from '@/components/common/StepList.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    CertificateMsg,
    StepList
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
      showall: true,
      files: '',
      filesName: '',
      isModalViewed: false,
      certificatetemp: '123456789',
      stepTitle: ['약관동의', '기업정보 입력', '회원정보 입력', '가입완료']
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
      if (this.form.biztype === '') {
        this.biztypeErrorMsg = true
        return
      }
      if (this.form.bizeventErrorMsg === '') {
        this.bizeventErrorMsg = true
        return
      }
      if (this.form.postcode === '') {
        this.postcodeErrorMsg = true
        return
      }
      if (this.form.addr2 === '') {
        this.postcodeErrorMsg = true
        // return
      }
    },
    checkCertificate () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
        return
      }
      this.showall = false
      this.isModalViewed = true
      // document.body.classList.add('modal-open')
    },
    closeModal () {
      this.isModalViewed = false
      // document.body.classList.remove('modal-open')
    },
    onFileChanged (e) {
      const files = e.target.files
      this.files = files
      const filesName = files[0].name
      this.filesName = filesName
    },
    findPost () {
      alert('우편번호 잦기')
    }
  }
}
</script>
