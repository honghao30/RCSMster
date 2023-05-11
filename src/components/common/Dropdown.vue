<template>
  <div class="dropdown" :class="{ open: isOpen }" v-click-outside="onClickOutside">
    <a role="button"
      class="dropdown__trigger"
      @click="toggleSelect">{{ selectedOption }}</a>
    <div class="dropdown__menu" v-if="isOpen">
      <div class="search__area" v-if="searchable">
        <span class="input search"><input type="text" placeholder="검색어 입력" v-model="searchWord"/></span>
      </div>
      <ul class="drodown__option">
        <li v-for="(option, i) in filteredOption" :key="i" @click="selectOption(option)" :data-value="option.value">{{  option.label }}</li>
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
      searchWord: ''
    }
  },
  props: {
    options: Object,
    searchable: Boolean,
    placeholder: String,
    value: String
  },
  emits: [
    'update:modelValue'
  ],
  mounted() {
    this.filteredOption = this.options
    if (this.placeholder) {
      this.selectedOption = this.placeholder
    } else {
      this.selectedOption = this.options[0].label
    }
  },
  computed: {
    filteredOption() {
      return this.options.filter(option => {
        return option.label.toLowerCase().includes(this.searchWord.toLowerCase())
      })
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option.label
      this.isOpen = false
      this.$emit('input', option.value)
    },
    toggleSelect() {
      this.isOpen ? this.isOpen = false : this.isOpen = true
    },
    onClickOutside() {
      this.isOpen = false
    }
  }
}
</script>

<style>

</style>
