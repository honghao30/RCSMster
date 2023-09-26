<template>
  <div class="guide-lnb">
    <nav>
      <ul>
        <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
        <li class="menu-item"
          :class="{ 'active' : activeIndex === i}"
          v-for="(item, i) in rightMenuData" :key="i"
        >
          <router-link class="children" :class="{ 'open' : item.isOpen }" :to="item.to" v-if="item.children">
            <span @click="handleInnerOpen(item)">{{ item.label }}</span>
          </router-link>
          <router-link
            :to="item.to"
            v-if="!item.children"
            class="link nochildren"
          ><span :class="{ 'open' : item.isOpen }" @click="handleOpen(i)">{{ item.label }}</span>
          </router-link>
          <div class="children-box" v-if="item.isSubMenu">
            <Transition name="slide">
              <ul class="sub-menu"> <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
                <li v-for="(sub, j) in item.children" :key="j">
                  <router-link :to="sub.to" @click="handleSubOpen(j)">{{ sub.label }}</router-link>
                </li>
              </ul>
            </Transition>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  props: {
    rightMenuData: Array
  },
  data() {
    return {
      activeIndex: -1,
      activeSubIndex: -1
    }
  },
  methods: {
    handleInnerOpen(item) {
      this.rightMenuData.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.isOpen = false
          otherItem.isSubMenu = false
        }
      })
      item.isOpen = !item.isOpen
      item.isSubMenu = !item.isSubMenu
    },
    handleOpen(index) {
      this.rightMenuData.forEach((item, i) => {
        if (i !== index) {
          item.isOpen = false
          item.isSubMenu = false
        }
      })
    },
    handleSubOpen(subIndex) {
      this.activeSubIndex = subIndex
    }
  }
}
</script>

<style>

</style>
