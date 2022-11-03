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
    :no-close-on-backdrop="true"
    :hide-backdrop="hideBackground"
    :ok-title="saveText"
    @ok="$emit('ok', $event)"
    @show="$emit('show', $event)"
    @hide="$emit('hide', $event)"
    @change="$emit('change', $event)"
  >
    <slot></slot>
    <template #modal-header="{ close }">
     <slot name="header" :close="close">

     
       <h5>{{ title }}</h5>
     
      <div class="point" @click="close()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M6 18L18 6m0 12L6 6"
          />
        </svg>
      </div>

     </slot>
    </template>
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
    hideBackground: {
      type: Boolean,
      default: false,
    },
    specialHeader: {
      type: Boolean,
      default: false,
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    saveText: {
      type: String,
      default: 'Submit',
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
