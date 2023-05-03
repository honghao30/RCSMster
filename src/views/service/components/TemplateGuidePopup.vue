<template>
  <div class="layer big active" style="overflow: auto; overscroll-behavior: none;">
    <div class="layer_cont">
      <div class="layer_head">
        <h2>템플릿 작성안내</h2>
      </div>
      <div class="layer_body">
        <div class="layer_scroll">
          <div class="template_guide">
            <h3 class="title">템플릿 등록</h3>
            <div class="box_gray mar_b30">
              <ul class="bullet_list fs16">
                <li>서술(description) 템플릿과 스타일(cell) 템플릿은 운영자 승인 후 사용이 가능합니다.</li>
                <li>저장 상태에서는 수정/삭제가 가능합니다.</li>
                <li>승인요청 후에 취소가 가능(검수시작 전)하며, 승인완료 후에 수정(승인필요)이 가능합니다.</li>
                <li><b>메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요.<br>(90자 초과시 전송 불가)</b></li>
                <li>버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다.</li>
              </ul>
            </div>
            <h3 class="title">서술(description) 템플릿 등록</h3>
            <div class="box_gray mar_b30">
              <ul class="bullet_list fs16">
                <li>문자메시지처럼 문장 형태의 텍스트를 입력할 수 있습니다.</li>
                <li>에뮬레이터에 노출되는 이미지는 변경이 되지 않습니다.</li>
                <li>본문 내용은 반드시 변수 이외 문장을 입력해야 합니다.</li>
              </ul>
            </div>
            <h3 class="title">스타일(cell) 템플릿 등록</h3>
            <div class="box_gray">
              <ul class="bullet_list fs16">
                <li>최대 10행까지 입력이 가능합니다.</li>
                <li>1행에 1개 또는 2개의 Cell을 선택적으로 사용할 수 있습니다.</li>
                <li>Cell별로 볼드, 글자크기, 정렬, 글자색을 지정하실 수 있습니다.</li>
                <li>라인 체크박스 클릭 시 해당 행 하단에 라인을 삽입하실 수 있습니다.</li>
                <li>Cell 설정된 값은 우측 에뮬레이터 영역에서 실시간으로 확인이 가능합니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="layer_foot">
        <div class="btn_wrap mar_t30">
          <a href="javascript:void(0);" class="btn sml black type2" @click="closePopup">
            <span>확인</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateGuidePopup',
  props: {
    visible: {
      type: Boolean
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    closePopup() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style>
</style>
