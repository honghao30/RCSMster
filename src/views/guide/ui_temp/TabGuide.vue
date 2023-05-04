<template>
  <div class="tmep__wrap">
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>Tab 요소에 대한 기본 정의 내용 입니다.</li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="Tab (자동 넓이 꽉차게) " />
    <div class="wsg-guide-content">
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
    <TitleH3 titleh3="Tab (Tab 아이템 넓이 고정)" />
    <div class="wsg-guide-content">
      <TabCmp :tabWidth="160">
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
    <TitleH3 titleh3="Tab (10개 이상 - 가로 스크롤)" />
    <div class="wsg-guide-content">
      <TabCmp :tabWidth="180"> <!-- tab width 고정하고 싶을 때는 tabWidth 써주세요.-->
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
        <TabItem title="Tab5">
          <div>Tab5 내용</div>
        </TabItem>
        <TabItem title="Tab6">
          <div>Tab6 내용</div>
        </TabItem>
        <TabItem title="Tab7">
          <div>Tab7 내용</div>
        </TabItem>
        <TabItem title="Tab8">
          <div>Tab8 내용</div>
        </TabItem>
        <TabItem title="Tab9">
          <div>Tab9 내용</div>
        </TabItem>
        <TabItem title="Tab10">
          <div>Tab10 내용</div>
        </TabItem>
        <TabItem title="Tab11">
          <div>Tab11 내용</div>
        </TabItem>
        <TabItem title="Tab12">
          <div>Tab12 내용</div>
        </TabItem>
      </TabCmp>
    </div>
  </div>
</template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'
import TabCmp from '../../../components/common/TabCmp.vue'
import TabItem from '../../../components/common/TabItem.vue'

export default {
  data() {
    return {
      currentTab: 0
    }
  },
  components: {
    TitleH3,
    TabCmp,
    TabItem
  },
  methods: {
    tabCtrl: function(num) {
      this.currentTab = num
      this.collapseIdx = NaN
    }
  }
}
</script>
