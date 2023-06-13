<template>
  <div class="tmep__wrap">
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>모달에 대한 가이드 입니다.</li>
          <li>slot형으로 ModalView 컴포넌트에서 딤처리등 이벤트를 처리 합니다.</li>
          <li>구조에 대한 설명 입니다.</li>
          <li>** 향후 진행되는 디자인 수정에 따라 모달의 마크업구조는 변경될 수 있습니다.</li>
          <li>
            - ModalView<br>
            -- ConfirmMsg <br>
               모달 내용 입력
            -- /ConfirmMsg <br>
            - ModalView <br>

          </li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="모달 가이드 " />
    <div class="wsg-guide-content">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue"
          @click="modalView"
        >
          모달1
        </ButtonCmp>
        <ModalView
          v-if="isModalViewed" @closeModal="isModalViewed = false"
        >
          <ConfirmMsg
            @closeModal="isModalViewed = false">
            <div class="msg" slot="msg">
              인증번호가 발송되었습니다.
            </div>
            <div class="button__wrap" slot="button">
              <ButtonCmp
                type="btn-blue"
                @click="closeMsge"
              >
                확인
              </ButtonCmp>
            </div>
          </ConfirmMsg>
        </ModalView>
      </div>
    </div>
  </div>
</template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'

export default {
  components: {
    TitleH3,
    ButtonCmp,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      isModalViewed: false
    }
  },
  // watch: {
  //   isModalViewed () {
  //     if (this.isModalViewed) {
  //       document.documentElement.style.overflow = 'hidden'
  //       return
  //     }
  //     document.documentElement.style.overflow = 'auto'
  //   }
  // },
  methods: {
    modalView () {
      this.isModalViewed = true
    },
    closeMsge () {
      alert('버튼 이벤트도 자유롭게')
      this.isModalViewed = false
    }
  }
}
</script>
