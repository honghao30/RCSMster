<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="대화방 메뉴 등록" />
        <div class="chatroom__wrap">
          <div class="chatroom-registration">
            <div class="chatroom__select--top">
              <div class="chatroom-list">
                <Dropdown :options="dropdownOptions" v-model="form.dropdown">
                </Dropdown>
              </div>
              <div class="chatroom-btn">
                <ButtonCmp
                  type="btn-line"
                  size="small"
                  @click="btnAddMenu"
                >추가</ButtonCmp>
                <ButtonCmp
                  type="btn-line"
                  size="small"
                  @click="btnEditMenu"
                >편집</ButtonCmp>
              </div>
            </div>
            <!-- // 대화방 선택 -->
            <div class="chatroom-menu__wrap--add">
              <TabCmp
              >
                  <TabItem
                     v-for="(menu,index) in chatMenu"
                    :key="index"
                    :title="menu"
                  >
                    <div>
                      <form  ref="form" :model="form">
                        <div class="table__wrap chartroom-menu-add">
                          <table class="table table-bodyonly form-table">
                            <colgroup>
                              <col width="196px">
                              <col />
                            </colgroup>
                            <tbody>
                              <tr>
                                <td colspan="2">
                                    <div class="form-item__content chatroom-menu">
                                        <div class="form-item-row">
                                            <div class="input-item">
                                                <span class="input">
                                                  <input type="text"
                                                    class="input"
                                                    v-model="form.chatTitle"
                                                    :placeholder="`${menu + (index + 1)}을 입력해주세요.`"
                                                  >
                                                </span>
                                                <span class="chat-emoticon">
                                                  <ButtonCmp
                                                      type="btn-only-icon"
                                                      @click="showEmoticon"
                                                  ><i class="icon-emoticon"></i></ButtonCmp>
                                                </span>
                                                <span class="title-cout">
                                                  {{ form.chatTitle.length }}/17자
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2">
                                    <div class="form-item__content chatroom-menu  ">
                                      <span class="radiobox">
                                        <input type="radio" name="chatroomMenu" value="call" v-model="form.checkItem" id="radio1" />
                                        <label for="radio1"><span class="radiobox__text">전화 연결</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="chatroomMenu" value="web" v-model="form.checkItem" id="radio2"  />
                                        <label for="radio2"><span class="radiobox__text">홈페이지 연결</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="chatroomMenu" value="info" v-model="form.checkItem" id="radio3" />
                                        <label for="radio3"><span class="radiobox__text">브랜드 소식 연결</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="chatroomMenu" value="chatbot" v-model="form.checkItem" id="radio4" />
                                        <label for="radio4"><span class="radiobox__text">간편 챗붓 메시지 연결</span></label>
                                      </span>
                                    </div>
                                </td>
                              </tr>
                              <tr v-if="form.checkItem === 'call'">
                                <th scope="row"><span class="form-item__label required">전화 연결</span></th>
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
                              <tr v-if="form.checkItem === 'web'">
                                <th scope="row"><span class="form-item__label required">홈페이지 연결</span></th>
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
                              <tr v-if="form.checkItem === 'info'">
                                <th scope="row"><span class="form-item__label required">브랜드 소식 연결</span></th>
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
                              <tr v-if="form.checkItem === 'chatbot'">
                                <th scope="row"><span class="form-item__label required">간편 챗붓 메시지 연결</span></th>
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
                            </tbody>
                          </table>
                        </div>
                        <div class="button__wrap">
                          <ButtonCmp
                              type="btn-blue"
                              :disabled = "isDisabled"
                              @click="btnSave"
                          >저장</ButtonCmp>
                          <ButtonCmp
                              type="btn-blue-line"
                          >삭제</ButtonCmp>
                        </div>
                      </form>
                    </div>
                  </TabItem>
              </TabCmp>
            <!-- // 대화방 메뉴 추가 -->
            </div>
          </div>
          <div class="chatroom-emulator sticky">
            <ChatEmulator
              :brandName="dropdownOptions"
              :chatName="form.chatTitle"
              :saftyMark="form.saftyMark"
              :allowMsg="form.allowMsg"
              :chatMenu="chatMenu"
            />
          </div>
        </div>
        <div class="button__wrap">
          <ButtonCmp
              type="btn-blue-line"
          >임시 저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
          >대화방 연결</ButtonCmp>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import TabCmp from '@/components/common/TabCmp.vue'
import TabItem from '@/components/common/TabItem.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    TabCmp,
    TabItem,
    Dropdown,
    ChatEmulator
  },
  data() {
    return {
      form: {
        chatTitle: '',
        checkItem: []
      },
      dropdown: '',
      dropdownOptions: [
        {
          label: 'SYSTEM STUDIOS',
          value: 'SYSTEM STUDIOS'
        }
      ],
      chatMenu: ['메뉴명 1']
    }
  },
  computed: {
    isDisabled() {
      // 버튼 활성화에 대한 예시
      return this.form.chatTitle.length <= 0
    }
  },
  methods: {
    btnAddMenu () {
      if (this.chatMenu.length < 6) {
        this.chatMenu.push('메뉴명')
      } else {
        alert('메뉴는 5개까지만 추가할수 있습니다.')
      }
    },
    saveHandle () {
      alert('저장성공')
    }
  }
}
</script>

<!-- // 임시로  -->
<style lang="scss">
  .chatroom-menu__wrap--add {
    .tab-list {
      li.tab-item {
        width:20% !important;
        flex: none !important;
      }
    }
  }
</style>
