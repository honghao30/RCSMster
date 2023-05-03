<template>
  <div class="rcs_container auto_wrap">
    <div class="layer active">
      <div class="layer_cont common_tpl">
        <div class="layer_body">
          <div class="rcs_bundle_wrap">
            <div class="rcs_emul_form_wrap" style="margin-left:0; width:710px;">
              <div class="title_wrap mar_b20">
                <span class="h4_desc bold">사용하실 자동응답 템플릿을 선택하세요.</span>
              </div>

              <div class="layer_scroll mar_b10 scrollRowForm10">
                <table class="tbl_col_type">
                  <caption>
                    <strong>자동응답 정보</strong>
                    <p>공통 템플릿 ID, 타입, 상품명</p>
                  </caption>
                  <colgroup>
                    <col style="*">
                    <col style="width:190px">
                    <col style="width:200px;">
                    <col style="width:220px;">
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">공통 템플릿 ID</th>
                      <th scope="col">타입</th>
                      <th scope="col">상품명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in templateList" :key="index">
                      <td>
                        <span class="custom_radio single">
                          <input type="radio" name="template" :id="item.tplId" @click="selectTemplate(item)">
                          <label :for="item.tplId"></label>
                        </span>
                      </td>
                      <td>{{item.tplId}}</td>
                      <td class="left">{{item.cardTypeNm}}</td>
                      <td class="left">{{item.tplNm}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="layer_foot">
                <div class="btn_wrap mar_t30">
                  <a href="javascript:void(0);" class="btn sml bd_black type2" @click="closePopup">
                    <span>취소</span>
                  </a>
                  <a href="javascript:void(0);" class="btn sml black" @click="confirm">
                    <span>확인</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { retireveTemplateList } from '@/api/service/autoReply'

export default {
  name: 'AutoReplyTemplatePopup',
  data() {
    return {
      brandId: '',
      formData: {
        brandId: '',
        cardSpec: '',
        productCd: '',
        status: '',
        aprvRet: '',
        orderKey: ''
      },
      templateList: [],
      templateInfo: {}
    }
  },
  created() {
    this.formData.brandId = 'common'
    this.formData.cardSpec = 'richcard'
    this.formData.productCd = 'C'
    this.formData.status = 'ACTIVE'
    this.formData.aprvRet = 'OK'
    this.formData.orderKey = 'MAX_CARD_CNT,MAX_MEDIA_SIZE'

    this.brandId = this.$route.params.brandId
    this.init()
  },
  methods: {
    init() {
      this.retireveTemplateList()
    },
    retireveTemplateList() {
      retireveTemplateList(this.brandId, this.formData)
        .then(res => {
          // console.log(res.result)
          this.templateList = res.result
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    selectTemplate(templateInfo) {
      // console.log(templateInfo)
      this.templateInfo = templateInfo
    },
    confirm() {
      this.$emit('templateInfo', this.templateInfo)
      this.$emit('update:visible', false)
    },
    closePopup() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
