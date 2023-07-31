<template>
  <div
    class="modal__content--inner"
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">브랜드 운영권한 초대</p>
    </div>
    <div class="modal__content--body">
      <div class="top-notice--center invite-brand" v-if="paramBrandId == ''">
        <p>초대 브랜드</p>
        <Dropdown :options="dropdownBarndInviteOptions" v-model='manageList.formData.brandId' @change='inviteBrand' placeholder="브랜드를 선택하세요." />
      </div>
      <div class="search-result__wrap">
        <div class="top-ctrl-area">
          <div class="left-area">
            <div class="dropdown-search__wrap">
              <Dropdown :options="dropdownOptions" v-model='manageList.formData.searchKey' />
              <div class="search-area">
                <span class="input search-box">
                  <input type="text" @keyup.enter='retrieveManageTargetList()' v-model='manageList.formData.searchValue' placeholder="검색어를 입력하세요."/>
                  <ButtonCmp
                    type="btn-only-icon"
                    iconname='icon-search'
                    @click='retrieveManageTargetList()'
                  >
                  </ButtonCmp>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col width="10%" />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  <span class="checkbox">
                    <input type="checkbox" id="all" :checked='allCheck' @change="checkAll($event)"/>
                    <label for="all"></label>
                  </span>
                </th>
                <th scope="col"><span>이름</span></th>
                <th scope="col"><span>이메일</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in manageList.list" :key="i">
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" @change='checkItem($event, item)' :value="item.mgrUserId" v-model="item.isCheck" >
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td  class="l-align"><span>{{ item.mgrUserNm }}</span></td>
                <td class="l-align"><span>{{ item.email }}</span></td>
              </tr>
              <!-- 브랜드 선택 전 -->
              <tr v-if='manageList.formData.brandId == ""'>
                <td colspan="3">
                  <div class="result-none">
                    <p>브랜드를 선택해주세요.</p>
                  </div>
                </td>
              </tr>
              <!-- // 브랜드 선택 전 -->
              <!-- 검색결과 없을 때 -->
              <tr v-if='manageList.formData.brandId != "" && manageList.totalcount == 0'>
                <td colspan="3">
                  <div class="result-none">
                    <p>검색결과가 없습니다.</p>
                  </div>
                </td>
              </tr>
              <!-- // 검색결과 없을 때 -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <PagingCmp :page-size='manageList.formData.size' :current-page='manageList.formData.page' :total='manageList.totalcount' @change='manageListChange' />
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="addManageAuth()"
          :disabled="isInviteAction"
        >초대</ButtonCmp>
      </div>
      <div class="new-invite-box">
        <p>찾는 회원이 없다면 이메일로 회원을 초대하세요.</p>
        <ButtonCmp
          type="btn-blue"
          @click="$emit('newMemberInvite')"
        >신규 회원 초대</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import uiCommon from '@/components/js/uiCommon'
import { retrieveManageTargetList, retrieveMyCorpBrandList, createManagerAuth } from '@/api/service/manage'

export default {
  components: {
    ButtonCmp,
    Dropdown,
    PagingCmp
  },
  props: {
    modalsize: {
      type: String,
      default: ''
    },
    paramCorpId: {
      type: String,
      default: ''
    },
    paramBrandId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checkedItems: [],
      checkMgr: '',
      dropdownBarndInviteOptions: [],
      dropdownOptions: [
        {
          codeNm: '이름',
          code: 'name'
        },
        {
          codeNm: '이메일',
          code: 'mail'
        }
      ],
      barndInviteData: [
        {
          name: '김*미',
          mail: 'abcde@studio.com'
        }
      ],
      manageList: {
        list: [],
        formData: {
          searchKey: 'name',
          searchValue: '',
          corpId: this.corpId,
          page: 1,
          size: 5,
          brandId: '',
          searchType: 'CORP' // "기업"회원 목록 가져오기
        },
        totalcount: 0
      }
    }
  },
  created() {
    if (jglib.isEmpty(this.paramBrandId)) {
      this.retrieveMyCorpBrandList()
    } else {
      this.inviteBrand(this.paramBrandId)
    }
  },
  computed: {
    corpId () {
      if (this.paramCorpId) {
        return this.paramCorpId
      } else {
        return this.$router.currentRoute.params.corpId
      }
    },
    allCheck () {
      for (let key in this.manageList.list) {
        if (!this.manageList.list[key].isCheck) return false
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
    createManagerAuth() {
      createManagerAuth(this.manageList.formData.brandId, { mgrUserIds: [this.checkMgr] }).then((res) => {
        if (res.code === '20000000') {
          this.$emit('closeModal')
        }
      })
    },
    manageListChange(page) {
      this.manageList.formData.page = page
      this.retrieveManageTargetList()
    },
    inviteBrand(brandId) {
      this.manageList.formData.brandId = brandId
      this.retrieveManageTargetList()
    },
    retrieveManageTargetList() {
      retrieveManageTargetList(this.corpId, this.manageList.formData).then((res) => {
        this.manageList.list = res.result.list.map(item => {
          item.isCheck = false
          for (let key in this.checkedItems) {
            if (this.checkedItems[key].id === item.mgrUserId) {
              item.isCheck = this.checkedItems[key].value
            }
          }
          return item
        })
        this.manageList.totalcount = res.result.totalSize
      })
    },
    retrieveMyCorpBrandList() {
      retrieveMyCorpBrandList(this.corpId).then((res) => {
        this.dropdownBarndInviteOptions = uiCommon.getDropDownCodes(res.result, 'brandNm', 'brandId', false)
      })
    },
    checkAll(e) {
      for (let key in this.manageList.list) {
        this.manageList.list[key].isCheck = e.target.checked
        let isChecked = true
        for (let id in this.checkedItems) {
          if (this.checkedItems[id].id === this.manageList.list[key].mgrUserId) {
            this.checkedItems[id].value = e.target.checked
            isChecked = false
          }
        }
        if (isChecked) this.checkedItems.push({ id: this.manageList.list[key].mgrUserId, value: e.target.checked })
      }
    },
    checkItem(e, item) {
      for (let key in this.checkedItems) {
        if (this.checkedItems[key].id === item.mgrUserId) {
          this.checkedItems[key].value = e.target.checked
          return true
        }
      }
      this.checkedItems.push({ id: item.mgrUserId, value: e.target.checked })
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
