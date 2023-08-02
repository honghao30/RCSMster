<template>
  <table class='table table-bodyonly form-table'>
    <colgroup>
      <col width='180px'>
      <col />
    </colgroup>
    <tbody>
    <!-- 테이블- 제목 -->
    <tr>
      <th colspan="2" class="templ-title">테이블</th>
    </tr>
    <tr>
      <th scope='row'><span class='form-item__label'>타이틀</span></th>
      <td>
        <div class='form-item__content'>
          <div class='form-item-row'>
            <div class='input-item'>
                <span class='radiobox' @click='initTitle'>
                  <input type='radio' name='tableTitleUse' id='tableTitleUseN' value='N'
                         v-model='titAndDescInfo.useTitle' />
                  <label for='tableTitleUseN'><span class='radiobox__text'>미사용</span></label>
                </span>
              <span class='radiobox'>
                  <input type='radio' name='tableTitleUse' id='tableTitleUseY' value='Y'
                         v-model='titAndDescInfo.useTitle' />
                  <label for='tableTitleUseY'><span class='radiobox__text'>사용</span></label>
                </span>
            </div>
            <div class='input-item input-limit' v-if="titAndDescInfo.useTitle === 'Y'">
              <div class='input'>
                <input type='text' class='input'
                       @input='e => titAndDescInfo.title = e.target.value'
                       placeholder='타이틀을 입력해주세요.'
                >
                <div class='input-limit__text'>
                  <p :style='titAndDescInfo.title.length > componentStrSizeRule["cellMainTitle"] ? "color:red;" : ""'>
                    {{ titAndDescInfo.title.length }}/{{ componentStrSizeRule['cellMainTitle'] }}자
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <th scope='row'><span class='form-item__label required'>본문</span></th>
      <td>
        <div class='form-item__content'>
          <div class='form-item-row'>
            <p class='text-limit'
               :style='calcTableStrLength > 90 ? "color:red;" : ""'>
              {{ calcTableStrLength }}/90자
            </p>
          </div>
          <div class='form-item-row'>
            <div class='input-item table-warp'>
              <div class='flex-row flex-warp table-item-row' v-for='(item, i) in bodyInfo.list' :key='i'>
                <div class='flex-input'>
                  <div class='input'>
                    <input type='text' @input='e => item.subTitle.text = e.target.value' />
                  </div>
                  <div class='input'>
                    <input type='text' @input='e => item.subDesc.text = e.target.value'>
                  </div>
                </div>
                <!-- 기존 라인 부분 -->
                <div class='flex-btn'>
                  <ButtonCmp
                    type='btn-default-line'
                    size='small'
                    v-if='bodyInfo.list.length > 1'
                    @click='removeRow(i)'
                  >
                    삭제
                  </ButtonCmp>
                </div>
              </div>
              <div class='flex-row flex-start table-item-row'>
                <ButtonCmp
                  type='btn-default-line'
                  @click='addTableRows'
                  v-if='bodyInfo.list.length < bodyInfo.maxCnt'
                >
                  + 추가하기
                </ButtonCmp>
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
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    ButtonCmp
  },
  props: {
    // info: {
    //   type: Object,
    //   default: null
    // },
    // index: {
    //   type: Number,
    //   default: 0
    // }
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
      titAndDescInfo: this.compoInputObj[0],
      bodyInfo: this.compoInputObj[1]
      // form: {
      //   Table: {
      //     info: {
      //       tableRowNum: 1,
      //       description: [
      //         {
      //           line: false,
      //           colNum: '1',
      //           itemLabel: '',
      //           itemData: ''
      //         }
      //       ]
      //     }
      //   }
      // }
    }
  },
  computed: {
    componentStrSizeRule() {
      const map = {}
      if (this.componentParam && this.componentParam['CP-Table']) {
        for (const obj of this.componentParam['CP-Table']) {
          map[obj.paramNm] = obj.strSize
        }
      }
      return map
    },
    calcTableStrLength() {
      let strLength = 0
      this.bodyInfo.list.forEach(obj => {
        strLength += obj.subDesc.text.length
        strLength += obj.subTitle.text.length
      })
      return strLength
    }
  },
  methods: {
    addTableRows() {
      let tblRows = {
        subTitle: {
          text: '',
          textAlign: 'left',
          textBold: '',
          textColor: '#000000',
          textSize: '14'
        },
        subMedia: '',
        subMediaUrl: '',
        subDesc: {
          text: '',
          textAlign: 'left',
          textBold: '',
          textColor: '#000000',
          textSize: '14'
        },
        fileSrc: '',
        fileType: '',
        fileName: '',
        fileUrl: '',
        fileSize: 0,
        line: false,
        colNum: '2'
      }
      if (this.bodyInfo.list.length < 10) {
        this.bodyInfo.list.push(tblRows)
      }
    },
    removeRow(index) {
      if (this.bodyInfo.list.length > 1) {
        this.bodyInfo.list.splice(index, 1)
      }
    },
    initTitle() {
      console.log('initTitle')
      this.titAndDescInfo.title = ''
    }
  }
}
</script>

<style>

</style>
