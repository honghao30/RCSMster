<template>
  <div class="dv2023_twoway-reg">
    <div>
      <div class="Popup_New_title">
        <span class="bold TitleBold">양방향 대화방 등록절차</span>
        <span class="TitleDescription">- 양방향 대화방을 사용하기 위해서는 대행사와 사전 청약이 필요합니다.</span>
        <!-- <span class="twoway-reg-pop_click">양방향 대화방 대행사 리스트 확인하기</span> -->
      </div>
    </div>
    <div class="twoway-reg-pop_wrapper">
      <div class="twoway-reg-pop_left">
        <img src="@/assets/images/dummy/emulatorpreview.png"/>
      </div>
      <div class="twoway-reg-pop_right">
        <div class="twoway-reg-pop_step1">
          <div>
            <span>STEP 1</span>
            <p>대행사<br/>사전청약</p>
          </div>
          <p>
            양방향 대화방 서비스가 가능한 대행사와의<br/>사전 청약 진행이 필요합니다.<br/>
            <a href="javascript:void(0)" @click="openAgencyInfoPopup">양방향 대행사 확인하기</a>
          </p>
        </div>
        <div class="twoway-reg-pop_step1">
          <div>
            <span>STEP 2</span>
            <p>대행사에게<br/>운영 권한 부여</p>
          </div>
          <p>
            사전 청약한 대행사에게<br/>브랜드 운영 권한을 부여합니다.<br/>
            <a href="javascript:void(0)" @click="goToManageList">운영 권한 설정하기</a>
          </p>
        </div>
        <div class="twoway-reg-pop_step3">
          <span>STEP 3</span>
          <div>
            <span>기존 대화방 사용</span>
            <p>발신번호를 챗봇ID로 사용하여, 양방향 대화방 기능을 이용할 수 있으며, 동일한 대화방에 일반문자도(SMS/LMS/MMS) 함께 보여집니다.</p>
          </div>
          <div>
            <span>신규 대화방 생성</span>
            <p>텍스트를 챗봇ID로 사용하여,  양방향 대화방 기능을 이용할 수 있습니다. 동일한 회신번호를 사용하는 대화방을 여러개 만들수 있지만, 일반문자(SMS/LMS/MMS)는 발신번호를 사용하는 대화방 쪽으로 분리되어 표시됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwowayRegistrationInfo',
  methods: {
    openAgencyInfoPopup() {
      this.$emit('openAgencyInfoPopup')
    },
    goToManageList() {
      this.$router.push({ name: 'ManageList' })
    }
  }
}
</script>
