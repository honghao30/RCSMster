<template>
  <div ref="pubgud" class="pubGuide">
    <HeaterGuide />
    <div
      class="ui-guide__wrap"
    >
      <div
        ref="cateMenu"
        class="ui-guide__subnav--top"
        :class="{ isFixed: isCateSticky }"
        >
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
        <ButtonCmp
          type="blue"
          @click="goto('sect08')"
        >
          아코디언
        </ButtonCmp>
        <ButtonCmp
          type="blue"
          @click="goto('sect09')"
        >
          로딩
        </ButtonCmp>
        <ButtonCmp
          type="blue"
          @click="goto('sect10')"
        >
          툴팁
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
      <div ref="sect08">
        <TitleH3 titleh3="아코디언" />
        <AccoDien />
      </div>
      <div ref="sect09">
        <TitleH3 titleh3="로딩" />
        <Loading
          size="50"
          v-if="isLoading"
        />
      </div>
      <div ref="sect10">
        <TitleH3 titleh3="툴팁" />
        <TooltipGuid />
      </div>
    </div>
    <button
      ref="topButton"
      class="scroll-to-top"
      :class="{ isFixed: isScrollTop }"
      @click="scrollToTop"
    >
       위로
    </button>
  </div>
</template>

<script>
import SubTitle from '@/views/guide/cmp/SubTitle.vue'
import TitleH3 from '@/views/guide/cmp/TitleH3.vue'
import BemGuide from '@/views/guide/ui_temp/BemGuide.vue'
import TypoGraphy from '@/views/guide/ui_temp/TypoGuide.vue'
import ModalGuide from '@/views/guide/ui_temp/ModalGuide.vue'
import AccoDien from '@/views/guide/ui_temp/AccoDien.vue'
import TableGuide from '@/views/guide/ui_temp/tableCmp.vue'
import ButtonGuide from '@/views/guide/ui_temp/ButtonGuide.vue'
import FormGuide from '@/views/guide/ui_temp/FormGuide.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import TabGuide from '@/views/guide/ui_temp/TabGuide.vue'
import HeaterGuide from '../cmp/Header'
import Loading from '@/components/common/loading.vue'
import TooltipGuid from '@/views/guide/ui_temp/TooltipGuid.vue'

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
    HeaterGuide,
    AccoDien,
    Loading,
    TooltipGuid
  },
  data() {
    return {
      scrollY: null,
      isCateSticky: false,
      isScrollTop: false,
      subCateOffsetTop: null,
      isLoading: true
    }
  },
  watch: {
    scrollY(newValue) {
      if (newValue > this.scrollPosition) {
        // user is scrolling down
        console.log('down')
      } else {
        // user is scrolling up
        console.log('up')
      }
      if (newValue >= 100) {
        this.isCateSticky = true
      } else {
        this.isCateSticky = false
      }
      if (newValue >= 500) {
        this.isScrollTop = true
      } else {
        this.isScrollTop = false
      }
      this.scrollPosition = window.scrollY
    }
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName]
      console.log(element)
      var top = element.offsetTop - 80
      console.log(top, (top - 50))
      window.scrollTo({
        left: 0,
        top: top,
        behavior: 'smooth'
      })
    },
    scrollToTop (refName) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    loaddingStop () {
      document.body.classList.add('is-loading')
      setTimeout(() => {
        document.body.classList.remove('is-loading')
        this.isLoading = false
      }, 7000)
    }
  },
  mounted () {
    const guiEl = this.$refs.pubgud
    console.log(guiEl)
    guiEl.parentElement.style.paddingTop = '0'
    guiEl.parentElement.previousElementSibling.style.display = 'none'
    guiEl.previousElementSibling.style.display = 'none'
    guiEl.parentElement.nextElementSibling.style.display = 'none'
    window.addEventListener('scroll', () => {
      this.scrollY = Math.round(window.scrollY)
    })
    const subCateOffsetTop = this.$refs.cateMenu.offsetTop
    console.log('콘텐츠 높이', this.$refs.cateMenu, subCateOffsetTop)
    this.loaddingStop()
  }
}
</script>

<style lang="scss">
@import url('../../../assets/scss/common/guide.scss');
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
  &.isFixed {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    padding-right:50px;
    background: rgba(0,0,0,0.7);
    color:#fff;
    opacity: 1;
    transition: all 0.3s;
    z-index: 50;
    button {
      color:#fff;
    }
  }
  button {
    border: 0;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    padding: 10px 0;
  }
}
.scroll-to-top {
  position: fixed;
  width: 50px;
  height: 50px;
  right: 50px;
  bottom: 60px;
  background: #2F77FB;
  border:0;
  border-radius: 50%;
  color:#fff;
  opacity: 0;
  cursor: pointer;
  &.isFixed {
    opacity: 1;
    transition: all 0.3s linear;
  }
}
</style>
