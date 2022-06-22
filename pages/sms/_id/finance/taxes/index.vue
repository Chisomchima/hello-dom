<template>
  <div class="">
    <div class="">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="">
          <p class="titletext mb-0">Taxes</p>
        </div>

        <div>
          <b-btn class="bg-primary" @click="addPayroll"> Add new tax</b-btn>
        </div>
      </div>

      <UtilsFilterComponent
        :disable-visualization="true"
        search-placeholder="Search"
        @search-input="slowStudent"
      >
        <template #default="{ visualization }">
          <Table
            v-if="visualization === 'list'"
            :items="payments"
            :fields="fields"
            :is-busy="isBusy"
            :filter="filter"
            :filter-on="filterOn"
            :pages="pages"
            @page-changed="pageChange"
          >
            <template #action="{ data: { item } }">
              <div class="action_hr">
                <div class="row">
                  <span class="mr-4" @click="handleEdit(item)">
                    <span class="iconify" data-icon="bi:pencil"></span>
                  </span>
                  <span class="" @click="handleDelete(item.id)">
                    <span class="iconify" data-icon="octicon:trash-24"></span>
                  </span>
                </div>
              </div>
            </template>
          </Table>
        </template>
      </UtilsFilterComponent>
      <!-- ************************ modals ******************************* delete-tax -->
      <ModalWrapper
        id="delete-tax"
        title="Delete Tax"
        submit-title="Delete"
        buttonColor="danger"
        size=""
        @ok="deleteTax"
      >
        <div>
          <p class="text-secondary text-center">
            Are you sure you want to delete this tax? <br />
            This cannot be undone
          </p>
        </div>
      </ModalWrapper>
      <ModalWrapper
        id="add-payroll"
        :title="editMode ? 'Edit Tax' : 'Add a new tax'"
        :submit-title="editMode ? 'Update' : 'Save'"
        variant="danger"
        size=""
        @ok="editMode ? submitEdit() : handleCreate()"
        @hide="handleHide"
      >
        <div class="px-3">
          <div>
            <ValidationObserver v-slot="{ validate }">
              <div
                id="runValidate"
                ref="runValidate"
                type="button"
                @click="validate().then((e) => (validated = e))"
              ></div>
              <section class="row w-100">
                <div class="col-12">
                  <div class="form-group">
                    <label>Tax Name</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <input
                        v-model="tax.tax_name"
                        _ngcontent-dpg-c305=""
                        type="text"
                        placeholder=" Enter Tax Name"
                        class="form-control"
                      />
                    </ValidationProviderWrapper>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group">
                    <label>Tax Account </label>
                    <ValidationProviderWrapper :rules="['required']">
                      <v-select
                        v-model="tax.tax_account"
                        class="style-chooser1"
                        placeholder="Select Account"
                        :options="accounts"
                        label="account_name"
                      >
                      </v-select>
                    </ValidationProviderWrapper>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group">
                    <label>Tax Rate (%)</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <input
                        v-model="tax.tax_rate"
                        _ngcontent-dpg-c305=""
                        type="text"
                        placeholder="0.00"
                        class="form-control"
                      />
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label>Tax Number/ID (optional)</label>
                    <input
                      v-model="tax.tax_id"
                      _ngcontent-dpg-c305=""
                      type="text"
                      placeholder="Enter Tax Number/ID"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-8 ml-4 pl-1">
                  <div class="form-group row">
                    <b-form-checkbox
                      id="checkbox-1"
                      v-model="tax.is_sales"
                      name="checkbox-1"
                      class="col"
                      :value="true"
                      :unchecked-value="false"
                    >
                      <span class=""> Sales Tax </span>
                    </b-form-checkbox>
                    <b-form-checkbox
                      id="checkbox-2"
                      v-model="tax.is_purchase"
                      class="col"
                      name="checkbox-2"
                      :value="true"
                      :unchecked-value="false"
                    >
                      <span class=""> Purchase Tax </span>
                    </b-form-checkbox>
                  </div>
                </div>
                <div v-if="editMode" class="row col-12">
                  <ToggleSwitchButton
                    :value="isActive"
                    extraCss="smaller"
                    class="ml-2"
                    @change="isActive = $event"
                  />
                  <span class="ml-2">
                    {{ isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </section>
            </ValidationObserver>
          </div>
        </div>
      </ModalWrapper>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { DateTime } from 'luxon'

export default {
  data() {
    return {
      isActive: true,
      editMode: false,
      validated: false,
      accounts: [],
      journals: [],
      selected_account: {},
      selected_journal: {},
      selected: '',
      payments: [],
      tax: {
        tax_name: '',
        tax_account: '',
        tax_rate: '',
        tax_id: '',
        is_sales: true,
        is_purchase: false,
      },

      currentPage: 1,
      pages: 1,
      view: true,
      filter: '',
      filterApi: '',
      filterOn: [],
      page: 1,

      isBusy: false,
      perPage: 8,
      fields: [
        // { key: 'check', sortable: false },

        { key: 'tax_name', label: 'Name', sortable: true },
        { key: 'tax_id', label: 'ID/Number', sortable: true },
        {
          key: 'tax_rate',
          sortable: true,
          formatter: (value) => {
            return `${value} %`
          },
        },
        {
          key: 'is_sales',

          label: 'Sales Tax',
          sortable: true,
          formatter: (value) => {
            if (value === true) {
              return 'Yes'
            } else {
              return 'No'
            }
          },
        },
        {
          key: 'is_purchase',
          label: 'Purchase Tax',
          sortable: true,

          formatter: (value) => {
            if (value === true) {
              return 'Yes'
            } else {
              return 'No'
            }
          },
        },

        { key: 'action', label: '', sortable: false },
      ],
    }
  },
  async fetch() {
    try {
      const { data } = await this.$axios.get(
        `/finances/schools/${this.loggedInStaff.school_details.id}/taxes/`
      )
      this.payments = data.results
      const accounts = await this.$axios.get(
        `finances/schools/${this.loggedInStaff.school_details.id}/accounts/`
      )
      this.accounts = accounts.data.results
      const journals = await this.$axios.get(
        `finances/schools/${this.loggedInStaff.school_details.id}/journals/`
      )
      this.journals = journals.data.results
    } catch (error) {
      console.log(error)
    }
  },

  computed: {
    totalRows() {
      return this.pages * this.perPage
    },
    loggedInStaff() {
      return this.$store.getters['staff/getSchoolByCode'](this.$route.params.id)
    },
  },
  watch: {
    currentPage() {
      console.log(this.currentPage)
    },
  },

  methods: {
    handleHide() {
      // clear the modal and turn off edit mode
      this.tax = {
        tax_name: '',
        tax_account: '',
        tax_rate: '',
        tax_id: '',
        is_sales: true,
        is_purchase: false,
      }
      this.editMode = false
    },
    handleEdit(item) {
      // assign selected tax to the add tax modal
      this.editMode = true
      this.isActive = item.is_active
      this.tax.tax_name = item.tax_name
      this.tax.tax_account = item.tax_account
      this.tax.tax_rate = item.tax_rate
      this.tax.tax_id = item.tax_id
      this.$bvModal.show('add-payroll')
      this.tax_to_edit_id = item.id
    },
    async submitEdit() {
      try {
        const toSubmit = this.tax
        // add extra keys needed for patch request
        toSubmit.id = this.tax_to_edit_id
        toSubmit.is_active = this.isActive
        toSubmit.school_id = this.loggedInStaff.school_details.id
        await this.$axios.patch(
          `/finances/schools/${this.loggedInStaff.school_details.id}/taxes/${this.tax_to_edit_id}/`,
          toSubmit
        )
        this.handleHide()
        this.$bvModal.hide('add-payroll')
        this.$fetch()
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTax() {
      try {
        await this.$axios.delete(
          `/finances/schools/${this.loggedInStaff.school_details.id}/taxes/${this.tax_to_edit_id}/`
        )
        this.$fetch()
      } catch (error) {
        console.log(error)
      }
      this.$bvModal.hide('delete-tax')
    },
    handleDelete(id) {
      this.$bvModal.show('delete-tax')
      this.tax_to_edit_id = id
    },
    pageChange(e) {
      console.log(e)
    },
    async handleCreate() {
      if (this.$refs.runValidate) {
        this.$refs.runValidate.click()
      }

      if (!this.validated) return
      try {
        await this.$axios.post(
          `/finances/schools/${this.loggedInStaff.school_details.id}/taxes/`,
          this.tax
        )
        this.$fetch()
        this.handleHide()
        this.$bvModal.hide('add-payroll')
      } catch (error) {
        console.error(error)
      }
    },
    addPayroll() {
      this.$bvModal.show('add-payroll')
    },

    slowStudent: debounce(function (e) {
      this.filterApi = e
    }, 100),
  },
}
</script>

<style scoped>
label {
  font-size: 12px;
  color: rgb(122, 120, 120);
}
.style-chooser1 >>> .vs__search::placeholder,
.style-chooser1 >>> .vs__dropdown-toggle,
.style-chooser1 >>> .vs__dropdown-menu {
  background: #fbfdfe;
  color: #abb4bc;
}
</style>
