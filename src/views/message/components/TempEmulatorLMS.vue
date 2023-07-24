t<template>
  <div class="chat-emulator__wrap">
    <div class="chat-emulator layout">
      <div class="emulator-header">
        <div class="emulator-header__inner">
          <button class="btn-back"><span class="blind">이전으로</span></button>
          <div class="profile">
            <div class="profile__image">
              <img src="@/assets/images/dummy/brand_logo.png" alt="">
            </div>
            <p>대화방 명</p>
            <button class="btn-down"></button>
          </div>
        </div>
        <button class="btn-more"><span class="blind">정보</span></button>
      </div>
      <div class="emulator-template-body">
        <div class="template__emulate--view">
          <div class="chat-time">{{ currentTime }}</div>
          <div class="safty-icon-wrap">[WEB발신]<span class="safty-icon">확인된 발신번호</span></div>
          <!-- 템플릿 출력 -->
          <div class="template__wrap--preview">
            <!-- 텍스트 선택형_서술 -->
            <template v-if="templateType == '서술'">
              <!-- 타이틀 -->
              <MainTitle :info="templData.MainTitle.info" />
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
              <Buttons :info="templData.Buttons.info"/>
            </template>
            <!-- 텍스트 선택형_스타일  -->
            <template v-if="templateType == '서술_아이콘'">
              <!-- 타이틀 -->
              <MainTitle :info="templData.MainTitle.info" />
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
              <Buttons :info="templData.Buttons.info"/>
            </template>
            <!-- 타이틀 자유형_서술 -->
            <template v-if="templateType == '2단'">
              <!-- 타이틀 : 자유형-->
              <MainTitle :info="templData.MainTitle.info" />
              <!-- 본문 -->
              <template v-for="(item, i) in templData.DescriptionGroup.info">
                <Description :info="item.description" :key="i"/>
                <Buttons :info="item.Buttons.info" :key="i"/>
              </template>
            </template>
            <!-- 타이틀 자유형_스타일 -->
            <template v-if="templateType == '스타일'">
              <!-- 타이틀 -->
              <MainTitle :info="templData.MainTitle.info" />
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
              <StyleTable :info="templData.Table.info"/>
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
import MainTitle from './Emulator/MainTitle.vue'
import Description from './Emulator/Description.vue'
import StyleTable from './Emulator/StyleTable.vue'
import ItemA from './Emulator/ItemA.vue'
import Buttons from './Emulator/Buttons.vue'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    MainTitle,
    Description,
    StyleTable,
    ItemA,
    Buttons
  },
  props: {
    templateType: String,
    templData: {
      type: Object,
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
    console.log('에뮬', this.templData)
    // this.$watch('templData.SelectedTitle', function(newVal, oldVal) {
    //   console.log('체크1', this.templData.SelectedTitle)
    // })
  },
  methods: {

  }
}
</script>
