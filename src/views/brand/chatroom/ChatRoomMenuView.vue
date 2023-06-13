<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="SYSTEM STUDIOS 대화방 메뉴" />
        <PageTitleH3 titleh3="대화방 정보" />
        <div class="chatroom__wrap--view">
          <div class="chatroom-menu__view">
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">사용 여부</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ chatroomList[0].status }}</span>
                          </div>
                        </div>
                        <!-- <p class="not-user-msg">
                          현재 해당 대화방은 일시중지 상태입니다.<br>
                          일시중지 상태를 해제하려면 <router-link to="#">고객센터</router-link>에 문의해주세요.
                        </p> -->
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">대화방 명</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ chatroomList[0].chatRoomName }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">발신번호/회신번호</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ chatroomList[0].phoneNUm }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">챗봇 ID</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ chatroomList[0].chatID }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="chatroom-munu__h3-wrap">
              <PageTitleH3 titleh3="대화방 메뉴" />
              <ButtonCmp
                type="btn-line"
                size="small"
                @click="copyChatRoom"
              >
                대화방 메뉴 복사
              </ButtonCmp>
            </div>
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="280px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr
                    v-for="(menu, index) in chatroomList[0].list"
                    :key="index"
                  >
                    <th scope="row"><span class="form-item__label">{{ menu.label }}</span></th>
                    <td>
                      <div class="form-item__content">
                        <ul class="chatroom-menu__list">
                          <li
                            v-for="(item, index) in menu.menuDetails"
                            :key="index"
                          >
                          {{ item.title }} <br v-if="item.sevice !== ''"> {{ item.sevice }}
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="chatroom-emulator sticky">
            <ChatEmulator
              :chatInfoData="chatroomList[0]"
              :chatMenuList="chatroomList[0].list"
            />
          </div>
        </div>
        <div class="button__wrap">
          <ButtonCmp
              type="btn-blue-line"
          >삭제</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
          >수정</ButtonCmp>
        </div>
      </div>
    </div>
    <!-- modal  -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <DublicationChatMenu
          @closeModal="isModalViewed = false"
        >
      </DublicationChatMenu>
    </ModalView>
    <!-- modal  -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ModalView from '@/components/common/ModalView.vue'
import DublicationChatMenu from '@/views/brand/components/DublicationChatMenu'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    ChatEmulator,
    DublicationChatMenu
  },
  data() {
    return {
      isModalViewed: false,
      chatroomList: [
        {
          chatRoomName: 'SYSTEMSTUDIO',
          phoneNUm: '010-5151-5151',
          chatID: 'bot-i7ke7f30e6c',
          status: '사용',
          saftyMark: 'Y',
          allowMsg: 'N',
          list: [
            {
              label: '자주 묻는 질문✋',
              value: '🎀상담직원 연결👋',
              menuDetails: [
                {
                  title: '전화연결',
                  sevice: '010-5151-5151'
                }
              ]
            },
            {
              label: '🍉나에게 맞는 상품은?🍓',
              value: '🍉나에게 맞는 상품은?🍓',
              menuDetails: [
                {
                  title: '간편 챗붓 연결',
                  sevice: 'SYSTEM STUDIO 간편 챗봇 1'
                }
              ]
            },
            {
              label: '🍉23FW 미리보기🍒',
              value: '🍉23FW 미리보기🍒',
              menuDetails: [
                {
                  title: '브랜드 소식 연결',
                  sevice: ''
                },
                {
                  title: '많이 찾는 FAQ 미리보기',
                  sevice: ''
                },
                {
                  title: 'BR.13L49F42Mo.28tF0K7EuV',
                  sevice: ''
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    copyChatRoom () {
      this.isModalViewed = true
    }
  }
}
</script>
