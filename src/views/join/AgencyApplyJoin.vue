<template>
  <!-- 대행사 가입신청 결과 -->
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="top_title_area">
        <h2 class="h2_title">대행사 가입신청 결과</h2>
      </div>
      <section class="sec_form">
        <div class="title_area left">
          <h3 class="h3_title">승인결과</h3>
        </div>
        <table class="tbl_row_type">
          <caption>
            <strong>승인상태</strong>
            <p>승인상태, 사유</p>
          </caption>
          <colgroup>
            <col style="width:215px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">승인상태</th>
              <td v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                <span class="text_gray">{{this.aprvRetNm}}</span>
              </td>
              <td v-else>
                <span class="text_red">{{this.aprvRetNm}}</span>
                <span class="text_desc">({{this.aprvDt}})</span>
              </td>
            </tr>
            <tr v-if="this.aprvRet === 'REJECTED'">
              <th scope="row">사유</th>
              <td>{{this.aprvRetDescr}}</td>
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
            <p>사업자등록번호, 업체명, 사업자등록증, 업태, 종목, 주소, 수신서버 URL, API Client IP, 제공서비스, 특수부가통신 사업장등록증</p>
          </caption>
          <colgroup>
            <col style="width:200px">
            <col style="width:470px">
            <col style="width:200px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                사업자등록번호
                <span class="require">*</span>
              </th>
              <td>{{this.agencyRegiNum}}</td>
              <th scope="row">
                업체명
                <span class="require">*</span>
              </th>
              <td>
                <span class="custom_input full_width">
                  <span v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">{{this.agencyNm}}</span>
                  <input type="text" ref="agencyNm" v-model.trim="agencyNm" maxlength="20" placeholder v-else>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">
                사업자등록증
                <span class="require">*</span>
              </th>
              <td colspan="3" v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                <a href="javascript:void(0);">
                  <span>{{this.certiFileNm}}</span>
                </a>
              </td>
              <td colspan="3" v-else>
                <div class="box_add_file">
                  <el-upload ref="agencyRegiFileUpload" action="https://jsonplaceholder.typicode.com/posts/" :on-change="onRegiFileChange" :file-list="regiFileList" :auto-upload="false" class="i_block">
                    <a href="javascript:void(0);" type="primary" class="btn sml bd_black">파일선택</a>
                  </el-upload>
                  <span v-show="!regiFileDisplayFlag" class="text_desc add_file">파일형식 : jpg, png, pdf, tiff (최대 5MB)</span>
                  <span v-show="regiFileDisplayFlag" class="text_desc add_file">
                    {{this.certiFileNm}}
                    <a href="javascript:void(0);" class="btn_delete" @click="regiFileBeforeRemove">
                      <span>삭제</span>
                    </a>
                  </span>
                  <!-- <span class="text_desc add_file">파일형식 : jpg, png, pdf, tiff (최대 5MB)</span> -->
                  <!-- <label class="btn sml bd_black">
                    <input
                      ref="fileUpload"
                      @change="uploadFileName"
                      type="file"
                      value
                      class="ui_skip"
                    >
                    {{ $t('common.button.selection')}}
                  </label>-->
                  <!-- <span class="custom_input">
                    <input
                      v-model="fileUploadName"
                      class
                      disabled
                      placeholder="파일형식 : jpg, png, pdf (최대 5MB)"
                    >
                  </span>-->
                </div>
                <!-- <a href="javascript:void(0);" class="btn sml bd_black">
                  <span>파일선택</span>
                </a>-->
                <!-- <span class="text_desc">파일형식 : jpg, png, pdf (최대 5MB)</span> -->
              </td>
            </tr>
            <tr>
              <th scope="row">
                업태
                <span class="require">*</span>
              </th>
              <td>
                <span class="custom_input full_width">
                  <span v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">{{this.bizCond}}</span>
                  <input type="text" ref="bizCond" v-model.trim="bizCond" maxlength="21" placeholder v-else>
                </span>
              </td>
              <th scope="row">
                종목
                <span class="require">*</span>
              </th>
              <td>
                <span class="custom_input full_width">
                  <span v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">{{this.bizCate}}</span>
                  <input type="text" ref="bizCate" v-model.trim="bizCate" maxlength="21" placeholder v-else>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">
                주소
                <span class="require">*</span>
              </th>
              <td colspan="3">
                <div class="address_search_area" v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
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
                </div>
                <div class="address_search_area" v-else>
                  <div class="input_search_bundle">
                    <span class="custom_input">
                      <input type="text" v-model="addrRegnNo" readonly>
                    </span>
                    <a href="javascript:void(0);" type="text" ref="modal" class="btn sml bd_black" @click="openAddressPopup">우편번호</a>
                    <address-popup v-if="visibleAddressPopup" :visible.sync="visibleAddressPopup" @getData="getAddress"></address-popup>
                    <!-- <a href="javascript:void(0);" class="btn sml bd_black">
                      <span>주소찾기</span>
                    </a>-->
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
            <tr>
              <th scope="row">수신서버 URL</th>
              <td colspan="3">
                <span class="custom_input full_width">
                  <span v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">{{this.recvUrl}}</span>
                  <input type="text" ref="recvUrl" v-model.trim="recvUrl" v-else autocomplete="new-password">
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">API Client IP</th>
              <td colspan="3">
                <span class="custom_input full_width field_area">
                  <!-- <span v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                    {{this.sendHost}}
                  </span>
                  <input type="text" ref="sendHost" v-model="sendHost" v-else> -->
                  <allow-ip ref="allowipR" :list="allowedIpList" :edit="!(this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING')"></allow-ip>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">
                제공서비스
                <span class="require">*</span>
              </th>
              <td colspan="3">
                <span class="custom_checkbox">
                  <input type="checkbox" v-model="checked.a2p" ref="a2p" name="Checkbox" id="Checkbox01_1" @change="changeService"
                   v-bind:disabled="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                  <label for="Checkbox01_1">단방향 대화방</label>
                </span>
                <span class="custom_checkbox">
                  <input type="checkbox" v-model="checked.chat" ref="chat" name="Checkbox" id="Checkbox01_2" @change="changeService"
                   v-bind:disabled="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                  <label for="Checkbox01_2">양방향 대화방</label>
                </span>
              </td>
            </tr>
            <tr class="verticalMiddle" v-if="checked.chat === true">
              <th scope="row">
                  양방향 대화방<br>중계사 여부
                <span class="require">*</span></th>
              <td>
                <span class="custom_radio fs16">
                  <input type="radio" v-model="rcsCorpYn" value='Y' name="Radio" id="Radio01_1" @change="changeRelay" ref="rcsCorpYn"
                   v-bind:disabled="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                  <label for="Radio01_1">중계사임</label>
                </span>
                <span class="custom_radio fs16">
                  <input type="radio" v-model="rcsCorpYn" value='N' name="Radio" id="Radio01_2" @change="changeRelay"
                   v-bind:disabled="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                  <label for="Radio01_2">중계사 아님</label>
                </span>
                <div class="input_chatbot_bundle" v-if="rcsCorpYn !== 'N'">
                    <label for="Radio01_2_2">양방향 대화방 수신 URL</label>
                  <span class="custom_input">
                    <input type="text" id="Radio01_2_2" ref="webHookUrl" v-model.trim="webHookUrl"
                     v-bind:disabled="(this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING') || disable === true">
                  </span>
                </div>
              </td>
              <th scope="row">양방향 대화방 중계사</th>
              <td v-if="rcsCorpYn !== 'N' && disable === false">
                {{agencyNm}}
              </td>
              <td v-if="rcsCorpYn !== 'N' && disable === true">
              </td>
              <td v-if="rcsCorpYn === 'N'">
                <span v-if="relayAgInfo.length > 0" class="text_value">선택 중계사 <span class="text_blue">{{relayAgInfo.length}}</span>개</span>
                <el-button type="text" class="el-button btn sml bd_black el-button--primary el-button--small"
                 :disabled=disable
                 @click="openRelayPopup">중계사 선택</el-button>
                <relay-popup v-if="visibleRelayPopup"
                 :relayAgInfo.sync="relayAgInfo"
                 :relayAgRegister.sync="relayAgRegister"
                 :relayAgConfirm.sync="relayAgConfirm"
                 :visible.sync="visibleRelayPopup"
                 :agencyCorpRegNum.sync="getData.agencyRegiNum"
                 :reqUserId.sync="userId"
                 @getData="getRelayAgInfo">
                </relay-popup>
              </td>
            </tr>
            <tr>
              <th scope="row">
                특수부가통신
                <br>사업자등록증
                <span class="require">*</span>
              </th>
              <td colspan="3" v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                <a href="javascript:void(0);">
                  <span>{{this.rcsCertiFileNm}}</span>
                </a>
              </td>
              <td colspan="3" v-else>
                <div class="box_add_file">
                  <el-upload ref="agencyRcsFileUpload" action="https://jsonplaceholder.typicode.com/posts/" :on-change="onRcsFileChange" :file-list="rcsFileList" :auto-upload="false" class="i_block">
                    <a href="javascript:void(0);" type="primary" class="btn sml bd_black">파일선택</a>
                  </el-upload>
                  <span v-show="!rcsFileDisplayFlag" class="text_desc add_file">파일형식 : jpg, png, pdf, tiff (최대 5MB)</span>
                  <span v-show="rcsFileDisplayFlag" class="text_desc add_file">
                    {{this.rcsCertiFileNm}}
                    <a href="javascript:void(0);" class="btn_delete" @click="rcsFilebeforeRemove">
                      <span>삭제</span>
                    </a>
                  </span>
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
            <p>아이디, 비밀번호, 비밀번호 확인, 이름, 휴대폰번호, 이메일</p>
          </caption>
          <colgroup>
            <col style="width:215px">
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
                    <input type="password" ref="userPwd" v-model="userPwd" placeholder="비밀번호" autocomplete="new-password">
                  </span>
                  <span class="text_desc">영문, 숫자, 특수문자 중 2가지 이상 조합하여 10자리 이상, 3가지 이상 조합하여 8자리 이상</span>
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
                  <input type="password" ref="userPwdConfirm" placeholder="비밀번호 확인" autocomplete="new-password">
                </span>
              </td>
            </tr>
            <tr v-else>
              <th scope="row">비밀번호 확인 <span class="require">*</span></th>
              <td>***********</td>
            </tr>
            <tr>
              <th scope="row">이름 <span class="require">*</span></th>
              <td>{{this.userNm}}</td>
            </tr>
            <tr>
              <th scope="row">휴대폰인증 <span class="require">*</span></th>
              <td>{{this.mblNum}}</td>
            </tr>
            <tr>
              <th scope="row">추가 연락처</th>
              <td>
                <div class="phone_number_area">
                  <div class="input_phone_bundle">
                    <span>{{this.corpTelNum}}</span>
                  </div>
                  <div class="input_phone_bundle">
                    <span class="title">
                      내선번호
                      <span>{{this.corpTelExt}}</span>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">대표 이메일 <span class="require">*</span></th>
              <td>
                <div class="email_area" v-if="this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING'">
                  <span class="custom_input">{{this.emailId}}@{{this.emailDomain}}</span>
                </div>
                <div class="email_area" v-else>
                  <span class="custom_input">
                    <input type="text" ref="emailId" v-model="emailId" placeholder @input="emailId=ignoreChar($event, ['WHITESPACE','KOR'])">
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
      <div class="btn_wrap center mar_t40">
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="goHome">
          <span>메인으로</span>
        </a>
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="applyCancel" v-if="this.aprvRet !== 'WAITING' && this.aprvRet !== 'INSPECTED' && this.aprvRet !== 'INSPECTING'">
          <span>신청취소</span>
        </a>
        <a href="javascript:void(0);" class="btn mid blue" @click="reApply" v-if="this.aprvRet !== 'WAITING' && this.aprvRet !== 'INSPECTED' && this.aprvRet !== 'INSPECTING'">
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
import { setReApplyJoinAgency, applyCancel } from '@/api/join/applyJoin'
import AddressPopup from '@/components/address'
import { ignoreChar } from '@/utils/check'
import AllowIp from '@/views/service/components/AllowIp'
import RelayPopup from '@/components/relay'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  name: 'AgencyApplyJoin',
  data() {
    return {
      getData: '',
      corpId: '',
      agencyRegiNum: '',
      certiFileId: '',
      certiFileNm: '',
      corpCerti: '',
      agencyNm: '',
      bizCond: '',
      bizCate: '',
      addrRegnNo: '',
      addrMngNo: '',
      addrDtl: '',
      userId: '',
      userNm: '',
      userPwd: '',
      mblNum: '',
      emailId: '',
      emailDomain: '',
      setEmailDomain: '',
      emailList: [],
      recvUrl: '',
      sendHost: '',
      rcsSvc: '',
      rcsCorpYn: '',
      webHookUrl: '',
      relayAgInfo: [],
      rcsCertiFileId: '',
      rcsCertiFileNm: '',
      rcsCertiUrl: '',
      aprvRet: '',
      aprvRetNm: '',
      aprvDt: '',
      aprvRetDescr: '',
      aprvRetDate: '',
      telList: '',
      regiFileList: [],
      rcsFileList: [],
      allowedIpList: [],

      uploadRegiFileDescFlag: '',
      uploadRegiFileDisplayFlag: '',
      uploadRcsFileDescFlag: '',
      uploadRcsFileDisplayFlag: '',
      visibleAddressPopup: false,

      corpTelNum: '',
      corpTelExt: '',
      rcsSvcArr: {
        a2p: 'a2p',
        chat: 'chat',
        both: 'a2p,chat',
        blank: ''
      },
      checked: {
        a2p: true,
        chat: false
      },
      visibleRelayPopup: false,
      relayAgConfirm: false,
      relayAgRegister: false,
      disable: false
    }
  },
  components: {
    AddressPopup,
    AllowIp,
    RelayPopup
  },
  created() {
    if (jglib.isEmpty(this.$route.params)) {
      this.$router.replace('/join/retriveapply')
    } else {
      retrieveCommonCode('EMAIL_DOMAIN').then(res => {
        this.emailList = res.result
        let filter = _.filter(this.emailList, { code: this.emailDomain })
        if (filter.length > 0) {
          this.setEmailDomain = filter[0].code
        }
      })
      this.getData = this.$route.params.result
      this.agencyRegiNum = jglib.corpRegiNumConverter(
        this.getData.agencyRegiNum
      )
      this.certiFileId = this.getData.certiFileId
      this.certiFileNm = this.getData.certiFileName
      this.agencyNm = this.getData.name
      this.bizCond = this.getData.bizCond
      this.bizCate = this.getData.bizCate
      this.addrRegnNo = this.getData.addrRegnNo
      this.addrMngNo = this.getData.addrMngNo
      this.addrDtl = this.getData.addrDtl
      this.userId = this.getData.userId
      this.userNm = this.getData.userNm
      this.mblNum = jglib.mobileNumConverter(this.getData.mblNum)
      this.corpTelNum = jglib.mobileNumConverter(this.getData.corpTelNum)
      this.corpTelExt = this.getData.corpTelExt
      this.emailId = this.getData.email.split('@')[0]
      this.emailDomain = this.getData.email.split('@')[1]
      this.recvUrl = this.getData.recvUrl
      this.sendHost = this.getData.sendHost
      this.rcsSvc = this.getData.rcsSvc
      this.rcsCertiFileId = this.getData.rcsCertiFileId
      this.rcsCertiFileNm = this.getData.rcsCertiFileName
      this.rcsCertiUrl = this.getData.rcsCertiUrl
      this.aprvRet = this.getData.aprvRet
      this.aprvRetNm = this.getData.aprvRetNm
      this.aprvDt = this.getData.aprvDt
      this.aprvRetDescr = this.getData.aprvRetDescr
      this.aprvRetDate = this.getData.aprvRetDate
      this.corpId = this.getData.corpId
      this.allowedIpList = this.getData.allowIpList
      this.rcsCorpYn = this.getData.rcsCorpYn
      this.webHookUrl = this.getData.webHookUrl
      this.relayAgInfo = this.getData.relayAgInfo
    }
    this.init()
  },
  mounted() {},
  computed: {
    regiFileDisplayFlag() {
      return !jglib.isEmpty(this.certiFileNm)
    },
    rcsFileDisplayFlag() {
      return !jglib.isEmpty(this.rcsCertiFileNm)
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
    ignoreChar,
    init() {
      if (this.rcsSvc === this.rcsSvcArr.a2p) {
        this.checked.a2p = true
        this.checked.chat = false
        this.disable = true
      } else if (this.rcsSvc === this.rcsSvcArr.chat) {
        this.checked.a2p = false
        this.checked.chat = true
      } else if (this.rcsSvc === this.rcsSvcArr.both) {
        this.checked.a2p = true
        this.checked.chat = true
      }
      if (this.aprvRet === 'WAITING' || this.aprvRet === 'INSPECTED' || this.aprvRet === 'INSPECTING') {
        this.relayAgRegister = false
        this.relayAgConfirm = true
      } else {
        this.relayAgRegister = true
        this.relayAgConfirm = false
      }
    },
    goHome() {
      this.$router.push('/')
    },
    reApply() {
      if (this.checked.a2p === true && this.checked.chat === false) {
        // 제공 서비스 a2p일 경우 중계사 선택 NULL 설정
        this.rcsCorpYn = null
      }
      if (this.rcsCorpYn === 'Y') {
        // 중계사의 경우 대행 중계사 초기화
        this.relayAgInfo = []
      } else {
        // 중계사 아님의 경우 WebHookURL 공란으로 설정
        this.webHookUrl = null
      }

      let formData = new FormData()
      if (this.regiFileList.length > 0) {
        formData.append('certiFile', this.regiFileList[0])
      }
      if (this.rcsFileList.length > 0) {
        formData.append('rcsCertiFile', this.rcsFileList[0])
      }
      this.email = this.emailId + '@' + this.emailDomain
      let reqObj = {
        name: this.agencyNm, // 업체명
        bizCond: this.bizCond, // 업태
        bizCate: this.bizCate, // 종목
        agencyRegiNum: this.getData.agencyRegiNum, // 사업자등록번호
        addrRegnNo: this.addrRegnNo, // 우편번호
        addrMngNo: this.addrMngNo, // 주소관리번호
        addrDtl: this.addrDtl, // 주소상세
        recvUrl: this.recvUrl, // 수신서버 URL
        sendHost: this.sendHost, // API Client IP
        rcsSvc: this.rcsSvc, // 제공서비스
        rcsCertiFileId: this.rcsCertiFileId, // 특수부가통신 사업자등록증 파일ID (파일명?)
        certiFileId: this.certiFileId, // 사업자등록증 파일ID (파일명?)
        userId: this.getData.userId, // 사용자 ID
        userPwd: this.$refs.userPwd.value, // 사용자 비밀번호
        userNm: this.getData.userNm, // 사용자이름
        mblNum: this.getData.mblNum, // 휴대폰번호
        email: this.email, // 이메일
        corpId: this.getData.corpId,
        rcsCorpYn: this.rcsCorpYn, // 양방향 대화방 중계사 유무
        webHookUrl: this.webHookUrl, // 양방향 대화방 중계사 Url
        relayAgInfo: this.relayAgInfo // 관계 중계사 정보
      }
      if (this.$refs.allowipR) {
        try {
          reqObj.addAllowIpList = this.$refs.allowipR.getAllowIp()
        } catch (e) {
          this.$alertMsg(e)
          return false
        }
      }
      formData.append('data', JSON.stringify(reqObj))

      if (this.validation()) {
        this.$confirmMsg('수정한 정보로 가입 신청 하시겠습니까?', '', '확인', '취소')
          .then(() => {
            setReApplyJoinAgency(formData)
              .then(() => { this.$router.push('/join/reapply') })
              .catch(e => { this.$alertMsg(e.desc) })
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
            .then(() => { this.$router.push('/') })
            .catch(e => { this.$alertMsg(e.desc) })
        })
    },
    validation() {
      if (jglib.isEmpty(this.certiFileNm)) {
        this.$alertMsg('사업자 등록증을 업로드 해 주세요.')
        return
      }
      if (jglib.isEmpty(this.agencyNm)) {
        this.$alertMsg('업체명을 입력 해 주세요.')
        this.$refs.agencyNm.focus()
        return
      }
      if (jglib.isEmpty(this.bizCond)) {
        this.$alertMsg('업태를 입력 해 주세요.')
        this.$refs.bizCond.focus()
        return
      }
      if (jglib.isEmpty(this.bizCate)) {
        this.$alertMsg('종목을 입력 해 주세요.')
        this.$refs.bizCate.focus()
        return
      }
      if (!jglib.isEmpty(this.recvUrl) && !jglib.isUrl(this.recvUrl)) {
        // this.$alertMsg('수신서버 URL을 입력 해 주세요.')
        this.$alertMsg('올바른 URL 형식이 아닙니다.')
        this.$refs.recvUrl.focus()
        return
      }
      if (jglib.isEmpty(this.webHookUrl) && this.rcsCorpYn === 'Y' && this.checked.chat === true) {
        this.$alertMsg('양방향 중계 URL 정보를 입력해 주세요.').then(() => {
          this.$refs.webHookUrl.focus()
        })
        return false
      }
      if (!jglib.isUrl(this.webHookUrl) && this.rcsCorpYn === 'Y' && this.checked.chat === true) {
        this.$alertMsg('올바른 URL 형식이 아닙니다.').then(() => {
          this.$refs.webHookUrl.focus()
        })
        return false
      }
      if (this.relayAgInfo.length < 1 && this.rcsCorpYn === 'N' && this.checked.chat === true) {
        this.$alertMsg('중계사를 선택해 주세요.')
        return false
      }
      if (jglib.isEmpty(this.rcsCorpYn) && this.checked.chat === true) {
        this.$alertMsg('중계사 여부를 선택해 주세요.').then(() => {
          this.$refs.rcsCorpYn.focus()
        })
        return false
      }
      // if (jglib.isEmpty(this.sendHost) || !jglib.isIpAddress(this.sendHost)) {
      //   this.$alertMsg('API Client IP를 입력 해 주세요.')
      //   this.$refs.sendHost.focus()
      //   return
      // }
      // FIXME 제공서비스는 선택(변경) 할 수 없기때문에 제거 해도 될듯.
      if (jglib.isEmpty(this.rcsSvc)) {
        this.$alertMsg('제공서비스를 선택 해 주세요.')
        return
      }
      if (jglib.isEmpty(this.rcsCertiFileNm)) {
        this.$alertMsg('특수부가통신 사업자 등록증을 업로드 해 주세요.')
        return
      }
      if (jglib.isEmpty(this.userId)) {
        this.$alertMsg('아이디를 입력 해 주세요.')
        this.$refs.userId.focus()
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
        this.$alertMsg('이메일을 입력 해 주세요.')
        this.$refs.emailId.focus()
        return
      }
      if (!jglib.isEmail(this.email)) {
        this.$alertMsg('잘못된 이메일 형식 입니다.')
        this.$refs.emailId.focus()
        return
      }
      return true
    },
    // 사업자등록증 업로드 관련 함수
    onRegiFileChange(file) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'jpeg', 'png', 'pdf', 'tiff'], 5)
      if (uploadCheck.code === 'errorSize') {
        this.regiFileList.pop(files)
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorExt') {
        this.regiFileList.pop(files)
        this.$alertMsg(uploadCheck.message)
      } else {
        this.regiFileRemove()
        this.regiFileList.push(files)
        this.certiFileNm = file.raw.name
        this.uploadRegiFileDisplayFlag = ''
        this.uploadRegiFileDescFlag = 'none'
      }
    },
    regiFileRemove() {
      this.regiFileList = []
      this.certiFileNm = ''
      this.certiFileId = ''
      this.uploadRegiFileDisplayFlag = 'none'
      this.uploadRegiFileDescFlag = ''
    },
    regiFileBeforeRemove() {
      let fileNm = this.regiFileList.length === 0 ? this.certiFileNm : this.regiFileList[0].name
      return this.$confirmMsg(`${fileNm} 파일을 삭제 하시겠습니까?`)
        .then(() => { this.regiFileRemove() })
    },
    // 특수부가통신 사업자등록증
    onRcsFileChange(file) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'png', 'pdf', 'tiff'], 5)
      if (uploadCheck.code === 'errorSize') {
        this.rcsFileList.pop(files)
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorExt') {
        this.rcsFileList.pop(files)
        this.$alertMsg(uploadCheck.message)
      } else {
        this.rcsFileRemove()
        this.rcsFileList.push(files)
        this.rcsCertiFileNm = file.raw.name
        this.uploadRcsFileDisplayFlag = ''
        this.uploadRcsFileDescFlag = 'none'
      }
    },
    rcsFileRemove() {
      this.rcsFileList = []
      this.rcsCertiFileNm = ''
      this.rcsCertiFileId = ''
      this.uploadRcsFileDisplayFlag = 'none'
      this.uploadRcsFileDescFlag = ''
    },
    rcsFilebeforeRemove() {
      let fileNm = this.rcsFileList.length === 0 ? this.rcsCertiFileNm : this.rcsFileList[0].name
      return this.$confirmMsg(`${fileNm} 파일을 삭제 하시겠습니까?`)
        .then(() => { this.rcsFileRemove() })
    },
    openAddressPopup() {
      this.visibleAddressPopup = true
    },
    getAddress(address) {
      this.addrRegnNo = address.zipNo
      this.addrMngNo = address.roadFullAddr
      this.addrDtl = address.detail
    },
    openRelayPopup() {
      this.visibleRelayPopup = true
    },
    getRelayAgInfo(selectRelay) {
      this.relayAgInfo = selectRelay
    },
    changeService() {
      if (this.checked.a2p === true && this.checked.chat === false) {
        this.rcsSvc = this.rcsSvcArr.a2p
      } else if (this.checked.a2p === false && this.checked.chat === true) {
        this.rcsSvc = this.rcsSvcArr.chat
      } else if (this.checked.a2p === true && this.checked.chat === true) {
        this.rcsSvc = this.rcsSvcArr.both
      } else {
        this.rcsSvc = this.rcsSvcArr.blank
      }
    },
    changeRelay() {
      if (this.rcsCorpYn === 'Y') {
        this.disable = true
        // 중계사의 경우 대행 중계사 초기화
        this.relayAgInfo = []
        this.$confirmMsg(
          `양방향 메시지의 중계사로 지정할 경우,
        대행사가 중계사로 지정한 브랜드의 모든 양방향 메시지 및 자동응답메시지
        (사용자가 질의한 내용에 대해 RBC에 미리 지정된 메시지가 자동 발송되는 서비스)의
        트래픽은 모두 중계사에게 과금되오니,
        중계사는 대행사가 중계사로 지정했을 경우 해당 대행사가
        양방향 메시지 청약 및 기업고객 양방향 메시지 과금을 대행한다는
        것에 대한 동의 절차를 받는 기능을 구현해야 합니다.
        <br><br>
        중계사 시스템에 양방향 메시지에 대한 청약 및 대행사 webhook url 정보 등록을 위한 기능을 구현하셨나요?`,
          '',
          '확인',
          '닫기'
        ).then(() => {
          this.disable = false
        })
      } else if (this.rcsCorpYn === 'N') {
        this.disable = true
        // 중계사 아님의 경우 WebHookURL 공란으로 설정
        this.webHookUrl = null
        this.$confirmMsg(
          `중계사 선택 전에 반드시 대행사는 선택하고자 하는 중계사에 청약이 완료되어야 하며,
        양방향 메시지를 수신하기 위한 webhook url 정보를 해당 중계사의 시스템에 등록해야 합니다.
        <br><br>
        지정하고자 하는 중계사에 양방향 메시지에 대한 청약 및 webhook url 정보 등록을 완료하셨나요?`,
          '',
          '확인',
          '닫기'
        ).then(() => {
          this.disable = false
        })
      }
    }
  }
}
</script>
<style>
</style>
