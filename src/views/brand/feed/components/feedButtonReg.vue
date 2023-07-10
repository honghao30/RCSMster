<template>
  <div>
    <div
      class="button-group"
      v-for="(button, index) in buttonList"
      :key="index"
    >
      <div class="form-item-row">
          <div class="input-item select-button-type">
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${index}`" :id="`url${index}`" value="url" v-model="button.btnType"/>
              <label :for="`url${index}`"><span class="radiobox__text">URL 연결</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${index}`" :id="`call${index}`" value="call" v-model="button.btnType"/>
              <label :for="`call${index}`"><span class="radiobox__text">전화하기</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${index}`"  :id="`otherType${index}`" value="other" v-model="button.btnType" />
              <label :for="`otherType${index}`"><span class="radiobox__text">기타</span></label>
            </span>
            <div class="input">
              <Dropdown :options="btnTypeOption" placeholder="선택" v-model="button.btnType"
                :disabled="button.btnType !== 'other'"
              />
            </div>
          </div>
      </div>
      <div class="form-item-row is-emoji">
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
      <!-- url -->
      <div class="form-item-row" v-if="button.btnType == 'url'">
        <div class="input-item">
          <span class="input">
              <input type="text" class="input" maxlength="40" placeholder="http://형식으로 입력해주세요." v-model="button.url">
          </span>
        </div>
      </div>
      <!-- // url -->
      <!-- app연결 -->
      <div class="form-item-row" v-if="button.btnType == 'app'">
        <div class="input-item w--full">
          <span class="input">
              <input type="text" class="input" maxlength="40" placeholder="http://형식으로 입력해주세요." v-model="button.app.url">
          </span>
        </div>
        <div class="input-item w--full">
          <span class="input">
              <input type="text" class="input" maxlength="40" placeholder="Package name을 입력해주세요." v-model="button.app.packageName">
          </span>
        </div>
        <div class="input-item w--full">
          <span class="input">
              <input type="text" class="input" maxlength="40" placeholder="Scheme을 입력해주세요." v-model="button.app.scheme">
          </span>
        </div>
      </div>
      <!-- //app연결 -->
      <!-- 전화하기 -->
      <div class="form-item-row" v-if="button.btnType == 'call'">
        <div class="input-item input-limit">
          <div class="input">
            <input type="text" placeholder="-없이 번호만 입력해주세요." v-model="button.call" maxlength="40"/>
            <p class="input-limit__text">
              {{ button.call.length }}/40자
            </p>
          </div>
        </div>
      </div>
        <!-- // 전화하기 -->
      <!-- 대화방 -->
      <div class="form-item-row" v-if="button.btnType == 'chatroom'">
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
      <!-- //대화방 -->
    </div>

    <!-- 기획서 v1.0 수정 --- 버튼 삭제-->
    <!-- <div class="form-item-row">
          <ButtonCmp
                type="btn-default-line"
                @click="addBtn"
                :disabled="buttons.length > 1"
                v-if="!isEdit"
            >버튼추가
          </ButtonCmp>
          <ButtonCmp
                type="btn-default-line"
                @click="saveBtnInfo"
                v-if="this.isEdit"
            >수정
          </ButtonCmp>
        </div> -->
    <!-- //기획서 v1.0 수정 --- 버튼 삭제-->
    <div class="form-item-row" v-if="buttons.length">
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
    </div>
    <!-- 모달 영역 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 대화방 선택 모달 -->
      <SelectChatroom
        @closeModal="isModalViewed = false"
        v-if="isModalChat"
      >
      </SelectChatroom>
    </ModalView>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ModalView from '@/components/common/ModalView.vue'
import SelectChatroom from '@/views/brand/feed/components/SelectChatroom.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'

export default {
  components: {
    ButtonCmp,
    Dropdown,
    ModalView,
    Emoji,
    SelectChatroom
  },
  props: {
    buttons: {
      type: Array
    },
    btnUseLen: {
      type: String
    }
  },
  data() {
    return {
      isEdit: false,
      activeBtnIndex: undefined,
      buttonList: [{
        btnName: '',
        btnType: '',
        btnTypeQuck: '',
        btnEvent: '',
        url: '',
        app: {
          url: '',
          packageName: '',
          scheme: ''
        },
        message: {
          call: '',
          content: ''
        },
        chatRoom: '',
        call: ''
      }],
      btnTypeOption: [
        {
          label: 'App 연결',
          value: 'app'
        },
        {
          label: '대화방 연결',
          value: 'chatroom'
        }
      ],
      isModalViewed: false,
      isModalChat: false
    }
  },
  created () {
    this.$watch('btnUseLen', function(newVal, oldVal) {
      let btn = {
        btnName: '',
        btnType: '',
        url: '',
        app: {
          url: '',
          packageName: '',
          scheme: ''
        },
        chatRoom: '',
        call: ''
      }
      this.buttonCont = this.buttonList.length
      if (this.buttonCont < newVal) {
        const remainder = newVal - this.buttonCont
        for (let i = 0; i < remainder; i++) {
          this.buttonList.push(btn)
        }
      } else if (this.buttonCont > newVal) {
        const remainder = this.buttonCont - newVal
        this.buttonList.splice(this.buttonCont - remainder, remainder)
      }
    }, { immediate: true })
  },
  methods: {
    resetButtonData() {
      let btn = {
        btnName: '',
        btnType: '',
        url: '',
        app: {
          url: '',
          packageName: '',
          scheme: ''
        },
        chatRoom: '',
        call: ''
      }
      this.buttonInfo = btn
    },
    addBtn() {
      let btn = Object.assign({}, this.buttonInfo)
      this.buttons.push(btn)
      this.resetButtonData()
    },
    editBtnInfo (index) {
      this.activeBtnIndex = index
      this.buttonInfo = Object.assign({}, this.buttons[index])
      this.isEdit = true
    },
    saveBtnInfo() {
      this.buttons[this.activeBtnIndex] = Object.assign({}, this.buttonInfo)
      this.activeBtnIndex = undefined
      this.resetButtonData()
      this.isEdit = false
    },
    removeBtn(index) {
      this.buttons.splice(index, 1)
      this.resetButtonData()
      this.isEdit = false
    },
    // 모달 버튼
    closeModal () {
      this.isModalViewed = false
      this.isModalChat = false
    },
    selectChatModal () {
      this.isModalViewed = true
      this.isModalChat = true
    }
  }
}
</script>

<style>

</style>
