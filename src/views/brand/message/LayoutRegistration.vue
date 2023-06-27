<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="레이아웃 등록" />
        <div class="registration__wrap">
          <div class="registration-form__wrap">
            <form  ref="form" :model="form">
              <div class="type__radio-tab">
                <ul>
                  <li>
                    <input type="radio" id="sms" value="sms" v-model="form.layoutType" class="blind"/>
                    <label for="sms">
                      <i class="icon-chatbubble"></i>
                      <dl>
                        <dt class="tab-title">SMS<span> (40~45자)</span></dt>
                        <dd class="tab-text">간단한 알림이나 짧은 공지를 메시지로 발송</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="lms" value="lms" v-model="form.layoutType" class="blind" />
                    <label for="lms">
                      <i class="icon-chatbubble"></i>
                      <dl>
                        <dt class="tab-title">LMS<span> (1,000자)</span></dt>
                        <dd class="tab-text">내용이 긴 메시지를 한번에 발송</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="mms" value="mms" v-model="form.layoutType" class="blind" />
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
              <!-- <div class="msg-cmp__list">
                <div class="cmp-item">
                  <p class="cmp-title">Main Title</p>
                  <div></div>
                </div>
              </div> -->
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
                    <tr>
                      <th scope="row"><span class="form-item__label">테이블 개수</span></th>
                      <td>
                        <div class="form-item__content is-emoji">
                          <div class="form-item-row">
                            <div class="input-item">
                              <Dropdown
                              v-model="form.tableCount" placeholder="테이블 개수 선택" :options="tableCountOption"/>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">버튼 유형</span></th>
                      <td>
                        <div class="form-item__content is-emoji">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" name="btnDirection" id="row" value="row" v-model="form.btnDirection"
                                />
                                <label for="row"><span class="radiobox__text">좌우 버튼</span></label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="btnDirection" id="column" value="column" v-model="form.btnDirection"
                                />
                                <label for="column"><span class="radiobox__text">상하 버튼</span></label>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class="brand-aside">
            <ChatEmulator
              :chatInfoData="chatInfoData"
              :chatMsgData="form"
            />
          </div>
          <!-- // 에뮬레이터 -->
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
          >저장</ButtonCmp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
export default {
  components: {
    PageTitle,
    ChatEmulator,
    BrandLnb,
    ButtonCmp,
    Emoji,
    Dropdown
  },
  data() {
    return {
      form: {
        layoutType: 'sms',
        layoutName: '',
        btnDirection: 'row',
        tableCount: ''
      },
      chatInfoData: {
        chatType: 'chatBubble',
        chatRoomName: 'SYSTEMSTUDIO',
        saftyMark: 'Y',
        hideInputFooter: true,
        mode: 'registration'
      },
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
  computed: {
  },
  methods: {
    onSelectEmoji(e, target, idx) {
      let emoji = e
      let refName = target
      if (idx !== undefined) {
        this.$refs[refName][0].value += emoji
      } else {
        this.$refs[refName].value += emoji
      }
    }
  }
}
</script>

<style>
</style>
