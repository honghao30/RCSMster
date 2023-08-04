<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap layout-info__wrap">
        <PageTitle pagetitle="레이아웃 등록" />
        <div class="registration__wrap">
          <div class="registration-form__wrap">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label required">레이아웃 이름</span></th>
                      <td>
                        <div class="form-item__content is-emoji">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <div class="input">
                                <input type="text" class="input" maxlength="30"
                                  v-model="form.layoutName"
                                  placeholder="레이아웃 이름을 입력해주세요."
                                  ref="layoutName"
                                >
                                <div class="input-limit__text">
                                  <p>{{ form.layoutName.length }}/30자</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p class="guide-text error">레이아웃 이름 입력해주세요.</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="type__radio-tab">
                <ul>
                  <li>
                    <input type="radio" id="sms" value="sms"
                    v-model="form.layoutType" class="blind"
                    @change="setCmpList"
                    />
                    <label for="sms">
                      <i class="icon-sms"></i>
                      <dl>
                        <dt class="tab-title">SMS<span> (40~45자)</span></dt>
                        <dd class="tab-text">간단한 알림이나 짧은 공지를 메시지로 발송</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="lms" value="lms"
                    v-model="form.layoutType" class="blind"
                    @change="setCmpList"
                    />
                    <label for="lms">
                      <i class="icon-lms"></i>
                      <dl>
                        <dt class="tab-title">LMS<span> (1,000자)</span></dt>
                        <dd class="tab-text">내용이 긴 메시지를 한번에 발송</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="mms" value="mms"
                    v-model="form.layoutType" class="blind"
                    @change="setCmpList" />
                    <label for="mms">
                      <i class="icon-mms"></i>

                      <dl>
                        <dt class="tab-title">MMS<span> (텍스트+사진첨부)</span></dt>
                        <dd class="tab-text">이미지와 텍스트를 혼합하여 메시지 발송</dd>
                      </dl>
                    </label>
                  </li>
                </ul>
              </div>
              <div class="message-cmp__list">
                <div class="cmp-item"
                  v-for="(item, i) in cmpList" :key="i"
                  :class="[{'col3': i % 3 === 2 }, {'col1': i % 3 === 0}]"
                  >
                  <p class="cmp-title">{{ item.title }}</p>
                  <div class="cmp-box"
                    @click="addCmpItem(item)"
                  >
                    <img :src="item.imgUrl" alt="">
                  </div>
                  <table class="table table-bodyonly form-table"
                    v-if="item.regIsActive && item.title === '테이블'"
                  >
                    <colgroup>
                      <col width="196px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row"><span class="form-item__label">테이블 행수</span></th>
                        <td>
                          <div class="form-item__content is-emoji">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="tableRow" id="row5" value="5" v-model="form.table.rowNum"/>
                                  <label for="row5"><span class="radiobox__text">5개</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="tableRow" id="row10" v-model="form.table.rowNum" value="10" />
                                  <label for="row10"><span class="radiobox__text">10개</span></label>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label">1열</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">
                                    정렬
                                  </span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="align" value="left" id="alignLeft" v-model="form.table.fstRow.align"/>
                                        <label for="alignLeft"><span class="radiobox__text">좌측 정렬</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="align" value="right" id="alignRight" v-model="form.table.fstRow.align" />
                                        <label for="alignRight"><span class="radiobox__text">우측 정렬</span></label>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">
                                    글자 스타일
                                  </span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="fontStyle" value="regular" id="regular" v-model="form.table.fstRow.fontStyle"/>
                                        <label for="regular"><span class="radiobox__text">레귤러</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="fontStyle" value="bold" id="bold" v-model="form.table.fstRow.fontStyle"/>
                                        <label for="bold"><span class="radiobox__text">볼드</span></label>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label">2열</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">
                                    정렬
                                  </span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="align" value="left" id="alignLeft" v-model="form.table.sndRow.align"/>
                                        <label for="alignLeft"><span class="radiobox__text">좌측 정렬</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="align" value="right" id="alignRight" v-model="form.table.sndRow.align" />
                                        <label for="alignRight"><span class="radiobox__text">우측 정렬</span></label>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">
                                    글자 스타일
                                  </span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="fontStyle" value="regular" id="regular" v-model="form.table.sndRow.fontStyle"/>
                                        <label for="regular"><span class="radiobox__text">레귤러</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="fontStyle" value="bold" id="bold" v-model="form.table.sndRow.fontStyle"/>
                                        <label for="bold"><span class="radiobox__text">볼드</span></label>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th colspan="2" class="btuton__area">
                          <ButtonCmp
                              type="btn-blue-line"
                              size="medium"
                              @click="item.regIsActive = false"
                            >
                              저장
                            </ButtonCmp>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <table class="table table-bodyonly form-table"
                    v-if=" item.regIsActive  && (item.title === '버튼(좌우)' ||item.title === '버튼(상하)')"
                  >
                    <colgroup>
                      <col width="166px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row"><span class="form-item__label">버튼</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="btnUse" v-model="form.buttons.btnUse" id="btnUseN" value="N"/>
                                  <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="btnUse" v-model="form.buttons.btnUse" id="btnUseY" value="Y"/>
                                  <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label">버튼 컬러</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="btnColor" id="basicColor" value="basic" v-model="form.buttons.btnColor"/>
                                  <label id="basicColor"><span class="radiobox__text">기본 컬러</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="btnColor" id="brand" value="brand" v-model="form.buttons.btnColor"/>
                                  <label id="brand"><span class="radiobox__text">브랜드 컬러</span>
                                  <a role="button" class="link">(브랜드 색 설정하기)</a>
                                  </label>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th colspan="2" class="btuton__area">
                          <ButtonCmp
                              type="btn-blue-line"
                              size="medium"
                              @click="item.regIsActive = false"
                            >
                              저장
                            </ButtonCmp>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class="brand-aside">
            <div class="guide">
              <p>레이아웃 등록이 어려우세요?</p>
              <a role="button" class="link"
                @click="isModalViewed = true"
              ><span>샘플 메시지</span></a>
            </div>
            <LayoutEmulator :cmpList="selectedCmpList"/>
          </div>
          <!-- // 에뮬레이터 -->
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-blue"

          >저장</ButtonCmp>
        </div>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 샘플 팝업 -->
      <SampleListModal
        modalsize="Max1080"
        @closeModal="isModalViewed = false"
        v-if="isModalViewed"
      />
    </ModalView>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import LayoutEmulator from '@/views/brand/message/components/LayoutEmulator.vue'
