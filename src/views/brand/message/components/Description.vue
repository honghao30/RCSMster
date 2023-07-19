<template>
  <!-- 본문 -->
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <tr v-if="useSelect">
        <th scope="row"><span class="form-item__label">본문</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item">
                <span class="radiobox">
                  <input type="radio" name="descUse" id="descUseN" value="N"
                    v-model="useY"
                  />
                  <label for="descUseN">미사용</label>
                </span>
                <span class="radiobox">
                  <input type="radio" name="descUse" id="descUseY" value="Y"
                    v-model="useY"
                  />
                  <label for="descUseY">사용</label>
                </span>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <template v-if="!(useSelect && useY === 'N')">
        <tr v-if="titleUse">
          <th scope="row"><span class="form-item__label">본문 - 제목</span></th>
          <td>
            <div class="form-item__content">
              <div class="form-item-row">
                <div class="input-item">
                  <span class="radiobox">
                    <input type="radio" name="titleUse" id="titleUseN" value="N"
                      v-model="titleUseY"
                    />
                    <label for="titleUseN">미사용</label>
                  </span>
                  <span class="radiobox">
                    <input type="radio" name="titleUse" id="titleUseY" value="Y"
                      v-model="titleUseY"
                    />
                    <label for="titleUseY">사용</label>
                  </span>
                </div>
              </div>
              <div class="form-item-row" v-if="titleUseY === 'Y'">
                <div class="input-item input-limit">
                  <div class="input">
                    <input type="text"
                      class="input"
                      maxlength="30"
                      @input="e => info.title = e.target.value"
                      placeholder="제목을 입력해주세요."
                    >
                    <div class="input-limit__text">
                      <p>{{ info.title.length }}/30자</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <!-- 본문 - 소제목 -->
        <tr v-if="subTitleUse">
          <th scope="row"><span class="form-item__label">본문 - 소제목</span></th>
          <td>
            <div class="form-item__content">
              <div class="form-item-row">
                <div class="input-item">
                  <span class="radiobox">
                    <input type="radio" name="titleUse" id="subTitleUseN" value="N"
                      v-model="info.subTitleUseY"
                    />
                    <label for="subTitleUseN">미사용</label>
                  </span>
                  <span class="radiobox">
                    <input type="radio" name="titleUse" id="subTitleUseY" value="Y"
                      v-model="info.subTitleUseY"
                    />
                    <label for="subTitleUseY">사용</label>
                  </span>
                </div>
              </div>
              <div class="form-item-row" v-if="info.subTitleUseY === 'Y'">
                <div class="input-item input-limit">
                  <div class="input">
                    <input type="text"
                      class="input"
                      maxlength="30"
                      @input="e => info.subTitle = e.target.value"
                      placeholder="제목을 입력해주세요."
                    >
                    <div class="input-limit__text">
                      <p>{{ info.subTitle.length }}/30자</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row"><span class="form-item__label required">본문 - 내용</span></th>
          <td>
            <div class="form-item__content">
              <div class="form-item-row">
                <div class="input-item input-limit">
                  <div class="textarea">
                    <textarea maxlength="1300" placeholder="내용을 입력해주세요."
                    @input="e => info.content = e.target.value"
                    ></textarea>
                    <div class="textarea-limit__text">
                      <p>
                        {{ info.content.length }}/1,300자
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <!-- // 본문 -->
</template>

<script>
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
export default {
  components: {
    Emoji
  },
  props: {
    info: {
      type: Object
    },
    useSelect: {
      type: Boolean,
      default: false
    },
    titleUse: {
      type: Boolean,
      default: false
    },
    subTitleUse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      useY: 'N',
      titleUseY: 'N'
    }
  },
  methods: {
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    },
    calcText(text) {
      if(text ==='title'){
        let textLength = document.getElementById('descTitle').value
        this.calcLength(textLength, text)
      }else{
        let textLength = document.getElementById('descContent').value
        this.calcLength(textLength, text)
      }
    },
    calcLength(textLength, text) {
      if(text ==='title'){
        this.titleLength = textLength.split(/{{.*?}}/).join('').length
      }else{
        this.descLength = textLength.split(/{{.*?}}/).join('').length
      }
    }
  }
}
</script>

<style>

</style>
