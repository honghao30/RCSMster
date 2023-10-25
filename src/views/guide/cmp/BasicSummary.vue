<template>
  <div class="content__wrap">
    <SubTitle pageTitle="개요" />
    <div class="content-body">
      <TitleH3 titleH3="가이드 개요" />
      <div class="wsg-guide-body">
        <table class="wsg-table-body">
          <caption><span class="irtext">프로젝트, 작업기간,가이드 작업자, 최종 수정일로 구성된 프로젝트 정보입니다.</span></caption>
          <colgroup>
            <col style="width:20%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">프로젝트</th>
              <td>RBC UX/UI 개편</td>
            </tr>
            <tr>
              <th scope="row">작업기간</th>
              <td>202304 ~ 202310</td>
            </tr>
            <tr>
              <th scope="row">가이드 작업자</th>
              <td>홍성호(hongsh@the-51.com)</td>
            </tr>
            <tr>
              <th scope="row">최종 수정일</th>
              <td>20231023</td>
              </tr>
          </tbody>
        </table>
        <h3 class="wsg-guide-title">예외사항</h3>
        <ul class="wsg_desc">
          <li>퍼블리싱 가이드는 RBC UX/UI 리뉴얼 기준으로 작성되었으며 타 프로젝트의 코드 규칙을 담보하지 않습니다.</li>
          <li>해당 가이드의 일부 내용은 코드 균일성을 위한 표준 가이드를 제시하나 필요하지 않은 경우 해당 규칙을 사용하지 않습니다.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SubTitle from './SubTitle.vue'
import TitleH3 from './TitleH3.vue'

export default {
  name: 'BasicGuide',
  components: {
    SubTitle,
    TitleH3
  }
}
</script>

<style lang="scss">
// @import url('@/assets/scss/common/guide.scss');
</style>
