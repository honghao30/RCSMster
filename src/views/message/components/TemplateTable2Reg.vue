<template>
  <div class="form-item__content">
    <div class="form-item-row">
      <div class="input-item">
        <div class="inner-table flex-row" v-for="(item, i) in tableInfo.description" :key="i">
          <div class="flex-row">
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
          <div>
            <span class="input flex-row">
              <input type="text" v-model="item.itemLabel"/>
              <input type="text" v-if="item.colNum == 2" v-model="item.itemData"/>
            </span>
          </div>
          <div>
            <span class="checkbox">
              <input type="checkbox" :id="`chkLine${i+1}`" v-model="item.tableLine"/>
              <label :for="`chkLine${i+1}`"></label>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Dropdown from '@/components/common/Dropdown.vue'

export default {
  components: {
    Dropdown
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
      }]
    }
  },
  mounted() {
  },
  methods: {
    changetableRow () {
      let row = this.tableInfo.tableRowNum
      let tableData = this.tableInfo.description
      let tableLength = tableData.length
      let diff = row - tableLength
      let tableItem = {
        line: false,
        colNum: '1',
        itemLabel: '',
        itemData: ''
      }
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          tableData.push(tableItem)
        }
      } else if (diff < 0) {
        for (let i = 0; i < -diff; i++) {
          tableData.pop()
        }
      }
    }
  }
}
</script>

<style>

</style>
