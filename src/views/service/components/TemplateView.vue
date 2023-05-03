<template>
  <div class="rcs_emul_form_wrap">
    <div class="rcs_emul_form_cont bd_no">
      <div>
        <div class="rcs_item_bundle p_tb10">
          <strong class="rcs_tit_bundle p-l0">템플릿 ID</strong>
          <div class="rcs_cont_bundle">{{ templateData.tplId }}</div>
        </div>
        <div class="rcs_item_bundle p_tb10">
          <strong class="rcs_tit_bundle p-l0"><!--템플릿 속성-->테마 / 속성</strong>
          <div class="rcs_cont_bundle">{{ templateData.cardThemeNm }} / {{ templateData.cardTypeNm }}</div>
        </div>
        <div v-if="templateData.cardTheme !== 'TA'" class="rcs_item_bundle p_tb10">
          <strong class="rcs_tit_bundle p-l0">유형</strong>
          <div class="rcs_cont_bundle">{{ templateData.tplBizSrvNm }}</div>
        </div>
        <!-- <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle">유형</strong>
          <div class="rcs_cont_bundle">{{ templateData.tplBizSrvNm }}</div>
        </div> -->
        <div class="rcs_item_bundle p_tb10">
          <strong class="rcs_tit_bundle p-l0">템플릿 명</strong>
          <div class="rcs_cont_bundle">{{ templateData.tplNm }}</div>
        </div>
        <!-- <div v-if="templateData.cardTheme == 'TA' && templateData.cardType === 'D'" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle">제목</strong>
          <div class="rcs_cont_bundle">{{ templateData.inputTitle01 }}</div>
        </div>
        <div v-if="templateData.cardTheme == 'TA' && templateData.cardType === 'C'" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle">제목</strong>
          <div class="rcs_cont_bundle">{{ templateData.inputTitle01 }} / {{ templateData.inputTitle02 }}</div>
        </div> -->
        <div v-if="templateData.cardTheme == 'TA'" class="rcs_item_bundle p_tb10">
          <strong class="rcs_tit_bundle p-l0">제목</strong>
          <div class="rcs_cont_bundle">{{ templateData.inputTitle01 }}{{ templateData.inputTitle02 !== '' ? ` / ${templateData.inputTitle02}` : '' }}</div>
        </div>
        <div class="rcs_item_bundle p_tb10">
          <strong class="rcs_tit_bundle v_top p-l0">
            내용
            <div class="input_txt_area" v-if="isCardTypeDescription">
              <a href="javascript:void(0);" class="btn_info" v-clipboard:copy="templateData.inputText" v-clipboard:success="copied"></a>
              <div class="info_txt_box">
                <span class="info_txt_con">내용 복사</span>
              </div>
            </div>
          </strong>
          <!-- Description -->
          <div class="rcs_cont_bundle pad_t16" style="white-space: pre-wrap; user-select: none;" v-if="isCardTypeDescription" v-text="templateData.inputText" @mousemove.self.prevent></div>
          <!-- Cell -->
          <div class="rcs_cont_bundle pad_t16" v-else>
            <ul class="rcs_editor_list">
              <li v-for="(row, index) in linearLayouts" :key="`row_${index}`">
                <span class="custom_textarea max_h67" v-for="(textview, textviewIndex) in row.children" :key="`row_textview_${index}_${textviewIndex}`">
                  <textarea readonly :value="textview.text" style="padding-top: 5px; padding-bottom: 5px; max-height: 35px; height: auto;"></textarea>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <message-base-suggestion ref="messageBaseSuggestion" :jsonData="jsonData" :viewMode="true"></message-base-suggestion>
      <div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">등록일</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ templateData.regDt | prettyDate('YYYY-MM-DD HH:mm') }} / {{ templateData.regUserNm }}</span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">승인요청일</strong>
          <div class="rcs_cont_bundle">{{ templateData.reqAprvDt | prettyDate('YYYY-MM-DD HH:mm') }} / {{ templateData.aprvUserNm }}</div>
        </div>
        <div class="rcs_item_bundle" v-if="isAprvRetOk">
          <strong class="rcs_tit_bundle p-l0">승인완료일</strong>
          <div class="rcs_cont_bundle">{{ templateData.aprvDt | prettyDate('YYYY-MM-DD HH:mm') }}</div>
        </div>
        <div class="rcs_item_bundle" v-if="isAprvRetOk">
          <strong class="rcs_tit_bundle p-l0">사용여부</strong>
          <div class="rcs_cont_bundle">{{ activeYn }} {{ useDescr }}</div>
        </div>
      </div>
    </div>
    <div class="btn_wrap center full_width mar_t40 temWrite btn_flex first">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goList"><span>이전</span></a>
      <a href="javascript:void(0);"  class="btn mid bd_blue" v-if="isAprvRetOk" @click="deleteTemplate">삭제</a>
      <a href="javascript:void(0);"  class="btn mid blue" v-if="isAprvRetOk" @click="doModify">수정</a>
      <a href="javascript:void(0);" class="btn mid blue" v-if="canCanceling" @click="cancleApplyTemplate">승인요청 취소</a>
    </div>
  </div>
