<template>
  <div class="partner__wrap">
    <PageTitle pagetitle="파트너사" />
    <div class="partner__intro">
      <PageTitleH3 titleh3="대행사 소개"/>
      <div class="top-notice--gray">
        <p>- RCS서비스는 대행사를 통해 제공합니다. 견적 및 상세 기능은 대행사에 문의해주세요.</p>
      </div>
    </div>
    <!-- 추천 키워드 -->
    <div class="keyword-list">
      <div class="list-tit">
        <p>추천 키워드</p>
      </div>
      <div class="partner-search">
        <div class="list__sort-area" :class="{open: isKeyWordOpen}" >
          <span class="checkbox">
            <input type="checkbox" id="webSend" value="web" v-model="sortOption" class="blind"/>
            <label for="webSend"><span class="checkbox__text">웹발송</span></label>
          </span>
          <span class="checkbox">
            <input type="checkbox" id="apiInterlock" value="api" v-model="sortOption" class="blind"/>
            <label for="apiInterlock"><span class="checkbox__text">API 연동</span></label>
          </span>
          <span class="checkbox">
            <input type="checkbox" id="smallSend" value="small" v-model="sortOption" class="blind"/>
            <label for="smallSend"><span class="checkbox__text">소량발송</span></label>
          </span>
          <span class="checkbox">
            <input type="checkbox" id="largeSend" value="large" v-model="sortOption" class="blind"/>
            <label for="largeSend"><span class="checkbox__text">대량발송</span></label>
          </span>
          <span class="checkbox">
            <input type="checkbox" id="textTemplate" value="textTem" v-model="sortOption" class="blind"/>
            <label for="textTemplate"><span class="checkbox__text">텍스트 템플릿</span></label>
          </span>
          <span class="checkbox">
            <input type="checkbox" id="imgTemplate" value="imgTem" v-model="sortOption" class="blind"/>
            <label for="imgTemplate"><span class="checkbox__text">이미지 템플릿</span></label>
          </span>
          <span class="checkbox">
            <input type="checkbox" id="type1" value="agency" v-model="sortOption" class="blind"/>
            <label for="type1"><span class="checkbox__text">중계사</span></label>
          </span>
          <span class="checkbox">
            <input type="checkbox" id="type2" value="twoway" v-model="sortOption" class="blind"/>
            <label for="type2"><span class="checkbox__text">양방향</span></label>
          </span>
          <button class="more-click only-mo" :class="{open: isKeyWordOpen && !isOnlyMo}" @click="btnKeyWordOpenMoToggle"></button>
        </div>
        <div class="dropdown-search__wrap">
          <div class="search-area">
            <span class="input search-box">
              <input type="text" placeholder="검색어 입력"/>
              <ButtonCmp
                type="btn-only-icon"
                iconname='icon-search'
              >
              </ButtonCmp>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- // 추천 키워드 -->
    <!-- RBC 공식 대행사 -->
    <div class="agency__wrap">
      <div class="agency__tit-box">
        <div class="tit-left">
          <h4>RBC 공식 대행사</h4>
          <p>{{ agencyInfoMsg }}</p>
        </div>
        <!-- 버튼 없는 경우 : 1. 검색결과 없을 때, 2: 모바일 -->
        <button class="tit-right only-pc" :class="{open: isOfficialClose}" @click="btnOfficialToggle">
        </button>
        <!-- // 버튼 없는 경우 : 1. 검색결과 없을 때, 2: 모바일 -->
      </div>
      <div class="agency__info" v-if="isOfficialCont">
        <div class="agency-box" v-for="(item, i) in sortOfficialList" :key="i">
          <div class="info-top">
            <div class="info-top-left">
              <div class="agency-name">{{ item.name }}</div>
              <div class="agency-tel">{{ item.tel }}</div>
              <div class="agency-mail">{{ item.mail }}</div>
              <div class="agency-url">{{ item.url }}</div>
            </div>
            <div class="info-top-right">
              <div class="agency-img"><img :src="item.logo" alt=""></div>
            </div>
          </div>
          <div class="info-bottom">
            <span class="agency-keyword" v-for="type in item.type" :key="type">
              {{ getKeyWordString (type) }}
            </span>
          </div>
        </div>
      </div>
      <!-- RBC 공식 대행사의 검색 결과 없을때 -->
      <div class="agency__info none-result">
        <p>검색 결과가 없습니다.</p>
      </div>
      <!-- // RBC 공식 대행사의 검색 결과 없을때 -->
    </div>
    <!-- // RBC 공식 대행사 -->
    <!--전체 대행사 리스트 -->
    <div class="agency__wrap total-case">
      <div class="agency__tit-box">
        <div class="tit-left">
          <h4>전체 대행사 리스트</h4>
        </div>
      </div>
      <div class="agency__info">
        <div class="agency-box" v-for="(item, i) in sortTotalAgencyList" :key="i">
          <div class="info-top">
            <div class="info-top-left">
              <div class="agency-name">{{ item.name }}</div>
              <div class="agency-tel">{{ item.tel }}</div>
              <div class="agency-mail">{{ item.mail }}</div>
              <div class="agency-url">{{ item.url }}</div>
            </div>
            <div class="info-top-right">
              <div class="agency-img"><img :src="item.logo" alt=""></div>
            </div>
          </div>
          <div class="info-bottom">
            <span class="agency-keyword" v-for="type in item.type" :key="type">
              {{ getKeyWordString (type) }}
            </span>
          </div>
        </div>
      </div>
      <!-- 전체 대행사 리스트의 검색 결과 없을때 -->
      <div class="agency__info none-result">
        <p>검색 결과가 없습니다.</p>
      </div>
      <!-- // 전체 대행사 리스트의 검색 결과 없을때 -->
    </div>
    <!-- // 전체 대행사 리스트 -->
    <!-- Best 파트너사 TOP 3 -->
    <div class="agency__wrap">
      <div class="agency__tit-box">
        <div class="tit-left">
          <h4>Best 파트너사 TOP 3</h4>
        </div>
      </div>
      <!-- pc버전 -->
      <div class="agency__info only-pc">
        <div class="agency-box" v-for="(item, i) in sortBestAgencyList" :key="i">
          <div class="info-top">
            <div class="info-top-left">
              <div class="agency-name">{{ item.name }}</div>
              <div class="agency-tel">{{ item.tel }}</div>
              <div class="agency-mail">{{ item.mail }}</div>
              <div class="agency-url">{{ item.url }}</div>
            </div>
            <div class="info-top-right">
              <div class="agency-img"><img :src="item.logo" alt=""></div>
            </div>
          </div>
          <div class="info-bottom">
            <span class="agency-keyword" v-for="type in item.type" :key="type">
              {{ getKeyWordString (type) }}
            </span>
          </div>
        </div>
      </div>
      <!-- // pc버전 -->
      <!-- mo버전 / swiper -->
      <div class="agency__info only-mo">
        <swiper
          ref="carousel"
          :options="swiperOption"
        >
          <swiper-slide class="agency-box" v-for="(item, i) in sortBestAgencyList" :key="i">
            <div class="info-top">
              <div class="info-top-left">
                <div class="agency-name">{{ item.name }}</div>
                <div class="agency-tel">{{ item.tel }}</div>
                <div class="agency-mail">{{ item.mail }}</div>
                <div class="agency-url">{{ item.url }}</div>
              </div>
              <div class="info-top-right">
                <div class="agency-img"><img :src="item.logo" alt=""></div>
              </div>
            </div>
            <div class="info-bottom">
              <span class="agency-keyword" v-for="type in item.type" :key="type">
                {{ getKeyWordString (type) }}
              </span>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- // mo버전 / swiper -->
    </div>
    <!-- // Best 파트너사 TOP 3 -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    PageTitle,
    PageTitleH3,
    ButtonCmp,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      agencyInfoMsg: '특정 시즌에 발생하는 이벤트를 지원하고 있는 대행사 목록입니다.',
      sortOption: [],
      OfficialList: [
        {
          name: '성문대행20221109',
          type: ['api', 'small'],
          logo: require('@/assets/images/partner/partner_tworld.png'),
          tel: '1544-8774',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        },
        {
          name: 'KT RCS 중계',
          type: ['api', 'imgTem', 'large'],
          logo: require('@/assets/images/partner/partner_kt.png'),
          tel: '080-258-0303​',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        },
        {
          name: 'LG유플러스',
          type: ['web', 'textTem', 'large'],
          logo: require('@/assets/images/partner/partner_lguplus.png'),
          tel: '1544-8774',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        }
      ],
      TotalAgencyList: [
        {
          name: '성문대행20221109',
          type: ['api', 'small'],
          logo: require('@/assets/images/partner/partner_tworld.png'),
          tel: '1544-8774',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        },
        {
          name: 'KT RCS 중계',
          type: ['api', 'imgTem', 'large'],
          logo: require('@/assets/images/partner/partner_kt.png'),
          tel: '080-258-0303​',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        },
        {
          name: 'LG유플러스',
          type: ['web', 'textTem', 'large'],
          logo: require('@/assets/images/partner/partner_lguplus.png'),
          tel: '1544-8774',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        },
        {
          name: '성문대행20221109',
          type: ['api', 'small'],
          logo: require('@/assets/images/partner/partner_tworld.png'),
          tel: '1544-8774',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        },
        {
          name: 'KT RCS 중계',
          type: ['api', 'imgTem', 'large'],
          logo: require('@/assets/images/partner/partner_kt.png'),
          tel: '080-258-0303​',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        },
        {
          name: 'LG유플러스',
          type: ['web', 'textTem', 'large'],
          logo: require('@/assets/images/partner/partner_lguplus.png'),
          tel: '1544-8774',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        }
      ],
      sortBestAgencyList: [
        {
          name: '성문대행20221109',
          type: ['api', 'small'],
          logo: require('@/assets/images/partner/partner_tworld.png'),
          tel: '1544-8774',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        },
        {
          name: 'KT RCS 중계',
          type: ['api', 'imgTem', 'large'],
          logo: require('@/assets/images/partner/partner_kt.png'),
          tel: '080-258-0303​',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        },
        {
          name: 'LG유플러스',
          type: ['web', 'textTem', 'large'],
          logo: require('@/assets/images/partner/partner_lguplus.png'),
          tel: '1544-8774',
          mail: 'smooncho@medialog.co.kr',
          url: 'http://www.medialog.co.kr'
        }
      ],
      isKeyWordOpen: false,
      isOnlyMo: false,
      isOfficialClose: true,
      isOfficialCont: true,
      swiperOption: {
        spaceBetween: 16,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    sortOfficialList() {
      let filteredList = this.OfficialList
      // default상태 시 전체 보여지게 하기위해
      if (this.sortOption.length > 0) {
        filteredList = this.OfficialList.filter((item) => {
          return this.sortOption.some((opt) => item.type.includes(opt))
        })
      }
      return filteredList
    },
    sortTotalAgencyList() {
      let filteredTotalAgencyList = this.TotalAgencyList
      // default상태 시 전체 보여지게 하기위해
      if (this.sortOption.length > 0) {
        filteredTotalAgencyList = this.TotalAgencyList.filter((item) => {
          return this.sortOption.some((opt) => item.type.includes(opt))
        })
      }
      return filteredTotalAgencyList
    }
  },
  methods: {
    getKeyWordString(type) {
      switch (type) {
        case 'web':
          return '웹발송'
        case 'api':
          return 'API 연동'
        case 'small':
          return '소량발송'
        case 'large':
          return '대량발송'
        case 'textTem':
          return '텍스트 템플릿'
        case 'imgTem':
          return '이미지 템플릿'
        case 'agency':
          return '중계사'
        case 'twoway':
          return '양방향'
        default:
          return ''
      }
    },
    btnKeyWordOpenMoToggle () {
      this.isKeyWordOpen = !this.isKeyWordOpen
    },
    btnOfficialToggle () {
      this.isOfficialClose = !this.isOfficialClose
      this.isOfficialCont = !this.isOfficialCont
    }
  }
}

</script>
