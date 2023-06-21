<template>
  <div class="dropdown" :class="[{ 'open': isOpen }, { 'disabled' : disabled }]" v-click-outside="onClickOutside">
    <a role="button"
      class="dropdown__trigger"
      @click="toggleSelect">
        <span class="selected-text">{{ selectedOption }}</span>
      </a>
    <div class="dropdown__menu" v-if="isOpen">
      <div class="search__area" v-if="searchable">
        <span class="input search"><input type="text" placeholder="검색어 입력" v-model="searchWord"/></span>
      </div>
      <ul class="drodown__option">
        <li v-for="(option, i) in filteredOption" :key="i" @click="selectOption(option, i)" :data-value="option.value" :class="{'active' : isSelectedIndex == i}">{{  option.label }}</li>
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
      isSelectedIndex: undefined
    }
  },
  props: {
    options: Object,
    searchable: Boolean,
    placeholder: String,
    value: String,
    disabled: Boolean,
    beforeChange: {
      type: Function
    }
  },
  emits: [
    'update:modelValue'
  ],
  mounted() {
    let $value = this.value
    if ($value) {
      this.options.forEach((option, index) => {
        if (option.value === $value) {
          this.isSelectedIndex = index
          this.selectedOption = option.label
        }
      })
    } else {
      if (this.placeholder) {
        this.selectedOption = this.placeholder
      } else {
        this.selectedOption = this.options[0].label
        this.isSelectedIndex = 0
      }
    }
    this.filteredOption = this.options
  },
  computed: {
    filteredOption() {
      return this.options.filter(option => {
        return option.label.toLowerCase().includes(this.searchWord.toLowerCase())
      })
    }
  },
  methods: {
    selectOption(option, idx) {
      let $value = this.value
      this.selectedOption = option.label
      if ($value !== option.value) {
        this.$emit('beforeChange')
      }
      this.$emit('input', option.value)
      this.$emit('change', option.value)
      this.isOpen = false
      this.isSelectedIndex = idx
    },
    toggleSelect() {
      if (!this.disabled) {
        this.isOpen ? this.isOpen = false : this.isOpen = true
      }
    },
    onClickOutside() {
      this.isOpen = false
    }
  }
}
</script>

<style>

</style>
