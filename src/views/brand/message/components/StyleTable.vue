<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <template>
      <!-- 테이블- 제목 -->
      <tr>
        <th colspan="2" class="templ-title">테이블</th>
      </tr>
        <tr>
          <th scope="row"><span class="form-item__label">제목</span></th>
          <td>
            <div class="form-item__content">
              <div class="form-item-row">
                <div class="input-item">
                  <span class="radiobox" @click='initTitle'>
                    <input type="radio" name="tableUse" id="tableUseN" value="N"
                      v-model='titAndDescInfo.useTitle'
                    />
                    <label for="tableUseN">미사용</label>
                  </span>
                  <span class="radiobox">
                    <input type="radio" name="tableUse" id="tableUseY" value="Y"
                      v-model='titAndDescInfo.useTitle'
                    />
                    <label for="tableUseY">사용</label>
                  </span>
                </div>
              </div>
              <div class="form-item-row" v-if="titAndDescInfo.useTitle === 'Y'">
                <div class="input-item input-limit">
                  <div class="input">
                    <input type="text" placeholder="제목을 입력해주세요."
                    v-model="titAndDescInfo.title"
                    @input="e => titAndDescInfo.title = e.target.value"
                    />
                    <div class="input-limit__text">
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
        <!-- 테이블- 내용 -->
        <tr>
          <th scope="row"><span class="form-item__label required">내용</span></th>
          <td>
            <div class="form-item__content">
              <p class='text-limit'
                 :style='calcTableStrLength > 90 ? "color:red;" : ""'>
                {{ calcTableStrLength }}/90자
              </p>
              <div class="form-item-row">
                <template>
                  <TemplateTableReg
                    :tableInfo.sync="bodyInfo"
                  />
                </template>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import TemplateTableReg from '@/views/brand/message/utils/TemplateTableReg.vue'
export default {
  components: {
    TemplateTableReg
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
      titAndDescInfo: this.compoInputObj[0],
      bodyInfo: this.compoInputObj[1]
      // form: {
      //   StyleTable: {
      //     tableUse: 'N',
      //     titleUse: '',
      //     info: {
      //       title: '',
      //       tableRowNum: 1,
      //       tableMaxRowCount: 10,
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
      if (this.componentParam && this.componentParam['CP-StyleTable']) {
        for (const obj of this.componentParam['CP-StyleTable']) {
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
    initTitle() {
      console.log('initTitle')
      this.titAndDescInfo.title = ''
    }
  }
}
</script>

<style>

</style>
