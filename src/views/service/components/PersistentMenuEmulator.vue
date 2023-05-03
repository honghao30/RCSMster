<template>
  <div class="rbc_emulator_wrap">
    <div class="rbc_inner_emul">
        <strong class="blind">미리보기</strong>
        <div class="rbc_emulator_area">
          <div class="rbc_emulator_cont">
            <div class="rbc_emulator_view">
              <div class="desc_area">
                <div class="btn_wrap">
                  <div class="menu_area" v-show="!showSubMenu">
                    <!-- <a href="###">신메뉴보기 {{menu[0].title}}</a>
                    <a href="###" class="icon_arrow">여름이벤트</a>
                    <a href="###">홈으로 가기 </a>
                    <a href="###">지난 이벤트</a>
                    <span class="menu">대화방 메뉴5 메뉴명 입력</span> -->
                    <a v-for="(list, index) in menu" :key="(index+1)" @click="goSubDepth(index)" v-bind:class="{menu: list.title === '', icon_arrow: list.type === 'sub_menu'}">
                      {{list.title | defaultVal('대화방 메뉴'+(index+1)+'메뉴명 입력')}}
                    </a>
                  </div>
                  <div class="menu_area" v-show="showSubMenu">
                    <a class="icon_title" @click="backOneDepth">{{menu[menuTab - 1].title}}</a>
                    <a v-for="(list, index) in menu[menuTab-1].subMenu" :key="(index+1)" v-bind:class="{menu: list.title === ''}">
                      {{list.title | defaultVal('메뉴'+ menuTab + '-' + (index+1) + '메뉴명 입력')}}
                    </a>
                  </div>
                  <div v-if="inputFieldYn === 'Y'" class="util_area"></div>
                  <div v-if="inputFieldYn === 'N'" class="util_area disabled">입력할 수 없는 대화방 입니다.</div>
                  <div class="navi_area">
                    <span class="icon1"></span>
                    <span class="icon2"></span>
                    <span class="icon3"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'AutoReplyEmulator',
  props: {
    menu: {
      type: Array
    },
    menuTab: {
      type: Number
    },
    inputFieldYn: {
      type: String
    }
  },
  data() {
    return {
      showSubMenu: false
    }
  },
  created() {},
  computed: {},
  watch: {
    menuTab() {
      if (this.menu[this.menuTab - 1].type !== 'sub_menu') {
        this.showSubMenu = false
      }
    }
  },
  filters: {
    defaultVal: function(value, defaultVal) {
      let text = value
      if (jglib.isEmpty(defaultVal)) defaultVal = ''
      if (jglib.isEmpty(text)) text = defaultVal
      return text
    }
  },
  methods: {
    // 미리보기에서 하위메뉴 있는 경우 하위메뉴 표시하기, 미리보기에서 클릭한 대화방메뉴탭 선택되게
    goSubDepth(index) {
      if (this.menu[index].type === 'sub_menu') {
        this.$emit('psEmulnowTab', index)
        this.showSubMenu = true
      }
    },
    // 상위메뉴로 돌아가기
    backOneDepth() {
      this.showSubMenu = false
    }
  }
}
</script>
