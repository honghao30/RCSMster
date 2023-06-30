<template>
  <div class="form-item__content">
    <div class="form-item-row">
      <div class="inner__input">
        <div class="inner__input-box">
          <span class="form-item__label">내용</span>
          <div class="inner__input-item">
            <div class="input-item">
              <Dropdown v-model="tableInfo.tableRowNum" :options="tableContentNumOption" @change="changetableRow"/>
            </div>
            <div class="input-item">
              <p class="item-title">테이블 1</p>
            </div>
            <div class="input-item">
              <div class="inner-table table__wrap">
                <table class="table table-list">
                  <colgroup>
                    <col width="62px"/>
                    <col width="114px"/>
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th><span>라인</span></th>
                      <th><span>배열</span></th>
                      <th><span>내용</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in tableInfo.description" :key="i">
                      <td>
                        <span class="checkbox">
                          <input type="checkbox" :id="`chkLine${i+1}`" v-model="item.tableLine"/>
                          <label :for="`chkLine${i+1}`"></label>
                        </span>
                      </td>
                      <td>
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
                      </td>
                      <td>
                        <div class="flex-row">
                          <span class="input">
                            <input type="text" v-model="item.itemLabel"/>
                          </span>
                          <span class="input" v-if="item.colNum == 2">
                            <input type="text" v-model="item.itemData"/>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
