<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <!-- 테이블- 제목 -->
      <tr>
        <th scope="row"><span class="form-item__label required">테이블 - 제목</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item input-limit">
                <div class="input">
                  <input type="text" placeholder="제목을 입력해주세요." maxlength="17" v-model="form.Table.tableTitle"
                  @input="e => form.Table.tableTitle = e.target.value"
                  ref="tableTitle"
                  />
                  <div class="input-limit__text">
                    <p>{{ form.Table.tableTitle.length }}/17자</p>
                  </div>
                </div>
              </div>
              <TemplateTableReg
                :tableInfo="form.Table.info"
                v-if="form.tableUse === 'Y'"
              />
            </div>
          </div>
        </td>
      </tr>
      <!-- 테이블- 내용 -->
      <tr>
        <th scope="row"><span class="form-item__label required">테이블 - 내용</span></th>
        <td>
          <div class="form-item__content">
            <p class="text-limit">
              0/90자
            </p>
            <div class="form-item-row">
              <template>
                <TemplateTableReg
                  :tableInfo="form.Table.info"
                />
              </template>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
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
          tableTitle: '',
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
      },
    }
  }
}
</script>

<style>

</style>
