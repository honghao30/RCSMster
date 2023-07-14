<template>
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
            <button class="btn-down"
              @click="btnToggleMenu"
            ></button>
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
            <!-- 타이틀 -->
             <div class="template-cmp-title" v-if="templData.SelectedTitle[0]">
                <i class="icon-type">
                  <img :src="`${templData.SelectedTitle[1]}`" alt="">
                </i>
                <span>{{ templData.SelectedTitle[0] }}</span>
             </div>
             <div v-else-if="templData.MainTitle.info.mainTitle || templData.title.desc === 'descY'"
                class="template-cmp-title"
                :class="{ 'itemPoint': templateType === '아이템 강조형1' || templateType === '아이템 강조형2' }"
              >
               <div class="mainDesc" v-if="templData.title.desc === 'descY'">
                {{ templData.MainTitle.info.mainDesc }}
              </div>
               <span class="mainTitle">{{ templData.MainTitle.info.mainTitle }}</span>
               <span class="constName"
                v-if="templData.title.desc === ''"
               >변수명</span>
               <div class="item-poinst-logo"
                v-if="templData.SelectedLogo[1] !== ''"
               >
                  <img :src="`${templData.SelectedLogo[1]}`" alt="">
               </div>
             </div>
             <!-- // 타이틀 -->
             <!-- 표 -->
             <template v-if="templateType == '아이템 강조형2'">
              <div class="emplate-cmp-table" v-if="templData.Table.tableTitle !== ''">
                  <div class="table-cmp-title">{{ templData.Table.tableTitle }}</div>
                  <table>
                    <colgroup>
                      <col width="50%">
                      <col width="50%">
                    </colgroup>
                    <tbody>
                      <tr
                        v-for="(tblinfor, index) in templData.Table.info" :key="index">
                        <th>{{ tblinfor.description }}</th>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </template>
             <!-- //표 -->
             <!-- 내용 -->
             <template v-if="templateType == '아이템 강조형1' || templateType == '타이틀 자유형1' || templateType == '텍스트 선택형_서술'">
              <div class="template-cmp-description">
                  <div v-if="templData.Description == ''">내용을 입력하세요.</div>
                  <div v-else>{{ templData.Description }}</div>
              </div>
            </template>
             <div class="template-cmp-button">
                <button type="button" class="btn-template"
                  v-if="templData.Buttons.info[0].btnEvent !== 'none'"
                >{{ templData.Buttons.info[0].btnName }}</button>
                <button type="button" class="btn-template"
                  v-if="templData.Buttons.info[1].btnEvent !== 'none'"
                >{{ templData.Buttons.info[1].btnName }}</button>
             </div>
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

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
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
      chatMenuList: [{
        menuTitle: '😍 상담직원 연결 👌🏻'
      }],
      todayDateFull: '',
      todayData: '',
      currentTime: '',
      isOpen: false,
      isBlind: false,
      isShort: true,
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 'auto'
      },
      collapse: false,
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
    btnToggleMenu () {
      this.collapse = !this.collapse
    },
    showLayerMenu(idx) {
      if (this.isShowLayerIndex !== idx) {
        this.isShowLayerIndex = idx
      } else {
        this.isShowLayerIndex = undefined
      }
    },
    removeCmp(idx) {
      let cmpItem = {
        type: '',
        info: {}
      }
      this.templateData.splice(idx, 1, cmpItem)
    },
    onClickOutside() {
      this.isShowLayerIndex = undefined
    },
    onEditComp() {
      this.isCmpEdit = !this.isCmpEdit
      this.templateData.every((item, i) => {
        if (!item.type) {
          this.isActiveCmpIndex = i
          return false
        } else {
          return true
        }
      })
      this.$emit('setActiveCmp', this.isActiveCmpIndex)
    }
  }
}
</script>
