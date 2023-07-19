<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <template v-for="(item, i) in info">
      <!-- 테이블- 제목 -->
        <tr v-if="item.useSelect === 'Y'" :key="i">
          <th scope="row"><span class="form-item__label">테이블<span v-if="info.length > 1">{{ i+1 }}</span></span></th>
          <td>
            <div class="form-item__content">
              <div class="form-item-row">
                <div class="input-item">
                  <span class="radiobox">
                    <input type="radio" name="tableUse" id="tableUseN" value="N"
                      v-model="tableUse"
                    />
                    <label for="tableUseN">미사용</label>
                  </span>
                  <span class="radiobox">
                    <input type="radio" name="tableUse" id="tableUseY" value="Y"
                      v-model="tableUse"
                    />
                    <label for="tableUseY">사용</label>
                  </span>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr :key="i" v-if="!(item.useSelect === 'Y' && tableUse === 'N')">
          <th scope="row"><span class="form-item__label required">테이블<span v-if="info.length > 1">{{i+1}}</span> - 제목</span></th>
          <td>
            <div class="form-item__content">
              <div class="form-item-row">
                <div class="input-item input-limit">
                  <div class="input">
                    <input type="text" placeholder="제목을 입력해주세요." maxlength="17"
                    @input="e => item.tableTitle = e.target.value"
                    ref="tableTitle"
                    />
                    <div class="input-limit__text">
                      <p>{{ item.tableTitle.length }}/17자</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <!-- 테이블- 내용 -->
        <tr :key="i" v-if="!(item.useSelect === 'Y' && tableUse === 'N')">
          <th scope="row"><span class="form-item__label required">테이블<span v-if="info.length > 1">{{i+1}}</span> - 내용</span></th>
          <td>
            <div class="form-item__content">
              <p class="text-limit">
                0/90자
              </p>
              <div class="form-item-row">
                <template>
                  <TemplateTableReg
                    :tableInfo="item.content"
                  />
                </template>
              </div>
            </div>
          </td>
        </tr>
      </template>
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
    tableIndex: {
      type: Number,
      default: null
    },
    info: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      tableUse: 'N'
    }
  }
}
</script>

<style>

</style>
