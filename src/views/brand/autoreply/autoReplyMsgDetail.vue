<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="간편챗봇 메시지 상세" />
        <div class="chatroom__wrap--view">
          <div class="chatroom-menu__view">
            <div class="table__wrap">
              <table class="table table-bodyonly">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">상태</span></th>
                    <td>
                      <div class="form-item__content">
                        <span class="text">{{autoReplyMsgData.aprvRetNm}}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">유형</span></th>
                    <td>
                      <span class="text">{{autoReply.autoReplyMsgTypeNm}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">간편챗봇 이름</span></th>
                    <td>
                      <span class="text">{{ autoReplyMsgData.name }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">간편챗봇 ID</span></th>
                    <td>
                      <span class="text">{{ armId }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table__wrap">
              <table class="table table-bodyonly">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">작성자</span></th>
                    <td>
                      <span class="text">{{autoReplyMsgData.regUserNm}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">작성일</span></th>
                    <td>
                      <span class="text">{{autoReplyMsgData.dpRegDt}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 기획서 v1.0 수정 -- 대화방 목록 추가 -->
            <div class="table__wrap chatroom__table" v-if='autoReply.chatbotInfoList !== undefined'>
              <table class="table table-list">
                <colgroup>
                  <col width="40%">
                  <col width="30%">
                  <col width="30%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"><span>대화방 명</span></th>
                    <th scope="col"><span>발신번호/챗붓 ID</span></th>
                    <th scope="col"><span>간편챗붓 메시지</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in autoReply.chatbotInfoList" :key="i"
                  >
                    <td>
                      <div class="chat_title__wrap">
                        <div class="chat_title">
                          <router-link to="/chatbotView" class="link">{{ item.subTitle }}</router-link>
                        </div>
                      </div>
                    </td>
                    <td>
                      {{ item.chatbotId }}
                    </td>
                    <td>
                      연결됨
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- // 기획서 v1.0 수정 -- 대화방 목록 추가 -->
          </div>
          <div class="chatroom-emulator sticky">
            <autoReplyMsgEmulator
              :brandInfoData='brandInfo'
              :chatInfoData="autoReplyMsgData"
            />
          </div>
        </div>
        <div class="button__wrap space-between">
          <div class="left">
            <router-link
              class="btn-line btn"
              :to="{ name: 'autoreplymsglist', params: {brandId: brandId} }"
            >이전</router-link>
          </div>
          <div class="right">
            <ButtonCmp
                type="btn-line"
                @click="openDeleteMsg"
            >삭제</ButtonCmp>
            <ButtonCmp
                type="btn-blue"
                @click="goRegPage"
            >수정</ButtonCmp>
          </div>
        </div>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        v-if="isChabotDeleteMsg"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          연결된 간편챗봇 연결이 모두 삭제됩니다. <br>
          간편챗봇을 삭제 하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            아니요
          </ButtonCmp>
          <ButtonCmp @click='remove' class="btn btn-blue">예</ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import autoReplyMsgEmulator from '@/views/brand/autoreply/components/autoReplyMsgEmulator.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import { removeAutoReply } from '@/api/service/autoReply'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    autoReplyMsgEmulator,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      autoReply: {},
      brandId: '',
      armId: '',
      isModalViewed: false,
      isChabotDeleteMsg: false,
      chatInfoData: { allowMsg: 'Y' },
      chatMsgData: {
        imgSize: '',
        chatType: '', // chatBubble
        bubbleContent: '',
        msgData: [],
        chipButtons: []
      }
    }
  },
  created() {
    this.brandId = this.$router.currentRoute.params.brandId
    this.armId = this.$router.currentRoute.params.autoReplyMsgId
  },
  mounted() {
    this.getAutoReplyDetail()
  },
  computed: {
    ...mapGetters('autoReply', {
      autoReplyMsgData: 'getAutoReplyData'
    }),
    ...mapGetters('brand', {
      brandInfo: 'getBrandDetail'
    })
  },
  methods: {
    ...mapActions('autoReply', {
      getAutoReplyData: 'get_auto_reply_data'
    }),
    getAutoReplyDetail () {
      this.getAutoReplyData({ brandId: this.brandId, armId: this.armId }).then(res => {}).catch(e => {
        this.$alertMsg(e.desc)
      })
      this.$store.dispatch('autoReply/get_auto_reply_data', { brandId: this.brandId, armId: this.armId }).then(res => {
        this.autoReply = res.result.autoReply
        this.templateContent = res.result.templateContent
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    copyChatRoom () {
      this.isModalViewed = true
    },
    openDeleteMsg() {
      this.isModalViewed = true
      this.isChabotDeleteMsg = true
    },
    closeMsg () {
      this.isModalViewed = false
      this.isChabotDeleteMsg = false
    },
    goRegPage () {
      this.$router.push({ name: 'autoreplymsgMod', params: { brandId: this.brandId, autoReplyMsgId: this.armId } })
    },
    /** 삭제 */
    remove() {
      removeAutoReply(this.brandId, this.armId).then(res => {
        if (res.code === '20000000') {
          this.$router.replace({ name: 'autoreplymsglist', params: { brandId: this.brandId } })
        }
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    }
  }
}
</script>
