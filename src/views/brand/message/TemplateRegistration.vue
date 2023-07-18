<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 등록" />
        <div class="registration__wrap">
          <div class="registration-form__wrap">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="180px">
                    <col />
                  </colgroup>
                  <tbody>
                    <!-- 템플릿 ID -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 ID</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" maxlength="30" v-model="templateNameId"   />
                                </div>
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //템플릿 ID -->
                    <!-- 템플릿 유형 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 유형</span></th>
                      <td>
                        <span class="text">텍스트 템플릿</span>
                      </td>
                    </tr>
                    <!-- //템플릿 유형 -->
                    <!-- 템플릿 상품 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 상품</span></th>
                      <td>
                        <span class="text">{{ templateType }}</span>
                      </td>
                    </tr>
                    <!-- //템플릿 상품 -->
                    <!-- 템플릿 명 -->
                    <tr class="bdBottom-bg">
                      <th scope="row"><span class="form-item__label required">템플릿 명</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" placeholder="템플릿 이름을 입력하세요." maxlength="30" @input="e => templateName = e.target.value" v-model="templateName"
                                  ref="templateTitle"
                                  />
                                  <div class="input-limit__text">
                                    <p>{{ templateName.length }}/30자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>

                    <!-- <MainTitle :info="form.MainTitle.info" ></MainTitle>
                    <MainTitleFree :info="form.MainTitleFree.info"></MainTitleFree>

                    <StyleTitleA :info="form.MainTitle.info"></StyleTitleA>

                    <ImageTall :info="form.Image.info" ></ImageTall>
                    <ImageSquare :info="form.Image.info"></ImageSquare>
                    <ButtonHorizontal></ButtonHorizontal>
                    <ButtonVertical></ButtonVertical> -->
                  </tbody>
                </table>
                <MainTitleSelect :info="form.MainTitleSelect.info" v-if="isTextType1 || isTextType2"></MainTitleSelect>
                <MainTitleFree :info="form.MainTitleFree.info" v-if="isTextType3 || isTextType4"></MainTitleFree>
                <Description :info="form.Description1.info" v-if="isTextType1 || isTextType3 || isTextType5"></Description>
                <Table :info="form.table" v-if="isTextType2 || isTextType4 || isTextType6"></Table>
              </div>
              <div class="form-btm__text">
                <template v-if="isTextType3">
                  <p class="guide-text black">&middot; 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요. 예) {{ }}, {{}}</p>
                  <p class="guide-text black">&middot; 특수문자, 공란, 줄바꿈 그리고 {{}} 변수명 사용 불가합니다.</p>
                  <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                </template>
                <p class="guide-text black"  v-if="!isTextType3">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                <div class="checkbox">
                  <input type="checkbox" id="agreeChk" v-model="form.agree" value="form.agree"/>
                  <label for="agreeChk"><span class="checkbox__text">정보성 메시지만 보낼 수 있으며 광고 등 정책에 위배되는 메시지 발송 시 템플릿 사용이 중지될 수 있음을 동의합니다.</span></label>
                </div>
              </div>
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class="brand-aside">
            <TempEmulator
              :templateType="templateType"
              :templData="form"
            />
            <!-- :templateData="templateData" -->
          </div>
          <!-- // 에뮬레이터 -->
        </div>
        <div class="top-notice--gray">
          <p>- 대화방명을 수정하는 경우 승인 심사가 필요합니다.</p>
          <p>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
        </div>
        <div class="button__wrap space-between">
          <div>
            <ButtonCmp
              type="btn-line"
            >취소</ButtonCmp>
          </div>
          <div>
            <ButtonCmp
              type="btn-line"
            >임시 저장</ButtonCmp>
            <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
              :disabled="form.agree.length < 1"
            >승인 요청</ButtonCmp>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import TempEmulator from '@/views/brand/message/components/TempEmulator.vue'
