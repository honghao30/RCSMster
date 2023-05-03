<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'템플릿 관리'"/>
      </div>
      <brand-top active="template" :brandId="formData.brandId"></brand-top>
      <div class="contents_wrap">
        <section class="sec_form">
          <div class="title_area">
            <h3 class="h3_title">템플릿 등록</h3>
            <ul class="bullet_list fs16">
              <li>텍스트 템플릿만 대량으로 등록할 수 있습니다.</li>
              <li>대량 등록한 템플릿도 건별로 승인이 진행됩니다. (최대 100건까지 등록 가능)</li>
              <li>샘플파일을 다운로드 받아 양식에 맞게 템플릿 내용을 작성하여 업로드 해주시기 바랍니다.</li>
              <li>업로드한 파일 유효성 검사 후 유효한 건만 승인요청 처리됩니다.</li>
              <li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li>
            </ul>
          </div>
          <table class="tbl_row_type">
            <caption>
              <strong>템플릿 대량등록</strong>
              <p>템플릿 속성, 엑셀등록</p>
            </caption>
            <colgroup>
              <col style="width:155px">
              <col style="width:auto">
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  테마
                  <span class="require">*</span>
                </th>
                <td>
                  <!-- 타이틀 자유형 일때는 서술만 선택 가능하게 -->
                  <span class="custom_radio checked">
                    <input type="radio" name="thema" id="thema01" v-model="formData.themaType" value="THEME">
                    <label for="thema01">
                      <span>타이틀 자유형</span>
                    </label>
                  </span>
                  <span class="custom_radio checked">
                    <input type="radio" name="thema" id="thema02" v-model="formData.themaType" value="LEGACY">
                    <label for="thema02">
                      <span>타이틀 선택형</span>
                    </label>
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  템플릿 속성
                  <span class="require">*</span>
                </th>
                <td>
                  <span class="custom_radio checked">
                    <input type="radio" name="template" id="template01" v-model="formData.cardType" value="D">
                    <label for="template01">
                      <span>서술(description)</span>
                    </label>
                  </span>
                  <span class="custom_radio checked">
                    <input type="radio" name="template" id="template02" v-model="formData.cardType" value="C">
                    <label for="template02">
                      <span>스타일(cell)</span>
                    </label>
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  엑셀 등록
                  <span class="require">*</span>
                </th>
                <td>
                  <div class="box_add_file">
                    <el-upload action :on-change="handleChange" class="i_block" :auto-upload="false" ref="upload">
                      <a href="javascript:void(0);" size="small" type="primary" class="btn sml bd_black">파일선택</a>
                    </el-upload>
                    <a href="javascript:void(0);" class="btn_link mar_l12" @click="downloadSampleFile">
                      <span>샘플파일 다운로드</span>
                    </a>
                    <span class="text_desc add_file" v-show="!excelFile">파일형식 : xls, xlsx (최대 5MB)</span>
                    <span class="text_desc add_file" v-show="excelFile">
                      {{ existExcelFileName }}
                      <a href="javascript:void(0);" class="btn_delete" @click="deleteExcelFile">
                        <span>삭제</span>
                      </a>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 2019.09.19 버튼 색상  bd_blue(취소) 으로 수정 -->
          <div class="btn_wrap center mar_t40">
            <a href="javascript:void(0);" class="btn mid bd_blue" @click="cancel"><span>취소</span></a>
            <a href="javascript:void(0);" class="btn mid blue" @click="applyData"><span>승인요청</span></a>
          </div>
        </section>
      </div>
    </article>
    <!-- 엑셀 업로드 결과 팝업 -->
    <excel-upload-result-popup
      v-if="view.visibleUploadResultPopup"
      :visible.sync="view.visibleUploadResultPopup"
      :uploadResult="view.uploadResult"
      @closePopup="closeUploadResultPopup"
    ></excel-upload-result-popup>
  </div>
</template>
<script>
import BrandTop from '@/views/service/components/BrandTop'
import Breadcrumb from '@/components/global/Breadcrumb'
import { saveTemplateBulk } from '@/api/service/template'
import ExcelUploadResultPopup from '@/components/excel/TemplateResultPopup'
import { downloadFileDirect } from '@/api/common/code'

export default {
  name: 'CreateTemplateBulk',
  components: {
    BrandTop,
    Breadcrumb,
    ExcelUploadResultPopup
  },
  data() {
    return {
      formData: {
        brandId: '',
        themaType: 'THEME',
        cardType: 'D'
      },
      excelFile: null,
      view: {
        visibleUploadResultPopup: false,
        uploadResult: {}
      }
    }
  },
  computed: {
    existExcelFileName() {
      return this.excelFile ? this.excelFile.name : ''
    }
  },
  watch: {},
  created() {
    this.formData.brandId = this.$route.params.brandId
  },
  mounted() {},
  methods: {
    handleChange(file, fileList) {
      let checkResult = jglib.checkFileData(file.raw, ['xls', 'xlsx'], 5)
      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
        return false
      }
      this.excelFile = file.raw
    },
    deleteExcelFile() {
      this.$refs.upload.clearFiles()
      this.excelFile = null
    },
    cancel() {
      this.$confirmMsg('취소 하시겠습니까?').then(() => {
        this.$router.push({
          name: 'TemplateList',
          params: { brandId: this.formData.brandId }
        })
      })
    },
    applyData() {
      if (this.excelFile === null) {
        this.$alertMsg('엑셀파일을 업로드 해 주세요.')
        return false
      }
      this.$confirmMsg(
        '템플릿 대량 등록 시 올바른 데이터만 템플릿 리스트에 추가됩니다. 승인요청 하시겠습니까?'
      )
        .then(() => {
          let formData = new FormData()
          formData.append('data', JSON.stringify(this.formData))
          formData.append('excelFile', this.excelFile)
          saveTemplateBulk(this.formData.brandId, formData)
            .then(res => {
              this.view.uploadResult = res.result
              this.view.visibleUploadResultPopup = true
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        })
        .catch(() => {})
    },
    downloadSampleFile() {
      if (this.formData.themaType === 'LEGACY') {
        if (this.formData.cardType === 'C') {
          let params = {
            fileName: '템플릿 대량등록 엑셀_cell.xlsx',
            fileNo: 1
          }
          downloadFileDirect(params)
            .then(() => {})
            .catch(() => {
              this.$alertMsg('파일 다운로드 시 오류가 발생했습니다.')
            })
        } else {
          let params = {
            fileName: '템플릿 대량등록 엑셀_description.xlsx',
            fileNo: 2
          }
          downloadFileDirect(params)
            .then(() => {})
            .catch(() => {
              this.$alertMsg('파일 다운로드 시 오류가 발생했습니다.')
            })
        }
      } else {
        if (this.formData.cardType === 'C') {
          let params = {
            fileName: '템플릿(타이틀 자유형) 대량등록 엑셀_cell.xlsx',
            fileNo: 4
          }
          downloadFileDirect(params)
            .then(() => {})
            .catch(() => {
              this.$alertMsg('파일 다운로드 시 오류가 발생했습니다.')
            })
        } else {
          let params = {
            fileName: '템플릿(타이틀 자유형) 대량등록 엑셀_description.xlsx',
            fileNo: 3
          }
          downloadFileDirect(params)
            .then(() => {})
            .catch(() => {
              this.$alertMsg('파일 다운로드 시 오류가 발생했습니다.')
            })
        }
      }
    },
    closeUploadResultPopup() {
      this.$router.push(`/service/brand/${this.formData.brandId}/template`)
    }
  }
}
</script>
<style>
</style>
