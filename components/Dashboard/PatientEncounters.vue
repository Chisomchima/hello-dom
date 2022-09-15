<template>
  <div>
    <UtilsFilterComponent disable-visualization disable-pagination>
      <template #besideFilterButton>
        <BaseButton class="btn-outline-primary" @click="$bvModal.show('add_encounters')"
          >New Encounter</BaseButton
        >
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
    <DashboardModalAddEncounter :age="age" :data="data" @refresh="pageChange()" />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
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
      fields: [
        {
          key: 'encounter_datetime',
          label: 'Date&Time',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
          },
        },
        {
          key: 'encounter_id',
        },
        {
          key: 'encounter_type',
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
          key: 'encounter_datetime',
          label:'Date&Time',
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
          },
        },
        {
          key: 'provider',
          formatter: (val) => {
            if (val.first_name || val.last_name) {
              return val.first_name + ' ' + val.last_name
            }
            else {
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
    await this.pageChange(1)
    
  },
  methods: {
    async pageChange(page = 1) {
    this.$nuxt.refresh()  
    this.calcAge(this.data.date_of_birth)
      try {
        this.busy = true
        const data = await this.$api.encounter.getPatient(
          this.$route.params.uuid,
          page
        )
        console.log(data)
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
      calcAge(e) {
        // **********calc year***********
        let presentDate = new Date().getFullYear();
        let yearOfBirth = e.substring(0, 4);
        let month = new Date().getMonth();
        let monthOfBirth = parseInt(e.substring(5, 7));

        let diff = presentDate - yearOfBirth;
        let x = parseInt(diff);
        if (x === 0) {
            this.age.year = 0;
            this.age.month = 0;
        } else {
            this.age.year = x;
        }

        if (monthOfBirth < month) {
            this.age.year;
        } else {
            if (this.age.year === 0) {
                this.age.year;
            } else {
                this.age.year--;
            }
        }

        // **************calc month***********
        let tempMonth;
       
        // tempMonth = monthOfBirth - month
        if (presentDate === yearOfBirth) {
            this.age.month = 0;
        } else {
            tempMonth = 12 - monthOfBirth;
        }

        if (monthOfBirth <= month) {
            this.age.month = month - monthOfBirth;
            // this.patient.age.month + 1;
        } else if (month + 1 === monthOfBirth) {
            this.age.month = 0;
        } else {
            this.age.month = tempMonth + month;
            // this.patient.age.month + 1;
        }

        // **************calc day**************
        let day = new Date().getDate();
        let dayOfBirth = e.substring(8, 10);
        // this.patient.age.day = new Date().getDate();

        if (day > dayOfBirth) {
            this.age.day = day - dayOfBirth;
        } else if (day === dayOfBirth) {
            this.age.day = 0;
        } else {
            this.age.day = day;
        }

        // *********************************
    },
  },
}
</script>

<style lang="scss" scoped>
</style>