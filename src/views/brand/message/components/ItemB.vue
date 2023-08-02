<template>
  <table class='table table-bodyonly form-table'>
    <colgroup>
      <col width='180px'>
      <col />
    </colgroup>
    <tbody>
    <tr>
      <th colspan="2" class="templ-title">아이템B</th>
    </tr>
    <tr>
      <th scope='row'><span class='form-item__label'>설명</span></th>
      <td>
        <div class='form-item__content'>
          <div class='form-item-row'>
            <div class='input-item'>
                <span class='radiobox' @click='initDescription'>
                  <input type='radio' name='itemBDesc' id='itemBDescN' value='N'
                         v-model='titAndDescInfo.useDescription'
                  />
                  <label for='itemBDescN'>미사용</label>
                </span>
              <span class='radiobox'>
                  <input type='radio' name='itemBDesc' id='itemBDescY' value='Y'
                         v-model='titAndDescInfo.useDescription'
                  />
                  <label for='itemBDescY'>사용</label>
                </span>
            </div>
          </div>
          <div class='form-item-row' v-if="titAndDescInfo.useDescription === 'Y'">
            <div class='input-item input-limit'>
              <div class='input'>
                <input type='text'
                       class='input'
                       @input='e => titAndDescInfo.description = e.target.value'
                       placeholder='설명을 입력해주세요.'
                >
                <div class='input-limit__text'>
                  <p
                    :style='titAndDescInfo.description.length > componentStrSizeRule["itemBDescription"] ? "color:red;" : ""'>
                    {{ titAndDescInfo.description.length }}/{{ componentStrSizeRule['itemBDescription'] }}자
                  </p>
                </div>
              </div>
            </div>
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
                       @input='e => titAndDescInfo.title = e.target.value'
                       placeholder='제목을 입력해주세요.'
                >
                <div class='input-limit__text'>
                  <p :style='titAndDescInfo.title.length > componentStrSizeRule["itemBTitle"] ? "color:red;" : ""'>
                    {{ titAndDescInfo.title.length }}/{{ componentStrSizeRule['itemBTitle'] }}자
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <th scope='row'><span class='form-item__label required'>로고</span></th>
      <td>
        <div class='form-item__content'>
          <div class='form-item-row'>
            <div class='input-item'>
                <span class='radiobox'>
                  <input type='radio' name='itemBLogoType' id='itemBBasicImage' v-model='titAndDescInfo.logoType'
                         value='basicImage' />
                  <label for='itemBBasicImage'>기본 아이콘</label>
                </span>
              <span class='radiobox'>
                  <input type='radio' name='itemBLogoType' id='itemBCustom' v-model='titAndDescInfo.logoType'
                         value='custom' />
                  <label for='itemBCustom'>직접 올리기</label>
                </span>
            </div>
            <template v-if="titAndDescInfo.logoType === 'basicImage'">
              <TemplateTitleReg
                :componentName='"ItemB"'
                :titleIconNewData='titleIconNewData'
                :titleIconBasicData='titleIconBasicData'
                @optionSelected='checkTitleSelected'
              />
            </template>
            <template v-if="titAndDescInfo.logoType === 'custom'">
              <div class='input-item w--full'>
                  <span class='input'>
                    <input type='text' class='input' :value='titAndDescInfo.logoFile' disabled>
                  </span>
                <input type='file' id='itemBFileUp' class='input blind'
                       @change='onFileChanged'>
                <label for='itemBFileUp' class='btn btn-default-line'>파일 선택</label>
              </div>
              <p class='guide-text black'>&middot; 파일형식: PNG, GIF (최대 1MB)</p>
              <p class='guide-text black'>&middot; 권장 사이즈 : 300 * 300px (또는 1:1 비율)</p>
            </template>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import TemplateTitleReg from '@/views/brand/message/utils/TemplateTitleReg.vue'

export default {
  components: {
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
      if (this.componentParam && this.componentParam['CP-ItemB']) {
        for (const obj of this.componentParam['CP-ItemB']) {
          map[obj.paramNm] = obj.strSize
        }
      }
      return map
    }
  },
  methods: {
    onFileChanged(e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.titAndDescInfo.logoFile = fileName
      this.titAndDescInfo.logoFileSrc = URL.createObjectURL(file)
    },
    checkTitleSelected(option) {
      console.log(option)
      this.SelectedTitle = option
      this.titAndDescInfo.logoFile = option[0]
      this.titAndDescInfo.logoFileSrc = option[1]
    },
    initDescription() {
      console.log('initDescription')
      this.titAndDescInfo.description = ''
    }
  }
}
</script>

<style>

</style>
