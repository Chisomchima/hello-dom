<template>
  <div class="">
    <div v-if="profile" class="bg-white new-height rounded p-2">
      <div class="dropdown d-flex justify-content-end text-secondary">
        <div class="dropdown">
          <button
            id="dropdownMenuButton"
            class="btn btn bg-white text-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            Actions
          </button>
          <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
            <span @click="">
              <nuxt-link
                class="dropdown-item text-primary"
                :to="$route.params.employee + '/edit'"
                >Edit</nuxt-link
              >
            </span>
            <nuxt-link class="dropdown-item" to="#">Resend Mail</nuxt-link>

            <nuxt-link class="dropdown-item" to="#">Deactivate Staff</nuxt-link>

            <!-- <nuxt-link class="dropdown-item text-danger" to="#"
              >Delete Record</nuxt-link
            > -->
          </div>
        </div>
      </div>
      <CameraComponent :demo="demo" @myevent="somefunction" />
      <div class="text-center">
        <span>
          <b-avatar
            size="6rem"
            style="cursor: pointer"
            icon="person-fill"
            badge
            badge-variant="primary"
          >
            <template #default>
              <img
                @click.self="showImageModal"
                class="img-fluid"
                :src="
                  profile.general.avatar ? profile.general.avatar + '?v=' + version : ''
                "
              />
            </template>
            <template #badge>
              <span>
                <b-icon
                  id="dropdownMenuButton"
                  icon="camera"
                  font-scale="1.3"
                  class="dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                ></b-icon>

                <div
                  class="dropdown-menu text-center"
                  aria-labelledby="dropdownMenuButton"
                >
                  <span @click.stop="toggleCamera">
                    <nuxt-link class="dropdown-item" to="#">Capture Image</nuxt-link>
                  </span>
                  <span @click.stop="onClickFileUpload_">
                    <nuxt-link class="dropdown-item" to="#">Upload</nuxt-link>
                  </span>
                  <span v-if="profile.general.avatar" @click.stop="deleteImage">
                    <nuxt-link class="dropdown-item" to="#">Delete</nuxt-link>
                  </span>
                </div>
              </span>
            </template>
          </b-avatar>
        </span>

        <div v-if="showCropper">
          <image-cropper @saved="savedImage" @cancelled="cancelImage" />
        </div>
        <p class="mt-3 font-weight-bold m-0">
          {{ profile.general ? profile.general.first_name : "--" }}
          {{ profile.general ? profile.general.middle_name : "--" }}
          {{ profile.general ? profile.general.last_name : "--" }}
        </p>
        <p class="text-secondary m-0">
          {{ profile.general ? profile.general.ID_no : "--" }}
        </p>
        <div>
          <template v-if="profile.general">
            <span v-if="profile.general.active === true" class="badge_icon text-success">
              ACTIVE
            </span>
          </template>
          <span v-else class="badge_icon text-danger"> INACTIVE </span>
        </div>
      </div>
      <div class="mb-3 mt-4 border-bottom border-top row">
        <div class="mx-2 py-2 my-2 w-100">
          <div class="row w-100 m-0">
            <p class="m-0 col text-secondary">Department:</p>
            <p class="col">
              {{ profile.general.department ? profile.general.department : "--" }}
            </p>
          </div>
          <div class="row w-100 m-0">
            <p class="m-0 col text-secondary">Position:</p>
            <p class="m-0 col">
              {{ profile.general.position ? profile.general.position : "--" }}
            </p>
          </div>
        </div>
      </div>
      <div class="pl-2 mb-2">
        <p class="text-secondary my-2">Staff Code:</p>
        <div class="row px-2">
          <div v-if="!profile.general.linked" class="col">
            <div class="row">
              <input
                v-model="message"
                disabled
                class="border rounded border-primary text-center p-1 col-9 mb-3"
              />

              <div
                v-clipboard:copy="message"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                class="col-2 border rounded size border-primary pt-1 mb-3 d-flex justify-content-center mx-2 text-center"
              >
                <span>
                  <span
                    class="iconify text-primary"
                    data-icon="fluent:copy-16-regular"
                    data-width="30"
                  ></span>
                </span>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="dropdown d-flex justify-content-end text-secondary">
                <div class="dropdown">
                  <button
                    id="dropdownMenuButton"
                    class="btn btn bg-white text-primary dropdown-toggle no-arrow mr-5"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Share
                    <span class="iconify" data-icon="entypo:share" data-width="17"></span>
                  </button>
                  <div
                    class="dropdown-menu text-center"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <span @click="emailCode">
                      <nuxt-link class="dropdown-item" to="#">Email Staff code</nuxt-link>
                    </span>
                    <span @click="smsCode">
                      <nuxt-link class="dropdown-item" to="#">SMS Staff code</nuxt-link>
                    </span>
                  </div>
                </div>
              </div>

              <div class="border-left text-primary" @click="">
                <button
                  id="dropdownMenuButton"
                  class="btn btn bg-white text-primary ml-4"
                  type="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  @click="send_activation_code"
                >
                  Reset
                  <span
                    class="iconify"
                    data-icon="pepicons:reload"
                    data-rotate="180deg"
                  ></span>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="col text-primary" @click="send_activation_code">
            <span class="border-right mr-2 pr-3">
              <span class="border border-primary rounded p-1"> Connected </span>
            </span>
            <span class="text-primary pl-4">
              Reset
              <span
                class="iconify"
                data-icon="pepicons:reload"
                data-rotate="180deg"
              ></span>
            </span>
          </div>
          <ModalWrapper
            id="staffEmail"
            title="Email staff code"
            submit-title="Email"
            @ok="emailStaffCode"
          >
            <div>Are you sure you want to email this staff code</div>
          </ModalWrapper>
          <ModalWrapper
            id="staffSmS"
            title="SMS staff code"
            submit-title="Send"
            @ok="smsStaffCode"
          >
            <div>Are you sure you want to text this staff code</div>
          </ModalWrapper>
        </div>
      </div>
    </div>
    <div v-else>Empty state</div>
    <ModalWrapper id="showImage" noFooter title="">
      <div class="d-flex align-items-center justify-content-center">
        <img
          v-if="profile.general.avatar"
          :src="profile.general ? profile.general.avatar + '?v=' + version : ''"
          width="100%"
          alt=""
        />
        <div v-else>
          <h2>Please add an Image</h2>
        </div>
      </div>
    </ModalWrapper>
  </div>
