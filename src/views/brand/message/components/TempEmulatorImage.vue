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
            <!-- 이미지 & 타이틀 강조형 -->
            <template v-if="templateType == '이미지 & 타이틀 강조형'">
              <!-- 이미지 -->
              <MainImage :info="templData.Image.info" />
              <!-- 본문 -->
              <Table :info="templData.Table.info" />
               <!-- 버튼 -->
               <Buttons :info="templData.Buttons.info"/>
            </template>
            <!-- 텍스트 선택형_스타일  -->
            <template v-if="templateType == '이미지 강조형'">
              <!-- 이미지 -->
              <MainImage :info="templData.Image.info" />
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
               <!-- 버튼 -->
               <Buttons :info="templData.Buttons.info"/>
            </template>
            <!-- 썸네일 세로형 -->
            <template v-if="templateType == '썸네일 세로형'">
              <!-- 이미지 -->
              <MainImage :info="templData.Image.info" />
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
              <!-- 본문 -->
              <SubDescription :info="templData.subDescription.info" />
               <!-- 버튼 -->
               <Buttons :info="templData.Buttons.info"/>
            </template>
            <!-- 썸네일  가로형 -->
            <template v-if="templateType == '썸네일 가로형'">
              <!-- 이미지 -->
              <MainImage :info="templData.Image.info" />
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
              <Thumnail :info="templData.thumnail.info" />
               <!-- 버튼 -->
              <Buttons :info="templData.Buttons.info"/>
            </template>
            <!-- SNS형 -->
            <template v-if="templateType == 'SNS형'">
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
              <!-- 이미지 -->
              <MainImage :info="templData.Image.info" />
               <!-- 버튼 -->
               <Buttons :info="templData.Buttons.info"/>
            </template>
            <!-- SNS 중간버튼형 -->
            <template v-if="templateType == 'SNS 중간버튼형'">
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
              <!-- 버튼 -->
              <Buttons :info="templData.Buttons.info"/>
              <!-- 이미지 -->
              <MainImage :info="templData.Image.info" />
            </template>
            <!-- 이미지 템플릿 신규 -->
            <template v-if="templateType == '이미지 템플릿 신규'">
              <!-- 이미지 -->
              <MainImage :info="templData.Image.info" />
               <!-- 아이템형-->
              <Item :info="templData.Item.info"/>
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
              <!-- 본문 -->
              <StyleTable :info="templData.styleTable.info" />
              <!-- 버튼 -->
              <Buttons :info="templData.Buttons.info"/>
            </template>
            <!-- 이미지 템플릿 캐러셀 -->
            <template v-if="templateType == '이미지 템플릿 캐러셀'">
              <Carousel :info="templData.slideData"/>
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
import MainImage from './Emulator/MainImage.vue'
import Description from './Emulator/Description.vue'
import SubDescription from './Emulator/SubDescription.vue'
import Table from './Emulator/Table.vue'
import StyleTable from './Emulator/StyleTable.vue'
import Item from './Emulator/ItemA.vue'
import Buttons from './Emulator/Buttons.vue'
import Thumnail from './Emulator/Thumnail.vue'
import Carousel from './Emulator/Carousel.vue'
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    MainImage,
    Description,
    StyleTable,
    Item,
    Buttons,
    Table,
    Carousel,
    SubDescription,
    Thumnail
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
