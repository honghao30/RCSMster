<template>
  <div class="desc-area table">
    <p class="subtitle">
      <span v-if="info.title" >{{ info.title }}</span>
      <span v-else>제목을 입력하세요.</span>
    </p>
    <ul class="description" v-if="info.description">
      <li v-for="(item, i) in info.description" :key="i" :class="{ 'border' : item.tableLine}">
        <div class="item-label" v-if="item.colNum == 2">
            <span v-if="item.itemLabel">{{ item.itemLabel }}</span>
            <span v-else>내용</span>
        </div>
        <div class="item-data">
            <span v-if="item.itemData">{{ item.itemData }}</span>
            <span v-else>내용</span>
        </div>
      </li>
    </ul>
    <ul v-else class="description">
      <li>
        <span class="item-label">
            <span>내용</span>
        </span>
        <span class="item-data">
            <span>내용</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>

</style>
