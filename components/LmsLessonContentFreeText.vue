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
        <label for="" class="form-control-label">Text</label>
        <ckeditor-nuxt v-model="dataField.text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    }
  },

  props: {
    editField: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      //   editorConfig: {title: {
      //     placeholder: 'h1'
      // },
      //     simpleUpload: {

      //       uploadUrl: 'path_to_image_controller',
      //       headers: {
      //         'Authorization': 'optional_token'
      //       }
      //     }
      //   },
      contentHolder: '',
      dataField: {
        title: '',
        description: '',
        text: ''
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
        if (Object.values(newVal).length > 0) this.dataField = newVal
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
