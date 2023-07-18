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
              <span class="input">
                <input type="text" class="input" :value="form.imageFile" disabled>
              </span>
              <input type="file" id="fileUp" class="input blind"
              @change="onFileChanged">
              <label for="fileUp" class="btn btn-default-line">파일 선택</label>
            </div>
            <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
            <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
            <div class="input-item input-limit input-url">
              <div class="input">
                <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                ref="imageURL"
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
      type: Object
    }
  },
  data(){
    return{
      form: {
        ImageTall:{
          info:{
            imageOptions: 'square',
            imageFile: '',
            imageURL: ''
          }
        }
      }
    }
  },
  methods: {
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.form.logoFile = fileName
      this.url = URL.createObjectURL(file)
    },
  }
}
</script>

<style lang="scss">

</style>
