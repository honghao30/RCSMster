<template>
  <div class="tmep__wrap">
    <TitleH3 titleh3="폰트 정의" />
    <div class="wsg-guide-content">
      폰트는 "Noto Sans KR을 기본 서체로 사용.<br>
      Regular를 기본으로 사용하되 타이틀 및 강조에 따라 Medium/Bold 등<br>
      두께감을 활용함.<br><br>

      메인과 강조가 필요한 페이지에서 포인트를 위해 영문 폰트에<br>
      Pretendard를 사용.<br><br>
      <strong class="korea-font">한글</strong> Noto Sans KR<br><br>
      <strong class="english-font">English</strong> Pretendard
    </div>
    <TitleH3 titleh3="H 태그 가이드" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>각 페이지에서 공통적으로 사용되는 2가지 타이틀 컴포넌트를 사용 합니다.</li>
          <li>1. PageTitle.vue 컴포넌트 (전체 타이틀)
              <ul>
                <li>- 기본 폰트 사이즈: 36px</li>
                <li>- 브랜드 LNB와 함께 있는 PageTitle.vue 컴포넌트의 경우 폰트 사이즈: 32px</li>
              </ul>
          </li>
          <li>2. PageTitleH3.vue 컴포넌트 (소타이틀)
              <ul>
                <li>- 기본 폰트 사이즈: 24px</li>
              </ul>
          </li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="한줄 말 줄임" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>말 줄임이 필요한 영역은 mixin 으로 ellipsis($line: 1) 호출하고 줄 개수를 매개 변수로 전달합니다.</li>
        </ul>
      </div>
    </div>
    <div class="text">영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다. 영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다</div>
    <TitleH3 titleh3="여러줄 말 줄임" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>여러줄 말 줄임이 필요한 경우 ellipsis($line: 3) 줄 갯수를 매개 변수로 전달합니다.</li>
        </ul>
      </div>
    </div>
    <div class="long-text">영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다. 영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다. 영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다. 영어 자기소개 할 기회가 있을 때 쓰면 좋을만한 샘플 문장들을 모아봤습니다. 외국에서는 처음 만난 사람이나 친구를 통해 알게된 사람들과 소개를 합니다</div>
    <TitleH3 titleh3="전체 폰트 가이드" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>폰트에 대한 정의된 별도의 클래스가 존재하지 않으며, mixin 으로 사용합니다.</li>
        </ul>
      </div>
    </div>
    <div class="font-guide-box">
      <div class="font-guide-cate">Main Font / Key-Visual Copy</div>
      <div class="font-guide">
        <p class="exsample-font0">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(48px,#000, 700, 48px);</p>
      </div>
      <div class="font-guide-cate">Main Font / Section Title</div>
      <div class="font-guide">
        <p class="exsample-font1">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(100px,#000, 700, 104px);</p>
      </div>
      <div class="font-guide-cate">Main Font / Section Text</div>
      <div class="font-guide">
        <p class="exsample-font2">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(28px,#000, 500, 38px);</p>
      </div>
    </div>
    <div class="font-guide-box">
      <div class="font-guide-cate">Body Title / 본문 Title - A </div>
      <div class="font-guide">
        <p class="exsample-font3">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(36px,#000, 700, 48px);</p>
      </div>
      <div class="font-guide-cate">Body Title / 본문 Title - B </div>
      <div class="font-guide">
        <p class="exsample-font4">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(32px,#000, 700, 44px);</p>
      </div>
      <div class="font-guide-cate">Body Title / 본문 Sub Title - A  </div>
      <div class="font-guide">
        <p class="exsample-font5">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(28px,#000, 500, 40px)</p>
      </div>
      <div class="font-guide-cate">Body Title / 본문 Sub Title - B  </div>
      <div class="font-guide">
        <p class="exsample-font6">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(24px,#000, 500, 36px);</p>
      </div>
      <div class="font-guide-cate">Body Title / 이용가이드 Title - C </div>
      <div class="font-guide">
        <p class="exsample-font7">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(20px,#000, 500, 32px);</p>
      </div>

      <div class="font-guide-cate">Body Text / 본문 Text (강조) </div>
      <div class="font-guide">
        <p class="exsample-font8">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(18px,#000, 500, 30px);</p>
      </div>
      <div class="font-guide-cate">Body Text / 본문 TexT (Default) </div>
      <div class="font-guide">
        <p class="exsample-font9">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(14px,#000, 400, 26px);</p>
      </div>
      <div class="font-guide-cate">Body Text / 보조 Text </div>
      <div class="font-guide">
        <p class="exsample-font10">RCS Biz Center 메시지 서비스</p>
        <p class="mixin-ex">@include fontoption(12px,#000, 400, 24px);</p>
      </div>
    </div>
    <TitleH3 titleh3="폰트 Mixin" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>font의 대한 정의는 @mixin fontoption 에 매개변수로 전달하는 방식으로 사용 합니다.</li>
          <li>@include fontoption(fontsize, color, fotn-weight, line-height)</li>
        </ul>
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

<style lang="scss">
@import '@/assets/scss/common/_variables.scss';
@import '@/assets/scss/common/base.scss';
.korea-font {
  @include fontoption(48px,#000, 700, 48px);
}
.english-font {
  @include fontoption(36px,#000, 700, 81px);
  font-family: 'Pretendard';
}
.font-guide-cate {
  font-size: 25px;
  margin:20px 0;
}
.font-guide-box {
  padding: 20px 50px;
  border-radius: 20px;
  border: 1px solid #ccc;
}
.font-guide {
  font-size: 16px;
  line-height: 25px;
  margin-bottom:30px;
  .mixin-ex {
    background: #eee;
    padding: 10px;
    width:fit-content;
    margin-bottom:50px;
  }
  .exsample-font0 {
    margin-bottom: 20px;
    @include fontoption(48px,#000, 500, 48px);
    letter-spacing : -0.025em;
  }
  .exsample-font1 {
    margin-bottom: 20px;
    @include fontoption(100px,#000, 700, 104px);
    letter-spacing : -0.025em;
  }
  .exsample-font2 {
    margin-bottom: 20px;
    @include fontoption(28px,#000, 500, 38px);
    letter-spacing : -0.025em;
  }
  .exsample-font3 {
    margin-bottom: 20px;
    @include fontoption(36px,#000, 700, 48px);
    letter-spacing : -0.025em;
  }
  .exsample-font4 {
    margin-bottom: 20px;
    @include fontoption(32px,#000, 700, 44px);
    letter-spacing : -0.025em;
  }
  .exsample-font5 {
    margin-bottom: 20px;
    @include fontoption(28px,#000, 500, 40px);
  }
  .exsample-font6 {
    margin-bottom: 20px;
    @include fontoption(24px,#000, 500, 36px);
  }
  .exsample-font7 {
    margin-bottom: 20px;
    @include fontoption(20px,#000, 500, 32px);
  }

  .exsample-font8 {
    margin-bottom: 20px;
    @include fontoption(18px,#000, 500, 30px);
  }
  .exsample-font9 {
    margin-bottom: 20px;
    @include fontoption(14px,#000, 400, 26px);
  }
  .exsample-font10 {
    margin-bottom: 20px;
    @include fontoption(12px,#000, 400, 24px);
  }
}
</style>
