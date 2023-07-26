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
                              <div class="input-item">
                                <p class="text">UBR.13L49F42Mo-</p>
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
                  </tbody>
                </table>
                <!-- 텍스트 선택형_서술 -->
                <template v-if="isTextType1">
                  <MainTitleSelect
                  :titleIconNewData="titleIconNewData"
                  :titleIconBasicData="titleIconBasicData"
                  :info="form.MainTitle.info"
                  />
                  <Description :info="form.Description.info"/>
                </template>
                <!-- 텍스트 선택형_스타일 -->
                <template v-if="isTextType2">
                  <MainTitleSelect
                  :titleIconNewData="titleIconNewData"
                  :titleIconBasicData="titleIconBasicData"
                  :info="form.MainTitle.info"
                  />
                  <StyleTable :info="form.Table.info"/>
                </template>
                <!-- 타이틀 자유형_서술 -->
                <template v-if="isTextType3">
                  <MainTitleFree :info="form.MainTitle.info"/>
                  <Description :info="form.Description.info"/>
                  <Table :info="form.simpleTable.info" />
                </template>
                 <!-- 타이틀 자유형_스타일 -->
                <template v-if="isTextType4">
                  <MainTitleFree :info="form.MainTitle.info"/>
                  <StyleTable :info="form.Table.info"/>
                </template>
                <!-- 아이템 강조형_서술 -->
                <template v-if="isTextType5">
                  <ItemB
                  :info="form.Item.info"
                  :titleIconNewData="titleIconNewData"
                  :titleIconBasicData="titleIconBasicData"
                  />
                  <Description :info="form.Description.info"/>
                </template>
                <!-- 아이템 강조형_스타일 -->
                <template v-if="isTextType6">
                  <ItemB
                  :info="form.Item.info"
                  :titleIconNewData="titleIconNewData"
                  :titleIconBasicData="titleIconBasicData"
                  />
                  <StyleTable :info="form.Table.info"/>
                </template>
                <ButtonVertical :info="form.Buttons.info"></ButtonVertical>
              </div>
              <div class="form-btm__text">

                <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                <template v-if="isTextType3 || isTextType4">
                  <p class="guide-text black">&middot; 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요. 예) {{ }}, {{}}</p>
                  <p class="guide-text black">&middot; 특수문자, 공란, 줄바꿈 그리고 {{}} 변수명 사용 불가합니다.</p>
                </template>
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
          <p>- 템플릿은 승인 완료 후 사용 및 발송이 가능합니다.</p>
          <p>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</p>
        </div>
        <div class="button__wrap space-between">
          <div>
            <ButtonCmp
              type="btn-line"
            >취소</ButtonCmp>
          </div>
          <div>
            <ButtonCmp
              type="btn-blue-line"
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
import TempEmulator from '@/views/brand/message/components/TempEmulator.vue'
import { textTemplate } from '@/views/brand/message/templateData.js'
import MainTitleFree from './components/MainTitleFree.vue'
import MainTitleSelect from './components/MainTitleSelect.vue'
import Description from './components/Description.vue'
import ButtonVertical from '@/views/brand/message/components/ButtonVertical.vue'
import StyleTable from '@/views/brand/message/components/StyleTable.vue'
import ItemB from '@/views/brand/message/components/ItemB.vue'
import Table from '@/views/brand/message/components/Table.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    TempEmulator,
    MainTitleFree,
    MainTitleSelect,
    Description,
    ButtonVertical,
    StyleTable,
    ItemB,
    Table
  },
  data() {
    return {
      templateNameId: '8MwF1zkPHUj3xayCJsg3OcPv2',
      textTemplate,
      templateType: 'textTemplate',
      templateName: '',
      form: {
        MainTitle: {
          info: {
            title: '',
            titleType: '',
            titleIcon: '',
            subVarTitle: ''
          }
        },
        Description: {
          info: {
            content: ''
          }
        },
        Table: {
          info: [
            {
              tableTitle: '',
              content: [
                {
                  itemLabel: {},
                  itemData: {},
                  line: false,
                  colNum: '1'
                }
              ]
            }
          ]
        },
        simpleTable: {
          info: {
            titleUse: 'N',
            tableTitle: '',
            content: [
              {
                itemLabel: '',
                itemData: ''
              }
            ]
          }
        },
        Item: {
          info: {
            titleDescUse: 'N',
            titleDesc: '',
            title: '',
            logoType: 'basic',
            logoFile: ''
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
    checkLogoSelected (option) {
      this.form.SelectedLogo = option
      console.log(this.form.SelectedLogo)
    }
  }
}
</script>
