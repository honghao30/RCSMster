<template>
  <div class="templet__wrap is-text">
    <div class="text-title"
      :class="TitleTypes"
    >
      <p class="top-text" v-if="topsmTitle !== ''">{{ topsmTitle }}</p>
      <h4>제목</h4>
      <!-- <h4> {{ templeData.msgTitle }} </h4> -->
      <p class="sub-text"  v-if="subtitle !== ''">{{ subtitle }}</p>
    </div>
    <!-- <div class="template-table">
      <table>
        <colgroup>
          <col width="40%" />
          <col width="" />
        </colgroup>
        <tfoot>
          <tr>
            <th scope="row">금액</th>
            <td>125,000 원</td>
          </tr>
        </tfoot>
        <tbody>
            <tr>
              <th scope="row">결재처</th>
              <td>RCS Biz Center 판매점</td>
            </tr>
            <tr>
              <th scope="row">일시</th>
              <td>2000년 00월 00일 00:00</td>
            </tr>
            <tr>
              <th scope="row">결제 정보</th>
              <td>일시불</td>
            </tr>
        </tbody>
      </table>
    </div> -->
    <div class="template-text">
      <!-- {{ templeData.msgDesCont  }} -->
    </div>
    <div class="template-footer">
       <ButtonCmp
        type="btn-line"
       >
        버튼 레벨
      </ButtonCmp>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  props: {
    TitleTypes: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    topsmTitle: {
      type: String,
      default: ''
    },
    templeData: {
      type: Object
    }
  },
  components: { ButtonCmp }
}
</script>
