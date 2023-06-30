<template>
  <div>
    <div v-for="(item, i) in data" :key="i" class="brand-dash__state">
      <div class="brand-dash-tit">
        <p>{{ item.title }} </p>
        <span v-if="item.state"> ({{ item.state }})</span>
      </div>
      <ul>
        <li v-for="subItem in item.list" :key="subItem">
          <p v-if="subItem.number === ''">-</p>
          <p v-else>{{ subItem.number }}</p>
          <span>{{ subItem.title }}</span>
        </li>
      </ul>
      <div class="gray-box-noti">
        <!-- <p class="no-data" v-if="subItem.notifications === ''">등록된 알림이 없습니다.</p> -->
        <p class="noti"><strong>시스템 스튜디오</strong> 대화방 등록이 <span>반려</span>되었습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data () {
    return {}
  }
}
</script>

<style>

</style>
