<template>
  <ModalWrapper id="editUser" :title="modalTitle" @ok="ok()" >
    <ValidationObserver ref="form">
      <form>
        <div class="row">
             <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Groups" :rules="['required']">
              <VSelect
                v-model="dataObject.groups"
                :options="groups"
                label="name"
                multiple
                taggable
                :reduce="opt => opt.id"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>
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
            <ValidationProviderWrapper name="Last name" :rules="['required']">
              <input
                v-model="dataObject.last_name"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Username" :rules="['']">
              <input
                v-model="dataObject.username"
                type="text"
                class="form-control"
                disabled
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper
              name="Email"
              :rules="['', 'email']"
            >
              <input
                v-model="dataObject.email"
                type="text"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Password" :rules="['']">
              <input
                v-model="dataObject.password"
                type="password"
                disabled
                class="form-control"
              />
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
      default: () => 'Add User',
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
        email: '',
      },
      title: '',
      groups: [],
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
    modalTitle() {
      this.title = this.modalTitle
    },
  },
    async created(){
        let groups = await this.$api.users.getGroups({size: 1000})
        this.groups = groups.results
    },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
          this.edit()
      }
    },
    async edit() {
      try {
        const data = await this.$api.users.updateUser(
          this.dataObject.id,
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('editUser')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>