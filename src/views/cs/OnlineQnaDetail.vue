<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <breadcrumb :depth1MenuId="'M0400'" :depth2MenuId="'M0403'"/>
      <div class="top_title_area">
        <h2 class="h2_title">온라인 문의</h2>
      </div>
      <div class="detail_view_wrap">
        <div class="subject_area">
          <strong class="title" v-html="this.subject"></strong>
          <span class="date">{{ this.faqDetailList.regDt | prettyDate('YYYY-MM-DD') }}</span>
        </div>
        <div class="content_area" v-html="this.ctn"></div>
        <div class="reply_area" v-if="ansYnFlag">
          <strong class="text_blue">답변완료</strong>
          <div class="cont_reply" v-html="this.ansCtn"></div>
          <span class="date">{{ this.faqDetailList.ansDt | prettyDate('YYYY-MM-DD') }}</span>
        </div>
        <div class="reply_area" v-if="!ansYnFlag">
          <strong class="text_gray">답변대기</strong>
          <div class="cont_reply" v-html="this.ansCtn"></div>
        </div>
      </div>
      <div class="btn_wrap right mar_t30">
        <a href="javascript:void(0);" class="btn mid bd_black" @click="goFaqList">목록</a>
      </div>
    </article>
  </div>
</template>

<script>
import { getQnaDetailList } from '@/api/cs/onlineqna'
import Breadcrumb from '@/components/global/Breadcrumb'
// 스크립트를 정의하는 부분
// 개발자 작업 영역

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  name: 'onlineqnadetail',
  data() {
    return {
      faqDetailList: [],
      ansYnFlag: true,
      subject: '',
      ctn: '',
      ansCtn: ''
    }
  },
  components: {
    Breadcrumb
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
    let params = {
      seq: this.$route.params.seq
    }
    getQnaDetailList(params)
      .then(res => {
        this.faqDetailList = res.result.detail
        this.subject = this.faqDetailList.subject.replace(/\n/gi, '<br/>')
        this.ctn = this.faqDetailList.ctn.replace(/\n/gi, '<br/>')
        this.ansCtn = this.faqDetailList.ansCtn.replace(/\n/gi, '<br/>')
        if (this.faqDetailList.ansYn === '답변완료') {
          this.ansYnFlag = true
        } else {
          this.ansYnFlag = false
        }
      })
      .catch(res => {})
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이벤트에 따라 실행하거나, 내부적으로 사용되는 함수들을 정의한다.
    goFaqList() {
      this.$router.push('/cs/qna')
    }
  }
}
</script>

<style lang="less" scoped></style>
