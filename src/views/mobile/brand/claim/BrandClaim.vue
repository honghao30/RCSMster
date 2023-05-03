<template>
  <div v-if="ready">
    <div v-if="isValidInfo" class="claim_wrap">
      <div v-if="(step !== 3)" class="title_area">
        <a href="javascript:void(0)" @click="back" class="icon_back"></a>
        <div class="title_text">{{ backBtnTitle }}</div>
      </div>
      <brand-claim-step1 v-if="step === 1" @selectVocCateCd1="selectVocCateCd1"/>
      <brand-claim-step2 v-else-if="step === 2" :vocCate1="vocCate1" @updateData="updateData"/>
      <div v-else-if="step === 3" class="claim_result">
        <img src="@/assets/image/mobile/claim_result.png">
        <div>
          브랜드 정보 수정제안이<br>
          완료되었습니다.
        </div>
      </div>
      <button v-if="step === 2" class="footerBtn" :class="enableBtn ? 'blue' : ''" @click="clickBtn">수정 제안하기</button>
    </div>
    <div v-else class="claim_wrap">
      <div class="claim_result">
        잘못된 브랜드 또는 발신번호로<br>
        해당 페이지를 열 수 없습니다.
      </div>
      <!-- <button class="footerBtn blue" @click="goBrandHome">브랜드 홈으로 가기</button> -->
    </div>
    <!-- 최종 확인 popup -->
    <ConfirmPopup v-if="showConfirmPopup" :title="confirmTitle" :desc="confirmDesc" :visible.sync="showConfirmPopup" @confirm="confirm"/>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { checkBrandInfo, addVoc } from '@/api/mobile/mobile.js'
import ConfirmPopup from '@/views/mobile/components/ConfirmPopup'
import BrandClaimStep1 from '@/views/mobile/brand/claim/BrandClaimStep1'
import BrandClaimStep2 from '@/views/mobile/brand/claim/BrandClaimStep2'
export default {
  name: 'BrandClaim',
  components: {
    ConfirmPopup,
    BrandClaimStep1,
    BrandClaimStep2
  },
  data() {
    return {
      ready: false,
      isValidInfo: false,
      step: 1,
      brandId: '', // 브랜드 ID
      chatbotId: '', // 챗봇 ID
      vocCate1: null,
      vocCateCd2: '',
      vocCateCd3: '',
      desc: '',
      loading: null,
      showConfirmPopup: false // 수정제안하기 클릭 > 최종 팝업 show 여부
    }
  },
  computed: {
    isAndroid() {
      let userAgent = navigator.userAgent.toLowerCase()
      if ((userAgent.indexOf('build') > -1 && userAgent.indexOf('wv') > -1) || (userAgent.indexOf('mobi') > -1)) return true
      else return false
    },
    backBtnTitle() {
      if (this.step === 1) return '정보 수정 제안'
      else if (this.step === 2) return this.vocCate1.codeNm
      else return ''
    },
    enableBtn() {
      if ((!jglib.isEmpty(this.desc) && this.desc.replaceAll(' ', '').length > 0) || this.step === 3) return true
      else return false
    },
    // btnText() {
    //   if (this.step === 1 || this.step === 2) return '수정 제안하기'
    //   else return '브랜드 홈으로 가기'
    // },
    // btnAction() {
    //   if (this.step === 3) return 'goBrandHome'
    //   else return 'sendRequest'
    // },
    brandProfileLink() {
      return `rcsbot:${this.chatbotId}${process.env.VUE_APP_CHAT}?action=brandhome`
    }
  },
  created() {
    this.brandId = this.$route.query.brand
    this.chatbotId = this.$route.query.chatbot
    this.defMdn = this.chatbotId
    this.validateBrand()
  },
  methods: {
    validateBrand() {
      checkBrandInfo(this.brandId, this.chatbotId).then(res => {
        if (res.status === 200) {
          this.isValidInfo = true
        }
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        this.ready = true
      })
    },
    selectVocCateCd1(code) {
      this.step = 2
      this.vocCate1 = code
    },
    updateData(info) {
      if (info.vocCateCd2) this.vocCateCd2 = info.vocCateCd2
      if (info.vocCateCd3) this.vocCateCd3 = info.vocCateCd3
      this.desc = info.desc
    },
    clickBtn() {
      if (this.enableBtn) {
        this.confirmTitle = '브랜드 정보 수정 요청을<br>계속 진행 하시겠습니까?'
        this.confirmDesc = '※ 수신 문자 및 브랜드가 제공하는 서비스와 관련된 요청은 해당 브랜드로 문의해주세요.<br>ex. 수신 문자 번호 및 명의 변경, 문자 수신 거부'
        this.showConfirmPopup = true
      }
    },
    confirm() {
      this.showConfirmPopup = false
      this.sendRequest()
    },
    async sendRequest() {
      let param = {
        brandId: this.brandId,
        chatbotId: this.chatbotId,
        '1dCd': this.vocCate1.code,
        '2dCd': this.vocCateCd2,
        '3dCd': this.vocCateCd3,
        desc: this.desc
      }
      addVoc(this.brandId, this.chatbotId, param).then(res => {
        this.step = 3
      }).catch(err => {
        console.error('add Brand Claim Error...', err)
      })
    },
    goBrandHome() {
      // 안드로이드의 경우만 링크 동작하도록 처리함
      if (this.isAndroid && !jglib.isEmpty(this.chatbotId)) window.location.href = this.brandProfileLink
      else MessageBox.alert('현재 기기에서는 연결을 할 수 없는 링크입니다.')
    },
    back() {
      if (this.step === 1) this.goBrandHome()
      else {
        this.step = 1
        this.vocCateCd2 = ''
        this.vocCateCd3 = ''
        this.desc = ''
        window.scrollTo(0, 0)
      }
    }
  }
}
</script>
