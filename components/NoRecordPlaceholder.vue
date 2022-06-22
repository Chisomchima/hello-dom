<template>
  <div class="text-center py-5 my-4">
    <img src="../assets/img/empty-list.svg" class="img-fluid" />
    <div class="fs-14 text-light mt-2 text-capitalize">{{ text }}</div>
    <div class="mt-4">
      <slot></slot>
      <!-- <button class="btn btn-primary py-2 px-3">Add a chapter</button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'No record to show'
    }
  }
}
</script>

<style lang="scss" scoped></style>
