<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
        <col width="180px">
        <col />
      </colgroup>
      <tbody>
        <tr v-for="(button,index) in buttonsInfo.btnList" :key="index">
          <th scope="row"><span class="form-item__label">버튼{{ index + 1 }} </span></th>
          <td>
          <TemplateButtonReg
          :buttonInfo="button"
          :componentParam='componentParam["CP-VButton"]'
          />
          </td>
        </tr>
        <tr>
          <th scope="row"><span class="form-item__label">버튼색</span></th>
          <td>
            <div class="form-item-row">
                <div class="input-item brand-color-select">
                  <span class="radiobox">
                    <input type="radio" :name="`vButtonBgColor${compoIndex}`" :id="`vButtonDefaultColor${compoIndex}`" value="default" v-model="buttonsInfo.buttonColorType" /><!-- #2f77fb -->
                    <label :for="`vButtonDefaultColor${compoIndex}`">기본색</label>
                  </span>
                  <span class="radiobox">
                    <input type="radio" :name="`vButtonBgColor${compoIndex}`" :id="`vButtonBrandColor${compoIndex}`" value="brand" v-model="buttonsInfo.buttonColorType" disabled/>
                    <label :for="`vButtonBrandColor${compoIndex}`">브랜드색 (
                      <router-link to="#">
                      브랜드 색 설정
                    </router-link> )</label>
                  </span>
                </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import TemplateButtonReg from '@/views/brand/message/utils/TemplateButtonReg.vue'
import componentUtils from '@/views/brand/message/utils/js/componentUtilsV2'

export default {
  components: {
    TemplateButtonReg,
    componentUtils
  },
  props: {
    componentParam: {
      type: Object,
      default: null
    },
    compoInputObj: {
      type: Array,
      default: null
    },
    compoIndex: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      buttonsInfo : this.compoInputObj[0],
      }
  },
  async created(){
    console.log('버튼' , this.buttonsInfo)
  },
  methods: {
  }
}
</script>
<style>

</style>
