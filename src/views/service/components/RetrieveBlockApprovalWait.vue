<template>
  <section class="sec_form">
    <!-- 2019.09.17 class inline 추가 -->
    <!-- 2109.10.08 title 수정 -->
    <div class="title_area inline mar_b20">
      <h3 class="h3_title">승인대기</h3>
      <span class="h3_desc" style="margin:8px 0 0 0;">승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</span>
    </div>
    <table class="tbl_row_type">
      <caption>
        <strong>단방향 대화방 상세</strong>
        <p>통신서비스 가입증명원, 엑셀등록</p>
      </caption>
      <colgroup>
        <col style="width:250px">
        <col style="width:auto">
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">통신서비스 가입증명원</th>
          <td>
            <!-- 2019.09.26 drag&drop 리스트 주석(추후삭제요망), 텍스트 추가-->
            <span>{{this.regCertiFileName}}</span>
          </td>
        </tr>
        <tr>
          <th scope="row">엑셀 등록</th>
          <td>
            <div class="upload_files_area col_11">
              <div class="upload_file_list">
                <ul>
                  <li>
                    <tr v-for="(item, index) in excelFileList" :key="index">
                      <span
                        class="text"
                      >{{item.mdn}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.subTitle}}</span>
                    </tr>
                  </li>
                </ul>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 2019.09.19 버튼 색상  bd_blue 로 수정 -->
    <div class="btn_wrap mar_t40 center full_width">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goCallingNumberManagement">
        <span>목록</span>
      </a>
    </div>
  </section>
</template>

<script>
import { retrieveQuantityRegistration } from '@/api/service/callingNumberManagement'
export default {
  name: 'RetrieveBlockApprovalWait',
  components: {},
  props: {
    approvaInfoData: {
      type: Object
    }
  },
  data() {
    return {
      brandId: '',
      massRegSeq: '',
      regCertiFileName: '',
      excelFileList: []
    }
  },
  created() {
    this.brandId = this.approvaInfoData.brandId
    this.massRegSeq = this.approvaInfoData.massRegSeq
    retrieveQuantityRegistration(this.brandId, this.massRegSeq)
      .then(res => {
        if (res.code === '20000000') {
          this.excelFileList = res.result.list
          this.regCertiFileName = res.result.info.fileName
        }
      })
      .catch(res => {
        this.$alertMsg(res.desc)
      })
  },
  mounted() {},
  computed: {},
  methods: {
    goCallingNumberManagement() {
      this.$router.push({
        name: 'CallingNumberManagement'
      })
    }
  }
}
</script>
