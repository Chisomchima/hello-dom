<template>
  <div class="">
    <div class="">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="">
          <p class="titletext mb-0">Pension Settings</p>
        </div>
      </div>
      <b-overlay :show="!showOverlay" rounded="sm">
        <template #overlay> <div></div> </template>

        <div class="bg-white rounded py-2 mb-4">
          <div class="border-bottom">
            <div class="d-flex justify-content-between px-5 mb-2">
              <div class="d-flex flex-row edit-pension">
                Enable Pension
                <ToggleSwitchButton
                  :value="toggle"
                  class="ml-2"
                  @change="togglePublish($event)"
                />
              </div>
              <div>
                <b-btn class="bg-primary ml-3" @click="createPayment">
                  Edit
                </b-btn>
              </div>
            </div>
          </div>
          <div class="px-5 pt-3 form-group">
            <div class="col-6">
              <b-form inline>
                <span class="text-secondary mr-4">
                  Pension Deduction Percentage(%)</span
                >
                <b-form-input disbaled placeholder="10"></b-form-input>
              </b-form>
            </div>
            <div class="col-6 mt-3">
              <b-form inline>
                <span class="text-secondary mr-2">
                  Pension Contribution Percentage(%)</span
                >
                <b-form-input disbaled placeholder="10"></b-form-input>
              </b-form>
            </div>
          </div>
        </div>

        <UtilsFilterComponent
          :disable-visualization="true"
          search-placeholder="Search"
          @search-input="slowStudent"
        >
          <template #besideFilterButton>
            <b-btn class="bg-primary ml-3" @click="createPayment">
              ADD PFA</b-btn
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

        <ModalWrapper
          id="create-payment"
          title="Add PFA"
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
                      <label>Address</label>
                      <ValidationProviderWrapper :rules="['required']">
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="3"
                          placeholder="Address"
                          class="form-control ng-untouched ng-pristine ng-valid"
                        ></textarea>
                      </ValidationProviderWrapper>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label>Phone Number</label>
                      <ValidationProviderWrapper :rules="['required']">
                        <input
                          _ngcontent-dpg-c305=""
                          type="text"
                          placeholder=" 08032344343"
                          class="form-control ng-untouched ng-pristine ng-valid"
                        />
                      </ValidationProviderWrapper>
                    </div>
                  </div>
                </div>
              </ValidationObserver>
            </div>
          </div>
        </ModalWrapper>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data() {
    return {
      showOverlay: true,
      toggle: true,
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

        { key: 'name', name: 'Contract Ref', sortable: true },
        { key: 'address', sortable: true },

        { key: 'phone_number', sortable: true },
        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],

      items: [
        {
          check: '',
          name: 'ARM Pension',
          address:
            'ARM Pension, 34, Sokode Cresent, Wuse Zone 5, Abuja, FCT, Nigeria',
          phone_number: '0802323443',
          status: 'active',
        },
        {
          check: '',
          name: 'ARM Pension',

          address:
            'ARM Pension, 34, Sokode Cresent, Wuse Zone 5, Abuja, FCT, Nigeria',
          phone_number: '0802323443',
          status: 'active',
        },
        {
          check: '',
          name: 'ARM Pension',

          address:
            'ARM Pension, 34, Sokode Cresent, Wuse Zone 5, Abuja, FCT, Nigeria',
          phone_number: '0802323443',
          status: 'active',
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
    togglePublish(e) {
      console.log(e)
      this.showOverlay = e
    },
    handleCreatePayment() {
      if (this.$refs.runValidate) {
        this.$refs.runValidate.click()
      }
    },
    createPayment() {
      this.$bvModal.show('create-payment')
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
.edit-pension {
  z-index: 11;
}
</style>
