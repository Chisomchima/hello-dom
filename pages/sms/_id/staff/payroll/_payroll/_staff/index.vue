<template>
  <div class="">
    <div class="">
      <UtilsHeaderCard
        :enable-action="false"
        :title="$route.query._name"
        :data="data"
        :display-key="[
          'contract_ref_no',
          'net_payable',
          'pension_deduction',
          'amount',
          'tax_deduction',
          'pension_contribution',
        ]"
      >
      </UtilsHeaderCard>

      <UtilsBaseCardTab>
        <UtilsCardTab title="Payments">
          <UtilsFilterComponent
            :disable-visualization="true"
            search-placeholder="Search"
            @search-input="slowStudent"
          >
            <template #besideFilterButton>
              <div class="ml-2">
                <b-btn class="bg-primary" @click="addContract">
                  Add Payment</b-btn
                >
              </div>
            </template>
            <template #default="{ visualization }">
              <Table
                v-if="visualization === 'list'"
                :items="items"
                :fields="fields"
                :is-busy="isBusy"
                :filter="filter"
                :filter-on="filterOn"
                :pages="pages"
                :sort-direction="sortDirection"
                @single-row="showButton"
              >
                <template #action="{ data }">
                  <div>
                    <span class="mr-3">
                      <span
                        class="iconify"
                        data-icon="clarity:pencil-line"
                      ></span>
                    </span>

                    <span>
                      <span
                        class="iconify"
                        data-icon="ri:delete-bin-6-line"
                      ></span>
                    </span>
                  </div>
                </template>
                <template #status="{ data: { item } }">
                  <div>
                    <span
                      v-if="item.status === 'processed'"
                      class="badge yellow-badge"
                    >
                      Processed</span
                    >
                    <span
                      v-else-if="item.status === 'completed'"
                      class="badge purple-badge"
                    >
                      Completed</span
                    >
                    <span
                      v-else-if="item.status === 'draft'"
                      class="badge grey-badge"
                    >
                      Draft</span
                    ><span
                      v-else-if="item.status === 'approved'"
                      class="badge green-badge"
                    >
                      Approved</span
                    >
                  </div>
                </template>
              </Table>
            </template>
          </UtilsFilterComponent>
        </UtilsCardTab>
        <UtilsCardTab title="Deductions">
          <UtilsFilterComponent
            :disable-visualization="true"
            search-placeholder="Search"
            @search-input="slowStudent"
          >
            <template #besideFilterButton>
              <div class="ml-2">
                <b-btn class="bg-primary" @click="addContract">
                  Add Deduction</b-btn
                >
              </div>
            </template>
            <template #default="{ visualization }">
              <Table
                v-if="visualization === 'list'"
                :items="deductionItems"
                :fields="deductionFields"
                :is-busy="isBusy"
                :filter="filter"
                :filter-on="filterOn"
                :pages="pages"
                :sort-direction="sortDirection"
                @page-changed=""
              >
                <template #action="{ data }">
                  <div>
                    <span class="mr-3">
                      <span
                        class="iconify"
                        data-icon="clarity:pencil-line"
                      ></span>
                    </span>

                    <span>
                      <span
                        class="iconify"
                        data-icon="ri:delete-bin-6-line"
                      ></span>
                    </span>
                  </div>
                </template>
              </Table>
            </template>
          </UtilsFilterComponent>
        </UtilsCardTab>
        <UtilsCardTab title="Pension & Taxes">
          <UtilsFilterComponent
            :disable-visualization="true"
            search-placeholder="Search"
            @search-input="slowStudent"
          >
            <template #default="{ visualization }">
              <Table
                v-if="visualization === 'list'"
                :items="taxItems"
                :fields="taxFields"
                :is-busy="isBusy"
                :filter="filter"
                :filter-on="filterOn"
                :pages="pages"
                :sort-direction="sortDirection"
                @page-changed=""
              >
                <template #action="{ data }">
                  <div>
                    <span class="mr-3">
                      <span
                        class="iconify"
                        data-icon="clarity:pencil-line"
                      ></span>
                    </span>

                    <span>
                      <span
                        class="iconify"
                        data-icon="ri:delete-bin-6-line"
                      ></span>
                    </span>
                  </div>
                </template>
              </Table>
            </template>
          </UtilsFilterComponent>
        </UtilsCardTab>
        <UtilsCardTab title="Banks & RSA">
          <UtilsFilterComponent
            :disable-visualization="true"
            :disable-pagination="true"
            search-placeholder="Search"
            @search-input="slowStudent"
          >
            <template #beforeActions>
              <h4>Banks</h4>
            </template>
            <template #default="{ visualization }">
              <Table
                v-if="visualization === 'list'"
                :items="BankItems"
                :fields="BankFields"
                :is-busy="isBusy"
                :filter="filter"
                :filter-on="filterOn"
                :pages="pages"
                :sort-direction="sortDirection"
                @page-changed=""
              >
                <template #action="{ data }">
                  <div>
                    <span class="mr-3">
                      <span
                        class="iconify"
                        data-icon="clarity:pencil-line"
                      ></span>
                    </span>

                    <span>
                      <span
                        class="iconify"
                        data-icon="ri:delete-bin-6-line"
                      ></span>
                    </span>
                  </div>
                </template>
              </Table>
            </template>
          </UtilsFilterComponent>
        </UtilsCardTab>
      </UtilsBaseCardTab>
      <UtilsFilterComponent
        v-if="showBanks"
        class="mt-4"
        :disable-visualization="true"
        :disable-pagination="true"
        search-placeholder="Search"
        @search-input="slowStudent"
      >
        <template #beforeActions>
          <h4>RSA</h4>
        </template>
        <template #default="{ visualization }">
          <Table
            v-if="visualization === 'list'"
            :items="RSAItems"
            :fields="RSAFields"
            :is-busy="isBusy"
            :filter="filter"
            :filter-on="filterOn"
            :pages="pages"
            :sort-direction="sortDirection"
            @page-changed=""
          >
            <template #action="{ data }">
              <div>
                <span class="mr-3">
                  <span class="iconify" data-icon="clarity:pencil-line"></span>
                </span>

                <span>
                  <span class="iconify" data-icon="ri:delete-bin-6-line"></span>
                </span>
              </div>
            </template>
          </Table>
        </template>
      </UtilsFilterComponent>

      <ModalWrapper
        id="delete-student"
        title="Delete Student"
        submit-title="Delete"
        variant="danger"
        @ok="handleDeleteStudent"
      >
        Are you sure you want to delete this Student? this action is permanent.
        click 'cancel' to stop this action
      </ModalWrapper>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data() {
    return {
      currentPage: 1,
      showBanks: false,
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
      data: {
        title: 'Salary October 2022',
        contract_ref_no: 'G3DDDDD',
        no_of_employee: 10,
        net_payable: '2,000,000,000',
        amount: '200,000',
        tax_deduction: '200,000',

        pension_deduction: '200,000',
        pension_contribution: '20,000',
      },
      BankFields: [
        // { key: 'check', sortable: false },

        { key: 'account_name', sortable: false },

        { key: 'account_number', sortable: true },
        { key: 'Bank_name', sortable: true },

        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],
      RSAFields: [
        // { key: 'check', sortable: false },

        { key: 'account_name', sortable: false },

        { key: 'RSA_number', sortable: true },
        { key: 'RSA_name', sortable: true },

        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],
      taxFields: [
        // { key: 'check', sortable: false },

        { key: 'name', sortable: true },
        { key: 'type', sortable: true },
        { key: 'amount', sortable: true },

        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],
      deductionFields: [
        // { key: 'check', sortable: false },

        { key: 'name_of_deduction', sortable: true },
        { key: 'description', sortable: true },
        { key: 'amount', sortable: true },

        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],
      fields: [
        // { key: 'check', sortable: false },

        { key: 'name_of_payment', sortable: true },
        { key: 'description', sortable: true },
        { key: 'amount', sortable: true },

        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],
      BankItems: [
        {
          check: '',
          account_name: 'Ekwere Ime',
          account_number: '0236604525',
          Bank_name: 'GTB',
        },
        {
          check: '',
          account_name: 'Ekwere Ime',
          account_number: '2456938537',
          Bank_name: 'Zenith',
        },
      ],
      RSAItems: [
        {
          check: '',
          account_name: 'Ochigbo Simon',
          RSA_number: 'ABC-5998-23',
          RSA_name: 'ARM Pension',
        },
        {
          check: '',
          account_name: 'Ochigbo Simon',
          RSA_number: 'ABC-5998-23',
          RSA_name: 'ARM Pension',
        },
      ],
      taxItems: [
        {
          check: '',
          name: 'Payee',
          type: 'Tax',
          amount: '200,000',
        },
        {
          check: '',
          name: 'Pension Deduction',
          type: 'Tax',
          amount: '200,000',
        },
        {
          check: '',
          name: 'Pension Contribution',
          type: 'Tax',
          amount: '200,000',
        },
      ],
      deductionItems: [
        {
          check: '',
          name_of_deduction: 'Medical',
          description: 'Deduction for Medical',
          amount: '200,000',
        },
        {
          check: '',
          name_of_deduction: 'Dental',
          description: 'Deduction for Dental',
          amount: '200,000',
        },
        {
          check: '',
          name_of_deduction: 'Health Insurance',
          description: 'Deduction for Insurance',
          amount: '200,000',
        },
        {
          check: '',
          name_of_deduction: 'SLife Insurance',
          description: 'Deduction for Insurance',
          amount: '200,000',
        },
      ],
      items: [
        {
          check: '',
          name_of_payment: 'Salary October 2022',
          description: 'Salary Payment for 2022',
          amount: '200,000',
        },
        {
          check: '',
          name_of_payment: 'Salary October 2022',
          description: 'Salary Payment for 2022',
          amount: '200,000',
        },
        {
          check: '',
          name_of_payment: 'Salary October 2022',
          description: 'Salary Payment for 2022',
          amount: '200,000',
        },
        {
          check: '',
          name_of_payment: 'Salary October 2022',
          description: 'Salary Payment for 2022',
          amount: '200,000',
        },
      ],
    }
  },
  computed: {
    totalRows() {
      return this.pages * this.perPage
    },
  },
  watch: {
    '$route.query': {
      handler(e) {
        console.log(e.tab)
        if (e.tab === '3') {
          this.showBanks = true
        } else {
          this.showBanks = false
        }
      },
      immediate: true,
    },
  },

  methods: {
    addContract() {
      console.log('contract')
    },
    gotoPayroll(e) {
      //   this.$router.push('payroll/payroll')
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
</style>
