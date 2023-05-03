<template>
  <div class="layer big active" style="overflow: auto; overscroll-behavior: none;">
    <div class="layer_cont">
      <div class="layer_head">
        <h2>이미지 템플릿 변수 작성 안내</h2>
      </div>
      <div class="layer_body">
        <a id="btn_close" href="javascript:void(0)" onclick class="btn_close" @click="closePopup"></a>
        <div class="howto_image">
          <div class="img">
            <p>템플릿 등록 작성 예시</p>
            <img src="@/assets/images/common/howtoimage.png" alt="이미지 템플릿 등록 방법 샘플">
          </div>
          <div class="txt">
            <ul>
              <li>고정부 및 변수명에 들어가는 메시지는 합쳐서 각 영역 별 최대 글자 수 이내로 작성해주세요.</li>
              <li>템플릿 등록 시 각 변수명은 최대 20자 입력할 수 있습니다.</li>
              <li>변수 명에 대해서는 한글, 영문, 숫자, ‘_’ 만 입력할 수 있습니다.</li>
              <li v-text="`변수로 설정하고자 하는 내용을 \{\{ \}\} 표시로 작성해 주세요.  예) \{\{이름\}\}, \{\{date\}\}`"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageTemplateVariableGuidePopup',
  props: {
    visible: {
      type: Boolean
    }
  },
  methods: {
    closePopup() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.howto_image {
  display: flex;
}
.howto_image .img { text-align: center; margin-right: 20px; }
.howto_image .img p { font-size: 16px; margin-bottom: 5px; font-weight: 600; color:#000; }

.howto_image .txt { padding: 20px; background:#f6f6f6; margin-top: 20px; width: calc( 100% - 263px); border-radius: 3px; }
.howto_image .txt li { position: relative; padding-left: 20px; font-size: 16px; font-weight: 400; color:#666666; margin-bottom:10px; line-height: 140%; }
.howto_image .txt li:after { position: absolute; content:""; width: 5px; height: 1px; background: #666666; top: 13px; left:0; }

</style>
