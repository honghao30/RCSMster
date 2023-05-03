<template>
  <div class="rcs_emul_form_step">
    <h3 class="h3_title fs20 full_width">STEP 3. 서비스 관리 항목</h3>
    <div class="rcs_item_bundle mar_t20">
      <strong class="rcs_tit_bundle">카테고리 1<span class="require">*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <select ref="bizCateGrp" v-model="bizCateGrp" @change="changeCategory" class="custom_select02">
            <option value>선택하세요</option>
            <option v-for="item in bizCateGrpList" :value="item.code" :key="item.code">{{ item.codeNm }}</option>
          </select>
        </span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">
        카테고리 2
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <select ref="bizCateCd" v-model="bizCateCd" class="custom_select02">
            <option value>선택하세요</option>
            <option v-for="item in bizCateCdList" :value="item.code" :key="item.code">{{ item.codeNm }}</option>
          </select>
        </span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">
        카테고리 3
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input"><input v-model.trim="cate3" type="text" placeholder="검색용 키워드를 입력하세요" maxlength="20"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { retrieveCommonCode } from '@/api/common/code'

export default {
  props: {
    loadBrandInfo: {
      type: Object,
      require: false
    }
  },
  data() {
    return {
      bizCateCd: '',
      bizCateCdList: [],
      bizCateGrp: '',
      bizCateGrpList: [],
      cate3: ''
    }
  },
  watch: {
    loadBrandInfo: {
      deep: true,
      handler(brandInfo) {
        // 카테고리 1, 2
        if (brandInfo.bizCateGrp) {
          this.bizCateGrp = brandInfo.bizCateGrp
          this.changeCategory(brandInfo.bizCateCd)
        }
        // 카테고리 3
        this.cate3 = brandInfo.cate3 ? brandInfo.cate3 : ''
      }
    }
  },
  created() {
    // 카테고리1 리스트 가져오는 함수
    retrieveCommonCode('BIZ_CATE_GRP', null, 'Y').then(res => {
      this.bizCateGrpList = res.result
    })
  },
  methods: {
    changeCategory(bizCateCd) {
      retrieveCommonCode('BIZ_CATE_GRP', this.bizCateGrp, 'Y')
        .then(res => {
          this.bizCateCd = ''
          this.bizCateCdList = res.result
        })
        .finally(() => {
          if (bizCateCd && typeof bizCateCd === 'string') {
            this.bizCateCd = bizCateCd
          }
        })
    },
    validation() {
      if (jglib.isEmpty(this.bizCateGrp)) {
        this.$alertMsg('카테고리1을 선택해 주세요.')
        this.$refs.bizCateGrp.focus()
        return false
      }
      if (jglib.isEmpty(this.bizCateCd)) {
        this.$alertMsg('카테고리2를 선택해 주세요.')
        this.$refs.bizCateCd.focus()
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
