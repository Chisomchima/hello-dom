<template>
  <div>
    <ModalWrapper id="addUser" :title="modalTitle" @ok="ok()" @hide="clear()">
      <ValidationObserver ref="form">
        <form>
          <div class="row">
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper
                name="First name"
                :rules="['required']"
              >
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
              <ValidationProviderWrapper name="Username" :rules="['required']">
                <input
                  v-model="dataObject.username"
                  type="text"
                  class="form-control"
                />
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper
                name="Email"
                :rules="['required', 'email']"
              >
                <input
                  v-model="dataObject.email"
                  type="text"
                  autocomplete="off"
                  class="form-control"
                />
              </ValidationProviderWrapper>
            </div>
            <!-- <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Password" :rules="['required']" :label="'Password'">
              <input
                v-model="dataObject.password"
                type="password"
                autocomplete="off"
                class="form-control"
              />
            </ValidationProviderWrapper>
          </div> -->

            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Groups" :rules="['required']">
                <VSelect
                  v-model="dataObject.groups"
                  :options="groups"
                  label="name"
                  multiple
                  taggable
                  :reduce="(opt) => opt.id"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper
                name="Menu access"
                :rules="['required']"
              >
                <VSelect
                  v-model="dataObject.menus"
                  :options="access"
                  label="name"
                  multiple
                  taggable
                  :reduce="(opt) => opt"
                >
                </VSelect>
              </ValidationProviderWrapper>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </ModalWrapper>
    <SettingsUserManagementModalRegAuth :user="user" />
  </div>
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
        menus: [],
        email: '',
      },
      title: '',
      user: {},
      groups: [],
      access: [
        {
          name: 'Patient Records',
          icon: 'fas fa-notes-medical',
          route: '/dashboard/patient',
        },
        {
          name: 'OPD',
          icon: 'fas fa-user-md',
          route: '/dashboard/opd',
        },
        {
          name: 'Laboratory',
          icon: 'fas fa-vial',
          route: '/dashboard/laboratory/',
        },
        {
          name: 'Imaging',
          icon: 'fas fa-x-ray',
          route: '/dashboard/imaging/',
        },

        {
          name: 'Customer Service Officer',
          icon: 'fas fa-list-ol',
          route: '/dashboard/cso/',
        },
        {
          name: 'Finance',
          icon: 'fas fa-money-check-alt',
          route: '/dashboard/finance/',
        },
        {
          name: 'Reports',
          icon: 'fas fa-file',
          route: '/dashboard/reports/',
        },
        {
          name: 'Settings',
          icon: 'fas fa-cog',
          route: '/dashboard/settings/',
        },
      ],
    }
  },
  async created() {
    let groups = await this.$api.users.getGroups({ size: 1000 })
    this.groups = groups.results
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

  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.save()
      }
    },
    async save() {
      try {
        const data = await this.$api.users.createUser(this.dataObject)
        this.$emit('refresh')
        this.user = data
        this.$bvModal.hide('addUser')
        this.$bvModal.show('regAuth')
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
        email: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>