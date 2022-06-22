<template>
  <div class="row mt-3">
    <div class="col-lg-8 offset-lg-2">
      <div class="mb-2">
        <ValidationProviderWrapper name="Title" :rules="['required']">
          <BaseInput
            v-model="dataField.title"
            placeholder="Enter Title"
          ></BaseInput>
        </ValidationProviderWrapper>
      </div>
      <div class="mb-2">
        <ValidationProviderWrapper name="Description" :rules="['required']">
          <BaseInput
            v-model="dataField.description"
            placeholder="Enter Description"
          ></BaseInput>
        </ValidationProviderWrapper>
      </div>
      <div class="mb-2">
        <ValidationProviderWrapper name="URL" :rules="['required']">
          <BaseInput
            v-model="dataField.url"
            placeholder="Enter Content URL"
          ></BaseInput>
        </ValidationProviderWrapper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editField: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dataField: {
        title: '',
        description: '',
        url: '',
      },
    }
  },
  watch: {
    dataField: {
      handler(newVal) {
        this.$emit('data:fields', newVal)
      },
      deep: true,
    },
    editField: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataField = newVal
        }
      },
      immediate: true,
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped></style>
