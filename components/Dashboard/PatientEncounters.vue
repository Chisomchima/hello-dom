<template>
  <div>
    <UtilsFilterComponent
      :disableSearch="true"
      disable-visualization
      disable-pagination
    >
      <template #besideFilterButton>
        <BaseButton
          class="btn-outline-primary"
          @click="$bvModal.show('add_encounters')"
          >New Encounter</BaseButton
        >
      </template>
      <template #beforeActions>
           <div>
          <button
            v-b-toggle.sidebar-backdrop1
            class="btn btn-sm btn-outline-secondary"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M96 197.333h320v32H96zm72 101.334h176v32H168zM216 400h80v32h-80zM48 96h416v32H48z"
                />
              </svg>
            </span>
          </button>
          <b-sidebar
            id="sidebar-backdrop1"
            title="Sidebar with backdrop"
            :backdrop-variant="'dark'"
            backdrop
            shadow
            right
          >
            <div class="p-4">
              <div class="">
                <!-- <p class="mb-0 text-20">Date range</p> -->
                <div class="col-md-12">
                  <span class="text-12 text-grey">Search</span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search by name"
                    v-model="filter.name"
                  />
                </div>
              </div>
              <div class="">
                <!-- <p class="mb-0 text-20">Date range</p> -->
                <div class="col-md-12">
                  <span class="text-12 text-grey">Date from:</span>
                  <input
                    type="date"
                    class="form-control"
                    :max="maxDate"
                    v-model="filter.dateFrom"
                  />
                </div>
                <div class="col-md-12">
                  <span class="text-12 text-grey">Date to:</span>
                  <input
                    type="date"
                    class="form-control"
                    :min="minDate"
                    v-model="filter.dateTo"
                  />
                </div>
              </div>

              <div class="col-md-12">
                <span class="text-12 text-grey">Department</span>
                <VSelect
                  style="font-size: 13px"
                  label="name"
                  
                  v-model="filter.department"
                  :placeholder="'Department'"
                  :reduce="(option) => option.id"
                  multiple
                  taggable
                  :options="filterDept"
                >
                </VSelect>
              </div>
              <div class="col-md-12">
                <span class="text-12 text-grey">Clinic</span>
                <VSelect
                  style="font-size: 13px"
                  label="name"
                  
                  v-model="filter.clinic"
                  :placeholder="'Clinic'"
                  :reduce="(option) => option.id"
                  multiple
                  taggable
                  :options="filterClinic"
                >
                </VSelect>
              </div>
            </div>
          </b-sidebar>
        </div>
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange"
          @row-clicked="onRowClicked"
        >
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <DashboardModalAddEncounter
      :age="age"
      :data="data"
      @refresh="pageChange()"
    />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { debounce } from 'lodash'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      age: {
        year: '',
        month: '',
        day: '',
      },
      filter: {
        size: 10,
        name: '',
        department: [],
        clinic: [],
        dateFrom: '',
        dateTo: '',
      },
      filterDept: [],
      filterClinic: [],
      options: [],
      placeholder: '',
      fields: [
        {
          key: 'encounter_datetime',
          label: 'Date&Time',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
        },
        {
          key: 'encounter_id',
        },
       
        {
          key: 'clinic.Department.name',
          label: 'Department',
        },
        
        {
          key: 'clinic.name',
          label: 'Clinic',
        },

         {
          key: 'encounter_type',
        },
       
        {
          key: 'provider',
          formatter: (val) => {
            if (val.first_name || val.last_name) {
              return val.first_name + ' ' + val.last_name
            } else {
              return ''
            }
          },
        },
        {
          key: 'status',
        },
      ],
    }
  },
  async mounted() {
    await this.pageChange(1, this.filter)
    this.getDepartment()
    this.getClinics()
  },
  watch: {
    'filter.clinic'() {
      if (this.filter.clinic !== null) {
        this.pageChange(1, this.filter)
      }
    },
    'filter.department'() {
      if (this.filter.department !== null) {
        this.pageChange(1, this.filter)
      }
    },
   // 'filter.dateFrom'() {
    //   this.getLabOrders(1, this.filter)
    // },
    'filter.dateTo'() {
      if(this.filter.dateFrom !== ''){
        this.pageChange(1, this.filter)
      }
    },
     'filter.name': {
      handler: debounce(function () {
        this.pageChange(1, this.filter)
      }, 1000),
      deep: true,
    },
  },
  computed: {
    maxDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
    minDate() {
      let today = new Date()
      today = today.toISOString()
      let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
      console.log(x)
      return x
    },
  },
  methods: {
    async pageChange(
      page = 1,
      e = {
        size: 10,
        dateFrom: '',
        dateTo: '',
        page: 1,
      }
    ) {
      const newFilterObject = {
        ...e,
        page: page,
      }
      this.calcAge(this.data.date_of_birth)
      try {
        this.busy = true
        const data = await this.$api.encounter.getPatient(
          this.$route.params.uuid,
          newFilterObject
        )
        this.items = data.results
        this.pages = data.total_pages
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    onRowClicked(e) {
      this.$router.push({
        name: 'dashboard-opd-id',
        params: {
          id: e.id,
        },
      })
    },
    setOption(e) {
      console.log(e)
      this.placeholder = e
      if (e === 'Departments') {
        this.filter.by = 'department'
        this.getDepartment()
      }
      if (e === 'Clinics') {
        this.filter.by = 'clinic'
        this.getClinics()
      }
    },
    async getDepartment() {
      try {
        const { results } = await this.$api.core.getDepartments({
          size: 1000,
        })
        this.filterDept = results
      } catch (error) {
        console.log(error)
      }
    },
    async getClinics() {
      try {
        const { results } = await this.$api.core.getClinincs({
          size: 1000,
        })
        this.filterClinic = results
      } catch (error) {
        console.log(error)
      }
    },
    calcAge(e) {
      // **********calc year***********
      let presentDate = new Date().getFullYear()
      let yearOfBirth = e.substring(0, 4)
      let month = new Date().getMonth()
      let monthOfBirth = parseInt(e.substring(5, 7))

      let diff = presentDate - yearOfBirth
      let x = parseInt(diff)
      if (x === 0) {
        this.age.year = 0
        this.age.month = 0
      } else {
        this.age.year = x
      }

      if (monthOfBirth < month) {
        this.age.year
      } else {
        if (this.age.year === 0) {
          this.age.year
        } else {
          this.age.year--
        }
      }

      // **************calc month***********
      let tempMonth

      // tempMonth = monthOfBirth - month
      if (presentDate === yearOfBirth) {
        this.age.month = 0
      } else {
        tempMonth = 12 - monthOfBirth
      }

      if (monthOfBirth <= month) {
        this.age.month = month - monthOfBirth
        // this.patient.age.month + 1;
      } else if (month + 1 === monthOfBirth) {
        this.age.month = 0
      } else {
        this.age.month = tempMonth + month
        // this.patient.age.month + 1;
      }

      // **************calc day**************
      let day = new Date().getDate()
      let dayOfBirth = e.substring(8, 10)
      // this.patient.age.day = new Date().getDate();

      if (day > dayOfBirth) {
        this.age.day = day - dayOfBirth
      } else if (day === dayOfBirth) {
        this.age.day = 0
      } else {
        this.age.day = day
      }

      // *********************************
    },
  },
}
</script>

<style lang="scss" scoped>
.width {
  width: 10rem;
  height: 38px;
}
</style>