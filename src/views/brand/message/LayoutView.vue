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
                    <th scope="row"><span class="form-item__label">상품</span></th>
                    <td>
                      <span class="text">SMS</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">레이아웃 명</span></th>
                    <td>
                      <span class="text">아이템 강조형</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">버튼 컬러</span></th>
                    <td>
                      <span class="text">#2f77fb</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">상태</span></th>
                    <td>
                      <span class="text">등록중</span>
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
          <!-- 에뮬레이터 -->
          <div class="brand-aside">
            <LayoutEmulator
              :templateData="templateData"
              mode="layout"
              :viewMode="viewMode"
            />
          </div>
          <!-- // 에뮬레이터 -->
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
import LayoutEmulator from '@/views/brand/message/components/LayoutEmulator.vue'
export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    LayoutEmulator
  },
  data() {
    return {
      templateData: [
        {
          type: 'MainTitle',
          info: {
            imgUrl: require('@/assets/images/message/icon_cmp_title.png')
          }
        },
        {
          type: 'Description',
          info: {
            imgUrl: require('@/assets/images/message/icon_cmp_desc.png')
          }
        }
      ],
      viewMode: 'isView'
    }
  },
  methods: {
    openDeleteMsg () {
      console.log('openDeleteMsg')
    }
  }
}
</script>
