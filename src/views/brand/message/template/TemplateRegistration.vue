<template>
  <div class='brand__wrap'>
    <div class='brand__inner'>
      <BrandLnb />
      <div class='brand-info__wrap'>
        <PageTitle pagetitle='템플릿 등록' />
        <div class='registration__wrap'>
          <div class='registration-form__wrap'>
            <form>
              <div class='table__wrap'>
                <table class='table table-bodyonly form-table'>
                  <colgroup>
                    <col width='180px'>
                    <col />
                  </colgroup>
                  <tbody>
                  <!-- 템플릿 ID -->
                  <tr>
                    <th scope='row'><span class='form-item__label'>템플릿 ID</span></th>
                    <td>
                      <div class='form-item__content'>
                        <div class='form-item-row'>
                          <div class='input-item'>
                            <p class='text'>{{templateIdFront}}-</p>
                            <div class='input'>
                              <input type='text' maxlength='30' v-model='templateIdBack' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- //템플릿 ID -->
                  <!-- 템플릿 유형 -->
                  <tr>
                    <th scope='row'><span class='form-item__label'>템플릿 유형</span></th>
                    <td>
                      <span class='text'>텍스트 템플릿</span>
                    </td>
                  </tr>
                  <!-- //템플릿 유형 -->
                  <!-- 템플릿 상품 -->
                  <tr>
                    <th scope='row'><span class='form-item__label'>템플릿 상품</span></th>
                    <td>
                      <span class='text'>{{ commonInfo.tplType }}</span>
                    </td>
                  </tr>
                  <!-- //템플릿 상품 -->
                  <!-- 템플릿 명 -->
                  <tr class='bdBottom-bg'>
                    <th scope='row'><span class='form-item__label required'>템플릿 명</span></th>
                    <td>
                      <div class='form-item__content'>
                        <div class='form-item-row'>
                          <div class='input-item input-limit'>
                            <div class='input'>
                              <input type='text' placeholder='템플릿 이름을 입력하세요.' maxlength='30'
                                     @input='e => templateName = e.target.value' v-model='commonInfo.tplNm'
                                     ref='templateTitle'
                              />
                              <div class='input-limit__text'>
                                <p>{{ commonInfo.tplNm.length }}/30자</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <template>
                  <component v-for='(component, idx) in componentList' :key='`${component}_${idx}`' :is='component'
                             :componentParam.sync='componentParam'
                             :compoInputObj.sync='compoInputObjList[idx]'
                             :compoIndex='idx'
                             @collectVariable='collectVariable'
                             :collectVariableList='collectVariableList'
                  ></component>
                </template>
              </div>
              <div class='form-btm__text'>
                <template>
                  <p class='guide-text black'>&middot; 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요. 예) {{ }}, {{}}</p>
                  <p class='guide-text black'>&middot; 특수문자, 공란, 줄바꿈 그리고 {{}} 변수명 사용 불가합니다.</p>
                </template>
                <p class='guide-text black'>&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를
                  합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                <!-- <div class="checkbox">
                  <input type="checkbox" id="agreeChk" v-model="form.agree" value="form.agree"/>
                  <label for="agreeChk"><span class="checkbox__text">정보성 메시지만 보낼 수 있으며 광고 등 정책에 위배되는 메시지 발송 시 템플릿 사용이 중지될 수 있음을 동의합니다.</span></label>
                </div> -->
              </div>
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class='brand-aside'>
            <TemplateEmulator
              :componentList='componentList'
              :compoInputObjList='compoInputObjList'
            />
            <!-- :templateData="templateData" -->
          </div>
          <!-- // 에뮬레이터 -->
        </div>
        <div class='top-notice--gray'>
          <p>- 템플릿은 승인 완료 후 사용 및 발송이 가능합니다.</p>
          <p>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</p>
        </div>
        <div class='button__wrap space-between'>
          <div>
            <ButtonCmp
              type='btn-line'
              @click='goBack'
            >취소
            </ButtonCmp>
          </div>
          <div>
            <ButtonCmp
              type='btn-blue-line'
            >임시 저장
            </ButtonCmp>
            <!-- <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
              :disabled="form.agree.length < 1"
            >승인 요청</ButtonCmp> -->
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
import TemplateEmulator from '@/views/brand/message/emulator/TemplateEmulator.vue'
import MainTitle from '@/views/brand/message/components/MainTitle.vue'
import MainTitleFree from '@/views/brand/message/components/MainTitleFree.vue'
import MainTitleSelect from '@/views/brand/message/components/MainTitleSelect.vue'
import StyleTitleA from '@/views/brand/message/components/StyleTitleA.vue'
import Description from '@/views/brand/message/components/Description.vue'
import ImageTall from '@/views/brand/message/components/ImageTall.vue'
import ImageSquare from '@/views/brand/message/components/ImageSquare.vue'
import HButton from '@/views/brand/message/components/HButton.vue'
import VButton from '@/views/brand/message/components/VButton.vue'
import Table from '@/views/brand/message/components/Table.vue'
import Notice from '@/views/brand/message/components/Notice.vue'
import Thumbnail from '@/views/brand/message/components/Thumbnail.vue'
import ItemA from '@/views/brand/message/components/ItemA.vue'
import ItemB from '@/views/brand/message/components/ItemB.vue'
import StyleTable from '@/views/brand/message/components/StyleTable.vue'
import ImageVertical from '@/views/brand/message/components/ImageVertical.vue'
import Banner from '@/views/brand/message/components/Banner.vue'
import ThumbDesc from '@/views/brand/message/components/ThumbDesc.vue'
import TitleDesc from '@/views/brand/message/components/TitleDesc.vue'


