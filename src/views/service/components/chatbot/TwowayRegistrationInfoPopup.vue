<template>
  <!-- 양방향 대화방 등록절차 안내 팝업 -->
  <custom-popup :visible="visible" @close="closePopup" kind="custom" yesBtn="확인" :zIndex="500" class="dv2023_twoway-reg-comp">
    <TwowayRegistrationInfo @openAgencyInfoPopup="showAgencyList"></TwowayRegistrationInfo>
  </custom-popup>
</template>

<script>
import { CustomPopup } from '@/components/popupSet'
import TwowayRegistrationInfo from '@/views/service/components/chatbot/TwowayRegistrationInfo'
export default {
  name: 'TwowayRegistrationInfoPopup',
  components: {
    CustomPopup,
    TwowayRegistrationInfo
  },
  props: {
    visible: { type: Boolean }
  },
  methods: {
    showAgencyList() {
      this.$emit('update:showAgencyInfoPopup', true)
      this.$emit('update:visible', false)
    },
    closePopup() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
