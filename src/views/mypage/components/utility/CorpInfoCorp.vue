<template>
  <div class="join">
    <PageTitle :pagetitle="isText" />
    <div class="top-progress-area" v-if="isStatusWating || isStatusInspected || isStatusRejected">
      <span :class="{'flag-progress': true, 'done': isStatusInspected, 'reject': isStatusRejected}">{{ corpData.aprvRetNm }}</span>
    </div>
    <PageTitleH3 titleh3="비즈니스 정보" noticeinfo="필수 입력값" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="230px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true, 'required':!isViewMode}">사업자등록번호</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item" v-if="isViewMode">
                      <span class="text">{{ formData.corpRegiNum }}</span>
                    </div>
                    <div class="input-item" v-if="!isViewMode && !view.isModViewCorpRegiNum">
                      <span class="input"><input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="formData.corpRegiNum" maxlength="10"></span>
                      <ButtonCmp type="btn-default-line" @click="changeCorpRegiNum">사업자등록번호 변경</ButtonCmp>
                    </div>
                    <div class="input-item" v-if="!isViewMode && view.isModViewCorpRegiNum">
                      <span class="input"><input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." ref="corpRegiNum" v-model="formData.corpRegiNum" maxlength="10"></span>
                      <ButtonCmp
                        type="btn-default-line"
                        @click="certCorpRegiNum"
                      >
                        인증
                      </ButtonCmp>
                      <ButtonCmp
                        type="btn-default-line"
                        @click="cancelCorpRegiNum"
                      >
                        취소
                      </ButtonCmp>
                    </div>
                    <p class="guide-text error" v-if="certificateErrorMsg">사업자등록번호를 입력해주세요.</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">사업자등록증</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item" v-if="!isViewMode">
                      <span class="input input-info">
                        <input type="text" class="input" ref="corpRegFile" :value="uploadedRegFileName" placeholder="사업자등록증을 등록해주세요.">
                      </span>
                      <input type="file" id="fileUp" class="input" @change="handleChangeCropRegFile">
                      <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                    </div>
                    <div class="input-item" v-else>
                      {{ formData.certiFileName }}
                    </div>
                  </div>
                  <p class="guide-text black" v-if="!isViewMode">&bull; 사업자등록증을 변경하는 경우 재 승인을 받아야 합니다</p>
                  <p class="guide-text black" v-if="!isViewMode">&bull; 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요.</p>
                  <p class="guide-text black" v-if="!isViewMode">&bull; 비영리법인/국가기관인 경우 고유번호증을 등록해주세요.</p>
                  <p class="guide-text black" v-if="!isViewMode">&bull; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true, 'required':!isViewMode}">법인명(단체명)</span></th>
              <td>
                <span class="text" v-if="isViewMode">{{ formData.name }}</span>
                <div class="form-item__content" v-if="!isViewMode">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input input-info"><input type="text" class="input" ref="name" placeholder="사업자등록증에 등록된 법인명(단체명)을 입력해주세요." v-model.trim="formData.name"></span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true, 'required':!isViewMode}">업태</span></th>
              <td>
                <span class="text" v-if="isViewMode">{{ formData.bizCond }}</span>
                <div class="form-item__content" v-if="!isViewMode">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 업태명을 입력해주세요." ref="bizCond" v-model.trim="formData.bizCond" maxlength="21"></span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true, 'required':!isViewMode}">종목</span></th>
              <td>
                <span class="text" v-if="isViewMode">{{ formData.bizCate }}</span>
                <div class="form-item__content" v-if="!isViewMode">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 종목명을 입력해주세요." ref="bizCate" v-model.trim="formData.bizCate" maxlength="21"></span>
                    </div>
                  </div>
                  <!-- <p class="guide-text error" v-if="bizeventErrorMsg">사업자등록증에 등록된 첫번째 종목명을 입력해주세요.</p> -->
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true, 'required':!isViewMode}">기업주소</span></th>
              <td>
                <span class="text" v-if="isViewMode">{{ formData.addrRegnNo }} {{ formData.addrMngNo }} {{ formData.addrDtl }}</span>
                <!-- <span class="text">06128 서울특별시 강남구 봉은사로18길 58(역삼동, 건영빌딩) 1층</span> -->
                <div class="form-item__content" v-if="!isViewMode">
                  <div class="form-item-row">
                    <div class="input-item post">
                      <span class="input input-info"><input type="text" maxlength="5" class="input" ref="addrRegnNo" v-model="formData.addrRegnNo" disabled></span>
                      <ButtonCmp
                          type="btn-default-line"
                          @click="openAddressPopup"
                      >
                        우편번호
                      </ButtonCmp>
                    </div>
                  </div>
                  <div class="form-item-row">
                    <div class="input-item address">
                      <span class="input input-info">
                        <input type="text" class="input" ref="addrMngNo" v-model="formData.addrMngNo" disabled>
                      </span>
                      <span class="input input-info">
                        <input type="text" class="input" ref="addrDtl" v-model="formData.addrDtl" disabled>
                      </span>
                    </div>
                  </div>
                  <address-popup v-if="view.visibleAddressPopup" :visible.sync="view.visibleAddressPopup" @getData="getAddress"></address-popup>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <div class="top-notice--gray gray__bottom">
      <p v-if="isStatusWating">- 승인대기 : 운영자 심사 대기중입니다.</p>
      <p v-if="isStatusInspected">- 승인완료 : 승인이 완료 되었습니다.</p>
      <p class="error" v-if="isStatusRejected">- 반려 : {{ corpData.aprvRetDescr}}</p>
      <p class="date" v-if="isStatusWating || isStatusInspected || isStatusRejected">- 최종변경 : ({{ corpData.aprvDt }})</p>
      <p>- 기업 정보는 운영자 심사 후 변경이 완료됩니다.</p>
      <p>- 운영자 심사 대기 상태에서는 정보 수정이 불가합니다.</p>
    </div>

    <div class="button__wrap space-between">
      <template v-if="isViewMode"><!-- 수정불가 - aprtRet :WATING(대기), INSPECTED (검수완료)-->
        <div class="button__wrap button__left">
          <ButtonCmp type="btn btn-line" @click="goMyInfoViewMode" >개인정보 관리</ButtonCmp>
          <!-- <ButtonCmp type="btn-line" @click="updateCorpFileData" v-if="!isStatusWating">수정</ButtonCmp> -->
        </div>
      </template>
      <template v-if="!isViewMode && isStatusOk"><!-- 승인완료 - aprtRet : OK(승인완료) -->
        <ButtonCmp type="btn-line" @click="goMyInfo">취소</ButtonCmp>
        <div class="button__wrap button__left">
          <ButtonCmp type="btn-line" @click="updateCorpData">수정</ButtonCmp>
        </div>
      </template>
      <template v-if="!isViewMode && isStatusRejected"><!-- 승인거절 - aprtRet : REJECTED(거절)  -->

        <div class="button__wrap button__left">
          <ButtonCmp type="btn-line" @click="cancelApply">신청취소</ButtonCmp>
          <ButtonCmp type="btn-line" @click="updateCorpData">재신청</ButtonCmp>
        </div>
      </template>
    </div>

    <!-- 모달 창 -->
    <ModalView v-if="view.visibleAddressPopup">
      <ZipCode v-if="view.visibleAddressPopup" @closeModal="closeAddressPopup" />
    </ModalView>
    <!-- //모달 창 -->
  </div>
