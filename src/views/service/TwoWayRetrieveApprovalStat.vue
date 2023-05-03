<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'양방향 관리'"/>
      </div>
      <brand-top active="twoway" :brandId="brandId"></brand-top>
      <div class="contents_wrap">
        <two-way-retrieve-approval-completion
          v-if="modifyMode"
          :approvaInfoData="this.approvaInfo"
        />
        <two-way-retrieve-info
          v-if="!modifyMode"
          :approvaInfoData="this.approvaInfo" @isModify="goModifyMode"
        />
      </div>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import TwoWayRetrieveApprovalCompletion from '@/views/service/components/TwoWayRetrieveApprovalCompletion'
import TwoWayRetrieveInfo from '@/views/service/components/TwoWayRetrieveInfo'
import { getTwoWayApprovalStat } from '@/api/service/callingTwoWayManagement'
import Breadcrumb from '@/components/global/Breadcrumb'

export default {
  name: 'TwoWayRetrieveApprovalStat',
  components: {
    BrandTop,
    TwoWayRetrieveApprovalCompletion,
    TwoWayRetrieveInfo,
    Breadcrumb
  },
  props: {
    approvaInfoData: {
      type: Object
    },
    isModify: {
      type: Boolean,
      required: false
    }
  },

  data() {
    return {
      chatbotId: '',
      modifyMode: false,
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
        serviceNm: '',
        webhook: '',
        aprvReqUserNm: '',
        aprvReqDt: '',
        inputFieldYn: '',
        service: '',
        psMenuStatus: '',
        pauseDt: '',
        resumeDt: ''
      }
    }
  },
  created() {
    this.chatbotId = this.$route.params.chatbotId
    this.brandId = this.$route.params.brandId
    this.massYn = this.$route.params.massYn
    let params = { chatbotId: this.chatbotId }
    getTwoWayApprovalStat(params, this.brandId).then(res => {
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
        this.approvaInfo.serviceNm = res.result.serviceNm
        this.approvaInfo.webhook = res.result.webhook
        this.approvaInfo.aprvReqUserNm = res.result.aprvReqUserNm
        this.approvaInfo.aprvReqDt = res.result.aprvReqDt
        this.approvaInfo.inputFieldYn = res.result.inputFieldYn
        this.approvaInfo.service = res.result.service
        this.approvaInfo.agencyId = res.result.agencyId
        this.approvaInfo.agencyNm = res.result.agencyNm
        this.approvaInfo.botAgencyId = res.result.botAgencyId
        this.approvaInfo.botAgencyNm = res.result.botAgencyNm
        this.approvaInfo.psMenuYn = res.result.psMenuYn
        this.approvaInfo.psMenuStatus = res.result.psMenuStatus
        this.approvaInfo.fromTwoWay = this.$route.params.fromTwoWay || 'Y'
        this.approvaInfo.pauseDt = res.result.pauseDt
        this.approvaInfo.resumeDt = res.result.resumeDt
      }
    })
  },
  mounted() {},
  computed: {},
  methods: {
    goModifyMode() {
      this.modifyMode = true
    }
  }
}
</script>
