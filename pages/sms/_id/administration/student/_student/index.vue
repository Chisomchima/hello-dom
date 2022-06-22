<template>
  <div class="">
    <div v-if="details">
      <CameraComponent :demo="demo" @myevent="somefunction" />
    </div>

    <div class="row mt-2">
      <div class="col-lg-4 my-3 my-lg-0">
        <div class="bg-white rounded p-2">
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
                <span @click="edit">
                  <nuxt-link class="dropdown-item text-primary" to="#">Edit</nuxt-link>
                </span>
                <!-- <span @click="handlePromote">
                  <nuxt-link class="dropdown-item" to="#">Promote</nuxt-link>
                </span>
                <span @click="handleGraduate">
                  <nuxt-link class="dropdown-item" to="#">Graduate</nuxt-link>
                </span> -->

                <nuxt-link class="dropdown-item text-danger" to="#">Withdraw</nuxt-link>
                <span
                  v-show="details.basic.house === null"
                  v-b-modal.house
                  @click="getHouse"
                >
                  <nuxt-link class="dropdown-item" to="#">Assign House</nuxt-link>
                  <b-modal id="house">
                    <template #modal-header="{ close }">
                      <!-- Emulate built in modal header close button action -->
                      <h5>Assign house</h5>

                      <span @click="close()">
                        <span
                          class="iconify text-secondary"
                          data-icon="bi:x"
                          data-width="40"
                          data-height="40"
                        ></span>
                      </span>
                    </template>

                    <template #default>
                      <div class="p-2">
                        <p>Select a house</p>
                        <b-form-select v-model="selectedHouse" class="mb-3">
                          <b-form-select-option value=""
                            >Please select a house</b-form-select-option
                          >
                          <template v-for="(house, index) in houseList">
                            <b-form-select-option :key="index" class="" :value="house.id"
                              >{{ house.name }}
                            </b-form-select-option>
                          </template>
                        </b-form-select>
                      </div>
                    </template>

                    <template #modal-footer="{ ok, cancel }">
                      <!-- Emulate built in modal footer ok and cancel button actions -->

                      <b-btn class="btn-light p-2 w-25" @click="cancel()"> Cancel</b-btn>
                      <b-btn class="btn-primary p-2 w-25" @click="addHouse">
                        Add Student</b-btn
                      >

                      <!-- Button with custom close trigger value -->
                    </template>
                  </b-modal>
                </span>
                <span
                  v-show="details.basic.class_name === null"
                  v-b-modal.class
                  @click="getClass"
                >
                  <nuxt-link class="dropdown-item" to="#">Assign class</nuxt-link>
                </span>
                <b-modal id="class">
                  <template #modal-header="{ close }">
                    <!-- Emulate built in modal header close button action -->
                    <h5>Assign class</h5>

                    <span @click="close()">
                      <span
                        class="iconify text-secondary"
                        data-icon="bi:x"
                        data-width="40"
                        data-height="40"
                      ></span>
                    </span>
                  </template>

                  <template #default>
                    <div class="p-2">
                      <p>
                        Select a class in grade
                        {{ details.basic.grade_level }}
                      </p>
                      <b-form-select
                        v-if="classList"
                        v-model="selectedClass"
                        class="mb-3"
                      >
                        <b-form-select-option value=""
                          >Please select a class</b-form-select-option
                        >
                        <template v-for="(grade, index) in classList">
                          <b-form-select-option :key="index" class="" :value="grade.id">{{
                            grade.name
                          }}</b-form-select-option>
                        </template>
                        <b-form-select-option
                          v-if="classList.length < 1"
                          disabled
                          value=""
                          >No available class for this grade</b-form-select-option
                        >
                      </b-form-select>
                    </div>
                  </template>

                  <template #modal-footer="{ ok, cancel }">
                    <!-- Emulate built in modal footer ok and cancel button actions -->

                    <b-btn class="btn-light p-2 w-25" @click="cancel()"> Cancel</b-btn>
                    <b-btn class="btn-primary p-2 w-25" @click="addClass">
                      Add Student</b-btn
                    >

                    <!-- Button with custom close trigger value -->
                  </template>
                </b-modal>
              </div>
            </div>
          </div>
          <div class="text-center">
            <div>
              <span>
                <b-avatar
                  style="cursor: pointer"
                  size="6rem"
                  icon="person-fill"
                  badge
                  class="mx-auto"
                  badge-variant="primary"
                  :src="avatar"
                >
                  <template #default>
                    <img
                      @click.self="showImageModal"
                      class="img-fluid"
                      :src="avatar"
                      alt=""
                    />
                  </template>
                  <template #badge>
                    <span class="">
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
                        style="z-index: 1060"
                      >
                        <span @click.stop="toggleCamera">
                          <nuxt-link class="dropdown-item" to="#"
                            >Capture Image</nuxt-link
                          >
                        </span>

                        <span @click.stop="onClickFileUpload_">
                          <nuxt-link class="dropdown-item" to="#">Upload</nuxt-link>
                        </span>
                        <span v-if="!avatar.includes('null')" @click.stop="deleteImage">
                          <nuxt-link class="dropdown-item" to="#">Delete</nuxt-link>
                        </span>
                      </div>
                    </span>
                  </template>
                </b-avatar>
              </span>
            </div>

            <input
              ref="fileInput"
              class="invisible"
              type="file"
              name="imagesArray"
              @change="onChange"
            />
            <p class="m-0 namecontent">
              {{ details.basic.name ? details.basic.name : "-" }}
            </p>
            <div v-if="showCropper">
              <image-cropper @saved="savedImage" @cancelled="cancelImage" />
            </div>
            <p class="m-0 namecontent">
              {{ details.basic.grade_level ? details.basic.grade_level : "-" }}
            </p>
            <p class="namecontent">
              {{ details.admission_record.admission_number }}
            </p>
            <span v-if="details.basic.status === true" class="badge_icon text-success">
              ACTIVE
            </span>

            <span
              v-else
              class="p-1 m-0 rounded text-center text-danger border border-danger"
            >
              INACTIVE
            </span>
          </div>
          <div class="mb-3 mt-4 border-bottom border-top row">
            <div class="mx-2 py-2 w-100">
              <div class="row w-100 m-0">
                <p class="m-0 col text-secondary namecontent-title">Academic Year:</p>
                <p class="m-0 col namecontent">
                  {{
                    details.basic.latest_academic_year
                      ? details.basic.latest_academic_year
                      : "--"
                  }}
                </p>
              </div>
              <div class="row w-100 m-0">
                <p class="m-0 col text-secondary">Class:</p>
                <p class="m-0 col namecontent">
                  {{
                    details.admission_record.class_admitted
                      ? details.admission_record.class_admitted
                      : "--"
                  }}
                </p>
              </div>
              <div class="row w-100 m-0">
                <p class="m-0 col text-secondary">Attendance:</p>
                <template v-if="details.basic.attendance != null">
                  <p class="col m-0 namecontent">
                    {{
                      details.basic.attendance.present
                        ? details.basic.attendance.present
                        : "--"
                    }}
                    /{{
                      details.basic.attendance.total_attendance
                        ? details.basic.attendance.total_attendance
                        : "--"
                    }}
                    days
                  </p>
                </template>

                <template v-else>
                  <p class="col m-0 namecontent">_ /_ days</p>
                </template>
              </div>
              <div class="row w-100 m-0">
                <p class="m-0 col text-secondary">Form Teacher:</p>
                <p class="m-0 col namecontent">
                  {{ details.basic.form_teacher ? details.basic.form_teacher : "-" }}
                </p>
              </div>
              <div class="row w-100 m-0">
                <p class="m-0 col text-secondary">House:</p>
                <div v-if="details.basic.house != null" class="col">
                  <p
                    v-if="details.basic.house === 'Blue House'"
                    class="mr-4 rounded text-center text-primary border border-primary namecontent"
                  >
                    {{ details.basic.house }}
                  </p>
                  <p
                    v-else-if="details.basic.house === 'Yellow House'"
                    class="mx-5 rounded text-center text-warning border border-warning namecontent"
                  >
                    {{ details.basic.house }}
                  </p>
                  <p v-else class="namecontent">{{ details.basic.house }}</p>
                </div>
                <div v-else class="col">
                  <p class="namecontent">--</p>
                </div>
              </div>
            </div>
          </div>
          <div class="pl-2 mb-2">
            <p class="text-secondary my-2">STUDENT CODE:</p>
            <div class="row px-2">
              <div v-if="!details.basic.linked" class="col">
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
              </div>
              <div v-else class="col text-primary">
                <span class="border-right mr-2 pr-3">
                  <span class="border border-primary rounded p-1"> Connected </span>
                </span>
                <b-btn
                  class="btn-light border-nonetext-primary"
                  @click="send_activation_code"
                >
                  Reset
                  <span
                    class="iconify"
                    data-icon="pepicons:reload"
                    data-rotate="180deg"
                  ></span>
                </b-btn>
              </div>
              <div class="w-100"></div>
              <template v-if="!details.basic.linked">
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
                      <span
                        class="iconify"
                        data-icon="entypo:share"
                        data-width="17"
                      ></span>
                    </button>
                    <div
                      class="dropdown-menu text-center"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <span @click="printCode">
                        <nuxt-link class="dropdown-item" to="#"
                          >Print Student Code</nuxt-link
                        >
                      </span>
                      <span @click="emailCode">
                        <nuxt-link class="dropdown-item" to="#"
                          >Email student code</nuxt-link
                        >
                      </span>
                      <span @click="smsCode">
                        <nuxt-link class="dropdown-item" to="#"
                          >SMS student code</nuxt-link
                        >
                      </span>
                    </div>
                  </div>
                </div>

                <div class="border-left text-primary" @click="send_activation_code">
                  <button
                    id="dropdownMenuButton"
                    class="btn btn bg-white text-primary dropdown-toggle no-arrow ml-4"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Reset
                    <span
                      class="iconify"
                      data-icon="pepicons:reload"
                      data-rotate="180deg"
                    ></span>
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8 my-3 my-lg-0">
        <div class="bg-white rounded">
          <div
            class="d-flex p-b-0 mb-0 px-3 justify-content-start border-bottom border-secondary align-items-center"
          >
            <template v-for="(button, index) in buttons">
              <div
                :id="button.component"
                :key="index"
                class="mr-md-4 mr-2 dynamic-tabs tabtitle smaller-buttons py-2 align-self-center"
                :class="{
                  'active_tab border-bottom text-primary border-primary ':
                    button.isActive,
                }"
                @click="switchComponent(button)"
              >
                {{ button.name }}
              </div>
            </template>
          </div>
          <!-- dynamic component here -->
          <div class="adjustWidth">
            <keep-alive>
              <component
                :is="currentTabComponent"
                :details="details"
                @refresh="refresh"
              ></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
    <ModalWrapper
      id="promoteModal"
      title="Promote Student"
      submit-title="Promote Student"
      variant="danger"
      @ok="promoteStudent"
    >
      Are you sure you want to promote this student?
    </ModalWrapper>
    <ModalWrapper
      id="graduateModal"
      title="Graduate Student"
      submit-title="Graduate"
      variant="danger"
      @ok="graduateStudent"
    >
      Are you sure you want to graduate this student?
    </ModalWrapper>
    <ModalWrapper id="showImage" noFooter title="">
      <div class="d-flex align-items-center justify-content-center">
        <img v-if="!avatar.includes('null')" :src="avatar" width="100%" alt="" />
        <div v-else>
          <h2>Please add an Image</h2>
        </div>
      </div>
    </ModalWrapper>
  </div>
