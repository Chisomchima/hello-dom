<template>
  <div>
    <div style="max-width: 95%; cursor: pointer" class="d-flex sleek justify-content-between">
      <div>
        <h4 class="pl-2 text-18 mb-0 text-grey">Vitals</h4>
      </div>
      <div class="text-primary" @click.prevent="openForm" id="button-1" v-show="step">
        <!-- <span
          title="Tooltip directive content"
          class="iconify"
          data-icon="akar-icons:plus"
          style="color: #28a745"
          data-width="28"
          data-height="24"
        ></span> -->

        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            class="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
          </svg>
        </div>

        <b-tooltip target="button-1" placement="bottom"> Add Vitals </b-tooltip>
      </div>
      <div class="text-primary" @click="closeForm" id="button-8" v-show="kink">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-square"
            viewBox="0 0 16 16">
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
          </svg>
        </div>

        <b-tooltip target="button-8" placement="bottom">Close </b-tooltip>
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="hideVitalsForm" style="max-width: 98%" class="trans pl-5 row px-2">
        <div class="d-flex align-items-center col-lg-12 col-md-12 col-sm-12 mt-2">
          <div><input v-model="nurseFlag" style="width: 1rem; height: 1rem;" class="form-control" type="checkbox"></div>
          <small class="text-info text-12 ml-2">Nurse seen</small>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div>
            <small class="text-grey text-12">Time Taken</small>
            <input v-model="time" class="form-control ng-untouched ng-pristine ng-valid" type="datetime-local" />
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
          <small class="text-grey text-12">Weight (kg)</small><input type="number" v-model="weight" placeholder="Weight"
            class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Height (cm)</small><input type="number" v-model="height" placeholder="Height"
            class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">BMI (kg/m<sup>2</sup>)</small><input disabled type="number"
            v-model="vitals.bmi" placeholder="BMI" class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Systolic B.P</small><input type="number" v-model="vitals.systolic"
            placeholder="Systolic B.P" class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Diastolic B.P</small><input type="number" v-model="vitals.diastolic"
            placeholder="Diastolic B.P" class="form-control ng-untouched ng-pristine ng-valid" />
        </div>

        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Temperature °C</small><input type="number" v-model="vitals.temperature"
            placeholder="Temperature" class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Respiratory Rate (/min)</small><input type="number"
            v-model="vitals.respiratory" placeholder="Respiratory Rate"
            class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Heart Rate (BPM)</small><input type="number" v-model="vitals.heart_rate"
            placeholder="Heart Rate" class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Urine Output</small><input type="number" v-model="vitals.urine_output"
            placeholder="Urine Output" class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Blood Sugar (F)</small><input type="number" v-model="vitals.blood_sugar_f"
            placeholder="Blood Sugar (F)" class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Blood Sugar (R)</small><input type="number" v-model="vitals.blood_sugar_r"
            placeholder="Blood Sugar (R)" class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">SPO2</small><input type="number" v-model="vitals.spo2" placeholder="SPO2"
            class="form-control ng-untouched ng-pristine ng-valid" />
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">AVPU</small>
          <v-select v-model="vitals.avpu" class="style-chooser" ></v-select>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Trauma</small>
          <v-select v-model="vitals.trauma" class="style-chooser" ></v-select>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Mobility</small>
          <v-select v-model="vitals.mobility" class="style-chooser" ></v-select>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Oxygen Supplementation</small>
          <v-select class="style-chooser" v-model="vitals.oxygen" ></v-select>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 w-100">
          <small class="text-grey text-12">Fluid intake</small>
          <v-select v-model="vitals.intake" class="style-chooser" ></v-select>
        </div>

        <div class="col-lg-6 col-md-12 col-sm-12">
          <div class="d-flex text-16 justify-content-between align-items-end">
            <div class="col-lg-6 col-md-6 pl-0 col-sm-12">
              <small class="text-grey text-12">Fluid output</small>
              <v-select v-model="vitals.output" class="style-chooser" ></v-select>
            </div>

            <div class="col-lg-6 col-md-6 px-0 col-sm-12">
              <button @click="closeForm" class="btn mx-3 text-14 btn-light">
                Cancel
              </button>

              <BaseButton :disabled="allow" @click.prevent="addVitals" class="btn-primary">Save</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="pt-3 transit" style="max-width: 93%">
      <div v-if="itemsToShow.length > 0" class="table-fix">
        <table-component :paginate="false" :busy="busy" :items="itemsToShow" :fields="fields">
        </table-component>
      </div>
      <div class="p-5 text-center" v-else>
        <div class="text-16 text-grey">
          No Vitals added yet, click the
          <span style="position: relative; top: -3px" class="text-primary mx-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-plus-square-fill" viewBox="0 0 16 16">
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
            </svg></span>
          icon to add Vitals
        </div>
        <div class="text-primary my-3">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="30"
            preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
            <g fill="currentColor">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path
                d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: null,
      weight: null,
      step: true,
      kink: false,
      allow: false,
      nurseFlag: false,
      chart: {
        vitals: {},
      },
      time: "",
      vitals: {
        bmi: null,
        height: null,
        weight: null,
        systolic: null,
        diastolic: null,
        temperature: null,
        respiratory: null,
        heart_rate: null,
        urine_output: null,
        blood_sugar_f: null,
        blood_sugar_r: null,
        time: "",
        spo2: null,
        avpu: "",
        trauma: "",
        mobility: "",
        oxygen: "",
        intake: "",
        output: "",
      },

      tempData: [],
      form: {},
      time: "",
      hideVitalsForm: false,
      busy: false,
      isLoading: false,
      itemsToShow: [],
      fields: [
        { key: "score", label: "Score", sortable: true },
        { key: "time", label: "Time Taken", sortable: true },
        { key: "systolic", label: "SBP", sortable: true },
        { key: "diastolic", label: "DBP", sortable: true },

        { key: "temperature", label: "Temp", sortable: true },
        { key: "respiratory", label: "RR", sortable: true },
        { key: "heart_rate", label: "HR", sortable: true },
        { key: "height", label: "Height", sortable: true },
        { key: "weight", label: "Weight", sortable: true },
        { key: "bmi", label: "BMI", sortable: true },
        { key: "spo2", label: "SPO2", sortable: true },

        { key: "blood_sugar_f", label: "BS(F)", sortable: true },
        { key: "blood_sugar_r", label: "BS(R)", sortable: true },
        { key: "urine_output", label: "Urine OP", sortable: true },
        // { key: "avpu", label: "AVPU", sortable: true },
        // { key: "trauma", label: "Trauma", sortable: true },
        // { key: "", label: "Trauma", sortable: true },
        // { key: "trauma", label: "Trauma", sortable: true },
      ],
    };
  },

  props: {
    consultationData: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    // this.getDateTime();
    // this.getPatientRecords();
    this.getVitals();
  },

  methods: {
    async getVitals() {
      try {
        this.busy = true;
        let response = await this.$axios.$get(
          `encounters/${this.$route.params.id}/charts/vitals/`
        );

        this.itemsToShow = [];
        let tempData = response.result;
        console.log(tempData);

        for (const iterator of tempData) {
          let time = iterator.created_at;
          let y = new Date(time).toLocaleDateString();
          let z = new Date(time).toTimeString().substring(0, 5);
          let b = y + ", " + z;

          this.itemsToShow.push({
            time: iterator.created_at ? b : "",
            bmi: iterator.value.bmi ? iterator.value.bmi : "nil",
            height: iterator.value.height,
            weight: iterator.value.weight,
            systolic: iterator.value.systolic,
            diastolic: iterator.value.diastolic,
            temperature: iterator.value.temperature,
            respiratory: iterator.value.respiratory,
            heart_rate: iterator.value.heart_rate,
            blood_sugar_f: iterator.value.blood_sugar_f,
            blood_sugar_r: iterator.value.blood_sugar_r,
            spo2: iterator.value.spo2,
            avpu: iterator.value.avpu,
            trauma: iterator.value.trauma,
            mobility: iterator.value.mobility,
            oxygen: iterator.value.oxygen,
            intake: iterator.value.intake,
            urine_output: iterator.value.urine_output,
          });
        }
      } catch {
      } finally {
        this.busy = false;
      }
    },
    async updateStatus() {
      // this.form.status = "Nurse seen";
      // let status = 'NS'
      try {
        let response = await this.$axios.$patch(
          `/encounters/encounter/${this.$route.params.id}/`,
          { status: "NS" }
        );
      } catch (error) {
      } finally {
      }
    },
    async addVitals() {
      this.vitals.height = this.height;
      this.vitals.weight = this.weight;
      if (this.height && this.weight) {
        this.vitals.bmi
      }
      else {
        this.vitals.bmi = 0
      }
      this.vitals.time = this.time;
      this.isLoading = true;

      try {
        let response = await this.$axios.$post(
          `encounters/${this.consultationData.id}/charts/`,
          {
            chart: {
              vitals: this.vitals,
            },
          }
        );
        this.$toast({
          type: 'success',
          text: 'Vitals added',
        })

        if (this.nurseFlag) {
          this.updateStatus();
        }
        // this.$emit("clearance", true);

        this.hideVitalsForm = false;
        this.step = true;
        this.kink = false;
        this.getVitals();
      } catch (error) {
        this.$toast({
          type: 'error',
          text: 'Unable to add vitals',
        })
        
      } finally {
        this.busy = true;
        this.busy = false;
        this.isLoading = false;
        this.vitals.bmi = null;
        this.height = null;
        this.weight = null;
        this.vitals.height = null;
        this.vitals.weight = null;
        this.vitals.systolic = null;
        this.vitals.diastolic = null;
        this.vitals.temperature = null;
        this.vitals.respiratory = null;
        this.vitals.heart_rate = null;
        this.vitals.urine_output = null;
        this.vitals.blood_sugar_f = null;
        this.vitals.blood_sugar_r = null;
        this.vitals.spo2 = null;
        this.vitals.avpu = null;
        this.vitals.trauma = null;
        this.vitals.mobility = null;
        this.vitals.oxygen = null;
        this.vitals.intake = null;
        this.vitals.output = null;
      }
    },
    calc() {
      let meter = (this.height / 100) ** 2;
      let soln = this.weight / meter;
      this.vitals.bmi = soln.toFixed(2);
    },
    getDateTime() {
      let day = new Date().toISOString();
      this.time = day;
    },
    openForm() {
      this.hideVitalsForm = true;
      this.step = false;
      this.kink = true;
      let time = new Date().toISOString();
      let y = time.substring(0, 16);
      this.time = y;
    },
    closeForm() {
      this.hideVitalsForm = false;
      this.step = true;
      this.kink = false;
    },
    collapse() {
      this.hideVitalsForm = true;
      this.step = true;
      this.kink = false;
    },
  },

  watch: {
    height() {
      this.calc();
    },
    weight() {
      this.calc();
    },
    "vitals.time": {
      handler() {
        let x = this.vitals.time;
        let y = new Date(x).toISOString();
        this.time = y;
      },
    },
  },
};
</script>

<style scoped>
.site-container {
  width: calc(100vw - var(--sidebar-width) - 20px);
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  padding-top: 1rem;
  position: relative;
  z-index: 1;
  padding: 2rem calc(1rem + 12px);
  background-color: #f5f6f7;
}
.trans {
  transition: fade 0.3s;
}
.table-fix {
  max-width: 100%;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

/* .slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} */

.slide-fade-enter,
.slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>