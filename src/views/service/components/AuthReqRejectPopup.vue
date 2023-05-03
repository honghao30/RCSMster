<template>
  <div tabindex="0" class="layer active">
    <div tabindex="0" class="layer_cont">
      <div class="layer_body">
        <div class="layer_scroll no_scroll">
          <div class="box_textarea refusal">
            <div class="user_info">
              <ul>
                <li>신청자 :<span>{{this.rejectData.userNm}}({{this.rejectData.mgrUserId}})</span></li>
                <li>브랜드 :<span>{{this.rejectData.brandNm}}</span></li>
              </ul>
            </div>
            <div class="custom_textarea">
              <textarea placeholder="반려 사유를 입력해주세요.(100자 이내)" ref="writeRejectReason" style="height:86px" v-model="aprvRetDescr" maxlength="100"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="layer_foot">
        <div class="btn_wrap mar_t30">
          <a href="javascript:void(0);" class="btn sml bd_black type2" @click="close"><span>닫기</span></a>
          <a href="javascript:void(0);" class="btn sml black" @click="apply"><span>확인</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { operationAuthorityApproval } from '@/api/service/service'

export default {
  components: {},
  props: {
    visible: {
      type: Boolean
    },
    rejectData: {
      type: Object
    }
  },
  data() {
    return {
      aprvRetDescr: ''
    }
  },
  mounted() {
    this.$refs.writeRejectReason.focus()
  },
  methods: {
    apply() {
      let rejectData = {
        brandId: this.rejectData.brandId,
        mgrUserId: this.rejectData.mgrUserId,
        aprvRetDescr: this.aprvRetDescr,
        aprvYn: 'N'
      }
      operationAuthorityApproval(rejectData).then(() => {
        this.$alertMsg('운영권한 신청을 거절하였습니다.').then(() => {
          this.$emit('update:visible', false)
          this.$emit('reject', true)
        })
      })
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
