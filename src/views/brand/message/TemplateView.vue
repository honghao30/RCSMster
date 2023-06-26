<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 메시지" />
        <div class="view__wrap">
          <div class="view-table__wrap">
            <div class="table__wrap">
              <table class="table table-bodyonly">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">템플릿 ID</span></th>
                    <td>
                        <span class="text">SDKJ2935K</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">템플릿 유형</span></th>
                    <td>
                      <span class="text">말풍선</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">템플릿 이름</span></th>
                    <td>
                      <span class="text">이미지 강조형</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">제목</span></th>
                    <td>
                      <span class="text">테스트 메시지</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">상태</span></th>
                    <td>
                      <span class="text">임시등록</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table__wrap">
              <table class="table table-bodyonly">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">작성자</span></th>
                    <td>
                      <span class="text">홍*동</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">작성일</span></th>
                    <td>
                      <span class="text">2023.05.26 10:12</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="brand-aside">
          </div>
        </div>
        <div class="button__wrap space-between">
          <div class="left">
            <router-link
              class="btn-line btn"
              to="/chatbotList"
            >취소</router-link>
          </div>
          <div class="right">
            <ButtonCmp
                type="btn-line"
                @click="openDeleteMsg"
            >삭제</ButtonCmp>
            <ButtonCmp
                type="btn-blue"
            >수정</ButtonCmp>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
