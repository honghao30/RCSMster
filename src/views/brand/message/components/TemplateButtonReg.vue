<template>
  <div class="form-item__content">
    <div class="form-item-row button-item-row" v-for="(button,index) in buttonInfo" :key="index">
      <div class="inner__input">
        <div class="inner__input-item">
          <span class="form-item__label">버튼 {{ index + 1 }}</span>
        </div>
        <div class="inner__input-item template-button">
          <div class="input-item select-button-type">
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${index}`" :id="`none${index}`" value="none" checked v-model="button.btnEvent"/>
              <label :for="`none${index}`"><span class="radiobox__text">없음</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${index}`" :id="`url${index}`" value="urlExternal" checked v-model="button.btnEvent"/>
              <label :for="`url${index}`"><span class="radiobox__text">URL</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${index}`" :id="`call${index}`" value="call" v-model="button.btnEvent"/>
              <label :for="`call${index}`"><span class="radiobox__text">전화</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${index}`" :id="`otherType${index}`" value="other" v-model="button.btnEvent"/>
              <label :for="`otherType${index}`"><span class="radiobox__text">기타</span></label>
            </span>
            <div class="input">
              <Dropdown :options="buttonTypeOption" v-model="button.btnEventDropdown"
                :disabled="button.btnEvent !== 'other'"
              />
              <!-- !isEdit -->
            </div>
          </div>
          <div class="form-item-row is-emoji">
            <div class="input-item input-limit w--full" >
              <div class="input">
                <input type="text" class="input" maxlength="17"
                  ref="btnName"
                  :disabled="button.length > 1"
                  placeholder="사용자에게 보여지는 버튼이름을 입력해주세요." v-model="button.btnName"
                >
                <div class="input-limit__text">
                  <Emoji @input="onSelectEmoji($event, 'btnName')"/>
                  <p>{{ button.btnName.length }}/17자</p>
                </div>
              </div>
            </div>
          </div>
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
            <div class="input-item input-limit" v-if="button.btnEventDropdown == 'mapPoint'"> <!-- 기획서 v1.0 수정  -- v-if 수정 -->
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
        </div>
      </div>
    </div>
    <!-- 버튼 칼라 -->
    <div class="form-item-row button-item-row">
      <div class="inner__input">
        <div class="inner__input-box">
          <span class="form-item__label">배경색</span>
          <div class="inner__input-item">
            <div class="input-item">
              <span class="radiobox">
                <input type="radio" name="bgColor" id="defaultColor" value="#2f77fb" v-model="buttonInfo.bgColor"/>
                <label for="defaultColor">기본색 ( <span style="background-color:#2f77fb" class="color"></span> )</label>
              </span>
              <span class="radiobox">
                <input type="radio" name="bgColor" id="brandColor" value="#70AD47" v-model="buttonInfo.bgColor"/>
                <label for="brandColor">브랜드색 ( <span style="background-color:#70AD47" class="color"></span> )</label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Dropdown from '@/components/common/Dropdown.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'

export default {
  components: {
    Dropdown,
    Emoji
  },
  props: {
    buttonInfo: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      buttonNumOption: [
        {
          label: '1개',
          value: 1
        },
        {
          label: '2개',
          value: 2
        }
      ],
      buttonTypeOption: [
        {
          label: '간편챗봇 연결',
          value: 'simpleChatbot'
        },
        {
          label: '챗봇 연결',
          value: 'chatbot'
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
        },
        {
          label: 'URL(외부 브라우저)',
          value: 'urlExternal'
        },
        {
          label: '지도 보여주기(좌표)',
          value: 'mapPoint'
        },
        {
          label: '지도 보여주기(쿼리)',
          value: 'mapQuery'
        },
        {
          label: '사용자 위치 공유하기',
          value: 'location'
        },
        {
          label: '캘린더 등록하기',
          value: 'calendar'
        }
      ],
      btnEvent: ''

    }
  },
  mounted() {
    // this.changeBtnRow()
    console.log('체크1', this.buttonInfo)
    this.$watch('buttonInfo', function(newVal, oldVal) {
      console.log(newVal, this.feedInfoData)
    })
  },
  methods: {
    // changeBtnRow () {
    //   let row = this.buttonInfo.buttonNum
    //   let buttonLength = this.buttonInfo.buttons.length
    //   let diff = row - buttonLength
    //   let buttonItem = {
    //     buttonName: '',
    //     buttonType: ''
    //   }
    //   if (diff > 0) {
    //     for (let i = 0; i < diff; i++) {
    //       this.buttonInfo.buttons.push(buttonItem)
    //     }
    //   } else if (diff < 0) {
    //     for (let i = 0; i < -diff; i++) {
    //       this.buttonInfo.buttons.pop()
    //     }
    //   }
    // },
    onSelectEmoji(e, target, idx) {
      let emoji = e
      let refName = target
      if (idx !== undefined) {
        this.$refs[refName][idx].value += emoji
      } else {
        this.$refs[refName].value += emoji
      }
    }
  }
}
</script>

<style>

</style>
