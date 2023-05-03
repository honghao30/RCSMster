<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="top_title_area">
        <h2 class="h2_title">대행사 가입신청</h2>
        <span class="h2_desc">
          기업을 대신하여 RCS 서비스의 운영 업무를 수행하려는 사업자는
          <br>대행사로 가입해 주십시오.
        </span>
      </div>
      <section class="sec_form">
        <div class="title_area left">
          <h3 class="h3_title line">약관동의</h3>
        </div>
        <!-- 약관 -->
        <join-terms :joinTermAgency="this.joinTermAgency" ref="terms"/>
      </section>
      <section class="sec_form">
        <div class="title_area left">
          <h3 class="h3_title line">가입인증</h3>
        </div>
        <div class="title_area left">
          <h3 class="h3_title">기업정보 확인</h3>
        </div>
        <table class="tbl_row_type">
          <caption>
            <strong>기업정보 확인</strong>
            <p>사업자등록번호 인증</p>
          </caption>
          <colgroup>
            <col style="width:215px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">사업자등록번호로 인증</th>
              <td>
                <div class="input_search_bundle">
                  <span class="custom_input">
                    <input type="text" placeholder="‘-’없이 10자리 숫자만 입력" style="width:360px" ref="agencyRegiNum" v-model="formData.agencyRegiNum" maxlength="10"
                           @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keyup.enter="certAgencyRegiNum">
                  </span>
                  <a href="javascript:void(0);" class="btn sml bd_black" @click="certAgencyRegiNum">
                    <span>인증</span>
                  </a>
                  <p class="text_error" v-if="error.errorCertRegiNum">{{ error.errorCertRegiNum }}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- 기업정보 -->
      <section class="sec_form" v-if="view.isCertiAll">
        <div class="title_area left">
          <h3 class="h3_title line">회원정보입력</h3>
        </div>
        <div class="title_area left">
          <h3 class="h3_title">기업정보</h3>
        </div>
        <join-corp-info-type1 ref="corpInfoType1" v-if="view.isFirst" :corpData="corpData" userType="AGENCY"/>
        <join-corp-info-type2 ref="corpInfoType2" v-if="!view.isFirst" :corpData="corpData"/>
      </section>

      <!-- 담당자정보 -->
      <section class="sec_form" v-if="view.isCertiAll">
        <div class="title_area left">
          <h3 class="h3_title">담당자정보</h3>
        </div>
        <join-user-info ref="userInfo" userType="AGENCY"/>
      </section>
      <div class="btn_wrap center mar_t60" v-if="view.isCertiAll">
        <button class="btn mid bd_black" @click="cancel">
          <span>취소</span>
        </button>
        <button class="btn mid black" @click="beforeApplyJoin">
          <span>가입하기</span>
        </button>
      </div>
    </article>
  </div>
</template>

<script>
import { retrieveCorpRegiNum } from '@/api/common/code'
import { createJoinAgency } from '@/api/join/applyJoin'
import JoinTerms from '@/views/join/components/JoinTerms'
import JoinCorpInfoType1 from '@/views/join/components/JoinCorpInfoType1'
import JoinCorpInfoType2 from '@/views/join/components/JoinCorpInfoType2'
import JoinUserInfo from '@/views/join/components/JoinUserInfo'
import { getToken } from '@/utils/token'

