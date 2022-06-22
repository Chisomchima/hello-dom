<template>
  <div class="">
    <div class="">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="">
          <p class="titletext mb-0">Payments and Deductions</p>
        </div>
      </div>

      <UtilsBaseCardTab>
        <UtilsCardTab title="Payments">
          <UtilsFilterComponent
            :disable-visualization="true"
            search-placeholder="Search"
            @search-input="slowStudent"
          >
            <template #besideFilterButton>
              <b-btn class="bg-primary ml-3" @click="createPayment">
                Create Payment</b-btn
              >
            </template>
            <template #default="{ visualization }">
              <Table
                v-if="visualization === 'list'"
                :items="paymentitems"
                :fields="paymentfields"
                :is-busy="isBusy"
                :filter="filter"
                :filter-on="filterOn"
                :pages="pages"
                :sort-direction="sortDirection"
                @single-row="showButton"
                @page-changed="getStudents"
                @edit="editStudent"
                @remove="removeStudent"
                @row-clicked="gotoStudent"
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
                      v-if="item.status === 'active'"
                      class="badge green-badge"
                    >
                      P</span
                    >
                    <span
                      v-else-if="item.status === 'closed'"
                      class="badge red-badge"
                    >
                      T</span
                    >
                    <div v-else-if="item.status === 'pending'">
                      <span class="badge green-badge"> P</span>
                      <span class="badge red-badge"> T</span>
                    </div>
                  </div>
                </template>
              </Table>
            </template>
          </UtilsFilterComponent>
        </UtilsCardTab>
        <UtilsCardTab title="Deduction">
          <UtilsFilterComponent
            :disable-visualization="true"
            search-placeholder="Search"
            @search-input="slowStudent"
          >
            <template #besideFilterButton>
              <b-btn class="bg-primary ml-3" @click="createDeduction">
                Create Deduction</b-btn
              >
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
                @row-clicked="gotoStudent"
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
                      v-if="item.status === 'active'"
                      class="badge green-badge"
                    >
                      P</span
                    >
                    <span
                      v-else-if="item.status === 'closed'"
                      class="badge red-badge"
                    >
                      T</span
                    >
                    <div v-else-if="item.status === 'pending'">
                      <span class="badge green-badge"> P</span>
                      <span class="badge red-badge"> T</span>
                    </div>
                  </div>
                </template>
              </Table>
            </template>
          </UtilsFilterComponent>
        </UtilsCardTab>
      </UtilsBaseCardTab>

      <ModalWrapper
        id="create-payment"
        title="Create Payment"
        submit-title="Save"
        variant="danger"
        @ok="handleCreatePayment"
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
                    <label> Name</label>
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
                <div class="col-12 p-r">
                  <div class="form-group">
                    <label>Description</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <input
                        type="text"
                        placeholder="Description"
                        class="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label>Payment Category</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <v-select
                        class="style-chooser1"
                        placeholder="Select Payment Method"
                        label="name"
                        :options="['first']"
                      >
                      </v-select>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label>Payment Type</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <v-select
                        class="style-chooser1"
                        placeholder="Select Payment Type"
                        label="name"
                        :options="['first']"
                      >
                      </v-select>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-8 ml-4 pl-1">
                  <div class="form-group row">
                    <b-form-checkbox
                      id="checkbox-1"
                      name="checkbox-1"
                      class="col"
                      value="accepted"
                      unchecked-value="not_accepted"
                    >
                      <span class="text-secondary"> Pensionable </span>
                    </b-form-checkbox>
                    <b-form-checkbox
                      id="checkbox-1"
                      class="col"
                      name="checkbox-1"
                      value="accepted"
                      unchecked-value="not_accepted"
                    >
                      <span class="text-secondary"> Taxable </span>
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </ModalWrapper>
      <ModalWrapper
        id="create-deduction"
        title="Create Deduction"
        submit-title="Save"
        variant="danger"
        @ok="handleCreatePayment"
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
                    <label> Name</label>
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
                <div class="col-12 p-r">
                  <div class="form-group">
                    <label>Description</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <input
                        type="text"
                        placeholder="Description"
                        class="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label>Deduction Category</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <v-select
                        class="style-chooser1"
                        placeholder="Select Payment Method"
                        label="name"
                        :options="['first']"
                      >
                      </v-select>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label>Deduction Type</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <v-select
                        class="style-chooser1"
                        placeholder="Select Payment Type"
                        label="name"
                        :options="['first']"
                      >
                      </v-select>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-8 ml-4 pl-1">
                  <div class="form-group row">
                    <b-form-checkbox
                      id="checkbox-1"
                      name="checkbox-1"
                      class="col"
                      value="accepted"
                      unchecked-value="not_accepted"
                    >
                      <span class="text-secondary"> Pensionable </span>
                    </b-form-checkbox>
                    <b-form-checkbox
                      id="checkbox-1"
                      class="col"
                      name="checkbox-1"
                      value="accepted"
                      unchecked-value="not_accepted"
                    >
                      <span class="text-secondary"> Taxable </span>
                    </b-form-checkbox>
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
      paymentfields: [
        // { key: 'check', sortable: false },

        { key: 'name', name: 'Contract Ref', sortable: true },
        { key: 'description', sortable: true },

        { key: 'payment_category', sortable: true },
        { key: 'payment_type', sortable: true },
        { key: 'status', sortable: true },
        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],
      fields: [
        // { key: 'check', sortable: false },

        { key: 'name', name: 'Contract Ref', sortable: true },
        { key: 'description', sortable: true },

        { key: 'deduction_category', sortable: true },
        { key: 'deduction_type', sortable: true },
        { key: 'status', sortable: true },
        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],
      paymentitems: [
        {
          check: '',
          name: 'Salary October 2022',
          description: 'Salary for october 2020',
          payment_category: 'Salary',
          payment_type: 'Full Time',
          status: 'active',
        },
        {
          check: '',
          name: 'Salary October 2022',
          description: 'Salary for october 2020',
          payment_category: 'Salary',
          payment_type: 'Full Time',
          status: 'closed',
        },
        {
          check: '',
          name: 'Salary October 2022',
          description: 'Salary for october 2020',
          payment_category: 'Salary',
          payment_type: 'Full Time',
          status: 'pending',
        },
      ],
      items: [
        {
          check: '',
          name: 'Medicals',
          description: 'Lorem Ipsum',
          deduction_category: 'Lorem Ipsum',
          deduction_type: 'Lorem Ipsum',
          status: 'active',
        },
        {
          check: '',
          name: 'Dentals',
          description: 'Lorem Ipsum',
          deduction_category: 'Lorem Ipsum',
          deduction_type: 'Lorem Ipsum',
          status: 'closed',
        },
        {
          check: '',
          name: 'Health Insurance',
          description: 'Lorem Ipsum',
          deduction_category: 'Lorem Ipsum',
          deduction_type: 'Lorem Ipsum',
          status: 'pending',
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
    handleCreatePayment() {
      if (this.$refs.runValidate) {
        this.$refs.runValidate.click()
      }
    },
    createPayment() {
      this.$bvModal.show('create-payment')
    },
    createDeduction() {
      this.$bvModal.show('create-deduction')
    },
    addContract() {
      console.log('contract')
    },
    slowStudent: debounce(function (e) {
      this.filterApi = e

      this.getStudents()
    }, 100),
  },
}
</script>

<style scoped>
.badge {
  width: auto;
}
.red-badge {
  background: #fffbeb;
}
.yellow-badge {
  background: #fffaf0;
}
.green-badge {
  background: #f3fbf6;
}
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
