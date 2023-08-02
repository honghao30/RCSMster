<template>
  <table class="table table-bodyonly form-table">
   <colgroup>
     <col width="180px">
     <col />
   </colgroup>
   <tbody>
    <!-- 테이블: 제목 -->
    <tr>
      <th colspan="2" class="templ-title">이미지설명</th>
    </tr>
    <tr>
      <th scope="row"><span class="form-item__label">타이틀</span></th>
      <td>
        <div class="form-item__content">
          <div class="form-item-row">
            <div class="input-item">
              <span class="radiobox" @click='initTitle'>
                <input type="radio" name="detailTitleUse" id="detailTitleUseN" value="N" v-model="titAndDescInfo.useTitle"/>
                <label for="detailTitleUseN"><span class="radiobox__text">미사용</span></label>
              </span>
              <span class="radiobox">
                <input type="radio" name="detailTitleUse" id="detailTitleUseY" value="Y" v-model="titAndDescInfo.useTitle"/>
                <label for="detailTitleUseY"><span class="radiobox__text">사용</span></label>
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
      <th scope="row"><span class="form-item__label required">상세</span></th>
      <td>
        <div class="form-item__content">
          <!-- [0726 반복 구간 변경 ] -->
          <div class="form-item-row form-template" v-for="(item, idx) in bodyInfo.list" :key="idx">
            <div class="input-item input-left">
              <span class="input">
                <input type="text" class="input" disabled :value="item.fileName">
              </span>
              <input type="file" :id="`thumbDescFile_${idx}`" class="input blind"
              @change="onFileChanged($event, idx)">
              <label :for="`thumbDescFile_${idx}`" class="btn btn-default-line">파일 찾기</label>
            </div>
            <div class="template-detail">
              <!-- [0726 문구 통합 : 텍스트 수정] -->
              <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB) / 권장 사이즈 : 300 * 300px (또는 1:1 비율)</p>
              <div class="input-item input-url">
                <div class="input">
                  <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="item.fileUrl"
                  :ref="`imageURL_${idx}`"
                  />
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
                  <p :style='item.subDesc.text.length > componentStrSizeRule["subImgDesc" + (idx + 1)] ? "color:red;" : ""'>
                    {{ item.subDesc.text.length }}/{{ componentStrSizeRule["subImgDesc" + (idx + 1)] }}자
                  </p>
                </div>
              </div>
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
            <div class="template-button">
              <ButtonCmp
                type="btn-default-line"
                size="medium"
                @click="addTableRows"
                v-if="bodyInfo.list.length < bodyInfo.maxCnt"
              >
              + 추가하기
              </ButtonCmp>
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
    compoInputObj: {
      type: Array,
      default: () => {
        return [null, null]
      }
    },
    componentParam: {
      type: Object,
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
      if (this.componentParam && this.componentParam['CP-ThumbDesc']) {
        for (const obj of this.componentParam['CP-ThumbDesc']) {
          map[obj.paramNm] = obj.strSize
        }
      }
      return map
    }
  },
  methods: {
    // 이미지 파일 업로드
    onFileChanged (e, index) {
      console.log('file', index, e.target.files)
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.bodyInfo.list[index].fileName = fileName
      this.bodyInfo.list[index].fileSize = file.size
      this.bodyInfo.list[index].fileType = file.type
      this.bodyInfo.list[index].fileSrc = URL.createObjectURL(file)
    },
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
