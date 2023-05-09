<template>
  <div class="tmep__wrap">
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>버튼과 아이콘에 대한 가이드 입니다.</li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="유형별 버튼" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>버튼은 .button__wrap 안에 있어야 하며, 기본적으로 .btn 클래스 있어 공통 css를 정의한다.</li>
          <li>버튼의 유형은 type="" 로 정하며, 크기는 size=""에서 지정한다.</li>
        </ul>
      </div>
    </div>

    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue-line"
        @click="clickHandler"
      >
        기본형
      </ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        @click="clickHandler"
      >
        기본형
      </ButtonCmp>
      <ButtonCmp
        type="btn-line"
        @click="clickHandler"
      >
        기본형
      </ButtonCmp>
      <ButtonCmp
        type="btn-default-line"
        @click="clickHandler"
      >
        Form 내부
      </ButtonCmp>
    </div>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue-line"
        size="medium"
        @click="clickHandler"
      >
        기본형
      </ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        size="medium"
        @click="clickHandler"
      >
        기본형
      </ButtonCmp>
      <ButtonCmp
        type="btn-line"
        size="medium"
        @click="clickHandler"
      >
        기본형
      </ButtonCmp>
    </div>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue-line"
        size="small"
        @click="clickHandler"
      >
        기본형
      </ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        size="small"
        @click="clickHandler"
      >
        기본형
      </ButtonCmp>
      <ButtonCmp
        type="btn-line"
        size="small"
        @click="clickHandler"
      >
        기본형
      </ButtonCmp>
    </div>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue-line"
        @click="clickHandler"
        disabled
      >
        기본형
      </ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        @click="clickHandler"
        disabled
      >
        기본형
      </ButtonCmp>
      <ButtonCmp
        type="btn-line"
        @click="clickHandler"
        disabled
      >
        기본형
      </ButtonCmp>
    </div>
    <!-- <TitleH3 titleh3="아이콘 & 버튼" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>아이콘이 포함된 버튼일 경우 icondrection="" 아이콘의 위치를 지정한다. 예: top, left</li>
          <li>iconname=""  아이콘명을 정의한다. 없을 경우 생략 한다. </li>
        </ul>
      </div>
    </div>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue-line"
        icondrection="left"
        iconname="icon-add"
        @click="clickHandler"
      >
        버튼 유형
      </ButtonCmp>
    </div> -->
  </div>
</template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    TitleH3,
    ButtonCmp
  },
  methods: {
    clickHandler () {
      console.log('버튼 클릭')
      alert('alert이 확실하지')
    }
  }
}
</script>

<style lang="scss">
.tmep__wrap {
    width: 100%;
    height: 100%;
  .table__wrap {
    margin: 20px 0;
  }
}
</style>
