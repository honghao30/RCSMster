<template>
  <table class='table table-bodyonly form-table'>
    <colgroup>
      <col width='180px'>
      <col />
    </colgroup>
    <tbody>
    <tr>
      <th colspan="2" class="templ-title">스타일타이틀</th>
    </tr>
    <tr>
      <th scope='row'><span class='form-item__label'>로고</span></th>
      <td>
        <div class='form-item__content'>
          <!-- 로고 등록 -->
          <div class='form-item-row'>
            <div class='input-item'>
                <span class='radiobox'>
                  <input type='radio' name='styleTitleALogoType' id='styleTitleABasicImage'
                         v-model='titAndDescInfo.logoType' value='basicImage' />
                  <label for='styleTitleABasicImage'>기본 아이콘</label>
                </span>
              <span class='radiobox'>
                  <input type='radio' name='styleTitleALogoType' id='styleTitleACustom'
                         v-model='titAndDescInfo.logoType' value='custom' />
                  <label for='styleTitleACustom'>직접 등록</label>
                </span>
            </div>
          </div>
          <div class='form-item-row' v-if="titAndDescInfo.logoType === 'basicImage'">
            <div class='input-item logoList'>
              <TemplateTitleReg
                :componentName='"StyleTitleA"'
                :titleIconNewData='titleIconNewData'
                :titleIconBasicData='titleIconBasicData'
                @optionSelected='checkTitleSelected'
              />
              <!--                  @optionSelected="checkTitleSelected"-->
            </div>
          </div>
          <div class='form-item-row' v-if="titAndDescInfo.logoType === 'custom'">
            <div class='input-item w--full'>
                <span class='input'>
                  <input type='text' class='input' :value='titAndDescInfo.logoFile' disabled>
                </span>
              <input type='file' id='fileUp' class='input blind'
                     @change='onFileChanged'>
              <label for='fileUp' class='btn btn-default-line'>파일 선택</label>
            </div>
            <p class='guide-text black'>&middot; 파일형식: PNG, GIF (최대 1MB)</p>
          </div>
        </div>
      </td>
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
                       ref='styleTitleA_Title'
                       id='styleTitleA_Title'
                       v-model='titAndDescInfo.title'
                       @input='calcText()'
                       :placeholder="`최대 ${componentStrSizeRule['mTitle']}자 까지 입력할 수 있습니다.`"
                >
                <div class='input-limit__text'>
                  <Emoji @input="onSelectEmoji($event, 'styleTitleA_Title')" />
                  <p :style='mainTitleLength > componentStrSizeRule["mTitle"] ? "color:red;" : ""'>
                    {{ mainTitleLength }}/{{ componentStrSizeRule['mTitle'] }}자
                  </p>
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
import TemplateTitleReg from '@/views/brand/message/utils/TemplateTitleReg.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import { getTemplateLogoFile } from '@/api/service/layout'
import { MessageBox } from 'element-ui'

export default {
  components: {
    TemplateTitleReg,
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
      mainTitleLength: 0,
      titAndDescInfo: this.compoInputObj[0],
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
  computed: {
    componentStrSizeRule() {
      const map = {}
      if (this.componentParam && this.componentParam['CP-StyleTitleA']) {
        for (const obj of this.componentParam['CP-StyleTitleA']) {
          map[obj.paramNm] = obj.strSize
        }
      }
      return map
    }
  },
  created() {
    //if (jglib.isEmpty(this.jsonData)) { > 값 가져오는 부분

    //} else {
    //}
    this.description = this.inputText
  },
  async mounted() {
    // 서버에서 로고 이미지 불러옴
    const logoFileRes = await getTemplateLogoFile()
    this.titleIconNewData = []
    logoFileRes.result.forEach(data => {
      this.titleIconNewData.push({
        title: data.fileDescr,
        titleIcon: data.fileUrl
      })
    })
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
      this.titAndDescInfo.logoFileSrc = URL.createObjectURL(file)
    },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
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
    checkTitleSelected(option) {
      this.SelectedTitle = option
      this.titAndDescInfo.logoFile = option[0]
      this.titAndDescInfo.logoFileSrc = option[1]
    },
    showLogo() {
      console.log(this.info.logoUse)
    }
  }
}
</script>
