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
          <masonry class="template-list" :cols="4" :gutter="24">
            <div class="template-item" v-for="(item, i) in sortTemplateList" :key="i" :id="item.id">
              <div class="template-item__box">
                  <img :src="item.imgUrl" alt="">
              </div>
              <div class="template-item__box--back">
                <h4 class="template-item__title">{{ item.title }}</h4>
                <ButtonCmp
                  type="btn-blue-line"
                  size="medium"
                  @click="$router.push({ name: `${item.name}`, query: { name: `${item.name}`, type: `${item.id}` } })"
                >템플릿 작성</ButtonCmp>
              </div>
            </div>
          </masonry>
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
          name: 'Creater',
          title: '텍스트 템플릿 - 텍스트 선택형_서술',
          imgUrl: require('@/assets/images/message/text_template_05.png')
        },
        {
          id: 'text2',
          type: 'text',
          name: 'Creater',
          title: '텍스트 템플릿 - 텍스트 선택형_스타일',
          imgUrl: require('@/assets/images/message/text_template_06.png')
        },
        {
          id: 'text3',
          type: 'text',
          name: 'Creater',
          title: '텍스트 템플릿 - 타이틀 자유형_서술',
          imgUrl: require('@/assets/images/message/text_template_03.png')
        },
        {
          id: 'text4',
          type: 'text',
          name: 'Creater',
          title: '텍스트 템플릿 - 타이틀 자유형_스타일',
          imgUrl: require('@/assets/images/message/text_template_04.png')
        },
        {
          id: 'text5',
          type: 'text',
          name: 'Creater',
          title: '텍스트 템플릿 - 아이템 강조형_서술',
          imgUrl: require('@/assets/images/message/text_template_01.png')
        },
        {
          id: 'text6',
          type: 'text',
          name: 'Creater',
          title: '텍스트 템플릿 - 아이템 강조형_스타일',
          imgUrl: require('@/assets/images/message/text_template_02.png')
        },
        {
          id: 'lms1',
          type: 'lms',
          name: 'CreaterLMS',
          title: 'LMS 템플릿 - 서술',
          imgUrl: require('@/assets/images/message/lms_template_01.png')
        },
        {
          id: 'lms2',
          type: 'lms',
          name: 'CreaterLMS',
          title: 'LMS 템플릿 - 서술_아이콘',
          imgUrl: require('@/assets/images/message/lms_template_02.png')
        },
        {
          id: 'lms3',
          type: 'lms',
          name: 'CreaterLMS',
          title: 'LMS 템플릿 - 2단',
          imgUrl: require('@/assets/images/message/lms_template_03.png')
        },
        {
          id: 'lms4',
          type: 'lms',
          name: 'CreaterLMS',
          title: 'LMS 템플릿 - 스타일',
          imgUrl: require('@/assets/images/message/lms_template_04.png')
        },
        // {
        //   id: 'lms5',
        //   type: 'lms',
        //   name: 'CreaterLMS',
        //   title: 'LMS 템플릿 - 광고형',
        //   imgUrl: require('@/assets/images/message/lms_template_05.png')
        // },
        // {
        //   id: 'lms6',
        //   type: 'lms',
        //   name: 'CreaterLMS',
        //   title: 'LMS 템플릿 - 예약/일정 안내형',
        //   imgUrl: require('@/assets/images/message/lms_template_06.png')
        // },
        {
          id: 'image1',
          type: 'image',
          name: 'CreaterImg',
          title: '이미지 템플릿 - 이미지 & 타이틀 강조형',
          imgUrl: require('@/assets/images/message/image_template_01.png')
        },
        {
          id: 'image2',
          type: 'image',
          name: 'CreaterImg',
          title: '이미지 템플릿 - 이미지 강조형',
          imgUrl: require('@/assets/images/message/image_template_02.png')
        },
        {
          id: 'image3',
          type: 'image',
          name: 'CreaterImg',
          title: '이미지 템플릿 - 썸네일 세로형',
          imgUrl: require('@/assets/images/message/image_template_03.png')
        },
        {
          id: 'image4',
          type: 'image',
          name: 'CreaterImg',
          title: '이미지 템플릿 - 썸네일 가로형',
          imgUrl: require('@/assets/images/message/image_template_04.png')
        },
        {
          id: 'image5',
          type: 'image',
          name: 'CreaterImg',
          title: '이미지 템플릿 - SNS형',
          imgUrl: require('@/assets/images/message/image_template_05.png')
        },
        {
          id: 'image6',
          type: 'image',
          name: 'CreaterImg',
          title: '이미지 템플릿 - SNS 중간버튼형',
          imgUrl: require('@/assets/images/message/image_template_06.png')
        },
        {
          id: 'image7',
          type: 'image',
          name: 'CreaterImg',
          title: '이미지 템플릿 - 이미지 템플릿 신규',
          imgUrl: require('@/assets/images/message/image_template_07.png')
        },
        {
          id: 'image8',
          type: 'image',
          name: 'CreaterImg',
          title: '이미지 템플릿 - 이미지 템플릿 캐러셀',
          imgUrl: require('@/assets/images/message/image_template_08.png')
        }
      ]
    }
  },
  created() {
    this.sortTemplateList = this.templateList
  },
  computed: {
    sortTemplateList: {
      get() {
        let filteredList = []
        this.templateList.forEach((item) => {
          this.sortOption.forEach((opt) => {
            if (item.type === opt) {
              filteredList.push(item)
            }
          })
        })
        return filteredList
      },
      set() {
      }
    }
  }
}

</script>
