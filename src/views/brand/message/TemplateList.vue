<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 작성" />
        <div class="template-list__wrap">
          <div class="list__sort-area">
            <span class="checkbox">
              <input type="checkbox" id="textTemplate" value="text" v-model="sortOption" class="blind"/>
              <label for="textTemplate"><span class="checkbox__text">텍스트 템플릿</span></label>
            </span>
            <span class="checkbox">
              <input type="checkbox" id="lmsTemplate" value="lms" v-model="sortOption" class="blind"/>
              <label for="lmsTemplate"><span class="checkbox__text">LMS 템플릿</span></label>
            </span>
            <span class="checkbox">
              <input type="checkbox" id="imageTemplate" value="image" v-model="sortOption" class="blind"/>
              <label for="imageTemplate"><span class="checkbox__text">이미지 템플릿</span></label>
            </span>
            <span class="checkbox">
              <input type="checkbox" id="type1" value="type1" v-model="sortOption" class="blind"/>
              <label for="type1"><span class="checkbox__text">상품유형1</span></label>
            </span>
            <span class="checkbox">
              <input type="checkbox" id="type2" value="type2" v-model="sortOption" class="blind"/>
              <label for="type2"><span class="checkbox__text">상품유형2</span></label>
            </span>
          </div>
          <div class="template-list">
            <div class="template-item" v-for="item in sortTemplateList" :key="item" :id="item.id">
              <div class="template-item__box">
                <img :src="item.imgUrl" alt="">
              </div>
              <div class="template-item__box--back">
                <h4 class="template-item__title">{{ item.title }}</h4>
                <ButtonCmp
                  type="btn-blue-line"
                  size="medium"
                >템플릿 작성</ButtonCmp>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    BrandLnb,
    PageTitle,
    ButtonCmp
  },
  data() {
    return {
      sortOption: ['text', 'lms', 'image', 'type1', 'type2'],
      templateList: [
        {
          id: 'text1',
          type: 'text',
          title: '텍스트 템플릿 - 아이템 강조형1',
          imgUrl: require('@/assets/images/message/text_template_01.png')
        },
        {
          id: 'text2',
          type: 'text',
          title: '텍스트 템플릿 - 아이템 강조형2',
          imgUrl: require('@/assets/images/message/text_template_02.png')
        },
        {
          id: 'text3',
          type: 'text',
          title: '텍스트 템플릿 - 타이틀 자유형1',
          imgUrl: require('@/assets/images/message/text_template_03.png')
        },
        {
          id: 'text4',
          type: 'text',
          title: '텍스트 템플릿 - 타이틀 자유형2',
          imgUrl: require('@/assets/images/message/text_template_04.png')
        },
        {
          id: 'text5',
          type: 'text',
          title: '텍스트 템플릿 - 타이틀 선택형1',
          imgUrl: require('@/assets/images/message/text_template_05.png')
        },
        {
          id: 'text6',
          type: 'text',
          title: '텍스트 템플릿 - 타이틀 선택형2',
          imgUrl: require('@/assets/images/message/text_template_06.png')
        },
        {
          id: 'lms1',
          type: 'lms',
          title: 'LMS 템플릿 - 장문형',
          imgUrl: require('@/assets/images/message/lms_template_01.png')
        },
        {
          id: 'lms2',
          type: 'lms',
          title: 'LMS 템플릿 - 문단형',
          imgUrl: require('@/assets/images/message/lms_template_02.png')
        },
        {
          id: 'lms3',
          type: 'lms',
          title: 'LMS 템플릿 - 타이틀 강조형',
          imgUrl: require('@/assets/images/message/lms_template_03.png')
        },
        {
          id: 'lms4',
          type: 'lms',
          title: 'LMS 템플릿 - 청구서형',
          imgUrl: require('@/assets/images/message/lms_template_04.png')
        },
        {
          id: 'lms5',
          type: 'lms',
          title: 'LMS 템플릿 - 광고형',
          imgUrl: require('@/assets/images/message/lms_template_05.png')
        },
        {
          id: 'lms6',
          type: 'lms',
          title: 'LMS 템플릿 - 예약/일정 안내형',
          imgUrl: require('@/assets/images/message/lms_template_06.png')
        },
        {
          id: 'image1',
          type: 'image',
          title: '이미지 템플릿 - 상품권/티켓형',
          imgUrl: require('@/assets/images/message/image_template_01.png')
        },
        {
          id: 'image2',
          type: 'image',
          title: '이미지 템플릿 - 이미지 강조형3',
          imgUrl: require('@/assets/images/message/image_template_02.png')
        },
        {
          id: 'image3',
          type: 'image',
          title: '이미지 템플릿 - 이미지 강조형1',
          imgUrl: require('@/assets/images/message/image_template_03.png')
        },
        {
          id: 'image4',
          type: 'image',
          title: '이미지 템플릿 - 이미지 강조형2',
          imgUrl: require('@/assets/images/message/image_template_04.png')
        },
        {
          id: 'image5',
          type: 'image',
          title: '이미지 템플릿 - 썸네일 세로형',
          imgUrl: require('@/assets/images/message/image_template_05.png')
        },
        {
          id: 'image6',
          type: 'image',
          title: '이미지 템플릿 - 썸네일 가로형',
          imgUrl: require('@/assets/images/message/image_template_06.png')
        },
        {
          id: 'image7',
          type: 'image',
          title: '이미지 템플릿 - SNS형',
          imgUrl: require('@/assets/images/message/image_template_07.png')
        }
      ]
    }
  },
  created() {
    this.sortTemplateList = this.templateList
  },
  computed: {
    sortTemplateList() {
      // list = this.sortOption.forEach((opt) => {
      //   this.templateList.filter((item) => {
      //     return item.type.toLowerCase().includes(opt.toLowerCase())
      //   })
      // })
      // return list
      let list = this.templateList
      return list
    }
  },
  methods: {
  }
}

</script>

<style>

</style>
