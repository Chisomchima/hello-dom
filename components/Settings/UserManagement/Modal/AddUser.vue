<template>
  <div>
    <ModalWrapper
      id="addUser"
      :size="`lg`"
      :title="modalTitle"
      @ok="ok()"
      @hide="clear()"
    >
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
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper
                name="Menu access"
                :rules="['required']"
              >
                <!-- <PickList
                  v-model="dataObject.menus"
                  listStyle="height:200px"
                  dataKey="id"
                >
                  <template #sourceheader> Availabless </template>
                  <template #targetheader> Selected </template>
                  <template #item="dataProps">
                    <div class="product-list-action">
                      <span class="mb-2 text-info text-10 p-1">{{
                        dataProps.item
                      }}</span>
                    </div>
                  </template>
                </PickList> -->
                <v-select
                  class="style-chooser text-grey text-14"
                  placeholder="Options"
                  :options="access"
                  multiple
                  taggable
                  v-model="dataObject.menus"
                  label="name"
                >
                </v-select>
              </ValidationProviderWrapper>
            </div>
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Groups" :rules="['required']">
                <PickList
                  :metaKeySelection="control"
                  v-model="dataObject.groups"
                  listStyle="height:200px"
                  dataKey="id"
                >
                  <template #sourceheader> Available </template>
                  <template #targetheader> Selected </template>
                  <template #item="data">
                    <div class="product-list-action">
                      <span class="mb-2 text-info text-10 p-1">{{
                        data.item.name
                      }}</span>
                    </div>
                  </template>
                </PickList>
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
import PickList from 'primevue/picklist'
export default {
  components: { PickList },
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
        groups: [[], []],
        menus: [],
        email: '',
      },
      title: '',
      control: false,
      user: {},
      groups: [],
      access: [
        {
          href: '/dashboard/patient',
          name: 'Patient Records',
          icon: 'fas fa-hospital-user',
        },

        {
          href: '/dashboard/opd',
          name: 'OPD',
          icon: 'fas fa-user-md',
          child: [
            {
              href: '/dashboard/opd/',
              name: 'Encounter Work List',
              icon: 'fas fa-list-ul',
            },
          ],
        },

        {
          href: '/dashboard/laboratory',
          name: 'Laboratory',
          icon: 'fas fa-vial',
          child: [
            {
              href: '/dashboard/laboratory/',
              name: 'Laboratory Work List',
              icon: 'fas fa-list-ul',
            },
          ],
        },

        {
          href: '/dashboard/imaging',
          name: 'Imaging',
          icon: 'fas fa-x-ray',
          child: [
            {
              href: '/dashboard/imaging/',
              name: 'Imaging Work List',
              icon: 'fas fa-list-ul',
            },
          ],
        },
        {
          href: '/dashboard/cso',
          name: 'Customer Service Officer',
          icon: 'fas fa-list-ol',
        },
        {
          href: '/dashboard/finance',
          name: 'Finance',
          icon: 'fas fa-money-check-alt',
        },
        {
          href: '/dashboard/reports',
          name: 'Reports',
          icon: 'fas fa-file',
          child: [
            {
              href: '/dashboard/reports/encounter',
              name: 'Encounter report',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/reports/laboratory',
              name: 'Laboratory report',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/reports/imaging',
              name: 'Imaging report',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/reports/patient',
              name: 'Patient report',
              icon: 'fas fa-list-ul',
            },
          ],
        },
        {
          name: 'Configurations',
          href: '/dashboard/settings',
          icon: 'fas fa-cog',
          child: [
            {
              href: '/dashboard/settings/user/?tab=0',
              name: 'User Management',
              child: [
                {
                  href: '/dashboard/settings/user/?tab=0',
                  name: 'Users',
                },
              ],
            },
            {
              href: '/dashboard/settings/finance/',
              name: 'Finance Settings',
              child: [
                {
                  href: '/dashboard/settings/finance/items/',
                  name: 'Billable items',
                },
                {
                  href: '/dashboard/settings/finance/payment-method/',
                  name: 'Payment methods',
                },
              ],
            },
            {
              href: '/dashboard/settings/laboratory/',
              name: 'Laboratory Settings',
              child: [
                {
                  href: '/dashboard/settings/laboratory/service-center',
                  name: 'Laboratory center',
                },
                {
                  href: '/dashboard/settings/laboratory/service-config',
                  name: 'Laboratory configuration',
                },
              ],
            },
            {
              href: '/dashboard/settings/imaging/',
              name: 'Imaging Settings',
              child: [
                {
                  href: '/dashboard/settings/imaging/service-center',
                  name: 'Imaging Center',
                },
                {
                  href: '/dashboard/settings/imaging/service-config',
                  name: 'Imaging Configuration',
                },
              ],
            },
            {
              href: '/dashboard/settings/opd/',
              name: 'OPD Settings',
              child: [
                {
                  href: '/dashboard/settings/opd/?tab=0',
                  name: 'Department',
                },
                {
                  href: '/dashboard/settings/opd/?tab=1',
                  name: 'Clinic',
                },
              ],
            },
          ],
        },
      ],
    }
  },
  async created() {
    let groups = await this.$api.users.getGroups({ size: 1000 })
    this.dataObject.groups[0] = groups.results
  },
  mounted() {
    // let permissions = this.$api.users.getPermissions({ size: 1000 })
    // let access = this.access
    // this.dataObject.menus = access
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
        let groups = this.dataObject.groups[1]
        let groupsID = []
        if (groups.length > 0) {
          groupsID = groups.map((el) => el.id)
        }
        const data = await this.$api.users.createUser({
          first_name: this.dataObject.first_name,
          last_name: this.dataObject.last_name,
          username: this.dataObject.username,
          groups: groupsID,
          menus: this.dataObject.menus,
          email: this.dataObject.email,
        })
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
        groups: [[], []],
        menus: [[], []],
        email: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>