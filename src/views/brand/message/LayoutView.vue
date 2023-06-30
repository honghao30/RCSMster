<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="레이아웃" />
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
                    <th scope="row"><span class="form-item__label">레이아웃 ID</span></th>
                    <td>
                        <span class="text">SDKJ2935K</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">레이아웃 유형</span></th>
                    <td>
                      <span class="text">이미지 템플릿</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">레이아웃 이름</span></th>
                    <td>
                      <span class="text">결제 결과 템플릿</span>
                    </td>
                  </tr>
                </tbody>
              </table>
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
            <div class="layout-code">
              <div class="code-inner">
                <code>
{
  "messagebaseId": "skt_test_blank5dp",
  "isPublic": true,
  "chatbots": [],
  "agencyId": null,
  "productCode": "mms",
  "spec": "openrichcard",
  "cardType": "MMS",
  "status": "ready",
  "desc": "여백용 컴포넌트 높이 5dp 신규작성",
  "bizCondition": "all",
  "bizCategory": null,
  "bizService": null,
  "params": [],e": 1300,
  "bizCondition": "all",
  "bizCategory": null,
  "bizService": null,
  "params": [],e": 1300
}
                </code>
              </div>

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
