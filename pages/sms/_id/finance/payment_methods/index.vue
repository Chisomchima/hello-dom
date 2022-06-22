<template>
  <div class="">
    <div class="">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="">
          <p class="titletext mb-0">Payment Methods</p>
        </div>

        <div>
          <b-btn class="bg-primary" @click="addPayroll">
            Create Payment Method</b-btn
          >
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
            :sort-direction="sortDirection"
            @page-changed="pageChange"
            @row-clicked="goPayments"
          >
            <template #action="{ data }">
              <div class="action_hr">
                <b-dropdown
                  size="lg"
                  variant="link"
                  menu-class=""
                  class="cutom2"
                  toggle-class="text-decoration-none"
                  no-caret
                >
                  <template #button-content>
                    <span
                      class="iconify"
                      data-icon="bi:three-dots-vertical"
                    ></span>
                  </template>
                  <b-dropdown-item href="#" class="">View</b-dropdown-item>
                  <b-dropdown-item href="#" class="">Edit</b-dropdown-item>
                  <b-dropdown-item href="#" class=""
                    >Disable Method</b-dropdown-item
                  >
                  <b-dropdown-item href="#">
                    <span class="text-danger"> Delete Payment </span>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </template>
            <template #is_active="{ data: { item } }">
              <span v-if="item.is_active === true" class="badge blue-badge">
                Enabled</span
              >

              <span v-else class="badge grey-badge"> Disabled</span>
            </template>
          </Table>
        </template>
      </UtilsFilterComponent>
      <ModalWrapper
        id="add-payroll"
        title="New Payment Method"
        submit-title="Save"
        variant="danger"
        size="lg"
        @ok="handleCreate"
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
              <div class="row w-100">
                <div class="col-6 p-r">
                  <div class="form-group">
                    <label>Payment Name</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <input
                        v-model="payment.name"
                        _ngcontent-dpg-c305=""
                        type="text"
                        placeholder=" Name"
                        class="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="form-group col-6">
                  <label>Status</label>
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="selected"
                      :options="[
                        { text: 'Enable', value: true },
                        { text: 'Disable', value: false },
                      ]"
                      :aria-describedby="ariaDescribedby"
                      name="radio-inline"
                    ></b-form-radio-group>
                  </b-form-group>
                </div>

                <div class="col-6">
                  <div class="form-group">
                    <label>Payment Journal </label>
                    <ValidationProviderWrapper :rules="['required']">
                      <v-select
                        class="style-chooser1"
                        placeholder="Select"
                        :options="journals"
                        v-model="selected_journal"
                        label="journal_name"
                      >
                      </v-select>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label>Payment Account </label>
                    <ValidationProviderWrapper :rules="['required']">
                      <v-select
                        class="style-chooser1"
                        placeholder="Select"
                        v-model="selected_account"
                        :options="accounts"
                        label="account_name"
                      >
                      </v-select>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12 p-r">
                  <div class="form-group">
                    <label>Notes (optional)</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <textarea
                        id=""
                        v-model="payment.note"
                        name=""
                        class="form-control"
                        placeholder="Add Notes"
                        cols="30"
                        rows="6"
                      ></textarea>
                    </ValidationProviderWrapper>
                  </div>
                </div>
              </div>
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
      validated: false,
      accounts: [],
      journals: [],
      selected_account: {},
      selected_journal: {},
      selected: '',
      payments: [],
      payment: {
        name: '',
        note: '',
      },
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
      date_from: '',
      date_to: '',
      currentPage: 1,
      pages: 1,
      view: true,
      filter: '',
      filterApi: '',
      filterOn: [],
      page: 1,
      allStudents: [],
      totalPages: null,
      isBusy: false,
      sortDirection: 'asc',
      students: [],
      perPage: 8,
      pageOptions: [10, 20, 25, 100],
      fields: [
        // { key: 'check', sortable: false },

        { key: 'payment_name', label: 'Name', sortable: true },
        { key: 'journal_name', sortable: true },
        { key: 'account_name', sortable: true },
        {
          key: 'created_on',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('DDDD')
          },

          label: 'Date Created',
          sortable: true,
        },
        { key: 'is_active', label: 'Status', sortable: true },

        { key: 'total', sortable: true },
        { key: 'action', label: '', sortable: false },
      ],
    }
  },
  async fetch() {
    try {
      const { data } = await this.$axios.get(
        `finances/schools/${this.loggedInStaff.school_details.id}/payment/methods/`
      )
      this.payments = data.results.map((e) => {
        return {
          ...e,
          journal_name: e.payment_journal ? e.payment_journal.journal_name : '',
          account_name: e.payment_account ? e.payment_account.account_name : '',
        }
      })
      const accounts = await this.$axios.get(
        `finances/schools/${this.loggedInStaff.school_details.id}/accounts/`
      )
      console.log('accounts', accounts.data)
      this.accounts = accounts.data.results
      const journals = await this.$axios.get(
        `finances/schools/${this.loggedInStaff.school_details.id}/journals/`
      )
      console.log('journals', journals.data)
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
          `finances/schools/${this.loggedInStaff.school_details.id}/payment/methods/`,

          {
            payment_name: this.payment.name,
            payment_note: this.payment.note,
            payment_journal: this.selected_journal,
            payment_account: this.selected_account,
          }
        )
        this.$fetch()
        this.$bvModal.hide('add-payroll')
      } catch (error) {
        console.error(error)
      }
    },
    addPayroll() {
      this.$bvModal.show('add-payroll')
    },

    goPayments(e) {
      console.log(e)
      this.$router.push({
        path: `/sms/${this.$route.params.id}/finance/payment_methods/${e.id}`,
        query: { _name: `${e.payment_name}` },
      })
    },
    slowStudent: debounce(function (e) {
      this.filterApi = e
    }, 100),
  },
}
</script>

<style scoped>
.red-badge {
  background: #fffbeb;
}
.yellow-badge {
  background: #fffaf0;
}
.green-badge {
  background: #f3fbf6;
}
.purple-badge {
  background: #faf5fd;
  color: #9611b7;
  border: 1px solid #9611b7;
}
.grey-badge {
  background: #fcfdfe;
  color: #8f9aa3;
  border: 1px solid #8f9aa3;
}
label {
  font-size: 12px;
  color: rgb(122, 120, 120);
}
.more-width {
  width: 40rem;
}
.style-chooser1 >>> .vs__search::placeholder,
.style-chooser1 >>> .vs__dropdown-toggle,
.style-chooser1 >>> .vs__dropdown-menu {
  background: #fbfdfe;
  color: #abb4bc;
}
</style>
