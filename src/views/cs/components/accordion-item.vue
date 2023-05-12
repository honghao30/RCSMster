<template>
  <li class="accordion__item">
    <a href="javascript:void(0);"
      class="accordion__title"
      :class="{'isOpen': visible}"
      @click="open"
    >
      <slot name="accordion-title"></slot>
    </a>

    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
      >
      <div class="accordion__content"
        v-show="visible">
        <slot name="accordion-content"></slot>

      </div>
    </transition>
  </li>
</template>

<script>
export default {
  props: {},
  inject: ['Accordion'],
  data() {
    return {
      index: null
    }
  },
  computed: {
    visible() {
      return this.index === this.Accordion.active
    }
  },
  methods: {
    open() {
      if (this.visible) {
        this.Accordion.active = null
      } else {
        this.Accordion.active = this.index
      }
    },
    start(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    end(el) {
      el.style.height = ''
    }
  },
  created() {
    this.index = this.Accordion.count++
  }
}
</script>

<style>
</style>
