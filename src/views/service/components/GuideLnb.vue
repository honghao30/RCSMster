<template>
  <div class="guide-lnb">
    <nav>
      <ul>
        <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
        <li class="menu-item"
          :class="{ 'active' :  activeIndex === i}"
          v-for="(item, i) in guideLnbList" :key="i"
        >
          <a role="button" :class="{'children': item.children}" v-if="item.children" @click="handleOpen(i)">{{ item.label }}</a>
          <router-link
            :to="item.to"
            v-if="!item.children"
            class="link"
          >{{ item.label }}</router-link>
          <Transition name="slide">
            <ul class="sub-menu" v-if="activeIndex === i"> <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
              <li v-for="(sub, j) in item.children" :key="j">
                <router-link :to="sub.to">{{ sub.label }}</router-link>
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import jglib from '@/utils/jglib'

export default {
  components: {
  },
  data() {
    return {
      guideLnbList: [
        {
          'label': 'RBC 이용 가이드',
          'to': '/UseGuide'
        },
        {
          'label': 'RCS 기업 메시지',
          'to': '',
          'children': [
            {
              'label': 'RCS 기업 메시지',
              'to': { name: '', params: { } }
            },
            {
              'label': 'RCS 기업 메시지 종류',
              'to': { name: '', params: { } }
            },
            {
              'label': 'RCS 기업 메시지 활용 팁',
              'to': { name: '', params: { } }
            },
            {
              'label': '발송 환경 준비',
              'to': { name: '', params: { } }
            }
          ]
        },
        {
          'label': 'RCS 주요 기능',
          'to': 'KeyFeatures',
          'children': [
            {
              'label': '브랜드 프로필',
              'to': { name: '', params: { } }
            },
            {
              'label': '브랜드 소식',
              'to': { name: '', params: { } }
            },
            {
              'label': '대화방 메뉴',
              'to': { name: '', params: { } }
            }
          ]
        },
        {
          'label': '계정',
          'to': '',
          'children': [
            {
              'label': '계정 종류',
              'to': '/GuideAccount'
            },
            {
              'label': '기업 계정',
              'to': { name: '', params: { } }
            },
            {
              'label': '대행사 계정',
              'to': { name: '', params: { } }
            },
            {
              'label': '시즌 계정',
              'to': { name: '', params: { } }
            }
          ]
        },
        {
          'label': '브랜드',
          'to': '',
          'children': [
            {
              'label': '브랜드 홈 소개',
              'to': '/GuideBrand'
            },
            {
              'label': '브랜드 구조',
              'to': { name: '', params: { } }
            },
            {
              'label': '브랜드 등록',
              'to': { name: '', params: { } }
            },
            {
              'label': '브랜드 관리',
              'to': { name: '', params: { } }
            },
            {
              'label': '브랜드 운영 권한',
              'to': { name: '', params: { } }
            },
            {
              'label': '브랜드 삭제',
              'to': { name: '', params: { } }
            }
          ]
        },
        {
          'label': '대화방',
          'to': '',
          'children': [
            {
              'label': '대화방 프로필',
              'to': { name: '', params: { } }
            },
            {
              'label': '대화방 종류',
              'to': { name: '', params: { } }
            },
            {
              'label': '대화방 등록',
              'to': { name: '', params: { } }
            },
            {
              'label': '대화방 관리',
              'to': { name: '', params: { } }
            },
            {
              'label': '대화방 삭제',
              'to': { name: '', params: { } }
            }
          ]
        },
        {
          'label': '화면 가이드',
          'to': { name: 'feedReg', params: { } },
          'children': [
            {
              'label': '기업 대시보드',
              'to': { name: '', params: { } }
            },
            {
              'label': '브랜드 대시보드',
              'to': { name: '', params: { } }
            },
            {
              'label': '브랜드',
              'to': { name: '', params: { } }
            },
            {
              'label': '대화방',
              'to': { name: '', params: { } }
            },
            {
              'label': '메시지',
              'to': { name: '', params: { } }
            },
            {
              'label': '양방향',
              'to': { name: '', params: { } }
            },
            {
              'label': '브랜드 소식',
              'to': { name: '', params: { } }
            },
            {
              'label': '통계',
              'to': { name: '', params: { } }
            },
            {
              'label': '내 브랜드 관리',
              'to': { name: '', params: { } }
            },
            {
              'label': '가입',
              'to': { name: '', params: { } }
            },
            {
              'label': '마이 페이지',
              'to': { name: '', params: { } }
            }
          ]
        }
      ],
      activeIndex: '',
      guideId: ''
    }
  },
  computed: {
    ...mapGetters('guideLnb', {
      lnb: 'getLnb'
    }),
    ...mapGetters({
      userId: 'userId',
      userType: 'userType',
      corpAdmYn: 'corpAdmYn',
      userName: 'userName'
    }),
    guideList () {
      let guideList = []
      for (let key in this.lnb.guideList) {
        let guide = this.lnb.guideList[key]
        guideList.push({ codeNm: guide.name, code: guide.guideId })
      }
      return guideList
    }
  },
  created() {
    if (jglib.isEmpty(this.lnb.guideInfo)) {
      this.fetch({ guideId: this.$route.params.guideId })
    } else {
      if (this.lnb.guideInfo.guideId !== this.$router.currentRoute.params.guideId) {
        this.fetch({ guideId: this.$route.params.guideId })
      }
    }
    this.guideId = this.$router.currentRoute.params.guideId
  },
  mounted() {},
  methods: {
    ...mapActions('guideLnb', {
      fetch: 'fetch_guide_lnb'
    }),
    handleOpen (index) {
      if (this.activeIndex === index) {
        this.activeIndex = ''
      } else {
        this.activeIndex = index
      }
    },
    changeguide (guideId, guideNm) {
      this.$router.push({ name: 'guideDashboard', params: { guideId } })
    }
  }
}
</script>

<style>

</style>
