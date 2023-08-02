<template>
    <div class="template-cmp-table">
      <template>
        <div class="table-cmp-title" v-if="titAndDescInfo.useTitle == 'Y'">
          <span v-if="titAndDescInfo.title">{{ titAndDescInfo.title }}</span>
          <span v-else>제목을 입력해주세요.</span>
        </div>
        <template>
          <ul class="description">
            <li v-for="(item, index) in bodyInfo.list" :key="index" :class="{ 'border' : item.line }">
              <div class="item-label"
              :style="setStyle(item.subTitle)">
                  <!-- <span v-if="item.subTitle">{{ item.subTitle }}</span> -->
                  <span v-if="item.subTitle.text"
                    v-html="item.subTitle.text"
                  ></span>
                  <span v-else>내용 입력</span>
              </div>
              <div class="item-data" v-if="item.colNum == 2"
              :style="setStyle(item.subDesc)">
                  <span v-if="item.subDesc.text" v-html="item.subDesc.text"></span>
                  <span v-else>내용 입력</span>
              </div>
            </li>
          </ul>
        </template>
      </template>
    </div>
</template>

<script>
export default {
  props: {
    compoInputObj: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      titAndDescInfo : this.compoInputObj[0],
      bodyInfo: this.compoInputObj[1]
      }
  },
  computed: {

  },
  methods: {
    setStyle(target) {
      let bold = '400'
      if (target.textBold) {
        bold = '700'
      }
      let style = {
        fontWeight: bold,
        textAlign: target.textAlign,
        fontSize: `${target.textSize}px`,
        color: target.textColor
      }
      return style
    }
  }
}
</script>
