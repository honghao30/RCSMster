<template>
  <table class="table table-bodyonly form-table">
   <colgroup>
     <col width="180px">
     <col />
   </colgroup>
   <tbody>
    <tr>
      <th scope="row"><span class="form-item__label required">이미지</span></th>
      <td>
        <div class="form-item__content">
          <div class="form-item-row">
            <div class="input-item">
              <span class="radiobox">
                <input type="radio" name="imageOptions" id="imageOptionsSquare" value="square" v-model="info.imgType"/>
                <label for="imageOptionsSquare"><span class="radiobox__text">정방형 (1:1)</span></label>
              </span>
              <span class="radiobox">
                <input type="radio" name="imageOptions" id="imageOptionsVertical" value="tall" v-model="info.imgType"/>
                <label for="imageOptionsVertical"><span class="radiobox__text">세로형 (3:4)</span></label>
              </span>
            </div>
          </div>
          <div class="form-item-row">
            <div class="input-item">
              <span class="input">
                <input type="text" class="input" :value="info.imgFile" disabled>
              </span>
              <input type="file" id="fileUp" class="input blind"
              @change="onFileChanged">
              <label for="fileUp" class="btn btn-default-line">파일 선택</label>
            </div>
            <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
            <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
            <div class="input-item input-limit input-url">
              <div class="input">
                <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="info.imgUrl"
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
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  methods: {
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.info.imgFile = fileName
      this.url = URL.createObjectURL(file)
    }
  }
}
</script>

<style lang="scss">

</style>
