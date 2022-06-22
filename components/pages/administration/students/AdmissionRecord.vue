<template>
  <div>
    <div>
      <div class="d-flex justify-content-between mt-1 px-4 pb-2 pt-4">
        <h5 class="personaldetails mb-0" @click="show">Student Admission Record</h5>
        <!-- <p class="text-primary" @click="edit">Edit</p> -->
      </div>
      <div class="row px-4">
        <div class="col-md-4 col-6">
          <small class="text-secondary"> Admission Number</small>
          <p class="namecontent">
            {{
              details.admission_record.admission_number
                ? details.admission_record.admission_number
                : "---"
            }}
          </p>
        </div>
        <div class="col-md-4 col-6">
          <div class="">
            <small class="text-secondary"> Date of Admission</small>
            <p class="namecontent">
              {{
                details.admission_record.admission_number_date
                  ? details.admission_record.admission_number_date
                  : "--"
              }}
            </p>
          </div>
        </div>
        <div class="col-md-4 col-6">
          <div class="">
            <small class="text-secondary"> Grade</small>
            <p class="namecontent">
              {{ details.basic.grade_level ? details.basic.grade_level : "--" }}
            </p>
          </div>
        </div>

        <!-- <div class="col-md-4 col-6 d-flex justify-content-end text-primary"></div> -->

        <div class="col-md-4 col-6 px-3 pb-4">
          <div class="">
            <small class="text-secondary"> Class Admitted</small>
            <p class="namecontent">
              {{
                details.admission_record.class_admitted
                  ? details.admission_record.class_admitted
                  : "--"
              }}
            </p>
          </div>
          <div class="text-center m-auto"></div>
          <div></div>
          <div class="d-flex justify-content-end text-primary"></div>
        </div>
      </div>

      <!-- second -->
      <div>
        <div class="d-flex justify-content-between border-top mt-1 px-4 pt-4">
          <h5 class="personaldetails mb-0">Student Exit Record</h5>
          <p class="text-primary"></p>
        </div>
        <div class="row px-4">
          <div class="col-md-4 col-6">
            <small class="text-secondary"> Date of Exit</small>
            <p class="namecontent">None</p>
          </div>
          <div class="col-md-4 col-6">
            <div class="text-center">
              <small class="text-secondary"> Exit Type</small>
              <p class="namecontent">None</p>
            </div>
          </div>

          <div class="col-md-4 col-6 pb-4">
            <div class="">
              <small class="text-secondary"> Reason</small>
            </div>
            <div class="namecontent">None</div>
          </div>

          <div class="d-flex justify-content-end text-primary"></div>
        </div>
      </div>

      <!-- third -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  mounted() {},
  methods: {
    edit() {},
    show() {
      console.log("prop", this.details);
    },
  },
};
</script>

<style scoped>
.profile-details {
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  column-gap: 20px;
}
</style>
