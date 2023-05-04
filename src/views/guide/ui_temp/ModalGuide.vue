<template>
  <div class="tmep__wrap">
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>모달에 대한 가이드 입니다.</li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="모달 가이드" />
    <div class="wsg-guide-content">
      <div class="button__wrap">
        <ButtonCmp
          type="green"
          icondrection="left"
          iconname="icon-add"
          @click="isModalViewed = true"
        >
          모달1
        </ButtonCmp>
        <ModalView
          v-if="isModalViewed" @closeModal="isModalViewed = false"
        >
          <ModalCont1 />
        </ModalView>
      </div>
    </div>
  </div>
</template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ModalCont1 from './ModalCont1.vue'

export default {
  components: {
    TitleH3,
    ButtonCmp,
    ModalView,
    ModalCont1
  },
  data() {
    return {
      isModalViewed: false
    }
  },
  watch: {
    isModalViewed () {
      if (this.isModalViewed) {
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  methods: {
  }
}
</script>
