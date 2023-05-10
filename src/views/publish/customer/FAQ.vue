<template>
  <div class="inner notice-faq">
    <PageTitle pagetitle="FAQ" />
    <TabCategory :category="category" />
    <SearchTable listnumber=73 />
    <accordion>
        <accordion-item
          v-for="item in 10"
          :key="item"
        >
          <template slot="accordion-title">
            <span class="accodien-cate">
              Q
            </span>
              브랜드 개설을 하는데 어느정도 시간이 소요되나요? {{ item }}
          </template>
          <template slot="accordion-content">
            <span class="accodien-cate">
              A
            </span>
            <p> {{ item }} 브랜드 개설 요청 후 사이트 운영자의 승인 과정이 필요하며, 승인에 걸리는 시간은 최대 2영업일 소요됨을 원칙으로 합니다. .</p>
          </template>
        </accordion-item>
    </accordion>
    <PagingCmp />
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import TabCategory from '@/components/common/TabCategory'
import Accordion from './compornents/accordion'
import AccordionItem from './compornents/accordion-item'
import SearchTable from '@/components/common/SearchTable.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

export default {
  components: {
    PageTitle,
    TabCategory,
    Accordion,
    AccordionItem,
    SearchTable,
    PagingCmp
  },
  data() {
    return {
      category: ['전체', '가입', '서비스 관리', '브랜드 관리', '대화방 관리', '템플릿 관리', '자동응답 관리', '브랜드 소식 관리', '기타']
    }
  }
}
</script>

<style>

</style>
