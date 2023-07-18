<template>
   <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
    <tr>
        <th scope="row"><span class="form-item__label">타이틀</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item">
                <span class="radiobox">
                  <input type="radio" name="titleUse" id="titleUseN" value="N" v-model="form.titleUse"/>
                  <label for="titleUseN"><span class="radiobox__text">미사용</span></label>
                </span>
                <span class="radiobox">
                  <input type="radio" name="titleUse" id="titleUseY" value="Y" v-model="form.titleUse"/>
                  <label for="titleUseY"><span class="radiobox__text">사용</span></label>
                </span>
              </div>
              <div class="input-item input-limit" v-if="form.titleUse === 'Y'">
                <div class="input">
                  <input type="text" class="input" maxlength="30"
                    v-model="form.title"
                    placeholder="타이틀을 입력해주세요."
                  >
                  <div class="input-limit__text">
                    <p>{{ form.title.length }}/30자</p>
                  </div>
                </div>
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
import TemplateTitleReg from '@/views/brand/message/components/TemplateTitleReg.vue'
import 'emoji-picker-element'
export default {
  components: {
    Emoji,
    TemplateTitleReg
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
        titleUse: '',
        title: ''
      },
      titleIconNewData: [
        {
          title: '알림',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '이벤트',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '프로모션',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '청구서',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '영수증',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '예약안내',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '일정안내',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '티켓',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '쿠폰',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        }
      ],
      titleIconBasicData: [
        {
          title: '승인',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '입금',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '출금',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '취소',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '주문',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '출고',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '배송',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '회원가입',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '인증',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
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
      let length = document.getElementById('mainTitle_Title').value
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
