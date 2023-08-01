<template>
    <div class="form-item__content">
      <div class="form-item-row">
        <div class="input-item">
          <span class="radiobox">
            <input type="radio" name="imgSize" id="full" value="full" v-model="imgSize" @change="updateParentData" /> <!-- 기획서 v1.0 수정 --모달창 추가(p.20) -->
            <label for="full"><span class="radiobox__text">900 * 900px</span></label>
          </span>
          <span class="radiobox">
            <input type="radio" name="imgSize" id="medium" value="medium" v-model="imgSize" @change="updateParentData" /> <!-- 기획서 v1.0 수정 --모달창 추가(p.20) -->
            <label for="medium"><span class="radiobox__text">900 * 1,200px</span></label>
          </span>
        </div>
      </div>
      <div class="form-item-row">
        <div class="input-item">
          <span class="input"><input type="text" v-model="imgFile" disabled placeholder="이미지를 등록해주세요."></span>
          <input type="file" id="fileUp" class="input" @change="onFileUpload" >
          <label for="fileUp"
            class="btn btn-default-line"
          >파일찾기</label>
        </div>
        <!-- :disabled="isSlideCardEdit"  :class="{'inactive' : isSlideCardEdit }" -->
        <p class="guide-text black">&middot; 파일형식: JPG, PNG, GIF, BMP<br>(최대 1MB, 단, 동일한 파일을 등록하는 경우 크기에 합산되지 않습니다.)</p>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    imgSize: String,
    imgFile: String
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$watch('imgFile', function(newVal, oldVal) {
      console.log(newVal, this.imgFile)
    })
  },
  methods: {
    onFileUpload(event) {
      const imgFile = event.target.files[0]
      const file = imgFile
      const fileName = file.name
      this.imgFile = fileName
      this.url = URL.createObjectURL(file)
      console.log(imgFile)
      // this.$emit('fileUpload', {
      //   imgSize: this.imgSize,
      //   imgFile: imgFile
      // })
    },
    updateParentData () {
      this.$emit('update:imgSize', this.imgSize)
    }
  }
}
</script>

<style>
</style>
