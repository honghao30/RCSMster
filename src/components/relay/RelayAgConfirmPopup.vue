<template>
      <div tabindex="0" class="layer_cont">
        <div class="layer_head">
          <p class="mar_t10">등록된 양방향 대화방 중계사 입니다.</p>
        </div>
        <div class="layer_body">
          <div class="layer_scroll">
            <div class="search_result">
              <!-- 검색 결과-->
              <table class="tbl_col_type">
                <colgroup>
                  <col style="width:50%">
                  <col style="width:auto">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">양방향 대화방 중계사</th>
                    <th scope="col">대표 중계사</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in selectRelayList" :key="index">
                    <td>{{ row.relayAgName }}</td>
                    <td>
                      <span class="icon_circle1" v-if="row.repYn === 'Y'">●</span>
                      <span v-else>-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="layer_foot">
          <div class="btn_wrap mar_t30">
            <a href="javascript:void(0);" class="btn sml black" @click="closePopup">
              <span>확인</span>
            </a>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'RelayAgConfirmPopup',
  props: {
    relayAgConfirm: {
      type: Boolean,
      default: false
    },
    relayAgInfo: []
  },
  data() {
    return {
      selectRelayList: []
    }
  },
  created() {
    this.relayAgInfo.forEach(data => {
      this.selectRelayList.push(data)
    })
  },
  computed: {
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    }
  }
}
</script>
