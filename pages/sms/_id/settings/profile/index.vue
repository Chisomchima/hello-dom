<template>
  <div class="mt-5">
    <div class="rounded bg-white py-2 px-md-3 px-2">
      <!-- <b-card class="row">
        <div class="col-md-3 col-6 my-2 my-md-3 d-flex">
          <b-skeleton type="avatar" width="50%" height="100px"></b-skeleton>
        </div>

        <div class="col-12 my-2 my-md-3">
          <b-skeleton animation="wave" width="70%"></b-skeleton>
        </div>
      </b-card> -->

      <div class="row">
        <div class="col-md-3 col-6 my-3 my-md-3">
          <div class="">
            <h2 class="fs-20 text-center" style="word-wrap: break-word">
              {{
                schoolProfile.profile ? schoolProfile.profile.school_name : ''
              }}
            </h2>

            <div class="d-flex justify-content-center">
              <img
                :src="schoolProfile.image + '?v=' + Math.random()"
                alt=""
                class="img-fluid"
                width="40%"
              />
            </div>

            <div class="d-none d-md-block">
              <div class="d-flex justify-content-center mt-5">
                <BaseButton
                  class="btn btn-primary py-2 px-3"
                  @click="editProfile"
                >
                  Edit Profile
                </BaseButton>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-6 my-3 my-md-3">
          <div>
            <h3 class="fs-16 mb-1">School Motto</h3>
            <p class="fs-14">
              {{
                schoolProfile.profile ? schoolProfile.profile.school_motto : ''
              }}
            </p>
          </div>

          <div class="mt-5">
            <h3 class="fs-16 mb-1">Phone</h3>
            <p class="fs-14 mb-1">
              {{
                schoolProfile.profile
                  ? schoolProfile.profile.contact_number
                  : ''
              }}
            </p>
            <p class="fs-14">
              {{
                schoolProfile.profile
                  ? schoolProfile.profile.alt_contact_number
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="col-md-3 col-6 my-3 my-md-3">
          <div>
            <h3 class="fs-16 mb-1">Address</h3>
            <p class="fs-14">
              {{ schoolProfile.profile ? schoolProfile.profile.address : '' }}
            </p>
          </div>

          <div class="mt-3">
            <h3 class="fs-16 mb-1">Instagram</h3>
            <p class="fs-14 mb-1">
              {{
                schoolProfile.profile
                  ? schoolProfile.profile.instagram_name
                  : ''
              }}
            </p>
          </div>
          <div class="mt-3">
            <h3 class="fs-16 mb-1">Facebook</h3>
            <p class="fs-14 mb-1">
              {{
                schoolProfile.profile ? schoolProfile.profile.facebook_name : ''
              }}
            </p>
          </div>
        </div>
        <div class="col-md-3 col-6 my-3 my-md-3">
          <div>
            <h3 class="fs-16 mb-1">Email</h3>
            <p class="fs-14 mb-1">
              {{
                schoolProfile.profile ? schoolProfile.profile.contact_email : ''
              }}
            </p>
            <p class="fs-14">
              {{
                schoolProfile.profile
                  ? schoolProfile.profile.alt_contact_email
                  : ''
              }}
            </p>
          </div>

          <div class="mt-3">
            <h3 class="fs-16 mb-1">Twitter</h3>
            <p class="fs-14 mb-1">
              {{
                schoolProfile.profile ? schoolProfile.profile.twitter_name : ''
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center my-5 d-block d-md-none">
        <BaseButton class="btn btn-primary py-2 px-3" @click="editProfile">
          Edit Profile
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store, route, $axios }) {
    try {
      const school = store.getters['student/getSchoolByCode'](route.params.id)
      const { data: schoolProfile } = await $axios.$get(
        `slate-admin/school/${school.id}/profile`
      )
      return { schoolProfile }
    } catch (e) {
      console.log(e)
    }
  },

  data() {
    return {
      isBusy: false,
    }
  },

  methods: {
    editProfile() {
      this.$router.push(`/sms/${this.$route.params.id}/settings/profile/edit`)
    },
  },
}
</script>

<style lang="css" scoped></style>
