<template>
  <div>
    <table class="tbl_row_type">
      <caption>
        <strong>기업정보</strong>
        <p>사업자등록번호, 업체명, 권한 선택, 사업자등록증</p>
      </caption>
      <colgroup>
        <col style="width:215px">
        <col style="width:440px">
        <col style="width:215px">
        <col style="width:auto">
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">
            사업자등록번호
            <span class="require">*</span>
          </th>
          <td>{{ formData.corpRegiNum | prettyCorpRegNum }}</td>
          <th scope="row">
            업체명
            <span class="require">*</span>
          </th>
          <td>{{ formData.name }}</td>
        </tr>
        <tr>
          <th scope="row">
            권한 선택
            <span class="require">*</span>
          </th>
          <td colspan="3">
            <div class="radio_wrap">
              <div class="box_authority">
                <div class="custom_radio">
                  <input type="radio" id="corpAdmY" value="Y" v-model="corpAdmYn">
                  <label for="corpAdmY">
                    <span>관리자 권한</span>
                    <ul class="bullet_list">
                      <li>브랜드를 개설할 수 있습니다.</li>
                      <li>브랜드 부관리자와 대행사를 지정하여 업무를 위임할 수 있습니다.</li>
                      <li class="blue">사업자등록증 제출이 필요하며, 운영자 심사 후 가입이 완료됩니다.</li>
                    </ul>
                  </label>
                </div>
                <div class="custom_radio">
                  <input type="radio" id="corpAdmN" value="N" v-model="corpAdmYn">
                  <label for="corpAdmN">
                    <span>담당자 권한</span>
                    <ul class="bullet_list">
                      <li>브랜드를 직접 개설할 수 없습니다.</li>
                      <li>브랜드 부관리자로 지정받아 서비스를 운영할 수 있습니다.</li>
                      <li class="blue">운영자 승인 없이 즉시 가입 완료됩니다.</li>
                    </ul>
                  </label>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="isAdminY">
          <th scope="row">
            사업자등록증
            <span class="require">*</span>
          </th>
          <td colspan="3">
            <div class="box_add_file inline">
              <el-upload action class="i_block" :auto-upload="false" :on-change="handleChange" ref="corpRegFileUpload">
                <a href="javascript:void(0);" type="primary" class="btn sml bd_black">파일선택</a>
              </el-upload>
              <span v-if="!isUploadedRegFile" class="text_desc add_file">파일형식 : jpg, png, pdf, tiff (최대 5MB)</span>
              <span v-if="isUploadedRegFile" class="text_desc add_file" style="max-width: 800px">
                {{ uploadedRegFileName }}
                <a href="javascript:void(0);" class="btn_delete" @click="deleteUploadedRegFile">
                  <span>삭제</span>
                </a>
              </span>
            </div>
            <p class="text_error" style="font-weight: bold;">
              * 사업자등록증 이외 사업자등록증명 또는 고유번호증으로 대체 가능합니다.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'JoinCorpInfoType2',
  props: {
    corpData: {
      type: Object
    }
  },
  data() {
    return {
      formData: {
        corpRegiNum: '',
        name: '',
        corpAdmYn: '',
        corpId: ''
      },
      corpRegFile: {},
      corpAdmYn: 'Y'
    }
  },
  filters: {
    prettyCorpRegNum(value) {
      return value.length > 0 ? jglib.corpRegiNumConverter(value) : ''
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  computed: {
    isAdminY() {
      return this.corpAdmYn === 'Y'
    },
    isUploadedRegFile() {
      return !jglib.isEmpty(this.corpRegFile)
    },
    uploadedRegFileName() {
      return jglib.isEmpty(this.corpRegFile) ? '' : this.corpRegFile.name
    }
  },
  watch: {
    corpData: {
      deep: true,
      handler() {
        this.init()
      }
    },
    corpAdmYn(value) {
      this.formData.corpAdmYn = value
    }
  },
  methods: {
    init() {
      this.formData = this.corpData
      this.formData.corpAdmYn = 'Y'
    },
    handleChange(file, fileList) {
      let checkResult = jglib.checkFileData(file.raw, ['jpg', 'png', 'pdf', 'tiff'], 5)
      if (checkResult.code !== 'ok') {
        fileList.pop(file)
        this.$alertMsg(checkResult.message)
      } else {
        this.corpRegFile = file
      }
    },
    deleteUploadedRegFile() {
      this.corpRegFile = {}
    },
    getCorpData() {
      if (!this.validateCorpData()) {
        return false
      }

      let corpData = {
        corpData: this.formData
      }

      if (this.isAdminY) {
        corpData['corpRegFile'] = this.corpRegFile.raw
      }

      return corpData
    },
    validateCorpData() {
      if (this.isAdminY && jglib.isEmpty(this.corpRegFile)) {
        this.$alertMsg('사업자등록증을 업로드해 주세요.').then(confirm => {
          this.$refs.corpRegFileUpload.$el.children[0].focus()
        })
        return false
      }

      return true
    }
  }
}
</script>

<style>
</style>
