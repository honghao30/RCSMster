<template>
   <tr>
      <th scope="row"><span class="form-item__label">타이틀 자유형</span></th>
      <td>
        <div class="form-item__content">
          <div class="form-item-row">
            <div class="inner__input">
              <div class="inner__input-box">
                <span class="form-item__label required">제목</span>
                <div class="inner__input-item">
                  <div class="input-item input-limit">
                    <div class="input">
                      <input type="text"
                        class="input"
                        maxlength="17"
                        ref="mainTitleFree_Title"
                        id="mainTitleFree_Title"
                        @input="calcText()"
                        placeholder="최대 17자 까지 입력할 수 있습니다."
                      >
                      <div class="input-limit__text">
                        <Emoji @input="onSelectEmoji($event, 'mainTitleFree_Title')" />
                        <p>{{ mainTitleLength }}/17자</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
              <!-- 변수 사용 -->
              <div class="inner__input-box">
                <span class="form-item__label">변수</span>
                <div class="inner__input-item">
                  <!-- <div class="input-item" @click="valueSelect"> -->
                    <div class="input-item" >
                    <Dropdown :options="list" placeholder="변수 선택"/>
                  </div>
                </div>
              </div>
              <!-- //변수 사용 -->
            </div>
          </div>
        </div>
      </td>
    </tr>
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
