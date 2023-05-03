<template>
  <!-- td에 "field_area" 클래스 표기 필요 ex)<td colspan="3" class="field_area"> -->
  <ul class="phone_list">
    <li v-for="(addAllowIp, index) in addAllowIpList" :key="addAllowIp.namekey">
      <template v-if="addAllowIp.regNo != null">
        <!-- 기등록 항목 표시 -->
        <span class="text_value">{{addAllowIp.allowIp}}</span>
        <span class="text_value">{{addAllowIp.name}}</span>
        <a href="javascript:void(0);" class="btn sml bd_black" v-if="edit" @click="removeAllowIp(index)"><span>삭제</span></a>
      </template>
      <template v-else-if="edit && addAllowIp.regNo == null">
        <!--  + 버튼을 통해 추가 입력란 표시 -->
        <div class="api_clientip">
          <span class="custom_input">
            <input type="text" placeholder="단일 IP 주소 입력" maxlength="15" :ref="addAllowIp.allowIpkey" v-model.trim="addAllowIp.allowIp" autocomplete="new-password">
          </span>
          <span class="custom_input mar_l12">
            <input type="text" placeholder="항목명" maxlength="10" :ref="addAllowIp.namekey" v-model.trim="addAllowIp.name" autocomplete="new-password">
          </span>
        </div>
        <a href="javascript:void(0);" class="btn_squre minus" @click="removeAllowIp(index)"></a>
      </template>
    </li>
    <li v-if="edit && addAllowIpList.length < 10">
      <a href="javascript:void(0);" class="btn_squre plus" @click="addAllowIp()"></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AllowIp',
  props: {
    // 수정 가능 플래그, 단순 조회 시 false
    edit: {
      type: Boolean,
      default: true
    },
    // 임의의 리스트 표기, retrieve가 false인 경우 해당.
    list: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      addAllowIpList: [],
      // 0~255허용: (25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)
      // *까지 허용 시: (25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|(\*(?!.*\d)))
      // withoutAsterisk: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      withoutAsterisk: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      this.addAllowIpList = []
      this.setAllowIp()
    },
    setAllowIp() {
      if (this.list) {
        for (const ip of this.list) {
          // 기등록 아이피
          this.addAllowIpList.push({
            regNo: ip.regNo ? ip.regNo : null,
            allowIp: ip.allowIp,
            name: ip.name
          })
        }
      }
      if (this.addAllowIpList.length === 0) {
        this.addAllowIp()
      }
    },
    addAllowIp() {
      // 아이피 추가
      if (this.addAllowIpList.length < 10) {
        this.addAllowIpList.push({
          namekey: this.getRamdomKey(),
          allowIpkey: this.getRamdomKey(),
          regNo: null,
          name: null,
          allowIp: null
        })
      }
    },
    removeAllowIp(key) {
      // 아이피 삭제
      this.addAllowIpList.splice(key, 1)
      if (this.addAllowIpList.length === 0) {
        this.addAllowIp()
      }
    },
    getRamdomKey() {
      return parseInt((Math.random() * 1000000000).toString())
    },
    getAllowIp() {
      if (this.addAllowIpList.length === 1 && !this.addAllowIpList[0].allowIp) {
        // 1줄은 기본적으로 보여지기때문에 공란인 경우 패스한다.
        return []
      }

      for (const ip of this.addAllowIpList) {
        if (ip.regNo == null) {
          // 신규 항목은 유효성 체크
          /* if(!ip.name) {
            this.$refs[ip.namekey][0].focus()
            throw 'IP(API Client IP) 이름을 입력 해 주세요.'
          } */
          if (!ip.allowIp || !ip.allowIp.match(this.withoutAsterisk)) {
            if (ip.allowIpkey) {
              this.$refs[ip.allowIpkey][0].focus()
            }
            throw new Error('IP 주소는 IPv4 형식으로 입력해 주세요.')
          }
        }
      }
      // 중복 체크
      for (let i = 0; i < this.addAllowIpList.length; i++) {
        for (let j = 0; j < this.addAllowIpList.length; j++) {
          if (i === j) {
            continue
          }
          const ip = this.addAllowIpList[i]
          const _ip = this.addAllowIpList[j]
          if (ip.allowIp === _ip.allowIp) {
            if (_ip.allowIpkey) {
              this.$refs[_ip.allowIpkey][0].focus()
            }
            throw new Error('중복된 IP 주소가 있습니다.')
          }
        }
      }
      return this.addAllowIpList
    }
  }
}
</script>
