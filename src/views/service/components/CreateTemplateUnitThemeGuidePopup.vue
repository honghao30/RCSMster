<template>
  <div class="rcs_container service_wrap">
    <div class="layer auto active">
      <div class="layer_cont common_tpl add_grid type02">
        <div class="layer_body">
          <div class="rcs_bundle_wrap rcs_bundle_wid">
            <div class="rcs_emul_form_wrap theme_choice mar-l0" style="max-height:96vh; overflow:auto;">
              <div class="title_wrap mar_b20">
                <span class="h4_title bold">텍스트 템플릿 유형 안내</span>
                <ul class="bullet_list fs16">
                  <li>RCS 텍스트 템플릿은 타이틀 선택형과 타이틀 자유형이 제공되어 다양한 형태의 정보성 메시지를 발송할 수 있습니다.</li>
                  <li>서술(description), 스타일(cell) 템플릿은 발송할 메시지 내용을 사전 등록하여 운영자 승인 완료 후 발송 가능합니다.</li>
                  <li>기본(free) 템플릿은 발송할 메시지에 대한 사전 등록이나 승인 없이 정보성 메시지를 발송할 수 있습니다.</li>
                </ul>
              </div>
              <span class="line"></span>
              <!-- 타이틀 자유형 유형 -->
              <div class="theme_popup_sample">
                <div class="title_wrap" style="margin-top:30px;">
                  <span class="h4_title bold" style="font-size:20px;">타이틀 자유형</span>
                  <ul class="bullet_list_02" style="margin-bottom:30px;">
                    <li><span class="numbtn">1</span> 타이틀을 직접 지정하여 사용할 수 있으며,타이틀 우측에 변수를 사용 할 수 있습니다.</li>
                    <li><span class="numbtn">2</span> 타이틀과 본문을 두꺼운 라인으로 구분 합니다.</li>
                  </ul>
                </div>
                <div class="title_wrap rightSec" style="margin-top:30px;">
                  <span class="h4_title bold" style="font-size:20px;">타이틀 선택형</span>
                  <ul class="bullet_list_02" style="margin-bottom:30px;">
                    <li><span class="numbtn">1</span> 유형을 선택하면 아이콘과 타이틀이 지정됩니다.  유형 선택 후 본문 텍스트를 구성할 수 있습니다.</li>
                    <li><span class="numbtn">2</span> 기본(free) 템플릿은 브랜드 개설 후 승인완료 시 자동으로 생성됩니다.</li>
                  </ul>
                </div>
                <div class="theme_sample_img">
                  <p class="imgfr_free"><img src="@/assets/images/theme/sample_a_free.png" alt=""></p>
                  <p class="title">기본(free)</p>
                  <ul class="exptheme">
                    <li>브랜드별로 1개만 생성할 수 있습니다.</li>
                  </ul>
                </div>
                <div class="theme_sample_img rightSec">
                  <p class="imgfr_free"><img src="@/assets/images/theme/sample_basic_free.png" alt=""></p>
                  <p class="title">기본(free)</p>
                  <ul class="exptheme">
                    <li>브랜드 개설 후 승인완료 시 자동으로 생성됩니다.<br>(브랜드별로 1개만 생성)</li>
                  </ul>
                </div>
                <div class="theme_sample_img">
                  <p class="imgfr_description"><img src="@/assets/images/theme/sample_a_description.png" alt=""></p>
                  <p class="title">서술(description)</p>
                  <ul class="exptheme">
                    <li>문자메시지처럼 문장 형태의 메시지를 입력할 수 있습니다.</li>
                    <li>본문 내용을 변수 만으로 구성할 수 없습니다.(변수 이외 문장 필수 입력)</li>
                    <li>버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다.</li>
                  </ul>
                </div>
                <div class="theme_sample_img rightSec">
                  <p class="imgfr_description"><img src="@/assets/images/theme/sample_basic_description.png" alt=""></p>
                  <p class="title">서술(description)</p>
                  <ul class="exptheme">
                    <li>문자메시지처럼 문장 형태의 메시지를 입력할 수 있습니다.</li>
                    <li>본문 내용을 변수 만으로 구성할 수 없습니다.(변수 이외 문장 필수 입력)</li>
                    <li>버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다.</li>
                  </ul>
                </div>
                <div class="theme_sample_img">
                  <p class="imgfr_cell"><img src="@/assets/images/theme/sample_a_cell.png" alt=""></p>
                  <p class="title">스타일(cell)</p>
                  <ul class="exptheme">
                    <li>1행에 1개 또는 2개의 Cell을 선택적으로 사용할 수 있습니다.</li>
                    <li>Cell별로 볼드, 글자크기, 정렬, 글자색을 지정하실 수 있습니다.</li>
                    <li>라인 체크박스 클릭 시 해당 행 하단에 라인을 삽입하실 수 있습니다.</li>
                  </ul>
                </div>
                <div class="theme_sample_img rightSec">
                  <p class="imgfr_cell"><img src="@/assets/images/theme/sample_basic_cell.png" alt=""></p>
                  <p class="title">스타일(cell)</p>
                  <ul class="exptheme">
                    <li>1행에 1개 또는 2개의 Cell을 선택적으로 사용할 수 있습니다.</li>
                    <li>Cell별로 볼드, 글자크기, 정렬, 글자색을 지정하실 수 있습니다.</li>
                    <li>라인 체크박스 클릭 시 해당 행 하단에 라인을 삽입하실 수 있습니다.</li>
                  </ul>
                </div>
              </div>
              <!-- 유형비교 테이블 -->
              <div class="title_wrap mar_b20" style="margin-top:40px;"></div>
              <table class="tbl_col_type type2">
                <thead>
                  <tr>
                    <th class="br_r">구분</th>
                    <th colspan="3">RCS 텍스트 템플릿</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="br_r">메시지 타입</td>
                    <td class="br_r red">서술(description)</td>
                    <td class="br_r red">스타일(cell)</td>
                    <td>기본(free)</td>
                  </tr>
                  <tr>
                    <td class="br_r">운영자 승인 여부</td>
                    <td class="br_r red fs_red">승인필요</td>
                    <td class="br_r red fs_red">승인필요</td>
                    <td>승인 불필요</td>
                  </tr>
                  <tr>
                    <td class="br_r">정보성 메시지 발송</td>
                    <td data-v-46149e78="" class="br_r red">가능</td>
                    <td data-v-46149e78="" class="br_r red">가능</td>
                    <td data-v-46149e78="">가능</td>
                  </tr>
                  <tr>
                    <td class="br_r">광고성 메시지 발송</td>
                    <td class="br_r red">불가</td>
                    <td class="br_r red">불가</td>
                    <td>불가</td>
                  </tr>
                  <tr>
                    <td class="br_r">타이틀</td>
                    <td class="br_r red">직접입력<br>변수사용</td>
                    <td class="br_r red">직접입력<br>변수사용</td>
                    <td>자동입력</td>
                  </tr>
                </tbody>
              </table>
              <div class="layer_foot">
                <div class="btn_wrap mar_t30">
                  <a href="javascript:void(0);" class="btn sml black" @click="close">
                    <span>확인</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a id="btn_close" href="javascript:void(0)" onclick class="btn_close" @click="close"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createThemeFreeTpl, checkThemeFreeTpl } from '@/api/service/template'
