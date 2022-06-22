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
      <LmsFileUploadComponent
        ref="fileUploadComponent"
        :accepts="accepts"
        :type="type"
        :file-data="dataField"
        @file-input="$emit('file-input', $event)"
        @uploading="$emit('uploading', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editField: {
      type: Object,
      default: () => ({})
    },
    accepts: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'file'
    }
  },
  data() {
    return {
      dataField: {
        title: '',
        description: ''
      }
    }
  },
  watch: {
    dataField: {
      handler(newVal) {
        this.$emit('data:fields', newVal)
      },
      deep: true
    },
    editField: {
      handler(newVal) {
        this.dataField = newVal
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