import SampleListModal from '@/views/brand/message/components/SampleListModal.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'

export default {
  components: {
    PageTitle,
    LayoutEmulator,
    BrandLnb,
    ButtonCmp,
    ModalView,
    SampleListModal
  },
  data() {
    return {
      selectedCmpList: [{
        title: '',
        imgUrl: '',
        viewImgUrl: '',
        isActive: true
      }],
      form: {
        layoutType: 'sms',
        layoutName: '',
        table: {
          rowNum: 5,
          fstRow: {
            align: 'left',
            fontStyle: 'regular'
          },
          sndRow: {
            align: 'left',
            fontStyle: 'regular'
          }
        },
        buttons: {
          btnUse: '',
          btnColor: ''
        }
      },
      isShowTableReg: false,
      isShowButtonReg: false,
      cmpList: [],
      smsCmpList: [
        {
          title: '메인 타이틀',
          imgUrl: require('@/assets/images/message/icon_cmp_title.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_title.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '스타일타이틀 A',
          imgUrl: require('@/assets/images/message/icon_cmp_title_styled.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_title_styled.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: 'A 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_itemA.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_itemA.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: 'B 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_itemB.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_itemB.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '디스크립션',
          imgUrl: require('@/assets/images/message/icon_cmp_desc.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_desc.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '버튼(좌우)',
          imgUrl: require('@/assets/images/message/icon_cmp_button_hor.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_button_hor.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '버튼(상하)',
          imgUrl: require('@/assets/images/message/icon_cmp_button_ver.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_button_ver.png'),
          isActive: true,
          regIsActive: false
        }
      ],
      lmsCmpList: [
        {
          title: '메인타이틀',
          imgUrl: require('@/assets/images/message/icon_cmp_title.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_title.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '스타일 타이틀 A',
          imgUrl: require('@/assets/images/message/icon_cmp_title_styled.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_title_styled.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '테이블',
          imgUrl: require('@/assets/images/message/icon_cmp_table.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_table.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '서브 디스크립션 태이블',
          imgUrl: require('@/assets/images/message/icon_cmp_tableB.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_tableB.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: 'A 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_itemA.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_itemA.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: 'B 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_itemB.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_itemB.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '디스크립션',
          imgUrl: require('@/assets/images/message/icon_cmp_desc.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_desc.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '서브 디스크립션 이미지',
          imgUrl: require('@/assets/images/message/icon_cmp_sub_desc_img.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_sub_desc_img.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '노티스',
          imgUrl: require('@/assets/images/message/icon_cmp_notice.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_notice.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '버튼(좌우)',
          imgUrl: require('@/assets/images/message/icon_cmp_button_hor.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_button_hor.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '버튼(상하)',
          imgUrl: require('@/assets/images/message/icon_cmp_button_ver.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_button_ver.png'),
          isActive: true,
          regIsActive: false
        }
      ],
      mmsCmpList: [
        {
          title: '메인 타이틀',
          imgUrl: require('@/assets/images/message/icon_cmp_title.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_title.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '스타일 타이틀 A',
          imgUrl: require('@/assets/images/message/icon_cmp_title_styled.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_title_styled.png'),isActive: true,
          regIsActive: false
        },
        {
          title: '정형 이미지',
          imgUrl: require('@/assets/images/message/icon_cmp_image_square.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_image_square.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '가로형 이미지',
          imgUrl: require('@/assets/images/message/icon_cmp_image.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_image.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '테이블',
          imgUrl: require('@/assets/images/message/icon_cmp_table.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_table.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '서브 디스크립션 테이블',
          imgUrl: require('@/assets/images/message/icon_cmp_tableB.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_tableB.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: 'A 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_itemA.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_itemA.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: 'B 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_itemB.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_itemB.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '디스크립션',
          imgUrl: require('@/assets/images/message/icon_cmp_desc.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_desc.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '서브 디스크립션 이미지',
          imgUrl: require('@/assets/images/message/icon_cmp_sub_desc_img.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_sub_desc_img.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '노티스',
          imgUrl: require('@/assets/images/message/icon_cmp_notice.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_notice.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '썸네일',
          imgUrl: require('@/assets/images/message/icon_cmp_thumnail.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_thumnail.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '배너',
          imgUrl: require('@/assets/images/message/icon_cmp_banner.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_banner.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '버튼(좌우)',
          imgUrl: require('@/assets/images/message/icon_cmp_button_hor.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_button_hor.png'),
          isActive: true,
          regIsActive: false
        },
        {
          title: '버튼(상하)',
          imgUrl: require('@/assets/images/message/icon_cmp_button_ver.png'),
          viewImgUrl: require('@/assets/images/message/emul_cmp_button_ver.png'),
          isActive: true,
          regIsActive: false
        }
      ],
      isModalViewed: false

    }
  },
  mounted() {
    this.cmpList = this.smsCmpList
  },
  methods: {
    setCmpList($event) {
      let target = $event.target.value
      if (target === 'sms') {
        this.cmpList = this.smsCmpList
      } else if (target === 'lms') {
        this.cmpList = this.lmsCmpList
      } else {
        this.cmpList = this.mmsCmpList
      }
    },
    addCmpItem(cmp) {
      let activeIndex = this.selectedCmpList.length - 1
      this.selectedCmpList.forEach((item, i) => {
        if (item.isActive === true) {
          activeIndex = i
        }
      })
      if (cmp.title === '테이블' || cmp.title === '버튼(상하)' || cmp.title === '버튼(좌우)') {
        this.cmpList.forEach((item) => {
          item.regIsActive = false
        })
        cmp.regIsActive = true
      }
      this.selectedCmpList.splice(activeIndex, 1, cmp)
    },
  }
}
</script>

<style>
</style>
