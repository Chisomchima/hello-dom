<template>
  <ModalWrapper size="lg" id="editUser" :title="modalTitle" @hide="clear()" @ok="ok()">
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
            <ValidationProviderWrapper name="Menu access" :rules="['required']">
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
                v-model="dataObject.groups"
                listStyle="height:300px"
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
</template>

<script>
import { differenceBy } from 'lodash'
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
        menus: [[], []],
        email: '',
      },
      choice: [],
      title: '',
      groups: [],
      menuList: [],
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
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject.groups[1] = newVal.groups
          this.dataObject.id = newVal.id
          this.dataObject.first_name = newVal.first_name
          this.dataObject.last_name = newVal.last_name
          this.dataObject.username = newVal.username
          this.dataObject.email = newVal.email
          this.dataObject.menus = newVal.menus

          let diff = this.checkDiffference(
            this.dataObject.groups[0],
            newVal.groups
          )
          console.log(diff)
          this.dataObject.groups[0] = diff
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
    this.callForData()
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.edit()
      }
    },
    checkDiffference(yardstick, y) {
      let diff = differenceBy(yardstick, y, 'name')
      return diff
    },
    async callForData() {
      try {
        let groups = await this.$api.users.getGroups({ size: 1000 })
        console.log(groups.results)
        this.dataObject.groups[0] = groups.results
      } catch {}
    },
    async edit() {
      try {
        let groups = this.dataObject.groups[1]
        let groupsID = []
        if (groups.length > 0) {
          groupsID = groups.map((el) => el.id)
        }
        const data = await this.$api.users.updateUser(this.dataObject.id, {
          first_name: this.dataObject.first_name,
          last_name: this.dataObject.last_name,
          username: this.dataObject.username,
          email: this.dataObject.email,
          groups: groupsID,
          menus: this.dataObject.menus,
        })
        this.$emit('refresh')
        this.$bvModal.hide('editUser')
      } catch (error) {
        console.log(error)
      }
    },
    clear() {
      this.dataObject.first_name = ''
      this.dataObject.last_name = ''
      this.dataObject.description = ''
      this.dataObject.username = ''
      this.dataObject.email = ''
      this.dataObject.groups[1] = []
      this.callForData()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>