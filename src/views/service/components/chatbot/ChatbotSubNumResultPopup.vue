<template>
  <div class="rcs_container rbc_wrap">
    <div class="layer auto active">
      <div class="layer_cont dv2023_subnum-result">
        <div class="layer_body">
          <!-- 삭제 -->
          <p v-if="type === 'delete'">
            삭제 요청하신 발신번호 중,<br/>
            ‘양방향 대화방의 회신번호’로 지정된 대화방이 확인 되었습니다.<br/>
            해당 양방향 대화방도 함께 삭제됩니다.<br/><br/>
            모두 삭제 하시겠습니까?
          </p>
          <!-- 비전시 -->
          <p v-else-if="type === 'nonExhibit'">
            비전시 요청하신 발신번호 중,<br/>
            ‘양방향 대화방의 회신번호’로 지정된 대화방이 확인 되었습니다.<br/><br/>
            함께 비전시 하시겠습니까?<br/><br/>
            (비전시 상태로 30일 유지 시 자동 삭제됩니다.)
          </p>
          <!-- 전시: 회신번호(비전시),챗봇ID기반 양방향 대화방(비전시) 상태에서 양방향 대화방을 전시 처리하는 경우 보여지게 됨 -->
          <p v-else>
            전시로 변경 요청하신 양방향 대화방의 회신번호(발신번호)가<br/>
            현재 비전시 상태입니다.<br/>
            해당 발신번호도 함께 전시로 전환됩니다.<br/><br/>
            모두 전시 전환 하시겠습니까?
          </p>
          <div v-if="type === 'exhibit'">
            <p class="subnum-result_count" >- 전시로 전환되는 발신번호</p>
            <p class="subnum-result_list">
              <span v-for="(num, idx) in data" :key="idx">
                {{ num }}
              </span>
            </p>
          </div>
          <div v-else>
            <p class="subnum-result_count" >- 회신번호(영향받는 양방향 대화방 개수)</p>
            <p class="subnum-result_list">
              <span v-for="(num, idx) in data" :key="idx">
                {{ Object.keys(num)[0] }} ({{ data[idx][Object.keys(num)[0]] }}개)
              </span>
            </p>
          </div>
        </div>
        <div class="">
          <a href="javascript:void(0)" class="btn sml bd_black" @click="closePopup">취소</a>
          <a href="javascript:void(0)" class="btn sml black" @click="confirm">{{ confirmBtnNm }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatbotSubNumResultPopup',
  props: {
    type: { type: String, default: '' },
    data: { type: Array, default: null }
  },
  computed: {
    confirmBtnNm() {
      if (this.type === 'delete') return '전체 삭제'
      else if (this.type === 'nonExhibit') return '전체 비전시'
      else if (this.type === 'exhibit') return '전체 전시로 전환'
      else return '확인'
    }
  },
  methods: {
    closePopup() {
      this.$emit('update:visible', false)
    },
    confirm() {
      this.$emit('success')
      this.$emit('update:visible', false)
    }
  }
}
</script>
