<template>
  <div class="template-item"
    :class="inActive ? 'inactive' : 'item--draggable'"
  >
    <a role="button" class="btn-del" @click="$emit('onDelete')" v-if="deleteable">Del</a>
    <component
      :is="type"
      :compInfo=compInfo
    >
    </component>
    <a role="button" class="btn-drag" v-if="draghandle">Drag</a>
  </div>
</template>

<script>
import Buttons from '@/views/brand/message/components/Buttons.vue'
import Title from '@/views/brand/message/components/MainTitle.vue'
import Description from '@/views/brand/message/components/Description.vue'
import MainImage from '@/views/brand/message/components/MainImage.vue'
import Table from '@/views/brand/message/components/Table.vue'
import Thumnails from '@/views/brand/message/components/Thumnails.vue'
import SubDescription from '@/views/brand/message/components/SubDescription.vue'
import Item from '@/views/brand/message/components/Item.vue'
import Notice from '@/views/brand/message/components/Notice.vue'
import Banner from '@/views/brand/message/components/Banner.vue'

export default {
  components: {
    Buttons,
    Title,
    Description,
    MainImage,
    Table,
    Thumnails,
    SubDescription,
    Item,
    Notice,
    Banner
  },
  props: {
    compInfo: {
      type: Object,
      default: null
    },
    type: {
      type: String
    },
    deleteable: {
      type: Boolean
    },
    draghandle: {
      type: Boolean
    },
    inActive: {
      type: Boolean
    }
  },
  data() {
    return {
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">

</style>
