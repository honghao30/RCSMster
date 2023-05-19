<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="3" :stepTitle="stepTitle" />
        <PageTitleH3 titleh3="브랜드 홈 탭 설정" noticeinfo="필수 입력값" />
        <form  ref="form" :model="form">
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
                              <input type="radio" id="newsTab" name="'tab" value="newsTab" v-model="form.tab" @input="checkTab"><label for="newsTab">소식 탭 우선</label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" id="infoTab" name="tab" value="infoTab" v-model="form.tab" @input="checkTab"><label for="infoTab">정보 탭 우선</label>
                            </span>
                          </div>
                          <p class="guide-text error" v-if="tabErrorMsg" >우선 노출 탭 설정해주세요.</p>
                        </div>
                      </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label">소식 노출 정보 선택</span></th>
                  <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item check-list">
                            <span class="checkbox" v-for="(checkItem, i) in noticeInfoCheck" :key="i">
                              <input type="checkbox"
                               :id="checkItem.value"
                               :value="checkItem.value"
                               v-model="form.noticeInfo"
                               :disabled="form.noticeInfo.length >= 3"
                              ><label :for="checkItem.value">{{ checkItem.label }}</label>
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
                          <span class="input"><input type="text" class="input"  v-model="brandInfo.tel" disabled ></span>
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
                          <span class="input"><input type="text" class="input" placeholder="안드로이드 앱 다운로드 주소를 입력해주세요.(APP Scheme)"  v-model="form.appdownload" ></span>
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
                </tr>
              </tbody>
            </table>
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
              @click="saveTempData"
          >임시저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
          >승인요청</ButtonCmp>
        </div>
      </div>
      <div class="brand-aside sticky">
        <div class="button__wrap">
          <ButtonCmp
            type="btn-blue-line"
          >브랜드 불러오기</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
          >브랜드 가이드</ButtonCmp>
        </div>
        <div class="preview__wrap">
          <div class="preview__image">
            <img src="@/assets/images/dummy/brand_image.png" alt="">
          </div>
          <div class="quick-buttons">
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('tel')"><i class="icon-tel"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('chat')"><i class="icon-chat"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('web')"><i class="icon-web"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('order')"><i class="icon-order"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('buy')"><i class="icon-buy"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('ticket')"><i class="icon-ticket"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('store')"><i class="icon-store"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('More info')"><i class="icon-info"></i></a>
          </div>
          <div class="brand-title">
            <span class="logo">
              <img src="@/assets/images/dummy/brand_logo.png" alt="">
            </span>
            <div class="brand-desc">
              <h4>{{ this.brandInfo.brandName }}</h4>
              <p class="brand__text">{{ this.brandInfo.brandDescription }}</p>
            </div>
          </div>
          <div class="brand-detail">
            <TabCmp tabClass="brand-quick__tab" :activeIndex="0">
              <TabItem title="소식">
                <dl class="tel" v-if="form.noticeInfo.includes('call')">
                  <dt>전화하기</dt>
                  <dd>{{ this.brandInfo.tel }}</dd>
                </dl>
                <dl class="web" v-if="form.noticeInfo.includes('website')">
                  <dt>웹사이트</dt>
                  <dd>{{ form.website }}</dd>
                </dl>
                <dl class="tel" v-if="form.noticeInfo.includes('reservation')">
                  <dt>예약하기</dt>
                  <dd>{{ form.reservation }}</dd>
                </dl>
                <dl class="web"  v-if="form.noticeInfo.includes('appdownload')">
                  <dt>앱 다운로드</dt>
                  <dd>{{ form.appdownload }}</dd>
                </dl>
                <dl class="email" v-if="form.noticeInfo.includes('chat')">
                  <dt>상담채팅 시작하기</dt>
                  <dd>{{ form.chat }}</dd>
                </dl>
              </TabItem>
              <TabItem title="정보">
                <dl class="tel">
                  <dt>전화번호</dt>
                  <dd>{{ this.brandInfo.tel }}</dd>
                </dl>
                <dl class="web">
                  <dt>웹사이트</dt>
                  <dd>{{ this.brandInfo.url }}</dd>
                </dl>
                <dl class="email">
                  <dt>이메일</dt>
                  <dd>{{ this.brandInfo.email }}</dd>
                </dl>
              </TabItem>
            </TabCmp>
          </div>
        </div>
      </div>
    </div>
    <!-- // 모달 영역 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
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
    </ModalView>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import TabItem from '@/components/common/TabItem.vue'
import TabCmp from '@/components/common/TabCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    StepList,
    TabItem,
    TabCmp,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      form: {
        noticeInfo: [],
        url: '',
        email: '',
        tel: '',
        website: '',
        reservation: '',
        appdownload: '',
        chat: '',
        tab: 'inforTab',
        agree: ''
      },
      activeIndex: 1,
      tabErrorMsg: false,
      webErrorMsg: false,
      resvErrorMsg: false,
      appErrorMsg: false,
      isModalViewed: false,
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
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
      brandInfo: JSON.parse(localStorage.getItem('brand')) || '',
      brandInfoStep2: JSON.parse(localStorage.getItem('brandStep')) || '',
      newNoticeInfo: []
    }
  },
  mounted: {
  },
  computed: {
  },
  methods: {
    closeModal () {
      this.isModalViewed = false
    },
    closeMsg  () {
      this.isModalViewed = false
    },
    checkTab () {
      console.log(this.form.tab)
    },
    saveTempData () {
      localStorage.setItem('brandStep', JSON.stringify(this.form))
      this.isModalViewed = true
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
      localStorage.setItem('brandStep3', JSON.stringify(this.form))
      this.$router.push('./brandcreatestep04')
    }
  }
}
</script>
