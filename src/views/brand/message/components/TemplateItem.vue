<template>
  <div class="template-item">
    <div class="template-item__box">
      <component
          v-for="cmp in infoData"
        :key="cmp"
        :is="cmp.type"
        :info.sync="cmp.info"
      />
    </div>
  </div>
</template>

<script>
// import MainTitle from '@/views/brand/message/components/Emulator/MainTitle.vue'
import MainImage from '@/views/brand/message/components/Emulator/MainImage.vue'
import Item from '@/views/brand/message/components/Emulator/ItemA.vue'
import Buttons from '@/views/brand/message/components/Emulator/Buttons.vue'
import Description from '@/views/brand/message/components/Emulator/Description.vue'
import Table from '@/views/brand/message/components/Emulator/StyleTable.vue'
import Thumnails from '@/views/brand/message/components/Emulator/Thumnails.vue'
import SubDescription from '@/views/brand/message/components/Emulator/SubDescription.vue'
import Notice from '@/views/brand/message/components/Emulator/Notice.vue'
import Banner from '@/views/brand/message/components/Emulator/Banner.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    // MainTitle,
    MainImage,
    Item,
    Buttons,
    Description,
    Table,
    Thumnails,
    SubDescription,
    Notice,
    Banner,
    ButtonCmp
  },
  props: {
    infoData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
