<template>
  <!-- Standalone/Standalone Media Top -->
  <div class="template-richcard-general" :style="{width: cardWidth + 'px'}">
    <component
      v-for="(view, index) in content"
      :key="`content_${index}`"
      :is="view.type"
      :cardType="cardType"
      :componentData="view.data"
      :cssType="cssType"
    />
  </div>
</template>

<script>
import MediaView from './components/MediaView'
import TitleView from './components/TitleView'
import DescriptionView from './components/DescriptionView'
import comlib from '../../js/common'

export default {
  name: 'RichcardGeneral',
  props: {
    message: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    }
  },
  components: {
    MediaView,
    TitleView,
    DescriptionView
  },
  data() {
    return {
      cardWidth: 568 * 0.43,
      cssType: null,
      sample: {
        sms: {
          title: 'RBC샵 첫 구매 이벤트',
          description: 'RBC샵 첫 구매 이벤트<br><br>5만원 이상 첫 구매 후 응모 시 커피 쿠폰을 지급합니다.'
        },
        lms: {
          title: 'RBC에서 주문이 완료되었습니다.',
          description: `- 상품명 : 양수냄비<br>- 주문번호 : 2020-11-30-******<br>- 결제금액 : 23,200원(카드)<br>- 더블 후기 적립금<br>- 배송지 : 서울시 마포구 가양대로 1<br><br>※ 반품 기준은 당사 약관/홈페이지 내 상품 정보 고지 내용에 따르며 가전/가구 설치상품은 사용 후 반품이 불가하므로 이점 유의하시기 바랍니다.`
        },
        tall: {
          mediaUrl: 'MMS_Tall_244x227.png',
          title: 'RBC샵 다이렉트 배송 안내',
          description: '구매하신 제품이 원하시는 장소로 금일 발송 되었습니다.'
        },
        medium: {
          mediaUrl: 'MMS_Medium_244x144.png',
          title: 'RBC샵 다이렉트 배송 안내',
          description: '구매하신 제품이 원하시는 장소로 금일 발송 되었습니다.'
        }
      }
    }
  },
  computed: {
    content() {
      if (comlib.isEmpty(this.message) || comlib.isEmpty(this.message.generalPurposeCard) || comlib.isEmpty(this.message.generalPurposeCard.content)) {
        return []
      }
      let content = []
      let type = null
      let contentObj = this.message.generalPurposeCard.content
      if (contentObj.hasOwnProperty('media')) {
        // Standalone Media Top
        type = 'Standalone'
      } else if (contentObj.hasOwnProperty('title')) {
        // lms
        type = 'lms'
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.cssType = 'lms'
      } else {
        // sms
        type = 'sms'
      }

      let keys = Object.keys(contentObj)
      for (let key of keys) {
        if (key !== 'suggestions') {
          let data = null
          if (key === 'media' && type === 'Standalone') {
            if (contentObj[key]['height'] === 'TALL_HEIGHT') {
              data = {
                mediaUrl: this.sample.tall.mediaUrl
              }
            } else if (contentObj[key]['height'] === 'MEDIUM_HEIGHT') {
              data = {
                mediaUrl: this.sample.medium.mediaUrl
              }
            }
          } else if (key === 'title') {
            if (type === 'Standalone') {
              data = this.sample.tall.title
            } else if (type === 'lms') {
              data = this.sample.lms.title
            } else {
              data = null
            }
          } else if (key === 'description') {
            if (type === 'Standalone') {
              data = this.sample.tall.description
            } else if (type === 'lms') {
              data = this.sample.lms.description
            } else {
              data = this.sample.sms.description
            }
          }
          content.push({
            type: key + '-view',
            data: data
          })
        }
      }
      return content
    },
    cardType() {
      if (comlib.isEmpty(this.message) || comlib.isEmpty(this.message.generalPurposeCard) || comlib.isEmpty(this.message.generalPurposeCard.content)) {
        return ''
      }
      let contentObj = this.message.generalPurposeCard.content
      let cardType = ''
      if (!comlib.isEmpty(contentObj.media) && contentObj.media.hasOwnProperty('height')) {
        cardType = 'SM'
      }
      return cardType
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style>
</style>
