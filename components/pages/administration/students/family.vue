<template>
  <div class="">
    <div v-if="Object.values(currentFamily).length">
      <div class="d-flex justify-content-between mt-1 px-3 mx-2 pb-2 pt-4">
        <div class="col p-0">
          <small class="text-secondary"> Family Name</small>
          <p class="namecontent text-primary">
            {{ currentFamily.family_name ? currentFamily.family_name : '--' }}
          </p>
        </div>
        <div>
          <b-btn class="bg-white text-dark" @click="goFamily">
            View Family</b-btn
          >
          <b-btn v-b-modal.modal-2 class="btn-primary mr-3 text-white">
            Add Family Member</b-btn
          >
          <b-modal id="modal-2" title="New Family Member">
            <div _ngcontent-tbu-c302="" class="modal-body">
              <div _ngcontent-tbu-c302="">
                <div _ngcontent-tbu-c302="" class="row">
                  <div
                    _ngcontent-tbu-c302=""
                    class="col-lg-6 col-md-6 col-sm-12 text-center"
                  >
                    <div _ngcontent-tbu-c302="" class="profile-container">
                      <b-avatar
                        size="6rem"
                        icon="person-fill"
                        src="~/assets/img/male-adult.jpeg"
                        badge
                        badge-variant="primary"
                      >
                        <template #badge>
                          <span>
                            <b-icon
                              id="dropdownMenuButton"
                              icon="plus"
                              class="dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            ></b-icon>
                            <div
                              class="dropdown-menu dropdown-menu text-center"
                              aria-smallledby="dropdownMenuButton"
                            >
                              <a class="dropdown-item" href="#"
                                >Capture Image</a
                              >
                              <a class="dropdown-item" href="#">Upload Image</a>
                            </div>
                          </span>
                        </template>
                      </b-avatar>
                    </div>
                  </div>
                  <div
                    _ngcontent-tbu-c302=""
                    class="col-lg-6 col-md-6 col-sm-12"
                  >
                    <div _ngcontent-tbu-c302="" class="form-group">
                      <label _ngcontent-tbu-c302="">First Name</label
                      ><input
                        v-model="first_name"
                        type="text"
                        placeholder="First Name"
                        class="form-control ng-valid ng-dirty ng-touched"
                      /><!---->
                    </div>
                    <div _ngcontent-tbu-c302="" class="form-group">
                      <label _ngcontent-tbu-c302="">Last Name</label
                      ><input
                        v-model="last_name"
                        type="text"
                        placeholder="Last Name"
                        class="form-control my-3 ng-valid ng-dirty ng-touched"
                      /><!---->
                    </div>
                    <div _ngcontent-tbu-c302="" class="form-group">
                      <label _ngcontent-tbu-c302="">Email</label
                      ><input
                        v-model="email"
                        type="email"
                        placeholder="Email"
                        class="form-control my-3 ng-valid ng-dirty ng-touched"
                      /><!---->
                    </div>
                  </div>
                  <div
                    _ngcontent-tbu-c302=""
                    class="col-lg-6 col-md-6 col-sm-12"
                  >
                    <div
                      _ngcontent-tbu-c302=""
                      class="form-group pt-4"
                      style="margin-top: -110px"
                    >
                      <label _ngcontent-tbu-c302="">Relationship</label
                      ><select
                        v-model="role"
                        _ngcontent-tbu-c302=""
                        class="form-control ng-valid ng-dirty ng-touched"
                      >
                        <option _ngcontent-tbu-c302="" value="" disabled="">
                          Select Relationship
                        </option>
                        <option
                          _ngcontent-tbu-c302=""
                          value="father"
                          class="ng-star-inserted"
                        >
                          Father
                        </option>
                        <option
                          _ngcontent-tbu-c302=""
                          value="mother"
                          class="ng-star-inserted"
                        >
                          Mother
                        </option>
                        <option
                          _ngcontent-tbu-c302=""
                          value="sister"
                          class="ng-star-inserted"
                        >
                          Sister
                        </option>
                        <option
                          _ngcontent-tbu-c302=""
                          value="brother"
                          class="ng-star-inserted"
                        >
                          Brother
                        </option>
                        <!----></select
                      ><!---->
                    </div>
                  </div>
                  <div
                    _ngcontent-tbu-c302=""
                    class="col-lg-6 col-md-6 col-sm-12"
                  >
                    <div _ngcontent-tbu-c302="" class="form-group">
                      <label _ngcontent-tbu-c302="">Phone</label
                      ><input
                        v-model="phone"
                        type="text"
                        placeholder="Phone"
                        class="form-control ng-valid ng-dirty ng-touched"
                      /><!---->
                    </div>
                  </div>
                  <div
                    _ngcontent-tbu-c302=""
                    class="col-lg-6 col-md-6 col-sm-12"
                    style="margin-top: -110px"
                  >
                    <div _ngcontent-tbu-c302="" class="pt-4 form-group">
                      <label _ngcontent-tbu-c302="">Gender</label
                      ><select
                        v-model="gender"
                        _ngcontent-tbu-c302=""
                        class="form-control ng-valid ng-dirty ng-touched"
                      >
                        <option _ngcontent-tbu-c302="" value="" disabled="">
                          Select Gender
                        </option>
                        <option _ngcontent-tbu-c302="" value="male">
                          Male
                        </option>
                        <option _ngcontent-tbu-c302="" value="female">
                          Female
                        </option></select
                      ><!---->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <template #modal-footer="{ cancel }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button
                size="sm"
                variant="light"
                class="px-3 text-secondary mr-2"
                @click="cancel()"
              >
                Cancel
              </b-button>
              <b-button
                size="sm"
                variant="primary"
                class="px-4"
                @click="addFamilyMember()"
              >
                Save
              </b-button>
              <!-- Button with custom close trigger value -->
            </template>
          </b-modal>
        </div>
      </div>
      <div class="row ml-4 mb-4">
        <div class="col-4 p-0">
          <div class="">
            <small class="text-secondary">Address</small>
          </div>
          <div class="">
            <p class="namecontent">
              {{ currentFamily.address ? currentFamily.address : '--' }}
            </p>
          </div>
        </div>
        <div class="col-4 p-0">
          <div class="">
            <small class="text-secondary">Phone Number</small>
          </div>
          <div class="text-wrap">
            <p class="namecontent m-0">
              {{
                currentFamily.phone_number ? currentFamily.phone_number : '--'
              }}
            </p>
          </div>
        </div>
        <div class="col-4 p-0 text-left">
          <div class="">
            <small class="text-secondary">Email</small>
          </div>
          <div class="">
            <p class="namecontent m-0">
              {{ currentFamily.email ? currentFamily.email : '--' }}
            </p>
          </div>
        </div>
      </div>

      <!-- second -->
      <div class="mt-1">
        <div class="">
          <div class="px-4">
            <h5 class="personaldetails mb-0">Family Members</h5>
          </div>
          <div class="">
            <Table
              :fields="fields"
              :items="currentFamily.family_members"
              :show-pagination="false"
              :allow-redirect="false"
            />
          </div>
        </div>
      </div>

      <!-- third -->
    </div>
    <div v-else>
      <div
        class="d-flex justify-content-center align-items-center"
        style="height: 25rem"
      >
        <h4>
          No family
          <span
            class="text-primary h4"
            :style="{ cursor: 'pointer' }"
            @click="showLinkFamilyModal"
          >
            Connect to a Family ?</span
          >
        </h4>
      </div>
      <ModalWrapper
        id="link-family"
        title="Link to Family"
        @ok="handleNewFamily"
      >
        <div class="" style="margin: 0; height: 7rem">
          <div class="mb-3">
            <small class="text-secondary">Select a Family</small>
            <v-select
              v-model="newFamilyId"
              class="style-chooser"
              placeholder="Select Family"
              :reduce="(option) => option.id"
              label="family_name"
              :options="addFamily"
            ></v-select>
          </div>
        </div>
      </ModalWrapper>
    </div>
  </div>
