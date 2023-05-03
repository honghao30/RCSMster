<template>
  <custom-popup :visible="visible" :disableBtn="disableBtn" @close="closePopup" kind="custom" title="운영 위임" noBtn="닫기" yesBtn="확인" :zIndex="500">
    <template v-slot:header>
      <div class="Popup_New_title">
        <span class="bold TitleBold">권한위임</span>
        <span class="TitleDescription"></span>
      </div>
      <div class="search_wrap">
        <div class="cont_flex_bundle">
          <span class="custom_select">
            <select v-model="formData.searchKey">
              <option value="USER_NM">이름</option>
              <option value="MBL_NUM">휴대폰번호</option>
            </select>
          </span>
          <span class="custom_input">
            <input type="text" placeholder="검색어를 입력하세요." v-model="formData.searchValue" @keypress.enter="retrieveDelegationTargetList">
          </span>
          <a href="javascript:void(0);" class="btn sml gray" @click="retrieveDelegationTargetList">
            <span>검색</span>
          </a>
        </div>
      </div>
    </template>
    <div class="layer_scroll scrollRow10" style="overflow-x: hidden;">
      <div class="search_result">
        <div class="tbl_sorting_wrap">
          <el-table :data="list" style="width: 100%" empty-text="검색결과가 없습니다." :class="{'el-table--enable-row-transition': list.length >= 100}">
            <el-table-column width="70">
              <template v-slot:default="scope">
                <el-checkbox v-model="scope.row.checked" @change="handleCheckChange(scope.$index)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="mgrUserNm" label="이름" width="100"></el-table-column>
            <el-table-column prop="mgrUserId" label="아이디" width="140"></el-table-column>
            <el-table-column label="휴대폰번호" width="150">
              <template v-slot:default="scope">
                {{addHyphenTelNum(scope.row.mblNum)}}
              </template>
            </el-table-column>
          </el-table>
        </div>
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
  retrieveDelegationTargetList,
  createManagerDelegation
} from '@/api/service/manage'
import { addHyphenTelNum } from '@/utils/textUtil'

export default {
  name: 'ManageDelegationPopup',
  props: {
    visible: {
      type: Boolean
    },
    options: {
      type: Object
    }
  },
  components: { CustomPopup },
  data() {
    return {
      formData: {
        searchKey: 'USER_NM',
        searchValue: '',
        corpId: ''
      },
      list: []
    }
  },
  computed: {
    checkedList() {
      return this.list.filter(row => row.checked === true)
    },
    disableBtn () {
      return { yes: this.checkedList.length === 0, no: false }
    }
  },
  watch: {},
  created() {
    this.$store.dispatch('getUserInfo').then(res => {
      this.formData.corpId = res.corpId
      this.retrieveDelegationTargetList()
    })
  },
  mounted() {},
  methods: {
    addHyphenTelNum,
    retrieveDelegationTargetList() {
      retrieveDelegationTargetList(this.options.brandId, this.formData)
        .then(res => {
          let list = res.result
          list.forEach(row => {
            row['checked'] = false
          })
          this.list = list
        })
        .catch(err => {
          this.$alertMsg(err.desc).then(() => {
            if (err.status === 701) {
              this.$emit('update:visible', false)
            }
          })
        })
    },
    handleCheckChange(index) {
      this.list.forEach(row => {
        row.checked = false
      })

      this.list[index].checked = true
    },
    closePopup(res) {
      if (res.ok) {
        this.delegationAuth()
      } else {
        this.$emit('update:visible', false)
      }
    },
    delegationAuth() {
      if (this.checkedList.length > 0) {
        let data = {
          prevMgrUserId: this.options.mgrUserId,
          mgrUserId: this.checkedList[0].mgrUserId
        }
        createManagerDelegation(this.options.brandId, data)
          .then(res => {
            this.$emit('delegateAuth')
            this.$emit('update:visible', false)
          })
          .catch(err => {
            this.$alertMsg(err.desc)
          })
      }
    }
  }
}
</script>
<style>
</style>
