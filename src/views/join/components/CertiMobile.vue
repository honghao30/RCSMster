<template>
  <div>
    <ConfirmMsg modalsize="Modalmax480">
      <div slot="msg">
        <div class="msg">
          <div class="phone-cert__title">
            휴대폰 인증
          </div>
          <div class="phone-cert__msg">
            인증번호를 발송하였습니다.<br>수신 받은 인증번호를 입력해주세요
          </div>
          <div class="phone-cert__number">{{ certInfo.userNm | maskingName }} {{ certInfo.mblNum | maskingMbl }}</div>
          <div  class="phone-cert__number-input">
            <span class="input">
              <input
                type="text"
                placeholder="인증번호"
                ref="authStr"
                v-model="authStr"
                maxlength="6"
                @keydown="keydownOnlyNum"
                @keyup="keyupOnlyNum"
                @keydown.enter="confirmAuthSmsStr"
              >
            </span>
              <Timer ref="timer" @end="endTimer"></Timer>
              <ButtonCmp type="btn-gray-line" @click="resend">인증번호 요청</ButtonCmp>
          </div>
          <p class="guide-text error" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
      </div>
      <div class="button__wrap" slot="button">
          <ButtonCmp type="btn-blue-line" @click="closePopup">닫기</ButtonCmp>
          <ButtonCmp type="btn-blue" :disabled="authStrValidation" @click="confirmAuthSmsStr">인증</ButtonCmp>
      </div>
    </ConfirmMsg>
  </div>
</template>
<script>
import Timer from '@/views/join/components/Timer'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import {
  getCertificationNumber,
  compareCertificationNumber
} from '@/api/common/code'

export default {
  name: 'CertiMobile',
  props: {
    visible: {
      type: Boolean
    },
    certInfo: {
      type: Object
    }
  },
  components: {
    ButtonCmp,
    ConfirmMsg,
    Timer
  },
  data() {
    return {
      errorMessage: '',
      authStr: ''
      // certInfo: {
      //   userNm: '',
      //   mblNum: ''
      // }
    }
  },
  computed: {
    authStrValidation() {
      if (jglib.isEmpty(this.authStr)) {
        return true
      }

      return false
    }
  },
  watch: {},
  filters: {
    maskingName(value) {
      if (value.length === 0) {
        return ''
      }

      let ret = value.substr(0, 1)
      if (value.length < 3) {
        ret += '*'
      } else {
        for (let i = 1; i < value.length - 1; i++) {
          ret += '*'
        }
        ret += value.substr(value.length - 1, 1)
      }

      return ret
    },
    maskingMbl(value) {
      if (value.length === 0) {
        return ''
      }

      let phone = jglib.mobileNumConverter(value).split('-')
      let phone1 = ''
      for (let i = 0; i < phone[1].length; i++) {
        phone1 += '*'
      }
      phone[1] = phone1
      phone = phone.join('-')
      return phone
    }
  },
  created() {},
  mounted() {
    this.sendAuthNumber()
  },
  methods: {
    sendAuthNumber() {
      let params = {
        mblNum: this.certInfo.mblNum
      }
      getCertificationNumber(params)
        .then(res => {
          this.$refs.timer.start()
          this.$refs.authStr.focus()
        })
        .catch(err => {
          this.errorMessage = err.desc
        })
    },
    resend() {
      this.errorMessage = ''
      this.authStr = ''
      this.$refs.timer.reset()
      this.sendAuthNumber()
    },
    endTimer() {
      this.errorMessage = '인증 유효시간이 지났습니다. 인증번호를 다시 요청해주세요.'
      this.authStr = ''
    },
    confirmAuthSmsStr() {
      let params = {
        mblNum: this.certInfo.mblNum,
        userNm: this.certInfo.userName,
        authStr: this.authStr
      }

      compareCertificationNumber(params)
        .then(res => {
          this.$alertMsg('인증이 완료 되었습니다.').then(() => {
            this.$emit('done')
            this.closePopup()
          })
        })
        .catch(err => {
          if (err.code === '64444') {
            err.desc = '인증에 실패했습니다. 인증번호를 확인해 주세요.'
          }
          this.errorMessage = err.desc
        })
    },
    closePopup() {
      this.$emit('update:visible', false)
    },
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    }
  }
}
</script>
<style>
</style>
