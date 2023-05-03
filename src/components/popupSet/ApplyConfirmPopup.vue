<template>
  <div tabindex="0" class="layer active">
    <div tabindex="0" class="layer_cont">
      <div class="layer_body">
        <div class="layer_scroll">
          <div class="search_result">
            <div class="box_result_info center" v-html="this.msg"></div>
          </div>
        </div>
      </div>
      <div class="layer_foot">
        <div class="btn_wrap mar_t30">
          <a href="javascript:void(0);" class="btn sml bd_black type2" @click="close">
            <span>닫기</span>
          </a>
          <a href="javascript:void(0);" class="btn sml blue" @click="save">
            <span>{{ saveBtnNm }}</span>
          </a>
          <a href="javascript:void(0);" class="btn sml black" @click="apply">
            <span>승인요청</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      require: true
    },
    saveBtnNm: {
      type: String,
      default: '저장'
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    save() {
      this.$emit('save')
      this.$emit('update:visible', false)
    },
    apply() {
      this.$emit('apply')
      this.$emit('update:visible', false)
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
