<template>
  <!-- 가입신청 중 담당자정보 -->
  <table class="tbl_row_type">
    <caption>
      <strong>담당자정보</strong>
      <p>아이디, 비밀번호, 비밀번호 확인, 이름, 휴대폰인증, 추가 연락처, 담당자 이메일</p>
    </caption>
    <colgroup>
      <col style="width:215px">
      <col style="width:auto">
    </colgroup>
    <tbody>
      <tr v-if="!this.view.isCertiMobile">
        <th scope="row">이름 <span class="require">*</span></th>
        <td>
          <div class="cont_flex_bundle">
            <span class="custom_input">
              <input type="text" placeholder="이름" ref="userNm" v-model.trim="formData.userNm" maxlength="200" @keydown="keydownOnlyText" @keyup="keyupUserNmOnlyTextAndWhitespace" @focusout="focusoutUserNmOnlyTextAndWhitespace">
            </span>
          </div>
        </td>
      </tr>
      <tr v-if="!this.view.isCertiMobile">
        <th scope="row">휴대폰인증 <span class="require">*</span></th>
        <td>
          <div class="cont_flex_bundle">
            <span class="custom_input">
              <input type="text" placeholder="'-'없이 숫자만 입력" ref="mblNum" v-model="formData.mblNum" maxlength="11" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keydown.enter="openCertiMobilePopup">
            </span>
            <button class="btn sml bd_black" ref="openCertiMobilePopup" @click="openCertiMobilePopup">
              <span>인증하기</span>
            </button>
          </div>
        </td>
      </tr>
      <tr v-if="this.view.isCertiMobile">
        <th scope="row">이름 <span class="require">*</span></th>
        <td>{{ formData.userNm }}</td>
      </tr>
      <tr v-if="this.view.isCertiMobile">
        <th scope="row">휴대폰번호 <span class="require">*</span></th>
        <td>{{ formData.mblNum | prettyMobile }}</td>
      </tr>
      <tr>
        <th scope="row">아이디 <span class="require">*</span></th>
        <td>
          <div class="cont_flex_bundle">
            <span class="custom_input">
              <input type="text" placeholder="아이디" ref="userId" v-model.trim="formData.userId" maxlength="20" @keydown="notAllowWhitespace" @keyup.enter="checkDuplicateUserId">
            </span>
            <button class="btn sml bd_black" ref="btnCheckDuplicateUserId" @click="checkDuplicateUserId">
              <span>아이디 중복확인</span>
            </button>
            <span class="text_desc">영문, 숫자 5~20자리 (영문 반드시 포함)</span>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">비밀번호 <span class="require">*</span></th>
        <td>
          <div class="cont_flex_bundle">
            <span class="custom_input">
              <input type="password" placeholder="비밀번호" ref="userPwd" v-model="formData.userPwd" @keydown="notAllowWhitespace">
            </span>
            <span class="text_desc">영문, 숫자, 특수문자 중 2가지 이상 조합하여 10자리 이상, 3가지 이상 조합하여 8자리 이상</span>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">비밀번호 확인 <span class="require">*</span></th>
        <td>
          <span class="custom_input">
            <input type="password" placeholder="비밀번호 확인" ref="userPwdConfirm" v-model="formData.userPwdConfirm" @keydown="notAllowWhitespace">
          </span>
        </td>
      </tr>
      <tr>
        <th scope="row">추가 연락처</th>
        <td>
          <div class="phone_number_area">
            <div class="input_phone_bundle">
              <span class="custom_select">
                <select ref="corpTelNum0" v-model="view.corpTelNum[0]">
                  <option :value="undefined">선택</option>
                  <option v-for="(tel, index) in selectList.tels" :key="`tel_${index}`" :value="tel.code">{{ tel.code }}</option>
                </select>
              </span>
              <span class="hypen">-</span>
              <span class="custom_input">
                <input type="text" placeholder ref="corpTelNum1" v-model="view.corpTelNum[1]" maxlength="4" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum">
              </span>
              <span class="hypen">-</span>
              <span class="custom_input">
                <input type="text" placeholder ref="corpTelNum2" v-model="view.corpTelNum[2]" maxlength="4" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum">
              </span>
            </div>
            <div class="input_phone_bundle">
              <span class="title">내선번호</span>
              <span class="custom_input">
                <input type="text" placeholder ref="corpTelExt" maxlength="4" v-model="formData.corpTelExt" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum">
              </span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{ userType === 'CORP' ? '담당자 이메일' : '대표 이메일' }}
          <span class="require">*</span>
        </th>
        <td>
          <div class="email_area">
            <span class="custom_input">
              <input type="text" placeholder ref="email0" v-model="view.email[0]" @input="view.email[0]=ignoreChar($event, ['WHITESPACE','KOR'])">
            </span>
            <span class="atsign">@</span>
            <span class="custom_input">
              <input v-if="!emailFormFlag" type="text" placeholder ref="email1" v-model="view.email[1]" @input="view.email[1]=ignoreChar($event, ['WHITESPACE','KOR'])">
              <input v-if="emailFormFlag" type="text" placeholder ref="email1" v-model="view.email[1]" disabled>
            </span>
            <span class="custom_select">
              <select v-model="view.emailDomain">
                <option value>직접입력</option>
                <option v-for="(email, index) in selectList.emails" :key="`email_${index}`" :value="email.code">{{email.codeNm}}</option>
              </select>
            </span>
          </div>
        </td>
      </tr>
    </tbody>
    <certi-mobile v-if="visibleCertiMobile" :visible.sync="visibleCertiMobile" :certInfo="formData" @done="callbackCertiMobile"/>
  </table>
