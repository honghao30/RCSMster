<template>
  <div class="inner notice-content">
    <PageTitle pagetitle="공지사항" />
    <div class="table__wrap notice-table">
      <table class="table table-list">
        <colgroup>
          <col width="11%">
          <col>
          <col width="17%">
        </colgroup>
        <thead>
          <tr class="notice-content__subject">
            <th scope="col" colspan="2" class="notice-content__title">
              <p>RCS Biz Center 검수기 승인 안내 제3회 전국동시조합장선거 후보자 브랜드 등록 안내 수정 국동시조합장선거 후보자 브랜드 등록 안내</p>
            </th>
            <th scope="col" class="notice-content__date">
              <p>2023.04.25</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="notice-content__file">
              <span>첨부파일</span>
            </td>
            <td colspan="2" class="notice-content__list">
              <ul>
                <li class="l-align title">
                  <p>펨플릿.jpg</p>
                  <i class="ico-download"></i>
                </li>
                <li class="l-align title">
                  <p>Action버튼_데이터 셋_sample_20201103.xlsx</p>
                  <i class="ico-download"></i>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="notice-content__contents"> 
              <p>안녕하세요. RCS Biz Center입니다.<br/>
                  RCS Biz Center 검수 사이트는 평일 09:00~18:00 에만 승인이 가능하며,<br/>
                  운영에 다른 점검 및 반영 작업으로 인해 승인이 다소 늦어질 수 있습니다.<br/>
                  또한 검수기 특성상 연동 테스트를 위한 정보들이 대량으로 등록되어 있어<br/>
                  실제 승인이 필요한 항목에 대한 구분이 불가하여 신청 후 메일(tech@rcsbizcenter.com)로 요청 부탁 드립니다.<br/>
                  <br/>
                  RCS Biz Center 검수 사이트는 평일 09:00~18:00 에만 승인이 가능하며,<br/>
                  운영에 다른 점검 및 반영 작업으로 인해 승인이 다소 늦어질 수 있습니다.<br/>
                  또한 검수기 특성상 연동 테스트를 위한 정보들이 대량으로 등록되어 있어<br/>
                  실제 승인이 필요한 항목에 대한 구분이 불가하여 신청 후 메일(tech@rcsbizcenter.com)로 요청 부탁 드립니다.<br/>
                  <br/>
                  RCS Biz Center 검수 사이트는 평일 09:00~18:00 에만 승인이 가능하며,<br/>
                  운영에 다른 점검 및 반영 작업으로 인해 승인이 다소 늦어질 수 있습니다.<br/>
                  또한 검수기 특성상 연동 테스트를 위한 정보들이 대량으로 등록됩니다.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button__wrap">
      <ButtonCmp type="btn-blue">목록</ButtonCmp>
    </div>
    <div class="table__wrap notice-table">
      <table class="table table-list notice-content__table">
        <colgroup>
          <col width="12%">
          <col width="12%">
          <col>
        </colgroup>
        <tbody>
          <tr
            v-for="(item, i) in noticeData" :key="i">
            <td>
                <i class="ico-up" v-if="item.up"></i>
                <i class="ico-down" v-if="item.down"></i>
            </td>
            <td>
                <p class="list-data">{{ item.data }}</p>
            </td>
            <td>
              <div class="l-align title">
                <router-link to=""
                >{{ item.title }}
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  name: 'NoticeView',
  data() {
    return {
      noticeData:
      [
        {
          up: true,
          down: false,
          data: '이전글',
          title: '3rd Party App의 RCS 문자 메시지 인식을 위한 개발 가이드'
        },
        {
          up: false,
          down: true,
          data: '다음글',
          title: '[작업] 삼성 MaaP 작업에 따른 RCS Biz Center 서비스 차단 안내 (7월 19일 ~ 20일)'
        }
      ]
    }
  },
  components: {
    PageTitle,
    ButtonCmp
  },
  computed: {
    checkBoardLength() {
      return this.noticeData.length < 0 ? false : true;
    }
  }
}
</script>

<style>

</style>
