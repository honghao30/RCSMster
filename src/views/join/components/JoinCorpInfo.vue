<template>
  <div>
    <PageTitleH3 :titleh3="isCorp ? '비즈니스 정보 입력' : '대행사 정보 입력'" noticeinfo="필수 입력값" />
    <form>
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label required">사업자등록번호</span></th>
              <td>
                <div class="form-item__content" v-if="!view.isCertiAll">
                  <div class="form-item-row">
                      <div class="input-item">
                        <span class="input">
                          <input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." ref="corpRegiNum" v-model="formData.corpRegiNum" maxlength="10"
                            @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keyup.enter="certCorpRegiNum" @focusout="corpRegiNumValidation">
                        </span>
                        <ButtonCmp type="btn-default-line" @click="certCorpRegiNum">사업자등록번호 인증</ButtonCmp>
                      </div>
                    </div>
                    <p class="guide-text">※ 사업자등록번호 인증 후 회원가입을 진행 할 수 있습니다.</p>
                    <p class="guide-text error" v-if="error.corpRegiNum">{{ error.corpRegiNum }}</p>
                  </div>
                  <div class="form-item__content" v-else>
                      <div class="form-item-row">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" :value="formData.corpRegiNum" disabled></span>
                          </div>
                      </div>
                      <p class="guide-text black">※ 사업자등록번호 인증이 완료되었습니다.</p>
                  </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <span class="form-item__label" :class="isCorp ? '' : 'required'">사업자등록증</span>
              </th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input">
                        <input type="text" class="input" ref="corpRegFile" :value="uploadedCorpRegFileName" :disabled="!view.isCertiAll" placeholder="사업자등록증을 등록해주세요.">
                      </span>
                      <input type="file" id="fileUp" class="input" :disabled="!view.isCertiAll" @change="handleChangeRegFile">
                      <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.corpRegFile">{{ error.corpRegFile }}</p>
                  <p class="guide-text black">&middot; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  <p class="guide-text"> ※ 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요. </p>
                  <p class="guide-text"> ※ 비영리법인/국가기관인 경우 고유번호증을 등록해주세요. </p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">법인명(단체명)</span></th>
              <td>
                <div v-if="!view.isCertiAll || view.isFirst" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input">
                        <input type="text" class="input" :disabled="!view.isCertiAll" placeholder="사업자등록증에 등록된 법인명(단체명)을 입력해주세요."
                          ref="name" v-model.trim="formData.name" maxlength="40" @change="convertMultiWhitespace($event, 'name')" @focusout="nameValidation">
                      </span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.name">{{ error.name }}</p>
                </div>
                <div v-else class="form-item__content">{{ corpData.name }}</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">업태</span></th>
              <td>
                <div v-if="!view.isCertiAll || view.isFirst" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input">
                        <input type="text" class="input" :disabled="!view.isCertiAll" placeholder="사업자등록증에 등록된 첫번째 업태명을 입력해주세요."
                        ref="bizCond" v-model.trim="formData.bizCond" maxlength="21" @change="convertMultiWhitespace($event, 'bizCond')" @focusout="bizCondValidation">
                      </span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.bizCond">{{ error.bizCond }}</p>
                  <p class="guide-text">※ 비영리법인/국가기관인 경우 ‘기업/단체’로 입력해주세요.</p>
                </div>
                <div v-else class="form-item__content">{{ corpData.bizCond }}</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">종목</span></th>
              <td>
                <div v-if="!view.isCertiAll || view.isFirst" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input">
                        <input type="text" class="input" :disabled="!view.isCertiAll" placeholder="사업자등록증에 등록된 첫번째 종목명을 입력해주세요."
                          ref="bizCate" v-model.trim="formData.bizCate" maxlength="21" @keydown="convertMultiWhitespace($event, 'bizCate')" @focusout="bizCateValidation">
                      </span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.bizCate">{{ error.bizCate }}</p>
                  <p class="guide-text">※ 비영리법인/국가기관인 경우 ‘비영리, 공공/행정, 정치/사회, 복지, 종교, 모임, 기관/단체일반’ 중에서 해당하는 항목을 입력해주세요.</p>
                </div>
                <div v-else class="form-item__content">{{ corpData.bizCate }}</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">기업주소</span></th>
              <td>
                <div v-if="!view.isCertiAll || view.isFirst" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item post">
                      <span class="input">
                        <input type="text" class="input" :disabled="!view.isCertiAll" :readonly="true" v-model="formData.addrRegnNo" @focusout="addrValidation">
                      </span>
                      <ButtonCmp type="btn-default-line" :disabled="!view.isCertiAll" @click="openAddressPopup">우편번호</ButtonCmp>
                    </div>
                    <!-- <p class="guide-text error">ⓘ 도로명 또는 건물명(아파트)을 입력해주세요.</p> -->
                  </div>
                  <div class="form-item-row">
                    <div class="input-item address">
                      <span class="input">
                        <input type="text" class="input" :disabled="!view.isCertiAll" :readonly="true" v-model="formData.addrMngNo" @focusout="addrValidation">
                      </span>
                      <span class="input">
                        <input type="text" class="input" :disabled="!view.isCertiAll" :readonly="true" v-model="formData.addrDtl" @focusout="addrValidation">
                      </span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.addr">{{ error.addr }}</p>
                </div>
                <div v-else class="form-item__content">{{ corpData.addrMngNo }} {{ corpData.addrDtl }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <PageTitleH3 titleh3="서비스정보 입력" noticeinfo="필수 입력값" v-if="!isCorp && view.isCertiAll" />
    <form v-if="!isCorp && view.isCertiAll">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">수신서버 URL</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input">
                        <input type="text" class="input" placeholder="" ref="recvUrl" v-model.trim="formData.recvUrl" @focusout="recvUrlValidation">
                      </span>
                    </div>
                  </div>
                </div>
                <p class="guide-text error" v-if="error.recvUrl">{{ error.recvUrl }}</p>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">API Client IP</span></th>
              <td>
                <AllowIp ref="allowipR" />
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">제공 서비스</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item service  w--half">
                      <div class="checkbox">
                        <input type="checkbox" id="A2P" v-model="checked.a2p" ref="a2p" name="Checkbox" @change="changeService" />
                        <label for="A2P"><span class="checkbox__text">RCS A2P</span></label>
                      </div>
                      <div class="checkbox">
                        <input type="checkbox" id="chatbot" v-model="checked.chat" ref="chat" name="Checkbox" @change="changeService" />
                        <label for="chatbot"><span class="checkbox__text">RCS 챗봇(양방향)</span></label>
                      </div>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.rcsSvc">{{ error.rcsSvc }}</p>
                </div>
              </td>
            </tr>
            <tr v-if="this.checked.chat === true">
              <th scope="row"><span class="form-item__label required">중계사</span></th>
              <td>
                <div class="form-item__content agency">
                  <div class="form-item-row">
                    <div class="input-item w--half">
                      <div class="radiobox">
                        <input type="radio" name="agency" id="agencyY" v-model="formData.rcsCorpYn" value='Y' ref="rcsCorpYn" @change="changeRelay" />
                        <label for="agencyY"><span class="checkbox__text">중계사임</span></label>
                      </div>
                      <div class="radiobox">
                        <input type="radio" name="agency" id="agencyN" v-model="formData.rcsCorpYn" value='N' @change="changeRelay" />
                        <label for="agencyN"><span class="checkbox__text">중계사 아님</span></label>
                      </div>
                    </div>
                    <div class="input-item w--half" v-if="formData.rcsCorpYn === 'Y'">
                      <label for="url" class="item-label">대화방 수신 URL</label>
                      <span class="input">
                        <input type="text" id="url" ref="webHookUrl" v-model.trim="formData.webHookUrl" @focusout="rcsCorpYnValidation" />
                      </span>
                    </div>
                    <div class="input-item w--half" v-if="formData.rcsCorpYn === 'N'">
                      <span class="item-label">중계사 선택</span>
                      <ButtonCmp type="btn-default-line" @click="openRelayPopup">중계사 선택</ButtonCmp>
                      <span class="result-text" v-if="formData.relayAgInfo.length > 0">선택 중계사 <em class="point">{{formData.relayAgInfo.length}}</em>개</span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.rcsCorpYn">{{ error.rcsCorpYn }}</p>
                  <p class="guide-text" v-if="formData.rcsCorpYn === 'Y'">※ 중계사 지정 안내<br>중계사로 지정된 브랜드의 모든 메시지 및 자동응답메시지의 트래픽이 모두 중계사에게 부과됩니다.<br>대행사가 중계사로 지정되는 경우 해당 대행사가 메시지 청약 및 과금을 대행한다는 것에 대한 동의 절차를 진행해야 합니다.</p>
                  <p class="guide-text" v-else-if="formData.rcsCorpYn === 'N'">※ 중계사 선택 안내<br>반드시 청약이 완료된 중계사를 선택해야 하며 메시지를 수신하기 위한 webhook.url 정보를 해당 중계사의 시스템에 등록해야 합니다. </p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">특수부가통신<br>사업자등록증</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input">
                      <input type="text" class="input" ref="rcsCertiFile" :value="uploadedRcsCertiFile" placeholder="특수부가통신 사업자등록증을 등록해주세요.">
                    </span>
                    <input type="file" id="fileUp2" class="input" @change="handleChangeRcsCertiFile">
                    <label for="fileUp2" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.rcsCertiFile">{{ error.rcsCertiFile }}</p>
                  <p class="guide-text black">&middot; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  <p class="guide-text"> ※ 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요. </p>
                  <p class="guide-text"> ※ 비영리법인/국가기관인 경우 고유번호증을 등록해주세요. </p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">대행사 서비스 범위</span></th>
              <td>
                <div class="form-item__content service-range">
                  <div class="form-item-row">
                    <span class="form-item-row__title">제공서비스</span>
                    <ul class="service-list">
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service1" ref="webSendYn" v-model="formData.webSendYn" true-value="Y" false-value="N" />
                          <label for="service1"><span class="checkbox__text">웹 발송 가능</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service2" ref="apiIfYn" v-model="formData.apiIfYn" true-value="Y" false-value="N" />
                          <label for="service2"><span class="checkbox__text">API 연동 가능</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service3" ref="HouseDevYn" v-model="formData.houseDevYn" true-value="Y" false-value="N" />
                          <label for="service3"><span class="checkbox__text">인하우스 개발 가능</span></label>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div class="form-item-row">
                    <span class="form-item-row__title">계약가능 서비스</span>
                    <ul class="service-list">
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service4" ref="smallSendContractYn" v-model="formData.smallSendContractYn" true-value="Y" false-value="N" />
                          <label for="service4"><span class="checkbox__text">소량발송 계약 가능</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service5" ref="shortTermContractYn" v-model="formData.shortTermContractYn" true-value="Y" false-value="N" />
                          <label for="service5"><span class="checkbox__text">단기 계약 가능</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service6" ref="electionRcsContractYn" v-model="formData.electionRcsContractYn" true-value="Y" false-value="N" />
                          <label for="service6"><span class="checkbox__text">선거용 RVS 메시지 계약 가능</span></label>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div class="form-item-row align--top">
                    <span class="form-item-row__title">제공 상품(템플릿)</span>
                    <ul class="service-list">
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service7" ref="smsLmsMmsYn" v-model="formData.smsLmsMmsYn" true-value="Y" false-value="N" />
                          <label for="service7"><span class="checkbox__text">RCS SMS/LMS/MMS</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service8" ref="textTplYn" v-model="formData.textTplYn" true-value="Y" false-value="N" />
                          <label for="service8"><span class="checkbox__text">텍스트 템플릿</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service9" ref="imageTplYn" v-model="formData.imageTplYn" true-value="Y" false-value="N" />
                          <label for="service9"><span class="checkbox__text">이미지 템플릿 계약 가능</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service10" ref="chatbotYn" v-model="formData.chatbotYn" true-value="Y" false-value="N" />
                          <label for="service10"><span class="checkbox__text">챗봇</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service11" ref="autoReplyYn" v-model="formData.autoReplyYn" true-value="Y" false-value="N" />
                          <label for="service11"><span class="checkbox__text">자동응답</span></label>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p class="guide-text">※ 대행사에서 제공가능한 서비스 범위를 선택하시면 기업에게 대행사를 추천해드립니다.</p>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">대행사 로고</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input">
                      <input type="text" class="input" :value="uploadedAgencyImgFile">
                    </span>
                    <input type="file" id="fileUp3" class="input" @change="handleChangeAgencyImgFile">
                    <label for="fileUp3" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&middot; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  <p class="guide-text">※ 파트너사 리스트에 노출되는 대행사 로고를 업로드해주세요.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>

    <!-- 모달 창 -->
    <ModalView v-if="visibleAddressPopup || visibleRelayPopup || corpDuplicationConfirm">
      <ZipCode v-if="visibleAddressPopup" @closeModal="closeAddressPopup" />
      <relay-popup
        v-if="visibleRelayPopup"
        :relayAgInfo.sync="formData.relayAgInfo"
        :visible.sync="visibleRelayPopup"
        :relayAgRegister.sync="relayAgRegister"
        :agencyCorpRegNum.sync="corpData.corpRegiNum"
        @getData="getRelayAgInfo" />
      <ConfirmMsg v-if="corpDuplicationConfirm">
        <div slot="msg">
          <div class="msg">
            동일한 사업자등록번호로<br /> 회원가입을 진행하고 있습니다. <br /><br />
            최초의 회원가입 완료 후<br /> 추가 회원가입이 가능합니다.
          </div>
          <div class="msg2">
            {{ corpDuplicationConfirmUserNm | maskingName }} {{ corpDuplicationConfirmEmail }}
          </div>
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp type="btn-blue-line" @click="closeCorpDuplicationConfirm">닫기</ButtonCmp>
          <ButtonCmp type="btn-blue" @click="goOnlineInquire">온라인 문의</ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //모달 창 -->
  </div>
</template>

<script>
import RelayPopup from '@/components/relay'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import ZipCode from '@/views/join/components/ZipCodeCustom.vue'
import AllowIp from '@/views/join/components/AllowIp.vue'
import { retrieveCorpRegiNum } from '@/api/common/code'

export default {
  components: {
    RelayPopup,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    ConfirmMsg,
    ZipCode,
    AllowIp
  },
  props: {
    userType: {
      type: String,
      default() {
        return 'CORP'
      }
    }
  },
  data() {
    return {
      formData: {
        corpRegiNum: '',
        name: '',
        bizCond: '',
        bizCate: '',
        addrRegnNo: '',
        addrMngNo: '',
        addrDtl: '',
        recvUrl: '',
        rcsSvc: 'a2p',
        rcsCorpYn: '',
        webHookUrl: '',
        relayAgInfo: [],
        webSendYn: 'N',
        apiIfYn: 'N',
        houseDevYn: 'N',
        smallSendContractYn: 'N',
        shortTermContractYn: 'N',
        electionRcsContractYn: 'N',
        smsLmsMmsYn: 'N',
        textTplYn: 'N',
        imageTplYn: 'N',
        chatbotYn: 'N',
        autoReplyYn: 'N'
      },
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
      error: {
        corpRegiNum: '',
        corpRegFile: '',
        name: '',
        bizCond: '',
        bizCate: '',
        addr: '',
        rcsSvc: '',
        recvUrl: '',
        rcsCorpYn: '',
        rcsCertiFile: ''
      },
      view: {
        isCertiAll: false,
        isFirst: true
      },
      corpData: {
        corpRegiNum: '',
        corpId: null
      },
      corpRegFile: {},
      rcsCertiFile: {},
      agencyImgFile: {},
      visibleAddressPopup: false,
      visibleRelayPopup: false,
      relayAgRegister: false,
      corpDuplicationConfirm: false,
      corpDuplicationConfirmUserNm: '',
      corpDuplicationConfirmEmail: '',
      ZipCode: false
    }
  },
  watch: {},
  filters: {
    maskingName(value) {
      if (value.length === 0) {
        return ''
      }

      let ret = value.substr(0, 1)
      if (value.length < 3) {
        ret += '*'
      } else {
        for (let i = 1; i < value.length - 1; i++) {
          ret += '*'
        }
        ret += value.substr(value.length - 1, 1)
      }

      return ret
    },
    maskingMbl(value) {
      if (value.length === 0) {
        return ''
      }

      let phone = jglib.mobileNumConverter(value).split('-')
      let phone1 = ''
      for (let i = 0; i < phone[1].length; i++) {
        phone1 += '*'
      }
      phone[1] = phone1
      phone = phone.join('-')
      return phone
    }
  },
  computed: {
    isCorp() {
      return this.userType === 'CORP'
    },
    uploadedCorpRegFileName() {
      return jglib.isEmpty(this.corpRegFile.name) ? '' : this.corpRegFile.name
    },
    uploadedRcsCertiFile() {
      return jglib.isEmpty(this.rcsCertiFile.name) ? '' : this.rcsCertiFile.name
    },
    uploadedAgencyImgFile() {
      return jglib.isEmpty(this.agencyImgFile.name) ? '' : this.agencyImgFile.name
    }
  },
  methods: {
    certCorpRegiNum() {
      let corpRegiNumPass = this.corpRegiNumValidation()

      if (corpRegiNumPass) {
        let params = {
          corpRegiNum: this.formData.corpRegiNum,
          userType: this.userType
        }

        retrieveCorpRegiNum(params)
          .then(res => {
            if (this.isCorp) {
              // 등록된 사업자
              if (res.result && res.result.inspection === 'Y') {
                this.corpDuplicationConfirm = true
                this.corpDuplicationConfirmUserNm = res.result.userNm
                this.corpDuplicationConfirmEmail = res.result.email
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
                this.formData = this.corpData
                this.view.isCertiAll = true
              }
            } else {
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
            }
          })
          .catch(res => {
            if (res.code === '64445') {
              // 최초 등록
              this.view.isFirst = true
              this.corpData['corpRegiNum'] = this.formData.corpRegiNum
              this.view.isCertiAll = true
            } else {
              // 알 수없는 오류
              console.error('[retrieveCorpRegiNum] Unkwon Error', res.desc)
              this.error.corpRegiNum = res.desc
            }
          })
          .finally(() => {
            this.corpInfoValidation()
          })
      }
    },
    corpRegiNumValidation() {
      let result = true
      this.error.corpRegiNum = ''

      if (jglib.isEmpty(this.formData.corpRegiNum)) {
        this.error.corpRegiNum = '사업자등록번호를 입력해주세요.'
        result = false
      } else if (this.formData.corpRegiNum.length !== 10) {
        this.error.corpRegiNum = '사업자등록번호가 맞지 않습니다. 올바른 사업자등록번호를 입력해주세요.'
        result = false
      } else if (!jglib.checkBizRegNum(this.formData.corpRegiNum)) {
        this.error.corpRegiNum = '사업자등록번호가 맞지 않습니다. 올바른 사업자등록번호를 입력해주세요.'
        result = false
      }

      this.corpInfoValidation()
      return result
    },
    nameValidation() {
      let result = true
      this.error.name = ''

      if (this.view.isFirst && jglib.isEmpty(this.formData.name)) {
        this.error.name = '법인명(단체명)을 입력해주세요.'
        result = false
      }

      this.corpInfoValidation()
      return result
    },
    bizCondValidation() {
      let result = true
      this.error.bizCond = ''

      if (this.view.isFirst && jglib.isEmpty(this.formData.bizCond)) {
        this.error.bizCond = '업태명을 입력해주세요.'
        result = false
      }

      this.corpInfoValidation()
      return result
    },
    bizCateValidation() {
      let result = true
      this.error.bizCate = ''

      if (this.view.isFirst && jglib.isEmpty(this.formData.bizCate)) {
        this.error.bizCate = '종목을 입력해주세요.'
        result = false
      }

      this.corpInfoValidation()
      return result
    },
    addrValidation() {
      let result = true
      this.error.addr = ''

      if (this.view.isFirst && (jglib.isEmpty(this.formData.addrRegnNo) || jglib.isEmpty(this.formData.addrMngNo) || jglib.isEmpty(this.formData.addrDtl))) {
        this.error.addr = '기업주소를 입력해주세요.'
        result = false
      }

      this.corpInfoValidation()
      return result
    },
    recvUrlValidation() {
      let result = true
      this.error.recvUrl = ''

      if (!this.isCorp && !jglib.isEmpty(this.formData.recvUrl) && !jglib.isUrl(this.formData.recvUrl)) {
        this.error.recvUrl = '올바른 URL 형식이 아닙니다.'
        result = false
      }

      this.corpInfoValidation()
      return result
    },
    rcsSvcValidation() {
      let result = true
      this.error.rcsSvc = ''

      if (jglib.isEmpty(this.formData.rcsSvc)) {
        this.error.rcsSvc = '제공 서비스를 선택해주세요.'
        result = false
      }

      this.corpInfoValidation()
      return result
    },
    rcsCorpYnValidation() {
      let result = true
      this.error.rcsCorpYn = ''

      if (jglib.isEmpty(this.formData.webHookUrl) && this.formData.rcsCorpYn === 'Y' && this.checked.chat === true) {
        this.error.rcsCorpYn = '양방향 중계 URL 정보를 입력해주세요.'
        result = false
      } else if (!jglib.isUrl(this.formData.webHookUrl) && this.formData.rcsCorpYn === 'Y' && this.checked.chat === true) {
        this.error.rcsCorpYn = '올바른 URL 형식이 아닙니다.'
        result = false
      } else if (this.formData.relayAgInfo.length < 1 && this.formData.rcsCorpYn === 'N' && this.checked.chat === true) {
        this.error.rcsCorpYn = '중계사를 선택해주세요.'
        result = false
      } else if (jglib.isEmpty(this.formData.rcsCorpYn) && this.checked.chat === true) {
        this.error.rcsCorpYn = '중계사를 선택해주세요.'
        result = false
      }

      this.corpInfoValidation()
      return result
    },
    corpRegFileValidation() {
      let result = true
      this.error.corpRegFile = ''

      if (!this.isCorp && jglib.isEmpty(this.corpRegFile.name)) {
        this.error.corpRegFile = '사업자등록증을 등록해주세요.'
        result = false
      }

      this.corpInfoValidation()
      return result
    },
    rcsCertiFileValidation() {
      let result = true
      this.error.rcsCertiFile = ''

      if (!this.isCorp && jglib.isEmpty(this.rcsCertiFile.name)) {
        this.error.rcsCertiFile = '특수부가통신 사업자등록증을 등록해주세요.'
        result = false
      }

      this.corpInfoValidation()
      return result
    },
    handleChangeRegFile(e) {
      let file = e.target.files[0]
      let checkResult = jglib.checkFileData(file, ['JPG', 'PNG', 'PDF', 'TIFF'], 5)

      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
      } else {
        this.corpRegFile = file
      }

      this.corpRegFileValidation()
    },
    handleChangeRcsCertiFile(e) {
      let file = e.target.files[0]
      let checkResult = jglib.checkFileData(file, ['JPG', 'PNG', 'PDF', 'TIFF'], 5)

      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
      } else {
        this.rcsCertiFile = file
      }

      this.rcsCertiFileValidation()
    },
    handleChangeAgencyImgFile(e) {
      let file = e.target.files[0]
      let checkResult = jglib.checkFileData(file, ['JPG', 'PNG', 'PDF', 'TIFF'], 5)

      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
      } else {
        this.agencyImgFile = file
      }
    },
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    closeCorpDuplicationConfirm() {
      this.corpDuplicationConfirm = false
    },
    goOnlineInquire() {
      this.$router.push('/onlineInquire')
    },
    goLogin() {
      this.$router.push('/login')
    },
    goJoinRetriveapply() {
      this.$router.push('/join/retriveapply')
    },
    openAddressPopup() {
      this.visibleAddressPopup = true
    },
    closeAddressPopup(data) {
      if (!jglib.isEmpty(data)) {
        this.formData.addrRegnNo = data.zipNo
        this.formData.addrMngNo = data.roadFullAddr
        this.formData.addrDtl = data.detail
      }
      this.visibleAddressPopup = false
      this.addrValidation()
    },
    convertMultiWhitespace(e, target) {
      this.$data.formData[target] = e.target.value.replace(/ +/g, ' ').trim()
    },
    changeService() {
      if (this.checked.a2p === true && this.checked.chat === false) {
        this.formData.rcsSvc = this.rcsSvc.a2p
        this.formData.relayAgInfo = []
        this.formData.webHookUrl = null
      } else if (this.checked.a2p === false && this.checked.chat === true) {
        this.formData.rcsSvc = this.rcsSvc.chat
      } else if (this.checked.a2p === true && this.checked.chat === true) {
        this.formData.rcsSvc = this.rcsSvc.both
      } else {
        this.formData.rcsSvc = this.rcsSvc.blank
      }

      this.rcsSvcValidation()
      this.rcsCorpYnValidation()
    },
    changeRelay() {
      if (this.formData.rcsCorpYn === 'Y') {
        // 중계사의 경우 대행 중계사 초기화
        this.formData.relayAgInfo = []
      } else if (this.formData.rcsCorpYn === 'N') {
        // 중계사 아님의 경우 WebHookURL 공란으로 설정
        this.formData.webHookUrl = null
      }
      this.$confirmMsg(`중계사 시스템에 메시지에 대한 청약 및 대행사 webhook url 정보를 등록하셨나요?`, '', '예', '아니요')
      this.rcsCorpYnValidation()
    },
    openRelayPopup() {
      this.visibleRelayPopup = true
      this.relayAgRegister = true
    },
    getRelayAgInfo(selectRelay) {
      this.formData.relayAgInfo = selectRelay
      this.rcsCorpYnValidation()
    },
    corpInfoValidation() {
      if (this.isCorp) {
        if (!this.view.isCertiAll) {
          this.$emit('changeCorpInfo', false)
          return
        }

        // 이미 등록된 기업일 경우 유효성 검사 패스
        if (!this.view.isFirst) {
          this.$emit('changeCorpInfo', true)
          return
        }

        if (jglib.isEmpty(this.formData.name) || jglib.isEmpty(this.formData.bizCond) || jglib.isEmpty(this.formData.bizCate) ||
        jglib.isEmpty(this.formData.addrRegnNo) || jglib.isEmpty(this.formData.addrMngNo) || jglib.isEmpty(this.formData.addrDtl)) {
          this.$emit('changeCorpInfo', false)
          return
        }

        if (this.error.corpRegiNum || this.error.name || this.error.bizCond || this.error.bizCate || this.error.addr) {
          this.$emit('changeCorpInfo', false)
          return
        }

        this.$emit('changeCorpInfo', true)
      } else {
        if (!this.view.isCertiAll) {
          this.$emit('changeCorpInfo', false)
          return
        }

        if (jglib.isEmpty(this.formData.name) || jglib.isEmpty(this.formData.bizCond) || jglib.isEmpty(this.formData.bizCate) ||
        jglib.isEmpty(this.formData.addrRegnNo) || jglib.isEmpty(this.formData.addrMngNo) || jglib.isEmpty(this.formData.addrDtl)) {
          this.$emit('changeCorpInfo', false)
          return
        }

        if (this.error.corpRegiNum || this.error.name || this.error.bizCond || this.error.bizCate || this.error.addr ||
        this.error.rcsSvc || this.error.recvUrl || this.error.rcsCorpYn || this.error.corpRegFile || this.error.rcsCertiFile) {
          this.$emit('changeCorpInfo', false)
          return
        }

        this.$emit('changeCorpInfo', true)
      }
    },
    getCorpData() {
      if (!this.corpRegFileValidation()) {
        this.$refs.corpRegFile.focus()
        return
      }

      if (!this.rcsCertiFileValidation()) {
        this.$refs.rcsCertiFile.focus()
        return
      }

      let corpData = _.clone(this.formData)

      if (this.isCorp) {
        // 기업의 경우 formData에서 내용 뺌
        delete corpData['recvUrl']
        delete corpData['sendHost']
      }

      let result = {
        corpData: this.formData,
        corpRegFile: this.corpRegFile
      }
      result.corpData.isFirst = this.view.isFirst

      if (!this.isCorp) {
        // 대행사의 경우 부가사업자등록증 파일 추가
        result['rcsCertiFile'] = this.rcsCertiFile
        // 대행사의 로고 파일 추가
        result['agencyImgFile'] = this.agencyImgFile
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

      if (this.$refs.allowipR) {
        try {
          result.corpData.addAllowIpList = this.$refs.allowipR.getAllowIp()
        } catch (e) {
          this.$alertMsg(e)
          return
        }
      }

      return result
    }
  }
}
</script>
