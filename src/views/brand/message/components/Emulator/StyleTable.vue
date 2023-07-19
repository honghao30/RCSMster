<template>
    <div class="template-cmp-table">
      <template  v-for="(tbl, j) in info">
        <div class="table-cmp-title" v-if="tbl.tableTitle" :key="j">{{ tbl.tableTitle }}</div>
        <ul class="description" :key="j">
          <li v-for="(item, index) in tbl.content" :key="index" :class="{ 'border' : item.line }">
            <div class="item-label">
                <span v-if="item.itemLabel" :style="itemLabelStyle">{{ item.itemLabel }}</span>
                <span v-else>내용 입력</span>
            </div>
            <div class="item-data" v-if="item.colNum == 2">
                <span v-if="item.itemData" :style="itemDataStyle">{{ item.itemData }}</span>
                <span v-else>내용 입력</span>
            </div>
          </li>
        </ul>
      </template>
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
