<template>
  <div class="brand__wrap brand_create">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="3" :stepTitle="stepTitle" />
        <!-- 기획서 v1.0 수정('브랜드 홈 탭 설정' 문구 삭제) -->
        <form  ref="form" :model="form">
          <div class="brand_wrap">
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="196px"> <!-- 기획서 v1.0 수정 (width 값 수정) -->
                  <col />
                </colgroup>
                <tbody>
                  <tr class="bdBottom-bg"> <!-- 기획서 v1.0 수정 (bdBottom-bg 클래스 추가) -->
                    <th scope="row"><span class="form-item__label required">우선 노출 탭 설정</span></th>
                    <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" id="feed" name="tab" value="feed" v-model="form.curTab"><label for="feed">소식 탭 우선</label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" id="info" name="tab" value="info" v-model="form.curTab"><label for="info">정보 탭 우선</label>
                              </span>
                            </div>
                            <p class="guide-text error" v-if="tabErrorMsg" >우선 노출 탭 설정해주세요.</p>
                          </div>
                        </div>
                    </td>
                  </tr>
                  <!-- 기획서 v1.0 수정 (소식 탭 우선 클릭 → 영업정보 나타남 / 알림판 작성 가이드 버튼 삭제 및 처음부터 나타남) -->
                  <tr class="brand_board" v-if="form.curTab === 'feed'">
                    <th scope="row"><span class="form-item__label">영업정보</span></th> <!-- 기획서 v1.0 수정 (문구 수정) -->
                    <td>
                      <div class="form-item__content">
                        <div class="text-item">
                          <div class="input-item">
                            <span class="radiobox">
                              <input type="radio" name="noticeChk" id="noticeUseN" v-model="form.noticeUse" value="useN"/>
                              <label for="noticeUseN"><span class="checkbox__text">미사용</span></label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="noticeChk" id="noticeUse" v-model="form.noticeUse" value="use"/>
                              <label for="noticeUse"><span class="checkbox__text">사용</span></label>
                            </span>
                          </div>
                          <template v-if="form.noticeUse === 'useN'">
                          </template>
                          <template v-if="form.noticeUse === 'use'">
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row text-item">
                                <div class="input-item input-limit">
                                  <span class="text-item__title required">제목</span>
                                  <div class="input">
                                    <input type="text" class="input" maxlength="20" placeholder="알림 제목을 입력해주세요." v-model="form.title" ref="title">
                                    <div class="input-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'title', j)"/>
                                      <p>{{ form.title.length }}/20자</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="input-item input-limit input-item_start">
                                  <span class="text-item__title required">내용</span>
                                  <div class="textarea feed__textarea" >
                                    <textarea maxlength="150" placeholder="알림 내용을 입력해주세요." v-model="form.content" ref="content"></textarea>
                                    <div class="textarea-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'content', j)"/>
                                      <p>
                                        {{ form.content.length }}/200자
                                      </p>
                                    </div>
                                    <p class="guide-text error" v-if="brandContentErrorMsg">알림 내용을 입력해주세요.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="brand_boardTip" v-if="form.curTab === 'feed' && form.noticeUse === 'use'"> <!-- 기획서 v1.0 수정 (brand-tip__wrap 클래스 영업정보 사용 클릭 시에 나타나도록 v-if 추가) -->
                    <th></th> <!-- 기획서 v1.0 수정 (h 추가) -->
                    <td> <!-- 기획서 v1.0 수정 (colspan 삭제) -->
                      <div class="brand-tip__wrap"> <!-- 기획서 v1.0 수정 (v-if="isOpen" 삭제) -->
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
                            <h5>3. 강조하고 싶은 내용 안내</h5> <!-- 기획서 v1.0 수정 (문구 수정) -->
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
                  <!-- 기획서 v1.0 수정 (소식 탭 우선 클릭 → 노출정보 나타남 / 새로 추가작업) -->
                  <tr class="brand_feedinfo" v-if="form.curTab === 'feed'">
                    <th scope="row"><span class="form-item__label">노출정보</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="text-item">
                          <div class="text-item__content">
                            <span class="checkbox">
                              <input type="checkbox" id="check01" v-model="form.feedtel"/>
                              <label for="check01"><span class="checkbox__text text-item__title">전화번호</span></label>
                              <span class="text">010-5151-5151</span>
                            </span>
                          </div>
                          <div class="text-item__content">
                            <span class="checkbox">
                              <input type="checkbox" id="check02" v-model="form.feedinfo"/>
                              <label for="check02"><span class="checkbox__text text-item__title">정보</span></label>
                              <span class="text">http://www/portal.com</span>
                            </span>
                          </div>
                          <div class="text-item__content">
                            <span class="checkbox">
                              <input type="checkbox" id="check03" v-model="form.feedweb"/>
                              <label for="check03"><span class="checkbox__text text-item__title">웹사이트</span></label>
                              <span class="text">http://www.brandportal.com</span>
                            </span>
                          </div>
                          <div class="text-item__content">
                            <span class="checkbox">
                              <input type="checkbox" id="check04" v-model="form.feedsearch"/>
                              <label for="check04"><span class="checkbox__text text-item__title">포탈검색</span></label>
                              <span class="text">#브랜드명#</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- 기획서 v1.0 수정 (소식 탭 우선 클릭 → 노출정보 나타남 / 새로 추가작업) -->
                  <!-- 기획서 v1.0 수정 (정보 탭 우선 클릭 → 노출정보 나타남 / v-if="form.curTab === 'info' 추가) -->
                  <tr v-if="form.curTab === 'info'">
                    <th scope="row"><span class="form-item__label">노출정보</span></th> <!-- 기획서 v1.0 수정 (문구 수정) -->
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row text-item">
                          <div class="input-item">
                            <span class="text-item__title required">웹사이트</span>
                            <span class="input">
                              <input type="text" class="input" v-model="form.website">
                            </span>
                          </div>
                          <div class="input-item">
                            <span class="text-item__title required">이메일</span>
                            <span class="input">
                              <input type="text" class="input" v-model="form.email">
                            </span>
                          </div>
                          <div class="input-item input-item_start">
                            <span class="text-item__title required">주소</span>
                            <div class="input">
                              <div class="form-item-row">
                                <div class="input-item post">
                                  <span class="input input-post"><input type="text" class="input" v-model="form.postcode" disabled></span>
                                  <ButtonCmp
                                      type="btn-default-line"
                                      @click="findPost"
                                  >
                                    우편번호
                                  </ButtonCmp>
                                </div>
                              </div>
                              <div class="form-item-row">
                                <div class="input-item address">
                                  <span class="input input-info">
                                    <input type="text" class="input" v-model="form.addr1" disabled>
                                  </span>
                                  <span class="input input-info">
                                    <input type="text" class="input" v-model="form.addr2" disabled>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- // 기획서 v1.0 수정 (정보 탭 우선 클릭 → 노출정보 나타남 / v-if="form.curTab === 'info' 추가) -->
                  <tr class="guide-wrap">
                    <th colspan="2">
                      <p class="guide-text black">&bull; 퀵 버튼 설정 시 입력한 정보가 동일하게 반영됩니다.</p>
                    </th>
                  </tr>
                  <!-- <tr>
                    <th scope="row"><span class="form-item__label">소식 노출 정보 선택</span></th>
                    <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item check-list">
                              <span class="checkbox" v-for="(checkItem, i) in noticeInfoCheck" :key="i">
                                <input type="checkbox" :id="checkItem.value" :value="checkItem.value" @change="changeMenuCheck($event, checkItem.value)" v-model="checkedMenus" ><label :for="checkItem.value">{{ checkItem.label }}</label>
                              </span>
                            </div>
                          </div>
                          <p class="guide-text">※ 최대 3개까지 선택할 수 있습니다.</p>
                        </div>
                    </td>
                  </tr>
                  <tr v-if="form.noticeInfo.includes('call')">
                    <th scope="row"><span class="form-item__label required">전화하기</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input"  v-model="form.tel" disabled ></span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="form.noticeInfo.includes('website')">
                    <th scope="row"><span class="form-item__label required">웹사이트</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" placeholder="웹사이트 주소를 입력해주세요."  v-model="form.website" ></span>
                          </div>
                        </div>
                        <p class="guide-text error" v-if="webErrorMsg" >웹사이트 주소를 입력해주세요.</p>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="form.noticeInfo.includes('reservation')">
                    <th scope="row"><span class="form-item__label required">예약하기</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" placeholder="캐치테이블, 네이버 예약하기 등 예약업체 링크를 입력해주세요."  v-model="form.reservation" ></span>
                          </div>
                        </div>
                        <p class="guide-text error" v-if="resvErrorMsg" >캐치테이블, 네이버 예약하기 등 예약업체 링크를 입력해주세요.</p>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="form.noticeInfo.includes('appdownload')">
                    <th scope="row"><span class="form-item__label required">앱 다운로드</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" placeholder="안드로이드 앱 다운로드 주소를 입력해주세요.(APP Scheme)"  v-model="form.app" ></span>
                          </div>
                        </div>
                        <p class="guide-text error" v-if="appErrorMsg" >안드로이드 앱 다운로드 주소를 입력해주세요.(APP Scheme)</p>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="form.noticeInfo.includes('chat')">
                    <th scope="row"><span class="form-item__label required">상담채팅 연결</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" placeholder="브랜드에서 이용하는 상담 채팅 링크를 입력해주세요."  v-model="form.chat" ></span>
                          </div>
                        </div>
                        <p class="guide-text error" v-if="chatErrorMsg" >브랜드에서 이용하는 상담 채팅 링크를 입력해주세요.</p>
                      </div>
                    </td>
                  </tr> -->
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
              <BrandEmulator :brandInfoData="form" curTab="feed" :feedData="form"/>
            </div>
          </div>
        </form>
        <div class="button__wrap space-between">
          <router-link
            to="/brandcreatestep01"
            class="btn btn-line"
          >이전</router-link>
          <div>
            <ButtonCmp
                type="btn-line"
                @click="isModalViewed = true"
            >임시저장</ButtonCmp>
            <!-- 기획서 v1.0 수정 (문구 수정 / 승인요청 버튼 클릭 시 모달창 출력되어 모달창 추가 @click="onSubmit"변경 필요) -->
            <ButtonCmp
                type="btn-blue"
                @click="onSubmit"
            >승인 요청</ButtonCmp>
            <!-- // 기획서 v1.0 수정 (문구 수정 / 승인요청 버튼 클릭 시 모달창 출력되어 모달창 추가 @click="onSubmit"변경 필요) -->
          </div>
        </div>
      </div>
    </div>
    <!-- 기획서 v1.0 수정 (모달 추가) -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 임시저장 버튼 클릭 시 -->
      <ConfirmMsg
          @closeModal="isModalViewed = false"
        >
          <div class="msg" slot="msg">
            입력하신 정보가 임시저장 되었습니다.
          </div>
          <div class="button__wrap" slot="button">
              <ButtonCmp
              type="btn-blue"
              @click="closeMsg"
              >
                확인
              </ButtonCmp>
          </div>
      </ConfirmMsg>
      <!-- // 임시저장 버튼 클릭 시 -->
      <!-- 승인요청 버튼 클릭 시 -->
      <ConfirmMsg
          @closeModal="isModalViewed = false"
        >
          <div class="msg" slot="msg">
            입력하신 정보로 브랜드를 개설합니다.
          </div>
          <div class="button__wrap" slot="button">
            <!-- [닫기]선택 시, Alert 종료 후 브랜드 개설 페이지 유지 -->
            <ButtonCmp
              type="btn-line"
              @click="closeMsg"
              >
                닫기
              </ButtonCmp>
              <!-- [승인 요청]선택 시, 전화번호 사용 여부 Check
                    1.사용 가능한 전화번호인 경우 : 브랜드 개설 완료 페이지로 이동
                    2.사용중인 전화번호인 경우 [3]Alert 출력 -->
              <ButtonCmp
              type="btn-blue"
              @click="closeMsg"
              >
                승인요청
              </ButtonCmp>
          </div>
      </ConfirmMsg>
      <!-- // 승인요청 버튼 클릭 시 -->
      <!-- 승인요청 버트 클릭 시 > 모달창의 승인요청 버튼 클릭 시 > 사용중인 전화번호인 경우 > case1. 다른회사에서 사용 중인 경우 (기획서 v1.0 p.31 참고) -->
      <ConfirmMsg
          @closeModal="isModalViewed = false"
        >
          <div class="msg" slot="msg">
            해당 전화번호는 다른 기업에서<br>이미 사용중인 전화번호입니다.<br>등록하고자 하는 전화번호의 통신사실증명원을<br>RCS Biz Center 고객센터로 전달하여 발신번호 소유자<br>확인을 먼저 의뢰하신 후 진행해 주시기 바랍니다.
          </div>
          <div class="button__wrap" slot="button">
            <!-- [닫기]버튼 선택 시, 기본 정보 입력 STEP > 전화번호 영역 포커싱 + 유효성 체크 출력 -->
            <ButtonCmp
              type="btn-line"
              @click="closeMsg"
              >
                닫기
              </ButtonCmp>
          </div>
      </ConfirmMsg>
      <!-- // 승인요청 버트 클릭 시 > 모달창의 승인요청 버튼 클릭 시 > 사용중인 전화번호인 경우 > case1. 다른회사에서 사용 중인 경우 (기획서 v1.0 p.31 참고) -->
      <!-- 승인요청 버트 클릭 시 > 모달창의 승인요청 버튼 클릭 시 > 사용중인 전화번호인 경우 > case2. 같은회사에서 다른 브랜드가 사용중인 경우 (기획서 v1.0 p.31 참고) -->
      <ConfirmMsg
          @closeModal="isModalViewed = false"
        >
          <div class="msg" slot="msg">
            #브랜드명# 브랜드에서<br>이미 해당 전화번호를 등록하여 사용중입니다.<br>#브랜드명# 브랜드 담당자에게 문의하시기 바랍니다.
          </div>
          <div class="button__wrap" slot="button">
            <!-- [닫기]버튼 선택 시, 기본 정보 입력 STEP > 전화번호 영역 포커싱 + 유효성 체크 출력 -->
            <ButtonCmp
              type="btn-line"
              @click="closeMsg"
              >
                닫기
              </ButtonCmp>
          </div>
      </ConfirmMsg>
      <!-- // 승인요청 버트 클릭 시 > 모달창의 승인요청 버튼 클릭 시 > 사용중인 전화번호인 경우 > case2. 같은회사에서 다른 브랜드가 사용중인 경우 (기획서 v1.0 p.31 참고) -->
    </ModalView>
    <!-- // 기획서 v1.0 수정 (모달 추가) -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
// 기획서 v1.0 수정(PageTitleH3 미사용으로 인해 삭제 / ModalView, ConfirmMsg 추가)
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import Emoji from '@/components/common/Emoji.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    // 기획서 v1.0 수정(PageTitleH3 미사용으로 인해 삭제 / ModalView, ConfirmMsg 추가)
    ModalView,
    ConfirmMsg,
    StepList,
    BrandEmulator,
    Emoji
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
        curTab: 'feed',
        noticeUse: 'useN',
        title: '',
        content: ''
      },
      brandTip: false,
      isOpen: false,
      tabErrorMsg: false,
      webErrorMsg: false,
      resvErrorMsg: false,
      appErrorMsg: false,
      chatErrorMsg: false,
      noticeInfoCheck: [
        {
          label: '전화하기',
          value: 'call'
        },
        {
          label: '웹사이트',
          value: 'website'
        },
        {
          label: '예약하기',
          value: 'reservation'
        },
        {
          label: '앱 다운로드',
          value: 'appdownload'
        },
        {
          label: '상담채팅 연결',
          value: 'chat'
        }
      ],
      checkedMenus: [],
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료']
    }
  },
  computed: {
  },
  methods: {
    onBrandTip () {
      this.isOpen = !this.isOpen
    },
    brandTip1 () {
      this.form.title = '영업시간 안내'
      this.form.content = '월~금 : 10:30 ~ 20:00 주말 및 공휴일은 휴무입니다.'
    },
    brandTip2 () {
      this.form.title = '1월 23일 임시휴무 안내'
      this.form.content = '내부 인테리어로 임시휴무입니다. 더 산뜻하게 다시 모시겠습니다!'
    },
    brandTip3 () {
      this.form.title = '출시기념!'
      this.form.content = '단 7일간! 이 메시지를 보여주시는 분들께만 10% 할인!'
    },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    },
    changeMenuCheck(e, targetMenu) {
      if (this.checkedMenus.length > 3) {
        alert('퀵 버튼은 3개까지만 선택 가능합니다.')
        // 메뉴아이템 선택 한 것이 상한에 걸릴경우 체크박스 처리.
        this.$nextTick(() => {
          this.checkedMenus.splice(this.checkedMenus.indexOf(targetMenu), 1)
        })
      } else {
        let target = _.find(this.checkedMenuDatas, { code: targetMenu })
        if (this.checkedMenus.indexOf(targetMenu) !== -1) {
          target.visible = true
        } else {
          target.visible = false
          target.values.forEach(v => {
            v.value = ''
          })
        }
      }
    },
    onSubmit () {
      if (this.form.tab === '') {
        this.tabErrorMsg = true
        return
      }
      if (this.form.noticeInfo.includes('website') && this.form.website === '') {
        this.webErrorMsg = true
        return
      }
      if (this.form.noticeInfo.includes('reservation') && this.form.reservation === '') {
        this.resvErrorMsg = true
        return
      }
      if (this.form.noticeInfo.includes('appdownload') && this.form.appdownload === '') {
        this.appErrorMsg = true
        return
      }
      if (this.form.noticeInfo.includes('chat') && this.form.chat === '') {
        this.chatErrorMsg = true
        return
      }
      this.$router.push('./brandcreatestep04')
    },
    noticeCheck (index, value) {
      this.isActiveNum = index
      this.form.noticeUse = value
    }
  }
}
</script>
