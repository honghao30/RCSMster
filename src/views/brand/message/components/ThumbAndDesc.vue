<template>
  <table class="table table-bodyonly form-table">
   <colgroup>
     <col width="180px">
     <col />
   </colgroup>
   <tbody>
    <!-- 테이블: 제목 -->
    <tr>
      <th scope="row"><span class="form-item__label">상세-타이틀</span></th>
      <td>
        <div class="form-item__content">
          <div class="form-item-row">
            <div class="input-item">
              <span class="radiobox">
                <input type="radio" name="detailTitleUse" id="detailTitleUseN" value="N" v-model="info.titleUse"/>
                <label for="detailTitleUseN"><span class="radiobox__text">미사용</span></label>
              </span>
              <span class="radiobox">
                <input type="radio" name="detailTitleUse" id="detailTitleUseY" value="Y" v-model="info.titleUse"/>
                <label for="detailTitleUseY"><span class="radiobox__text">사용</span></label>
              </span>
            </div>
            <div class="input-item input-limit" v-if="info.titleUse === 'Y'">
              <div class="input">
                <input type="text" class="input" maxlength="30"
                  @input="e => info.title = e.target.value"
                  placeholder="타이틀을 입력해주세요."
                >
                <div class="input-limit__text">
                  <p>{{ info.title.length }}/30자</p>
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
          <div class="form-item-row form-template" v-for="(item, index) in info.content" :key="index">
            <div class="input-item input-left">
              <span class="input">
                <input type="text" class="input" disabled :value="item.imgFile">
              </span>
              <input type="file" id="fileUp" class="input blind"
              @change="onFileChanged">
              <label for="fileUp" class="btn btn-default-line">파일 찾기</label>
            </div>
            <div class="template-detail">
              <!-- [0726 문구 통합 : 텍스트 수정] -->
              <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB) / 권장 사이즈 : 300 * 300px (또는 1:1 비율)</p>
              <div class="input-item input-url">
                <div class="input">
                  <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="item.url"
                  ref="imageURL"
                  />
                </div>
              </div>
            </div>
            <div class="input-item input-limit input-right">
              <div class="input">
                <input type="text" class="input" maxlength="33"
                @input="e => item.itemData = e.target.value"
                  placeholder="내용을 입력해주세요."
                >
                <div class="input-limit__text">
                  <p>{{ item.itemData.length }}/33자</p>
                </div>
              </div>
              <ButtonCmp
                type="btn-default-line"
                size="small"
                @click="removeRow(index)"
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
                @click="addRows"
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
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.info.imgFile = fileName
      this.url = URL.createObjectURL(file)
    },
    addRows () {
      let row = {
        imgFile: '',
        url: '',
        itemData: ''
      }
      if (this.info.content.length < 10) {
        this.info.content.push(row)
      }
    },
    removeRow (index) {
      if (this.info.content.length > 1) {
        this.info.content.splice(index, 1)
      }
    }
  }
}
</script>

<style>

</style>
