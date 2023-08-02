<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <!-- 테이블: 제목 -->
      <tr>
        <th colspan="2" class="templ-title">타이틀설명</th>
      </tr>
      <tr>
        <th scope="row"><span class="form-item__label">제목</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item">
                <span class="radiobox" @click='initTitle'>
                  <input type="radio" name="titleUse" id="titleUseN" value="N" v-model="titAndDescInfo.useTitle"/>
                  <label for="titleUseN"><span class="radiobox__text">미사용</span></label>
                </span>
                <span class="radiobox">
                  <input type="radio" name="titleUse" id="titleUseY" value="Y" v-model="titAndDescInfo.useTitle"/>
                  <label for="titleUseY"><span class="radiobox__text">사용</span></label>
                </span>
              </div>
              <div class="input-item input-limit" v-if="titAndDescInfo.useTitle === 'Y'">
                <div class="input">
                  <input type="text" class="input"
                    @input="e => titAndDescInfo.title = e.target.value"
                    placeholder="타이틀을 입력해주세요."
                  >
                  <div class="input-limit__text">
                    <p :style='titAndDescInfo.title.length > componentStrSizeRule["title"] ? "color:red;" : ""'>
                      {{ titAndDescInfo.title.length }}/{{ componentStrSizeRule['title'] }}자
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row"><span class="form-item__label required">내용</span></th>
        <td>
          <div class="form-item__content">
              <div class="form-item-row form-template" v-for="(item, idx) in bodyInfo.list" :key="idx">
                <div class="input-item input-limit input-left">
                  <div class="input">
                    <input type="text" class="input"
                      @input="e => item.subTitle.text = e.target.value"
                      placeholder="내용을 입력해주세요."
                    >
                    <div class="input-limit__text">
                      <p :style='item.subTitle.text.length > componentStrSizeRule["subTitle" + (idx + 1)] ? "color:red;" : ""'>
                        {{ item.subTitle.text.length }}/{{ componentStrSizeRule["subTitle" + (idx + 1)] }}자
                      </p>
                    </div>
                  </div>
                </div>
                <div class="input-item input-limit input-right">
                  <div class="input">
                    <input type="text" class="input"
                      @input="e => item.subDesc.text = e.target.value"
                      placeholder="내용을 입력해주세요."
                    >
                    <div class="input-limit__text">
                      <p :style='item.subDesc.text.length > componentStrSizeRule["subDesc" + (idx + 1)] ? "color:red;" : ""'>
                        {{ item.subDesc.text.length }}/{{ componentStrSizeRule["subDesc" + (idx + 1)] }}자
                      </p>
                    </div>
                  </div>
                  <!-- [07.25 수정] 삭제 버튼 위치 변경-->
                  <ButtonCmp
                    type="btn-default-line"
                    size="small"
                    @click="removeRow(idx)"
                    :disabled="bodyInfo.list.length < 1"
                  >
                    삭제
                  </ButtonCmp>
                </div>
              </div>
            <div class="form-item-row">
              <ButtonCmp
                type="btn-default-line"
                size="medium"
                @click="addTableRows"
                v-if="bodyInfo.list.length < bodyInfo.maxCnt"
              >
              + 추가하기
              </ButtonCmp>
            </div>
            <!-- // [07.25 수정] 템플릿 데이터 반복되는 구간 변경 및 버튼 위치 변경-->
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  name: 'TitleDesc',
  components: {
    ButtonCmp
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
    }
  },
  computed: {
    componentStrSizeRule() {
      const map = {}
      if (this.componentParam && this.componentParam['CP-TitleDesc']) {
        for (const obj of this.componentParam['CP-TitleDesc']) {
          map[obj.paramNm] = obj.strSize
        }
      }
      return map
    }
  },
  methods: {
    addTableRows () {
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
    removeRow (index) {
      console.log('removeRow', index)
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
