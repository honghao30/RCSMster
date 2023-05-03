<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <!-- 단방향 대화방 신규 등록 -->
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'발신번호 관리'"/>
      </div>
      <brand-top active="sendnum" :brandId="brandId"></brand-top>
      <div class="contents_wrap">
        <section class="sec_form">
          <div class="title_area mar_b10">
            <h3 class="h3_title">단방향 대화방 등록</h3>
            <ul class="bullet_list fs16">
              <li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li>
            </ul>
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
                  <div class="length_area">
                    <span style="width:50%" class="custom_input">
                      <input type="text" ref="subTitle" @input="e => subTitle = e.target.value" v-model.trim="subTitle" maxlength="20" placeholder="RCS 메시지 발송 시 고객에게 표시되는 이름으로 신중하게 작성 해주세요.">
                    </span>
                    <span class="length" v-if="subTitle.length === 0">(0/20자)</span>
                    <span class="length" v-if="subTitle.length !== 0">({{ subTitle.length }}/20자)</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  발신번호
                  <span class="require">*</span>
                </th>
                <td>
                  <span class="custom_input">
                    <input type="text" class="input_text" placeholder="'-'없이 입력" v-model.trim="mdn" ref="mdn" maxlength="12">
                  </span>
                  <a href="javascript:void(0);" class="btn sml bd_black" @click="overlapCheck">
                    <span>중복체크</span>
                  </a>
                  <span class="text_desc">※ 휴대폰번호 등록불가</span>
                </td>
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
                    <span class="text_desc add_file" v-if="regCertiFileYn" style="max-width: 900px">
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
          <div class="btn_wrap center mar_t40">
            <a href="javascript:void(0);" class="btn mid bd_blue" @click="cancelApply">
              <span>취소</span>
            </a>
            <a href="javascript:void(0);" class="btn mid blue" @click="saveValidation">
              <span>저장</span>
            </a>
            <a href="javascript:void(0);" class="btn mid black" @click="arpprovApply">
              <span>승인요청</span>
            </a>
          </div>
          <apply-confirm-popup v-if="visible" :visible.sync="visible" :msg="msg" @save="save" @apply="apply"/>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import {
  updateIndividualRegistration,
  updateOverlap
} from '@/api/service/callingNumberManagement'
import ApplyConfirmPopup from '@/components/popupSet/ApplyConfirmPopup'
import Breadcrumb from '@/components/global/Breadcrumb'

