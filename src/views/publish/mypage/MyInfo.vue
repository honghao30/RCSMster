<template>
  <div class="inner mypage">
    <PageTitle pagetitle="개인정보 관리" />
    <PageTitleH3 titleh3="내 계정 정보" noticeinfo="필수 입력값" />
    <form  ref="form" :model="form">
        <div class="table__wrap">
          <table class="table table-bodyonly form-table">
            <colgroup>
              <col width="200px">
              <col />
              <col width="85px">
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row"><span class="form-item__label">아이디</span></th>
                <td colspan="3">CX Hub</td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">계정정보</span></th>
                <td colspan="3">마스터</td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">이름</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" value="홍길동" placeholder="이름을 입력해주세요." v-model="form.name"></span>
                      </div>
                      <p class="guide-text error" v-if="nameErrorMsg">이름을 입력해주세요.</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">휴대폰 번호</span></th>
                <td colspan="3">
                    <div class="form-item__content">
                        <div class="form-item-row">
                            <div class="input-item">
                                <span class="input"><input type="text" class="input" value="010-1234-5678" disabled v-model="form.phone"></span>
                                <ButtonCmp
                                    type="btn-default-line"
                                    @click="phoneCertificate"
                                >
                                휴대폰 번호 변경
                                </ButtonCmp>
                            </div>
                            <p class="guide-text black">※ 휴대폰번호 변경 시 본인인증은 필수입니다.</p>
                            <p class="guide-text error" v-if="phoneErrorMsg">휴대폰 번호를 입력해주세요.</p>
                        </div>
                    </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">담당자 이메일</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" placeholder="담당자 이메일을 입력해주세요."   v-model="form.email"></span>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="emailErrorMsg">담당자 이메일을 입력해주세요.</p>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">담당자 연락처</span></th>
                <td>
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" placeholder="‘-’없이 자리 숫자만 입력해주세요."   v-model="form.tel"></span>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="telErrorMsg">전화번호 이메일을 입력해주세요.</p>
                  </div>
                </td>
                <th scope="row"><span class="form-item__label">내선번호</span></th>
                <td class="align--top">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" placeholder="내선번호를 입력해주세요."   v-model="form.extNum"></span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">비밀번호 변경</span></th>
                <td colspan="3">
                  <router-link
                    to="/pwchange"
                    class="btn btn-default-line"
                  >
                    <span>비밀번호 변경</span>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
            type="btn-default-line inactive"
          >회원 탈퇴</ButtonCmp>
        </div>
        <div class="button__wrap">
          <ButtonCmp
            type="btn-line"
          >취소</ButtonCmp>
          <router-link
            to="/"
            class="btn btn-blue-line"
          >기업정보 관리</router-link>
          <ButtonCmp
            type="btn-blue"
            @click="onSubmit"
          >저장</ButtonCmp>
        </div>
      </form>
        <ModalView
          v-if="isModalViewed" @closeModal="isModalViewed = false"
        >
          <CertificateMsg @closeModal="isModalViewed = false" />
        </ModalView>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3
  },
  data() {
    return {
      form: {
        name: '',
        phone: '010-1234-5678',
        email: '',
        tel: '',
        extNum: ''
      },
      nameErrorMsg: false,
      phoneErrorMsg: false,
      emailErrorMsg: false,
      telErrorMsg: false
    }
  },
  methods: {
    onSubmit () {
      if (this.form.name === '') {
        this.nameErrorMsg = true
        return
      }
      if (this.form.phone === '') {
        this.phoneErrorMsg = true
        return
      }
      if (this.form.email === '') {
        this.emailErrorMsg = true
        return
      }
      if (this.form.tel === '') {
        this.telErrorMsg = true
        return
      }
    }
  }
}
</script>
