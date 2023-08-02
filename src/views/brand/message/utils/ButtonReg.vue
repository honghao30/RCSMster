<template>
  <div
    class="modal__content--inner zipcode__modal "
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">버튼 설정</p>
    </div>
    <div class="modal__content--body">
      <div class="form-table registration-form__wrap table__wrap">
        <table class="table table-bodyonly">
          <colgroup>
            <col width="166px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">버튼</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="radiobox">
                        <input type="radio" :name="`${info.type}BtnUse`" v-model="info.btnUse"  :id="`${info.type}BtnUseY`" value="Y"/>
                        <label :for="`${info.type}BtnUseY`"><span class="radiobox__text">사용</span></label>
                      </span>
                      <span class="radiobox">
                        <input type="radio" :name="`${info.type}BtnUse`" v-model="info.btnUse" :id="`${info.type}BtnUseN`" value="N"/>
                        <label :for="`${info.type}BtnUseN`"><span class="radiobox__text">미사용</span></label>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">버튼 유형</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="radiobox">
                          <input type="radio" :name="`${info.type}BtnAlign`" :id="`${info.type}BtnAlignCol`" value="column" v-model="info.btnAlign"/>
                          <label :for="`${info.type}BtnAlignCol`"><span class="radiobox__text">상하 버튼</span></label>
                        </span>
                        <span class="radiobox">
                          <input type="radio" :name="`${info.type}BtnAlign`" :id="`${info.type}BtnAlignRow`" v-model="info.btnAlign" value="row" />
                          <label :for="`${info.type}BtnAlignRow`"><span class="radiobox__text">좌우 버튼</span></label>
                        </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">버튼 컬러</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="radiobox">
                        <input type="radio" :name="`${info.type}BtnColor`" :id="`${info.type}BtnColorBasic`" value="basic" v-model="info.btnColor"/>
                        <label :for="`${info.type}BtnColorBasic`"><span class="radiobox__text">기본 컬러</span></label>
                      </span>
                      <span class="radiobox">
                        <input type="radio" :name="`${info.type}BtnColor`" :id="`${info.type}BtnColorBrand`" v-model="info.btnColor" value="brand" />
                        <label :for="`${info.type}BtnColorBrand`"><span class="radiobox__text">브랜드 컬러</span></label>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >확인</ButtonCmp>
      </div>
    </div>
  </div>
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
    },
    modalsize: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  mounted() {
  }

}
</script>

<style>

</style>