</template>

<script>
import CertiMobile from '@/components/popupSet/CertiMobile'
import { ignoreChar, isOnlyPhoneNumber } from '@/utils/check'
import {
  retrieveCommonCode,
  duplicateCheck,
  checkDuplicationCI
} from '@/api/common/code'
export default {
  name: 'JoinUserInfo',
  components: {
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
      selectList: {
        tels: [],
        emails: []
      },
      view: {
        corpTelNum: [],
        email: [],
        emailDomain: '',
        isDirtyUserId: true,
        isCertiMobile: false
      },
      visibleCertiMobile: false
    }
  },
  created() {
    this.retrieveCommonCode()
  },
  mounted() {},
  computed: {
    isCorp() {
      return this.userType === 'CORP'
    },
    emailFormFlag() {
      return !jglib.isEmpty(this.view.emailDomain)
    }
  },
  watch: {
    'view.emailDomain'(value) {
      this.view.email[1] = value
    },
    'formData.userId'(value) {
      this.view.isDirtyUserId = true
    }
  },
  methods: {
    ignoreChar,
    retrieveCommonCode() {
      // 콤보 코드 목록 조회
      retrieveCommonCode('TEL_NO_CORP').then(res => {
        this.selectList.tels = res.result
      })
      retrieveCommonCode('EMAIL_DOMAIN').then(res => {
        this.selectList.emails = res.result
      })
    },
    checkDuplicateUserId() {
      if (!this.validateDuplicateUserId()) {
        return false
      }
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
    },
    validateDuplicateUserId() {
      if (jglib.isEmpty(this.formData.userId)) {
        this.$alertMsg('아이디를 입력해 주세요.').then(() => {
          this.$refs.userId.focus()
        })
        return false
      }
      if (!jglib.isUserId(this.formData.userId)) {
        this.$alertMsg('영문 또는 숫자 5자리 이상 15자리 이하로 입력해 주세요.(영문 반드시 포함)').then(() => {
          this.$refs.userId.focus()
        })
        return false
      }
      return true
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
    getUserData() {
      this.formData.email = this.view.email.join('@')
      this.formData.corpTelNum = jglib.isEmpty(this.view.corpTelNum) ? '' : this.view.corpTelNum.join('-')
      return _.clone(this.formData)
    },
    validateUserData() {
      if (!this.view.isCertiMobile) {
        this.$alertMsg('휴대폰인증을 해주세요.')
        return false
      }

      if (!this.validateDuplicateUserId()) {
        return false
      }

      if (this.view.isDirtyUserId) {
        this.$alertMsg('아이디 중복 확인을 해주세요.').then(() => {
          this.$refs.btnCheckDuplicateUserId.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.userPwd)) {
        this.$alertMsg('비밀번호를 입력하세요.').then(() => {
          this.$refs.userPwd.focus()
        })
        return false
      }

      let pwCheck = jglib.isVaildationPw(
        this.formData.userPwd,
        this.formData.userId,
        this.formData.mblNum
      )
      if (pwCheck.code !== 'success') {
        this.$alertMsg(pwCheck.message).then(() => {
          this.$refs.userPwd.focus()
        })
        return false
      }

      if (!jglib.isPw(this.formData.userPwd)) {
        this.$alertMsg('비밀번호 생성 규칙에 맞지 않습니다.').then(() => {
          this.$refs.userPwd.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.userPwdConfirm)) {
        this.$alertMsg('비밀번호 확인을 입력하세요.').then(() => {
          this.$refs.userPwdConfirm.focus()
        })
        return false
      }

      if (this.formData.userPwd !== this.formData.userPwdConfirm) {
        this.$alertMsg('비밀번호와 비밀번호 확인이 일치 하지 않습니다.').then(
          () => {
            this.$refs.userPwdConfirm.focus()
          }
        )
        return false
      }
      if (!jglib.isEmpty(this.view.corpTelNum[0]) || !jglib.isEmpty(this.view.corpTelNum[1]) || !jglib.isEmpty(this.view.corpTelNum[2])) {
        if (jglib.isEmpty(this.view.corpTelNum[0])) {
          this.$alertMsg('연락처를 선택해 주세요.').then(() => {
            this.$refs.corpTelNum0.focus()
          })
          return false
        }
        if (jglib.isEmpty(this.view.corpTelNum[1])) {
          this.$alertMsg('연락처를 입력해 주세요.').then(() => {
            this.$refs.corpTelNum1.focus()
          })
          return false
        }
        if (jglib.isEmpty(this.view.corpTelNum[2])) {
          this.$alertMsg('연락처를 입력해 주세요.').then(() => {
            this.$refs.corpTelNum2.focus()
          })
          return false
        }
      }

      if (jglib.isEmpty(this.view.email[0])) {
        this.$alertMsg('이메일을 입력해 주세요.').then(() => {
          this.$refs.email0.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.view.email[1])) {
        this.$alertMsg('이메일을 입력해 주세요.').then(() => {
          this.$refs.email1.focus()
        })
        return false
      }
      if (!jglib.isEmail(this.view.email[0] + '@' + this.view.email[1])) {
        this.$alertMsg('잘못된 이메일 형식 입니다.').then(() => {
          this.$refs.email0.focus()
        })
        return false
      }
      return true
    },
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
      this.formData.userNm = jglib.convertOnlyTextAndOneWhitespace(e.target.value)
    },
    focusoutUserNmOnlyTextAndWhitespace(e) {
      this.formData.userNm = jglib.convertOnlyTextAndOneWhitespace(e.target.value).trim()
    },
    openCertiMobilePopup() {
      if (jglib.isEmpty(this.formData.userNm)) {
        this.$alertMsg('이름을 입력해 주세요.').then(() => {
          this.$refs.userNm.focus()
        })
        return false
      } else if (!jglib.isUserName(this.formData.userNm)) {
        this.$alertMsg('이름을 정확히 입력해주세요.').then(() => {
          this.$refs.userNm.focus()
        })
        return false
      } else if (jglib.isEmpty(this.formData.mblNum)) {
        this.$alertMsg('휴대폰번호를 입력해 주세요.').then(() => {
          this.$refs.mblNum.focus()
        })
        return false
      } else if (!isOnlyPhoneNumber(this.formData.mblNum)) {
        this.$alertMsg('휴대폰번호만 입력할 수 있습니다.').then(() => {
          this.$refs.mblNum.focus()
        })
        return false
      }

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
  }
}
</script>

<style>
</style>
