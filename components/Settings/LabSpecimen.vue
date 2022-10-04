<template>
  <div>
    <div>
      <b-modal
        @hide="closeModal"
        @show="getData"
        id="Add-specimen"
        title="Add Specimen Type"
        centered
        hide-footer
        ref="addSpecimenModal"
      >
        <div>
          <ValidationObserver v-slot="{ validate }">
            <form>
              <div
                class="
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-center
                  mb-3
                "
              >
                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Name *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input
                      type="text"
                      placeholder="Name"
                      v-model="specimen.name"
                      class="form-control ng-untouched ng-pristine ng-valid"
                    />
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>
                <div class="mb-2 w-75">
                  <small class="text-grey text-12">Color</small>

                  <div
                    style="border-radius: 4px; background: #5c677d"
                    class="
                      d-flex
                      p-3
                      justify-content-between
                      flex-wrap
                      border
                      w-100
                    "
                  >
                    <div
                      :class="ring1 ? 'ring' : ''"
                      style="width: 2rem; border-radius: 50%"
                      @click.prevent="setPurple"
                      class="first back-purple pointer"
                    ></div>
                    <div
                      :class="ring2 ? 'ring' : ''"
                      @click.prevent="setYellow"
                      style="width: 2rem; border-radius: 50%"
                      class="second back-yellow pointer"
                    ></div>
                    <div
                      :class="ring3 ? 'ring' : ''"
                      @click.prevent="setGrey"
                      style="width: 2rem; border-radius: 50%"
                      class="third back-grey pointer"
                    ></div>
                    <div
                      :class="ring4 ? 'ring' : ''"
                      @click.prevent="setWhite"
                      style="width: 2rem; height: 2rem; border-radius: 50%"
                      class="fourth back-white pointer"
                    ></div>
                    <div
                      :class="ring5 ? 'ring' : ''"
                      @click.prevent="setRed"
                      style="width: 2rem; border-radius: 50%"
                      class="fifth back-red pointer"
                    ></div>
                    <div
                      :class="ring6 ? 'ring' : ''"
                      @click.prevent="setGreen"
                      style="width: 2rem; border-radius: 50%"
                      class="fifth back-green pointer"
                    ></div>
                    <div
                      :class="ring7 ? 'ring' : ''"
                      @click.prevent="setBlue"
                      style="width: 2rem; border-radius: 50%"
                      class="fifth back-blue pointer"
                    ></div>
                  </div>

                  <input
                    type="text"
                    v-model="specimen.color"
                    class="
                      form-control
                      d-none
                      ng-untouched ng-pristine ng-valid
                    "
                  />
                </div>

                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Specimen *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-select
                      v-model="specimen.specimen"
                      class="text-14"
                      placeholder="Type"
                      label="name"
                      :options="data"
                      :reduce="(opt) => opt.id"
                    ></v-select>
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>

                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Description</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input
                      type="text"
                      v-model="specimen.description"
                      placeholder="description"
                      class="form-control ng-untouched ng-pristine ng-valid"
                    />
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>
              </div>

              <div class="my-3 d-flex justify-content-center">
                <button
                  @click.prevent="closeModal"
                  class="btn btn-light text-grey mr-5 text-14"
                  style="height: 38px; width: 5rem; text-align: center"
                >
                  Cancel
                </button>

                <BaseButton @click.prevent="addSpecimenType" class=""
                  >Save
                </BaseButton>
              </div>

              <div
                type="button"
                ref="runValidation"
                id="runValidation"
                @click="validate"
              ></div>
            </form>
          </ValidationObserver>
        </div>
      </b-modal>
    </div>
    <div>
      <UtilsFilterComponent
        @search-input="searchMe($event)"
        disable-pagination
        :disable-visualization="true"
        search-placeholder="Search"
      >
        <template #besideFilterButton>
          <BaseButton
            class="btn-outline-primary"
            @click="openLabObservationsModal"
            >Add specimen type
          </BaseButton>
        </template>
        <table-component
          :paginate="true"
          :fields="fields"
          :perPage="perPage"
          :busy="busy"
          :pages="pages"
          :items="specimens"
          @delete="deleteSpecimen"
          @edit="OpenEditSpecimen($event)"
          @page-changed="getSpecimens($event)"
        >
          <template #status="{ data }">
            <div class="text-center">
              <span
                class="
                  badge
                  border border-danger
                  text-white
                  badge-info
                  px-2
                  py-1
                "
                >{{ data.item.status }}</span
              >
            </div>
          </template>
          <template #description="{ data }">
            <div class="">
              <span>{{ data.item.description }}</span>
            </div>
          </template>
          
          <template #color="{ data }">
            <div
              style="
                width: 2rem;
                height: 1.9rem;
                border-radius: 50%;
                background: green;
                border: 1px solid #727d71;
              "
              :style="`background: ${data.item.color}`"
              class="first pointer"
            ></div>
          </template>
          <template #edit="{ data }">
            <div @click="OpenEditSpecimen(data.item)" class="text-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="18"
                height="18"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z"
                />
                <path
                  fill="currentColor"
                  d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"
                />
              </svg>
            </div>
          </template>
        </table-component>
      </UtilsFilterComponent>
    </div>

    <b-modal
      @hide="closeEditModal"
      id="Edit-specimen"
      title="Edit Laboratory Observations"
      centered
      hide-footer
      ref="editLaboratoryObsvModal"
    >
      <div>
        <ValidationObserver v-slot="{ validate }">
          <form>
            <div
              class="
                d-flex
                flex-column
                align-items-center
                justify-content-center
                mb-3
              "
            >
              <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                <small class="text-grey text-12">Name *</small>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="editSpecimen.name"
                    type="text"
                    placeholder="Name"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                  <span class="text-12" style="color: red">{{
                    errors[0]
                  }}</span>
                </validation-provider>
              </div>

              <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                <small class="text-grey text-12">Color</small>

                <div
                  style="border-radius: 4px; background: #5c677d"
                  class="d-flex mx-4 p-3 justify-content-between border"
                >
                  <div
                    :class="ring1 ? 'ring' : ''"
                    style="width: 2rem; border-radius: 50%"
                    @click.prevent="setPurpleEdit"
                    class="first back-purple pointer"
                  ></div>
                  <div
                    :class="ring2 ? 'ring' : ''"
                    @click.prevent="setYellowEdit"
                    style="width: 2rem; border-radius: 50%"
                    class="second back-yellow pointer"
                  ></div>
                  <div
                    :class="ring3 ? 'ring' : ''"
                    @click.prevent="setGreyEdit"
                    style="width: 2rem; border-radius: 50%"
                    class="third back-grey pointer"
                  ></div>
                  <div
                    :class="ring4 ? 'ring' : ''"
                    @click.prevent="setWhiteEdit"
                    style="width: 2rem; height: 2rem; border-radius: 50%"
                    class="fourth back-white pointer"
                  ></div>
                  <div
                    :class="ring5 ? 'ring' : ''"
                    @click.prevent="setRedEdit"
                    style="width: 2rem; border-radius: 50%"
                    class="fifth back-red pointer"
                  ></div>
                  <div
                    :class="ring6 ? 'ring' : ''"
                    @click.prevent="setGreenEdit"
                    style="width: 2rem; border-radius: 50%"
                    class="fifth back-green pointer"
                  ></div>
                  <div
                    :class="ring7 ? 'ring' : ''"
                    @click.prevent="setBlueEdit"
                    style="width: 2rem; border-radius: 50%"
                    class="fifth back-blue pointer"
                  ></div>
                </div>

                <input
                  type="text"
                  v-model="editSpecimen.color"
                  class="form-control d-none ng-untouched ng-pristine ng-valid"
                />
              </div>
              <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Specimen *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-select
                      v-model="editSpecimen.specimen"
                      class="text-14"
                      placeholder="Type"
                      label="name"
                      :options="data"
                      :reduce="(opt) => opt.id"
                    ></v-select>
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>
              <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                <small class="text-grey text-12">Description</small>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="editSpecimen.description"
                    type="text"
                    placeholder="uom"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                  <span class="text-12" style="color: red">{{
                    errors[0]
                  }}</span>
                </validation-provider>
              </div>
            </div>

            <div class="my-3 d-flex justify-content-center">
              <button
                @click.prevent="closeEditModal"
                class="btn btn-light text-grey mr-5 text-14"
                style="height: 38px; width: 5rem; text-align: center"
              >
                Cancel
              </button>

              <BaseButton @click.prevent="editSpecimenfunc" class=""
                >Save
              </BaseButton>
            </div>

            <div
              type="button"
              ref="runValidation"
              id="runValidation"
              @click="validate"
            ></div>
          </form>
        </ValidationObserver>
      </div>
    </b-modal>

    <DashboardModalDeleteSpecimen :editData="editObj" @refresh="refreshMe" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isbusy: false,
      busy: false,
      data: [],
      purple: '#800080',
      yellow: '#fbff12',
      grey: '#cfdbd5',
      white: '#ffffff',
      red: '#ff0000',
      green: '#008000',
      blue: '#0000ff',
      ring1: false,
      ring2: false,
      ring3: false,
      ring4: false,
      ring5: false,
      ring6: false,
      ring7: false,
      perPage: 12,
      page: 1,
      pages: 0,
      specimens: [],
      fields: [
        { key: 'name', label: 'Specimen name', sortable: true },
        { key: 'color', label: 'Color', sortable: true },
        { key: 'description', label: 'Description', sortable: true },
        { key: 'specimen', label: 'Specimen', sortable: true },

        { key: 'actions', label: '', sortable: false },
      ],
      id: 0,
      specimen: {
        name: '',
        color: '',
        description: '',
        specimen: '',
      },
      editSpecimen: {
        name: '',
        color: '',
        description: '',
        specimen: '',
      },
      editObj: {},
    }
  },
  mounted() {
    this.getSpecimens()
  },
  methods: {
    async addSpecimenType() {
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click()
      }
      if (
        this.specimen.name &&
        this.specimen.color &&
        this.specimen.description &&
        this.specimen.specimen
      ) {
        try {
          this.isbusy = true
          let response = await this.$axios.$post(
            'laboratory/lab_specimen_type/',
            this.specimen
          )
          this.$toast.success(`Specimen added`)
          this.getSpecimens()
          this.$bvModal.hide('Add-specimen')
          this.specimen = {
            name: '',
            color: '',
            description: '',
            specimen: '',
          }
        } catch {
          this.$toast.error(`Unable to add specimen`)
        } finally {
          this.isbusy = false
          this.closeModal()
        }
      }
    },
    searchMe(e) {
      this.getSpecimens(1, e)
    },
    refreshMe() {
      this.getSpecimens(1)
    },
    async getSpecimens(page = 1, e = '') {
      try {
        this.busy = true
        let uri = `laboratory/lab_specimen_type/?page=${page}&name=${e}&size=${this.perPage}`

        const response = await this.$axios.$get(uri)

        this.specimens = []
        this.pages = response.total_pages
        // console.log(this.specimens);

        for (const iterator of response.results) {
          let time = iterator.created_at
          let y = new Date(time).toLocaleDateString()
          let z = new Date(time).toTimeString().substring(0, 5)
          let b = y + ', ' + z
          this.specimens.push({
            name: iterator.name,
            color: iterator.color,
            created_at: b,
            description: iterator.description,
            id: iterator.id,
            status: iterator.status,
          })
        }
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    async getData() {
      try {
        const { results } = await this.$api.laboratory.getSpecimens({
          size: 1000,
        })
        this.data = results
      } catch (error) {
        console.log(error)
      }
    },
    async deleteSpecimen(e) {
      this.editObj = { ...e }
      this.$bvModal.show('deleteSpecimenModal')
    },
    async editSpecimenfunc() {
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click()
      }

      if (this.editSpecimen) {
        try {
          this.isbusy = true
          let response = await this.$axios.$put(
            `laboratory/lab_specimen_type/${this.id}/`,
            this.editSpecimen
          )

          this.$toast.success(`Specimen edited`)
          this.getSpecimens()
          this.$bvModal.hide('Edit-specimen')
        } catch {
          this.$toast.error(`Unable to edit specimen`)
        } finally {
          this.isbusy = false
          this.closeEditModal()
        }
      }
    },
    openLabObservationsModal() {
      this.$bvModal.show('Add-specimen')
    },
    OpenEditSpecimen(e) {
      this.editSpecimen.name = e.name
      this.editSpecimen.color = e.color
      this.editSpecimen.description = e.description
      this.editSpecimen.specimen = e.specimen
      this.id = e.id
      if (this.editSpecimen.color === '#800080') {
        this.setPurpleEdit()
      } else if (this.editSpecimen.color === '#fbff12') {
        this.setYellowEdit()
      } else if (this.editSpecimen.color === '#cfdbd5') {
        this.setGreyEdit()
      } else if (this.editSpecimen.color === '#ffffff') {
        this.setWhiteEdit()
      } else if (this.editSpecimen.color === '#008000') {
        this.setGreenEdit()
      } else if (this.editSpecimen.color === '#0000ff') {
        this.setBlueEdit()
      } else {
        this.setRedEdit()
      }
      this.$bvModal.show('Edit-specimen')
    },
    closeModal() {
      this.$bvModal.hide('Add-specimen')
      this.specimen = {
        name: '',
        color: '',
        description: '',
      }
      this.editSpecimen = {
        name: '',
        color: '',
        description: '',
      }

      this.ring1 = false
      this.ring2 = false
      this.ring3 = false
      this.ring4 = false
      this.ring5 = false
      this.ring6 = false
      this.ring7 = false
    },
    closeEditModal() {
      this.$bvModal.hide('Edit-specimen')
      this.editSpecimen = {
        name: '',
        color: '',
        description: '',
      }
      this.ring1 = false
      this.ring2 = false
      this.ring3 = false
      this.ring4 = false
      this.ring5 = false
      this.ring6 = false
      this.ring7 = false
    },
    setPurple() {
      this.specimen.color = this.purple
      this.editSpecimen.color = this.purple
      this.ring1 = true
      this.ring2 = false
      this.ring3 = false
      this.ring4 = false
      this.ring5 = false
      this.ring6 = false
      this.ring7 = false
    },
    setYellow() {
      this.specimen.color = this.yellow
      this.editSpecimen.color = this.purple
      this.ring1 = false
      this.ring2 = true
      this.ring3 = false
      this.ring4 = false
      this.ring5 = false
      this.ring6 = false
      this.ring7 = false
    },
    setGrey() {
      this.specimen.color = this.grey
      this.editSpecimen.color = this.purple
      this.ring1 = false
      this.ring2 = false
      this.ring3 = true
      this.ring4 = false
      this.ring5 = false
      this.ring6 = false
      this.ring7 = false
    },
    setWhite() {
      this.specimen.color = this.white
      this.editSpecimen.color = this.purple
      this.ring1 = false
      this.ring2 = false
      this.ring3 = false
      this.ring4 = true
      this.ring5 = false
      this.ring6 = false
      this.ring7 = false
    },
    setRed() {
      this.specimen.color = this.red
      this.editSpecimen.color = this.purple
      this.ring1 = false
      this.ring2 = false
      this.ring3 = false
      this.ring4 = false
      this.ring5 = true
      this.ring6 = false
      this.ring7 = false
    },
    setGreen() {
      this.specimen.color = this.green
      this.editSpecimen.color = this.purple
      this.ring1 = false
      this.ring2 = false
      this.ring3 = false
      this.ring4 = false
      this.ring5 = false
      this.ring6 = true
      this.ring7 = false
    },
    setBlue() {
      this.specimen.color = this.blue
      this.editSpecimen.color = this.purple
      this.ring1 = false
      this.ring2 = false
      this.ring3 = false
      this.ring4 = false
      this.ring5 = false
      this.ring6 = false
      this.ring7 = true
    },
    setPurpleEdit() {
      this.editSpecimen.color = this.purple
      this.ring1 = true
      this.ring2 = false
      this.ring3 = false
      this.ring4 = false
      this.ring5 = false
      this.ring6 = false
      this.ring7 = false
    },
    setYellowEdit() {
      this.editSpecimen.color = this.yellow
      this.ring1 = false
      this.ring2 = true
      this.ring3 = false
      this.ring4 = false
      this.ring5 = false
      this.ring6 = false
      this.ring7 = false
    },
    setGreyEdit() {
      this.editSpecimen.color = this.grey
      this.ring1 = false
      this.ring2 = false
      this.ring3 = true
      this.ring4 = false
      this.ring5 = false
      this.ring6 = false
      this.ring7 = false
    },
    setWhiteEdit() {
      this.editSpecimen.color = this.white
      this.ring1 = false
      this.ring2 = false
      this.ring3 = false
      this.ring4 = true
      this.ring5 = false
      this.ring6 = false
      this.ring7 = false
    },
    setRedEdit() {
      this.editSpecimen.color = this.red
      this.ring1 = false
      this.ring2 = false
      this.ring3 = false
      this.ring4 = false
      this.ring5 = true
      this.ring6 = false
      this.ring7 = false
    },
    setGreenEdit() {
      this.editSpecimen.color = this.green
      this.ring1 = false
      this.ring2 = false
      this.ring3 = false
      this.ring4 = false
      this.ring5 = false
      this.ring6 = true
      this.ring7 = false
    },
    setBlueEdit() {
      this.editSpecimen.color = this.blue
      this.ring1 = false
      this.ring2 = false
      this.ring3 = false
      this.ring4 = false
      this.ring5 = false
      this.ring6 = false
      this.ring7 = true
    },
  },
}
</script>

<style scoped>
.back-purple {
  background: #800080;
}

.back-yellow {
  background: #fbff12;
}

.back-grey {
  background: #cfdbd5;
}

.back-white {
  background: #ffffff;
}

.back-red {
  background: #ff0000;
}

.back-green {
  background: #008000;
}

.back-blue {
  background: #0000ff;
}

.ring {
  border: 2px dotted #0c1821;
}
</style>