<template>
  <div class="rcs_emul_form_step" style="padding-bottom:0px;">
    <h3 class="h3_title fs20 full_width">STEP 4. 브랜드 홈 기본 탭 설정</h3>
    <div class="title_area full_width NTlt mar_t10">
      브랜드 홈의 기본 탭을 설정합니다.<br>
      <span style="color:#ff3300;">브랜드 홈 기본 탭은 브랜드 개설 시점에만 선택이 가능하며 이후 변경이 불가합니다.</span>
    </div>
    <div class="rcs_item_bundle mar_t20">
      <strong class="rcs_tit_bundle">기본 탭 설정</strong>
      <div class="rcs_cont_bundle">
        <div class="using_stat" style="padding-top: 2px;">
          <span class="btn stat_btn sml" :class="{'check': curTab === 'FEED' }" @click="selectCurTab('FEED')">소식탭 우선</span>
          <span class="btn stat_btn sml" :class="{'check': curTab === 'INFO' }" @click="selectCurTab('INFO')">정보탭 우선</span>
        </div>
      </div>
    </div>
    <div class="rcs_item_bundle" v-show="curTab === 'FEED'">
      <div class="pdtop10">
        <strong class="rcs_tit_bundle">
          브랜드 소식 기본 화면 설정
          <span class="stitlesub pdbottom15 pdleft10">작성된 브랜드 소식이 없을 경우, 아래 설정한 화면이 표시됩니다.</span>
        </strong>
        <div class="rcs_item_bundle pdbottom15 pdleft195 pdtop20">
          <span class="custom_radio Small2 mgt5">
            <input type="radio" v-model="initFeedItem" value="TEL" name="initFeedItem" id="TEL" :checked="initFeedItem === 'TEL'"><label for="TEL" style="font-size:16px;">전화걸기</label>
          </span>
          <span class="custom_input"><input type="text" :value="brandInfoData.tel" disabled placeholder="'-' 없이 입력"></span>
        </div>
        <div class="rcs_item_bundle pdbottom15 pdleft195">
          <span class="custom_radio Small2 mgt5">
            <input type="radio" v-model="initFeedItem" value="HOME" name="initFeedItem" id="HOME" :checked="initFeedItem === 'HOME'"><label for="HOME" style="font-size:16px;">웹사이트</label>
          </span>
          <span class="custom_input Small2"><input type="text" :value="brandInfoData.url" disabled placeholder="http://www.brandportal.com 형식으로 입력"></span>
        </div>
        <div class="rcs_item_bundle pdbottom15 pdleft195">
          <span class="custom_radio Small2 mgt5">
            <input type="radio" v-model="initFeedItem" value="SEARCH" name="initFeedItem" id="SEARCH" :checked="initFeedItem === 'SEARCH'"><label for="SEARCH" style="font-size:16px;">포탈검색</label>
          </span>
          <span class="custom_input"><input type="text" :value="brandInfoData.name" disabled placeholder="브랜드명을 입력해 주세요."></span>
        </div>
        <div class="guidelight pdbottom15 pdleft195">
          ※ 브랜드 소식 기본 화면 설정에 따라 제공되는 버튼이 변경됩니다.<br>
          ※ 홈페이지와 전화번호는, 상단의 STEP1. 브랜드 홈 정보 입력하기에 입력한 값과 동일하게 반영됩니다.<br>
          ※ 브랜드가 승인이 완료되면, 브랜드 소식 메뉴를 통해 자유롭게 브랜드 소식을 작성할 수 있습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    brandInfoData: {
      type: Object
    }
  },
  watch: {
    feedInfoData: {
      deep: true,
      handler(feedInfo) {
        this.$emit('changeFeedInfo', feedInfo)
      }
    }
  },
  computed: {
    feedInfoData() {
      return {
        curTab: this.curTab,
        initFeedItem: this.curTab === 'FEED' ? this.initFeedItem : null
      }
    }
  },
  data() {
    return {
      curTab: 'FEED',
      initFeedItem: 'TEL'
    }
  },
  mounted() {
    this.$emit('changeFeedInfo', this.feedInfoData)
  },
  methods: {
    selectCurTab(curTab) {
      this.curTab = curTab
    },
    getFeedInfo() {
      return this.feedInfoData
    }
  }
}
</script>
