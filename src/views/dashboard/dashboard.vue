<template>
  <div class="dashboard__wrap">
    <div class="dashboard__wrap--inner">
        <DashBaordLnb />
        <DashBoardMiddle />
        <DashBoardSide />
    </div>
  </div>
</template>

<script>
import DashBaordLnb from '@/views/dashboard/components/lnb'
import DashBoardMiddle from '@/views/dashboard/components/middleCont'
import DashBoardSide from '@/views/dashboard/components/sideCont'
export default {
  components: {
    DashBaordLnb,
    DashBoardMiddle,
    DashBoardSide
  }
}
</script>

<style>
</style>
