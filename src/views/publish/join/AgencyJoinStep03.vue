<template>
  <div class="join">
    <PageTitle pagetitle="대행사 회원가입" />
    <JoinStep :step="3" :agency=true />
    <PageTitleH3 titleh3="회원정보 입력" noticeinfo="필수 입력값" />
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
                <th scope="row"><span class="form-item__label required">이름</span></th>
                <td colspan="3">
                    <div class="form-item__content">
                        <div class="form-item-row">
                            <div class="input-item">
                                <span class="input"><input type="text" class="input" placeholder="담당자 이름을 입력해주세요." v-model="form.name"></span>
                            </div>
                        </div>
                        <p class="guide-text error" v-if="nameErrorMsg">담당자 이름을 입력해주세요.</p>
                    </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">휴대폰 번호</span></th>
                <td colspan="3">
                    <div class="form-item__content">
                        <div class="form-item-row">
                            <div class="input-item">
                                <span class="input"><input type="text" class="input" placeholder="‘-’없이 자리 숫자만 입력해주세요." v-model="form.phone"></span>
                                <ButtonCmp
                                    type="btn-default-line"
                                    @click="phoneCertificate"
                                >
                                휴대폰 인증
                                </ButtonCmp>
                            </div>
                            <p class="guide-text error" v-if="phoneErrorMsg">휴대폰 번호을 입력해주세요.</p>
                        </div>
                    </div>
                </td>
              </tr>
              <!-- 휴대폰 인증 이후 인증번호 입력 폼이 필요할듯 한데.. 확인 필요 -->
              <tr>
                <th scope="row"><span class="form-item__label required">아이디</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" placeholder="아이디 입력해주세요." v-model="form.id"></span>
                        <ButtonCmp
                            type="btn-default-line"
                            @click="checkCertificate"
                        >
                          아이디 중복확인
                        </ButtonCmp>
                      </div>
                    </div>
                    <p class="guide-text error"  v-if="idErrorMsg">아이디를 입력해주세요.</p>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">비밀번호</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" placeholder="비밀번호를 입력하세요"  v-model="form.pass"></span>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="passErrorMsg">비밀번호을 입력해주세요.</p>
                    <p class="guide-text black">&middot; 영문, 숫자, 특수문자 중 2개 이상 사용 (2개 조합 시 10자리 이상 / 3개 조합 시 8자리 이상)</p>
                    <p class="guide-text validation">영문, 숫자, 특수문자 중 2개 이상 사용 (2개 조합 시 10자리 이상 / 3개 조합 시 8자리 이상)</p>
                    <p class="guide-text black">&middot; 연속적인 숫자 또는 문자 사용 불가 (예 : 1234, abcd)</p>
                    <p class="guide-text error">연속적인 숫자 또는 문자 사용 불가 (예 : 1234, abcd)</p>
                    <p class="guide-text black">&middot; 아이디, 핸드폰 번호와 동일한 숫자 또는 문자 사용 불가</p>
                    <p class="guide-text validation">아이디, 핸드폰 번호와 동일한 숫자 또는 문자 사용 불가</p>
                    <p class="guide-text black">&middot; 최근 사용한 비밀번호 3개 사용 불가</p>
                    <p class="guide-text error">최근 사용한 비밀번호 3개 사용 불가</p>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">비밀번호 확인</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" placeholder="비밀번호를 다시 한번 입력하세요"  v-model="form.passre"></span>
                      </div>
                    </div>
                    <p class="guide-text validation">새 비밀번호 확인이 완료되었습니다.</p>
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
                        <span class="input"><input type="text" class="input" placeholder="내선번호를 입력해주세요."   v-model="form.bizevent"></span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
        >취소</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="onSubmit"
        >회원가입</ButtonCmp>
      </div>
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
import ModalView from '@/components/common/ModalView.vue'
import CertificateMsg from '@/views/publish/join/CertificateMsg.vue'
import JoinStep from '@/views/publish/join/JoinStep'
export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    CertificateMsg,
    JoinStep
  },
  data() {
    return {
      form: {
        name: '',
        id: '',
        phone: '',
        pass: '',
        passre: '',
        email: '',
        tel: ''
      },
      nameErrorMsg: false,
      idErrorMsg: false,
      phoneErrorMsg: false,
      passErrorMsg: false,
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
      if (this.form.pass === '') {
        this.passErrorMsg = true
        return
      }
      if (this.form.email === '') {
        this.emailErrorMsg = true
        return
      }
      if (this.form.tel === '') {
        this.telErrorMsg = true
        // return
      }
    },
    checkCertificate () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
        return
      }
      this.showall = false
      this.isModalViewed = true
      // document.body.classList.add('modal-open')
    },
    phoneCertificate () {
      alert('휴대폰 인증')
    }
  }
}
</script>
