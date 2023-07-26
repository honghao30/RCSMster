<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="안심마크 관리" />
        <div class="top-ctrl-area">
          <div class="left-area">
            <div class="dropdown-search__wrap">
              <div class="search-area">
                <span class="input search-box">
                  <input type="text" v-model='saftyList.formData.subTitle' @keyup.enter='getBrandSaftyList' placeholder="대화방명 입력하세요."/>
                  <!-- 기획서 v1.0 수정: placeholder 텍스트 변경 -->
                  <ButtonCmp
                    type="btn-only-icon"
                    iconname='icon-search'
                    @click='getBrandSaftyList'
                  >
                  </ButtonCmp>
                </span>
              </div>
            </div>
          </div>
          <!-- <div class="right-area">
            <div class="button__wrap button__brand">
              <button class="btn-brand">
                안심마크 이용가이드
              </button>
            </div>
          </div> -->
          <!-- 기획서 v1.0 수정: 이용가이드 영역 삭제 -->
        </div>
        <div class="top-ctrl-area">
          <p class="total">총 <strong>7</strong>건</p>
        </div>
        <!-- 기획서 v1.0 수정: sorting 건 수 영역 추가 => 추후 디자인 확인 필요 -->
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
                    <input type="checkbox" id="all" :checked='allCheck' @change="checkAll($event)"/>
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
                v-for="(item, i) in saftyList.list" :key="i"
              >
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" @change='checkItem($event, item)' :value="`item${i+1}`" v-model="item.isCheck">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td>
                  {{ item.subTitle }}
                </td>
                <td>
                  {{ item.chatbotId }}
                </td>
                <td>
                  <div class="switch" role="switch">
                    <input type="checkbox" :id="`switch+${i+1}`" @change='changeStatus($event, item)' :checked="item.mark" >
                    <label class="switch__core" :for="`switch+${i+1}`"></label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 1차 디자인 수정 -->
        <div class="button__wrap history-btn" v-if="!isInviteAction">
          <ButtonCmp
            type="btn-blue-line"
            @click='updateStatus("SET")'
          >사용</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
            @click='updateStatus("CLEAR")'
          >미사용</ButtonCmp>
        </div>
        <PagingCmp :total='saftyList.totalSize' :current-page='saftyList.formData.page' :page-size='saftyList.formData.size' @change='saftyListChangePage'  />
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="closeMsg()"
        v-if="isFinish"
        modalsize="dashboard_small_modal"
      >
        <div class="msg" slot="msg">
          <p>처리되었습니다.</p>
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-line"
            @click="closeMsg"
          >
            확인
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>'
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import { applyBrandSaftyList, retrieveBrandSaftyList } from '@/api/service/service'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/dashboard/components/ConfirmMsg.vue'

export default {
  components: {
    ConfirmMsg,
    ModalView,
    PageTitle,
    BrandLnb,
    ButtonCmp,
    PagingCmp
  },
  data() {
    return {
      isModalViewed: false,
      isFinish: false,
      checkedItems: [],
      saftyList: {
        list: [],
        formData: {
          subTitle: '',
          page: 1,
          size: 10
        },
        totalSize: 0
      }
    }
  },
  computed: {
    brandId () {
      return this.$router.currentRoute.params.brandId
    },
    allCheck () {
      for (let key in this.saftyList.list) {
        if (!this.saftyList.list[key].isCheck) return false
      }
      return true
    },
    isInviteAction() {
      for (let key in this.checkedItems) {
        if (this.checkedItems[key].value) return false
      }
      return true
    }
  },
  created() {},
  mounted() {
    this.getBrandSaftyList()
  },
  methods: {
    getBrandSaftyList() {
      retrieveBrandSaftyList(this.brandId, this.saftyList.formData).then((res) => {
        this.saftyList.list = res.result.list.map(item => {
          item.mark = item.saftyStatus === 'SET'
          item.isCheck = false
          for (let key in this.checkedItems) {
            if (this.checkedItems[key].id === item.chatbotId) {
              item.isCheck = this.checkedItems[key].value
            }
          }
          return item
        })
        this.saftyList.totalSize = res.result.totalSize
      })
    },
    checkAll(e) {
      for (let key in this.saftyList.list) {
        this.saftyList.list[key].isCheck = e.target.checked
        let isChecked = true
        for (let id in this.checkedItems) {
          if (this.checkedItems[id].id === this.saftyList.list[key].chatbotId) {
            this.checkedItems[id].value = e.target.checked
            isChecked = false
          }
        }
        if (isChecked) this.checkedItems.push({ id: this.saftyList.list[key].chatbotId, value: e.target.checked })
      }
    },
    saftyListChangePage(page) {
      this.saftyList.formData.page = page
      this.getBrandSaftyList()
    },
    checkItem(e, item) {
      for (let key in this.checkedItems) {
        if (this.checkedItems[key].id === item.chatbotId) {
          this.checkedItems[key].value = e.target.checked
          return true
        }
      }
      this.checkedItems.push({ id: item.chatbotId, value: e.target.checked })
      return true
    },
    updateStatus(saftyStatus) {
      let ids = []
      this.checkedItems.forEach(row => {
        ids.push(row.id)
      })
      applyBrandSaftyList(this.brandId, { chatbotIds: ids, saftyStatus }).then(() => {
        this.successModal()
      }).catch(e => {
        this.$alertMsg(e.desc)
        this.getBrandSaftyList()
      })
    },
    closeMsg() {
      this.isModalViewed = false
      this.isFinish = false
    },
    successModal() {
      this.isModalViewed = true
      this.isFinish = true
    },
    changeStatus(e, item) {
      let saftyStatus = e.target.checked ? 'SET' : 'CLEAR'
      applyBrandSaftyList(this.brandId, { chatbotId: item.chatbotId, saftyStatus }).then(() => {}).catch(e => {
        this.$alertMsg(e.desc)
        this.getBrandSaftyList()
      })
    }
  }
}
</script>
