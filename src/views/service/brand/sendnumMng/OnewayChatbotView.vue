<template>
  <div class="rcs_emul_form_wrap">
    <div class="rcs_emul_form_cont dv2023_formspace bd_no">
      <!-- 대량건에 대한 상세 데이터 -->
      <div v-if="isMassReg && isRejected">
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            엑셀등록
          </strong>
          <div class="rcs_cont_bundle">
            <span class="dv2023_downloadicon">
              <a href="javascript:void(0)" class="underline" @click="getRejectedReasonFile">발신번호 대량등록 결과_반려</a>
            </span>
          </div>
        </div>
      </div>
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
            발신번호
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ !isMassReg ? chatbotData.chatbotId : ((chatbotData.massRemainedCnt + chatbotData.massRejectedCnt) - 1 > 0 ? `${chatbotData.chatbotId}외 ${(chatbotData.massRemainedCnt + chatbotData.massRejectedCnt) - 1} 건` : chatbotData.chatbotId) }}</span>
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
        <div v-if="isAfterActive" class="rcs_item_bundle dv2023_addunderline">
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
            <span class="custom_input w670">
              {{ chatbotData.display.substring(1, 2) === '0' ? '비전시' : '전시'  }}
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle dv2023_addunderline">
          <strong class="rcs_tit_bundle p-l0">
            대표번호<br>문자수신서비스
            <span class="relative">
              <button class="icon_info"></button>
              <span class="message">
                대표번호 문자수신 서비스는 휴대폰 메시지 함에서 기업의 대표번호로 문자를 보낼 경우 해당 메시지를 기업의 서버에서 수신할 수 있도록 제공하는 대표번호 부가 서비스입니다.
              </span>
            </span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ chatbotData.rcsReply === '0' ? '사용' : '미사용' }}</span>
          </div>
        </div>
        <div v-if="isMassReg">
          <div class="rcs_item_bundle dv2023_addunderline">
            <strong class="rcs_tit_bundle p-l0">
              통신서비스<br>가입증명원
            </strong>
            <div class="rcs_cont_bundle">
              <span>
                <a href="javascript:void(0)" class="underline" @click="downloadRegCertiFile">{{ chatbotData.massRegFileName }}</a>
              </span>
            </div>
          </div>
        </div>
        <div v-if="!isMassReg" class="rcs_item_bundle" :class="{ 'dv2023_addunderline': !isSaved }">
          <strong class="rcs_tit_bundle p-l0">
            통신서비스<br>가입증명원
          </strong>
          <div class="rcs_cont_bundle">
            <span v-if="chatbotData.fileName && chatbotData.fileName !== ''">
              <a href="javascript:void(0)" class="underline" @click="downloadRegCertiFile">{{ chatbotData.fileName }}</a>
            </span>
            <span v-else class="custom_input w670">미첨부</span>
          </div>
        </div>
      </div>
      <div>
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
    <!-- 버튼 영역 -->
    <div class="btn_wrap dv2023_btnspace mar_t40 full_width temWrite btn_flex first">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goList"><span>이전</span></a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="isSaved || isRejected || isActive" @click="remove">삭제</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="isSaved || isRejected || isActive" @click="modify">수정</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="isAfterActive && isRejected" @click="modifyCancel">수정내용 삭제</a>
      <a href="javascript:void(0);" class="btn mid blue" v-if="isSaved" @click="apply">승인요청</a>
      <a href="javascript:void(0);" v-if="!isSaved && canCanceling " @click="applyCancel" :style="isInspect ? 'cursor: not-allowed' : ''" class="btn mid blue" :class="{ 'blue': !isInspect, 'bd_gray disabled': isInspect }">승인요청 취소</a>
      <a href="javascript:void(0);" class="btn mid blue" v-if="!isOnewayAgency && isActive" @click="convertTwoway">양방향 대화방 전환</a>
    </div>
    <!--  대행사 -->
    <AgencyInfoPopup v-if="showAgencyInfoPopup" :visible.sync="showAgencyInfoPopup"></AgencyInfoPopup>
  </div>
</template>

