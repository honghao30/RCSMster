<template>
  <div>
    <ButtonCmp
      type="btnStyleA"
      @click="toggleStyleLy"
    >
      <span class="irtext">폰트</span>
    </ButtonCmp>
    <div class="font-style-layer" v-if="showStyle">
      <span class="radiobox">
        <input type="radio" name="ftalign" id="alignL" value="L" v-model="style.row"/>
        <label for="alignL">
          <span class="irtext">좌측정렬</span>
        </label>
      </span>
      <span class="radiobox">
        <input type="radio" name="ftalign" id="alignR" value="Y" v-model="style.row"/>
        <label for="alignR">
          <span class="irtext">우측정렬</span>
        </label>
      </span>
      <span class="radiobox">
        <input type="radio" name="ftbold" id="fontD" value="D" v-model="style.rowfont"/>
        <label for="fontD">
          <span class="irtext">기본</span>
        </label>
      </span>
      <span class="radiobox">
        <input type="radio" name="ftbold" id="fontB" value="B" v-model="style.rowfont"/>
        <label for="fontB">
          <span class="irtext">볼드</span>
        </label>
      </span>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    ButtonCmp
  },
  data() {
    return {
      style: {
        align: '',
        font: ''
      },
      showStyle: false
    }
  },
  methods: {
    toggleStyleLy () {
      this.showStyle = !this.showStyle
    }
  }
}
</script>

<style>

</style>
