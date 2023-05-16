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
                              <input type="checkbox" :id="checkItem.value" :value="checkItem.value" v-model="form.quickButton"><label :for="checkItem.value">{{ checkItem.label }}</label>
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
                          <span class="input"><input type="text" class="input" placeholder="기타 안내용 URL 주소를 입력해주세요. (예:http://www.portal.com)"  v-model="form.moreInfo" ></span>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="infoErrorMsg" >기타 안내용 URL 주소를 입력해주세요.</p>
                    </div>
                  </td>
                </tr>
                <tr v-if="form.quickButton.includes('web')">
                  <th scope="row"><span class="form-item__label required">Web</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="기타 안내용 URL 주소를 입력해주세요. (예:http://www.portal.com)"  v-model="form.web" ></span>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="webErrorMsg" >기타 안내용 URL 주소를 입력해주세요.</p>
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
              @click="isModalViewed = true"
          >임시저장</ButtonCmp>
          <router-link
              to="/brandcreatestep03"
              class="btn-blue btn"
          >다음</router-link>
        </div>
      </div>
      <div class="brand-aside">
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
          <div class="contact-icons">
            <a role="button"><i class="icon-tel"></i></a>
            <a role="button"><i class="icon-chat"></i></a>
            <a role="button"><i class="icon-web"></i></a>
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
            <ul class="tab">
              <li>소식</li>
              <li class="active">정보</li>
            </ul>
            <dl class="tel">
              <dt>전화번호</dt>
              <dl>{{ form.tel }}</dl>
            </dl>
            <dl class="web">
              <dt>웹사이트</dt>
              <dl>{{ form.url }}</dl>
            </dl>
            <dl class="email">
              <dt>이메일</dt>
              <dl>contactus@nespresso.com</dl>
            </dl>
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

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    StepList,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      form: {
        quickButton: [],
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111',
        moreInfo: ''
      },
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
    }
  }
}
</script>
