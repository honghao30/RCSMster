<template>
  <div class="tmep__wrap">
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>아코디언 가이드입니다.</li>
          <li>slot형으로 아코디언 컴포넌트에서 이벤트를 처리 합니다.</li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="아코디언 " />
    <div class="wsg-guide-content">
      <accordion>
        <accordion-item
          v-for="item in 10" :key="item"
        >
          <template slot="accordion-title">
            <p>제목 입니다.{{ item }}</p>
          </template>
          <template slot="accordion-content">
            <p>제목에 대한 답변 입니다.{{ item }}</p>
          </template>
        </accordion-item>
      </accordion>
    </div>
  </div>
</template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'
import Accordion from '@/views/cs/components/accordion'
import AccordionItem from '@/views/cs/components/accordion-item'

export default {
  components: {
    TitleH3,
    Accordion,
    AccordionItem
  },
  data() {
    return {
      isModalViewed: false
    }
  },
  watch: {
    isModalViewed () {
      if (this.isModalViewed) {
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  methods: {
    modalView () {
      this.isModalViewed = true
    },
    closeMsge () {
      alert('버튼 이벤트도 자유롭게')
      this.isModalViewed = false
    }
  }
}
</script>