import TemplateButtonReg from '@/views/brand/message/components/TemplateButtonReg.vue'
import TemplateTableReg from '@/views/brand/message/components/TemplateTableReg.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import { textTemplate } from '@/views/brand/message/templateData.js'
import MainTitle from './components/MainTitle.vue'
import MainTitleFree from './components/MainTitleFree.vue'
import MainTitleSelect from './components/MainTitleSelect.vue'
import StyleTitleA from './components/StyleTitleA.vue'
import Description from './components/Description.vue'
import ImageTall from './components/ImageTall.vue'
import ImageSquare from './components/ImageSquare.vue'
import ButtonHorizontal from '@/views/brand/message/components/ButtonHorizontal.vue'
import ButtonVertical from '@/views/brand/message/components/ButtonVertical.vue'
import Table from '@/views/brand/message/components/Table.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Emoji,
    Dropdown,
    TempEmulator,
    TemplateButtonReg,
    TemplateTableReg,
    MainTitle,
    MainTitleFree,
    MainTitleSelect,
    StyleTitleA,
    Description,
    ImageTall,
    ImageSquare,
    ButtonVertical,
    ButtonHorizontal,
    Table
  },
  data() {
    return {
      templateNameId: 'UBR.13L49F42Mo-8MwF1zkPHUj3xayCJsg3OcPv2',
      textTemplate,
      templateType: 'textTemplate',
      templateName: '',
      form: {
        logoType: 'basicImage',
        logoFile: '',
        explainUse: 'N',
        title: {
          logoType: '',
          desc: ''
        },
        SelectedTitle: ['', ''],
        SelectedLogo: ['', ''],
        MainTitle: {
          info: {
            mainTitle: '',
            titleType: '',
            varUse: 'Y',
            logoUse: 'Y',
            logoFile: '',
            logoUrl: '',
            mainDesc: ''
          }
        },
        Image:{
          info: {
            itemMainTitle: '',
            itemSubTitle: '',
            itemImgType: '',
            itemImgFile: '',
            imageOptions: 'square',
            imageFile: '',
            imageURL: ''
          }
        },
        MainTitleFree: {
          info: {
            mainTitle: '',
            titleType: '',
            varUse: 'Y',
            logoUse: 'Y',
            logoFile: '',
            logoUrl: '',
            mainDesc: ''
          }
        },
        MainTitleSelect: {
          info: {
            mainTitle: '',
            titleType: '',
            varUse: 'Y',
            logoUse: 'Y',
            logoFile: '',
            logoUrl: '',
            mainDesc: ''
          }
        },
        Description1: {
          info: {
            description: ''
          }
        },
        Description2: {
          info: {
            description: ''
          }
        },
        Description3: {
          info: {
            description: ''
          }
        },
        Table: {
          tableTitle: '',
          info: {
            tableRowNum: 1,
            description: [
              {
                line: false,
                colNum: '1',
                itemLabel: '',
                itemData: ''
              }
            ]
          }
        },
        Buttons: {
          use: 'N',
          info: [{
            id: 1,
            bgColor: '#2f77fb',
            btnEvent: 'none',
            btnEventDropdown: '',
            btnName: '',
            simpleChatbot: '',
            chatbot: '',
            call: '',
            copyContent: '',
            message: {
              call: '',
              content: '',
              viewSource: ''
            },
            map: {
              latitude: '',
              longitude: '',
              location: '',
              url: '',
              query: ''
            },
            calendar: {
              date: '',
              title: '',
              content: ''
            },
            browser: {
              url: '',
              viewMode: ''
            }
          },
          {
            id: 2,
            bgColor: '#2f77fb',
            btnEvent: 'none',
            btnEventDropdown: '',
            btnName: '',
            simpleChatbot: '',
            chatbot: '',
            call: '',
            copyContent: '',
            message: {
              call: '',
              content: '',
              viewSource: ''
            },
            map: {
              latitude: '',
              longitude: '',
              location: '',
              url: '',
              query: ''
            },
            calendar: {
              date: '',
              title: '',
              content: ''
            },
            browser: {
              url: '',
              viewMode: ''
            }
          }]
        },
        agree: ''
      },
      titleIconNewData: [
        {
          title: '알림',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '이벤트',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '프로모션',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '청구서',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '영수증',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '예약안내',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '일정안내',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '티켓',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '쿠폰',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        }
      ],
      titleIconBasicData: [
        {
          title: '승인',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '입금',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '출금',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '취소',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '주문',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '출고',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '배송',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '회원가입',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '인증',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        }
      ],
      isTextType1: false,
      isTextType2: false,
      isTextType3: false,
      isTextType4: false,
      isTextType5: false,
      isTextType6: false
    }
  },
  mounted() {
    this.initTemplate(3)
    this.buttonUseCheck()
    if (this.$route.query.type === 'text1') {
      this.isTextType1 = true
      this.templateType = '텍스트 선택형_서술'
    } else if (this.$route.query.type === 'text2') {
      this.isTextType2 = true
      this.templateType = '텍스트 선택형_스타일'
    } else if (this.$route.query.type === 'text3') {
      this.isTextType3 = true
      this.templateType = '타이틀 자유형_서술'
    } else if (this.$route.query.type === 'text4') {
      this.isTextType4 = true
      this.templateType = '타이틀 자유형_스타일'
    } else if (this.$route.query.type === 'text5') {
      this.isTextType5 = true
      this.templateType = '아이템 강조형_서술'
    } else if (this.$route.query.type === 'text6') {
      this.isTextType6 = true
      this.templateType = '아이템 강조형_스타일'
    }
  },
  methods: {
    initTemplate(templateNum) {
      this.templateData = this.textTemplate[templateNum]
      console.log(this.textTemplate[templateNum])
      this.templateData.forEach((item) => {
        let type = item.type
        Object.keys(this.form).forEach((key) => {
          if (type === key) {
            item.info = this.form[key].info
          }
        })
      })
    },
    buttonUseCheck() {
      if (this.form.Buttons.use === 'N') {
        this.templateData.forEach((item, i) => {
          if (item.type === 'Buttons') {
            this.templateData.splice(i, 1)
          }
        })
      } else {
        let buttonCmp = {
          type: 'Buttons',
          info: {}
        }
        buttonCmp.info = this.form.Buttons.info
        this.templateData.push(buttonCmp)
      }
    },
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.form.logoFile = fileName
      this.url = URL.createObjectURL(file)
      this.form.SelectedLogo.push(this.url)
      console.log(this.form.SelectedLogo)
    },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    },
    onSubmit () {
    },
    checkTitleSelected (option) {
      this.form.SelectedTitle = option
    },
    checkLogoSelected (option) {
      this.form.SelectedLogo = option
      console.log(this.form.SelectedLogo)
    }
  }
}
</script>
