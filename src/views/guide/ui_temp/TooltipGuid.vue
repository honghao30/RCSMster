<template>
    <div class="tmep__wrap">
      <div class="wsg-guide-content">
        <div class="wsg-note__wrap--gray-box">
          <ul class="wsg_desc">
            <li>툴팁 가이드 입니다.</li>
            <li>단일 방향일 경우 1번, 기타 경우 2번 사항</li>
          </ul>
        </div>
      </div>
      <TitleH3 titleh3="툴팁" />
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
              그룹ID는 분석하고자 하는 메시지별로 설정하는 것을 권장합니다.
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
            한국에서 주로 이용되며 관심의 대상인 미니벨로는 보통 두 가지로 나뉜다. 브롬톤 등의 대중교통과 연계돼서 사용되는 커뮤터(폴딩)와, 다수 미벨인이 타는 미니 스프린터(Mini Sprinter)이다.

미니 스프린터는 로드바이크에 사용되는 구동계나 타이어를 사용해서 빠른 속도로 달릴 수 있는 미니벨로이다. 대부분 로드바이크와 같은 구부러진 핸들(드롭바 drop bar)을 사용하여 공기 저항을 줄이고 있다. 뭉뚱그려 쉽게 말하면, 로드바이크에서 바퀴 크기만 줄인 것이 미니스프린터이다. 경량화를 중시하기 때문에 대다수 미니스프린터는 접히지 않는다. 한국에서 판매되는 미니 스프린터로는 알톤스포츠의 베네통 BRD-2016a, 첼로스포츠[1]의 R2000, 등이 인기를 끌고 있었지만, 2010년 들어서 첼로스포츠의 메리디안, 벨로라인 셔틀, 크로몰리 프레임을 채택한 테릭스의 티아고 등 여러 고급모델들이 출시되면서 선택의 폭이 넓어지고 있다.
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
            한국에서 주로 이용되며 관심의 대상인 미니벨로는 보통 두 가지로 나뉜다. 브롬톤 등의 대중교통과 연계돼서 사용되는 커뮤터(폴딩)와, 다수 미벨인이 타는
            </div>
          </template>
        </ToolTipEl>
         <!-- 툴팁 검토넌트 -->
      </div>
      <!-- 엘리먼트 ui -->
      <div class="box">
            <div class="top">
              <el-tooltip class="item" effect="dark" content="Top Left prompts info" placement="top-start">
                <el-button>top-start</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Top Center prompts info" placement="top">
                <el-button>top</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Top Right prompts info" placement="top-end">
                <el-button>top-end</el-button>
              </el-tooltip>
            </div>
            <div class="left">
              <el-tooltip class="item" effect="dark" content="Left Top prompts info" placement="left-start">
                <el-button>left-start</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Left Center prompts info" placement="left">
                <el-button>left</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Left Bottom prompts info" placement="left-end">
                <el-button>left-end</el-button>
              </el-tooltip>
            </div>

            <div class="right">
              <el-tooltip class="item" effect="dark" content="Right Top prompts info" placement="right-start">
                <el-button>right-start</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Right Center prompts info" placement="right">
                <el-button>right</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Right Bottom prompts info" placement="right-end">
                <el-button>right-end</el-button>
              </el-tooltip>
            </div>
            <div class="bottom">
              <el-tooltip class="item" effect="dark" content="Bottom Left prompts info" placement="bottom-start">
                <el-button>bottom-start</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Bottom Center prompts info" placement="bottom">
                <el-button>bottom</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Bottom Right prompts info" placement="bottom-end">
                <el-button>bottom-end</el-button>
              </el-tooltip>
            </div>
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
