<template>
  <div class="feed-view__item">
    <!-- 검색결과 없을 시 -->
    <div class="no-result" v-if="noResult">
      검색 결과가 없습니다.
    </div>
    <!-- //검색결과 없을 시 -->
    <!-- 검색결과 없을 시 -->
    <div class="no-data" v-if="noData">
      <p>첫 소식을 등록해 보세요.</p>
      <ButtonCmp
        type="btn-blue"
      >
        등록하기
      </ButtonCmp>
    </div>
    <!-- //검색결과 없을 시 -->
    <div class="feed-view__top">
      <ul class="feed-view__info">
        <li class="id"><span class="label">소식 ID</span>{{ feedData.feedId }}</li>
        <li class="type">{{ feedData.typeNm }}</li>
        <li class="status">{{ feedData.statusNm }}</li>
      </ul>
      <ul class="feed-view__info">
        <li class="author"><span class="label">등록자</span>{{ feedData.userNm }}</li>
        <li class="date"><span class="label">최종 작업일</span>{{ feedData.updateDate }}</li>
        <li class="date" v-if='feedData.publishType === "reservation"' ><span class="label">게시(예약)일</span>{{ feedData.publishDate }}</li>
      </ul>
      <ul class="ctrl">
        <li>
          <ButtonCmp
            type="btn-only-icon"
            iconname='icon-pin'
            v-if="feedData.pinYn === 'Y'"
          >
          </ButtonCmp>
        </li>
        <li v-click-outside="onClickOutside">
          <ButtonCmp
            type="btn-only-icon"
            iconname='icon-more'
            @click="layerMenuOpen"
          >
          </ButtonCmp>
          <ul class="layer__more-menu" v-if="isLayerOpen" >
            <li>
              <a role="button" @click='noDisplay(feedData)'>{{ displayChangeBtnNm }}</a>
            </li>
            <li>
              <a role="button" @click='mod(feedData)'>수정</a>
            </li>
            <li>
              <a role="button" @click='deleteFeed(feedData)'>삭제</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="feed-view">
      <feedEmulator
        :feedInfoData="feedData"
        :showBrandHeader="false"
      />
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import feedEmulator from '@/views/brand/feed/components/feedEmulator.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { mapGetters } from 'vuex'
import { feedRemove, updateDisplayFeed } from '@/api/feed/feed'
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    feedEmulator,
    ButtonCmp
  },
  props: {
    feedData: {
      type: Object
    },
    noResult: {
      type: Boolean,
      default: false
    },
    noData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLayerOpen: false
    }
  },
  computed: {
    ...mapGetters('brand', {
      brandDetail: 'getBrandDetail'
    }),
    displayChangeBtnNm () {
      return (this.feedData.status === 'ok') ? '미게시' : '게시'
    }
  },
  methods: {
    layerMenuOpen() {
      this.isLayerOpen ? this.isLayerOpen = false : this.isLayerOpen = true
    },
    onClickOutside() {
      this.isLayerOpen = false
    },
    mod(item) {
      this.$emit('mod', JSON.parse(JSON.stringify(item)))
      this.isLayerOpen = false
    },
    deleteFeed(feed) {
      this.$confirmMsg('삭제 하시겠습니까?').then(() => {
        feedRemove(feed.brandId, feed.feedId).then((res) => {
          if (res.code === '20000000') {
            this.$parent.getFeedList()
            this.$parent.initFeedForm()
          } else {
            this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
          }
        })
      })
    },
    noDisplay(feed) {
      this.$confirmMsg('미게시 하시겠습니까?').then(() => {
        let param = {}
        if (feed.status === 'ok') {
          param.display = 'save'
        } else {
          param.display = 'ok'
        }
        updateDisplayFeed(feed.brandId, feed.feedId, param).then((res) => {
          if (res.code === '20000000') {
            this.$parent.getFeedList()
            this.$parent.initFeedForm()
          } else {
            this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
          }
        })
      })
    }
  }
}
</script>

<style>

</style>
