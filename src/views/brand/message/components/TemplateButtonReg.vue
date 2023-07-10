<template>
  <div class="form-item__content">
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
        <div class="inner__input-box">
          <span class="form-item__label required">버튼</span>
          <div class="inner__input-item">
            <div class="input-item">
              <Dropdown :options="buttonNumOption" v-model="buttonInfo.buttonNum" @change="changeBtnRow" @input="e => buttonInfo.buttonNum = e.target.value" />
            </div>
          </div>
          <div class="inner__input-item buttonInfo-box" v-for="(btn, i) in buttonInfo.buttons" :key="i">
            <div class="inner__input-box">
              <p class="form-item__label" v-text="`버튼${i+1}`"></p>
            </div>
            <div class="inner__input-box">
              <span class="form-item__label">버튼 명</span>
              <div class="inner__input-item">
                <div class="input-item input-limit">
                  <div class="textarea">
                    <textarea maxlength="17" placeholder="사용자에게 보여지는 버튼이름을 입력해주세요."  @input="e => btn.buttonName = e.target.value" style="height:48px;"
                    ref="buttonName"></textarea>
                    <div class="textarea-limit__text">
                      <Emoji @input="onSelectEmoji($event, 'buttonName', i)"/>
                      <p>
                        {{ btn.buttonName.length }}/17자
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="inner__input-box">
              <span class="form-item__label">버튼 유형</span>
              <div class="inner__input-item">
                <div class="input-item">
                  <Dropdown :options="buttonTypeOption" v-model="btn.buttonType"/>
                </div>
              </div>
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
      type: Object,
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
          label: 'Type1',
          value: 'Type1'
        },
        {
          label: 'Type2',
          value: 'Type2'
        },
        {
          label: 'Type3',
          value: 'Type3'
        }
      ]
    }
  },
  mounted() {
    this.changeBtnRow()
  },
  methods: {
    changeBtnRow () {
      let row = this.buttonInfo.buttonNum
      let buttonLength = this.buttonInfo.buttons.length
      let diff = row - buttonLength
      let buttonItem = {
        buttonName: '',
        buttonType: ''
      }
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          this.buttonInfo.buttons.push(buttonItem)
        }
      } else if (diff < 0) {
        for (let i = 0; i < -diff; i++) {
          this.buttonInfo.buttons.pop()
        }
      }
    },
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
