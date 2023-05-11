<template>
  <div class="search-table">
    <Dropdown :options=dropdownOptions v-if="selectable"/>
    <div class="input">
      <input type="text" placeholder="검색어를 입력해 주세요.">
    </div>
    <div class="input-m">
      <input type="text" placeholder="검색어 입력">
    </div>
    <ButtonCmp
      type="search"
    >
      검색
    </ButtonCmp>
    <p class="list-number">
      총 {{ listnumber }}건
    </p>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'

export default {
  props: {
    pagetitle: String,
    listnumber: Number,
    dropdownOptions: Object,
    selectable: Boolean
  },
  components: {
    ButtonCmp,
    Dropdown
  }
}
</script>

<style lang="scss">

</style>
