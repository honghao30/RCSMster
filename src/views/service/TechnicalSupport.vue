<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0202'"/>
      </div>
      <div class="top_title_area">
        <h1 class="h1_title mar_b25">기술지원</h1>
        <span class="h3_desc fs20">
          RCS 서비스를 이용하는 기업과 대행사에게는 RCS 서비스 운영에 필요한 기능을 Open API로 제공하고 있습니다.
          <br>이를 이용하여 브랜드/발신번호/양방향 대화방/템플릿/자동응답 정보 조회는
          <br>물론 발신번호, 템플릿에 대한 승인 요청 기능 등을 사용자가 원하는 형태로 구현하실 수 있습니다.
        </span>
      </div>
      <div class="technical_list">
        <div class="title_wrap mar_b20">
          <h3 class="h3_title">API 목록</h3>
        </div>
        <table class="tbl_row_type">
          <caption>
            <strong>API목록</strong>
            <p>Token, corporation, Agency, Messagebase, Chatbot</p>
          </caption>
          <colgroup>
            <col style="width:240px;">
            <col style="width:auto;">
          </colgroup>
          <tbody>
            <tr>
              <th>Token</th>
              <td>Access Token 발급 요청</td>
            </tr>
            <tr>
              <th>Corporation</th>
              <td>기업관리자 ID별 관리 권한이 있는 브랜드 목록 조회</td>
            </tr>
            <tr>
              <th>Agency</th>
              <td>대행사가 계약된 브랜드 정보 조회 및 알림 수신</td>
            </tr>
            <tr>
              <th>Messagebase</th>
              <td>템플릿 목록 및 상세 정보 조회와 관리 (등록/수정/삭제)</td>
            </tr>
            <tr>
              <th>Chatbot</th>
              <td>브랜드에 등록된 발신번호, 양방향 대화방 목록 조회와 관리 (등록/수정/삭제)</td>
            </tr>
            <tr>
              <th>Feed</th>
              <td>브랜드에 등록된 소식 조회와 관리(등록/수정/삭제)</td>
            </tr>
          </tbody>
        </table>
        <div class="cont_flex_bundle bg_api mar_t40">
          <a href="https://app.swaggerhub.com/apis-docs/MaaP_KR/RCS_Biz_Center/1.1.9" class="btn_wrap" target="_blank" title="새창으로 열림">
            <span class="text">
              RCS
              <span>Biz Center Open</span>
               API 바로가기
            </span>
            <span class="h5_desc">크롬 브라우저를 이용하세요.</span>
          </a>
          <a href="https://app.swaggerhub.com/apis-docs/MaaP_KR/RCS_Biz_Center_Brand_Feed/1.0.0" class="btn_wrap" target="_blank" title="새창으로 열림">
            <span class="text">
              브랜드 소식
              <span>Open API</span>
              바로가기
            </span>
            <span class="h5_desc">크롬 브라우저를 이용하세요.</span>
          </a>
        </div>
        <div class="cont_block_bundle mar_t20">
          <span
            class="h3_desc caption"
          >Open API 사용을 위한 API 인증Key는 가입신청 승인 시 발급됩니다. (기업관리자/대행사 계정인 경우)</span>
          <span class="h3_desc caption">
            API Key는
            <a
              href="javascript:void(0);"
              class="btn_underline point"
              @click="goMyinfo"
            >내 정보관리</a>에서 확인 및 재발급 가능합니다.
            <br>직접 재발급이 어려운 경우 관리자에게
            <a
              href="javascript:void(0);"
              class="btn_underline point"
              @click="goQna"
            >문의</a>해주세요.
          </span>
          <span class="h3_desc caption">
            Open API 변경 사항은
            <a
              href="javascript:void(0);"
              class="btn_underline point"
              @click="goNotice"
            >공지사항</a>에서 확인하실 수 있습니다.
          </span>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Breadcrumb from '@/components/global/Breadcrumb'

export default {
  name: 'TechnicalSupport',
  components: { Breadcrumb },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    goMyinfo() {
      this.$router.push('/utility/my-info')
    },
    goQna() {
      this.$router.push('/cs/qna/form')
    },
    goNotice() {
      this.$router.push('/cs/notice')
    }
  }
}
</script>

<style lang="less" scoped></style>
