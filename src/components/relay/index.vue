<template>
  <div>
    <div tabindex="0" class="layer active" v-if="relayAgRegister">
      <relay-ag-register-popup
        :relayAgInfo="relayAgInfo"
        :relayAgRegister.sync="relayAgRegister"
        :agencyCorpRegNum.sync="agencyCorpRegNum"
        :reqUserId.sync="reqUserId"
        @saveRelay="saveRelay"
        @deleteRelay="deleteRelay"
        @closePopup="closePopup"
      ></relay-ag-register-popup>
    </div>

    <div tabindex="0" class="layer active" v-if="relayAgModify">
      <relay-ag-modify-popup v-if="relayAgModify && visible"
        :relayAgInfo="relayAgInfo"
        :relayAgModify.sync="relayAgModify"
        :agencyCorpRegNum.sync="agencyCorpRegNum"
        :reqUserId.sync="reqUserId"
        @saveRelay="saveRelay"
        @closePopup="closePopup"
      ></relay-ag-modify-popup>
    </div>

    <div tabindex="0" class="layer active" v-if="relayAgConfirm">
      <relay-ag-confirm-popup v-if="relayAgConfirm && visible"
        :relayAgInfo="relayAgInfo"
        :relayAgConfirm.sync="relayAgConfirm"
        @closePopup="closePopup"
      ></relay-ag-confirm-popup>
    </div>
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
