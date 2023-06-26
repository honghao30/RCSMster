<template>
  <div class="brand__wrap brand_create">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="3" :stepTitle="stepTitle" />
        <PageTitleH3 titleh3="브랜드 홈 탭 설정"/>
        <form  ref="form" :model="form">
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
                                <input type="radio" id="feed" name="'tab" value="feed" v-model="form.curTab"><label for="feed">소식 탭 우선</label>
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
                  <tr>
                    <th scope="row"><span class="form-item__label">알림판</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
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
                          <template v-if="form.noticeUse === 'use'">
                            <p>미사용</p>
                          </template>
                          <template v-if="form.noticeUse === 'useN'">
                            <p>사용</p>
                          </template>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">소식</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="text-item">
                            <span class="text-item__title">전화</span>
                            <span class="text">{{ form.tel }}</span>
                          </div>
                          <div class="text-item">
                            <span class="text-item__title">더보기</span>
                            <span class="text">{{ form.moreInfo }}</span>
                          </div>
                          <div class="text-item">
                            <span class="text-item__title">웹</span>
                            <span class="text">{{ form.url }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">정보</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="inpun-item__title required">웹사이트</span>
                            <span class="input">
                              <input type="text" class="input" v-model="form.name" disabled>
                            </span>
                          </div>
                          <div class="input-item">
                            <span class="inpun-item__title required">이메일</span>
                            <span class="input">
                              <input type="text" class="input" v-model="form.name" disabled>
                            </span>
                          </div>
                          <div class="input-item">
                            <span class="inpun-item__title required">주소</span>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item post">
                                <!-- 0620: 디자인 1차 수정 - 'input-post' class명 추가 -->
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
                                <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
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
            </div>
            <div class="brand-aside  sticky">
              <div class="button__wrap button__brand">
                <button class="btn-brand">
                  브랜드 홈 작성가이드
                </button>
              </div>
              <BrandEmulator :brandInfoData="form" :curTab="form.curTab"/>
            </div>
          </div>
        </form>
        <div class="agree__area">
          <span class="checkbox">
            <input type="checkbox" id="agreeY" v-model="form.agree" value="agreeY"><label for="agreeY">메시지 발송 시 Free 템플릿은 정보성에 한하여 이용 가능합니다. 규정 위반시, 서비스 이용이 제한될 수 있습니다.</label>
          </span>
        </div>
        <div class="button__wrap">
          <router-link
            to="/brandcreatestep02"
            class="btn btn-blue-line"
          >이전</router-link>
          <ButtonCmp
              type="btn-line"
          >임시저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
          >승인요청</ButtonCmp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    StepList,
    BrandEmulator
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
        noticeUse: 'noticeUseN'
      },
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
      this.form.bgImage = value
    }
  }
}
</script>
