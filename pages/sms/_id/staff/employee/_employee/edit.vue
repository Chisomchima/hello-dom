<template>
  <div class="p-4">
    <section class="main-content">
      <div class="d-body">
        <div class="container">
          <div
            class="text-primary mb-3"
            :style="{ cursor: 'pointer', display: 'inline-block' }"
            @click="goBack"
          >
            <span
              class="iconify"
              data-icon="ant-design:arrow-left-outlined"
            ></span>
            Employee
          </div>
          <!-- form starts here  -->

          <form @submit.prevent>
            <div class="bg-white border-radius mb-5 p-4">
              <div class="font20 d-flex align-items-center click">
                <h4 class="text-grey" @click="showx">Edit Employee</h4>
              </div>

              <hr />
              <h4 class="mb-4">Personal Details</h4>
              <div>
                <div class="row">
                  <div class="col-lg-10 col-md-8 col-sm-12 mb-3">
                    <div>
                      <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small> First Name </small
                          ><input
                            v-model="student.first_name"
                            type="text"
                            placeholder="First Name*"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Middle Name</small
                          ><input
                            v-model="student.middle_name"
                            type="text"
                            placeholder="Middle Name"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Last Name</small
                          ><input
                            v-model="student.last_name"
                            type="text"
                            placeholder="Last Name*"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Date of Birth</small>

                          <v-date-picker
                            v-model="student.date_of_birth"
                            mode="date"
                            @dayclick="toggleCalender2 = false"
                          >
                            <template #default="{ togglePopover }">
                              <span @click="togglePopover()">
                                <input
                                  class="form-control"
                                  :placeholder="student.date_of_birth | date"
                                />
                              </span>
                            </template>
                          </v-date-picker>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3 mt-1">
                          <small>Gender</small>
                          <v-select
                            v-model="student.gender"
                            class="style-chooser"
                            placeholder="Gender"
                            label="grade_name"
                            :options="['Male', 'Female']"
                          ></v-select>
                        </div>
                        <!-- <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                            <small> Place of birth </small
                            ><input
                              v-model="student.place_of_birth"
                              type="text"
                              placeholder="Place of Birth"
                              class="form-control ng-untouched ng-pristine ng-valid"
                            />
                          </div> -->
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Nationality</small>
                          <v-select
                            v-model="student.nationality"
                            class="style-chooser"
                            placeholder="Nationality"
                            :options="['Nigeria']"
                          ></v-select>
                        </div>
                        <div class="mello col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small class="mb-0">State of Origin</small>
                          <v-select
                            v-model="student.state.state_name"
                            class="style-chooser"
                            placeholder="Type to search"
                            label="state_name"
                            :reduce="
                              (option) => ({
                                id: option.id,
                                lga: option.lgas,
                                state_name: option.state_name,
                              })
                            "
                            :options="states"
                          ></v-select>
                        </div>
                        <div class="col-lg-4 col-md-5 col-sm-12 mb-3">
                          <small>LGA</small>
                          <v-select
                            v-model="student.lga.id"
                            class="style-chooser"
                            placeholder="Type to search"
                            label="name"
                            :reduce="(option) => option.id"
                            :options="lga"
                          ></v-select>
                        </div>
                        <div class="row" style="margin: 0; width: 100%">
                          <div class="mb-3 col-12">
                            <small>Marital Status</small>

                            <v-select
                              v-model="student.marital_status"
                              class="style-chooser"
                              placeholder="Marital Status"
                              label="family_name"
                              :options="['Single', 'Married', 'Divorced']"
                            ></v-select>
                          </div>
                        </div>
                        <hr />
                        <div class="col-9">
                          <h4>Contact Details</h4>
                        </div>

                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Phone Number</small
                          ><input
                            v-model="student.phone_number"
                            type="text"
                            placeholder="Phone Number"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Email Address</small
                          ><input
                            v-model="student.email"
                            type="email"
                            placeholder="Email Address"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </div>

                        <div class="col-lg-8 col-md-7 col-sm-12 mb-3">
                          <small>Residential Address</small
                          ><textarea
                            v-model="student.address"
                            placeholder="Residential Address"
                            rows="2"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          ></textarea>
                        </div>
                        <hr />
                        <hr />
                        <div class="row" style="margin: 0; width: 100%"></div>
                      </div>
                      <hr />
                      <h3>Emergency Contact</h3>
                      <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Full Name</small
                          ><input
                            v-model="student.emergency.full_name"
                            type="text"
                            placeholder="Full Name*"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Phone Number</small
                          ><input
                            v-model="student.emergency.phone"
                            type="text"
                            placeholder="Phone Number"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </div>

                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3 mt-1">
                          <small class="redd">Relationship</small>
                          <v-select
                            v-model="student.emergency.relationship"
                            class="style-chooser"
                            placeholder="Relationship"
                            label="grade_name"
                            :options="[
                              'Father',
                              'Mother',
                              'Brother',
                              'Sister',
                              'Spouse',
                              'Child',
                            ]"
                          ></v-select>
                        </div>
                        <div class="col-lg-8 col-md-7 col-sm-12 mb-3">
                          <small> Address</small
                          ><textarea
                            v-model="student.emergency.address"
                            placeholder="Residential Address"
                            rows="2"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          ></textarea>
                        </div>
                      </div>
                      <hr />
                      <h3>Work Records</h3>
                      <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Employee ID Number</small
                          ><input
                            v-model="student.work_record.employee_id_number"
                            type="text"
                            placeholder="Employee Id"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Department</small>
                          <v-select
                            v-model="student.work_record.department"
                            class="style-chooser"
                            placeholder="Nationality"
                            :options="['Nigeria']"
                          ></v-select>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Position</small>
                          <v-select
                            v-model="student.work_record.position"
                            class="style-chooser"
                            placeholder="Nationality"
                            :options="['Teacher']"
                          ></v-select>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <h3>Education</h3>
                        <div
                          v-for="(education, index) in student.education"
                          :key="index"
                        >
                          <div class="row">
                            <div
                              v-if="education.certificate_level"
                              class="col-4"
                            >
                              <small>Education Certificate</small>
                              <input
                                v-model="education.certificate_level"
                                type="text"
                                placeholder="Education Certificate"
                                class="
                                  form-control
                                  ng-untouched ng-pristine ng-valid
                                "
                              />
                            </div>
                            <div class="col-8">
                              <small>Field of Study</small>
                              <input
                                v-model="education.field_of_study"
                                type="text"
                                placeholder="Field of Study"
                                class="
                                  form-control
                                  ng-untouched ng-pristine ng-valid
                                "
                              />
                            </div>
                          </div>
                          <div class="row mt-3">
                            <div class="col-4">
                              <small>Year Awarded</small>
                              <input
                                v-model="education.year_awarded"
                                type="text"
                                placeholder="Year awarded"
                                class="
                                  form-control
                                  ng-untouched ng-pristine ng-valid
                                "
                              />
                            </div>
                            <div class="col-8">
                              <small>Institution</small>
                              <input
                                v-model="education.institution"
                                type="text"
                                placeholder="Institution"
                                class="
                                  form-control
                                  ng-untouched ng-pristine ng-valid
                                "
                              />
                            </div>
                          </div>
                          <div class="row mt-3">
                            <div class="col">
                              <input
                                v-model="education.started"
                                type="text"
                                placeholder="Started"
                                class="
                                  form-control
                                  ng-untouched ng-pristine ng-valid
                                "
                              />
                            </div>
                            <div class="col">
                              <input
                                v-model="education.ended"
                                type="text"
                                placeholder="Ended"
                                class="
                                  form-control
                                  ng-untouched ng-pristine ng-valid
                                "
                              />
                            </div>
                            <div
                              class="col text-danger d-flex align-items-center"
                              :style="{ cursor: 'pointer' }"
                              @click="removeEducation(index)"
                            >
                              <span
                                class="iconify"
                                data-icon="ep:delete"
                              ></span>
                              <span class="ml-2"> Delete Qualification </span>
                            </div>
                          </div>
                          <hr />
                        </div>
                        <p
                          class="text-primary"
                          :style="{ cursor: 'pointer' }"
                          @click="addEducation"
                        >
                          <span
                            class="iconify"
                            data-icon="akar-icons:circle-plus-fill"
                          ></span>

                          Add Educational Qualification
                        </p>
                      </div>

                      <div class="my-5 d-flex justify-content-end">
                        <button
                          class="btn btn-light btn-md mx-3"
                          @click="goBack"
                        >
                          Cancel
                        </button>

                        <button
                          class="btn btn-primary"
                          :disabled="isLoading"
                          @click="submitForm()"
                        >
                          <span
                            v-if="isLoading"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <slot>Save </slot>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <app-footer
            class="mt-auto"
            style="margin-top: 10px"
            _nghost-dkr-c272=""
            ><footer _ngcontent-dkr-c272="" class="mt-auto">
              <div
                _ngcontent-dkr-c272=""
                class="d-flex justify-content-between"
              >
                <p _ngcontent-dkr-c272="">(c) 2021. Slate.ng</p>
                <p _ngcontent-dkr-c272="">
                  <span _ngcontent-dkr-c272="" class="mr-2">About</span
                  ><span _ngcontent-dkr-c272="" class="mr-2">|</span
                  ><span
                    _ngcontent-dkr-c272=""
                    routerlink="/terms-of-service"
                    class="mr-2 click"
                    tabindex="0"
                  >
                    Terms of Use </span
                  ><span _ngcontent-dkr-c272="" class="mr-2">|</span
                  ><span
                    _ngcontent-dkr-c272=""
                    routerlink="/privacy"
                    class="click"
                    tabindex="0"
                  >
                    Privacy Policy</span
                  >
                </p>
              </div>
            </footer>
          </app-footer>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import ImageCropper from '~/components/Utils/ImageCropper.vue'

