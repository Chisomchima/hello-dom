<template>
  <b-modal
    :id="id"
    ref="modal"
    :title="title"
    centered
    :size="size"
    ok-only
    :no-stacking="stacking"
    :scrollable="!notScrollable"
    :hide-footer="noFooter"
    ok-title="Save"
    @ok="$emit('ok', $event)"
    @show="$emit('show', $event)"
    @hide="$emit('hide', $event)"
  >
    <slot></slot>
    <template #modal-footer="{ cancel }">
      <!-- Emulate built in modal footer ok and cancel button actions -->

      <div class="d-flex w-100 justify-content-between px-5">
        <div>
          <b-button
            size="sm"
            variant="light"
            class="px-5 text-secondary mr-2"
            @click="cancel()"
          >
            Cancel
          </b-button>
        </div>
        <div>
          <BaseButton
            class="px-5"
            :extra-class="buttonColor"
            @click="$emit('ok', $event)"
          >
            {{ submitTitle }}
          </BaseButton>
        </div>
      </div>
      <!-- Button with custom close trigger value -->
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    buttonColor: {
      type: String,
      default: 'info',
    },
    noFooter: {
      type: Boolean,
      default: false,
    },
    stacking: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'md',
    },
    title: {
      type: String,
      default: 'Title',
    },
    id: {
      type: String,
      default: 'modal',
    },
    submitTitle: {
      type: String,
      default: 'Save',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    notScrollable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
