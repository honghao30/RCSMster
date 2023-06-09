<template>
  <div class="form-item__content">
    <div v-for="(btn, i) in Buttons" :key="i">
      <template v-if="btn.isActive">
        <div class="form-item-row">
          <div class="input-item input-limit">
            <span class="input">
              <input type="text" class="input" maxlength="17" placeholder="버튼명을 입력하세요." v-model="btn.btnName"
              :disabled="isSavedButtonList.length == 2 && !isEdit"
              >

              <p class="input-limit__text">
                {{ btn.btnName.length }}/17자
              </p>
            </span>
          </div>
          <ButtonCmp
                type="btn-default-line"
                :disabled="isSavedButtonList.length == 2 && !isEdit"
            >특수문자
          </ButtonCmp>
        </div>
        <div class="form-item-row">
          <div class="input-item">
            <Dropdown :options=btnTypeOption v-model="btn.btnType" placeholder="선택"
            :disabled="isSavedButtonList.length == 2 && !isEdit"
            ></Dropdown>
          </div>
        </div>
        <div class="form-item-row" v-if="btn.btnType == 'url'">
          <div class="input-item">
            <span class="input">
                <input type="text" class="input" maxlength="40" placeholder="http://형식으로 입력해주세요." v-model="btn.url">
            </span>
          </div>
        </div>
        <div class="form-item-row" v-if="btn.btnType == 'app'">
          <div class="input-item w--full">
            <span class="input">
                <input type="text" class="input" maxlength="40" placeholder="http://형식으로 입력해주세요." v-model="btn.app.url">
            </span>
          </div>
          <div class="input-item w--full">
            <span class="input">
                <input type="text" class="input" maxlength="40" placeholder="Package name을 입력해주세요." v-model="btn.app.packageName">
            </span>
          </div>
          <div class="input-item w--full">
            <span class="input">
                <input type="text" class="input" maxlength="40" placeholder="Scheme을 입력해주세요." v-model="btn.app.scheme">
            </span>
          </div>
        </div>
        <div class="form-item-row" v-if="btn.btnType == 'chat'">
          <div class="input-item">
            <span class="input">
                <input type="text" class="input" maxlength="40" placeholder="대화방을 선택해주세요." v-model="btn.chatRoom" disabled>
            </span>
          </div>
          <ButtonCmp
                type="btn-default-line"
                @click="selectChatModal"
            >대화방 선택
          </ButtonCmp>
        </div>
        <div class="form-item-row" v-if="btn.btnType == 'call'">
          <div class="input-item">
            <span class="input">
                <input type="text" class="input" maxlength="40" placeholder="‘-’없이 숫자만 입력해주세요." v-model="btn.call">
            </span>
          </div>
        </div>
        <div class="form-item-row">
          <ButtonCmp
                type="btn-default-line"
                @click="addBtn(btn)"
                :disabled="isSavedButtonList.length == 2"
                v-if="!isEdit"
            >버튼추가
          </ButtonCmp>
          <ButtonCmp
                type="btn-default-line"
                v-if="isEdit"
                @click="editBtnInfo"
            >수정
          </ButtonCmp>
        </div>
      </template>
    </div>
    <div class="form-item-row">
      <ul class="button-list">
        <li
          v-for="(item, j) in isSavedButtonList" :key="j"
          @click="selectBtnInfo(j)"
          :class="{'active': item.isActive && isEdit}"
        >
          <span class="button-name">{{ item.btnName }}</span>
          <a role="button" class="btn-del" @click="removeBtn(j)"><span class="blind" >삭제</span></a>
        </li>
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
    Buttons: {
      type: Array
    }
  },
  data() {
    return {
      isEdit: false,
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
      isSavedButtonList: [],
      isModalViewed: false,
      isModalChat: false
    }
  },
  methods: {
    addBtn(target) {
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
        call: '',
        isActive: true
      }
      let buttonList = this.isSavedButtonList
      let listLength = buttonList.length
      let btnItem = target
      if (listLength < 2 && btnItem.btnName !== '') {
        btnItem.isActive = false
        buttonList.push(btnItem)
        this.Buttons.push(btn)
      }
    },
    selectBtnInfo (index) {
      this.Buttons.forEach((item, i) => {
        if (index === i) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      this.isEdit = true
    },
    editBtnInfo () {
      this.isEdit = false
      this.Buttons.forEach((item, i) => {
        if (this.Buttons.length === i + 1) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
    },
    removeBtn(index) {
      this.Buttons.forEach((item, i) => {
        if (this.Buttons.length - 1 === i) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      this.isSavedButtonList.splice(index, 1)
      this.Buttons.splice(index, 1)
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
