<template>
  <div class="">
    <div class="d-flex justify-content-between">
      <h5>Personal Detasils</h5>
      <b-btn
        class="bg-white text-primary"
        @click="$router.push(`${$route.params.employee}/edit`)"
      >
        Edit
      </b-btn>
    </div>
    <div class="mb-5 my-container">
      <div class="profile-details">
        <div class="col">
          <div class="row">
            <small class="text-secondary">First Name</small>
          </div>
          <div class="row">
            <p class="">
              {{ details.general ? details.general.first_name : '--' }}
            </p>
          </div>
        </div>
        <div class="col text-center">
          <div class="row">
            <small class="text-secondary">Middle Name</small>
          </div>
          <div class="row text-wrap">
            <p class="m-0">
              {{
                details.general.middle_name ? details.general.middle_name : '--'
              }}
            </p>
          </div>
        </div>
        <div class="col text-left">
          <div class="row">
            <small class="text-secondary">Last Name</small>
          </div>
          <div class="row">
            <p class="m-0">
              {{ details.general.last_name ? details.general.last_name : '--' }}
            </p>
          </div>
        </div>
      </div>
      <div class="profile-details">
        <div class="col">
          <div class="row">
            <small class="text-secondary">Date of Birth</small>
          </div>
          <div class="row">
            <p class="">
              {{
                details.private_information
                  ? details.private_information.citizenship.date_of_birth
                  : '--'
              }}
            </p>
          </div>
        </div>
        <div class="col">
          <div class="row d-flex">
            <small class="text-secondary">Gender</small>
          </div>
          <div class="row text-wrap">
            <p class="m-0 text-capitalize">
              {{ details.general ? details.general.gender : '--' }}
            </p>
          </div>
        </div>
      </div>
      <div class="profile-details">
        <div class="col">
          <div class="row">
            <small class="text-secondary">Nationality</small>
          </div>
          <div class="row">
            <p class="">
              {{
                details.private_information
                  ? details.private_information.citizenship.nationality
                  : '--'
              }}
            </p>
          </div>
        </div>
        <div class="col">
          <div class="row">
            <small class="text-secondary">State</small>
          </div>
          <div class="row text-wrap">
            <p class="m-0">
              {{
                details.private_information
                  ? details.private_information.citizenship.state_of_origin
                  : '--'
              }}
            </p>
          </div>
        </div>
        <div class="col text-left">
          <div class="row">
            <small class="text-secondary">LGA</small>
          </div>
          <div class="row">
            <p class="m-0">
              {{
                details.private_information
                  ? details.private_information.citizenship.LGA_of_origin
                  : '--'
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="profile-details">
        <div class="col">
          <div class="row">
            <small class="text-secondary">Marital Status</small>
          </div>
          <div class="row">
            <p class="">
              {{ details.general ? details.general.marital_status : '--' }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between border-top pt-4">
      <h5>Emergency Contact</h5>
      <p class="text-primary"></p>
    </div>
    <div class="profile-details">
      <div class="col">
        <div class="row">
          <small class="text-secondary">Name</small>
        </div>
        <div class="row">
          <p class="text-capitalize">
            {{
              details.private_information.emergency_contact.name
                ? details.private_information.emergency_contact.name
                : '--'
            }}
          </p>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <small class="text-secondary">Relationship</small>
        </div>
        <div class="row text-wrap">
          <p class="m-0 text-capitalize">
            {{
              details.private_information.emergency_contact.relationship
                ? details.private_information.emergency_contact.relationship
                : '--'
            }}
          </p>
        </div>
      </div>
      <div class="col text-left">
        <div class="row">
          <small class="text-secondary">Phone</small>
        </div>
        <div class="row">
          <p class="m-0">
            {{
              details.private_information.emergency_contact.phone
                ? details.private_information.emergency_contact.phone
                : '--'
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="row">
        <small class="text-secondary">Address</small>
      </div>
      <div class="row">
        <p class="">
          {{
            details.private_information.emergency_contact.address
              ? details.private_information.emergency_contact.address
              : '--'
          }}
        </p>
      </div>
    </div>
    <div class="d-flex justify-content-between border-top pt-4">
      <h5>Contact Details</h5>
      <p class="text-primary"></p>
    </div>
    <div class="profile-details">
      <div class="col">
        <div class="row">
          <small class="text-secondary">Phone</small>
        </div>
        <div class="row">
          <p class="">
            {{ details.general ? details.general.phone_number : '--' }}
          </p>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <small class="text-secondary">Email</small>
        </div>
        <div class="row text-wrap">
          <p class="m-0">
            {{ details.general ? details.general.email : '--' }}
          </p>
        </div>
      </div>
      <div class="col text-left">
        <div class="row">
          <small class="text-secondary">Address</small>
        </div>
        <div class="row">
          <p class="m-0">
            {{
              details.private_information.contact_information.address
                ? details.private_information.contact_information.address
                : '--'
            }}
          </p>
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
      required: false,
      default: () => ({}),
    },
  },
  mounted() {
    console.log('profile', this.details)
  },
  methods: {},
}
</script>

<style scoped>
.profile-details {
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  column-gap: 20px;
}
</style>
