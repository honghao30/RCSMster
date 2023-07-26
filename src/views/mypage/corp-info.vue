<template>
  <div class="rcs_container">
    <corp-info-corp
      v-if="isCorp"
      :aprvRet="aprvRet"
      :corpData="corpData"
      :viewMode="viewMode"
      @refresh="init"
    />
    <corp-info-agency v-if="!isCorp" :aprvRet="aprvRet" :corpData="corpData" :seasonData="seasonData" @refresh="goback"/>
  </div>
</template>

<script>
import { retrieveCorpInfo, retrieveAgencyInfo, retrieveSeasonInfo } from '@/api/utility/utility'
import CorpInfoCorp from '@/views/mypage/components/utility/CorpInfoCorp'
import CorpInfoAgency from '@/views/mypage/components/utility/CorpInfoAgency'
export default {
  name: 'CorpInfo',
  components: {
    CorpInfoCorp,
    CorpInfoAgency
  },
  data() {
    return {
      corpData: {
        corpId: ''
      },
      seasonData: [],
      aprvRet: '',
      userType: '',
      viewMode: true
    }
  },
  computed: {
    isCorp() {
      return this.$store.state.user.userType === 'CORP'
    }
  },
  watch: {
    '$store.state.user.userType'(newVal, oldVal) {
      if (newVal && jglib.isEmpty(oldVal)) {
        this.init()
      }
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$store.state.user.userType === 'AGENCY' && this.$store.state.user.subAgencyYn === 'Y') {
        this.$router.push({ name: 'home', replace: true })
      }

      if (!jglib.isEmpty(this.$store.state.user.userType)) {
        if (this.isCorp) {
          this.viewMode = this.$store.state.user.corpAdmYn === 'N'
          this.retrieveCorpInfo()
        } else {
          this.retrieveAgencyInfo()
          this.retrieveSeasonInfo()
        }
      }
      window.scrollTo(0, 0)
    },
    retrieveCorpInfo() {
      let params = {
        corpId: this.$store.state.user.corpId
      }
      // 나의 정보 조회 api에 기업정보 조회 포함되어있어 해당 내용으로만 보여준다.
      retrieveCorpInfo(params).then(res => {
        this.corpData = res.result
        this.aprvRet = this.corpData.aprvRet
      })
    },
    retrieveAgencyInfo() {
      retrieveAgencyInfo(this.$store.state.user.corpId).then(res => {
        this.corpData = res.result
        this.aprvRet = this.corpData.aprvRet
      })
    },
    retrieveSeasonInfo() {
      retrieveSeasonInfo(this.$store.state.user.corpId).then(res => {
        this.seasonData = res.result
        console.log('retrieveSeasonInfo', res.result)
      })
    },
    goback() {
      history.back()
    }
  }
}
</script>

<style>
</style>
