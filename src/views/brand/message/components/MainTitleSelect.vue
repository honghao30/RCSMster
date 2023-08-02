<template>
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
    <tr>
        <th scope="row"><span class="form-item__label required">타이틀</span></th>
        <td>
        <div class="form-item__content">
          <!-- 타이틀 선택 영역 -->
          <div class="form-item-row">
            <TemplateTitleReg
              :titleIconNewData="titleIconNewData"
              :titleIconBasicData="titleIconBasicData"
              @optionSelected="checkTitleSelected"
            />
            <!-- // 타이틀 선택 영역 -->
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
    checkTitleSelected (option) {
      this.info.title = option[0]
      this.info.titleIcon = option[1]
    }
  }
}
</script>
