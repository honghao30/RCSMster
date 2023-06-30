<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="안심마크 관리" />
        <div class="top-ctrl-area">
          <div class="left-area">
            <div class="dropdown-search__wrap">
              <Dropdown :options="TitleOptions"/>
              <div class="search-area">
                <span class="input search-box">
                  <input type="text" placeholder="검색어를 입력하세요."/>
                  <ButtonCmp
                    type="btn-only-icon"
                    iconname='icon-search'
                  >
                  </ButtonCmp>
                </span>
              </div>
            </div>
          </div>
          <div class="right-area">
            <div class="button__wrap button__brand">
              <button class="btn-brand">
                안심마크 이용가이드
              </button>
            </div>
          </div>
        </div>
        <div class="table__wrap notice-table">
          <table class="table table-list">
            <colgroup>
              <col width="56px">
              <col>
              <col>
              <col width="148px">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  <span class="checkbox">
                    <input type="checkbox" id="all" @change="checkAll"/>
                    <label for="all"></label>
                  </span>
                </th>
                <th scope="col"><span>대화방명</span></th>
                <th scope="col"><span>대화방 ID</span></th>
                <th scope="col"><span>안심마크 사용</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in safetyMarkList" :key="i"
              >
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" :value="`item${i+1}`" v-model="checkList">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td>
                  {{ item.chatTitle }}
                </td>
                <td>
                  {{ item.chatID }}
                </td>
                <td>
                  <div class="switch" role="switch">
                    <input type="checkbox" :id="`switch+${i+1}`" :checked="item.mark" >
                    <label class="switch__core" :for="`switch+${i+1}`"></label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 1차 디자인 수정 -->
        <div class="button__wrap history-btn" v-if="checkList.length > 0">
          <ButtonCmp
            type="btn-blue-line"
          >사용</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
          >미사용</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
          >삭제</ButtonCmp>
        </div>
        <PagingCmp />
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    PagingCmp
  },
  data() {
    return {
      isAllChecked: false,
      checkList: [],
      TitleOptions: [
        {
          label: '전체',
          value: 'all'
        },
        {
          label: '대화방 명',
          value: 'chatName'
        },
        {
          label: '대화방 ID',
          value: 'chatId'
        }
      ],
      safetyMarkList: [
        {
          chatTitle: 'SYSTEMSTUDIO',
          chatID: '010-5151-5151',
          mark: true
        },
        {
          chatTitle: '롯데홈쇼핑',
          chatID: '02-335-2286',
          mark: true
        },
        {
          chatTitle: 'SYSTEM HOMME​',
          chatID: 'bot-i7ke7f30e6c​',
          mark: false
        },
        {
          chatTitle: 'SYSTEMSTUDIO',
          chatID: '010-5151-5151',
          mark: true
        },
        {
          chatTitle: '롯데홈쇼핑',
          chatID: '02-335-2286',
          mark: true
        },
        {
          chatTitle: 'SYSTEM HOMME​',
          chatID: 'bot-i7ke7f30e6c​',
          mark: false
        },
        {
          chatTitle: 'SYSTEMSTUDIO',
          chatID: '010-5151-5151',
          mark: false
        },
        {
          chatTitle: '롯데홈쇼핑',
          chatID: '02-335-2286',
          mark: true
        },
        {
          chatTitle: 'SYSTEM HOMME​',
          chatID: 'bot-i7ke7f30e6c​',
          mark: false
        },
        {
          chatTitle: '롯데홈쇼핑',
          chatID: '02-335-2286',
          mark: true
        }
      ]
    }
  },
  methods: {
    checkAll() {
      if (!this.isAllChecked) {
        this.checkList = []
        for (let j = 0; j < this.safetyMarkList.length; j++) {
          let num = j + 1
          this.checkList.push(`item${num}`)
        }
        this.isAllChecked = true
      } else { // 선택해제
        this.checkList = []
        this.isAllChecked = false
      }
    }
  }
}
</script>
