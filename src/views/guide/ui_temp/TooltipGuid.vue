<template>
    <div class="tmep__wrap">
      <div class="wsg-guide-content">
        <div class="wsg-note__wrap--gray-box">
          <ul class="wsg_desc">
            <li>툴팁 가이드 입니다.</li>
          </ul>
        </div>
      </div>
      <TitleH3 titleh3="툴팁" />
      <div class="tepmfor-toolip">
        <!-- 툴팁 검토넌트 -->
        <!-- 추후 반영 예정: 디자인 적용 && 위치 자동 계산 && 모션 && 멀티 셋팅  -->
        <ToolTipEl
          direction="top"
          width="280"
          mode="dark"
        >
          <template slot="tooltip-message">
            <div class="message__innerbox"
            >
              그룹ID는 분석하고자 하는 메시지별로 설정하는 것을 권장합니다.
            </div>
          </template>
        </ToolTipEl>
         <!-- 툴팁 검토넌트 -->
      </div>
    </div>
  </template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'
import ToolTipEl from '@/components/common/Tooltip.vue'

export default {
  components: {
    TitleH3,
    ToolTipEl
  },
  data () {
    return { }
  }
}
</script>

<style lang="scss" scoped>
.tepmfor-toolip {
    min-height:300px;
    display: flex;
    gap: 50px;
}
</style>
