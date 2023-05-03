<template>
  <section class="section mar_b0">
    <section class="sec_form">
      <!-- 발신번호 승인 완료 -->
      <div class="title_area inline mar_b20">
        <h3 class="h3_title">{{approvaInfoData.aprvRetNm}}</h3>
      </div>
      <table class="tbl_row_type">
        <caption>
          <strong>단방향 대화방 등록</strong>
          <p>대화방 명, 발신번호</p>
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
                <input type="text" v-model.trim="subTitle" ref="subTitle" placeholder="RCS 메시지 발송 시 고객에게 표시되는 이름으로 신중하게 작성 해주세요." maxlength="20">
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">발신번호</th>
            <td>{{approvaInfoData.mdn}}</td>
          </tr>
          <tr>
            <th scope="row">대표번호<br>문자수신서비스</th>
            <td class="input_txt_wrap">
              <span class="custom_checkbox">
                <input type="checkbox" id="rcsReply" true-value="0" false-value="1" v-model="rcsReply">
                <label for="rcsReply">사용</label>
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
        </tbody>
      </table>
    </section>
    <section class="sec_form">
      <div class="title_area mar_b20">
        <h3 class="h3_title">승인결과</h3>
      </div>
      <table class="tbl_row_type">
        <caption>
          <strong>승인결과</strong>
          <p>승인완료</p>
        </caption>
        <colgroup>
          <col style="width:155px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <th scope="row">{{approvaInfoData.aprvRetNm}}</th>
          <td>{{approvaInfoData.aprvDt}}</td>
        </tbody>
      </table>
      <!-- 2019.09.19 버튼 색상  bd_blue(목록), blue(삭제,저장) 으로 수정 -->
      <div class="btn_wrap center mar_t40">
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="goCallingNumberManagement">
          <span>목록</span>
        </a>
        <a
          href="javascript:void(0);"
          class="btn mid bd_blue"
          v-if="this.defMdnYn === 'N' && this.twowayYn === 'N'"
          disabled
          @click="deleteApproval"
        >
          <span>삭제</span>
        </a>
        <a href="javascript:void(0);" class="btn mid blue" v-if="this.twowayYn === 'N'" @click="saveApproval">
          <span>저장</span>
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
  name: 'RetrieveApprovalCompletion',
  data() {
    return {
      subTitle: '', // 발신번호명
      rcsReply: '1',
      chatbotId: '', // chatbot번호
      regCertiFileList: [],
      twowayYn: ''
    }
  },
  props: {
    approvaInfoData: {
      type: Object
    }
  },
  components: {},
  created() {
    // 발신번호명, chatbot번호, 대표번호여부
    this.subTitle = this.approvaInfoData.subTitle
    this.chatbotId = this.approvaInfoData.chatbotId
    this.defMdnYn = this.approvaInfoData.defMdnYn
    this.brandId = this.approvaInfoData.brandId
    this.rcsReply = this.approvaInfoData.rcsReply
    this.twowayYn = this.approvaInfoData.twowayYn
  },
  mounted() {},
  computed: {},
  methods: {
    // 저장 API 호출
    saveApproval() {
      if (!this.validationSearch()) {
        return false
      }
      this.$confirmMsg('수정하시겠습니까?', '타이틀', '확인', '취소')
        .then(res => {
          let data = {
            subTitle: this.subTitle,
            rcsReply: this.rcsReply,
            chatbotId: this.chatbotId,
            regCertiFileIdOld: this.approvaInfoData.regCertiFileId,
            action: 'OK_MOD'
          }

          let formData = new FormData()
          if (this.regCertiFileList.length === 0) {
            formData.append('data', JSON.stringify(data))
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

    // 저장 시 validation 확인
    validationSearch() {
      if (jglib.isEmpty(this.subTitle)) {
        this.$alertMsg('발신번호명을 입력해주세요.')
        this.$refs.subTitle.focus()
        return false
      }
      return true
    },
    // 삭제 API 호출
    deleteApproval() {
      let data = {
        chatbotId: this.chatbotId
      }
      this.$confirmMsg('등록된 발신번호를 삭제하시겠습니까?', '타이틀', '확인', '취소')
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

    // 발신번호관리 리스트 목록으로 이동
    goCallingNumberManagement() {
      this.$router.push({
        name: 'CallingNumberManagement',
        params: { brandId: this.brandId }
      })
    }
  }
}
</script>
