<template>
  <div class="form-item__content">
    <div class="form-item-row is-emoji">
      <div class="input-item input-limit w--full" >
        <div class="input">
          <input type="text" class="input" maxlength="17"
            :disabled="buttons.length > 1 && !isEdit"
            placeholder="사용자에게 보여지는 버튼이름을 입력해주세요." v-model="buttonInfo.btnName"
            ref="btnName"
          >
          <div class="input-limit__text">
            <Emoji @input="onSelectEmoji($event, 'btnName')"/>
            {{ buttonInfo.btnName.length }}/17자
          </div>
        </div>
      </div>
      <div class="input-item w--full">
        <Dropdown :options="buttonEventOptions" placeholder="선택" v-model="buttonInfo.btnEvent"
        :disabled="buttons.length > 1 && !isEdit"
        />
      </div>
    </div>
    <div class="form-item-row">
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
    buttons: {
      type: Array
    }
  },
  data () {
    return {
      isEdit: false,
      activeBtnIndex: undefined,
      buttonInfo: {
        btnName: '',
        btnEvent: ''
      },
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
  methods: {
    resetButtonData() {
      let btn = {
        btnName: '',
        btnEvent: ''
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
