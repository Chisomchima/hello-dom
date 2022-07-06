<template>
  <div>
    <div>
      <b-modal
        id="Add-panel"
        title="Add Laboratory Panel"
        centered
        hide-footer
        ref="addLabModal"
        @hide="closeModal"
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
                      v-model="panel.name"
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
                  <small class="text-grey text-12">Observation(s) *</small>
                  <div class="d-flex align-items-end">
                    <div class="w-100">
                      <!-- <div class="w-100 mb-3"> -->
                      <validation-provider
                        class="w-100"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <VSelect
                          class="text-grey text-14"
                          placeholder="Type to search"
                          label="name"
                          v-model="panel.obv"
                          :options="observationWithoutPagination"
                          :loading="cue"
                          :reduce="(option) => option"
                          multiple
                          taggable
                        >
                        </VSelect>
                        <span class="text-12" style="color: red">{{
                          errors[0]
                        }}</span>
                      </validation-provider>
                      <!-- </div> -->
                    </div>
                  </div>
                </div>
                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Specimen Type *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <VSelect
                      class="text-grey text-14"
                      placeholder="Type to search"
                      label="name"
                      :reduce="(option) => option"
                      :options="specimensForModal"
                      :loading="cue1"
                      v-model="typeId"
                    >
                    </VSelect>
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>
                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Lab Unit *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <VSelect
                      class="text-grey text-14"
                      placeholder="Type to search"
                      label="name"
                      :reduce="(option) => option"
                      :options="unitsForModal"
                      :loading="cue2"
                      v-model="unitId"
                    >
                    </VSelect>
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>

                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Biling price *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input
                      v-model="panel.bill_price"
                      type="number"
                      placeholder="Biling price"
                      class="form-control ng-untouched ng-pristine ng-valid"
                    />
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>

                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Cost price </small>
                  <input
                    v-model="panel.cost_price"
                    type="number"
                    placeholder="Cost price"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
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
                <BaseButton @click.prevent="addPanel" class=""
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

    <!-- ************edit************ -->
    <div>
      <b-modal
        id="Edit-panel"
        title="Edit Laboratory Panel"
        centered
        hide-footer
        ref="editLabModal"
        @hide="closeEditModal"
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
                      v-model="editPanel.name"
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
                  <small class="text-grey text-12">Observation *</small>
                  <div class="d-flex align-items-end">
                    <div class="w-100">
                      <div style="position: relative" class="mb-2 d-flex w-100">
                        <div class="w-100">
                          <validation-provider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-select
                              class="text-grey text-14"
                              placeholder="Type to search"
                              label="name"
                              v-model="editPanel.obv"
                              :options="observationWithoutPagination"
                              :reduce="(option) => option"
                              :loading="cue"
                              multiple
                              taggable
                            ></v-select>
                            <span class="text-12" style="color: red">{{
                              errors[0]
                            }}</span>
                          </validation-provider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Type *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-select
                      class="text-grey text-14"
                      placeholder="Type to search"
                      label="name"
                      :options="specimensForModal"
                      :loading="cue1"
                      v-model="sswap"
                    >
                    </v-select>
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>
                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Unit *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-select
                      class="text-grey text-14"
                      placeholder="Type to search"
                      label="name"
                      :options="unitsForModal"
                      :loading="cue2"
                      v-model="lswap"
                    >
                    </v-select>
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>

                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Biling price *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input
                      v-model="editPanel.bill_price"
                      type="number"
                      placeholder="Biling price"
                      class="form-control ng-untouched ng-pristine ng-valid"
                    />
                    <span class="text-12" style="color: red">{{
                      errors[0]
                    }}</span>
                  </validation-provider>
                </div>

                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Cost price</small>
                  <input
                    v-model="editPanel.cost_price"
                    type="number"
                    placeholder="Cost price"
                    class="form-control ng-untouched ng-pristine ng-valid"
                  />
                </div>
              </div>
              <div class="my-2 px-5 align-item-start">
                <small class="text-grey text-14">Active</small>
                <input
                  v-model="editPanel.active"
                  type="checkbox"
                  placeholder="Name"
                  class="ng-untouched ng-pristine ng-valid"
                />
              </div>
              <div class="my-3 d-flex justify-content-center">
                <button
                  @click.prevent="closeEditModal"
                  class="btn btn-light text-grey mr-5 text-14"
                  style="height: 38px; width: 5rem; text-align: center"
                >
                  Cancel
                </button>
                <BaseButton @click.prevent="editPanelFunc" class=""
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
        disable-pagination
        :disable-visualization="true"
        search-placeholder="Search"
        @search-input="searchMe($event)"
      >
        <template #besideFilterButton>
          <BaseButton class="btn-outline-primary" @click="openLabPanelModal"
            >Add Lab panel
          </BaseButton>
        </template>
        <table-component
          :paginate="true"
          :perPage="perPage"
          :fields="fields"
          :busy="busy"
          :pages="pages"
          :items="labPanels"
          @page-changed="getLabPanels($event)"
        >
          <template #obv="{ data }">
            <!-- <span>{{ data.item.obv }}</span> -->
            <div v-for="(pint, index) in data.item.obv" :key="index">
              <div class="text-start mb-1">{{ pint.name }}</div>
            </div>
          </template>
          <template #specimen_type="{ data }">
            <div
              style="max-width: 5rem"
              class="first text-12 text-grey pointer badge text-truncate"
              :style="`background: ${data.item.specimen_type.color}`"
            >
              {{ data.item.specimen_type.name }}
            </div>
          </template>
          <template #lab_unit="{ data }">
            <span>{{ data.item.lab_unit.name }}</span>
          </template>
          <template #edit="{ data }">
            <div @click="openEditPanel(data.item)" class="text-start">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      panel: {
        name: '',
        obv: [],
        specimen_type: null,
        lab_unit: null,
        active: true,
        bill_price: null,
        cost_price: null,
      },
      sswap: '',
      lswap: '',
      editPanel: {
        name: '',
        obv: [],
        specimen_type: null,
        lab_unit: null,
        bill_price: null,
        cost_price: null,
        active: true,
      },
      lab_unit: '',
      specimen_type: '',
      typeId: '',
      unitId: '',
      page: 1,
      pager: 1,
      perPage: 20,
      perPager: 12,
      pages: 0,
      observations: [],
      observationWithoutPagination: [],
      busy: false,
      isbusy: false,
      specimens: [],
      specimensForModal: [],
      units: [],
      unitsForModal: [],
      cue: false,
      cue1: false,
      cue2: false,
      labPanels: [],
      fields: [
        { key: 'identity', label: 'Name', sortable: true },
        { key: 'obv', label: 'Observations', sortable: true },

        { key: 'specimen_type', label: 'Specimen Type', sortable: true },
        { key: 'lab_unit', label: 'Lab Unit', sortable: true },
        { key: 'edit', label: '', sortable: false },
      ],
      uniqueId: '',
    }
  },
  watch: {
    typeId() {
      this.panel.specimen_type = this.typeId.id
    },
    unitId() {
      this.panel.lab_unit = this.unitId.id
    },
    // "editPanel.lab_unit": {
    //   handler() {
    //     let edit = this.editPanel.lab_unit;
    //     this.editPanel.lab_unit = edit.id
    //   },
    //   deep: true,
    // },
    // "editPanel.specimen_type": {
    //   handler() {
    //     this.editPanel.specimen_type = this.editPanel.specimen_type.id;
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    this.getLabPanels()
  },
  methods: {
    searchMe(e){

        this.getLabPanels(1, e)
    },
    closeModal() {
      this.$bvModal.hide('Add-panel')
      this.panel = {
        name: '',
        obv: [],
        specimen_type: '',
        lab_unit: '',
        active: false,
      }
    },
    closeEditModal() {
      this.$bvModal.hide('Edit-panel')
      this.editPanel = {
        name: '',
        obv: [],
        specimen_type: null,
        lab_unit: null,
        active: false,
      }
    },
    async openLabPanelModal() {
      this.$bvModal.show('Add-panel')
      if (this.observationWithoutPagination.length < 1) {
        this.cue = true
        let temp = await this.$api.core.observations({ size: 1000 })
        this.observationWithoutPagination = temp.results
        this.cue = false
      }
      if (this.specimensForModal.length < 1) {
        this.cue1 = true
        let temp = await this.$api.core.specimens({ size: 1000 })
        this.specimensForModal = temp.results
        this.cue1 = false
      }
      if (this.unitsForModal.length < 1) {
        this.cue2 = true
        let temp = await this.$api.core.labUnits({ size: 1000 })
        this.unitsForModal = temp.results
        this.cue2 = false
      }
    },

    async openEditPanel(e) {
      console.log(e)
      this.uniqueId = e.id
      this.editPanel.name = e.identity
      ;(this.editPanel.bill_price = e.bill_price),
        (this.editPanel.cost_price = e.cost_price)

      this.sswap = e.specimen_type
      this.lswap = e.lab_unit
      this.editPanel.obv = e.obv
      this.editPanel.active = e.active
      this.$bvModal.show('Edit-panel')
      if (this.observationWithoutPagination.length < 1) {
        this.cue = true
        let temp = await this.$api.core.observations({ size: 1000 })
        this.observationWithoutPagination = temp.results
        this.cue = false
      }
      if (this.specimensForModal.length < 1) {
        this.cue1 = true
        let temp = await this.$api.core.specimens({ size: 1000 })
        this.specimensForModal = temp.results
        this.cue1 = false
      }
      if (this.unitsForModal.length < 1) {
        this.cue2 = true
        let temp = await this.$api.core.labUnits({ size: 1000 })
        this.unitsForModal = temp.results
        this.cue2 = false
      }
    },

    async addPanel() {
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click()
      }
      if (
        this.panel.name &&
        this.panel.specimen_type &&
        this.panel.obv &&
        this.panel.lab_unit
      ) {
        try {
          let response = await this.$axios.$post(
            'laboratory/lab_panel/',
            this.panel
          )

          this.$toast({
            type: 'success',
            text: 'Lab Panel added',
          })
          this.getLabPanels()
          this.$bvModal.hide('Add-panel')

          this.panel = {
            name: '',
            obv: [],
            specimen_type: null,
            lab_unit: null,
            active: false,
          }
        } catch {
          this.$toast({
            type: 'error',
            text: `Unable to add lab panels`,
          })
        } finally {
        }
      }
    },

    async editPanelFunc() {
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click()
      }

      this.editPanel.lab_unit = this.lswap.id
      this.editPanel.specimen_type = this.sswap.id

      if (this.editPanel) {
        try {
          this.isbusy = true

          let response = await this.$axios.$put(
            `laboratory/lab_panel/${this.uniqueId}/`,

            this.editPanel
          )

          this.$toast({
            type: 'success',
            text: 'Laboratory panel edited',
          })
          this.getLabPanels()
          this.$bvModal.hide('Edit-panel')
        } catch {
          this.$toast({
            type: 'error',
            text: `Unable to edit laboratory panel`,
          })
        } finally {
          this.isbusy = false
        }
      }
    },

    async getLabPanels(page = 1,  e = "") {
      try {
        this.busy = true
        let uri = `/laboratory/lab_panel/?page=${page}&name=${e}&size=${this.perPager}`

        const response = await this.$axios.$get(uri)

        this.labPanels = []
        this.pages = response.total_pages
        let temp = []
        for (const iterator of response.results) {
          let time = iterator.created_at
          let y = new Date(time).toLocaleDateString()
          let z = new Date(time).toTimeString().substring(0, 5)
          let b = y + ', ' + z
          // let red = iterator.obv.reduce(
          //   (start, end) => `${start.name + end.name}`
          // );
          this.labPanels.push({
            identity: iterator.name,
            obv: iterator.obv,
            created_at: b,
            specimen_type: iterator.specimen_type,
            lab_unit: iterator.lab_unit,
            active: true,
            id: iterator.id,
            bill_price: iterator.bill_price,
            cost_price: iterator.cost_price,
          })
        }

        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
  },
}
</script>

<style>
</style>