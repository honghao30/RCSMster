<template>
  <div class="rcs_container">
    <div style="display:block;" class="popup_wrap">
      <div class="inner_box">
        <div class="box_gray_pop">
          <span class="text_desc">
            인증번호 발송을 위해<br>담당자로 등록된 휴대폰 번호를 입력해 주시기 바랍니다.
          </span>
          <div class="input_area sml">
            <span class="mar_r20">휴대폰번호</span>
            <span class="custom_input">
              <input
                type="text"
                placeholder="‘-’없이 입력"
                v-model="mblNum"
                v-on:keyup.enter="inputMblNum"
                v-focus
                maxlength="11"
                @keydown="keydownOnlyNum"
                @keyup="keyupOnlyNum">
            </span>
            <p class="text_error">{{ message }}</p>
          </div>
        </div>
        <div class="btn_wrap btn_wrap_pop">
          <a href="javascript:void(0);" class="btn mid point" @click="inputMblNum">
            <span>전송</span>
          </a>
        </div>
        <a id="btn_close" href="javascript:void(0)" class="btn_close" @click="goBack"></a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'AuthNumAgency',
  components: {},
  directives: {
    focus: {
      // 디렉티브 정의
      inserted: function(el) {
        el.focus()
      }
    }
  },
  props: {
    from: { type: String, default: '' }
  },
  data: function() {
    return {
      userId: '',
      userNm: '',
      mblNum: '',
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER_FOR_AUTHSMS'
    })
  },
  created() {
    if (this.userInfo.userId === '') {
      this.$router.replace({ name: 'login' })
    }
  },
  methods: {
    inputMblNum() {
      this.message = ''
      if (!this.mblNum) {
        this.message = '휴대폰번호를 입력해주세요.'
        return false
      }
      if (!/^(0(1(0|1|6|7|8|9)))(\d{3,4})(\d{4}$)/.test(this.mblNum)) {
        this.message = '올바른 휴대폰번호를 입력해주세요.'
        return false
      }
      store.dispatch(`SelectAgencyMbl`, {
        userId: this.userInfo.userId,
        mblNum: this.mblNum
      }).then(response => {
        this.$store.dispatch('updateUserForAuthSms', response.result)
        this.$router.replace({
          name: 'authNum',
          params: { afterRouter: this.$route.params.afterRouter, from: this.from }
        })
      }).catch(error => {
        if (error.code === '60000001') {
          this.message = '등록된 휴대폰 번호가 아닙니다.'
        } else {
          this.message = ''
        }
      })
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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
