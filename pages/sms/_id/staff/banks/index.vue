<template>
  <div class="">
    <div class="">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="">
          <p class="titletext mb-0">Banks</p>
        </div>

        <div>
          <b-btn class="bg-primary" @click="addContract"> Add Bank</b-btn>
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
            @row-clicked="gotoStudent"
          >
            <template #action="{ data }">
              <div>
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
                <span v-if="item.status === 'active'" class="badge green-badge">
                  Active</span
                >
                <span
                  v-else-if="item.status === 'closed'"
                  class="badge red-badge"
                >
                  Closed</span
                >
                <span
                  v-else-if="item.status === 'pending'"
                  class="badge yellow-badge"
                >
                  Pending</span
                >
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
      fields: [
        // { key: 'check', sortable: false },

        { key: 'name', sortable: true },
        { key: 'sort_code', sortable: true },

        { key: 'phone_number', sortable: true },
        { key: 'action', label: '', sortable: false },

        // { key: 'house_color', sortable: true },
        // { key: 'three_dots_student', label: '', sortable: false },
      ],

      items: [
        {
          check: '',
          sort_code: '1234',
          name: 'United Bank  Of Africa',
          phone_number: '08032344343',
        },
        {
          check: '',
          sort_code: '1234',
          name: 'United Bank  Of Africa',
          phone_number: '08032344343',
        },
        {
          check: '',
          sort_code: '1234',
          name: 'United Bank  Of Africa',
          phone_number: '08032344343',
        },
        {
          check: '',
          sort_code: '1234',
          name: 'United Bank  Of Africa',
          phone_number: '08032344343',
        },
        {
          check: '',
          sort_code: '1234',
          name: 'United Bank  Of Africa',
          phone_number: '08032344343',
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
</style>
