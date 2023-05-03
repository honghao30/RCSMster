<template>
  <section class="section mar_b0">
    <section class="sec_form">
      <!-- 발신번호 반려 -->
      <div class="title_area inline">
        <h3 class="h3_title">{{approvaInfoData.aprvRetNm}}</h3>
        <span class="h3_desc" style="margin:8px 0 0 0;">승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</span>
      </div>
      <table class="tbl_row_type">
        <caption>
          <strong>단방향 대화방 등록</strong>
          <p>대화방 명, 발신번호, 발신번호 인증</p>
        </caption>
        <colgroup>
          <col style="width:165px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              대화방 명
              <span class="require">*</span>
            </th>
            <td>
              <span style="width:50%" class="custom_input">
                <input type="text" ref="subTitle" @input="e => subTitle = e.target.value" v-model.trim="subTitle" maxlength="20" placeholder="RCS 메시지 발송 시 고객에게 표시되는 이름으로 신중하게 작성 해주세요.">
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">
              발신번호
              <span class="require">*</span>
            </th>
            <td>{{approvaInfoData.mdn}}</td>
          </tr>
          <tr>
            <th scope="row">
              대표번호<br>문자수신서비스
            </th>
            <td class="input_txt_wrap">
              <span class="custom_checkbox">
                <input type="checkbox" id="rcsR" true-value="0" false-value="1" v-model="rcsReply">
                <label for="rcsR">사용</label>
              </span>
              <div class="input_txt_area">
                대표번호문자수신서비스를 현재 사용하고 계실 경우 반드시 해당 정보를 체크해 주셔야 합니다.
                <a href="javascript:void(0);" class="btn_info"></a>
                <div class="info_txt_box">
                  <span class="info_txt_con">
                    ※ 대표번호문자수신서비스(MO) : 휴대폰 메시지함에서 기업의 대표번호로 문자를 보낼 경우 해당 메시지를 기업의 서버에서 수신할 수 있도록 제공하는 대표번호 부가 서비스
                  </span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              발신번호 인증
              <span class="require">*</span>
            </th>
            <td>
              <p class="text_black mar_b20">
                입력한 발신번호와 통신서비스 가입증명원의 전화번호가 일치해야 발신번호 등록이 가능하며<br>
                <span class="text_error" style="font-weight: bold;">최근 1개월 이내 발급된 서류로 제출해주세요.</span><br>
                ※ 파일이 여러 개인 경우, zip 파일로 압축하여 등록해주세요.
              </p>
              <div class="box_add_file inline">
                <el-upload action :on-change="onFileregCertiFile" class="i_block" :file-list="regCertiFileList" :auto-upload="false">
                  <a href="javascript:void(0);" size="small" type="primary" class="btn sml bd_black">파일선택</a>
                </el-upload>
                <span class="text_desc" v-if="!regCertiFileYn">파일형식 : jpg, png, pdf, tiff, zip (최대20MB)</span>
                <span class="text_desc add_file" v-if="regCertiFileYn" style="max-width: 900px;">
                  {{ this.regCertiFileName }}
                  <a href="javascript:void(0);" class="btn_delete" @click="removeregCertiFile">
                    <span>삭제</span>
                  </a>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="sec_form">
      <div class="title_area">
        <h3 class="h3_title">승인결과</h3>
      </div>
      <table class="tbl_row_type">
        <caption>
          <strong>승인결과</strong>
          <p>반려</p>
        </caption>
        <colgroup>
          <col style="width:165px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <th scope="row">{{approvaInfoData.aprvRetNm}}</th>
          <td>{{approvaInfoData.aprvDt}} &nbsp;&nbsp;{{approvaInfoData.aprvRetDescr}}</td>
        </tbody>
      </table>
      <!-- 2019.09.19 버튼 색상  bd_blue(목록), blue(삭제), black(승인요청) 으로 수정 -->
      <div class="btn_wrap center mar_t40">
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="goCallingNumberManagement">
          <span>목록</span>
        </a>
        <a
          href="javascript:void(0);"
          class="btn mid blue"
          :disabled="this.defMdnYn === 'Y'"
          @click="deleteApproval"
        >
          <span>삭제</span>
        </a>
        <a href="javascript:void(0);" class="btn mid black" @click="arpprovApply">
          <span>승인요청</span>
        </a>
      </div>
    </section>
  </section>
