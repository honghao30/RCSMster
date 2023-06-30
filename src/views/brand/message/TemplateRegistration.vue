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
                        <span class="text">템플릿 ID는 등록 완료 후 생성됩니다.</span>
                      </td>
                    </tr>
                    <!-- //템플릿 ID -->
                    <!-- 템플릿 유형 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 유형</span></th>
                      <td>
                        <span class="text">텍스트 선택형</span>
                      </td>
                    </tr>
                    <!-- //템플릿 유형 -->
                    <!-- 템플릿 명 -->
                    <tr>
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
                    <!-- 타이틀-->
                    <tr>
                      <th scope="row"><span class="form-item__label required">타이틀</span></th>
                      <td>
                        <div class="form-item__content">
                          <!-- 선택형 -->
                          <div class="form-item-row">
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">유형</span>
                                <div class="inner__input-item">
                                  <div class="input-item">
                                    <Dropdown :options="titleOptions" v-model="form.MainTitle.info.titleType"/>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- 자유형 -->
                          <div class="form-item-row">
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">로고</span>
                                <div class="inner__input-item">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="logo" id="logoUseY" value="Y"
                                        v-model="form.MainTitle.info.logoUse"
                                      />
                                      <label for="logoUseY">사용</label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="logo" id="logoUseN"  value="N"
                                      v-model="form.MainTitle.info.logoUse"
                                      />
                                      <label for="logoUseN">미사용</label>
                                    </span>
                                  </div>
                                  <div class="input-item">
                                    <span class="input">
                                      <input type="text" class="input"  disabled
                                        :value="form.MainTitle.info.logoFile"
                                      >
                                    </span>
                                    <input type="file" id="fileUp" class="input blind"
                                    @change="onFileChanged"
                                    >
                                    <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                                  </div>
                                  <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="form-item-row">
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">제목</span>
                                <div class="inner__input-item">
                                  <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text"
                                        class="input"
                                        maxlength="17"
                                        ref="mainTitle"
                                        @input="e => form.MainTitle.info.mainTitle = e.target.value"
                                        placeholder="최대 17자 까지 입력할 수 있습니다."
                                      >
                                      <div class="input-limit__text">
                                        <Emoji @input="onSelectEmoji($event, 'mainTitle')" />
                                        <p>{{ form.MainTitle.info.mainTitle.length }}/17자</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input-box">
                                <span class="form-item__label">변수</span>
                                <div class="inner__input-item">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="varUse"
                                      id="varUseY"  value="Y"
                                      v-model="form.MainTitle.info.varUse"
                                      />
                                      <label for="varUseY">사용</label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="varUse" id="varUseN" value="N"
                                      v-model="form.MainTitle.info.varUse"
                                      />
                                      <label for="varUseN">미사용</label>
                                    </span>
                                  </div>
                                  <div class="input-item">
                                    <Dropdown placeholder="변수 선택"/>
                                    <ButtonCmp
                                      type="btn-default-line"
                                    >변수 가져오기</ButtonCmp>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- 템플릿 속성 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">템플릿 속성</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="templateProp" id="desc" value="desc" v-model="templateProp"
                                  @change="initTemplate(3)"
                                  />
                                  <label for="desc"><span class="radiobox__text">서술형</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="templateProp" id="cell" value="cell" v-model="templateProp"
                                  @change="initTemplate(2)"
                                  />
                                  <label for="cell"><span class="radiobox__text">스타일</span></label>
                                </span>
                              </div>
                          </div>
                          <div class="form-item-row" v-if="templateProp === 'desc'">
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">내용</span>
                                <div class="inner__input-item">
                                  <div class="input-item input-limit">
                                    <div class="textarea">
                                      <textarea maxlength="300" placeholder="내용을 입력해주세요."
                                      @input="e => form.Description.info.description = e.target.value"
                                      ref="descContent"></textarea>
                                      <div class="textarea-limit__text">
                                        <Emoji @input="onSelectEmoji($event, 'descContent')"/>
                                        <p>
                                          {{ form.Description.info.description.length }}/300자
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <TemplateTableReg
                          :tableInfo="form.Table.info"
                          v-if="templateProp === 'cell'"
                        />
                      </td>
                    </tr>
                    <!-- //템플릿 속성 -->
                    <!-- 아이템 -->
                    <!-- <tr v-if="templateType === 'textItem1' || templateType === 'textItem2'">
                      <th scope="row"><span class="form-item__label required">아이템</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">메인 제목</span>
                                <div class="inner__input-item">
                                  <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" class="input" maxlength="17"
                                        v-model="form.itemMainTitle"
                                        placeholder="최대 17자 까지 입력할 수 있습니다."
                                        ref="itemMainTitle"
                                      >
                                      <div class="input-limit__text">
                                        <Emoji @input="onSelectEmoji($event, 'itemMainTitle')" />
                                        <p>{{ form.itemMainTitle.length }}/17자</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input-box">
                                <span class="form-item__label">서브 제목</span>
                                <div class="inner__input-item">
                                  <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" class="input" maxlength="17"
                                        v-model="form.itemSubTitle"
                                        placeholder="최대 17자 까지 입력할 수 있습니다."
                                        ref="itemSubTitle"
                                      >
                                      <div class="input-limit__text">
                                        <Emoji @input="onSelectEmoji($event, 'itemSubTitle')" />
                                        <p>{{ form.itemSubTitle.length }}/17자</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input-box">
                                <span class="form-item__label">이미지</span>
                                <div class="inner__input-item">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="itemImgType" id="itemImgustom" v-model="form.itemImgType" value="custom" />
                                      <label for="itemImgustom">직접 등록</label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="itemImgType" id="itemBasicImage" v-model="form.itemImgType"  value="basicImage" />
                                      <label for="itemBasicImage">기본 이미지 사용</label>
                                    </span>
                                  </div>
                                  <div class="input-item">
                                    <span class="input">
                                      <input type="text" class="input" :value="form.itemImgFile" disabled>
                                    </span>
                                    <input type="file" id="fileUp" class="input blind"
                                    @change="onFileChanged">
                                    <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                                  </div>
                                  <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr> -->
                    <!-- 버튼 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">버튼</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="btnUse" id="btnUseN" value="N" v-model="form.Buttons.use" @change="buttonUseCheck"/>
                                  <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="btnUse" id="btnUseY" value="Y" v-model="form.Buttons.use" @change="buttonUseCheck"/>
                                  <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                        </div>
                        <TemplateButtonReg
                          :buttonInfo="form.Buttons.info"
                          v-if="form.Buttons.use === 'Y'"
                        />
                      </td>
                    </tr>
                    <!-- // 버튼 -->
                  </tbody>
                </table>
              </div>
              <!-- <div class="form-btm__text">
                <template v-if="templateType === 'textTitleCustom1' || templateType === 'textTitleCustom2'">
                  <p class="guide-text black">&middot; 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요. 예) {{이름}}, {{date}}</p>
                  <p class="guide-text black">&middot; 특수문자, 공란, 줄바꿈 그리고 {{description}} 변수명 사용 불가합니다.</p>
                  <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                </template>
                <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                <div class="checkbox">
                  <input type="checkbox" id="agreeChk" value="form.agree"/>
                  <label for="agreeChk"><span class="checkbox__text">정보성 메시지만 보낼 수 있으며 광고 등 정책에 위배되는 메시지 발송 시 템플릿 사용이 중지될 수 있음을 동의합니다.</span></label>
                </div>
              </div> -->
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class="brand-aside">
            <ChatEmulator
              :templateData="templateData"
            />
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
import ChatEmulator from '@/views/brand/message/components/ChatEmulator.vue'
import TemplateButtonReg from '@/views/brand/message/components/TemplateButtonReg.vue'
import TemplateTableReg from '@/views/brand/message/components/TemplateTableReg.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import { textTemplate } from '@/views/brand/message/templateSampleData.js'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Emoji,
    Dropdown,
    ChatEmulator,
    TemplateButtonReg,
    TemplateTableReg
  },
  data() {
    return {
      textTemplate,
      templateType: 'textTitle1',
      templateName: '',
      templateData: [],
      templateProp: 'desc',
      form: {
        MainTitle: {
          info: {
            mainTitle: '',
            titleType: '',
            varUse: 'Y',
            logoUse: 'Y',
            logoFile: '',
            logoUrl: ''
          }
        },
        Description: {
          info: {
            description: ''
          }
        },
        Table: {
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
          info: {
            bgColor: '#0C22E1',
            buttonNum: 1,
            buttons: []
          }
        }
      },

      titleOptions: [
        {
          label: '승인',
          value: 'F001'
        },
        {
          label: '입금',
          value: 'F002'
        },
        {
          label: '출금',
          value: 'F003'
        },
        {
          label: '출고',
          value: 'F004'
        }
      ]
    }
  },
  mounted() {
    this.initTemplate(3)
    this.buttonUseCheck()
  },
  methods: {
    initTemplate(templateNum) {
      this.templateData = this.textTemplate[templateNum]
      this.templateData.forEach((item) => {
        let type = item.type
        Object.keys(item.info).forEach((key) => {
          item.info[key] = ''
        })
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
    },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    }
  }
}
</script>
