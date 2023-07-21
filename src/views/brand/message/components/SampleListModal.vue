<template>
  <div
    class="modal__content--inner zipcode__modal "
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">샘플 메시지</p>
    </div>
    <div class="modal__content--body">
      <div class="template-sample__list">
        <ul>
          <li v-for="(item, i) in sampleList" :key="i" class="sample-item">
            <span class="radiobox">
              <input type="radio" name="sample" :id="`sample${i+1}`" />
              <label :for="`sample${i+1}`">
                <span class="radiobox__text">{{ item.templateTitle }}</span>
                <div class="sample-img">
                  <img :src="item.templateImg" alt="">
                </div>
              </label>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >확인</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    ButtonCmp
  },
  props: {
    modalsize: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sampleList: [
        {
          templateTitle: '기본 SMS',
          templateImg: require('@/assets/images/message/text_template_01.png')
        },
        {
          templateTitle: '안내 문구 메시지',
          templateImg: require('@/assets/images/message/text_template_05.png')
        },
        {
          templateTitle: '샘플 메시지 제목 1',
          templateImg: require('@/assets/images/message/text_template_04.png')
        },
        {
          templateTitle: '기본 SMS',
          templateImg: require('@/assets/images/message/lms_template_04.png')
        },
        {
          templateTitle: '안내 문구 메시지',
          templateImg: require('@/assets/images/message/lms_template_01.png')
        },
        {
          templateTitle: '샘플 메시지 제목 1',
          templateImg: require('@/assets/images/message/image_template_01.png')
        }
      ]
    }
  },
  mounted() {
  }

}
</script>

<style>

</style>
