<template>
  <div class="dropdown" :class="{ open: isOpen }">
    <a role="button"
      class="dropdown__trigger"
      @click="toggleSelect">{{ selectedOption }}</a>
    <div class="dropdown__menu" v-if="isOpen">
      <div class="search__area" v-if="searchable">
        <span class="input search"><input type="text" placeholder="검색어 입력" v-model="searchWord"/></span>
      </div>
      <ul class="drodown__option">
        <li v-for="(option, i) in filteredOption" :key="i" @click="selectOption(option)">{{  option }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: '',
      isOpen: false,
      searchWord: ''
    }
  },
  props: {
    options: Object,
    searchable: Boolean
  },
  mounted() {
    this.filteredOption = this.options
    this.selectedOption = this.options[0]
  },
  computed: {
    filteredOption() {
      return this.options.filter(option => {
        return option.toLowerCase().includes(this.searchWord.toLowerCase())
      })
    }
  },
  methods: {
    selectOption: function(option) {
      this.selectedOption = option
      this.isOpen = false
    },
    toggleSelect: function() {
      this.isOpen ? this.isOpen = false : this.isOpen = true
    }
  }
}
</script>

<style>

</style>
