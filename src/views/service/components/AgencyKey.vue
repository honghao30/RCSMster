<template>
  <!-- td에 "field_area" 클래스 표기 필요 ex)<td colspan="3" class="field_area"> -->
  <ul class="phone_list">
    <div v-if="list != null && list.length > 0">
      <li v-for="(obj, index) in list" :key="obj.regDt">
        <template v-if="obj.agencyKey != null">
          <span class="text_value" :class="obj.ifRet === 'OK' ? 'sync_ico_ok' : 'sync_ico_no'" :style="!lastIndex(index) ? 'color:#999' : ''"><p class="over_view">{{obj.ifRet === 'OK' ? '동기화 완료' : '동기화 처리중'}}</p></span> <!-- OK(동기화) / POK(동기화X)에 따라 아이콘 변경 / sync_ico_ok, sync_ico_no) -->
          <!-- 최신키를 제외한 대행사키는 텍스트를 회색 처리한다.  -->
          <span class="text_value_225" :style="!lastIndex(index) ? 'color:#999' : ''">{{obj.agencyKey}}</span>
          <span class="text_value_225" :style="!lastIndex(index) ? 'color:#999' : ''">{{obj.regDt}}</span>
          <span class="text_value" :style="!lastIndex(index) ? 'color:#999' : ''">{{obj.userNm}}</span>
          <!-- 최신 대행사키에는 재발급 버튼을 붙인다 -->
          <button v-if="lastIndex(index)" class="btn sml bd_black" @click="createAgencyKey" :class="{ disabled: obj.creatable === false }" :disabled="obj.creatable === false"><span>재발급</span></button>
          <!-- 최신 대행사키를 제외하고 삭제 버튼 -->
          <button class="btn sml bd_black WD86" v-if="!lastIndex(index)" @click="deleteAgencyKey(obj.agencyKey)"><span>삭제</span></button>
          <div class="tooltip_area" v-if="!lastIndex(index)">
            <span class="btn_info"></span>
            <div class="box_tooltip" style="width:450px;">
              <ul class="bullet_list">
                <li>기존 agencyKey는 재발급 시 24시간 동안 유지된 후 자동 삭제됩니다.<br>즉시 삭제를 원할 경우, 삭제 버튼을 클릭해 주세요.</li>
              </ul>
            </div>
          </div>
          <span class="text_desc" style="color: #666" v-if="lastIndex(index)">
            <br>Biz RCS 메시지 발송 시 필요한 대행사별 특수키입니다. 보안을 위해 외부에 노출되지 않도록 유의하세요.
            <br>※ Biz RCS 메시지 신규 보안 정책 적용 시, 최초 발송 대행사는 반드시 agencyKey를 삽입하여 발송해야 합니다.
          </span>
        </template>
      </li>
    </div>
    <div v-else>
      <li><a href="javascript:void(0);" class="btn sml bd_black" style="margin-left: 0px" @click="createAgencyKey"><span>발급</span></a></li>
      <span class="text_desc" style="color: #666">
        <br>Biz RCS 메시지 발송 시 필요한 대행사별 특수키입니다. 보안을 위해 외부에 노출되지 않도록 유의하세요.
        <br>※ Biz RCS 메시지 신규 보안 정책 적용 시, 최초 발송 대행사는 반드시 agencyKey를 삽입하여 발송해야 합니다.
      </span>
    </div>
  </ul>
</template>

<script>
import { createAgencyKey, deleteAgencyKey, getAgencyKey } from '@/api/utility/utility'

export default {
  name: 'AgencyKey',
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
<style scoped>
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
