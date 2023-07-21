<template>
  <div class="template-cmp-table simple">
    <div class="table-cmp-title" v-if="info.titleUse == 'Y'">
      <span v-if="info.title">{{ info.title }}</span>
      <span v-else>제목을 입력해주세요.</span>
    </div>
    <ul class="description" :key="j">
      <li v-for="(item, index) in info.content" :key="index">
        <div class="item-label">
            <span v-if="item.itemLabel">{{ item.itemLabel }}</span>
            <span v-else>소제목</span>
        </div>
        <div class="item-data">
            <span v-if="item.itemData">{{ item.itemData }}</span>
            <span v-else>내용을 입력하세요.</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: null
    }
  }
}
</script>

<style>

</style>
