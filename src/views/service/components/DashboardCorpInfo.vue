<template>
  <div>
    <div class="box_breadcrumb">
      <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'"/>
    </div>
    <div class="top_business_area">
      <div class="inner">
        <strong class="title">{{corpInfoData.name}}</strong>
        <!-- userType, corpAdmYn에 따라 보여지는게 다름. -->
        <div
          class="desc_area"
          v-if="userInfoData.userType === 'CORP' && userInfoData.corpAdmYn === 'Y'"
        >
          <span class="id">{{userInfoData.corpId}}</span>
          <span class="date">{{ corpInfoData.aprvReqDt | prettyDate('YYYY-MM-DD') }}</span>
          <span class="link">
            <a href="javascript:void(0);" class="btn_underline" @click="moveCorpMgt">기업정보 관리</a>
          </span>
        </div>
        <div
          class="desc_area"
          v-if="userInfoData.userType === 'CORP' && userInfoData.corpAdmYn === 'N'"
        >
          <span class="id">{{userInfoData.corpId}}</span>
          <span class="date">{{corpInfoData.aprvReqDt | prettyDate('YYYY-MM-DD') }}</span>
          <span class="link">
            <a href="javascript:void(0);" class="btn_underline" @click="moveCorpRetrieve">기업정보 조회</a>
          </span>
<!--          <span class="link" v-if="corpInfoData.reqCorpAdmYn === 'N'">  -->
          <!-- 둘다 ACTIVE/OK인 경우(최초신청도 들어가지 않은 경우.) -->
          <span class="link" v-if="corpInfoData.status === 'ACTIVE' && corpInfoData.aprvStatus === 'ACTIVE'">
            <a href="javascript:void(0);" class="btn_underline" @click="moveAuthDetail">관리자 권한 신청</a>
            <div class="tooltip_area">
              <div class="btn_info"></div>
              <div class="box_tooltip">
                <h4 class="h4_title">관리자 권한</h4>
                <ul class="bullet_list mar_t10">
                  <li>브랜드를 개설할 수 있습니다.</li>
                  <li>브랜드 부관리자와 대행사를 지정하여 업무를 위임 할 수 있습니다.</li>
                  <li class="text_blue">사업자등록증 제출이 필요하며, 운영자 심사 후 가입이 완료됩니다.</li>
                </ul>
              </div>
            </div>
          </span>
          <span v-else>
            관리자권한 신청 :
            <a
              href="javascript:void(0);"
              class="btn_underline"
              @click="moveAuthDetail"
              v-if="corpInfoData.aprvStatus === 'DELETED'"
            >{{authorityData.aprvRetNm}}</a>
            <span v-else>{{authorityData.aprvRetNm}}</span>
          </span>
        </div>
        <div class="desc_area" v-if="userInfoData.userType === 'AGENCY'">
          <span class="id">{{userInfoData.corpId}}</span>
          <span class="date">{{corpInfoData.aprvReqDt}}</span>
          <span class="link" v-if="$store.state.user.subAgencyYn !== 'Y'">
            <a href="javascript:void(0);" class="btn_underline" @click="moveCorpRetrieve">기업정보 관리</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import { memberAdminAuthority } from '@/api/service/service'
import Breadcrumb from '@/components/global/Breadcrumb'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  props: {
    userInfoData: {
      type: Object
    },
    corpInfoData: {
      type: Object
    }
  },
  components: { Breadcrumb },
  data() {
    return {
      authorityData: []
    }
  },
  created() {
    let reqData = {
      corpId: this.corpInfoData.corpId
    }
    memberAdminAuthority(reqData).then(res => {
      this.authorityData = res.result
    })
  },
  mounted() {},
  computed: {},
  methods: {
    moveCorpMgt() {
      this.$router.push({ name: 'CorpInfo' })
    },
    moveCorpRetrieve() {
      this.$router.push({ name: 'CorpInfo', params: { viewMode: true } })
    },
    moveAuthDetail() {
      this.$router.push({
        name: 'AdminAuthApply'
      })
    }
  }
}
</script>
