<template>
  <div>
    <!-- <HeaterGuide /> -->
    <BasicSummary /> 
  </div>   
</template>

<script>
  import BasicSummary from './cmp/BasicSummary.vue'
// import HeaterGuide from './cmp/Header.vue'

export default {
    name: 'PubGuides',
    components: {        
        BasicSummary,
        // HeaterGuide
    },
    metaInfo: {
      title: 'Publishing Guides'
    }
}
</script>

<style lang="scss">
// @import url('@/assets/scss/common/guide.scss');
</style>