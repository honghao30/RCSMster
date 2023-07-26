<template>
  <div
    class="modal__content--inner zipcode__modal"
  >
    <div class="modal__content--header">
      <p class="modal-title">대행사 운영권한 부여</p>
    </div>
    <div class="modal__content--body">
      <div class="search-result__wrap">
        <div class="top-ctrl-area">
          <div class="dropdown-search__wrap">
            <div class="search-area">
              <span class="input search-box">
                <input type="text" v-model='authorityData.formData.agencyNm' @keyup.enter='retrieveBrandManageTargetList()' placeholder="대행사명을 입력해 주세요."/>
                <ButtonCmp
                  type="btn-only-icon"
                  iconname='icon-search'
                >
                </ButtonCmp>
              </span>
            </div>
          </div>
          <!-- 기획서 v1.0 수정: 검색 영역 추가 -->
        </div>
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col width="10%">
              <col width="45%">
              <col width="45%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  <span class="checkbox">
                    <input type="checkbox" id="all" :checked='allCheck' @change="checkAll($event)"/>
                    <label for="all"></label>
                  </span>
                </th>
                <th scope="col"><span>대행사명</span></th>
                <th scope="col"><span>대행사 ID</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in authorityData.list" :key="i">
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" :value="`item${i+1}`" @change='checkAgency($event, item)' v-model="item.agencyCheck">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td>
                  <label :for="`item${i+1}`"><span>{{ item.agencyNm }}</span></label>
                </td>
                <td><label :for="`item${i+1}`"><span>{{ item.agencyId }}</span></label></td>
              </tr>
              <!-- 검색결과 없을 때 -->
              <tr>
                <td colspan="3" v-if='authorityData.totalSize === 0'>
                    <div class="result-none">
                      <p>검색결과가 없습니다.</p>
                    </div>
                </td>
              </tr>
              <!-- // 검색결과 없을 때 -->
            </tbody>
          </table>
        </div>
<PagingCmp :total='authorityData.totalSize' :current-page='authorityData.formData.page' :page-size='authorityData.formData.size' @change='authorityListChangePage'  />
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <!-- 검색결과 있을때 disabled 삭제 -->
        <ButtonCmp
          type="btn-blue"
          @click="addManageAuth()"
          :disabled="isInviteAction"
        >초대</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { retrieveBrandManageTargetList, createManagerAuth } from '@/api/service/manage'
import PagingCmp from '@/components/common/PagingCmp.vue'

export default {
  components: {
    PagingCmp,
    ButtonCmp
  },
  data() {
    return {
      checkedItems: [],
      checkList: [],
      authorityData: {
        totalSize: 0,
        formData: {
          searchKey: '',
          searchValue: '',
          agencyNm: '',
          corpId: '',
          page: 1,
          size: 10,
          searchType: 'AGENCY' // "대행사"회원 목록 가져오기
        },
        list: [
          {
            name: '더피프티원​',
            id: 'T5ONE'
          }
        ]
      }
    }
  },
  created() {
    this.retrieveBrandManageTargetList()
  },
  computed: {
    brandId () {
      return this.$router.currentRoute.params.brandId
    },
    allCheck () {
      for (let key in this.authorityData.list) {
        if (!this.authorityData.list[key].agencyCheck) return false
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
  methods: {
    retrieveBrandManageTargetList() {
      retrieveBrandManageTargetList(this.brandId, this.authorityData.formData).then(res => {
        this.authorityData.list = res.result.list.map(item => {
          item.agencyCheck = false
          for (let key in this.checkedItems) {
            if (this.checkedItems[key].id === item.agencyId) {
              item.agencyCheck = this.checkedItems[key].value
            }
          }
          return item
        })
        this.authorityData.totalSize = res.result.totalSize
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    authorityListChangePage (page) {
      this.authorityData.formData.page = page
      this.retrieveBrandManageTargetList()
    },
    checkAll(e) {
      for (let key in this.authorityData.list) {
        this.authorityData.list[key].agencyCheck = e.target.checked
        let isChecked = true
        for (let id in this.checkedItems) {
          if (this.checkedItems[id].id === this.authorityData.list[key].agencyId) {
            this.checkedItems[id].value = e.target.checked
            isChecked = false
          }
        }
        if (isChecked) this.checkedItems.push({ id: this.authorityData.list[key].agencyId, value: e.target.checked })
      }
    },
    checkAgency(e, item) {
      for (let key in this.checkedItems) {
        if (this.checkedItems[key].id === item.agencyId) {
          this.checkedItems[key].value = e.target.checked
          return true
        }
      }
      this.checkedItems.push({ id: item.agencyId, value: e.target.checked })
      return true
    },
    addManageAuth() {
      let ids = []
      this.checkedItems.forEach(row => {
        ids.push(row.id)
      })
      if (ids.length > 0) {
        this.visible = false
        createManagerAuth(this.brandId, { mgrUserIds: ids }).then(res => {
          this.$emit('closeModal')
        }).catch(err => {
          this.$alertMsg(err.desc)
          this.$emit('closeModal')
        })
      }
    }
  }
}
</script>

<style>
</style>
