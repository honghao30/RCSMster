<template>
  <div :style="`z-index: ${zIndex};`">
    <div tabindex="0" class="layer active">
      <div tabindex="0" class="layer_cont error">
        <div class="layer_head">
          <div class="search_wrap">
            <div class="cont_bundle center">
              <h4 class="h4_title regular">
                총
                <span class="red">{{ uploadResult.totalCount }}</span>개의 번호 중
                <span class="red">{{ uploadResult.successCount }}</span>개의 번호가 등록 되었습니다
              </h4>
            </div>
          </div>
        </div>
        <div class="layer_body">
          <div class="layer_scroll">
            <div class="search_result">
              <div class="box_result_info">
                <div class="cont_flex_bundle">
                  <h3 class="h3_title fs18">오류내역</h3>
                  <h4 class="h4_title">
                    <a href="javascript:void(0);" class="btn_down" @click="excelDownload">다운로드</a>
                  </h4>
                </div>
                <ul class="bullet_list fs16 mar_t20">
                  <li>유효하지 않은 제목/번호 : <span class="red">{{ uploadResult.etcFailCount }}</span>개</li>
                  <li>중복된 번호 : <span class="red">{{ uploadResult.dupFailCount }}</span>개</li>
                  <li>이미 등록된 발신번호: <span class="red">{{ uploadResult.duplicateCount }}</span>개</li>
                  <li>등록 가능 수량 초과 발신번호: <span class="red">{{ uploadResult.passesdFailCount }}</span>개</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="btn_wrap mar_t30 center">
          <a href="javascript:void(0);" class="btn sml black" @click="closePopup()">
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
  {
    key: 'sendnum',
    name: '발신번호'
  },
  {
    key: 'sendnumNm',
    name: '발신번호명'
  },
  {
    key: 'errorDesc',
    name: '오류사유'
  }
]

export default {
  name: 'index',
  components: {},
  props: {
    uploadResult: {
      type: Object,
      require: true
    },
    zIndex: {
      type: Number,
      require: false,
      default() {
        return 99999
      }
    },
    header: {
      type: Array
    },
    errorFileName: {
      type: String,
      default: '발신번호 오류내역.xlsx'
    }
  },
  data() {
    return {
      excel: {
        header: {},
        data: []
      }
    }
  },
  computed: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.excel.header = this.header ? this.header : header
      this.excel.data = this.uploadResult.list
    },
    excelDownload() {
      let options = {
        header: this.excel.header,
        dataOrder: 'header' // header, data, ['no', 'sendnum', 'errorDesc']
      }
      xlsx.export(this.excel.data, this.errorFileName, options).then(() => {
        // console.log('success download')
      })
    },
    closePopup(id) {
      this.$emit('update:visible', false)
      // this.$router.push('/service/dashboard')
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
