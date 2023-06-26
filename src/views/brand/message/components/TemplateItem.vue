<template>
  <div class="template-item">
    <h4 class="template-item__title">{{ itemTitle }}</h4>
    <div class="template-item__box">
      <component
        v-for="(cmp, i) in templateData" :key="i"
        :is="cmp.cmpType"
        :data="cmp.data"
      />
    </div>
    <ButtonCmp
      type="btn-blue-line"
    >컴포넌트 작성</ButtonCmp>
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
    itemTitle: {
      type: String
    },
    templateData: {
      type: Array
    }
  }
}
</script>

<style>

</style>
