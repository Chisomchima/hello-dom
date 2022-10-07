<template>
  <ModalWrapper id="addDepartment" :title="title" @ok="ok()" @hide="clear()">
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Name" :rules="['required']">
              <!-- <input
                class="form-control"
                type="text
              /> -->
              <input
                v-model="dataObject.name"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="Display name"
              :rules="['required']"
            >
              <!-- <input
                class="form-control"
                type="text
              /> -->
              <input
                v-model="dataObject.display_name"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Description" :rules="['required']">
              <!-- <input
                class="form-control"
                type="text
              /> -->
              <input
                v-model="dataObject.description"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2 d-flex align-items-center">
            <ValidationProviderWrapper name="" :rules="['required']">
              <b-form-checkbox size="lg" switch v-model="dataObject.is_active">
              </b-form-checkbox>
              <!-- <input
                v-model="dataObject.is_active"
                type="checkbox"
                class=""
                style="height: 0px; width: 30px"
              /> -->
            </ValidationProviderWrapper>
            <div class="text-14" v-if="dataObject.is_active">Active</div>
            <div class="text-14" v-else>Disabled</div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    editData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    modalTitle: {
      type: String,
      require: false,
      default: () => ('Add department'),
    },
  },
  data() {
    return {
      dataObject: {
        name: '',
        description: '',
        display_name: '',
        is_active: true,
      },
      title: ''
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject = newVal
        }
      },
      immediate: true,
      deep: true,
    },
    modalTitle(){
        this.title = this.modalTitle
    }
  },
 
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.dataObject.id) {
          this.edit()
        } else {
          this.save()
        }
      }
    },
    async save() {
      try {
        const data = await this.$api.opd.createDepartment(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('addDepartment')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.opd.editDepartment(
          this.dataObject.id,
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('addDepartment')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        name: '',
        description: '',
        display_name: '',
        is_active: true,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>