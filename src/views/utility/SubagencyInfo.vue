<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="top_title_area">
        <h2 class="h2_title">내 정보관리</h2>
      </div>
      <div class="box_status_myinfo">
        <div class="status_wrap">
          <!-- TODO: 공통코드 확정 시 상태별 클래스 변경 필요 -->
          <span class="text_status accept" :class="{'accept': retrieveData.aprvRet === 'OK', 'standby': retrieveData.aprvRet === 'WAITING', 'refusal': retrieveData.aprvRet === 'REJECTED'}">{{ retrieveData.aprvRetNm }}</span>
          <div class="desc_wrap">
            <span class="company_name">
              업체명
              <em>{{ retrieveData.name }}</em>
            </span>
            <span class="company_number">
              사업자등록번호
              <em >{{ retrieveData.agencyRegiNum | prettyCorpRegiNum }}</em>
            </span>
            <span class="id_title">
              기업ID
              <em>{{ retrieveData.agencyId }}</em>
            </span>
          </div>
        </div>
      </div>
      <div class="title_area mar_b20">
        <h3 class="h3_title">내 계정 정보</h3>
        <ul class="bullet_list fs18">
          <li style="color: red;">대행사 담당자는 API Client IP와 agencyKey 정보만 수정할 수 있습니다.</li>
        </ul>
      </div>
      <table class="tbl_row_type">
        <caption>
          <strong>내 계정 정보</strong>
          <p>이름, 휴대폰번호, 담당자 연락처, 이메일</p>
        </caption>
        <colgroup>
          <col style="width:210px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">담당자 이름</th>
            <td>
              <span class="text_value">{{ retrieveData.subAgencyNm }}</span>
            </td>
          </tr>
          <tr>
            <th scope="row">대행사 관리자</th>
            <td class="field_area">
              <ul class="phone_list">
                <li>
                  <span class="text_value">{{retrieveData.userNm}}</span>
                  <span class="text_value">{{retrieveData.mblNum | prettyMobile}}</span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th scope="row">대행사 담당자</th>
            <td class="field_area">
              <ul class="phone_list">
                <li v-for="subAgency in retrieveData.subAgencyList" :key="subAgency.userId">
                  <span class="text_value">{{subAgency.userNm}}</span>
                  <span class="text_value">{{subAgency.mblNum}}</span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th scope="row">대표 연락처</th>
            <td>
              <div class="phone_number_area">
                <div class="input_phone_bundle">
                  <span class="text_value">{{ retrieveData.corpTelNum | prettyMobile }}</span>
                </div>
                <div class="input_phone_bundle">
                  <span class="title">내선번호</span>
                  <span class="text_value">{{ retrieveData.corpTelExt }}</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">대표 이메일</th>
            <td>
              <span class="text_value">{{ retrieveData.email }}</span>
            </td>
          </tr>
          <tr>
            <th scope="row">API Key</th>
            <td>
              <span class="text_value">{{ retrieveData.apiKey }}</span>
            </td>
          </tr>
          <tr>
            <th scope="row">API Client IP</th>
            <td colspan="3" class="field_area api_wrap">
              <allow-ip ref="allowipR" v-if="allowedIpList" :list="allowedIpList"></allow-ip>
            </td>
          </tr>
          <tr>
            <th scope="row">Agency Key</th>
            <td colspan="3" class="field_area api_wrap">
              <agency-key ref="agencykey" :agencyId="this.retrieveData.agencyId" :list="agencyKeyList"></agency-key>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="btn_wrap center mar_t40">
        <a href="javascript:void(0);" class="btn mid blue" @click="updateMyInfo"><span>정보수정</span></a>
      </div>
    </article>
  </div>
</template>

<script>
import { ignoreChar } from '@/utils/check'
import { retrieveMyInfo, updateMyInfo } from '@/api/utility/utility'
import AllowIp from '@/views/service/components/AllowIp'
import AgencyKey from '@/views/service/components/AgencyKey'

export default {
  name: 'SubagencyInfo',
  components: {
    AllowIp,
    AgencyKey
  },
  data() {
    return {
      retrieveData: {},
      allowedIpList: null,
      agencyKeyList: null
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    ignoreChar,
    init() {
      // 기본 정보 조회
      this.$store
        .dispatch('getUserInfo')
        .then(userInfo => {
          this.retrieveMyInfo()
        })
        .catch(() => {
        })
    },
    retrieveMyInfo() {
      let params = {
        userId: this.$store.state.user.userId
      }
      retrieveMyInfo(params)
        .then(res => {
          this.retrieveData = res.result
          this.allowedIpList = this.retrieveData.allowIpList
          this.agencyKeyList = this.retrieveData.agencyKeyList
        }).catch(err => {
          this.$alertMsg(err.desc)
          this.$router.go(-1)
        })
    },
    updateMyInfo() {
      let params = {}
      if (this.$refs.allowipR) {
        try {
          params.addAllowIpList = this.$refs.allowipR.getAllowIp()
        } catch (e) {
          this.$alertMsg(e)
          return false
        }
      }

      this.$confirmMsg('수정한 정보로 변경하시겠습니까?', '타이틀', '확인', '닫기')
        .then(confirm => {
          updateMyInfo(params).then(res => {
            if (res.code === '20000000') {
              this.$alertMsg('수정한 정보로 변경하였습니다.').then(confirm => {
                this.refresh()
              })
            } else {
              this.$alertMsg(res.message)
            }
          })
            .catch(res => {
              if (res.code === '60000718') {
                this.$alertMsg(res.desc)
              }
            })
        })
        .catch(() => {})
    },
    refresh() {
      window.scrollTo(0, 0)
      this.addSubAgencyList = []
      if (this.$refs.allowipR) {
        this.allowedIpList = null
      }
      this.retrieveMyInfo()
    }
  }
}
</script>
