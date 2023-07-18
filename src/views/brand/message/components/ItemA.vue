<template>
   <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
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
                    v-model="form.titleDescUse"
                  />
                  <label for="descY">사용</label>
                </span>
              </div>
              <template v-if="form.title.desc === 'descY'">
                <div class="input-item input-limit">
                  <div class="input">
                    <input type="text"
                      class="input"
                      maxlength="30"
                      ref="mainDesc"
                      @input="e => form.MainTitle.info.mainDesc = e.target.value"
                      placeholder="최대 17자 까지 입력할 수 있습니다."
                    >
                    <div class="input-limit__text">
                      <p>{{ form.MainTitle.info.mainDesc.length }}/17자</p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      form: {
        MainTitle: {
          titleDescUse: 'descN',
          info: {
            mainTitle: '',
            titleType: '',
            logoFile: '',
            logoUrl: '',
            mainDesc: ''
          }
        },
      }
    }
  }
}
</script>

<style>

</style>
