<template>
  <section class="section mar_b0">
    <section class="sec_form">
      <!-- 발신번호 승인 완료 -->
      <div class="title_area mar_b20">
        <h3 class="h3_title">{{approvaInfoData.aprvRetNm}}</h3>
      </div>
      <div class="title_area mar_b20">
        <h4 class="h4_title fs20">※ 양방향 대화방 기본 정보</h4>
      </div>
      <table class="tbl_row_type">
        <caption>
          <strong>대화방 관리</strong>
          <p>승인완료</p>
        </caption>
        <colgroup>
          <col style="width:190px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">대화방 유형</th>
            <td>{{approvaInfoData.serviceNm}}</td>
          </tr>
          <tr>
            <th scope="row">대화방 명</th>
            <td>{{approvaInfoData.subTitle}}</td>
          </tr>
          <tr v-if="approvaInfoData.service === 'chat'">
            <th scope="row">대화방 ID</th>
            <td>{{approvaInfoData.chatbotId}}</td>
          </tr>
          <tr>
            <th scope="row" v-if="approvaInfoData.service === 'a2p'">발신번호/회신번호</th>
            <td v-if="approvaInfoData.service === 'a2p'">{{approvaInfoData.mdn}}</td>
            <th scope="row" v-if="approvaInfoData.service === 'chat'">회신번호</th>
            <td v-if="approvaInfoData.service === 'chat'">{{approvaInfoData.mdn}}</td>
          </tr>
          <tr>
            <th scope="row">대행사</th>
            <td>{{approvaInfoData.agencyNm}}</td>
          </tr>
          <tr>
          <tr>
            <th scope="row">챗봇응답 URL</th>
            <td>{{ approvaInfoData.webhook }}</td>
          </tr>
          <tr>
          <tr>
            <th scope="row">메시지 입력</th>
            <td v-if="approvaInfoData.inputFieldYn === 'Y'">입력 가능</td>
            <td v-if="approvaInfoData.inputFieldYn === 'N'">입력 불가능</td>
          </tr>
          <tr>
            <th scope="row">등록일</th>
            <td>{{approvaInfoData.regDt}} / {{approvaInfoData.regUserNm}}</td>
          </tr>
          <tr>
            <th scope="row">승인요청일</th>
            <td>{{approvaInfoData.aprvReqDt}} / {{approvaInfoData.aprvReqUserNm}}</td>
          </tr>
          <tr>
            <th scope="row">승인완료일</th>
            <td>{{approvaInfoData.aprvDt}}</td>
          </tr>
        </tbody>
      </table>
      <div class="title_area mar_t60 mar_b20">
        <h4 class="h4_title fs20">※ 대화방 메뉴 정보</h4>
      </div>
      <table class="tbl_row_type">
          <caption>
            <strong>대화방 관리</strong>
            <p>승인완료</p>
          </caption>
          <colgroup>
            <col style="width:180px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">대화방 메뉴</th>
              <td v-if="approvaInfoData.psMenuYn === 'Y' && approvaInfoData.psMenuStatus !== 'OK'">사용(임시저장)</td>
              <td v-if="approvaInfoData.psMenuYn === 'Y' && approvaInfoData.psMenuStatus === 'OK' && isResume">사용</td>
              <td v-if="approvaInfoData.psMenuYn === 'Y' && approvaInfoData.psMenuStatus === 'OK' && !isResume">사용 (사용정지 : {{approvaInfoData.pauseDt}}, 사용재개 : {{approvaInfoData.resumeDt}})</td>
              <td v-if="approvaInfoData.psMenuYn === 'N' && approvaInfoData.psMenuStatus === 'PAUSE' ">미사용 (사용정지 : {{approvaInfoData.pauseDt}})</td>
              <td v-if="approvaInfoData.psMenuYn === 'N' && approvaInfoData.psMenuStatus !== 'PAUSE' ">미사용</td>
            </tr>
          </tbody>
      </table>
      <persistent-menu v-if="approvaInfoData.psMenuYn === 'Y'" ref="persistentMenu" :inputFieldYn=approvaInfoData.inputFieldYn :isModify="false"></persistent-menu>
      <div class="btn_wrap center mar_t40">
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="goCallingTwoWayManagement">
          <span>목록</span>
        </a>
        <a href="javascript:void(0);" v-if="existChatService && (approvaInfoData.status === 'ACTIVE' && approvaInfoData.aprvRet ==='OK') && approvaInfoData.psMenuStatus !== 'PAUSE' " class="btn mid blue" @click="goModify">
          <span>수정</span>
        </a>
        <a href="javascript:void(0);" v-if="existChatService && (approvaInfoData.status === 'ACTIVE' && approvaInfoData.aprvRet ==='OK' && approvaInfoData.service ==='chat') && approvaInfoData.psMenuStatus !== 'PAUSE' " class="btn mid black" @click="deleteTowway('chat')">
          <span>삭제</span>
        </a>
        <a href="javascript:void(0);" v-if="existChatService && (approvaInfoData.status === 'ACTIVE' && approvaInfoData.aprvRet ==='OK' && approvaInfoData.service ==='a2p') && approvaInfoData.psMenuStatus !== 'PAUSE' " class="btn mid black" @click="deleteTowway('a2p')">
          <span>단방향 전환</span>
        </a>
      </div>
    </section>
  </section>