</template>
<script>
import MessageBaseSuggestion from '@/views/service/components/MessageBaseSuggestion'
import { cancleApplyTemplate, deleteTemplate } from '@/api/service/template'

import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default {
  name: 'TemplateView',
  props: {
    templateData: {
      type: Object
    },
    brandId: {
      type: String
    }
  },
  components: {
    MessageBaseSuggestion
  },
  data() {
    return {}
  },
  computed: {
    jsonData() {
      if (this.templateData.fmtStr) {
        return JSON.parse(this.templateData.fmtStr)
      }
      return {}
    },
    activeYn() {
      return this.templateData.useStatusNm
    },
    isCardTypeDescription() {
      return this.templateData.cardType === 'D'
    },
    description() {
      let description = ''
      if (this.isCardTypeDescription) {
        let RCSMessage = this.jsonData.RCSMessage || this.jsonData.rcsMessage
        if (RCSMessage) {
          let layout = RCSMessage.openrichcardMessage.layout
          let linear = layout.children.filter(c => c.widget === 'LinearLayout')[0]
          let textviews = linear.children.filter(c => c.widget === 'TextView')
          if (textviews[0]) {
            description = textviews[0].text.replace(/(?:\r\n|\t|\n)/g, '<br/>')
          }
        }
      }
      return description
    },
    linearLayouts() {
      let linearLayouts = []
      if (!this.isCardTypeDescription) {
        if (!jglib.isEmpty(this.jsonData)) {
          if (this.templateData.cardTheme === 'TA' || this.templateData.tplBizCate === 'TA') {
            let RCSMessage = this.jsonData.RCSMessage || this.jsonData.rcsMessage
            let layout = RCSMessage.openrichcardMessage.layout.children[0].children[2]
            let rootLinear = layout.children.filter(c => c.widget === 'LinearLayout')
            linearLayouts = rootLinear.filter(c => c.widget === 'LinearLayout')
          } else {
            let RCSMessage = this.jsonData.RCSMessage || this.jsonData.rcsMessage
            let layout = RCSMessage.openrichcardMessage.layout
            let rootLinear = layout.children.filter(c => c.widget === 'LinearLayout')
            linearLayouts = rootLinear[0].children.filter(c => c.widget === 'LinearLayout')
          }
        }
      }
      return linearLayouts
    },
    isAprvRetOk() {
      return this.templateData.aprvRet && this.templateData.aprvRet === 'OK'
    },
    useDescr() {
      return this.templateData.useDescr ? '/ ' + this.templateData.useDescr : ''
    },
    canCanceling() {
      return this.templateData && this.templateData.aprvRet !== 'OK' && (this.templateData.status === 'APRV_NEW' || this.templateData.status === 'APRV_MOD')
    }
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    formatterCellData(cellData) {
      if (cellData.visibility === 'gone') {
        return ''
      }
      return cellData.text
    },
    cancleApplyTemplate() {
      let message = '요청하셨던 템플릿 승인요청을 취소하시겠습니까?<br/>확인 선택 시 신청했던 정보는 저장 상태로 변경됩니다.'
      if (this.templateData.status === 'APRV_MOD') {
        message = '요청하셨던 템플릿 수정 승인요청을 취소하시겠습니까?<br/>확인 선택 시 수정 하셨던 내용은 삭제되며, 승인완료 상태로 변경됩니다.'
      }
      this.$confirmMsg(message)
        .then(() => {
          cancleApplyTemplate(this.templateData.brandId, this.templateData.tplId)
            .then(() => {
              this.$alertMsg('승인요청이 취소되었습니다.').then(() => {
                this.goList()
              })
            })
            .catch(err => {
              this.$alertMsg(err.desc).then(() => {
                this.goList()
              })
            })
        })
    },
    deleteTemplate() {
      this.$confirmMsg('템플릿을 삭제하시겠습니까?')
        .then(() => {
          let data = {
            oldTplId: this.templateData.oldTplId
          }
          deleteTemplate(this.templateData.brandId, data)
            .then(() => {
              this.goList()
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        })
    },
    goList() {
      this.$router.go(-1)
    },
    prettyNewline(value) {
      return value.replace(/(?:\r\n|\t|\n)/g, '<br/>')
    },
    copied() {
      this.$alertMsg('템플릿 내용이 복사되었습니다.')
    },
    doModify() {
      this.templateData.modify = true
      this.$emit('getAgdTplData', this.templateData)
      this.$emit('update:modify', true)
    }
  }
}
</script>