</template>

<script>
import AddressPopup from '@/views/mypage/components/address'
import { retrieveCorpRegiNum, downloadFileByFileId } from '@/api/common/code'
import { updateCorpInfo, updateCorpFileInfo, changeCancel } from '@/api/utility/utility'

import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ZipCode from '@/views/join/components/ZipCodeCustom.vue'

export default {
  name: 'CorpInfoCorp',
  components: {
    AddressPopup,
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    ZipCode
  },
  props: {
    aprvRet: {
      type: String
    },
    corpData: {
      type: Object
    },
    viewMode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formData: {
        corpRegiNum: '',
        name: '',
        bizCond: '',
        bizCate: '',
        addrRegnNo: '',
        addrMngNo: '',
        addrDtl: '',
        corpCerti: ''
      },
      view: {
        isModViewCorpRegiNum: false,
        isCertCorpRegiNum: true,
        visibleAddressPopup: false
      },
      corpRegFile: {},
      originCorpRegiNum: '',
      form: {
        certificate: '1058778973',
        certificateFile: '',
        companyname: '더피프티원',
        biztype: '서비스',
        bizevent: '광고업',
        postcode: '06128',
        addr1: '서울특별시 강남구 봉은사로18길 58(역삼동, 건영빌딩)',
        addr2: '1층',
        agency: 'agencyY',
        service: ['A2P', 'chatbot']
      },
      selecteAuth: ['Auth_1'],
      filesName: '사업자등록증_2023.pdf',
      info: {
      },
      certificateErrorMsg: false
    }
  },
  computed: {
    isText() {
      return this.viewMode ? '비지니스 정보 조회' : '비지니스 정보 관리'
    },
    isStatusOk() {
      return this.formData.aprvRet === 'OK'
    },
    isStatusWating() {
      return this.formData.aprvRet === 'WAITING'
    },
    isStatusRejected() {
      return this.formData.aprvRet === 'REJECTED'
    },
    isStatusInspected() {
      return this.formData.aprvRet === 'INSPECTED' || this.formData.aprvRet === 'INSPECTING'
    },
    isViewMode() {
      return this.formData.aprvRet === 'WAITING' || this.formData.aprvRet === 'INSPECTED' || this.formData.aprvRet === 'INSPECTING' || this.viewMode === true
    },
    isUploadedRegFile() {
      return !jglib.isEmpty(this.corpRegFile)
    },
    uploadedRegFileName() {
      // return jglib.isEmpty(this.corpRegFile) ? this.formData.certiFileName : this.corpRegFile.name
      return jglib.isEmpty(this.corpRegFile.name) ? '' : this.corpRegFile.name
    }
  },
  watch: {
    corpData() {
      this.init()
    },
    'formData.corpRegiNum'(value, old) {
      if (old !== '') {
        this.view.isCertCorpRegiNum = false
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.info = this.$store.state.user
      console.log('this.info', this.info)
      this.formData = this.corpData
      this.originCorpRegiNum = this.corpData.corpRegiNum
      this.view.isCertCorpRegiNum = true
    },
    changeCorpRegiNum() {
      this.changeCertificate = true
      this.view.isModViewCorpRegiNum = true
    },
    cancelCorpRegiNum() {
      this.changeCertificate = false
      this.view.isModViewCorpRegiNum = false
      this.formData.corpRegiNum = this.originCorpRegiNum
    },
    handleChangeRegFile(file, fileList) {
      let checkResult = jglib.checkFileData(file.raw, ['jpg', 'jpeg', 'png', 'pdf', 'tiff'], 5)
      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
      } else {
        this.deleteUploadedRegFile()
        this.corpRegFile = file
      }
    },
    handleChangeCropRegFile(e) {
      let file = e.target.files[0]

      let checkResult = jglib.checkFileData(file, ['JPG', 'PNG', 'PDF', 'TIFF'], 5)

      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
      } else {
        this.deleteUploadedRegFile()
        this.corpRegFile = file
      }
    },
    deleteUploadedRegFile() {
      this.formData.certiFileName = ''
      this.corpRegFile = {}
    },
    certCorpRegiNum() {
      // 19.11.19 - 기존 입력된 사업자번호와 동일한번호로 인증시 메시지 출력
      if (this.originCorpRegiNum === this.formData.corpRegiNum) {
        this.$alertMsg('기존 사업자등록번호와 동일합니다.')
        return
      }
      // 사업자 등록 번호 인증
      if (!this.validCertCorpRegiNum()) {
        return false
      }

      let params = {
        corpRegiNum: this.formData.corpRegiNum,
        userType: 'CORP'
      }
      retrieveCorpRegiNum(params)
        .then(res => {
          this.$alertMsg(
            '이미 가입된 사업자등록번호가 있습니다. 확인 후 재입력해 주세요.'
          ).then(() => {})
        })
        .catch(res => {
          this.$alertMsg('정상적으로 사업자등록번호가 인증되었습니다.').then(
            () => {
              this.$refs.corpRegiNum.focus()
              this.view.isCertCorpRegiNum = true
            }
          )
        })
    },
    validCertCorpRegiNum() {
      if (jglib.isEmpty(this.formData.corpRegiNum)) {
        this.$alertMsg('사업자등록번호를 입력해 주세요.').then(() => {
          this.$refs.corpRegiNum.focus()
        })
        this.certificateErrorMsg = true
        return false
      }

      if (
        this.formData.corpRegiNum.length !== 10 ||
        !jglib.checkBizRegNum(this.formData.corpRegiNum)
      ) {
        this.$alertMsg(
          '입력하신 정보가 유효한 정보가 아닙니다. 확인 후 재입력해 주세요.'
        ).then(() => {
          this.$refs.corpRegiNum.focus()
        })
        return false
      }

      return true
    },
    goMyInfoViewMode() {
      this.$router.push('/utility/my-info')
    },
    goMyInfo() {
      this.$confirmMsg(
        '기업정보 변경을 취소하시겠습니까?<br/>수정 전 정보로 복구됩니다.',
        '',
        '확인',
        '닫기'
      ).then(() => {
        this.$router.push('/utility/company-info')
      })
    },
    cancelApply() {
      this.$confirmMsg(
        '기업정보 변경을 취소하시겠습니까?<br/>수정 전 정보로 복구됩니다.',
        '',
        '확인',
        '닫기'
      ).then(() => {
        let params = {
          corpId: this.formData.corpId
        }
        changeCancel(params)
          .then(res => {
            this.$emit('refresh')
          })
          .catch(err => {
            this.$alertMsg(err.desc)
          })
      })
    },
    updateCorpFileData() {
      this.$confirmMsg('수정하시겠습니까?', '', '확인', '닫기')
        .then(() => {
          let formData = new FormData()
          formData.append('certiFile', this.corpRegFile)
          formData.append('data', JSON.stringify(this.formData))

          updateCorpFileInfo(formData)
            .then(response => {
              this.$emit('refresh')
            })
            .catch(error => {
              this.$alertMsg(error.desc)
            })
        })
        .catch(() => {})
    },
    updateCorpData() {
      if (!this.validateUpdateCorpData()) {
        return false
      }

      this.$confirmMsg('수정하시겠습니까?', '', '확인', '닫기')
        .then(() => {
          let formData = new FormData()
          formData.append('certiFile', this.corpRegFile)
          formData.append('data', JSON.stringify(this.formData))

          updateCorpInfo(this.formData.corpId, formData)
            .then(response => {
              this.$emit('refresh')
            })
            .catch(error => {
              this.$alertMsg(error.desc)
            })
        })
        .catch(() => {})
    },
    validateUpdateCorpData() {
      if (this.view.isModViewCorpRegiNum && !this.view.isCertCorpRegiNum) {
        this.$alert('사업자번호를 인증해 주세요.').then(res => {
          this.$refs.btnCertCorpRegiNum.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.name)) {
        this.$alert('업체명을 입력해 주세요').then(res => {
          this.$refs.name.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.uploadedRegFileName)) {
        this.$alert('사업자등록증을 업로드해 주세요.').then(res => {
          this.$refs.corpRegFileUpload.$el.children[0].focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.bizCond)) {
        this.$alert('업태를 입력해 주세요').then(res => {
          this.$refs.bizCond.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.bizCate)) {
        this.$alert('종목을 입력해 주세요').then(res => {
          this.$refs.bizCate.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.addrRegnNo)) {
        this.$alert('주소를 입력해 주세요').then(res => {
          this.$refs.addrRegnNo.focus()
        })
        return false
      }
      return true
    },
    getCertiFile() {
      let params = {
        fileId: this.formData.certiFileId,
        fileNo: this.formData.certiFileNo
      }
      downloadFileByFileId(params)
        .then(res => {})
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    openAddressPopup() {
      this.view.visibleAddressPopup = true
    },
    closeAddressPopup(data) {
      if (!jglib.isEmpty(data)) {
        this.formData.addrRegnNo = data.zipNo
        this.formData.addrMngNo = data.roadFullAddr
        this.formData.addrDtl = data.detail
      }
      this.view.visibleAddressPopup = false
      this.addrValidation()
    },
    getAddress(address) {
      this.formData.addrRegnNo = address.zipNo
      this.formData.addrMngNo = address.roadFullAddr
      this.formData.addrDtl = address.detail
    }
  }
}
</script>

<style>
</style>
