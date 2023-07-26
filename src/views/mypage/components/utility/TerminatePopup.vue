<template>
    <custom-popup
      :visible="visible"
      @close="closePopup"
      kind="custom"
      title="탈퇴 시 유의사항"
      yesBtn="확인"
      noBtn="닫기"
      boxPY="pb-5"
      :zIndex="500"
      :visibleScroll="false"
    >
      <div>
        <ul class="bullet_list fs16">
          <li>회원탈퇴 후 동일 아이디로 재가입이 불가능 합니다.</li>
          <li>브랜드 관리자는 권한위임 또는 브랜드 정보(승인 진행 중인 발신번호, 템플릿 포함) 삭제 이후 탈퇴 가능합니다.</li>
          <li>브랜드 부관리자는 즉시 탈퇴할 수 있습니다.</li>
          <li>대행사는 관리하는 브랜드가 있는 경우 탈퇴가 불가능 합니다.</li>
          <li>탈퇴 후 재가입시 신규로 가입되며 탈퇴 이전의 회원정보와 삭제한 서비스 정보는 복구되지 않습니다.</li>
        </ul>
      </div>
      <template slot="checkMsg">
        <div class="check_wrap">
          <span class="custom_checkbox">
            <input
              type="checkbox"
              id="checkbox01"
              v-model="formData.checkYn"
              true-value="Y"
              false-value="N"
              ref="checkAgree"
            >
            <label for="checkbox01">탈퇴 유의사항을 모두 확인하였으며, 탈퇴에 동의합니다.</label>
          </span>
        </div>
      </template>
    </custom-popup>
  </template>
  <script>
  import { CustomPopup } from '@/views/mypage/components/popupSet'
  import { deleteUser } from '@/api/utility/utility'
  import store from '@/store'
  
  export default {
    name: 'TerminatePopup',
    components: {
      CustomPopup
    },
    props: {
      visible: {
        type: Boolean
      }
    },
    data() {
      return {
        formData: {
          checkYn: 'N',
          lastCheckYn: 'N'
        }
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      closePopup(res) {
        if (res.ok) {
          this.terminate()
        } else {
          this.$emit('update:visible', false)
        }
      },
      validateData() {
        if (this.formData.checkYn !== 'Y') {
          this.$alertMsg('탈퇴에 동의해 주세요.').then(() => {
            this.$refs.checkAgree.focus()
          })
          return false
        }
        return true
      },
      terminate() {
        if (!this.validateData()) {
          return false
        }
  
        this.deleteUser()
      },
      deleteUser() {
        deleteUser(this.formData)
          .then(res => {
            this.doneTerminate()
          })
          .catch(err => {
            if (err.code === '60000033') {
              this.$confirmMsg(err.desc)
                .then(() => {
                  this.formData.lastCheckYn = 'Y'
                  this.deleteUser()
                })
                .catch(() => {
                  this.$emit('update:visible', false)
                })
            } else {
              this.$alertMsg(err.desc)
            }
          })
      },
      doneTerminate() {
        this.$alertMsg(
          '탈퇴 처리가 완료 되었습니다.<br/>서비스를 이용해 주셔서 감사합니다'
        ).then(() => {
          store.dispatch('Logout').then(() => {
            this.$router.push('/')
          })
        })
      }
    }
  }
  </script>
  <style>
  </style>
  