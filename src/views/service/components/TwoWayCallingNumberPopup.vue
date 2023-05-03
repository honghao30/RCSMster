<template>
  <div class="rcs_container service_wrap" v-if="visible">
    <div tabindex="0" class="layer active">
      <div tabindex="0" class="layer_cont">
        <div class="layer_head">
          <div class="search_wrap">
            <div class="cont_flex_bundle">
              <span class="custom_input">
                <input
                  type="text"
                  v-model="keyword"
                  @keypress.enter="search"
                  placeholder="발신번호를 검색하세요."
                >
              </span>
              <a href="javascript:void(0);" class="btn sml gray" @click="search">
                <span>검색</span>
              </a>
            </div>
          </div>
        </div>
        <div class="layer_body" v-if="mdnList.length !== 0">
          <div class="layer_scroll scrollRow10">
            <div class="search_result">
              <!-- 검색 결과-->
              <table class="tbl_col_type">
                <colgroup>
                  <col style="width:45px">
                  <col style="width:auto">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">발신번호</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- 길어서 주석처리 -->
                  <tr v-for="(item, index) in mdnList" :key="index">
                    <td>
                      <span class="custom_radio single">
                        <input
                          type="radio"
                          name="radio"
                          @change="selectMdn(item.mdn, item.rcsReply, item.subTitle)"
                          :id="`radio_${item.mdn}`"
                        >
                        <label :for="`radio_${item.mdn}`"></label>
                      </span>
                    </td>
                    <td>
                      <label :for="`radio_${item.mdn}`">{{item.mdn}}</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="layer_foot">
          <div class="box_result_info center" v-if="mdnList.length === 0">
            <p>검색 결과가 없습니다.</p>
          </div>
          <div class="btn_wrap mar_t30">
            <a href="javascript:void(0);" class="btn sml bd_black type2" @click="cancel">
              <span>닫기</span>
            </a>
            <a href="javascript:void(0);" class="btn sml black" @click="modifyMdn">
              <span>확인</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOnewayChatbotList } from '@/api/service/chatbot'

export default {
  name: 'ApprovalBrandCallingNumberPopup',
  data() {
    return {
      selectedMdn: '',
      keyword: '',
      mdnList: [],
      rcsReply: '',
      selectedSubTitle: ''
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    brandId: {
      type: String
    },
    twoWayType: {
      type: String
    }
  },
  created() {
    this.getMdnList()
  },
  mounted() {},
  computed: {},
  methods: {
    getMdnList(keyword) {
      let reqData = {
        keyword: keyword,
        isTwoWay: 'Y',
        twoWayYn: this.twoWayType === 'a2p' ? 'N' : '',
        twoWayType: this.twoWayType
      }
      getOnewayChatbotList(this.brandId, reqData).then(res => {
        this.mdnList = res.result.list
      })
    },
    search() {
      this.getMdnList(this.keyword)
    },
    selectMdn(mdn, rcsReply, subTitle) {
      this.rcsReply = rcsReply
      this.selectedMdn = mdn
      this.selectedSubTitle = subTitle
    },
    modifyMdn() {
      if (jglib.isEmpty(this.selectedMdn)) {
        this.$alertMsg('번호가 선택되지 않았습니다.')
        return false
      }
      if (this.rcsReply === '0' && this.twoWayType === 'a2p') {
        this.$confirmMsg(`선택하신 발신번호는 대표번호 문자수신서비스를 사용 중입니다. 양방향 대화방을 등록할 경우,
          대표번호 문자수신 서비스는 사용할 수 없습니다. 양방향 대화방 등록을 계속 진행하시겠습니까?`)
          .then(res => {
            this.sendMdn()
          })
          .catch(res => {
            return false
          })
      } else {
        this.sendMdn()
      }
    },
    sendMdn() {
      // let reqData = {
      //   brandId: this.brandId,
      //   mdn: this.selectedMdn
      // }
      // setModifyMdn(reqData).then(res => {
      //   this.$emit('mdn', this.selectedMdn)
      //   this.$emit('update:visible', false)
      // })
      this.$emit('mdn', this.selectedMdn)
      this.$emit('selectedSubTitle', this.selectedSubTitle)
      this.$emit('update:visible', false)
    },
    cancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped></style>
