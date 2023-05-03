<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'템플릿 관리'"/>
      </div>
      <brand-top active="template" :brandId="brandId"></brand-top>
      <div class="dashboard_wrap">
        <section class="section">
          <div class="title_area mar_b20 inline">
            <h3 class="h3_title">{{ getDisplayAprvNm(templateData) }}</h3>
            <!-- <span class="h3_desc" v-if="aprvRet !== 'OK'">승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</span> -->
            <div><ul class="bullet_list fs16"><li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li></ul></div>
          </div>
          <div class="rcs_bundle_wrap">
            <template-write
              v-if="isWriteMode"
              :templateData.sync="templateData"
              :tplStatus="tplStatus"
              :jsonData.sync="fmtStrData"
              :brandId="brandId"
            ></template-write>
            <template-view v-if="!isWriteMode" :templateData="templateData" :tplStatus="tplStatus" :brandId="brandId"></template-view>
            <!-- 에뮬레이터 -->
            <template-emulator :cardType="cardType" :jsonData.sync="computedJsonData"></template-emulator>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>
<script>
import BrandTop from '@/views/service/components/BrandTop'
import TemplateWrite from '@/views/service/components/TemplateWrite'
import TemplateView from '@/views/service/components/TemplateView'
import TemplateEmulator from '@/views/service/components/TemplateEmulator'
import { retrieveTemplateDetail } from '@/api/service/template'
import Breadcrumb from '@/components/global/Breadcrumb'
import messageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'
import { getDisplayAprvNm } from '@/utils/string'

export default {
  name: 'TemplateDetail',
  props: {},
  components: {
    BrandTop,
    TemplateWrite,
    TemplateView,
    TemplateEmulator,
    Breadcrumb
  },
  data() {
    return {
      brandId: '',
      tplId: '',
      templateData: {},
      fmtStrData: {}
    }
  },
  computed: {
    tplStatus() {
      return {
        status: this.templateData.status,
        aprvRet: this.templateData.aprvRet,
        activeYn: this.templateData.activeYn
      }
    },
    aprvRet() {
      return this.templateData.aprvRet
    },
    cardType() {
      return this.templateData.cardType
    },
    isWriteMode() {
      return (
        this.templateData.aprvRet === 'SAVED' ||
        this.templateData.aprvRet === 'REJECTED'
      )
    },
    computedJsonData() {
      // Description 인 경우 내용 replace해서 Emulator에 보여준다
      let jsonData = this.fmtStrData
      if (this.templateData.cardType === 'D' && this.templateData.inputText) {
        let inputText = this.templateData.inputText.replace(/(?:\r\n|\t|\n)/g, '<br/>').replace(/["\\]/g, '\\$&')
        // .replace(/\(|\)|on.*\(|eval\(|javascript|&lt|&gt|&#x0003C|&#60|&#x0003E|&#62/gi,'')

        let jsonDataStr = JSON.stringify(this.fmtStrData)
        jsonDataStr = jsonDataStr.split('{{description}}').join(inputText)
        jsonData = JSON.parse(jsonDataStr)
      }
      return jsonData
    }
  },
  watch: {
    jsonData() {
    }
  },
  created() {
    this.brandId = this.$route.params.brandId
    this.tplId = this.$route.params.tplId

    this.init()
  },
  mounted() {},
  methods: {
    getDisplayAprvNm,
    init() {
      retrieveTemplateDetail(this.brandId, this.tplId)
        .then(res => {
          // BE에서 주기 전이므로 임시로 넣어둔다.
          if (!res.result.inputText) {
            res.result['inputText'] = ''
          }
          let result = res.result
          let fmtStrData = messageBaseFormUtils.reformSuggestionForView(
            JSON.parse(result.fmtStr)
          )
          result.fmtStr = JSON.stringify(fmtStrData)
          this.templateData = result
          this.fmtStrData = fmtStrData
        })
        .catch(err => {
          this.$alertMsg(err.desc).then(() => {
            if (err.code === '60000021') {
              this.$router.push({
                name: 'TemplateList',
                params: { brandId: this.brandId }
              })
            }
          })
        })
    }
  }
}
</script>
<style>
</style>