</template>

<script>
import Profile from "~/components/pages/administration/students/profile.vue";
import AdmissionRecord from "~/components/pages/administration/students/AdmissionRecord.vue";
import Family from "~/components/pages/administration/students/family.vue";
import Attachment from "~/components/pages/administration/students/attachment.vue";
import ReportCard from "~/components/pages/administration/students/ReportCard.vue";
import ImageCropper from "~/components/Utils/ImageCropper.vue";
import Persist from "~/mixins/persistComponent";

export default {
  components: {
    Profile,
    AdmissionRecord,
    Family,
    Attachment,
    ReportCard,
    ImageCropper,
  },
  mixins: [Persist],
  async asyncData({ route, $axios }) {
    const slate_admission_id = route.params.student;

    const studentObject = await $axios.get(
      `/slate-admin/admission/${slate_admission_id}/profile/`
    );
    const user = {
      avatar: studentObject.data.data.basic.image,
    };
    const message = ` ${route.params.id}- ${studentObject.data.data.basic.activation_code}`;

    const details = studentObject.data.data;

    return { user, details, message };
  },
  data() {
    return {
      isLoading: "",
      demo: false,
      message: "Copy These Text",
      dummyAvatar:
        "https://546458-1766807-raikfcquaxqncofqfm.stackpathdns.com/pub/media/wordpress/d5f1425700d7460bb2aa1e1e8e1b7e49.jpg",

      currentTabComponent: "Profile",
      user: {
        avatar: "",
      },
      schoolId: "",
      showCropper: false,
      selectedHouse: "",
      selectedClass: "",
      version: 1,
      houseList: [],
      classList: [],
      details: null,
      buttons: [
        {
          name: "Profile Information",
          isActive: true,
          component: "Profile",
          page: "administrationStudents",
        },
        {
          name: "Admission Record",
          isActive: false,
          component: "AdmissionRecord",
          page: "administrationStudents",
        },
        {
          name: "Family",
          isActive: false,
          component: "Family",
          page: "administrationStudents",
        },
        {
          name: "Attachment",
          isActive: false,
          component: "Attachment",
          page: "administrationStudents",
        },
        {
          name: "Report Card",
          isActive: false,
          component: "ReportCard",
          page: "administrationStudents",
        },
      ],
    };
  },
  computed: {
    avatar() {
      const image = require(`~/assets/img/${
        this.details.profile_data.gender === "male" ? "male" : "female"
      }-young.jpeg`);
      if (this.user.avatar) {
        return `${this.user.avatar}?v=${this.version}`;
      } else {
        return image;
      }
    },
  },

  mounted() {
    this.version = Math.random();

    // this.getStudent()
  },
  methods: {
    showImageModal() {
      if (!this.avatar.includes("null")) {
        this.$bvModal.show("showImage");
      }
    },
    toast(toaster, append = false, variant = "success", title, body) {
      this.counter++;
      this.$bvToast.toast(body, {
        title,
        toaster,
        variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
    async graduateStudent() {
      try {
        this.isLoading = true;
        await this.$axios.post(
          `/schools/v3/class/${this.$route.params.class}/graduate/`,
          {
            class_students: [this.$route.params.student],
          }
        );
        this.toast(
          "b-toaster-bottom-center",
          true,
          "success",
          "Graduation",
          "Successful"
        );
        this.$fetch();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async promoteStudent() {
      alert("promote");
    },
    handlePromote() {
      this.$bvModal.show("promoteModal");
    },
    handleGraduate() {
      this.$bvModal.show("graduateModal");
    },
    async deleteImage() {
      try {
        const fd = new FormData();
        fd.append("avatar", "");
        const slate_admission_id = this.$route.params.student;
        await this.$axios.put(
          `/slate-admin/admission/${slate_admission_id}/profile/`,
          fd
        );
        this.refreshAll();
        this.version = Math.random();
      } catch (error) {
        console.log(error);
      }
    },
    async submitprofile(e) {
      // this.deleteImage()
      const fd = new FormData();
      fd.append("avatar", e);
      const slate_admission_id = this.$route.params.student;
      await this.$axios.put(`/slate-admin/admission/${slate_admission_id}/profile/`, fd);
      this.refreshAll();
      this.version = Math.random();
    },
    async somefunction(e) {
      const myPromise = await new Promise((resolve, reject) => {
        const url = e;
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "File name", { type: "image/png" });
            resolve(file);
          })
          .catch((e) => {
            reject(e);
          });
      });

      const fd = new FormData();
      fd.append("avatar", myPromise);
      const slate_admission_id = this.$route.params.student;
      try {
        await this.$axios.put(
          `/slate-admin/admission/${slate_admission_id}/profile/`,
          fd
        );

        this.refreshAll();

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

    async smsCode() {
      const student_id = this.$route.params.student;
      const slate_school_id = await this.$store.state.administration.school.id;

      try {
        this.$axios.post(
          `/slate-admin/school/${slate_school_id}/send/activation_code/sms/?entity=student`,
          {
            entity_id: student_id,
            entity_name: "student",
          }
        );
      } catch (error) {}
    },
    async emailCode() {
      const student_id = this.$route.params.student;
      const slate_school_id = await this.$store.state.administration.school.id;

      const school_code = this.$store.state.administration.school.id;
      try {
        this.$axios.post(
          `/slate-admin/school/${school_code}/send/activation_code/?entity=student`,
          {
            entity_id: student_id,
          }
        );
      } catch (error) {}
    },
    async printCode() {
      const slate_school_id = await this.$store.state.administration.school.id;
      const slate_admission_id = this.$route.params.student;

      try {
        const response = await this.$axios.get(
          `/slate-admin/school/${slate_school_id}/print/activation_code/?entity=student&entity_id=${slate_admission_id}`,
          { responseType: "blob" }
        );
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${this.details.basic.name}.pdf`;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {}
    },
    savedImage(e) {
      this.imagesArray = e.croppedFile;

      this.submitImage();

      this.showCropper = false;
    },
    cancelImage() {
      this.showCropper = false;
    },
    async getClass() {
      const slate_school_id = await this.$store.state.administration.school.id;

      try {
        const response = await this.$axios.get(
          `/slate-admin/school/${slate_school_id}/class/?paginate=false`
        );
        this.classList = response.data.data.filter(
          (single) => single.level === this.details.basic.grade_level
        );
      } catch (error) {}
    },
    async addClass() {
      const studentId = this.$route.params.student;

      try {
        this.$axios.post(`/slate-admin/class/${this.selectedClass}/students/`, {
          class_id: `this.selectedClass`,
          students: [`${studentId}`],
        });
        this.$bvModal.hide("class");
        await this.$nuxt.refresh();

        // this.getStudent()
      } catch (error) {}
    },
    async getHouse() {
      const slate_school_id = await this.$store.state.administration.school.id;

      try {
        const response = await this.$axios.get(
          `/slate-admin/school/${slate_school_id}/houses/?page=1`
        );
        this.houseList = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addHouse() {
      const studentId = this.$route.params.student;
      try {
        await this.$axios.post(`/slate-admin/house/${this.selectedHouse}/students/`, {
          id: this.selectedHouse,
          students: [`${studentId}`],
        });
        this.$bvModal.hide("house");

        // this.getStudent()
        await this.$nuxt.refresh();
      } catch (error) {
        console.log(error);
      }
    },
    onClickFileUpload() {
      if (this.$refs.fileInput) {
        const uploadField = this.$refs.fileInput;
        uploadField.click();
      }
    },
    onClickFileUpload_() {
      this.showCropper = !this.showCropper;
    },
    onChange(event) {
      this.imagesArray = "";
      this.imagesArray = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.imagesArray);
      reader.onload = function () {
        this.details.basic.image = reader.result;
      }.bind(this);
      this.submitImage();
    },
    async deleteImage() {
      const slate_school_id = await this.$store.state.administration.school.id;
      const fd2 = new FormData();
      fd2.append("avatar", null);
      try {
        const slate_admission_id = this.$route.params.student;
        const response = await this.$axios.put(
          `/slate-admin/admission/${slate_admission_id}/profile/`,
          fd2
        );

        await this.$nuxt.refresh();

        // this.getStudent()
      } catch (error) {
        console.log(error);
      }
    },
    async submitImage() {
      const fd = new FormData();
      fd.append("avatar", this.imagesArray);
      const slate_admission_id = this.$route.params.student;
      await this.$axios.put(`/slate-admin/admission/${slate_admission_id}/profile/`, fd);
      this.refreshAll();
      this.version = Math.random();
    },

    async refreshAll() {
      await this.$nuxt.refresh();
    },
    async refresh() {
      await this.$nuxt.refresh();
    },
    async reload() {
      await this.$nuxt.refresh();
    },
    edit() {
      this.$router.push(`${this.$route.params.student}/edit`);
    },
    onCopy(e) {
      // alert("copied: " + e.text);

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
    onError(e) {
      alert("Failed to copy texts");
    },
    goBack() {
      const school_code = this.$route.params.id;
      this.$router.push(`/sms/${school_code}/administration/student`);
    },
    async getStudent() {
      this.details = null;
      const slate_admission_id = this.$route.params.student;

      try {
        const { data, status } = await this.$axios.get(
          `/slate-admin/admission/${slate_admission_id}/profile/`
        );
        if (status === 200) {
          this.details = data.data;
          this.message = ` ${this.$route.params.id}- ${data.data.basic.activation_code}`;
        }
      } catch (error) {}
    },

    async send_activation_code() {
      const slate_school_id = await this.$store.state.administration.school.id;
      this.schoolId = slate_school_id;
      const student = this.$route.params.student;
      try {
        const response = await this.$axios.post(
          `/slate-admin/school/${slate_school_id}/reset/entity/`,
          {
            entity: "student",
            id: student,
          }
        );
        await this.$nuxt.refresh();

        // this.getStudent()

        const entity_id = response.data.data.admission_id;
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.student_profile {
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 30px;
}

@media screen and (max-width: 700px) {
  .student_profile {
    display: flex;
    flex-direction: column;
  }
}

.custom-badge {
  border: solid rgb(81, 177, 89);
  border-width: 2px;
  border-radius: 10px;
  padding: 4px;
  /* background-color: rgba(112, 211, 81, 0.808); */
}

.profile-details {
  display: grid;
  grid-template-columns: 4fr 8fr 4fr 1fr;
}

.active_tab {
  color: blue;
  border-bottom-width: 2px !important;
  /* text-decoration: underline; */
}

.tabtitle {
  font-size: 14px;
}

@media screen and (max-width: 700px) {
  .tabtitle {
    font-size: 12px;
  }
}

.size {
  font-size: 20px !important;
}
.adjustWidth {
  width: 100%;
}
</style>
