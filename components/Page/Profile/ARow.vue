<template>
  <div
    class="d-flex flex-wrap align-items-center no-gutters border-bottom py-3"
  >
    <div class="col-md-3 col-12 mb-2 mb-md-0">
      <div class="text-light">{{ label }}</div>
    </div>
    <div class="col-md-7 col-10">
      <slot></slot>
    </div>
    <template v-if="!readOnly">
      <div v-if="edit" class="col-2 text-right" @click="toSave()">
        <p><span class="text-primary">Save</span></p>
      </div>

      <div v-else class="col-2 text-right" @click="toggleField()">
        <p>
          <span
            class="iconify text-primary pointer fs-18"
            data-icon="eva:edit-2-outline"
          ></span>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    objKey: {
      type: [String, Array],
      required: true
    }
  },
  data() {
    return {
      edit: false
    }
  },
  methods: {
    toSave() {
      // console.log(this.objKey)

      this.$emit('save', this.objKey)
      this.toggleField()
    },
    toggleField() {
      this.edit = !this.edit
      this.$children.forEach((child) => {
        child.toInput = !child.toInput
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
