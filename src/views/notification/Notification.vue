<template>
  <div class="inner notification">
    <PageTitle pagetitle="알림" />
    <!-- 스와이프 탭 -->
    <TabCategory :category="category" :newTabIndex ="newTabIndex" />
    <!-- 버튼 및 설명 -->
    <div class="notification-des button__wrap">
      <p>최근 14일 이내 알림만 노출됩니다.</p>
      <!-- 클릭 시 비활성화 되도록 설정함 / 새로운 알림이 없는 경우에는 : disabled  -->
      <ButtonCmp type="btn-search" @click="allDimed" :disabled="isActive">모두 읽음 처리</ButtonCmp>
    </div>
    <!-- 알림박스 / 읽음 미처리 -->
    <div class="notification-item" :class="{dimed: isDimed}">
      <div class="notification-top">
        <!-- 완료: 이중클래스 없음 / 반려 & 삭제 : red / 요청 & 초대 : gray -->
        <span class="notification-type red">반려</span>
        <p class="notification-date">2023.04.06 17:22:22</p>
      </div>
      <div class="notification-cont">
        <ul>
          <li><strong>#브랜드#</strong>가 반려되었습니다.</li>
          <li>반려사유를 확인해주세요.</li>
        </ul>
      </div>
    </div>
    <!-- 알림박스 / 읽음 미처리 -->
    <div class="notification-item" :class="{dimed: isDimed}">
      <div class="notification-top">
        <!-- 완료: 이중클래스 없음 / 반려 : reject / 요청: request -->
        <span class="notification-type red">삭제 D-1</span>
        <p class="notification-date">2023. 04. 06 17:12:22</p>
      </div>
      <div class="notification-cont">
        <ul>
          <li>미사용(사용정지) <strong>#대화방#</strong>은 금일 자정 이후 삭제될 예정입니다.</li>
          <li><strong>삭제 예정일 : 2023-04-07</strong></li>
        </ul>
      </div>
    </div>
    <!-- 알림박스  / 읽음 처리 -->
    <div class="notification-item dimed">
      <div class="notification-top">
        <!-- 완료: 이중클래스 없음 / 반려 : reject / 요청: request -->
        <span class="notification-type">답변완료</span>
        <p class="notification-date">2023. 04. 06 17:12:22</p>
      </div>
      <div class="notification-cont">
        <ul>
          <li>온라인 문의 답변이 이메일로 발송되었습니다.</li>
        </ul>
      </div>
    </div>
    <!-- 알림박스  / 읽음 처리 -->
    <div class="notification-item dimed">
      <div class="notification-top">
        <!-- 완료: 이중클래스 없음 / 반려 : reject / 요청: request -->
        <span class="notification-type gray">갱신요청</span>
        <p class="notification-date">2023. 04. 06 17:12:22</p>
      </div>
      <div class="notification-cont">
        <ul>
          <li>갱신이 필요한 발신번호가 <Strong>1개</Strong>가 있습니다.</li>
        </ul>
      </div>
    </div>
    <!-- 알림박스  / 읽음 처리 -->
    <div class="notification-item dimed">
      <div class="notification-top">
        <!-- 완료: 이중클래스 없음 / 반려 : reject / 요청: request -->
        <span class="notification-type">가입완료</span>
        <p class="notification-date">2023. 04. 06 17:12:22</p>
      </div>
      <div class="notification-cont">
        <ul>
          <li><Strong>홍길동(매니저)</Strong>님이 가입하셨습니다.</li>
        </ul>
      </div>
    </div>
    <!-- 알림박스  / 읽음 처리 -->
    <div class="notification-item dimed">
      <div class="notification-top">
        <!-- 완료: 이중클래스 없음 / 반려 : reject / 요청: request -->
        <span class="notification-type red">반려</span>
        <p class="notification-date">2023. 04. 06 17:12:22</p>
      </div>
      <div class="notification-cont">
        <ul>
          <li><strong>#브랜드#</strong>가 반려되었습니다.</li>
          <li>반려사유를 확인해주세요.</li>
        </ul>
      </div>
    </div>
    <!-- 새로운 알림이 없는 경우 -->
    <p class="notification-none">새로운 알림이 없습니다.</p>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import TabCategory from '@/components/common/TabCategory'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    PageTitle,
    TabCategory,
    ButtonCmp
  },
  data() {
    return {
      activeTabIndex: 0,
      newTabIndex: [1, 3],
      category: ['전체', '승인결과', '운영·관리', '초대'],
      isDimed: false,
      isActive: false
    }
  },
  methods: {
    allDimed () {
      this.isDimed = true
      this.isActive = true
    }
  }
}
</script>
