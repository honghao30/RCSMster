<template>
  <div>
    <PageTitleH3 titleh3="회원정보 입력" noticeinfo="필수 입력값" />
    <form>
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
                <th scope="row">
                  <span class="form-item__label required">이름</span>
                </th>
                <td colspan="3">
                    <div class="form-item__content">
                        <div class="form-item-row">
                            <div class="input-item">
                                <span class="input">
                                  <input type="text" class="input" placeholder="담당자 이름을 입력해주세요." ref="userNm" v-model.trim="formData.userNm" :disabled="view.isCertiMobile"
                                  maxlength="64" @keydown="keydownOnlyText" @keyup="keyupUserNmOnlyTextAndWhitespace" @focusout="userNmValidation">
                                </span>
                            </div>
                        </div>
                        <p class="guide-text error" v-if="error.userNm">{{ error.userNm }}</p>
                    </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <span class="form-item__label required">휴대폰</span>
                </th>
                <td colspan="3">
                    <div class="form-item__content">
                        <div class="form-item-row">
                            <div class="input-item">
                                <span class="input">
                                  <input type="text" class="input" placeholder="‘-’없이 자리 숫자만 입력해주세요." ref="mblNum" v-model="formData.mblNum" :disabled="view.isCertiMobile"
                                  maxlength="11" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keydown.enter="openCertiMobilePopup" @focusout="mblNumValidation">
                                </span>
                                <ButtonCmp type="btn-default-line" :disabled="view.isCertiMobile" @click="openCertiMobilePopup">휴대폰 인증</ButtonCmp>
                            </div>
                            <p class="guide-text error" v-if="error.mblNum">{{ error.mblNum }}</p>
                        </div>
                    </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">아이디</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input">
                          <input type="text" class="input" placeholder="아이디 입력해주세요." ref="userId" v-model.trim="formData.userId"
                          maxlength="20" @keydown="notAllowWhitespace" @keyup.enter="checkDuplicateUserId" @focusout="userIdValidation">
                        </span>
                        <ButtonCmp type="btn-default-line" @click="checkDuplicateUserId">아이디 중복확인</ButtonCmp>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="error.userId">{{ error.userId }}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">비밀번호</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input">
                          <input type="password" class="input" placeholder="비밀번호를 입력하세요" ref="userPwd" v-model="formData.userPwd"
                          @keydown="notAllowWhitespace" @focusout="userPwdValidation">
                        </span>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="error.userPwd">{{ error.userPwd }}</p>
                    <!-- <p class="guide-text error">비밀번호을 입력해주세요.</p> -->
                    <p class="guide-text black">&middot; 영문, 숫자, 특수문자 중 2개 이상 사용 (2개 조합 시 10자리 이상 / 3개 조합 시 8자리 이상)</p>
                    <!-- <p class="guide-text validation">영문, 숫자, 특수문자 중 2개 이상 사용 (2개 조합 시 10자리 이상 / 3개 조합 시 8자리 이상)</p> -->
                    <p class="guide-text black">&middot; 연속적인 숫자 또는 문자 사용 불가 (예 : 1234, abcd)</p>
                    <!-- <p class="guide-text error">연속적인 숫자 또는 문자 사용 불가 (예 : 1234, abcd)</p> -->
                    <p class="guide-text black">&middot; 아이디, 핸드폰 번호와 동일한 숫자 또는 문자 사용 불가</p>
                    <!-- <p class="guide-text validation">아이디, 핸드폰 번호와 동일한 숫자 또는 문자 사용 불가</p> -->
                    <p class="guide-text black">&middot; 최근 사용한 비밀번호 3개 사용 불가</p>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">비밀번호 확인</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input">
                          <input type="password" class="input" placeholder="비밀번호를 다시 한번 입력하세요" ref="userPwdConfirm" v-model="formData.userPwdConfirm"
                          @keydown="notAllowWhitespace" @focusout="userPwdConfirmValidation">
                        </span>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="error.userPwdConfirm">{{ error.userPwdConfirm }}</p>
                    <!-- <p class="guide-text validation">새 비밀번호 확인이 완료되었습니다.</p> -->
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">담당자 이메일</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input">
                          <input type="text" class="input" placeholder="담당자 이메일을 입력해주세요." ref="email" v-model="formData.email"
                          @input="formData.email=ignoreChar($event, ['WHITESPACE','KOR'])" @focusout="emailValidation">
                        </span>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="error.email">{{ error.email }}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">담당자 연락처</span></th>
                <td>
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input">
                          <input type="text" class="input" placeholder="‘-’없이 자리 숫자만 입력해주세요." maxlength="11" ref="corpTelNum" v-model="formData.corpTelNum"
                          @keydown="keydownOnlyNum" @keyup="keyupOnlyNum">
                        </span>
                      </div>
                    </div>
                    <!-- <p class="guide-text error" v-if="telErrorMsg">담당자 연락처를 입력해주세요.</p> -->
                  </div>
                </td>
                <th scope="row"><span class="form-item__label">내선번호</span></th>
                <td class="align--top">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input">
                          <input type="text" class="input" placeholder="내선번호를 입력해주세요." maxlength="4" ref="corpTelExt" v-model="formData.corpTelExt"
                          @keydown="keydownOnlyNum" @keyup="keyupOnlyNum">
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    </form>
    <!-- 모달 창 -->
    <ModalView v-if="visibleCertiMobile">
      <CertiMobile v-if="visibleCertiMobile" :visible.sync="visibleCertiMobile" :certInfo="formData" @done="callbackCertiMobile" />
    </ModalView>
    <!-- //모달 창 -->
  </div>
