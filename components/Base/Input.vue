<template>
  <div class="d-flex">
    <input
      v-if="type != 'password'"
      v-model="currentValue"
      class="form-control ng-valid ng-dirty ng-touched"
      :placeholder="placeholder"
      :type="type"
    />
    <input
      v-else
      v-model="currentValue"
      class="form-control ng-valid ng-dirty ng-touched border-right-0"
      :placeholder="placeholder"
      :type="showPassword ? 'text' : 'password'"
      style="border-top-right-radius: 0; border-bottom-right-radius: 0"
    />
    <div
      v-if="type === 'password'"
      class="
        align-items-center
        border-left-0
        btn btn-light btn-sm
        d-flex
        rounded-0
        w-20
      "
      style="border-top-right-radius: 0; border-bottom-right-radius: 0"
      type="button"
      @click.prevent.stop="togglePassword"
    >
      <b-icon class="" :icon="showPassword ? 'eye' : 'eye-slash'"></b-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Please enter this field'
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      showPassword: false
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    togglePassword() {
      //   console.log(this.togglePassword)
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style scoped>
.toggle-password-style {
  margin-top: -25px;
  margin-left: -25px;
}
</style>
