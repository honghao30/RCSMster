<template>
    <div>
        <HeaterGuide />
        <WorkList />  
    </div>
</template>

<script>
import WorkList from '../cmp/WorkList'
import HeaterGuide from '../cmp/Header.vue'

export default {
    name: 'PubGuides',
    components: {        
        WorkList,
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