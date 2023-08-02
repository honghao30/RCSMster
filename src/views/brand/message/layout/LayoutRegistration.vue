<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap layout-info__wrap">
        <PageTitle pagetitle="레이아웃 등록" />
        <div class="registration__wrap">
          <div class="registration-form__wrap">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label required">레이아웃 이름</span></th>
                      <td>
                        <div class="form-item__content is-emoji">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <div class="input">
                                <input type="text" class="input" maxlength="30"
                                  v-model="form.layoutName"
                                  placeholder="레이아웃 이름을 입력해주세요."
                                  ref="layoutName"
                                >
                                <div class="input-limit__text">
                                  <Emoji @input="onSelectEmoji($event, 'layoutName')"/>
                                  <p>{{ form.layoutName.length }}/30자</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p class="guide-text error">레이아웃 이름 입력해주세요.</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="type__radio-tab">
                <ul>
                  <li>
                    <input type="radio" id="sms" value="sms"
                    v-model="form.layoutType" class="blind"
                    @change="setCmpList"
                    />
                    <label for="sms">
                      <i class="icon-sms"></i>
                      <dl>
                        <dt class="tab-title">SMS<span> (40~45자)</span></dt>
                        <dd class="tab-text">간단한 알림이나 짧은 공지를 메시지로 발송</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="lms" value="lms"
                    v-model="form.layoutType" class="blind"
                    @change="setCmpList"
                    />
                    <label for="lms">
                      <i class="icon-lms"></i>
                      <dl>
                        <dt class="tab-title">LMS<span> (1,000자)</span></dt>
                        <dd class="tab-text">내용이 긴 메시지를 한번에 발송</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="mms" value="mms"
                    v-model="form.layoutType" class="blind"
                    @change="setCmpList" />
                    <label for="mms">
                      <i class="icon-mms"></i>

                      <dl>
                        <dt class="tab-title">MMS<span> (텍스트+사진첨부)</span></dt>
                        <dd class="tab-text">이미지와 텍스트를 혼합하여 메시지 발송</dd>
                      </dl>
                    </label>
                  </li>
                </ul>
              </div>
              <div class="message-cmp__list">
                <div class="cmp-item"
                  v-for="(item, i) in cmpList" :key="i" v-show="isVisible(item)"
                  >
                  <p class="cmp-title">{{ item.componentName }}</p>
                  <div class="cmp-box"
                    @click="addCmpItem(item)"
                    :class="{'active': item.isActive}"
                  >
                  <img :src="item.iconImgFileUrl" alt="">
                  </div>
                  <table class="table table-bodyonly form-table"
                    :class="{'col3': i % 3 === 2 }"
                    v-if="form.tableOptionActive && item.componentId.includes('Table')"
                  >
                    <colgroup>
                      <col width="196px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row"><span class="form-item__label">테이블 행수</span></th>
                        <td>
                          <div class="form-item__content is-emoji">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="tableRow" id="row5" value="5" v-model="form.table.rowNum"/>
                                  <label for="row5"><span class="radiobox__text">5개</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="tableRow" id="row10" v-model="form.table.rowNum" value="10" />
                                  <label for="row10"><span class="radiobox__text">10개</span></label>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label">1열</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">
                                    정렬
                                  </span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="align" value="left" id="alignLeft" v-model="form.table.fstRow.align"/>
                                        <label for="alignLeft"><span class="radiobox__text">좌측 정렬</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="align" value="right" id="alignRight" v-model="form.table.fstRow.align" />
                                        <label for="alignRight"><span class="radiobox__text">우측 정렬</span></label>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">
                                    글자 스타일
                                  </span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="fontStyle" value="regular" id="regular" v-model="form.table.fstRow.fontStyle"/>
                                        <label for="regular"><span class="radiobox__text">레귤러</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="fontStyle" value="bold" id="bold" v-model="form.table.fstRow.fontStyle"/>
                                        <label for="bold"><span class="radiobox__text">볼드</span></label>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label">2열</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">
                                    정렬
                                  </span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="align" value="left" id="alignLeft" v-model="form.table.sndRow.align"/>
                                        <label for="alignLeft"><span class="radiobox__text">좌측 정렬</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="align" value="right" id="alignRight" v-model="form.table.sndRow.align" />
                                        <label for="alignRight"><span class="radiobox__text">우측 정렬</span></label>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">
                                    글자 스타일
                                  </span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="fontStyle" value="regular" id="regular" v-model="form.table.sndRow.fontStyle"/>
                                        <label for="regular"><span class="radiobox__text">레귤러</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="fontStyle" value="bold" id="bold" v-model="form.table.sndRow.fontStyle"/>
                                        <label for="bold"><span class="radiobox__text">볼드</span></label>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th colspan="2" class="btuton__area">
                          <ButtonCmp
                              type="btn-blue-line"
                              size="medium"
                            >
                              저장
                            </ButtonCmp>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <table class="table table-bodyonly form-table"
                    :class="[{'col3': i % 3 === 2 }, {'col1': i % 3 === 0}]"
                    v-if="form.buttonOptionActive  && item.componentId.includes('Button')"
                  >
                    <colgroup>
                      <col width="166px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row"><span class="form-item__label">버튼</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="btnUse" v-model="form.buttons.btnUse" id="btnUseN" value="N"/>
                                  <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="btnUse" v-model="form.buttons.btnUse" id="btnUseY" value="Y"/>
                                  <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label">버튼 컬러</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="btnColor" id="basicColor" value="basic" v-model="form.buttons.btnColor"/>
                                  <label id="basicColor"><span class="radiobox__text">기본 컬러</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="btnColor" id="brand" value="brand" v-model="form.buttons.btnColor"/>
                                  <label id="brand"><span class="radiobox__text">브랜드 컬러</span>
                                  <a role="button" class="link">(브랜드 색 설정하기)</a>
                                  </label>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th colspan="2" class="btuton__area">
                          <ButtonCmp
                              type="btn-blue-line"
                              size="medium"
                            >
                              저장
                            </ButtonCmp>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class="brand-aside">
            <div class="guide">
              <p>레이아웃 등록이 어려우세요?</p>
              <a role="button" class="link"
                @click="isModalViewed = true, isSampleView = true"
              ><span>샘플 메시지</span></a>
            </div>
            <LayoutEmulator :cmpList="selectedCmpList" :compoLimit="compoLimit"/>
          </div>
          <!-- // 에뮬레이터 -->
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-blue"

          >저장</ButtonCmp>
        </div>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 샘플 팝업 -->
      <SampleListModal
        modalsize="Max1080"
        @closeModal="isModalViewed = false"
        v-if="isSampleView"
      />
      <!-- 상품유형을 변경하는 경우 출력되는 모달창 -->
      <ConfirmMsg
        v-if="isChangeTypeMsg"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          상품유형을 변경하는 경우 입력한 메시지가 삭제됩니다.<br>
          상품유형을 변경 하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            아니요
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            예
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import LayoutEmulator from '@/views/brand/message/emulator/LayoutEmulator.vue'
import SampleListModal from '@/views/brand/message/utils/SampleListModal.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import ModalView from '@/components/common/ModalView.vue'
// 상품유형을 변경하는 경우 출력되는 모달창
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import {
  componentList,
  compositionRuleByProdCd
} from '@/api/service/layout'

