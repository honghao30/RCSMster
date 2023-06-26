<template>
  <div class="brand-list__wrapper">
    <table>
      <colgroup>
        <slot name="col"></slot>
      </colgroup>
      <thead>
        <tr>
          <slot name="thead"></slot>
        </tr>
      </thead>
      <tbody>
        <slot name="tbody"></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
