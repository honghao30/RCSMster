<template>
  <div
    class="modal__content--inner small-message__modal"
    :class="modalsize"
  >
    <div class="modal__content--body">
      <div class="msg brand-info__msg">
        <h3>이미지 등록/편집</h3>
        <div class="msg__file">
          <p>등록된 이미지는 드래그로 순서 변경이 가능합니다.</p>
          <div class="input-item">
            <input type="file" id="fileUp" class="input blind"  @change="onFileChanged">
            <label for="fileUp" class="btn btn-line">파일찾기</label>
          </div>
        </div>
        <ul>
          <li>이미지 사이즈 / 용량 : 700px * 600px~1080px / 최대 3MB</li>
          <li>파일종류: JPG, PNG, GIF</li>
          <li>이미지는 필수 1장, 최대 10장까지 등록 가능 합니다.</li>
        </ul>
        <draggable
          class="msg__image-container"
          v-model="fileList"
        >
          <div
            v-for="imgFile in displayedFileList" :key="imgFile"
            class="msg__image-item"
          >
            <img
             :src="imgFile.url"
             alt=""
            />
            <span class="irtext">{{ imgFile.fileName }}</span>
          </div>
        </draggable>
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-line"
          @click="$emit('closeModal')"
        >취소</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="$emit('modalSave')"
        >저장</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import draggable from 'vuedraggable'

export default {
  components: {
    ButtonCmp,
    draggable
  },
  props: {
    messages: String,
    modalsize: {
      type: String,
      default: ''
    }
    // fileList: {
    //   type: Array
    // }
  },
  data() {
    return {
      fileList: [ ]
    }
  },
  computed: {
    displayedFileList() {
      const emptyFileList = Array(10).fill({ fileName: '', url: '' })
      return this.fileList.length
        ? this.fileList
        : emptyFileList
    }
  },
  methods: {
    onFileChanged (e) {
      const files = e.target.files
      const file = e.target.files[0]
      this.fileName = files[0].name
      this.url = URL.createObjectURL(file)
      if (this.fileList.length < 10) {
        this.fileList.push({
          fileName: this.fileName,
          url: this.url
        })
      } else {
        alert('파일은 10개만 올릴수 있습니다.')
      }
      console.log(this.upfileList)
    }
  }
}
</script>

<style>

</style>
