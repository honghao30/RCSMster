<template>
  <div class="rbc_emulator_wrap auto">
    <div class="rbc_inner_emul">
      <strong class="blind">미리보기</strong>
      <div class="rbc_emulator_area">
        <div class="rbc_emulator_cont">
          <div class="rbc_emulator_view">
            <div class="desc_area layer_scroll">
              <!-- 내용 -->
              <div v-if="isStandalone" class="preview_wrap">
                <div class="message_wrap">
                  <div class="logo">
                    <img :src="profileImageUrl" alt="">
                  </div>
                  <div class="text_area" :class="isStandaloneMedia ? 'media':''">
                    <!-- 이미지 -->
                    <div v-if="isStandaloneMedia" class="thumb">
                      <img v-if="autoReplyInfo.cardData[0].imageData" :src="autoReplyInfo.cardData[0].imageData">
                      <img v-else-if="autoReplyInfo.cardData[0].fileUrl" :src="autoReplyInfo.cardData[0].fileUrl">
                      <img v-else-if="templateContentInfo.mediaHeight === 'T'" src="@/assets/images/dummy/img_brand_test_568x528.jpg">
                      <img v-else-if="templateContentInfo.mediaHeight === 'M'" src="@/assets/images/dummy/img_brand_test_568x336.jpg">
                    </div>
                    <!-- 타이틀 -->
                    <div v-if="templateContentInfo.cardType != 'SAS'" class="title">{{autoReplyInfo.cardData[0].title}}</div>
                    <!-- 내용 -->
                    <div v-if="isStandaloneText" class="desc" v-html="prettyNewline(autoReplyInfo.cardData[0].description, '내용')"></div>
                    <div v-else-if="isStandaloneMedia" class="desc" v-html="prettyNewline(autoReplyInfo.cardData[0].description)"></div>
                    <!-- 버튼 -->
                    <a href="javascript:void(0);" class="btn" v-for="(button, idx) in autoReplyInfo.cardData[0].suggestions" :key="`card_${idx}`">
                      {{button.action.displayText | defaultVal('버튼명')}}
                    </a>
                  </div>
                </div>
              </div>
              <div v-else class="preview_wrap logo_wrap">
                <!-- slide -->
                <div v-if="isSlideShow" class="detail_wrap">
                  <div class="logo">
                    <img :src="profileImageUrl" alt="">
                  </div>
                  <carousel v-bind="slide" @changed="slideChanged" @init="initialized" :class="templateContentInfo.mediaHeight === 'S' ? 'slideSmall' : 'slide'">
                    <!-- item -->
                    <div v-for="(cardData, index) in autoReplyInfo.cardData" :key="`card_${index-1}`" class="item">
                      <div class="thumb_area">
                        <div class="thumb nocrop">
                          <img v-if="cardData.imageData" :src="cardData.imageData">
                          <img v-else-if="cardData.fileUrl" :src="cardData.fileUrl">
                          <!-- <img v-else-if="templateContentInfo.mediaHeight === 'M'" src="@/assets/images/dummy/img_brand_test_696x504.jpg">
                          <img v-else-if="templateContentInfo.mediaHeight === 'S'" src="@/assets/images/dummy/img_brand_test_360-336.jpg"> -->
                        </div>
                      </div>
                      <div class="text_area">
                        <div class="title">{{cardData.title}}</div>
                        <div class="desc" v-html="prettyNewline(cardData.description)"></div>
                        <div class="button_area">
                          <a href="javascript:void(0);" class="btn" v-for="(button, idx) in cardData.suggestions" :key="`card_${idx}`">
                            {{button.action.displayText | defaultVal('버튼명')}}
                          </a>
                        </div>
                      </div>
                    </div>
                    <!-- //item -->
                  </carousel>
                </div>
              </div>
              <!-- //내용 -->
              <div class="btn_wrap">
                <!-- slideChipmenu -->
                <div v-if="!isChipDelay && chipList.length > 0" class="chip_menu">
                  <carousel v-bind="chipmenu" @changed="chipmenuChanged" @init="initialized" class="chip_menu_scroll">
                    <div class="item" v-for="(chip, idx) in chipList" :key="`chip_${idx}`">
                      <a href="javascript:void(0);">{{chip.action.displayText | defaultVal('칩명')}}</a>
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
  </div>
</template>

<script>

import { getImageUrl } from '@/api/common/code'
import carousel from 'vue-owl-carousel'

