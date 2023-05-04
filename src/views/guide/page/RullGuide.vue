<template>
  <div>
      <HeaterGuide />
      <PubRull /> 
  </div>  
</template>

<script>
import PubRull from '../cmp/PubRull.vue'
import HeaterGuide from '../cmp/Header.vue'
export default {
    name: 'PubGuides',
    components: {        
        PubRull,
        HeaterGuide  
    },
    metaInfo: {
      title: 'Publishing Guides'
    }    
}
</script>

<style lang="scss">
@import url('@/assets/scss/common/guide.scss');
</style>