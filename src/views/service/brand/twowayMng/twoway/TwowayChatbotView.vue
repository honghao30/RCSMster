<template>
  <div class="rcs_emul_form_wrap">
    <div class="rcs_emul_form_cont dv2023_formspace bd_no">
      <!-- group 1 -->
      <div class="dv2023_radiolength">
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            대화방 명
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.subTitle }}</span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            {{ isA2pChatbot ? '발신번호/회신번호' : '회신번호' }}
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ isA2pChatbot ? chatbotData.chatbotId : chatbotData.subNum }}</span>
          </div>
        </div>
        <div class="rcs_item_bundle dv2023_addunderline">
          <strong class="rcs_tit_bundle p-l0">
            챗봇 ID
            <span class="relative">
              <button class="icon_info"></button>
              <!-- 발신번호 기반 양방향 대화방-->
              <span v-if="isA2pChatbot" class="message">발신번호를 챗봇ID로 사용하여 양방향 대화방 기능을 이용할 수 있으며,<br/>동일한 대화방에 일반 문자(SMS/LMS/MMS)도 함께 보여집니다.</span>
              <!-- 챗봇ID기반 양방향 대화방 -->
              <span v-else class="message">챗봇ID가 발신번호가 아닐 경우 일반 문자(SMS/LMS/MMS)는 수신할 수 없으며, RCS 문자만 수발신 가능합니다.</span>
            </span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.chatbotId }}</span>
          </div>
        </div>
        <div class="rcs_item_bundle dv2023_dividermaker">
          <strong class="rcs_tit_bundle p-l0">
            대화방메뉴
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.psMenuYn === 'Y' ? '사용' : '미사용' }}</span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            메시지 입력란
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.inputFieldYn === 'Y' ? '입력 가능' : '입력 불가능' }}</span>
          </div>
        </div>
        <div v-if="isAfterActive" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            전시
            <span class="relative">
              <button class="icon_info"></button>
              <span class="message">
                대화방을 비전시로 설정하면 고객은 메시지 앱에서 대화방 정보를<br/>볼 수 없습니다.
              </span>
            </span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.display.substring(1, 2) === '1' ? '전시' : '비전시' }}</span>
          </div>
        </div>
      </div>
      <!-- group 2 -->
      <div class="dv2023_addoverline dv2023_addunderline dv2023_dividermaker">
        <div class="rcs_item_bundle dv2023_infopop">
          <strong class="rcs_tit_bundle p-l0">
            대행사
            <span class="relative">
              <button class="icon_info"></button>
              <span class="message">
                양방향 서비스를 이용하기 위해서는 기존 브랜드 설정 시 등록한 대행사와 다르게<br/>양방향을 지원하는 대행사로 별도 지정해야 합니다.
              </span>
            </span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.agencyNm }}</span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            챗봇 응답용 URL
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.webhook }}</span>
          </div>
        </div>
      </div>
      <div class="dv2023_addunderline dv2023_dividermaker">
        <div class="rcs_item_bundle dv2023_infopop">
          <strong class="rcs_tit_bundle p-l0">
            검색 허용
            <span class="relative">
              <button class="icon_info"></button>
              <span class="message">
                메시지 앱에서 브랜드를 검색할 수 있는 기능입니다.
              </span>
            </span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.display.substring(0, 1) === '1' ? '허용' : '미허용' }}</span>
          </div>
        </div>
      </div>
      <!-- 데이터 이력 -->
      <div v-if="!isImport" class="dv2023_dividermaker">
        <div v-if="!isSaved" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">승인요청일</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.aprvReqDt | prettyDate('YYYY-MM-DD HH:mm') }}</span>
          </div>
        </div>
        <div v-if="isActive && chatbotData.aprvDt" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">승인완료일</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.aprvDt | prettyDate('YYYY-MM-DD HH:mm') }}</span>
          </div>
        </div>
        <div v-if="isRejected" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">반려</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.aprvDt | prettyDate('YYYY-MM-DD HH:mm') }}<br>{{ chatbotData.aprvRetDescr }}<br>{{ isAfterActive ? '수정내용 삭제 버튼 선택 시 이전상태로 복구 됩니다.' : '' }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 버튼 -->
    <div v-if="!isImport" class="btn_wrap dv2023_btnspace mar_t40 full_width temWrite btn_flex first">
      <a href="javascript:void(0)" class="btn mid bd_blue" @click="goBack"><span>이전</span></a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="!isOnewayAgency && (isSaved || isRejected || isActive)" @click="remove">삭제</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="!isOnewayAgency && (isSaved || isRejected || isActive)" @click="modify">수정</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="!isOnewayAgency && isAfterActive && isRejected" @click="modifyCancel">수정내용 삭제</a>
      <a href="javascript:void(0);" class="btn mid blue" v-if="!isOnewayAgency && isSaved" @click="apply">승인요청</a>
      <a href="javascript:void(0);" class="btn mid blue" v-if="!isOnewayAgency && !isSaved && canCanceling" @click="applyCancel" :style="isInspect ? 'cursor: not-allowed' : ''" :class="{ 'blue': !isInspect, 'bd_gray disabled': isInspect }">승인요청 취소</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="!isOnewayAgency && isA2pChatbot && isActive" @click="convertOneway">단방향 전환</a>
      <a href="javascript:void(0);" class="btn mid blue" v-if="!isOnewayAgency && isActive" @click="addPsMenu">{{ hasPsMenu ? '대화방 메뉴 수정' : '대화방 메뉴 등록' }}</a>
    </div>
  </div>
