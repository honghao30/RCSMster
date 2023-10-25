<template>
    <div class="tmep__wrap">
      <div class="wsg-guide-content">
        <div class="wsg-note__wrap--gray-box">
          <ul class="wsg_desc">
            <li>툴팁 가이드 입니다.</li>
          </ul>
        </div>
      </div>
      <div class="tepmfor-toolip">
        <!-- 툴팁 검토넌트 -->
        <!-- 추후 반영 예정: 디자인 적용 && 모션 && 멀티 셋팅  -->
        <!-- topPos or bottomPos -->
        <ToolTipEl
          direction="bottomPos"
          elAlign="leftType"
          width="280"
          mode="dark"
        >
          <template slot="tooltip-message">
            <div class="message__innerbox"
            >
              툴팁 컴포넌트입니다. 툴팁을 사용할 경우 이 컴포넌트를 사용하시면 됩니다.
            </div>
          </template>
        </ToolTipEl>
        <ToolTipEl
          direction="bottomPos"
          elAlign="center"
          width="480"
          mode="dark"
        >
          <template slot="tooltip-message">
            <div class="message__innerbox"
            >
            툴팁 컴포넌트입니다. 툴팁을 사용할 경우 이 컴포넌트를 사용하시면 됩니다. 툴팁 컴포넌트입니다. 툴팁을 사용할 경우 이 컴포넌트를 사용하시면 됩니다.
            </div>
          </template>
        </ToolTipEl>
        <ToolTipEl
          direction="topPos"
          elAlign="leftType"
          width="380"
          mode="dark"
        >
          <template slot="tooltip-message">
            <div class="message__innerbox"
            >
            툴팁 컴포넌트입니다. 툴팁을 사용할 경우 이 컴포넌트를 사용하시면 됩니다.툴팁 컴포넌트입니다. 툴팁을 사용할 경우 이 컴포넌트를 사용하시면 됩니다.
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
    gap: 150px;
    justify-content: center;
}
</style>
