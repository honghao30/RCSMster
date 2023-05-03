<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'발신번호 관리'"/>
      </div>
      <brand-top active="sendnum" :brandId="brandId"></brand-top>
      <div class="contents_wrap">
        <retrieve-approval-completion
          v-if="this.approvaInfo.aprvRet === 'OK'"
          :approvaInfoData="this.approvaInfo"
        />
        <retrieve-approval-wait
          v-else-if="this.approvaInfo.aprvRet === 'WAITING' || this.approvaInfo.aprvRet === 'INSPECTED' || this.approvaInfo.aprvRet === 'INSPECTING'"
          :approvaInfoData="this.approvaInfo"
        />
        <retrieve-reject
          v-else-if="this.approvaInfo.aprvRet === 'REJECTED'"
          :approvaInfoData="this.approvaInfo"
        />
        <retrieve-saved
          v-else-if="this.approvaInfo.aprvRet === 'SAVED'"
          :approvaInfoData="this.approvaInfo"
        />
      </div>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import RetrieveApprovalCompletion from '@/views/service/components/RetrieveApprovalCompletion'
import RetrieveApprovalWait from '@/views/service/components/RetrieveApprovalWait'
import RetrieveReject from '@/views/service/components/RetrieveReject'
import RetrieveSaved from '@/views/service/components/RetrieveSaved'
import { getApprovalStat } from '@/api/service/callingNumberManagement'
import Breadcrumb from '@/components/global/Breadcrumb'

export default {
  name: 'RetrieveApprovalStat',
  components: {
    BrandTop,
    RetrieveApprovalCompletion,
    RetrieveApprovalWait,
    RetrieveReject,
    RetrieveSaved,
    Breadcrumb
  },
  props: {
    approvaInfoData: {
      type: Object
    }
  },

  data() {
    return {
      chatbotId: '',
      approvaInfo: {
        brandId: '',
        chatbotId: '',
        regDt: '',
        defMdnYn: '',
        mdn: '',
        massYn: '',
        subTitle: '',
        regCertiFileId: '',
        aprvRet: '',
        aprvRetNm: '',
        aprvRetNmAlt2: '',
        status: '',
        statusNm: '',
        aprvDt: '',
        regUserNm: '',
        fileName: '',
        fileSize: '',
        fileNo: '',
        activeYn: '',
        twowayYn: ''
      }
    }
  },
  created() {
    this.chatbotId = this.$route.params.chatbotId
    this.brandId = this.$route.params.brandId
    this.massYn = this.$route.params.massYn
    let params = { chatbotId: this.chatbotId }
    getApprovalStat(params, this.brandId).then(res => {
      if (res.code === '20000000') {
        this.approvaInfo.chatbotId = res.result.chatbotId
        this.approvaInfo.brandId = res.result.brandId
        this.approvaInfo.regDt = res.result.regDt
        this.approvaInfo.defMdnYn = res.result.defMdnYn
        this.approvaInfo.massYn = res.result.massYn
        this.approvaInfo.mdn = res.result.mdn
        this.approvaInfo.rcsReply = res.result.rcsReply
        this.approvaInfo.subTitle = res.result.subTitle
        this.approvaInfo.regCertiFileId = res.result.regCertiFileId
        this.approvaInfo.aprvRet = res.result.aprvRet
        this.approvaInfo.aprvRetNm = res.result.aprvRetNm
        this.approvaInfo.aprvRetNmAlt2 = res.result.aprvRetNmAlt2
        this.approvaInfo.status = res.result.status
        this.approvaInfo.statusNm = res.result.statusNm
        this.approvaInfo.aprvDt = res.result.aprvDt
        this.approvaInfo.regUserNm = res.result.regUserNm
        this.approvaInfo.fileName = res.result.fileName
        this.approvaInfo.fileSize = res.result.fileSize
        this.approvaInfo.fileNo = res.result.fileNo
        this.approvaInfo.aprvStatus = res.result.aprvStatus
        this.approvaInfo.massRegSeq = Number(res.result.massRegSeq)
        this.approvaInfo.regCertiFileId = res.result.regCertiFileId
        this.approvaInfo.regCertiFileName = res.result.regCertiFileName
        this.approvaInfo.activeYn = res.result.activeYn
        this.approvaInfo.aprvRetDescr = res.result.aprvRetDescr
        this.approvaInfo.twowayYn = res.result.twowayYn
      }
    })
  },
  mounted() {},
  computed: {},
  methods: {}
}
</script>
