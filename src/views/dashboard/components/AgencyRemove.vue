<template>
  <div
    class="modal__content--inner"
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">대행사 삭제</p>
    </div>
    <div class="modal__content--body">
      <div class="top-notice--center">
        <p>선택한 대행사로 등록된 <span class="agency-num">{{ agencyChatRoomData.length }}개</span>의 대화방이 있습니다.<br>
        대행사를 삭제하면 연결된 대화방이 ‘비전시’됩니다.<br>
        대행사를 삭제하시겠습니까?</p>
      </div>
      <div class="search-result__wrap">
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col>
              <col>
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>대화방명</span></th>
                <th scope="col"><span>대화방 ID</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in agencyChatRoomData" :key="i">
                <td class="l-align">
                  <span>{{ item.subTitle }}</span>
                </td>
                <td class="l-align"><span>{{ item.chatbotId }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="remove-des">&middot; 해당 대화방을 계속 사용하시려면 대행사를 변경하셔야 합니다.</p>
      </div>
      <div class="remove-chk">
        <span class="checkbox">
          <input type="checkbox" id="checkRemove" v-model="chkRemove"/>
          <label for="checkRemove"><span class="checkbox__text">대행사가 등록한 대화방도 ‘비전시’됩니다.</span></label>
        </span>
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <!-- 삭제 버튼 > 권한 리스트에서 해당 대행사 즉시 삭제 -->
        <ButtonCmp
          type="btn-blue"
          @click="$emit('authRemove')"
          :disabled="this.chkRemove.length < 1"
        >삭제</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { retrieveChatbotByAgencyList } from '@/api/service/manage'

export default {
  components: {
    ButtonCmp
  },
  props: {
    modalsize: {
      type: String,
      default: ''
    },
    manageItem: {
      type: Object
    },
    paramCorpId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isAllChecked: false,
      chkRemove: [],
      agencyChatRoomData: []
    }
  },
  created() {
    this.getChatbotByAgency()
  },
  computed: {
    corpId() {
      if (this.paramCorpId) {
        return this.paramCorpId
      } else {
        return this.$router.currentRoute.params.corpId
      }
    }
  },
  methods: {
    getChatbotByAgency() {
      retrieveChatbotByAgencyList(this.corpId, { brandId: this.manageItem.brandId, mgrUserId: this.manageItem.mgrUserId }).then((res) => {
        if (res.code === '20000000') {
          this.agencyChatRoomData = res.result
        }
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    }
  }
}
</script>

<style>
</style>
