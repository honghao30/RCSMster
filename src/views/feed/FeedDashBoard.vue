<template>
  <div class="rcs_container service_wrap bg_gray">
    <article id="content" class="content">
      <!-- 대시보드 > 기업 정보 -->
      <feed-corp-info :userInfoData="this.userInfo" :corpInfoData="this.corpInfo" :depth2MenuId="'M0301'"/>

      <!-- 소식현황 -->
      <div class="rbc_dash1">
        <div class="cont_wrap">
          <div class="title">
            <span class="bg_line">
              <span class="date">{{ feedTime | prettyDate('YYYY.MM.DD') }}</span>
              <span class="text">소식 현황</span>
            </span>
          </div>
          <div class="list_area">
            <div class="list icon7" v-if="this.userInfo.userType === 'AGENCY'">
              이용중인 기업<br>
              <strong>{{useCorpCnt}}</strong>
            </div>
            <div class="list icon1">
              이용중인 브랜드<br>
              <strong>{{useBrandCnt}}</strong>
            </div>
            <div class="list icon2">
              등록된 소식<br>
              <strong><a href="javascript:void(0);" @click="goFeedList('')">{{regCnt}}</a></strong>
            </div>
            <div class="list icon3">
              게시중<br>
              <strong><a href="javascript:void(0);" @click="goFeedList('publish')">{{pubCnt}}</a></strong>
            </div>
            <div class="list icon4">
              예약<br>
              <strong><a href="javascript:void(0);" @click="goFeedList('reservation')">{{reseCnt}}</a></strong>
            </div>
            <div class="list icon5">
              비공개<br>
              <strong><a href="javascript:void(0);" @click="goFeedList('hide')">{{hideCnt}}</a></strong>
            </div>
            <div class="list icon6">
              저장<br>
              <strong><a href="javascript:void(0);" @click="goFeedList('save')">{{saveCnt}}</a></strong>
            </div>
          </div>
        </div>
      </div>
      <!-- //소식현황 -->

      <!-- 최근 게시 소식 -->
      <div class="rbc_dash2">
        <div class="cont_wrap">
            <div class="title_area mar_t60 mar_b30">
              <h3 class="h3_title">최근 게시 소식</h3>
            </div>
            <!-- swiper -->
            <div class="slide" v-if="this.showBfFeedList.length > 0">
              <!-- list -->
              <div class="list" v-for="feed in this.showBfFeedList" :key="feed.feedId">
                <a href="javascript:void(0);" @click="goFeedDetail(feed.brandId, feed.feedId)">
                  <span class="thumb" v-if="feed.type === 'gallery'">
                    <img :src="feed.media[0].url" :alt="feed.brandName">
                  </span>
                  <span class="thumb" v-else-if="feed.type === 'share' && feed.share.imageUrl !== null">
                    <img :src="feed.share.imageUrl" :alt="feed.brandName">
                  </span>
                  <span class="thumb noimage" v-else-if="feed.type === 'share' && feed.share.imageUrl === null">
                    <a href="###"><span class="text">제공되는 이미지가 없습니다.</span></a>
                  </span>
                  <span class="thumb" v-else-if="feed.type === 'slide' && feed.slide[0].type === 'gallery'">
                    <img :src="feed.slide[0].media[0].url" :alt="feed.brandName">
                  </span>
                  <span class="thumb" v-else-if="feed.type === 'slide' && feed.slide[0].type === 'share' && feed.slide[0].share.imageUrl !== null">
                    <img :src="feed.slide[0].share.imageUrl" :alt="feed.brandName">
                  </span>
                  <span class="thumb noimage" v-else-if="feed.type === 'slide' && feed.slide[0].type === 'share' && feed.slide[0].share.imageUrl === null">
                    <a href="###"><span class="text">제공되는 이미지가 없습니다.</span></a>
                  </span>
                  <span class="text_area">
                    <span class="post" v-if="feed.pinYn === 'Y'">고정</span>
                    <span class="name">{{feed.brandNm}}</span>
                    <span class="company" v-if="userInfo.userType == 'AGENCY'">{{feed.corpNm}}</span>
                    <span class="title">{{feed.title}}</span>
                    <span class="desc" v-if="feed.type == 'gallery'">Gallery</span>
                    <span class="desc" v-else-if="feed.type == 'share'">Sharing</span>
                    <span class="desc" v-else-if="feed.type == 'slide'">Slide View</span>
                    <span class="date" v-if="feed.publishType == 'publish' || (feed.publishType == 'reservation' && feedTime >= feed.publishDate)"><em class="ico_post">게시</em> {{ feed.publishDate | prettyDate('YYYY-MM-DD hh:mm') }}</span>
                    <span class="date" v-else-if="feed.publishType == 'reservation' && feedTime < feed.publishDate"><em class="ico_reserve">예약</em> {{ feed.publishDate | prettyDate('YYYY-MM-DD hh:mm') }}</span>
                    <span class="date" v-else-if="feed.publishType == 'internet'"><em class="ico_url">URL</em> {{ feed.publishDate | prettyDate('YYYY-MM-DD hh:mm') }}</span>
                  </span>
                </a>
              </div>
              <!-- //list -->

              <!-- list -->
              <div class="list add_image" v-for="idx in noBrandCnt" :key="idx">
                <a href="javascript:void(0);" @click="goFeedReg()">
                  <div class="thumb">
                      <span class="btn">이미지 추가</span>
                  </div>
                  <div class="text_area">
                      <div class="title">브랜드 소식</div>
                      <div class="desc">새로운 소식으로<br> 우리 브랜드를 홍보해 주세요.</div>
                  </div>
                </a>
              </div>
              <!-- //list -->
              <a href="javascript:void(0);" class="btn_prev" v-if="this.bfFeedList.length > 4" @click="bfFeedSlide()">이전 리스트</a>
              <a href="javascript:void(0);" class="btn_next" v-if="this.bfFeedList.length > 4" @click="bfFeedSlide()">다음 리스트</a>
            </div>
            <!-- //swiper -->

            <!-- noresult -->
            <div class="no_result" v-else>
              <p class="text">게시 중인 소식이 없습니다.<br> 지금 새로운 소식을 작성해 보세요.</p>
              <a href="javascript:void(0);" class="ico_write" @click="goFeedReg()">지금 작성하기</a>
            </div>
            <!-- //noresult -->
            <a href="javascript:void(0);" class="ico_write" @click="goFeedReg()">소식작성</a>
            <div class="btn_wrap center mar_t40">
                <a href="javascript:void(0);" class="btn mid bd_black" @click="goFeedList('')">더보기</a>
            </div>
        </div>
      </div>
      <!-- //최근 게시 소식 -->

      <!-- 고객 반응 현황 -->
      <div class="rbc_dash3">
        <div class="cont_wrap">
          <div class="title_area mar_t60 mar_b30 inline">
            <h3 class="h3_title" style="display: inline-block;">고객 반응 현황 </h3>
            <span class="h3_desc" style="display: inline-block;">수집 기준일 : {{statTime}}</span>
          </div>
          <div class="list_area">
              <!-- list -->
              <div class="list icon1">
                <a href="javascript:void(0);" class="title" @click="goStatList('yesterday')">
                  소식 메인<br>
                  <strong>평균 체류 시간</strong>(초)
                </a>
                <div class="score">
                  <div class="sco">어제 <strong>{{stayTime}}</strong></div>
                  <div class="sco blue">누적 <strong>{{avgStayTime}}</strong></div>
                </div>
              </div>
              <!-- //list -->
              <!-- list -->
              <div class="list icon2">
                <a href="javascript:void(0);" class="title" @click="goStatList('yesterday')">
                  소식 메인<br>
                  <strong>페이지 뷰</strong>(건)
                </a>
                <div class="score">
                  <div class="sco">어제 <strong>{{pvCnt}}</strong></div>
                  <div class="sco blue">누적 <strong>{{pvTotCnt}}</strong></div>
                </div>
              </div>
              <!-- //list -->
              <!-- list -->
              <div class="list icon3">
                <a href="javascript:void(0);" class="title" @click="goStatList('yesterday')">
                  소식 메인<br>
                  <strong>클릭 수</strong>(건)
                </a>
                <div class="score">
                  <div class="sco">어제 <strong>{{clCnt}}</strong></div>
                  <div class="sco blue">누적 <strong>{{clTotCnt}}</strong></div>
                </div>
              </div>
              <!-- //list -->
          </div>
          <div class="btn_wrap center mar_t40">
            <a href="javascript:void(0);" class="btn mid bd_black" @click="goStatList('')">더보기</a>
          </div>
        </div>
      </div>
      <!-- //고객 반응 현황 -->
    </article>
  </div>
