<template>
  <div class="tmep__wrap">
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>Tab 요소에 대한 기본 정의 내용 입니다.</li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="Tab(스와이프 형)" />
    <TabCategory :category="category"/>
    <TitleH3 titleh3="Tab (자동 넓이 꽉차게) " />
    <TabCmp>
      <TabItem title="Tab1">
        <div>Tab1 내용</div>
      </TabItem>
      <TabItem title="Tab2">
        <div>Tab2 내용</div>
      </TabItem>
      <TabItem title="Tab3">
        <div>Tab3 내용</div>
      </TabItem>
      <TabItem title="Tab4">
        <div>Tab4 내용</div>
      </TabItem>
    </TabCmp>
  </div>
</template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'
import TabCmp from '../../../components/common/TabCmp.vue'
import TabItem from '../../../components/common/TabItem.vue'
import TabCategory from '@/components/common/TabCategory'

export default {
  data() {
    return {
      currentTab: 0,
      category: ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6 긴 이름~~']
    }
  },
  components: {
    TitleH3,
    TabCmp,
    TabItem,
    TabCategory
  },
  methods: {
  }
}
</script>