</template>

<script>
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import CertiMobile from '@/views/join/components/CertiMobile'
import { ignoreChar, isOnlyPhoneNumber } from '@/utils/check'
import { duplicateCheck, checkDuplicationCI } from '@/api/common/code'

export default {
  components: {
    ButtonCmp,
    PageTitleH3,
    ModalView,
    CertiMobile
  },
  props: {
    userType: {
      type: String,
      default() {
        return 'CORP'
      }
    },
    corpId: {
      type: String,
      default() {
        return null
      }
    },
    paramEmail: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      formData: {
        userId: '',
        userPwd: '',
        userPwdConfirm: '',
        userNm: '',
        mblNum: '',
        corpTelNum: '',
        corpTelExt: '',
        email: ''
      },
      view: {
        isDirtyUserId: true,
        isCertiMobile: false
      },
      visibleCertiMobile: false,
      error: {
        userNm: '',
        mblNum: '',
        userId: '',
        userPwd: '',
        userPwdConfirm: '',
        email: ''
      }
    }
  },
  watch: {
    'formData.userId'(value) {
      this.view.isDirtyUserId = true
    }
  },
  computed: {},
  mounted() {
    this.formData.email = this.paramEmail
  },
  methods: {
    ignoreChar,
    notAllowWhitespace(e) {
      jglib.notAllowWhitespace(e)
    },
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    keydownOnlyText(e) {
      return jglib.keydownOnlyText2(e)
    },
    keyupUserNmOnlyTextAndWhitespace(e) {
      this.formData.userNm = jglib.convertOnlyTextAndOneWhitespace(e.target.value).trim()
    },
    userNmValidation() {
      let result = true
      this.error.userNm = ''

      if (jglib.isEmpty(this.formData.userNm)) {
        this.error.userNm = '담당자 이름을 입력해주세요.'
        result = false
      } else if (!jglib.isUserName(this.formData.userNm)) {
        this.error.userNm = '담당자 이름을 정확히 입력해주세요.'
        result = false
      }

      this.userInfoValidation()
      return result
    },
    mblNumValidation() {
      let result = true
      this.error.mblNum = ''

      if (jglib.isEmpty(this.formData.mblNum)) {
        this.error.mblNum = '휴대폰 번호를 입력해주세요.'
        result = false
      } else if (!isOnlyPhoneNumber(this.formData.mblNum)) {
        this.error.mblNum = '휴대폰 번호만 입력할 수 있습니다.'
        result = false
      }

      this.userInfoValidation()
      return result
    },
    userIdValidation() {
      let result = true
      this.error.userId = ''

      if (jglib.isEmpty(this.formData.userId)) {
        this.error.userId = '아이디를 입력해주세요.'
        result = false
      } else if (!jglib.isUserId(this.formData.userId)) {
        this.error.userId = '영문 또는 숫자 5자리 이상 15자리 이하로 입력해 주세요.(영문 반드시 포함)'
        result = false
      }
      this.userInfoValidation()
      return result
    },
    userPwdValidation() {
      let result = true
      let pwCheck = jglib.isVaildationPw(
        this.formData.userPwd,
        this.formData.userId,
        this.formData.mblNum
      )
      this.error.userPwd = ''

      if (jglib.isEmpty(this.formData.userPwd)) {
        this.error.userPwd = '비밀번호를 입력하세요.'
        result = false
      } else if (pwCheck.code !== 'success') {
        this.error.userPwd = pwCheck.message
        result = false
      } else if (!jglib.isPw(this.formData.userPwd)) {
        this.error.userPwd = '비밀번호 생성 규칙에 맞지 않습니다.'
        result = false
      }

      this.userInfoValidation()
      return result
    },
    userPwdConfirmValidation() {
      let result = true
      this.error.userPwdConfirm = ''

      if (jglib.isEmpty(this.formData.userPwdConfirm)) {
        this.error.userPwdConfirm = '비밀번호 확인을 입력하세요.'
        result = false
      } else if (this.formData.userPwd !== this.formData.userPwdConfirm) {
        this.error.userPwdConfirm = '비밀번호와 비밀번호 확인이 일치 하지 않습니다.'
        result = false
      }

      this.userInfoValidation()
      return result
    },
    emailValidation() {
      let result = true
      this.error.email = ''

      if (jglib.isEmpty(this.formData.email)) {
        this.error.email = '이메일을 입력해 주세요.'
        result = false
      } else if (!jglib.isEmail(this.formData.email)) {
        this.error.email = '잘못된 이메일 형식 입니다.'
        result = false
      }

      this.userInfoValidation()
      return result
    },
    openCertiMobilePopup() {
      let userNmPass = this.userNmValidation()
      let mblNumPass = this.mblNumValidation()

      if (userNmPass && mblNumPass) {
        let params = {
          userType: this.userType,
          mblNum: this.formData.mblNum
        }

        if (this.corpId) {
          params.corpId = this.corpId
        }
        checkDuplicationCI(params)
          .then(() => {
            this.visibleCertiMobile = true
          })
          .catch(err => {
            this.$alertMsg(err.desc)
          })
      }
    },
    checkDuplicateUserId() {
      let userIdPass = this.userIdValidation()

      if (userIdPass) {
        duplicateCheck({ userId: this.formData.userId })
          .then(() => {
            this.$alertMsg('사용가능한 아이디 입니다.')
            this.view.isDirtyUserId = false
          })
          .catch(res => {
            this.$alertMsg(res.desc).then(() => {
              this.$refs.userId.focus()
            })
          })
      }
    },
    closeConfirm() {
      this.visibleCertiMobile = false
    },
    // 모바일 인증 콜백
    callbackCertiMobile() {
      let params = {
        userType: this.userType,
        userNm: this.formData.userNm,
        mblNum: this.formData.mblNum
      }
      checkDuplicationCI(params)
        .then(() => {
          this.view.isCertiMobile = true
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    userInfoValidation() {
      if (jglib.isEmpty(this.formData.userNm) || jglib.isEmpty(this.formData.mblNum) || jglib.isEmpty(this.formData.userId) ||
      jglib.isEmpty(this.formData.userPwd) || jglib.isEmpty(this.formData.userPwdConfirm) || jglib.isEmpty(this.formData.email)) {
        this.$emit('changeUserInfo', false)
        return
      }

      if (this.error.userNm || this.error.mblNum || this.error.userId || this.error.userPwd || this.error.userPwdConfirm || this.error.email) {
        this.$emit('changeUserInfo', false)
        return
      }

      this.$emit('changeUserInfo', true)
    },
    getUserData() {
      if (!this.view.isCertiMobile) {
        this.$alertMsg('휴대폰인증을 해주세요.').then(() => {
          this.$refs.mblNum.focus()
        })

        return
      }

      if (this.view.isDirtyUserId) {
        this.$alertMsg('아이디 중복 확인을 해주세요.').then(() => {
          this.$refs.userId.focus()
        })
        return
      }

      return _.clone(this.formData)
    }
  }
}
</script>
