<template>
  <div ref="pubgud" class="pubGuide">
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
  },
  mounted () {
    const guiEl = this.$refs.pubgud
    guiEl.parentElement.style.paddingTop = '0'
    guiEl.parentElement.previousElementSibling.style.display = 'none'
    guiEl.parentElement.nextElementSibling.style.display = 'none'
    guiEl.previousElementSibling.style.display = 'none'
    console.log(guiEl.previousElementSibling)
  }
}
</script>

<style lang="scss">
@import url('../../../assets/scss/common/guide.scss');
</style>
