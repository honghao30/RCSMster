<template>
  <div class="rcs_container service_wrap" v-if="visible">
    <div tabindex="0" class="layer active">
      <div tabindex="0" class="layer_cont">
        <div class="layer_head">
          <div class="title_wrap mar_b20">
            <span class="h4_title bold">회신번호 선택</span>
            <span class="h4_desc bold">- 양방향 대화방의 회신번호로 설정할 발신번호를 선택해 주세요.<br/>
              - 비전시 상태의 발신번호는 회신 번호로 선택할 수 없습니다.</span>
          </div>
          <div class="search_wrap">
            <div class="cont_flex_bundle">
              <span class="custom_input">
                <input type="text" v-model="searchParam.keyword" @keypress.enter="search" placeholder="발신번호를 검색하세요.">
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
                    <th scope="col">발신번호 목록</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in mdnList" :key="index">
                    <td>
                      <span class="custom_radio single">
                        <input type="radio" name="radio" @change="selectMdn(item.mdn)" :id="`radio_${item.mdn}`" :disabled="item.display.substring(1, 2) === '0'">
                        <label :style="item.display.substring(1, 2) === '0' ? 'cursor: not-allowed' : ''" :for="`radio_${item.mdn}`"></label>
                      </span>
                    </td>
                    <td>
                      <label :for="`radio_${item.mdn}`">
                        <span v-if="item.display.substring(1, 2) === '0'" style="color: #999999;">{{ item.mdn }} [비전시]</span>
                        <span v-else>{{ item.mdn }}</span>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Pagination v-if="totalCount > 0" :total="totalCount" :pageSize="searchParam.size" :currentPage.sync="searchParam.page" @change="changePage"/>
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
import Pagination from '@/components/Pagination'
export default {
  name: 'ChatbotSubNumPopup',
  components: {
    Pagination
  },
  props: {
    visible: { type: Boolean },
    brandId: { type: String, default: '' },
    chatbotType: { type: String }
  },
  data() {
    return {
      selectedMdn: '',
      mdnList: [],
      totalCount: 0,
      originSearchParam: null,
      searchParam: {
        keyword: '',
        size: 10,
        page: 1
      }
    }
  },
  created() {
    this.updateOriginSearchParam()
    this.getMdnList()
  },
  methods: {
    getMdnList() {
      let reqData = { isTwoWay: 'Y', twoWayYn: '', ...this.originSearchParam }
      getOnewayChatbotList(this.brandId, reqData).then(res => {
        this.mdnList = res.result.list
        this.totalCount = res.result.totalSize
      })
    },
    search() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getMdnList()
    },
    selectMdn(mdn) {
      this.selectedMdn = mdn
    },
    modifyMdn() {
      if (jglib.isEmpty(this.selectedMdn)) {
        this.$alertMsg('번호가 선택되지 않았습니다.')
      } else this.sendMdn()
    },
    updatePageData(page) {
      this.searchParam.page = page
      this.originSearchParam.page = page
    },
    updateOriginSearchParam() {
      this.originSearchParam = _.cloneDeep(this.searchParam)
    },
    changePage(page) {
      this.updatePageData(page)
      this.getMdnList()
    },
    sendMdn() {
      this.$emit('selectedMdn', this.selectedMdn)
      this.$emit('update:visible', false)
    },
    cancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
