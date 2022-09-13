<template>
  <div>
    <div v-if="isLoading" class="skeleton">
      <b-row>
        <b-col cols="12" class="mt-5">
          <b-skeleton animation="wave" width="85%"></b-skeleton>
          <b-skeleton animation="wave" width="55%"></b-skeleton>
          <b-skeleton animation="wave" width="70%"></b-skeleton>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="">
          <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
        </b-col>
      </b-row>
    </div>

    <div class="bg-light text-12 border-radius mb-3" v-else>
      <div
        class="d-flex justify-content-between align-items-center mb-2 bg-light"
      >
        <BackwardNavigation />
        <div>
          
          <BaseButton
            v-if="
              consultationData.status === 'DS' 
            "
            @click="signAndCloseEnc"
            class="btn-success btn-sm"
            :disabled="
              consultationData
                ? consultationData.bill.cleared_status === 'CLEARED'
                  ? false
                  : true
                : ''
            "
          >
            Sign
          </BaseButton>
          <BaseButton
            v-if="
              consultationData.status === 'NS' ||
              consultationData.status === 'NEW' 
            "
            
            class="btn-success btn-sm"
            :disabled="
              consultationData
                ? consultationData.bill.cleared_status === 'CLEARED'
                  ? false
                  : true
                : ''
            "
          >
            Acknowledge
          </BaseButton>
        </div>
      </div>
      <DashboardModalDoctorSign @refresh="showSignature" />
      <div
        style="border-radius: 4px"
        class="
          p-3
          bg-white
          d-flex
          flex-wrap
          align-items-center
          justify-content-between
          pt-3
          mb-3
          shadow-sm
        "
      >
        <div class="col-md-7 px-0 text-grey text-14 col-sm-7 col-lg-7">
          <div class="row px-0 ">
            <div class="col-md-6 col-sm-6 col-lg-6">
              <b>ENC-ID:</b>
              {{
                consultationData.encounter_id
                  ? consultationData.encounter_id
                  : 'nil'
              }}
            </div>
            <div class="col-md-6 col-sm-6 col-lg-6">
              <b>Date:</b> {{ encounter_time }}
            </div>
          </div>
          <div class="row px-0">
            <div class="col-md-6 col-sm-6 col-lg-6">
              <b>Department:</b>
              {{ department ? department : 'nil' }}
            </div>
            <div class="col-md-6 col-sm-6 col-lg-6">
              <b>Clinic:</b>
              {{ clinic ? clinic : 'nil' }}
            </div>
            <div class="col-md-6 col-sm-6 col-lg-6">
              <b>Provider:</b>
              {{ consultationData.provider.name ? consultationData.provider.name : '' }}
            </div>
          </div>
          <div
            style="
              height: 50px;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-all;
            "
            class="text-truncate col-md-12 px-0 pt-3 col-sm-12 col-lg-11"
          >
            <b>Chief Complaint:</b> {{ consultationData.chief_complaint }}
          </div>
          <div v-if="consultationData.signed_date" class="col-md-12 col-sm-12">
            <b>Signed by:</b>
            {{
              consultationData.provider.first_name +
              ' ' +
              consultationData.provider.last_name
            }}, {{ dateSigned }}
          </div>
        </div>
        <div
          class="
            d-flex
            justify-content-between
            col-md-5 col-sm-5 col-lg-5
            align-items-center
          "
        >
          <div class="px-2">
            <div class="px-2">
              <p
                @click="gotoPatientProfile"
                class="text-14 mb-0 text-grey point signal"
              >
                <b>UHID:</b> {{ patientData.uhid }}
              </p>
            </div>
            <div class="px-2">
              <p class="text-14 mb-0 text-grey text-capitalize">
                <b>Name:</b>
                {{
                  patientData.firstname
                    ? patientData.firstname + ' ' + patientData.lastname
                    : 'nil'
                }}
              </p>
            </div>
            <div class="px-2">
              <p class="text-14 mb-0 text-grey">
                <b>D.O.B:</b> {{ patientData.date_of_birth }}
              </p>
            </div>
            <div class="px-2">
              <p class="text-14 mb-0 text-grey">
                <b>Age(Y-M-D):</b> {{ this.age.year }} - {{ this.age.month }} -
                {{ this.age.day }}
              </p>
            </div>
            <div class="px-2">
              <p class="text-14 mb-0 text-grey">
                <b>Gender:</b>
                {{ patientData.gender ? patientData.gender : 'nil' }}
              </p>
            </div>
            <div class="px-2">
              <p class="text-14 mb-0 text-grey">
                <b>Payer:</b>
                {{ patientData.payer ? patientData.payer : ' nil ' }}
              </p>
            </div>
          </div>

          <div class="px-0">
            <div id="button-2" class="theme-color-text">
              <b-avatar
                square
                variant="#e7f0f8"
                style="border: 2px solid #f5f6f7"
                size="7rem"
              />

              <b-tooltip
                target="button-2"
                variant="secondary"
                placement="bottom"
              >
                <div class="d-block text-14 text-white">
                  <!-- Baby: {{ patientData.is_baby ? "Yes" : "No" }}
                  <br /> -->
                  <!-- Identity: {{ patientData.identity }}-{{
                    patientData.identity.no_
                  }} -->
                  {{ patientData.salutation ? patientData.salutation : 'Mr.' }}

                  {{
                    patientData.firstname
                      ? patientData.firstname +
                        ' ' +
                        patientData.middlename +
                        ' ' +
                        patientData.lastname
                      : 'Anonymous'
                  }}
                  <br />
                  Gender: {{ patientData.gender ? patientData.gender : 'Male' }}
                  <br />
                  Phone No:
                  {{
                    patientData.phone_number ? patientData.phone_number : 'nil'
                  }}
                  <br />
                  Nationality:
                  {{
                    patientData.nationality
                      ? patientData.nationality
                      : 'Nigerian'
                  }}
                  <br />
                  Marital Status:
                  {{
                    patientData.marital_status
                      ? patientData.marital_status
                      : 'Single'
                  }}
                  <br />
                  Religion:
                  {{ patientData.religion ? patientData.religion : 'nil' }}
                  <br />
                  L.G.A: {{ patientData.lga ? patientData.lga : 'nil' }}
                </div>
              </b-tooltip>
            </div>
          </div>
        </div>
      </div>
      <TabView class="tabview-custom">
        <TabPanel class="dark-panel">
          <template #header>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-clipboard2-pulse"
              viewBox="0 0 16 16"
            >
              <path
                d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"
              />
              <path
                d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"
              />
              <path
                d="M9.979 5.356a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.926-.08L4.69 10H4.5a.5.5 0 0 0 0 1H5a.5.5 0 0 0 .447-.276l.936-1.873 1.138 3.793a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h.5a.5.5 0 0 0 0-1h-.128L9.979 5.356Z"
              />
            </svg>
            <span class="ml-2">Consultation</span>
          </template>
          <EncountersConsultation
            :consultationData="consultationData"
            @refreshMe="refreshMe"
          />
        </TabPanel>

        <TabPanel>
          <template #header>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-activity"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
              />
            </svg>
            <span class="ml-2">Medical Records</span>
          </template>
          <EncountersMedicalRecord :consultationData="consultationData" />
        </TabPanel>
        <TabPanel>
          <template #header>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="20"
              height="20"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M19 21h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3zm-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2z"
              />
              <path
                fill="currentColor"
                d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"
              />
            </svg>
            <span class="ml-2">Lab Orders</span>
          </template>
          <EncountersLabOrders :patientData="patientData" />
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="fas fa-x-ray"></i>
            <span class="ml-2">Imaging</span>
          </template>
          <DashboardPatientImaging :data="patientData" />
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-user"></i>
            <span class="ml-2">Previous Medicine</span>
          </template>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import calcAge from '~/mixins/calcAge'
