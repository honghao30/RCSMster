<template>
  <div>
    <div class="button-group"
      v-for="(button,index) in buttonInfo"
      :key="index"
    >
    <!-- 위에 div 2개는 v-for 돌리기 위해서 추가한 태그  - 기획서 1.0 수정 내용 -->
      <div class="form-item__content chip-btn__reg">
        <div class="form-item-row">
          <!-- 버튼 선택 - 기획서 1.0 변경 내용 -->
          <div class="input-item select-button-type">
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${index}`" :id="`url${index}`" value="urlExternal" checked v-model="button.btnEvent"/>
              <label :for="`url${index}`"><span class="radiobox__text">URL 연결</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${index}`" :id="`call${index}`" value="call" v-model="button.btnEvent"/>
              <label :for="`call${index}`"><span class="radiobox__text">전화하기</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${index}`" :id="`otherType${index}`" value="other" v-model="button.btnEvent"/>
              <label :for="`otherType${index}`"><span class="radiobox__text">기타</span></label>
            </span>
            <div class="input">
              <Dropdown :options="buttonEventOptions" v-model="button.btnEventDropdown"
                :disabled="button.btnEvent !== 'other' && !isEdit"
              />
            </div>
          </div>
           <!-- //버튼 선택 - 기획서 1.0 변경 내용 -->
        </div>
        <!-- 기획서 v1.0 수정  -- URL 연결 -->
        <div v-if="button.btnEvent == 'urlExternal'" class="response-inner-box">
          <div class="form-item-row is-emoji">
            <div class="input-item input-limit w--full">
              <div class="input">
                <input type="text" class="input" maxlength="17"
                  ref="btnName"
                  :disabled="button.length > 1 && !isEdit"
                  placeholder="사용자에게 보여지는 버튼이름을 입력해주세요." v-model="button.btnName"
                >
                <div class="input-limit__text">
                  <Emoji @input="onSelectEmoji($event, 'btnName')"/>
                  <p>{{ button.btnName.length }}/17자</p>
                </div>
              </div>
            </div>
          </div>
          <div class="input-item w--full">
            <div class="input">
              <input type="text" class="input"
                placeholder="http:// 형식으로 입력해주세요." v-model="button.btnNameUrl"
              >
            </div>
          </div>
          <p class="guide-text black">&middot; 브랜드 개설 시 입력한 웹사이트 주소로 연결됩니다.</p>
        </div>
        <!-- // 기획서 v1.0 수정  -- URL 연결 -->
        <!-- 기획서 v1.0 수정  -- 전화하기 -->
        <div v-if="button.btnEvent == 'call'" class="response-inner-box">
          <div class="form-item-row is-emoji">
            <div class="input-item input-limit w--full">
              <div class="input">
                <input type="text" class="input" maxlength="17"
                  ref="btnName"
                  :disabled="button.length > 1 && !isEdit"
                  placeholder="사용자에게 보여지는 버튼이름을 입력해주세요." v-model="button.btnName"
                >
                <div class="input-limit__text">
                  <Emoji @input="onSelectEmoji($event, 'btnName')"/>
                  <p>{{ button.btnName.length }}/17자</p>
                </div>
              </div>
            </div>
          </div>
          <div class="input-item input-limit w--full">
            <div class="input">
              <input type="text" class="input"
                placeholder="http:// 형식으로 입력해주세요." v-model="button.btnNameCall"
              >
              <div class="input-limit__text">
                  <p>{{ button.btnNameCall.length }}/40자</p>
              </div>
            </div>
          </div>
        </div>
        <!-- // 기획서 v1.0 수정  -- 전화하기 -->
        <!-- 기획서 v1.0 수정  -- 기타 / 공통부분 -->
        <div class="form-item-row is-emoji" v-if="button.btnEvent == 'other'">
          <div class="input-item input-limit w--full" >
            <div class="input">
              <input type="text" class="input" maxlength="17"
                ref="btnName"
                :disabled="button.length > 1 && !isEdit"
                placeholder="사용자에게 보여지는 버튼이름을 입력해주세요." v-model="button.btnName"
              >
              <div class="input-limit__text">
                <Emoji @input="onSelectEmoji($event, 'btnName')"/>
                <p>{{ button.btnName.length }}/17자</p>
              </div>
            </div>
          </div>
        </div>
        <!-- // 기획서 v1.0 수정  -- 기타 / 공통부분 -->
        <!-- 버튼 선택 - 기획서 1.0 추가된 연결이 있습니다. -->
        <div class="form-item-row" v-if="button.btnEventDropdown == 'simpleChatbot'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
          <div class="input-item w--full" >
            <span class="input">
              <input type="text" placeholder="연결할 간편챗봇 메시지를 선택하세요." v-model="button.simpleChatbot" disabled/>
            </span>
            <ButtonCmp
              type="btn-default-line"
              @click="$emit('openChatbotModal')"
              >간편챗봇 선택
            </ButtonCmp>
          </div>
        </div>
        <div class="form-item-row" v-if="button.btnEventDropdown == 'chatbot'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
          <div class="input-item w--full" >
            <span class="input">
              <input type="text" placeholder="http://api.import.kr/application/json" v-model="button.chatbot" disabled/>
            </span>
          </div>
        </div>
        <div class="form-item-row" v-if="button.btnEventDropdown == 'call'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
          <div class="input-item input-limit">
            <div class="input">
              <input type="text" placeholder="-없이 번호만 입력해주세요." v-model="button.call" maxlength="40"/>
              <p class="input-limit__text">
                {{ button.call.length }}/40자
              </p>
            </div>
          </div>
        </div>
        <div class="form-item-row" v-if="button.btnEventDropdown == 'feed'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
          <div class="input-item w--full" >
            <span class="input">
              <input type="text" placeholder="http://brandnews/pages/viewpage.action?pag" v-model="button.call" disabled/>
            </span>
            <ButtonCmp
              type="btn-default-line"
              >브랜드 소식 선택
            </ButtonCmp>
          </div>
        </div>
        <div class="form-item-row" v-if="button.btnEventDropdown == 'copy'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
          <div class="input-item  w--full" >
            <div class="textarea">
              <textarea maxlength="200" placeholder="복사할 내용을 입력해주세요."  v-model="button.copyContent"
              ref="copyContent"
              ></textarea>
              <div class="textarea-limit__text">
                <Emoji @input="onSelectEmoji($event, 'copyContent')"/>
                <p>
                  {{ button.copyContent.length }}/200자
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="form-item-row" v-if="button.btnEventDropdown == 'chatroom'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
          <div class="input-item input-limit" >
            <div class="input">
              <input type="text" placeholder="-없이 번호만 입력해주세요." v-model="button.message.call" maxlength="40"/>
              <p class="input-limit__text">
                {{ button.message.call.length }}/40자
              </p>
            </div>
          </div>
          <div class="input-item w--full" >
            <div class="textarea">
              <textarea maxlength="100" placeholder="문자메시지 내용을 입력해주세요." v-model="button.message.content"
              ref="msgContent"
              ></textarea>
              <div class="textarea-limit__text">
                <Emoji @input="onSelectEmoji($event, 'msgContent')"/>
                <p>
                  {{ button.message.content.length }}/100자
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="form-item-row" v-if="button.btnEventDropdown == 'urlExternal'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
          <div class="input-item input-limit">
            <div class="input">
              <input type="text" placeholder="http:// 형식으로 입력해주세요." v-model="button.browser.url" maxlength="100"/>
              <p class="input-limit__text">
                {{ button.browser.url.length }}/100자
              </p>
            </div>
          </div>
        </div>
        <div class="form-item-row" v-if="button.btnEventDropdown == 'urlInternal'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
          <div class="input-item input-limit">
            <div class="input">
              <input type="text" placeholder="http:// 형식으로 입력해주세요." v-model="button.browser.url" maxlength="100"/>
              <p class="input-limit__text">
                {{ button.browser.url }}/100자
              </p>
            </div>
          </div>
          <div class="input-item">
            <span class="item-label">보기 방식</span>
            <span class="radiobox">
              <input type="radio" name="viewMode" id="fullView" value="fullView" v-model="button.browser.viewMode"
              />
              <label for="fullView"><span class="radiobox__text">Full view</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" name="viewMode" id="HalfView" value="HalfView" v-model="button.browser.viewMode"
              />
              <label for="HalfView"><span class="radiobox__text">Half view</span></label>
            </span>
          </div>
          <div class="input-item w--full" >
            <div class="textarea">
              <textarea maxlength="1000" style="height: 230px"
              v-model="button.browser.viewSource"
              placeholder='인앱브라우저에서 URL 호출 시 POST방식으로 파라미터를 전달하고자 할 경우, 파라미터 개수만큼 아래 형식으로 구분하여 작성하세요. (URL 상의 웹페이지는 content-type:application/x-www-form-urlencoded로 설정하시면 됩니다.)
    <작성예시>
    "name":"value", "alge":30,"isBoolean":true'></textarea>
              <div class="textarea-limit__text">
                <p>
                  {{ button.browser.viewSource.length }}/1000자
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="form-item-row" v-if="button.btnEventDropdown == 'mapPoint' || button.btnEventDropdown == 'mapQuery'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
          <div class="input-item input-limit" v-if="button.btnEventDropdown == 'mapPoint'">
            <div class="input">
              <input type="text" placeholder="위도를 입력해주세요." v-model="button.map.latitude" maxlength="40"/>
              <p class="input-limit__text">
                {{ button.map.latitude.length }}/40자
              </p>
            </div>
          </div>
          <div class="input-item input-limit" v-if="button.btnEventDropdown == 'mapPoint'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
            <div class="input">
              <input type="text" placeholder="경도를 입력해주세요." v-model="button.map.longitude" maxlength="40"/>
              <p class="input-limit__text">
                {{ button.map.longitude.length }}/40자
              </p>
            </div>
          </div>
          <div class="input-item input-limit">
            <div class="input">
              <input type="text" placeholder="위치를 입력해주세요." v-model="button.map.location" maxlength="100"/>
              <p class="input-limit__text">
                {{ button.map.location.length }}/100자
              </p>
            </div>
          </div>
          <div class="input-item input-limit">
            <div class="input">
              <input type="text" placeholder="Fallback URL을 입력 http:// 형식으로 입력해주세요." v-model="button.map.url" maxlength="100"/>
              <p class="input-limit__text">
                {{ button.map.url.length }}/100자
              </p>
            </div>
          </div>
        </div>
        <div class="form-item-row" v-if="button.btnEventDropdown == 'calendar'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
          <div class="input-item w--full">
            <el-date-picker
              v-model="button.calendar.date"
              type="daterange"
              range-separator="~"
              format="yyyy.MM.dd"
              value-format="yyyyMMdd"
              class="w--full"
            />
          </div>
          <div class="input-item input-limit">
            <div class="input">
              <input type="text" placeholder="제목을 입력해주세요." v-model="button.calendar.title" maxlength="40"/>
              <p class="input-limit__text">
                {{ button.calendar.title.length }}/40자
              </p>
            </div>
          </div>
          <div class="input-item w--full" >
            <div class="textarea">
              <textarea maxlength="500" placeholder="내용을 입력해주세요."
              ref="calContent"
              v-model="button.calendar.content"></textarea>
              <div class="textarea-limit__text">
                <Emoji @input="onSelectEmoji($event, 'calContent')"/>
                <p>
                  {{ button.calendar.content.length }}/500자
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- //버튼 선택 - 기획서 1.0 추가된 연결이 있습니다. -->
        <!-- 기획서 1.0 수정 -- 버튼 노출 방식 변경으로 삭제 -->
      <!-- <div class="form-item-row">
        <ButtonCmp
          type="btn-default-line"
          @click="addBtn"
          :disabled="buttons.length > 1"
          v-if="!this.isEdit"
          >추가
        </ButtonCmp>
        <ButtonCmp
            type="btn-default-line"
            @click="saveBtnInfo"
            v-if="this.isEdit"
          >수정
        </ButtonCmp>
      </div> -->
        <!-- <div class="form-item-row" v-if="buttons.length">
          <ul class="button-reg-list">
            <template v-for="(btn, j) in buttons">
              <li
                v-if="btn.btnName"
                @click="editBtnInfo(j)"
                :key="j"
                :class="{'active': activeBtnIndex == j}"
              >
                <span class="button-name">{{ btn.btnName }}</span>
                <a role="button" class="btn-del" @click="removeBtn(j)"><span class="blind" >삭제</span></a>
              </li>
            </template>
          </ul>
        </div> -->
      <!-- // 기획서 1.0 수정 -- 버튼 노출 방식 변경으로 삭제 -->
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/common/Dropdown.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
export default {
  components: {
    Dropdown,
    ButtonCmp,
    Emoji
  },
  props: {
    buttonLen: {
      type: String
    }
  },
  data () {
    return {
      isEdit: false,
      activeBtnIndex: undefined,
      buttonInfo: [{
        btnName: '',
        btnNameUrl: '', // 기획서 v1.0 수정
        btnNameCall: '', // 기획서 v1.0 수정
        btnEvent: '',
        btnEventDropdown: '', // 기획서 v1.0 수정
        simpleChatbot: '',
        chatbot: '',
        call: '',
        feed: '',
        copyContent: '',
        message: {
          call: '',
          content: ''
        },
        browser: {
          url: '',
          viewMode: 'fullView',
          viewSource: ''
        },
        map: {
          latitude: '',
          longitude: '',
          location: '',
          url: '',
          query: ''
        },
        calendar: {
          date: '',
          title: '',
          content: ''
        }
      }],
      buttonEventOptions: [
        {
          label: '전화걸기',
          value: 'call'
        },
        {
          label: '브랜드 소식 연결',
          value: 'feed'
        },
        {
          label: '복사하기',
          value: 'copy'
        },
        {
          label: '다른 대화방 연결',
          value: 'chatroom'
        }
      ]
    }
  },
  mounted () {
    this.$watch('buttonLen', function(newVal, oldVal) {
      let btn = {
        btnName: '',
        btnEvent: '',
        simpleChatbot: '',
        chatbot: '',
        call: '',
        feed: '',
        copyContent: '',
        message: {
          call: '',
          content: ''
        },
        browser: {
          url: '',
          viewMode: '',
          viewSource: ''
        },
        map: {
          latitude: '',
          longitude: '',
          location: '',
          url: '',
          query: ''
        },
        calendar: {
          date: '',
          title: '',
          content: ''
        }
      }
      this.buttonCont = this.buttonInfo.length
      if (this.buttonCont < newVal) {
        const remainder = newVal - this.buttonCont
        for (let i = 0; i < remainder; i++) {
          this.buttonInfo.push(btn)
          console.log('add', this.buttonInfo)
        }
      } else if (this.buttonCont > newVal) {
        const remainder = this.buttonCont - newVal
        this.buttonInfo.splice(this.buttonCont - remainder, remainder)
      }
    })
  },
  methods: {
    // resetButtonData() {
    //   let btn = {
    //     btnName: '',
    //     btnEvent: ''
    //   }
    //   this.buttonInfo = btn
    // },
    // addBtn() {
    //   let btn = Object.assign({}, this.buttonInfo)
    //   this.buttons.push(btn)
    //   this.resetButtonData()
    // },
    // editBtnInfo (index) {
    //   this.activeBtnIndex = index
    //   this.buttonInfo = Object.assign({}, this.buttons[index])
    //   this.isEdit = true
    // },
    // saveBtnInfo() {
    //   this.buttons[this.activeBtnIndex] = Object.assign({}, this.buttonInfo)
    //   this.activeBtnIndex = undefined
    //   this.resetButtonData()
    //   this.isEdit = false
    // },
    // removeBtn(index) {
    //   this.buttons.splice(index, 1)
    //   this.resetButtonData()
    //   this.isEdit = false
    // },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    }
  }
}
</script>

<style>

</style>
