<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'발신번호 관리'"/>
      </div>
      <brand-top active="sendnum" :brandId="brandId"></brand-top>
      <div class="contents_wrap">
        <section class="section mar_b0">
          <section class="sec_form">
            <div class="title_area">
              <h3 class="h3_title">단방향 대화방 등록</h3>
              <ul class="bullet_list fs16">
                <li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li>
              </ul>
            </div>
            <table class="tbl_row_type">
              <caption>
                <strong>발신번호 상세</strong>
                <p>통신서비스 가입증명원, 엑셀등록</p>
              </caption>
              <colgroup>
                <col style="width:250px">
                <col style="width:auto">
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">통신서비스 가입증명원 <span class="require">*</span></th>
                  <td>
                    <div class="box_add_file inline">
                      <!-- 파일업로드 -->
                      <el-upload action :on-change="onFileregCertiFile" :file-list="regCertiFileList" :auto-upload="false" class="i_block">
                        <a href="javascript:void(0);" size="small" type="primary" class="btn sml bd_black">파일선택</a>
                      </el-upload>
                      <span class="text_desc add_file" v-if="!regCertiFileYn">파일형식 : jpg, png, pdf, tiff, zip (최대20MB)</span>
                      <span class="text_desc add_file" v-if="regCertiFileYn">
                        {{ this.regCertiFileName }}
                        <a href="javascript:void(0);" class="btn_delete" @click="removeregCertiFile">
                          <span>삭제</span>
                        </a>
                      </span>
                    </div>
                    <div class="mar_t10">
                      <ul>
                        <li>등록하는 모든 발신번호에 해당하는 통신서비스 가입증명원을 업로드 해주시기 바랍니다.</li>
                        <li>
                          입력한 발신번호와 통신서비스 가입증명원의 전화번호가 일치해야 발신번호 등록이 가능하며<br>
                          <span class="text_error" style="font-weight: bold;">최근 1개월 이내 발급된 서류로 제출해주세요.</span>
                        </li>
                        <li>※ 파일이 여러 개인 경우, zip 파일로 압축하여 등록해주세요.</li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">엑셀 등록 <span class="require">*</span></th>
                  <td>
                    <div class="box_add_file inline">
                      <el-upload action :on-change="onFileregExcelFile" :file-list="regExcelFileList" :auto-upload="false" class="i_block">
                        <a href="javascript:void(0);" size="small" type="primary" class="btn sml bd_black">파일선택</a>
                      </el-upload>
                      <a href="javascript:void(0);" class="btn_link mar_l12" @click="fileDonwload">
                        <span>샘플파일 다운로드</span>
                      </a>
                      <span class="text_desc add_file" v-show="!regExcelFileYn">파일형식 : xls, xlsx (최대 5MB)</span>
                      <span class="text_desc add_file" v-show="regExcelFileYn">
                        {{ this.regExcelFileName }}
                        <a href="javascript:void(0);" class="btn_delete" @click="removeregExcelFile">
                          <span>삭제</span>
                        </a>
                      </span>
                    </div>
                    <div class="mar_t10">
                      <ul>
                        <li>발신번호를 대량으로 등록할 수 있습니다. (최대 1,000건까지 등록가능)</li>
                        <li>대량 등록 시 프로필 이미지는 브랜드 프로필 이미지로 등록됩니다.</li>
                        <li>샘플파일을 다운로드 받아 양식에 맞게 발신번호명, 발신번호를 작성하여 업로드 해주시기 바랍니다.</li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="btn_wrap center mar_t40">
              <a href="javascript:void(0);" class="btn mid bd_blue" @click="cancelApply">
                <span>취소</span>
              </a>
              <a href="javascript:void(0);" class="btn mid blue" @click="arpprovApply">
                <span>승인요청</span>
              </a>
            </div>
          </section>
        </section>
      </div>
    </article>
    <!-- 엑셀 업로드 결과 팝업 -->
    <excel-upload-result-popup
      v-if="popupObj.visible"
      :visible.sync="popupObj.visible"
      :uploadResult="popupObj.excelUploadResult"
      @errorListDown="uploadErrorListDownload"
    ></excel-upload-result-popup>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import { downloadFileDirect, chatbotUploadResult } from '@/api/common/code'
import { updateQuantityRegistration } from '@/api/service/callingNumberManagement'
import ExcelUploadResultPopup from '@/components/excel'
import Breadcrumb from '@/components/global/Breadcrumb'

