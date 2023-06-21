<template>
  <div class="brand-lnb">
    <div class="brand-info">
      <div class="brand-info__inner">
        <span class="logo">
          <img src="@/assets/images/dummy/brand_logo.png" alt="">
        </span>
        <Dropdown :options="brandList" />
        <ul class="auth">
          <li>마스터 : 홍길동</li>
          <li>RCS메시지 전송 가능</li>
        </ul>
      </div>
    </div>
    <nav>
      <ul>
        <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
        <li class="menu-item"
          :class="{ 'active' :  activeIndex === i}"
          v-for="(item, i) in brandLnbList" :key="i"
        >
          <a role="button" v-if="item.children" @click="handleOpen(i)">{{ item.label }}</a>
          <router-link :to="item.to" v-if="!item.children">{{ item.label }}</router-link>
          <Transition name="slide">
            <ul class="sub-menu" v-if="activeIndex === i"> <!-- 현재 페이지는 클래스 current 추가 해주세요. -->
              <li v-for="(sub, j) in item.children" :key="j">
                <router-link :to="sub.to">{{ sub.label }}</router-link>
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Dropdown from '@/components/common/Dropdown.vue'
import brandLnbList from '@/views/brand/components/lnb.js'

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      brandLnbList,
      brandList: [
        {
          label: '네스프레소',
          value: 'brand1'
        }
      ],
      activeIndex: ''
    }
  },
  methods: {
    handleOpen (index) {
      if (this.activeIndex === index) {
        this.activeIndex = ''
      } else {
        this.activeIndex = index
      }
    }
  }
}
</script>

<style>

</style>
