<template>
  <div class="">
    <div class="">
      <div class="d-flex justify-content-between">
        <div class="mb-2">
          <h2>Families</h2>
        </div>

        <div>
          <b-button v-b-modal.modal-1 class="bg-primary">Add Family</b-button>

          <b-modal id="modal-1" title="New Family">
            <div class="modal-body">
              <div>
                <ValidationObserver v-slot="{ validate }">
                  <div
                    id="runValidate"
                    ref="runValidate"
                    type="button"
                    @click="validate"
                  ></div>
                  <div class="row">
                    <div class="col-12 p-r">
                      <div class="form-group">
                        <label>Family Name</label>
                        <ValidationProviderWrapper :rules="['required']">
                          <input
                            v-model="newFamily.family_name"
                            _ngcontent-dpg-c305=""
                            type="text"
                            placeholder="Family Name"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </ValidationProviderWrapper>
                      </div>
                    </div>
                    <div class="col-12 p-r">
                      <div class="form-group">
                        <label>Email Address</label>
                        <ValidationProviderWrapper :rules="['required']">
                          <input
                            v-model="newFamily.email"
                            type="email"
                            placeholder="Email Address"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </ValidationProviderWrapper>
                      </div>
                    </div>

                    <div class="col-md-6 p-r">
                      <div class="form-group">
                        <label>Primary Contact's Name</label>
                        <ValidationProviderWrapper :rules="['required']">
                          <input
                            v-model="newFamily.primary_contact"
                            type="text"
                            placeholder="Primary Contact's Name"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </ValidationProviderWrapper>
                      </div>
                    </div>
                    <div class="col-md-6 p-r">
                      <div class="form-group">
                        <label>Phone Number</label>
                        <ValidationProviderWrapper :rules="['required']">
                          <input
                            v-model="newFamily.phone"
                            type="text"
                            placeholder="Phone Number"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                          />
                        </ValidationProviderWrapper>
                      </div>
                    </div>
                    <div class="col-12 p-r">
                      <div class="form-group">
                        <label>Address</label>
                        <ValidationProviderWrapper :rules="['required']">
                          <textarea
                            id=""
                            v-model="newFamily.address"
                            name=""
                            placeholder="Address"
                            type="text"
                            class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            "
                            cols="30"
                            rows="2"
                          >
                          </textarea>
                        </ValidationProviderWrapper>
                      </div>
                    </div>
                  </div>
                </ValidationObserver>
              </div>
            </div>

            <template #modal-footer="{ cancel }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button
                size="sm"
                variant="light"
                class="px-2 mr-2"
                @click="cancel()"
              >
                Cancel
              </b-button>
              <b-button
                size="sm"
                variant="primary"
                class="px-3"
                @click="addFamily()"
              >
                Save
              </b-button>
              <!-- Button with custom close trigger value -->
            </template>
          </b-modal>
          <edit-family
            :modal-edit="modalEdit"
            :parent-details="parentDetails"
            @closeModal="closeModal"
            @refresh="refresh"
          />
        </div>
      </div>
      <div>
        <div
          class="p-4 mb-0 bg-white d-flex justify-content-between rounded-top"
        >
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
          <div _ngcontent-ptc-c281="" class="search-flex">
            <div _ngcontent-ptc-c281="" class="search mr-2 mb-2">
              <span _ngcontent-ptc-c281="" class="input-icon mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  _ngcontent-ptc-c281=""
                  data-icon="bx:bx-search"
                  data-inline="false"
                  class="iconify"
                  style="transform: rotate(360deg)"
                >
                  <path
                    d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396l1.414-1.414l-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8s3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6s-6-2.691-6-6s2.691-6 6-6z"
                    fill="currentColor"
                  ></path></svg
              ></span>

              <input
                v-model="filterApi"
                _ngcontent-ptc-c281=""
                type="text"
                placeholder="Search"
                class="ng-valid ng-dirty ng-touched"
                @input="slowFamily()"
                @keyup.enter="get_all_families()"
              />
            </div>
          </div>
        </div>
        <ModalWrapper
          id="delete-whole-family"
          title="Delete Family"
          variant="danger"
          submit-title="Delete"
          @ok="removeFamily"
        >
          Are you sure you want to delete this family? this action cannot be
          reversed, click "Cancel" to stop this action
        </ModalWrapper>
      </div>
      <div class="">
        <Table
          :items="family"
          :is-busy="isBusy"
          :pages="pages"
          :fields="fields"
          @page-changed="changePage"
          @edit="editFamily"
          @remove="showDeleteFamilyModal"
          @row-clicked="gotoFamily"
        />
        <!-- <div class="d-flex justify-content-end my-3">
          <div _ngcontent-bjf-c284="" class="my-1 showing-nav mr-3 paginate">
            <span _ngcontent-bjf-c284="" class="mr-4">
              Page {{ page }}of {{ totalPages }}
            </span>
            <span @click="previousPage">
              <span class="iconify" data-icon="akar-icons:chevron-left"></span>
            </span>
            <span @click="nextPage">
              <span class="iconify" data-icon="akar-icons:chevron-right">
              </span>
            </span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

import editFamily from '~/components/modals/editFamily.vue'
import School from '~/mixins/school'

