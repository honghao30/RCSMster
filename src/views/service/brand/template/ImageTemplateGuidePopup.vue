<template>
  <div class="layer big active" style="overflow: auto; overscroll-behavior: none;">
    <div class="layer_cont">
      <div class="layer_head">
        <a id="btn_close" href="javascript:void(0)" onclick class="btn_close" @click="closePopup"></a>
      </div>
      <div class="layer_body">
        <!-- 내용 -->
        <div class="tab-area">
          <input type="radio" name="tabs" id="tab1" checked>
          <label for="tab1">공통 가이드</label>

          <input type="radio" name="tabs" id="tab2">
          <label for="tab2">텍스트 템플릿</label>

          <input type="radio" name="tabs" id="tab3">
          <label for="tab3">이미지 템플릿</label>

          <div id="content1" class="tab-content">
            <!-- 공통 가이드 -->
            <p class="Guide_popup_subtitle">템플릿 등록 공통 가이드</p>
            <ul>
              <li>템플릿 메시지는 승인 이후 사용할 수 있습니다.</li>
              <li>
                모든 텍스트 영역은 고정부와 변수부로 구성할 수 있지만, 반드시 고정부를 포함해야 합니다.<br>
                (단, “타이틀 자유형”의 타이틀 및 모든 메시지 유형의 버튼은 제외)
              </li>
              <li>텍스트 내용이 잘 드러나게 작성해야 하며, 내용 확인이 어려울 경우 반려 처리될 수 있습니다. </li>
              <li>템플릿 등록 완료 후 내용 변경 시 추가 승인 절차가 필요합니다. </li>
            </ul>
          </div>

          <div id="content2" class="tab-content">
            <!-- 텍스트 템플릿  -->
            <p class="Guide_popup_subtitle">텍스트 템플릿 등록 가이드</p>
            <ul>
              <li>RCS 템플릿 요금제 상품입니다.</li>
              <li>정보 전달 목적으로만 이용할 수 있습니다.</li>
              <li>템플릿 검수 단계에서 광고 내용 확인 시 반려 처리될 수 있고,<br>광고 내용을 포함하여 메시지 전송 시 패널티를 받을 수 있습니다. </li>
              <li><b>서술(description) 템플릿</b><br/>
                문자 메시지처럼 줄글 형태로만 메시지를 제작할 수 있습니다.
              </li>
              <li><b>스타일(cell) 템플릿</b><br/>
                각 줄 마다 입력칸을 생성해서 (최대 2칸)메시지를 제작할 수 있습니다.
              </li>
              <li><b>기본(free) 템플릿</b><br/>
                템플릿 등록 절차 없이 바로 이용할 수 있습니다.
              </li>
            </ul>
          </div>
          <div id="content3" class="tab-content">
            <!-- 이미지 템플릿  -->
            <p class="Guide_popup_subtitle">이미지 템플릿 등록 가이드</p>
            <ul>
              <li>RCS 이미지템플릿 요금제 상품입니다.</li>
              <li>정보 전달 뿐만 아니라, 광고 전달 목적으로도 사용할 수 있습니다.</li>
              <li>템플릿 검수 단계에서 불법적인 내용 확인 시 반려 처리될 수 있고, 불법적인 내용을 포함해서 메시지 전송 시 패널티를 받을 수 있습니다.(아래 기준 참고)
                <p>
                  (불법적인 내용에 대한 예시)<br/>
                  음란 / 선정물, 마약, 불법 대출 (불법 금융 서비스), 도박, 폭력 / 혐오 / 공포 / 비속, 위법 / 부적절한 서비스 및 관계법령에 따라 인터넷 광고가 금지되거나 인터넷 판매, 유통 등이 불가능한 상품 등
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageTemplateGuidePopup',
  props: {
    visible: {
      type: Boolean
    }
  },
  methods: {
    closePopup() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>

.tab-area { box-sizing: border-box;  }
.tab-area input + label { height: 38px; width: 33.3%; line-height: 36px; text-align: center; background: #fff; font-size: 18px; font-weight: 600; border: 1px solid #000; box-sizing: border-box; }
.tab-area input:first-of-type + label { border-radius: 10px 0 0 10px; border-right: 0; margin-right: -1px; }
.tab-area input:last-of-type + label {border-radius: 0 10px 10px 0; border-left: 0; margin-left: -1px;}
.tab-area input:checked + label { background: #000; color: #fff; }

.tab-content { border-top :0; margin-top: 25px; flex-direction: column; height: 365px; }
.tab-content > p { font-size: 22px; margin-bottom: 15px; }
.tab-content > ul { padding: 20px; border-radius: 3px; background: #f6f6f6; height: 100%; }
.tab-content li { position: relative; padding-left: 20px; font-size: 16px; line-height: 140%; color: #666666; margin-bottom: 10px; font-family: 'NotoSansLight'; }
.tab-content li > p { margin-top: 20px; }
.tab-content li:after { position: absolute; content:""; width: 5px; height: 1px; background: #666666; top: 13px; left:0; }

</style>
