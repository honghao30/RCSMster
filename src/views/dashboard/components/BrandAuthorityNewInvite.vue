<template>
  <div
    class="modal__content--inner"
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">브랜드 운영권한 초대</p>
    </div>
    <div class="modal__content--body">
      <div class="top-notice--gray">
        <p>- 초대하실 분 이메일로 링크를 보내 초대합니다.</p>
        <p>- 초대 링크를 통해 가입해야 운영권한이 부여됩니다.</p>
      </div>
      <div class="table__wrap new-invite">
        <table class="table table-bodyonly">
          <colgroup>
            <col>
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">초대 브랜드</th>
              <td>
                <Dropdown :options="dropdownBarndInviteOptions" v-model='formData.brandId' placeholder="브랜드를 선택하세요." />
              </td>
            </tr>
            <tr class="new-mail">
              <th scope="row">이메일</th>
              <td>
                <div class="new-mail-box">
                  <div class="new-email-add" v-for="(email, index) in formData.emails" :key="index">
                    <div class="new-email-default">
                      <div class="new-email">
                        <span class="input">
                          <input type="text" placeholder="이메일을 입력해주세요." :ref="`email${index}`" v-model="email.value"  @input="inviteMail"/>
                        </span>
                      </div>
                      <ButtonCmp
                        type="btn-default-line"
                        size="medium"
                        @click="emailRemove(index)"
                      >삭제</ButtonCmp>
                    </div>
                  </div>
                  <ButtonCmp
                    type="btn-default-line"
                    size="medium"
                    @click="emailAdd"
                    v-if="formData.emails.length < 5 && formData.emails.length > 0"
                  >추가</ButtonCmp>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <!-- 초대 브랜드 선택 + 이메일 1개 이상 입력 시 활성화 처리 -->
        <ButtonCmp
          type="btn-blue"
          :disabled="!inviteMailNot"
          @click="sendEmail"
        >초대</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import { retrieveMyCorpBrandList, sendInviteEmail } from '@/api/service/manage'
import uiCommon from '@/components/js/uiCommon'

export default {
  components: {
    ButtonCmp,
    Dropdown
  },
  props: {
    modalsize: {
      type: String,
      default: ''
    },
    paramCorpId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dropdownBarndInviteOptions: [],
      value: '',
      inviteMailNot: false,
      formData: {
        corpId: this.$router.currentRoute.params.corpId,
        brandId: '',
        emails: [{ value: '' }]
      }
    }
  },
  computed: {
    corpId () {
      if (jglib.isEmpty(this.paramCorpId)) {
        return this.$router.currentRoute.params.corpId
      } else {
        return this.paramCorpId
      }
    }
  },
  created() {
    this.retrieveMyCorpBrandList()
  },
  methods: {
    retrieveMyCorpBrandList() {
      retrieveMyCorpBrandList(this.corpId).then((res) => {
        this.dropdownBarndInviteOptions = uiCommon.getDropDownCodes(res.result, 'brandNm', 'brandId', false)
      })
    },
    emailAdd() {
      if (this.formData.emails.length === 0) {
        this.formData.emails.push({ value: this.value })
        this.value = ''
      } else {
        this.formData.emails.push({ value: '' })
      }
      this.inviteMail()
    },
    emailRemove (index) {
      this.formData.emails.splice(index, 1)
      this.inviteMail()
    },
    inviteMail (e) {
      if (!jglib.isEmail(e.target.value)) {
        e.target.style.border = '1px solid red'
        return false
      }
      e.target.style.border = '1px solid #dddddd'
      this.inviteMailNot = this.formData.emails.some(input => input.value !== '') || this.value !== ''
    },
    validateEmail () {
      if (jglib.isEmpty(this.formData.brandId)) {
        this.$alertMsg('초대 브랜드를 선택해 주세요.')
        return false
      }
      for (let i = 0; i < this.formData.emails.length; i++) {
        let email = this.formData.emails[i].value
        this.$refs['email' + i][0].style.border = '1px solid #dddddd'
        if (!jglib.isEmail(email) || jglib.isEmpty(email)) {
          this.$refs['email' + i][0].style.border = '1px solid red'
          this.$refs['email' + i][0].focus()
          return false
        }
      }
      return true
    },
    sendEmail() {
      if (this.validateEmail()) {
        let formData = new FormData()
        formData.append('brandId', this.formData.brandId)
        for (let key in this.formData.emails) {
          formData.append('emails', this.formData.emails[key].value)
        }
        sendInviteEmail(this.formData.corpId, formData).then((res) => {
          if (res.code === '20000000') {
            this.$alertMsg('전송되었습니다.')
            this.$emit('closeModal')
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
