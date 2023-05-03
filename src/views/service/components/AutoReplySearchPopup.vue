<template>
  <div class="rcs_container rbc_wrap">
    <div class="layer auto active">
      <div class="layer_cont common_tpl">
        <div class="layer_body">
          <div class="rcs_bundle_wrap">
            <div class="rcs_emul_form_wrap" style="margin-left:0; width:710px;">
              <div class="title_wrap mar_b20">
                <span class="h4_desc bold">사용하실 자동응답을 선택해주세요.</span>
              </div>
              <div class="search_wrap">
                <div class="cont_flex_bundle mar_b30">
                  <span class="custom_input">
                    <input type="text" placeholder="자동응답 명을 검색하세요." v-model="formData.inputValue" @keypress.enter="search">
                  </span>
                  <a href="javascript:void(0);" @click="search" class="btn sml gray">
                    <span>검색</span>
                  </a>
                </div>
              </div>

              <div v-if="totalcount > 0" class="layer_scroll mar_b10 scrollRowForm10">
                <table class="tbl_col_type">
                  <caption>
                    <strong>자동응답 정보</strong>
                    <p>자동응답 ID, 자동응답 명</p>
                  </caption>
                  <colgroup>
                    <col style="width:70px;">
                    <col style="width: auto;">
                    <col style="width: auto;">
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">자동응답 ID</th>
                      <th scope="col">자동응답 명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(authReply, index) in authReplyList" :key="index">
                      <td>
                        <span class="custom_radio single">
                          <input type="radio" name="autoReply"
                            :id="authReply.armId"
                            :checked="authReply.armId == selArmId"
                            :ref="`sel_${authReply.armId}`"
                            @click="getAutoReplyInfo(authReply.armId)"
                          >
                          <label :for="authReply.armId"></label>
                        </span>
                      </td>
                      <td>{{authReply.armId}}</td>
                      <td>{{authReply.name}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="box_result_info center"><p>검색 결과가 없습니다.</p></div>

              <div class="layer_foot">
                <div class="btn_wrap mar_t30">
                  <a href="javascript:void(0);" @click="closePopup" class="btn sml bd_black type2">
                    <span>취소</span>
                  </a>
                  <a href="javascript:void(0);" @click="saveAutoReply" class="btn sml black">
                    <span>저장</span>
                  </a>
                </div>
              </div>
            </div>

            <auto-reply-search-popup-emulator from="autoReplySearchPopup" :autoReplyInfo="autoReplyInfo" :templateContentInfo="templateContentInfo" />

          </div>
        </div>
        <a id="btn_close" href="javascript:void(0)" @click="closePopup" class="btn_close"></a>
      </div>
    </div>
  </div>
</template>

<script>

import AutoReplySearchPopupEmulator from '@/views/service/components/AutoReplySearchPopupEmulator'
import { retireveAutoReplyList, retireveAutoReplyInfo, reformSuggestForView } from '@/api/service/autoReply'

export default {
  name: 'AutoReplySearchPopup',
  props: {
    brandId: {
      type: String
    },
    armId: {
      type: String,
      default: ''
    }
  },
  components: {
    AutoReplySearchPopupEmulator
  },
  data() {
    return {
      formData: {
        aprvRet: 'OK',
        inputType: 'name',
        inputValue: '',
        orderKey: 'MOD_DT',
        orderValue: 'ASC',
        page: 1,
        size: 99999
      },
      authReplyList: [],
      totalcount: 0,
      autoReplyInfo: {},
      templateContentInfo: {},
      selArmId: '',
      isFirst: false
    }
  },
  created() {
    this.init()
  },
  updated() {
    if (this.selArmId !== '' && this.isFirst) {
      this.$refs['sel_' + this.selArmId][0].focus()
      this.isFirst = false
    }
  },
  methods: {
    init() {
      this.selArmId = this.armId
      this.isFirst = true
      this.retireveAutoReplyList()
    },
    search() {
      this.authReplyList = {}
      this.totalcount = 0
      this.autoReplyInfo = {}
      this.templateContentInfo = {}
      this.selArmId = ''
      this.retireveAutoReplyList()
    },
    retireveAutoReplyList() {
      retireveAutoReplyList(this.brandId, this.formData)
        .then(res => {
          this.authReplyList = res.result.autoReplyList
          this.totalcount = res.result.totalSize

          if (this.selArmId !== '') {
            this.getAutoReplyInfo(this.armId)
          }
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    getAutoReplyInfo(armId) {
      retireveAutoReplyInfo(this.brandId, armId)
        .then(res => {
          let result = res.result
          this.autoReplyInfo = reformSuggestForView(this.brandId, result.autoReply, result.templateContent)
          this.templateContentInfo = result.templateContent
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
        .finally(() => {
        })
    },
    saveAutoReply() {
      if (!jglib.isEmpty(this.autoReplyInfo)) {
        this.$emit('sendArmId', this.autoReplyInfo.armId)
        this.$emit('sendArmIdName', this.autoReplyInfo.name)
        this.$emit('sendArmIdSub', this.autoReplyInfo.armId)
        this.$emit('sendArmIdNameSub', this.autoReplyInfo.name)
        this.closePopup()
      } else {
        this.$alertMsg('자동응답을 선택해주세요.')
      }
    },
    closePopup() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
