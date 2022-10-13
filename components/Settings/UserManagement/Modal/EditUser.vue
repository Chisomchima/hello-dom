<template>
  <ModalWrapper id="editUser" :title="modalTitle" @ok="ok()">
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
            <ValidationProviderWrapper name="Email" :rules="['email']">
              <input
                v-model="dataObject.email"
                type="text"
                autocomplete="off"
                disabled
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
                multiple
                taggable
                :reduce="(opt) => opt.id"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Menu access" :rules="['required']">
              <VSelect
                v-model="dataObject.menus"
                :options="menu"
                label="title"
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
      choice: [],
      title: '',
      groups: [],
      menuList: [],
      menu: [
        {
          href: '/dashboard/patient',
          title: 'Patient Records',
          icon: 'fas fa-hospital-user',
        },

        {
          href: '/dashboard/opd',
          title: 'OPD',
          icon: 'fas fa-user-md',
          child: [
            {
              href: '/dashboard/opd/',
              title: 'Encounter Work List',
              icon: 'fas fa-list-ul',
            },
          ],
        },

        {
          href: '/dashboard/laboratory',
          title: 'Laboratory',
          icon: 'fas fa-vial',
          child: [
            {
              href: '/dashboard/laboratory/',
              title: 'Laboratory Work List',
              icon: 'fas fa-list-ul',
            },
          ],
        },

        {
          href: '/dashboard/imaging',
          title: 'Imaging',
          icon: 'fas fa-x-ray',
          child: [
            {
              href: '/dashboard/imaging/',
              title: 'Imaging Work List',
              icon: 'fas fa-list-ul',
            },
          ],
        },
        {
          href: '/dashboard/cso',
          title: 'Customer Service Officer',
          icon: 'fas fa-list-ol',
        },
        {
          href: '/dashboard/finance',
          title: 'Finance',
          icon: 'fas fa-money-check-alt',
        },
        {
          href: '/dashboard/reports',
          title: 'Reports',
          icon: 'fas fa-file',
          child: [
            {
              href: '/dashboard/reports/encounter',
              title: 'Encounter report',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/reports/laboratory',
              title: 'Laboratory report',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/reports/imaging',
              title: 'Imaging report',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/reports/patient',
              title: 'Patient report',
              icon: 'fas fa-list-ul',
            },
          ],
        },
        {
          title: 'Settings',
          href: '/dashboard/settings',
          icon: 'fas fa-cog',
          child: [
            {
              href: '/dashboard/settings/user/?tab=0',
              title: 'User Management',
              child: [
                {
                  href: '/dashboard/settings/user/?tab=0',
                  title: 'Users',
                },
              ],
            },
            {
              href: '/dashboard/settings/finance/',
              title: 'Finance Settings',
              child: [
                {
                  href: '/dashboard/settings/finance/items/',
                  title: 'Billable items',
                },
                {
                  href: '/dashboard/settings/finance/payment-method/',
                  title: 'Payment methods',
                },
              ],
            },
            {
              href: '/dashboard/settings/laboratory/',
              title: 'Laboratory Settings',
              child: [
                {
                  href: '/dashboard/settings/laboratory/service-center',
                  title: 'Laboratory center',
                },
                {
                  href: '/dashboard/settings/laboratory/service-config',
                  title: 'Laboratory configuration',
                },
              ],
            },
            {
              href: '/dashboard/settings/imaging/',
              title: 'Imaging Settings',
              child: [
                {
                  href: '/dashboard/settings/imaging/service-center',
                  title: 'Imaging Center',
                },
                {
                  href: '/dashboard/settings/imaging/service-config',
                  title: 'Imaging Configuration',
                },
              ],
            },
            {
              href: '/dashboard/settings/opd/',
              title: 'OPD Settings',
              child: [
                {
                  href: '/dashboard/settings/opd/?tab=0',
                  title: 'Department',
                },
                {
                  href: '/dashboard/settings/opd/?tab=1',
                  title: 'Clinic',
                },
              ],
            },
          ],
        },
      ],
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject.id = newVal.id
          this.dataObject.first_name = newVal.first_name
          this.dataObject.last_name = newVal.last_name
          this.dataObject.username = newVal.username
          this.dataObject.email = newVal.email
          this.dataObject.groups = newVal.groups
          this.dataObject.menus = newVal.menus
        }
      },
      immediate: true,
      deep: true,
    },
    modalTitle() {
      this.title = this.modalTitle
    },
  },
  async created() {
    let groups = await this.$api.users.getGroups({ size: 1000 })
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
        const data = await this.$api.users.updateUser(this.dataObject.id, {
          first_name: this.dataObject.first_name,
          last_name: this.dataObject.last_name,
          username: this.dataObject.username,
          email: this.dataObject.email,
          groups: this.dataObject.groups,
          menus: this.dataObject.menus,
        })
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