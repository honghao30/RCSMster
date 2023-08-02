<template>
  <!-- 본문 -->
  <table class='table table-bodyonly form-table'>
    <colgroup>
      <col width='180px'>
      <col />
    </colgroup>
    <tbody>
    <!-- <tr v-if="useSelect">
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
    <template v-if="!(useSelect && useY === 'N')">-->
    <template>
      <tr>
        <th colspan="2" class="templ-title">본문</th>
      </tr>
      <tr>
        <th scope='row'><span class='form-item__label'>제목</span></th>
        <td>
          <div class='form-item__content'>
            <div class='form-item-row'>
              <div class='input-item'>
                  <span class='radiobox' @click='initTitle'>
                    <input type='radio' :name='`titleUse_${$attrs.compoIndex}`' :id='`titleUseN_${$attrs.compoIndex}`' value='N'
                           v-model='titAndDescInfo.useTitle'
                    />
                    <label :for='`titleUseN_${$attrs.compoIndex}`'>미사용</label>
                  </span>
                <span class='radiobox'>
                    <input type='radio' :name='`titleUse_${$attrs.compoIndex}`' :id='`titleUseY_${$attrs.compoIndex}`' value='Y'
                           v-model='titAndDescInfo.useTitle'
                    />
                    <label :for='`titleUseY_${$attrs.compoIndex}`'>사용</label>
                  </span>
              </div>
            </div>
            <div class='form-item-row' v-if="titAndDescInfo.useTitle === 'Y'">
              <div class='input-item input-limit'>
                <div class='input'>
                  <input type='text'
                         class='input'
                         ref='descTitle'
                         id='descTitle'
                         v-model='titAndDescInfo.title'
                         @input="calcText('title')"
                         placeholder='제목을 입력해주세요.'
                  >
                  <div class='input-limit__text'>
                    <Emoji @input="onSelectEmoji($event, 'descTitle')" />
                    <p :style='titleLength > componentStrSizeRule["title"] ? "color:red;" : ""'>
                      {{ titleLength }}/{{ componentStrSizeRule['title'] }}자
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <!-- 본문 - 소제목 -->
      <!-- <tr v-if="subTitleUse">
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
      </tr> -->
      <tr>
        <th scope='row'><span class='form-item__label required'>내용</span></th>
        <td>
          <div class='form-item__content'>
            <div class='form-item-row'>
              <div class='input-item input-limit'>
                <div class='textarea'>
                    <textarea placeholder='내용을 입력해주세요.'
                              v-model='titAndDescInfo.description' @input="calcText('desc')" ref='descContent'
                              id='descContent'></textarea>
                  <div class='textarea-limit__text'>
                    <Emoji @input="onSelectEmoji($event, 'descContent')" />
                    <p :style='descLength > componentStrSizeRule["description"] ? "color:red;" : ""'>
                      {{ descLength }}/{{ componentStrSizeRule['description'] }}자
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
    componentParam: {
      type: Object,
      default: null
    },
    compoInputObj: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      titleLength: 0,
      descLength: 0,
      titAndDescInfo: this.compoInputObj[0]
    }
  },
  computed: {
    componentStrSizeRule() {
      const map = {}
      if (this.componentParam && this.componentParam['CP-Description']) {
        for (const obj of this.componentParam['CP-Description']) {
          map[obj.ctnType] = obj.strSize
        }
      }
      return map
    }
  },
  methods: {
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
      if (target === 'descTitle') {
        this.titAndDescInfo.title = this.$refs[refName].value
        this.calcText('title')
      } else {
        this.titAndDescInfo.description = this.$refs[refName].value
        this.calcText('desc')
      }
    },
    calcText(text) {
      if (text === 'title') {
        this.calcLength(this.titAndDescInfo.title, text)
      } else {
        this.calcLength(this.titAndDescInfo.description, text)
      }
    },
    calcLength(textLength, text) {
      if (text === 'title') {
        this.titleLength = textLength.split(/{{.*?}}/).join('').length
      } else {
        this.descLength = textLength.split(/{{.*?}}/).join('').length
      }
    },
    initTitle() {
      console.log('initTitle')
      this.titAndDescInfo.title = ''
      this.calcText('title')
    }
  }
}
</script>

<style>

</style>
