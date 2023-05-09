<template>
  <div class="tmep__wrap">
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>font의 대한 정의는 @mixin fontoption 에 매개변수로 전달하는 방식으로 사용</li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="H 태그 가이드" />
    <div class="wsg-guide-content">
    </div>
    <TitleH3 titleh3="문단 가이드" />
    <div class="wsg-guide-content">
    </div>
    <TitleH3 titleh3="한줄 말 줄임" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>말 줄임이 필요한 영역은 mixin 으로 ellipsis($line: 1) 호출하고 줄 갯수를 매개 변수로 전달한다.</li>
        </ul>
      </div>
    </div>
    <div class="text">영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다. 영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다</div>
    <TitleH3 titleh3="여러줄 말 줄임" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>여러줄 말 줄임이 필요한 경우 ellipsis($line: 3) 줄 갯수를 매개 변수로 전달한다.</li>
        </ul>
      </div>
    </div>
    <div class="long-text">영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다. 영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다. 영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다. 영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다</div>
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
