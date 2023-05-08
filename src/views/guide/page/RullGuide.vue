<template>
  <div ref="pubgud" class="pubGuide">
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
  },
  mounted () {
    const guiEl = this.$refs.pubgud
    console.log(guiEl)
    guiEl.parentElement.style.paddingTop = '0'
    guiEl.parentElement.previousElementSibling.style.display = 'none'
    guiEl.parentElement.nextElementSibling.style.display = 'none'
    guiEl.parentElement.previousElementSibling.style.display = 'none'
  }
}
</script>

<style lang="scss">
@import url('../../../assets/scss/common/guide.scss');
</style>
