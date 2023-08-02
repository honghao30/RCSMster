<template>
  <div class="tem_title">
    <div class="item-box__warp">
      <div class="item-box-none">
        <div class="logoList logoList_none">
          <span class="radiobox">
            <input type="radio" :name="`TitleLogo_${componentName}`" :id="`TitleLogoNone_${componentName}`"
              v-model="selectedOption" @change="emitChange"
              value=""/>
            <label  :for="`TitleLogoNone_${componentName}`">
              <span class="radiobox__img"></span>
              <span class="radiobox__text">없음</span>
            </label>
          </span>
        </div>
      </div>
      <!-- 신규 아이콘(동적 아이콘) -->
      <div class="logoList">
        <span class="radiobox"
          v-for="(icon, i) in titleIconNewData" :key="i"
        >
          <input type="radio" :name="`TitleLogo_${componentName}`" :id="`${icon.title}TitleLogoNew_${componentName}`"
          v-model="selectedOption" @change="emitChange"
          :value="[`${icon.title}`, `${icon.titleIcon}`, `${icon.cardType}`, `${icon.tplBizSrv}`]"/>
          <label :for="`${icon.title}TitleLogoNew_${componentName}`">
            <span :style="{ backgroundImage: `url(${icon.titleIcon})`}" class="radiobox__img"></span>
            <span class="radiobox__text">{{ icon.title }}</span>
          </label>
        </span>
      </div>
      <!-- 기존 아이콘(정적 아이콘) -->
      <div class="logoList">
        <span class="radiobox"
          v-for="(icon, i) in titleIconBasicData" :key="i"
        >
          <input type="radio" :name="`TitleLogo_${componentName}`" :id="`${icon.title}TitleLogoBasic_${componentName}`"
          v-model="selectedOption" @change="emitChange"
          :value="[`${icon.title}`, `${icon.titleIcon}`, `${icon.cardType}`, `${icon.tplBizSrv}`]"/>
          <label :for="`${icon.title}TitleLogoBasic_${componentName}`">
            <span :style="{ backgroundImage: `url(${icon.titleIcon})`}" class="radiobox__img"></span>
            <span class="radiobox__text">{{ icon.title }}</span>
          </label>
        </span>
      </div>
    </div>
    <!-- 유형 미 선택 시 경고 메시지 노출 -->
    <!-- <p class="guide-text error">유형을 선택해주세요.</p> -->
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    titleIconNewData: {
      type: Array,
      default: () => {
        return {
          title: '',
          titleIcon: ''
        }
      }
    },
    titleIconBasicData: {
      type: Array,
      default: () => {
        return {
          title: '',
          titleIcon: ''
        }
      }
    },
    componentName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      selectedOption: ''
    }
  },
  methods: {
    emitChange () {
      this.$emit('optionSelected', this.selectedOption)
    }
  }
}
</script>

<style lang="scss">

</style>
