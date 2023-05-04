<template>
  <div class="bar-grap-list">
    <div
      class="bar-grap-statu"
      :style="{ width: compPercent + '%' }"
    >
      <span>{{ title }} : 총 페이지: {{ listTotal }} / 완료: {{ comptNum }} / 진척률: {{ compPercent }} %</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    list: {
      type: Array
    }
  },
  data() {
    return {
      listTotal: 0,
      comptNum: 0,
      compPercent: 0
    }
  },
  mounted () {
    this.listTotal = this.list.length
    this.countComptRow()
    this.countComptPercent()
  },
  methods: {
    countComptRow() {
      let comptArray = []
      this.list.forEach(i => {
        if (i.status === '완료') {
          comptArray.push(i)
        }
      })
      this.comptNum = comptArray.length
    },
    countComptPercent () {
      this.compPercent = Math.round(this.comptNum / this.listTotal * 100)
    }
  }
}
</script>

<style lang="scss">
.bar-grap-list {
  position: relative;
  width: 100%;
  height: 20px;
  border-radius: 6px;
  background-color:#666;
  .bar-grap-statu {
    width: 100%;
    height: 20px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 6px;
    background-color: rgb(255, 51, 153);
    text-align: right;
    color: #fff;
    font-size: 12px;
    font-weight: 300;
    span {
      margin:0 10px;
      overflow: hidden;
      display: block;
    }
  }
}
.bar-grap-list+.bar-grap-list {
  margin-top:10px;
}
</style>
