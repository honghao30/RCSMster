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
                        <span class="text">텍스트 템플릿</span>
                      </td>
                    </tr>
                    <!-- //템플릿 유형 -->
                    <!-- 템플릿 유형 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 이름</span></th>
                      <td>
                        <div class="form-item__content">
                          <p>** 퍼블 화면 확인을 위해서 라디오 버튼을 임시로 넣어두었습니다.</p>
                          <div class="form-item-row">
                            <span class="radiobox">
                              <input type="radio" name="templateType" id="titleChoice1" v-model="templateType" value="titleChoice1" />
                              <label for="titleChoice1">타이틀 선택형1</label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="templateType" id="titleChoice2" v-model="templateType" value="titleChoice2" />
                              <label for="titleChoice2">타이틀 선택형2</label>
                            </span>
                          </div>
                          <div class="form-item-row">
                            <span class="radiobox">
                              <input type="radio" name="templateType" id="titleFree1" v-model="templateType" value="titleFree1" />
                              <label for="titleFree1">타이틀 자유형1</label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="templateType" id="titleFree2" v-model="templateType" value="titleFree2" />
                              <label for="titleFree2">타이틀 자유형2</label>
                            </span>
                          </div>
                          <div class="form-item-row">
                            <span class="radiobox">
                              <input type="radio" name="templateType" id="item1" v-model="templateType" value="item1" />
                              <label for="item1">아이템 강조형1</label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="templateType" id="item2" v-model="templateType" value="item2" />
                              <label for="item2">아이템 강조형2</label>
                            </span>
                          </div>
                        </div>
                        <!-- <span class="text">타이틀 선택형1</span>  -->
                      </td>
                    </tr>
                    <!-- //템플릿 유형 -->
                    <!-- 제목 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">제목</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <div class="input">
                                  <input type="text" placeholder="관리용으로 사용될 템플릿 이름입니다." v-model="form.templateTitle"/>
                                </div>
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //제목 -->
                    <!-- 메인 타이틀 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">메인 타이틀</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">로고</span>
                                <div class="inner__input-item">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="logo" id="custom" v-model="form.logoType" value="custom" />
                                      <label for="custom">직접 등록</label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="logo" id="basicImage" v-model="form.logoType"  value="basicImage" />
                                      <label for="basicImage">기본 이미지 사용</label>
                                    </span>
                                  </div>
                                  <div class="input-item">
                                    <span class="input">
                                      <input type="text" class="input" :value="form.logoFile" disabled>
                                    </span>
                                    <input type="file" id="fileUp" class="input blind"
                                    @change="onFileChanged">
                                    <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                                  </div>
                                  <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                                </div>
                              </div>
                              <div class="inner__input-box">
                                <span class="form-item__label">제목</span>
                                <div class="inner__input-item">
                                  <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" class="input" maxlength="17"
                                        v-model="form.mainTitle"
                                        placeholder="최대 17자 까지 입력할 수 있습니다."
                                        ref="mailTitle"
                                      >
                                      <div class="input-limit__text">
                                        <Emoji @input="onSelectEmoji($event, 'mainTitle')" />
                                        <p>{{ form.mainTitle.length }}/17자</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input-box" v-if="templateType === 'titleFree1' || templateType === 'titleFree2'">
                                <span class="form-item__label">변수</span>
                                <div class="inner__input-item">
                                  <div class="input-item">
                                    <Dropdown v-model="form.varSelect" placeholder="변수 선택"/>
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
                    <!-- // 메인 타이틀 -->
                    <!-- 아이템 -->
                    <tr v-if="templateType === 'item1' || templateType === 'item2'">
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
                    </tr>
                    <!-- 디스크립션 -->
                    <tr v-if="templateType === 'titleChoice1' || templateType === 'titleFree1' || templateType === 'item1'" >
                      <th scope="row"><span class="form-item__label required">디스크립션</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">제목</span>
                                <div class="inner__input-item">
                                  <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" class="input" maxlength="30"
                                        v-model="form.descTitle"
                                        placeholder="최대 30자 까지 입력할 수 있습니다."
                                        ref="descTitle"
                                      >
                                      <div class="input-limit__text">
                                        <Emoji @input="onSelectEmoji($event, 'descTitle')" />
                                        <p>{{ form.descTitle.length }}/30자</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input-box">
                                <span class="form-item__label">내용</span>
                                <div class="inner__input-item">
                                  <div class="input-item input-limit">
                                    <div class="textarea">
                                      <textarea maxlength="300" placeholder="내용을 입력해주세요."  v-model="form.descContent"
                                      ref="descContent"></textarea>
                                      <div class="textarea-limit__text">
                                        <Emoji @input="onSelectEmoji($event, 'descContent')"/>
                                        <p>
                                          {{ form.descContent.length }}/300자
                                        </p>
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
                    <!-- // 디스크립션 -->
                    <!-- 테이블 -->
                    <tr v-if="templateType === 'titleChoice2' || templateType === 'titleFree2' || templateType === 'item2'">
                      <th scope="row"><span class="form-item__label required">테이블</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">제목</span>
                                <div class="inner__input-item">
                                  <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" class="input" maxlength="17"
                                        v-model="form.tableTitle"
                                        placeholder="최대 17자 까지 입력할 수 있습니다."
                                        ref="tabelTitle"
                                      >
                                      <div class="input-limit__text">
                                        <Emoji @input="onSelectEmoji($event, 'descTitle')" />
                                        <p>{{ form.tableTitle.length }}/17자</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input-box">
                                <span class="form-item__label">내용</span>
                                <div class="inner__input-item">
                                  <div class="input-item">
                                    <Dropdown v-model="form.tableRowNum" :options="tableContentNumOption" @change="changetableRow"/>
                                  </div>
                                  <div class="input-item">
                                    <p class="item-title">테이블 1</p>
                                  </div>
                                  <div class="input-item">
                                    <div class="inner-table table__wrap">
                                      <table class="table table-list">
                                        <colgroup>
                                          <col width="62px"/>
                                          <col width="114px"/>
                                          <col />
                                        </colgroup>
                                        <thead>
                                          <tr>
                                            <th><span>라인</span></th>
                                            <th><span>배열</span></th>
                                            <th><span>내용</span></th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr v-for="(item, i) in form.tableContent" :key="i">
                                            <td>
                                              <span class="checkbox">
                                                <input type="checkbox" :id="`chkLine${i+1}`" v-model="item.tableLine"/>
                                                <label :for="`chkLine${i+1}`"></label>
                                              </span>
                                            </td>
                                            <td>
                                              <div class="flex-row">
                                                <span class="icon-radio">
                                                  <input type="radio" :id="`row${i+1}`" :name="`direction${i+1}`" v-model="item.direction" value="row" class="blind">
                                                  <label :for="`row${i+1}`">
                                                    <i class="icon-row"></i>
                                                  </label>
                                                </span>
                                                <span class="icon-radio">
                                                  <input type="radio" :id="`column${i+1}`" :name="`direction${i+1}`" v-model="item.direction" value="column" class="blind">
                                                  <label :for="`column${i+1}`">
                                                    <i class="icon-justify"></i>
                                                  </label>
                                                </span>
                                              </div>
                                            </td>
                                            <td>
                                              <div class="flex-row">
                                                <span class="input">
                                                  <input type="text" v-model="item.key"/>
                                                </span>
                                                <span class="input">
                                                  <input type="text" v-model="item.value"/>
                                                </span>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //테이블 -->
                    <!-- 버튼 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">버튼</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="btnUse" id="btnUseN" value="N" v-model="form.btnUse"/>
                                  <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="btnUse" id="btnUseY" value="Y" v-model="form.btnUse"/>
                                  <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                        </div>
                        <TemplateButtonReg
                          :buttonInfo="form.buttonInfo"
                          v-if="form.btnUse === 'Y'"
                        />
                      </td>
                    </tr>
                    <!-- // 버튼 -->
                  </tbody>
                </table>
              </div>
              <div class="form-btm__text">
                <template v-if="templateType === 'titleFree1' || templateType === 'titleFree2'">
                  <p class="guide-text black">&middot; 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요. 예) {{이름}}, {{date}}</p>
                  <p class="guide-text black">&middot; 특수문자, 공란, 줄바꿈 그리고 {{description}} 변수명 사용 불가합니다.</p>
                  <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                </template>
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
import TemplateButtonReg from '@/views/brand/message/components/TemplateButtonReg.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    TemplateButtonReg,
    Emoji,
    Dropdown
  },
  data() {
    return {
      templateType: 'titleChoice1',
      form: {
        templateTitle: '',
        logoType: 'custom',
        logoFile: '',
        mainTitle: '',
        descTitle: '',
        descContent: '',
        tableRowNum: 1,
        tableTitle: '',
        tableContent: [{
          line: false,
          direction: 'row',
          key: '',
          value: ''
        }],
        varSelect: '',
        itemMainTitle: '',
        itemSubTitle: '',
        itemImgType: '',
        itemImgFile: '',
        btnUse: 'N',
        buttonInfo: {
          bgColor: '#0C22E1',
          buttonNum: 1,
          buttons: [
            {
              buttonName: '',
              buttonType: ''
            }
          ]
        }
      },
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
      }]
    }
  },
  computed: {
  },
  methods: {
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
      this.form.logoFile = fileName
      this.url = URL.createObjectURL(file)
    },
    onSelectEmoji(e, target, idx) {
      let emoji = e
      let refName = target
      if (idx !== undefined) {
        this.$refs[refName][0].value += emoji
      } else {
        this.$refs[refName].value += emoji
      }
    }
  }
}
</script>

<style>
</style>
