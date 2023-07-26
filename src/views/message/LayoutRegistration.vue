<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
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
                                  <Emoji @input="onSelectEmoji($event, 'layoutName')"/>
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
                      <i class="icon-chatbubble"></i>
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
                      <i class="icon-chatbubble"></i>
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
                      <i class="icon-card"></i>

                      <dl>
                        <dt class="tab-title">MMS<span> (텍스트+사진첨부)</span></dt>
                        <dd class="tab-text">이미지와 텍스트를 혼합하여 메시지 발송</dd>
                      </dl>
                    </label>
                  </li>
                </ul>
              </div>
              <div class="message-cmp__list">
                <div class="cmp-item" v-for="(item, i) in cmpList" :key="i">
                  <p class="cmp-title">{{ item.title }}</p>
                  <div class="cmp-box">
                    <img :src="item.imgUrl" alt="">
                  </div>
                  <ButtonCmp
                    type="btn-blue-line"
                    size="medium"
                    @click="addCmpItem(item)"
                    :disabled="item.isActive"
                  >컴포넌트 작성</ButtonCmp>
                </div>
              </div>
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class="brand-aside">
            <ChatEmulator
              :templateData="templateData"
              :isActiveCmpIndex = isActiveCmpIndex
              @setActiveCmp="setActiveCmp($event)"
              mode="layout"
              :hideInputFooter = "hideInputFooter"
            />
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
      <!-- 버튼 설정 팝업 -->
      <ButtonReg
        :info="form.subDescTable"
        v-if="isShowBtnReg"
        modalsize="Max628"
        @closeModal="isShowBtnReg = false, isModalViewed = false"
        />
      <!-- 테이블 설정 팝업 -->
      <TableReg
        :info="form.table"
        v-if="isShowTableReg"
        modalsize="Max628"
        @closeModal="isShowTableReg = false, isModalViewed = false"
      />
    </ModalView>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ChatEmulator from '@/views/brand/message/components/ChatEmulator.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import ButtonReg from '@/views/brand/message/components/ButtonReg.vue'
import TableReg from '@/views/brand/message/components/TableReg.vue'

