<template>
  <div>
    <div class="w-100">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="text-grey text-18 mb-0">Chief Complaints</h4>

        <div @click="showComment" v-show="step" id="button-5">
          <div class="text-primary" style="cursor: pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
              class="bi bi-plus-square-fill" viewBox="0 0 16 16">
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
            </svg>
          </div>

          <b-tooltip target="button-5" placement="bottom">
            Add Complaints
          </b-tooltip>
        </div>
        <div @click.prevent="closeForm" id="button-6" v-show="kink">
          <div class="text-primary" style="cursor: pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-square"
              viewBox="0 0 16 16">
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          </div>

          <b-tooltip target="button-6" placement="bottom">Close </b-tooltip>
        </div>
      </div>

      <br />
      <div v-show="tag">
        <div style="max-width: 95%">
          <textarea v-model="complaint" class="p-3 form-control ng-untouched ng-pristine ng-valid" cols="20"
            rows="10"></textarea>
        </div>

        <div style="height: 38px" class="w-100 mt-4 text-16 d-flex justify-content-end">
          <BaseButton :disabled="consultationData.bill.cleared_status === 'CLEARED' ? false : true" @click.prevent="addComplaint"
            class="btn-primary">Save</BaseButton>
          <!-- <button @click.prevent="addComplaint" class="btn text-16 theme-color text-white">
            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <slot>Save </slot>
          </button> -->
        </div>
      </div>
    </div>

    <div v-if="!consultationData.chief_complaint" class="p-5">
      <div class="text-16 text-center">
        No Complaints added yet, click the
        <span class="text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-plus-square-fill" viewBox="0 0 16 16">
            <path
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
          </svg></span>
        to add a chief complaint
      </div>
      <div class="d-flex justify-content-center text-primary my-3">
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

    <div v-if="consultationData.chief_complaint" class="card text-16 text-grey mt-3 px-3 pb-3 pt-2">
      {{ consultationData.chief_complaint }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: false,
      isLoading: false,
      kink: false,
      step: true,
      allow: true,
      form: {},
      complaint: "",
    };
  },
  props: {
    consultationData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    complaint() {
      if (this.complaint != "") {
        this.allow = false;
      } else {
        this.allow = true;
      }
    },
  },
  mounted() {
    // this.getPatientRecord();
    this.complaint = this.consultationData.chief_complaint;
  },
  methods: {
    async getPatientRecord() {
      try {
        let response = await this.$axios.$get(
          `encounters/encounter/${this.$route.params.id}`
        );
        this.form = response;
        this.complaint = this.form.chief_complaint;
        // this.patientData = response.patient;
      } catch {
      } finally {
      }
    },
    async addComplaint() {
      this.form.chief_complaint = this.complaint;
      this.isLoading = true;

      try {
        let response = await this.$axios.$patch(
          `encounters/encounter/${this.consultationData.id}/`,
          this.form
        );

         this.$toast({
          type: 'success',
          text: 'Chief complaint added',
        })
        this.$emit("refresh", true);
        this.tag = false;
        this.kink = false;
        this.step = true;
      } catch (error) {
        this.$toast({
          type: 'error',
          text: 'Unable to add chief complaint',
        })
      } finally {
        this.getPatientRecord();
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
    },
  },
};
</script>

<style>
</style>