export default {
  name: 'AutoReplyEmulator',
  components: {
    carousel
  },
  props: {
    autoReplyInfo: {
      type: Object
    },
    templateContentInfo: {
      type: Object
    },
    currCardIdx: {
      type: Number
    },
    brandInfo: {
      type: Object
    }
  },
  data() {
    return {
      profileImageUrl: '',
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
      isSlideShow: true,
      isChipDelay: false,
      chipCount: 0,
      slideIndex: 0
    }
  },
  created() {
  },
  computed: {
    isStandalone() {
      return this.templateContentInfo.cardType === 'SAS' || this.templateContentInfo.cardType === 'SAL' || this.templateContentInfo.cardType === 'SM'
    },
    isStandaloneText() {
      return this.templateContentInfo.cardType === 'SAS' || this.templateContentInfo.cardType === 'SAL'
    },
    isStandaloneMedia() {
      return this.templateContentInfo.cardType === 'SM'
    },
    chipList() {
      let chipList = this.autoReplyInfo.chipSuggestions
      if (jglib.isEmpty(chipList)) return []
      else return chipList
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
    autoReplyInfo: {
      immediate: true,
      deep: true,
      handler() {
        // console.log('change autoReplyInfo  ', JSON.stringify(this.autoReplyInfo))

        let cardDataList = this.autoReplyInfo.cardData
        for (let idx in cardDataList) {
          let cardInfo = cardDataList[idx]

          if (!jglib.isEmpty(cardInfo.fileRaw)) {
            let reader = new FileReader()
            let vm = this
            reader.onload = e => {
              cardInfo.imageData = e.target.result
              vm.$forceUpdate()
            }
            reader.readAsDataURL(cardInfo.fileRaw)
          }
        }

        let newChipCount = this.chipList.length
        if (this.chipCount !== newChipCount) {
          this.isChipDelay = true
          setTimeout(function () {
            this.isChipDelay = false
          }.bind(this), 100)
        }
        this.chipCount = newChipCount

        setTimeout(function () {
          if ($('.chip_menu_scroll') && $('.chip_menu_scroll').height() > 60) {
            this.isChipDelay = true
            setTimeout(function () {
              this.isChipDelay = false
            }.bind(this), 100)
          }
        }.bind(this), 100)

        this.$forceUpdate()
      }
    },
    templateContentInfo: {
      immediate: true,
      deep: true,
      handler() {
        this.isSlideShow = false
        setTimeout(function () {
          this.isSlideShow = true
        }.bind(this), 100)
      }
    },
    brandInfo: {
      immediate: true,
      deep: true,
      handler() {
        this.loadBrandProfile()
      }
    },
    currCardIdx(n, o) {
      // console.log('currCardIdx ', n, o)
      if (o !== this.slideIndex) o = this.slideIndex

      let diff = n - o
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          $("span[id^='carousel_next_'")[0].click()
        }
      } else {
        for (let i = 0; i > diff; i--) {
          $("span[id^='carousel_prev_'")[0].click()
        }
      }
    }
  },
  filters: {
    defaultVal: function(value, defaultVal) {
      let text = value
      if (jglib.isEmpty(defaultVal)) defaultVal = ''
      if (jglib.isEmpty(text)) text = defaultVal
      return text
    }
  },
  methods: {
    loadBrandProfile() {
      // console.log(this.brandInfo.profileImgFileId, this.brandInfo.profileImgFileNo)
      if (
        !jglib.isEmpty(this.brandInfo.profileImgFileId) &&
        !jglib.isEmpty(this.brandInfo.profileImgFileNo)
      ) {
        let reqObj = {
          fileId: this.brandInfo.profileImgFileId,
          fileNo: this.brandInfo.profileImgFileNo
        }
        getImageUrl(reqObj).then(res => {
          this.profileImageUrl = res.downloadUrl
          // console.log('profileImageUrl', this.profileImageUrl)
        })
      } else {
        this.profileImageUrl = ''
      }
    },
    prettyNewline(value, defVal) {
      let text = value
      if (jglib.isEmpty(defVal)) defVal = ''
      if (jglib.isEmpty(text)) text = defVal
      return text.replace(/(?:\r\n|\t|\n)/g, '<br/>')
    },
    initialized() {},
    chipmenuChanged(e) {
      let total = e.item.count
      let itemsPerPage = e.page.size
      let itemGoOut = e.item.index
      let itemRemain = total - (itemsPerPage + itemGoOut)
      if ((itemRemain - 2) === 0) { $('.chip_menu').removeClass().addClass('chip_menu last') } else { $('.chip_menu').removeClass().addClass('chip_menu col' + (itemGoOut + 1)) }
    },
    slideChanged(e) {
      if (e.item.index === 0) { $('.detail_wrap').removeClass().addClass('detail_wrap') } else { $('.detail_wrap').removeClass().addClass('detail_wrap nologo') }

      let total = e.item.count
      let itemsPerPage = e.page.size
      let itemGoOut = e.item.index
      let itemRemain = total - (itemsPerPage + itemGoOut)
      if (itemRemain === 0) { $('.slide').removeClass().addClass('slide last') } else { $('.slide').removeClass().addClass('slide col' + (itemGoOut + 1)) }

      this.slideIndex = e.item.index
      this.$emit('update:currCardIdx', e.item.index)
    }
  }
}
</script>
