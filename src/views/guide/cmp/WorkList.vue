<template>
  <div class="content__wrap">
    <SubTitle pagetitle="퍼블 리스트" />
    <div class="content-body">
      <TitleH3 titleh3="RCS Biz Center 리뉴얼 - 퍼블리싱 현황판" />
      <div class="wsg-guide-content">
        <div class="wsg-note__wrap--gray-box">
          <h4
            class="note-title"
          >
            Note
          </h4>
          <ul class="ia-note-desc">
            <li>※ IA 기준으로 목록 업데이트 필요</li>
            <li>- 완료시 상태항목에 [완료]</li>
            <li>- 상태값에 [완료] 문구 등록시 완료페이지로 표시됨.</li>
            <li>- 규칙이나 공지가 필요한 사항 지속 추가 예정</li>
          </ul>
        </div>
      </div>
      <!-- <TitleH3 titleh3="퍼블리싱 현황" />
      <div class="wsg-guide-content">
        <StausDisplay
          title="Guide"
          :list="guideList"
        />
        <StausDisplay
          title="Home"
          :list="homeList"
        />
        <StausDisplay
          title="대시보드"
          :list="dashboardList"
        />
      </div> -->
      <TitleH3 titleh3="퍼블리싱 리스트" />
      <PubComponent
        :list="guideList"
        title="Guide"
      />
      <PubComponent
        :list="homeList"
        title="Home"
      />
      <PubComponent
        :list="dashboardList"
        title="대시보드"
      />
    </div>
  </div>
</template>

<script>
import SubTitle from './SubTitle.vue'
import TitleH3 from './TitleH3.vue'
import PubComponent from './PubComponent.vue'
import StausDisplay from './StausDisplay.vue'
import { guideList, homeList, dashboardList } from '../iaList'

export default {
  name: 'BasicGuide',
  components: {
    SubTitle,
    TitleH3,
    PubComponent,
    StausDisplay
  },
  data () {
    return {
      guideList,
      homeList,
      dashboardList,
      GuideTotal: 0,
      HomeTotal: 0,
      DashBoardTotal: 0
    }
  }
}
</script>

<style lang="scss">
.content__wrap {
  width: 100%;
  height: 100%;
  padding:20px;
  .content-body {
    padding: 20px 0;
  }
}
.wsg-guide-content {
  background-color:#eee;
  padding:20px;
  margin-bottom:20px;
  .note-title {
    color:#343b45;
    font-weight:700;
    margin-bottom:10px;
  }
  .ia-note-desc {
    line-height:1.6;
  }
}

</style>
