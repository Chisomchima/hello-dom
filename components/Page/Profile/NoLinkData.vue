<template>
  <div class="my-3">
    <div class="row">
      <div class="col my-5">
        <h4 class="text-capitalize">{{ entity }} Record</h4>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col text-center my-1">
        <div class="d-flex align-items-center justify-content-center">
          <img src="~/assets/img/empty-box.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col text-center">
        <p>You have no records as a {{ entity }} yet.</p>
        <slot></slot>
        <!-- <BaseButton @click="showLinkModal()">+ Link School</BaseButton> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entity: {
      type: String,
      required: true,
    },
  },
};
</script>
