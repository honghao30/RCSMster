<template>
  <div
    class="modal__content--inner zipcode__modal select_menu"
  >
    <div class="modal__content--header">
      <p class="modal-title">브랜드 소식 연결</p>
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
                    <th scope="col" colspan="2"><span>브랜드 소식 ID</span></th>
                    <th scope="col"><span>브랜드 소식 이름</span></th>
                    <th scope="col"><span>유형</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in brandFeedList" :key="i">
                    <td>
                      <span class="radiobox">
                        <input type="radio" :id="`item${i+1}`" :value="i" v-model="radiochk" @change='changeMsg(item)'>
                        <label :for="`item${i+1}`"></label>
                      </span>
                    </td>
                    <td class="l-align">
                      <span>{{ item.title }}</span>
                    </td>
                    <td>
                      <span>{{ item.feedId }}</span>
                    </td>
                    <td>
                      <span>{{ item.feedType }}</span>
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
import { brandFeedList } from '@/api/service/autoReply'

export default {
  components: {
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
      searchParam: {
        offset: 1,
        page: 1,
        size: '20',
        status: 'ok'
      },
      totalCount: 0,
      brandFeedList: [],
      brandFeedData: {},
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
  methods: {
    getList () {
      brandFeedList(this.brandId, this.searchParam).then(res => {
        this.brandFeedList = res.result.list
        this.totalCount = res.result.total
        this.changeMsg(this.brandFeedList[0])
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
    changeMsg(feed) {
      this.brandFeedData = feed
    },
    selectMsg() {
      this.$emit('chooseBrandNews', this.brandFeedData)
      this.$emit('closeModal')
    }
  }
}
</script>

<style>
</style>
