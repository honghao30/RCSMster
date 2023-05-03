<template>
  <div style="z-index: 500">
    <div tabindex="0" class="layer active">
      <div tabindex="0" class="layer_cont error">
        <div class="layer_head">
          <div class="search_wrap">
            <div class="cont_bundle center">
              <h4 class="h4_title regular">
                총
                <span class="red">{{ uploadResult.result.totalCount }}</span>개의 번호 중
                <span class="red">{{ uploadResult.result.successCount }}</span>개의 번호가 등록 되었습니다.
              </h4>
            </div>
          </div>
        </div>
        <div class="layer_body">
          <div class="layer_scroll">
            <div class="search_result">
              <div class="box_result_info">
                <ul class="bullet_list fs16">
                  <li>유효하지 않은 번호 : <span class="red">{{ uploadResult.result.etcFailCount }}</span>개</li>
                  <li>중복된 번호 : <span class="red">{{ uploadResult.result.dupFailCount }}</span>개</li>
                  <li>이미 등록된 발신번호 : <span class="red">{{ uploadResult.result.duplicateCount }}</span>개</li>
                  <li>등록 가능 수량 초과 발신번호 : <span class="red">{{ uploadResult.result.passesdFailCount }}</span>개</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="dv2023_messerror" v-if="hasError">
          확인을 클릭하면 승인요청 결과 파일을 내려 받습니다.
        </div>
        <div class="btn_wrap mar_t30 center">
          <a href="javascript:void(0);" class="btn sml black" @click="excelDownload">
            <span>확인</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import xlsx from '@/utils/excel'
let header = [
  { key: 'sendnum', name: '발신번호' },
  { key: 'sendnumNm', name: '발신번호명' },
  { key: 'errorDesc', name: '오류사유' }
]
export default {
  name: 'MassChatbotErrorPopup',
  props: {
    uploadResult: { type: Object }
  },
  computed: {
    hasError() { // 결과에 에러가 있는지 여부
      if (this.uploadResult.result.totalCount === this.uploadResult.result.successCount) return false
      else return true
    }
  },
  methods: {
    excelDownload() {
      if (this.uploadResult.result.totalCount === this.uploadResult.result.successCount) {
        this.$emit('goList')
      } else {
        let options = { header: header, dataOrder: 'header' }
        xlsx.export(this.uploadResult.result.list, '발신번호 오류내역.xlsx', options).then(() => {
          this.$emit('goList')
        })
      }
    }
  }
}
</script>
