<template>
  <div class="mt-5">
    <div class="rounded bg-white py-2 px-md-3 px-2">
      <div
        class="d-flex align-items-center border-bottom py-3 mb-0"
        style="cursor: pointer"
        @click="$router.go(-1)"
      >
        <span
          class="iconify"
          data-icon="eva:arrow-back-outline"
          data-width="25"
          data-height="25"
        ></span>

        <h2 class="fs-18 mb-0">Edit School Profile</h2>
      </div>

      <div v-if="isBusy" class="row">
        <div class="col-md-4 my-2 my-md-3">
          <div class="border rounded d-flex justify-content-center p-2">
            <b-skeleton type="avatar" width="30%" height="100px"></b-skeleton>
          </div>

          <div class="my-3">
            <b-skeleton type="input" class="my-2"></b-skeleton>
            <b-skeleton type="input" class="my-2"></b-skeleton>
            <b-skeleton type="input" class="my-2"></b-skeleton>
          </div>
        </div>

        <div class="col-md-8 my-2 my-md-3">
          <div>
            <h3 class="fs-14 mb-1">Fill in School Information</h3>

            <b-skeleton type="input" class="my-2"></b-skeleton>
            <b-skeleton type="input" class="my-2"></b-skeleton>
          </div>

          <div class="mt-4">
            <h3 class="fs-16 mb-1">Phone</h3>

            <div class="row">
              <div class="col-md-6 my-2 my-md-0">
                <b-skeleton type="input" class="my-3"></b-skeleton>
                <b-skeleton type="input" class="my-3"></b-skeleton>
              </div>
              <div class="col-md-6">
                <b-skeleton type="input" class="my-3"></b-skeleton>
                <b-skeleton type="input" class="my-3"></b-skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="row">
        <div class="col-md-4 my-2 my-md-3">
          <div class="">
            <div class="d-flex justify-content-between mb-2 align-items-center">
              <h2 class="fs-14 mb-0">Upload School Crest</h2>
              <span class="text-danger" style="cursor: pointer" @click="deleteImg"
                ><span
                  class="iconify"
                  data-icon="gg:trash-empty"
                  data-width="18"
                  data-height="18"
                ></span
              ></span>
            </div>

            <div class="border rounded d-flex justify-content-center p-2">
              <input
                id="upload"
                ref="fileup"
                type="file"
                name="upload"
                class="upload-box"
                accept="image/png, image/jpeg"
                placeholder="Upload File"
                @change="getImage($event)"
              />

              <img :src="schoolProfile.image" alt="" class="img-fluid" width="30%" />
            </div>

            <div class="my-3">
              <input
                v-if="schoolProfile.profile"
                v-model="schoolProfile.profile.instagram_name"
                type="text"
                class="form-control py-4 my-2"
                placeholder="Instagram Handle"
              />
              <input
                v-if="schoolProfile.profile"
                v-model="schoolProfile.profile.facebook_name"
                type="text"
                class="form-control py-4 my-2"
                placeholder="Facebook Handle"
              />
              <input
                v-if="schoolProfile.profile"
                v-model="schoolProfile.profile.twitter_name"
                type="text"
                class="form-control py-4 my-2"
                placeholder="Twitter Handle"
              />
            </div>
          </div>
        </div>

        <div class="col-md-8 my-2 my-md-3">
          <div>
            <h3 class="fs-14 mb-1">Fill in School Information</h3>

            <input
              v-if="schoolProfile.profile"
              v-model="schoolProfile.profile.school_name"
              type="text"
              class="form-control py-4 my-2"
              placeholder="School Name"
            />
            <input
              v-if="schoolProfile.profile"
              v-model="schoolProfile.profile.school_motto"
              type="text"
              class="form-control py-4 my-2"
              placeholder="School Motto"
            />
          </div>

          <div class="mt-4">
            <h3 class="fs-16 mb-1">Phone</h3>

            <div class="row">
              <div class="col-md-6 my-2 my-md-0">
                <input
                  v-if="schoolProfile.profile"
                  v-model="schoolProfile.profile.contact_number"
                  type="text"
                  class="form-control py-4 my-2"
                  placeholder="Contact Number"
                />
              </div>
              <div class="col-md-6 my-2 my-md-0">
                <input
                  v-if="schoolProfile.profile"
                  v-model="schoolProfile.profile.contact_email"
                  type="text"
                  class="form-control py-4 my-2"
                  placeholder="Contact Email"
                />
              </div>
              <div class="col-md-6 my-2 my-md-0">
                <input
                  v-if="schoolProfile.profile"
                  v-model="schoolProfile.profile.alt_contact_number"
                  type="text"
                  class="form-control py-4 my-2"
                  placeholder="Alt Contact Number"
                />
              </div>
              <div class="col-md-6 my-2 my-md-0">
                <input
                  v-if="schoolProfile.profile"
                  v-model="schoolProfile.profile.alt_contact_email"
                  type="text"
                  class="form-control py-4 my-2"
                  placeholder="Alt Contact Email"
                />
              </div>
              <div class="col-md-12 my-2 my-md-0">
                <textarea
                  v-if="schoolProfile.profile"
                  v-model="schoolProfile.profile.address"
                  type="text"
                  class="form-control py-4 my-2"
                  placeholder="Address"
                />
              </div>
            </div>

            <div class="d-flex align-items-center justify-content-end mt-4">
              <b-button @click="$router.go(-1)" variant="light" class="py-2 px-5 mx-3"
                >Cancel</b-button
              >
              <BaseButton class="btn btn-primary py-2 px-5" @click="saveProfile">
                Save
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schoolProfile: {},
      editProfile: {},
      isBusy: false,
      randomNumber: 0,
    };
  },
  async fetch() {
    this.isBusy = true;
    const school = this.$store.getters["school/getSchoolByCode"](this.$route.params.id);
    try {
      const { data } = await this.$axios.$get(`slate-admin/school/${school.id}/profile`);

      this.schoolProfile = data;
      this.isBusy = false;
      console.log(data);
      this.randomNumber = Math.random();
    } catch (error) {
      console.log(error);
      this.isBusy = false;
    }
  },

  computed: {
    school() {
      return this.$store.getters["school/getSchoolByCode"](this.$route.params.id);
    },
  },
  methods: {
    async saveProfile() {
      const tosend = {
        school_meta: {
          address: this.schoolProfile.profile.address,
          alt_contact_email: this.schoolProfile.profile.alt_contact_email,
          alt_contact_number: this.schoolProfile.profile.alt_contact_number,
          contact_email: this.schoolProfile.profile.contact_email,
          contact_number: this.schoolProfile.profile.contact_number,
          facebook_name: this.schoolProfile.profile.facebook_name,
          image: this.schoolProfile.image,
          instagram_name: this.schoolProfile.profile.instagram_name,
          school_motto: this.schoolProfile.profile.school_motto,
          school_name: this.schoolProfile.profile.school_name,
          twitter_name: this.schoolProfile.profile.twitter_name,
        },
      };
      try {
        await this.$axios.$post(`slate-admin/school/${this.school.id}/profile/`, tosend);

        // await this.$nuxt.refresh();
        this.$store.commit(
          "administration/UPDATE_SCHOOL",
          this.schoolProfile.profile.school_name
        );
        this.$router.go(-1);
      } catch (e) {
        console.log(e);
      }
    },

    getImage(event) {
      try {
        const picture = new FileReader();

        picture.readAsDataURL(event.target.files[0]);

        picture.onload = () => {
          this.schoolProfile.image = picture.result;
        };
        // this.randomNumber = Math.random();
        console.log(this.schoolProfile.image);
        // this.updateImage();
      } catch (e) {
        console.log(e);
      }
    },

    // doesnt work
    async updateImage() {
      const newimage = new FormData();
      newimage.append("schoolimage", this.schoolProfile.image);

      newimage.append("type", "image");

      try {
        const data = await this.$axios.$post(
          `schools/v2/school/${this.school.id}/resource/`,
          newimage
        );
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },

    deleteImg() {
      this.schoolProfile.image = "";
    },
  },
};
</script>

<style lang="css" scoped>
#upload {
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 20%;
  top: 36px;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
