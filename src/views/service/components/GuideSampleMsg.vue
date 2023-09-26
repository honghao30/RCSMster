<template>
  <div
    class="modal__content--inner zipcode__modal"
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">샘플 메시지</p>
    </div>
    <div class="modal__content--body">
      <div class="template-sample__list guide-msg-modal">
        <ul>
          <li v-for="(item, i) in guideSamlpeMsgList" :key="i" class="sample-msg-item">
            <div class="sample-tit">{{ item.title }}</div>
            <div class="sample-img mt-t6">
              <img :src="item.samlpeMsgImg" alt="" class="only-pc">
              <img :src="item.samlpeMsgImgMo" alt="" class="only-mo">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
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
    },
    sampleList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      guideSamlpeMsgList: [
        {
          title: '기본 SMS',
          samlpeMsgImg: require('@/assets/images/guide/guide_samlpe_msg_list_01.png'),
          samlpeMsgImgMo: require('@/assets/images/guide/guide_samlpe_msg_list_01_mo.png')
        },
        {
          title: '안내 문구 메시지',
          samlpeMsgImg: require('@/assets/images/guide/guide_samlpe_msg_list_02.png'),
          samlpeMsgImgMo: require('@/assets/images/guide/guide_samlpe_msg_list_02_mo.png')
        },
        {
          title: '샘플 메시지 제목 1',
          samlpeMsgImg: require('@/assets/images/guide/guide_samlpe_msg_list_03.png'),
          samlpeMsgImgMo: require('@/assets/images/guide/guide_samlpe_msg_list_03_mo.png')
        },
        {
          title: '기본 SMS',
          samlpeMsgImg: require('@/assets/images/guide/guide_samlpe_msg_list_04.png'),
          samlpeMsgImgMo: require('@/assets/images/guide/guide_samlpe_msg_list_04_mo.png')
        },
        {
          title: '안내 문구 메시지',
          samlpeMsgImg: require('@/assets/images/guide/guide_samlpe_msg_list_05.png'),
          samlpeMsgImgMo: require('@/assets/images/guide/guide_samlpe_msg_list_05_mo.png')
        },
        {
          title: '샘플 메시지 제목 1',
          samlpeMsgImg: require('@/assets/images/guide/guide_samlpe_msg_list_06.png'),
          samlpeMsgImgMo: require('@/assets/images/guide/guide_samlpe_msg_list_06_mo.png')
        }
      ]
    }
  },
  methods: {
  }
}
</script>
