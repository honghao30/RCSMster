<template>
  <div class="join">
    <PageTitle pagetitle="개인정보 관리" />
    <PageTitleH3 titleh3="내 계정 정보" noticeinfo="필수 입력값" />
      <form  ref="form" >
          <div class="table__wrap">
            <table class="table table-bodyonly form-table">
              <colgroup>
                <col width="230px">
                <col />
                <col width="85px">
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row"><span class="form-item__label">아이디</span></th>
                  <td colspan="3">
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <span class="text">{{ retrieveData ? retrieveData.userId:'' }}</span>
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
                          <span class="text" v-if="retrieveData.userType === 'AGENCY'">대행사</span>
                          <span class="text" v-else-if="retrieveData.userType === 'CORP' && retrieveData.corpAdmYn ==='Y'">마스터</span>
                          <template v-else><span class="text">매니저</span>
                            <ButtonCmp type="btn btn-default-line" @click="goMasterApply">마스터 변경요청</ButtonCmp>
                          </template>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label required">이름</span></th>
                  <td colspan="3">
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="이름을 입력해주세요." v-model="retrieveData.userNm"></span>
                        </div>
                        <p class="guide-text error" v-if="nameErrorMsg">이름을 입력해주세요.</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label required">휴대폰(관리자)</span></th>
                  <td colspan="3">
                      <div class="form-item__content">
                        <template v-if="this.isCertiMobile">
                          <div class="form-item-row">
                              <div class="input-item">
                                <span class="input"><input type="text" class="input" disabled v-model="retrieveData.mblNum"></span>
                                <ButtonCmp type="btn-default-line" @click="changeMobileNum">휴대폰 번호 변경</ButtonCmp>
                              </div>
                              <!-- <p class="guide-text error" v-if="phoneErrorMsg">휴대폰 번호를 입력해주세요.</p> -->
                          </div>
                        </template>
                        <template v-else>
                          <div class="form-item-row">
                              <div class="input-item">
                                <span class="input"><input type="text" class="input" v-model="retrieveData.mblNum" maxlength="11"
                                  placeholder="'-'없이 숫자만 입력" ref="mblNum"
                                  ></span>
                                <ButtonCmp type="btn-default-line" ref="openCertiMobilePopup" @click="openCertiMobilePopup('MBLNUM')">인증하기</ButtonCmp>
                              </div>
                              <p class="guide-text black">※ 휴대폰번호 변경 시 본인인증은 필수입니다.</p>
                              <!-- <p class="guide-text error" v-if="phoneErrorMsg">휴대폰 번호를 입력해주세요.</p> -->
                          </div>
                        </template>
                      </div>
                  </td>
                </tr>
                <tr v-if="retrieveData.userType === 'AGENCY'">
                  <th scope="row"><span class="form-item__label required">휴대폰(담당자)</span></th>
                  <td colspan="3">
                    <div class="form-item__content">
                      <div class="form-item-row agency-phone" v-for="subAgency in retrieveData.subAgencyList" :key="subAgency.userId">
                        <div class="input-item">
                          <span class="inpun-item__title">이름</span>
                          <span class="input">
                            <input type="text" class="input" v-model="subAgency.userNm" disabled>
                          </span>
                        </div>
                        <div class="input-item">
                          <span class="inpun-item__title">휴대폰 번호</span>
                          <span class="input">
                            <input type="text" class="input" v-model="subAgency.mblNum" disabled>
                          </span>
                        </div>
                        <ButtonCmp type="btn-default-line" size="small" @click="removeSubAgency(false, subAgency.userId)">삭제</ButtonCmp>
                      </div>
                      <div v-if="addSubAgencyList.length === 0 && retrieveData.subAgencyList.length < 10">
                        <ButtonCmp type="btn-default-line" size="small" @click="addSubAgency()">추가</ButtonCmp>
                        <p class="guide-text black">&bull; 대행사 관리를 위한 추가 사용자를 최대10개 등록할 수 있습니다.</p>
                      </div>
                      <div class="form-item-row agency-phone" v-for="(addSubAgency, index) in addSubAgencyList" :key="addSubAgency.namekey">
                        <div class="input-item">
                          <span class="inpun-item__title">이름</span>
                          <span class="input">
                            <input type="text" placeholder="이름" maxlength="64" :ref="addSubAgency.namekey" v-model.trim="addSubAgency.userNm" @keydown="keydownOnlyText" @keyup="keyupUserNmOnlyTextAndWhitespace($event, 'addSubAgencyList', index)" @focusout="focusoutUserNmOnlyTextAndWhitespace($event, 'addSubAgencyList', index)">
                          </span>
                        </div>
                        <div class="input-item">
                          <span class="inpun-item__title">휴대폰 번호</span>
                          <span class="input">
                            <input type="text" placeholder="휴대폰번호 ‘-’ 없이 입력" maxlength="11" :ref="addSubAgency.mblNumkey" v-model.trim="addSubAgency.mblNum">
                          </span>
                        </div>
                        <ButtonCmp type="btn-default-line" size="small" @click="removeSubAgency(true, index)">삭제</ButtonCmp>
                      </div>
                      <div v-if="addSubAgencyList.length > 0 && addSubAgencyList.length + (retrieveData.subAgencyList ? retrieveData.subAgencyList.length : 0) < 10">
                        <ButtonCmp type="btn-default-line" size="small" @click="addSubAgency()">추가</ButtonCmp>
                      </div>

                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label required">담당자 연락처</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="‘-’없이 자리 숫자만 입력해주세요."  v-model="retrieveData.corpTelNum"></span>
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
                          <span class="input"><input type="text" class="input" placeholder="내선번호를 입력해주세요." maxlength="4" v-model="retrieveData.corpTelExt"></span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label required">{{ !isAgency ? '담당자 이메일' : '대표 이메일' }}</span></th>
                  <td colspan="3">
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <span class="input-item">
                          <span class="input"><input type="text" placeholder ref="email_0" v-model="email[0]" @input="email[0]=ignoreChar($event, ['WHITESPACE','KOR'])" style="width:25%">@
                            <input v-if="!emailFormFlag" type="text" placeholder ref="email_1" v-model="email[1]" @input="email[1]=ignoreChar($event, ['WHITESPACE','KOR'])" style="width:25%">
                            <input v-if="emailFormFlag" type="text" placeholder ref="email_1" v-model="email[1]" disabled style="width:25%">
                          </span>
                          <span class="select" style="width:25%">
                            <select v-model="emailDomain">
                              <option value>직접입력</option>
                              <option v-for="(email, index) in selectList.emails" :key="`email_${index}`" :value="email.code">{{email.codeNm}}</option>
                            </select>
                          </span>
                        </span>

                        </div>
                    </div>
                  </td>
                </tr>
                <tr>
                <th scope="row"><span class="form-item__label">비밀번호 변경</span></th>
                <td colspan="3">
                  <a href="javascript:void(0);" class="btn btn-default-line" @click="goChangePassword"><span>비밀번호 변경</span></a>
                </td>
              </tr>

                <tr v-if="showApi || isCorpAdmN">
                  <th scope="row"><span class="form-item__label">API KEY</span></th>
                  <td colspan="3">
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item justify">
                          <span class="text">{{ retrieveData.apiKey }}</span>
                    <!-- <a href="javascript:void(0);" class="btn sml bd_black" @click="openCertiMobilePopup('APIKEY')">
                      <span>재발급</span>
                    </a> -->
                          <ButtonCmp type="btn-default-line" ref="openCertiMobilePopup" @click="openCertiMobilePopup('APIKEY')">재발급</ButtonCmp>
                        </div>
                      </div>
                    </div>

                  </td>
                </tr>
                <tr v-if="showApi || isCorpAdmN">
                  <th scope="row"><span class="form-item__label">API Client IP</span></th>
                  <td colspan="3">
                    <allow-ip ref="allowipR" v-if="allowedIpList" :list="allowedIpList"></allow-ip>
                  </td>
                </tr>
                <tr v-if="isAgency">
                  <th scope="row"><span class="form-item__label">Agency Key</span></th>
                  <td colspan="3" class="field_area api_wrap">
                    <agency-key ref="agencykey" :agencyId="this.retrieveData.agencyId" :list="agencyKeyList"></agency-key>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </form>
        <template v-if="aprvRet === 'OK'">
          <div class="button__wrap flex-end">
            <ButtonCmp type="btn-line medium" @click="terminate">회원 탈퇴</ButtonCmp>
          </div>
          <div class="button__wrap space-between">
            <ButtonCmp type="btn-line" @click="goback">취소</ButtonCmp>
            <div class="button__wrap button__left">
              <ButtonCmp type="btn btn-line" @click="goCorpInfo">비즈니스 정보 관리</ButtonCmp>
              <ButtonCmp type="btn-blue" @click="updateMyInfo">수정</ButtonCmp>
            </div>
          </div>
        </template>
        <template v-else-if="aprvRet === 'REJECTED'">
          <span>마스터 권한 신청 중에는 정보 변경이 불가합니다. 마스터 권한 승인 후 가능합니다.</span>
          <div class="button__wrap flex-end">
            <ButtonCmp type="btn-line medium" @click="terminate">회원 탈퇴</ButtonCmp>
          </div>
          <div class="button__wrap space-between">
            <ButtonCmp type="btn-line" @click="goback">취소</ButtonCmp>
            <div class="button__wrap button__left">
              <ButtonCmp type="btn btn-line" @click="goCorpInfo">비즈니스 정보 관리</ButtonCmp>
            </div>
          </div>
        </template>
        <template v-else>
          <span>마스터 권한 신청 중에는 정보 변경이 불가합니다.</span>
          <div class="button__wrap flex-end">
            <ButtonCmp type="btn-line medium" @click="terminate">회원 탈퇴</ButtonCmp>
          </div>
          <div class="button__wrap space-between">
            <ButtonCmp type="btn-line" @click="goback">취소</ButtonCmp>
            <div class="button__wrap button__left">
              <ButtonCmp type="btn btn-line" @click="goCorpInfo">비즈니스 정보 관리</ButtonCmp>
            </div>
          </div>
        </template>
        <login-history v-if="retrieveData.userType === 'AGENCY'"></login-history>

    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <!-- // 휴대폰 인증 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        modalsize="Modalmax480"
        v-if="PhoneCertModal"
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
            <div class="phone-cert__number">{{ maskNm }} {{ hidePhoneNumber(retrieveData.corpInfo.mblNum) }}</div>
            <div  class="phone-cert__number-input">
              <span class="input">
                <input ref="number" type="text" placeholder="인증번호"  v-model="form.certNumber">
              </span>
                <span class="time active" ref="time">{{ TimerStr }}</span>
                <ButtonCmp
                  type="btn-gray-line"
                  :disabled="isButtonDisabled"
                  @click="chkAuthNum"
                >
                  인증번호 재요청
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
              :disabled="isDisabled"
              @click="chkAuthNum"
            >
              인증
            </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>

    <ModalView
          v-if="isModalEdit" @closeModal="isModalEdit = false"
        >
          <ConfirmMsg
            @closeModal="isModalEdit = false">
            <div class="msg" slot="msg">
              수정되었습니다.
            </div>
            <div class="button__wrap" slot="button">
              <ButtonCmp
                type="btn-blue"
                @click="closeMsge"
              >
                확인
              </ButtonCmp>
            </div>
          </ConfirmMsg>
    </ModalView>

    <certi-mobile
      v-if="visibleCertiMobile"
      :visible.sync="visibleCertiMobile"
      :popupType="popupType"
      :modMblNum="retrieveData.mblNum"
      :anonymous="anonymous"
      @auth="changeMobileNumDone"
    ></certi-mobile>
    <terminate-popup v-if="visibleTerminatePopup" :visible.sync="visibleTerminatePopup"></terminate-popup>
  </div>
