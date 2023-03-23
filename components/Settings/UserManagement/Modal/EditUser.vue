<template>
  <ModalWrapper
    size="lg"
    id="editUser"
    :title="modalTitle"
    @hide="clear()"
    @ok="ok()"
  >
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
              <VSelect
                class="style-chooser text-grey text-14"
                placeholder="Options"
                :options="access"
                multiple
                taggable
                v-model="dataObject.menus"
                label="title"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>
          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Groups" :rules="['required']">
              <PickList
                v-model="dataObject.groups"
                listStyle="height:300px"
                dataKey="id"
              >
                <template #sourceheader><span class="text-14">Available</span></template>
                  <template #targetheader><span class="text-14">Selected</span></template>
                <template #item="data">
                  <div class="product-list-action">
                    <span class="mb-2 text-gray text-10 p-1">{{
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
     access: [
        {
          id: 0,
          href: '/dashboard/patient',
          title: 'Patient Records',
          icon: 'fas fa-hospital-user',
        },
        {
          id: 1,
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
          id: 2,
          href: '/dashboard/pharmacy',
          title: 'Pharmacy',
          icon: 'fas fa-pills',
        },
        {
          id: 3,
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
          id: 4,
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
          id: 5,
          href: '/dashboard/nursing-orders',
          title: 'Nursing station',
          icon: 'fas fa-user-nurse',
        },
        {
          id: 6,
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
              href: '/dashboard/reports/registeration',
              title: 'Registeration report',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/reports/finance/?tab=0',
              title: 'Finance report',
              icon: 'fas fa-list-ul',
            },
          ],
        },
        {
          id: 7,
          href: '/dashboard/cso',
          title: 'Customer Service Officer',
          icon: 'fas fa-list-ol',
        },
        {
          id: 8,
          href: '/dashboard/finance',
          title: 'Finance',
          icon: 'fas fa-money-check-alt',
        },
        {
          id: 9,
          href: '/dashboard/inventory',
          title: 'Inventory',
          icon: 'fas fa-warehouse',
          child: [
            {
              href: '/dashboard/inventory/purchases',
              title: 'Purchases',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/inventory/receipt',
              title: 'Receipts',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/inventory/sales',
              title: 'Sales',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/inventory/transfers',
              title: 'Transfers',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/inventory/inventory-adjustment',
              title: 'Inventory Adjustments',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/inventory/vendors',
              title: 'Vendors',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/inventory/vendors/products',
              title: 'Products',
              icon: 'fas fa-list-ul',
            },
          ],
        },
        {
          id: 10,
          title: 'Configurations',
          href: '/dashboard/configurations',
          icon: 'fas fa-cog',
          child: [
            {
              href: '/dashboard/configurations/user/?tab=0',
              title: 'User Management',
              // child: [
              //   {
              //     href: '/dashboard/configurations/user/?tab=0',
              //     title: 'Users',
              //   },
              // ],
            },
            {
              href: '/dashboard/configurations/finance/',
              title: 'Finance Configurations',
              child: [
                {
                  href: '/dashboard/configurations/finance/items/',
                  title: 'Billable items',
                },
                {
                  href: '/dashboard/configurations/finance/payment-method/',
                  title: 'Payment methods',
                },
              ],
            },
            {
              href: '/dashboard/configurations/laboratory/',
              title: 'Laboratory Configurations',
              child: [
                {
                  href: '/dashboard/configurations/laboratory/service-center',
                  title: 'Laboratory center',
                },
                {
                  href: '/dashboard/configurations/laboratory/service-config',
                  title: 'Laboratory configuration',
                },
              ],
            },
            {
              href: '/dashboard/configurations/imaging/',
              title: 'Imaging Configurations',
              child: [
                {
                  href: '/dashboard/configurations/imaging/service-center',
                  title: 'Imaging Center',
                },
                {
                  href: '/dashboard/configurations/imaging/service-config',
                  title: 'Imaging Configuration',
                },
              ],
            },
            {
              href: '/dashboard/configurations/opd/?tab=0',
              title: 'OPD Configurations',
            },
          ],
        },
      ],
    }
  },
  watch: {
    editData: {
      handler(newVal) {
        console.log(newVal, 'editData')
        if (Object.keys(newVal).length > 0) {
          this.dataObject.groups[1] = newVal.groups
          this.dataObject.id = newVal.id
          this.dataObject.first_name = newVal.first_name
          this.dataObject.last_name = newVal.last_name
          this.dataObject.username = newVal.username
          this.dataObject.email = newVal.email
          this.dataObject.menus = newVal.menus

          const diff = this.checkDiffference(
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
    await this.callForData()
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        this.edit()
      }
    },
    checkDiffference(yardstick, y) {
      const diff = differenceBy(yardstick, y, 'name')
      return diff
    },
    async callForData() {
      try {
        const groups = await this.$api.users.getGroups({ size: 1000 })
        console.log(groups.results)
        this.dataObject.groups[0] = groups.results
      } catch {}
    },
    async edit() {
      const sortedArray = this.dataObject.menus.sort((a, b) => a.id - b.id)
      try {
        const groups = this.dataObject.groups[1]
        let groupsID = []
        if (groups.length > 0) {
          groupsID = groups.map((el) => el.id)
        } 
        await this.$api.users.updateUser(this.dataObject.id, {
          first_name: this.dataObject.first_name,
          last_name: this.dataObject.last_name,
          username: this.dataObject.username,
          email: this.dataObject.email,
          groups: groupsID,
          menus: sortedArray,
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