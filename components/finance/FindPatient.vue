<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <FinancePatientFilter @filter="filter(1, $event)" />
          </div>
        </div>
      </div>
      <div class="col-md-12">
       
          <TableComponent
            :fields="fields"
            :pages="pages"
            :items="items"
            :busy="busy"
            @page-changed="filter($event, currentFilter)"
            @row-clicked="goToProfile"
          />
        
      </div>
    </div>
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun'
export default {
  mixins: [TableFunc],
  data() {
    return {
      genders: ['male', 'female'],
      modalData: {},
      busy: false,
      currentFilter: {},
      age: {
        year: '',
        month: '',
        day: '',
      },
      newCount: 0,
      nurseCount: 0,
      fields: [
        {
          key: 'uhid',
          label: 'UHID',
        },
        {
          key: 'name',
          label: 'Name',
          formatter: (value, key, item) => {
            return (
              (item.salutation ? item.salutation : '') +
              ' ' +
              item.firstname +
              ' ' +
              item.lastname
            )
          },
        },
        {
          key: 'gender',
        },
        {
          key: 'date_of_birth',
        },
        {
          key: 'phone_number',
        },
        {
          key: 'deposit',
          label: 'Desp Bal',
          formatter: (value) => {
            return value
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
          },
        },
        {
          key: 'reserve',
          label: 'Reserved',
          formatter: (value) => {
            return value
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
          },
        },
      ],
    }
  },

  mounted(){
    // this.filter(1)
  },

  methods: {
    async filter(page = 1, e) {
      this.currentFilter = e
      try {
        this.busy = true
        const data = await this.$api.patient.searchPatient({ ...e, page })
        this.items = data.results
        this.pages = data.total_pages
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    goToProfile(e) {
      this.$router.push({
        name: 'dashboard-finance-uuid',
        params: {
          uuid: e.id,
        },
      })
    },
    goToLab(e) {
      this.modalData = e
      this.$bvModal.show('modal')
      console.log(e)
    },

    calcAge(e) {
      // **********calc year***********
      let presentDate = new Date().getFullYear()

      let yearOfBirth = e.substring(0, 4)
      let monthOfBirth = parseInt(e.substring(5, 7))
      let month = new Date().getMonth()

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
      } else if (monthOfBirth > month) {
        this.age.year++
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
        this.patient.age.month = 0
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

    showEncounterModal(e) {
      this.calcAge(e.date_of_birth)
      this.modalData.age = this.age
      this.modalData = e
      this.$bvModal.show('add_encounters')
    },

    showImagingModal(e) {
      this.modalData = e
      this.$bvModal.show('add_imaging')
    },
  },
}
</script>

<style>
</style>