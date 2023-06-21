<template>
  <div class="form-item__content">
    <div class="form-item-row">
      <div class="input-item input-limit">
        <span class="input">
          <input type="text" class="input" maxlength="17" placeholder="버튼명을 입력하세요." v-model="buttonInfo.btnName"
          :disabled="buttons.length > 1 && !isEdit"
          >

          <p class="input-limit__text">
            {{ buttonInfo.btnName.length }}/17자
          </p>
        </span>
      </div>
      <ButtonCmp
            type="btn-default-line"
            :disabled="buttons.length > 1 && !isEdit"
        >특수문자
      </ButtonCmp>
    </div>
    <div class="form-item-row">
      <div class="input-item">
        <Dropdown :options=btnTypeOption v-model="buttonInfo.btnType" placeholder="선택"
        :disabled="buttons.length > 1 && !isEdit"
        ></Dropdown>
      </div>
    </div>
    <div class="form-item-row" v-if="buttonInfo.btnType == 'url'">
      <div class="input-item">
        <span class="input">
            <input type="text" class="input" maxlength="40" placeholder="http://형식으로 입력해주세요." v-model="buttonInfo.url">
        </span>
      </div>
    </div>
    <div class="form-item-row" v-if="buttonInfo.btnType == 'app'">
      <div class="input-item w--full">
        <span class="input">
            <input type="text" class="input" maxlength="40" placeholder="http://형식으로 입력해주세요." v-model="buttonInfo.app.url">
        </span>
      </div>
      <div class="input-item w--full">
        <span class="input">
            <input type="text" class="input" maxlength="40" placeholder="Package name을 입력해주세요." v-model="buttonInfo.app.packageName">
        </span>
      </div>
      <div class="input-item w--full">
        <span class="input">
            <input type="text" class="input" maxlength="40" placeholder="Scheme을 입력해주세요." v-model="buttonInfo.app.scheme">
        </span>
      </div>
    </div>
    <div class="form-item-row" v-if="buttonInfo.btnType == 'chat'">
      <div class="input-item">
        <span class="input">
            <input type="text" class="input" maxlength="40" placeholder="대화방을 선택해주세요." v-model="buttonInfo.chatRoom" disabled>
        </span>
      </div>
      <ButtonCmp
            type="btn-default-line"
            @click="selectChatModal"
        >대화방 선택
      </ButtonCmp>
    </div>
    <div class="form-item-row" v-if="buttonInfo.btnType == 'call'">
      <div class="input-item">
        <span class="input">
            <input type="text" class="input" maxlength="40" placeholder="‘-’없이 숫자만 입력해주세요." v-model="buttonInfo.call">
        </span>
      </div>
    </div>
    <div class="form-item-row">
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
    </div>
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

export default {
  components: {
    ButtonCmp,
    Dropdown,
    ModalView,
    SelectChatroom
  },
  props: {
    buttons: {
      type: Array
    }
  },
  data() {
    return {
      isEdit: false,
      activeBtnIndex: undefined,
      buttonInfo: {
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
      },
      btnTypeOption: [
        {
          label: 'URL 연결',
          value: 'url'
        },
        {
          label: 'App 연결',
          value: 'app'
        },
        {
          label: '대화방 연결',
          value: 'chat'
        },
        {
          label: '전화걸기',
          value: 'call'
        }
      ],
      isModalViewed: false,
      isModalChat: false
    }
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
