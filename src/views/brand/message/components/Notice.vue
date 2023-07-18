<template>
  <!-- 본문 -->
  <tr>
    <th scope='row'><span class='form-item__label'>공지</span></th>
    <td>
      <template>
        <div class='form-item__content'>
          <div class='form-item-row'>
            <div class='inner__input'>
              <div class='inner__input-box'>
                <span class='form-item__label required'>내용</span>
                <div class='inner__input-item'>
                  <div class='input-item input-limit'>
                    <div class='textarea'>
                      <textarea placeholder='내용을 입력해주세요.'
                                v-model='form.Notice.info.description'
                                ref='noticeContent' id='noticeContent'></textarea>
                      <div class='textarea-limit__text'>
                        <Emoji @input="onSelectEmoji($event, 'noticeContent')" />
                        <!--
                        <p>
                          {{ descLength }}/1300자
                        </p>
                        -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </td>
  </tr>
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
    }
  },
  data() {
    return {
      descLength: 0,
      form: {
        Notice: {
          info: {
            description: ''
          }
        }
      }
    }
  },
  methods: {
    onSelectEmoji(e, target) {
      const emoji = e
      const refName = target
      this.$refs[refName].value += emoji
    },
    calcText(text) {
      const textLength = document.getElementById('descContent').value
      this.calcLength(textLength, text)
    },
    calcLength(textLength, text) {
      this.descLength = textLength.split(/{{.*?}}/).join('').length
    }
  }
}
</script>

<style>

</style>