</template>

<script>
import {
  deleteApproval,
  updateCallingNumberManagement
} from '@/api/service/callingNumberManagement'
export default {
  name: 'RetrieveReject',
  props: {
    approvaInfoData: {
      type: Object
    }
  },
  data() {
    return {
      subTitle: '',
      mdn: '',
      rcsReply: '1',
      userCd: '',
      regCertiFileName: '',
      regCertiFileYn: true,
      regCertiFileListDelYn: 'N',
      overlapFlag: '',
      regCertiFile: [],
      regCertiFileList: []
    }
  },
  created() {
    this.subTitle = this.approvaInfoData.subTitle
    this.mdn = this.approvaInfoData.mdn
    this.rcsReply = this.approvaInfoData.rcsReply
    this.chatbotId = this.approvaInfoData.chatbotId
    this.brandId = this.approvaInfoData.brandId
    this.defMdnYn = this.approvaInfoData.defMdnYn
    this.regCertiFileName = this.approvaInfoData.fileName
    this.userCd = this.$store.state.user.userCd
  },
  mounted() {},
  computed: {},
  methods: {
    // 승인요청
    arpprovApply() {
      if (!this.validationSearch()) {
        return false
      }
      this.$confirmMsg(
        '운영자 승인이 완료되면 발신번호를 사용할 수 있습니다. 발신번호를 등록하시겠습니까?',
        '타이틀',
        '확인',
        '취소'
      )
        .then(res => {
          let data = {
            subTitle: this.subTitle,
            chatbotId: this.chatbotId,
            rcsReply: this.rcsReply,
            action: 'APRV_MOD'
          }
          let regCertiFileId = {
            subTitle: this.subTitle,
            chatbotId: this.chatbotId,
            rcsReply: this.rcsReply,
            regCertiFileIdOld: this.approvaInfoData.regCertiFileId,
            action: 'APRV_MOD'
          }

          let formData = new FormData()
          if (this.regCertiFileList.length === 0) {
            formData.append('data', JSON.stringify(regCertiFileId))
            formData.append('rcsCertiFile', this.regCertiFileList[0])
          } else {
            formData.append('data', JSON.stringify(data))
            formData.append('rcsCertiFile', this.regCertiFileList[0])
          }

          updateCallingNumberManagement(formData, data, this.brandId)
            .then(res => {
              if (res.code === '20000000') {
                this.$router.push({
                  name: 'CallingNumberManagement',
                  params: { brandId: this.brandId }
                })
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
      if (jglib.isEmpty(this.subTitle)) {
        this.$alertMsg('대화방 명을 입력해 주세요.')
        this.$refs.subTitle.focus()
        return false
      } else if (jglib.isEmpty(this.regCertiFileName)) {
        this.$alertMsg('통신서비스 가입증명원을<br> 업로드 해 주세요.')
        return false
      }
      return true
    },

    // 삭제 API 호출
    deleteApproval() {
      let data = {
        chatbotId: this.chatbotId
      }
      this.$confirmMsg(
        '발신번호 등록을 삭제하시겠습니까?',
        '타이틀',
        '확인',
        '취소'
      )
        .then(res => {
          deleteApproval(data, this.brandId)
            .then(res => {
              if (res.code === '20000000') {
                this.$router.push({
                  name: 'CallingNumberManagement',
                  params: { brandId: this.brandId }
                })
              }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
        })
        .catch(res => {})
    },

    // 발신번호관리 리스트 화면으로 이동
    goCallingNumberManagement() {
      this.$router.push({
        name: 'CallingNumberManagement',
        params: { brandId: this.brandId }
      })
    },
    onFileregCertiFile(file, fileList) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'jpeg', 'png', 'pdf', 'tiff', 'zip'], 20)
      if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else {
        this.doRemoveregCertiFile()
        this.regCertiFileList.push(files)
        this.regCertiFileName = file.raw.name
        this.regCertiFileYn = true
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
    }
  }
}
</script>