</template>

<script>
import table from '~/components/table.vue'
export default {
  components: { table },
  props: {
    // details: {
    //   type: Object,
    //   required: true,
    // },
  },

  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      fields: [
        { key: 'first_name', sortable: true },
        { key: 'last_name', sortable: true },
        { key: 'role', label: 'Relationship', sortable: true },
        { key: 'phone', sortable: true },
        { key: 'email', sortable: true },
        { key: 'primary_contact', sortable: false },
      ],
      phone: '',
      details: {},
      gender: '',
      newFamilyId: '',
      addFamily: '',
      family_list: [],
      currentFamily: {},
    }
  },
  async fetch() {
    const slate_admission_id = this.$route.params.student

    const {
      data: { data },
    } = await this.$axios.get(
      `/slate-admin/admission/${slate_admission_id}/profile/`
    )
    if (Object.values(data.families).length) {
      this.currentFamily = data.families
    }
  },
  activated() {
    this.$fetch()
  },
  methods: {
    async handleNewFamily() {
      const slate_admission_id = this.$route.params.student

      const slate_school_id = await this.$store.state.administration.school.id

      try {
        const fd = new FormData()
        fd.append('family', this.newFamilyId)

        await this.$axios.put(
          `/slate-admin/admission/${slate_admission_id}/profile/`,
          fd
        )
        this.$nuxt.refresh()

        this.$bvModal.hide('link-family')
      } catch (error) {
        console.log(error)
      }
    },
    async showLinkFamilyModal() {
      const slate_school_id = await this.$store.state.administration.school.id

      try {
        const {
          data: { data },
        } = await this.$axios.get(
          `/slate-admin/school/${slate_school_id}/family/`
        )
        this.addFamily = data
      } catch (error) {
        console.log(error)
      }
      this.$bvModal.show('link-family')
    },

    goFamily() {
      const school_code = this.$route.params.id
      const family_id = this.currentFamily.id
      this.$router.push({
        path: `/sms/${school_code}/administration/family/${family_id}`,
        query: { _name: this.currentFamily.family_name },
      })
    },
    clearForm() {
      this.role = ''
      this.first_name = ''
      this.last_name = ''
      this.gender = ''
      this.email = ''
      this.phone = ''
    },
    async addFamilyMember() {
      const slate_family_id = this.currentFamily.id
      const fd = new FormData()
      fd.append('role', this.role)
      fd.append('first_name', this.first_name)
      fd.append('last_name', this.last_name)
      fd.append('gender', this.gender)
      fd.append('email', this.email)
      fd.append('phone', this.phone)
      try {
        // this.$axios.put(`/slate-admin/family/${slate_family_id}/`, fd)
        const response = await this.$axios.post(
          `/slate-admin/family/${slate_family_id}/create/`,
          fd
        )
        this.clearForm()
        this.$nuxt.refresh()
        this.$bvModal.hide('modal-2')
        // this.$emit('refresh')
      } catch (error) {}
    },
  },
}
</script>

<style scoped>
.profile-details {
  display: grid;
  grid-template-columns: 4fr 4fr 4fr;
  column-gap: 20px;
}
</style>
