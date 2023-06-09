<template>
  <div class="feed-view__item">
    <div class="feed-view__top">
      <ul class="feed-view__info">
        <li class="id"><span class="label">소식 ID</span>{{ feedData.feedId }}</li>
        <li class="type">{{ feedData.feedType }}</li>
        <li class="status">{{ feedData.feedStatus }}</li>
      </ul>
      <ul class="feed-view__info">
        <li class="author"><span class="label">등록자</span>{{ feedData.feedAuthor }}</li>
        <li class="date"><span class="label">최종 작업일</span>{{ feedData.feedDate }}</li>
        <li class="date"><span class="label">게시(예약)일</span>{{ feedData.feedPublishDate }}</li>
      </ul>
      <ul class="ctrl">
        <li>
          <ButtonCmp
            type="btn-only-icon"
            iconname='icon-pin'
            v-if="feedData.isFixed"
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
              <a role="button">미노출</a>
            </li>
            <li>
              <a role="button">수정</a>
            </li>
            <li>
              <a role="button">삭제</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="feed-view">
      <div class="feed-view__box">
        <feedEmulator :feedInfoData="feedData.feedItem" />
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import feedEmulator from '@/views/brand/feed/components/feedEmulator.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
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
    }
  },
  data() {
    return {
      isLayerOpen: false
    }
  },
  methods: {
    layerMenuOpen() {
      this.isLayerOpen ? this.isLayerOpen = false : this.isLayerOpen = true
    },
    onClickOutside() {
      this.isLayerOpen = false
    }
  }
}
</script>

<style>

</style>
