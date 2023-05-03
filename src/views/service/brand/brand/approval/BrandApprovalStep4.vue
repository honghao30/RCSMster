<template>
  <div class="rcs_emul_form_step" style="padding-bottom:0px;">
    <h3 class="h3_title fs20 mar_b10 mar_t40">STEP 4. 브랜드 홈 기본 탭 설정</h3>
    <div class="title_area full_width NTlt mar_t10 mar_b10" v-if="!isActive">
      브랜드 홈의 기본 탭을 설정합니다.<br>
      <span style="color: rgb(255, 51, 0);">브랜드 홈 기본 탭은 브랜드 개설 시점에만 선택이 가능하며 이후 변경이 불가합니다.</span>
    </div>
    <div class="rcs_item_bundle extra_bd_t pdtop10">
      <strong class="rcs_tit_bundle">기본 탭 설정</strong>
      <div class="rcs_cont_bundle">
        <div class="using_stat pdtop3"  v-if="editable">
          <!-- 수정 -->
          <span class="btn stat_btn sml" :class="{'check': curTab === 'FEED' }" @click="selectCurTab('FEED')">소식탭 우선</span>
          <span class="btn stat_btn sml" :class="{'check': curTab === 'INFO' }" @click="selectCurTab('INFO')">정보탭 우선</span>
        </div>
        <div class="using_stat pdtop3"  v-else>
          <!-- 조회 -->
          <div style="padding-top:6px !important;" >{{ curTab === 'FEED' ? '소식탭 우선' : '정보탭 우선' }}</div>
        </div>
      </div>
    </div>
    <div class="rcs_item_bundle" v-show="curTab === 'FEED'">
      <div class="pdtop10" v-if="editable">
        <!-- 수정 -->
        <strong class="rcs_tit_bundle">
          브랜드 소식 기본 화면 설정
          <span class="stitlesub pdbottom15 pdleft10">작성된 브랜드 소식이 없을 경우, 아래 설정한 화면이 표시됩니다.</span>
        </strong>
        <div class="rcs_item_bundle pdbottom15 pdleft195 pdtop10">
          <span class="custom_radio Small2 mgt5">
            <input type="radio" v-model="initFeedItem" value="TEL" name="initFeedItem" id="TEL"><label for="TEL" style="font-size:16px;">전화걸기</label>
          </span>
          <span class="custom_input"><input type="text" :value="tel" disabled placeholder="'-' 없이 입력"></span>
        </div>
        <div class="rcs_item_bundle pdbottom15 pdleft195">
          <span class="custom_radio Small2 mgt5">
              <input type="radio" v-model="initFeedItem" value="HOME" name="initFeedItem" id="HOME"><label for="HOME" style="font-size:16px;">웹사이트</label>
          </span>
          <span class="custom_input"><input type="text" :value="url" disabled placeholder="http://www.brandportal.com 형식으로 입력"></span>
        </div>
        <div class="rcs_item_bundle pdbottom15 pdleft195">
          <span class="custom_radio Small2 mgt5">
            <input type="radio" v-model="initFeedItem" value="SEARCH" name="initFeedItem" id="SEARCH"><label for="SEARCH" style="font-size:16px;">포탈검색</label>
          </span>
          <span class="custom_input"><input type="text" :value="name" disabled placeholder="브랜드명을 입력해 주세요."></span>
        </div>
        <div class="guidelight pdbottom15 pdleft195">
          ※ 브랜드 소식 기본 화면 설정에 따라 제공되는 버튼이 변경됩니다.<br>
          ※ 홈페이지와 전화번호는, 상단의 STEP1. 브랜드 홈 정보 입력하기에 입력한 값과 동일하게 반영됩니다.<br>
          ※ 브랜드가 승인이 완료되면, 브랜드 소식 메뉴를 통해 자유롭게 브랜드 소식을 작성할 수 있습니다.
        </div>
      </div>
      <div class="rcs_item_bundle" v-else>
        <!-- 조회 -->
        <strong class="rcs_tit_bundle ">
          브랜드 소식 기본 화면 설정
        </strong>
        <div class="rcs_cont_bundle">
          <div class="using_stat pdtop10">
            <div v-if="initFeedItem === 'HOME'" class="pdtop3">웹사이트 <span class="sline1">ㅣ</span>  {{ url }}</div>
            <div v-else-if="initFeedItem === 'TEL'">전화걸기 <span class="sline1">ㅣ</span>  {{ tel }}</div>
            <div  v-else-if="initFeedItem === 'SEARCH'">포탈검색 <span class="sline1">ㅣ</span>  {{ name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    RESPONSE: {
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
      curTab: null,
      initFeedItem: null,
      name: null,
      tel: null,
      url: null,
      isActive: false,
      editable: false
    }
  },
  created() {
    const res = this.RESPONSE.result
    this.curTab = res.curTab
    this.initFeedItem = res.initFeedItem
    this.name = res.name
    this.tel = res.tel
    this.url = res.url
    this.isActive = res.mstStatus === 'ACTIVE' && res.mstAprvRet === 'OK'
    // 신규 저장/반려일 때는 수정이 가능
    this.editable = (res.mstStatus === 'APRV_NEW' && res.mstAprvRet === 'SAVED') || (res.mstStatus === 'DELETED' && res.mstAprvRet === 'REJECTED')
  },
  mounted() {
    this.$emit('changeFeedInfo', this.feedInfoData)
  },
  methods: {
    selectCurTab(curTab) {
      this.curTab = curTab
      if (this.curTab === 'FEED' && !this.initFeedItem) {
        this.initFeedItem = 'TEL'
      }
    },
    getFeedInfo() {
      return this.feedInfoData
    }
  }
}
</script>
