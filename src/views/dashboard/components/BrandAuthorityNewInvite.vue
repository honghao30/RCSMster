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
                <Dropdown :options="dropdownBarndInviteOptions" placeholder="브랜드를 선택하세요." />
              </td>
            </tr>
            <tr class="new-mail">
              <th scope="row">이메일</th>
              <td>
                <div class="new-mail-box">
                  <div class="new-email-default" v-if="emails.length===0">
                    <div class="new-email">
                      <span class="input">
                        <input type="text" placeholder="이메일을 입력해주세요." v-model="value" @input="inviteMail"/>
                      </span>
                    </div>
                    <ButtonCmp
                      type="btn-default-line"
                      size="medium"
                      @click="emailAdd"
                    >추가</ButtonCmp>
                  </div>
                  <div class="new-email-add" v-else v-for="(email, index) in emails" :key="index">
                    <div class="new-email-default">
                      <div class="new-email">
                        <span class="input">
                          <input type="text" placeholder="이메일을 입력해주세요." v-model="email.value"  @input="inviteMail"/>
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
                    v-if="emails.length < 5 && emails.length > 0"
                  >추가</ButtonCmp>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <PagingCmp />
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
          @click="$emit('closeModal')"
        >초대</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

export default {
  components: {
    ButtonCmp,
    Dropdown,
    PagingCmp
  },
  props: {
    modalsize: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dropdownBarndInviteOptions: [
        {
          label: 'SYSTEM STUDIOS',
          value: '01'
        },
        {
          label: 'LANVIN COLLECTION',
          value: '02'
        },
        {
          label: '더캐시미어',
          value: '03'
        },
        {
          label: '클럽모나코​',
          value: '04'
        }
      ],
      emails: [],
      value: '',
      inviteMailNot: false
    }
  },
  methods: {
    emailAdd() {
      if (this.emails.length === 0) {
        this.emails.push({ value: this.value })
        this.value = ''
      } else {
        this.emails.push({ value: '' })
      }
      this.inviteMail()
    },
    emailRemove (index) {
      this.emails.splice(index, 1)
      this.inviteMail()
    },
    inviteMail () {
      this.inviteMailNot = this.emails.some(input => input.value !== '') || this.value !== ''
    }
  }
}
</script>

<style>
</style>