export default {
  layout: 'dashboard',
  mixins: [calcAge],
  data() {
    return {
      items: [],
      isLoading: false,
      patientData: {},
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

    gotoPatientProfile() {
      this.$router.push({
        name: 'dashboard-patient-uuid',
        params: {
          uuid: this.consultationData.patient.id,
        },
      })
    },

    signAndCloseEnc() {
      this.$bvModal.show('sign')
    },
    async getPatientRecord() {
      try {
        this.isLoading = true
        let response = await this.$axios.$get(
          `encounters/encounter/${this.$route.params.id}`
        )
        this.consultationData = await response
        this.clinic = response.clinic.name
        this.department = response.clinic.name
          ? response.clinic.Department.name
          : 'nil'
        this.patientData = response.patient
        let time = this.consultationData.encounter_datetime
        let y = new Date(time).toLocaleDateString()

        let z = new Date(time).toTimeString().substring(0, 5)
        this.encounter_time = y + ', ' + z
        this.calcAge(this.patientData.date_of_birth)
      } catch {
      } finally {
        this.isLoading = false
        this.calcAge()
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
    calcAge(e) {
      // **********calc year***********
      let presentDate = new Date().getFullYear()

      let yearOfBirth = e.substring(0, 4)

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
      let month = new Date().getMonth()
      let monthOfBirth = parseInt(e.substring(5, 7))
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

li {
  cursor: pointer;
  border: 0.5px solid #fff;
}
.signal:hover {
  color: $COLOR_THREE;
}
</style>

