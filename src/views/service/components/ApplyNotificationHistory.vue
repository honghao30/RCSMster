<template>
  <div
    class="popup"
    ref="applyNotificationHistoryPopup"
    @focusin="setFocus('focusin', true)"
    @focusout="setFocus('focusin', false)"
    @mouseover="setFocus('mouseover', true)"
    @mouseout="setFocus('mouseover', false)"
    tabindex="-1"
    style="outline: none"
  >
    <div class="popup_head cont_flex_bundle mar_b20">
      <div class="title_area col_6">
        <h4>지난 2주간 반려/승인완료 내역입니다.</h4>
      </div>
      <div class="btn_wrap right col_6">
        <span class="btn sml gray cursor-pointer" @click="notificationAllDel">
          <span>모두 지우기</span>
        </span>
      </div>
    </div>
    <div class="popup_scroll">
      <table class="tbl_col_type">
        <colgroup>
          <col style="width:70px">
          <col style="width:auto">
          <col style="width:120px">
          <col style="width:60px">
        </colgroup>
        <thead>
          <tr>
            <th>결과</th>
            <th>내용</th>
            <th>일자</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in notificationList" :key="index">
            <td>
              <span class="text_red" v-if="item.aprvRet === 'REJECTED'">{{item.aprvRetNm}}</span>
              <span class="text_blue" v-else>{{item.aprvRetNm}}</span>
            </td>
            <td class="left" v-if="item.aprvRet === 'REJECTED'">{{item.name}}({{item.aprvRetDescr}})</td>
            <td class="left" v-else>{{item.name}}</td>
            <td>{{item.aprvDt}}</td>
            <td>
              <span class="btn_delete cursor-pointer" @click="notificationDel(item)">
                <span>삭제</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

import {
  applyNotificationHistory,
  deleteApplyNotificationHistory
} from '@/api/service/service'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {
      notificationList: [],
      focus: {
        mouseover: false,
        focusin: false
      }
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    corpId: {
      type: String
    }
  },
  created() {
    applyNotificationHistory().then(res => {
      this.notificationList = []
      this.notificationList = res.result
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.applyNotificationHistoryPopup.focus()
    })
  },
  computed: {},
  watch: {
    focus: {
      deep: true,
      handler() {
        if (!this.focus.mouseover && !this.focus.focusin) {
          this.closeLayer()
        }
      }
    }
  },
  methods: {
    notificationDel(data) {
      let reqData = {
        brandId: data.brandId,
        serviceType: data.serviceType,
        corpId: data.corpId
      }
      deleteApplyNotificationHistory(reqData).then(res => {
        applyNotificationHistory().then(res => {
          this.notificationList = []
          this.notificationList = res.result
          this.$emit('resetCount')
        })
      })
      /*
      this.$nextTick(() => {
        this.$emit('resetCount')
      })
      */
    },
    notificationAllDel() {
      let reqData = {
        brandId: '',
        serviceType: '',
        corpId: this.corpId,
        delAllYn: 'Y'
      }
      deleteApplyNotificationHistory(reqData).then(res => {
        applyNotificationHistory().then(res => {
          this.notificationList = []
          this.notificationList = res.result
          this.$emit('resetCount')
        })
      })
      /*
      this.$nextTick(() => {
        this.$emit('resetCount')
      })
      */
    },
    setFocus(type, flag) {
      this.focus[type] = flag
    },
    closeLayer() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
