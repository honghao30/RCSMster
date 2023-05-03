<template>
  <!-- 기업관리자 가입신청 결과 -->
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="top_title_area">
        <h2 class="h2_title">기업관리자 가입신청 결과</h2>
      </div>
      <section class="sec_form">
        <div class="title_area left">
          <h3 class="h3_title">승인결과</h3>
        </div>
        <table class="tbl_row_type">
          <caption>
            <strong>승인결과</strong>
            <p>승인상태, 사유</p>
          </caption>
          <colgroup>
            <col style="width:190px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <!-- 승인 거절 .text_red-->
            <tr v-if="this.aprvRet === 'REJECTED'">
              <th scope="row">승인상태</th>
              <td>
                <span class="text_red">{{ this.aprvRetNm }}</span>
                <span class="text_desc">({{ this.aprvDt }})</span>
              </td>
            </tr>
            <tr v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
              <th scope="row">승인상태</th>
              <td>
                <span>{{ this.aprvRetNm }}</span>
              </td>
            </tr>
            <tr v-if="this.aprvRet === 'REJECTED'">
              <th scope="row">사유</th>
              <td>{{ this.aprvRetDescr }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="sec_form">
        <div class="title_area left">
          <h3 class="h3_title">기업정보</h3>
        </div>
        <table class="tbl_row_type">
          <caption>
            <strong>기업정보</strong>
            <p>사업자등록번호, 업체명, 사업자등록증, 업태, 종목, 주소</p>
          </caption>
          <colgroup>
            <col style="width:190px">
            <col style="width:440px">
            <col style="width:190px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                사업자등록번호
                <span class="require">*</span>
              </th>
              <td>{{ this.corpRegiNum }}</td>
              <th scope="row">
                업체명
                <span class="require">*</span>
              </th>
              <td>
                <span class="custom_input full_width">
                  <span v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING' || corpMasterActiveYn ==='Y'">{{this.corpNm}}</span>
                  <input type="text" v-model.trim="corpNm" placeholder v-else>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">
                사업자등록증
                <span class="require">*</span>
              </th>
              <td colspan="3" v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                <span>{{this.certiFileNm}}</span>
              </td>
              <td colspan="3" v-else>
                <div class="box_add_file">
                  <el-upload ref="enterpriseRegiFileUpload" action="https://jsonplaceholder.typicode.com/posts/" :on-change="onRegiFileChange" :file-list="regiFileList" :auto-upload="false" class="i_block">
                    <a href="javascript:void(0);" type="primary" class="btn sml bd_black">파일선택</a>
                  </el-upload>
                  <span v-show="!regiFileDescFlag" class="text_desc add_file">파일형식 : jpg, png, pdf, tiff (최대 5MB)</span>
                  <span v-show="regiFileDisplayFlag" class="text_desc add_file">
                    {{this.certiFileNm}}
                    <a href="javascript:void(0);" class="btn_delete" @click="regiFileBeforeRemove"><span>삭제</span></a>
                  </span>
                </div>
              </td>
            </tr>
            <!-- FIXME 업태, 종목, 주소는 신청서 작성시 기업정보 입력하지 않은경우에는 비 노출 항목(추후처리) -->
            <tr v-if="corpMasterActiveYn === 'N'">
              <th scope="row">업태<span class="require">*</span></th>
              <td>
                <span class="custom_input full_width">
                  <span v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">{{this.bizCond}}</span>
                  <input v-else type="text" v-model.trim="bizCond" placeholder maxlength="21">
                </span>
              </td>
              <th scope="row">종목<span class="require">*</span></th>
              <td>
                <span class="custom_input full_width">
                  <span v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">{{this.bizCate}}</span>
                  <input v-else type="text" v-model.trim="bizCate" placeholder maxlength="21">
                </span>
              </td>
            </tr>
            <tr v-if="corpMasterActiveYn === 'N'">
              <th scope="row">주소<span class="require">*</span></th>
              <td colspan="3">
                <!-- 대기 -->
                <div v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'" >
                  {{this.addrRegnNo}}
                  <br>
                  {{this.addrMngNo}} {{this.addrDtl}}
                </div>
                <!-- <div
                  class="address_search_area"
                  v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED'"
                >
                  <div class="input_search_bundle">
                    <span class="custom_input">
                      <span>{{this.addrRegnNo}}</span>
                    </span>
                  </div>
                  <div class="input_address_bundle">
                    <span class="custom_input">
                      <span>{{this.addrMngNo}} {{this.addrDtl}}</span>
                    </span>
                  </div>
                </div>-->
                <!-- 반려 -->
                <div class="address_search_area" v-else>
                  <div class="input_search_bundle">
                    <span class="custom_input">
                      <input type="text" v-model="addrRegnNo" readonly>
                    </span>
                    <a href="javascript:void(0);" type="text" ref="modal" class="btn sml bd_black" @click="openAddressPopup">주소찾기</a>
                    <address-popup v-if="visibleAddressPopup" :visible.sync="visibleAddressPopup" @getData="getAddress"></address-popup>
                  </div>
                  <div class="input_address_bundle">
                    <span class="custom_input">
                      <input type="text" v-model="addrMngNo" readonly>
                    </span>
                    <span class="custom_input">
                      <input type="text" v-model="addrDtl" readonly>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="sec_form">
        <div class="title_area left">
          <h3 class="h3_title">담당자정보</h3>
        </div>
        <table class="tbl_row_type">
          <caption>
            <strong>담당자정보</strong>
            <p>
              아이디, 비밀번호, 비밀번호 확인, 이름, 휴대폰번호,
              회사번호+내선번호, 이메일
            </p>
          </caption>
          <colgroup>
            <col style="width:190px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">아이디 <span class="require">*</span></th>
              <td>
                <div class="cont_flex_bundle">
                  <span class="custom_input">{{this.userId}}</span>
                </div>
              </td>
            </tr>
            <tr v-if="this.aprvRet !== 'WAITING' && this.aprvRet !== 'INSPECTED' && this.aprvRet !== 'INSPECTING'">
              <th scope="row">비밀번호 <span class="require">*</span></th>
              <td>
                <div class="cont_flex_bundle">
                  <span class="custom_input">
                    <input type="password" ref="userPwd" placeholder="비밀번호">
                  </span>
                  <span class="text_desc">
                    영문, 숫자, 특수문자 중 2가지 이상 조합하여 10자리 이상,
                    3가지 이상 조합하여 8자리 이상
                  </span>
                </div>
              </td>
            </tr>
            <tr v-else>
              <th scope="row">비밀번호 <span class="require">*</span></th>
              <td>***********</td>
            </tr>
            <tr v-if="this.aprvRet !== 'WAITING' && this.aprvRet !== 'INSPECTED' && this.aprvRet !== 'INSPECTING'">
              <th scope="row">비밀번호 확인 <span class="require">*</span></th>
              <td>
                <span class="custom_input">
                  <input type="password" ref="userPwdConfirm" placeholder="비밀번호 확인">
                </span>
              </td>
            </tr>
            <tr v-else>
              <th scope="row">비밀번호 확인 <span class="require">*</span></th>
              <td>***********</td>
            </tr>
            <tr>
              <th scope="row">이름 <span class="require">*</span></th>
              <td>{{ this.userNm }}</td>
            </tr>
            <tr>
              <th scope="row">휴대폰인증 <span class="require">*</span></th>
              <td>{{ this.mblNum }}</td>
            </tr>
            <tr>
              <th scope="row">추가 연락처</th>
              <td>
                <!-- 대기 -->
                <div class="phone_number_area" v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                  <div class="input_phone_bundle">{{this.corpTelNumFirst}} - {{this.corpTelNumMiddle}} - {{this.corpTelNumLast}}</div>
                  <div class="input_phone_bundle">
                    <span class="title">
                      내선번호
                      <span>{{this.corpTelExt}}</span>
                    </span>
                  </div>
                </div>
                <!-- 반려 -->
                <div class="phone_number_area" v-else>
                  <div class="input_phone_bundle">
                    <span class="custom_select">
                      <select v-model="corpTelNumFirst">
                        <option v-for="item in telList" v-bind:value="item.code" v-bind:key="item.code">{{item.code}}</option>
                      </select>
                    </span>
                    <span class="hypen">-</span>
                    <span class="custom_input">
                      <input type="text" v-model="corpTelNumMiddle" placeholder>
                    </span>
                    <span class="hypen">-</span>
                    <span class="custom_input">
                      <input type="text" v-model="corpTelNumLast" placeholder>
                    </span>
                  </div>
                  <div class="input_phone_bundle">
                    <span class="title">내선번호</span>
                    <span class="custom_input">
                      <input type="text" v-model="corpTelExt" maxlength="4" placeholder>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">담당자 이메일 <span class="require">*</span></th>
              <td>
                <!-- 대기 -->
                <div class="email_area" v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                  <span class="custom_input">{{this.emailId}}@{{this.emailDomain}}</span>
                </div>
                <!-- 반려 -->
                <div class="email_area" v-else>
                  <span class="custom_input">
                    <input type="text" v-model="emailId" placeholder @input="emailId=ignoreChar($event, ['WHITESPACE','KOR'])">
                  </span>
                  <span class="atsign">@</span>
                  <span class="custom_input">
                    <input v-if="!emailFormFlag" type="text" v-model="emailDomain" placeholder @input="emailDomain=ignoreChar($event, ['WHITESPACE','KOR'])">
                    <input v-if="emailFormFlag" type="text" v-model="emailDomain" placeholder disabled>
                  </span>
                  <span class="custom_select">
                    <select v-model="setEmailDomain">
                      <option value>직접입력</option>
                      <option v-for="item in emailList" v-bind:value="item.code" v-bind:key="item.code">{{item.codeNm}}</option>
                    </select>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div class="btn_wrap center mar_t60">
        <a href="javascript:void(0);" class="btn mid bd_black" @click="goHome">
          <span>메인으로</span>
        </a>
        <a href="javascript:void(0);" class="btn mid bd_black" @click="applyCancel" v-if="this.aprvRet !== 'WAITING' && this.aprvRet !== 'INSPECTED' && this.aprvRet !== 'INSPECTING'">
          <span>신청취소</span>
        </a>
        <a href="javascript:void(0);" class="btn mid black" @click="reApply" v-if="this.aprvRet !== 'WAITING' && this.aprvRet !== 'INSPECTED' && this.aprvRet !== 'INSPECTING'">
          <span>재신청</span>
        </a>
      </div>
    </article>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import { retrieveCommonCode } from '@/api/common/code'
import { setReApplyJoinEnterprise, applyCancel } from '@/api/join/applyJoin'
import AddressPopup from '@/components/address'
import { ignoreChar } from '@/utils/check'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      getData: '',
      corpId: '',
      corpRegiNum: '',
      certiFileId: '',
      certiFileNm: '',
      corpNm: '',
      bizCond: '', // 업태
      bizCate: '', // 종목
      addrRegnNo: '',
      addrMngNo: '',
      addrDtl: '',
      userId: '',
      userNm: '',
      mblNum: '',
      corpTelNumFirst: '',
      corpTelNumMiddle: '',
      corpTelNumLast: '',
      corpTelExt: '',
      emailId: '',
      emailDomain: '',
      setEmailDomain: '',
      emailList: [],
      aprvRet: '',
      aprvRetNm: '',
      aprvDt: '',
      aprvRetDescr: '',
      aprvRetDate: '',
      telList: '',
      regiFileList: [],
      corpMasterActiveYn: '',

      uploadRegiFileDescFlag: '', // 삭제대상?
      uploadRegiFileDisplayFlag: '', // 삭제대상?
      visibleAddressPopup: false
    }
  },
  components: { AddressPopup },
  created() {
    if (jglib.isEmpty(this.$route.params)) {
      this.$router.replace('/join/retriveapply')
    } else {
      retrieveCommonCode('TEL_NO_CORP').then(res => {
        this.telList = res.result
      })
      retrieveCommonCode('EMAIL_DOMAIN').then(res => {
        this.emailList = res.result
        let filter = _.filter(this.emailList, { code: this.emailDomain })
        if (filter.length > 0) {
          this.setEmailDomain = filter[0].code
        }
      })

      this.getData = this.$route.params.result
      this.corpRegiNum = jglib.corpRegiNumConverter(this.getData.corpRegiNum)
      this.certiFileId = this.getData.certiFileId
      this.certiFileNm = this.getData.certiFileName
      this.corpNm = this.getData.name
      this.bizCond = this.getData.bizCond
      this.bizCate = this.getData.bizCate
      this.addrRegnNo = this.getData.addrRegnNo
      this.addrMngNo = this.getData.addrMngNo
      this.addrDtl = this.getData.addrDtl
      this.userId = this.getData.userId
      this.userNm = this.getData.userNm
      this.mblNum = jglib.mobileNumConverter(this.getData.mblNum)
      this.corpTelNumFirst = jglib
        .mobileNumConverter(this.getData.corpTelNum)
        .split('-', -1)[0]
      this.corpTelNumMiddle = jglib
        .mobileNumConverter(this.getData.corpTelNum)
        .split('-', -1)[1]
      this.corpTelNumLast = jglib
        .mobileNumConverter(this.getData.corpTelNum)
        .split('-', -1)[2]
      this.corpTelExt = this.getData.corpTelExt
      this.emailId = this.getData.email.split('@')[0]
      this.emailDomain = this.getData.email.split('@')[1]
      this.aprvRet = this.getData.aprvRet
      this.aprvRetNm = this.getData.aprvRetNm
      this.aprvDt = this.getData.aprvDt
      this.aprvRetDescr = this.getData.aprvRetDescr
      this.aprvRetDate = this.getData.aprvDt
      this.corpId = this.getData.corpId
      this.corpMasterActiveYn = this.getData.corpMasterActiveYn
    }
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
    regiFileDisplayFlag() {
      return !jglib.isEmpty(this.certiFileNm)
    },
    regiFileDescFlag() {
      return !jglib.isEmpty(this.certiFileNm)
    },
    emailFormFlag() {
      return !jglib.isEmpty(this.setEmailDomain)
    }
  },
  watch: {
    setEmailDomain(value) {
      if (value) {
        this.emailDomain = value
      } else {
        this.emailDomain = ''
      }
    }
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이벤트에 따라 실행하거나, 내부적으로 사용되는 함수들을 정의한다.
    ignoreChar,
    goHome() {
      this.$router.push('/')
    },
    reApply() {
      let formData = new FormData()
      if (this.regiFileList.length > 0) {
        formData.append('certiFile', this.regiFileList[0])
      }

      this.email = this.emailId + '@' + this.emailDomain

      let reqObj = {
        name: this.corpNm, // 업체명
        bizCond: this.bizCond, // 업태
        bizCate: this.bizCate, // 종목
        corpRegiNum: this.getData.corpRegiNum, // 사업자등록번호
        addrRegnNo: this.addrRegnNo, // 우편번호
        addrMngNo: this.addrMngNo, // 주소관리번호
        addrDtl: this.addrDtl, // 주소상세
        userId: this.getData.userId, // 사용자 ID
        userPwd: this.$refs.userPwd.value, // 사용자 비밀번호
        userNm: this.getData.userNm, // 사용자이름
        mblNum: this.getData.mblNum, // 휴대폰번호
        corpTelNum: this.corpTelNumFirst + this.corpTelNumMiddle + this.corpTelNumLast, // 회사전화번호
        corpTelExt: this.corpTelExt, // 회사내선번호
        corpId: this.getData.corpId,
        email: this.emailId + '@' + this.emailDomain, // 이메일
        certiFileId: this.certiFileId // 사업자등록증 파일ID
      }
      if (jglib.isEmpty(this.corpTelNumFirst) && jglib.isEmpty(this.corpTelNumMiddle) && jglib.isEmpty(this.corpTelNumLast)) {
        reqObj.corpTelNum = ''
      }

      formData.append('data', JSON.stringify(reqObj))

      if (this.validation()) {
        this.$confirmMsg('수정한 정보로 가입 신청 하시겠습니까?', '', '확인', '취소')
          .then(() => {
            setReApplyJoinEnterprise(formData)
              .then(() => {
                this.$router.push('/join/reapply')
              })
              .catch(e => {
                this.$alertMsg(e.desc)
              })
          })
      }
    },
    applyCancel() {
      let reqData = {
        userId: this.userId
      }
      this.$confirmMsg('신청 정보를 삭제하고 가입을 취소하시겠습니까?', '', '확인', '취소')
        .then(() => {
          applyCancel(reqData)
            .then(() => {
              this.$router.push('/')
            })
            .catch(e => {
              this.$alertMsg(e.desc)
            })
        })
    },
    validation() {
      if (jglib.isEmpty(this.corpNm)) {
        this.$alertMsg('업체명을 입력해주세요.')
        return
      }
      if (jglib.isEmpty(this.certiFileNm)) {
        this.$alertMsg('사업자 등록증을 업로드 해 주세요.')
        return
      }
      if (jglib.isEmpty(this.bizCond)) {
        this.$alertMsg('업태를 입력해주세요.')
        return
      }
      if (jglib.isEmpty(this.bizCate)) {
        this.$alertMsg('종목을 입력해주세요.')
        return
      }
      if (jglib.isEmpty(this.userId)) {
        this.$alertMsg('아이디를 입력해주세요.')
        return
      }
      if (jglib.isEmpty(this.$refs.userPwd.value)) {
        this.$alertMsg('비밀번호를 입력해주세요.')
        this.$refs.userPwd.focus()
        return
      }
      if (jglib.isEmpty(this.$refs.userPwdConfirm.value)) {
        this.$alertMsg('비밀번호 확인을 입력해주세요.')
        this.$refs.userPwdConfirm.focus()
        return
      }
      if (!jglib.isPw(this.$refs.userPwd.value) || !jglib.isPw(this.$refs.userPwdConfirm.value)) {
        this.$alertMsg('비밀번호 생성 규칙에 맞지 않습니다.')
        this.$refs.userPwd.focus()
        return
      }
      if (this.$refs.userPwd.value !== this.$refs.userPwdConfirm.value) {
        this.$alertMsg('입력한 비밀번호와 일치하지 않습니다.')
        this.$refs.userPwd.focus()
        return
      }
      if (jglib.isEmpty(this.email)) {
        this.$alertMsg('이메일을 입력해주세요.')
        return
      }
      if (!jglib.isEmail(this.email)) {
        this.$alertMsg('잘못된 이메일 형식 입니다.')
        return
      }
      return true
    },
    // 사업자등록증 업로드 관련 함수
    onRegiFileChange(file) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'jpeg', 'png', 'pdf', 'tiff'], 5)
      if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else {
        this.regiFileRemove()
        this.regiFileList.push(files)
        this.certiFileNm = file.raw.name
        this.uploadRegiFileDisplayFlag = '' // 삭제대상?
        this.uploadRegiFileDescFlag = 'none' // 삭제대상?
      }
    },
    regiFileRemove() {
      this.regiFileList = []
      this.certiFileNm = ''
      this.uploadRegiFileDisplayFlag = 'none' // 삭제대상?
      this.uploadRegiFileDescFlag = '' // 삭제대상?
    },
    regiFileBeforeRemove() {
      let fileNm = this.regiFileList.length === 0 ? this.certiFileNm : this.regiFileList[0].name
      return this.$confirmMsg(`${fileNm} 파일을 삭제 하시겠습니까?`)
        .then(() => {
          this.regiFileRemove()
        })
    },
    openAddressPopup() {
      this.visibleAddressPopup = true
    },
    getAddress(address) {
      this.addrRegnNo = address.zipNo
      this.addrMngNo = address.roadFullAddr
      this.addrDtl = address.detail
    }
  }
}
</script>