</template>

<script>
import { retrieveMyInfo, updateMyInfo } from '@/api/utility/utility'
import { memberAdminAuthority } from '@/api/service/service'
import { retrieveCommonCode, checkDuplicationCI } from '@/api/common/code'
import { ignoreChar, uniqValue, isPhoneNumber, isOnlyPhoneNumber } from '@/utils/check'
import TerminatePopup from '@/views/mypage/components/utility/TerminatePopup'
import CertiMobile from '@/views/mypage/components/utility/CertiMobile'
import LoginHistory from '@/views/mypage/components/service/LoginHistory'
import AllowIp from '@/views/mypage/components/service/AllowIp'
import AgencyKey from '@/views/mypage/components/service/AgencyKey'

import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'

export default {
  name: 'MyInfo',
  components: {
    AgencyKey,
    TerminatePopup,
    CertiMobile,
    LoginHistory,
    AllowIp,

    PageTitle,
    PageTitleH3,
    ButtonCmp,
    ModalView,
    ConfirmMsg

  },
  data() {
    return {
      selectList: {
        tels: [],
        emails: []
      },
      retrieveData: {
        userId: '',
        userNm: '',
        mblNum: '',
        userType: '',
        corpId: '',
        corpAdmYn: '',
        corpInfo: {
          corpType: '',
          userId: '',
          userNm: ''
        }
      },
      corpTelNum: [],
      email: [],
      emailDomain: '',
      popupType: '',
      aprvRet: null,
      isCertiMobile: true,
      visibleTerminatePopup: false,
      visibleCertiMobile: false,
      addSubAgencyList: [],
      allowedIpList: null,
      agencyKeyList: null,
      anonymous: false,
      asisMblNum: null,

      isModalEdit: false,
      isModalViewed: false,
      PhoneCertModal: false,
      form: {
        name: '홍길동',
        phone: '010-1234-5678',
        email: '',
        tel: '',
        extNum: ''
      },
      nameErrorMsg: false,
      phoneErrorMsg: false,
      emailErrorMsg: false,
      telErrorMsg: false,
      manageList: [
      ]
    }
  },
  computed: {
    isAgency() {
      return this.$store.state.user.userCd === 'AGENCY'
    },
    corpId() {
      return this.isAgency ? this.retrieveData.agencyId : this.retrieveData.corpId
    },
    showApi() {
      return this.$store.state.user.userCd === 'CORPY' || this.$store.state.user.userCd === 'AGENCY'
    },
    isCorpAdmN() {
      return this.$store.state.user.userCd === 'CORPN'
    },
    corpInfoButtonText() {
      return this.isCorpAdmN ? '기업정보 조회' : '기업정보 관리'
    },
    emailFormFlag() {
      return !jglib.isEmpty(this.emailDomain)
    },
    userType() {
      return this.$store.state.user.userCd === 'AGENCY' ? 'AGENCY' : 'CORP'
    }
  },
  watch: {
    'retrieveData.corpTelNum'(value) {
      if (value) {
        this.corpTelNum = jglib.mobileNumConverter(value).split('-')
      } else {
        this.corpTelNum = ['', '', '']
      }
    },
    'retrieveData.email'(value) {
      if (value) {
        this.email = value.split('@')
      }
    },
    emailDomain(value) {
      if (value) {
        this.email[1] = value
      } else {
        this.email[1] = ''
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(that => {
      if (that.$store.state.user.userType === 'AGENCY' && that.$store.state.user.subAgencyYn === 'Y') {
        next({ name: 'SubagencyInfo', replace: true })
      } else {
        next()
      }
    })
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    ignoreChar,
    init() {
      // 콤보 코드 목록 조회
      retrieveCommonCode('TEL_NO_CORP').then(res => {
        this.selectList.tels = res.result
      })
      retrieveCommonCode('EMAIL_DOMAIN').then(res => {
        this.selectList.emails = res.result
      })

      // 기본 정보 조회
      this.$store
        .dispatch('getUserInfo')
        .then(userInfo => {
          this.retrieveMyInfo()
          this.checkEditorableMyInfo(userInfo)
        })
        .catch(() => {})
    },
    addSubAgency() {
      this.addSubAgencyList.push({
        namekey: this.getRamdomKey(),
        mblNumkey: this.getRamdomKey(),
        userNm: null,
        mblNum: null
      })
    },
    removeSubAgency(added, key) {
      if (added) {
        this.addSubAgencyList.splice(key, 1)
      } else {
        this.retrieveData.subAgencyList = this.retrieveData.subAgencyList.filter((item) => {
          return item.userId !== key
        })
      }
    },
    getRamdomKey() {
      return parseInt((Math.random() * 1000000000).toString())
    },
    retrieveMyInfo() {
      let params = {
        userId: this.$store.state.user.userId
      }
      retrieveMyInfo(params)
        .then(res => {
          this.retrieveData = res.result
          this.asisMblNum = this.retrieveData.mblNum
          this.allowedIpList = this.retrieveData.allowIpList
          this.agencyKeyList = this.retrieveData.agencyKeyList

          console.log('this.retrieveData', this.retrieveData)
          console.log('this.asisMblNum', this.asisMblNum)
          console.log('this.allowedIpList', this.allowedIpList)
          console.log('this.agencyKeyList', this.agencyKeyList)

          this.setEmailDomain()
        }).catch(err => {
          this.$alertMsg(err.desc)
          this.$router.go(-1)
        })
    },
    checkEditorableMyInfo(userInfo) {
      if (userInfo.userType === 'CORP' && userInfo.corpAdmYn === 'N') {
        let reqCorpId = {
          corpId: this.$store.state.user.corpId
        }
        memberAdminAuthority(reqCorpId).then(res => {
          this.aprvRet = res.result.aprvRet
        })
      } else {
        this.aprvRet = 'OK'
      }
    },
    updateMyInfo() {
      if (!this.validateMyInfo()) {
        return false
      }

      const combineCorpTelNum = this.corpTelNum.join('')
      if (this.corpTelNum[0] === '010') {
        if (!isOnlyPhoneNumber(combineCorpTelNum)) {
          this.$alertMsg('추가 연락처를 올바르게 입력해 주세요.')
          return false
        }
      } else {
        // (필수 X) 값이 입력되어 있는 경우만 유효성 체크
        if (!jglib.isEmpty(combineCorpTelNum) && !isPhoneNumber(combineCorpTelNum)) {
          this.$alertMsg('추가 연락처를 올바르게 입력해 주세요.')
          return false
        }
      }

      let params = {
        userNm: this.retrieveData.userNm,
        mblNum: this.retrieveData.mblNum,
        corpTelNum: combineCorpTelNum,
        corpTelExt: this.retrieveData.corpTelExt,
        email: this.email.join('@'),
        connInfo: this.retrieveData.connInfo || ''
      }

      if (this.retrieveData.userType === 'AGENCY') {
        // 중복되는 휴대폰번호 체크
        let phoneList = []

        // 추가된 담당자
        params.addSubAgencyList = []
        if (this.addSubAgencyList.length > 0) {
          params.addSubAgencyList = this.addSubAgencyList
          for (const _subAgency of params.addSubAgencyList) {
            if (this.retrieveData.mblNum === _subAgency.mblNum) {
              this.$alertMsg('관리자는 담당자로 등록할 수 없습니다.')
              return false
            }
            phoneList.push(_subAgency.mblNum)
          }
        }
        // 삭제된 담당자를 제외한 기존 담당자
        let existSubAgencyList = []
        for (const _subAgency of this.retrieveData.subAgencyList) {
          _subAgency.mblNum = _subAgency.mblNum.replace(/-/gi, '')
          phoneList.push(_subAgency.mblNum)
          existSubAgencyList.push(_subAgency)
        }
        params.existSubAgencyList = []
        if (existSubAgencyList.length > 0) {
          params.existSubAgencyList = existSubAgencyList
        }

        if (uniqValue(phoneList).length > 0 && uniqValue(phoneList).length !== (params.addSubAgencyList.length + params.existSubAgencyList.length)) {
          this.$alertMsg('휴대폰인증(담당자) 정보가 중복 됩니다.')
          return false
        }
      }

      if (this.$refs.allowipR) {
        try {
          params.addAllowIpList = this.$refs.allowipR.getAllowIp()
        } catch (e) {
          this.$alertMsg(e)
          return false
        }
      }

      this.$confirmMsg('수정한 정보로 변경하시겠습니까?', '', '확인', '닫기')
        .then(() => {
          updateMyInfo(params).then(res => {
            if (res.code === '20000000') {
              this.$alertMsg('수정한 정보로 변경하였습니다.').then(() => {
                this.refresh()
              })
            } else {
              this.$alertMsg(res.message)
            }
          })
            .catch(res => {
              if (res.code === '60000718') {
                this.$alertMsg(res.desc)
              }
            })
        })
        .catch(() => {})
    },
    validateMyInfo() {
      // 이름과 휴대폰 번호는 인증이므로 체크하지 않는다.
      if (!this.isCertiMobile) {
        this.$alertMsg('휴대폰인증을 해주세요.')
        return false
      }
      if (jglib.isEmpty(this.retrieveData.userNm)) {
        this.$alertMsg('이름을 입력해 주세요.').then(() => {
          this.$refs.userNm.focus()
        })
        return false
      }
      if (!jglib.isUserName(this.retrieveData.userNm)) {
        this.$alertMsg('이름을 정확히 입력해주세요.').then(() => {
          this.$refs.userNm.focus()
        })
        return false
      }
      if (!jglib.isEmpty(this.corpTelNum[0]) || !jglib.isEmpty(this.corpTelNum[1]) || !jglib.isEmpty(this.corpTelNum[2])) {
        if (jglib.isEmpty(this.corpTelNum[0])) {
          this.$alertMsg('연락처를 선택해 주세요.').then(() => {
            this.$refs.corpTelNum0.focus()
          })
          return false
        }
        if (jglib.isEmpty(this.corpTelNum[1])) {
          this.$alertMsg('연락처를 입력해 주세요.').then(() => {
            this.$refs.corpTelNum1.focus()
          })
          return false
        }
        if (jglib.isEmpty(this.corpTelNum[2])) {
          this.$alertMsg('연락처를 입력해 주세요.').then(() => {
            this.$refs.corpTelNum2.focus()
          })
          return false
        }
      }
      if (jglib.isEmpty(this.email[0])) {
        this.$alertMsg('이메일을 입력해 주세요').then(() => {
          this.$refs.email_0.focus()
        })
        return false
      }
      if (jglib.isEmpty(this.email[1])) {
        this.$alertMsg('이메일을 입력해 주세요').then(() => {
          this.$refs.email_1.focus()
        })
        return false
      }
      if (!jglib.isEmail(this.email[0] + '@' + this.email[1])) {
        this.$alertMsg('잘못된 이메일 형식 입니다.').then(() => {
          this.$refs.email_0.focus()
        })
        return false
      }
      if (this.addSubAgencyList.length > 0) {
        for (let subAgency of this.addSubAgencyList) {
          const userNm = subAgency.userNm
          if (jglib.isEmpty(userNm)) {
            this.$alertMsg('이름을 입력해 주세요.').then(() => {
              this.$refs[subAgency.namekey][0].focus()
            })
            return false
          }
          if (!jglib.isUserName(userNm)) {
            this.$alertMsg('이름을 정확히 입력해 주세요.').then(() => {
              this.$refs[subAgency.namekey][0].focus()
            })
            return false
          }
          const mblNum = subAgency.mblNum
          if (jglib.isEmpty(mblNum)) {
            this.$alertMsg('휴대폰번호 입력해 주세요.').then(() => {
              this.$refs[subAgency.mblNumkey][0].focus()
            })
            return false
          }
          // 휴대폰 번호 정규식 체크
          if (!/^(0(1(0|1|6|7|8|9)))(\d{3,4})(\d{4}$)/.test(mblNum)) {
            this.$alertMsg('휴대폰번호를 정확히 입력해 주세요.').then(() => {
              this.$refs[subAgency.mblNumkey][0].focus()
            })
            return false
          }
        }
      }
      return true
    },
    setEmailDomain() {
      // 정보 조회 후 email domain 콤보 세팅
      let emailDomain = ''
      if (this.retrieveData.email) {
        let email = this.retrieveData.email.split('@')
        let filtered = _.filter(this.selectList.emails, { code: email[1] })
        if (filtered.length > 0) {
          emailDomain = filtered[0].code
        }
      }
      this.emailDomain = emailDomain
    },
    changeMobileNum() {
      this.isCertiMobile = false
    },
    changeMobileNumDone() {
      this.isCertiMobile = true
    },
    changeMobileNumCancel() {
      this.retrieveData.mblNum = this.asisMblNum
      this.isCertiMobile = true
    },
    openCertiMobilePopup(popupType) {
      this.anonymous = false
      this.popupType = popupType
      if (popupType === 'MBLNUM') {
        // 휴대폰 번호 정규식 체크
        if (!/^(0(1(0|1|6|7|8|9)))(\d{3,4})(\d{4}$)/.test(this.retrieveData.mblNum)) {
          this.$alertMsg('휴대폰번호를 정확히 입력해 주세요.').then(() => {
            this.$refs.mblNum.focus()
          })
          return false
        }
        // 기존 번호 동일 체크
        if (this.asisMblNum === this.retrieveData.mblNum) {
          this.$alertMsg('기존 정보와 동일합니다.').then(() => {
            this.changeMobileNumCancel()
          })
          return false
        }
        // 대행사 계정일 시 담당자 번호와 동일한지 체크
        if (this.retrieveData.userType === 'AGENCY' && this.retrieveData.subAgencyList.length > 0) {
          let duplicated = false
          this.retrieveData.subAgencyList.forEach(subAgency => {
            if (this.retrieveData.mblNum === subAgency.mblNum.replace(/-/gi, '')) {
              duplicated = true
            }
          })
          if (duplicated) {
            this.$alertMsg('이미 담당자로 등록된 휴대폰번호입니다.<br>담당자 정보 삭제 후 관리자로 등록해 주세요.')
            return
          }
        }

        this.anonymous = true
        let params = {
          userType: this.userType,
          mblNum: this.retrieveData.mblNum
        }
        checkDuplicationCI(params)
          .then(() => {
            this.visibleCertiMobile = true
          })
          .catch(err => {
            if (err.code === '64474') {
              this.$alertMsg('이미 타 대행사에 등록된 휴대폰번호입니다.')
            } else {
              this.$alertMsg(err.desc)
            }
          })
      } else {
        this.visibleCertiMobile = true
      }
    },
    refresh() {
      window.scrollTo(0, 0)
      this.addSubAgencyList = []
      if (this.$refs.allowipR) {
        this.allowedIpList = null
      }
      this.retrieveMyInfo()
    },
    terminate() {
      // this.visibleTerminatePopup = true
      this.$router.push('/utility/withdrawal')
    },
    goMasterApply() {
      this.$router.push('/utility/apply-master')
    },
    goCorpInfo() {
      this.$router.push('/utility/company-info')
    },
    goback() {
      history.back()
    },
    goChangePassword() {
      // this.$router.push('/utility/password')
      this.$router.push('/pwchange')
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
    keyupUserNmOnlyTextAndWhitespace(e, target, index = -1) {
      let convertData = jglib.convertOnlyTextAndOneWhitespace(e.target.value)
      if (index > -1) this.$data[target][index].userNm = convertData
      else this.$data[target].userNm = convertData
    },
    focusoutUserNmOnlyTextAndWhitespace(e, target, index = -1) {
      let convertData = jglib.convertOnlyTextAndOneWhitespace(e.target.value).trim()
      if (index > -1) this.$data[target][index].userNm = convertData
      else this.$data[target].userNm = convertData
    }
  }
}
</script>
