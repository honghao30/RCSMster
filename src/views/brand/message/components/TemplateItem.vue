<template>

  <div class="template-item__box" v-if="mode === 'layout'">
    <div class="template-image">
      <img :src="itemData.info.imgUrl" />
    </div>
  </div>
  <component
    v-else
    :is="itemData.type"
    :info.sync="itemData.info"
  />
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
    mode: {
      type: String
    },
    itemTitle: {
      type: String
    },
    itemData: {
      type: Object,
      default: null
    },
    isEmpty: {
      type: Boolean,
      default: true
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
