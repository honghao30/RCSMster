<template>
  <div class="join">
    <!-- <PageTitle pagetitle="비즈니스 정보 관리" progress="승인완료" />
    <div class="top-progress-area" v-if="isStatusWating || isStatusInspected || isStatusOk || isStatusRejected">
      <span :class="{'flag-progress': true, 'done': isStatusInspected || isStatusOk, 'reject': isStatusRejected}">{{ corpData.aprvRetNm }}</span>
    </div> -->
    <PageTitle pagetitle="비즈니스 정보 관리" :progress="corpData.aprvRetNm"/>
    <!-- 선거용 배너 노출 영역 -->
    <template>
      <div class="top-notice--gray election" v-for="(element, index) in seasonData" :key="index">
        <div class="title">{{ element.name }}</div>
        <div class="sub-title">기간 : {{ convertYmdStr(element.startDt)}} ~ {{ convertYmdStr(element.expireDt)}}</div>
        <span class="flag-progress done" v-if="element.userId">아이디 발급 완료</span>
        <div class="election__banner--innerbox">
          <p>발급된 계정으로 접속하여 기간 동안 브랜드를 생성/운영관리 할 수 있습니다.</p>
          <span class="msgbox-round" v-if="element.userId">ID : {{ element.userId }}</span>
          <ButtonCmp type="btn-blue" @click="newIdApproval(element)" v-if="!element.userId">기간제 계정 신청</ButtonCmp>
        </div>
      </div>
    </template>
    <!-- //선거용 배너 노출 영역 -->
    <PageTitleH3 titleh3="비지니스 정보"/>
    <form ref="form1">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true}">사업자등록번호</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item"><span class="input"><input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="formData.corpRegiNum" disabled></span></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true}">법인명(단체명)</span></th>
              <td>
                <span class="text">{{ formData.name }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true}">업태</span></th>
              <td>
                <span class="text">{{ formData.bizCond }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true}">종목</span></th>
              <td>
                <span class="text">{{ formData.bizCate }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true}">기업주소</span></th>
              <td>
                <span class="text">{{ formData.addrRegnNo }} {{ formData.addrMngNo }} {{ formData.addrDtl }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <PageTitleH3 titleh3="서비스정보 입력" noticeinfo="" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true, 'required':!isViewMode}">수신서버 URL</span></th>
              <td>
                <span class="text" v-if="isViewMode">{{ corpData.recvUrl }}</span>
                <div class="form-item__content" v-if="!isViewMode">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input"><input type="text" class="input" placeholder="" ref="recvUrl" v-model.trim="formData.recvUrl"></span>
                    </div>
                  </div>
                  <!-- <p class="guide-text error" v-if="bizeventErrorMsg">사업자등록증에 등록된 첫번째 종목명을 입력해주세요.</p> -->
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true, 'required':!isViewMode}">중계사</span></th>
              <td>
                <div class="form-item__content agency">
                  <div class="form-item-row">
                    <div class="input-item w--half">
                      <div class="radiobox">
                        <input type="radio" v-model="formData.rcsCorpYn" value='Y' name="Radio" id="Radio01_1" :checked="formData.rcsCorpYn == 'Y'" ref="rcsCorpYn" :disabled="disableChabot" @change="changeRelay">
                        <label for="Radio01_1"><span class="checkbox__text">중계사임</span></label>
                      </div>
                      <div class="radiobox">
                        <input type="radio" v-model="formData.rcsCorpYn" value='N' name="Radio" id="Radio01_2" :checked="formData.rcsCorpYn == 'N'" ref="rcsCorpYn" :disabled="disableChabot" @change="changeRelay">
                        <label for="Radio01_2"><span class="checkbox__text">중계사 아님</span></label>
                      </div>
                    </div>
                    <div class="input-item w--half" v-if="formData.rcsCorpYn !== 'N'">
                      <label for="Radio01_2_2" class="item-label">대화방 수신 URL</label>
                      <span class="input">
                        <input type="text" id="Radio01_2_2" ref="webHookUrl" v-model.trim="formData.webHookUrl" :disabled="disable || disableChabot">
                      </span>
                    </div>
                    <div class="input-item w--half" v-if="formData.rcsCorpYn === 'N'">
                      <span class="item-label">중계사 선택</span>
                      <ButtonCmp type="btn-default-line" :disabled="disable" @click="openRelayPopup">중계사 선택</ButtonCmp>
                      <span class="result-text" v-if="formData.relayAgInfo.length > 0">선택 중계사 <em class="point">{{formData.relayAgInfo.length}}</em>개</span>
                    </div>
                  </div>
                  <p class="guide-text" v-if="formData.rcsCorpYn !== 'N' && disable === false">{{formData.name}}</p>
                  <p class="guide-text" v-if="formData.rcsCorpYn !== 'N' && disable === true"></p>
                  <p class="guide-text" v-if="formData.rcsCorpYn === 'Y'">※ 중계사 지정 안내<br>중계사로 지정된 브랜드의 모든 메시지 및 자동응답메시지의 트래픽이 모두 중계사에게 부과됩니다.<br>대행사가 중계사로 지정되는 경우 해당 대행사가 메시지 청약 및 과금을 대행한다는 것에 대한 동의 절차를 진행해야 합니다.</p>
                  <p class="guide-text" v-else-if="formData.rcsCorpYn === 'N'">※ 중계사 선택 안내<br>반드시 청약이 완료된 중계사를 선택해야 하며 메시지를 수신하기 위한 webhook.url 정보를 해당 중계사의 시스템에 등록해야 합니다. </p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span :class="{'form-item__label':true}">특수부가통신<br>사업자등록증</span></th>
              <td>
                <span class="text">{{ corpData.rcsCertiFileName }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <div class="top-notice--gray gray__bottom">
      <p>-비지니스 정보는 온라인 문의로 변경 요청해 주세요.</p>
      <p>-운영자 심사 대기 상태에서는 정보 수정이 불가합니다.</p>
    </div>
    <div class="button__wrap space-between">
      <ButtonCmp type="btn-line" @click="goMyInfo">취소</ButtonCmp>
      <div class="button__wrap button__left">
        <ButtonCmp type="btn btn-line" @click="goMyInfoViewMode" >개인정보 관리</ButtonCmp>
        <ButtonCmp type="btn-line" @click="updateCorpData">수정요청</ButtonCmp>
      </div>
    </div>
    <!-- 모달 창 -->
    <ModalView v-if="visibleAddressPopup || visibleRelayPopup">
      <ZipCode v-if="visibleAddressPopup" @closeModal="closeAddressPopup" />
      <relay-popup
        v-if="visibleRelayPopup"
                :relayAgInfo="formData.relayAgInfo"
                :relayAgModify.sync="relayAgModify"
                :relayAgRegister="relayAgRegister"
                :visible.sync="visibleRelayPopup"
                :agencyCorpRegNum.sync="formData.agencyRegiNum"
                :reqUserId.sync="reqUserId"
        @getData="getRelayAgInfo" />
    </ModalView>
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        modalsize="Max628"
      >
        <div slot="msg">
          <div class="msg election">
            <div class="phone-cert__title">
              {{ seasonName }}<br>
              계정이 발급되었습니다.
            </div>
            <div class="phone-cert__number">ID : {{ regUserId }}</div>
            <div class="phone-cert__msg">
              비밀번호 재설정 이후 사용하실 수 있습니다.<br>
              확인 버튼을 선택하시면 비밀번호 재설정 페이지로 이동합니다.
            </div>
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

    <!-- //모달 창 -->
  </div>
  <!-- <article id="content" class="content">
    <div class="top_title_area">
      <h2 class="h2_title">비지니스 정보 관리</h2>
      <span class="h2_desc">비지니스 정보는 온라인 문의로 변경 요청해 주세요.</span>
    </div>
    <section class="sec_form" v-if="isStatusWating || isStatusInspected || isStatusRejected">
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
            <td>
              {{ corpData.aprvRetNm }}
              <span
                class="text_desc"
                v-if="isStatusRejected"
              >({{ corpData.aprvDt }})</span>
            </td>
          </tr>
          <tr v-if="isStatusRejected">
            <th scope="row">사유</th>
            <td>{{ corpData.aprvRetDesc}}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="sec_form">
      <table class="tbl_row_type">
        <caption>
          <strong>비지니스 정보</strong>
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
            <th scope="row">사업자등록번호</th>
            <td>{{ corpData.agencyRegiNum | prettyCorpRegiNum }}</td>
            <th scope="row">업체명</th>
            <td>{{ corpData.name }}</td>
          </tr>
          <tr>
            <th scope="row">사업자등록증</th>
            <td colspan="3">{{ corpData.certiFileName }}</td>
          </tr>
          <tr>
            <th scope="row">업태</th>
            <td>{{ corpData.bizCond }}</td>
            <th scope="row">종목</th>
            <td>{{ corpData.bizCate }}</td>
          </tr>
          <tr>
            <th scope="row">주소</th>
            <td colspan="3">
              {{ corpData.addrRegnNo }}
              <br>
              {{ corpData.addrMngNo }} {{ corpData.addrDtl }}
            </td>
          </tr>
          <tr>
            <th scope="row">수신서버 URL</th>
            <td colspan="3">
              <span v-if="isViewMode">{{ corpData.recvUrl }}</span>
              <span v-if="!isViewMode" class="custom_input full_width">
                <input type="text" ref="recvUrl" v-model.trim="formData.recvUrl">
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
                <input type="checkbox" v-model="checked.a2p" ref="a2p" name="Checkbox" id="Checkbox01_1" @change="changeService">
                <label for="Checkbox01_1">단방향 대화방</label>
              </span>
              <span class="custom_checkbox">
                <input type="checkbox" v-model="checked.chat" ref="chat" name="Checkbox" id="Checkbox01_2" :disabled="disableChabot" @change="changeService">
                <label for="Checkbox01_2">양방향 대화방</label>
              </span>
            </td>
          </tr>
          <tr class="verticalMiddle" v-if="this.checked.chat === true">
            <th scope="row">
              양방향 대화방<br>중계사 여부
              <span class="require">*</span>
            </th>
            <td>
              <span class="custom_radio fs16">
                <input type="radio" v-model="formData.rcsCorpYn" value='Y' name="Radio" id="Radio01_1" ref="rcsCorpYn" :disabled="disableChabot" @change="changeRelay">
                <label for="Radio01_1">중계사임</label>
              </span>
              <span class="custom_radio fs16">
                <input type="radio" v-model="formData.rcsCorpYn" value='N' name="Radio" id="Radio01_2" :disabled="disableChabot" @change="changeRelay">
                <label for="Radio01_2">중계사 아님</label>
              </span>
              <div class="input_chatbot_bundle" v-if="formData.rcsCorpYn !== 'N'">
                <label for="Radio01_2_2">양방향 대화방 수신 URL</label>
                <span class="custom_input">
                  <input type="text" id="Radio01_2_2" ref="webHookUrl" v-model.trim="formData.webHookUrl" :disabled="disable || disableChabot">
                </span>
              </div>
            </td>
            <th scope="row">양방향 대화방 중계사</th>
            <td v-if="formData.rcsCorpYn !== 'N' && disable === false">
              {{formData.name}}
            </td>
            <td v-if="formData.rcsCorpYn !== 'N' && disable === true">
            </td>
            <td v-if="formData.rcsCorpYn === 'N'">
              <span v-if="formData.relayAgInfo.length > 0" class="text_value">선택 중계사 <span class="text_blue">{{formData.relayAgInfo.length}}</span>개</span>
              <el-button type="text" class="el-button btn sml bd_black el-button--primary el-button--small"
               :disabled="disable"
               @click="openRelayPopup">중계사 선택</el-button>
              <relay-popup v-if="visibleRelayPopup"
               :relayAgInfo="formData.relayAgInfo"
               :relayAgModify.sync="relayAgModify"
               :relayAgRegister="relayAgRegister"
               :visible.sync="visibleRelayPopup"
               :agencyCorpRegNum.sync="formData.agencyRegiNum"
               :reqUserId.sync="reqUserId"
               @getData="getRelayAgInfo"></relay-popup>
            </td>
          </tr>
          <tr>
            <th scope="row">
              특수부가통신
              <br>사업자등록증
            </th>
            <td colspan="3">{{ corpData.rcsCertiFileName }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <div class="btn_wrap center mar_t40">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goMyInfo">
        <span>취소</span>
      </a>
      <a href="javascript:void(0);" class="btn mid blue" @click="updateCorpData">
        <span>저장</span>
      </a>
    </div>
  </article> -->
</template>

<script>
import { updateAgencyInfo } from '@/api/utility/utility'
import { downloadFileByFileId, retrieveCorpRegiNum } from '@/api/common/code'
import { createJoinSeason } from '@/api/join/applyJoin'
import RelayPopup from '@/components/relay'

import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import ZipCode from '@/views/join/components/ZipCodeCustom.vue'

export default {
  name: 'CorpInfoAgency',
  components: {
    RelayPopup,
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    ConfirmMsg,
    ZipCode
  },
  props: {
    corpData: {
      type: Object
    },
    aprvRet: {
      type: String
    },
    seasonData: {
      type: Object
    }
  },
  data() {
    return {
      regNum: '',
      regUserId: '',
      seasonName: '',
      formData: {
        corpId: '',
        name: '',
        bizCond: '',
        bizCate: '',
        certiFileId: '',
        rcsCertiFileId: '',
        addrRegnNo: '',
        addrMngNo: '',
        addrDtl: '',
        aprvRet: '',
        aprvRetDescr: '',
        agencyRegiNum: '',
        agencyCerti: '',
        gwCorpYn: '',
        recvUrl: '',
        sendHost: '',
        rcsSvc: '',
        rcsCorpYn: '',
        webHookUrl: '',
        relayAgInfo: []
      },
      termInfo: [],
      termInfoPass: false,
      corpInfo: {
        corpData: {},
        corpRegFile: {}
      },
      corpInfoPass: false,
      userInfo: {},
      rcsSvc: {
        a2p: 'a2p',
        chat: 'chat',
        both: 'a2p,chat',
        blank: ''
      },
      checked: {
        a2p: true,
        chat: false
      },
      reqUserId: '',
      visibleRelayPopup: false,
      relayAgRegister: false,
      relayAgModify: false,
      disable: false,
      disableChabot: true,
      election: true,
      isModalViewed: false
    }
  },
  computed: {
    isStatusOk() {
      return this.formData.aprvRet === 'OK'
    },
    isStatusWating() {
      return this.formData.aprvRet === 'WAITING'
    },
    isStatusRejected() {
      return this.formData.aprvRet === 'REJECTED'
    },
    isStatusInspected() {
      return this.formData.aprvRet === 'INSPECTED'
    },
    isViewMode() {
      // return (
      //   this.formData.aprvRet === 'WATING' ||
      //   this.formData.aprvRet === 'INSPECTED'
      // ) // 대기 || 검수완료
      return false
    }
  },
  watch: {
    corpData() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.formData = this.corpData

      if (this.formData.rcsSvc === this.rcsSvc.a2p) {
        this.disable = true
        this.disableChabot = false
      }

      if (this.formData.rcsCorpYn !== 'N') {
        this.relayAgRegister = true
        this.relayAgModify = false
      } else if (this.formData.rcsCorpYn === 'N') {
        this.relayAgRegister = false
        this.relayAgModify = true
      }

      if (this.formData.rcsSvc === this.rcsSvc.a2p) {
        this.checked.a2p = true
        this.checked.chat = false
      } else if (this.formData.rcsSvc === this.rcsSvc.chat) {
        this.checked.a2p = false
        this.checked.chat = true
      } else if (this.formData.rcsSvc === this.rcsSvc.both) {
        this.checked.a2p = true
        this.checked.chat = true
      }
    },
    applyJoin(element) {
      // 약관 정보
      let tosItemList = [{ 'tosItemCd': 'A1', 'seq': '1', 'agreYn': 'Y' }, { 'tosItemCd': 'S1', 'seq': '3', 'agreYn': 'Y' }]

      // 기업정보
      let corpDataVar = { 'seasonSeq': element.seq, 'agencyId': this.corpData.corpId, 'corpRegiNum': this.regNum, 'name': element.name + ' ' + this.corpData.name, 'bizCond': this.corpData.bizCond, 'bizCate': this.corpData.bizCate, 'addrRegnNo': this.corpData.addrRegnNo, 'addrMngNo': this.corpData.addrMngNo, 'addrDtl': this.corpData.addrDtl, 'recvUrl': '', 'rcsSvc': 'a2p', 'rcsCorpYn': null, 'webHookUrl': null, 'relayAgInfo': [], 'webSendYn': 'N', 'apiIfYn': 'N', 'houseDevYn': 'N', 'smallSendContractYn': 'N', 'shortTermContractYn': 'N', 'electionRcsContractYn': 'N', 'smsLmsMmsYn': 'N', 'textTplYn': 'N', 'imageTplYn': 'N', 'chatbotYn': 'N', 'autoReplyYn': 'N', 'isFirst': true, 'corpSaveYn': 'N', 'corpAdmYn': 'Y' }

      // 담당자 정보
      this.regUserId = String('9' + Math.round(Math.random() * (10000000 - 99999999) + 999999999))

      let userData = { 'userId': this.regUserId, 'userPwd': 'dummyPass123', 'userPwdConfirm': 'dummyPass123', 'userNm': this.corpData.userNm, 'mblNum': this.corpData.mblNum, 'corpTelNum': this.corpData.corpTelNum, 'corpTelExt': this.corpData.corpTelExt, 'email': this.corpData.email }

      let data = {}
      Object.assign(data, corpDataVar)
      Object.assign(data, userData)
      data['tosItemList'] = tosItemList

      let formData = new FormData()
      // if (!jglib.isEmpty(corpData.corpRegFile.name)) {
      //   formData.append('certiFile', corpData.corpRegFile)
      // }
      formData.append('data', JSON.stringify(data))

      createJoinSeason(formData)
        .then(res => {
          // 사업자등록증 제출했을 경우
          // if (!jglib.isEmpty(corpData.corpRegFile.name)) {
          //   this.viewType = 'WATING'
          // // 사업자등록증 제출하지 않았을 경우
          // } else {
          //   // 최초 사업자일 경우
          //   if (corpData.corpData.isFirst) {
          //     this.viewType = 'SAVED'
          //   // 최초 사업자 아닐 경우(이미 등록된 사업자일 경우)
          //   } else {
          //     this.viewType = 'OK'
          //   }
          // }
          // this.stepActiveIndex++
          // alert('createJoinSeason', res)
          // console.log('createJoinSeason', res)
          // console.log('createJoinSeason', res)
          // alert(res.result + ' 시즌 계정이 생성되었습니다.')
          // location.reload()
          this.regUserId = res.result
          this.seasonName = element.name
          this.isModalViewed = true
        })
        .catch(e => {
          this.$alertMsg(e.desc)
        })
    },
    newIdApproval(element) {
      console.log('corpData', this.corpData)
      // 9999925476 // 9999923065
      this.regNum = this.createBusino()

      let parmas = {
        corpRegiNum: this.regNum,
        userType: 'CORP'
      }

      if (this.regNum !== '') {
        retrieveCorpRegiNum(parmas)
          .then(res => {
            console.log(res)
            this.newIdApproval()
          })
          .catch(res => {
            if (res.code === '64445') {
              // 최초 등록
              // console.log('TODO: 선거 계정 생성')
              // alert(this.regNum)
              this.applyJoin(element)
              // 전송 방법
            }
          })
      }
      // console.log(this.createBusino())
    },
    closeMsg () {
      this.isModalViewed = false
      this.$router.push('/pwFind')
    },
    check_busino(vencod) {
      if (vencod.length === 0) {
        return false
      }
      let sum = 0
      let getlist = new Array(10)

      // eslint-disable-next-line no-array-constructor
      let chkvalue = new Array('1', '3', '7', '1', '3', '7', '1', '3', '5')
      for (let i = 0; i < 10; i++) {
        getlist[i] = vencod.substring(i, i + 1)
      }
      for (let i = 0; i < 9; i++) { sum += getlist[i] * chkvalue[i] }
      sum = sum + parseInt((getlist[8] * 5) / 10)
      let sidliy = sum % 10
      let sidchk = 0
      // eslint-disable-next-line eqeqeq
      if (sidliy != 0) {
        sidchk = 10 - sidliy
      } else { sidchk = 0 }

      // eslint-disable-next-line eqeqeq
      if (sidchk != getlist[9]) { return false }
      return true
    },
    createBusino() {
      let sum = 0
      let retbool = true
      let getlist = new Array(10)
      // eslint-disable-next-line no-array-constructor
      let chkvalue = new Array('1', '3', '7', '1', '3', '7', '1', '3', '5')
      let retBusino
      while (retbool) {
        retBusino = String('99999' + Math.round(Math.random() * (10000 - 99999) + 99999))
        for (let i = 0; i < 10; i++) {
          getlist[i] = retBusino.substring(i, i + 1)
        }
        for (let i = 0; i < 9; i++) {
          sum += getlist[i] * chkvalue[i]
        }
        sum = sum + parseInt((getlist[8] * 5) / 10)
        let sidliy = sum % 10
        let sidchk = 0
        if (sidliy !== 0) { sidchk = 10 - sidliy } else { sidchk = 0 }
        // eslint-disable-next-line eqeqeq
        if (sidchk != getlist[9]) {
          retbool = true
        } else {
          if (this.check_busino(retBusino)) {
            retbool = false
          } else {
            retbool = true
          }
        }
      }
      return retBusino
    },
    updateCorpData() {
      if (!this.validateCorpData()) {
        return false
      }

      if (this.checked.a2p === true && this.checked.chat === false) {
        // 제공 서비스 a2p일 경우 중계사 선택 NULL 설정
        this.formData.rcsCorpYn = null
      }

      if (this.formData.rcsCorpYn === 'Y') {
        // 중계사의 경우 대행 중계사 초기화
        this.formData.relayAgInfo = []
      } else {
        // 중계사 아님의 경우 WebHookURL 공란으로 설정
        this.formData.webHookUrl = null
      }

      this.$confirmMsg('변경하신 정보로 저장하시겠습니까?')
        .then(() => {
          let params = {
            agencyId: this.formData.corpId,
            recvUrl: this.formData.recvUrl,
            sendHost: this.formData.sendHost,
            rcsSvc: this.formData.rcsSvc,
            rcsCorpYn: this.formData.rcsCorpYn,
            webHookUrl: this.formData.webHookUrl,
            relayAgInfo: this.formData.relayAgInfo
          }
          updateAgencyInfo(this.formData.corpId, params)
            .then(res => {
              this.$alertMsg('저장 되었습니다.')
                .then(() => {
                  this.$emit('refresh')
                })
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        })
        .catch(() => {})
    },
    validateCorpData() {
      if (!jglib.isEmpty(this.formData.recvUrl) && !jglib.isUrl(this.formData.recvUrl)) {
        // this.$alertMsg('수신서버 URL을 입력하세요.').then(() => {
        //   this.$refs.recvUrl.focus()
        // })
        this.$alertMsg('올바른 URL 형식이 아닙니다.').then(() => {
          this.$refs.recvUrl.focus()
        })
        return false
      }
      if (jglib.isEmpty(this.formData.webHookUrl) && this.formData.rcsCorpYn === 'Y' && this.checked.chat === true) {
        this.$alertMsg('양방향 중계 URL 정보를 입력해 주세요.').then(res => {
          this.$refs.webHookUrl.focus()
        })
        return false
      }
      if (!jglib.isUrl(this.formData.webHookUrl) && this.formData.rcsCorpYn === 'Y' && this.checked.chat === true) {
        this.$alertMsg('올바른 URL 형식이 아닙니다.').then(res => {
          this.$refs.webHookUrl.focus()
        })
        return false
      }
      if (jglib.isEmpty(this.formData.rcsSvc)) {
        this.$alertMsg('제공서비스를 선택 해 주세요.')
        return
      }
      if (this.formData.relayAgInfo.length < 1 && this.formData.rcsCorpYn === 'N' && this.checked.chat === true) {
        this.$alertMsg('중계사를 선택해 주세요.')
        return false
      }
      if (jglib.isEmpty(this.formData.rcsCorpYn) && this.checked.chat === true) {
        this.$alertMsg('중계사 여부를 선택해 주세요.').then(res => {
          this.$refs.rcsCorpYn.focus()
        })
        return false
      }
      // if (
      //   jglib.isEmpty(this.formData.sendHost) ||
      //   !jglib.isIpAddress(this.formData.sendHost)
      // ) {
      //   this.$alertMsg('API Client IP를 입력하세요.').then(() => {
      //     this.$refs.sendHost.focus()
      //   })
      //   return false
      // }
      return true
    },
    // 입력된 날짜의 날짜 형식 변환 (YYYY년 MM월 DD일)
    convertYmdStr(date) {
      if (!date) return ''
      date = date.replace(/[^0-9.]/g, '').trim()
      return date.substring(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, `$1년 $2월 $3일`)
    },
    getCertiFile() {
      let params = {
        fileId: this.formData.certiFileId,
        fileNo: this.formData.certiFileNo
      }
      downloadFileByFileId(params)
        .then(res => {})
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    getRcsCertiFile() {
      let params = {
        fileId: this.formData.rcsCertiFileId,
        fileNo: this.formData.rcsCertiFileNo
      }
      downloadFileByFileId(params)
        .then(res => {})
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    goMyInfo() {
      this.$confirmMsg('비지니스 정보 변경을 취소하시겠습니까?<br/>수정 전 정보로 복구됩니다.')
        .then(() => {
          // this.$router.push('/myinfo')
          this.$emit('refresh')
        })
        .catch(() => {})
    },
    goMyInfoViewMode() {
      this.$confirmMsg('개인정보 관리로 이동하시겠습니까?<br/>수정 정보는 반영되지 않습니다.')
        .then(() => {
          this.$router.push('/utility/my-info')
        })
        .catch(() => {})
    },
    openRelayPopup() {
      this.visibleRelayPopup = true
    },
    getRelayAgInfo(selectRelay) {
      this.formData.relayAgInfo = selectRelay
    },
    changeService() {
      if (this.checked.a2p === true && this.checked.chat === false) {
        this.formData.rcsSvc = this.rcsSvc.a2p
        this.formData.webHookUrl = null
      } else if (this.checked.a2p === false && this.checked.chat === true) {
        this.formData.rcsSvc = this.rcsSvc.chat
      } else if (this.checked.a2p === true && this.checked.chat === true) {
        this.formData.rcsSvc = this.rcsSvc.both
      } else {
        this.formData.rcsSvc = this.rcsSvc.blank
      }
    },
    changeRelay() {
      if (this.formData.rcsCorpYn === 'Y') {
        this.disable = true
        // 중계사의 경우 대행 중계사 초기화
        this.formData.relayAgInfo = []
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
      } else if (this.formData.rcsCorpYn === 'N') {
        this.disable = true
        // 중계사 아님의 경우 WebHookURL 공란으로 설정
        this.formData.webHookUrl = null
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
