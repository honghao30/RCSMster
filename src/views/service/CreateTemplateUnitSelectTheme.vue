<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'템플릿 관리'"/>
      </div>
      <brand-top active="template" :brandId="brandId"></brand-top>
          <div class="rcs_bundle_wrap rcs_bundle_wid">
            <div class="rcs_emul_form_wrap theme_choice mar-l0"  style="width:1280px;">
              <div class="title_wrap" style="width:100%;">
                <span class="h4_title bold">템플릿 유형 선택</span>
              </div>
              <div class="theme_guide_btn" @click="showThemeGuidePopup(true)"><button type="button">텍스트 템플릿 유형 안내</button></div>
              <span class="line"></span>
              <div class="cont_wrap mar_t20 W100P">
                <span class="comFS202">텍스트 템플릿</span>
                <span class="h4_desc bold comFS16">- 텍스트 템플릿은 정보성 메시지에 한해 발송이 가능하며 승인 완료 후 발송 할 수 있습니다.</span>
                <span class="h4_desc bold comFS16">- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</span>
                <!-- <a href="javascript:void(0)" class="btn_info">테마 안내<span>?</span></a> -->
                <div class="type_item_wrap mar_t20">
                  <ul class="type_wrap">
                    <li class="type_item">
                      <p class="item_title mar_b25">타이틀 선택형</p>
                      <ul class="item_option">
                        <li @click="selectTheme('LE', 'D')">
                          <input type="radio" name="message_theme_item_option" id="message_theme_option01" checked v-model="tplThemeType.type" value="legacyD">
                          <label for="message_theme_option01" class="message_theme_name">
                            <div><img src="@/assets/images/theme/preview7.png" alt="Preview Image"/></div>
                            <button>서술(description)</button>
                            <!-- <span class="item_option_name mar_t10">Free</span> -->
                          </label>
                        </li>
                        <li @click="selectTheme('LE', 'C')">
                          <input type="radio" name="message_theme_item_option" id="message_theme_option02" v-model="tplThemeType.type" value="legacyC">
                          <label for="message_theme_option02" class="message_theme_name">
                            <div><img src="@/assets/images/theme/preview8.png" alt="Preview Image"/></div>
                            <button>스타일(cell)</button>
                            <!-- <span class="item_option_name mar_t10">서술(Description)</span> -->
                          </label>
                        </li>
                        <li @click="alertPopup('LE')">
                          <input type="radio" name="message_theme_item_option" id="message_theme_option03" v-model="tplThemeType.type" value="lelacyF" :disabled="legacyFree">
                          <label for="message_theme_option03" class="message_theme_name">
                            <div><img src="@/assets/images/theme/preview9.png" alt="Preview Image"/></div>
                            <button class="theme_option_picked">기본(free)<img src="@/assets/images/icons/circle-question-solid.svg"  class="freetxt-icon"></button>
                            <!-- <span class="item_option_name mar_t10">스타일(cell)</span> -->
                          </label>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <ul class="type_wrap">
                    <li class="type_item">
                      <p class="item_title mar_b25">타이틀 자유형</p>
                      <ul class="item_option">
                        <li @click="selectTheme('TA', 'D')">
                          <input type="radio" name="message_theme_item_option" id="message_theme_option04" v-model="tplThemeType.type" value="ta001D">
                          <!-- <input type="radio" name="message_theme_item_option" id="message_theme_option04" disabled> -->
                          <label for="message_theme_option04" class="message_theme_name">
                            <div><img src="@/assets/images/theme/preview10.png" alt="Preview Image"/></div>
                            <button>서술(description)</button>
                            <!-- <span class="item_option_name mar_t10">Free</span> -->
                          </label>
                        </li>
                        <li @click="selectTheme('TA', 'C')">
                          <input type="radio" name="message_theme_item_option" id="message_theme_option05" v-model="tplThemeType.type" value="ta001C">
                          <label for="message_theme_option05" class="message_theme_name">
                            <div><img src="@/assets/images/theme/preview11.png" alt="Preview Image"/></div>
                            <button>스타일(cell)</button>
                            <!-- <span class="item_option_name mar_t10">서술(Description)</span> -->
                          </label>
                        </li>
                        <li @click="alertPopup('TA')">
                          <input type="radio" name="message_theme_item_option" id="message_theme_option06" v-model="tplThemeType.type" value="ta001F" :disabled="themeFree">
                          <label for="message_theme_option06" class="message_theme_name" @click.prevent>
                            <div><img src="@/assets/images/theme/preview12.png" alt="Preview Image"/></div>
                            <button class="theme_option_free">기본(free)<img src="@/assets/images/icons/circle-question-solid.svg"  class="freetxt-icon"></button>

                            <!-- <span class="item_option_name mar_t10">스타일(cell)</span> -->
                          </label>

                           <p class="freeim-txt">* 별도 템플릿 등록없이<br>사용할 수 있습니다.</p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <span class="comFS20-divide"></span>
                <span class="comFS20">이미지 템플릿</span>
                <span class="h4_desc bold comFS16">- 이미지 템플릿은 정보성과 광고성 메시지 발송이 가능한  ”RCS 이미지 템플릿” 요금제 상품입니다.</span>
                <span class="h4_desc bold comFS16">- 승인 심사 기준:<br>&nbsp;&nbsp;12시 전 신청 건은 당일 오후, 12시 이후 신청 건에 대해서는 익일 오전 중 심사 예정입니다.(주말 신청 건에 대해서는 차주 월요일 중 심사) 내부 사정상 지체될 수 있습니다.</span>
                <!-- <span class="h4_desc bold comFS16">&nbsp;&nbsp; 내부 사정상 지체될 수 있습니다.</span> -->
                <!-- 이미지 템플릿 선택: 임시 -->
                <div class="theme-preview-wrap">
                  <div @click.stop="selectTheme('HIT', 'S')">
                    <input type="radio" name="message_theme_item_option" id="message_theme_option07" v-model="tplThemeType.type" value="hitS"/>
                    <div><img src="@/assets/images/theme/preview1.png" alt="Theme Preview 1"/></div>
                    <button>이미지&amp;타이틀 강조형</button>
                  </div>
                  <div @click="selectTheme('HIM', 'S')">
                    <input type="radio" name="message_theme_item_option" id="message_theme_option08" v-model="tplThemeType.type" value="himS"/>
                    <div><img src="@/assets/images/theme/preview2.png" alt="Theme Preview 2"/></div>
                    <button>이미지 강조형</button>
                  </div>
                  <div @click="selectTheme('TBN', 'V')">
                    <input type="radio" name="message_theme_item_option" id="message_theme_option09" v-model="tplThemeType.type" value="tbnV"/>
                    <div><img src="@/assets/images/theme/preview3.png" alt="Theme Preview 3"/></div>
                    <button>썸네일형(세로)</button>
                  </div>
                  <div @click="selectTheme('TBN', 'H')">
                    <input type="radio" name="message_theme_item_option" id="message_theme_option10" v-model="tplThemeType.type" value="tbnH"/>
                    <div><img src="@/assets/images/theme/preview4.png" alt="Theme Preview 4"/></div>
                    <button>썸네일형(가로)</button>
                  </div>
                  <div @click="selectTheme('SNS', 'S')">
                    <input type="radio" name="message_theme_item_option" id="message_theme_option11" v-model="tplThemeType.type" value="snsS"/>
                    <div><img src="@/assets/images/theme/preview5.png" alt="Theme Preview 5"/></div>
                    <button>SNS형</button>
                  </div>
                  <div @click="selectTheme('SNS', 'H')">
                    <input type="radio" name="message_theme_item_option" id="message_theme_option12" v-model="tplThemeType.type" value="snsH"/>
                    <div><img src="@/assets/images/theme/preview6.png" alt="Theme Preview 6"/></div>
                    <button>SNS형(중간버튼)</button>
                  </div>
                </div>
                <div class="btn_wrap mar_t40">
                      <a href="javascript:void(0)" class="btn mid bd_blue" @click="goList"><span>취소</span></a>
                      <!-- <a href="javascript:void(0)" @click="createTplUnitSubmit" class="btn mid blue"><span>선택</span></a> -->
                  </div>
              </div>
            </div>
          </div>
          <a id="btn_close" href="javascript:void(0)" onclick class="btn_close" @click="close"></a>
    </article>
    <create-template-unit-theme-guide-popup
      v-if="themeGuideVisible"
      :visible.sync="themeGuideVisible"
      :brandId="brandId"
      @close="showThemeGuidePopup"
    />
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import Breadcrumb from '@/components/global/Breadcrumb'
import { createThemeFreeTpl, checkThemeFreeTpl } from '@/api/service/template'
import { MessageBox } from 'element-ui'
// import '@/assets/css/designvii.css'
import CreateTemplateUnitThemeGuidePopup from '@/views/service/components/CreateTemplateUnitThemeGuidePopup'
import imgTplUtils from '@/components/imageTemplate/js/imageTemplateUtils'

