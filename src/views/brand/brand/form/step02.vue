<template>
  <div class="brand__wrap brand_create">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="2" :stepTitle="stepTitle" />
        <PageTitleH3 titleh3="퀵 버튼 설정" noticeinfo="필수 입력값" />
        <form  ref="form">
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
                                <input type="checkbox" :id="checkItem.value"  :value="checkItem.value" @change="changeMenuCheck($event, checkItem.value)" v-model="checkedMenus" ref="menuItem"><label :for="checkItem.value">{{ checkItem.label }}</label>
                              </span>
                            </div>
                          </div>
                        </div>
                    </td>
                  </tr>
                  <template v-for="(item, i) in quickComp">
                    <tr v-if="checkedMenus.includes(item.value)">
                      <th scope="row"><span class="form-item__label required">{{ item.label }}</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="input">
                                <input type="text" class="input" :placeholder="item.placeholder"
                                v-model="item.weblink"
                                :disabled="item.value === 'call'"
                                @blur="item.showErrMsg = isEmpty(item.weblink)"
                                @input="item.weblink=ignoreChar($event, ['WHITESPACE','KOR'])"
                                >
                              </span>
                            </div>
                          </div>
                          <p class="guide-text" v-if="item.value === 'call'">※ 브랜드 기본정보에서 입력한 값과 동일하게 반영됩니다.</p>
                          <p class="guide-text error" v-if="item.showErrMsg" >{{ item.errMsg }}</p>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <div class="brand-aside">
              <div class="button__wrap button__brand">
                <button class="btn-brand">
                  브랜드 개설 가이드
                </button>
              </div>
              <BrandEmulator :brandData="brandDetail" curTab="info"/>
            </div>
          </div>
        </form>
        <div class="bottom-notice--gray">
          <p>- 대화방 포함 최대 4개까지 사용가능합니다.</p>
          <p>- 브랜드 홈에 항상 노출되는 정보로 정보/소식탭 이동시에도 항상 표시되는 버튼 입니다.</p>
        </div>
        <div class="button__wrap space-between">
        <a @click='goStep("prevStep")' class="btn btn-blue-line">이전</a>
        <div>
            <ButtonCmp
                type="btn-line"
                @click="onSubmit"
            >임시저장</ButtonCmp>
            <ButtonCmp
                type="btn-blue"
                @click="goStep('nextStep')"
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
import { ignoreChar } from '@/utils/check'
import { mapGetters, mapActions } from 'vuex'

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
      telErrorMsg: false,
      infoErrorMsg: false,
      orderErrorMsg: false,
      buyErrorMsg: false,
      ticketErrorMsg: false,
      webErrorMsg: false,
      storeErrorMsg: false,
      quickComp: [
        {
          label: '전화번호',
          value: 'call',
          weblink: '',
          placeholder: '‘-’없이 입력해주세요.',
          errMsg: '전화번호를 입력해주세요.',
          showErrMsg: false
        },
        {
          label: '더보기',
          value: 'moreinfo',
          weblink: '',
          placeholder: '기타 안내용 URL 주소를 입력해주세요. (예:http://www.portal.com)',
          errMsg: '기타 안내용 URL 주소를 입력해주세요.',
          showErrMsg: false
        },
        {
          label: '주문',
          value: 'order',
          weblink: '',
          placeholder: '주문/신청용 URL 주소를 입력해주세요. (예:http://www.portal.com)',
          errMsg: '주문/신청용 URL 주소를 입력해주세요.',
          showErrMsg: false
        },
        {
          label: '구매',
          value: 'buy',
          weblink: '',
          placeholder: '구매/결제용 URL 주소를 입력해주세요. (예:http://www.portal.com)',
          errMsg: '주문/신청용 URL 주소를 입력해주세요.',
          showErrMsg: false
        },
        {
          label: '티켓',
          value: 'ticket',
          weblink: '',
          placeholder: '예매/예약용 URL 주소를 입력해주세요. (예:http://www.portal.com)',
          errMsg: '예매/예약용 URL 주소를 입력해주세요.',
          showErrMsg: false
        },
        {
          label: '웹',
          value: 'web',
          weblink: '',
          placeholder: '웹 사이트 URL 주소를 입력해주세요. (예:http://www.portal.com)',
          errMsg: '기타 안내용 URL 주소를 입력해주세요.',
          showErrMsg: false
        },
        {
          label: '스토어',
          value: 'store',
          weblink: '',
          placeholder: '쇼핑용 URL 주소를 입력해주세요. (예:http://www.portal.com)',
          errMsg: '쇼핑용 URL 주소를 입력해주세요.',
          showErrMsg: false
        }
      ],
      newQuickButton: ['chat'],
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
      isModalViewed: false,
      checkedMenus: [],
      disabled: false,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  computed: {
    ...mapGetters('brand', {
      brandDetail: 'getBrandDetail'
    })
  },
  watch: {
    '$store.state.brand.brandDetail.tel': function(newVal) {
      this.quickComp.forEach((item) => {
        if (item.value === 'call') {
          item.weblink = newVal
        }
      })
    }
  },
  methods: {
    ignoreChar,
    ...mapActions({
      setMenus: 'brand/setMenus',
      appendMenuItem: 'brand/appendMenuItem',
      removeMenuItem: 'brand/removeMenuItem'
    }),
    initMenus() {
      this.getCheckedMenus()
      this.quickComp[0].weblink = this.brandDetail.tel
    },
    changeMenuCheck(e, targetMenu) {
      if (this.checkedMenus.length > 3) {
        alert('퀵 버튼은 3개까지만 선택 가능합니다.')
        // 메뉴아이템 선택 한 것이 상한에 걸릴경우 체크박스 처리.
        this.$nextTick(() => {
          this.checkedMenus.splice(this.checkedMenus.indexOf(targetMenu), 1)
        })
        return
      } else {
        if (this.checkedMenus.indexOf(targetMenu) === -1) {
          this.checkedMenuDatas(targetMenu)
        }
      }
      const checked = e.target.checked
      if (checked) {
        this.appendMenuItem({ menuValue: targetMenu })
      } else {
        this.removeMenuItem(targetMenu)
      }
    },
    closeModal () {
      this.isModalViewed = false
    },
    closeMsg  () {
      this.isModalViewed = false
    },
    onSubmit () {
      if (this.validation()) {
        this.setCheckedMenus()
        this.$emit('save')
      }
    },
    validation() {
      let result = true
      // validation 체크
      this.checkedMenus.forEach((el, idx) => {
        if (el !== 'chat') {
          this.quickComp.forEach(url => {
            if(url.value === 'call'){
              if(el === 'call' && url.weblink === ''){
                console.log('url.weblink = ', url)
                url.showErrMsg = true
                result = false
              }
            }else{
              if(url.value === el && (url.weblink === '' || !jglib.isUrl(url.weblink))){
                console.log('url.weblink = ', url)
                url.showErrMsg = true
                result = false
              }
            }
          })
        }
      });
      console.log(result)
      return result
    },
    // store에 메뉴 등록
    setCheckedMenus() {
      let menuData = []
      this.checkedMenus.forEach(el => {
        if (el === 'chat') {
          menuData.push({
            buttonType: el,
            weblink: ''
          })
        } else {
          this.quickComp.forEach(url => {
            if (url.value === el) {
              menuData.push({
                buttonType: el,
                weblink: url.weblink,
                label: url.label
              })
            }
          })
        }
      })
      this.setMenus(menuData)
    },
    // store에 메뉴 가져오기
    getCheckedMenus() {
      let menus = this.brandDetail.menus
      this.checkedMenus = []
      menus.forEach(item => {
        this.checkedMenus.push(item.buttonType)
        this.quickComp.forEach(quick => {
          if (quick.value === item.buttonType) {
            quick.weblink = item.weblink
          }
        })
      })
    },
    goStep(page) {
      this.setCheckedMenus()
      this.$emit(page)
    },
    // 체크해제시 값 초기화
    checkedMenuDatas(menuValue) {
      this.quickComp.forEach(url => {
        if (url.value === menuValue && menuValue !== 'call') {
          url.weblink = ''
        }
      })
    },
    isEmpty(data) {
      return jglib.isEmpty(data)
    }
  }
}
</script>
