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
      <strong class="title">아직 운영 중인 브랜드가 없습니다.</strong>
      <div class="desc_brand">
        <div class="row">
          <div class="inner">
            <span class="rcs_icon icon_permission"></span>
            <strong class="title">
              관리자 권한을
              <br>신청하시겠습니까?
            </strong>
            <div class="desc_area">
              사업자 등록증 제출이 필요하며,
              <br>사이트 운영자 심사 후 권한이 변경됩니다.
            </div>
            <div class="desc_area" v-if="waiting">관리자 권한 신청 중 (승인대기)</div>
            <div class="desc_area" v-if="rejected">관리자 권한 신청 중 (반려)</div>
            <div class="btn_wrap">
              <a
                href="javascript:void(0);"
                style="width:180px"
                class="btn sml bd_black type2"
                @click="applyAdm"
                v-if="!waiting && !rejected"
              >관리자 권한 신청</a>
              <a
                href="javascript:void(0);"
                style="width:180px"
                class="btn sml bd_black type2"
                @click="moveAdminAuthApply"
                v-if="rejected"
              >반려사유 확인</a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="inner">
            <span class="rcs_icon icon_openup"></span>
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
        <brand-oper-auth-apply-popup v-if="visible" :visible.sync="visible" @addBrandAuth="refresh"></brand-oper-auth-apply-popup>
      </div>
    </div>
  </div>
</template>

<script>
import BrandOperAuthApplyPopup from '@/views/service/components/BrandOperAuthApplyPopup'
import Breadcrumb from '@/components/global/Breadcrumb'
import { memberAdminAuthority } from '@/api/service/service'

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
      visible: false,
      ok: false,
      waiting: false,
      rejected: false
    }
  },
  created() {
    let reqCorpId = {
      corpId: this.$store.state.user.corpId
    }
    memberAdminAuthority(reqCorpId).then(res => {
      if (res.result.aprvRet === 'OK') {
        this.ok = true
      } else if (res.result.aprvRet === 'REJECTED') {
        this.rejected = true
      } else {
        this.waiting = true
      }
    })
  },
  mounted() {},
  computed: {},
  methods: {
    refresh() {
      this.$router.go()
    },
    applyAdm() {
      this.$router.push({
        name: 'AdminAuthApply'
      })
    },
    applyPopup() {
      this.visible = true
    },
    moveCorpRetrieve() {
      this.$router.push({ name: 'CorpInfo', param: { viewMode: true } })
    },
    moveAdminAuthApply() {
      this.$router.push({
        name: 'AdminAuthApply'
      })
    }
  }
}
</script>
