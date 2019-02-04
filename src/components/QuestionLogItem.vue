<template>
  <div class="col-12">
    <div class="row ml-sm-4 pl-5 pt-2 pb-2 option-2" :class="questionClass">
      <label class="col-12 option-1">
        <slot></slot>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['questionClass']
  }
</script>

<style scoped>

</style>
