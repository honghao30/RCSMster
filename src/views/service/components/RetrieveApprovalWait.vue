<template>
  <section class="section mar_b0">
    <section class="sec_form">
      <!-- 발신번호 승인대기, 검수시작, 검수완료 -->
      <div class="title_area inline mar_b20">
        <h3 class="h3_title">{{ getDisplayAprvNm(approvaInfoData) }}</h3>
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
            <th scope="row">대화방 명</th>
            <td>{{approvaInfoData.subTitle}}</td>
          </tr>
          <tr>
            <th scope="row">발신번호</th>
            <td>{{approvaInfoData.mdn}}</td>
          </tr>
          <tr>
            <th scope="row">대표번호<br>문자수신서비스</th>
            <td>
              <span class="custom_checkbox">
                <input type="checkbox" id="rcsReply" true-value="0" false-value="1" v-model="approvaInfoData.rcsReply"
                      :disabled="approvaInfoData.aprvRet === 'WAITING' || approvaInfoData.aprvRet === 'INSPECTED' || approvaInfoData.aprvRet === 'INSPECTING'">
                <label for="rcsReply">사용</label>
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">발신번호 인증</th>
            <td>{{approvaInfoData.fileName}}</td>
          </tr>
        </tbody>
      </table>
      <!-- 2019.09.19 버튼 색상  bd_blue 로 수정 -->
      <div class="btn_wrap center mar_t40">
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="goCallingNumberManagement">
          <span>목록</span>
        </a>
      </div>
    </section>
  </section>
</template>

<script>
import { downloadFileByFileId } from '@/api/common/code'
import { getDisplayAprvNm } from '@/utils/string'
export default {
  name: 'RetrieveApprovalWait',
  components: {},
  props: {
    approvaInfoData: {
      type: Object
    }
  },
  data() {
    return {
      brandId: ''
    }
  },
  created() {
    this.fileId = this.approvaInfoData.regCertiFileId
    this.fileNo = this.approvaInfoData.fileNo
    this.brandId = this.approvaInfoData.brandId
  },
  mounted() {},
  computed: {},
  methods: {
    getDisplayAprvNm,
    fileDonwload() {
      let params = {
        fileId: this.fileId,
        fileNo: this.fileNo
      }

      downloadFileByFileId(params)
        .then(res => {})
        .catch(res => {})
    },
    goCallingNumberManagement() {
      this.$router.push({
        name: 'CallingNumberManagement',
        params: { brandId: this.brandId }
      })
    }
  }
}
</script>
