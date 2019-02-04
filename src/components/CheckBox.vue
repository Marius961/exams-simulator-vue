<template>
  <div class="col-12  mt-2 col-md-4 m-md-0">
    <div class="row custom-control custom-checkbox text-center justify-content-center">
      <input
        type="checkbox"
        :checked="value"
        @change="onCheck($event)"
        class="col-auto custom-control-input"
        :id="checkId"
      >
      <label class="col-auto custom-control-label p-0 pr-2" :for="checkId">
        <slot></slot></label>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value','checkId'],
    methods: {
      onCheck(e) {
        this.$emit('input', e.target.checked)
      }
    }
  }
</script>

<style scoped>

</style>
