<template>
  <table class="table table-bodyonly form-table">
   <colgroup>
     <col width="180px">
     <col />
   </colgroup>
   <tbody>
    <tr v-for="(detail, index) in detailTemplate" :key="index">
      <th scope="row"><span class="form-item__label required">상세  {{ index + 1 }}</span></th>
      <td>
        <div class="form-item__content">
          <div class="form-item-row form-template">
            <div class="input-item input-left">
              <span class="input">
                <input type="text" class="input" disabled>
              </span>
              <input type="file" id="fileUp" class="input blind"
              @change="onFileChanged">
              <label for="fileUp" class="btn btn-default-line">파일 선택</label>
            </div>
            <div class="template-detail">
              <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
              <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
              <div class="input-item input-url">
                <div class="input">
                  <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="detail.url"
                  ref="imageURL"
                  />
                </div>
              </div>
            </div>
            <div class="input-item input-limit input-right">
              <div class="input">
                <input type="text" class="input" maxlength="33"
                  v-model="detail.detailContent"
                  placeholder="내용을 입력해주세요."
                  ref="detailContent"
                >
                <div class="input-limit__text">
                  <p>{{ detail.detailContent.length }}/33자</p>
                </div>
              </div>
            </div>
            <div class="template-button">
              <ButtonCmp
                type="btn-default-line"
                size="small"
                @click="removedetail"
              >
                삭제
              </ButtonCmp>
              <ButtonCmp
                type="btn-default-line"
                size="medium"
                @click="Adddetail"
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
  data() {
    return {
      detailTemplate: [
        {
          detailContent: '',
          url: ''
        }
      ]
    }
  }
}
</script>

<style>

</style>
