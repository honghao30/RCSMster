<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 소식 등록" />
        <div class="feed__wrap">
          <div class="feed__inner">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="160px">
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label required">타입선택</span></th>
                      <td>
                          <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="gallery" value="gallery" v-model="form.type"/>
                                    <label for="gallery"><span class="radiobox__text">갤러리 타입</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="sharing" value="sharing" v-model="form.type"/>
                                    <label for="sharing"><span class="radiobox__text">쉐어링 타입</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="slideView" value="slideView" v-model="form.type"/>
                                    <label for="slideView"><span class="radiobox__text">슬라이드타입</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">제목</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <span class="input">
                                <input type="text" class="input" maxlength="40" placeholder="제목을 입력해주세요." v-model="form.feedTitle">
                                <p class="input-limit__text">
                                  /40자
                                </p>
                              </span>
                            </div>
                            <ButtonCmp
                                  type="btn-default-line"
                              >특수문자
                            </ButtonCmp>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <template v-if="form.type !== 'slideView'">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                      <col width="160px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row"><span class="form-item__label">내용</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="textarea">
                                  <textarea maxlength="200" placeholder="내용을 입력해주세요."  v-model="form.feedContent"></textarea>
                                  <div class="textarea-limit__text">
                                    <p>
                                      {{ form.feedContent.length }}/200자
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <ButtonCmp
                                  type="btn-default-line"
                              >특수문자
                              </ButtonCmp>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="form.type == 'gallery'">
                        <th scope="row">
                          <span class="form-item__label required">이미지</span>
                        </th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="input">
                                  <input type="text" disabled placeholder="이미지를 등록해주세요.">
                                </span>
                                <ButtonCmp
                                  type="btn-default-line"
                                >
                                  이미지 등록 / 편집
                                </ButtonCmp>
                              </div>
                              <p class="guide-text black">&middot; 사이즈 : 388 X 388px ~ 1080 X 1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 5MB)</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="form.type == 'sharing'">
                        <th scope="row"><span class="form-item__label required">연결 URL</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="input">
                                  <input type="text">
                                </span>
                                <ButtonCmp
                                  type="btn-default-line"
                                >
                                  적용
                                </ButtonCmp>
                              </div>
                            </div>
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
                                    <input type="radio" name="btnUse" id="btnUseN" value="btnUseN" v-model="form.btnUse"/>
                                    <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseY" value="btnUseY" v-model="form.btnUse"/>
                                    <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                          <div class="form-item__content" v-if="form.btnUse == 'btnUseY'">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <span class="input">
                                  <input type="text" class="input" maxlength="17" placeholder="버튼명을 입력하세요." v-model="form.btnCnt.btnName">
                                  <p class="input-limit__text">
                                    {{ }}/17자
                                  </p>
                                </span>
                              </div>
                              <ButtonCmp
                                    type="btn-default-line"
                                >특수문자
                              </ButtonCmp>
                            </div>
                            <div class="form-item-row">
                              <div class="input-item">
                                <Dropdown :options=btnTypeOption v-model="form.btnCnt.btnType" placeholder="선택"></Dropdown>
                              </div>
                            </div>
                            <div class="form-item-row">
                              <ButtonCmp
                                    type="btn-default-line"
                                >버튼추가
                              </ButtonCmp>
                            </div>
                            <div class="form-item-row">
                              <ul class="button-list">
                                <li v-for="(btn, k) in form.btnCnt" :key="k">
                                  <span class="button-name">{{ btn.btnName }}</span>
                                  <a role="button" class="btn-del">x<span class="blind">삭제</span></a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label required">게시방법</span></th>
                        <td>
                            <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="publish" id="publish" value="publish" v-model="form.publishType"/>
                                      <label for="publish"><span class="radiobox__text">즉시게시</span></label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="publish" id="resv" value="resv" v-model="form.publishType"/>
                                      <label for="resv"><span class="radiobox__text">예약게시</span></label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="publish" id="hidden" value="hidden" v-model="form.publishType"/>
                                      <label for="hidden"><span class="radiobox__text">숨김(URL)게시</span></label>
                                    </span>
                                  </div>
                                  <p class="guide-text black">&middot; [숨김 게시]는 브랜드 소식내에는 노출되지 않습니다.</p>
                                  <p class="guide-text black">&middot; RCS 메시지 발송 시, 메시지에 URL을 기재하는 용도로 사용됩니다. </p>
                                  <p class="guide-text black">&middot; [저장] 또는 [비공개] 상태일 경우, [게시] 상태가 아니므로 URL에 연결된 소식을 볼 수 없습니다.</p>
                                  <p class="guide-text black">&middot; [예약 게시]는 지정된 [게시]상태로 전환되므로 [게시] 이전에는 URL에 연결된 소식을 볼 수 없습니다.</p>
                                </div>
                            </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label">상단고정</span></th>
                        <td>
                            <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="checkbox">
                                      <input type="checkbox" id="pinY" v-model="form.pinYn"/>
                                      <label for="pinY"><span class="radiobox__text">상단 고정 등록</span></label>
                                    </span>
                                  </div>
                                </div>
                            </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </template>
                <template v-else>
                  <div class="slide-card__wrap">
                    <div class="slide-card__inner">
                      <draggable
                        v-model="slideData"
                        class="card-list"
                        draggable=".card--draggable"
                      >
                        <div
                          v-for="(slide, j) in slideData" :key="j"
                          class="card-item"
                          :class="[{'active': slide.isActive}, {'card--draggable': isCardEdit}]"
                          @click="slideActive(j)"
                        >
                          <span v-text="`카드${slide.slideIndex}`" class="card-text"></span>
                          <a role="button" @click="removeCard(j)" class="btn-del" v-if="isCardEdit
                          ">삭제</a>
                        </div>
                      </draggable>
                      <a role="button" class="btn-add" @click="addSlide(slideData.length)">+<span class="blind">추가</span></a>
                    </div>
                    <a role="button" class="btn small btn-line" @click="isCardEdit = true" v-if="!isCardEdit">편집</a>
                    <a role="button" class="btn small btn-blue" v-if="isCardEdit" @click="saveCardEdit">저장</a>
                  </div>
                  <template v-for="(slide, j) in slideData">
                    <table class="table table-bodyonly form-table" v-if="slide.isActive" :key="j">
                      <colgroup>
                        <col width="160px">
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
                                    <input type="radio" name="slideType" id="slideTypeImg" value="gallery" v-model="slide.slideType"/>
                                    <label for="slideTypeImg"><span class="radiobox__text">이미지</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="slideType" id="url" value="slideTypeUrl" v-model="slide.slideType"/>
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
                                    <input type="text" class="input" maxlength="40" placeholder="제목을 입력해주세요." v-model="slide.slideTitle">
                                    <p class="input-limit__text">
                                      {{ slide.slideTitle.length }}/34자
                                    </p>
                                  </span>
                                </div>
                                <ButtonCmp
                                      type="btn-default-line"
                                  >특수문자
                                </ButtonCmp>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row"><span class="form-item__label required">슬라이드 내용</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="textarea">
                                    <textarea maxlength="200" placeholder="내용을 입력해주세요."  v-model="slide.slideDescription"></textarea>
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
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </template>
              </div>
            </form>
          </div>
          <div class="brand-aside sticky">
            <TabCmp tabClass="brand-tab"  size="small">
              <TabItem title="상세보기">
                <div class="feed-emulator__wrap">
                  <div class="feed-emulator">
                    <div class="emulator-header">
                      <div class="emulator-header__inner">
                        <button class="btn-back"><span class="blind">이전으로</span></button>
                        <div class="profile">
                          <div class="profile__image">
                            <img src="@/assets/images/dummy/brand_logo.png" alt="">
                          </div>
                          <p class="brand-name">SYSTEM STUDIOS</p>
                        </div>
                      </div>
                    </div>
                    <div class="emulator-body">
                      <p class="feed-date">4월 19일 오후 3:00</p>
                      <h4 class="feed-title">
                        <span v-if="form.feedTitle">{{ form.feedTitle }}</span>
                        <span v-else>제목을 입력해주세요.</span>
                      </h4>
                      <p class="feed-content" v-if="form.type !== 'slideView'">
                        <span v-if="form.feedContent" v-html="form.feedContent"></span>
                        <span v-else>내용을 입력해주세요.</span>
                      </p>
                      <div class="preview-gallery" v-if="form.type === 'gallery'">
                        <div class="item--none">
                          <p class="img">이미지를 등록해주세요.</p>
                        </div>
                      </div>
                      <div class="preview-sharing" v-if="form.type === 'sharing'">
                        <div class="item--none">
                          <p class="url">URL 입력해주세요.</p>
                        </div>
                      </div>
                      <div class="preview-slideview" v-if="form.type === 'slideView'">
                        <div class="preview__inner">
                          <swiper
                            :options="swiperOption"
                            ref="mySwiper"
                          >
                            <swiper-slide v-for="(slide, i) in slideData" :key="i">
                                <div class="" v-if="slide.slideType == 'gallery'">
                                  <div class="item--none">
                                    <p class="img">이미지를 등록해주세요.</p>
                                  </div>
                                </div>
                                <div class="slide-content">
                                  <p class="title">
                                    <span v-if="slide.slideTitle">{{ slide.slideTitle }}</span>
                                    <span v-else>슬라이드 제목을 입력해주세요.</span>
                                  </p>
                                  <p class="description">
                                    <span v-if="slide.slideDescription">{{ slide.slideDescription }}</span>
                                    <span v-else>슬라이드 내용을 입력해주세요.</span>
                                  </p>
                                </div>
                            </swiper-slide>
                          </swiper>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabItem>
              <TabItem title="소식메인 보기">
              </TabItem>
            </TabCmp>
            <div class="preview-box">

            </div>
          </div>
        </div>
        <div class="top-notice--gray">
          <p>- 브랜드 소식은 100개까지 작성할 수 있으며, 최대 보존 기간은 1년 입니다.</p>
          <p>- 1년 경과 시, 자동 삭제됩니다. (단, 상단고정 소식은 예외)</p>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-line"
          >임시 저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
          >등록</ButtonCmp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import PageTitle from '@/components/common/PageTitle.vue'
