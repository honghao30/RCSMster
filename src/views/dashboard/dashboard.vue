<template>
  <div class="dashboard__wrap">
    <div class="dashboard__wrap--inner">
        <!-- <DashBaordLnb /> -->
        <DashBoardMain />
        <DashBoardSide />
    </div>
  </div>
</template>

<script>
// import DashBaordLnb from '@/views/dashboard/components/lnb'
import DashBoardMain from '@/views/dashboard/components/dashBoardMain'
import DashBoardSide from '@/views/dashboard/components/sideCont'
export default {
  components: {
    // DashBaordLnb,
    DashBoardMain,
    DashBoardSide
  }
}
</script>

<style>
</style>
