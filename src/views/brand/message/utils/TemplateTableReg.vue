<template>
  <div class="input-item table-warp">
    <div class="flex-row flex-warp table-item-row" v-for="(item, i) in tableInfo.list" :key="i">
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
        <div class="font-style"><TableTextStyleInput :target="`row${i+1}Col1`" :info.sync="item.subTitle" :index="`itemT${i+1}`" /></div>
        <div class="font-style" v-show="item.colNum == 2"><TableTextStyleInput :target="`row${i+1}Col2`" :info.sync="item.subDesc" :index="`itemD${i+1}`"/></div>
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
          v-if="tableInfo.list.length > tableInfo.minCnt"
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
        v-if="tableInfo.list.length < tableInfo.maxCnt"
      >
        + 추가하기
      </ButtonCmp>
    </div>
  </div>
</template>

<script>

import ButtonCmp from '@/components/common/ButtonCmp.vue'
import TableTextStyleInput from '@/components/common/TableTextStyleInput.vue'

export default {
  components: {
    ButtonCmp,
    TableTextStyleInput
  },
  props: {
    tableInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log('여기까지 값 옴' , this.tableInfo)
  },
  methods: {
    addTableRows () {
      let tblRows = { 
        subTitle: {
          text: '',
          textAlign: 'left',
          textBold: '',
          textColor: '#000000',
          textSize: '14'
        },
        subMedia: '', 
        subMediaUrl: '', 
        subDesc: {
          text: '',
          textAlign: 'left',
          textBold: '',
          textColor: '#000000',
          textSize: '14'
        }, 
        fileSrc: '', 
        fileType: '', 
        fileName: '', 
        fileUrl: '', 
        fileSize: 0,
        line: false,
        colNum: '2'
      }
      if (this.tableInfo.list.length < 10) {
        this.tableInfo.list.push(tblRows)
      }
    },
    removeRow (index) {
      if (this.tableInfo.list.length > 1) {
        this.tableInfo.list.splice(index, 1)
      }
    }
  }
}
</script>
