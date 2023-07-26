<template>
  <div class="form-item__content">
    <div class="form-item-row agency-key">
      <div class="input-item justify" v-if="list != null && list.length > 0">
        <table class="inner-table" >
          <tbody>
            <tr v-for="(obj, index) in list" :key="obj.regDt">
            <template v-if="obj.agencyKey != null">
              <td><span class="flag-progress" :class="obj.ifRet === 'OK' ? 'sync_ico_ok' : 'sync_ico_no'" :style="!lastIndex(index) ? 'color:#999' : ''">{{obj.ifRet === 'OK' ? '동기화 완료' : '동기화 처리중'}}</span></td>
              <!-- 최신키를 제외한 대행사키는 텍스트를 회색 처리한다. -->
              <td><span class="text" :style="!lastIndex(index) ? 'color:#999' : ''">{{obj.agencyKey}}</span></td>
              <td><span class="text" :style="!lastIndex(index) ? 'color:#999' : ''">{{obj.regDt}}</span></td>
              <td><span class="text" :style="!lastIndex(index) ? 'color:#999' : ''">{{obj.userNm}}</span></td>
              <!-- 최신 대행사키에는 재발급 버튼을 붙인다 -->
              <td v-if="lastIndex(index)"><ButtonCmp class="btn-default-line" @click="createAgencyKey" :disabled="obj.creatable === false"><span>재발급</span></ButtonCmp></td>
              <!-- 최신 대행사키를 제외하고 삭제 버튼 -->
              <td v-if="!lastIndex(index)"><ButtonCmp class="btn-default-line" @click="deleteAgencyKey(obj.agencyKey)">삭제</ButtonCmp>
                  <ButtonCmp type="btn-only-icon" iconname="icon-tooltip"><span class="irtext">기존 agencyKey는 재발급 시 24시간 동안 유지된 후 자동 삭제됩니다.<br>즉시 삭제를 원할 경우, 삭제 버튼을 클릭해 주세요.</span></ButtonCmp>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="input-item" v-else>
        <table class="inner-table justify">
          <tbody>
            <tr>
              <td><span class="text"></span></td>
              <td><span class="text"></span></td>
              <td><span class="text"></span></td>
              <td><span class="text"></span></td>
              <td><span class="text"></span></td>
              <td><ButtonCmp type="btn-default-line" @click="createAgencyKey">발급</ButtonCmp></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="guide-text">※ Biz RCS 메시지 발송 시 필요한 대행사별 특수키입니다. 보안을 위해 외부에 노출되지 않도록 유의하세요.</p>
      <p class="guide-text">※ Biz RCS 메시지 신규 보안 정책 적용 시 최초 발송 대행사는 반드시 Agency Key를 삽입하여 발송해야 합니다.</p>
    </div>
  </div>
</template>

<script>
import { createAgencyKey, deleteAgencyKey, getAgencyKey } from '@/api/utility/utility'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  name: 'AgencyKey',
  components: {
    ButtonCmp
  },
  props: {
    // 임의의 리스트 표기, retrieve가 false인 경우 해당.
    list: {
      type: Array,
      required: false
    },
    agencyId: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    lastIndex(index) {
      return index + 1 === this.list.length
    },
    createAgencyKey() {
      this.$confirm('발급 하시겠습니까?').then(() => {
        const data = {
          agencyId: this.agencyId
        }
        createAgencyKey(data)
          .then(response => {
            if (response.code === '20000000') {
              this.$alertMsg('발급 되었습니다.').then(() => this.refreshAgencyKey(data))
            } else {
              this.$alertMsg('발급 되었습니다.<BR>이통사 동기화 진행 중 입니다.').then(() => this.refreshAgencyKey(data))
            }
          })
          .catch(() => {
            this.$alertMsg('발급 되었습니다.<BR>이통사 동기화 진행 중 입니다.').then(() => this.refreshAgencyKey(data))
          })
      })
    },
    deleteAgencyKey(agencyKey) {
      this.$confirm('삭제 하시겠습니까?').then(() => {
        const data = {
          agencyId: this.agencyId,
          agencyKey
        }
        deleteAgencyKey(data)
          .then(response => {
            if (response.code === '20000000') {
              this.$alertMsg('삭제 되었습니다.').then(() => this.refreshAgencyKey(data))
            } else {
              this.$alertMsg('삭제 되었습니다.<BR>이통사 동기화 진행 중 입니다.').then(() => this.refreshAgencyKey(data))
            }
          })
          .catch(error => {
            if (error.code === '60000024') {
              this.$alertMsg('이미 삭제 되었습니다.').then(() => this.refreshAgencyKey(data))
            } else {
              this.refreshAgencyKey(data)
            }
          })
      })
    },
    refreshAgencyKey(data) {
      getAgencyKey(data)
        .then(response => {
          if (response.code === '20000000') {
            this.list = response.result
          }
        })
    }
  }
}
</script>
