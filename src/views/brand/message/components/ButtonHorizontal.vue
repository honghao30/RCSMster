<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <tr v-for="(button, index) in info" :key="index">
        <th scope="row"><span class="form-item__label">버튼{{ index + 1 }} </span></th>
        <td>
        <TemplateButtonReg
        :buttonInfo="button"
        />
        </td>
      </tr>
      <!-- <tr>
        <th scope="row"><span class="form-item__label">버튼색 </span></th>
        <td>
          <div class="form-item-row">
              <div class="input-item brand-color-select">
                <span class="radiobox">
                  <input type="radio" name="bgColor" id="defaultColor"
                  checked value="#2f77fb"/>
                  <label for="defaultColor">기본색</label>
                </span>
                <span class="radiobox">
                  <input type="radio" name="bgColor" id="brandColor" disabled value="#70AD47" />
                  <label for="brandColor">브랜드색 (
                    <router-link to="#">
                    브랜드 색 설정
                  </router-link> )</label>
                </span>
              </div>
          </div>
        </td>
      </tr> -->
    </tbody>
  </table>
</template>

<script>
import TemplateButtonReg from '@/views/brand/message/components/TemplateButtonReg.vue'

export default {
  components: {
    TemplateButtonReg
  },
  props: {
    info: {
      type: Array
    }
  },
}
</script>
<style>

</style>
