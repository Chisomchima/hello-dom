<template>
  <div>
    <div v-if="details.education.length">
      <div class="d-flex justify-content-between">
        <h5>Education Qualifications</h5>
        <b-btn class="bg-white text-primary" @click="handleEdit">
          Edit Educational Qualification
        </b-btn>
      </div>
      <div class="mt-3">
        <div class="row">
          <template v-for="(education, index) in details.education">
            <div
              :key="index"
              class="
                col
                rounded
                container
                border border-secondary
                education-container
                p-3
                m-2
              "
            >
              <div class="row card-holder my-0 py-0">
                <p class="col-5 mr-0 pr-0 text-secondary card-identifier">
                  Certificate Level:
                </p>
                <p class="col-7 m-0">
                  {{
                    education.certificate
                      ? education.certificate
                      : education.certificate_level
                      ? education.certificate_level
                      : '--'
                  }}
                </p>
              </div>
              <div class="row card-holder my-0 py-0">
                <p class="col-5 mr-0 pr-0 text-secondary card-identifier">
                  Field of Study:
                </p>
                <p class="col-7 m-0">
                  {{
                    education.field_of_study ? education.field_of_study : '--'
                  }}
                </p>
                <p class="col-7"></p>
              </div>
              <div class="row card-holder my-0 py-0">
                <p class="col-5 mr-0 pr-0 text-secondary card-identifier">
                  Institution:
                </p>
                <p class="col-7 m-0">
                  {{ education.institution ? education.institution : '--' }}
                </p>
              </div>

              <div class="row card-holder my-0 py-0">
                <p class="col-5 mr-0 pr-0 text-secondary card-identifier">
                  Duration:
                </p>
                <p class="col-7 m-0">
                  {{ education.started ? education.started : '--' }} -
                  {{ education.ended ? education.ended : '--' }}
                </p>
              </div>
              <div class="row card-holder my-0 py-0">
                <p class="col-5 mr-0 pr-0 text-secondary card-identifier">
                  Year of Award:
                </p>
                <p class="col-7 m-0">
                  {{ education.year_awarded ? education.year_awarded : '--' }}
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-else class="text-danger">
      <div class="d-flex justify-content-between">
        <p></p>
        <b-btn class="bg-white text-primary" @click="handleEdit">
          Add Educational Qualification
        </b-btn>
      </div>
      <div class="text-center mt-5">No Uploaded Qualifications</div>
    </div>

    <ModalWrapper
      id="EditEducation"
      title="Edit Education Records"
      @ok="submitEducation"
      @hide="handlehide"
    >
      <h3>Education</h3>
      <div v-for="(education, index) in education" :key="index">
        <div class="row">
          <div class="col-5">
            <small>Education Certificate</small>
            <input
              v-model="education.certificate_level"
              type="text"
              placeholder="Education Certificate"
              class="form-control ng-untouched ng-pristine ng-valid"
            />
          </div>
          <div class="col-7">
            <small>Field of Study</small>
            <input
              v-model="education.field_of_study"
              type="text"
              placeholder="Field of Study"
              class="form-control ng-untouched ng-pristine ng-valid"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-5">
            <small>Year Awarded</small>
            <input
              v-model="education.year_awarded"
              type="text"
              placeholder="Year awarded"
              class="form-control ng-untouched ng-pristine ng-valid"
            />
          </div>
          <div class="col-7">
            <small>Institution</small>
            <input
              v-model="education.institution"
              type="text"
              placeholder="Institution"
              class="form-control ng-untouched ng-pristine ng-valid"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-5">
            <input
              v-model="education.started"
              type="text"
              placeholder="Started"
              class="form-control ng-untouched ng-pristine ng-valid"
            />
          </div>
          <div class="col-7">
            <input
              v-model="education.ended"
              type="text"
              placeholder="Ended"
              class="form-control ng-untouched ng-pristine ng-valid"
            />
          </div>
          <div
            class="col text-danger d-flex align-items-center mt-3"
            :style="{ cursor: 'pointer' }"
            @click="removeEducation(index)"
          >
            <span class="iconify" data-icon="ep:delete"></span>
            <span class="ml-2"> Delete </span>
          </div>
        </div>
        <hr />
      </div>
      <p
        class="text-primary"
        :style="{ cursor: 'pointer' }"
        @click="addEducation"
      >
        <span class="iconify" data-icon="akar-icons:circle-plus-fill"></span>

        Add Educational Qualification
      </p>
    </ModalWrapper>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      education: [
        {
          certificate: '',
          field_of_study: '',
          year_awarded: '',
          started: '',
          ended: '',
          institution: '',
        },
      ],
    }
  },
  methods: {
    handleEdit() {
      if (this.details.education.length) {
        this.education = this.details.education
      }
      this.$bvModal.show('EditEducation')
    },
    addEducation() {
      this.education.push({
        certificate: '',
        field_of_study: '',
        year_awarded: '',
        started: '',
        ended: '',
        institution: '',
      })
    },
    removeEducation(e) {
      this.education.splice(e, 1)
    },
    async submitEducation() {
      console.log('b4', this.details)
      const forSubmit = this.details
      forSubmit.education = this.education
      forSubmit.staff_id = forSubmit.id
      forSubmit.certificate_level = forSubmit.certificate
        ? forSubmit.certificate
        : forSubmit.certificate_level
        ? forSubmit.certificate_level
        : ''
      try {
        await this.$axios.put(
          `/slate-admin/staff/hr/${this.$route.params.employee}/update/`,
          {
            education: this.education,
            staff_id: forSubmit.id,
          }
        )
        this.$bvModal.hide('EditEducation')
        this.$emit('refresh')
      } catch (error) {
        console.log(error)
      }
    },
    handlehide() {
      this.education = [
        {
          certificate: '',
          field_of_study: '',
          year_awarded: '',
          started: '',
          ended: '',
          institution: '',
        },
      ]
    },
  },
}
</script>

<style scoped>
.education-container {
  background-color: #fbfdfe;
  min-width: 20rem;
  max-width: 20rem;
}
.card-identifier {
  font-size: 0.8rem;
}
.card-holder {
  height: 2rem;
}
.card-holder p {
  word-wrap: break-word;
  font-size: 0.8rem;
}
</style>
