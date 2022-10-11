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
    :no-close-on-esc="persistent"
    :no-close-on-backdrop="persistent"
    :hide-header-close="persistent"
    :cancel-disabled="persistent"
    ok-title="Save"
    @ok="$emit('ok', $event)"
    @show="$emit('show', $event)"
    @hide="$emit('hide', $event)"
  >
    <slot></slot>
    <template #modal-footer="{ cancel }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <slot name="footer" :cancel="cancel">
        <div
          :class="
            arrangement ? `justify-content-between` : `justify-content-center`
          "
          class="d-flex w-100 px-5"
        >
          <div>
            <b-button
              size="sm"
              variant="light"
              class="px-5 text-secondary mr-2"
              :disabled="persistent"
              @click="cancel()"
            >
              {{ cancelText }}
            </b-button>
          </div>
          <div v-if="arrangement">
            <BaseButton
              class="px-5"
              :extra-class="buttonColor"
              @click="$emit('ok', $event)"
            >
              {{ submitTitle }}
            </BaseButton>
          </div>
        </div>
      </slot>
      <!-- Button with custom close trigger value -->
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    buttonColor: {
      type: String,
      default: 'btn-primary',
    },
    noFooter: {
      type: Boolean,
      default: false,
    },
    stacking: {
      type: Boolean,
      default: true,
    },
    persistent: {
      type: Boolean,
      default: false,
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
    arrangement: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
  },
  methods: {
    cancel() {
      this.$emit('clearForm', true)
    },
  },
}
</script>

<style lang="scss" scoped></style>