export default {
  name: 'QuantityRegistration',
  components: { BrandTop, ExcelUploadResultPopup, Breadcrumb },
  props: {
    approvaInfoData: {
      type: Object
    }
  },
  data() {
    return {
      subTitle: '',
      brandId: '',
      mdn: '',
      regCertiFileName: '',
      regExcelFileName: '',
      aprvRet: '',
      regCertiFileYn: false,
      regExcelFileYn: false,
      sampleDownCheckFlag: false,
      regCertiFile: [],
      regCertiFileList: [],
      regExcelFile: [],
      regExcelFileList: [],
      popupObj: {
        visible: false,
        excelUploadResult: {
          totalCount: '', // 총갯수
          successCount: '', // 등록갯수
          etcFailCount: '', // 유효하지 않은 번호
          dupFailCount: '', // 중복된 번호
          duplicateCount: '', // 이미 등록된 번호
          passesdFailCount: '', // 1000건 초과로 인한 미등록건
          list: []
        }
      }
    }
  },
  created() {
    this.brandId = this.$route.params.brandId
  },
  mounted() {},
  computed: {},
  methods: {
    fileDonwload() {
      let params = {
        fileName: '발신번호_대량등록_샘플.xlsx',
        fileNo: 0
      }
      downloadFileDirect(params)
        .then(() => {
          this.sampleDownCheckFlag = true
        })
        .catch(() => {
          this.$alertMsg('파일 다운로드 시 오류가 발생했습니다.')
          this.sampleDownCheckFlag = false
        })
    },
    goCallingNumberManagement() {
      this.$router.push({
        name: 'CallingNumberManagement',
        params: { brandId: this.brandId }
      })
    },

    // 취소 버튼
    cancelApply() {
      this.$confirmMsg('발신번호 등록을 취소하시겠습니까?', '타이틀', '확인', '취소')
        .then(res => {
          this.$router
            .push({
              name: 'CallingNumberManagement',
              params: { brandId: this.brandId }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
        })
        .catch(res => {})
    },

    // 승인요청
    arpprovApply() {
      if (!this.validationSearch()) {
        return false
      }

      this.$confirmMsg('운영자 승인이 완료되면 발신번호를 사용할 수 있습니다. 발신번호를 등록하시겠습니까?', '타이틀', '확인', '취소')
        .then(res => {
          let formData = new FormData()
          formData.append('rcsCertiFile', this.regCertiFileList[0])
          formData.append('excelFile', this.regExcelFileList[0])

          updateQuantityRegistration(formData, this.brandId)
            .then(res => {
              if (res.code === '20000000') {
                this.popupObj.visible = true
                this.popupObj.excelUploadResult.totalCount = res.result.totalCount
                this.popupObj.excelUploadResult.successCount = res.result.successCount
                this.popupObj.excelUploadResult.etcFailCount = res.result.etcFailCount
                this.popupObj.excelUploadResult.dupFailCount = res.result.dupFailCount
                this.popupObj.excelUploadResult.duplicateCount = res.result.duplicateCount
                this.popupObj.excelUploadResult.passesdFailCount = res.result.passesdFailCount
                this.popupObj.excelUploadResult.list = res.result.list
              }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
        })
        .catch(res => {})
    },

    // 승인요청 시 validation 확인
    validationSearch() {
      if (jglib.isEmpty(this.regCertiFileName)) {
        this.$alertMsg('통신서비스 가입증명원을<br> 업로드 해 주세요.')
        return false
      } else if (jglib.isEmpty(this.regExcelFileName)) {
        this.$alertMsg('엑셀파일을 업로드 해 주세요.')
        return false
      }
      return true
    },
    onFileregCertiFile(file, fileList) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'jpeg', 'png', 'pdf', 'tiff', 'zip'], 20)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        this.doRemoveregCertiFile()
        this.regCertiFileList.push(files)
        this.regCertiFileName = file.raw.name
        this.regCertiFileYn = true
      }
    },

    onFileregExcelFile(file, fileList) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['xls', 'xlsx'], 5)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        this.doRemoveregExcelFile()
        this.regExcelFileList.push(files)
        this.regExcelFileName = file.raw.name
        this.regExcelFileYn = true
      }
    },
    doRemoveregCertiFile() {
      this.regCertiFileList = []
      this.regCertiFileName = ''
      this.regCertiFileYn = false
    },
    removeregCertiFile(file, fileList) {
      this.$confirmMsg(
        `${this.regCertiFileName} 파일을 삭제 하시겠습니까?`,
        '타이틀',
        '확인',
        '취소'
      )
        .then(res => {
          this.doRemoveregCertiFile()
        })
        .catch(res => {
          this.regCertiFileYn = true
        })
    },
    doRemoveregExcelFile() {
      this.regExcelFileList = []
      this.regExcelFileName = ''
      this.regExcelFileYn = false
    },
    removeregExcelFile(file, fileList) {
      this.$confirmMsg(
        `${this.regExcelFileName} 파일을 삭제 하시겠습니까?`,
        '타이틀',
        '확인',
        '취소'
      )
        .then(res => {
          this.doRemoveregExcelFile()
        })
        .catch(res => {
          this.regExcelFileYn = true
        })
    },

    openExcelUploadResultPopup() {
      this.popupObj.visible = true
    },
    uploadErrorListDownload() {
      this.popupObj.visible = true
    },
    handleChange(file, fileList) {
      this.uploadedList = fileList
      if (fileList.length === 2) {
        let rcsCertiFile = fileList[0].raw
        let excelFile = fileList[1].raw
        let formData = new FormData()
        formData.append('rcsCertiFile', rcsCertiFile)
        formData.append('excelFile', excelFile)
        chatbotUploadResult(this.brandId, formData).then(res => {
          this.popupObj.excelUploadResult = res.result
          this.openExcelUploadResultPopup()
        })
      }
    },
    del(index) {
      this.uploadedList.splice(index, 1)
    }
  }
}
</script>
