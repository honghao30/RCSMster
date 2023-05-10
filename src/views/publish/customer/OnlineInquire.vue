<template>
  <div class="inner">
    <PageTitle pagetitle="온라인 문의" />
    <PageTitleH3 titleh3="문의정보" noticeinfo="필수 입력값" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label required">문의유형</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="wsg-guide-content">
                      <div class="select">
                        <select name="" id="selectValue" v-model="form.inquiretype">
                          <option value="1">가입</option>
                          <option value="2">서비스 관리</option>
                          <option value="3">브랜드 관리</option>
                          <option value="4">대화방 관리</option>
                          <option value="5">탬플릿 관리</option>
                          <option value="6">자동응답 관리</option>
                          <option value="7">브랜드 소식 관리</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="inquiretypeErrorMsg">문의 유형을 선택해주세요.</p>
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
                      @click="findPost">
                      우편번호
                    </ButtonCmp>
                    </div>
                  </div>
                  <div class="form-item-row">
                    <div class="input-item address">
                    <span class="input"><input type="text" class="input" v-model="form.addr1"></span> <span class="input"><input type="text" class="input" v-model="form.addr2"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="postcodeErrorMsg">기업주소를 입력해주세요.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <PageTitleH3 titleh3="회원정보" noticeinfo="필수 입력값" />
    <!-- 회원정보 -->
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue-line"
      >취소</ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        @click="onSubmit"
      >다음</ButtonCmp>
    </div>
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
        <CertificateMsg @closeModal="isModalViewed = false" status="ing"/>
        <!-- 기 가입자일 경우 done, 진행 중인 경우는 ing  -->
    </ModalView>

    <ModalView
      v-if="isAgencyModal" @closeModal="isAgencyModal = false"
    >
        <AgencyCheckMsg @closeModal="isAgencyModal = false"/>
    </ModalView>
    <!-- 중개사 url 정보 입력 확인 팝업 호출 시점 기획 확인 필요-->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView
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
        addr2: '',
        service: [],
        serviceRange: [],
        agency: ''
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.form.inquiretype === '') {
        this.inquiretypeErrorMsg = true
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
      if (this.form.postcode === '' || this.form.addr1 === '' || this.form.addr2 === '') {
        this.postcodeErrorMsg = true
        return
      }
      if (!this.form.service.length) {
        this.serviceErrorMsg = true
        return
      }
      if (this.form.agency === '') {
        this.agencyErrorMsg = true
      }
    },
    closeModal () {
      this.isModalViewed = false
      this.isAgencyModal = false
    },
    onFileChanged (e) {
      const files = e.target.files
      this.files = files
      const filesName = files[0].name
      this.filesName = filesName
    }
  }
}
</script>
