<template>
  <div class="join">
    <PageTitle pagetitle="대행사 가입" />
    <StepList :stepActiveIndex="stepActiveIndex" :stepTitle="stepTitle" />

    <!-- 약관동의 -->
    <JoinTerms v-show="stepActiveIndex === 1" :userType="this.userType" ref="terms" @changeTermInfo="changeTermInfo" />

    <!-- 비즈니스 정보 입력 -->
    <JoinCorpInfo v-show="stepActiveIndex === 2" :userType="this.userType" ref="corpInfo" @changeCorpInfo="changeCorpInfo" />

    <!-- 회원정보 입력 -->
    <JoinUserInfo v-show="stepActiveIndex === 3" :userType="this.userType" :corpId="corpInfo.corpData.corpId" ref="userInfo" @changeUserInfo="changeUserInfo" />

    <!-- 가입 완료 -->
    <JoinComplete v-show="stepActiveIndex === 4" :viewType="this.viewType" />

    <div class="button__wrap">
      <ButtonCmp type="btn-blue-line" v-if="stepActiveIndex === 1" @click="cancelStep">취소</ButtonCmp>
      <ButtonCmp type="btn-blue-line" v-if="stepActiveIndex === 2 || stepActiveIndex === 3" @click="prevStep">이전</ButtonCmp>
      <ButtonCmp type="btn-blue" v-if="stepActiveIndex === 1 || stepActiveIndex === 2" :disabled="nextStepValidation" @click="nextStep">다음</ButtonCmp>
      <ButtonCmp type="btn-blue" v-if="stepActiveIndex === 3" :disabled="applyJoinValidation" @click="beforeApplyJoin">신청</ButtonCmp>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import JoinTerms from '@/views/join/components/JoinTerms'
import JoinCorpInfo from '@/views/join/components/JoinCorpInfo.vue'
import JoinUserInfo from '@/views/join/components/JoinUserInfo.vue'
import JoinComplete from '@/views/join/components/JoinComplete.vue'
import { retrieveCorpRegiNum } from '@/api/common/code'
import { createJoinAgency } from '@/api/join/applyJoin'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    StepList,
    JoinTerms,
    JoinCorpInfo,
    JoinUserInfo,
    JoinComplete
  },
  data() {
    return {
      stepTitle: ['약관동의', '대행사 정보 입력', '회원정보 입력', '대행사 가입 완료'],
      stepActiveIndex: 1,
      userType: 'AGENCY',
      termInfo: [],
      termInfoPass: false,
      corpInfo: {
        corpData: {},
        corpRegFile: {}
      },
      corpInfoPass: false,
      userInfo: {},
      userInfoPass: false,
      viewType: ''
    }
  },
  computed: {
    getStepActiveIndex() {
      return this.stepActiveIndex
    },
    nextStepValidation() {
      if (this.stepActiveIndex === 1) {
        if (!this.termInfoPass) {
          return true
        }
      } else if (this.stepActiveIndex === 2) {
        if (!this.corpInfoPass) {
          return true
        }
      }

      return false
    },
    applyJoinValidation() {
      if (!this.userInfoPass) {
        return true
      }

      return false
    }
  },
  methods: {
    changeTermInfo(termInfoPass) {
      this.termInfoPass = termInfoPass
    },
    changeCorpInfo(corpInfoPass) {
      this.corpInfoPass = corpInfoPass
    },
    changeUserInfo(userInfoPass) {
      this.userInfoPass = userInfoPass
    },
    cancelStep() {
      this.$router.go(-1)
    },
    prevStep() {
      this.stepActiveIndex--
    },
    nextStep() {
      if (this.stepActiveIndex === 1) {
        this.termInfo = this.$refs.terms.getAgreementData()
        this.stepActiveIndex++
      } else if (this.stepActiveIndex === 2) {
        this.corpInfo = this.$refs.corpInfo.getCorpData()

        if (!jglib.isEmpty(this.corpInfo)) {
          this.stepActiveIndex++
        }
      }
    },
    beforeApplyJoin() {
      this.userInfo = this.$refs.userInfo.getUserData()

      if (jglib.isEmpty(this.termInfo) || jglib.isEmpty(this.corpInfo) || jglib.isEmpty(this.userInfo)) {
        return
      }

      // 가입전 사업자 등록 번호 재확인
      let params = {
        corpRegiNum: this.corpInfo.corpData.corpRegiNum,
        userType: 'AGENCY'
      }

      retrieveCorpRegiNum(params)
        .then(res => {
          // 이미 승인이 진행중일 경우
          let userNm = res.result.userNm
          let email = res.result.email

          this.view.isFirst = false
          this.corpData['corpRegiNum'] = ''
          this.view.isCertiAll = false
          this.formData = {
            agencyRegiNum: '',
            corpName: '',
            bizCond: '',
            bizCate: '',
            addrRegnNo: '',
            addrMngNo: '',
            addrDtl: ''
          }

          if (res.result.inspection === 'N') {
            this.$confirmMsg(`해당 사업자등록번호로 가입된 계정이 존재합니다.<br> ${userNm} (${email})`, '', '로그인', '닫기')
              .then(() => {
                this.$router.push('/login')
              })
          } else if (res.result.inspection === 'Y') {
            this.$confirmMsg(`심사 중 입니다.<br> 신청결과를 확인하세요.`, '', '대행사 신청 결과조회', '닫기')
              .then(() => {
                this.$router.push('/join/retriveapply')
              })
          }
        })
        .catch(res => {
          // 최초 등록
          if (res.code === '64445') {
            this.applyJoin()
          }
        })
    },
    applyJoin() {
      // 약관 정보
      let tosItemList = this.termInfo

      // 기업정보
      let corpData = this.corpInfo
      corpData.corpData['corpAdmYn'] = 'Y'

      // 담당자 정보
      let userData = this.userInfo

      let data = {}
      Object.assign(data, corpData.corpData)
      Object.assign(data, userData)
      data['tosItemList'] = tosItemList

      let formData = new FormData()
      formData.append('certiFile', corpData.corpRegFile)
      formData.append('rcsCertiFile', corpData.rcsCertiFile)
      if (!jglib.isEmpty(corpData.agencyImgFile.name)) {
        formData.append('agencyImgFile', corpData.agencyImgFile)
      }
      formData.append('data', JSON.stringify(data))

      createJoinAgency(formData)
        .then(res => {
          this.viewType = 'AGENCY'
          this.stepActiveIndex++
        })
        .catch(e => {
          this.$alertMsg(e.desc)
        })
    }
  }
}
</script>
