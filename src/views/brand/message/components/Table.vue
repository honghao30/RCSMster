<template>
  <tr>
    <th scope="row"><span class="form-item__label required">테이블</span></th>
    <td>
      <div class="form-item__content">
        <div class="form-item-row">
          <div class="input-item">
            <span class="radiobox">
              <input type="radio" name="tableUse" id="tableUseN" value="N" v-model="form.tableUse"/>
              <label for="tableUseN"><span class="radiobox__text">미사용</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" name="tableUse" id="tableUseY" value="Y" v-model="form.tableUse"/>
              <label for="tableUseY"><span class="radiobox__text">사용</span></label>
            </span>
          </div>
          <TemplateTableReg
            :tableInfo="form.Table.info"
            v-if="form.tableUse === 'Y'"
          />
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import TemplateTableReg from '@/views/brand/message/components/TemplateTableReg.vue'
export default {
  components: {
    TemplateTableReg
  },
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        Table: {
          info: {
            tableRowNum: 1,
            description: [
              {
                line: false,
                colNum: '1',
                itemLabel: '',
                itemData: ''
              }
            ]
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
