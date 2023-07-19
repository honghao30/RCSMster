<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 작성" />
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
                        <span class="text">LMS 템플릿(템플릿 유형)</span>
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
                                  <input type="text" placeholder="템플릿 이름을 입력하세요." maxlength="30" v-model="templateName"
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
                    <!-- //템플릿 명 -->
                  </tbody>
                </table>
                <!-- LMS 서술 -->
                <template v-if="isLmsType1">
                  <MainTitle
                    :titleIconNewData="titleIconNewData"
                    :titleIconBasicData="titleIconBasicData"
                    :info="form.MainTitle.info"/>
                  <Description :subTitleUse="true"
                    :info="form.Description.info"
                  />
                  <ButtonVertical
                    :info="form.Buttons.info"
                  />
                </template>
                <!-- LMS 서술_아이콘 -->
                <template v-if="isLmsType2">
                  <StyleTitleA
                    :titleIconNewData="titleIconNewData"
                    :titleIconBasicData="titleIconBasicData"
                    :info="form.MainTitle.info"
                  />
                  <Description :subTitleUse="true"
                  :info="form.Description.info"
                  />
                  <ButtonVertical :info="form.Buttons.info" />
                </template>
                <!-- LMS 2단 -->
                <template v-if="isLmsType3">
                  <MainTitle
                    :titleIconNewData="titleIconNewData"
                    :titleIconBasicData="titleIconBasicData"
                    :info="form.MainTitle.info"/>
                  <DescriptionGroup :info="form.DescriptionGroup.info"/>
                </template>
                <!-- LMS 템플릿_스타일  -->
                <template v-if="isLmsType4">
                  <MainTitle :titleIconNewData="titleIconNewData"
                    :titleIconBasicData="titleIconBasicData"
                    :info="form.MainTitle.info"/>
                  <Description :useSelect="true" :subTitleUse="true"
                    :info="form.Description.info"
                  />
                  <styleTable tableIndex="1" :info="form.Table.info"/>
                  <ButtonVertical></ButtonVertical>
                </template>

              </div>
              <div class="form-btm__text">
                 <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                <div class="checkbox">
                  <input type="checkbox" id="agreeChk" value="form.agree"/>
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
import TempEmulator from '@/views/brand/message/components/TempEmulatorLMS.vue'
import MainTitle from './components/MainTitle.vue'
import Description from './components/Description.vue'
import StyleTitleA from '@/views/brand/message/components/StyleTitleA.vue'
import ButtonVertical from '@/views/brand/message/components/ButtonVertical.vue'
import DescriptionGroup from '@/views/brand/message/components/DescriptionGroup.vue'
import StyleTable from '@/views/brand/message/components/StyleTable.vue'
export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    TempEmulator,
    MainTitle,
    Description,
    StyleTitleA,
    ButtonVertical,
    DescriptionGroup,
    StyleTable
  },
  data() {
    return {
      templateNameId: '8MwF1zkPHUj3xayCJsg3OcPv2',
      templateType: 'textTitle1',
      templateName: '',
      templateData: [],
      templateProp: 'desc',
      form: {
        MainTitle: {
          info: {
            title: '',
            titleType: '',
            titleIcon: '',
            logoType: 'basic',
            iconType: ''
          }
        },
        Description: {
          info: {
            title: '',
            subTitleUseY: 'N',
            subTitle: '',
            content: ''
          }
        },
        Table: {
          info: [
            {
              useSelect: 'N',
              tableTitle: '',
              content: [
                {
                  itemLabel: '',
                  itemData: '',
                  line: false,
                  colNum: '1'
                }
              ]
            },
            {
              useSelect: 'Y',
              tableTitle: '',
              content: [
                {
                  itemLabel: '',
                  itemData: '',
                  line: false,
                  colNum: '1'
                }
              ]
            }
          ]
        },
        DescriptionGroup: {
          info: [
            {
              description: {
                title: '',
                subTitleUseY: 'N',
                subTitle: '',
                content: ''
              },
              Buttons: {
                info: [
                  {
                    btnEvent: 'none',
                    btnEventDropdown: '',
                    btnName: ''
                  },
                  {
                    btnEvent: 'none',
                    btnEventDropdown: '',
                    btnName: ''
                  }
                ]
              }
            }
          ]
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
        }
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
      isSelectType: false,
      isFreeType: false,
      isLmsType1: false,
      isLmsType2: false,
      isLmsType3: false,
      isLmsType4: false
    }
  },
  mounted() {
    if (this.$route.query.type === 'lms1') {
      this.isLmsType1 = true
      this.templateType = '서술'
    } else if (this.$route.query.type === 'lms2') {
      this.isLmsType2 = true
      this.templateType = '서술_아이콘'
    } else if (this.$route.query.type === 'lms3') {
      this.isLmsType3 = true
      this.templateType = '2단'
    } else if (this.$route.query.type === 'lms4') {
      this.isLmsType4 = true
      this.templateType = '스타일'
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
    },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    },
    onSubmit () {
    }
  }
}
</script>