import { MessageBox } from 'element-ui'
// import '@/assets/css/designvii.css'

export default {
  name: 'CreateTemplateUnitThemeGuidePopup',
  props: {
    visible: {
      type: Boolean
    },
    brandId: {
      type: String
    }
  },
  components: {
  },
  data() {
    return {
      tplThemeType: {
        theme: '',
        type: '',
        agreYn: 'N',
        brandId: '',
        cardSpec: 'openrichcard',
        cardTheme: '', // 템플릿 유형 추가
        cardType: 'D', // 템플릿 속성
        fmtStr: '',
        inputText: '',
        tplBizSrv: '', // 템플릿 유형
        tplFormId: '',
        tplId: '', // 템플릿Id
        tplNm: ''
      },
      themeFree: 0,
      legacyFree: 1,
      createTaCode: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      this.checkThemeFreeTplData()
      this.gettemplateDataFromWrite()
      this.tplThemeType.brandId = this.brandId
    },
    // 등록된 free가 있는지 확인
    checkThemeFreeTplData() {
      if (this.brandId !== '') {
        checkThemeFreeTpl(this.brandId)
          .then(res => {
            this.themeFree = res.result[0].FREE
            this.createTaCode = res.result[0].CODE
          })
          .catch(err => {
            this.$alertMsg(err.desc)
          })
      }
    },
    toUppsercaseAfterWhtespace(str) {
      if (str) {
        return jglib.toUppsercaseAfterWhtespace(str)
      }
      return null
    },
    close() {
      this.$emit('update:themeGuideVisible', false)
      this.$emit('close', false)
    },
    // 이미 있는 free템플릿 선택했을 경우
    alertPopup(theme) {
      if (this.themeFree === 1 && theme === 'TA') {
        MessageBox.confirm('이미 등록된 템플릿 입니다. 타이틀 자유형')
      }
      if (this.legacyFree === 1 && theme === 'LE') {
        MessageBox.alert('이미 등록된 템플릿 입니다. 타이틀 선택형')
      }
    },
    // 확인버튼 눌렀을때 작동
    createTplUnitSubmit() {
      MessageBox.confirm('입력한 데이터가 초기화 됩니다. 데이터를 변경 하시겠습니까?')
        .then(() => {
          if (this.tplThemeType.cardTheme === '' || this.tplThemeType.cardType === '') {
            MessageBox.alert('템플릿 유형을 선택 해 주세요.')
          } else if (this.tplThemeType.theme === 'TA' && this.tplThemeType.type === 'ta001F') {
            // 타이틀 자유형의 프리를 post 하는 api 호출
            this.tplData = {
              brandId: this.brandId,
              tplFormId: this.createTaCode
            }
            createThemeFreeTpl(this.brandId, this.tplData)
              .then(() => {
                MessageBox.alert('타이틀 자유형 프리템플릿을 등록했습니다.')
                this.$emit('update:createTemplateUnitPopupVisible', false)
              })
              .catch(err => {
                this.$alertMsg(err.desc)
              })
          } else {
            this.$emit('update:createTemplateUnitChangePopupVisible', false)
            this.$emit('tplThemeTypeToTemplateList', this.tplThemeType)
            this.$store.commit('SET_CREATE_TPL', this.tplThemeType)
          }
        })
    },
    selectTheme(theme) {
      this.tplThemeType.cardTheme = theme
    },
    gettemplateDataFromWrite() {
      this.tplThemeType.cardTheme = this.templateData.cardTheme
      if (this.templateData.cardTheme === 'TA') {
        this.templateData.cardType === 'D' ? this.tplThemeType.cardType = 'ta001' + this.templateData.cardType : this.tplThemeType.cardType = 'ta001' + this.templateData.cardType
      } else {
        this.templateData.cardType === 'D' ? this.tplThemeType.cardType = 'legacy' + this.templateData.cardType : this.tplThemeType.cardType = 'legacy' + this.templateData.cardType
      }
    }
  }
}
</script>
<style>
.emulator_area {
  width: 340px;
  border: 1px solid #cccccc !important;
  border-radius: 16px !important;
  padding: 9px !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #f6f6f6 !important;
}
.emulator_area .emulator_cont {
  position: relative;
  border: 1px solid #cccccc;
  border-radius: 12px !important;
  background: #fff;
  overflow: hidden;
  padding: 0;
  min-height: 492px !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
