<template>
  <table class='table table-bodyonly form-table'>
    <colgroup>
      <col width='180px'>
      <col />
    </colgroup>
    <tbody>
    <tr>
      <th scope='row'><span class='form-item__label required'>가로형 이미지</span></th>
      <td>
        <div class='form-item__content'>
          <div class='form-item-row'>
            <div class='input-item'>
              <span class='radiobox'>
                <input type='radio' name='imageOptions' id='imageOptionsSquare' value='square'
                       v-model='mainImgInfo.imgType' />
                <label for='imageOptionsSquare'><span class='radiobox__text'>정방형 (1:1)</span></label>
              </span>
              <span class='radiobox'>
                <input type='radio' name='imageOptions' id='imageOptionsVertical' value='tall'
                       v-model='mainImgInfo.imgType' />
                <label for='imageOptionsVertical'><span class='radiobox__text'>세로형 (3:4)</span></label>
              </span>
            </div>
          </div>
          <div class='form-item-row' v-if="mainImgInfo.imgType === 'square'">
            <div class='inner__input'>
              <div class='inner__input-box'>
                <span class='form-item__label required'>이미지</span>
                <div class='inner__input-item'>
                  <div class='input-item'>
                  <span class='input'>
                    <input type='text' class='input' :value='mainImgInfo.fileName' disabled>
                  </span>
                    <input type='file' id='fileUp' class='input blind'
                           @change='onFileChanged'>
                    <label for='fileUp' class='btn btn-default-line'>파일 선택</label>
                  </div>
                  <p class='guide-text black'>&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                  <p class='guide-text black'>&middot; 권장 사이즈: 900*900px(또는 1:1 비율)</p>
                </div>
              </div>
            </div>
            <div class='inner__input'>
              <div class='inner__input-box'>
                <span class='form-item__label'>URL</span>
                <div class='inner__input-item'>
                  <div class='input-item input-limit'>
                    <div class='input'>
                      <input type='text' placeholder='http로 시작하는 URL 주소를 입력해주세요.' v-model='mainImgInfo.mediaUrl'
                             ref='imageURL'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='form-item-row' v-if="mainImgInfo.imgType === 'tall'">
            <div class='inner__input'>
              <div class='inner__input-box'>
                <span class='form-item__label required'>이미지</span>
                <div class='inner__input-item'>
                  <div class='input-item'>
                  <span class='input'>
                    <input type='text' class='input' :value='mainImgInfo.fileName' disabled>
                  </span>
                    <input type='file' id='fileUp' class='input blind'
                           @change='onFileChanged'>
                    <label for='fileUp' class='btn btn-default-line'>파일 선택</label>
                  </div>
                  <p class='guide-text black'>&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                  <p class='guide-text black'>&middot; 권장 사이즈: 900*1200px(또는 1:1 비율)</p>
                </div>
              </div>
            </div>
            <div class='inner__input'>
              <div class='inner__input-box'>
                <span class='form-item__label'>URL</span>
                <div class='inner__input-item'>
                  <div class='input-item input-limit'>
                    <div class='input'>
                      <input type='text' placeholder='http로 시작하는 URL 주소를 입력해주세요.' v-model='mainImgInfo.mediaUrl'
                             ref='imageURL'
                      />
                    </div>
                  </div>
                </div>
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
  name: 'ImageVertical',
  props: {
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
  methods: {
    // 이미지 파일 업로드
    onFileChanged(e) {
      const files = e.target.files
      const file = files[0]
      console.log('ImageVertical -', this.mainImgInfo.imgType, ' file', file)
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
