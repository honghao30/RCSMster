<template>
  <div class="claim_wrap">
    <p>수정이 필요한 항목을 선택해주세요.</p>
    <div v-if="codeDep1.length > 0" class="BtnsSTyle">
      <a v-for="dep1 in codeDep1" :key="dep1.code" @click="selectCode(dep1)">{{ dep1.codeNm }}</a>
    </div>
    <ul>
        <li>수신 문자 및 브랜드가 제공하는 서비스와 관련된 요청은 해당 브랜드로 문의해주세요. </li>
        <li>잘못된 수정 제안으로 인해 브랜드와 다른 사용자들이 피해 받지 않도록, 신중하게 작성해주세요.</li>
    </ul>
  </div>
</template>

<script>
import store from '@/store'
import { retrieveCommonCode } from '@/api/common/code'
export default {
  name: 'BrandClaimStep1',
  data() {
    return {
      codeDep1: []
    }
  },
  created() {
    this.setCode()
  },
  methods: {
    async setCode() {
      let res = await retrieveCommonCode('VOC_CATE_1D')
      this.codeDep1 = res.result.map(x => { return { code: x.code, codeNm: x.codeNm } }).filter(x => x.code !== 'ETC')
      store.dispatch('SetLoading', false)
    },
    selectCode(code) {
      this.$emit('selectVocCateCd1', code)
    }
  }
}
</script>
