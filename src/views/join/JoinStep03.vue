<template>
  <div class="join">
    <PageTitle pagetitle="기업담당자 회원가입" />
    <StepList :stepActiveIndex="3" :stepTitle="stepTitle" />
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
                    <p class="guide-text error" v-if="telErrorMsg">담당자 연락처를 입력해주세요.</p>
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
      >이전</ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        @click="onSubmit"
      >신청</ButtonCmp>
    </div>
    <!-- // 모달 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        v-if="phoneNumberCheck"
      >
        <div slot="msg">
          <div class="msg">
            동일한 휴대폰 번호로 회원가입 심사 중입니다.<br >
            승인 완료 시 이메일을 발송해드립니다.
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
              type="btn-blue-line"
              @click="closeMsg"
            >닫기
            </ButtonCmp>
            <ButtonCmp
            type="btn-blue"
            @click="closeMsg"
            >
              온라인 문의
            </ButtonCmp>
        </div>
      </ConfirmMsg>
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        modalsize="Modalmax480"
        v-else
      >
        <div slot="msg">
          <div class="msg">
            <div class="phone-cert__title">
              휴대폰 인증
            </div>
            <div class="phone-cert__msg">
              인증번호를 발송하였습니다.<br>
              수신 받은 인증번호를 입력해주세요
            </div>
            <div class="phone-cert__number">홍*동 010-****-5410</div>
            <div  class="phone-cert__number-input">
              <span class="input">
                <input ref="number" type="text" placeholder="인증번호"  v-model="form.certNumber">
              </span>
                <span class="time hide" ref="time">{{ TimerStr }}</span>
                <ButtonCmp
                  type="btn-gray-line"
                  :disabled="isButtonDisabled"
                  @click="start"
                >
                  인증번호 요청
                </ButtonCmp>
            </div>
            <p class="guide-text error" v-if="phoneCheckTimeout">인증 유효시간이 지났습니다.</p>
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
              type="btn-blue-line"
              @click="closeMsg"
            >닫기
            </ButtonCmp>
            <ButtonCmp
              type="btn-blue"
              :disabled="!isDisabled"
              @click="closeMsg"
            >
              인증
            </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- // 모달 -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import StepList from '@/components/common/StepList.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    StepList,
    ConfirmMsg
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
        tel: '',
        certNumber: ''
      },
      nameErrorMsg: false,
      idErrorMsg: false,
      phoneErrorMsg: false,
      passErrorMsg: false,
      emailErrorMsg: false,
      telErrorMsg: false,
      isModalViewed: false,
      phoneNumberCheck: true,
      phoneCheckTimeout: false,
      Timer: null,
      TimeCounter: 180,
      TimerStr: '03:00',
      stepTitle: ['약관동의', '기업정보 입력', '회원정보 입력', '가입완료']
    }
  },
  watch: {
    isModalViewed () {
      if (this.isModalViewed) {
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  computed: {
    isDisabled() {
      return this.form.certNumber.length > 0
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
      if (this.form.id === '') {
        this.idErrorMsg = true
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
        return
      }
      this.$router.push('./JoinStep04')
    },
    checkCertificate () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
      }
    },
    phoneCertificate () {
      if (this.form.phone === '') {
        this.phoneErrorMsg = true
      } else if (this.form.phone === '1') {
        this.isModalViewed = true
      } else {
        this.phoneNumberCheck = false
        this.isModalViewed = true
      }
    },
    closeMsg () {
      this.isModalViewed = false
    },
    start() {
      this.isModalViewed = true
      this.$refs.time.classList.remove('hide')
      this.$refs.time.classList.add('active')
      this.isButtonDisabled = true

      // 1초에 한번씩 start 호출
      this.TimeCounter = 180
      var interval = setInterval(() => {
        this.TimeCounter-- // 1초씩 감소
        this.TimerStr = this.prettyTime()
        if (this.TimeCounter <= 0) this.timerStop(interval)
      }, 1000)
      return interval
    },
    timerStop: function(Timer) {
      clearInterval(Timer)
      this.TimeCounter = 0
      if (this.form.certNumber === '') {
        this.phoneCheckTimeout = true
      }
    },
    prettyTime: function() {
      // 시간 형식으로 변환 리턴
      let time = this.TimeCounter / 60
      let minutes = parseInt(time)
      let secondes = Math.round((time - minutes) * 60)
      return (
        minutes.toString().padStart(2, '0') +
        ':' +
        secondes.toString().padStart(2, '0')
      )
    }
  }
}
</script>
