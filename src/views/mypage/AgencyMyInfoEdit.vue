<!-- 0620: 파일 명 변경 된 페이지 (기존 파일 명:MyInfoAgency.vue ) 대행사_개인정보 관리 편집 -->
<template>
  <div class="join">
    <PageTitle pagetitle="개인정보 관리" />
    <PageTitleH3 titleh3="내 계정 정보" />
    <form ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
        <!-- 0620: 디자인 1차 수정 - colgroup width값 수정 -->
          <colgroup>
              <col width="230px">
              <col width="390px">
              <col />
              <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">아이디</span></th>
              <td colspan="3">
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">CX Hub</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">계정정보</span></th>
              <td colspan="3">
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">대행사</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">이름</span></th>
              <!-- 디자인 1차 수정 -->
              <td colspan="3">
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                      <span class="input input-info"><input type="text" class="input" placeholder="이름을 입력해주세요." v-model="form.name"></span>
                    </div>
                    <p class="guide-text error" v-if="nameErrorMsg">이름을 입력해주세요.</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="tr__border">
              <th scope="row"><span class="form-item__label required">휴대폰(관리자)</span></th>
              <td colspan="3">
                  <div class="input">
                      <div class="form-item-row">
                          <div class="input-item">
                          <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                              <span class="input input-info"><input type="text" class="input" placeholder="‘-’없이 자리 숫자만 입력해주세요." v-model="form.phone"></span>
                              <ButtonCmp
                                  type="btn-default-line"
                                  @click="phoneCertificate"
                              >
                              휴대폰 번호 변경
                              </ButtonCmp>
                          </div>
                          <p class="guide-text black">&bull; 휴대폰번호 변경 시 본인인증은 필수입니다.</p>
                          <p class="guide-text error" v-if="phoneErrorMsg">휴대폰 번호을 입력해주세요.</p>
                      </div>
                  </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">휴대폰(담당자)</span></th>
              <td colspan="3">
                <div class="form-item__content">
                    <div class="form-item-row agency-phone"
                      v-for="(manager, index) in manageList"
                      :key="index"
                    >
                    <template v-if="manager.num != null">
                    <!-- 0620: 디자인 1차 수정 - 두가지 경우 추가 -->
                      <!-- 등록된 매니저가 있는 경우 -->
                      <div class="input-item">
                        <span class="inpun-item__title">이름</span>
                        <span class="input">
                          <input type="text" class="input" v-model="form.name" disabled>
                        </span>
                      </div>
                      <div class="input-item">
                        <span class="inpun-item__title">휴대폰 번호</span>
                        <span class="input">
                          <input type="text" class="input"  v-model="form.phone" disabled>
                        </span>
                      </div>
                      <!-- 등록된 매니저가 없는 경우 -->
                    </template>
                    <template v-else>
                      <div class="input-item">
                        <span class="inpun-item__title">이름</span>
                        <span class="input">
                          <input type="text" class="input" placeholder="이름을 입력해주세요.">
                        </span>
                      </div>
                      <div class="input-item">
                        <span class="inpun-item__title">휴대폰 번호</span>
                        <span class="input">
                          <input type="text" class="input" placeholder="‘-’없이 숫자만 입력해주세요.">
                        </span>
                      </div>
                    </template>
                      <ButtonCmp
                        type="btn-default-line"
                        size="small"
                        @click="removeManager"
                      >
                      삭제
                      </ButtonCmp>
                    </div>
                    <ButtonCmp
                      type="btn-default-line"
                      size="small"
                      @click="AddManager"
                    >
                    추가
                    </ButtonCmp>
                    <p class="guide-text black">&bull; 대행사 관리를 위한 추가 사용자를 최대10개 등록할 수 있습니다.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">담당자 이메일</span></th>
              <td colspan="3">
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                      <span class="input input-info"><input type="text" class="input" placeholder="이메일을 입력해 주세요." v-model="form.email"></span>
                    </div>
                  </div>
                  <p class="guide-text black">&bull; 담당자 이메일을 입력해주세요.</p>
                  <!-- <p class="guide-text error" v-if="emailErrorMsg">담당자 이메일을 입력해주세요.</p> -->
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">담당자 연락처</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="dropdown-tel"><Dropdown :options="dropdownTel" value="선택" @beforeChange="isChange" v-model="form.telFirst" /></span>
                      <span>-</span>
                      <span class="input input-tel"><input type="text" class="input" placeholder="" v-model="form.telMiddle"></span>
                      <span>-</span>
                      <span class="input input-tel"><input type="text" class="input" placeholder="" v-model="form.telLast"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="telErrorMsg">담당자 연락처를 입력해주세요.</p>
                </div>
              </td>
              <th scope="row" class="th-tel"><span class="form-item__label">내선번호</span></th>
              <td class="align--top">
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input input-tel"><input type="text" class="input" placeholder=""  v-model="form.bizevent"></span>
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
    </form>
    <PageTitleH3 titleh3="서비스정보 입력" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
        <!-- 0620: 디자인 1차 수정 - colgroup width값 수정 -->
          <colgroup>
            <col width="230px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">API KEY</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item justify">
                      <span class="text">SK.U2OEo9pOzelDe0T</span>
                      <ButtonCmp
                              type="btn-default-line"
                          >
                          API KEY 재발급
                      </ButtonCmp>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">API Client IP</span></th>
              <td>
                <div class="form-item__content">
                    <div class="form-item-row agency-ip"
                      v-for="(api, index) in apiList"
                      :key="index"
                    >
                    <template v-if="api">
                      <div class="input-item">
                        <span class="input">
                          <input type="text" class="input" v-model="form.ip" placeholder="단일 IP 주소 입력">
                        </span>
                      </div>
                      <div class="input-item">
                        <span class="input">
                          <input type="text" class="input" v-model="form.ipName" placeholder="항목명">
                        </span>
                      </div>
                    </template>
                      <ButtonCmp
                        type="btn-default-line"
                        size="small"
                        @click="removeApi"
                      >
                      삭제
                      </ButtonCmp>
                    </div>
                    <ButtonCmp
                      type="btn-default-line"
                      size="small"
                      @click="AddApi"
                    >
                    추가
                    </ButtonCmp>
                    <p class="guide-text black">&bull; 대행사 관리를 위한 추가 사용자를 최대10개 등록할 수 있습니다.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">Agency Key</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row agency-key">
                    <div class="input-item">
                      <table class="inner-table">
                        <tbody>
                          <tr>
                            <td>
                              <span class="flag-progress">동기화 완료</span>
                            </td>
                            <td><span class="text">AK.TxMIxUI1s20cgR5</span></td>
                            <td><span class="text">2022. 03. 30</span></td>
                            <td><span class="text">15:40:08</span></td>
                            <td><span class="text">system</span></td>
                            <td><ButtonCmp
                                  type="btn-default-line"
                                    >
                                    Agency Key 삭제
                                </ButtonCmp>
                                <ButtonCmp
                                    type="btn-only-icon"
                                    iconname="icon-tooltip"
                                ><span class="irtext">설명</span>
                                </ButtonCmp>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span class="flag-progress">동기화 완료</span>
                            </td>
                            <td><span class="text">AK.TxMIxUI1s20cgR5</span></td>
                            <td><span class="text">2022. 03. 30</span></td>
                            <td><span class="text">15:40:08</span></td>
                            <td><span class="text">system</span></td>
                            <td><ButtonCmp
                                  type="btn-default-line"
                                    >
                                    Agency Key 재발급
                                </ButtonCmp>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p class="guide-text black">&bull; Biz RCS 메시지 발송 시 필요한 대행사별 특수키입니다. 보안을 위해 외부에 노출되지 않도록 유의하세요.</p>
                    <p class="guide-text black">&bull; Biz RCS 메시지 신규 보안 정책 적용 시 최초 발송 대행사는 반드시 Agency Key를 삽입하여 발송해야 합니다.</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <!-- 0620: 디자인 1차 수정 - 버튼 구조 및 class 수정 -->
    <div class="button__wrap flex-end">
      <ButtonCmp
        @click="goMemberWithdraw"
        type="btn-line medium"
      >회원 탈퇴</ButtonCmp>
    </div>
    <div class="button__wrap space-between">
      <ButtonCmp
        type="btn-line"
      >취소</ButtonCmp>
      <div class="button__wrap button__left">
        <ButtonCmp
          type="btn btn-line"
          @click="corpInfo"
        >비즈니스 정보 관리</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="onSubmit"
        >저장</ButtonCmp>
      </div>
    </div>
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        modalsize="Modalmax480"
        v-if="phoneNumberCheck"
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
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        v-if="myInfoSave"
      >
        <div slot="msg">
          <div class="msg">
            변경사항을 저장하였습니다.
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
            type="btn-blue"
            @click="closeMsg"
            >
              확인
            </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import Dropdown from '@/components/common/Dropdown.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    ConfirmMsg,
    Dropdown
  },
  data() {
    return {
      form: {
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'hahahaha123456@the-51.com',
        tel: '010-1234-5678'
      },
      dropdownTel: [
        { label: '010' },
        { label: '070' },
        { label: '02' },
        { label: '031' },
        { label: '032' },
        { label: '…​' },
        { label: '062' },
        { label: '063' },
        { label: '064' }
      ],
      manageList: [
        {
          num: 1,
          name: '홍길동',
          phone: '010-1234-5678'
        }
      ],
      apiList: [
        {
          num: 1,
          name: '홍길동',
          phone: '010-1234-5678'
        }
      ],
      nameErrorMsg: false,
      phoneErrorMsg: false,
      emailErrorMsg: false,
      telErrorMsg: false,
      isModalViewed: false,
      myInfoSave: false,
      phoneNumberCheck: false,
      phoneCheckTimeout: false,
      Timer: null,
      TimeCounter: 180,
      TimerStr: '03:00'
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
  methods: {
    onSubmit () {
      this.isModalViewed = true
      this.myInfoSave = true
    },
    corpInfo () {
      this.$router.push('./CorpInfo')
    },
    goMemberWithdraw () {
      this.$router.push('./withdrawal')
    },
    checkCertificate () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
      }
    },
    AddManager () {
      if (this.manageList.length < 10) {
        this.manageList.push({})
      }
    },
    removeManager (index) {
      this.manageList.splice(index, 1)
    },
    AddApi () {
      if (this.apiList.length < 10) {
        this.apiList.push({})
      }
    },
    removeApi (index) {
      this.apiList.splice(index, 1)
    },
    phoneCertificate () {
      if (this.form.phone === '') {
        this.phoneErrorMsg = true
      } else {
        this.isModalViewed = true
        this.phoneNumberCheck = true
      }
    },
    closeMsg () {
      this.myInfoSave = false
      this.phoneNumberCheck = false
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
