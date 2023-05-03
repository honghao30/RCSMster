<template>
  <div class="rcs_emul_form_step">
    <h3 class="h3_title fs20 mar_b10 mar_t40">STEP 3. 서비스 관리 항목</h3>
    <!-- 카테고리 1 -->
    <div class="rcs_item_bundle extra_bd_t pdtop10" v-if="resignation">
      <strong class="rcs_tit_bundle">카테고리 1</strong>
      <div class="rcs_cont_bundle">{{ bizCateGrpText }}</div>
    </div>
    <div class="rcs_item_bundle extra_bd_t pdtop10" v-else>
      <strong class="rcs_tit_bundle">카테고리 1<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_select mid">
          <select ref="bizCateGrp" v-model="bizCateGrp" @change="changeCategory(bizCateGrp)">
            <option value>선택하세요</option>
            <option v-for="item in bizCateGrpList" :value="item.code" :key="item.code">{{ item.codeNm }}</option>
          </select>
        </span>
      </div>
    </div>
    <!-- 카테고리 2 -->
    <div class="rcs_item_bundle" v-show="resignation">
      <strong class="rcs_tit_bundle">카테고리 2</strong>
      <div class="rcs_cont_bundle">{{ bizCateCdText }}</div>
    </div>
    <div class="rcs_item_bundle" v-show="!resignation">
      <strong class="rcs_tit_bundle">카테고리 2<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_select mid">
          <select ref="bizCateCd" v-model="bizCateCd">
            <option value>선택하세요</option>
            <option v-for="item in bizCateCdList" :value="item.code" :key="item.code">{{ item.codeNm }}</option>
          </select>
        </span>
      </div>
    </div>
    <!-- 카테고리 3 -->
    <div class="rcs_item_bundle" v-show="resignation">
      <strong class="rcs_tit_bundle">카테고리 3</strong>
      <div class="rcs_cont_bundle">{{ getApprovalBrandList.cate3 }}</div>
    </div>
    <div class="rcs_item_bundle" v-show="!resignation">
      <strong class="rcs_tit_bundle">카테고리 3</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <input type="text" placeholder="검색용 키워드를 입력하세요" v-model.trim="cate3" maxlength="20">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { retrieveCommonCode } from '@/api/common/code'

export default {
  props: {
    brandId: {
      type: String
    },
    RESPONSE: {
      type: Object
    }
  },
  data() {
    return {
      // 승인상태값
      resignation: true,
      bizCateGrp: '',
      bizCateGrpText: '',
      bizCateGrpList: [],
      bizCateCd: '',
      bizCateCdText: '',
      bizCateCdList: [],
      cate3: '',
      getApprovalBrandList: []
    }
  },
  created() {
    const res = this.RESPONSE
    this.getApprovalBrandList = res.result
    if (this.getApprovalBrandList.aprvRet === 'WAITING' || this.getApprovalBrandList.aprvRet === 'INSPECTED' || this.getApprovalBrandList.aprvRet === 'INSPECTING' || this.$store.state.user.userCd === 'AGENCY') {
      this.resignation = true
    } else if (this.getApprovalBrandList.aprvRet === 'REJECTED' || this.getApprovalBrandList.aprvRet === 'SAVED' || this.getApprovalBrandList.aprvRet === 'OK') {
      this.resignation = false
    }
    this.cate3 = this.getApprovalBrandList.cate3

    retrieveCommonCode('BIZ_CATE_GRP', null, 'Y').then(res2 => {
      this.bizCateGrpList = res2.result
      this.bizCateGrp = this.getApprovalBrandList.bizCateGrp
      for (let i = 0; i < this.bizCateGrpList.length; i++) {
        if ((this.getApprovalBrandList.aprvRet === 'WAITING' || this.getApprovalBrandList.aprvRet === 'INSPECTED' || this.getApprovalBrandList.aprvRet === 'INSPECTING' ||
            this.$store.state.user.userCd === 'AGENCY') && this.getApprovalBrandList.bizCateGrp === this.bizCateGrpList[i].code) {
          this.bizCateGrpText = this.bizCateGrpList[i].codeNm
        }
      }
    })
    retrieveCommonCode('BIZ_CATE_GRP', this.getApprovalBrandList.bizCateGrp, 'Y').then(res => {
      this.bizCateCdList = res.result
      for (let i = 0; i < this.bizCateCdList.length; i++) {
        if (this.bizCateCdList[i].code === this.getApprovalBrandList.bizCateCd) {
          this.bizCateCd = this.bizCateCdList[i].code
        }
      }
      for (let i = 0; i < this.bizCateCdList.length; i++) {
        if ((this.getApprovalBrandList.aprvRet === 'WAITING' || this.getApprovalBrandList.aprvRet === 'INSPECTED' || this.getApprovalBrandList.aprvRet === 'INSPECTING' ||
            this.$store.state.user.userCd === 'AGENCY') && this.getApprovalBrandList.bizCateCd === this.bizCateCdList[i].code) {
          this.bizCateCdText = this.bizCateCdList[i].codeNm
        }
      }
    })
  },
  methods: {
    changeCategory(bizCateGrp) {
      retrieveCommonCode('BIZ_CATE_GRP', bizCateGrp, 'Y').then(res => {
        this.bizCateCd = ''
        this.bizCateCdList = res.result
      })
    },
    validation() {
      if (jglib.isEmpty(this.bizCateGrp)) {
        this.$refs.bizCateGrp.focus()
        this.$alertMsg('카테고리1을 선택해 주세요.')
        return false
      }
      if (jglib.isEmpty(this.bizCateCd)) {
        this.$refs.bizCateCd.focus()
        this.$alertMsg('카테고리2을 선택해 주세요.')
        return false
      }
      return true
    },
    getCateInfo() {
      return {
        bizCateGrp: this.bizCateGrp,
        bizCateCd: this.bizCateCd,
        cate3: this.cate3
      }
    }
  }
}
</script>
