<template>
  <div style="display:block;" class="popup_wrap">
    <div class="inner_box">
      <div class="box_gray_pop">
        <span class="text_desc">
          인증번호를 발송하였습니다.
          <br>발송된 번호를 입력해 주시기 바랍니다.
        </span>
        <div class="box_my_name">
          <span class="name">{{ this.userNm | maskingName }}</span>
          <span class="num">({{ this.mblNum | maskingMbl }})</span>
        </div>
        <div class="input_area sml">
          <span class="custom_input">
            <input
              type="text"
              ref="authStr"
              maxlength="6"
              v-model="authStr"
              @keydown="keydownOnlyNum"
              @keyup="keyupOnlyNum"
              @keyup.enter="confirmAuthSmsStr"
            >
            <span class="count">
              <timer ref="timer" class="time" startTime="03:00" @end="endTimer"/>
            </span>
          </span>
          <a href="javascript:void(0);" class="btn sml lightgray" @click="resetTimer">재전송</a>
          <p class="text_error" v-html="this.errorMessage"></p>
        </div>
      </div>
      <div class="btn_wrap btn_wrap_pop">
        <a href="javascript:void(0);" class="btn sml sml120 bd_black" @click="clickRemovePopup">
          <span>닫기</span>
        </a>
        <a href="javascript:void(0);" class="btn sml sml120 black" @click="confirmAuthSmsStr">
          <span>확인</span>
        </a>
      </div>
      <a
        id="btn_close"
        href="javascript:void(0)"
        onclick
        class="btn_close"
        @click="clickRemovePopup"
      ></a>
    </div>
    <!-- //inner_box-->
  </div>
</template>

<script>
import { getCorpId, getCertificationNum } from '@/api/service/approvalBrand'
import { compareCertificationNumber } from '@/api/common/code'
import Timer from '@/components/Timer'

export default {
  name: 'ApprovalBrandDeleteCertificatioPopup',
  components: { Timer },
  data() {
    return {
      corpId: '',
      userNm: '',
      mblNum: '',
      mblNumFront: '',
      mblNumcenter: '',
      mblNumBack: '',

      authStr: '',
      getrequestNum: '',
      errorMessage: ''
    }
  },
  props: {
    corpIdData: {
      type: String
    }
  },
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
  created() {
    this.corpId = this.corpIdData
    let params = { corpId: this.corpId }
    getCorpId(params)
      .then(res => {
        this.startTimer()
        this.userNm = res.result.userNm
        this.mblNum = res.result.mblNum
        getCertificationNum({ mblNum: this.mblNum })
          .then(res => {
            this.$alertMsg(res.desc)
          })
          .catch(res => {
            this.$alertMsg(res.desc)
          })
      })
      .catch(res => {
        this.$alertMsg(res.desc)
      })
  },
  mounted() {},
  computed: {},
  methods: {
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    clickRemovePopup() {
      this.$emit('turnvisible', {
        visibleDelete: false,
        ok: 'N'
      })
    },
    startTimer() {
      this.$refs.timer.start()
    },
    stopTimer() {
      this.$refs.timer.stop()
    },
    resetTimer() {
      this.authStr = ''
      this.$refs.timer.reset()
      this.startTimer()

      let NumData = { mblNum: this.mblNum }
      getCertificationNum(NumData)
        .then(res => {
          this.startTimer()
          this.$alertMsg(res.desc)
        })
        .catch(res => {
          // console.log('번호인증 실패')
        })
    },
    endTimer() {
      this.endTimerFlag = true
    },
    confirmAuthSmsStr() {
      if (jglib.isEmpty(this.authStr)) {
        this.$alertMsg('인증번호를 입력해 주세요.').then(() => {
          this.$refs.authStr.focus()
        })
        return false
      }

      let params = {
        mblNum: this.mblNum,
        userNm: this.userNm,
        authStr: this.authStr
      }

      compareCertificationNumber(params)
        .then(res => {
          this.$alertMsg('인증이 완료 되었습니다.').then(() => {
            this.$emit('turnvisible', {
              visibleDelete: false,
              ok: 'Y'
            })
          })
        })
        .catch(err => {
          if (err.code === '60000012') {
            err.desc = '인증에 실패했습니다. 인증번호를 확인해 주세요.'
          }
          this.errorMessage = err.desc
        })
    }
  }
}
</script>
