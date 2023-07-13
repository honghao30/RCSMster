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
                    <!-- 템플릿 유형 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 상품</span></th>
                      <td>
                        <span class="text">LMS 템플릿(템플릿 유형)</span>
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
                    <!-- 타이틀 선택형 - 서술 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">타이틀</span></th>
                      <td>
                        <div class="form-item__content">

                          <!-- LMS 로고 등록 -->
                          <div class="form-item-row">
                            <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">로고</span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="logo" id="basicImage" v-model="form.logoType"  value="basicImage" />
                                        <label for="basicImage">기본 아이콘</label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="logo" id="custom" v-model="form.logoType" value="custom" />
                                        <label for="custom">직접 등록</label>
                                      </span>
                                    </div>
                                    <template v-if="form.logoType === 'basicImage'">
                                      <div class="input-item logoList">
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType1" value="logoType1"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType1"><span class="irtext">없음</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType1" value="logoType1"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType1"><span class="irtext">알림</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType2" value="logoType2"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType2"><span class="irtext">이벤트</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType3" value="logoType3"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType3"><span class="irtext">프로모션</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType4" value="logoType4"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType4"><span class="irtext">영수증</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">예약</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">쿠폰</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">승인</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">입금</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">출금</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">취소</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">주문</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">출고</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">배송</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">회원가입</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.title.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">인증</span></label>
                                        </span>
                                      </div>
                                    </template>
                                    <template  v-if="form.logoType === 'custom'">
                                      <div class="input-item w--full">
                                        <span class="input">
                                          <input type="text" class="input" :value="form.logoFile" disabled>
                                        </span>
                                        <input type="file" id="fileUp" class="input blind"
                                        @change="onFileChanged">
                                        <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                                      </div>
                                      <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                                    </template>
                                  </div>
                              </div>
                            </div>
                          </div>
                           <!-- // LMS 로고 등록 -->
                          <!-- 타이틀 자유형_서술-! -->
                          <div class="form-item-row">
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">제목</span>
                                <div class="inner__input-item">
                                  <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text"
                                        class="input"
                                        maxlength="30"
                                        ref="mainTitle"
                                        @input="e => form.MainTitle.info.mainTitle = e.target.value"
                                        placeholder="최대 17자 까지 입력할 수 있습니다."
                                      >
                                      <div class="input-limit__text">
                                        <Emoji @input="onSelectEmoji($event, 'mainTitle')" />
                                        <p>{{ form.MainTitle.info.mainTitle.length }}/30자</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //타이틀 선택형 - 서술 -->
                    <!-- 본문 사용 미 사용 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">본문</span></th>
                      <td>
                        <div class="form-item__content">
                          <!-- 설명 사용여부 -->
                          <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="userCont" checked id="DescriptionN" value="DescriptionN"
                                    v-model="form.Description.user"
                                  />
                                  <label for="DescriptionN">미사용</label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="userCont" id="DescriptionY" value="DescriptionY"
                                    v-model="form.Description.user"
                                  />
                                  <label for="DescriptionY">사용</label>
                                </span>
                              </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //본문 사용 미 사용 -->
                    <!-- 본문 서술 2단 일  경우 반복 되는 영역 -->
                    <template v-if="form.Description.user === 'DescriptionY'">
                      <tr>
                        <th scope="row"><span class="form-item__label required">본문</span></th>
                        <td>
                          <div class="form-item__content">
                            <!-- 소제목 사용여부 -->
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">소제목</span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="minititleuser" id="minititleN" value="minititleN"
                                          v-model="form.title.minititleuser"
                                        />
                                        <label for="minititleN">미사용</label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="minititleuser" id="minititleY" value="minititleY"
                                          v-model="form.title.minititleuser"
                                        />
                                        <label for="minititleY">사용</label>
                                      </span>
                                    </div>
                                    <template v-if="form.title.minititleuser === 'minititleY'">
                                      <div class="input-item input-limit">
                                        <div class="input">
                                          <input type="text"
                                            class="input"
                                            maxlength="8"
                                            ref="miniTitle"
                                            v-model="form.title.minititle"
                                            @input="e => form.title.minititle = e.target.value"
                                            placeholder="최대 17자 까지 입력할 수 있습니다."
                                          >
                                          <div class="input-limit__text">
                                            <Emoji @input="onSelectEmoji($event, 'miniTitle')" />
                                            <p>{{ form.title.minititle.length }}/8자</p>
                                          </div>
                                        </div>
                                      </div>
                                    </template>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- //소제목 사용여부 -->
                            <!-- 내용 사용 여부 -->
                            <template>
                              <div class="form-item-row">
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
                                      <p class="guide-text error">내용을 선택해주세요.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </template>
                            <!-- //내용 사용 여부 -->
                            <!-- 테이블 일 경우 -->
                            <template>
                              <TemplateTableReg
                                :tableInfo="form.Table.info"
                              />
                            </template>
                            <!-- // 테이블 일 경우 -->
                          </div>
                        </td>
                      </tr>
                      <!-- // 본문 -->
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
                    </template>
                  </tbody>
                </table>
              </div>
              <div class="form-btm__text">
                <!--
                <template v-if="templateType === 'textTitleCustom1' || templateType === 'textTitleCustom2'">
                  <p class="guide-text black">&middot; 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요. 예) {{이름}}, {{date}}</p>
                  <p class="guide-text black">&middot; 특수문자, 공란, 줄바꿈 그리고 {{description}} 변수명 사용 불가합니다.</p>
                  <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                </template>
                <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                 -->
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
            <ChatEmulator
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
// import Dropdown from '@/components/common/Dropdown.vue'
import ChatEmulator from '@/views/brand/message/components/ChatEmulator.vue'
import TemplateButtonReg from '@/views/brand/message/components/TemplateButtonReg.vue'
import TemplateTableReg from '@/views/brand/message/components/TemplateTableReg.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import { textTemplate } from '@/views/brand/message/templateData.js'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Emoji,
    // Dropdown,
    ChatEmulator,
    TemplateButtonReg,
    TemplateTableReg
  },
  data() {
    return {
      templateNameId: 'UBR.13L49F42Mo-8MwF1zkPHUj3xayCJsg3OcPv2',
      textTemplate,
      templateType: 'textTitle1',
      templateName: '',
      templateData: [],
      templateProp: 'desc',
      form: {
        title: {
          logoType: '',
          minititle: '',
          minititleuser: ''
        },
        stitle: '',
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
        Description: {
          user: 'DescriptionN',
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
          info: [{
            bgColor: '#2f77fb',
            btnEvent: '',
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
            bgColor: '#2f77fb',
            btnEvent: '',
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
      isSelectType: false,
      isFreeType: false

    }
  },
  mounted() {
    this.initTemplate(3)
    this.buttonUseCheck()
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