export default {
  components: {
    PageTitle,
    LayoutEmulator,
    BrandLnb,
    ButtonCmp,
    Emoji,
    ModalView,
    SampleListModal,
    ConfirmMsg
  },
  data() {
    return {
      compoLimit: 2,
      selectedCmpList: [{
        componentName: '',
        iconImgFileUrl: '',
        isActive: true
      }],
      form: {
        layoutType: 'sms',
        layoutName: '',
        tableOptionActive: false,
        buttonOptionActive: false,
        table: {
          rowNum: 5,
          fstRow: {
            align: 'left',
            fontStyle: 'regular'
          },
          sndRow: {
            align: 'left',
            fontStyle: 'regular'
          }
        },
        buttons: {
          btnUse: '',
          btnColor: ''
        }
      },
      componentLimit: {},
      isShowTableReg: false,
      isShowButtonReg: false,
      cmpList: [],
      // 상품유형을 변경하는 경우 출력되는 모달창
      isModalViewed: false,
      isSampleView: false,
      isChangeTypeMsg: true
    }
  },
  mounted() {
    this.initAddLayout()
    //this.cmpList = this.smsCmpList
  },
  methods: {
    async initAddLayout(){
      //0. 리스트 초기화
      this.cmpList = [];
      //1. 컴포넌트 리스트 가져오기
      const originList = await componentList()
      //2. 상품코드에 맞는 레이아웃 구성 조건 가져오기
      const ruleByProdCd = await compositionRuleByProdCd(this.form.layoutType)

      //3. 컴포넌트 등록 제한 갯수/레이아웃 상품코드 적용
      this.compoLimit = ruleByProdCd.result.rule.componentCount
      if(ruleByProdCd.result.rule.productCd === 'S'){
        this.form.layoutType = 'sms'
      }else if(ruleByProdCd.result.rule.productCd === 'L'){
        this.form.layoutType = 'lms'
      }else{
        this.form.layoutType = 'mms'
      }

      this.componentLimit= JSON.parse(ruleByProdCd.result.rule.componentLimit)

      //4. 상품코드에 따른 rule 이용 해서 cmpList에 들어갈 컴포넌트List 구성
      // - status > public 일것
      for (const key in this.componentLimit) {
          originList.result.componentList.forEach(compo => {
            if(compo.status === 'public' && compo.groupComponentId === key){
                compo.iconImgFileUrl = require('@/assets/images/message/' + compo.iconImgFileUrl)
              //sms에 titleDesc 는 포함 되면 안된다(임시 하드코딩, todo 필요)
              if (!(compo.componentId === 'CP-TitleDesc' && this.form.layoutType === 'sms')) {
                this.cmpList.push(compo);
              }
            }
          }
        )
      }
      console.log(this.cmpList)
    },
    setCmpList($event) {
      this.isModalViewed = true
      this.isChangeTypeMsg = true
      let target = $event.target.value
      this.form.layoutType = target
      this.initAddLayout()
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
    addCmpItem(cmp) {

      let activeIndex = this.selectedCmpList.length - 1

      this.selectedCmpList.forEach((item, i) => {
        if (item.isActive === true) {
          activeIndex = i
        }
      })

      if (cmp.componentId.includes('Table')) {
        this.form.tableOptionActive = true
        this.form.buttonOptionActive = false
      }else if(cmp.componentId.includes('Button')){
        this.form.tableOptionActive = false
        this.form.buttonOptionActive = true
      }else{
        this.form.tableOptionActive = false
        this.form.buttonOptionActive = false
      }

      let newCompo = {
        componentId: cmp.componentId,
        componentName: cmp.componentName,
        iconImgFileUrl: cmp.iconImgFileUrl,
        headerYn: cmp.headerYn,
        bodyYn: cmp.bodyYn,
        footerYn: cmp.footerYn,
        isActive: true
      }

      //활성화 된 것을 교체
      this.selectedCmpList.splice(activeIndex, 1, newCompo)

      //버튼의 경우, 
      // 1. 위에 버튼을 제외한 컴포넌트가 있는지
      // 2. selectedCmpList 에 버튼 갯수가 제한과 맞는지 확인 후
      // 3. 실제 push

      // if (this.selectedCmpList.length - 1 === activeIndex) {
      //   this.selectedCmpList.push(cmpItem)
      // }
    },
    isVisible(compo){
      //맨 처음 리스트의 index 경우, headerYN / bodyYn 이 Y 인 것만 보여준다.
      //버튼은 다른 컴포넌트가 this.selectedCmpList에 없을 때 보여지지 않는다.

      return true
    },
    // 유형 변경 메시지 닫기
    closeMsg () {
      this.isModalViewed = false
      this.isChangeTypeMsg = false
    }
  }
}
</script>

<style>
</style>
