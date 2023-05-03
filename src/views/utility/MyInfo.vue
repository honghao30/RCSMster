<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="top_title_area">
        <h2 class="h2_title">내 정보관리</h2>
      </div>
      <div class="box_status_myinfo">
        <div class="status_wrap">
          <!-- TODO: 공통코드 확정 시 상태별 클래스 변경 필요 -->
          <span class="text_status accept" :class="{'accept': retrieveData.aprvRet === 'OK', 'standby': retrieveData.aprvRet === 'WAITING', 'refusal': retrieveData.aprvRet === 'REJECTED'}">{{ retrieveData.aprvRetNm }}</span>
          <div class="desc_wrap">
            <span class="company_name">
              업체명
              <em>{{ retrieveData.name }}</em>
            </span>
            <span class="company_number">
              사업자등록번호
              <em v-if="!isAgency">{{ retrieveData.corpRegiNum | prettyCorpRegiNum }}</em>
              <em v-else>{{ retrieveData.agencyRegiNum | prettyCorpRegiNum }}</em>
            </span>
            <span class="id_title">
              기업ID
              <em>{{ corpId }}</em>
            </span>
          </div>
        </div>
        <div class="btn_wrap">
          <a href="javascript:void(0);" class="btn sml bd_black" @click="goCompanyInfo">
            <span>{{ corpInfoButtonText }}</span>
          </a>
        </div>
      </div>
      <div class="title_area mar_b20">
        <h3 class="h3_title">내 계정 정보</h3>
        <ul class="bullet_list fs18">
          <li>계정에 등록된 정보를 수정할 수 있습니다.</li>
          <li>비밀번호는 개인정보보호를 위해 주기적으로 변경해주세요.</li>
        </ul>
        <a href="javascript:void(0);" class="btn_link" @click="goChangePassword">
          <span>비밀번호 변경하기</span>
        </a>
      </div>
      <table class="tbl_row_type">
        <caption>
          <strong>내 계정 정보</strong>
          <p>이름, 휴대폰번호, 연락처, 이메일</p>
        </caption>
        <colgroup>
          <col style="width:210px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">이름</th>
            <td>
              <div class="cont_flex_bundle">
                <span class="custom_input">
                  <input type="text" placeholder="이름" ref="userNm" v-model.trim="retrieveData.userNm" maxlength="200" @keydown="keydownOnlyText" @keyup="keyupUserNmOnlyTextAndWhitespace($event, 'retrieveData')" @focusout="focusoutUserNmOnlyTextAndWhitespace($event, 'retrieveData')">
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">휴대폰인증(관리자) <span class="require">*</span></th>
            <td>
              <template v-if="this.isCertiMobile">
                <!-- 인증 완료 -->
                <span class="text_value">{{ retrieveData.mblNum | prettyMobile }}</span>
                <a href="javascript:void(0);" class="btn sml bd_black" @click="changeMobileNum"><span>변경</span></a>
                <span class="text_desc">※ 휴대폰번호 변경 시 본인인증 필수</span>
              </template>
              <template v-else>
                <!-- 인증 미완료 -->
                <div class="cont_flex_bundle">
                  <span class="custom_input">
                    <input type="text" placeholder="'-'없이 숫자만 입력" ref="mblNum" v-model="retrieveData.mblNum" maxlength="11"
                      @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keydown.enter="openCertiMobilePopup('MBLNUM')">
                  </span>
                  <button class="btn sml bd_black" ref="openCertiMobilePopup" @click="openCertiMobilePopup('MBLNUM')"><span>인증하기</span>
                  </button>
                </div>
              </template>
            </td>
          </tr>
          <tr v-if="retrieveData.userType === 'AGENCY'">
            <th scope="row">휴대폰인증(담당자)</th>
            <td class="field_area">
              <ul class="phone_list">
                <li v-for="subAgency in retrieveData.subAgencyList" :key="subAgency.userId">
                  <span class="text_value">{{subAgency.userNm}}</span>
                  <span class="text_value">{{subAgency.mblNum}}</span>
                  <a href="javascript:void(0);" class="btn sml bd_black" @click="removeSubAgency(false, subAgency.userId)"><span>삭제</span></a>
                </li>
                <li v-if="addSubAgencyList.length === 0 && retrieveData.subAgencyList.length < 10">
                  <span class="text_value">대행사 관리를 위한 추가 사용자를 등록할 수 있습니다. 최대10개.</span>
                  <a href="javascript:void(0);" class="btn_squre plus" @click="addSubAgency()"></a>
                </li>
                <li v-for="(addSubAgency, index) in addSubAgencyList" :key="addSubAgency.namekey">
                  <div class="phone_num">
                    <span class="custom_input">
                      <input type="text" placeholder="이름" maxlength="200" :ref="addSubAgency.namekey" v-model.trim="addSubAgency.userNm" @keydown="keydownOnlyText" @keyup="keyupUserNmOnlyTextAndWhitespace($event, 'addSubAgencyList', index)" @focusout="focusoutUserNmOnlyTextAndWhitespace($event, 'addSubAgencyList', index)">
                    </span>
                    <span class="custom_input">
                      <input type="text" placeholder="휴대폰번호 ‘-’ 없이 입력" maxlength="11" :ref="addSubAgency.mblNumkey" v-model.trim="addSubAgency.mblNum">
                    </span>
                  </div>
                  <a href="javascript:void(0);" class="btn_squre minus" @click="removeSubAgency(true, index)"></a>
                </li>
                <li v-if="addSubAgencyList.length > 0 && addSubAgencyList.length + (retrieveData.subAgencyList ? retrieveData.subAgencyList.length : 0) < 10">
                  <a href="javascript:void(0);" class="btn_squre plus" @click="addSubAgency()"></a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th scope="row">추가 연락처</th>
            <td>
              <div class="phone_number_area">
                <div class="input_phone_bundle">
                  <span class="custom_select">
                    <select ref="corpTelNum0" v-model="corpTelNum[0]">
                      <option value>선택</option>
                      <option v-for="(tel, index) in selectList.tels" :key="`tel_${index}`" :value="tel.code">{{ tel.code }}</option>
                    </select>
                  </span>
                  <span class="hypen">-</span>
                  <span class="custom_input">
                    <input ref="corpTelNum1" type="text" placeholder v-model="corpTelNum[1]" maxlength="4">
                  </span>
                  <span class="hypen">-</span>
                  <span class="custom_input">
                    <input ref="corpTelNum2" type="text" placeholder v-model="corpTelNum[2]" maxlength="4">
                  </span>
                </div>
                <div class="input_phone_bundle">
                  <span class="title">내선번호</span>
                  <span class="custom_input">
                    <input type="text" placeholder maxlength="4" v-model="retrieveData.corpTelExt">
                  </span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ !isAgency ? '담당자 이메일' : '대표 이메일' }} <span class="require">*</span></th>
            <td>
              <div class="email_area">
                <span class="custom_input">
                  <input type="text" placeholder ref="email_0" v-model="email[0]" @input="email[0]=ignoreChar($event, ['WHITESPACE','KOR'])">
                </span>
                <span class="atsign">@</span>
                <span class="custom_input">
                  <input v-if="!emailFormFlag" type="text" placeholder ref="email_1" v-model="email[1]" @input="email[1]=ignoreChar($event, ['WHITESPACE','KOR'])">
                  <input v-if="emailFormFlag" type="text" placeholder ref="email_1" v-model="email[1]" disabled>
                </span>
                <span class="custom_select">
                  <select v-model="emailDomain">
                    <option value>직접입력</option>
                    <option v-for="(email, index) in selectList.emails" :key="`email_${index}`" :value="email.code">{{email.codeNm}}</option>
                  </select>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="showApi || isCorpAdmN">
            <th scope="row">API Key<span class="require">*</span></th>
            <td>
              <span class="text_value">{{ retrieveData.apiKey }}</span>
              <a href="javascript:void(0);" class="btn sml bd_black" @click="openCertiMobilePopup('APIKEY')">
                <span>재발급</span>
              </a>
            </td>
          </tr>
          <tr v-if="showApi || isCorpAdmN">
            <th scope="row">API Client IP</th>
            <td colspan="3" class="field_area api_wrap">
              <allow-ip ref="allowipR" v-if="allowedIpList" :list="allowedIpList"></allow-ip>
            </td>
          </tr>
          <tr v-if="isAgency">
            <th scope="row">Agency Key</th>
            <td colspan="3" class="field_area api_wrap">
              <agency-key ref="agencykey" :agencyId="this.retrieveData.agencyId" :list="agencyKeyList"></agency-key>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="btn_wrap center mar_t40" v-if="aprvRet === 'OK'">
        <a href="javascript:void(0);" class="btn mid blue" @click="updateMyInfo"><span>정보수정</span></a>
      </div>
      <div class="btn_wrap center mar_t40" v-else-if="aprvRet === 'REJECTED'">
          <span>관리자 권한 신청 중에는 정보 변경이 불가합니다. 관리자 권한 승인 후 가능합니다.</span>
      </div>
      <div class="btn_wrap center mar_t40" v-else>
          <span>관리자 권한 신청 중에는 정보 변경이 불가합니다.</span>
      </div>
      <div class="btn_wrap right mar_t20">
        <a href="javascript:void(0);" class="btn_link btn_layer gray" @click="terminate"><span>탈퇴하기</span></a>
      </div>
      <login-history v-if="retrieveData.userType === 'AGENCY'"></login-history>
    </article>
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
import TerminatePopup from '@/views/utility/components/TerminatePopup'
import CertiMobile from '@/views/utility/components/CertiMobile'
import LoginHistory from '@/views/service/components/LoginHistory'
import AllowIp from '@/views/service/components/AllowIp'
import AgencyKey from '@/views/service/components/AgencyKey'

export default {
  name: 'MyInfo',
  components: {
    AgencyKey,
    TerminatePopup,
    CertiMobile,
    LoginHistory,
    AllowIp
  },
  data() {
    return {
      selectList: {
        tels: [],
        emails: []
      },
      retrieveData: {},
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
      asisMblNum: null
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
            if (err.code === '60000641') {
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
      this.visibleTerminatePopup = true
    },
    goCompanyInfo() {
      this.$router.push('/utility/company-info')
    },
    goChangePassword() {
      this.$router.push('/utility/password')
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