export default {
  name: 'IndividualRegistration',
  components: {
    BrandTop,
    ApplyConfirmPopup,
    Breadcrumb
  },
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
      rcsReply: '1',
      overlapCheckFlag: false,
      regCertiFileName: '',
      aprvRet: '',
      regCertiFileYn: false,
      regCertiFileListDelYn: 'N',
      visible: false,
      regCertiFile: [],
      regCertiFileList: [],
      msg: `저장은 작성하신 정보가 저장만 되는 기능입니다.<br>승인요청을 하셔야 심사 후 단방향 대화방을 이용하실 수 있습니다.`
    }
  },
  created() {
    this.brandId = this.$route.params.brandId
  },
  mounted() {},
  watch: {
    mdn() {
      this.mdn = this.mdn.replace(/[^0-9]/g, '')
    }
  },
  computed: {},
  methods: {
    // 저장버튼 validation 확인
    saveValidation() {
      if (!this.validationSearch()) {
        return false
      }

      if (!this.overlapCheckFlag) {
        this.$alertMsg('발신번호 중복체크를 진행 해 주세요.')
        this.$refs.mdn.focus()
        return false
      }
      this.visible = true
    },
    // 발신번호명 중복 체크
    overlapCheck() {
      if (!this.validationOverlap()) {
        return false
      }
      let params = {
        mdn: this.mdn
      }
      updateOverlap(params, this.brandId)
        .then(res => {
          if (res.code === '20000000') {
            this.$alertMsg('사용가능한 발신번호 입니다', '확인')
            this.overlapCheckFlag = true
          }
        })
        .catch(err => {
          if (err.code === '60000660') {
            this.$alertMsg('삭제 했던 발신번호는 다시 등록할 수 없습니다.', '확인')
          } else if (err.code === '60000011') {
            this.$alertMsg('이미 사용중인 발신번호 입니다.', '확인')
          } else {
            this.$alertMsg('이미 사용중인 발신번호 입니다.', '확인')
          }
          this.overlapCheckFlag = false
        })
    },

    // 승인요청
    arpprovApply() {
      if (!this.validationSearch()) {
        return false
      }

      if (!this.overlapCheckFlag) {
        this.$alertMsg('발신번호 중복체크를 진행 해 주세요.')
        this.$refs.mdn.focus()
        return false
      }

      this.$confirmMsg(
        '운영자 승인이 완료되면 단방향 대화방을 사용할 수 있습니다. 단방향 대화방을 등록하시겠습니까?',
        '타이틀',
        '확인',
        '취소'
      )
        .then(res => {
          let data = {
            subTitle: this.subTitle,
            mdn: this.mdn,
            rcsReply: this.rcsReply,
            action: 'APRV_NEW'
          }
          let formData = new FormData()
          formData.append('data', JSON.stringify(data))
          formData.append('rcsCertiFile', this.regCertiFileList[0])

          updateIndividualRegistration(formData, data, this.brandId)
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
      } else if (jglib.isEmpty(this.mdn)) {
        this.$alertMsg('발신번호를 입력해 주세요.')
        this.$refs.mdn.focus()
        return false
      } else if (jglib.isEmpty(this.regCertiFileName)) {
        this.$alertMsg('통신서비스 가입증명원을<br> 업로드 해 주세요.')
        return false
      }
      return true
    },

    // 발신번호 중복체크 시 validation 확인
    validationOverlap() {
      if (jglib.isEmpty(this.mdn)) {
        this.$alertMsg('발신번호를 입력해 주세요.')
        this.$refs.mdn.focus()
        return false
      }
      return true
    },

    // 삭제 API 호출
    deleteApply() {
      this.$confirmMsg(
        '단방향 대화방 등록을 삭제하시겠습니까?',
        '타이틀',
        '확인',
        '취소'
      )
        .then(res => {
          this.$router.push('/service/dashboard/')
        })
        .catch(res => {})
    },

    // 취소 버튼
    cancelApply() {
      this.$confirmMsg(
        '단방향 대화방 등록을 취소하시겠습니까?',
        '타이틀',
        '확인',
        '취소'
      )
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

    // 저장 버튼
    save() {
      if (!this.validationSearch()) {
        return false
      }

      if (!this.overlapCheckFlag) {
        this.$alertMsg('발신번호 중복체크를 진행 해 주세요.')
        this.$refs.mdn.focus()
        return false
      }

      let data = {
        subTitle: this.subTitle,
        mdn: this.mdn,
        rcsReply: this.rcsReply,
        action: 'SAVED_NEW'
      }

      let formData = new FormData()
      formData.append('data', JSON.stringify(data))
      formData.append('rcsCertiFile', this.regCertiFileList[0])

      updateIndividualRegistration(formData, data, this.brandId)
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
    },

    // 승인요청 버튼
    apply() {
      if (!this.validationSearch()) {
        return false
      }

      if (!this.overlapCheckFlag) {
        this.$alertMsg('발신번호 중복체크를 진행 해 주세요.')
        this.$refs.mdn.focus()
        return false
      }

      this.$confirmMsg(
        '운영자 승인이 완료되면 단방향 대화방을 사용할 수 있습니다. 단방향 대화방을 등록하시겠습니까?',
        '타이틀',
        '확인',
        '취소'
      )
        .then(res => {
          let data = {
            subTitle: this.subTitle,
            mdn: this.mdn,
            rcsReply: this.rcsReply,
            action: 'APRV_NEW'
          }
          let formData = new FormData()
          formData.append('data', JSON.stringify(data))
          formData.append('rcsCertiFile', this.regCertiFileList[0])

          updateIndividualRegistration(formData, data, this.brandId)
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
    // 숫자만 입력
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    }
  }
}
</script>
