<template>
  <div :class="from === 'autoReplySearchPopup' ? 'rbc_emulator_wrap' : isStandaloneMedia ? 'emulator_wrap' : 'rbc_emulator_wrap auto'">
    <div :class="isStandaloneMedia ? 'inner_emul' : 'rbc_inner_emul'">
      <strong class="blind">미리보기{{isStandaloneMedia}}</strong>
      <div class="rbc_emulator_area" style="width: 290px;">
        <div class="rbc_emulator_cont">
          <div class="rbc_emulator_view">
            <div class="desc_area layer_scroll">
              <!-- 내용 -->
              <div class="preview_wrap" :class="isStandaloneMedia ? 'media' : isCarousel ? 'slide_wrap' : ''" :style="isStandaloneMedia ? 'width: 245px !important;' : ''">
                <template v-if="isStandaloneText">
                  <div class="message_wrap">
                    <div class="text_area mar_auto">
                      <div v-if="templateContentInfo.cardType != 'SAS'" class="title"> {{autoReplyInfo.cardData[0].title}}</div>
                      <div class="desc" v-html="prettyNewline(autoReplyInfo.cardData[0].description)"></div>
                      <a href="javascript:void(0);" class="btn" v-for="(button, idx) in autoReplyInfo.cardData[0].suggestions" :key="`card_${idx}`">
                        {{button.action.displayText}}
                      </a>
                    </div>
                  </div>
                </template>
                <template v-else-if="isStandaloneMedia">
                  <div class="thumb_area">
                    <div class="thumb nocrop">
                      <img v-if="autoReplyInfo.cardData[0].fileUrl" :src="autoReplyInfo.cardData[0].fileUrl">
                      <!-- <img v-else-if="templateContentInfo.mediaHeight === 'T'" src="@/assets/images/dummy/img_brand_test_568x528.jpg">
                      <img v-else-if="templateContentInfo.mediaHeight === 'M'" src="@/assets/images/dummy/img_brand_test_696x504.jpg">
                      <img v-else-if="templateContentInfo.mediaHeight === 'S'" src="@/assets/images/dummy/img_brand_test_360-336.jpg"> -->
                    </div>
                  </div>
                  <div class="text_area">
                    <div class="title"> {{autoReplyInfo.cardData[0].title}}</div>
                    <div class="desc" v-html="prettyNewline(autoReplyInfo.cardData[0].description)"></div>
                    <div class="button_area">
                      <a href="javascript:void(0);" class="btn" v-for="(button, idx) in autoReplyInfo.cardData[0].suggestions" :key="`card_${idx}`">
                        {{button.action.displayText}}
                      </a>
                    </div>
                  </div>
                </template>
                <template v-else-if="isCarousel">
                  <!-- slide -->
                  <div v-if="isSlideReload && autoReplyInfo.cardData.length" class="detail_wrap" :class="templateContentInfo.mediaHeight === 'S' ? 'small' : ''">
                    <carousel ref="test" v-bind="slide" @changed="slideChanged" @init="initialized"  :class="templateContentInfo.mediaHeight === 'S' ? 'slideSmall' : 'slide'">
                      <!-- item -->
                      <div  v-for="(cardData, index) in autoReplyInfo.cardData" :key="`card_${index-1}`" class="item">
                        <div class="thumb_area">
                          <div class="thumb nocrop">
                            <img v-if="cardData.fileUrl" :src="cardData.fileUrl">
                            <!-- <img v-else-if="templateContentInfo.mediaHeight === 'T'" src="@/assets/images/dummy/img_brand_test_568x528.jpg">
                            <img v-else-if="templateContentInfo.mediaHeight === 'M'" src="@/assets/images/dummy/img_brand_test_696x504.jpg">
                            <img v-else-if="templateContentInfo.mediaHeight === 'S'" src="@/assets/images/dummy/img_brand_test_360-336.jpg"> -->
                          </div>
                        </div>
                        <div class="text_area">
                          <div class="title"> {{cardData.title}}</div>
                          <div class="desc" v-html="prettyNewline(cardData.description)"></div>
                          <div class="button_area">
                            <a href="javascript:void(0);" class="btn" v-for="(button, idx) in cardData.suggestions" :key="`card_${idx}`">
                              {{button.action.displayText}}
                            </a>
                          </div>
                        </div>
                      </div>
                      <!-- //item -->
                    </carousel>
                  </div>
                  <!-- //slide -->
                </template>
              </div>
              <!-- //내용 -->
              <div class="btn_wrap">
                <!-- slideChipmenu -->
                <div v-if="isSlideReload && chipList.length > 0" class="chip_menu">
                  <carousel v-bind="chipmenu" @changed="chipmenuChanged" @init="initialized" class="chip_menu_scroll">
                    <div class="item" v-for="(chip, idx) in chipList" :key="`chip_${idx}`">
                      <a href="javascript:void(0);">{{chip.action.displayText}}</a>
                    </div>
                  </carousel>
                </div>
                <!-- //slideChipmenu-->
                <div class="util_area"></div>
                <div class="navi_area">
                  <span class="icon1"></span>
                  <span class="icon2"></span>
                  <span class="icon3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isCarousel" class="paging_area">
      <a href="javascript:void(0);" v-if="currIndex > 0" @click="prevCard" class="prev">이전 카드</a>
      <span class="text"> {{pagingText}} </span>
      <a href="javascript:void(0);" v-if="currIndex + 1 < templateContentInfo.maxCardCnt" @click="nextCard" class="next">다음 카드</a>
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
  name: 'AutoReplySearchPopupEmulator',
  components: {
    carousel
  },
  props: {
    from: {
      type: String
    },
    autoReplyInfo: {
      type: Object
    },
    templateContentInfo: {
      type: Object
    }
  },
  data() {
    return {
      currIndex: 0,
      slide_small: {
        margin: 5,
        stagePadding: 94,
        autoplay: false,
        nav: false,
        items: 1,
        center: true,
        dots: false,
        loop: false
      },
      slide_medium: {
        margin: 5,
        stagePadding: 35,
        autoplay: false,
        nav: false,
        items: 1,
        center: true,
        dots: false,
        loop: false
      },
      chipmenu: {
        autoplay: false,
        autoWidth: true,
        nav: true,
        items: 3,
        dots: false,
        loop: false
      },
      isSlideReload: true
    }
  },
  computed: {
    isStandaloneText() {
      return this.templateContentInfo.cardType === 'SAS' || this.templateContentInfo.cardType === 'SAL'
    },
    isStandaloneMedia() {
      return this.templateContentInfo.cardType === 'SM'
    },
    isCarousel() {
      return this.templateContentInfo.cardType === 'CR' || this.templateContentInfo.cardType === 'CS'
    },
    isCarouselSmall() {
      return this.templateContentInfo.cardType === 'CS'
    },
    chipList() {
      let chipList = this.autoReplyInfo.chipSuggestions
      if (jglib.isEmpty(chipList)) return []
      else return chipList
    },
    pagingText() {
      return '카드 ' + (this.currIndex + 1) + '/' + this.templateContentInfo.maxCardCnt
    },
    slide() {
      if (this.templateContentInfo.mediaHeight === 'S') {
        return this.slide_small
      } else {
        return this.slide_medium
      }
    }
  },
  watch: {
    'autoReplyInfo.armId'() {
      this.currIndex = 0

      this.isSlideReload = false
      setTimeout(function () {
        this.isSlideReload = true
      }.bind(this), 500)
    }
  },
  methods: {
    prevCard() {
      this.currIndex--

      $("span[id^='carousel_prev_'")[0].click()
    },
    nextCard() {
      this.currIndex++

      $("span[id^='carousel_next_'")[0].click()
    },
    prettyNewline(value) {
      let text = value
      return text.replace(/(?:\r\n|\t|\n)/g, '<br/>')
    },
    initialized() {},
    slideChanged(e) {
      this.currIndex = e.item.index
    },
    chipmenuChanged(e) {
      let total = e.item.count
      let itemsPerPage = e.page.size
      let itemGoOut = e.item.index
      let itemRemain = total - (itemsPerPage + itemGoOut)
      if ((itemRemain - 2) === 0) { $('.chip_menu').removeClass().addClass('chip_menu last') } else { $('.chip_menu').removeClass().addClass('chip_menu col' + (itemGoOut + 1)) }
    }
  }
}
</script>
