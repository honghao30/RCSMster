<template>
  <div class="rcs_container service_wrap" v-if="visible">
    <div tabindex="0" class="layer active">
      <div tabindex="0" class="layer_cont">
        <div class="layer_head">
          <div class="search_wrap">
            <div class="cont_flex_bundle">
              <span class="custom_input">
                <input type="text" v-model="keyword" @keypress.enter="search" placeholder="발신번호를 검색하세요.">
              </span>
              <a href="javascript:void(0);" class="btn sml gray" @click="search">
                <span>검색</span>
              </a>
            </div>
          </div>
        </div>
        <div class="layer_body" v-if="mdnList.length !== 0">
          <div class="layer_scroll">
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
                  <tr v-for="(item, index) in mdnList" :key="index">
                    <td>
                      <span class="custom_radio single">
                        <input type="radio" name="radio" @change="selectMdn(item)" :id="`radio_${item.mdn}`" :checked="item.defMdnYn === 'Y'">
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
          <!-- 발신번호를 선택 안한 경우 -->
          <div class="box_result_info center" v-if="selectedMdn.length === 0">
            <p class="no_select">발신번호를 선택하세요.</p>
          </div>
          <div class="btn_wrap mar_t30">
            <a href="javascript:void(0);" class="btn sml bd_black type2" @click="cancel"><span>닫기</span></a>
            <a href="javascript:void(0);" class="btn sml black" @click="modifyMdn"><span>확인</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { retrieveMdnList, setModifyMdn } from '@/api/service/approvalBrand'

export default {
  name: 'ApprovalBrandCallingNumberPopup',
  data() {
    return {
      selectedMdn: '',
      selectedSubTitle: '',
      keyword: '',
      mdnList: []
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    brandId: {
      type: String
    },
    def: {
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
        brandId: this.brandId,
        keyword: keyword
      }
      retrieveMdnList(reqData).then(res => {
        this.mdnList = res.result
        this.mdnList.find(s => s.mdn === this.def).defMdnYn = 'Y'
        this.mdnList.sort((x, y) => x.defMdnYn === 'Y' ? -1 : y.defMdnYn === 'Y' ? 1 : 0)
      })
    },
    search() {
      this.getMdnList(this.keyword)
    },
    selectMdn(data) {
      this.selectedMdn = data.mdn
      this.selectedSubTitle = data.subTitle
    },
    modifyMdn() {
      let reqData = {
        brandId: this.brandId,
        mdn: this.selectedMdn,
        subTitle: this.selectedSubTitle
      }
      setModifyMdn(reqData).then(() => {
        this.$emit('mdn', reqData)
        this.$emit('update:visible', false)
      })
    },
    cancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped></style>
