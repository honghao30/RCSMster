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
        <ButtonCmp
            type="btn-blue-line"
            @click="handleTooltip"
        >
            툴팁 클릭형
        </ButtonCmp>
        <ToolTipView>
            툴팁1
        </ToolTipView>
        <ButtonCmp
            type="btn-blue-line"
            @:mouseover="handleTooltipHover(event)"
        >
            툴팁
        </ButtonCmp>
        <ToolTipView>
            툴팁2
        </ToolTipView>
      </div>
    </div>
  </template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ToolTipView from '@/components/common/Tooltip.vue'

export default {
  components: {
    TitleH3,
    ButtonCmp,
    ToolTipView
  },
  methods: {
    handleTooltip () {
      alert('aa')
    },
    handleTooltipHover (event) {
      console.log('dd')
    }
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
