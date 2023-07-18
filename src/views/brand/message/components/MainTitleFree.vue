<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row"><span class="form-item__label required">타이틀 - 제목</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item input-limit">
                <div class="input">
                  <input type="text"
                    class="input"
                    maxlength="17"
                    id="mainTitleFree_Title"
                    @input="calcText()"
                    placeholder="제목을 입력해주세요."
                  >
                  <div class="input-limit__text">
                    <p>{{ mainTitleLength }}/17자</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <!-- 변수 선택 -->
      <tr>
        <th scope="row"><span class="form-item__label required">타이틀 - 변수</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item" >
                <Dropdown :options="list" placeholder="변수 선택" disabled/>
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
export default {
  components: {
    Emoji,
    Dropdown,
  },
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      mainTitleLength : 0,
      form: {
        MainTitle: {
          logoType:'gone',
          info: {
            mainTitle: '',
            titleType: '',
            varUse: 'Y',
            logoUse: 'Y',
            logoFile: '',
            logoUrl: '',
            logoCategory:'',
            mainDesc: ''
          }
        }
      },
      list: [
        {
          codeNm: '미친새끼들',
          code: 'freak'
        }
      ]
    }
  },
  created() {
    //if (jglib.isEmpty(this.jsonData)) { > 값 가져오는 부분

    //} else {
    //}
    this.description = this.inputText
  },
  methods: {
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.form.logoFile = fileName
      this.url = URL.createObjectURL(file)
    },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    },
    calcText() {
      let length = document.getElementById('mainTitleFree_Title').value
      this.calcLength(length)
    },
    calcLength(text) {
      this.mainTitleLength = text.split(/{{.*?}}/).join('').length
    },
    showLogo(){
      console.log(this.info.logoUse)
    }
  }
}
</script>
