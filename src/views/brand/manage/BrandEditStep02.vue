<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 홈 수정" />
        <StepList :stepActiveIndex="2" :stepTitle="stepTitle" />
        <div class="top-progress-area">
          <span class="flag-progress done">승인완료</span>
          <p class="date">최종변경 : 2023. 03. 30</p>
        </div>
        <div class="top-notice--gray">
          <p>-신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 이메일로 알려드립니다.</p>
          <p>-승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
        </div>
        <PageTitleH3 titleh3="퀵 버튼 설정" noticeinfo="필수 입력값" />
        <form  ref="form" :model="form">
          <div class="table__wrap">
            <table class="table table-bodyonly form-table">
              <colgroup>
                <col width="196px">
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
                              <input type="checkbox" :id="checkItem.value" :value="checkItem.value" v-model="form.quickButton" :disabled="form.quickButton.length >= 4 || checkItem.value == 'chat'"><label :for="checkItem.value">{{ checkItem.label }}</label>
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
                          <span class="input"><input type="text" class="input" placeholder="‘-’없이 입력해주세요."  v-model="form.tel" disabled ></span>
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
            <img src="@/assets/images/dummy/brand_image.png" alt="">
          </div>
          <div class="quick-buttons">
            <a role="button"><i class="icon-tel"></i></a>
            <a role="button" v-if="form.quickButton.includes('chat')"><i class="icon-chat"></i></a>
            <a role="button" v-if="form.quickButton.includes('web')"><i class="icon-web"></i></a>
          </div>
          <div class="brand-title">
            <span class="logo">
              <img src="@/assets/images/dummy/brand_logo.png" alt="">
            </span>
            <div class="brand-desc">
              <h4>네스프레소</h4>
              <p class="brand__text">최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업</p>
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
                  <dd>{{ form.tel }}</dd>
                </dl>
                <dl class="web">
                  <dt>웹사이트</dt>
                  <dd>{{ form.url }}</dd>
                </dl>
                <dl class="email">
                  <dt>이메일</dt>
                  <dd>contactus@nespresso.com</dd>
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
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
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
    BrandLnb,
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
        quickButton: ['chat', 'call', 'info', 'web'],
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111',
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
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정'],
      isModalViewed: false
    }
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
    onSubmit () {
      if (this.form.quickButton.includes('call') && this.form.tel === '') {
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
      this.$router.push('./brandcreatestep03')
    }
  }
}
</script>
