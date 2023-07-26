<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <!-- 테이블: 제목 -->
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
                    @input="e => info.title = e.target.value"
                    placeholder="타이틀을 입력해주세요."
                  >
                  <div class="input-limit__text">
                    <p>{{ info.title.length }}/30자</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <!-- 본문: 테이블 -->
      <tr>
        <th scope="row"><span class="form-item__label required">본문</span></th>
        <td>
          <div class="form-item__content">
            <!-- [07.25 수정] 템플릿 데이터 반복되는 구간 변경 및 버튼 위치 변경-->
            <div class="form-item-row form-template" v-for="(item, j) in info.content" :key="j">
              <div class="input-item input-limit input-left">
                <div class="input">
                  <input type="text" class="input" maxlength="4"
                    @input="e => item.itemLabel = e.target.value"
                    placeholder="소제목을 입력해주세요."
                  >
                  <div class="input-limit__text">
                    <p>{{ item.itemLabel.length }}/4자</p>
                  </div>
                </div>
              </div>
              <div class="input-item input-limit input-right">
                <div class="input">
                  <input type="text" class="input" maxlength="33"
                    @input="e => item.itemData = e.target.value"
                    placeholder="내용을 입력해주세요."
                  >
                  <div class="input-limit__text">
                    <p>{{ item.itemData.length }}/33자</p>
                  </div>
                </div>
                <!-- [07.25 수정] 삭제 버튼 위치 변경-->
                <ButtonCmp
                  type="btn-default-line"
                  size="small"
                  @click="removeRow(j)"
                  :disabled="info.content.lenght < 1"
                >
                  삭제
                </ButtonCmp>
              </div>
            </div>
            <div class="form-item-row">
              <ButtonCmp
                type="btn-default-line"
                size="medium"
                @click="addTableRows"
              >
              + 추가하기
              </ButtonCmp>
            </div>
            <!-- // [07.25 수정] 템플릿 데이터 반복되는 구간 변경 및 버튼 위치 변경-->
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
