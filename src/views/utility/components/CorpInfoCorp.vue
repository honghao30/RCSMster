<template>
  <!-- 기업정보 관리 -->
  <article id="content" class="content">
    <div class="top_title_area">
      <h2 class="h2_title">{{isText}}</h2>
      <span class="h2_desc" v-if="isStatusOk && this.$store.state.user.corpAdmYn === 'Y'">
        기업 정보는 운영자 심사 후 변경이 완료됩니다.
      </span>
    </div>
    <section class="sec_form" v-if="isStatusWating || isStatusInspected || isStatusRejected">
      <table class="tbl_row_type">
        <caption>
          <strong>승인상태</strong>
          <p>승인상태, 사유</p>
        </caption>
        <colgroup>
          <col style="width:180px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">승인상태</th>
            <td>
              {{ corpData.aprvRetNm }}
              <span
                class="text_desc"
                v-if="isStatusRejected"
              >({{ corpData.aprvDt }})</span>
            </td>
          </tr>
          <tr v-if="isStatusRejected">
            <th scope="row">사유</th>
            <td>{{ corpData.aprvRetDescr}}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="sec_form">
      <table class="tbl_row_type">
        <caption>
          <strong>기업정보</strong>
          <p>사업자등록번호, 업체명, 사업자등록증, 업태, 종목, 주소</p>
        </caption>
        <colgroup>
          <col style="width:180px">
          <col style="width:450px">
          <col style="width:180px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              사업자등록번호
              <span class="require" v-if="!isViewMode">*</span>
            </th>
            <td>
              <div v-if="isViewMode">{{ formData.corpRegiNum | prettyCorpRegiNum }}</div>
              <div v-if="!isViewMode && !view.isModViewCorpRegiNum">
                <span class="text_value">{{ formData.corpRegiNum | prettyCorpRegiNum }}</span>
                <a href="javascript:void(0);" class="btn sml bd_black" @click="changeCorpRegiNum">
                  <span>변경</span>
                </a>
              </div>
              <div v-if="!isViewMode && view.isModViewCorpRegiNum">
                <span class="custom_input min">
                  <input
                    type="text"
                    placeholder="'-' 없이 10자리 입력"
                    ref="corpRegiNum"
                    v-model="formData.corpRegiNum"
                    maxlength="10"
                  >
                </span>
                <a
                  href="javascript:void(0);"
                  class="btn sml bd_black"
                  ref="btnCertCorpRegiNum"
                  @click="certCorpRegiNum"
                >
                  <span>인증</span>
                </a>
                <a href="javascript:void(0);" class="btn sml bd_black" @click="cancelCorpRegiNum">
                  <span>취소</span>
                </a>
              </div>
            </td>
            <th scope="row">
              업체명
              <span class="require" v-if="!isViewMode">*</span>
            </th>
            <td>
              <span v-if="isViewMode">{{ formData.name }}</span>
              <span v-if="!isViewMode" class="custom_input full_width">
                <input type="text" ref="name" v-model.trim="formData.name">
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">
              사업자등록증
              <span class="require" v-if="!isViewMode">*</span>
            </th>
            <td colspan="3">
              <div v-if="isViewMode">{{ formData.certiFileName }}</div>
              <div v-if="!isViewMode" class="box_add_file inline">
                <el-upload action :auto-upload="false" :on-change="handleChangeRegFile" ref="corpRegFileUpload" class="i_block">
                  <a href="javascript:void(0)" size="small" type="primary" class="btn sml bd_black">파일선택</a>
                </el-upload>
                <span class="text_desc add_file" v-if="!uploadedRegFileName">파일형식 : jpg, png, pdf, tiff (최대 5MB)</span>
                <span class="text_desc add_file" v-if="uploadedRegFileName" style="max-width: 900px">
                  {{ uploadedRegFileName }}
                  <a href="javascript:void(0);" class="btn_delete" @click="deleteUploadedRegFile"><span>삭제</span></a>
                </span>
              </div>
              <p class="text_error" style="font-weight: bold">
                * 사업자등록증 이외 사업자등록증명 또는 고유번호증으로 대체 가능합니다.
              </p>
            </td>
          </tr>
          <tr>
            <th scope="row">
              업태
              <span class="require" v-if="!isViewMode">*</span>
            </th>
            <td>
              <span v-if="isViewMode">{{ formData.bizCond }}</span>
              <span v-if="!isViewMode" class="custom_input full_width">
                <input type="text" ref="bizCond" v-model.trim="formData.bizCond" maxlength="21">
              </span>
            </td>
            <th scope="row">
              종목
              <span class="require" v-if="!isViewMode">*</span>
            </th>
            <td>
              <span v-if="isViewMode">{{ formData.bizCate }}</span>
              <span v-if="!isViewMode" class="custom_input full_width">
                <input type="text" ref="bizCate" v-model.trim="formData.bizCate" maxlength="21">
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">
              주소
              <span class="require" v-if="!isViewMode">*</span>
            </th>
            <td colspan="3">
              <div v-if="isViewMode">
                {{ formData.addrRegnNo }}
                <br>
                {{ formData.addrMngNo }} {{ formData.addrDtl }}
              </div>
              <div v-if="!isViewMode" class="address_search_area">
                <div class="input_search_bundle">
                  <span class="custom_input">
                    <input
                      type="text"
                      maxlength="5"
                      ref="addrRegnNo"
                      v-model="formData.addrRegnNo"
                      readonly
                    >
                  </span>
                  <a
                    href="javascript:void(0);"
                    class="btn sml bd_black"
                    @click="openAddressPopup"
                  >우편번호</a>
                </div>
                <div class="input_address_bundle">
                  <span class="custom_input">
                    <input type="text" ref="addrMngNo" v-model="formData.addrMngNo" readonly>
                  </span>
                  <span class="custom_input">
                    <input type="text" ref="addrDtl" v-model="formData.addrDtl" readonly>
                  </span>
                </div>
                <address-popup
                  v-if="view.visibleAddressPopup"
                  :visible.sync="view.visibleAddressPopup"
                  @getData="getAddress"
                ></address-popup>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <!-- 수정불가 - aprtRet :WATING(대기), INSPECTED (검수완료)-->
    <div class="btn_wrap center mar_t40" v-if="isViewMode">
      <a href="javascript:void(0);" class="btn mid blue" @click="goMyInfoViewMode">
        <span>내 정보관리</span>
      </a>
    </div>
    <!-- 승인완료 - aprtRet : OK(승인완료) -->
    <div class="btn_wrap center mar_t40" v-if="!isViewMode && isStatusOk">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goMyInfo">
        <span>취소</span>
      </a>
      <a href="javascript:void(0);" class="btn mid blue" @click="updateCorpData">
        <span>수정요청</span>
      </a>
    </div>
    <!-- 승인거절 - aprtRet : REJECTED(거절)  -->
    <div class="btn_wrap center mar_t40" v-if="!isViewMode && isStatusRejected">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="cancelApply">
        <span>신청취소</span>
      </a>
      <a href="javascript:void(0);" class="btn mid blue" @click="updateCorpData">
        <span>재신청</span>
      </a>
    </div>
  </article>
</template>

<script>
import AddressPopup from '@/components/address'
import { retrieveCorpRegiNum, downloadFileByFileId } from '@/api/common/code'
import { updateCorpInfo, changeCancel } from '@/api/utility/utility'

export default {
  name: 'CorpInfoCorp',
  components: {
    AddressPopup
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
      originCorpRegiNum: ''
    }
  },
  computed: {
    isText() {
      return this.viewMode ? '기업정보 조회' : '기업정보 관리'
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
      return jglib.isEmpty(this.corpRegFile) ? this.formData.certiFileName : this.corpRegFile.name
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
      this.formData = this.corpData
      this.originCorpRegiNum = this.corpData.corpRegiNum
      this.view.isCertCorpRegiNum = true
    },
    changeCorpRegiNum() {
      this.view.isModViewCorpRegiNum = true
    },
    cancelCorpRegiNum() {
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
        this.$router.push('/utility/my-info')
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
    updateCorpData() {
      if (!this.validateUpdateCorpData()) {
        return false
      }

      this.$confirmMsg('수정하시겠습니까?', '', '확인', '닫기')
        .then(() => {
          let formData = new FormData()
          formData.append('certiFile', this.corpRegFile.raw)
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
