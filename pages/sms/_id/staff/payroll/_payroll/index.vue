<template>
  <div class="">
    <div class="">
      <UtilsHeaderCard
        extraClasses="col-xl-3"
        :enableAction="true"
        :title="data.title"
        :data="data"
        :display-key="[
          'no_of_employee',
          'net_payable',
          'start_date',
          'pension_deduction',
          'status',
          'tax_deduction',
          'end_date',
          'pension_contribution',
        ]"
      >
        <template #status :prop="data">
          <span
            v-if="data.status === 'active'"
            class="badge green-badge text-capitalize"
          >
            {{ data.status }}
          </span>
          <span v-else>
            {{ data.status }}
          </span>
        </template>
      </UtilsHeaderCard>

      <UtilsFilterComponent
        :disable-visualization="true"
        search-placeholder="Search"
        @search-input="slowStudent"
      >
        <template #top>
          <div class="border-bottom">
            <h3 class="my-3 ml-4">Staff</h3>
          </div>
        </template>
        <template #besideFilterButton>
          <div class="ml-2">
            <b-btn class="bg-primary" @click="addContract"> Add Payment</b-btn>
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
            @page-changed="getStudents"
            @edit="editStudent"
            @remove="removeStudent"
            @row-clicked="gotoStaff"
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
                  <b-dropdown-item :key="index" href="#" class=""
                    >action</b-dropdown-item
                  >
                </b-dropdown>
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
        no_of_employee: 10,
        net_payable: '2,000,000,000',
        start_date: '25/10/2022',
        pension_deduction: '200,000',
        status: 'active',
        tax_deduction: '200,000',
        end_date: '25/10/2022',
        pension_contribution: '20,000',
      },
      fields: [
        // { key: 'check', sortable: false },

        { key: 'name', sortable: true },
        { key: 'contract', sortable: true },
        { key: 'payment', sortable: true },
        { key: 'deduction', sortable: true },
        { key: 'pension', sortable: true },

        { key: 'net_pay', sortable: true },
        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],

      items: [
        {
          check: '',
          net_pay: '2,000,000',
          name: 'Ochigbo Simon',
          contract: 'Firm Fixed Price',
          payment: '200,000',
          deduction: '1000',
          pension: '1000',
        },
        {
          check: '',
          net_pay: '3,000,000',
          name: 'James David',
          contract: 'Permanent',
          payment: '200,000',
          deduction: '1000',
          pension: '1000',
        },
        {
          check: '',
          net_pay: '2,000,000',
          name: 'Ochigbo Ade',
          contract: 'Casual',
          payment: '200,000',
          deduction: '1000',
          pension: '1000',
        },
        {
          check: '',
          net_pay: '2,000,000',
          name: 'John Simon',
          contract: 'Zero Hour',
          payment: '200,000',
          deduction: '1000',
          pension: '1000',
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
    currentPage() {
      console.log(this.currentPage)
    },
  },

  methods: {
    addContract() {
      console.log('contract')
    },
    gotoStaff(e) {
      console.log(e)
      this.$router.push({
        path: `payroll/${e.name}`,
        query: { _name: e.name },
      })
    },
    slowStudent: debounce(function (e) {
      this.filterApi = e

      this.getStudents()
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
