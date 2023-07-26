<template>
  <FormModals modalsize="Max628" v-if="stepActiveIndex === 1">
    <div class="modal__content--title" slot="title">
      중계사 선택
    </div>
    <div slot="modal-body">
      <div class="agency-list__wrap">
        <div class="agency-list__search">
          <div class="form-item__content">
            <span class="input">
              <input type="text" name="Search" class="input" placeholder="중계사명을 입력해주세요." v-model="searchName" @keypress.enter="setRelayInfo()">
            </span>
            <ButtonCmp type="btn-search" @click="setRelayInfo()">검색</ButtonCmp>
          </div>
          <!-- <p class="guide-text error">중계사명을 입력해주세요.</p> -->
        </div>
        <div class="agency-list__selelect">
          <div class="agency-list__left">
            <ul v-if="list.length > 0">
              <li v-for="(row, index) in list" :key="index">
                <div class="checkbox">
                  <input type="checkbox" :id="`checkbox_${row.relayAgId}`" @click="selectAgency($event, index, row)" />
                  <label :for="`checkbox_${row.relayAgId}`">
                    <span class="checkbox__text">{{ row.relayAgName }}</span>
                  </label>
                </div>
              </li>
            </ul>
            <p class="nodata" v-else>검색 결과가 없습니다.</p>
          </div>
          <div class="agency-list__right">
            <ul v-if="selectRelayList.length > 0">
              <li v-for="(row, index) in selectRelayList" :key="index">
                {{ row.relayAgName }}
                <ButtonCmp type="btn-only-icon-dell" @click="deleteRelay(index, row)" />
              </li>
            </ul>
            <p class="nodata" v-else>중계사를 추가해주세요.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="button__wrap" slot="button">
      <ButtonCmp type="btn-blue-line" @click="closePopup">닫기</ButtonCmp>
      <ButtonCmp type="btn-blue" :disabled="isButtonValidation" @click="nextStep">다음</ButtonCmp>
    </div>
  </FormModals>
  <FormModals modalsize="Max628" v-else>
    <div class="modal__content--title" slot="title">
      대표중계사 선택
    </div>
    <div slot="modal-body">
      <div class="agency-guide__graybox">
        중계사 목록 중에서 대표중계사를 선택해주세요.
      </div>
      <div class="agency-list__wrap">
        <div class="agency-list__select">
          <dl>
            <dt>중계사 이름</dt>
            <dd>
              <ul>
                <li v-for="(row, index) in selectRelayList" :key="index">
                  <span class="radiobox">
                    <input type="radio" name="agencyRadio" :id="`radio_${row.relayAgId}`" :checked="findPick(row)" @click="selectMasterRelay" />
                    <label :for="`radio_${row.relayAgId}`">
                      <span class="radiobox__text">{{row.relayAgName}}</span>
                    </label>
                  </span>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
      <!-- <p class="guide-text error">선택할 수 없는 중계사입니다. 중계사와 별도의 양방향 서비스 사전 청약 후 선택해주세요.</p> -->
    </div>
    <div class="button__wrap" slot="button">
      <ButtonCmp type="btn-blue-line" @click="closePopup">닫기</ButtonCmp>
      <ButtonCmp type="btn-blue" :disabled="isButtonValidation" @click="saveRelay">저장</ButtonCmp>
    </div>
  </FormModals>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import FormModals from '@/views/join/components/FormModals.vue'
import { getRelayInfo, checkRelayInfo } from '@/api/common/code'

export default {
  name: 'RelayAgRegisterPopup',
  components: {
    ButtonCmp,
    FormModals
  },
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
      stepActiveIndex: 1,
      searchName: '',
      list: [],
      selectRelayList: [],
      isButtonValidation: true
    }
  },
  created() {
    this.setRelayInfo()
    this.relayAgInfo.forEach(data => {
      this.selectRelayList.push(data)
    })
    this.buttonValidation()
  },
  computed: {},
  methods: {
    buttonValidation() {
      if (this.stepActiveIndex === 1) {
        if (jglib.isEmpty(this.selectRelayList)) {
          this.isButtonValidation = true
        } else {
          this.isButtonValidation = false
        }
      } else {
        this.isButtonValidation = true

        this.selectRelayList.forEach(data => {
          if (data.repYn === 'Y') {
            this.isButtonValidation = false
          }
        })
      }
    },
    nextStep() {
      this.stepActiveIndex++
      this.buttonValidation()
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
        .finally(() => {
          this.relayAgInfo.forEach(data => {
            document.querySelector(`#checkbox_${data.relayAgId}`).checked = true
          })
        })
    },
    selectAgency(event, index, row) {
      if (event.target.checked) {
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
                event.target.checked = false
                this.$alertMsg('선택할 수 없는 중계사 입니다.<br>중계사와 별도의 양방향 서비스 사전 청약 후 선택해 주시기 바랍니다.')
              }
            })
            .catch(() => {
              // console.error('[relaySelect]', err)
              event.target.checked = false
              this.$alertMsg('선택할 수 없는 중계사 입니다.<br>중계사와 별도의 양방향 서비스 사전 청약 후 선택해 주시기 바랍니다.')
            })
            .finally(() => {
              this.buttonValidation()
            })
        }
      } else {
        this.selectRelayList.forEach((data, index) => {
          if (row.relayAgId === data.relayAgId) {
            this.deleteRelay(index, data)
          }
        })
      }
    },
    deleteRelay(index, row) {
      document.querySelector(`#checkbox_${row.relayAgId}`).checked = false
      this.selectRelayList.splice(index, 1)
      if (this.selectRelayList.length < 1) {
        // let data = this.selectRelayList
        // this.$emit('deleteRelay', data)
      }
      this.buttonValidation()
    },
    selectMasterRelay() {
      let radioList = document.getElementsByName('agencyRadio')

      for (let i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) {
          this.selectRelayList[i].repYn = 'Y'
        } else {
          this.selectRelayList[i].repYn = 'N'
        }
      }

      this.buttonValidation()
    },
    saveRelay() {
      let data = this.selectRelayList
      this.$emit('saveRelay', data)
    },
    closePopup() {
      this.$emit('closePopup')
    }
  }
}
</script>
