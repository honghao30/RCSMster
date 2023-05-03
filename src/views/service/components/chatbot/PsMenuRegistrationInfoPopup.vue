<template>
  <!-- 양방향 대화방 등록절차 안내 팝업 -->
  <custom-popup :visible="visible" @close="closePopup"  kind="custom" yesBtn="대화방 메뉴 등록" noBtn="취소" :zIndex="500" class="dv2023_about-chat">
    <template v-slot:header>
      <div class="Popup_New_title">
        <!-- <span class="bold TitleBold">대화방 메뉴란?</span>
        <span class="TitleDescription">자주 묻는 질문 또는 프로모션 소개를 대화방 메뉴에<br/>미리 등록해보세요!</span> -->
      </div>
    </template>
    <div class="about-chat-pop_wrapper">
      <div class="about-chat-pop_left">
        <img src="@/assets/images/dummy/chatroomexample.png"/>
      </div>
      <div class="about-chat-pop_right">
        <span>대화방 메뉴란?</span>
        <p>자주 묻는 질문 또는 프로모션 소개를 대화방 메뉴에<br/>미리 등록해보세요!</p>
        <div>대화방 메뉴를 통해 고객들은 언제든지 원하는 답변을 쉽게 얻을 수 있습니다.
          <br/>대화방 메뉴는 양방향 대화방에서만 사용할 수 있습니다.
          <br/>등록된 양방향 대화방이 없으면 양방향 대화방을 먼저 생성해주세요.</div>
        <!-- <a href="javascript:void(0);">대화방 메뉴 등록</a> -->
      </div>
    </div>
  </custom-popup>
</template>

<script>
import { CustomPopup } from '@/components/popupSet'
export default {
  name: 'PsMenuRegistrationInfoPopup',
  components: {
    CustomPopup
  },
  props: {
    visible: { type: Boolean }
  },
  methods: {
    closePopup(res) {
      if (res.ok) {
        // 대화방 메뉴 작성화면으로 이동
        this.$emit('goRegister')
        this.$emit('update:visible', false)
      } else {
        this.$emit('update:visible', false)
      }
    }
  }
}
</script>