</template>

<script>
import { deleteTwoWay } from '@/api/service/callingTwoWayManagement'
import PersistentMenu from '@/views/service/components/PersistentMenu'
export default {
  name: 'RetrieveTwoWayApprovalCompletion',
  data() {
    return {
      subTitle: '', // 발신번호명
      rcsReply: '1',
      chatbotId: '', // chatbot번호
      regCertiFileList: [],
      inputFieldYn: '',
      twoWayType: '',
      mdn: '',
      visible: false,
      visibleChatBotPop: false,
      chatAgnecyList: [],
      agencyId: '',
      agencyNm: '',
      relayAgId: '',
      relayAgNm: '',
      relayWebhookUrl: '',
      webhookUrl: '',
      psMenuYn: 'N',
      psMenuStatus: ''
    }
  },
  props: {
    approvaInfoData: {
      type: Object
    },
    isModify: {
      type: Boolean,
      required: false
    }
  },
  components: {
    PersistentMenu
  },
  created() {},
  mounted() {},
  computed: {
    isCorp() {
      return this.$store.state.user.userType === 'CORP'
    },
    existChatService() {
      // AGENCY이면서 제공서비스가 chat이 없는 경우 버튼처리
      let rcsSvcInfo = this.$store.state.user.corpInfo.rcsSvc
      if (this.$store.state.user.userType === 'AGENCY' && !jglib.isEmpty(rcsSvcInfo) && rcsSvcInfo.indexOf('chat') === -1) {
        return false
      } else {
        return true
      }
    },
    isResume() {
      return jglib.isEmpty(this.approvaInfoData.resumeDt)
    }
  },
  methods: {
    // 양방향관리 리스트 목록으로 이동
    goCallingTwoWayManagement() {
      this.$router.push({
        name: this.approvaInfoData.fromTwoWay === 'Y' ? 'CallingTwoWayManagement' : 'CallingNumberManagement',
        params: { brandId: this.approvaInfoData.brandId }
      })
    },
    deleteTowway(serviceType) {
      let msgText
      if (serviceType === 'chat') {
        msgText = '양방향 대화방을 삭제하시겠습니까?<br>삭제 시 등록된 대화방 정보와 대화방 메뉴는 복구 불가 합니다.'
      } else {
        msgText = '단방향 대화방으로 전환하시겠습니까?<br>전환 시 양방향 대화방에 등록된 대화방 정보와 대화방 메뉴는 복구 불가 합니다.<br>전환된 발신번호는 단방향 대화방에서 확인 가능 합니다.'
      }
      this.$confirmMsg(
        msgText,
        '타이틀',
        '확인',
        '취소'
      )
        .then(res => {
          let data = {
            action: 'OK_MOD',
            chatbotId: this.approvaInfoData.chatbotId,
            twoWayType: this.approvaInfoData.service
          }
          deleteTwoWay(data, this.approvaInfoData.brandId)
            .then(res => {
              if (res.code === '20000000') {
                let msg
                if (serviceType === 'chat') {
                  msg = '양방향 대화방이 삭제되었습니다.'
                } else {
                  msg = '단방향 대화방으로 전환되었습니다.'
                }
                this.$alertMsg(msg).then(() => {
                  this.$router.push({
                    name: 'CallingTwoWayManagement',
                    params: { brandId: this.approvaInfoData.brandId }
                  })
                })
              }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
        })
        .catch(res => {})
    },
    goModify() {
      this.$emit('isModify', true)
    }
  }
}
</script>
