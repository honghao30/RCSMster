<template>
  <div>
    <template v-if="relayAgRegister">
      <relay-ag-register-popup
        :relayAgInfo="relayAgInfo"
        :relayAgRegister.sync="relayAgRegister"
        :agencyCorpRegNum.sync="agencyCorpRegNum"
        :reqUserId.sync="reqUserId"
        @saveRelay="saveRelay"
        @deleteRelay="deleteRelay"
        @closePopup="closePopup" />
    </template>

    <!-- RelayAgModifyPopup.vue 파일 퍼블 적용 필요 -->
    <template v-if="relayAgModify">
      <relay-ag-modify-popup v-if="relayAgModify && visible"
        :relayAgInfo="relayAgInfo"
        :relayAgModify.sync="relayAgModify"
        :agencyCorpRegNum.sync="agencyCorpRegNum"
        :reqUserId.sync="reqUserId"
        @saveRelay="saveRelay"
        @closePopup="closePopup" />
    </template>

    <!-- RelayAgConfirmPopup.vue 파일 퍼블 적용 필요 -->
    <template v-if="relayAgConfirm">
      <relay-ag-confirm-popup v-if="relayAgConfirm && visible"
        :relayAgInfo="relayAgInfo"
        :relayAgConfirm.sync="relayAgConfirm"
        @closePopup="closePopup" />
    </template>
  </div>
</template>

<script>
import RelayAgConfirmPopup from './RelayAgConfirmPopup'
import RelayAgModifyPopup from './RelayAgModifyPopup'
import RelayAgRegisterPopup from './RelayAgRegisterPopup'
export default {
  name: 'RelayPopup',
  components: {
    RelayAgConfirmPopup,
    RelayAgModifyPopup,
    RelayAgRegisterPopup
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    relayAgConfirm: {
      type: Boolean,
      default: false
    },
    relayAgModify: {
      type: Boolean,
      default: false
    },
    relayAgRegister: {
      type: Boolean,
      default: false
    },
    agencyCorpRegNum: {
      type: String,
      default: ''
    },
    reqUserId: {
      type: String,
      default: ''
    },
    relayAgInfo: []
  },
  computed: {
  },
  methods: {
    deleteRelay(data) {
      this.$emit('getData', data)
    },
    saveRelay(data) {
      this.$emit('getData', data)
      this.$emit('update:visible', false)
    },
    closePopup() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
