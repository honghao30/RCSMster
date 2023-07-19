<template>
  <div class="template-cmp-table simple">
    <ul class="description" :key="j">
      <li v-for="(item, index) in info.content" :key="index">
        <div class="item-label">
            <span v-if="item.itemLabel">{{ item.itemLabel }}</span>
            <span v-else>내용 입력</span>
        </div>
        <div class="item-data">
            <span v-if="item.itemData">{{ item.itemData }}</span>
            <span v-else>내용 입력</span>
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