export default {
  async asyncData({ route, $axios }) {
    const {
      data: { data },
    } = await $axios.get(`/slate-admin/staff/hr/${route.params.employee}/`)
    console.log('this staff', { data })
    const student = {
      first_name: data.general.first_name,
      middle_name: data.general.middle_name,
      last_name: data.general.last_name,
      date_of_birth: data.private_information.citizenship.date_of_birth,
      gender: data.general.gender,
      place_of_birth: data.private_information.place_of_birth,
      nationality: data.private_information.citizenship.nationality,
      state: {
        state_name: data.private_information.citizenship.state_of_origin,
        id: data.private_information.citizenship.state_of_origin_id,
        lgas: [],
      },
      lga: {
        name: data.private_information.citizenship.LGA_of_origin,
        id: data.private_information.citizenship.LGA_of_origin_id,
      },
      marital_status: data.general.marital_status,
      phone_number: data.general.phone_number,
      email: data.general.email,
      address: data.private_information.contact_information.address,
      emergency: {
        full_name: data.private_information.emergency_contact.name,
        phone: data.private_information.emergency_contact.phone,
        relationship: data.private_information.emergency_contact.relationship,
        address: data.private_information.emergency_contact.address,
      },
      work_record: {
        employee_id_number: data.general.ID_no,
        department: data.general.department,
        position: data.general.position,
      },
      education: data.education,
    }
    return { student }
  },
  components: {
    ImageCropper,
  },
  data() {
    return {
      states: [],
      avatarImage: '',
      showCropper: false,
      avatar: '',
      version: 1,

      states2: [],
      Statess: 'sss',
      familyList: [],
      gradeList: [],
      imagesArray: '',
      selectedState: '',
      selected: 'State',
      mello: 'yoo',
      newDate: null,
      student: {
        first_name: '',
        last_name: '',
        middle_name: '',
        gender: '',
        phone_number: '',
        email: '',
        place_of_birth: '',
        marital_status: '',
        emergency: { full_name: '', phone: '', relationship: '', address: '' },
        work_record: {
          employee_id_number: '',
          department: '',
          position: '',
        },

        date_of_birth: new Date(),
        nationality: '',
        state_of_origin: '',
        lga_name: '',
        address: '',
        grade: '',
        admission_date: new Date(),
        family: '',
        application_date: '',
        application_status: 'Declined',
        application_academic_year: '',
        present_academic_year: '',
        present_level: '',
        admission_number: '',

        application_level: 'jss 2',
        differentiation: null,

        avatar: null,
      },
      admission_grade: 'ss',
      calender: null,
      date: new Date(),
      isLoading: false,
      toggleCalender: false,
      toggle: false,
      toggleCalender1: false,
      toggleCalender2: false,
    }
  },

  computed: {
    //  avatar() {
    //   return `${this.user.avatar}?v=${this.version}`
    // },

    localGovts() {
      return this.states.filter((state) => {
        return state.id === this.student.state_of_origin
      })
      // return this.sta
    },
    lga() {
      if (this.student.state.state_name) {
        return this.student.state.state_name.lga
        // return ["a", "b", "c"];
      } else {
        return ''
      }
    },
  },

  mounted() {
    this.getDetails()
  },

  methods: {
    addEducation() {
      this.student.education.push({
        certificate: '',
        field_of_study: '',
        year_awarded: '',
        started: '',
        ended: '',
        institution: '',
      })
    },
    removeEducation(e) {
      this.student.education.splice(e, 1)
    },

    showx() {
      const myDiv = document.querySelector('.ankaCropper__droparea')
      console.log(myDiv)

      const button = document.createElement('button')
      button.innerHTML = 'Cancel'
      myDiv.appendChild(button)
    },
    onClickFileUpload() {
      if (this.$refs.fileInput) {
        const uploadField = this.$refs.fileInput
        uploadField.click()
      }
    },
    savedImage(e) {
      console.log(e)
      this.imagesArray = e.croppedFile
      this.avatar = e.croppedImageURI

      this.showCropper = false
    },
    onClickFileUpload_() {
      this.showCropper = true
    },
    cancelImage() {
      this.showCropper = false
    },
    onChange(event) {
      this.imagesArray = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.imagesArray)
      reader.onload = function () {
        this.avatarImage = reader.result
      }.bind(this)
      console.log(this.imagesArray)
      // this.updateAvatar()
    },

    goBack() {
      this.$router.go(-1)
      this.$store.dispatch('breadcrumbs/popRoute')
    },
    async getDetails() {
      const slate_school_id = await this.$store.state.administration.school.id
      const response1 = this.$axios.get('/util/v2/countries/')
      const response2 = this.$axios.get(
        `/slate-admin/school/${slate_school_id}/grades/`
      )
      const response3 = this.$axios.get(
        `/slate-admin/school/${slate_school_id}/year/`
      )
      const response4 = this.$axios.get(
        `/slate-admin/school/${slate_school_id}/family/`
      )

      try {
        await axios.all([response1, response2, response3, response4]).then(
          axios.spread(
            function (res1, res2, res3, res4) {
              // this.states = res1.data.Nigeria
              this.states = res1.data.Nigeria
              this.states2 = res1.data.Nigeria
              this.familyList = res4.data.data
              this.gradeList = res2.data.data
            }.bind(this)
          )
        )
      } catch (error) {
      } finally {
        console.log('done')
      }
    },
    async submitForm() {
      try {
        this.isLoading = true
        await this.$axios.put(
          `/slate-admin/staff/hr/${this.$route.params.employee}/update/`,
          {
            general: {
              first_name: this.student.first_name,
              middle_name: this.student.middle_name,
              last_name: this.student.last_name,
              gender: this.student.gender,
              phone_number: this.student.phone_number,
              email: this.student.email,
              employee_id: this.student.work_record.employee_id_number,
              department: this.student.work_record.department,
              position: this.student.work_record.position,
            },
            private_info: {
              citizenship: {
                nationality: this.student.nationality,
                // state_of_origin: this.student.state_of_origin.id,
                LGA_of_origin: this.student.lga.id,
                date_of_birth: this.$options.filters.date(
                  this.student.date_of_birth
                ),
                state_of_origin: this.student.state.state_name.id
                  ? this.student.state.state_name.id
                  : this.student.state.id,
                marital_status: this.student.marital_status,
                place_of_birth: this.student.place_of_birth,
              },
              contact_information: {
                phone_number: this.student.phone_number,
                residential_address: this.student.address,
              },
              emergency_contact: {
                name: this.student.emergency.full_name,
                phone_number: this.student.emergency.phone,
                relationship: this.student.emergency.relationship,
                address: this.student.emergency.address,
              },
            },
            education: this.student.education,
            hr_information: {
              staff_record_history: {
                id: 'b1dae112-8bcc-4910-b860-8ab547e0d809',
                position: 'Teacher',
                join_date: '2021-09-07 09:17:59.444348',
                department: 'mmm',
              },
              positions_held: [],
              exit_record: {
                id: '44fd9fde-cb30-4a69-987e-f7ff691edc9a',
                date: null,
                exit_type: null,
                exit_reason: null,
              },
            },

            staff_id: this.$route.params.employee,
          }
        )
        const school = this.$route.params.id
        const staffId = this.$route.params.employee

        // const staffId = response.data.data.staff_id;

        this.$router.push(`/sms/${school}/staff/employee/${staffId}`)
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    showCalender() {
      this.toggleCalender = true
      this.toggle = true
    },
    hideCalender() {
      this.toggleCalender = false
      this.toggle = false
    },
    showCalender1() {
      this.toggleCalender1 = true
    },
    hideCalender1() {
      this.toggleCalender1 = false
    },
  },
}
</script>

<style scoped>
.student_profile {
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 30px;
}

.custom-badge {
  border: solid rgb(81, 177, 89);
  border-width: 2px;
  border-radius: 10px;
  padding: 4px;
  /* background-color: rgba(112, 211, 81, 0.808); */
}

.profile-details {
  display: grid;
  grid-template-columns: 4fr 8fr 4fr 1fr;
}

.calen {
  position: absolute;
  z-index: 9;
}

small {
  color: #8f9aa3;
}

.me .my-dropdownc {
  overflow: scroll;
  max-height: 15rem;
  color: red;
  background-color: white;
  transform: none !important;
}

.me .my-dropdownc::after {
  display: none;
}

.me .my-dropdownc li a {
  color: rgb(24, 21, 21);
}

.dropo button::after {
  display: none;
  text-align: left;
}

.dropo button {
  /* display: flex; */
  /* justify-content: space-between; */
  text-align: left !important;
}

.style-chooser >>> .vs__search::placeholder,
.style-chooser >>> .vs__dropdown-toggle,
.style-chooser >>> .vs__dropdown-menu {
  color: black;
  font-size: 14px;
}

.style-chooser >>> .vs__open-indicator {
  fill: black;
  transform: scale(0.65);
}
</style>
