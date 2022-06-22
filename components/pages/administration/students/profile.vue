<template>
  <div class="fitcontent">
    <div v-if="details">
      <div
        class="d-flex justify-content-between align-items-center mt-1 px-3 px-md-4 pb-2 pt-4 fitcontent"
      >
        <h5 class="personaldetails mb-0">Personal Details</h5>
        <b-btn class="text-primary bg-white" @click="edit">Edit</b-btn>
      </div>

      <div class="ml-3 ml-md-5 mb-5">
        <div class="row">
          <div class="col-md-4 col-6">
            <div class="">
              <small class="text-secondary">First Name</small>
            </div>
            <div class="">
              <p class="namecontent">
                {{
                  details.profile_data.first_name ? details.profile_data.first_name : "--"
                }}
              </p>
            </div>
          </div>
          <div class="col-md-4 col-6">
            <div class="">
              <small class="text-secondary">Middle Name</small>
            </div>
            <div class="text-wrap">
              <p class="namecontent">
                {{
                  details.profile_data.middle_name
                    ? details.profile_data.middle_name
                    : "--"
                }}
              </p>
            </div>
          </div>
          <div class="col-md-4 col-6 text-left">
            <div class="">
              <small class="text-secondary">Last Name</small>
            </div>
            <div class="">
              <p class="namecontent">
                {{
                  details.profile_data.last_name ? details.profile_data.last_name : "--"
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-6">
            <div class="">
              <small class="text-secondary">Date of birth</small>
            </div>
            <div class="">
              <p class="namecontent">
                {{ details.profile_data["d.o.b"] ? details.profile_data["d.o.b"] : "--" }}
              </p>
            </div>
          </div>
          <div class="col-md-4 col-6">
            <div class="">
              <small class="text-secondary">Gender</small>
            </div>
            <div class="text-wrap">
              <p class="m-0 text-capitalize namecontent">
                {{ details.profile_data.gender ? details.profile_data.gender : "---" }}
              </p>
            </div>
          </div>
          <div class="col-md-4 col-6 text-left"></div>
        </div>
        <div class="row">
          <div class="col-md-4 col-6">
            <div class="">
              <small class="text-secondary">Nationality</small>
            </div>
            <div class="">
              <p class="namecontent">
                {{
                  details.profile_data.nationality
                    ? details.profile_data.nationality
                    : "--"
                }}
              </p>
            </div>
          </div>
          <div class="col-md-4 col-6">
            <div class="">
              <small class="text-secondary">State</small>
            </div>
            <div class="text-wrap">
              <p class="namecontent">
                {{ details.profile_data.state ? details.profile_data.state : "---" }}
              </p>
            </div>
          </div>
          <div class="col-md-4 col-6 text-left">
            <div class="">
              <small class="text-secondary">LGA</small>
            </div>
            <div class="">
              <p class="namecontent">
                {{ details.profile_data["l.g.a"] ? details.profile_data["l.g.a"] : "--" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- second -->
      <div v-if="emergency.length > 0">
        <div class="d-flex justify-content-between border-top px-4 pt-4">
          <h5>Emergency Contact</h5>
          <p class="text-primary"></p>
        </div>
        <div class="row ml-5">
          <div class="col-md-4 col-6">
            <div class="">
              <small class="text-secondary">Name</small>
            </div>
            <div class="">
              <p class="namecontent">
                {{ emergency[0].first_name ? emergency[0].first_name : "--" }}
                {{ emergency[0].last_name ? emergency[0].last_name : "--" }}
              </p>
            </div>
          </div>
          <div class="col-md-4 col-6 w-75">
            <div class="d-flex justify-content-center">
              <small class="text-secondary">Relationship</small>
            </div>
            <div class="d-flex justify-content-center text-center text-wrap">
              <p class="namecontent">
                {{ emergency[0].role ? emergency[0].role : "--" }}
              </p>
            </div>
          </div>
          <div class="col-md-4 col-6 text-left"></div>
        </div>
        <div class="row ml-5">
          <div class="col-md-4 col-6">
            <div class="">
              <small class="text-secondary">Phone Number</small>
            </div>
            <div class="">
              <p class="namecontent">
                {{ emergency[0].phone ? emergency[0].phone : "--" }}
              </p>
            </div>
          </div>
          <div class="col w-75">
            <div class="row d-flex justify-content-center">
              <small class="text-secondary">Email</small>
            </div>
            <div class="row d-flex justify-content-center text-center text-wrap">
              <p class="namecontent">
                {{ emergency[0].email ? emergency[0].email : "--" }}
              </p>
            </div>
          </div>
          <div class="col text-left">
            <div class="row">
              <small class="text-secondary">Address</small>
            </div>
            <div class="row">
              <p class="namecontent">
                {{ details.families.address ? details.families.address : "--" }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="border-top py-4 px-3 px-md-4">
          <h5 class="personaldetails mb-0">No Emergency Contact</h5>
        </div>
      </div>

      <!-- third -->
      <div class="mb-3 px-3 px-md-4">
        <div class="d-flex justify-content-between border-top my-1 py-4">
          <h5 class="personaldetails mb-0">Contact Details</h5>
          <p class="text-primary"></p>
        </div>

        <div class="row">
          <div class="col-md-4 col-6">
            <div class="">
              <small class="text-secondary">Phone Number</small>
            </div>
            <div class="">
              <p class="namecontent">
                {{ details.profile_data.phone ? details.profile_data.phone : "--" }}
              </p>
            </div>
            <div class="">
              <small class="text-secondary">Email</small>
            </div>
            <div class="w-75">
              <p class="color-red mr-3 namecontent">
                {{ details.profile_data.email ? details.profile_data.email : "--" }}
              </p>
            </div>
          </div>

          <div class="col-md-4 col-6 text-left">
            <div class="">
              <small class="text-secondary">Address</small>
            </div>
            <div class="">
              <p class="namecontent">
                {{
                  details.profile_data.address
                    ? details.profile_data.address
                    : "No Address"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
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
  data() {
    return {
      emergency: [],
    };
  },
  created() {
    if (this.details.families.id) {
      this.emergency = this.details.families.family_members.filter(
        (family) => family.primary_contact === true
      );
      console.log("emergency family", this.emergency);
    }

    // console.log('emergency', this.emergency[0].first_name)
    setTimeout(() => {
      console.log("prop mount", this.details);
    }, 1000);
  },
  methods: {
    show() {
      console.log("prop", this.details);
    },
    edit() {
      console.log(this.$route.params.student);
      this.$router.push(`${this.$route.params.student}/edit`);
    },
  },
};
</script>

<style scoped>
/* .mycontainer {
  width: fit-content;
} */

.personaldetails {
  font-size: 20px;
}

.namecontent {
  font-size: 14px;
}

@media screen and (max-width: 700px) {
  .personaldetails {
    font-size: 14px;
    font-weight: 900;
  }

  .namecontent {
    font-size: 12px;
  }
}
/* @media screen and (max-width: 823px) {
  .fitcontent {
    width: fit-content;
  }
} */

.profile-details {
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  column-gap: 20px;
}
.profile-details2 {
  display: grid;
  grid-template-columns: 3fr 5fr;
}
.doWraps {
  color: red;
  word-wrap: break-word;
  max-width: 1rem;
}
.color-red {
  word-wrap: break-word;
  max-width: 18rem;
}
</style>
