<template>
  <table class='table table-bodyonly form-table'>
    <colgroup>
      <col width='180px'>
      <col />
    </colgroup>
    <tbody>
    <tr>
      <th scope='row'><span class='form-item__label required'>배너 이미지</span></th>
      <td>
        <div class='form-item__content'>
          <div class='form-item-row'>
            <div class='input-item'>
              <span class='input'>
                <input type='text' class='input' :value='mainImgInfo.fileName' disabled>
              </span>
              <input type='file' id='fileUp' class='input blind'
                     @change='onFileChanged'>
              <label for='fileUp' class='btn btn-default-line'>파일 선택</label>
            </div>
            <p class='guide-text black'>&middot; 파일형식: PNG, GIF (최대 1MB)</p>
            <p class='guide-text black'>&middot; 권장 사이즈: 900*225px</p>
            <div class='input-item input-limit input-url'>
              <div class='input'>
                <input type='text' placeholder='http로 시작하는 URL 주소를 입력해주세요.' v-model='mainImgInfo.mediaUrl'
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
    componentParam: {
      type: Object,
      default: null
    },
    compoInputObj: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      mainImgInfo: this.compoInputObj[0]
    }
  },
  computed: {
    componentRule() {
      const map = {}
      if (this.componentParam && this.componentParam['CP-ImageSquare']) {
        for (const obj of this.componentParam['CP-ImageSquare']) {
          if (obj.ctnType === 'maapfile') {
            map[obj.paramNm] = {
              imgHeight: obj.imgHeight,
              imgWidth: obj.imgWidth
            }
          } else {
            map[obj.paramNm] = obj.strSize
          }
        }
      }
      return map
    }
  },
  methods: {
    // 이미지 파일 업로드
    onFileChanged(e) {
      const files = e.target.files
      const file = files[0]
      console.log('ImageSquare file', file)
      const fileName = file.name
      if (file.size > 1048576) {
        MessageBox.alert('1MB 이하 파일만 등록 가능합니다.')
        return false
      }
      this.mainImgInfo.fileName = fileName
      this.mainImgInfo.fileSize = file.size
      this.mainImgInfo.fileType = file.type
      this.mainImgInfo.fileSrc = URL.createObjectURL(file)
    }
  }
}
</script>

<style lang='scss'>

</style>
