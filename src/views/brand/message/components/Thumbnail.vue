<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <tr v-for="(thum, idx) in bodyInfo.list" :key="idx">
        <th scope="row"><span class="form-item__label required">상세 이미지 {{ idx+1 }}</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item">
                <span class="input">
                  <input type="text" class="input" :value="thum.fileName" disabled>
                </span>
                <input type="file" :id="`thumbnailFile_${idx}`" class="input blind"
                @change="onFileChanged($event, idx)">
                <label :for="`thumbnailFile_${idx}`" class="btn btn-default-line">파일 선택</label>
              </div>
              <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
              <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
              <div class="input-item input-limit input-url">
                <div class="input">
                  <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="thum.mediaUrl"
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
import { MessageBox } from 'element-ui'

export default {
  props: {
    compoInputObj: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      bodyInfo: this.compoInputObj[0]
    }
  },
  methods: {
    // 이미지 파일 업로드
    onFileChanged(e, index) {
      console.log(e)
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      const url = URL.createObjectURL(file)
      if (file.size > 1048576) {
        MessageBox.alert('1MB 이하 파일만 등록 가능합니다.')
        return false
      }

      this.bodyInfo.list[index].fileName = fileName
      this.bodyInfo.list[index].fileSrc = url
    }
  }
}
</script>

<style>

</style>
