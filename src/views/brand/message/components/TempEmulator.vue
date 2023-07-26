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
            <template v-if="templateType == '텍스트 선택형_서술'">
              <!-- 타이틀 -->
              <MainTitle :info="templData.MainTitle.info" />
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
            </template>
            <!-- 텍스트 선택형_스타일  -->
            <template v-if="templateType == '텍스트 선택형_스타일'">
              <!-- 타이틀 -->
              <MainTitle :info="templData.MainTitle.info" />
              <!-- 본문 : 테이블 -->
              <StyleTable :info="templData.Table.info"/>
            </template>
            <!-- 타이틀 자유형_서술 -->
            <template v-if="templateType == '타이틀 자유형_서술'">
              <!-- 타이틀 : 자유형-->
              <MainTitle :info="templData.MainTitle.info" />
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
              <Table :info="templData.simpleTable.info" />
            </template>
            <!-- 타이틀 자유형_스타일 -->
            <template v-if="templateType == '타이틀 자유형_스타일'">
              <!-- 타이틀 : 자유형-->
              <MainTitle :info="templData.MainTitle.info" />
              <!-- 본문 : 테이블 -->
              <StyleTable :info="templData.Table.info"/>
            </template>
            <!-- 타이틀 자유형_스타일 -->
            <template v-if="templateType == '아이템 강조형_서술'">
              <!-- 아이템형-->
              <Item :info="templData.Item.info"/>
              <!-- 본문 -->
              <Description :info="templData.Description.info" />
            </template>
            <!-- 타이틀 자유형_스타일 -->
            <template v-if="templateType == '아이템 강조형_스타일'">
              <!-- 아이템형-->
              <Item :info="templData.Item.info"/>
               <!-- 본문 : 테이블 -->
              <StyleTable :info="templData.Table.info"/>
            </template>
            <!-- 버튼 -->
            <Buttons :info="templData.Buttons.info"/>
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
import Item from './Emulator/ItemB.vue'
import Buttons from './Emulator/Buttons.vue'
import Table from './Emulator/Table.vue'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    MainTitle,
    Description,
    StyleTable,
    Item,
    Buttons,
    Table
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
