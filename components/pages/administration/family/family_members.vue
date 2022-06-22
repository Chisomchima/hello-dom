<template>
  <div class="bg-white p-4">
    <div class="mb-0 bg-white d-flex justify-content-between rounded-top">
      <div>
        <span class="dropdown">
          <button
            id="dropdownMenuButton"
            class="btn bg-light dropdown-toggle"
            type="button "
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            View by: 100 Records
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">10</a>
            <a class="dropdown-item" href="#">50</a>
          </div>
        </span>
      </div>
      <div class="d-flex justify-content-start">
        <b-btn v-b-modal.modal-2 class="btn-primary mr-3 text-white">
          Add Family Member</b-btn
        >
        <b-modal id="modal-2" title="New Family Member">
          <div class="modal-body">
            <div>
              <ValidationObserver v-slot="{ validate }">
                <div
                  id="runValidate"
                  ref="runValidate"
                  type="button"
                  @click="validate().then((e) => (validated = e))"
                ></div>

                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 text-center">
                    <div class="profile-container">
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
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                      <ValidationProviderWrapper :rules="['required']">
                        <label>First Name</label
                        ><input
                          v-model="first_name"
                          type="text"
                          placeholder="First Name"
                          class="form-control"
                        />
                      </ValidationProviderWrapper>
                    </div>
                    <div class="form-group">
                      <ValidationProviderWrapper :rules="['required']">
                        <label>Last Name</label
                        ><input
                          v-model="last_name"
                          type="text"
                          placeholder="Last Name"
                          class="form-control my-3"
                        />
                      </ValidationProviderWrapper>
                    </div>
                    <div class="form-group">
                      <ValidationProviderWrapper :rules="['required']">
                        <label>Email</label
                        ><input
                          v-model="email"
                          type="email"
                          placeholder="Email"
                          class="form-control my-3"
                        />
                      </ValidationProviderWrapper>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
                    <div class="form-group" style="margin-top: -110px">
                      <ValidationProviderWrapper :rules="['required']">
                        <label>Relationship</label
                        ><select v-model="role" class="form-control">
                          <option value="" disabled="">
                            Select Relationship
                          </option>
                          <option value="father">Father</option>
                          <option value="mother">Mother</option>
                          <option value="sister">Sister</option>
                          <option value="brother">Brother</option>
                        </select>
                      </ValidationProviderWrapper>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                      <ValidationProviderWrapper :rules="['required']">
                        <label>Phone Number</label
                        ><input
                          v-model="phone"
                          type="number"
                          placeholder="Phone Number"
                          class="form-control"
                        />
                      </ValidationProviderWrapper>
                    </div>
                  </div>
                  <div
                    class="col-lg-6 col-md-6 col-sm-12"
                    style="margin-top: -110px"
                  >
                    <div class="form-group mt-4">
                      <ValidationProviderWrapper :rules="['required']">
                        <label>Gender</label
                        ><select v-model="gender" class="form-control">
                          <option value="" disabled="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </ValidationProviderWrapper>
                    </div>
                  </div>
                </div>
              </ValidationObserver>
            </div>
          </div>
          <template #modal-footer="{ cancel }">
            <!-- Emulate built in modal footer ok and cancel button actions -->

            <BaseButton class="btn btn-light px-3" @click="cancel()">
              cancel
            </BaseButton>
            <BaseButton class="btn btn-primary px-3" @click="addFamilyMember()">
              Save
            </BaseButton>
            <!-- Button with custom close trigger value -->
          </template>
        </b-modal>
        <b-modal id="modal-edit" title="Edit Family member">
          <div class="modal-body">
            <div>
              <div>
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
                      ></b-icon>
                      <div
                        class="dropdown-menu text-center"
                        aria-smallledby="dropdownMenuButton"
                      >
                        <a class="dropdown-item" href="#">Capture Image</a>
                        <a class="dropdown-item" href="#">Upload Image</a>
                      </div>
                    </span>
                  </template>
                </b-avatar>
              </div>
              <div class="">
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label>First Name</label
                      ><input
                        v-model="editFamily.first_name"
                        type="text"
                        placeholder="First Name"
                        class="form-control my-3"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label>Last Name</label
                      ><input
                        v-model="editFamily.last_name"
                        type="text"
                        placeholder="Last Name"
                        class="form-control my-3"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label>Email</label
                      ><input
                        v-model="editFamily.email"
                        type="email"
                        placeholder="Email"
                        class="form-control my-3"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="">
                      <div class="form-group">
                        <label>Phone</label
                        ><input
                          v-model="editFamily.phone"
                          type="text"
                          placeholder="Phone"
                          class="form-control my-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row mx-0">
                  <label for=""> Role</label>
                  <select
                    v-model="editFamily.relationship"
                    _ngcontent-jpg-c302=""
                    class="form-control"
                  >
                    <option _ngcontent-jpg-c302="" value="" disabled="">
                      Select Role
                    </option>
                    <option _ngcontent-jpg-c302="" value="father">
                      Father
                    </option>
                    <option _ngcontent-jpg-c302="" value="mother">
                      Mother
                    </option>
                    <option _ngcontent-jpg-c302="" value="sister">
                      Sister
                    </option>
                    <option _ngcontent-jpg-c302="" value="brother">
                      Brother
                    </option>
                  </select>
                </div>
                <div class="row"></div>
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
              @click="editFamilyMember()"
            >
              Save
            </b-button>
            <!-- Button with custom close trigger value -->
          </template>
        </b-modal>
        <modal-wrapper
          id="modal-delete"
          variant="danger"
          submitTitle="Delete"
          title="Confirm Delete"
          @ok="deleteFamilyMember"
        >
          <div class="modal-body">
            <div>
              Are you sure you want to delete this family member? click the 'No'
              button to cancel this action
            </div>
          </div>
        </modal-wrapper>
      </div>
    </div>
    <div class="mt-5 border-top">
      <Table
        :items="family_list"
        :fields="fields"
        :allow-redirect="false"
        :is-busy="isBusy"
        :show-pagination="false"
        @edit="edit"
        @remove="remove"
      >
        <template #three_dots="{ data }">
          <div>
            <div>
              <b-dropdown
                size="lg"
                variant="link"
                menu-class="w-25 customdots"
                class="cutom2"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content>
                  <span
                    class="iconify"
                    data-icon="bi:three-dots-vertical"
                  ></span>
                </template>
                <b-dropdown-item href="#" @click="edit(data)"
                  >Edit</b-dropdown-item
                >
                <b-dropdown-item href="#" @click="remove(data)">
                  <span class="text-danger"> Delete </span>
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="smsModal(data)">
                  <span class="text-primary"> SMS Parent Code </span>
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="emailModal(data)">
                  <span class="text-primary"> Email Parent Code </span>
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </template>
      </Table>
    </div>
    <modal-wrapper
      id="smsModal"
      title="SMS CODE"
      variant="primary"
      submit-title="Send"
      @ok="handleSms"
    >
      <div class="text-center">Are you sure you want to send Code?</div>
    </modal-wrapper>
    <modal-wrapper
      id="emailModal"
      title="EMAIL CODE"
      variant="primary"
      submit-title="Send"
      @ok="handleEmail"
    >
      <div class="text-center">Are you sure you want to send Code?</div>
    </modal-wrapper>
  </div>
