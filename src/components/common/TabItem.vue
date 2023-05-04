<template>
  <div class="tab-panel"
    role="tabpanel"
    v-show="isActive"
  >
    <slot></slot>  
  </div>
</template>

<script>
export default {
    props: {
      title: String
    },
    computed: {
      tabTitle() {
          return this.title;
      },
    },
    data() {
      return{
        isActive: false,
      }
    },
    methods: {
      
    }
}
</script>
