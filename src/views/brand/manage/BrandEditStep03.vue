<template>
  <div class="brand__wrap brand_edit">
    <div class="brand__inner">
      <BrandLnb />
      <!-- 1차 디자인 수정 -->
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 홈 수정" progress="승인완료" />
        <!-- <div class="top-progress-area">
          <span class="flag-progress done">승인완료</span>
          <p class="date">최종변경 : 2023. 03. 30</p>
        </div> -->
        <!-- 1차 디자인 수정 -->
        <StepList :stepActiveIndex="3" :stepTitle="stepTitle" />
           <form  ref="form" :model="form">
            <!-- 기획서 v1.0 수정: 전체적으로 수정 필요 -->
            <div class="brand__wrap--edit">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
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
                                  <input type="radio" id="feed" name="'tab" value="feed" v-model="form.curTab"><label for="feed">소식 탭 우선</label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" id="info" name="tab" value="info" v-model="form.curTab"><label for="info">정보 탭 우선</label>
                                </span>
                              </div>
                              <p class="guide-text error" v-if="tabErrorMsg" >우선 노출 탭 설정해주세요.</p>
                            </div>
                            <p class="guide-text">※ 브랜드에서 전달하고 싶은 소식이나 공지, 프로모션을 간편하게 전달할 수 있어요. </p>
                          </div>
                      </td>
                    </tr>
                    <!-- 기획서 v1.0 수정(BrandEditStep03 과 동일하게 적용을 위해 수정) -->
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
                      <!-- 기획서 v1.0 수정 (BrandEditStep03 에서는 <th></th> 존재했으나 BrandEditStep03에서는 삭제) -->
                      <td colspan="2"> <!-- 기획서 v1.0 수정 (BrandEditStep03 에서는 colspan 삭제했으나 BrandEditStep03에서는 미삭제) -->
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
                    <!-- // 기획서 v1.0 수정(BrandEditStep03 과 동일하게 적용을 위해 수정) -->
                  </tbody>
                </table>
                <!-- 기획서 v1.0 수정 (BrandEditStep03 과 동일하게 적용을 위해 <template v-if="form.curTab === 'feed'">, <template v-if="form.curTab === 'info'"> 삭제) -->
                <!-- <div class="agree__area">
                  <span class="checkbox">
                    <input type="checkbox" id="agreeY" v-model="form.agree" value="agreeY"><label for="agreeY">메시지 발송 시 Free 템플릿은 정보성에 한하여 이용 가능합니다. 규정 위반시, 서비스 이용이 제한될 수 있습니다.</label>
                  </span>
                </div> 기획서 v1.0 수정: 해당 영역 삭제 => 기획 확인 필요 -->
              </div>
              <div class="brand-aside sticky">
                  <div class="button__wrap button__brand">
                    <!-- 1차 디자인 수정 -->
                    <button class="btn-brand">
                      브랜드 개설 가이드
                    </button>
                  </div>
                  <BrandEmulator :brandInfoData="form" curTab="feed" :feedData="form"/>
              </div>
            </div>
          </form>
          <div class="top-notice--gray">
              <p>- 신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 이메일로 알려드립니다.</p>
              <p>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
          </div>
          <!-- 1차 디자인 수정 -->
          <div class="button__wrap space-between">
            <router-link
              to="/brandeditstep02"
              class="btn btn-line"
            >이전</router-link>
          <div>
              <ButtonCmp
                  type="btn-line"
              >취소</ButtonCmp>
              <ButtonCmp
                  type="btn-blue"
                  @click="onSubmit"
              >수정완료</ButtonCmp>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
// import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import Emoji from '@/components/common/Emoji.vue'

export default {
  components: {
    BrandLnb,
    PageTitle,
    ButtonCmp,
    // PageTitleH3,
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
        noticeUse: 'use',
        title: '',
        content: '',
        address: '016128 서울특별시 강남구 봉은사로 18길 58(역삼동,건영빌딩) 더피프티원',
        hashtag: '#브랜드명'
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
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정']
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
