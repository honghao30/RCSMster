<template>
  <!-- 조회 -->
  <div v-if="viewMode" class="bor_b1999">
    <div class="rcs_item_bundle p_tb10">
      <strong class="rcs_tit_bundle p-l0">템플릿 ID</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670">{{ info.tplId }}</span>
      </div>
    </div>
    <div class="rcs_item_bundle p_tb10">
      <strong class="rcs_tit_bundle p-l0">템플릿 유형</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670">{{ tplTheme }}</span>
      </div>
    </div>
    <div class="rcs_item_bundle p_tb10">
      <strong class="rcs_tit_bundle p-l0">옵션</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670">{{ info.tplTypeNm }}</span>
      </div>
    </div>
    <div class="rcs_item_bundle p_tb10">
      <strong class="rcs_tit_bundle p-l0">템플릿 명</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670">{{ info.tplNm }}</span>
      </div>
    </div>
  </div>
  <!-- 작성 -->
  <div v-else>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle p-l0">
        템플릿 ID
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670">
          <input type="text" ref="tplId" v-model="info.tplId" @keyup="handleKyeEventTplId" @keydown="handleKeydownTplId" maxlength="40" :disabled="modify">
        </span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle p-l0">
        템플릿 유형
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670">
          <span class="type">{{ tplTheme }}</span>
        </span>
      </div>
    </div>
    <!-- 속성을 선택할 수 있는 상품의 경우만 출력되도록 한다 -->
    <div class="rcs_item_bundle" v-if="useSelectTplType">
      <strong class="rcs_tit_bundle p-l0">
        옵션
      </strong>
      <div class="rcs_cont_bundle">
        <div class="using_stat" style="padding-top: 0;">
          <span class="btn stat_btn sml" :class="{ 'check': info.tplType === tpl.type }" v-for="(tpl, idx) in tplTypes" :key="idx" @click="changeType(tpl.type)">{{ tpl.typeNm }}</span>
        </div>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle p-l0">
        템플릿 명
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670">
          <input type="text" ref="tplNm" v-model="info.tplNm" @input="e => info.tplNm = e.target.value" placeholder="템플릿명을 입력해 주세요." class="p_byte" maxlength="30">
          <span class="input_byte">({{ info.tplNm.length }}/30자)</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import imgTplUtils from '@/components/imageTemplate/js/imageTemplateUtils'
import comlib from '@/components/messageTemplate/js/common'
export default {
  name: 'Common',
  props: {
    info: {
      type: Object,
      default: null
    },
    disableData: {
      type: String,
      default: ''
    },
    viewMode: {
      type: Boolean,
      default: false
    },
    modify: {
      type: Boolean
    }
  },
  data () {
    return {
      tplTypes: [],
      tplIdPrefix: ''
    }
  },
  computed: {
    disabledInput() {
      if (!this.disableData) return []
      else return this.disableData.split('|')
    },
    useSelectTplType() { // 속성 선택란 사용여부
      return !this.disabledInput.includes('useSelectTplType')
    },
    tplTheme() {
      if (this.viewMode) return this.info.tplThemeNm
      else {
        if (this.useSelectTplType) return this.info.tplThemeNm
        else {
          let typeNm = ''
          if (this.info.tplFormId !== 'ITSNSS' && !comlib.isEmpty(this.info.tplTypeNm)) {
            // SNS(하단버튼)의 경우 작성화면내 옵션 출력 X
            typeNm = `(${this.info.tplTypeNm})`
          }
          return `${this.info.tplThemeNm}${typeNm}`
        }
      }
    }
  },
  watch: {},
  created() {
    if (this.useSelectTplType) {
      this.tplTypes = imgTplUtils.getTypes(this.info.tplTheme)
    }
    this.tplIdPrefix = this.info.tplId.split('-')[0] + '-'
  },
  methods: {
    changeType(type) {
      if (!this.viewMode) {
        if (!this.modify) this.info.tplType = type
        else {
          if (this.info.isFirstOptChange) {
            this.$confirmMsg('옵션을 변경하면 기존 이미지는 삭제됩니다.<br/>옵션을 변경하시겠습니까?')
              .then(() => { this.info.tplType = type })
              .catch(() => { /* console.info('no change') */ })
          } else this.info.tplType = type
        }
      }
    },
    // 템플릿 키 이벤트 ---------------------------------------------
    handleKyeEventTplId(e) {
      let value = e.target.value
      if (!value.startsWith(this.tplIdPrefix)) {
        e.target.value = this.tplIdPrefix
        return false
      }
      let values = e.target.value.split('-')
      values[1] = values[1].replace(/[^a-zA-Z|0-9]/g, '')
      e.target.value = values.join('-')
    },
    handleKeydownTplId(e) {
      let key = e.which ? e.which : event.keyCode
      let actionkeyList = [8, 9, 37, 38, 39, 40, 46]
      if (e.target.value.length < 15) {
        event.returnValue = false
        e.preventDefault()
      } else if (
        !(key >= 65 && key <= 90) &&
        !(!e.shiftKey && key >= 48 && key <= 57) &&
        !(key >= 96 && key <= 105) &&
        actionkeyList.indexOf(key) === -1 &&
        !e.ctrlKey
      ) {
        event.returnValue = false
        e.preventDefault()
      }
    },
    validateData() {
      if (jglib.isEmpty(this.info.tplId) || this.info.tplId.length < 16) {
        this.$alertMsg('템플릿ID를 입력해주세요').then(() => {
          this.$refs.tplId.focus()
        })
        return false
      }
      if (jglib.isEmpty(this.info.tplNm)) {
        this.$alertMsg('템플릿명을 입력해주세요').then(() => {
          this.$refs.tplNm.focus()
        })
        return false
      }
      return true
    }
  }
}
</script>

<style>

</style>
