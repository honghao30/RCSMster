<template>
   <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
    <tr>
        <th scope="row"><span class="form-item__label">타이틀</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item">
                <span class="radiobox">
                  <input type="radio" name="titleUse" id="titleUseN" value="N" v-model="info.titleUse"/>
                  <label for="titleUseN"><span class="radiobox__text">미사용</span></label>
                </span>
                <span class="radiobox">
                  <input type="radio" name="titleUse" id="titleUseY" value="Y" v-model="info.titleUse"/>
                  <label for="titleUseY"><span class="radiobox__text">사용</span></label>
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
    </tbody>
  </table>
</template>

<script>

export default {
  components: {
  },
  mounted() {
    this.info.titleType = 'simple'
  },
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data () {
    return {

    }
  }
}
</script>
