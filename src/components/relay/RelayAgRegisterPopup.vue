<template>
      <div tabindex="0" class="layer_cont">
        <div class="layer_head">
          <p class="mar_b20">불러오실 양방향 대화방 중계사를 선택해주세요.</p>
          <div class="search_wrap">
            <div class="cont_flex_bundle">
              <span class="custom_input">
                <input type="text" placeholder="중계사명을 검색하세요." v-model="searchName" @keypress.enter="setRelayInfo()">
              </span>
              <a href="javascript:void(0);" @click="setRelayInfo()" class="btn sml gray">
                <span>검색</span>
              </a>
            </div>
          </div>
        </div>
        <div class="layer_body">
          <div class="layer_scroll scrollRow6">
            <div class="search_result">
              <table class="tbl_col_type">
                <thead>
                  <tr>
                    <th scope="col">양방향 대화방 중계사</th>
                  </tr>
                </thead>
                <tbody v-if="list.length > 0">
                  <tr v-for="(row, index) in list" :key="index">
                    <td @click="selectAgency(index)">{{ row.relayAgName }}</td>
                  </tr>
                </tbody>
                <div v-if="list.length < 1" class="box_result_info center">
                  <p>검색 결과가 없습니다.</p>
                </div>
              </table>
            </div>
          </div>
        </div>
        <div class="layer_foot">
          <p class="mar_t30 mar_b20">
            선택된 양방향 대화방 중계사 목록 입니다.<br>
            대표 중계사를 지정해 주세요.
          </p>
          <div class="layer_scroll scrollRowForm4">
            <div class="search_result">
              <!-- 검색 결과-->
              <table v-if="selectRelayList.length > 0" class="tbl_col_type">
                <colgroup>
                  <col style="width:45px">
                  <col style="width:180px">
                  <col style="width:auto">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">
                      <span class="custom_checkbox single">
                        <input @change="selectAll()" v-model="allSelected" type="checkbox" name="agencyCheck" id="checkAll02">
                        <label for="checkAll02"></label>
                      </span>
                    </th>
                    <th scope="col">양방향 대화방 중계사</th>
                    <th scope="col">대표 중계사</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in selectRelayList" :key="index">
                    <td>
                      <span class="custom_checkbox single">
                        <input type="checkbox" name="agencyCheck" :id="`check_${index}`"
                         :value=row.relayAgName v-model="delectRealyList">
                        <label :for="`check_${index}`"></label>
                      </span>
                    </td>
                    <td>
                      <label for="check02_00">{{row.relayAgName}}</label>
                    </td>
                    <td>
                      <span class="custom_radio single">
                        <input type="radio" name="agencyRadio" :id="`radio_${index}`"
                         :value=row.relayAgName :checked="findPick(row)">
                        <label :for="`radio_${index}`"></label>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="btn_wrap mar_t30">
            <a href="javascript:void(0);" class="btn sml bd_black type2" @click="closePopup">
              <span>닫기</span>
            </a>
            <a v-if="selectRelayList.length > 0" href="javascript:void(0);" class="btn sml bd_black type2" @click="deleteRelay">
              <span>삭제</span>
            </a>
            <a v-if="selectRelayList.length > 0" href="javascript:void(0);" class="btn sml black" @click="saveRelay">
              <span>저장</span>
            </a>
          </div>
        </div>
      </div>
</template>

<script>
import { getRelayInfo, checkRelayInfo } from '@/api/common/code'

export default {
  name: 'RelayAgRegisterPopup',
  props: {
    relayAgRegister: {
      type: Boolean,
      default: false
    },
    agencyCorpRegNum: {
      type: String,
      default: ''
    },
    reqUserId: {
      type: String,
      default: ''
    },
    relayAgInfo: []
  },
  data() {
    return {
      searchName: '',
      list: [],
      selectRelayList: [],
      delectRealyList: [],
      allSelected: false
    }
  },
  created() {
    this.setRelayInfo()
    this.relayAgInfo.forEach(data => {
      this.selectRelayList.push(data)
    })
  },
  computed: {
  },
  methods: {
    selectAll() {
      const checkboxes = document.getElementsByName('agencyCheck')
      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.allSelected
      })
      if (this.allSelected) {
        this.selectRelayList.forEach(data => {
          this.delectRealyList.push(data.relayAgName)
        })
      } else {
        this.delectRealyList.splice(0)
      }
    },
    findPick(row) {
      if (row.repYn === 'Y') {
        return true
      } else {
        return false
      }
    },
    setRelayInfo() {
      let params = {
        searchName: this.searchName
      }
      getRelayInfo(params)
        .then(res => {
          this.list = res.result.relayInfoList
        })
        .catch(err => {
          // console.error('[search]', err)
          this.$alertMsg(err.desc)
        })
    },
    selectAgency(index) {
      let checkData = false
      this.selectRelayList.some(data => {
        if (data.relayAgId === this.list[index].relayAgId) {
          checkData = true
        }
      })
      if (checkData) {
        this.$alertMsg('이미 선택한 중계사 입니다.')
      } else {
        let params = {
          agencyCorpRegNum: this.agencyCorpRegNum,
          botAgencyId: this.list[index].relayAgId,
          reqUserId: this.list[index].relayAgId
        }

        checkRelayInfo(params)
          .then(res => {
            if (res.status === 200) {
              this.selectRelayList.unshift(this.list[index])
            } else {
              this.$alertMsg('선택할 수 없는 중계사 입니다.<br>중계사와 별도의 양방향 서비스 사전 청약 후 선택해 주시기 바랍니다.')
            }
          })
          .catch(() => {
            // console.error('[relaySelect]', err)
            this.$alertMsg('선택할 수 없는 중계사 입니다.<br>중계사와 별도의 양방향 서비스 사전 청약 후 선택해 주시기 바랍니다.')
          })
      }
    },
    deleteRelay() {
      if (this.delectRealyList.length < 1) {
        this.$alertMsg('중계사가 선택되지 않았습니다.')
      }
      this.delectRealyList.forEach(data => {
        let index = this.selectRelayList.findIndex(function(item) { return item.relayAgName === data })
        this.selectRelayList.splice(index, 1)
      })
      this.allSelected = false
      this.delectRealyList.splice(0)
      if (this.selectRelayList.length < 1) {
        let data = this.selectRelayList
        this.$emit('deleteRelay', data)
      }
    },
    saveRelay() {
      const radioList = document.getElementsByName('agencyRadio')
      let checkRadio = false
      for (let i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) {
          this.selectRelayList[i].repYn = 'Y'
          checkRadio = true
        } else {
          this.selectRelayList[i].repYn = 'N'
        }
      }
      if (!checkRadio) {
        this.$alertMsg('반드시 대표 중계사를 선택하셔야합니다.')
        return
      }
      let data = this.selectRelayList
      this.$emit('saveRelay', data)
    },
    closePopup() {
      this.$emit('closePopup')
    }
  }
}
</script>
