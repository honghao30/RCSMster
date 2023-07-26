<template>
  <!-- 본문 -->
  <table class="table table-bodyonly form-table">
    <colgroup>
      <col width="180px">
      <col />
    </colgroup>
    <tbody>
      <!-- 본문 - 소제목 -->
      <template v-for="(item, i) in info">
        <tr :key="i">
          <th scope="row"><span class="form-item__label">본문{{ i + 1 }} - 소제목</span></th>
          <td>
            <div class="form-item__content">
              <div class="form-item-row">
                <div class="input-item">
                  <span class="radiobox">
                    <input type="radio" :name="`titleUse${i+1}`" :id="`titleUseN_${i+1}`" value="N"
                      v-model="item.description.subTitleUseY"
                    />
                    <label :for="`titleUseN_${i+1}`">미사용</label>
                  </span>
                  <span class="radiobox">
                    <input type="radio" :name="`titleUse${i+1}`" :id="`titleUseY_${i+1}`" value="Y"
                      v-model="item.description.subTitleUseY"
                    />
                    <label :for="`titleUseY_${i+1}`">사용</label>
                  </span>
                </div>
              </div>
              <div class="form-item-row" v-if="item.description.subTitleUseY === 'Y'">
                <div class="input-item input-limit">
                  <div class="input">
                    <input type="text"
                      class="input"
                      maxlength="30"
                      @input="e => item.description.subTitle = e.target.value"
                      placeholder="제목을 입력해주세요."
                    >
                    <div class="input-limit__text">
                      <p>{{ item.description.subTitle.length }}/30자</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <!-- 본문 - 내용 -->
        <tr :key="i">
          <th scope="row"><span class="form-item__label required">본문{{ i+1 }} - 내용</span></th>
          <td>
            <div class="form-item__content">
              <div class="form-item-row">
                <div class="input-item input-limit">
                  <div class="textarea">
                    <textarea maxlength="1300" placeholder="내용을 입력해주세요."
                    @input="e => item.description.content = e.target.value"
                    id="descContent"></textarea>
                    <div class="textarea-limit__text">
                      <p>
                        {{ item.description.content.length }}/1,300자
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-for="( button,index ) in item.Buttons.info" :key="i">
          <th scope="row"><span class="form-item__label">본문{{ i+1 }} - 버튼{{ index + 1 }} </span></th>
          <td :key="index">
          <TemplateButtonReg
          :buttonInfo="button"
          />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <!-- // 본문 -->
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
    },
    groupIdx: {
      type: Number
    }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
