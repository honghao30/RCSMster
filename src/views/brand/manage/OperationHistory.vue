<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="작업 히스토리" />
        <div class="top-ctrl-area">
          <div></div>
          <div class="right-area">
            <Dropdown :options="categoryOptions" placeholder="유형" />
            <Dropdown :options="statusOptions" placeholder="상태" />
            <Dropdown :options="orderOptions" placeholder="최신순" />
          </div>
        </div>
        <div class="table__wrap notice-table">
          <table class="table table-list">
            <colgroup>
              <col>
              <col width="20%">
              <col>
              <col width="20%">
              <col width="16%">
              <col width="8%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>업데이트일</span></th>
                <th scope="col"><span>유형</span></th>
                <th scope="col"><span>타이틀</span></th>
                <th scope="col"><span>상태</span></th>
                <th scope="col"><span>담당자</span></th>
                <th scope="col"><span>수정방식</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in historyList" :key="i"
              >
                <td>
                  {{ item.updateDate }}
                </td>
                <td>
                  {{ item.category }}
                </td>
                <td>
                  {{ item.title }}
                </td>
                <td>
                  {{ item.statusText }}
                  <p v-if="item.statusDetail" class="more-detail">{{ item.statusDetail }}</p>
                </td>
                <td>
                  {{ item.person }}
                  <p v-if="item.agencyName" class="more-detail">{{ item.agencyName }}</p>
                </td>
                <td>
                  {{ item.method }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 1차 디자인 수정 -->
        <!-- <div class="button__wrap" v-if="checkList.length > 0">
          <ButtonCmp
            type="btn-blue-line"
          >사용</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
          >미사용</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
          >삭제</ButtonCmp>
        </div> -->
        <PagingCmp />
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
// import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    // ButtonCmp,
    Dropdown,
    PagingCmp
  },
  data() {
    return {
      checkList: [],
      historyList: [
        {
          updateDate: '2023.04.25 13:00',
          category: '대화방',
          title: 'SYSTEM STUDIOS​',
          status: 'request',
          statusText: '수정요청',
          statusDetail: '시스템 스튜디오 대화방',
          person: '오동동',
          agencyName: 'SYSTEM STUDIO',
          method: 'web'
        },
        {
          updateDate: '2023.04.25 13:00',
          category: '템플릿 메시지',
          title: '23FW 미리보기​​',
          status: 'done',
          statusText: '승인완료',
          statusDetail: '',
          person: '김미미',
          agencyName: '',
          method: 'web'
        },
        {
          updateDate: '2023.04.25 13:00',
          category: '템플릿 레이아웃',
          title: '23FW 미리보기​​',
          status: 'reject',
          statusText: '반려',
          statusDetail: '인터넷 광고 금지 메시지​',
          person: '김미미',
          agencyName: '',
          method: 'web'
        },
        {
          updateDate: '2023.04.25 13:00',
          category: '간편 챗봇',
          title: '23FW 미리보기​​',
          status: '',
          statusText: '최초등록',
          statusDetail: '',
          person: '김미미',
          agencyName: '',
          method: 'web'
        }
      ],
      categoryOptions: [
        {
          label: '대화방',
          value: 'chat'
        },
        {
          label: '템플릿 메시지',
          value: 'template'
        },
        {
          label: '간편 챗봇',
          value: 'chatbot'
        },
        {
          label: '간편 챗봇',
          value: 'chatbot'
        }
      ],
      statusOptions: [
        {
          label: '수정요청',
          value: 'request'
        },
        {
          label: '승인완료',
          value: 'done'
        },
        {
          label: '반려',
          value: 'reject'
        },
        {
          label: '최초등록',
          value: 'regist'
        }
      ],
      orderOptions: [
        {
          label: '최신순',
          value: 'newest'
        },
        {
          label: '오래된 순',
          value: 'oldest'
        }
      ]
    }
  },
  methods: {
    labelStatus(status) {
      if (status === 'done') {
        return 'done'
      }
      if (status === 'reject') {
        return 'reject'
      }
    }
  }
}
</script>
