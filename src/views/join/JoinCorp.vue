<template>
  <div class="join">
    <PageTitle pagetitle="운영자 가입" />
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
import JoinTerms from '@/views/join/components/JoinTerms.vue'
import JoinCorpInfo from '@/views/join/components/JoinCorpInfo.vue'
import JoinUserInfo from '@/views/join/components/JoinUserInfo.vue'
import JoinComplete from '@/views/join/components/JoinComplete.vue'
import { retrieveCorpRegiNum } from '@/api/common/code'
import { createJoinCorp } from '@/api/join/applyJoin'

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
      stepTitle: ['약관동의', '비즈니스 정보 입력', '회원정보 입력', '운영자 가입 완료'],
      stepActiveIndex: 1,
      userType: 'CORP',
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
        userType: 'CORP'
      }

      retrieveCorpRegiNum(params)
        .then(res => {
          // 이미 승인이 진행중일 경우
          if (res.result && res.result.inspection === 'Y') {
            this.$alertMsg('기업 심사가 진행 중입니다. 심사 완료 후에 가입신청 가능합니다.')
            this.view.isFirst = false
            this.corpData = { corpRegiNum: '', corpId: null }
            this.view.isCertiAll = false
            this.formData = {
              corpRegiNum: '',
              name: '', // corpname
              bizCond: '',
              bizCate: '',
              addrRegnNo: '',
              addrMngNo: '',
              addrDtl: ''
            }
          } else if (res.result && res.result.inspection === 'N') {
            this.applyJoin()
          }
        })
        .catch(res => {
          if (res.code === '64445') {
            // 최초 등록
            this.applyJoin()
          }
        })
    },
    applyJoin() {
      // 약관 정보
      let tosItemList = this.termInfo

      // 기업정보
      let corpData = this.corpInfo

      if (corpData.corpData.isFirst) {
        corpData.corpData['corpSaveYn'] = 'N'
      } else {
        corpData.corpData['corpSaveYn'] = 'Y'
      }
      corpData.corpData['corpAdmYn'] = 'N'

      // 담당자 정보
      let userData = this.userInfo

      let data = {}
      Object.assign(data, corpData.corpData)
      Object.assign(data, userData)
      data['tosItemList'] = tosItemList

      let formData = new FormData()
      if (!jglib.isEmpty(corpData.corpRegFile.name)) {
        formData.append('certiFile', corpData.corpRegFile)
      }
      formData.append('data', JSON.stringify(data))

      createJoinCorp(formData)
        .then(res => {
          // 사업자등록증 제출했을 경우
          if (!jglib.isEmpty(corpData.corpRegFile.name)) {
            this.viewType = 'WATING'
          // 사업자등록증 제출하지 않았을 경우
          } else {
            // 최초 사업자일 경우
            if (corpData.corpData.isFirst) {
              this.viewType = 'SAVED'
            // 최초 사업자 아닐 경우(이미 등록된 사업자일 경우)
            } else {
              this.viewType = 'OK'
            }
          }
          this.stepActiveIndex++
        })
        .catch(e => {
          this.$alertMsg(e.desc)
        })
    }
  }
}
</script>