<script>
import AgencyInfoPopup from '@/views/service/components/chatbot/AgencyInfoPopup'
import { updateOnewayChatbot, deleteChatbot, deleteMassChatbot, applyCancelChatbot, isAvailableRegisterTwoway, downloadRegCertiFile, downloadRejectMassReg, getActiveA2pChatbotCnt, isSubNumChatbots } from '@/api/service/chatbot'
export default {
  name: 'OnewayChatbotView',
  components: {
    AgencyInfoPopup
  },
  props: {
    chatbotData: { type: Object, default: null }
  },
  data() {
    return {
      brandId: '',
      showAgencyInfoPopup: false
    }
  },
  computed: {
    isMassReg() { return (this.chatbotData.massRemainedCnt + this.chatbotData.massRejectedCnt) > 0 }, // 대량 등록건 여부
    isSaved() { return this.chatbotData.aprvRet === 'SAVED' }, // 저장
    isInspect() { return this.chatbotData.aprvRet === 'INSPECTING' || this.chatbotData.aprvRet === 'INSPECTED' }, // 검수시작, 처리중일 경우
    isRejected() { return this.chatbotData.aprvRet === 'REJECTED' && this.chatbotData.status === 'DELETED' }, // 반려
    isActive() { return this.chatbotData.aprvRet === 'OK' },
    isAfterActive() { return this.chatbotData.activeYn === 'Y' }, // 승인 이후의 데이터인지?
    isOnewayAgency() { return window.localStorage.getItem('userType') === 'AGENCY' && !window.localStorage.getItem('rcsSvc').includes('chat') }, // 단방향 서비스 제공 대행사인지?
    canCanceling() { return this.chatbotData.aprvRet !== 'OK' && (this.chatbotData.status === 'APRV_NEW' || this.chatbotData.status === 'APRV_MOD') } // 승인완료전의 데이터들
  },
  created() {
    this.brandId = this.$route.params.brandId
  },
  methods: {
    /** 목록 이동 */
    goList() {
      this.$router.push({ name: 'SendNumList', params: { brandId: this.brandId } })
    },
    /** 발신번호 삭제 */
    async remove() {
      if (this.isMassReg) { // 대량건 삭제
        this.$confirmMsg(`총 <span style="color: red">${this.chatbotData.massRejectedCnt}</span>개의 발신번호를 삭제하시겠습니까?`).then(() => {
          let data = { massRegSeq: this.chatbotData.massRegSeq }
          deleteMassChatbot(this.brandId, data).then(res => {
            if (res.code === '20000000') this.goList()
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        })
      } else { // 개별건 삭제
        // 승인 완료된 데이터 삭제의 경우
        if (this.isActive) {
          let activeSendNumCnt = await getActiveA2pChatbotCnt(this.brandId)
          if (activeSendNumCnt > 1) {
            this.$confirmMsg('발신번호를 삭제 하시겠습니까?').then(async () => {
              // 회신번호로 사용되는 번호인지 확인
              let useSubNumCnt = await this.getSubNumChatbotCnt()
              if (useSubNumCnt > 0) {
                this.$confirmMsg('선택한 발신번호는 ' + useSubNumCnt + '개의 양방향 대화방의<br>회신번호로 지정되어 있습니다.<br>확인 버튼을 누르실 경우,<br>해당 양방향 대화방도 함께 삭제됩니다.<br><br>삭제 하시겠습니까?').then(() => {
                  this.deleteChatbot()
                })
              } else {
                this.deleteChatbot()
              }
            })
          } else {
            this.$alertMsg('발신번호는 1개 이상 등록되어 있어야 합니다.<br>삭제할 수 없습니다.')
          }
        } else { // 그 외의 상태면 삭제 가능
          this.$confirmMsg('발신번호를 삭제 하시겠습니까?').then(() => {
            this.deleteChatbot()
          })
        }
      }
    },
    /** 데이터 삭제 요청 */
    deleteChatbot() {
      let data = { chatbotId: this.chatbotData.chatbotId }
      deleteChatbot(this.brandId, data).then((res) => {
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
    /** 발신번호 수정 */
    modify() {
      this.$emit('update:isWrite', true)
    },
    /** 반려건 > 수정요청 취소 */
    modifyCancel() {
      this.$confirmMsg('요청하셨던 수정 승인요청을 취소하시겠습니까?<br/>확인 선택 시 수정 하셨던 내용은 삭제됩니다.').then(() => {
        applyCancelChatbot(this.brandId, this.chatbotData.chatbotId).then(res => {
          if (res.code === '20000000') {
            this.goList()
          }
        }).catch(err => {
          this.$alertMsg(err.desc).then(() => {})
        })
      })
    },
    /** 발신번호 승인요청 - 대량 등록건은 조회화면 내 승인요청 버튼 자체가 없음(임시저장이 없어서!) */
    apply() {
      // 임시저장시 필수 데이터를 제외한 나머지 데이터만 validation 진행
      if (jglib.isEmpty(this.chatbotData.regCertiFileId)) {
        this.$alertMsg('통신서비스 가입증명원 파일을 업로드해 주세요.')
        return false
      } else {
        this.$confirmMsg('운영자 승인이 완료되면 발신번호를 사용할 수 있습니다.<br>발신번호를 등록 하시겠습니까?').then(() => {
          let data = {
            subTitle: this.chatbotData.subTitle,
            mdn: this.chatbotData.chatbotId,
            inputFieldYn: this.chatbotData.inputFieldYn,
            rcsReply: this.chatbotData.rcsReply,
            action: 'APRV_NEW' // 승인요청
          }
          let formData = new FormData()
          formData.append('data', JSON.stringify(data))
          // formData.append('rcsCertiFile', this.regCertiFile)
          updateOnewayChatbot(this.brandId, this.chatbotData.chatbotId, formData).then(res => {
            if (res.code === '20000000') this.goList()
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        })
      }
    },
    /** 승인취소 요청 */
    applyCancel() {
      if (!this.isInspect) {
        if (this.isMassReg) { // 대량 등록건의 경우: 저장상태로 돌아가지 않고, 아예 삭제 처리함
          this.$confirmMsg('요청하셨던 ‘발신번호 대량추가’ 승인요청을 취소 하시겠습니까?<br> 확인 선택 시 신청했던 정보는 모두 삭제됩니다.').then(() => {
            let data = { massRegSeq: this.chatbotData.massRegSeq, action: 'cancel' }
            deleteMassChatbot(this.brandId, data).then(res => {
              if (res.code === '20000000') {
                this.goList()
              }
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          })
        } else {
          let msg = ''
          if (this.chatbotData.status === 'APRV_NEW') {
            msg = '요청하셨던 ‘발신번호 추가’ 승인요청을 취소 하시겠습니까?<br>확인 선택 시 신청했던 정보는 임시저장 상태로 변경됩니다.'
          } else {
            msg = '요청하셨던 ‘발신번호 수정’ 승인요청을 취소 하시겠습니까?<br>확인 선택 시 수정 하셨던 내용은 취소되며, 승인완료 상태로 변경됩니다.'
          }
          this.$confirmMsg(msg).then(() => {
            applyCancelChatbot(this.brandId, this.chatbotData.chatbotId).then(res => {
              if (res.code === '20000000') {
                this.goList()
              }
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          })
        }
      }
    },
    /** 양방향 대화방 전환 */
    async convertTwoway() {
      let result = await isAvailableRegisterTwoway(this.brandId)
      if (result.available) {
        if (this.chatbotData.rcsReply === '0') {
          this.$confirmMsg('선택한 발신번호는 대표번호 문자수신 서비스를 사용 중입니다.<br/>양방향 대화방으로 전환할 경우,<br/>대표번호 문자수신 서비스는 사용할 수 없습니다.<br/>양방향 대화방으로 전환하시겠습니까?')
            .then(() => {
              // 양방향 대화방 수정 페이지로 이동
              this.$router.push({ name: 'TwowayChatbotUnit', params: { brandId: this.brandId, chatbotId: this.chatbotData.chatbotId, svcType: 'a2p' } })
            })
        } else this.$router.push({ name: 'TwowayChatbotUnit', params: { brandId: this.brandId, chatbotId: this.chatbotData.chatbotId, svcType: 'a2p' } })
      } else {
        if (result.userType === 'CORP') {
          // 기업: 대행사 추가 안내 팝업 출력
          this.showAgencyInfoPopup = true
        } else {
          // 대행사: alert
          this.$alertMsg('양방향 대화방 서비스를 제공하지 않는 대행사 입니다.<br>양방향 대화방 전환이 불가 합니다.')
        }
      }
    },
    /** (대량) 빈려시 반려 사유 엑셀파일 다운로드  */
    getRejectedReasonFile() {
      downloadRejectMassReg(this.brandId, this.chatbotData.massRegSeq).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', '발신번호 대량등록 결과_반려.xlsx')
        document.body.appendChild(link)
        link.click()
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 통신가입증명원 다운로드 */
    downloadRegCertiFile() {
      downloadRegCertiFile(this.brandId, this.chatbotData.chatbotId).then(res => {
        // 1. binary 데이터 -> blob로 변환
        const blob = new Blob([res.data], { type: res.headers['content-type'] })
        // 2. blob로 객체 URL을 생성
        const url = window.URL.createObjectURL(blob)
        const cd = res.headers['content-disposition']
        const index = cd.indexOf("filename*=UTF-8''") + "filename*=UTF-8''".length
        const filename = decodeURIComponent(cd.substring(index, cd.length))
        // 3. blob 객체 URL을 설정할 링크 생성
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>