import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import {
  formComposition, formParam
} from '@/api/service/layout'

import componentUtils from '@/views/brand/message/utils/js/componentUtilsV2'

export default {
  components: {
    Emoji,
    StyleTable,
    Thumbnail,
    Notice,
    PageTitle,
    BrandLnb,
    ButtonCmp,
    TemplateEmulator,
    MainTitle,
    MainTitleFree,
    MainTitleSelect,
    StyleTitleA,
    Description,
    ImageTall,
    ImageSquare,
    HButton,
    VButton,
    Table,
    ItemA,
    ItemB,
    componentUtils,
    Banner,
    ThumbDesc,
    ImageVertical,
    TitleDesc
  },
  data() {
    return {
      templateIdFront: '',
      templateIdBack: '',
      templateType: 'textTemplate',
      templateName: '',
      componentList: [],
      compoInputObjList: [],
      componentParam: {},
      bannerUrl: '',
      jsonData: {},
      paramJsonList: [],

      /** 템플릿 사용자 입력 데이터 바인딩 및 미리보기 데이터 */
      commonInfo: {
        brandId: '',
        // tplFormId: 'OM00000056', // 메시지 베이스 폼 ID // all
        // tplFormId: 'CLM00005', // 메시지 베이스 폼 ID // sample1
        // tplFormId: 'CLM00006', // 메시지 베이스 폼 ID // sample2
        // tplFormId: 'CLM00007', // 메시지 베이스 폼 ID // sample3
        // tplFormId: 'CLM00008', // 메시지 베이스 폼 ID // sample4
        // tplFormId: 'CLM00009', // 메시지 베이스 폼 ID // sample5
        // tplFormId: 'CLM00010', // 메시지 베이스 폼 ID // sample6
        // tplFormId: 'CLM00011', // 메시지 베이스 폼 ID // sample7
        // tplFormId: 'CLM00012', // 메시지 베이스 폼 ID // sample8
        // tplFormId: 'CLM00013', // 메시지 베이스 폼 ID // sample9
        // tplFormId: 'OM00000060', // 메시지 베이스 폼 ID // sample9
        // tplFormId: 'OM00000057', // 메시지 베이스 폼 ID // sample10 (자유형)
        // tplFormId: 'OM00000058', // 메시지 베이스 폼 ID // sample11 (선택형)
        // tplFormId: 'OM00000059', // 메시지 베이스 폼 ID // sample13
        tplFormId: 'OM00000060', // 메시지 베이스 폼 ID // sample14
        tplTheme: '', // 템플릿 테마
        tplThemeNm: '', // 템플릿 테마명
        tplType: 'textTemplate', // 템플릿 속성
        tplTypeNm: '', // 템플릿 속성명
        tplId: 'UBR.13L49F42Mo-8MwF1zkPHUj3xayCJsg3OcPv2', // 템플릿 ID
        tplNm: '', // 템플릿명
        isFirstOptChange: 'Y' // 옵션 최초변경 여부
      },
      emulator: '', // 상품별 사용될 에뮬레이터 이름
      theme: '',
      type: '',
      options: [],
      indexOptions: [],
      buttonOptions: [
        'open_url',
        'dial_phone_number',
        'copy_to_clipboard',
        'show_location',
        'search_locations',
        'request_location_push',
        'create_calendar_event',
        'compose_text_message'
      ],
      buttonInputOption1: [],
      button1Type: 'open_url',
      buttonInputOption2: [],
      button2Type: 'open_url',
      selectedIndexOption: '',
      selectedOption: '',
      selectedButtonOption: '',
      bodyData: {},
      collectVariableList: []
    }
  },
  created() {
    this.commonInfo.tplFormId = this.$route.query.type
  },
  mounted() {
    this.initTemplate()
  },
  methods: {
    async initTemplate() {
      this.templateIdSeparator(this.commonInfo.tplId)
      this.componentList = []
      let buttonIndex = 0
      // 조합식을 componentList 에 push
      const compRes = await formComposition(this.commonInfo.tplFormId)
      compRes.result.list.forEach(data => {
        const compo = data.componentId.replace('CP-', '')
        // 조합식에 따른 화면
        this.componentList.push(compo)

        // 조합식에서 쓸 수 있는 param 값
        let compoInputObj
        if (compo.includes('Button')) {
          buttonIndex = buttonIndex + 1
          compoInputObj = componentUtils.addButtonConponentInputObj(compo, buttonIndex)
        } else {
          compoInputObj = componentUtils.addComponentInputObj(compo)
        }
        console.log(compoInputObj)
        this.compoInputObjList.push(compoInputObj)
      })
      console.log('여기 어디감?', this.compoInputObjList)

      const paramRes = await formParam(this.commonInfo.tplFormId)
      this.componentParam = paramRes.result.list
    },
    templateIdSeparator(tplId){
      let idList = tplId.split('-')
      this.templateIdFront = idList[0]
      this.templateIdBack = idList[1]
    },
    // 이미지 파일 업로드
    onFileChanged(e) {
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
    onSubmit() {
    },
    checkLogoSelected(option) {
      this.form.SelectedLogo = option
      console.log(this.form.SelectedLogo)
    },
    collectVariable() {
      console.log('collectVariable')
      const map = {}
      this.compoInputObjList.forEach(obj => {
        const data = obj[0]
        for (const key in data) {
          if (data[key] && data[key]) {
            try {
              const match = data[key].match(/{{.*?}}/g)
              console.log('key :', key, 'data:', data[key])
              console.log('match:', match)
              if (match && match.length > 0) {
                for (const matchVariable of match) {
                  map[matchVariable] = {
                    codeNm: matchVariable,
                    code: matchVariable
                  }
                }
              }
            } catch (e) {
              console.log(e)
            }
          }
        }
      })

      const list = []
      for (const key in map) {
        list.push(map[key])
      }

      this.collectVariableList = list
      return list
    },
    goBack() {
      this.$router.push({
        name: 'carateTemplateList',
        params: { page: this.page }
      })
    }
  }
}
</script>
