<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle :pagetitle="pageTitle" />
        <PageTitleH3 titleh3="대화방 정보" />
        <div class="chatroom__wrap--view">
          <div class="chatroom-menu__view">
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">사용 여부</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ twowayChatbotData.psMenuYn  === 'Y' ? '사용' : twowayChatbotData.psMenuYn === 'PAUSE' ? '사용중지' : '미사용' }}</span>
                          </div>
                        </div>
                        <p class="not-user-msg" v-if="twowayChatbotData.psMenuYn  !== 'Y' && twowayChatbotData.psMenuYn === 'PAUSE'">
                          현재 해당 대화방은 일시중지 상태입니다.<br>
                          일시중지 상태를 해제하려면 <router-link to="#">고객센터</router-link>에 문의해주세요.
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">대화방 명</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ twowayChatbotData.subTitle }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">발신번호/회신번호</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ isA2pChatbot ? twowayChatbotData.chatbotId : twowayChatbotData.subNum }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">챗봇 ID</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ twowayChatbotData.chatbotId }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <template v-if="psMenuList.length > 0">
              <div class="chatroom-munu__h3-wrap">
                <PageTitleH3 titleh3="대화방 메뉴" />
                <ButtonCmp
                  type="btn-line"
                  size="small"
                >
                  대화방 메뉴 복사
                </ButtonCmp>
              </div>
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="280px"/>
                    <col />
                  </colgroup>
                  <tbody>
                  <tr
                    v-for="(menu, index) in psMenuList"
                    :key="index"
                  >
                    <th scope="row"><span class="form-item__label">{{ menu.title }}</span></th>
                    <td v-if="menu.type === 'dial_phone_number'">
                      <div class="form-item__content">
                        <ul class="chatroom-menu__list">
                          <li>전화연결</li>
                          <li>{{ menu.dialPhoneNumber.phoneNumber }}</li>
                        </ul>
                      </div>
                    </td>
                    <td v-if="menu.type === 'auto_reply'">
                      <div class="form-item__content">
                        <ul class="chatroom-menu__list">
                          <li>간편 챗봇 연결</li>
                          <li>{{ menu.armIdName }}</li>
                        </ul>
                      </div>
                    </td>
                    <td v-if="menu.type === 'basic_url_action'">
                      <div class="form-item__content">
                        <ul class="chatroom-menu__list">
                          <li>홈페이지 연결</li>
                          <li>{{ menu.basic.openUrl.url }}</li>
                        </ul>
                      </div>
                    </td>
                    <td v-if="menu.type === 'feed_url_action'">
                      <div class="form-item__content">
                        <ul class="chatroom-menu__list">
                          <li>브랜드 소식 연결</li>
                          <li>{{ menu.feed.openUrl.url }}</li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </div>
          <div class="chatroom-emulator sticky">
            <ChatEmulator
              :chatInfoData="twowayChatbotData"
              :chatMenuList="psMenuList"
            />
          </div>
        </div>
        <div class="button__wrap" v-if="psMenuList.length > 0">
          <ButtonCmp
              type="btn-blue-line"
              @click="remove"
          >삭제</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
              @click="goWrite"
          >수정</ButtonCmp>
        </div>
        <div class="button__wrap" v-else>
          <ButtonCmp
            type="btn-blue"
            @click="goWrite"
          >등록</ButtonCmp>
        </div>
      </div>
    </div>
    <!-- modal  -->
<!--    <ModalView-->
<!--      v-if="isModalViewed"-->
<!--      @closeModal="isModalViewed = false"-->
<!--    >-->
<!--      <DublicationChatMenu-->
<!--          @closeModal="isModalViewed = false"-->
<!--        >-->
<!--      </DublicationChatMenu>-->
<!--    </ModalView>-->
    <!-- modal  -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulatorCustom.vue'
import { getTwowayChatbotDetail } from '@/api/service/chatbot'
import { parsePersistentMenu, getPersistentDetail, deletePersistentMenu } from '@/api/service/persistentMenu'

export default {
  components: {
    ChatEmulator,
    ButtonCmp,
    PageTitle,
    BrandLnb,
    PageTitleH3
  },
  data() {
    return {
      brandId: '',
      chatbotId: '',
      pageTitle: '',
      twowayChatbotData: {},
      psMenuList: [],
      topMenuList: [], // 상위메뉴 리스트
      subMenuList: [] // 하위메뉴 리스트
    }
  },
  computed: {
    isA2pChatbot() { return this.twowayChatbotData.service === 'a2p' } // 발신번호 기반 대화방 여부
  },
  created() {
    this.brandId = this.$route.params.brandId
    this.chatbotId = this.$route.params.chatbotId
    this.init()
  },
  methods: {
    async init() {
      let twowayInfo = await getTwowayChatbotDetail(this.brandId, { chatbotId: this.chatbotId }).catch(() => {})
      if (twowayInfo.code === '20000000') {
        this.twowayChatbotData = twowayInfo.result
        this.pageTitle = this.twowayChatbotData.subTitle + ' 대화방 메뉴'
      }
      let psMenuInfo = await getPersistentDetail(this.brandId, { brandId: this.brandId, chatbotId: this.chatbotId }).catch(() => {})
      // 등록된 대화방 메뉴가 있음
      if (psMenuInfo.result.length > 0) {
        // upPostbackId 의 유무로 상위/하위 메뉴를 나눈다.
        this.topMenuList = psMenuInfo.result.filter(menu => jglib.isEmpty(menu.upPostbackId))
        this.subMenuList = psMenuInfo.result.filter(menu => !jglib.isEmpty(menu.upPostbackId))
        this.psMenuList = parsePersistentMenu(this.topMenuList, this.subMenuList)
      }
    },
    remove() {
      this.$confirmMsg('대화방메뉴를 삭제 하시겠습니까?').then(() => {
        let data = { chatbotId: this.twowayChatbotData.chatbotId }
        deletePersistentMenu(this.brandId, data).then(res => {
          if (res.code === '20000000') this.goList()
        }).catch((err) => {
          this.$alertMsg(err.desc).then(() => {})
        })
      })
    },
    goWrite() {
      this.$router.push({
        name: 'ChatRoomMenuWrite',
        params: {
          brandId: this.brandId,
          chatbotId: this.chatbotId
        }
      })
    },
    goList() {
      this.$router.push({ name: 'ChatRoomMenuList', params: { brandId: this.brandId } })
    }
  }
}
</script>
