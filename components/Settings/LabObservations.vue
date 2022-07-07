<template>
  <div>
    <div>
      <b-modal id="Add-observations" title="Add Observations" centered hide-footer ref="addObservationsModal"
        @hide="closeModal">
        <div>
          <ValidationObserver v-slot="{ validate }">
            <form>
              <div class="
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-center
                  mb-3
                ">
                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Name *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input v-model="observation.name" type="text" placeholder="Name"
                      class="form-control ng-untouched ng-pristine ng-valid" />
                    <span class="text-12" style="color: red">{{
                    errors[0]
                    }}</span>
                  </validation-provider>
                </div>
                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Type *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-select v-model="observation.type.name" class=" text-14" placeholder="Type" label="name"
                      :options="['Float', 'Integer', 'Text', 'Options']"></v-select>
                    <span class="text-12" style="color: red">{{
                    errors[0]
                    }}</span>
                  </validation-provider>
                </div>
                <div v-if="showOptions" class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Options</small>
                  <div class="d-flex align-items-end">
                    <div class="w-100">
                      <div style="position: relative" class="mb-2 d-flex w-100"
                        v-for="(option, index) in observation.type.values" :key="index">
                        <div class="w-100">
                          <validation-provider rules="required" v-slot="{ errors }">
                            <input v-model="option.name" type="text" placeholder="" class="
                                form-control
                                ng-untouched ng-pristine ng-valid
                              " />
                            <span class="text-12" style="color: red">{{
                            errors[0]
                            }}</span>
                          </validation-provider>
                        </div>

                        <div @click="deleteOption(index)" style="left: 20px" class="theme-color-text pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18"
                            preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 28">
                            <path fill="currentColor"
                              d="M19.5 16a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11ZM14 2.25a3.75 3.75 0 0 1 3.745 3.55l.005.2h5.5a.75.75 0 0 1 .102 1.493l-.102.007h-1.059l-.634 7.832a6.47 6.47 0 0 0-1.48-.307l.61-7.525H7.313l1.211 14.932a2.25 2.25 0 0 0 2.243 2.068l2.966.001a6.516 6.516 0 0 0 1.077 1.5L10.767 26a3.75 3.75 0 0 1-3.738-3.447L5.808 7.5H4.75a.75.75 0 0 1-.743-.648L4 6.75a.75.75 0 0 1 .648-.743L4.75 6h5.5A3.75 3.75 0 0 1 14 2.25Zm3.024 16.774a.5.5 0 0 0 0 .707l1.769 1.77l-1.767 1.766a.5.5 0 1 0 .707.708l1.767-1.767l1.77 1.769a.5.5 0 1 0 .707-.707l-1.769-1.77l1.771-1.77a.5.5 0 0 0-.707-.707l-1.771 1.77l-1.77-1.77a.5.5 0 0 0-.707 0ZM14 3.75a2.25 2.25 0 0 0-2.245 2.096L11.75 6h4.5l-.005-.154A2.25 2.25 0 0 0 14 3.75Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="ml-3 mb-3 theme-color-text">
                      <div @click="addOption" class="pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24"
                          preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                          <g fill="none" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
                            <circle cx="12" cy="12" r="10" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Unit of measurement*</small>

                  <input v-model="observation.uom" type="text" placeholder="uom"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                </div>

                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Reference range *</small>
                  <div class="d-flex align-items-end">
                    <div class="w-100">
                      <div style="position: relative" class="mb-2 d-flex w-100"
                        v-for="(option, index) in observation.reference_range" :key="index">
                        <div class="w-100">
                          <input v-model="option.name" type="text" placeholder="" class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            " />
                        </div>

                        <div @click="deleteReference(index)" style="left: 20px" class="text-info pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18"
                            preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 28">
                            <path fill="currentColor"
                              d="M19.5 16a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11ZM14 2.25a3.75 3.75 0 0 1 3.745 3.55l.005.2h5.5a.75.75 0 0 1 .102 1.493l-.102.007h-1.059l-.634 7.832a6.47 6.47 0 0 0-1.48-.307l.61-7.525H7.313l1.211 14.932a2.25 2.25 0 0 0 2.243 2.068l2.966.001a6.516 6.516 0 0 0 1.077 1.5L10.767 26a3.75 3.75 0 0 1-3.738-3.447L5.808 7.5H4.75a.75.75 0 0 1-.743-.648L4 6.75a.75.75 0 0 1 .648-.743L4.75 6h5.5A3.75 3.75 0 0 1 14 2.25Zm3.024 16.774a.5.5 0 0 0 0 .707l1.769 1.77l-1.767 1.766a.5.5 0 1 0 .707.708l1.767-1.767l1.77 1.769a.5.5 0 1 0 .707-.707l-1.769-1.77l1.771-1.77a.5.5 0 0 0-.707-.707l-1.771 1.77l-1.77-1.77a.5.5 0 0 0-.707 0ZM14 3.75a2.25 2.25 0 0 0-2.245 2.096L11.75 6h4.5l-.005-.154A2.25 2.25 0 0 0 14 3.75Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="ml-3 mb-3 text-info">
                      <div @click="addReference" class="pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24"
                          preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                          <g fill="none" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
                            <circle cx="12" cy="12" r="10" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="my-3 d-flex justify-content-center">
                <button @click.prevent="closeModal" class="btn btn-light text-grey mr-5 text-14"
                  style="height: 38px; width: 5rem; text-align: center">
                  Cancel
                </button>
                <BaseButton class="btn-primary" @click="addObservation">Save
                </BaseButton>
              </div>

              <div type="button" ref="runValidation" id="runValidation" @click="validate"></div>
            </form>
          </ValidationObserver>
        </div>
      </b-modal>
    </div>
    <div>
      <UtilsFilterComponent @search-input="searchMe($event)" disable-pagination :disable-visualization="true" search-placeholder="Search">
        <template #besideFilterButton>
          <BaseButton class="btn-outline-primary" @click="openLabObservationsModal">Add Observation
          </BaseButton>
        </template>
        <table-component :fields="fields" :perPage="perPage" :busy="busy" :items="observations" :pages="pages"
          @page-changed="getObservations($event)">
          <template #reference_range="{ data }">
            <div v-for="(pint, index) in data.item.reference_range" :key="index" class="text-start mb-1">
              {{ pint.name }}
            </div>
          </template>
          <template #edit="{ data }">
            <div @click="OpenEditLabModal(data.item)" class="text-start">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18"
                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z" />
                <path fill="currentColor"
                  d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
              </svg>
            </div>
          </template>

          <template #type="{ data }">
            <div :id="`button-${data.item.type.name}`" class="text-start">
              <b-tooltip :target="`button-${data.item.type.name}`" variant="secondary" placement="bottom">
                <div v-for="(val, index) in data.item.type.values" :key="index" class="d-block text-14 text-white">
                  Value: {{ val.name }}
                </div>
              </b-tooltip>
              <span>{{ data.item.type ? data.item.type.name : "-" }}</span>
              <!-- {{ data.item.type.values }} -->
            </div>
          </template>
        </table-component>
      </UtilsFilterComponent>
    </div>

    <b-modal id="Edit-laboratory" title="Edit Laboratory Observations" centered hide-footer
      ref="editLaboratoryObsvModal">
      <div>
        <ValidationObserver v-slot="{ validate }">
          <form>
            <div class="
                d-flex
                flex-column
                align-items-center
                justify-content-center
                mb-3
              ">
              <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                <small class="text-grey text-12">Name *</small>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input v-model="editObservation.name" type="text" placeholder="Name"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                  <span class="text-12" style="color: red">{{
                  errors[0]
                  }}</span>
                </validation-provider>
              </div>
              <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                <small class="text-grey text-12">Type *</small>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-select v-model="editObservation.type.name" class="style-chooser text-14" placeholder="Type"
                    label="name" :options="['Float', 'Integer', 'Text', 'Options']"></v-select>
                  <span class="text-12" style="color: red">{{
                  errors[0]
                  }}</span>
                </validation-provider>
              </div>
              <div v-if="showOptions" class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                <small class="text-grey text-12">Options</small>
                <div class="d-flex align-items-end">
                  <div class="w-100">
                    <div style="position: relative" class="mb-2 d-flex w-100"
                      v-for="(option, index) in editObservation.type.values" :key="index">
                      <div class="w-100">
                        <validation-provider rules="required" v-slot="{ errors }">
                          <input v-model="option.name" type="text" placeholder="" class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            " />
                          <span class="text-12" style="color: red">{{
                          errors[0]
                          }}</span>
                        </validation-provider>
                      </div>

                      <div @click="deleteEditOption(index)" style="left: 20px" class="text-danger pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18"
                          preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 28">
                          <path fill="currentColor"
                            d="M19.5 16a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11ZM14 2.25a3.75 3.75 0 0 1 3.745 3.55l.005.2h5.5a.75.75 0 0 1 .102 1.493l-.102.007h-1.059l-.634 7.832a6.47 6.47 0 0 0-1.48-.307l.61-7.525H7.313l1.211 14.932a2.25 2.25 0 0 0 2.243 2.068l2.966.001a6.516 6.516 0 0 0 1.077 1.5L10.767 26a3.75 3.75 0 0 1-3.738-3.447L5.808 7.5H4.75a.75.75 0 0 1-.743-.648L4 6.75a.75.75 0 0 1 .648-.743L4.75 6h5.5A3.75 3.75 0 0 1 14 2.25Zm3.024 16.774a.5.5 0 0 0 0 .707l1.769 1.77l-1.767 1.766a.5.5 0 1 0 .707.708l1.767-1.767l1.77 1.769a.5.5 0 1 0 .707-.707l-1.769-1.77l1.771-1.77a.5.5 0 0 0-.707-.707l-1.771 1.77l-1.77-1.77a.5.5 0 0 0-.707 0ZM14 3.75a2.25 2.25 0 0 0-2.245 2.096L11.75 6h4.5l-.005-.154A2.25 2.25 0 0 0 14 3.75Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="ml-3 mb-3 text-info">
                    <div @click="addEditOption" class="pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24"
                        preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
                          <circle cx="12" cy="12" r="10" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                <small class="text-grey text-12">Unit of measurement*</small>
                <validation-provider rules="required" v-slot="{ errors }">
                  <input v-model="editObservation.uom" type="text" placeholder="uom"
                    class="form-control ng-untouched ng-pristine ng-valid" />
                  <span class="text-12" style="color: red">{{
                  errors[0]
                  }}</span>
                </validation-provider>
              </div>

              <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                <small class="text-grey text-12">Reference range *</small>
                <div class="d-flex align-items-end">
                  <div class="w-100">
                    <div style="position: relative" class="mb-2 d-flex w-100"
                      v-for="(option, index) in editObservation.reference_range" :key="index">
                      <div class="w-100">
                        <validation-provider rules="required" v-slot="{ errors }">
                          <input v-model="option.name" type="text" placeholder="" class="
                              form-control
                              ng-untouched ng-pristine ng-valid
                            " />
                          <span class="text-12" style="color: red">{{
                          errors[0]
                          }}</span>
                        </validation-provider>
                      </div>

                      <div @click="deleteEditReference(index)" style="position: absoulte; z-index: 100000; left: 20px"
                        class="text-danger pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18"
                          preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 28">
                          <path fill="currentColor"
                            d="M19.5 16a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11ZM14 2.25a3.75 3.75 0 0 1 3.745 3.55l.005.2h5.5a.75.75 0 0 1 .102 1.493l-.102.007h-1.059l-.634 7.832a6.47 6.47 0 0 0-1.48-.307l.61-7.525H7.313l1.211 14.932a2.25 2.25 0 0 0 2.243 2.068l2.966.001a6.516 6.516 0 0 0 1.077 1.5L10.767 26a3.75 3.75 0 0 1-3.738-3.447L5.808 7.5H4.75a.75.75 0 0 1-.743-.648L4 6.75a.75.75 0 0 1 .648-.743L4.75 6h5.5A3.75 3.75 0 0 1 14 2.25Zm3.024 16.774a.5.5 0 0 0 0 .707l1.769 1.77l-1.767 1.766a.5.5 0 1 0 .707.708l1.767-1.767l1.77 1.769a.5.5 0 1 0 .707-.707l-1.769-1.77l1.771-1.77a.5.5 0 0 0-.707-.707l-1.771 1.77l-1.77-1.77a.5.5 0 0 0-.707 0ZM14 3.75a2.25 2.25 0 0 0-2.245 2.096L11.75 6h4.5l-.005-.154A2.25 2.25 0 0 0 14 3.75Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="ml-3 mb-3 text-info">
                    <div @click="addEditReference" class="pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24"
                        preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
                          <circle cx="12" cy="12" r="10" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="my-3 d-flex justify-content-center">
              <button @click.prevent="closeEditModal" class="btn btn-light text-grey mr-5 text-14"
                style="height: 38px; width: 5rem; text-align: center">
                Cancel
              </button>
              <!-- <button @click.prevent="editObservationfunc" class="
                  btn
                  text-white text-14
                  mainbtndashboard
                  medbrownparagraph
                  theme-color
                " style="height: 38px; width: 5rem; text-align: center">
                <span v-if="isbusy">
                  <b-spinner label="loading" variant="primary" style="width: 1.5rem; height: 1.5rem"
                    class="text-center">
                  </b-spinner>
                </span>
                <span v-else>Save</span>
              </button> -->
              <BaseButton class="btn-primary" @click="editObservationfunc">Save
              </BaseButton>
            </div>

            <div type="button" ref="runValidation" id="runValidation" @click="validate"></div>
          </form>
        </ValidationObserver>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busy: false,
      isbusy: false,
      showOptions: false,
      page: 1,
      pages: 0,
      perPage: 12,
      uniqueId: "",
      observations: [],
      fields: [
        { key: "name", label: "Observation name", sortable: true },
        { key: "type", label: "Type", sortable: true },
        { key: "uom", label: "UoM", sortable: true },
        { key: "reference_range", label: "Reference Range", sortable: true },
        { key: "edit", label: "", sortable: false },
      ],
      uniqueId: "",
      observation: {
        name: "",
        uom: "",
        reference_range: [
          {
            name: "",
          },
        ],

        type: {
          name: null,
          values: [
            {
              name: "",
            },
          ],
        },
      },
      editObservation: {
        name: "",
        uom: "",
        reference_range: [
          {
            name: "",
          },
        ],
        type: {
          name: null,
          values: [
            {
              name: "",
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.getObservations();
  },
  watch: {
    "observation.type.name": {
      handler() {
        if (this.observation.type.name === "Options") {
          this.showOptions = true;
        } else {
          this.showOptions = false;
        }
      },
    },
    "editObservation.type.name": {
      handler() {
        if (this.editObservation.type.name === "Options") {
          this.showOptions = true;
        } else {
          this.showOptions = false;
          this.editObservation.type.values = [];
        }
      },
    },
  },
  methods: {
    openLabObservationsModal() {
      this.$bvModal.show("Add-observations");
    },
    searchMe(e){
      console.log(e)
      this.getObservations(1, e)
    },
    closeEditModal() {
      this.$bvModal.hide("Edit-laboratory");
      this.editObservation = {
        name: "",
        uom: "",
        reference_range: [
          {
            name: "",
          },
        ],
        type: {
          name: null,
          values: [
            {
              name: "",
            },
          ],
        },
      };
    },
    async editObservationfunc() {
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click();
      }

      if (this.editObservation) {
        try {
          this.isbusy = true;
          let response = await this.$axios.$put(
            `laboratory/lab_observation/${this.uniqueId}/`,

            this.editObservation
          );

          this.$toast({
            type: 'success',
            text: ' observations edited'
          })
          
          this.getObservations();
          this.$bvModal.hide("Edit-laboratory");
          this.closeEditModal()
        } catch {
          this.$toast({
            type: 'error',
            text: 'Unable to edit lab observations'
          })
          
        } finally {
          this.isbusy = false;
        }
      }
    },
    OpenEditLabModal(e) {
      console.log(e);
      this.editObservation = e;
      this.uniqueId = e.id;
      this.$bvModal.show("Edit-laboratory");
    },

    addReference() {
      this.observation.reference_range.push({
        name: "",
      });
    },
    addEditReference() {
      this.editObservation.reference_range.push({
        name: "",
      });
    },
    addOption() {
      this.observation.type.values.push({
        name: "",
      });
    },
    addEditOption() {
      this.editObservation.type.values.push({
        name: "",
      });
    },
    deleteReference(i) {
      this.observation.reference_range.splice(i, 1);
    },

    deleteEditReference(i) {
      this.editObservation.reference_range.splice(i, 1);
    },
    deleteOption(i) {
      this.observation.type.values.splice(i, 1);
    },
    deleteEditOption(i) {
      this.editObservation.type.values.splice(i, 1);
    },

    closeModal() {
      this.$bvModal.hide("Add-observations");
      this.observation = {
        name: "",
        uom: "",
        reference_range: [
          {
            name: "",
          },
        ],

        type: {
          name: null,
          values: [
            {
              name: "",
            },
          ],
        },
      };
    },

    async addObservation() {
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click();
      }
      if (
        this.observation.name &&
        this.observation.uom &&
        this.observation.type
      ) {
        try {
          this.isbusy = true;
          let response = await this.$axios.$post(
            "laboratory/lab_observation/",
            this.observation
          );

          this.$toast({
            type: 'success',
            text: 'Lab observations added'
          })
          this.getObservations();
          this.$bvModal.hide("Add-observations");
          this.closeModal()
        } catch {
          this.$toast({
            type: 'error',
            text: 'Unable to add lab observations'
          })
         
        } finally {
          this.isbusy = false;
        }
      }
    },

    async getObservations(page = 1, e = "") {
      try {
        this.busy = true;
        let uri = `laboratory/lab_observation/?page=${page}&name=${e}&size=${this.perPage}`;

        const response = await this.$axios.$get(uri);

        this.observations = response.results;
        this.pages = response.total_pages;
        this.busy = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.busy = false;
      }
    },
  },
};
</script>

<style scoped>
.b-table-sticky-header,
.table-responsive,
[class*="table-responsive-"] {
  margin-bottom: 0rem;
}
.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0 1.25rem 1.25rem 1.25rem;
}
</style>