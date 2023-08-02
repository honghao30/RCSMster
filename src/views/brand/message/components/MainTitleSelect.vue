<template>
  <table class='table table-bodyonly form-table'>
    <colgroup>
      <col width='180px'>
      <col />
    </colgroup>
    <tbody>
    <tr>
      <th scope='row'><span class='form-item__label required'>타이틀선택형</span></th>
      <td>
        <div class='form-item__content'>
          <!-- 타이틀 선택 영역 -->
          <div class='form-item-row'>
            <TemplateTitleReg
              :componentName='"MainTitleSelect"'
              :titleIconNewData='titleIconNewData'
              :titleIconBasicData='titleIconBasicData'
              @optionSelected='checkTitleSelected'
            />
            <!-- // 타이틀 선택 영역 -->
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import Emoji from '@/components/common/Emoji.vue'
import TemplateTitleReg from '@/views/brand/message/utils/TemplateTitleReg.vue'
import 'emoji-picker-element'
import { MessageBox } from 'element-ui'
import {
  getTemplateLogoFile,
  getTitleSelectFormatstr
} from '@/api/service/layout'

export default {
  components: {
    Emoji,
    TemplateTitleReg
  },
  props: {
    compoInputObj: {
      type: Array,
      default: null
    },
    componentParam: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      mainTitleLength: 0,
      titAndDescInfo: this.compoInputObj[0],
      SelectedTitle: ['', ''],
      SelectedLogo: ['', ''],
      titleSelectCtn: {},
      titleSelectInfo: {},
      titleSelectParams: [],
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
          cardType: 'D',
          tplBizSrv: 'F001',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '입금',
          cardType: 'D',
          tplBizSrv: 'F002',
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
          cardType: 'D',
          tplBizSrv: 'C002',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '출고',
          cardType: 'D',
          tplBizSrv: 'C001',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '배송',
          cardType: 'D',
          tplBizSrv: 'C003',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '회원가입',
          cardType: 'D',
          tplBizSrv: 'G001',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '인증',
          cardType: 'D',
          tplBizSrv: 'G002',
          titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
        }
      ]
    }
  },
  computed: {
    componentStrSizeRule() {
      const map = {}
      if (this.componentParam && this.componentParam['CP-MainTitleSelect']) {
        for (const obj of this.componentParam['CP-MainTitleSelect']) {
          map[obj.ctnType] = obj.strSize
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
    },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
      this.calcText()
    },
    calcText() {
      let length = document.getElementById('mainTitleSelect_Title').value
      this.calcLength(length)
    },
    calcLength(text) {
      this.mainTitleLength = text.split(/{{.*?}}/).join('').length
    },
    async checkTitleSelected(option) {
      this.SelectedTitle = option
      this.titAndDescInfo.logoFile = option[0]
      this.titAndDescInfo.logoFileSrc = option[1]
      // 서버에서 선택한 아이템에 대한 정보를 불러옴
      const params = {
        cardSpec: 'openrichcard',
        cardType: option[2],
        tplBizSrv: option[3]
      }
      const titleSelectDataRes = await getTitleSelectFormatstr('common', params)
      const data = titleSelectDataRes.result
      this.titleSelectCtn = data.ctn
      this.titleSelectInfo = data.info
      this.titleSelectParams = data.params
    },
    showLogo() {
      console.log(this.titAndDescInfo.useLogo)
    }
  }
}
</script>