</template>

<script>
import { updateTwowayChatbot, applyCancelChatbot, deleteChatbots, convertChatbotOneway, getActiveA2pChatbotCnt, isSubNumChatbots } from '@/api/service/chatbot'
export default {
  name: 'TwowayChatbotView',
  props: {
    chatbotData: { type: Object, default: null },
    isImport: { type: Boolean, default: false } // 외부에서 import 해서 쓸때는 양방향 대화방 정보만 보여준다
  },
  data() {
    return {
      brandId: ''
    }
  },
  computed: {
    isSaved() { return this.chatbotData.aprvRet === 'SAVED' },
    isInspect() { return this.chatbotData.aprvRet === 'INSPECTING' || this.chatbotData.aprvRet === 'INSPECTED' }, // 검수시작, 처리중일 경우
    isActive() { return this.chatbotData.aprvRet === 'OK' },
    isAfterActive() { return this.chatbotData.activeYn === 'Y' }, // 승인 이후의 데이터인지?
    isRejected() { return this.chatbotData.aprvRet === 'REJECTED' && this.chatbotData.status === 'DELETED' }, // 반려
    isA2pChatbot() { return this.chatbotData.service === 'a2p' }, // 발신번호 기반 대화방 여부
    isOnewayAgency() { return (window.localStorage.getItem('userType') === 'AGENCY' && !window.localStorage.getItem('rcsSvc').includes('chat')) }, // 단방향 서비스 제공 대행사인지?
    canCanceling() { return this.chatbotData.aprvRet !== 'OK' && (this.chatbotData.status === 'APRV_NEW' || this.chatbotData.status === 'APRV_MOD') },
    hasPsMenu() { return this.chatbotData.psMenuCnt > 0 } // 대화방 메뉴 유무
  },
  created() {
    this.brandId = this.$route.params.brandId
  },
  methods: {
    /** 데이터 검증 */
    validation() {
      if (jglib.isEmpty(this.chatbotData.subNum)) {
        this.$alertMsg('회신번호를 선택해 주세요.').then(() => {})
        return Promise.resolve(false)
      }
      if (jglib.isEmpty(this.chatbotData.agencyId)) {
        this.$alertMsg('대행사를 선택해 주세요.').then(() => {})
        return Promise.resolve(false)
      } else return Promise.resolve(true)
    },
    /** 승인요청 */
    async apply() {
      if (await this.validation()) {
        this.$confirmMsg('운영자 승인이 완료되면<br>양방향대화방을 사용할 수 있습니다.<br>양방향대화방을 등록 하시겠습니까?').then(() => {
          let data = {
            chatbotId: this.chatbotData.chatbotId, // 챗봇ID
            subTitle: this.chatbotData.subTitle, // 대화방명
            mdn: this.chatbotData.subNum, // 회신번호
            rcsReply: '1', // 대표번호 문자수신서비스(미사용)
            action: 'APRV_NEW',
            display: this.chatbotData.display, // 검색허용 + 전시/비전시
            inputFieldYn: this.chatbotData.inputFieldYn,
            twoWayType: this.chatbotData.service, // 'a2p' or 'chat'
            agencyId: this.chatbotData.agencyId, // 선택한 대행사 아이디
            botAgencyId: this.chatbotData.botAgencyId, // * 중계사임: 선택한 대행사 아이디 / 중계사 아님: 해당 대행사의 대표 중계사 아이디
            relayAgId: this.chatbotData.botAgencyId,
            webhook: this.chatbotData.webhook // 선택한 대행사의 webhoookUrl
          }
          updateTwowayChatbot(this.brandId, data).then(res => {
            if (res.code === '20000000') {
              this.goList()
            }
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        })
      }
    },
    /** 반려건 > 수정요청 취소 */
    modifyCancel() {
      this.$confirmMsg('요청하셨던 수정 승인요청을 취소하시겠습니까?<br/>확인 선택 시 수정 하셨던 내용은 삭제됩니다.').then(() => {
        applyCancelChatbot(this.brandId, this.chatbotData.chatbotId).then(res => {
          if (res.code === '20000000') this.goList()
        }).catch((err) => {
          this.$alertMsg(err.desc).then(() => {})
        })
      })
    },
    /** 승인요청 취소 */
    applyCancel() {
      if (!this.isInspect) {
        let msg = ''
        if (this.chatbotData.status === 'APRV_NEW') {
          msg = '요청하셨던 ‘양방향 대화방 등록’ 승인요청을<br>취소 하시겠습니까?<br>확인 선택 시 신청했던 정보는 임시저장 상태로 변경됩니다.'
        } else {
          msg = '요청하셨던 ‘양방향 대화방 수정’ 승인요청을<br>취소 하시겠습니까?<br>확인 선택 시 수정 하셨던 내용은 취소되며,<br>승인완료 상태로 변경됩니다.'
        }
        this.$confirmMsg(msg).then(() => {
          applyCancelChatbot(this.brandId, this.chatbotData.chatbotId).then(res => {
            if (res.code === '20000000') this.goList()
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        })
      }
    },
    /** 이전 */
    goBack() {
      this.$emit('goBack')
    },
    /** 목록으로 */
    goList() {
      this.$router.push({ name: 'TwowayChatbotList', params: { brandId: this.brandId } })
    },
    /** 수정 */
    modify() {
      this.$emit('update:isWrite', true)
    },
    /** 삭제 */
    async remove() {
      if (this.isA2pChatbot) { // 발신번호 기반
        let activeSendNumCnt = await getActiveA2pChatbotCnt(this.brandId)
        if (this.isActive) { // 승인완료 상태
          if (activeSendNumCnt > 1) { // 마지막 번호가 아님
            this.$confirmMsg('양방향 대화방을 삭제 하시겠습니까?<br>(발신번호 기반의 양방향 대화방 삭제 시 해당 발신번호도 삭제됩니다.)').then(async () => {
              let useSubNumCnt = await this.getSubNumChatbotCnt()
              if (useSubNumCnt > 0) { // 회신번호로 사용중인 번호임
                this.$confirmMsg('선택한 발신번호는' + useSubNumCnt + '개의 양방향 대화방의<br>회신번호로 지정되어 있습니다.<br>확인 버튼을 누르실 경우,<br>해당 양방향 대화방도 함께 삭제됩니다.<br><br>삭제 하시겠습니까?').then(() => {
                  this.deleteChatbot()
                })
              } else {
                this.deleteChatbot()
              }
            })
          } else { // 마지막 번호임
            this.$alertMsg('발신번호는 1개 이상 등록되어 있어야 합니다.<br>삭제할 수 없습니다.')
          }
        } else { // 승인완료 외의 상태 -> 바로 삭제
          this.$confirmMsg('양방향 대화방을 삭제 하시겠습니까?<br>(발신번호 기반의 양방향 대화방 삭제 시 해당 발신번호도 삭제됩니다.)').then(() => { this.deleteChatbot() })
        }
      } else { // 챗봇ID 기반 -> 바로 삭제 처리
        this.$confirmMsg('양방향 대화방을 삭제 하시겠습니까?').then(() => { this.deleteChatbot() })
      }
    },
    /** 삭제 요청 */
    deleteChatbot() {
      let data = { chatbotIds: [this.chatbotData.chatbotId], twoWayType: 'chat' }
      deleteChatbots(this.brandId, data).then(res => {
        if (res.code === '20000000') this.goList()
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 회신번호 여부 체크 */
    async getSubNumChatbotCnt() {
      let res = await isSubNumChatbots(this.brandId, { chatbotIds: this.chatbotData.chatbotId })
      if (res.code === '20000000') {
        let data = Object.values(res.result[0])
        return Promise.resolve(data[0])
      }
    },
    /** 발신번호로 전환 */
    convertOneway() {
      if (this.isA2pChatbot) {
        this.$confirmMsg('단방향 대화방으로 전환하시겠습니까?<br>전환된 발신번호는 발신번호 관리에서 확인 가능 합니다.').then(() => {
          let data = {
            action: 'OK_MOD',
            chatbotId: this.chatbotData.chatbotId,
            twoWayType: 'a2p'
          }
          convertChatbotOneway(this.brandId, data).then(res => {
            if (res.code === '20000000') this.goList()
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        })
      } else {
        this.$alertMsg('챗봇ID 또는 신규 대화방으로<br>생성된 양방향 대화방은<br>발신번호로 전환할 수 없습니다.')
      }
    },
    /** 대화방 메뉴 등록 */
    addPsMenu() {
      let isNew = !this.hasPsMenu
      this.$router.push({ name: 'PersistentMenuUnit', params: { brandId: this.brandId, chatbotId: this.chatbotData.chatbotId, isNew: isNew } })
    }
  }
}
</script>
