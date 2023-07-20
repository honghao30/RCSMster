<template>
   <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row"><span class="form-item__label required">타이틀 - 제목</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item input-limit">
                <div class="input">
                  <input type="text"
                    class="input"
                    maxlength="30"
                    @input="e => form.MainTitle.info.mainTitle = e.target.value"
                    placeholder="제목을 입력해주세요."
                  >
                  <div class="input-limit__text">
                    <p>{{ form.MainTitle.info.mainTitle.length }}/30자</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row"><span class="form-item__label">타이틀 - 설명</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item">
                <span class="radiobox">
                  <input type="radio" name="desc" id="descN" value="descN"
                    v-model="form.MainTitle.titleDescUse"
                  />
                  <label for="descN">미사용</label>
                </span>
                <span class="radiobox">
                  <input type="radio" name="desc" id="descY" value="descY"
                    v-model="form.MainTitle.titleDescUse"
                  />
                  <label for="descY">사용</label>
                </span>
              </div>
            </div>
            <div class="form-item-row" v-if="form.MainTitle.titleDescUse === 'descY'">
              <div class="input-item input-limit">
                <div class="input">
                  <input type="text"
                    class="input"
                    maxlength="30"
                    @input="e => form.MainTitle.info.titleDesc = e.target.value"
                    placeholder="설명을 입력해주세요."
                  >
                  <div class="input-limit__text">
                    <p>{{ form.MainTitle.info.titleDesc.length }}/17자</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row"><span class="form-item__label required">타이틀 - 로고</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item">
                <span class="radiobox">
                  <input type="radio" name="logoType" id="basic" v-model="form.logoType"  value="basic" />
                  <label for="basic">기본 아이콘</label>
                </span>
                <span class="radiobox">
                  <input type="radio" name="logoType" id="custom" v-model="form.logoType" value="custom" />
                  <label for="custom">직접 올리기</label>
                </span>
              </div>
              <template v-if="form.logoType === 'basic'">
                <TemplateTitleReg
                  :titleIconNewData="titleIconNewData"
                  :titleIconBasicData="titleIconBasicData"
                />
              </template>
              <template v-if="form.logoType === 'custom'">
                <div class="input-item w--full">
                  <span class="input">
                    <input type="text" class="input" :value="form.logoFile" disabled>
                  </span>
                  <input type="file" id="fileUp" class="input blind"
                  @change="onFileChanged">
                  <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                </div>
                <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                <p class="guide-text black">&middot; 권장 사이즈 : 300 * 300px (또는 1:1 비율)</p>
              </template>
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
  data() {
    return {
    }
  },
  methods: {
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.info.logoFile = fileName
      this.url = URL.createObjectURL(file)
    },
    checkTitleSelected (option) {
      this.info.logoFile = option[1]
    }
  }
}
</script>

<style>

</style>
