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
                    maxlength="17"
                    id="mainTitleFree_Title"
                    @input="e => info.title = e.target.value"
                    placeholder="제목을 입력해주세요."
                  >
                  <div class="input-limit__text">
                    <p>{{ mainTitleLength }}/17자</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <!-- 변수 선택 -->
      <tr>
        <th scope="row"><span class="form-item__label required">타이틀 - 변수</span></th>
        <td>
          <div class="form-item__content">
            <div class="form-item-row">
              <div class="input-item" >
                <Dropdown :options="list" placeholder="변수 선택" v-model="info.subVarTitle"/>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Dropdown from '@/components/common/Dropdown.vue'
export default {
  components: {
    Dropdown
  },
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      list: [
        {
          label: '변수1',
          value: '변수1'
        },
        {
          label: '변수2',
          value: '변수2'
        }
      ]
    }
  }
}
</script>
