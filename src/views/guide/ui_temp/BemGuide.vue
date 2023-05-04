<template>
  <div class="tmep__wrap">
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>BEM(Block-Element-Modifier)은 CSS 클래스 네이밍 방법론으로 일부에 대해 가이드 합니다. </li>
          <li>블록(Block): 구성 요소의 가장 바깥쪽 상위 요소를 블록으로 정의한다.</li>
          <li>요소(Element): 구성 요소 안쪽에는 하나 또는 그 이상의 요소가 있을 수 있다.</li>
          <li>변경자(Modifier): 블록 또는 요소는 변경자를 이용하여 변형을 표시할 수 있다.</li>
          <li><a href="https://webclub.tistory.com/263" target="_blank">https://webclub.tistory.com/263</a> 참고 </li>
          <li><a href="https://www.aemcomponents.dev/content/core-components-examples/library.html" target="_blank">어도비 AEM 라이브러리</a> 참고 </li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="예시 1" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        .list__wrap<br>
          .list-item<br>
            .list-item__title--top
      </div>
    </div>
  </div>
</template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'

export default {
  components: {
    TitleH3
  }
}
</script>
