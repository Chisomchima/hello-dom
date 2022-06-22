<template>
  <div class="">
    <div class="">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="">
          <p class="titletext mb-0">Payroll</p>
        </div>

        <div>
          <b-btn class="bg-primary" @click="addPayroll"> Add payroll</b-btn>
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
            @row-clicked="gotoPayroll"
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
      <ModalWrapper
        id="add-payroll"
        title="Create Payroll"
        submit-title="Save"
        variant="danger"
        @ok="handleCreatePayroll"
      >
        <div class="px-3">
          <div>
            <ValidationObserver v-slot="{ validate }">
              <div
                id="runValidate"
                ref="runValidate"
                type="button"
                @click="validate"
              ></div>
              <div class="row">
                <div class="col-12 p-r">
                  <div class="form-group">
                    <label>Payroll Name</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <input
                        _ngcontent-dpg-c305=""
                        type="text"
                        placeholder=" Name"
                        class="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-6">
                  <label class="form-control-label">Date from</label>
                  <div class="">
                    <v-date-picker
                      :model-config="modelConfig"
                      v-model="date_from"
                      mode="date"
                    >
                      <template #default="{ togglePopover }">
                        <span @click="togglePopover()">
                          <input
                            v-model="date_from"
                            class="form-control form-control-lg"
                            placeholder="2022-02-01"
                          />
                        </span>
                      </template>
                    </v-date-picker>
                  </div>
                </div>
                <div class="col-6">
                  <label class="form-control-label">Date to</label>
                  <div class="">
                    <v-date-picker
                      :model-config="modelConfig"
                      v-model="date_to"
                      mode="date"
                    >
                      <template #default="{ togglePopover }">
                        <span @click="togglePopover()">
                          <input
                            v-model="date_to"
                            class="form-control form-control-lg"
                            placeholder="2022-02-01"
                          />
                        </span>
                      </template>
                    </v-date-picker>
                  </div>
                </div>
                <div class="col-12 p-r">
                  <div class="form-group">
                    <label>Description</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <textarea
                        name=""
                        class="form-control"
                        placeholder="Description"
                        id=""
                        cols="30"
                        rows="14"
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

export default {
  data() {
    return {
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

        { key: 'name', sortable: true },
        { key: 'date_from', sortable: true },
        { key: 'date_to', sortable: true },
        { key: 'no_of_staff', sortable: true },
        { key: 'net_payable', sortable: true },

        { key: 'status', sortable: true },
        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],

      items: [
        {
          check: '',
          net_payable: '2,000,000,000',
          name: 'Salary October 2022',
          date_from: '2022-12-01',
          no_of_staff: 10,
          date_to: '2022-12-01',
          status: 'approved',
        },
        {
          check: '',
          net_payable: '2,000,000',
          name: 'Salary September 2022',

          no_of_staff: 60,

          contract_Type: 'Permanent',
          date_from: '2022-12-01',
          date_to: '2022-12-01',
          status: 'draft',
        },
        {
          check: '',
          net_payable: '2,000',
          name: 'Salary August 2022',

          no_of_staff: 40,

          contract_Type: 'Permanent',
          date_from: '2022-12-01',
          date_to: '2022-12-01',
          status: 'completed',
        },
        {
          check: '',
          net_payable: '2,000,000,000',
          no_of_staff: 20,
          name: 'Salary July 2022',

          contract_Type: 'Permanent',
          date_from: '2022-12-01',
          date_to: '2022-12-01',
          status: 'processed',
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
    handleCreatePayroll() {
      if (this.$refs.runValidate) {
        this.$refs.runValidate.click()
      }
    },
    addPayroll() {
      this.$bvModal.show('add-payroll')
    },

    gotoPayroll(e) {
      console.log(e)
      this.$router.push('payroll/payroll')
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
label {
  font-size: 12px;
  color: rgb(122, 120, 120);
}
</style>