export default {
  components: { editFamily },
  mixins: [School],
  data() {
    return {
      page: 1,
      pages: '',
      currentPage: 1,
      modalEdit: false,
      parentDetails: {},
      filterApi: '',
      familyDelete: '',
      family: [],

      newFamily: {
        family_name: '',
        email: '',
        primary_contact: '',
        phone: '',
        address: '',
      },
      fields: [
        { key: 'family_name', sortable: true },
        { key: 'related', sortable: true },
        { key: 'students', sortable: true },
        { key: 'phone', sortable: true },
        { key: 'email', sortable: true },
        { key: 'three_dots', sortable: false },
      ],
      isBusy: true,
    }
  },
  async fetch() {
    const slate_school_id = await this.$store.state.administration.school.id

    const response = await this.$axios.get(
      `/slate-admin/school/${slate_school_id}/family/?page=${this.currentPage}`
    )
    this.pages = response.data.pages

    this.family = response.data.data.map((family) => ({
      family_name: family.family_name,
      related: family.related,
      students: family.students,
      phone: family.phone,
      email: family.email,
      three_dots: '',
      id: family.id,
      route: 'family',
    }))
    this.isBusy = false
  },
  watch: {
    page: {
      handler() {
        this.$nuxt.refresh()
      },
    },
  },
  mounted() {
    // this.get_all_families()
  },
  methods: {
    gotoFamily(e) {
      console.log(e)
      this.$router.push({
        name: 'sms-id-administration-family-family',
        params: { family: e.id, id: this.$route.params.id },
        query: { _name: `${e.family_name}` },
      })
    },
    async refresh() {
      await this.$nuxt.refresh()
      this.closeModal()
    },
    editFamily(e) {
      this.parentDetails = e.item
      this.modalEdit = true
    },
    closeModal() {
      this.modalEdit = false
    },
    showDeleteFamilyModal(e) {
      this.familyDelete = e.id
      this.$bvModal.show('delete-whole-family')
    },
    async removeFamily() {
      try {
        await this.$axios.delete(`/slate-admin/family/${this.familyDelete}/`)
        await this.$nuxt.refresh()
        this.$bvModal.hide('delete-whole-family')
      } catch (error) {}
    },
    previousPage() {
      if (this.page > 1) {
        this.page -= 1
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page += 1
      }
    },
    changePage(e) {
      this.isBusy = true
      this.currentPage = e
      this.$fetch()
    },
    slowFamily: debounce(function () {
      this.get_all_families()
    }, 500),

    async get_all_families() {
      const slate_school_id = await this.$store.state.administration.school.id

      try {
        const response = await this.$axios.get(
          `/slate-admin/school/${slate_school_id}/family/?page=${this.page}&search=${this.filterApi}`
        )

        this.pages = response.data.pages
        this.page = 1
        this.family = response.data.data.map((family) => ({
          family_name: family.family_name,
          related: family.related,
          students: family.students,
          phone: family.phone,
          email: family.email,
          three_dots: '',
          id: family.id,
          route: 'family',
        }))
      } catch (error) {
        console.log(error)
      } finally {
        this.isBusy = false
      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast('New Family  added', {
        title: ``,
        noCloseButton: true,
        variant,
        solid: true,
      })
    },
    async addFamily() {
      if (this.$refs.runValidate) {
        this.$refs.runValidate.click()
      }
      const schoolCode = this.$store.state.administration.school.code

      const slate_school_id = await this.$store.state.administration.school.id
      if (
        (this.newFamily.family_name,
        this.newFamily.address,
        this.newFamily.phone,
        this.newFamily.email,
        this.newFamily.primary_contact)
      ) {
        try {
          const response = await this.$axios.post(
            `/slate-admin/school/${slate_school_id}/family/`,
            {
              family_name: this.newFamily.family_name,
              address: this.newFamily.address,
              phone: this.newFamily.phone,
              email: this.newFamily.email,
              primary_contact: this.newFamily.primary_contact,
            }
          )
          if (response.status === 200 || response.status === 201) {
            this.get_all_families()
            this.makeToast('success')
            this.$bvModal.hide('modal-1')
            this.$router.push(
              `/sms/${schoolCode}/administration/family/${response.data.data.family_id}`
            )
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>

<style scoped>
.no-arrow::after {
  display: none;
}
label {
  font-size: 13px;
  color: #abb3ba;
}
.showing-nav.paginate {
  color: #b9b9b9;
  font-size: 14px;
}

.search-flex[_ngcontent-ptc-c281] {
  display: flex;
}
.search-flex .search {
  position: relative;
  display: flex;
  align-items: center;
  /* min-width: 322px; */
  max-width: 100%;
  min-height: 36px;
  background: white;
  box-shadow: 0px 2px 10px rgba(169, 181, 192, 0.2);
  border-radius: 6px;
}
.search-flex .dropdown {
  color: #b4bec6;
  font-size: 14px;
  background: white;
  box-shadow: 0px 2px 10px rgba(169, 181, 192, 0.2);
  border-radius: 6px;
}
.search-flex .search[_ngcontent-ptc-c281] .input-icon[_ngcontent-ptc-c281] {
  color: #b4bec6;
}
.search-flex[_ngcontent-ptc-c281]
  .search[_ngcontent-ptc-c281]
  .filter-holder[_ngcontent-ptc-c281] {
  background: #e0e0e0;
  border-radius: 3px;
  color: #828282;
  font-size: 12px;
  min-width: 79px;
  height: 21px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.search-flex[_ngcontent-ptc-c281]
  .search[_ngcontent-ptc-c281]
  input[_ngcontent-ptc-c281] {
  background: white;
  border: none;
}
.search-flex[_ngcontent-ptc-c281] .dropdown[_ngcontent-ptc-c281] {
  color: #b4bec6;
  font-size: 14px;
  background: white;
  box-shadow: 0px 2px 10px rgba(169, 181, 192, 0.2);
  border-radius: 6px;
}

.search-flex[_ngcontent-ptc-c281] .filter-close[_ngcontent-ptc-c281] {
  background: #1070b7;
  color: white;
  border-radius: 4px;
  height: 37px;
  width: 37px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}
</style>
