<template>
  <div>
    <HeaterGuide />
    <div class="ui-guide__wrap">
      <div class="ui-guide__subnav--top">
        <ButtonCmp
          type="blue"
          @click="goto('sect01')"
        >
          BEM 예시
        </ButtonCmp>
        <ButtonCmp
          type="blue"
          @click="goto('sect02')"
        >
          TypoGraphy
        </ButtonCmp>
        <ButtonCmp
          type="blue"
          @click="goto('sect03')"
        >
          Table
        </ButtonCmp>
        <ButtonCmp
          type="blue"
          @click="goto('sect04')"
        >
          버튼 & 아이콘
        </ButtonCmp>
        <ButtonCmp
          type="blue"
          @click="goto('sect05')"
        >
          Form
        </ButtonCmp>
        <ButtonCmp
          type="blue"
          @click="goto('sect06')"
        >
          Tab
        </ButtonCmp>
        <ButtonCmp
          type="blue"
          @click="goto('sect07')"
        >
          modal
        </ButtonCmp>
      </div>
      <SubTitle pagetitle="UI 템플릿" />
      <div ref="sect01">
        <TitleH3 titleh3="BEM 예시" />
        <BemGuide />
      </div>
      <div ref="sect02">
        <TitleH3 ref="sect02" titleh3="TypoGraphy" />
        <TypoGraphy />
      </div>
      <div ref="sect03">
        <TitleH3 ref="sect03" titleh3="Table" />
        <TableGuide />
      </div>
      <div ref="sect04">
        <TitleH3 ref="sect04" titleh3="버튼 & 아이콘" />
        <ButtonGuide />
      </div>
      <div ref="sect05">
        <TitleH3 ref="sect05" titleh3="Form" />
        <FormGuide />
      </div>
      <div ref="sect06">
        <TitleH3 titleh3="Tab" />
        <TabGuide />
      </div>
      <div ref="sect07">
        <TitleH3 titleh3="Modal" />
        <ModalGuide />
      </div>
    </div>
  </div>
</template>

<script>
import SubTitle from '@/views/guide/cmp/SubTitle.vue'
import TitleH3 from '@/views/guide/cmp/TitleH3.vue'
import BemGuide from '@/views/guide/ui_temp/BemGuide.vue'
import TypoGraphy from '@/views/guide/ui_temp/TypoGuide.vue'
import ModalGuide from '@/views/guide/ui_temp/ModalGuide.vue'
import TableGuide from '@/views/guide/ui_temp/tableCmp.vue'
import ButtonGuide from '@/views/guide/ui_temp/ButtonGuide.vue'
import FormGuide from '@/views/guide/ui_temp/FormGuide.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import TabGuide from '@/views/guide/ui_temp/TabGuide.vue'
import HeaterGuide from '../cmp/Header'

export default {
  name: 'BasicGuide',
  components: {
    SubTitle,
    TitleH3,
    BemGuide,
    TypoGraphy,
    TableGuide,
    ButtonGuide,
    FormGuide,
    ButtonCmp,
    ModalGuide,
    TabGuide,
    HeaterGuide
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName]
      console.log(element)
      var top = element.offsetTop
      window.scrollTo(0, top)
    }
  }
}
</script>

<style lang="scss">
@import url('@/assets/scss/common/guide.scss');
.ui-guide__wrap {
  padding:20px;
  .wsg-guide-header {
    margin:20px 0;
  }
}
.ui-guide__subnav--top {
  display: block;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  button {
    border: 0;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    padding: 10px 0;
  }

}
</style>
