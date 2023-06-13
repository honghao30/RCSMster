<template>
  <div class="brand__wrap brand__feed">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="간편챗봇 메시지 등록" />
        <div class="chatroom__wrap">
          <div class="chatroom-registration">
            <form  ref="form" :model="form">
              <div class="chat-type__radio-tab">
                <ul>
                  <li>
                    <input type="radio" id="chatBubble" value="chatBubble" v-model="form.chatType" class="blind"/>
                    <label for="chatBubble">
                      <i class="icon-chatbubble"></i>
                      <span class="tab-title">말풍선</span>
                      <span class="tab-text">텍스트 중심의 간단한 메시지 작성</span>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="card" value="card" v-model="form.chatType" class="blind"/>
                    <label for="card">
                      <i class="icon-card"></i>
                      <span class="tab-title">카드</span>
                      <span class="tab-text">이미지와 텍스트를 혼합하여 풍부한 메시지 작성​</span>
                    </label>
                  </li>
                </ul>
              </div>
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px" />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label required">간편챗봇 메시지 이름</span>
                      </th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <span class="input">
                                <input type="text"  maxlength="30" placeholder="간편챗봇 이름을 입력해주세요." v-model="form.chatbotMsgName">
                                <ButtonCmp
                                  type="btn-only-icon"
                                  iconname='icon-emoji'
                                  @click="showEmojiChatName = !showEmojiChatName"
                                  >
                                </ButtonCmp>
                                <emoji-picker
                                  id="emojiPicker"
                                  @emoji-click="onSelectEmoji($event, 'slideTitle', j)"
                                  v-show="showEmojiChatName" class="light emoji-wrap"
                                ></emoji-picker>
                                <p class="input-limit__text">
                                  {{ form.chatbotMsgName.length }}/30자
                                </p>

                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label required">메시지 복사</span>
                      </th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" id="copyY" name="copyMsg" v-model="form.copyMsg"/>
                                <label for="copyY">가능</label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" id="copyN" name="copyMsg" v-model="form.copyMsg"/>
                                <label for="copyN">불가능</label>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">응답 버튼</span>
                      </th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" id="useN" name="replyBtn" v-model="form.replyBtn"/>
                                <label for="useN">미사용</label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" id="useY" name="replyBtn" v-model="form.replyBtn"/>
                                <label for="useY">사용</label>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <div class="item-reg__wrap">
                <div class="item-reg__inner">
                  <draggable
                    v-model="form.slideData"
                    class="item-reg__list"
                    draggable=".item--draggable"
                  >
                    <div
                      v-for="(slide, j) in form.slideData" :key="j"
                      class="item"
                      :class="[{'active': slide.isActive}, {'item--draggable': isSlideCardEdit}]"
                      @click="slideActive(j)"
                    >
                      <span v-text="`카드${slide.slideIndex}`" class="item-text"></span>
                      <a role="button" class="btn-del" v-if="isSlideCardEdit
                      "><span class="blind">삭제</span></a>
                    </div>
                  </draggable>
                  <a role="button" class="btn-add">+<span class="blind">추가</span></a>
                </div>
                <a role="button" class="btn small btn-line" @click="isSlideCardEdit = true" v-if="!isSlideCardEdit">편집</a>
                <a role="button" class="btn small btn-blue" v-if="isSlideCardEdit" @click="saveCardEdit">저장</a>
                <div class="guide-box" v-if="isSlideCardEdit">
                  <p class="guide-text black">&middot; 선택한 슬라이드는 드래그로 순서 변경이 가능합니다.</p>
                  <p class="guide-text black">&middot; 첫번째로 위치한 카드는 삭제 불가합니다.</p>
                </div>
              </div> -->
            </form>
          </div>
          <div class="chatroom-emulator sticky">
            <ChatEmulator :chatInfoData="form" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import 'emoji-picker-element'
export default {
  components: {
    BrandLnb,
    PageTitle,
    ChatEmulator,
    ButtonCmp
  },
  data() {
    return {
      form: {
        chatType: 'chatBubble',
        chatbotMsgName: '',
        copyMsg: '',
        replyBtn: ''
      },
      showEmojiChatName: false
    }
  },
  methods: {
    onSelectEmoji(e) {
      let code = e.detail.unicode
      this.form.showEmojiChatName += code
    }
  }
}
</script>
