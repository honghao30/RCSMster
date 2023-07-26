<template>
  <div>
    <template v-if="viewType == 'WATING'">
      <div class="join-compt__wrap">
        <h3 class="title">계정 등록 요청 완료</h3>
        <p class="text">신청이 완료되었습니다.
        <br />관리자의 승인 전까지 RBC의 기능을 임시로 이용할 수 있으며 승인 완료 시 정상 등록됩니다.</p>
      </div>
      <div class="button__wrap">
        <ButtonCmp type="btn-blue-line" @click="goHome">HOME</ButtonCmp>
        <ButtonCmp type="btn-blue" @click="goLogin">로그인</ButtonCmp>
      </div>
    </template>
    <template v-else-if="viewType == 'SAVED'">
      <div class="join-compt__wrap">
        <h3 class="title">임시 계정 등록 완료</h3>
        <p class="text">사업자등록증을 제출하셔야 원활한 서비스 이용이 가능합니다.
        <br />사업자번호 점유 등 악용의 우려가 있어서 7일내 사업자등록증을 제출하지 않는 경우 등록한 모든 데이터가 자동 삭제됩니다.</p>
      </div>
      <div class="button__wrap">
        <ButtonCmp type="btn-blue-line" @click="goHome">HOME</ButtonCmp>
        <ButtonCmp type="btn-blue" @click="goLogin">로그인</ButtonCmp>
      </div>
    </template>
    <template v-else-if="viewType == 'OK'">
      <div class="join-compt__wrap">
        <h3 class="title">계정 등록 요청 완료</h3>
        <p class="text">계정이 등록되었습니다.
        <br />브랜드의 관리자로 지정되어 다양한 RBC 기능을 이용할 수 있습니다.</p>
        <div class="top-notice--gray">
          <p>사업자등록증을 제출하면 다음과 같은 기능을 이용할 수 있습니다.</p>
          <ul>
            <li>&bull; 브랜드 등록 및 관리</li>
            <li>&bull; 브랜드 관리자 지정 및 업무 위임</li>
          </ul>
        </div>
      </div>
      <!-- 박스 퍼블리싱 추가 예정 -->
      <div class="button__wrap">
        <ButtonCmp type="btn-blue-line" @click="goHome">HOME</ButtonCmp>
        <ButtonCmp type="btn-blue" @click="goService">서비스 소개</ButtonCmp>
      </div>
    </template>
    <template v-else-if="viewType == 'AGENCY'">
      <div class="join-compt__wrap">
        <h3 class="title">가입 신청 완료</h3>
        <p class="text">운영자 심사를 거쳐 승인이 완료된 후에 서비스를 이용하실 수 있습니다.
        <br />가입 승인 결과는 신청 시 입력하신 문자(SMS)와 이메일로 발송 예정입니다.</p>
      </div>
      <div class="button__wrap">
        <ButtonCmp type="btn-blue-line" @click="goHome">HOME</ButtonCmp>
        <ButtonCmp type="btn-blue" @click="goApplyResult">가입신청 결과 조회</ButtonCmp>
      </div>
    </template>
    <template v-else>
      <div class="join-compt__wrap">
        <h3 class="title">계정 등록 요청 완료</h3>
        <p class="text">계정이 등록되었습니다.</p>
      </div>
      <div class="button__wrap">
        <ButtonCmp type="btn-blue-line" @click="goHome">HOME</ButtonCmp>
        <ButtonCmp type="btn-blue" @click="goLogin">로그인</ButtonCmp>
      </div>
    </template>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    ButtonCmp
  },
  props: {
    viewType: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    goLogin () {
      this.$router.push('./login')
    },
    goService () {
      this.$router.push('/')
    },
    goApplyResult() {
      this.$router.push('/join/retriveapply')
    }
  }
}
</script>
