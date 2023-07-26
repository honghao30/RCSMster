<template>
  <div
    class="modal__content--inner zipcode__modal select_menu"
  >
    <div class="modal__content--header">
      <p class="modal-title">간편 챗봇 연결</p>
    </div>
    <div class="modal__content--body">
      <div class="search__wrap">
        <div class="search-result__wrap">
          <div class="table__wrap">
              <table class="table table-list">
                <colgroup>
                  <col width="10%">
                  <col width="">
                  <col width="30%">
                  <col width="25%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" colspan="2"><span>간편챗봇 ID</span></th>
                    <th scope="col"><span>간편 챗봇이름</span></th>
                    <th scope="col"><span>유형</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in autoReplyList" :key="i">
                    <td>
                      <span class="radiobox">
                        <input type="radio" :id="`item${i+1}`" :value="i" v-model="radiochk" @change='changeMsg(item)'>
                        <label :for="`item${i+1}`"></label>
                      </span>
                    </td>
                    <td class="l-align">
                      <span>{{ item.autoReplyMsgName }}</span>
                    </td>
                    <td>
                      <span>{{ item.autoReplyMsgId }}</span>
                    </td>
                    <td>
                      <span>{{ item.autoReplyMsgTypeNm }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
          <PagingCmp :total='totalCount' :current-page='searchParam.page' :page-size='searchParam.size' @change='changePage'  />
        </div>
        <!-- <div class="empty-emulator" v-if="radiochk">
          <p></p>
        </div> -->
        <autoReplyMsgEmulator
          :chatInfoData="autoReplyMsgData"
          :brandInfoData='brandInfo'
        />
      </div>
    </div>
    <div class="modal__content--footer">

      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <!-- 간편챗봇 메시지 연결 버튼 클릭 시 간편챗봇 명 출력 및 연결 처리 -->
        <ButtonCmp
          type="btn-blue"
          @click="selectMsg()"
          :disabled="totalCount === 0"
        >간편챗봇 연결</ButtonCmp>
        <!-- //간편챗봇 메시지 연결 버튼 클릭 시 간편챗봇 명 출력 및 연결 처리 -->
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import { reformSuggestForView, retireveAutoReplyList } from '@/api/service/autoReply'
import autoReplyMsgEmulator from '@/views/brand/autoreply/components/autoReplyMsgEmulator.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    autoReplyMsgEmulator,
    ButtonCmp,
    PagingCmp
  },
  data() {
    return {
      isAllChecked: false,
      radiochk: 0,
      chatInfoData: {
        chatRoomName: '대화방 명',
        saftyMark: 'Y',
        mode: 'views',
        chatType: '',
        hideInputFooter: true
      },
      chatMsgData: {
        chatType: 'card',
        imgSize: 'medium',
        chatCardTitle: 'Y',
        chatCardContent: 'Y',
        chipBtnUse: 'Y',
        chipButtons: [{
          btnName: '🎀 상담직원연결 👋​'
        }],
        msgData: [{
          index: 1,
          imgFile: 'dummy/template_image.png',
          title: '커피 한잔의 여유를 가지는 시간',
          cardContent: '화창한 날씨의 오후 시트러스함과 달콤함의 조화로 행복하고 향긋한 기운을 느껴보세요. <br> 인상적인 커피 아로마의 조화에 향긋한 커피향으로 기분 좋은 커피 모먼트를 즐겨보세요.',
          btnUse: 'Y',
          btnDirection: 'column',
          buttons: [{
            btnName: '사용자 위치 공유하기'
          },
          {
            btnName: '간편챗봇 연결'
          }]
        }]
      },
      form: {
        type: 'gallery',
        feedDate: '4월 19일 오후 3:00',
        feedTitle: 'SK 텔레콤의 스마트한 제안​',
        feedContent: 'SK텔레콤을 다양하게 만나보세요! #SKT Insight · SK텔레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube ​레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube ​레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube',
        imgFiles: ['dummy/feed_image_02.png']
      },
      searchParam: {
        offset: 1,
        orderKey: 'newest',
        orderValue: '',
        page: 1,
        size: '20',
        aprvRet: 'OK'
      },
      totalCount: 0,
      autoReplyList: [],
      autoReplyMsgData: {},
      chipBtns: [],
      brandId: ''
    }
  },
  created() {
    this.brandId = this.$router.currentRoute.params.brandId
  },
  mounted() {
    this.getList()
  },
  computed: {
    ...mapGetters('brand', {
      brandInfo: 'getBrandDetail'
    })
  },
  methods: {
    getList () {
      retireveAutoReplyList(this.brandId, this.searchParam).then(res => {
        this.autoReplyList = res.result
        this.totalCount = res.pagination.total
        this.changeMsg(this.autoReplyList[0])
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    /** 페이지 변경 */
    changePage(page) {
      this.radiochk = 0
      this.updatePageData(page)
      this.getList()
    },
    /** 페이지 정보 변경 */
    updatePageData(page) {
      this.searchParam.page = page
    },
    changeMsg(msg) {
      this.autoReplyMsgData = reformSuggestForView(this.brandId, msg, { cardType: msg.cardType })
    },
    selectMsg() {
      this.$emit('chooseAutoReplyMsg', this.autoReplyMsgData)
      this.$emit('closeModal')
    }
  }
}
</script>

<style>
</style>
