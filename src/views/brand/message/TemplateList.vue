<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 작성" />
        <div class="template-list__wrap">
          <ul class="list__sort-area">
            <li>
              <a role="button"
                :class="{'active' : sortActiveCate === 'all'}"
                @click="sortList('all')"
              >전체</a></li>
            <li>
              <a role="button"
                @click="sortList('text')"
                :class="{'active' : sortActiveCate === 'text'}"
                >텍스트 템플릿
              </a>
            </li>
            <li>
              <a role="button"
                @click="sortList('lms')"
                :class="{'active' : sortActiveCate === 'lms'}"
              >LMS 템플릿</a>
            </li>
            <li>
              <a role="button"
                @click="sortList('image')"
                :class="{'active' : sortActiveCate === 'image'}"
                >이미지 템플릿
              </a>
            </li>
          </ul>
          <div class="template-list" :class="sortActiveCate">
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
      sortActiveCate: 'all',
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
      let list = []
      if (this.sortActiveCate !== 'all') {
        list = this.templateList.filter((item) => {
          return item.type.toLowerCase().includes(this.sortActiveCate.toLowerCase())
        })
      } else {
        list = this.templateList
      }
      return list
    }
  },
  methods: {
    sortList(target) {
      this.sortActiveCate = target
    }
  }
}

</script>

<style>

</style>
