<template>
  <ModalView @closeModal="closePopup">
    <ConfirmMsg
        @closeModal="closePopup"
        modalsize="Modalmax480"
      >
      <div slot="msg">
        <div class="msg">
          <div class="phone-cert__title">
            휴대폰 인증
          </div>
          <div class="phone-cert__msg">
            인증번호를 발송하였습니다.<br>
            수신 받은 인증번호를 입력해주세요
          </div>
          <div class="phone-cert__number">{{ certInfo.userNm | maskingName }} {{ certInfo.mblNum | maskingMbl }}</div>
          <div  class="phone-cert__number-input">
            <span class="input">
              <input type="text" ref="authStr" v-model="authStr" maxlength="6" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keydown.enter="confirmAuthSmsStr" placeholder="인증번호" >
            </span>
            <span class="time active" ref="time"><timer ref="timer" @end="endTimer"></timer></span>
            <ButtonCmp type="btn-gray-line" @click="resend">인증번호 재요청</ButtonCmp>

          </div>
          <p class="guide-text error" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
      </div>
      <div class="button__wrap" slot="button">
            <ButtonCmp
              type="btn-blue-line"
              @click="closePopup"
            >닫기
            </ButtonCmp>
            <ButtonCmp
              type="btn-blue"
              @click="confirmAuthSmsStr"
            >
              인증
            </ButtonCmp>
      </div>
    </ConfirmMsg>
  </ModalView>
</template>
<script>
import Timer from '@/views/mypage/components/Timer'
import {
  getCertificationNumber,
  compareCertificationNumber
} from '@/api/common/code'
import { retrieveMyInfo, updateApiKey } from '@/api/utility/utility'

import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  name: 'CertiMobile',
  props: {
    visible: {
      type: Boolean
    },
    popupType: {
      type: String
    },
    modMblNum: {
      type: String,
      default: ''
    },
    anonymous: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Timer,
    ModalView,
    ConfirmMsg,
    ButtonCmp
  },
  data() {
    return {
      errorMessage: '',
      authStr: '',
      certInfo: {
        userNm: '',
        userId: '',
        mblNum: ''
      }
    }
  },
  computed: {},
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
    this.retrieveMyInfo()
  },
  methods: {
    retrieveMyInfo() {
      let params = {
        userId: this.$store.state.user.userId
      }
      retrieveMyInfo(params).then(res => {
        this.certInfo = res.result
        if (this.modMblNum) {
          this.certInfo.mblNum = this.modMblNum
        }
        this.sendAuthNumber()
      })
    },
    sendAuthNumber() {
      let params = {
        mblNum: this.certInfo.mblNum,
        anonymous: this.anonymous
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
      this.errorMessage =
        '인증 유효시간이 지났습니다. 인증번호를 다시 요청해주세요.'
      this.authStr = ''
    },
    confirmAuthSmsStr() {
      if (jglib.isEmpty(this.authStr)) {
        this.$alertMsg('인증번호를 입력해 주세요.').then(() => {
          this.$refs.authStr.focus()
        })
        return false
      }

      let params = {
        mblNum: this.certInfo.mblNum,
        userNm: this.certInfo.userName,
        authStr: this.authStr
      }

      compareCertificationNumber(params)
        .then(res => {
          if (this.popupType === 'APIKEY') {
            this.updateApiKey()
          } else {
            this.$alertMsg('인증이 완료 되었습니다.').then(() => {
              this.$emit('auth')
              this.closePopup()
            })
          }
        })
        .catch(err => {
          if (err.code === '64444') {
            err.desc = '인증에 실패했습니다. 인증번호를 확인해 주세요.'
          }
          this.errorMessage = err.desc
        })
    },
    updateApiKey() {
      let param = {
        userId: this.certInfo.userId,
        corpId: this.certInfo.corpId
      }
      updateApiKey(param)
        .then(res => {
          this.$alertMsg('재발급이 완료 되었습니다.').then(() => {
            this.$emit('done')
            this.closePopup()
          })
        })
        .catch(err => {
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
