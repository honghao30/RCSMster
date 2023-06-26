<template>
  <div class="brand-emulator__wrap">
    <span class="blind">미리보기</span>
    <div class="brand-bg-image">
      <!-- <img :src="require('@/assets/images/' + brandInfoData.bgImgFileUrl)" alt=""  v-if="brandInfoData.bgImgFileUrl !== ''"> -->
      <img :src="brandInfoData.bgImgFileUrl"  alt="">
    </div>
    <div class="brand-quick-icons">
        <span class="icon" v-for="(icon, i) in brandInfoData.quickButton" :key="i"><i :class="`icon-${icon}`"></i></span>
    </div>
    <div class="brand-profile">
      <span class="brand-logo">
        <!-- <img :src="require('@/assets/images/' + brandInfoData.profileImgFileUrl)" alt="" v-if="brandInfoData.profileImgFileUrl !== ''"> -->
        <img :src="brandInfoData.profileImgFileUrl"  alt="">
      </span>
      <div class="brand-desc">
        <h4 class="desc__name"><span v-if="brandInfoData.name !== ''">{{ brandInfoData.name }}</span><span v-else>브랜드명</span></h4>
        <p class="desc__text"><span v-if="brandInfoData.desc !== ''">{{ brandInfoData.desc }}</span><span v-else>브랜드소개를 입력하세요</span></p>
      </div>
    </div>
    <div class="brand-detail">
      <TabCmp tabClass="brand-tab"  size="small"
        :activeIndex="curTab === 'feed' ? 0 : 1">
        <TabItem title="소식">
          <div class="notice-box">
            <p class="notice-title">
              <span v-if="feedData.title">{{ feedData.title }}</span>
              <span v-else>알림 제목을 입력해주세요.</span>
            </p>
            <p class="notice-content">
              <span v-if="feedData.content" v-html="feedData.content"></span>
              <span v-else>알림 내용을 입력해주세요.</span>
            </p>
          </div>
        </TabItem>
        <TabItem title="정보">
          <dl class="tel">
            <dt>전화번호</dt>
            <dd>{{ brandInfoData.tel }}</dd>
          </dl>
          <dl class="web">
            <dt>웹사이트</dt>
            <dd>{{ brandInfoData.url }}</dd>
          </dl>
          <dl class="email">
            <dt>이메일</dt>
            <dd>{{ brandInfoData.email }}</dd>
          </dl>
        </TabItem>
      </TabCmp>
    </div>
  </div>
</template>

<script>
import TabItem from '@/components/common/TabItem.vue'
import TabCmp from '@/components/common/TabCmp.vue'
export default {
  components: {
    TabCmp,
    TabItem
  },
  props: {
    curTab: String,
    brandInfoData: {
      type: Object,
      default: () => {
        return {
          name: '브랜드명',
          desc: '브랜드 소개를 입력하세요',
          bgImgFileUrl: '',
          custombgImgFileUrl: '',
          profileImgFileUrl: '',
          url: '',
          email: '',
          tel: ''
        }
      }
    },
    feedData: {
      type: Object,
      default: () => {
        return {
          title: '',
          content: ''
        }
      }
    }
  },
  mounted() {
    console.log(this.brandInfoData)
  }
}
</script>