export default {
  components: {
    PageTitle,
    ChatEmulator,
    ModalView,
    BrandLnb,
    ButtonCmp,
    Emoji,
    ButtonReg,
    TableReg
  },
  data() {
    return {
      form: {
        layoutType: 'sms',
        layoutName: '',
        table: {
          row: 5,
          fstRow: {
            align: 'left',
            fontStyle: 'regular'
          },
          sndRow: {
            align: 'left',
            fontStyle: 'regular'
          },
          btnUse: 'Y',
          btnAlign: 'column',
          btnColor: 'basic'
        },
        subDescTable: {
          type: 'subDescTable',
          btnUse: 'Y',
          btnAlign: 'column',
          btnColor: 'basic'
        },
        desc: {
          type: 'desc',
          btnUse: '',
          btnColor: '',
          btnAlign: ''
        }

      },
      isModalViewed: false,
      isActiveCmpIndex: 0,
      templateData: [],
      cmpList: [],
      smsCmpList: [
        {
          title: '메인 타이틀',
          imgUrl: require('@/assets/images/message/icon_cmp_title.png'),
          cmpType: 'MainTitle',
          isActive: false,
          btnCmp: false
        },
        {
          title: '스타일 타이틀A',
          imgUrl: require('@/assets/images/message/icon_cmp_title.png'),
          cmpType: 'Item',
          isActive: false,
          btnCmp: false
        },
        {
          title: 'A 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_item.png'),
          cmpType: 'itemA',
          isActive: false,
          btnCmp: true
        },
        {
          title: 'B 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_item.png'),
          cmpType: 'itemB',
          isActive: false,
          btnCmp: true
        },
        {
          title: 'C 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_item.png'),
          cmpType: 'itemC',
          isActive: false,
          btnCmp: true
        },
        {
          title: '디스크립션',
          imgUrl: require('@/assets/images/message/icon_cmp_desc.png'),
          cmpType: 'Description',
          isActive: false,
          btnCmp: true
        }
      ],
      lmsCmpList: [
        {
          title: '메인 타이틀',
          imgUrl: require('@/assets/images/message/icon_cmp_title.png'),
          cmpType: 'MainTitle',
          isActive: false
        },
        {
          title: '스타일 타이틀A',
          imgUrl: require('@/assets/images/message/icon_cmp_title.png'),
          cmpType: 'MainTitle',
          isActive: false
        },
        {
          title: '테이블',
          imgUrl: require('@/assets/images/message/icon_cmp_table.png'),
          cmpType: 'table',
          isActive: false
        },
        {
          title: '서브 디스크립션 테이블',
          imgUrl: require('@/assets/images/message/icon_cmp_table.png'),
          cmpType: 'table',
          isActive: false,
          btnCmp: true
        },
        {
          title: 'A 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_item.png'),
          cmpType: 'item',
          isActive: false,
          btnCmp: true
        },
        {
          title: 'B 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_item.png'),
          cmpType: 'item',
          isActive: false,
          btnCmp: true
        },
        {
          title: '디스크립션',
          imgUrl: require('@/assets/images/message/icon_cmp_desc.png'),
          cmpType: 'Description',
          isActive: false,
          btnCmp: true
        },
        {
          title: '서브 디스크립션',
          imgUrl: require('@/assets/images/message/icon_cmp_desc.png'),
          cmpType: 'Description',
          isActive: false
        },
        {
          title: '노티스',
          imgUrl: require('@/assets/images/message/icon_cmp_item.png'),
          cmpType: 'notice',
          isActive: false
        }
      ],
      mmsCmpList: [
        {
          title: '메인 타이틀',
          imgUrl: require('@/assets/images/message/icon_cmp_title.png'),
          cmpType: 'MainTitle',
          isActive: false
        },
        {
          title: '스타일 타이틀A',
          imgUrl: require('@/assets/images/message/icon_cmp_title.png'),
          cmpType: 'MainTitle',
          isActive: false
        },
        {
          title: '정형 이미지',
          imgUrl: require('@/assets/images/message/icon_cmp_image_square.png'),
          cmpType: 'MainImage',
          isActive: false
        },
        {
          title: '가로형 이미지',
          imgUrl: require('@/assets/images/message/icon_cmp_image.png'),
          cmpType: 'MainImage',
          isActive: false
        },
        {
          title: '테이블',
          imgUrl: require('@/assets/images/message/icon_cmp_table.png'),
          cmpType: 'table',
          isActive: false
        },
        {
          title: '서브 디스크립션 테이블',
          imgUrl: require('@/assets/images/message/icon_cmp_table.png'),
          cmpType: 'table',
          isActive: false,
          btnCmp: true
        },
        {
          title: 'A 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_item.png'),
          cmpType: 'item',
          isActive: false,
          btnCmp: true
        },
        {
          title: 'B 아이템',
          imgUrl: require('@/assets/images/message/icon_cmp_item.png'),
          cmpType: 'item',
          isActive: false,
          btnCmp: true
        },
        {
          title: '디스크립션',
          imgUrl: require('@/assets/images/message/icon_cmp_desc.png'),
          cmpType: 'Description',
          isActive: false
        },
        {
          title: '서브 디스크립션',
          imgUrl: require('@/assets/images/message/icon_cmp_desc.png'),
          cmpType: 'Description',
          isActive: false
        },
        {
          title: '노티스',
          imgUrl: require('@/assets/images/message/icon_cmp_item.png'),
          cmpType: 'notice',
          isActive: false
        }
      ],
      isShowTableReg: false,
      isShowBtnReg: false,
      chatInfoData: {
        chatType: 'chatBubble',
        chatRoomName: 'SYSTEMSTUDIO',
        saftyMark: 'Y',
        mode: 'registration'
      },
      hideInputFooter: false,
      tableCountOption: [
        {
          label: '1개',
          value: 1
        },
        {
          label: '2개',
          value: 2
        },
        {
          label: '3개',
          value: 3
        }
      ]
    }
  },
  mounted() {
    this.setCmpItems()
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
      this.setCmpItems()
    },
    setCmpItems() {
      let cmpItem = {
        type: '',
        info: {}
      }
      let cmpCount = 2
      if (this.form.layoutType === 'sms') {
        cmpCount = 2
      } else {
        cmpCount = 6
      }
      let diff = cmpCount - this.templateData.length
      if (diff >= 0) {
        for (let i = 0; i < diff; i++) {
          this.templateData.push(cmpItem)
        }
      } else {
        for (let i = 0; i < -diff; i++) {
          let num = this.templateData - 1
          this.templateData.splice(num, 1)
        }
      }
    },
    onSelectEmoji(e, target, idx) {
      let emoji = e
      let refName = target
      if (idx !== undefined) {
        this.$refs[refName][0].value += emoji
      } else {
        this.$refs[refName].value += emoji
      }
    },
    addCmpItem(cmp) {
      let cmpItem = {
        type: cmp.cmpType,
        info: {
          imgUrl: cmp.imgUrl
        }
      }
      if (cmp.cmpType === 'table') {
        this.isModalViewed = true
        this.isShowTableReg = true
      } else if (cmp.btnCmp) {
        this.isModalViewed = true
        this.isShowBtnReg = true
      } else {
        cmp.isActive = true
        this.templateData.splice(this.isActiveCmpIndex, 1, cmpItem)
        this.templateData.every((item, i) => {
          if (!item.type) {
            this.isActiveCmpIndex = i
            return false
          } else {
            return true
          }
        })
      }
    },
    setActiveCmp(e) {
      this.isActiveCmpIndex = e
    },
    closeReg() {
      this.isShowBtnReg = false
    }
  }
}
</script>

<style>
</style>
