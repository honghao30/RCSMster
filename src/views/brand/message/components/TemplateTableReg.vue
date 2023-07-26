<template>
  <div class="input-item table-warp">
    <div class="flex-row flex-warp table-item-row" v-for="(item, i) in tableInfo" :key="i">
      <div class="flex-radio">
        <span class="icon-radio">
          <input type="radio" :id="`col1_${i+1}`" :name="`colNum${i+1}`" v-model="item.colNum" value="1" class="blind">
          <label :for="`col1_${i+1}`">
            <i class="icon-row"></i>
          </label>
        </span>
        <span class="icon-radio">
          <input type="radio" :id="`col2_${i+1}`" :name="`colNum${i+1}`" v-model="item.colNum" value="2" class="blind">
          <label :for="`col2_${i+1}`">
            <i class="icon-justify"></i>
          </label>
        </span>
      </div>
      <div class="flex-input">
        <div class="font-style"><textStyleInput  :info="item.itemLabel" index="itemL" /></div>
        <div class="font-style" v-show="item.colNum == 2"><textStyleInput :info="item.itemData" index="itemD"/></div>
      </div>
      <!-- 기존 라인 부분 -->
      <div class="flex-btn">
        <ButtonCmp
          type="btn-default-line"
          size="small"
          @click="item.line = !item.line"
        >
          라인
        </ButtonCmp>
        <ButtonCmp
          type="btn-default-line"
          size="small"
          v-if="tableInfo.length > 1"
          @click="removeRow(i)"
        >
          삭제
        </ButtonCmp>
      </div>
    </div>
    <div class="flex-row flex-start table-item-row">
      <ButtonCmp
        type="btn-default-line"
        @click="addTableRows"
        v-if="tableInfo.length <= 10"
      >
        + 추가하기
      </ButtonCmp>
    </div>
  </div>
</template>

<script>

import ButtonCmp from '@/components/common/ButtonCmp.vue'
import TextStyleInput from '@/components/common/TextStyleInput.vue'

export default {
  components: {
    ButtonCmp,
    TextStyleInput
  },
  props: {
    tableInfo: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      styleText: ''
    }
  },
  mounted() {
  },
  methods: {
    addTableRows () {
      let tblRows = {
        line: false,
        colNum: '1',
        itemLabel: {},
        itemData: {},
      }
      if (this.tableInfo.length < 10) {
        this.tableInfo.push(tblRows)
      }
    },
    removeRow (index) {
      if (this.tableInfo.length > 1) {
        this.tableInfo.splice(index, 1)
      }
    }
  }
}
</script>
