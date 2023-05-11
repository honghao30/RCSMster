<template>
  <div class="inner require-list">
    <PageTitle pagetitle="온라인 문의" />
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue"
        @click="clickHandler"
      >
        문의하기
      </ButtonCmp>
    </div>
    <div class="table__wrap">
      <table class="table table-list">
        <colgroup>
          <col width="10%">
          <col>
          <col width="18%">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">상태</th>
            <th scope="col"><span>제목</span></th>
            <th scope="col"><span></span>등록일</th>
          </tr>
        </thead>
      </table>
    </div>
    <accordion>
        <accordion-item
          v-for="item in listData" :key="item"
        >
          <template slot="accordion-title">
            <span class="accordion-cate">
              <span class="require-list__complete" v-if="item.complete">답변완료</span>
              <span class="require-list__wait" v-if="!item.complete">답변대기</span>
            </span>
            <span> {{ item.title }} </span>
            <p class="require-list__date"> {{ item.date }} </p>
          </template>
          <template slot="accordion-content">
            <div class="accordion-question">
              <div>
                <span class="accordion-cate">
                  Q
                </span>
                <span class="require-list__question-keyword"> {{ item.keyword }} </span>
                <p class="require-list__question"> {{ item.question }} </p>
              </div>
            </div>
            <div class="accordion-answer">
              <div>
                <span class="accordion-cate">
                  A
                </span>
                <p class="require-list__answer"> {{ item.answer }} </p>
                <span class="require-list__answer-date"> {{ item.answerdate }} </span>
              </div>
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
      listData: [
        {
          complete: false,
          title: '가입 승인이 아직도 안되었어요. 승인 결과 안내 받을 수 있나요?',
          date: '2023.04.25',
          keyword: '',
          question: '가입 승인이 아직도 안되었어요. 승인 결과 안내 받을 수 있나요?',
          answer: '',
          answerdate: ''
        },
        {
          complete: true,
          title: '브랜드 생성을 어디서 하는지 모르겠습니다.',
          date: '2023.04.25',
          keyword: '#브랜드 관리',
          question: '브랜드 생성을 어디서 하는지 모르겠습니다. 안녕하세요.​브랜드 개설을 어디에서 해야 하나요? ​매뉴얼도 받을 수 있나요??',
          answer: 'Biz RCS는 브랜드를 통해 입력받은 정보(프로필 이미지, 대화방명, 브랜드홈 정보 등) 를 문자 수신고객이 저장하지 않더라도 보여줄 수 있는 특징이 있습니다. 브랜드 개설은 이를 위한 사전 과정으로, 입력 정보에는 백그라운드 이미지와, 프로필 이미지, 브랜드명, 브랜드 설명, 노출시킬 전화번호 등의 정보입력이 필요히며, 해당 브랜드 정보를 노출시킬 발신번호를 입력 후 승인과정을 거치면 완료됩니다.',
          answerdate: '2023.04.26'
        },
        {
          complete: true,
          title: '템플릿 등록 오류 문의드립니다.',
          date: '2023.04.25',
          keyword: '',
          question: '브랜드 홈에는 어떤 정보를 표시할 수 있나요?',
          answer: '',
          answerdate: ''
        },
        {
          complete: true,
          title: '가입 승인이 아직도 안되었어요. 승인 결과 안내 받을 수 있나요?',
          date: '2023.04.25',
          keyword: '',
          question: '가입 승인이 아직도 안되었어요. 승인 결과 안내 받을 수 있나요?',
          answer: '',
          answerdate: ''
        },
        {
          complete: true,
          title: '브랜드 생성을 어디서 하는지 모르겠습니다.',
          date: '2023.04.25',
          keyword: '',
          question: '브랜드 생성을 어디서 하는지 모르겠습니다.',
          answer: '',
          answerdate: ''
        },
        {
          complete: true,
          title: '템플릿 등록 오류 문의드립니다.',
          date: '2023.04.25',
          keyword: '',
          question: '브랜드 홈에는 어떤 정보를 표시할 수 있나요?',
          answer: '',
          answerdate: ''
        },
        {
          complete: true,
          title: '가입 승인이 아직도 안되었어요. 승인 결과 안내 받을 수 있나요?',
          date: '2023.04.25',
          keyword: '',
          question: '가입 승인이 아직도 안되었어요. 승인 결과 안내 받을 수 있나요?',
          answer: '',
          answerdate: ''
        },
        {
          complete: true,
          title: '브랜드 생성을 어디서 하는지 모르겠습니다.',
          date: '2023.04.25',
          keyword: '',
          question: '브랜드 생성을 어디서 하는지 모르겠습니다.',
          answer: '',
          answerdate: ''
        },
        {
          complete: true,
          title: '템플릿 등록 오류 문의드립니다.',
          date: '2023.04.25',
          keyword: '',
          question: '브랜드 홈에는 어떤 정보를 표시할 수 있나요?',
          answer: '',
          answerdate: ''
        },
        {
          complete: true,
          title: '가입 승인이 아직도 안되었어요. 승인 결과 안내 받을 수 있나요?',
          date: '2023.04.25',
          keyword: '',
          question: '가입 승인이 아직도 안되었어요. 승인 결과 안내 받을 수 있나요?',
          answer: '',
          answerdate: ''
        }
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>

</style>
