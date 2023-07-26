<template>
  <div class="brand__wrap brand_create">
    <div class="brand__inner">
      <BrandLnb />
      <!-- 1차 디자인 수정 -->
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 홈 수정" progress="승인완료" />
        <!-- 1차 디자인 수정 -->
        <StepList :stepActiveIndex="2" :stepTitle="stepTitle" />
          <form  ref="form" :model="form">
            <!-- 1차 디자인 수정 -->
            <div class="brand__wrap--edit">
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
                              <span class="checkbox">
                                <input type="checkbox" id="chat"  value="chat"  checked disabled><label for="chat">대화방</label>
                              </span>
                              <span class="checkbox" v-for="(checkItem, i) in quickComp" :key="i">
                                <input type="checkbox" :id="checkItem.value"  :value="checkItem.value" @change="changeMenuCheck($event, checkItem.value)" v-model="form.quickButton" ref="menuItem"><label :for="checkItem.value">{{ checkItem.label }}</label>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="form.quickButton.includes('call')">
                      <th scope="row"><span class="form-item__label required">전화번호</span></th>  <!-- 기획서 v1.0 수정: 텍스트 변경 -->
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
                      <th scope="row"><span class="form-item__label required">정보</span></th>  <!-- 기획서 v1.0 수정: 텍스트 변경 -->
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
                      <th scope="row"><span class="form-item__label required">주문</span></th>  <!-- 기획서 v1.0 수정: 텍스트 변경 -->
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
                      <th scope="row"><span class="form-item__label required">구매</span></th>  <!-- 기획서 v1.0 수정: 텍스트 변경 -->
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
                      <th scope="row"><span class="form-item__label required">티켓</span></th>  <!-- 기획서 v1.0 수정: 텍스트 변경 -->
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
                      <th scope="row"><span class="form-item__label required">웹 사이트</span></th>  <!-- 기획서 v1.0 수정: 텍스트 변경 -->
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
                      <th scope="row"><span class="form-item__label required">스토어</span></th>  <!-- 기획서 v1.0 수정: 텍스트 변경 -->
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
              <div class="brand-aside sticky">
                <div class="button__wrap button__brand">
                  <!-- 1차 디자인 수정 -->
                  <button class="btn-brand">
                    브랜드 개설 가이드 <!-- 기획서 v1.0 수정: 버튼 명 수정 -->
                  </button>
                </div>
                <BrandEmulator :brandInfoData="form" curTab="info"/>
              </div>
            </div>
          </form>
          <div class="top-notice--gray">
              <p>- 신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 이메일로 알려드립니다.</p>
              <p>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
          </div>
          <div class="button__wrap space-between">
            <div class="left">
              <router-link
                class="btn btn-line" to="/brandeditstep01"
              >이전</router-link>
            </div>
            <div class="right">
              <ButtonCmp
                type="btn-line"
              >수정완료</ButtonCmp>
              <ButtonCmp
                type="btn-blue"
                @click="onSubmit"
              >다음</ButtonCmp>
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
import imgcategoryOptions from '@/views/brand/create/brandBasicImg'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    // PageTitleH3,
    StepList,
    BrandLnb,
    BrandEmulator
  },
  data() {
    return {
      form: {
        name: '네스프레소',
        desc: '최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업',
        bgImgFileUrl: 'https://file.rcsbizcenter.com/brand/common/LT-common-yeHC_1.png',
        profileImgFileUrl: 'https://file.rcsbizcenter.com/brand/common/LT-common-yeHC_1.png',
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111',
        moreInfoURL: '',
        orderURL: '',
        buyURL: '',
        ticketURL: '',
        storeURL: '',
        address: '016128 서울특별시 강남구 봉은사로 18길 58(역삼동,건영빌딩) 더피프티원',
        quickButton: ['chat', 'web', 'call', 'order']
      },
      telErrorMsg: false,
      infoErrorMsg: false,
      orderErrorMsg: false,
      buyErrorMsg: false,
      ticketErrorMsg: false,
      storeErrorMsg: false,
      quickComp: [
        {
          label: '전화번호',
          value: 'call'
        },
        {
          label: '정보',
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
          label: '웹사이트',
          value: 'web'
        },
        {
          label: '스토어',
          value: 'store'
        }
      ],
      imgcategoryOptions,
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정']
    }
  },
  watch: {
  },
  computed: {
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
</script>
