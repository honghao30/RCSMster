<template>
  <div class="guide-lnb">
    <nav>
      <ul>
        <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
        <li class="menu-item"
          :class="{ 'current active' :  $route.meta.lnbIndex === i}"
          v-for="(item, i) in menuData" :key="i"
        >
          <a role="button" :class="{'children': item.children}" v-if="item.children" @click="handleOpen(i)">{{ item.label }}</a>
          <router-link
            :to="item.to"
            v-if="!item.children"
            class="link"
            :class="{ 'current': $route.path === item.to }"
          >{{ item.label }}</router-link>
          <Transition name="slide">
            <ul class="sub-menu" v-if="activeIndex === i || allOpen === true"> <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
              <li v-for="(sub, j) in item.children" :key="j" :class="{ 'current': item.to.indexOf(activePage) > -1 && subActiveIndex === j  }">
                <a role="button" @click="goSubMenu($event, j)">{{ sub.label }}</a>
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </nav>
  </div>
</template>
<!-- <template>
  <div class="guide-lnb">
    <nav>
      <ul>
        <li class="menu-item"
          :class="{ 'current active' :  $route.meta.lnbIndex === i}"
          v-for="(item, i) in menuData" :key="i"
        >
          <router-link
            :to="item.to"
            class="link"
          >{{ item.label }}</router-link>
          <Transition name="slide">
            <ul class="sub-menu" v-if="$route.meta.lnbIndex === i">
              <li v-for="(sub, j) in item.children" :key="j"
                  :class="{ 'current' :  ($route.path + $route.hash) === sub.to}">
                <router-link :to='sub.to' >{{ sub.label }}</router-link>
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </nav>
  </div>
</template> -->

<script>
export default {
  components: {
  },
  props: {
    menuData: {
      type: Array,
      required: true
    },
    allOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activePage: '',
      activeIndex: '',
      subActiveIndex: '',
      guideId: ''
    }
  },
  mounted() {
    // console.log('현재 라우터', this.$router.currentRoute.meta.lnbIndex)
    let getUrl = window.location.href

    if (getUrl.indexOf('/UseGuide') > -1) {
      this.activePage = '/UseGuide'
      this.activeIndex = 0
    } else if (getUrl.indexOf('/CompanyMsg') > -1) {
      this.activePage = '/CompanyMsg'
      this.activeIndex = 1
    } else if (getUrl.indexOf('/RcsMessageType') > -1) {
      this.activePage = '/RcsMessageType'
      this.activeIndex = 2
    } else if (getUrl.indexOf('/KeyFeatures') > -1) {
      this.activePage = '/KeyFeatures'
      this.activeIndex = 3
    } else if (getUrl.indexOf('/GuideAccount') > -1) {
      this.activePage = '/GuideAccount'
      this.activeIndex = 4
    } else if (getUrl.indexOf('/GuideBrand') > -1) {
      this.activePage = '/GuideBrand'
      this.activeIndex = 5
    } else if (getUrl.indexOf('/Chatbot') > -1) {
      this.activePage = '/Chatbot'
      this.activeIndex = 6
    } else if (getUrl.indexOf('/ScreenGuide') > -1) {
      this.activePage = '/ScreenGuide'
      this.activeIndex = 7
    }

    for (let i = 0; i < 11; i++) {
      let sectionIndex = ''
      if (i < 8) {
        sectionIndex = '0' + (i + 1)
      } else {
        sectionIndex += (i + 1)
      }

      if (getUrl.indexOf('/ScreenGuide') > -1) {
        if (getUrl.indexOf('/ScreenGuide' + sectionIndex) > -1) {
          this.subActiveIndex = i
        }
      } else {
        if (getUrl.indexOf('#section' + sectionIndex) > -1) {
          this.subActiveIndex = i
        }
      }
    }
  },
  methods: {
    handleOpen (index) {
      if (this.allOpen === false) {
        if (this.activeIndex === index) {
          this.activeIndex = ''
        } else {
          this.activeIndex = index
        }
      }
    },
    goSubMenu(event, j) {
      if (this.allOpen === false) {
        const sub = this.menuData[this.activeIndex].children[j]
        this.$router.replace(sub.to)
        if (this.subActiveIndex === j) {
          this.subActiveIndex = ''
        } else {
          this.subActiveIndex = j
        }
      } else {
        const sub = this.menuData[j].children[j]
        console.log(j, sub.anchorIndex)
        this.$router.replace(sub.to)
      }
      const subLabel = event.target.innerText
      this.$emit('subItemClick', subLabel, j)
    }
  }
}
</script>

<style>

</style>
