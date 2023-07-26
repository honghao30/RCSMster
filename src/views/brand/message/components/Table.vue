<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <!-- 테이블- 제목 -->
      <tr>
        <th scope="row"><span class="form-item__label">타이틀</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item">
                <span class="radiobox">
                  <input type="radio" name="titleUse" id="titleUseN" value="N" v-model="info.titleUse"/>
                  <label for="titleUseN"><span class="radiobox__text">미사용</span></label>
                </span>
                <span class="radiobox">
                  <input type="radio" name="titleUse" id="titleUseY" value="Y" v-model="info.titleUse"/>
                  <label for="titleUseY"><span class="radiobox__text">사용</span></label>
                </span>
              </div>
              <div class="input-item input-limit" v-if="info.titleUse === 'Y'">
                <div class="input">
                  <input type="text" class="input" maxlength="30"
                    @input="e => info.tableTitle = e.target.value"
                    placeholder="타이틀을 입력해주세요."
                  >
                  <div class="input-limit__text">
                    <p>{{ info.tableTitle.length }}/30자</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row"><span class="form-item__label required">본문</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <p class="text-limit">
                0/90자
              </p>
            </div>
            <div class="form-item-row">
              <div class="input-item table-warp">
                <div class="flex-row flex-warp table-item-row" v-for="(item, i) in info.content" :key="i">
                  <div class="flex-input">
                    <div class="input">
                      <input type="text" @input="e => item.itemLabel = e.target.value" />
                    </div>
                    <div class="input">
                      <input type="text" @input="e => item.itemLabel = e.target.value">
                    </div>
                  </div>
                  <!-- 기존 라인 부분 -->
                  <div class="flex-btn">
                    <ButtonCmp
                      type="btn-default-line"
                      size="small"
                      v-if="info.content.length > 1"
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
                    v-if="info.content.length <= 10"
                  >
                    + 추가하기
                  </ButtonCmp>
                </div>
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
    }
  },
  methods: {
    addTableRows () {
      let tblRows = {
        itemLabel: '',
        itemData: ''
      }
      if (this.info.content.length < 10) {
        this.info.content.push(tblRows)
      }
    },
    removeRow (index) {
      if (this.info.content.length > 1) {
        this.info.content.splice(index, 1)
      }
    }
  }
}
</script>

<style>

</style>
