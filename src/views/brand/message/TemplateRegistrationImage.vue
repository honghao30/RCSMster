template<template>
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
                        <span class="text">템플릿 ID는 등록 완료 후 생성됩니다.</span>
                      </td>
                    </tr>
                    <!-- //템플릿 ID -->
                    <!-- 템플릿 유형 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 유형</span></th>
                      <td>
                        <span class="text">이미지 템플릿</span>
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
                    <tr>
                      <th scope="row"><span class="form-item__label required">템플릿 명</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" placeholder="템플릿 이름을 입력하세요." maxlength="30" v-model="form.templateTitle"
                                  ref="templateTitle"
                                  />
                                  <div class="input-limit__text">
                                    <p>{{ form.templateTitle.length }}/30자</p>
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
                <!-- 이미지& 타이틀 강조형 -->
                <template v-if="isImageType1">
                  <MainImage :info="form.Image.info"/>
                  <SubDescTable :info="form.Table.info"/>
                  <ButtonVertical :info="form.Buttons.info"/>
                </template>
                <!-- 이미지 강조형 -->
                <template v-if="isImageType2">
                  <MainImage :info="form.Image.info"/>
                  <Description :titleUse="true" :info="form.Description.info"/>
                  <ButtonVertical :info="form.Buttons.info"/>
                </template>
                <!-- 썸네일형(세로) -->
                <template v-if="isImageType3">
                  <MainImage :info="form.Image.info" />
                  <Description :useSelect="true" :titleUse="true" :info="form.Description.info"/>
                  <ThumbAndDesc :info="form.subDescription.info"/>
                  <ButtonVertical :info="form.Buttons.info"/>
                </template>
                <!-- 썸네일형(가로) -->
                <template v-if="isImageType4">
                  <MainImage :info="form.Image.info"/>
                  <Description :titleUse="true" :info="form.Description.info"/>
                  <Thumnail :info="form.thumnail.info" />
                  <ButtonVertical :info="form.Buttons.info"/>
                </template>
                <!-- SNS 형 -->
                <template v-if="isImageType5">
                  <Description :titleUse="true" :info="form.Description.info"/>
                  <MainImage  :info="form.Image.info" />
                  <ButtonVertical :info="form.Buttons.info"/>
                </template>
                <!-- SNS 형(중간버튼) -->
                <template v-if="isImageType6">
                  <Description :titleUse="true" :info="form.Description.info"/>
                  <ButtonVertical :info="form.Buttons.info"/>
                  <MainImage  :info="form.Image.info" />
                </template>
                <!-- 이미지 템플릿 신규 -->
                <template v-if="isImageType7">
                  <MainImage :info="form.Image.info" />
                  <ItemA
                  :info="form.Item.info"
                  :titleIconNewData="titleIconNewData"
                  :titleIconBasicData="titleIconBasicData"
                  />
                  <Description :titleUse="true" :info="form.Description.info"/>
                  <StyleTable :useSelect="true" :info="form.styleTable.info" />
                  <ButtonVertical :info="form.Buttons.info"/>
                </template>
                <!-- 캐러셀 -->
                <template v-if="isImageType8">
                  <Carousel :slideData="form.slideData" />
                </template>
                <!-- carousel -->
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
              @click="btnCancel"
              type="btn-line"
            >취소</ButtonCmp>
          </div>
          <div>
            <ButtonCmp
              type="btn-blue-line"
              @click="saveTemp"
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
import TempEmulator from '@/views/brand/message/components/TempEmulatorImage.vue'
import { textTemplate } from '@/views/brand/message/templateData.js'
import Carousel from '@/views/brand/message/components/Carousel.vue'
import MainImage from '@/views/brand/message/components/MainImage.vue'
import SubDescTable from '@/views/brand/message/components/SubDescTable.vue'
import Description from './components/Description.vue'
import ThumbAndDesc from './components/ThumbAndDesc.vue'
import Thumnail from './components/Thumnail.vue'
import ItemA from './components/ItemA.vue'
import StyleTable from './components/StyleTable.vue'
import ButtonVertical from '@/views/brand/message/components/ButtonVertical.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    TempEmulator,
    Carousel,
    MainImage,
    SubDescTable,
    ButtonVertical,
    Description,
    ThumbAndDesc,
    Thumnail,
    ItemA,
    StyleTable
  },
  data() {
    return {
      textTemplate,
      templateType: 'textTitle1',
      messageTemplate: [],
      form: {
        templateTitle: '',
        // logoType: 'custom',
        MainTitle: {
          info: {
            title: '',
            titleUse: 'N',
            titleType: '',
            titleIcon: '',
            subVarTitle: ''
          }
        },
        Image: {
          info: {
            imgType: 'square',
            imgFile: require('../../../assets/images/message/image_thum01.png'),
            imgUrl: ''
          }
        },
        Description: {
          info: {
            titleUseY: 'N',
            title: '',
            subTitleUseY: 'N',
            subTitle: '',
            content: ''
          }
        },
        styleTable: {
          info: [
            {
              tableTitle: '',
              content: [
                {
                  itemLabel: '',
                  itemData: '',
                  line: false,
                  colNum: '1',
                  itemLabelStyle: '',
                  itemDataStyle: ''
                }
              ]
            }
          ]
        },
        Table: {
          info: {
            titleUse: '',
            title: '',
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
        subDescription: {
          info: {
            titleUse: 'N',
            title: '',
            content: [
              {
                imgFile: require('../../../assets/images/message/thum_01.png'),
                imgUrl: '',
                itemData: ''
              },
              {
                imgFile: require('../../../assets/images/message/thum_02.png'),
                imgUrl: '',
                itemData: ''
              },
              {
                imgFile: require('../../../assets/images/message/thum_02.png'),
                imgUrl: '',
                itemData: ''
              }
            ]
          }
        },
        thumnail: {
          info: [
            {
              imgFile: require('../../../assets/images/message/thum_04.png'),
              imgUrl: ''
            },
            {
              imgFile: require('../../../assets/images/message/thum_05.png'),
              imgUrl: ''
            },
            {
              imgFile: require('../../../assets/images/message/thum_06.png'),
              imgUrl: ''
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
        },
        slideData: [{
          slideIndex: '1',
          title: '',
          content: '',
          isActive: true,
          imgFile: '',
          buttons: {
            use: 'Y',
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
            }],
          }
        }],
      },
      bodyTemplate: [
        {
          num: ''
        }
      ],
      detailTemplate: [
        {
          num: ''
        }
      ],
      imageTemplate: [
        {
          num: ''
        }
      ],
      tableContentNumOption: [{
        label: '1개',
        value: 1
      },
      {
        label: '2개',
        value: 2
      },
      {
        label: '3개',
        value: 3
      }],
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
      isImageType1: false,
      isImageType2: false,
      isImageType3: false,
      isImageType4: false,
      isImageType5: false,
      isImageType6: false,
      isImageType7: false,
      isImageType8: false
    }
  },
  mounted() {
    if (this.$route.query.type === 'image1') {
      this.isImageType1 = true
      this.templateType = '이미지 & 타이틀 강조형'
    } else if (this.$route.query.type === 'image2') {
      this.isImageType2 = true
      this.templateType = '이미지 강조형'
    } else if (this.$route.query.type === 'image3') {
      this.isImageType3 = true
      this.templateType = '썸네일 세로형'
    } else if (this.$route.query.type === 'image4') {
      this.isImageType4 = true
      this.templateType = '썸네일 가로형'
    } else if (this.$route.query.type === 'image5') {
      this.isImageType5 = true
      this.templateType = 'SNS형'
    } else if (this.$route.query.type === 'image6') {
      this.isImageType6 = true
      this.templateType = 'SNS 중간버튼형'
    } else if (this.$route.query.type === 'image7') {
      this.isImageType7 = true
      this.templateType = '이미지 템플릿 신규'
    } else if (this.$route.query.type === 'image8') {
      this.isImageType8 = true
      this.templateType = '이미지 템플릿 캐러셀'
    }
  },
  methods: {
    chkTypeChange() {
      this.textTemplate.forEach((item) => {
        if (item.templateType === this.templateType) {
          this.messageTemplate = Object.assign({}, item.cmp)
        }
      })
    },
    changetableRow () {
      let row = this.form.tableRowNum
      let tableLength = this.form.tableContent.length
      let diff = row - tableLength
      let tableItem = {
        line: false,
        direction: 'row',
        key: '',
        value: ''
      }
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          this.form.tableContent.push(tableItem)
        }
      } else if (diff < 0) {
        for (let i = 0; i < -diff; i++) {
          this.form.tableContent.pop()
        }
      }
    },
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.form.imageFile = fileName
      this.url = URL.createObjectURL(file)
    },
    onFileChanged1 (e) {
      const files1 = e.target.files
      const file1 = files1[0]
      const fileName1 = file1.name
      this.form.imageFile1 = fileName1
      this.url = URL.createObjectURL(file1)
    },
    onFileChanged2 (e) {
      const files2 = e.target.files
      const file2 = files2[0]
      const fileName2 = file2.name
      this.form.imageFile2 = fileName2
      this.url = URL.createObjectURL(file2)
    },
    onFileChanged3 (e) {
      const files3 = e.target.files
      const file3 = files3[0]
      const fileName3 = file3.name
      this.form.imageFile3 = fileName3
      this.url = URL.createObjectURL(file3)
    },
    onSelectEmoji(e, target, idx) {
      let emoji = e
      let refName = target
      if (idx !== undefined) {
        this.$refs[refName][0].value += emoji
      } else {
        this.$refs[refName].value += emoji
      }
    },

    buttonUseCheck() {
      // if (this.form.Buttons.use === 'N') {
      //   this.templateData.forEach((item, i) => {
      //     if (item.type === 'Buttons') {
      //       this.templateData.splice(i, 1)
      //     }
      //   })
      // } else {
      //   let buttonCmp = {
      //     type: 'Buttons',
      //     info: {}
      //   }
      //   buttonCmp.info = this.form.Buttons.info
      //   this.templateData.push(buttonCmp)
      // }
    },

    // 본문 추가 및 삭제
    Addbody () {
      if (this.bodyTemplate.length < 3) {
        this.bodyTemplate.push({})
      }
    },
    removebody (index) {
      if (this.bodyTemplate.length > 1) {
        this.bodyTemplate.splice(index, 1)
      }
    },

    // 상세 추가 및 삭제
    Adddetail () {
      if (this.detailTemplate.length < 3) {
        this.detailTemplate.push({})
      }
    },
    removedetail (index) {
      if (this.detailTemplate.length > 1) {
        this.detailTemplate.splice(index, 1)
      }
    },

    // 이미지 추가 및 삭제
    Addimage () {
      if (this.imageTemplate.length < 3) {
        this.imageTemplate.push({})
      }
    },
    removeimage (index) {
      if (this.imageTemplate.length > 1) {
        this.imageTemplate.splice(index, 1)
      }
    },
    onSubmit () {
      console.log()
    },
    btnCancel () {
      console.log()
    },
    saveTemp () {
      console.log()
    }
  }
}
</script>

<style>
</style>
