<template>
  <div class="rcs_container service_wrap" v-if="list.length > 0">
    <div tabindex="0" class="layer layer_mid active">
      <div tabindex="0" class="layer_cont">
        <div class="title_wrap mar_b20">
          <span class="tittxt">{{ getTitle() }} 이미지</span>
          <span class="titinfo">브랜드에 적합한 {{ getTitle() }} 이미지를 선택하세요</span>
        </div>
        <div class="layer_body">
          <div class="img_selectbox">
            <table class="tbl_col_type">
              <colgroup>
                <col style="width:25%;">
                <col style="width:25%;">
                <col style="width:25%;">
                <col style="width:25%;">
              </colgroup>
              <tbody>
                <tr v-for="row in Math.ceil(list.length / 4)" :key="row">
                  <td v-for="(item, index) in sliceList(row)" :key="index">
                    <p class="img_box"><label :for="item.id"><img alt="" :src="item.src"></label></p>
                    <span class="custom_radio single">
                      <input type="radio" :id="item.id" v-model="assigned.id" :value="item.id" name="defaultImage" @change="setItem(item)">
                      <label :for="item.id" class="boxtit">{{ item.name }}</label>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ck_box" v-if="assigned.type === 'background'">
            <span class="custom_checkbox">
              <input type="checkbox" id="_setBoth" v-model="setBoth">
              <label for="_setBoth">프로필 이미지에도 동일한 이미지를 등록합니다.</label>
            </span>
          </div>
        </div>
        <div class="btn_wrap center full_width">
          <a href="javascript:void(0);" class="btn sml bd_blue" @click="closePopup"><span>취소</span></a>
          <a href="javascript:void(0);" class="btn sml blue" @click="confirm"><span>확인</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBrandDefaultImages } from '@/api/common/code'
export default {
  name: 'DefaultImages',
  props: ['assigned'], // { data: { id: xx, src: yy }}
  data() {
    return {
      image: null,
      setBoth: false,
      list: []
    }
  },
  mounted() {
    this.getDefaultImages()
  },
  methods: {
    getDefaultImages() {
      getBrandDefaultImages().then(res => {
        this.list = JSON.parse(res.result)
      })
    },
    getTitle() {
      return this.assigned.type === 'background' ? '백그라운드' : '프로필'
    },
    sliceList(page) {
      const from = (page - 1) * 4
      let to = from + 4
      if (to > this.list.length) {
        to = this.list.length
      }
      return this.list.slice(from, to)
    },
    setItem(item) {
      // 선택된 이미지의 정보를 할당
      this.data = {
        type: this.assigned.type,
        id: item.id,
        name: item.name,
        src: item.src
      }
    },
    confirm() {
      if (!this.data) {
        if (this.assigned.id) {
          // 선택된 이미지가 이미 있는 상태에서 확인을 누른 경우 그대로 사용한다.
          this.setItem(this.list.filter(s => s.id === this.assigned.id)[0])
        } else {
          this.$alertMsg('이미지를 선택 해 주세요.')
          return
        }
      }
      if (this.setBoth) {
        this.data.setBoth = true
      }
      this.$emit('setDefaultData', this.data)
    },
    closePopup() {
      this.$emit('setDefaultData', null)
    }
  }
}
</script>

<style scoped>

</style>
