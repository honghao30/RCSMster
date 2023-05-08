<template>
  <div class="inner">
    <PageTitle pagetitle="FAQ" />
    <TabCategory :category="category" />
    <div class="collapse-list">
      <div class="collapse-item" v-for="(item, j) in faqList" :key="j">
        <a role="button" @click="collapseCtrl(j)">{{ item.header }}</a>
        <div class="collapse-item__contents" v-if="collapseIdx === j">
            {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import TabCategory from '@/components/common/TabCategory'

export default {
  components: {
    PageTitle,
    TabCategory
  },
  data() {
    return {
      category: ['전체', '가입', '서비스 관리', '브랜드 관리', '대화방 관리', '템플릿 관리', '자동응답 관리', '브랜드 소식 관리', '기타'],
      collapseIdx : undefined,
      faqList: [
        {
          header : '질문1',
          content : '답변1'
        },
        {
          header : '질문2',
          content : '답변2'
        },
        {
          header : '질문3',
          content : '답변3'
        }
      ]
    }
  },
  methods: {
    collapseCtrl: function(num) {
      if(this.collapseIdx == num) {
        this.collapseIdx = undefined;
      }else {
        this.collapseIdx = num
      }
    }
  }
}
</script>

<style>

</style>
