<template>
  <div class="dropdown" :class="[{ 'open': isOpen }, { 'disabled' : disabled }]" v-click-outside="onClickOutside">
    <a role="button"
       class="dropdown__trigger"
       @click="toggleSelect">{{ selectedOption }}</a>
    <div class="dropdown__menu" v-if="isOpen">
      <div class="search__area" v-if="searchable">
        <span class="input search"><input type="text" placeholder="검색어 입력" v-model="searchWord"/></span>
      </div>
      <ul class="drodown__option">
        <li v-for="(option, i) in filteredOption" :key="i" @click="selectOption(option)" :data-value="option.code">{{ option.codeNm }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      selectedOption: '',
      isOpen: false,
      searchWord: '',
      valueIndex: '',
      style: { border: 'border: 1px solid #DDDDDD' }
    }
  },
  props: {
    options: {
      type: Array
    },
    searchable: Boolean,
    placeholder: String,
    value: String,
    disabled: Boolean,
    beforeChange: {
      type: Function
    },
    labelFieldName: String,
    valueFieldName: String
  },
  emits: [
    'update:modelValue'
  ],
  mounted() {},
  created() {
    this.init()
  },
  watch: {
    options: {
      deep: true,
      handler() {
        if (this.labelFieldName || this.valueFieldName) {
          this.options.forEach((opt, idx) => {
            if (this.labelFieldName) {
              opt['codeNm'] = opt[this.labelFieldName]
            }
            if (this.valueFieldName) {
              opt['code'] = opt[this.valueFieldName]
            }
          })
        }
      }
    },
    value: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },
  computed: {
    filteredOption: {
      get() {
        return this.options.filter(option => {
          if (option.codeNm) return option.codeNm.toLowerCase().includes(this.searchWord.toLowerCase())
        })
      },
      set(value) {
        this.options = value
      }
    }
  },
  methods: {
    init() {
      let $value = this.value
      if ($value) {
        this.options.forEach((option, index) => {
          if (option.code === $value) {
            this.selectedOption = option.codeNm
          }
        })
      } else {
        if (this.placeholder) {
          this.selectedOption = this.placeholder
        } else {
          this.selectedOption = this.options[0].codeNm
        }
      }
      // this.filteredOption(this.options)
    },
    selectOption(option) {
      let $value = this.value
      this.selectedOption = option.codeNm

      // input 값 먼저 변경 되고 change 이벤트 발생
      this.$emit('input', option.code)

      if ($value !== option.code) {
        this.$emit('beforeChange')
        this.$emit('change', option.code, option.codeNm)
      }
      this.isOpen = false
    },
    toggleSelect() {
      if (!this.disabled) {
        this.isOpen ? this.isOpen = false : this.isOpen = true
      }
    },
    onClickOutside() {
      this.isOpen = false
    },
    focus() {
      this.$refs['dropdown'].focus()
    }
  }
}
</script>

<style>

</style>
