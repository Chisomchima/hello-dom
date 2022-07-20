<template>
 <div>
  <div v-if="busy">
        <b-row>
        <b-col cols="12" class="mt-4 ml-3">
          <b-skeleton animation="wave" width="70%"></b-skeleton>
          <b-skeleton animation="wave" width="65%"></b-skeleton>
          <b-skeleton animation="wave" width="60%"></b-skeleton>
        </b-col>
        <b-col cols="12" class="mt-3 ml-3">
          <b-skeleton animation="fade" width="70%"></b-skeleton>
          <b-skeleton animation="fade" width="65%"></b-skeleton>
          <b-skeleton animation="fade" width="60%"></b-skeleton>
        </b-col>
        
        </b-row>
    </div>
   <div v-else>
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="text-grey text-18 mb-0">Diagnosis</h4>
      <div @click="showComment" style="cursor: pointer" v-show="step" id="button-20">
        <div class="text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            class="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
          </svg>
        </div>

        <b-tooltip target="button-20" placement="bottom">
          Add Diagnosis
        </b-tooltip>
      </div>
      <div @click.prevent="closeForm" id="button-22" v-show="kink">
        <div class="text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-square"
            viewBox="0 0 16 16">
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
          </svg>
        </div>

        <b-tooltip target="button-22" placement="bottom">Close </b-tooltip>
      </div>
    </div>

    <br />
    <div v-show="tag" class="mr-3">
      <!-- <textarea v-model="diagnosis" class="p-3 form-control ng-untouched ng-pristine ng-valid" cols="40"
        rows="10"></textarea> -->

      <div class="row">
        <div class="col-lg-8 col-md-6 col-sm-6">
        <small class="text-grey text-14">Comment</small><input type="text" 
            placeholder="Type here..." v-model="diagnosis.comment" class="form-control ng-untouched ng-pristine ng-valid" />
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 w-100">
        <small class="text-grey text-14">Options</small>
        <v-select class="text-14" v-model="diagnosis.option" style="height: 35px;" :options="options" ></v-select>
      </div>
      </div>

      <div style="height: 38px" class="w-100 mt-3 mr-5 text-16 d-flex justify-content-end">

        <BaseButton :disabled="consultationData.bill.cleared_status === 'CLEARED' ? false : true"
          @click.prevent="addDiagnosis" class="btn-primary mr-3">Save</BaseButton>
      </div>
    </div>

    <div class="pt-3" v-if="comments.length > 0">
      <div v-for="(comment, index) in comments" :key="index" class="d-flex align-items-center">
        <div :style="{background: comment.value.option === 'working'? '#e9ff70' : '#80ed99'  }" class="card text-14 px-3 pt-3 pb-2 mb-2 pt-2 w-100 shadow-sm">
       <div>
         <div class="" v-if="comment.value">
          {{ comment.value.comment || comment.value }}
        </div>
        <div class="d-flex justify-content-end">
          <p class="text-12 mb-0">
            <span class="text-12 text-capitalize">
              {{
              comment.created_by.first_name +
              " " +
              comment.created_by.last_name
              }},
            </span>
            <span class="text-12">
              {{ comment.created_at }}
            </span>
          </p>
        </div>
       </div>
      </div>

      <div class="mx-2 mb-2" v-if="comment.value.option === 'working'">
        <BaseButton :disabled="consultationData.bill.cleared_status === 'CLEARED' ? false : true"
          @click.prevent="confirmDiagnosis(comment.value)" class="btn-primary mr-3">Confirm</BaseButton>
       </div>
      </div>
    </div>

    <div class="p-5 text-center" v-else>
      <div class="text-16 text-grey">
        No Diagnosis added yet, click the
        <span style="position: relative; top: -3px" class="text-primary mx-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
          </svg></span>
        icon to add diagnosis
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
      tag: false,
      isLoading: false,
      busy: false,
      kink: false,
      allow: true,
      step: true,
      diagnosis: {
        comment: '',
        option: ''
      },
      diagnosisCopy: '',
      form: {},
      comments: [],
      options: [
        'working',
        'confirmed'
      ]
    };
  },
  watch: {
    diagnosis() {
      if (this.diagnosis.comment != "") {
        this.allow = false;
      } else {
        this.allow = true;
      }
    },
  },
  props: {
    consultationData: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    // this.getPatientRecord();
    this.getDiagnosis();
  },
  methods: {
    async getDiagnosis() {
      try {
        this.busy = true;
        let response = await this.$axios.$get(
          `encounters/${this.$route.params.id}/charts/diag/`
        );
        console.log(response);

        this.form = response;
        this.comments = response.result;
        this.busy = false;
      } catch {}
      finally{
        this.busy = false;
      }
    },
    async confirmDiagnosis(e){
      this.diagnosisCopy = e.comment
      console.log(this.diagnosisCopy)
      try {
        let response = await this.$axios.$post(
          `encounters/${this.consultationData.id}/charts/`,
          {
            chart: {
              diag: {
                comment: this.diagnosisCopy,
                option: 'confirmed'
              },
            },
          }
        );
        this.getDiagnosis();
      } catch (error) {
        this.$toast({
          type: 'error',
          text: '',
        })
      } finally {
      }
    },
    async addDiagnosis() {
      this.isLoading = true;
      try {
        let response = await this.$axios.$post(
          `encounters/${this.consultationData.id}/charts/`,
          {
            chart: {
              diag: this.diagnosis,
            },
          }
        );

        this.tag = false;
        this.kink = false;
        this.step = true;
        this.getDiagnosis();
        this.$toast({
          type: 'success',
          text: 'Diagnosis added',
        })
        this.diagnosis = {
        comment: '',
        option: ''
        };
      } catch (error) {
        this.$toast({
          type: 'error',
          text: '',
        })
      } finally {
        // this.getPatientRecord();
        this.isLoading = false;
      }
    },
    showComment() {
      this.tag = true;
      this.kink = true;
      this.step = false;
    },
    closeForm() {
      this.tag = false;
      this.kink = false;
      this.step = true;
      this.diagnosis = "";
    },
  },
};
</script>

<style>
</style>