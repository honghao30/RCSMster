<template>
  <div class="brand-lnb">
    <div class="brand-info">
      <div class="brand-info__inner">
        <span class="logo">
          <img src="@/assets/images/dummy/brand_logo.png" alt="">
        </span>
        <Dropdown :options="brandList" />
        <ul class="auth">
          <li>마스터 : 홍길동</li>
          <li>RCS메시지 전송 가능</li>
        </ul>
      </div>
    </div>
    <nav>
      <ul>
        <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
        <li class="menu-item"
            :class="{ 'active' :  activeIndex === i}"
            v-for="(item, i) in brandLnbList" :key="i"
        >
          <a role="button" v-if="item.children" @click="handleOpen(i)">{{ item.label }}</a>
          <router-link :to="item.to" v-if="!item.children">{{ item.label }}</router-link>
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
import Dropdown from '@/components/common/Dropdown.vue'
import { mapActions } from 'vuex'
import { brandDefaultImg } from '@/api/service/service'
import jglib from '@/utils/jglib'

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      brandLnbList: [
        {
          'label': '브랜드 대시보드',
          'to': ''
        },
        {
          'label': '대화방',
          'to': '',
          'children': [
            {
              'label': '대화방 등록',
              'to': ''
            },
            {
              'label': '대화방 목록',
              'to': ''
            }
          ]
        },
        {
          'label': '템플릿 메시지',
          'to': '',
          'children': [
            {
              'label': '템플릿 등록',
              'to': ''
            },
            {
              'label': '템플릿 목록',
              'to': { name: 'templateList', params: { brandId: this.$router.currentRoute.params.brandId } }
            },
            {
              'label': '레이아웃 등록',
              'to': ''
            },
            {
              'label': '레이아웃 목록',
              'to': { name: 'layoutList', params: { brandId: this.$router.currentRoute.params.brandId } }
            }
          ]
        },
        {
          'label': '챗봇',
          'to': '',
          'children': [
            {
              'label': '간편챗봇 메시지 등록',
              'to': { name: 'autoreplymsgReg', params: { brandId: this.$router.currentRoute.params.brandId } }
            },
            {
              'label': '간편챗봇 메시지 목록',
              'to': { name: 'autoreplymsglist', params: { brandId: this.$router.currentRoute.params.brandId } }
            }
          ]
        },
        {
          'label': '대화방 메뉴',
          'to': '',
          'children': [
            {
              'label': '대화방 메뉴 등록',
              'to': ''
            },
            {
              'label': '대화방 메뉴 목록',
              'to': ''
            }
          ]
        },
        {
          'label': '브랜드 소식',
          'to': '',
          'children': [
            {
              'label': '브랜드 알림 등록',
              'to': { name: 'feedInit', params: { brandId: this.$router.currentRoute.params.brandId } }
            },
            {
              'label': '브랜드 소식 등록',
              'to': { name: 'feedReg', params: { brandId: this.$router.currentRoute.params.brandId } }
            }
          ]
        },
        {
          'label': '통계',
          'to': '',
          'children': [
            {
              'label': '메시지 통계',
              'to': ''
            },
            {
              'label': '대화방 메뉴 통계',
              'to': ''
            },
            {
              'label': '브랜드 소식 통계',
              'to': ''
            }
          ]
        },
        {
          'label': '내 브랜드 관리',
          'to': '',
          'children': [
            {
              'label': '브랜드 홈 수정',
              'to': ''
            },
            {
              'label': '브랜드 운영 관리',
              'to': { name: 'brandManage', params: { brandId: this.$router.currentRoute.params.brandId } }
            },
            {
              'label': '안심마크 관리',
              'to': { name: 'saftyManage', params: { brandId: this.$router.currentRoute.params.brandId } }
            },
            {
              'label': '작업 히스토리',
              'to': { name: 'brandHistory', params: { brandId: this.$router.currentRoute.params.brandId } }
            }
          ]
        }
      ],
      brandList: [
        {
          label: '네스프레소',
          codeNm: 'brand1'
        }
      ],
      activeIndex: ''
    }
  },
  mounted() {
    // 브랜드 조회
    this.brandId = this.$route.params.brandId
    if (this.brandId) {
      this.fetchApprovalBrand({ brandId: this.brandId })
        .then(() => {
          this.loadBrandDefaultImg()
        })
        .catch(err => {
          this.$alertMsg(err.desc)
          if (err.code === '64498') {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
          }
        })
    }
  },
  methods: {
    ...mapActions('brand', {
      fetchApprovalBrand: 'fetchApprovalBrand',
      setBrandDefaultImg: 'setBrandDefaultImg'
    }),
    loadBrandDefaultImg() {
      return brandDefaultImg().then(res => {
        if (res.code === '20000000') {
          if (!jglib.isEmpty(res.result)) {
            let jsonArray = JSON.parse(res.result)
            this.setBrandDefaultImg(jsonArray)
          }
        }
      })
    },
    handleOpen (index) {
      if (this.activeIndex === index) {
        this.activeIndex = ''
      } else {
        this.activeIndex = index
      }
    }
  }
}
</script>

<style>

</style>
