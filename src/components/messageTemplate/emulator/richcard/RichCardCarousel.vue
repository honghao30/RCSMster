<template>
  <!-- Carousel Medium/Small 슬라이드형 -->
  <div class="template-richcard-carousel-warpper">
    <div class="template-richcard-carousel" :style="carouselWidth" ref="carousel">
      <div
        class="template-richcard-carousel-item"
        v-for="(item, index) in content"
        :key="`carousel_${index}`"
        :style="{width: styleWidth + 'px'}"
      >
        <media-view v-if="item.media" :componentData="item.media" :cardType="cardType"></media-view>
        <title-view v-if="item.title" :componentData="item.title" :cssType="cssType"></title-view>
        <description-view v-if="item.description" :componentData="item.description" :cssType="cssType"></description-view>
      </div>
    </div>
    <div v-show="!isPrev" class="template-richcard-carousel-prev" @click="prev">Prev</div>
    <div v-show="!isNext" class="template-richcard-carousel-next" @click="next">Next</div>
  </div>
</template>

<script>
import MediaView from './components/MediaView'
import TitleView from './components/TitleView'
import DescriptionView from './components/DescriptionView'
import comlib from '../../js/common'

export default {
  name: 'RichCardCarousel',
  components: {
    MediaView,
    TitleView,
    DescriptionView
  },
  props: {
    message: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      carouselLeft: 0,
      currPage: 1,
      cssType: null,
      sample: {
        cs: [
          {
            mediaUrl: 'MMS_Medium_120x112_1.png',
            title: '믿고 보내는 문자메시지 <채팅+>',
            description: '고객님, 안녕하세요.<br>확 달라진 메시지 앱, 채팅+를 소개합니다.<br>좌우로 넘기며 새로운 기능을 알아보세요.'
          },
          {
            mediaUrl: 'MMS_Medium_120x112_2.png',
            title: '1. ‘메시지 읽음 확인’ 기능',
            description: '파란 말풍선 옆에 숫자 “1”이 나타나도<br>놀라지 마세요.<br>이제 문자메시지도 상대방이 읽었는지<br>확인할 수 있습니다.<br>(채팅플러스 이용 고객님끼리 서로 확인할 수 있습니다.)'
          },
          {
            mediaUrl: 'MMS_Medium_120x112_3.png',
            title: '2. 데이터 차감 없이 사진/영상 전송',
            description: '데이터 걱정 없이 사진과 동영상을<br>공유해보세요.<br>파일당 최대 5MB까지 데이터 차감 없이<br>보낼 수 있습니다.'
          },
          {
            mediaUrl: 'MMS_Medium_120x112_4.png',
            title: '3. 마음을 전하는 ‘선물하기’',
            description: '메시지 작성한 하단 ‘+’ 버튼을 누르고<br>‘선물’을 누르세요.<br>커피, 영화 티켓, 상품권 등으로 고마운<br>사람에게 마음을 전할 수 있습니다.'
          },
          {
            mediaUrl: 'MMS_Medium_120x112_5.png',
            title: '4. 채팅+라서 더 믿음직한 ‘송금하기’',
            description: '메시지 작성한 하단 ‘+’ 버튼을 누르고<br>‘토스로 송금’ 또는 ‘핀크로 송금’을<br>누르세요.<br>버튼 하나로 간편하게 송금할 수 있습니다.'
          },
          {
            mediaUrl: 'MMS_Medium_120x112_6.png',
            title: '5. 비즈메시지 기능<br><br>',
            description: '기업용 메시지도 더 풍성하게 이미지를<br>구성할 수 있습니다.<br>채팅+로 몰입도 높은 메시지를 받아보세요.'
          }
        ],
        cr: [
          {
            mediaUrl: 'MMS_Medium_232x168_1.png',
            title: '믿고 보내는 문자메시지 <채팅플러스>',
            description: '고객님, 안녕하세요.<br>확 달라진 메시지 앱, 채팅+를 소개합니다.<br>좌우로 넘기며 새로운 기능을 알아보세요.'
          },
          {
            mediaUrl: 'MMS_Medium_232x168_2.png',
            title: '1. ‘메시지 읽음 확인’ 기능',
            description: '파란 말풍선 옆에 숫자 “1”이 나타나도<br>놀라지 마세요.<br>이제 문자메시지도 상대방이 읽었는지<br>확인할 수 있습니다.<br>(채팅플러스 이용 고객님끼리 서로 확인할 수 있습니다.)'
          },
          {
            mediaUrl: 'MMS_Medium_232x168_3.png',
            title: '2. 데이터 차감 없이 사진/동영상 보내기',
            description: '데이터 걱정 없이 사진과 동영상을<br>공유해보세요.<br>파일당 최대 5MB까지 데이터 차감 없이<br>보낼 수 있습니다.'
          },
          {
            mediaUrl: 'MMS_Medium_232x168_4.png',
            title: '3. 마음을 전하는 ‘선물하기’',
            description: '메시지 작성한 하단 ‘+’ 버튼을 누르고<br>‘선물’을 누르세요.<br>커피, 영화 티켓, 상품권 등으로 고마운<br>사람에게 마음을 전할 수 있습니다.'
          },
          {
            mediaUrl: 'MMS_Medium_232x168_5.png',
            title: '4. 채팅+라서 더 믿음직한 ‘송금하기’',
            description: '메시지 작성한 하단 ‘+’ 버튼을 누르고<br>‘토스로 송금’ 또는 ‘핀크로 송금’을<br>누르세요.<br>버튼 하나로 간편하게 송금할 수 있습니다.'
          },
          {
            mediaUrl: 'MMS_Medium_232x168_6.png',
            title: '5. 비즈메시지 기능',
            description: '기업용 메시지도 더 풍성하게 이미지를<br>구성할 수 있습니다.<br>채팅+로 몰입도 높은 메시지를<br>받아보세요.'
          }
        ]
      }
    }
  },
  computed: {
    content() {
      if (comlib.isEmpty(this.message) || comlib.isEmpty(this.message.generalPurposeCardCarousel.content)) {
        return []
      }
      const cardWidth = this.message.generalPurposeCardCarousel.layout.cardWidth === 'SMALL_WIDTH' ? 'CS' : 'CR'
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.cssType = cardWidth
      this.message.generalPurposeCardCarousel.content.forEach((data, index) => {
        let sample = cardWidth === 'CS' ? this.sample.cs[index] : this.sample.cr[index]
        data.media.mediaUrl = sample.mediaUrl
        data.title = sample.title
        data.description = sample.description
      })
      return this.message.generalPurposeCardCarousel.content
    },
    carouselWidthNum() {
      return (this.cardWidth + 10) * this.content.length
    },
    carouselWidth() {
      return `width: ${this.carouselWidthNum}px`
    },
    parentWidth() {
      return this.$refs.carousel.parentElement.offsetWidth
    },
    styleWidth() {
      let media = this.content[0].media
      let width = 248
      if (media.height === 'SHORT_HEIGHT') {
        width = 240 * 0.5
      } else if (media.height === 'MEDIUM_HEIGHT') {
        width = 464 * 0.5
      }
      return width
    },
    isPrev() {
      return this.currPage === 1
    },
    isNext() {
      return this.currPage === this.content.length
    },
    cardType() {
      let cardType = ''
      let layout = this.message.generalPurposeCardCarousel.layout
      if (layout.cardWidth === 'SMALL_WIDTH') {
        cardType = 'CS'
      } else if (layout.cardWidth === 'MEDIUM_WIDTH') {
        cardType = 'CR'
      }
      return cardType
    },
    cardWidth() {
      let cardWidth = 240 * 0.5
      let layout = this.message.generalPurposeCardCarousel.layout
      if (layout.cardWidth === 'SMALL_WIDTH') {
        cardWidth = 240 * 0.5
      } else if (layout.cardWidth === 'MEDIUM_WIDTH') {
        cardWidth = 464 * 0.5
      }
      return cardWidth
    }
  },
  watch: {
    message: {
      deep: true,
      handler(message) {
        this.currPage = 1
        this.carouselLeft = 0
        this.$refs.carousel.style.left = '0px'
      }
    }
  },
  created() {},
  mounted() {
    this.next()
    this.prev()
  },
  methods: {
    prev() {
      let left = this.carouselLeft + this.cardWidth + 9
      this.carouselLeft = left < 0 ? left : 0
      this.$refs.carousel.style.left = this.carouselLeft + 'px'
      this.currPage--
    },
    next() {
      let max = this.parentWidth - this.carouselWidthNum
      let left = this.carouselLeft - this.cardWidth - 9
      this.carouselLeft = left < max ? max : left
      this.$refs.carousel.style.left = this.carouselLeft + 'px'
      this.currPage++
    }
  }
}
</script>

<style lang="less">
</style>
