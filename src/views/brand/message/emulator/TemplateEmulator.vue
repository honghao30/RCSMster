t<template>
  <div class="chat-emulator__wrap">
    <div class="chat-emulator layout">
      <div class="emulator-template-body">
        <div class="template__emulate--view">
          <div class="chat-time">{{ currentTime }}</div>
          <div class="safty-icon-wrap">[WEB발신]<span class="safty-icon">확인된 발신번호</span></div>
          <!-- 템플릿 출력 -->
          <div class="template__wrap--preview">
            <template>
              <component v-for="(component, idx) in componentList" :key="`${component}_${idx}`" :is="component"
                :compoInputObj.sync='compoInputObjList[idx]'
                ></component>
            </template>
          </div>
          <!-- //템플릿 출력 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTodayDate } from '@/utils/time.js'
import vClickOutside from 'v-click-outside'
import MainTitle from '@/views/brand/message/emulator/components/MainTitle.vue'
import MainTitleFree from '@/views/brand/message/emulator/components/MainTitleFree.vue'
import MainTitleSelect from '@/views/brand/message/emulator/components/MainTitleSelect.vue'
import StyleTitleA from '@/views/brand/message/emulator/components/StyleTitleA.vue'
import Description from '@/views/brand/message/emulator/components/Description.vue'
import Notice from '@/views/brand/message/emulator/components/Notice.vue'
import StyleTable from '@/views/brand/message/emulator/components/StyleTable.vue'
import ImageSquare from '@/views/brand/message/emulator/components/ImageSquare.vue'
import ImageTall from '@/views/brand/message/emulator/components/ImageTall.vue'
import ImageVertical from '@/views/brand/message/emulator/components/ImageTall.vue'
import Banner from '@/views/brand/message/emulator/components/Banner.vue'
import Buttons from '@/views/brand/message/emulator/components/Buttons.vue'
import VButton from '@/views/brand/message/emulator/components/VButton.vue'
import HButton from '@/views/brand/message/emulator/components/HButton.vue'
import ItemA from '@/views/brand/message/emulator/components/ItemA.vue'
import ItemB from '@/views/brand/message/emulator/components/ItemB.vue'
import Thumbnail from '@/views/brand/message/emulator/components/Thumbnail.vue'
import Table from '@/views/brand/message/emulator/components/Table.vue'
import TitleDesc from '@/views/brand/message/emulator/components/TitleDesc.vue'
import ThumbDesc from '@/views/brand/message/emulator/components/ThumbDesc.vue'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    MainTitle,
    MainTitleFree,
    MainTitleSelect,
    StyleTitleA,
    Description,
    Notice,
    StyleTable,
    Buttons,
    ImageSquare,
    ImageTall,
    ImageVertical,
    Banner,
    VButton,
    HButton,
    ItemA,
    ItemB,
    Thumbnail,
    Table,
    TitleDesc,
    ThumbDesc
  },
  props: {
    componentList: {
      type: Array,
      default: null
    },
    compoInputObjList: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      todayDateFull: '',
      todayData: '',
      currentTime: '',
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 'auto'
      },
      isShowLayerIndex: undefined,
      isCmpEdit: false
    }
  },
  mounted() {
    [this.todayDateFull, this.todayData, this.currentTime] = getTodayDate()
    console.log('에뮬 리스트', this.componentList)
    console.log('에뮬 데이터', this.compoInputObjList)
  },
  methods: {

  }
}
</script>
