<template>
  <div class="brand__wrap brand_create">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="3" :stepTitle="stepTitle" />
        <PageTitleH3 titleh3="브랜드 홈 탭 설정"/>
        <form  ref="form">
          <div class="brand_wrap">
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="230px">
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label required">우선 노출 탭 설정</span></th>
                    <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" id="feed" name="'tab" value="FEED" v-model="brandDetail.initTab"><label for="feed">소식 탭 우선</label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" id="info" name="tab" value="INFO" v-model="brandDetail.initTab"><label for="info">정보 탭 우선</label>
                              </span>
                            </div>
                            <p class="guide-text error" v-if="tabErrorMsg" >우선 노출 탭 설정해주세요.</p>
                          </div>
                        </div>
                    </td>
                  </tr>
                  <tr class="brand_board" v-show="brandDetail.initTab === 'FEED'">
                    <th scope="row"><span class="form-item__label">알림판</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="text-item">
                          <div class="input-item">
                            <span class="radiobox">
                              <input type="radio" id="noticeUseN" v-model="brandDetail.alimpanUseYn" value="N"/>
                              <label for="noticeUseN"><span class="checkbox__text">미사용</span></label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" id="noticeUse" v-model="brandDetail.alimpanUseYn" value="Y"/>
                              <label for="noticeUse"><span class="checkbox__text">사용</span></label>
                            </span>
                          </div>
                          <template v-if="brandDetail.alimpanUseYn === 'Y'">
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row text-item">
                                <div class="input-item input-limit">
                                  <span class="text-item__title required">제목</span>
                                  <div class="input">
                                    <input type="text" class="input" maxlength="20" placeholder="알림 제목을 입력해주세요." v-model.trim="brandDetail.alimpanTitle"  @input="e => brandDetail.alimpanTitle = e.target.value" ref="title">
                                    <div class="input-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'title', j)"/>
                                      <p>{{ brandDetail.alimpanTitle ? brandDetail.alimpanTitle.length : 0 }}/20자</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="input-item input-limit input-item_start">
                                  <span class="text-item__title required">내용</span>
                                  <div class="textarea feed__textarea" >
                                    <textarea maxlength="150" placeholder="알림 내용을 입력해주세요." v-model.trim="brandDetail.alimpanContent" @input="e => brandDetail.alimpanContent = e.target.value" ref="content"></textarea>
                                    <div class="textarea-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'content', j)"/>
                                      <p>
                                        {{ brandDetail.alimpanContent ? brandDetail.alimpanContent.length : 0 }}/200자
                                      </p>
                                    </div>
                                    <p class="guide-text error" v-if="brandContentErrorMsg">알림 내용을 입력해주세요.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                        <button
                          class="btn-brandTip"
                          @click=onBrandTip
                          type="button"
                          :class="{open: isOpen}"
                          v-if="brandDetail.alimpanUseYn === 'Y'"
                        >
                          알림판 작성 가이드
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="brand_boardTip" v-show="brandDetail.initTab === 'FEED'">
                    <td colspan="2">
                      <div class="brand-tip__wrap" v-if="brandDetail.alimpanUseYn === 'Y' && isOpen">
                        <ul class="brand-tip__box">
                          <li>
                            <h5>1. 영업시간 안내</h5>
                            <div class="brand-tip__example">
                              <strong>영업시간 안내</strong>
                              <p>월~금 : 10:30 ~ 20:00 <br />
                                주말 및 공휴일은 휴무입니다.</p>
                            </div>
                            <ButtonCmp
                              type="btn-blue-line small"
                              @click=brandTip1
                            >적용</ButtonCmp>
                          </li>
                          <li>
                            <h5>2. 임시휴무 안내</h5>
                            <div class="brand-tip__example">
                              <strong>1월 23일 임시휴무 안내</strong>
                              <p>내부 인테리어로 임시휴무입니다. <br />
                                더 산뜻하게 다시 모시겠습니다!</p>
                            </div>
                            <ButtonCmp
                              type="btn-blue-line small"
                              @click=brandTip2
                            >적용</ButtonCmp>
                          </li>
                          <li>
                            <h5>3. 강조하고 싶은 내용 인재</h5>
                            <div class="brand-tip__example">
                              <strong>출시기념!</strong>
                              <p>단 7일간! 이 메시지를 보여주시는 <br />
                                분들께만 10% 할인!</p>
                            </div>
                            <ButtonCmp
                              type="btn-blue-line small"
                              @click=brandTip3
                            >적용</ButtonCmp>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr v-show="brandDetail.initTab === 'FEED'">
                    <th scope="row"><span class="form-item__label">소식</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="text-item">
                          <div class="text-item__content" v-for="item in brandDetail.menus">
                            <span class="text-item__title">{{ item.label }}</span>
                            <span class="text">{{ item.weblink }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-show="brandDetail.initTab === 'INFO'">
                    <th scope="row"><span class="form-item__label">정보</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row text-item">
                          <div class="input-item">
                            <span class="text-item__title required">웹사이트</span>
                            <span class="input">
                              <input type="text" class="input" placeholder="http://brandportal.com 형식으로 입력해주세요."  v-model="brandDetail.webSiteUrl" @input="brandDetail.webSiteUrl= ignoreChar($event, ['WHITESPACE', 'KOR'])">
                            </span>
                          </div>
                          <div class="input-item">
                            <span class="text-item__title required">이메일</span>
                            <span class="input">
                              <input type="text" class="input" placeholder="이메일 주소를 입력해주세요."   v-model="brandDetail.email" @input="brandDetail.email= ignoreChar($event, ['WHITESPACE', 'KOR'])">
                            </span>
                          </div>
                          <div class="input-item input-item_start">
                            <span class="text-item__title required">주소</span>
                            <div class="input">
                              <div class="form-item-row">
                                <div class="input-item post">
                                  <span class="input input-post"><input type="text" class="input" v-model="brandDetail.zipCode" disabled></span>
                                  <ButtonCmp
                                      type="btn-default-line"
                                      @click="openAddressPopup"
                                  >
                                    우편번호
                                  </ButtonCmp>
                                </div>
                              </div>
                              <div class="form-item-row">
                                <div class="input-item address">
                                  <span class="input input-info">
                                    <input type="text" class="input" v-model="brandDetail.roadAddress" disabled>
                                  </span>
                                  <span class="input input-info">
                                    <input type="text" class="input" v-model="brandDetail.detailAddress" disabled>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="guide-wrap" v-show="brandDetail.initTab === 'FEED'">
                    <th colspan="2">
                      <p class="guide-text black">&bull; 퀵 버튼 설정 시 입력한 정보가 동일하게 반영됩니다.</p>
                    </th>
                  </tr>

                </tbody>
              </table>
              <div class="agree__area">
                <span class="checkbox">
                  <input type="checkbox" id="agreeY" v-model="form.agree" value="agreeY"><label for="agreeY">메시지 발송 시 Free 템플릿은 정보성에 한하여 이용 가능합니다. 규정 위반시, 서비스 이용이 제한될 수 있습니다.</label>
                </span>
              </div>
            </div>
            <div class="brand-aside sticky">
              <div class="button__wrap button__brand">
                <button class="btn-brand">
                  브랜드 개설 가이드
                </button>
              </div>
              <BrandEmulator :brandData="brandDetail" :curTab="curTab"/>
            </div>
          </div>
        </form>
        <div class="button__wrap space-between">
          <a @click='goStep("prevStep")' class="btn btn-blue-line">이전</a>
        <div>
            <ButtonCmp
                type="btn-line"
                @click="onSubmit"
            >임시저장</ButtonCmp>
          </div>
        </div>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false">
      <ZipCode v-if="visibleAddressPopup" @closeModal="closeAddressPopup" />
    </ModalView>
  </div>
</template>
<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import Emoji from '@/components/common/Emoji.vue'
import ZipCode from '@/views/join/components/ZipCodeCustom.vue'
import ModalView from '@/components/common/ModalView'
import { ignoreChar } from '@/utils/check'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    StepList,
    BrandEmulator,
    Emoji,
    ModalView,
    ignoreChar,
    ZipCode
  },
  data() {
    return {
      form: {
        noticeInfo: [],
        name: '네스프레소',
        desc: '최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업',
        bgImgFileUrl: 'dummy/brand_image.png',
        profileImgFileUrl: 'dummy/brand_logo.png',
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111',
        moreInfo: 'http://www/portal.com',
        website: '',
        reservation: '',
        appdownload: '',
        chat: '',
        agree: '',
        title: '',
        content: ''
      },
      curTab: 'feed',
      noticeUse: 'useN',
      brandTip: false,
      isOpen: false,
      tabErrorMsg: false,
      webErrorMsg: false,
      resvErrorMsg: false,
      appErrorMsg: false,
      chatErrorMsg: false,
      brandContentErrorMsg: false,
      checkedMenus: [],
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
      isModalViewed: false,
      visibleAddressPopup: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  computed: {
    ...mapGetters('brand', {
      brandDetail: 'getBrandDetail'
    })
  },
  methods: {
    ignoreChar,
    ...mapActions({
      setAddress: 'brand/setAddress',
      setAlimpanInfo: 'brand/setAlimpanInfo'
    }),
    onBrandTip () {
      this.isOpen = !this.isOpen
    },
    brandTip1 () {
      this.setAlimpanInfo({
        title: '영업시간 안내',
        content: '월~금 : 10:30 ~ 20:00 주말 및 공휴일은 휴무입니다.'
      })
      this.form.title = '영업시간 안내'
      this.form.content = '월~금 : 10:30 ~ 20:00 주말 및 공휴일은 휴무입니다.'
    },
    brandTip2 () {
      this.setAlimpanInfo({
        title: '1월 23일 임시휴무 안내',
        content: '내부 인테리어로 임시휴무입니다. 더 산뜻하게 다시 모시겠습니다!'
      })
    },
    brandTip3 () {
      this.setAlimpanInfo({
        title: '출시기념!',
        content: '단 7일간! 이 메시지를 보여주시는 분들께만 10% 할인!'
      })
    },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    },

    onSubmit () {
      this.$emit('save')

      // if (this.form.tab === '') {
      //   this.tabErrorMsg = true
      //   return
      // }
      // if (this.form.noticeInfo.includes('website') && this.form.website === '') {
      //   this.webErrorMsg = true
      //   return
      // }
      // if (this.form.noticeInfo.includes('reservation') && this.form.reservation === '') {
      //   this.resvErrorMsg = true
      //   return
      // }
      // if (this.form.noticeInfo.includes('appdownload') && this.form.appdownload === '') {
      //   this.appErrorMsg = true
      //   return
      // }
      // if (this.form.noticeInfo.includes('chat') && this.form.chat === '') {
      //   this.chatErrorMsg = true
      //   return
      // }
      //this.$router.push('./brandcreatestep04')
    },
    noticeCheck (index, value) {
      this.isActiveNum = index
      this.noticeUse = value
    },
    goStep(page) {
      this.$emit(page)
    },
    closeModal () {
      this.isModalViewed = false
    },
    closeMsg  () {
      this.isModalViewed = false
    },
    openAddressPopup() {
      this.isModalViewed = true
      this.visibleAddressPopup = true
    },
    closeAddressPopup(data) {
      if (!jglib.isEmpty(data)) {
        this.setAddress({
          zipCode: data.zipNo,
          roadAddress: data.roadFullAddr,
          detailAddress: data.detail
        })
      }
      this.isModalViewed = false
      this.visibleAddressPopup = false
    }
  }
}
</script>
