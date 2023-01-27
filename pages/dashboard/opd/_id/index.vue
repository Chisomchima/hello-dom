<template>
  <div>
    <div v-if="isLoading" class="skeleton mt-3">
      <SkeletonLoader />
    </div>

    <div class="text-12 border-radius mb-3" v-else>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <BackwardNavigation />
        <div>
          <BaseButton v-if="
            consultationData.acknowledged_at != null &&
            consultationData.status != 'DS'
          " @click="signAndCloseEnc" class="btn-success btn-sm" :disabled="
  consultationData
    ? consultationData.bill.cleared_status === 'CLEARED'
      ? false
      : true
    : ''
">
            Sign
          </BaseButton>
          <BaseButton @click="acknowledgeEnc" v-if="
            (consultationData.status === 'NS' ||
              consultationData.status === 'New') &&
            consultationData.acknowledged_at === null
          " class="btn-success btn-sm" :disabled="
  consultationData
    ? consultationData.bill.cleared_status === 'CLEARED'
      ? false
      : true
    : ''
">
            Acknowledge
          </BaseButton>
        </div>
      </div>
      <DashboardModalDoctorSign @refresh="showSignature" />
      <EncountersHeaderCard :consultationData="consultationData" />
      <TabView @tab-click="showMe" class="tabview-custom">
        <TabPanel class="dark-panel">
          <template #header>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-clipboard2-pulse" viewBox="0 0 16 16">
              <path
                d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
              <path
                d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z" />
              <path
                d="M9.979 5.356a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.926-.08L4.69 10H4.5a.5.5 0 0 0 0 1H5a.5.5 0 0 0 .447-.276l.936-1.873 1.138 3.793a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h.5a.5.5 0 0 0 0-1h-.128L9.979 5.356Z" />
            </svg>
            <span class="ml-2">Consultation</span>
          </template>
          <!-- <div v-if="activeIndex === 0">
            <EncountersConsultation :consultationData="consultationData" @refreshMe="refreshMe" />
          </div> -->
          <EncountersConsultation :consultationData="consultationData" @refreshMe="refreshMe" />
        </TabPanel>

        <TabPanel>
          <template #header>
            <i class="fas fa-heartbeat"></i>
            <span class="ml-2">Vitals</span>
          </template>
          <div v-if="activeIndex === 1">
            <div>
              <EncountersVitals :consultationData="consultationData" />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <template #header>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
              <path fill="currentColor"
                d="M19 21h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3zm-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2z" />
              <path fill="currentColor"
                d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z" />
            </svg>
            <span class="ml-2">Medical Records</span>
          </template>
          <div v-if="activeIndex === 2">
            <EncountersMedicalRecord :consultationData="consultationData" />
          </div>
        </TabPanel>

        <TabPanel>
          <template #header>

            <i class="fas fa-vial"></i>
            <span class="ml-2">Lab Orders</span>
          </template>
          <div v-if="activeIndex === 3">
            <EncountersLabOrders :patientData="consultationData.patient" />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="fas fa-x-ray"></i>
            <span class="ml-2">Imaging</span>
          </template>
          <div v-if="activeIndex === 4">
            <DashboardPatientImaging :data="consultationData.patient" />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="fas fa-pills"></i>
            <span class="ml-2">Prescriptions</span>
          </template>
          <div v-if="activeIndex === 5">
            <DashboardPatientPrescription :show="true" :data="consultationData.patient" />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="far fa-file-alt"></i>
            <span class="ml-2">Documents</span>
          </template>
          <div v-if="activeIndex === 6">
            <DashboardPatientDocument :show="!true" :data="consultationData.patient" />
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="fas fa-user-nurse"></i>
            <span class="ml-2">Nursing Orders</span>
          </template>
          <div v-if="activeIndex === 7">
            <DashboardPatientTasks :data="consultationData.patient" />
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import modalMsgBox from '~/mixins/modalMsgBox'
export default {
  layout: 'dashboard',
  mixins: [modalMsgBox],
  data() {
    return {
      items: [],
      isLoading: false,
      patientData: {},
      activeIndex: 0,
      consultationData: {},
      clinic: '',
      department: '',
      encounter_time: '',
      age: {
        year: '',
        month: '',
        day: '',
      },
    }
  },
  created() {
    this.getPatientRecord()
  },
  computed: {
    dateSigned() {
      return DateTime.fromISO(this.consultationData.signed_date).toLocaleString(
        DateTime.DATETIME_SHORT
      )
    },

  },
  methods: {
    showSignature() {
      this.getPatientRecord()
    },

    refreshMe() {
      this.getPatientRecord()
    },
    showMe(e) {
      switch (e.index) {
        case 0:
          this.activeIndex = 0
          break;
        case 1:
          this.activeIndex = 1
          break;
        case 2:
          this.activeIndex = 2
          break;
        case 3:
          this.activeIndex = 3
          break;
        case 4:
          this.activeIndex = 4
          break;
        case 5:
          this.activeIndex = 5
          break;
        case 6:
          this.activeIndex = 6
          break;
        case 7:
          this.activeIndex = 7
          break;
        default:
          this.activeIndex = 0
      }
    },

    async acknowledgeEnc() {
      const result = await this.showConfirmMessageBox(
        'Do you want to acknowledge this encounter ?'
      )
      try {
        if (result) {
          let response = await this.$api.encounter.acknowledgeEncounter(
            this.consultationData.id
          )
          if (response) {
            this.getPatientRecord()
          }
          this.$toast({
            type: 'success',
            text: `Acknowleged`,
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

    signAndCloseEnc() {
      this.$bvModal.show('sign')
    },
    async getPatientRecord() {
      try {
        this.isLoading = true
        let response = await this.$axios.$get(
          `encounters/${this.$route.params.id}/`
        )
        this.consultationData = response
        this.clinic = response.clinic.name
        this.department = response.clinic.name
          ? response.clinic.Department.name
          : 'nil'
        this.patientData = response.patient
        let time = this.consultationData.encounter_datetime
        let y = new Date(time).toLocaleDateString()

        let z = new Date(time).toTimeString().substring(0, 5)
        this.encounter_time = y + ', ' + z
        // this.calcAge(this.patientData.date_of_birth)
        this.isLoading = false
      } catch {
      } finally {
        this.isLoading = false
        // this.calcAge()
      }
    },
    async updateStatus() {
      this.consultationData.status = 'NS'
      try {
        let response = await this.$axios.$put(
          `encounters/encounter/${this.consultationData.id}/`,
          this.consultationData
        )
      } catch (error) {
      } finally {
      }
    },
    convDate(x) {
      return
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
  },
}
</script>

<style lang="scss" >
.tabview-custom {
  .headings {
    color: $COLOR_THREE;
  }

  .tabview-custom svg,
  .tabview-custom i {
    color: $COLOR_THREE;
  }

  .p-tabview p {
    line-height: 1.5;
    margin: 0;
  }
}

.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #ffffff;
  border-color: $COLOR_THREE !important;
  color: $COLOR_THREE;
}

.p-tabview .p-tabview-nav .p-tabview-nav-content .p-tabview-nav-link .p-tabview-title {
  font-size: 14px !important;
}

li {
  cursor: pointer;
  border: 0.5px solid #fff;
}

.signal:hover {
  color: $COLOR_THREE;
}
</style>

