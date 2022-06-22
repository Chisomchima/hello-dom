<template>
  <div class="row py-3 border-bottom align-items-center">
    <div class="col-2 text-light text-capitalize">
      {{ name.split('_').join(' ') }}
    </div>
    <div v-if="!show" class="col">{{ value }}</div>
    <div class="col">
      <input
        v-if="show"
        v-model="newValue"
        type="text"
        class="form-control form-control-lg"
        placeholder="Enter new value"
      />
    </div>
    <div class="col-2">
      <template v-if="editable">
        <b-icon
          v-if="!show"
          variant="primary"
          icon="pencil"
          @click="show = !show"
        ></b-icon>
        <span
          v-if="show"
          class="text-primary"
          @click="
            ;(show = !show), $emit('save:detail', { name, value: newValue })
          "
          >Save</span
        >
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      newValue: ''
    }
  },
  watch: {
    value: {
      handler(newValue: string) {
        this.newValue = newValue
      },
      immediate: true
    }
  }
})
</script>

<style lang="scss" scoped></style>
