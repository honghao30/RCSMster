<template>
  <div class="inner require-list">
    <PageTitle pagetitle="온라인 문의" />
    <div >
      <ButtonCmp
        type="btn-blue"
        @click="clickHandler"
      >
        문의하기
      </ButtonCmp>
    </div>
    <accordion>
        <accordion-item
          v-for="item in faqData" :key="item"
        >
          <template slot="accordion-title">
            <span class="accodien-cate">
              <p class="require-list__wait" v-if="item.wait">답변대기</p>
              <p class="require-list__complete" v-if="item.complete">답변완료</p>
            </span>
            <p> {{ item.title }} </p>
          </template>
          <template slot="accordion-content">
            <div class="accodien-question">
              <span class="accodien-cate">
                Q
              </span>
              <p> {{ item.question }} </p>
            </div>
            <div class="accodien-answer">
              <span class="accodien-cate">
                A
              </span>
              <p> {{ item.answer }} </p>
            </div>
          </template>
        </accordion-item>
    </accordion>
    <PagingCmp />
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import Accordion from './components/accordion'
import AccordionItem from './components/accordion-item'
import PagingCmp from '@/components/common/PagingCmp.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    PageTitle,
    Accordion,
    AccordionItem,
    PagingCmp,
    ButtonCmp
  },
  data() {
    return {
      category: ['전체', '가입', '서비스 관리', '브랜드 관리', '대화방 관리', '템플릿 관리', '자동응답 관리', '브랜드 소식 관리', '기타'],
      faqData: [
        {
          wait: true,
          complete: false,
          title: '브랜드 개설이란 무엇인가요?',
          question: '브랜드 개설이란 무엇인가요?',
          answer: 'Biz RCS는 브랜드를 통해 입력받은 정보(프로필 이미지, 대화방명, 브랜드홈 정보 등) 를 문자 수신고객이 저장하지 않더라도 보여줄 수 있는 특징이 있습니다. 브랜드 개설은 이를 위한 사전 과정으로, 입력 정보에는 백그라운드 이미지와, 프로필 이미지, 브랜드명, 브랜드 설명, 노출시킬 전화번호 등의 정보입력이 필요히며, 해당 브랜드 정보를 노출시킬 발신번호를 입력 후 승인과정을 거치면 완료됩니다.'
        },
        {
          wait: true,
          complete: false,
          title: '브랜드 개설이란 무엇인가요?',
          question: '브랜드 개설을 하는데 어느정도 시간이 소요되나요?',
          answer: ''
        },
        {
          wait: true,
          complete: false,
          title: '브랜드 개설이란 무엇인가요?',
          question: '브랜드 홈에는 어떤 정보를 표시할 수 있나요?',
          answer: ''
        },
        {
          wait: true,
          complete: false,
          title: '브랜드 개설이란 무엇인가요?',
          question: '브랜드 개설 요청 시 어떤 경우에 반려가 되나요?',
          answer: ''
        },
        {
          wait: true,
          complete: false,
          title: '브랜드 개설이란 무엇인가요?',
          question: '브랜드 개설은 메시징 발송 사업자의 사이트에서 할 수 없나요?',
          answer: ''
        }
      ]
    }
  },
  computed: {
  }
}
</script>

<style>

</style>
