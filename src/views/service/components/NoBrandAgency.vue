<template>
  <div>
    <div class="box_breadcrumb">
      <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'"/>
    </div>
    <div class="top_business_area">
      <div class="inner">
        <strong class="title">{{this.corpInfoData.name}}</strong>
        <div class="desc_area">
          <span class="id">{{this.corpInfoData.corpId}}</span>
          <span class="date">{{ this.corpInfoData.aprvReqDt | prettyDate('YYYY-MM-DD') }}</span>
          <span class="link">
            <a href="javascript:void(0);" class="btn_underline" @click="moveCorpRetrieve">기업정보 조회</a>
          </span>
        </div>
      </div>
    </div>
    <div class="no_data_wrap">
      <strong class="title">운영을 위임 받은 브랜드가 없습니다.</strong>
      <div class="desc_brand">
        <div class="row">
          <div class="inner">
            <span class="rcs_icon icon_permission"></span>
            <strong class="title">
              현재 개설된 브랜드의
              <br>운영 권한이 필요하세요?
            </strong>
            <div class="desc_area">
              브랜드의 관리자에게 대행사 권한을 신청합니다.
              <br>권한이 부여되면 RCS메시지 발송이 가능합니다.
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
        <brand-oper-auth-apply-popup v-if="visible" :visible.sync="visible" @addBrandAuth="refresh"></brand-oper-auth-apply-popup>
      </div>
    </div>
  </div>
</template>

<script>
import BrandOperAuthApplyPopup from '@/views/service/components/BrandOperAuthApplyPopup'
import Breadcrumb from '@/components/global/Breadcrumb'

export default {
  components: {
    BrandOperAuthApplyPopup,
    Breadcrumb
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
  created() {},
  mounted() {},
  computed: {},
  methods: {
    refresh() {
      this.$router.go()
    },
    applyPopup() {
      this.visible = true
    },
    moveCorpRetrieve() {
      this.$router.push({ name: 'CorpInfo', param: { viewMode: true } })
    }
  }
}
</script>