export default {
  name: 'CreateTemplateUnitSelectTheme',
  props: {
    visible: {
      type: Boolean
    }
  },
  components: {
    BrandTop,
    Breadcrumb,
    CreateTemplateUnitThemeGuidePopup
  },
  data() {
    return {
      brandId: '',
      tplThemeType: {
        theme: '',
        type: ''
      }, // 선택한 템플릿
      themeFree: false,
      legacyFree: true,
      createTaCode: '',
      themeGuideVisible: false
    }
  },
  computed: {},
  watch: {},
  beforeRouteLeave(to, from, next) {
    if (to.name === 'CreateImageTemplateUnit') {
      this.$store.dispatch('setThemeType', { theme: this.tplThemeType.theme, type: this.tplThemeType.type })
    }
    next()
  },
  created() {
    this.init()
  },
  mounted() {
    this.tplThemeType = JSON.parse(localStorage.getItem('themeTypeInfo')) || {}
  },
  methods: {
    init() {
      this.brandId = this.$route.params.brandId
      this.checkThemeFreeTplData()
    },
    // 등록된 free가 있는지 확인
    checkThemeFreeTplData() {
      checkThemeFreeTpl(this.brandId)
        .then(res => {
          // this.themeFree = res.result[0].FREE
          res.result[0].FREE === 0 ? this.themeFree = false : this.themeFree = true
          this.createTaCode = res.result[0].CODE
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    toUppsercaseAfterWhtespace(str) {
      if (str) {
        return jglib.toUppsercaseAfterWhtespace(str)
      }
      return null
    },
    close() {
      this.$emit('update:createTemplateUnitPopupVisible', false)
    },
    // 이미 있는 free템플릿 선택했을 경우
    alertPopup(theme) {
      const h = this.$createElement
      if (theme === 'TA') {
        if (this.themeFree) {
          this.$msgbox({ message: h('p', null, [
            h('span', '이미 생성된 기본(free)템플릿이 존재 합니다.'),
            h('br'),
            h('br'),
            h('span', null, '기본(free)템플릿은 텍스트 템플릿 유형 별 1개만 생성 가능합니다.')
          ])
          })
        } else this.selectTheme('TA', 'F')
      }
      if (theme === 'LE') {
        if (this.legacyFree) {
          this.$msgbox({ message: h('p', null, [
            h('span', '이미 등록된 템플릿 입니다.'),
            h('br'),
            h('br'),
            h('span', null, '기본(free)템플릿은 브랜드 개설 후 승인 완료 시 자동으로 생성됩니다.')
          ])
          })
        } else this.selectTheme('LE', 'F')
      }
    },
    // 확인버튼 눌렀을때 작동
    createTplUnitSubmit() {
      const h = this.$createElement
      if (this.tplThemeType === '') {
        MessageBox.alert('템플릿 테마를 선택 해 주세요.')
      } else if (this.tplThemeType.theme === 'TA' && this.tplThemeType.type === 'ta001F') {
        // 타이틀 자유형의 프리를 post 하는 api 호출
        this.tplData = {
          brandId: this.brandId,
          tplFormId: this.createTaCode
        }
        createThemeFreeTpl(this.brandId, this.tplData)
          .then(() => {
            this.$msgbox({ message: h('p', null, [
              h('span', '타이틀 자유형의 기본(free)템플릿이 생성 되었습니다.'),
              h('br'),
              h('br'),
              h('span', null, '템플릿 관리에서 확인 하실 수 있습니다.')
            ]),
            showCancelButton: false,
            confirmButtonText: '확인',
            closeOnClickModal: false
            }).then(() => {
              this.$router.push({
                name: 'TemplateList'
              })
            })
          })
          .catch(err => {
            this.$alertMsg(err.desc)
          })
      } else {
        // 팝업에서 받아온 type값을 잘라내는 작업
        this.tplThemeType.type = this.tplThemeType.type.slice(-1)
        // 다른 테마, 타입을 선택했을 경우 부모로 값 전달
        this.$emit('update:createTemplateUnitPopupVisible', false)
        this.$emit('tplThemeTypeToTemplateList', this.tplThemeType)
        this.$store.commit('SET_CREATE_TPL', this.tplThemeType)
        this.$store.commit('SET_BRAND_ID_FOR_CREATE_TPL', this.brandId)
        // ex. tplThemeType = { theme: 'TA', type: "D" }
        // 템플릿 구분에 따라 다른 화면이동
        let routerName = imgTplUtils.isImageTemplate(this.tplThemeType.theme) ? 'CreateImageTemplateUnit' : 'CreateTemplateUnit'
        this.$router.push({
          name: routerName,
          params: { brandId: this.brandId, tplThemeType: this.tplThemeType }
        })
      }
    },
    // new
    selectTheme(theme, type) {
      const h = this.$createElement
      // ex. tplThemeType = { theme: 'TA', type: "D" }
      this.tplThemeType.theme = theme
      this.tplThemeType.type = type

      if (this.tplThemeType.theme === '' || this.tplThemeType.type === '') {
        MessageBox.alert('템플릿 유형을 선택 해 주세요.')
      } else if (this.tplThemeType.theme === 'TA' && this.tplThemeType.type === 'F') {
        // 타이틀 자유형의 프리를 post 하는 api 호출
        this.tplData = {
          brandId: this.brandId,
          tplFormId: this.createTaCode
        }
        createThemeFreeTpl(this.brandId, this.tplData)
          .then(() => {
            this.$msgbox({ message: h('p', null, [
              h('span', '타이틀 자유형의 기본(free)템플릿이 생성 되었습니다.'),
              h('br'),
              h('br'),
              h('span', null, '템플릿 관리에서 확인 하실 수 있습니다.')
            ]),
            showCancelButton: false,
            confirmButtonText: '확인',
            closeOnClickModal: false
            }).then(() => {
              this.$router.push({ name: 'TemplateList' })
            })
          })
          .catch(err => {
            this.$alertMsg(err.desc)
          })
      } else {
        // 다른 테마, 타입을 선택했을 경우 부모로 값 전달
        this.$emit('update:createTemplateUnitPopupVisible', false)
        this.$emit('tplThemeTypeToTemplateList', this.tplThemeType)
        this.$store.commit('SET_CREATE_TPL', this.tplThemeType)
        this.$store.commit('SET_BRAND_ID_FOR_CREATE_TPL', this.brandId)
        // 템플릿 구분에 따라 다른 화면이동
        let routerName = imgTplUtils.isImageTemplate(this.tplThemeType.theme) ? 'CreateImageTemplateUnit' : 'CreateTemplateUnit'
        this.$router.push({
          name: routerName,
          params: { brandId: this.brandId }
        })
      }
    },
    showThemeGuidePopup(a) {
      this.themeGuideVisible = a === true
    },
    goList() {
      this.$router.push({
        name: 'TemplateList'
      })
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