import draggable from 'vuedraggable'
import 'swiper/css/swiper.css'
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import TabItem from '@/components/common/TabItem.vue'
import TabCmp from '@/components/common/TabCmp.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'

export default {
  components: {
    PageTitle,
    draggable,
    Swiper,
    SwiperSlide,
    TabItem,
    TabCmp,
    BrandLnb,
    ButtonCmp,
    Dropdown
  },
  data() {
    return {
      form: {
        type: 'gallery',
        feedTitle: '',
        feedContent: '',
        btnUse: '',
        publishType: '',
        pinYn: false,
        btnCnt: [{
          btnName: 'url 연결하기',
          btnType: 'url'
        }]
      },
      slideData: [{
        slideIndex: '1',
        slideType: 'gallery',
        slideTitle: '',
        slideDescription: '',
        isActive: true
      }],
      btnTypeOption: [
        {
          label: 'URL 연결',
          value: 'url'
        },
        {
          label: 'App 연결',
          value: 'app'
        },
        {
          label: '대화방 연결',
          value: 'chat'
        },
        {
          label: '전화걸기',
          value: 'call'
        }
      ],
      slideActiveIndex: 0,
      isCardEdit: false,
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 'auto'
      }
    }
  },
  created() {

  },
  methods: {
    addSlide () {
      let slideData = {
        slideIndex: (this.slideData.length + 1),
        slideType: 'gallery',
        slideTitle: '',
        slideDescription: '',
        isActive: false
      }
      this.slideData.push(slideData)
    },
    removeCard (idx) {
      if (this.slideData.length > 1) {
        this.slideData.splice(idx, 1)
      }
    },
    slideActive (idx) {
      this.slideActiveIndex = idx
      this.slideData.forEach((slide, index) => {
        if (idx !== index) {
          slide.isActive = false
        } else {
          slide.isActive = true
        }
      })
    },
    saveCardEdit() {
      this.slideData.forEach((slide, index) => {
        if (index === 0) {
          slide.isActive = true
        } else {
          slide.isActive = false
        }
      })
      this.isCardEdit = false
    }
  }
}
</script>

<style>
</style>
