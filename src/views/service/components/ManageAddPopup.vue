<template>
  <custom-popup :visible="visible" :disableBtn="disableBtn" @close="closePopup" kind="custom" title="운영권한 추가" noBtn="닫기" yesBtn="확인" :zIndex="500">
    <template v-slot:header>
      <div class="Popup_New_title">
        <span class="bold TitleBold">{{ title }}</span>
        <span class="TitleDescription">{{ description }}</span>
      </div>
      <div class="search_wrap">
        <div class="cont_flex_bundle">
          <span class="custom_select" v-if="userType == 'CORP'">
            <select v-model="formData.searchKey">
              <option v-if="userType == 'CORP'" value="USER_NM">이름</option>
              <option v-if="userType == 'CORP'" value="EMAIL">이메일</option>
              <option v-if="userType == 'AGENCY'" value="AGENCY_NM">대행사 명</option>
              <option v-if="userType == 'AGENCY'" value="AGENCY_ID">대행사ID</option>
            </select>
          </span>
          <span class="custom_input" :class="userType == 'AGENCY' ? 'wid' : ''">
            <input type="text" placeholder="검색어를 입력하세요." v-if="userType == 'CORP'" v-model="formData.searchValue" @keydown.enter="retrieveManageTargetList">
            <input type="text" placeholder="검색어를 입력하세요." v-else @input="formData.searchValue=$event.target.value" @keyup="searchList">
          </span>
          <a href="javascript:void(0);" class="btn sml gray" @click="retrieveManageTargetList" v-if="userType == 'CORP'">
            <span>검색</span>
          </a>
        </div>
      </div>
    </template>
    <div class="layer_scroll">
      <div class="search_result searc_min_hwrap">
        <table class="tbl_col_type" v-if="isLoad">
          <colgroup v-if="userType == 'CORP'">
            <col style="width:45px">
            <col style="width:140px">
            <col style="width:auto">
          </colgroup>
          <colgroup v-if="userType == 'AGENCY'">
            <col style="width:45px">
            <col style="width:auto">
            <col style="width:230px">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                <span v-if="userType == 'CORP'" class="custom_checkbox single">
                  <input type="checkbox" id="checkAll" v-model="checkAll">
                  <label for="checkAll"></label>
                </span>
              </th>
              <th scope="col" v-if="userType == 'CORP'">이름</th>
              <th scope="col" v-if="userType == 'CORP'">이메일</th>
              <th scope="col" v-if="userType == 'AGENCY'">대행사 명</th>
              <th scope="col" v-if="userType == 'AGENCY'">대행사ID</th>
            </tr>
          </thead>
          <tbody v-if="list.length > 0">
            <tr v-for="(row, index) in list" :key="`delegation-${index}`">
              <td>
                <span class="custom_checkbox single">
                  <input type="checkbox" :id="`delegation_${index}`" v-model="row.checked">
                  <label :for="`delegation_${index}`"></label>
                </span>
              </td>
              <td v-if="userType == 'CORP'"><label :for="`delegation_${index}`">{{ row.mgrUserNm }}</label></td>
              <td v-if="userType == 'CORP'"><label :for="`delegation_${index}`">{{ row.email }} </label></td>
              <td v-if="userType == 'AGENCY'"><label :for="`delegation_${index}`">{{ row.agencyNm }}</label></td>
              <td v-if="userType == 'AGENCY'"><label :for="`delegation_${index}`">{{ row.agencyId }}</label></td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="3">검색결과가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <template slot="checkMsg">
      <div class="box_result_info center" v-if="list.length === 0 || checkedList.length === 0">
        <p v-if="list.length === 0">검색결과가 없습니다.</p>
        <p v-else class="no_select">목록을 선택하세요.</p>
      </div>
    </template> -->
  </custom-popup>
</template>
<script>
import { CustomPopup } from '@/components/popupSet'
import {
  getChoseong,
  consecutiveChoseong,
  consecutiveLetter,
  searchLike
} from '@/utils/hangul'
import {
  retrieveManageTargetList,
  createManagerAuth
} from '@/api/service/manage'

