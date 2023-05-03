<template>
  <custom-popup :visible="visible" @close="closePopup"  kind="custom" yesBtn="확인" :zIndex="500" class="dv2023_twoway-cb">
    <template v-slot:header>
      <div class="Popup_New_title">
        <span class="bold TitleBold">양방향 대화방 등록 가이드</span>
        <span class="TitleDescription">- 양방향 대화방을 사용하기 위해서는 대행사와 사전 청약이 필요합니다.</span>
      </div>
    </template>
    <div class="twoway-cb-pop_content">
      <p>양방향 대화방 등록 절차</p>
      <div class="twoway-cb-pop_steps">
        <ul>
          <li>
            <div>
              <span>STEP 1</span>
              <p>대행사<br>사전청약</p>
            </div>
            <span>양방향 대화방 서비스가 가능한 대행사와의<br/>사전 청약 진행이 필요합니다.</span>
          </li>
          <li>
            <div>
              <span>STEP 2</span>
              <p>대행사에게<br/>운영권한 부여</p>
            </div>
            <span>사전 청약한 대행사에게<br/>브랜드 운영 권한을 부여합니다.<br/>
              <a href="javascript:void(0)" @click="goToManageList">
                홈 <img src="@/assets/images/icons/icon_greater_than.svg"/> 서비스관리 <img src="@/assets/images/icons/icon_greater_than.svg"/> 브랜드 선택 <img src="@/assets/images/icons/icon_greater_than.svg"/> 운영관리
              </a>
            </span>
          </li>
          <li>
            <div>
              <span>STEP 3</span>
              <p>양방향 대화방<br/>등록</p>
            </div>
            <span>양방향 대화방 등록 진행</span>
          </li>
        </ul>
      </div>
      <div class="twoway-cb-pop_list">
        <p>양방향 대화방 서비스 지원가능 대행사</p>
        <ul>
          <li v-for="(agency, idx) in agencyList" :key="idx" @click="goToAgency(agency.url)" style="cursor: pointer">
            <div>
              <img v-if="!agency.imgUrl" src="@/assets/images/common/emul_img_05.png"/>
              <img v-else :src="agency.imgUrl"/>
            </div>
            <ul>
              <li>{{ agency.name }}</li>
              <li>
                <span>{{ addHypenTel(agency.tel) }}</span>
                <p>{{ showOnlyDomain(agency.url) }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Pagination v-if="totalCount > 0" :total="totalCount" rangeMax="4" :pageSize="size" :currentPage.sync="page" @change="changePage"></Pagination>
    </div>
  </custom-popup>
</template>

<script>
import { CustomPopup } from '@/components/popupSet'
import Pagination from '@/components/Pagination'
import { getAgencyList } from '@/api/utility/utility'
export default {
  name: 'AgencyInfoPopup',
  components: {
    Pagination,
    CustomPopup
  },
  props: {
    visible: { type: Boolean }
  },
  data() {
    return {
      totalCount: 0,
      searchParam: {
        page: 1,
        size: 99999
      },
      size: 4,
      page: 1,
      allAgencyList: [],
      agencyList: []
    }
  },
  mounted() {
    getAgencyList(this.searchParam).then(res => {
      if (res.code === '20000000') {
        this.allAgencyList = res.result.list.filter(x => x.rcsSvc.includes('chat'))
        this.totalCount = this.allAgencyList.length
        this.allAgencyList.sort(() => Math.random() - 0.5) // 랜덤 정렬
        this.changePage(1)
      }
    })
  },
  methods: {
    changePage(page) {
      let begin = (page - 1) * 4
      let end = page * 4
      this.agencyList = this.allAgencyList.slice(begin, end)
    },
    addHypenTel(tel) {
      if (jglib.isPhoneNumber(tel)) {
        return jglib.mobileNumConverter(tel)
      } else {
        return jglib.telNumConverter(tel)
      }
    },
    showOnlyDomain(fullUrl) {
      let idx, protocol, url
      if (fullUrl.includes('http://')) idx = 7
      else if (fullUrl.includes('https://')) idx = 8
      protocol = fullUrl.substring(0, idx)
      url = fullUrl.substring(idx, fullUrl.length)
      let domain = url.split('/')[0]
      return `${protocol}${domain}`
    },
    goToAgency(url) {
      const link = document.createElement('a')
      link.target = '_blank'
      link.href = url
      link.click()
    },
    goToManageList() {
      this.$router.push({ name: 'ManageList' })
    },
    closePopup() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
