<template>
  <div class="row-style-layer">
    <span class="radiobox">
      <input type="radio" name="Rowalign" id="RowalignL" value="RowL" v-model="style.align"/>
      <label for="RowalignL">
        <span class="irtext">좌측정렬</span>
      </label>
    </span>
    <span class="radiobox">
      <input type="radio" name="Rowalign" id="RowalignR" value="RowR" v-model="style.align"/>
      <label for="RowalignR">
        <span class="irtext">우측정렬</span>
      </label>
    </span>
    <span class="radiobox">
      <input type="radio" name="ftBold" id="ftBold" value="ftBold" v-model="style.font"/>
      <label for="ftBold">
        <span class="irtext">볼드</span>
      </label>
    </span>
    <span class="radiobox">
      <input type="radio" name="ftSize1" id="ftsize1" value="ftsize1" v-model="style.font"/>
      <label for="ftsize1">
        <span class="irtext">사이즈1</span>
      </label>
    </span>
    <span class="radiobox">
      <input type="radio" name="ftSize2" id="ftsize2" value="ftsize2" v-model="style.font"/>
      <label for="ftsize2">
        <span class="irtext">사이즈2</span>
      </label>
    </span>
    <span class="radiobox">
      <input type="radio" name="ftSize3" id="ftsize3" value="ftsize3" v-model="style.font"/>
      <label for="ftsize3">
        <span class="irtext">사이즈3</span>
      </label>
    </span>
    <span class="radiobox">
      <input type="radio" name="ftUnder" id="underline" value="underline" v-model="style.underline"/>
      <label for="underline">
        <span class="irtext">언더라인</span>
      </label>
    </span>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      style: {
        row: '',
        rowfont: ''
      },
      showStyle: false
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