export default {
  name: 'ManageAddPopup',
  props: {
    visible: {
      type: Boolean
    },
    brandId: {
      type: String
    },
    userType: {
      type: String
    }
  },
  components: { CustomPopup },
  data() {
    return {
      formData: {
        searchKey: this.userType === 'CORP' ? 'USER_NM' : 'AGENCY_NM',
        searchValue: '',
        corpId: ''
      },
      originList: [],
      list: [],
      checkAll: false,
      isLoad: false
    }
  },
  computed: {
    title() {
      return this.userType === 'AGENCY' ? '대행사 권한 추가' : '부관리자 권한 추가'
    },
    description() {
      return this.userType === 'AGENCY' ? '검색어를 입력하신 후 목록에서 선택하세요.' : ''
    },
    checkedList() {
      return this.list.filter(row => row.checked === true)
    },
    disableBtn () {
      return { yes: this.checkedList.length === 0, no: false }
    }
  },
  watch: {
    checkAll(value) {
      this.setCheckedList(value)
    },
    checkedList() {
      if (this.checkedList.length === this.list.length) {
        this.checkAll = true
      }

      if (this.checkedList.length === 0) {
        this.checkAll = false
      }
    }
  },
  created() {
    this.$store.dispatch('getUserInfo').then(res => {
      this.formData.corpId = res.corpId
      this.init()
    })
  },
  mounted() {},
  methods: {
    init() {
      this.retrieveManageTargetList()
    },
    retrieveManageTargetList() {
      retrieveManageTargetList(this.brandId, this.formData)
        .then(res => {
          let list = res.result.filter(props => {
            return props.userType === this.userType
          })
          list.forEach(row => {
            row['checked'] = false
            if (this.userType === 'AGENCY') {
              row.choseong = getChoseong(row.agencyNm)
            }
          })
          this.originList = list
          if (this.userType === 'CORP') this.list = list
          this.isLoad = true
        })
        .catch(err => {
          this.$alertMsg(err.desc).then(() => {
            if (err.status === 701) {
              this.$emit('update:visible', false)
            }
          })
        })
    },
    searchList() {
      if (this.formData.searchValue.length >= 2) {
        const cho = consecutiveChoseong(this.formData.searchValue)
        const lett = consecutiveLetter(this.formData.searchValue)
        this.list = this.originList
        if (cho.length > 0 || lett.length > 0) {
          this.list = this.list.filter(s => {
            if (cho.length > 0 && lett.length === 0) {
              return searchLike(s.choseong, cho)
            } else if (lett.length > 0 && cho.length === 0) {
              return searchLike(s.agencyNm, lett) || searchLike(s.agencyId, lett)
            } else {
              return searchLike(s.choseong, cho) && (searchLike(s.agencyNm, lett) || searchLike(s.agencyId, lett))
            }
          })
        }
      } else {
        this.list = []
      }
    },
    setCheckedList(flag) {
      this.list.forEach(row => {
        row.checked = flag
      })
    },
    closePopup(res) {
      if (res.ok) {
        this.addManageAuth()
      } else {
        this.$emit('update:visible', false)
      }
    },
    addManageAuth() {
      let ids = []
      this.checkedList.forEach(row => {
        ids.push(row.mgrUserId)
      })
      if (ids.length > 0) {
        this.visible = false
        createManagerAuth(this.brandId, { mgrUserIds: ids })
          .then(res => {
            if (res.code === '69999') {
              this.$alertMsg('대행사와 RCS 서비스 사용 계약을 체결해 주십시오.\n대행사와 계약이 되지 않은 경우 RCS 메시지를 발송할 수 없습니다.')
            }
            this.$emit('addManageAuth')
            this.$emit('update:visible', false)
          })
          .catch(err => {
            this.$alertMsg(err.desc)
            this.$emit('addManageAuth')
            this.$emit('update:visible', false)
          })
      }
    }
  }
}
</script>
<style>
</style>
