<template>
  <div>
    <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'"/>
    <div class="top_business_area">
      <div class="inner">
        <strong class="title">{{this.corpInfoData.name}}</strong>
        <div class="desc_area">
          <span class="id">{{this.corpInfoData.corpId}}</span>
          <span class="date">{{ this.corpInfoData.aprvReqDt | prettyDate('YYYY-MM-DD') }}</span>
          <span class="link">
            <a href="javascript:void(0);" class="btn_underline" @click="moveCorpMgt">기업정보 관리</a>
          </span>
        </div>
      </div>
    </div>
    <div class="no_data_wrap">
      <strong class="title">아직 운영 중인 브랜드가 없습니다.</strong>
      <div class="desc_brand">
        <div class="row">
          <div class="inner">
            <span class="rcs_icon icon_openup"></span>
            <strong class="title">
              직접 브랜드를
              <br>개설하시겠습니까?
            </strong>
            <div class="desc_area">
              RCS 서비스를 이용하기 위해서는 브랜드를 먼저 개설해야 합니다.
              <br>브랜드 세부 정보를 등록 하시고 개설 후 운영을 위한 부관리자,
              <br>대행사 권한을 지정할 수 있습니다.
            </div>
            <div class="btn_wrap">
              <a
                href="javascript:void(0);"
                style="width:180px"
                class="btn sml bd_black type2"
                @click="this.goBrandCreate"
              >브랜드 개설하기</a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="inner">
            <span class="rcs_icon icon_permission"></span>
            <strong class="title">
              현재 개설된 브랜드의
              <br>운영 권한이 필요하세요?
            </strong>
            <div class="desc_area">
              브랜드의 관리자에게 부관리자 권한을 신청합니다.
              <br>브랜드 개설을 제외한 모든 업무를 처리할 수 있습니다.
            </div>
            <div class="btn_wrap">
              <a
                href="javascript:void(0);"
                style="width:180px"
                class="btn sml bd_black type2"
                @click="applyPopup"
              >브랜드 운영권한 신청</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <brand-oper-auth-apply-popup v-if="visible" :visible.sync="visible" @addBrandAuth="refresh"></brand-oper-auth-apply-popup>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import Breadcrumb from '@/components/global/Breadcrumb'
import BrandOperAuthApplyPopup from '@/views/service/components/BrandOperAuthApplyPopup'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  components: {
    Breadcrumb,
    BrandOperAuthApplyPopup
  },
  props: {
    corpInfoData: {
      type: Object
    }
  },
  data() {
    return {
      visible: false
    }
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
  },
  methods: {
    refresh() {
      this.$router.go()
    },
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이벤트에 따라 실행하거나, 내부적으로 사용되는 함수들을 정의한다.
    goBrandCreate() {
      // this.$router.push({
      //   name: '/service/brand/open' // FIXME 추후 브랜드개설 path로 변경해야함.
      //   // params: res
      // })
      this.$router.push('/service/brand/open')
    },
    applyPopup() {
      this.visible = true
    },
    moveCorpMgt() {
      this.$router.push({ name: 'CorpInfo' })
    }
  }
}
</script>
