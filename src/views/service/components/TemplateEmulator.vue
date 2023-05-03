<template>
  <!-- <div class="rcs_emulator_wrap open_brand">
    <div class="inner_emul">
      <strong class="blind">미리보기</strong>
      <div class="emulator_area">
        <div class="emulator_cont">
          <div class="emulator_view">
            <emulator :cardTheme="cardTheme" :cardType="cardType" :jsonData="jsonData"></emulator>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="rcs_emulator_wrap open_brand">
    <div class="inner_emul">
      <strong class="blind">미리보기</strong>
      <div class="emulator_area">
        <div class="emulator_cont">
          <div class="emulator_view">
            <emulator :cardTheme="cardTheme" :cardType="cardType" :jsonData="jsonData"></emulator>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Emulator from '@/components/messageTemplate/emulator'
export default {
  name: 'TemplateEmulator',
  props: {
    jsonData: {
      type: Object,
      default() {
        return {}
      }
    },
    cardType: {
      type: String,
      default: 'D'
    },
    cardTheme: {
      type: String,
      default: ''
    }
  },
  components: { Emulator },
  data() {
    return {}
  },
  computed: {},
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style>
</style>
