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
                    <tr>
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
                  </tbody>
                </table>
                <template v-if="form.curTab === 'feed'">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                      <col width="196px">
                      <col width="100px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr class="brand_board">
                        <th scope="row"><span class="form-item__label">영업정보</span></th>
                        <td colspan="2">
                          <div class="form-item__content">
                            <div class="text-item">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="noticeChk" id="noticeUse" v-model="form.noticeUse" value="use"/>
                                  <label for="noticeUse"><span class="checkbox__text">사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="noticeChk" id="noticeUseN" v-model="form.noticeUse" value="useN"/>
                                  <label for="noticeUseN"><span class="checkbox__text">미사용</span></label>
                                </span>
                              </div>
                            </div>
                            <button
                              class="btn-brandTip"
                              @click=onBrandTip
                              type="button"
                              :class="{open: isOpen}"
                            >
                              영업정보 작성 예시
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr class="brand_boardTip">
                        <td colspan="3">
                          <div class="brand-tip__wrap" v-if="isOpen">
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
                      <tr>
                        <th scope="row"><span class="form-item__label required">제목</span></th>
                        <td colspan="2">
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" class="input" maxlength="20" placeholder="알림 제목을 입력해주세요." v-model="form.title" ref="title">
                                  <div class="input-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'title', j)"/>
                                    <p>{{ form.title.length }}/20자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label required">내용</span></th>
                        <td colspan="2">
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
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
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" rowspan="4" class="cell--last"><span class="form-item__label">노출 정보</span></th>
                        <th scope="row"><span class="form-item__label sub">전화번호</span></th>
                        <td>
                          <span class="text">{{ form.tel }}</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label sub">정보</span></th>
                        <td>
                          <span class="text">{{ form.moreInfo }}</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label sub">웹사이트</span></th>
                        <td>
                          <span class="text">{{ form.url }}</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label sub">포탈검색</span></th>
                        <td>
                          <span class="text">{{ form.hashtag }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="guide-text black">&bull; 퀵 버튼 설정 시 입력한 정보가 동일하게 반영됩니다.</p>
                </template>
                <template v-if="form.curTab === 'info'">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                      <col width="196px">
                      <col width="100px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row" rowspan="4" class="cell--last"><span class="form-item__label">노출 정보</span></th>
                        <th scope="row"><span class="form-item__label sub">전화번호</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row text-item">
                              <div class="input-item">
                                <span class="text">
                                  010-2345-5678
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label sub">웹사이트</span></th>
                        <td>
                          <div class="forn-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                  <span class="input">
                                    <input type="text" class="input" v-model="form.email">
                                  </span>
                                </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label sub">주소</span></th>
                        <td>
                          <div class="forn-item__content">
                            <div class="form-item-row">
                              <span class="input-item post">
                                <span class="input input-post"><input type="text" class="input" v-model="form.postcode" disabled></span>
                                <ButtonCmp
                                    type="btn-default-line"
                                    @click="findPost"
                                >
                                  우편번호
                                </ButtonCmp>
                              </span>
                              <span class="input-item address">
                                <span class="input input-info">
                                  <input type="text" class="input" v-model="form.addr1" disabled>
                                </span>
                                <span class="input input-info">
                                  <input type="text" class="input" v-model="form.addr2" disabled>
                                </span>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
               </template>
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
