<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <!-- 테이블- 제목 -->
      <tr v-for="(item, i) in form.tableContent" :key="item">
        <th scope="row"><span class="form-item__label required">본문 {{ i+1 }}</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row form-template">
                <div class="input-item input-limit input-left">
                  <div class="input">
                    <input type="text" class="input" maxlength="4"
                      v-model="item.bodyTitle"
                      placeholder="소제목을 입력해주세요."
                    >
                    <div class="input-limit__text">
                      <p>{{ item.bodyTitle.length }}/4자</p>
                    </div>
                  </div>
                </div>
                <div class="input-item input-limit input-right">
                  <div class="input">
                    <input type="text" class="input" maxlength="33"
                      v-model="item.bodyContent"
                      placeholder="내용을 입력해주세요."
                      ref="bodyContent"
                    >
                    <div class="input-limit__text">
                      <p>{{ item.bodyContent.length }}/33자</p>
                    </div>
                  </div>
                </div>
                <div class="template-button">
                  <ButtonCmp
                    type="btn-default-line"
                    size="small"
                  >
                    삭제
                  </ButtonCmp>
                  <ButtonCmp
                    type="btn-default-line"
                    size="medium"
                  >
                  + 추가하기
                  </ButtonCmp>
                </div>
              </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    ButtonCmp
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
        tableContent: [
          {
            bodyTitle: '',
            bodyContent: ''
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