</template>

<script>
import { email } from 'vee-validate/dist/rules'
export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      validated: false,
      newFamily: {},
      smsFamily: {},
      emailFamily: {},
      first_name: '',
      last_name: '',
      selectedFamilyId: '',
      family_list: [],
      editFamily: {},
      email: '',
      role: '',
      phone: '',

      gender: '',
      isBusy: true,
      fields: [
        { key: 'first_name', sortable: true },
        { key: 'last_name', sortable: true },
        { key: 'relationship', sortable: true },
        { key: 'phone', sortable: true },
        { key: 'email', sortable: true },
        { key: 'connected', sortable: false },

        { key: 'three_dots', sortable: false },
      ],
    }
  },
  computed: {
    familyInfo() {
      return this.details.data
    },
    schoolid() {
      return this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )
    },
  },
  activated() {
    this.getFamily()
  },
  mounted() {
    this.getFamily()
  },
  methods: {
    smsModal(e) {
      this.smsFamily = e
      this.$bvModal.show('smsModal')
    },
    emailModal(e) {
      this.emailFamily = e
      this.$bvModal.show('emailModal')
    },
    async handleSms() {
      try {
        await this.$axios.post(
          `/slate-admin/school/${this.schoolid.id}/send/activation_code/sms/?entity=family`,

          {
            entity_name: 'family',
            entity_id: `${this.smsFamily.item.family_member_id}`,
          }
        )
        this.toast(
          'b-toaster-bottom-center',
          true,
          'success',
          'Success',
          'Sms sent successfully'
        )
      } catch (error) {
        console.log(error)
      }
      this.$bvModal.hide('smsModal')
    },
    async handleEmail() {
      try {
        await this.$axios.post(
          `/slate-admin/school/${this.schoolid.id}/send/activation_code/?entity=family`,

          {
            entity_name: 'family',
            entity_id: `${this.emailFamily.item.family_member_id}`,
          }
        )
        this.toast(
          'b-toaster-bottom-center',
          true,
          'success',
          'Success',
          'Email sent successfully'
        )
      } catch (error) {
        console.log(error)
      }
      this.$bvModal.hide('emailModal')
    },
    toast(toaster, append = false, variant = 'success', title, body) {
      this.counter++
      this.$bvToast.toast(body, {
        title,
        toaster,
        variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      })
    },

    edit(e) {
      this.family_member_edit = e.item.family_member_id

      const editFamily = {
        first_name: e.item.first_name,
        last_name: e.item.last_name,
        email: e.item.email,
        phone: e.item.phone,
        relationship: e.item.relationship,
      }
      this.editFamily = editFamily
      this.$bvModal.show('modal-edit')
    },
    async editFamilyMember() {
      try {
        await this.$axios.put(
          `/slate-admin/family/member/${this.family_member_edit}/`,
          {
            first_name: this.editFamily.first_name,
            last_name: this.editFamily.last_name,
            phone: this.editFamily.phone,
            email: this.editFamily.email,
            role: this.editFamily.relationship,
            image: null,
          }
        )
        this.getFamily()

        this.$bvModal.hide('modal-edit')
      } catch (error) {}
    },
    async deleteFamilyMember() {
      try {
        await this.$axios.delete(
          `slate-admin/family/member/${this.selectedFamilyId}/`
        )
      } catch (error) {}
      this.getFamily()
      this.$bvModal.hide('modal-delete')
    },
    remove(e) {
      this.selectedFamilyId = e.family_member_id
      this.$bvModal.show('modal-delete')
    },
    async getFamily() {
      this.family_list = []
      // this.everything = null
      const slate_family_id = this.$route.params.family

      try {
        const response = await this.$axios.get(
          `/slate-admin/family/${slate_family_id}/`
        )
        this.family_list = response.data.data.family_info.map((member) => ({
          first_name: member.first_name,
          last_name: member.last_name,

          relationship: member.role,
          phone: member.phone,
          family_member_id: member.family_member_id,

          email: member.email,
          primary_contact: member.primary_contact,
          connected: member.linked,
          activation_code: member.activation_code,
        }))
        this.isBusy = false
      } catch (error) {}
    },

    async addFamilyMember() {
      if (this.$refs.runValidate) {
        await this.$refs.runValidate.click()
      }

      const slate_family_id = this.details.profile_info.family_id
      const fd = new FormData()
      fd.append('role', this.role)
      fd.append('first_name', this.first_name)
      fd.append('last_name', this.last_name)
      fd.append('gender', this.gender)
      fd.append('email', this.email)
      fd.append('phone', this.phone)
      setTimeout(() => {
        if (!this.validated) return

        try {
          this.$axios.post(`/slate-admin/family/${slate_family_id}/create/`, fd)
          this.getFamily()
          this.$bvModal.hide('modal-2')
        } catch (error) {
          console.error(error)
        }
      }, 1000)
    },
  },
}
</script>

<style>
.dropdown-menu {
  transition: none !important;
}

.form-control {
  background: #fbfdfe;
}
</style>