export default {
  name: 'JoinCorp',
  components: {
    JoinTerms,
    JoinCorpInfoType1,
    JoinCorpInfoType2,
    JoinUserInfo
  },
  data() {
    return {
      formData: {
        agencyRegiNum: '',
        corpName: '',
        bizCond: '',
        bizCate: '',
        addrRegnNo: '',
        addrMngNo: '',
        addrDtl: ''
      },
      error: {
        errorCertRegiNum: ''
      },
      view: {
        isCertiAll: false,
        isFirst: true
      },
      corpData: {
        corpRegiNum: ''
      },
      userData: {
        mblNum: '',
        userNm: ''
      },
      joinTermAgency: 'AGENCY'
    }
  },
  beforeCreate() {
    if (!jglib.isEmpty(getToken())) {
      this.$alertMsg('로그인 사용자는 접근 할 수 없는 페이지입니다.').then(
        () => {
          this.$router.go(-1)
        }
      )
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  computed: {},
  watch: {
    'terms.checkAll'(value) {
      if (value) {
        this.terms.checks = []
      }
    }
  },
  methods: {
    init() {},
    certAgencyRegiNum() {
      // 사업자 등록 번호 인증
      if (!this.validCertAgencyRegiNum()) {
        return false
      }
      // 에러 문구 초기화
      this.error.errorCertRegiNum = ''

      let params = {
        corpRegiNum: this.formData.agencyRegiNum,
        userType: 'AGENCY'
      }
      retrieveCorpRegiNum(params)
        .then(res => {
          // 등록된 사업자
          // 기존에 등록된 대행사인경우 confirm 출력
          let userNm = res.result.userNm
          let email = res.result.email

          this.view.isFirst = false
          this.corpData['corpRegiNum'] = ''
          this.view.isCertiAll = false
          this.formData = {
            agencyRegiNum: '',
            corpName: '',
            bizCond: '',
            bizCate: '',
            addrRegnNo: '',
            addrMngNo: '',
            addrDtl: ''
          }

          if (res.result.inspection === 'N') {
            this.$confirmMsg(`해당 사업자등록번호로 가입된 계정이 존재합니다.<br> ${userNm} (${email})`, '', '로그인', '닫기')
              .then(() => {
                this.$router.push('/login')
              })
          } else if (res.result.inspection === 'Y') {
            this.$confirmMsg(`심사 중 입니다.<br> 신청결과를 확인하세요.`, '', '대행사 신청 결과조회', '닫기')
              .then(() => {
                this.$router.push('/join/retriveapply')
              })
          }
        })
        .catch(res => {
          // 최초 등록
          if (res.code === '60000013') {
            this.view.isFirst = true
            this.corpData['corpRegiNum'] = this.formData.agencyRegiNum
            this.view.isCertiAll = true
          } else {
            this.error.errorCertRegiNum = res.desc
          }
        })
    },
    validCertAgencyRegiNum() {
      if (jglib.isEmpty(this.formData.agencyRegiNum)) {
        this.error.errorCertRegiNum = '사업자등록번호를 입력해 주세요.'
        return false
      }
      if (this.formData.agencyRegiNum.length !== 10) {
        this.error.errorCertRegiNum = '입력하신 정보가 유효한 정보가 아닙니다. 확인 후 재입력해 주세요.'
        return false
      }

      // 사업자등록번호 인증 로직
      if (!jglib.checkBizRegNum(this.formData.agencyRegiNum)) {
        this.error.errorCertRegiNum =
          '입력하신 정보가 유효한 정보가 아닙니다. 확인 후 재입력해 주세요'
        return false
      }
      return true
    },
    cancel() {
      this.$confirmMsg(
        '가입 신청서 작성을 중단하시겠습니까?',
        '',
        '확인',
        '닫기'
      ).then(() => {
        this.$router.push('/')
      })
    },
    beforeApplyJoin() {
      // 가입전 사업자 등록 번호 재확인
      let params = {
        corpRegiNum: this.formData.agencyRegiNum,
        userType: 'AGENCY'
      }
      retrieveCorpRegiNum(params)
        .then(res => {
          // 이미 승인이 진행중일 경우
          let userNm = res.result.userNm
          let email = res.result.email

          this.view.isFirst = false
          this.corpData['corpRegiNum'] = ''
          this.view.isCertiAll = false
          this.formData = {
            agencyRegiNum: '',
            corpName: '',
            bizCond: '',
            bizCate: '',
            addrRegnNo: '',
            addrMngNo: '',
            addrDtl: ''
          }

          if (res.result.inspection === 'N') {
            this.$confirmMsg(
              `<center>해당 사업자등록번호로 가입된 계정이 존재합니다.<br>
              ${userNm} (${email})</center>`,
              '',
              '로그인',
              '닫기'
            )
              .then(res => {
                this.$router.push('/login')
              })
              .catch(e => {})
          } else if (res.result.inspection === 'Y') {
            this.$confirmMsg(
              `<center>심사 중 입니다.<br>
              신청결과를 확인하세요.</center>`,
              '',
              '대행사 신청 결과조회',
              '닫기'
            )
              .then(res => {
                this.$router.push('/join/retriveapply')
              })
              .catch(e => {})
          }
        })
        .catch(res => {
          // 최초 등록
          if (res.code === '60000013') {
            this.applyJoin()
          }
        })
    },
    applyJoin() {
      if (!this.validateApply()) {
        return false
      }
      let tosItemList = this.$refs.terms.getAgreementData()

      // 기업정보
      let data = {}
      let corpData = {}
      if (this.view.isFirst) {
        corpData = this.$refs.corpInfoType1.getCorpData()
        corpData.corpData['corpAdmYn'] = 'Y'
      } else {
        corpData = this.$refs.corpInfoType2.getCorpData()
      }

      // 담당자 정보
      let userData = this.$refs.userInfo.getUserData()

      data['tosItemList'] = tosItemList
      Object.assign(data, corpData.corpData)
      Object.assign(data, userData)

      // FIXME 대행사는 아래 값 필요함.
      // "rcsSvc": "service",
      // "corpCerti": "url",
      // "certiFileId": "",
      // "rcsCertiFileId": "",

      let formData = new FormData()
      if (corpData.corpRegFile) {
        formData.append('certiFile', corpData.corpRegFile)
      }
      if (corpData.rcsCertiFile) {
        formData.append('rcsCertiFile', corpData.rcsCertiFile)
      }
      formData.append('data', JSON.stringify(data))

      createJoinAgency(formData)
        .then(res => {
          if (this.view.isFirst || data.corpAdmYn === 'Y') {
            // 승인 절차 필요
            this.$router.push('/join/corp/apply/done')
          } else {
            // 승인 절자 불필요
            this.$router.push('/join/corp/done')
          }
        })
        .catch(e => {
          this.$alertMsg(e.desc)
        })
    },
    validateApply() {
      if (!this.$refs.terms.validationCheck()) {
        return false
      }
      if (this.view.isFirst) {
        if (!this.$refs.corpInfoType1.validateCorpData()) {
          return false
        }
      } else {
        if (!this.$refs.corpInfoType2.validateCorpData()) {
          return false
        }
      }
      if (!this.$refs.userInfo.validateUserData()) {
        return false
      }

      return true
    },
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    }
  }
}
</script>
