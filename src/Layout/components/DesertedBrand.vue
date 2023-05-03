<template>
  <div class="rcs_container" v-if="show">
    <article id="content" class="content"></article>
    <div tabindex="0" class="layer active">
      <div tabindex="0" class="layer_cont">
        <div class="layer_body">
          <div class="layer_scroll">
            <div class="search_result">
              <div class="box_result_info center">
                  <p>{{str}}</p>
                  <br>
                  브랜드에 대행사를 등록하셔야만 메시지 발송이 가능합니다.
                  <br>
                  대행사를 등록하시겠습니까?
              </div>
            </div>
          </div>
        </div>
        <div class="layer_foot">
          <div class="btn_wrap mar_t30">
            <a href="javascript:void(0);" class="btn sml bd_black type2" @click="close"><span>닫기</span></a>
            <a href="javascript:void(0);" class="btn sml black" @click="go"><span>등록하기</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { chechHasDesertedBrand } from '@/api/service/manage'

export default {
  name: 'desertedBrand',
  components: {},
  data() {
    return {
      str: '',
      brandId: '',
      show: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      chechHasDesertedBrand()
        .then(res => {
          if (res.result.length > 0) {
            this.brandId = res.result[0].brandId
            for (const props of res.result) {
              this.str += (this.str !== '' ? `, ${props.name}` : props.name)
            }
            this.show = true
          }
        }).catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    go() {
      this.$router.push(`/service/brand/${this.brandId}/mng`)
      this.close()
    },
    close() {
      this.$store.dispatch('SetCheckDesertedBrand')
      this.show = false
    }
  }
}
</script>
<style>
</style>
