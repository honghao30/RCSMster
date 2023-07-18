<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <tr v-for="(thum, i) in thumnails" :key="i">
        <th scope="row"><span class="form-item__label required">상세 이미지 {{ i+1 }}</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item">
                <span class="input">
                  <input type="text" class="input" :value="thum.file" disabled>
                </span>
                <input type="file" id="fileUp" class="input blind"
                @change="onFileChanged1">
                <label for="fileUp" class="btn btn-default-line">파일 선택</label>
              </div>
              <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
              <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
              <div class="input-item input-limit input-url">
                <div class="input">
                  <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="thum.url"
                  />
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
export default {
  data() {
    return {
      thumnails: [
        {
          file: '',
          url: ''
        },
        {
          file: '',
          url: ''
        }
      ]
    }
  }
}
</script>

<style>

</style>
