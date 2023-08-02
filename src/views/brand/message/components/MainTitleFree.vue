<template>
  <table class='table table-bodyonly form-table'>
    <colgroup>
      <col width='180px'>
      <col />
    </colgroup>
    <tbody>
    <tr>
      <th colspan="2" class="templ-title">타이틀자유형</th>
    </tr>
    <tr>
      <th scope='row'><span class='form-item__label required'>제목</span></th>
      <td>
        <div class='form-item__content'>
          <div class='form-item-row'>
            <div class='input-item input-limit'>
              <div class='input'>
                <input type='text'
                       class='input'
                       ref='mainTitleFree_Title'
                       id='mainTitleFree_Title'
                       v-model='titAndDescInfo.title'
                       @input='calcText()'
                       :placeholder="`최대 ${componentStrSizeRule['title']}자 까지 입력할 수 있습니다.`"
                >
                <div class='input-limit__text'>
                  <Emoji @input="onSelectEmoji($event, 'mainTitleFree_Title')" />
                  <p :style='mainTitleLength > componentStrSizeRule["title"] ? "color:red;" : ""'>
                    {{ mainTitleLength }}/{{ componentStrSizeRule['title'] }}자
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
    <!-- 변수 선택 -->
    <tr>
      <th scope='row'><span class='form-item__label required'>변수</span></th>
      <td>
        <div class='form-item__content'>
          <div class='form-item-row'>
            <div class='input-item'>
              <Dropdown
                :options='collectVariableList'
                v-model='titAndDescInfo.title2'
                @clickDropdownTitle='clickDropdownTitle'
                placeholder='변수 선택' />
            </div>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import Emoji from '@/components/common/Emoji.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import 'emoji-picker-element'
import { MessageBox } from 'element-ui'

export default {
  components: {
    Emoji,
    Dropdown
  },
  props: {
    compoInputObj: {
      type: Array,
      default: null
    },
    componentParam: {
      type: Object,
      default: null
    },
    collectVariableList: {
      type: Array
    }
  },
  data() {
    return {
      mainTitleLength: 0,
      titAndDescInfo: this.compoInputObj[0],
      SelectedTitle: ['', ''],
      SelectedLogo: ['', ''],
      list: [
        {
          codeNm: '{{변수}}',
          code: '{{변수}}'
        }
      ]
    }
  },
  computed: {
    componentStrSizeRule() {
      const map = {}
      if (this.componentParam && this.componentParam['CP-MainTitleFree']) {
        for (const obj of this.componentParam['CP-MainTitleFree']) {
          map[obj.ctnType] = obj.strSize
        }
      }
      return map
    }
  },
  created() {
  },
  methods: {
    // 이미지 파일 업로드
    onFileChanged(e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      if (file.size > 1048576) {
        MessageBox.alert('1MB 이하 파일만 등록 가능합니다.')
        return false
      }
      this.titAndDescInfo.logoFile = fileName
    },
    onSelectEmoji(e, target) {
      const emoji = e
      const refName = target
      this.$refs[refName].value += emoji
      this.titAndDescInfo.title = this.$refs[refName].value
      this.calcText()
    },
    calcText() {
      this.calcLength(this.titAndDescInfo.title)
    },
    calcLength(text) {
      this.mainTitleLength = text.split(/{{.*?}}/).join('').length
    },
    showLogo() {
      console.log(this.titAndDescInfo.useLogo)
    },
    clickDropdownTitle() {
      console.log('clickDropdownTitle')
      this.$emit('collectVariable')
    }
  }
}
</script>
