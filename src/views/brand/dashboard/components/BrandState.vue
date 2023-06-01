<template>
  <div>
    <div v-for="(item, i) in data" :key="i" class="brand-dash__state">
      <div class="brand-dash-tit">
        <p>{{ item.title }} </p>
        <span> ({{ item.number }})</span>
        <a role="button" :class="ico-up"></a>
      </div>
      <ul>
        <li v-for="subItem in item.list" :key="subItem">
          <p>{{ subItem.number }}</p>
          <span>{{ subItem.title }}</span>
        </li>
      </ul>
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
