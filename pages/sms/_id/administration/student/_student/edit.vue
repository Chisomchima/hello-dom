<template>
  <div class="">
    <section class="main-content">
      <div class="d-body">
        <div class="container">
          <!-- <span class="text-primary" @click="goBack">
            <span
              class="iconify"
              data-icon="ant-design:arrow-left-outlined"
            ></span>
            Students
          </span> -->
          <!-- form starts here  -->
          <form @submit.prevent>
            <div class="bg-white border-radius mb-5 p-4">
              <div class="font20 d-flex align-items-center click">
                <h4 class="text-grey">Edit current Student</h4>
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
                          <!---->
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
                          /><!---->
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
                          /><!---->
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Date of Birth</small>
                          <v-date-picker
                            v-model="student.date_of_birth"
                            mode="date"
                            @dayclick="hideCalender1"
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
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Gender</small>

                          <v-select
                            v-model="student.gender"
                            class="style-chooser text-capitalize"
                            placeholder="Gender"
                            label="grade_name"
                            :options="['Male', 'Female']"
                          ></v-select>
                        </div>
                        <p class="text-white">.<br /></p>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Nationality</small>
                          <v-select
                            v-model="student.nationality"
                            class="style-chooser"
                            placeholder="Nationality"
                            :options="
                              Object.keys(countries).filter(
                                (e) => e !== 'message'
                              )
                            "
                            @input="
                              ;(student.state_of_origin.state = ''),
                                (student.state_of_origin['l.g.a'] = '')
                            "
                          ></v-select>
                        </div>
                        <div class="mello col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small class="mb-0">State of Origin</small>
                          <v-select
                            v-model="student.state_of_origin.state"
                            class="style-chooser"
                            placeholder="Type to search"
                            label="state_name"
                            :options="allStates"
                            @input="student.state_of_origin['l.g.a'] = ''"
                          ></v-select>
                        </div>
                        <div class="col-lg-4 col-md-5 col-sm-12 mb-3">
                          <small>LGA</small>

                          <v-select
                            v-model="student.state_of_origin['l.g.a']"
                            class="style-chooser"
                            placeholder="Type to search"
                            label="name"
                            :options="lga"
                          ></v-select>
                        </div>
                        <div class="row" style="margin: 0; width: 100%">
                          <div class="mb-3 col-12">
                            <small>Family</small>

                            <v-select
                              v-model="student.family"
                              class="style-chooser"
                              placeholder="Select Family"
                              label="family_name"
                              :options="familyList"
                            ></v-select>
                          </div>
                          <!---->
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
                          /><!---->
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
                          /><!---->
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
                          ></textarea
                          ><!---->
                        </div>
                        <hr />
                        <hr />
                        <div class="row" style="margin: 0; width: 100%">
                          <!---->
                        </div>
                      </div>
                      <hr />
                      <h3>Admission Records</h3>
                      <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Admission Number</small
                          ><input
                            v-model="student.admission_number"
                            type="text"
                            placeholder="Admission Number*"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          /><!---->
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small>Date of Admission</small>
                          <v-date-picker
                            v-model="student.admission_date"
                            mode="date"
                            @dayclick="hideCalender"
                          >
                            <template #default="{ togglePopover }">
                              <span @click="togglePopover()">
                                <input
                                  class="form-control"
                                  :placeholder="student.admission_date | date"
                                />
                              </span>
                            </template>
                          </v-date-picker>
                        </div>

                        <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                          <small class="redd">Grade Level</small>
                          <v-select
                            v-model="student.grade"
                            class="style-chooser"
                            placeholder="Select Grade Level"
                            label="grade_name"
                            :options="gradeList"
                          ></v-select>
                        </div>
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
                          @click="submitForm"
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
                  <!-- <div class="col-lg-2 col-md-4 col-sm-12 mb-3">
                    <div class="profile-picture-container">
                      <div class="profiles">
                        <b-avatar
                          size="6rem"
                          icon="person-fill"
                          :src="student.avatar"
                          badge
                          badge-variant="primary"
                        >
                          <template #badge>
                            <span>
                              <b-icon
                                id="dropdownMenuButton"
                                icon="camera"
                                class="dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></b-icon>
                              <div
                                class="dropdown-menu dropdown-menu text-center"
                                aria-smallledby="dropdownMenuButton"
                              >
                                <button class="dropdown-item" href="#">
                                  Capture Image
                                </button>
                                <button
                                  class="dropdown-item"
                                  @click="onClickFileUpload_"
                                  href="#"
                                >
                                  Upload Image
                                </button>
                              </div>
                            </span>
                          </template>
                        </b-avatar>
                      </div>
                      <input
                        ref="fileInput"
                        class="invisible"
                        type="file"
                        name="imagesArray"
                        @change="onChange"
                      />
                      <div v-if="showCropper">
                        <image-cropper
                          @saved="savedImage"
                          @cancelled="cancelImage"
                        />
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </form>

          <!-- <app-footer
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
            <!----></app-footer
          > -->
        </div>
      </div>
    </section>
    <b-modal id="modal-add-family" title="New Family">
      <div class="modal-body">
        <div>
          <div class="row">
            <div class="col-12 p-r">
              <div class="form-group">
                <label>Family Name</label
                ><input
                  v-model="newFamily.family_name"
                  _ngcontent-dpg-c305=""
                  type="text"
                  placeholder="Family Name"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
            </div>
            <div class="col-12 p-r">
              <div class="form-group">
                <label>Email Address</label
                ><input
                  v-model="newFamily.email"
                  type="email"
                  placeholder="Email Address"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
            </div>

            <div class="col-md-6 p-r">
              <div class="form-group">
                <label>Primary Contact's Name</label
                ><input
                  v-model="newFamily.primary_contact"
                  type="text"
                  placeholder="Primary Contact's Name"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
            </div>
            <div class="col-md-6 p-r">
              <div class="form-group">
                <label>Phone Number</label
                ><input
                  v-model="newFamily.phone"
                  type="text"
                  placeholder="Phone Number"
                  class="form-control ng-untouched ng-pristine ng-valid"
                />
              </div>
            </div>
            <div class="col-12 p-r">
              <div class="form-group">
                <label>Address</label>
                <textarea
                  id=""
                  v-model="newFamily.address"
                  name=""
                  placeholder="Address"
                  type="text"
                  class="form-control ng-untouched ng-pristine ng-valid"
                  cols="30"
                  rows="2"
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #modal-footer="{ cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="light" class="px-2 mr-2" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="primary" class="px-3" @click="addFamily()">
          Save
        </b-button>
        <!-- Button with custom close trigger value -->
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import ImageCropper from '~/components/Utils/ImageCropper.vue'

