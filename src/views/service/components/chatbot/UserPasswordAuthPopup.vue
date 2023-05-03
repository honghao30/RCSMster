<template>
  <custom-popup :visible="visible" @close="closePopup" kind="custom" noBtn="취소" yesBtn="확인">
    <div class="dv2023_confirmdelete">
      <div>다수의 목록 삭제 시 비밀번호 인증이 필요합니다.<br/>비밀번호를 입력해 주세요.</div>
      <div>
        <input v-model="password" type="password" placeholder="비밀번호"/>
      </div>
      <!-- 에러 -->
      <span class="error_message">{{ errorMsg }}</span>
    </div>
  </custom-popup>
</template>

<script>
import { CustomPopup } from '@/components/popupSet'
import { checkPassword } from '@/api/join/password'

export default {
  name: 'UserPasswordAuthPopup',
  components: {
    CustomPopup
  },
  props: {
    visible: { type: Boolean }
  },
  data() {
    return {
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    closePopup(res) {
      if (res.ok) {
        if (this.password) {
          let param = { userPwd: this.password }
          checkPassword(param).then(res => {
            if (res.code === '20000000') {
              this.$emit('success')
            } else {
              this.errorMsg = '비밀번호를 확인해 주세요.'
            }
          }).catch(() => {
            this.errorMsg = '비밀번호를 확인해 주세요.'
          })
        } else {
          this.errorMsg = '비밀번호를 확인해 주세요.'
        }
      } else this.$emit('update:visible', false)
    }
  }
}
</script>
