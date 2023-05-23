<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 홈 수정" />
        <StepList :stepActiveIndex="3" :stepTitle="stepTitle" />
        <PageTitleH3 titleh3="브랜드 홈 탭 설정" noticeinfo="필수 입력값" />
        <form  ref="form" :model="form">
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
                              <input type="radio" id="newsTab" name="'tab" value="newsTab" v-model="form.tab"><label for="newsTab">소식 탭 우선</label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" id="infoTab" name="tab" value="infoTab" v-model="form.tab"><label for="infoTab">정보 탭 우선</label>
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
                              <input type="checkbox" :id="checkItem.value" :value="checkItem.value" v-model="form.noticeInfo"><label :for="checkItem.value">{{ checkItem.label }}</label>
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
            to="/brandeditstep02"
            class="btn btn-blue-line"
          >이전</router-link>
          <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
          >수정완료</ButtonCmp>
        </div>
      </div>
      <div class="brand-aside  sticky">
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
            <TabCmp tabClass="brand-quick__tab" >
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
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import TabItem from '@/components/common/TabItem.vue'
import TabCmp from '@/components/common/TabCmp.vue'

export default {
  components: {
    BrandLnb,
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    StepList,
    TabItem,
    TabCmp
  },
  data() {
    return {
      form: {
        noticeInfo: ['reservation', 'chat', 'appdownload'],
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111',
        website: '',
        reservation: 'http://brandportal.com',
        appdownload: 'market://details?id=com.systemstudios.mail',
        chat: 'http://www.chatportal/start',
        tab: 'newsTab',
        agree: ''
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
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정']
    }
  },
  computed: {
  },
  methods: {
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
    }
  }
}
</script>
