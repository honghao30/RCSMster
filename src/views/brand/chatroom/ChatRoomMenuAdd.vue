<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="대화방 등록" />
        <div class="chatroom__wrap">
          <div class="chatroom-registration">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px" />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label">사용여부</span>
                      </th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="switch switch-status" role="switch">
                              사용 여부
                              <input type="checkbox" id="switch" v-model="form.switch" checked>
                              <label class="switch__core" for="switch"></label>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">대화방</span>
                      </th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="chatroom__select--top">
                              <Dropdown :options="dropdownOptions" @input="isChange"
                              >
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="card-box">
                      <td colspan="2">
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="slide-card__wrap">
                              <div class="slide-card__inner">
                                <draggable
                                  v-model="form.slideData"
                                  class="card-list"
                                  draggable=".card--draggable"
                                >
                                  <div
                                    v-for="(slide, j) in form.slideData" :key="j"
                                    class="card-item"
                                    :class="[{'active': slide.isActive}, {'card--draggable': isSlideCardEdit}]"
                                    @click="slideActive(j)"
                                  >
                                    <span v-text="`카드${slide.slideIndex}`" class="card-text"></span>
                                    <a role="button" @click="removeSlide(j)" class="btn-del" v-if="isSlideCardEdit
                                    "><span class="blind">삭제</span></a>
                                  </div>
                                </draggable>
                                <a role="button" class="btn-add" @click="addSlide(form.slideData.length)" v-if="form.slideData.length < 5">+<span class="blind">추가</span></a>
                              </div>
                              <a role="button" class="btn small btn-line" @click="isSlideCardEdit = true" v-if="!isSlideCardEdit">편집</a>
                              <a role="button" class="btn small btn-blue" v-if="isSlideCardEdit" @click="saveCardEdit">저장</a>
                              <div class="guide-box" v-if="isSlideCardEdit">
                                <p class="guide-text black">&middot; 선택한 슬라이드는 드래그로 순서 변경이 가능합니다.</p>
                                <p class="guide-text black">&middot; 첫번째로 위치한 카드는 삭제 불가합니다.</p>
                              </div>
                            </div>
                            <template v-for="(slide, j) in form.slideData">
                              <table class="table table-bodyonly form-table" v-if="slide.isActive" :key="j">
                                <colgroup>
                                  <col width="196px">
                                  <col />
                                </colgroup>
                                <tbody>
                                  <tr>
                                    <th scope="row"><span class="form-item__label required">슬라이드 유형</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row">
                                          <div class="input-item">
                                            <span class="radiobox">
                                              <input type="radio" name="slideType" id="slideTypeImg" value="image" v-model="slide.slideType" :disabled="isSlideCardEdit"/>
                                              <label for="slideTypeImg"><span class="radiobox__text">이미지</span></label>
                                            </span>
                                            <span class="radiobox">
                                              <input type="radio" name="slideType" id="slideTypeUrl" value="url" v-model="slide.slideType" :disabled="isSlideCardEdit"/>
                                              <label for="slideTypeUrl"><span class="radiobox__text">URL 연결</span></label>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span class="form-item__label required">슬라이드 제목</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row">
                                          <div class="input-item input-limit">
                                            <span class="input">
                                              <input type="text" class="input" maxlength="40" placeholder="제목을 입력해주세요." v-model="slide.slideTitle"
                                              :disabled="isSlideCardEdit"
                                              >
                                              <p class="input-limit__text">
                                                {{ slide.slideTitle.length }}/34자
                                              </p>
                                            </span>
                                          </div>
                                          <ButtonCmp
                                                type="btn-default-line"
                                                :disabled="isSlideCardEdit"
                                            >특수문자
                                          </ButtonCmp>
                                        </div>
                                        <p class="guide-text error"  v-if="slideTitleErrorMsg">슬라이드 제목을 입력해주세요.</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span class="form-item__label required">슬라이드 내용</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row">
                                          <div class="input-item input-limit">
                                            <div class="textarea"
                                              :class="{ 'disabled' : isSlideCardEdit }"
                                            >
                                              <textarea maxlength="200" placeholder="내용을 입력해주세요."  v-model="slide.slideDescription"
                                              :disabled="isSlideCardEdit"
                                              ></textarea>
                                              <div class="textarea-limit__text">
                                                <p>
                                                  {{ slide.slideDescription.length }}/126자
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <ButtonCmp
                                                type="btn-default-line"
                                            >특수문자
                                          </ButtonCmp>
                                        </div>
                                        <p class="guide-text error"  v-if="slideContentErrorMsg">슬라이드 내용을 입력해주세요.</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr v-if="slide.slideType == 'image'">
                                    <th scope="row">
                                      <span class="form-item__label required">이미지</span>
                                    </th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row">
                                          <div class="input-item">
                                            <span class="input"><input type="text" :value="filesName" disabled placeholder="이미지를 등록해주세요."></span>
                                            <input type="file" id="fileUp" class="input" @change="onFileChanged" :disabled="isSlideCardEdit">
                                            <label for="fileUp"
                                              class="btn btn-default-line"
                                              :class="{'inactive' : isSlideCardEdit }"
                                            >파일찾기</label>
                                          </div>
                                          <p class="guide-text black">&middot; 이미지 사이즈 / 용량 : 700px * 700px, 최대 1080px * 1080px / 최대 3MB</p>
                                          <p class="guide-text black">&middot; 파일종류: JPG, PNG, GIF</p>
                                        </div>
                                        <p class="guide-text error"  v-if="slideImageErrorMsg">슬라이드 이미지를 등록해주세요.</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr v-if="slide.slideType == 'url'">
                                    <th scope="row"><span class="form-item__label required">연결 URL</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row">
                                          <div class="input-item">
                                            <span class="input">
                                              <input type="text" :disabled="isSlideCardEdit" v-model="slide.url" placeholder="http://형식으로 입력해주세요.">
                                            </span>
                                            <ButtonCmp
                                              type="btn-default-line"
                                            >
                                              적용
                                            </ButtonCmp>
                                          </div>
                                        </div>
                                        <p class="guide-text black">&middot; 연결 URL은 You Tube만 등록 가능합니다.</p>
                                        <p class="guide-text black">&middot; 연결된 URL의 타이틀과 대표이미지(썸네일)가 자동으로 노출됩니다.</p>
                                        <p class="guide-text error"  v-if="slideUrlErrorMsg">Youtube URL 주소만 입력해주세요.</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span class="form-item__label required">버튼</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row">
                                          <div class="input-item">
                                            <span class="radiobox">
                                              <input type="radio" name="btnUse" id="btnUseN" value="btnUseN" v-model="slide.btnUse" :disabled="isSlideCardEdit"/>
                                              <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                            </span>
                                            <span class="radiobox">
                                              <input type="radio" name="btnUse" id="btnUseY" value="btnUseY" v-model="slide.btnUse" :disabled="isSlideCardEdit"/>
                                              <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <template v-if="slide.btnUse == 'btnUseY'">
                                        <feedButtonReg :Buttons="slide.buttons" />
                                      </template>
                                      <p class="guide-text error"  v-if="slideBtnErrorMsg">슬라이드 버튼을 입력해주세요.</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </template>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <div class="chatroom-emulator sticky">
            <div class="exception-txt">
              <router-link to="">대화방 등록 가이드</router-link>
            </div>
            <ChatEmulator
              :chatName="form.chatTitle"
              :saftyMark="form.saftyMark"
              :allowMsg="form.allowMsg"
            />
          </div>
        </div>
        <div class="top-notice--gray gray-btn">
          <ul>
            <li>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</li>
            <li>- 등록 방법 변경 시, 입력한 데이터가 초기화됩니다.</li>
          </ul>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-blue-line"
              @click="saveTemp"
          >임시 저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
              :disabled = "isDisabled"
              @click="onSubmit"
          >승인 요청</ButtonCmp>
        </div>
      </div>
    </div>
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 대화방 변경 시 alert -->
      <ConfirmMsg
      v-if="isChatRoomChange"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          대화방을 변경하시면<br>
          입력중인 대화방 메뉴가 삭제됩니다.<br>
          대화방을 변경 하시겠습니까?
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
      <!-- //대화방 변경 시 alert -->
      </ModalView>
      <!-- //모달 -->
    </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import draggable from 'vuedraggable'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import 'swiper/css/swiper.css'
