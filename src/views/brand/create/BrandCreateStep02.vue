<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="2" :stepTitle="stepTitle" />
        <PageTitleH3 titleh3="퀵 버튼 설정" noticeinfo="필수 입력값" />
        <form  ref="form" :model="form">
          <div class="table__wrap">
            <table class="table table-bodyonly form-table">
              <colgroup>
                <col width="230px">
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row"><span class="form-item__label">퀵 버튼</span></th>
                  <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item check-list">
                            <span class="checkbox" v-for="(checkItem, i) in quickComp" :key="i">
                              <input type="checkbox"
                                :id="checkItem.value"
                                :value="checkItem.value"
                                v-model="form.quickButton"
                                :disabled="form.quickButton.length >= 4 || checkItem.value == 'chat'"
                              ><label :for="checkItem.value">{{ checkItem.label }}</label>
                            </span>
                          </div>
                        </div>
                      </div>
                  </td>
                </tr>
                <tr v-if="form.quickButton.includes('call')">
                  <th scope="row"><span class="form-item__label required">Call</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="‘-’없이 입력해주세요."  v-model="this.brandInfo.tel" disabled ></span>
                        </div>
                      </div>
                      <p class="guide-text">※ 브랜드 기본정보에서 입력한 값과 동일하게 반영됩니다.</p>
                      <p class="guide-text error" v-if="telErrorMsg" >전화번호를 입력해주세요.</p>
                    </div>
                  </td>
                </tr>
                <tr v-if="form.quickButton.includes('info')">
                  <th scope="row"><span class="form-item__label required">More info</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="기타 안내용 URL 주소를 입력해주세요. (예:http://www.portal.com)"  v-model="form.moreInfoURL" ></span>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="infoErrorMsg" >기타 안내용 URL 주소를 입력해주세요.</p>
                    </div>
                  </td>
                </tr>
                <tr v-if="form.quickButton.includes('order')">
                  <th scope="row"><span class="form-item__label required">Order</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="주문/신청용 URL 주소를 입력해주세요. (예:http://www.portal.com)"  v-model="form.orderURL" ></span>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="orderErrorMsg" >주문/신청용 URL 주소를 입력해주세요.</p>
                    </div>
                  </td>
                </tr>
                <tr v-if="form.quickButton.includes('buy')">
                  <th scope="row"><span class="form-item__label required">Buy</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="구매/결제용 URL 주소를 입력해주세요. (예:http://www.portal.com)"  v-model="form.buyURL" ></span>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="buyErrorMsg" >주문/신청용 URL 주소를 입력해주세요.</p>
                    </div>
                  </td>
                </tr>
                <tr v-if="form.quickButton.includes('ticket')">
                  <th scope="row"><span class="form-item__label required">Ticket</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="예매/예약용 URL 주소를 입력해주세요. (예:http://www.portal.com)"  v-model="form.ticketURL" ></span>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="ticketErrorMsg" >예매/예약용 URL 주소를 입력해주세요.</p>
                    </div>
                  </td>
                </tr>
                <tr v-if="form.quickButton.includes('web')">
                  <th scope="row"><span class="form-item__label required">Web</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="웹 사이트 URL 주소를 입력해주세요. (예:http://www.portal.com)"  v-model="form.url" ></span>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="webErrorMsg" >기타 안내용 URL 주소를 입력해주세요.</p>
                    </div>
                  </td>
                </tr>
                <tr v-if="form.quickButton.includes('store')">
                  <th scope="row"><span class="form-item__label required">Store</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="쇼핑용 URL 주소를 입력해주세요. (예:http://www.portal.com)"  v-model="form.storeURL" ></span>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="storeErrorMsg" >쇼핑용 URL 주소를 입력해주세요.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
        <div class="button__wrap">
          <router-link
            to="/brandcreatestep01"
            class="btn btn-blue-line"
          >이전</router-link>
          <ButtonCmp
              type="btn-line"
              @click="saveTempData"
          >임시저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
          >다음</ButtonCmp>
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
            <img
              :src='`@/assets/images/dummy/${this.brandInfo.bgImage}`'
              alt=""
             >
          </div>
          <div class="quick-buttons">
            <a role="button" v-if="form.quickButton.includes('call')"><i class="icon-tel"></i></a>
            <a role="button" v-if="form.quickButton.includes('chat')"><i class="icon-chat"></i></a>
            <a role="button" v-if="form.quickButton.includes('web')"><i class="icon-web"></i></a>
            <a role="button" v-if="form.quickButton.includes('order')"><i class="icon-order"></i></a>
            <a role="button" v-if="form.quickButton.includes('buy')"><i class="icon-buy"></i></a>
            <a role="button" v-if="form.quickButton.includes('ticket')"><i class="icon-ticket"></i></a>
            <a role="button" v-if="form.quickButton.includes('store')"><i class="icon-store"></i></a>
            <a role="button" v-if="form.quickButton.includes('info')"><i class="icon-info"></i></a>
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
            <TabCmp tabClass="brand-quick__tab" :activeIndex="1">
              <TabItem title="소식">
                <div>소식</div>
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
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'
import TabItem from '@/components/common/TabItem.vue'
import TabCmp from '@/components/common/TabCmp.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    StepList,
    ModalView,
    ConfirmMsg,
    TabCmp,
    TabItem
  },
  data() {
    return {
      form: {
        quickButton: ['chat'],
        url: '',
        chat: '',
        email: '',
        tel: '',
        moreInfoURL: '',
        orderURL: '',
        buyURL: '',
        ticketURL: '',
        storeURL: ''
      },
      telErrorMsg: false,
      infoErrorMsg: false,
      orderErrorMsg: false,
      buyErrorMsg: false,
      ticketErrorMsg: false,
      storeErrorMsg: false,
      chatErrorMsg: false,
      quickComp: [
        {
          label: 'Chat',
          value: 'chat'
        },
        {
          label: 'Call',
          value: 'call'
        },
        {
          label: 'More info',
          value: 'info'
        },
        {
          label: 'Order',
          value: 'order'
        },
        {
          label: 'Buy',
          value: 'buy'
        },
        {
          label: 'Ticket',
          value: 'ticket'
        },
        {
          label: 'Web',
          value: 'web'
        },
        {
          label: 'Store',
          value: 'store'
        }
      ],
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
      isModalViewed: false,
      formData: {},
      brandInfo: JSON.parse(localStorage.getItem('brand')) || '',
      quckList: [],
      getLength: ''
    }
  },
  watch: {},
  mounted() {},
  computed: {
  },
  methods: {
    closeModal () {
      this.isModalViewed = false
    },
    closeMsg  () {
      this.isModalViewed = false
    },
    saveTempData () {
      localStorage.setItem('brandStep', JSON.stringify(this.form))
      this.isModalViewed = true
    },
    onSubmit () {
      if (this.form.quickButton.includes('chat') && this.form.chat === '') {
        this.chatErrorMsg = true
        return
      }      
      if (this.form.quickButton.includes('tel') && this.form.tel === '') {
        this.telErrorMsg = true
        return
      }
      if (this.form.quickButton.includes('info') && this.form.moreInfoURL === '') {
        this.infoErrorMsg = true
        return
      }
      if (this.form.quickButton.includes('order') && this.form.orderURL === '') {
        this.orderErrorMsg = true
        return
      }
      if (this.form.quickButton.includes('buy') && this.form.buyURL === '') {
        this.buyErrorMsg = true
        return
      }
      if (this.form.quickButton.includes('ticket') && this.form.ticketURL === '') {
        this.ticketErrorMsg = true
        return
      }
      if (this.form.quickButton.includes('web') && this.form.url === '') {
        this.webErrorMsg = true
        return
      }
      if (this.form.quickButton.includes('store') && this.form.storeURL === '') {
        this.storeErrorMsg = true
        return
      }
      localStorage.setItem('brandStep', JSON.stringify(this.form))
      this.$router.push('./brandcreatestep03')
    }
  }
}
</script>
