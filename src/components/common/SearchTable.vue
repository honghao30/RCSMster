<template>
  <div class="search-table">
    <div class="select">
      <select name="" id="selectValue">
        <option value="1">선택 1</option>
        <option value="2">선택 2</option>
        <option value="3">선택 3</option>
      </select>
    </div>
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
export default {
  props: {
    pagetitle: String,
    listnumber: Number
  },
  components: {
    ButtonCmp
  }
}
</script>

<style lang="scss">

</style>
