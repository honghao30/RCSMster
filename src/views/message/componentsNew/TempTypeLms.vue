<template>
  <div class="templet__wrap is-lms">
    <div class="text-title"
      :class="TitleTypes"
    >
      <p class="top-text" v-if="topsmTitle !== ''">{{ topsmTitle }}</p>
      <h4>LMS 컴포넌트 포멧</h4>
      <p class="sub-text"  v-if="subtitle !== ''">{{ subtitle }}</p>
    </div>
    <div class="template-text">
      <p class="title">RCS메시지는 어떻게 보내죠?</p>
      브랜드의 성공적인 비즈니스를 위하여
RCS Biz Centert에서 다양한 메시지를 만들어보세요.<br><br></br>

브랜드의 성공적인 비즈니스를 위하여
RCS Biz Centert에서 다양한 메시지를 만들어보세요.<br></br>
브랜드의 성공적인 비즈니스를 위하여
RCS Biz Centert에서 다양한 메시지를 만들어보세요.
    </div>
    <div class="template-footer"
      :class="buttonDrections"
    >
       <ButtonCmp
        type="btn-line"
       >
        버튼 레벨
      </ButtonCmp>
      <ButtonCmp
        type="btn-line"
       >
        버튼 레벨
      </ButtonCmp>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  props: {
    TitleTypes: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    topsmTitle: {
      type: String,
      default: ''
    },
    buttonDrections: String
  },
  components: { ButtonCmp }
}
</script>
