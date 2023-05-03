<template>
  <div style="display:block;" class="popup_wrap">
    <div class="inner_box">
      <div class="box_gray_pop">
        <span class="text_desc">
          인증번호를 발송하였습니다.
          <br>발송된 번호를 입력해 주시기 바랍니다.
        </span>
        <div class="box_my_name">
          <span class="name">{{ certInfo.userNm | maskingName }}</span>
          <span class="num">({{ certInfo.mblNum | maskingMbl }})</span>
        </div>
        <div class="input_area sml">
          <span class="custom_input">
            <input
              type="text"
              ref="authStr"
              v-model="authStr"
              maxlength="6"
              @keydown="keydownOnlyNum"
              @keyup="keyupOnlyNum"
              @keydown.enter="confirmAuthSmsStr"
            >
            <span class="count">
              <timer ref="timer" @end="endTimer"></timer>
            </span>
          </span>
          <a href="javascript:void(0);" class="btn sml lightgray" @click="resend">재전송</a>
          <p class="text_error">{{ errorMessage }}</p>
        </div>
      </div>
      <div class="btn_wrap btn_wrap_pop">
        <!-- 2019.10.15 class명 수정및 추가 -->
        <a href="javascript:void(0);" class="btn sml sml120 bd_black" @click="closePopup">
          <span>닫기</span>
        </a>
        <!-- 2019.10.15 class명 수정및 추가 -->
        <a href="javascript:void(0);" class="btn sml sml120 black" @click="confirmAuthSmsStr">
          <span>확인</span>
        </a>
      </div>
      <a id="btn_close" href="javascript:void(0)" @click="closePopup" class="btn_close"></a>
    </div>
    <!-- //inner_box-->
  </div>
</template>
<script>
import Timer from '@/components/Timer'
import {
  getCertificationNumber,
  compareCertificationNumber
} from '@/api/common/code'
import { retrieveMyInfo, updateApiKey } from '@/api/utility/utility'
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
    Timer
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
          if (err.code === '60000012') {
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