</template>

<script>
import ImageCropper from "~/components/Utils/ImageCropper.vue";

export default {
  components: {
    ImageCropper,
  },
  props: {
    profile: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      showCropper: false,
      schoolId: "",
      demo: false,

      version: "",
    };
  },
  computed: {
    message() {
      return `${this.profile.general.school_code}-${this.profile.general.activation_code}`;
    },
    slate_school_id() {
      return this.$store.state.administration.school.id;
    },
  },
  mounted() {
    this.version = Math.random();
  },
  methods: {
    showImageModal() {
      if (this.profile.general.avatar) {
        this.$bvModal.show("showImage");
      }
    },
    async savedImage(e) {
      this.imagesArray = e.croppedImageURI;
      const fd = new FormData();
      fd.append("avatar", this.imagesArray);
      try {
        await this.$axios.put(
          `/slate-admin/staff/hr/${this.$route.params.employee}/avatar/`,
          fd
        );
        this.showCropper = false;

        this.$nuxt.refresh();

        this.version = Math.random();
      } catch (error) {
        console.log(error);
      }

      // this.submitImage();
    },
    async somefunction(e) {
      const slate_admission_id = this.$route.params.employee;
      const fd = new FormData();
      fd.append("avatar", e);
      try {
        await this.$axios.put(
          `/slate-admin/staff/hr/${this.$route.params.employee}/avatar/`,
          fd
        );
        this.$nuxt.refresh();

        this.version = Math.random();

        this.version = Math.random();
      } catch (error) {
        console.log(error);
      } finally {
        this.toggleCamera();
      }
    },
    toggleCamera() {
      this.demo = !this.demo;
    },
    smsCode() {
      this.$bvModal.show("staffSmS");
    },
    async smsStaffCode() {
      try {
        await this.$axios.post(
          `/slate-admin/school/${this.slate_school_id}/send/activation_code/sms/?entity=staff`,
          {
            entity_name: "staff",
            entity_id: this.$route.params.employee,
          }
        );
        this.$bvModal.hide("staffSmS");
      } catch (error) {
        console.log(error);
      }
    },
    async emailStaffCode() {
      try {
        await this.$axios.post(
          `/slate-admin/school/${this.slate_school_id}/send/activation_code/?entity=staff`,
          {
            entity_name: "staff",
            entity_id: this.$route.params.employee,
          }
        );
        this.$bvModal.hide("staffEmail");
      } catch (error) {
        console.log(error);
      }
    },
    emailCode() {
      this.$bvModal.show("staffEmail");
    },
    async printCode() {
      const slate_school_id = await this.$store.state.administration.school.id;
      const slate_admission_id = this.$route.params.student;

      try {
        const response = await this.$axios.get(
          `/slate-admin/school/${slate_school_id}/print/activation_code/?entity=student&entity_id=${slate_admission_id}`,
          { responseType: "blob" }
        );
        console.log("activation code", response.data);
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${this.details.basic.name}.pdf`;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {}
    },

    async deleteImage() {
      const fd2 = new FormData();
      fd2.append("avatar", "");
      try {
        const response = await this.$axios.put(
          `slate-admin/staff/hr/${this.$route.params.employee}/avatar/`,
          fd2
        );

        console.log("response is", response);
        await this.$nuxt.refresh();

        // this.getStudent()
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProfile() {},
    async submitImage() {
      // this.deleteImage()
      const slate_admission_id = this.$route.params.employee;
      await this.$axios.put(`/slate-admin/staff/hr/${slate_admission_id}/update/`, {
        staff_id: this.$route.params.employee,
        general: {
          avatar: this.imagesArray,
        },
      });
      await this.$nuxt.refresh();
      console.log("avatar url is", this.avatar);
      this.version = Math.random();
    },
    async send_activation_code() {
      const slate_school_id = await this.$store.state.administration.school.id;
      this.schoolId = slate_school_id;
      const staff = this.$route.params.employee;
      try {
        const response = await this.$axios.post(
          `/slate-admin/school/${slate_school_id}/reset/entity/`,
          {
            entity: "staff",
            id: staff,
          }
        );
        await this.$nuxt.refresh();

        // this.getStudent()

        const entity_id = response.data.data.admission_id;
      } catch (error) {}
    },
    onCopy(e) {
      try {
        this.$bvToast.toast(`${e.text}`, {
          title: `Copied`,
          variant: "info",
          solid: true,
        });
      } catch (e) {
        console.log(e);
      }
    },

    cancelImage() {
      this.showCropper = false;
    },

    onClickFileUpload_() {
      this.showCropper = !this.showCropper;
    },
    onError(e) {
      alert("Failed to copy texts");
    },
  },
};
</script>

<style scoped></style>