export default {
  components: {
    ImageCropper,
  },
  data() {
    return {
      states: [],
      states2: [],
      showCropper: false,
      newFamily: {
        family_name: '',
        email: '',
        primary_contact: '',
        phone: '',
        address: '',
      },

      Statess: 'sss',
      familyList: [],
      countries: [],
      gradeList: [],
      imagesArray: '',
      selectedState: '',
      selected: 'State',
      options: ['abia', 'umaia', 'yola'],
      mello: 'yoo',
      newDate: null,
      student: {
        first_name: '',
        last_name: '',
        middle_name: '',
        gender: '',
        phone_number: '',
        email: '',

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
      searchState: '',
      lga_text: '',
      family_text: '',
      toggleCalender: false,
      toggleCalender1: false,
    }
  },

  computed: {
    allStates() {
      if (this.student.nationality === 'Nigeria') {
        return this.states
      } else {
        return []
      }
    },
    localGovts() {
      return this.states.filter((state) => {
        return state.id === this.student.state_of_origin
      })
      // return this.sta
    },
    lga() {
      if (this.student.state_of_origin.state) {
        return this.student.state_of_origin.state.lgas
      } else {
        return ''
      }
    },
  },
  watch: {
    'student.family': {
      handler(newValue) {
        if (newValue) {
          if (newValue.family_name === 'Add Family') {
            this.$bvModal.show('modal-add-family')
          }
        }
      },
    },
  },

  mounted() {
    this.getDetails()
    this.getStudent()
  },
  methods: {
    async addFamily() {
      const schoolCode = this.$store.state.administration.school.code

      const slate_school_id = await this.$store.state.administration.school.id

      try {
        const response = await this.$axios.post(
          `/slate-admin/school/${slate_school_id}/family/`,
          {
            family_name: this.newFamily.family_name,
            address: this.newFamily.address,
            phone: this.newFamily.phone,
            email: this.newFamily.email,
            primary_contact: this.newFamily.primary_contact,
          }
        )
        if (response.status === 200 || response.status === 201) {
          this.newFamily = {}
          this.$bvModal.hide('modal-add-family')
          this.getDetails()
        }
        console.log('res', response)
      } catch (error) {}
    },
    savedImage(e) {
      console.log(e)
      this.imagesArray = e.croppedFile
      this.student.avatar = e.croppedImageURI
      console.log('version is', this.version)

      this.showCropper = false
    },
    onClickFileUpload() {
      if (this.$refs.fileInput) {
        const uploadField = this.$refs.fileInput
        uploadField.click()
      }
    },
    onClickFileUpload_() {
      this.showCropper = true
    },
    onChange(event) {
      this.imagesArray = event.target.files[0]
      // this.student.avatar = event.target.files[0]
      console.log(this.imagesArray)
      const reader = new FileReader()
      reader.readAsDataURL(this.imagesArray)
      reader.onload = function () {
        console.log('from reader', reader.result)
        this.student.avatar = reader.result
        console.log('avatar image', this.avatarImage)
      }.bind(this)
      // this.updateAvatar()
    },
    goBack() {
      this.$router.go(-1)
      this.$store.dispatch('breadcrumbs/popRoute')
    },
    async getStudent() {
      const slate_admission_id = this.$route.params.student
      console.log('routes', this.$route.params)

      try {
        const { data, status } = await this.$axios.get(
          `/slate-admin/admission/${slate_admission_id}/profile/`
        )
        if (status === 200) {
          this.details = data.data
          const api = data.data
          this.student.first_name = api.profile_data.first_name
          this.student.last_name = api.profile_data.last_name
          this.student.middle_name = api.profile_data.middle_name
          this.student.date_of_birth = api.profile_data['d.o.b']
          this.student.avatar = api.basic.image
          this.student.gender = api.profile_data.gender
          this.student.nationality = api.profile_data.nationality
          this.student.state_of_origin = api.profile_data
          this.selected = api.profile_data.state
          this.student.lga_name = api.profile_data.lga_id
          this.lga_text = api.profile_data['l.g.a']
          this.student.family = api.families
          this.family_text = api.families.family_name

          this.student.phone_number = api.profile_data.phone
          this.student.email = api.profile_data.email
          this.student.address = api.profile_data.address
          this.student.admission_number = api.admission_record.admission_number
          this.student.admission_date =
            api.admission_record.admission_number_date
          // this.student.grade = api.basic.grade_level_id
          this.student.grade = {
            grade_name: api.basic.grade_level,
            id: api.basic.grade_level_id,
          }
          this.grade_level_text = api.basic.grade_level

          this.message = ` ${data.data.basic.activation_code}- ${data.data.basic.admission_number}`
          console.log('dedd', this.details)
        }
      } catch (error) {}
    },
    async getDetails() {
      const slate_school_id = await this.$store.state.administration.school.id
      const response1 = this.$axios.get('/util/v2/countries/?paginate=false')
      const response2 = this.$axios.get(
        `/slate-admin/school/${slate_school_id}/grades/?paginate=false`
      )
      const response3 = this.$axios.get(
        `/slate-admin/school/${slate_school_id}/year/?paginate=false`
      )
      const response4 = this.$axios.get(
        `/slate-admin/school/${slate_school_id}/family/?paginate=false`
      )

      try {
        await axios.all([response1, response2, response3, response4]).then(
          axios.spread(
            function (res1, res2, res3, res4) {
              // this.states = res1.data.Nigeria
              this.countries = res1.data
              this.states = res1.data.Nigeria
              this.states2 = res1.data.Nigeria
              this.familyList = res4.data.data
              this.gradeList = res2.data.data
              console.log('grades', this.gradeList)
            }.bind(this)
          )
        )
        this.familyList.push({ family_name: 'Add Family' })
        const news = this.familyList
        console.log('mine', news)
      } catch (error) {
      } finally {
        console.log('done')
      }
    },

    async submitForm() {
      try {
        this.isLoading = true
        const slate_school_id = await this.$store.state.administration.school.id
        const fd = new FormData()

        fd.append('first_name', this.student.first_name)
        fd.append('last_name', this.student.last_name)
        fd.append('middle_name', this.student.middle_name)
        fd.append('gender', this.student.gender)
        fd.append('phone_number', this.student.phone_number)
        fd.append('email', this.student.email)
        fd.append(
          'date_of_birth',
          this.$options.filters.date(this.student.date_of_birth)
        )
        fd.append('nationality', this.student.nationality)
        fd.append(
          'state_of_origin',
          this.student.state_of_origin.state.id
            ? this.student.state_of_origin.state.id
            : this.student.state_of_origin.state_id
        )
        fd.append(
          'lga_name',
          this.student.state_of_origin['l.g.a'].id
            ? this.student.state_of_origin['l.g.a'].id
            : this.student.state_of_origin.lga_id
        )
        fd.append('address', this.student.address)
        fd.append('grade', this.student.grade)
        fd.append(
          'family',
          this.student.family.id ? this.student.family.id : ''
        )
        fd.append(
          'admission_date',
          this.$options.filters.date(this.student.admission_date)
        )
        // fd.append('application_status', 'Accepted')

        // fd.append('present_academic_year', '2fbff91d-7087-4b87-9dad-8f7c6f31c519')
        fd.append('present_level', this.student.grade.id)
        fd.append('admission_number', this.student.admission_number)
        // fd.append('avatar', this.student.avatar)
        const slate_admission_id = this.$route.params.student
        const response = await this.$axios.put(
          `/slate-admin/admission/${slate_admission_id}/profile/`,
          fd
        )
        const school = this.$route.params.id
        this.$router.push(
          `/sms/${school}/administration/student/${slate_admission_id}`
        )
        console.log('response is ', response)
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    showCalender() {
      this.toggleCalender = true
    },
    hideCalender() {
      this.toggleCalender = false
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
  color: red !important;
  background-color: white;
  transform: none !important;
}

.me .my-dropdownc::after {
  display: none;
}

.me .my-dropdownc li a {
  color: rgb(95, 92, 92);
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
