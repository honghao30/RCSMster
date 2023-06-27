<template>
  <div class="brand__wrap brand_create">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="2" :stepTitle="stepTitle" />
        <PageTitleH3 titleh3="퀵 버튼 설정"/>
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
                    <th scope="row"><span class="form-item__label">퀵 버튼</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item check-list">
                            <span class="checkbox">
                              <input type="checkbox" id="chat"  value="chat"  checked disabled><label for="chat">대화방</label>
                            </span>
                            <span class="checkbox" v-for="(checkItem, i) in quickComp" :key="i">
                              <input type="checkbox" :id="checkItem.value"  :value="checkItem.value" @change="changeMenuCheck($event, checkItem.value)" v-model="form.quickButton" ref="menuItem"><label :for="checkItem.value">{{ checkItem.label }}</label>
                            </span>
                          </div>
                        </div>
                      </div>
                      <p class="guide-text black">&bull; 대화방 포함 최대 4개까지 사용가능합니다.</p>
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
            <div class="brand-aside">
              <div class="button__wrap button__brand">
                <button class="btn-brand">
                  브랜드 개설 가이드
                </button>
              </div>
              <BrandEmulator :brandInfoData="form" curTab="info"/>
            </div>
          </div>
        </form>
        <div class="bottom-notice--gray">
          <p>- 대화방 포함 최대 4개까지 사용가능합니다.</p>
          <p>- 브랜드 홈에 항상 노출되는 정보로 정보/소식탭 이동시에도 항상 표시되는 버튼 입니다.</p>
        </div>
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
            <ButtonCmp
                type="btn-blue"
                @click="onSubmit"
            >다음</ButtonCmp>
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
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    StepList,
    ModalView,
    ConfirmMsg,
    BrandEmulator
  },
  data() {
    return {
      form: {
        name: '네스프레소',
        desc: '최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업',
        bgImgFileUrl: 'dummy/brand_image.png',
        profileImgFileUrl: 'dummy/brand_logo.png',
        quickButton: ['chat'],
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
          label: '전화',
          value: 'call'
        },
        {
          label: '더보기',
          value: 'info'
        },
        {
          label: '주문',
          value: 'order'
        },
        {
          label: '구매',
          value: 'buy'
        },
        {
          label: '티켓',
          value: 'ticket'
        },
        {
          label: '웹',
          value: 'web'
        },
        {
          label: '스토어',
          value: 'store'
        }
      ],
      newQuickButton: ['chat'],
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
      isModalViewed: false,
      // form.quickButton: [],
      disabled: false
    }
  },
  computed: {
  },
  methods: {
    changeMenuCheck(e, targetMenu) {
      if (this.form.quickButton.length > 4) {
        alert('퀵 버튼은 3개까지만 선택 가능합니다.')
        // 메뉴아이템 선택 한 것이 상한에 걸릴경우 체크박스 처리.
        this.$nextTick(() => {
          this.form.quickButton.splice(this.form.quickButton.indexOf(targetMenu), 1)
        })
      } else {
        let target = _.find(this.form.quickButton, { code: targetMenu })
        if (this.form.quickButton.indexOf(targetMenu) !== -1) {
          // target.visible = true
        } else {
          // target.visible = false
          target.values.forEach(v => {
            v.value = ''
          })
        }
      }
    },
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
