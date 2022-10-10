<template>
  <ModalWrapper id="addUser" :title="modalTitle" @ok="ok()" @hide="clear()">
    <ValidationObserver ref="form">
      <form>
        <div class="row">
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="First name" :rules="['required']">
              <input
                v-model="dataObject.first_name"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="Last name"
              :rules="['required']"
            >
              <input
                v-model="dataObject.last_name"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Username" :rules="['required']">
              <input
                v-model="dataObject.username"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Email" :rules="['required', 'email']">
              <input
                v-model="dataObject.email"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
           <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Password" :rules="['required']">
              <input
                v-model="dataObject.password"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
           <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Groups" :rules="['required']">
               <VSelect
                v-model="dataObject.groups"
                :options="groups"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>
          <!-- <div class="col-md-12 mb-2 d-flex align-items-center">
            <ValidationProviderWrapper name="" :rules="['required']">
              <b-form-checkbox size="lg" switch v-model="dataObject.is_active">
              </b-form-checkbox>
            </ValidationProviderWrapper>
            <div class="text-14" v-if="dataObject.is_active">Active</div>
            <div class="text-14" v-else>Disabled</div>
          </div> -->
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
      require: true,
      default: () => ('Add User'),
    },
  },
  data() {
    return {
      dataObject: {
        first_name: '',
        last_name: '',
        username: '',
        groups: [],
        password: '',
        email: ''
      },
      title: '',
      groups: []
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
        first_name: '',
        last_name: '',
        username: '',
        groups: [],
        password: '',
        email: ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>