</template>
<script>
import moment from 'moment'
import FeedCorpInfo from '@/views/feed/components/FeedCorpInfo'

import store from '@/store'
import { getUserInfo } from '@/api/service/service'
import {
  feedStatus,
  newFeed,
  custReactStatus
} from '@/api/feed/feed'

export default {
  name: 'FeedDashBoard',
  components: {
    FeedCorpInfo
  },
  data() {
    return {
      userInfo: {
        userType: '',
        corpId: '',
        corpAdmYn: ''
      },
      corpInfo: {
        name: '', // 기업명
        corpId: '', // 기업ID
        aprvReqDt: '', // 등록일
        brandOperYn: '', // 브랜드 개설 여부
        reqCorpAdmYn: '', // 관리자 신청 여부(담당자)
        status: '',
        aprvStatus: ''
      },

      feedTime: '', // 금일 날짜
      useCorpCnt: '', // 이용중인 기업
      useBrandCnt: '', // 이용중인 브랜드
      regCnt: '', // 등록된 소식
      pubCnt: '', // 게시중
      reseCnt: '', // 예약
      hideCnt: '', // 숨기기
      saveCnt: '', // 저장

      bfFeedList: [],
      showBfFeedList: [],
      hideBfFeedList: [],
      noBrandCnt: 0,

      statTime: '', // 수집 날짜(어제 기준)
      stayTime: '', // 평균체류시간
      avgStayTime: '', // 누적 평균체류시간
      pvCnt: '', // 페이지뷰
      pvTotCnt: '', // 누적 페이지뷰
      clCnt: '', // 클릭 건수
      clTotCnt: '' // 누적 클릭 건수
    }
  },
  computed: {},
  watch: {},
  created() {
    store.dispatch('getUserInfo').then(userInfo => {
      this.userInfo.userType = userInfo.userType
      this.userInfo.corpId = userInfo.corpId
      this.userInfo.corpAdmYn = userInfo.corpAdmYn
      this.getUserInfo()

      this.getFeedStatus()
    })
  },
  mounted() {},
  methods: {
    getUserInfo() {
      let reqData = {
        userType: this.userInfo.userType,
        corpId: this.userInfo.corpId
      }
      getUserInfo(reqData).then(res => {
        this.corpInfo.name = res.result.name
        this.corpInfo.corpId = res.result.corpId
        this.corpInfo.aprvReqDt = res.result.aprvReqDt
          ? res.result.aprvReqDt
          : ' '
        this.corpInfo.brandOperYn = res.result.brandOperYn
        this.corpInfo.reqCorpAdmYn = res.result.reqCorpAdmYn
        this.corpInfo.status = res.result.status
        this.corpInfo.aprvStatus = res.result.aprvStatus
      })
    },
    getFeedStatus() {
      // 대시보드 소식 현황
      feedStatus().then(res => {
        if (res.code === '20000000') {
          this.useCorpCnt = res.result.useCorpCnt
          this.useBrandCnt = res.result.useBrandCnt
          this.regCnt = res.result.regCnt
          this.pubCnt = res.result.pubCnt
          this.reseCnt = res.result.reseCnt
          this.hideCnt = res.result.hideCnt
          this.saveCnt = res.result.saveCnt
          this.getNewFeed()
        }
      })
    },
    getNewFeed() {
      this.feedTime = moment().format('YYYYMMDDHHmmSS')
      // 게시, 예약 최근목록 8건
      newFeed()
        .then(res => {
          if (res.code === '20000000') {
            if (res.result.length > 4) {
              this.showBfFeedList = res.result.splice(0, 4)
              this.hideBfFeedList = res.result
              this.bfFeedList = this.showBfFeedList
              this.bfFeedList += this.hideBfFeedList
            } else {
              this.showBfFeedList = res.result
              this.bfFeedList = res.result
              this.noBrandCnt = 4 - this.showBfFeedList.length
            }
            this.getCustReactStatus()
          }
        })
        .catch(res => {
          if (res && res.error && res.error) {
            this.$alertMsg(res.error.message).then(() => {
              if (res.error.code === '60000703' || res.error.code === '60000704') {
                // 브랜드 운영 없음 > 대시보드로 이동
                // this.$router.push("/")
                this.$router.push('/service/dashboard')
              }
            })
          }
        })
    },
    bfFeedSlide() {
      let tempList = this.showBfFeedList
      this.showBfFeedList = this.hideBfFeedList
      this.hideBfFeedList = tempList
      if (this.showBfFeedList.length < 4) {
        this.noBrandCnt = 4 - this.showBfFeedList.length
      } else {
        this.noBrandCnt = 0
      }
    },
    getCustReactStatus() {
      this.statTime = moment().subtract(1, 'days').format('YYYY.MM.DD')
      // 대시보드 고객 반응 현황
      custReactStatus().then(res => {
        if (res.result == null) {
          this.stayTime = '0'
          this.avgStayTime = '0'
          this.pvCnt = '0'
          this.pvTotCnt = '0'
          this.clCnt = '0'
          this.clTotCnt = '0'
        } else {
          this.stayTime = res.result.stayTime
          this.avgStayTime = res.result.avgStayTime
          this.pvCnt = res.result.pvCnt.toLocaleString()
          this.pvTotCnt = res.result.pvTotCnt.toLocaleString()
          this.clCnt = res.result.clCnt.toLocaleString()
          this.clTotCnt = res.result.clTotCnt.toLocaleString()
        }
      })
    },
    goFeedReg() {
      this.$router.push('/feed/reg')
    },
    goStatList(searchType) {
      this.$router.push({
        name: 'FeedStat',
        params: { searchType: searchType }
      })
    },
    goFeedList(status) {
      this.$router.push({
        name: 'FeedList',
        params: { status: status }
      })
    },
    goFeedDetail(brandId, feedId) {
      this.$router.push({
        name: 'brand/feed',
        params: { brandId: brandId, feedId: feedId }
      })
    }
  }
}
</script>
<style>
</style>
