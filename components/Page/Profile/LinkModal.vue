<template>
  <b-modal
    id="b-modal-wrapper"
    class="modal custom-modal rounded-0 width"
    hide-footer
    size="profile"
    hide-header
    centered
  >
    <div class="d-block m-2">
      <div class="d-flex flex-column justify-content-center align-item-center">
        <div class="row">
          <div class="col text-center">
            <slot name="title">
              <h6 class="font-weight-bold">Link student record to school.</h6>
            </slot>
          </div>
        </div>

        <div class="">
          <div class="row justify-content-center">
            <div class="col-md-9 mb-4">
              <div class="d-flex justify-content-center">
                <slot name="input1"></slot>
              </div>
            </div>

            <!--    <div class="col-md-2 my-2 d-flex align-items-center justify-content-center">
              <div class="">
                <b-icon icon="dash"></b-icon>
              </div>
            </div>

            <div class="col-md-5 my-2">
              <slot name="input2"></slot>
            </div> -->
          </div>
        </div>

        <div class="row">
          <div class="col-6 w-100 text-center">
            <b-button variant="light" block @click="$bvModal.hide('b-modal-wrapper')"
              >Cancel</b-button
            >
          </div>
          <div class="col-6 w-100 text-center">
            <b-button variant="primary" block @click="$emit('button:click')"
              >Link to school</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  methods: {
    refresh() {
      this.$nuxt.refresh();
    },
  },
};
</script>

<style lang="css" scoped>
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 350px !important;
  }

  b-modal.width {
    max-width: 350px !important;
  }
}

b-modal.width {
  max-width: 350px !important;
}
</style>
