<template>
  <!-- <div>
    <component :cardTheme='cardTheme' :is='layout.widget' :cardType='cardType' :componentData='layout'></component>
    <suggestion
      v-for='(suggestion, index) in suggestions'
      :key='`suggestion_${index}`'
      :suggestionData='suggestion'
    ></suggestion>
  </div> -->
  <div>
    <component :cardTheme='cardTheme' :is='layout.widget' :cardType='cardType' :componentData='layout' :jsonData="jsonData"></component>
    <suggestion
      v-for='(suggestion, index) in suggestions'
      :key='`suggestion_${index}`'
      :suggestionData='suggestion'
      :cardTheme="cardTheme"
    ></suggestion>
  </div>
</template>

<script>
import LinearLayout from './components/LinearLayout'
import Suggestion from './components/Suggestion'
import comlib from '../../js/common'
export default {
  name: 'openrichcardEmulator',
  components: {
    LinearLayout,
    Suggestion
  },
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
  data() {
    return {}
  },
  computed: {
    layout() {
      if (
        comlib.isEmpty(this.jsonData) ||
        comlib.isEmpty(this.jsonData.RCSMessage.openrichcardMessage.layout)
      ) {
        return {}
      }
      return this.jsonData.RCSMessage.openrichcardMessage.layout
      // return test
    },
    suggestions() {
      if (
        comlib.isEmpty(this.jsonData) ||
        comlib.isEmpty(this.jsonData.RCSMessage.openrichcardMessage) ||
        comlib.isEmpty(this.jsonData.RCSMessage.openrichcardMessage.suggestions)
      ) {
        return {}
      }

      let RCSMessage = this.jsonData.RCSMessage || this.jsonData.rcsMessage
      return RCSMessage.openrichcardMessage.suggestions
    }
  },
  watch: {
    jsonData() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {}
  }
}
</script>

<style>
</style>
