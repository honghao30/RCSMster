<template>
  <div class="content__wrap">
    <SubTitle pagetitle="규칙 & 설계 가이드" />
    <div class="content-body">
      <TitleH3 titleh3="규칙" />
      <div class="wsg-guide-content">
        <div class="wsg-note__wrap--gray-box">
          <ul class="ia-note-desc">
            <li>- 본 가이드는 개발팀 및 Vue의 폴더 구조에 따르며 scss의 경로 및 마크업에 해당하는 부분에 대해서 가이드 합니다.</li>
            <li>- element-ui를 사용한 ui는 본 가이드가 적용되지 않습니다.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content-body">
      <TitleH3 titleh3="폴더 구조" />
      <ul class="wsg_desc">
        <li>2023 RBC 고도화_개발가이드 v1.0_230412 문서의 구조를 따릅니다.</li>
        <li>퍼블리싱 관련 파일 위치 안내 입니다.</li>
      </ul>
      <p><img src="@/assets/images/guide/folder.jpg" alt=""></p>
    </div>
    <div class="content-body">
      <TitleH3 titleh3="네이밍 규칙" />
      <ul class="wsg_desc">
        <li>컴포넌트 기반의 웹 개발론에 최적화된 BEM 방식을 사용합니다.</li>
        <li>이름은 아래 표기법 정의에 따라 각 영문 대/소문자, 숫자, 하이픈(-)을 사용하여 작성합니다.</li>
        <li>네이밍의 조합은 형태-의미-순서-상태 순으로 사용합니다. </li>
        <li>언더스코어는 파일, 폴더, 이미지 등에만 사용합니다(background_asset_01.png)</li>
      </ul>
    </div>

    <div class="content-body">
      <TitleH3 titleh3="SCSS 파일 명" />
      <table class="wsg-table-body">
        <caption>SCSS 폴더 명</caption>
        <colgroup>
          <col style="width:20%">
          <col style="width:20%">
          <col style="width:30%">
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>분류 폴더</th>
            <th>구분 폴더</th>
            <th>파일이름</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>assets/scss</td>
            <td>common</td>
            <td>공통</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>components</td>
            <td>components 별 scss</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>views</td>
            <td>각 메뉴별 scss</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <ul class="wsg_desc">
      <li>모든 scss파일은 index.scss 파일에서 import해서 관리합니다.</li>
    </ul>
    </div>
    <div class="content-body">
      <TitleH3 titleh3="이미지 폴더 명" />
      <table class="wsg-table-body">
        <caption>이미지 폴더 명</caption>
        <colgroup>
          <col style="width:20%">
          <col style="width:20%">
          <col style="width:30%">
          <col>
        </colgroup>
        <thead>
          <tr>
            <th>분류 폴더</th>
            <th>구분 폴더</th>
            <th>서비스 명</th>
            <th>분류</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>assets/images/</td>
            <td>icon</td>
            <td>공통</td>
            <td>일반</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content-body">
      <TitleH3 titleh3="마크업 규칙" />
      <ul class="wsg_desc">
        <li>Publishing 파일은 view 디렉토리 publish 디렉토리에서 관리합니다.</li>
        <li>마크업 구조는 Vue의 구조를 따르며 style은 import 해서 사용합니다.</li>
      </ul>
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
.wsg-table-body {
    width: calc(100% + 2px);
    table-layout: fixed;
    border-top: 1px solid #96acbf;
    margin-bottom:20px;
    th {
        background-color: #f4f8fb;
        border-right: 1px solid #d9e3ea;
    }
    th,
    td
    {
        height: 50px;
        vertical-align: middle;
        text-align: left;
        line-height: 13px;
        font-size: 13px;
        line-height: 1.5;
        border-bottom: 1px solid #d9e3ea;
        padding-left:20px;
        &:first-child,
        &:last-child {border-left: 0;}
    }
    th[rowspan],
    td[rowspan] {
        border-right: 1px solid #d9e3ea;
    }
}
</style>
