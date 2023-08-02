<template>
  <table class='table table-bodyonly form-table'>
    <colgroup>
      <col width='180px'>
      <col />
    </colgroup>
    <tbody>
    <template>
      <tr>
        <th scope='row'><span class='form-item__label required'>공지</span></th>
        <td>
          <div class='form-item__content'>
            <div class='form-item-row'>
              <div class='input-item input-limit'>
                <div class='textarea'>
                  <textarea placeholder='내용을 입력해주세요.'
                            v-model='titAndDescInfo.description'
                            @input='calcText(false)'
                            ref='noticeContent' id='noticeContent'></textarea>
                  <div class='textarea-limit__text'>
                    <Emoji @input="onSelectEmoji($event, 'noticeContent')" />
                    <p :style='descLength > componentStrSizeRule["notice"] ? "color:red;" : ""'>
                      {{ descLength }}/{{ componentStrSizeRule['notice'] }}자
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
      descLength: 0,
      titAndDescInfo: this.compoInputObj[0]
    }
  },
  computed: {
    componentStrSizeRule() {
      const map = {}
      if (this.componentParam && this.componentParam['CP-Notice']) {
        for (const obj of this.componentParam['CP-Notice']) {
          map[obj.ctnType] = obj.strSize
        }
      }
      return map
    }
  },
  methods: {
    onSelectEmoji(e, target) {
      const emoji = e
      const refName = target
      this.$refs[refName].value += emoji
      this.titAndDescInfo.description = this.$refs[refName].value
      this.calcText()
    },
    calcText() {
      this.calcLength(this.titAndDescInfo.description)
    },
    calcLength(textLength) {
      this.descLength = textLength.split(/{{.*?}}/).join('').length
    }
  }
}
</script>

<style>

</style>
