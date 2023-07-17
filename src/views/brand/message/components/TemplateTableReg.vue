<template>
  <div class="input-item table-warp">
    <div class="flex-row flex-warp table-item-row" v-for="(item, i) in tableInfo.description" :key="i">
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
        <div class="font-style"><textStyleInput :target="`row${i+1}Col1`" v-model="item.itemLabel" /></div>
        <div class="font-style" v-show="item.colNum == 2"><textStyleInput :target="`row${i+1}Col2`" v-model="item.itemData" /></div>
        {{ item.itemLabelStyle }}
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
          v-if="tableInfo.description.length > 1"
          @click="removeRow(index)"
        >
          삭제
        </ButtonCmp>
      </div>
    </div>
    <div class="flex-row flex-start table-item-row">
      <ButtonCmp
        type="btn-default-line"
        @click="addTableRows"
        v-if="tableInfo.description.length <= 10"
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
      type: Object,
      default: null
    }
  },
  data() {
    return {
      tableContentNumOption: [{
        label: '1개',
        value: 1
      },
      {
        label: '2개',
        value: 2
      },
      {
        label: '3개',
        value: 3
      }],
      rowStyleLy: false
    }
  },
  mounted() {
  },
  methods: {
    addTableRows () {
      let tblRows = {
        line: false,
        colNum: '1',
        itemLabel: '',
        itemData: '',
        itemDataStyle: '',
        itemLabelStyle: ''
      }
      if (this.tableInfo.description.length < 10) {
        this.tableInfo.description.push(tblRows)
        console.log('테이블 추가', tblRows)
      }
    },
    removeRow (index) {
      if (this.tableInfo.description.length > 1) {
        this.tableInfo.description.splice(index, 1)
      }
    },
    onSetStyle(e) {
    }
  }
}
</script>
