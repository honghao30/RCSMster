<template>
   <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row"><span class="form-item__label">타이틀 - 로고</span></th>
        <td>
          <div class="form-item__content">
          <!-- 로고 등록 -->
            <div class="form-item-row">
              <div class="input-item">
                <span class="radiobox">
                  <input type="radio" name="logoType" id="basic" v-model="info.iconType"  value="basic" />
                  <label for="basic">기본 아이콘</label>
                </span>
                <span class="radiobox">
                  <input type="radio" name="logoType" id="custom" v-model="info.iconType" value="custom" />
                  <label for="custom">직접 등록</label>
                </span>
              </div>
            </div>
            <div class="form-item-row" v-if="info.iconType === 'basic'">
              <div class="input-item logoList">
                <TemplateTitleReg
                  :titleIconNewData="titleIconNewData"
                  :titleIconBasicData="titleIconBasicData"
                  @optionSelected="checkTitleSelected"
                />
                </div>
            </div>
            <div class="form-item-row" v-if="info.iconType === 'custom'">
              <div class="input-item w--full">
                <span class="input">
                  <input type="text" class="input" :value="info.logoFile" disabled>
                </span>
                <input type="file" id="fileUp" class="input blind"
                @change="onFileChanged">
                <label for="fileUp" class="btn btn-default-line">파일 선택</label>
              </div>
              <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row"><span class="form-item__label required">타이틀 - 제목</span></th>

        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item input-limit">
                  <div class="input">
                    <input type="text"
                      class="input"
                      maxlength="17"
                      id="mainTitle_Title"
                      @input="e => info.title = e.target.value"
                      placeholder="최대 17자 까지 입력할 수 있습니다."
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
    </tbody>
  </table>
</template>

<script>
import TemplateTitleReg from '@/views/brand/message/components/TemplateTitleReg.vue'
export default {
  components: {
    TemplateTitleReg
  },
  props: {
    info: {
      type: Object,
      default: null
    },
    titleIconNewData: {
      type: Array,
      default: null
    },
    titleIconBasicData: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
    }
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
    checkTitleSelected (option) {
      this.info.titleIcon = option[1]
    }
  }
}
</script>
