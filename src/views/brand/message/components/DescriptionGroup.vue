<template>
  <!-- 본문 -->
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <!-- 본문 - 소제목 -->
      <tr>
        <th scope="row"><span class="form-item__label">본문{{ groupIdx }} - 소제목</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item">
                <span class="radiobox">
                  <input type="radio" name="titleUse" id="titleUseN" value="N"
                    v-model="form.Description.info.titleUse"
                  />
                  <label for="titleUseN">미사용</label>
                </span>
                <span class="radiobox">
                  <input type="radio" name="titleUse" id="titleUseY" value="Y"
                    v-model="form.Description.info.titleUse"
                  />
                  <label for="titleUseY">사용</label>
                </span>
              </div>
            </div>
            <div class="form-item-row" v-if="form.Description.info.titleUse === 'Y'">
              <div class="input-item input-limit">
                <div class="input">
                  <input type="text"
                    class="input"
                    maxlength="30"

                    v-model="form.Description.info.title"
                    @input="calcText('title')"
                    placeholder="최대 30자 까지 입력할 수 있습니다."
                  >
                  <div class="input-limit__text">
                    <Emoji @input="onSelectEmoji($event, 'descTitle')" />
                    <p>{{ titleLength }}/30자</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <!-- 본문 - 내용 -->
      <tr>
        <th scope="row"><span class="form-item__label required">본문{{ groupIdx }} - 내용</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item input-limit">
                <div class="textarea">
                  <textarea maxlength="1300" placeholder="내용을 입력해주세요."
                  v-model="form.Description.info.description"
                  @input="calcText('desc')"
                  id="descContent"></textarea>
                  <div class="textarea-limit__text">
                    <p>
                      {{ descLength }}/1,300자
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr v-for="(button,index) in form.Buttons.info" :key="index">
        <th scope="row"><span class="form-item__label">본문{{ groupIdx }} - 버튼{{ index + 1 }} </span></th>
        <td>
        <TemplateButtonReg
        :buttonInfo="button"
        />
        </td>
      </tr>
    </tbody>
  </table>
  <!-- // 본문 -->
</template>

<script>
import TemplateButtonReg from '@/views/brand/message/components/TemplateButtonReg.vue'
export default {
  components: {
    TemplateButtonReg
  },
  props: {
    info: {
      type: Object
    },
    groupIdx: {
      type: Number
    }
  },
  data () {
    return {
      titleLength: 0,
      descLength: 0,
      form: {
        Description: {
          info: {
            title:'',
            titleUse: 'Y',
            description: ''
          }
        },
        Buttons: {
          use: 'N',
          info: [{
            id: 1,
            bgColor: '#2f77fb',
            btnEvent: 'none',
            btnEventDropdown: '',
            btnName: '',
            simpleChatbot: '',
            chatbot: '',
            call: '',
            copyContent: '',
            message: {
              call: '',
              content: '',
              viewSource: ''
            },
            map: {
              latitude: '',
              longitude: '',
              location: '',
              url: '',
              query: ''
            },
            calendar: {
              date: '',
              title: '',
              content: ''
            },
            browser: {
              url: '',
              viewMode: ''
            }
          },
          {
            id: 2,
            bgColor: '#2f77fb',
            btnEvent: 'none',
            btnEventDropdown: '',
            btnName: '',
            simpleChatbot: '',
            chatbot: '',
            call: '',
            copyContent: '',
            message: {
              call: '',
              content: '',
              viewSource: ''
            },
            map: {
              latitude: '',
              longitude: '',
              location: '',
              url: '',
              query: ''
            },
            calendar: {
              date: '',
              title: '',
              content: ''
            },
            browser: {
              url: '',
              viewMode: ''
            }
          }]
        }
      }
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
