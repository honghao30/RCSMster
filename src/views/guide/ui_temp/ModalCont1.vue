<template>
  <div
    class="modal__content--inner test-content"
  >
    <div class="modal__content--header">
        모달 제목
    </div>
      <div class="modal__content--body">
        제 1조 목적<br>
        본 서비스 약관은 주식회사 케이티, 주식회사 에스케이텔레콤, 주식회사 엘지유플러스(이하”이동통신3사”라 한다)가 제공하는 RCS Biz Center 서비스 (이하 "서비스"라 합니다)를 이용함에 있어 필요한 서비스 이용조건 및 절차 등 기타 제반사항을 규정함을 목적으로 합니다.
        제 2조 약관의 효력 및 변경<br>
        ①
        본 약관은 서비스를 이용하고자 하는 모든 “회원”에 대하여 그 효력을 발생합니다.<br>
        ②
        본 약관의 내용은 “서비스” 화면에 게시하거나 기타의 방법으로 “회원”에게 공지하고, 이에 동의한 “회원”이 “서비스”에 가입함으로써 효력이 발생합니다.<br>
        ③
        “이동통신3사”는 필요하다고 인정되는 경우 본 약관을 변경할 수 있으며, “이동통신3사”가 약관을 변경할 경우에는 적용일자 및 변경사유를 명시하여 제2항과 같은 방법으로 그 적용일자 15일전에 공지합니다. 다만, “회원”에게 불리한 약관 변경인 경우에는 그 적용일자 30일전에 공지하며, 담당자 연락처 또는 담당자 E-Mail등으로 “회원”에게 개별 통지합니다. 단, “회원”의 담당자 연락처 미기재, 변경 후 미수정 등으로 인하여 개별 통지가 어려운 경우에 한하여 본 항의 공지를 함으로써 개별 통지한 것으로 간주합니다.
        ④
        “회원”이 변경된 “서비스” 또는 약관 사항에 동의하지 않는 경우 “서비스” 이용 계약의 해지를 요청할 수 있습니다.<br>
        ⑤
        “회원”이 변경된 “서비스” 또는 약관 사항에 적용일자 전 일까지 명시적으로 거부 의사표시를 하지 않은 경우 “회원”이 개정 약관에 동의 한 것으로 간주합니다.<br>
        제 3조 약관 외 규정
        본 약관에 명시되지 않은 사항에 대해서는 관련 법령 및 “이동통신3사”가 정한 “서비스”의 세부이용지침 등의 규정에 의합니다.<br>
      </div>
      <div class="modal__content--footer">
        <ButtonCmp
          type="btn-blue"
          @click="$emit('closeModal')"
        >
          확인
        </ButtonCmp>
      </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    ButtonCmp
  }
}
</script>

<style scoped>
.test-content {background: #fff;z-index: 25;max-width: 500px;}
.modal__content--body {padding:20px;}

</style>
