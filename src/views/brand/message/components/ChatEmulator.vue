<template>
  <div class="chat-emulator__wrap">
    <div class="chat-emulator layout">
      <div class="emulator-header">
        <div class="emulator-header__inner">
          <button class="btn-back"><span class="blind">이전으로</span></button>
          <div class="profile">
            <div class="profile__image">
              <img src="@/assets/images/dummy/brand_logo.png" alt="">
            </div>
            <p>대화방 명</p>
            <button class="btn-down"></button>
          </div>
        </div>
        <button class="btn-more"><span class="blind">정보</span></button>
      </div>
      <div class="emulator-body">
        <transition name="bodyshow">
          <div class="chat-item__wrap">
            <div class="message-box">
              <p class="safty-icon">확인된 발신번호</p>
              <template v-if="mode === 'template'">
                <div class="template-item"
                >
                  <div class="template-item__box">
                    <TemplateItem
                      :itemData="item"
                      :mode="mode"
                      v-for="(item, j) in templateData"
                      :key="j"
                    />
                  </div>
                </div>
              </template>
              <template v-else>
                <draggable
                  class="component-list"
                  :list="templateData"
                  group="comp"
                  handle=".btn-drag"
                >
                  <div class="template-item cmp-item"
                    v-for="(item, j) in templateData"
                    :key="j"
                    :class="[{'inactive' : isActiveCmpIndex !== j}, {'edit': isCmpEdit}]"
                    >
                    <div class="template-item__box item--none" v-if="!item.type" >
                      <p class="default-msg" v-if="isActiveCmpIndex === j">컴포넌트를 선택해주세요.</p>
                      <p class="default-msg" v-else>등록된 컴포넌트가 없습니다.</p>
                    </div>
                    <TemplateItem v-else
                      :itemData="item"
                      :mode="mode"
                        />
                    <div class="ctrl" v-if="isCmpEdit">
                      <div class="ctrl-menu">
                        <ButtonCmp
                          type="btn-only-icon"
                          iconname='icon-menu'
                          class="btn-menu"
                          @click="showLayerMenu(j)"
                        ><span class="irtext">메뉴</span>
                        </ButtonCmp>
                        <ul class="layer-menu" v-if="j == isShowLayerIndex">
                          <li><a role="button">수정</a></li>
                          <li><a role="button" @click="removeCmp(j)">삭제</a></li>
                        </ul>
                      </div>
                      <ButtonCmp
                        type="btn-only-icon"
                        iconname='icon-drag'
                        class="btn-drag"
                      ><span class="irtext">드래그</span>
                      </ButtonCmp>
                    </div>
                  </div>
                </draggable>
                <div class="button__wrap">
                  <ButtonCmp
                    type="btn-blue-line"
                    v-if="!(isCmpEdit || viewMode === 'isView')"
                    @click="isCmpEdit = !isCmpEdit"
                  >컴포넌트 편집
                  </ButtonCmp>
                  <ButtonCmp
                    type="btn-line"
                    v-if="isCmpEdit"
                    @click="isCmpEdit = !isCmpEdit"
                  >취소
                  </ButtonCmp>
                  <ButtonCmp
                    type="btn-blue"
                    v-if="isCmpEdit"
                    @click="onEditComp"
                  >완료
                  </ButtonCmp>
                </div>
              </template>

            </div>
          </div>

        </transition>
      </div>
      <div class="emulator-footer" v-if="hideInputFooter">
        <div class="emulator-footer__inner">
          <div class="emulator-footer__top">
            <ButtonCmp
              type="btn-bar-toggle"
              @click="btnToggleMenu"
            >
              <span class="irtext">토글</span>
            </ButtonCmp>
            <ul class="chat-menu__list-inemul"
              :class="{ collapse : collapse }"
            >
              <li
                v-for="(list, k) in chatMenuList"
                :key="k"
              >
                <router-link to="#">{{ list.menuTitle }}</router-link>
              </li>
            </ul>
          </div>
          <div class="emulator-footer__allow-input">
            <ButtonCmp
              type="btn-only-icon"
              iconname='icon-photo'
              disabled
            ><span class="irtext">사진</span>
            </ButtonCmp>
            <ButtonCmp
              type="btn-only-icon"
              iconname='icon-camera'
              disabled
            ><span class="irtext">카메라</span>
            </ButtonCmp>
            <ButtonCmp
              type="btn-only-icon"
              iconname='icon-plus'
              disabled
            > <span class="irtext">더보기</span>
            </ButtonCmp>
            <span class="input">
              <input type="text" />
              <ButtonCmp
                type="btn-only-icon"
                iconname='icon-emoji'
                disabled
              > <span class="irtext">더보기</span>
              </ButtonCmp>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { getTodayDate } from '@/utils/time.js'
import draggable from 'vuedraggable'
import TemplateItem from '@/views/brand/message/components/TemplateItem.vue'
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    ButtonCmp,
    TemplateItem,
    draggable
  },
  props: {
    messageTemplate: {
      type: Array,
      default: null
    },
    templateData: {
      type: Array,
      default: null
    },
    isActiveCmpIndex: {
      type: Number,
      defalut: 0
    },
    mode: {
      type: String,
      default: 'template'
    },
    viewMode: {
      type: String,
      defalut: ''
    },
    hideInputFooter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      chatMenuList: [{
        menuTitle: '😍 상담직원 연결 👌🏻'
      }],
      todayDateFull: '',
      todayData: '',
      currentTime: '',
      isOpen: false,
      isBlind: false,
      isShort: true,
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 'auto'
      },
      collapse: false,
      isShowLayerIndex: undefined,
      isCmpEdit: false
    }
  },
  mounted() {
    [this.todayDateFull, this.todayData, this.currentTime] = getTodayDate()
    console.log('체크1', this.viewMode)
  },
  methods: {
    btnToggleMenu () {
      this.collapse = !this.collapse
    },
    showLayerMenu(idx) {
      if (this.isShowLayerIndex !== idx) {
        this.isShowLayerIndex = idx
      } else {
        this.isShowLayerIndex = undefined
      }
    },
    removeCmp(idx) {
      let cmpItem = {
        type: '',
        info: {}
      }
      this.templateData.splice(idx, 1, cmpItem)
    },
    onClickOutside() {
      this.isShowLayerIndex = undefined
    },
    onEditComp() {
      this.isCmpEdit = !this.isCmpEdit
      this.templateData.every((item, i) => {
        if (!item.type) {
          this.isActiveCmpIndex = i
          return false
        } else {
          return true
        }
      })
      this.$emit('setActiveCmp', this.isActiveCmpIndex)
    }
  }
}
</script>
