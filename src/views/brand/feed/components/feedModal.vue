<template>
  <div
    class="modal__content--inner small-message__modal"
    :class="modalsize"
  >
    <div class="modal__content--body">
      <slot name="msg">
        <div class="msg brand-info__msg" slot="msg">
          <h3>이미지 등록/편집</h3>
          <div class="msg__file">
            <p>등록된 이미지는 드래그로 순서 변경이 가능합니다.</p>
            <div class="input-item">
              <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
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
              v-for="imgFile in fileList" :key="imgFile"
              class="msg__image-item"
            >
              {{ imgFile }}
            </div>
          </draggable>
        </div>
      </slot>
    </div>
    <div class="modal__content--footer">
      <slot name="button">
        <div class="button__wrap" slot="button">
            <ButtonCmp
            type="btn-line"
            @click="closeMsg"
            >
              취소
            </ButtonCmp>
            <ButtonCmp
            type="btn-blue"
            @click="closeMsg"
            >
              저장
            </ButtonCmp>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

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
  },
  data() {
    return {
      fileList: ['file1', 'file2', 'file3', 'file4', 'file5', 'file6', 'file7', 'file8', 'file9', 'file10']
    }
  },
  methods: {
    moveChage () {
      this.$router.push('./pwFind')
    }
  }
}
</script>

<style>

</style>