import 'emoji-picker-element'

export default {
  components: {
    PageTitle,
    draggable,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    ModalView,
    ConfirmMsg,
    ChatEmulator
  },
  data() {
    return {
      form: {
        switch: true,
        slideData: [{
          slideIndex: '1',
          slideType: 'image',
          slideTitle: '',
          slideDescription: '',
          isActive: true,
          imgFile: '',
          url: '',
          btnUse: 'btnUseN',
          buttons: [{
            btnName: '',
            btnType: '',
            url: '',
            app: {
              url: '',
              packageName: '',
              scheme: ''
            },
            chatRoom: '',
            call: '',
            isActive: true
          }]
        }]
      },
      dropdownOptions: [
        {
          label: 'SYSTEM STUDIOS',
          value: 'chatRoomMenu01'
        },
        {
          label: 'LANVIN COLLECTION',
          value: 'chatRoomMenu02'
        },
        {
          label: 'LANVIN COLLECTION',
          value: 'chatRoomMenu03'
        }
      ],
      isModalViewed: false,
      isChatRoomChange: false,
      selectedOption: 'chatRoomMenu01',
      slideActiveIndex: 0,
      isSlideCardEdit: false
    }
  },
  methods: {
    isChange(option) {
      this.isModalViewed = true
      this.isChatRoomChange = true
      if (this.selectedOption === option) {
        this.isModalViewed = false
        this.isChatRoomChange = false
      }
    },
    closeMsg () {
      this.isModalViewed = false
      this.isChatRoomChange = false
    },
    // 슬라이드 추가
    addSlide () {
      let slideData = {
        slideIndex: (this.form.slideData.length + 1),
        slideType: 'image',
        slideTitle: '',
        slideDescription: '',
        isActive: false,
        imgFile: '',
        url: '',
        btnUse: 'btnUseN',
        buttons: [{
          btnName: '',
          btnType: '',
          url: '',
          app: {
            url: '',
            packageName: '',
            scheme: ''
          },
          chatRoom: '',
          call: '',
          isActive: true
        }]
      }
      this.form.slideData.push(slideData)
    },
    // 슬라이드 삭제
    removeSlide (idx) {
      if (this.form.slideData.length > 1) {
        this.form.slideData.splice(idx, 1)
      }
    },
    // 슬라이드 활성화
    slideActive (idx) {
      this.slideActiveIndex = idx
      this.form.slideData.forEach((slide, index) => {
        if (idx !== index) {
          slide.isActive = false
        } else {
          slide.isActive = true
        }
      })
    },
    // 슬라이드 편집 활성화
    saveCardEdit() {
      this.form.slideData.forEach((slide, index) => {
        if (index === 0) {
          slide.isActive = true
        } else {
          slide.isActive = false
        }
      })
      this.isSlideCardEdit = false
    }
  }
}
</script>
