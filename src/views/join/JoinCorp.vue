<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="top_title_area">
        <h2 class="h2_title">기업담당자 가입신청</h2>
        <span class="h2_desc">
          RCS 서비스를 이용하여 새로운 고객 커뮤니케이션 전략을
          <br>구축하고 싶은 사업자는 기업담당자로 가입해 주십시오.
        </span>
      </div>
      <section class="sec_form">
        <div class="title_area left">
          <h3 class="h3_title line">약관동의</h3>
        </div>
        <join-terms :joinTermCorp="this.joinTermCorp" ref="terms"/>
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
                    <input type="text" placeholder="‘-’없이 10자리 숫자만 입력" style="width:360px" ref="corpRegiNum" v-model="formData.corpRegiNum" maxlength="10"
                           @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keyup.enter="certCorpRegiNum">
                  </span>
                  <button class="btn sml bd_black" @click="certCorpRegiNum">
                    <span>인증</span>
                  </button>
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
        <join-corp-info-type1 ref="corpInfoType1" v-if="view.isFirst" :corpData="corpData" userType="CORP"/>
        <join-corp-info-type2 ref="corpInfoType2" v-if="!view.isFirst" :corpData="corpData"/>
      </section>

      <!-- 담당자정보 -->
      <section class="sec_form" v-if="view.isCertiAll">
        <div class="title_area left">
          <h3 class="h3_title">담당자정보</h3>
        </div>
        <join-user-info ref="userInfo" :corpId="corpData.corpId"/>
      </section>
      <div class="btn_wrap center mar_t60" v-if="view.isCertiAll">
        <button class="btn mid bd_black" @click="cancel">
          <span>취소</span>
        </button>
        <button class="btn mid black" @click="beforeApplyJoin">
          <span>신청하기</span>
        </button>
      </div>
    </article>
  </div>
</template>

<script>
import { retrieveCorpRegiNum } from '@/api/common/code'
import { createJoinCorp } from '@/api/join/applyJoin'
import JoinTerms from '@/views/join/components/JoinTerms'
import JoinCorpInfoType1 from '@/views/join/components/JoinCorpInfoType1'
import JoinCorpInfoType2 from '@/views/join/components/JoinCorpInfoType2'
import JoinUserInfo from '@/views/join/components/JoinUserInfo'

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
        corpRegiNum: '',
        name: '', // corpname
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
        corpRegiNum: '',
        corpId: null
      },
      userData: {
        mblNum: '',
        userNm: ''
      },
      joinTermCorp: 'CORP'
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
    certCorpRegiNum() {
      // 사업자 등록 번호 인증
      if (!this.validCertCorpRegiNum()) {
        return false
      }
      // 에러 문구 초기화
      this.error.errorCertRegiNum = ''

      let params = {
        corpRegiNum: this.formData.corpRegiNum,
        userType: 'CORP'
      }
      retrieveCorpRegiNum(params)
        .then(res => {
          // 등록된 사업자
          if (res.result && res.result.inspection === 'Y') {
            this.$alertMsg(
              '기업 심사가 진행 중입니다. 심사 완료 후에 가입신청 가능합니다.'
            )
            this.view.isFirst = false
            this.corpData = { corpRegiNum: '', corpId: null }
            this.view.isCertiAll = false
            this.formData = {
              corpRegiNum: '',
              name: '', // corpname
              bizCond: '',
              bizCate: '',
              addrRegnNo: '',
              addrMngNo: '',
              addrDtl: ''
            }
          } else if (res.result && res.result.inspection === 'N') {
            this.view.isFirst = false
            this.corpData = res.result
            this.view.isCertiAll = true
          }
        })
        .catch(res => {
          if (res.code === '60000013') {
            // 최초 등록
            this.view.isFirst = true
            this.corpData['corpRegiNum'] = this.formData.corpRegiNum
            this.view.isCertiAll = true
          } else {
            // 알 수없는 오류
            console.error('[retrieveCorpRegiNum] Unkwon Error', res.desc)
            this.error.errorCertRegiNum = res.desc
          }
        })
    },
    validCertCorpRegiNum() {
      if (jglib.isEmpty(this.formData.corpRegiNum)) {
        this.error.errorCertRegiNum = '사업자등록번호를 입력해 주세요.'
        return false
      }
      if (this.formData.corpRegiNum.length !== 10) {
        this.error.errorCertRegiNum = '입력하신 정보가 유효한 정보가 아닙니다. 확인 후 재입력해 주세요'
        return false
      }

      // 사업자등록번호 인증 로직
      if (!jglib.checkBizRegNum(this.formData.corpRegiNum)) {
        this.error.errorCertRegiNum = '입력하신 정보가 유효한 정보가 아닙니다. 확인 후 재입력해 주세요'
        return false
      }
      return true
    },
    beforeApplyJoin() {
      // 가입전 사업자 등록 번호 재확인
      let params = {
        corpRegiNum: this.formData.corpRegiNum,
        userType: 'CORP'
      }
      retrieveCorpRegiNum(params)
        .then(res => {
          // 이미 승인이 진행중일 경우
          if (res.result && res.result.inspection === 'Y') {
            this.$alertMsg('기업 심사가 진행 중입니다. 심사 완료 후에 가입신청 가능합니다.')
            this.view.isFirst = false
            this.corpData = { corpRegiNum: '', corpId: null }
            this.view.isCertiAll = false
            this.formData = {
              corpRegiNum: '',
              name: '', // corpname
              bizCond: '',
              bizCate: '',
              addrRegnNo: '',
              addrMngNo: '',
              addrDtl: ''
            }
          } else if (res.result && res.result.inspection === 'N') {
            this.applyJoin()
          }
        })
        .catch(res => {
          if (res.code === '60000013') {
            // 최초 등록
            this.applyJoin()
          }
        })
    },
    applyJoin() {
      if (!this.validateApply()) {
        return false
      }

      // 약관 정보
      let tosItemList = this.$refs.terms.getAgreementData()

      // 기업정보
      let data = {}
      let corpData = {}
      if (this.view.isFirst) {
        corpData = this.$refs.corpInfoType1.getCorpData()
        corpData.corpData['corpAdmYn'] = 'Y'
        corpData.corpData['corpSaveYn'] = 'N'
      } else {
        corpData = this.$refs.corpInfoType2.getCorpData()
        corpData.corpData['corpSaveYn'] = 'Y'
      }

      // 담당자 정보
      let userData = this.$refs.userInfo.getUserData()

      Object.assign(data, corpData.corpData)
      Object.assign(data, userData)
      data['tosItemList'] = tosItemList

      let formData = new FormData()
      if (corpData.corpRegFile) {
        formData.append('certiFile', corpData.corpRegFile)
      }
      formData.append('data', JSON.stringify(data))

      createJoinCorp(formData)
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
