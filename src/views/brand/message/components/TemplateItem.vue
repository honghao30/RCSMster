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
import MainTitle from '@/views/brand/message/components/MainTitle.vue'
import MainImage from '@/views/brand/message/components/MainImage.vue'
import Item from '@/views/brand/message/components/Item.vue'
import Buttons from '@/views/brand/message/components/Buttons.vue'
import Description from '@/views/brand/message/components/Description.vue'
import Table from '@/views/brand/message/components/Table.vue'
import Thumnails from '@/views/brand/message/components/Thumnails.vue'
import SubDescription from '@/views/brand/message/components/SubDescription.vue'
import Notice from '@/views/brand/message/components/Notice.vue'
import Banner from '@/views/brand/message/components/Banner.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    MainTitle,
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
