<template>
  <div>
    <!-- ***************Add Unit Modal***************** -->
    <div>
      <b-modal id="Add-unit" title="Add Lab Unit" centered hide-footer ref="addUnitModal" @hide="closeModal">
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
                    <input v-model="unit.name" type="text" placeholder="Name"
                      class="form-control ng-untouched ng-pristine ng-valid" />
                    <span class="text-12" style="color: red">{{
                    errors[0]
                    }}</span>
                  </validation-provider>
                </div>
                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Order no. *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input v-model="unit.order_no" type="number" placeholder="Order no"
                      class="form-control ng-untouched ng-pristine ng-valid" />
                    <span class="text-12" style="color: red">{{
                    errors[0]
                    }}</span>
                  </validation-provider>
                </div>
              </div>

              <div class="my-3 d-flex justify-content-center">
                <button @click.prevent="closeModal" class="btn btn-light text-grey mr-5 text-14"
                  style="height: 38px; width: 5rem; text-align: center">
                  Cancel
                </button>
                <BaseButton @click.prevent="addLabUnit" class="">Save
                </BaseButton>
              </div>

              <div type="button" ref="runValidation" id="runValidation" @click="validate"></div>
            </form>
          </ValidationObserver>
        </div>
      </b-modal>
    </div>

    <div>
      <UtilsFilterComponent disable-pagination :disable-visualization="true" search-placeholder="Search">
        <template #besideFilterButton>
          <BaseButton class="btn-outline-primary" @click="openLabUnitModal">Add Lab unit
          </BaseButton>
        </template>
        <table-component :paginate="true" :busy="busy" :pages="pages" :items="units" :totalItems="rows"
          :perPage="perPage" :fields="fields" :current-page="currentPage" @page-changed="getUnits($event)">
          <template #edit="{ data }">
            <div @click="openEditUnitModal(data.item)" class="text-start">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18"
                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z" />
                <path fill="currentColor"
                  d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
              </svg>
            </div>
          </template>
        </table-component>
      </UtilsFilterComponent>
    </div>

    <!-- *********************edit modal******************* -->
    <div>
      <b-modal id="Edit-unit" title="Edit Lab Unit" centered hide-footer ref="editUnitModal">
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
                    <input v-model="editUnit.name" type="text" placeholder="Name"
                      class="form-control ng-untouched ng-pristine ng-valid" />
                    <span class="text-12" style="color: red">{{
                    errors[0]
                    }}</span>
                  </validation-provider>
                </div>
                <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                  <small class="text-grey text-12">Order no. *</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input v-model="editUnit.order_no" type="number" placeholder="Order no"
                      class="form-control ng-untouched ng-pristine ng-valid" />
                    <span class="text-12" style="color: red">{{
                    errors[0]
                    }}</span>
                  </validation-provider>
                </div>
              </div>

              <div class="my-3 d-flex justify-content-center">
                <button @click.prevent="closeEditUnitModal" class="btn btn-light text-grey mr-5 text-14"
                  style="height: 38px; width: 5rem; text-align: center">
                  Cancel
                </button>

                <BaseButton @click.prevent="editUnitfunc" class="">Save
                </BaseButton>
              </div>

              <div type="button" ref="runValidation" id="runValidation" @click="validate"></div>
            </form>
          </ValidationObserver>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      units: [],
      unit: {
        name: "",
        order_no: null,
      },
      editUnit: {
        name: "",
        order_no: null,
      },
      uniqueId: "",
      isbusy: false,
      busy: false,
      perPage: 12,
      perpage: 3,
      page: 1,
      pages: 0,
      currentPage: 1,
      fields: [
        { key: "name", label: "Specimen name", sortable: true },
        { key: "order_no", label: "Order No.", sortable: true },

        { key: "edit", label: "", sortable: false },
      ],
    };
  },
  computed: {
    rows() {
      return this.units.length;
    },
  },
  mounted() {
    this.getUnits();
  },
  methods: {
    openLabUnitModal() {
      this.$bvModal.show("Add-unit");
    },
    closeModal() {
      this.$bvModal.hide("Add-unit");
      this.unit = {
        name: "",
        order_no: null,
      };
    },
    openEditUnitModal(e) {
      this.$bvModal.show("Edit-unit");
      this.editUnit.name = e.name;
      this.editUnit.order_no = e.order_no;
      this.uniqueId = e.id;
    },
    closeEditUnitModal(e) {
      this.$bvModal.hide("Edit-unit");
    },
    async addLabUnit() {
      console.log("yay");
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click();
      }
      if (this.unit.name && this.unit.order_no) {
        try {
          this.isbusy = true;
          let response = await this.$axios.$post(
            "laboratory/lab_unit/",
            this.unit
          );
          this.$toast({
            type: 'success',
            text: 'Lab Unit added'
          })
        
          this.getUnits();
          this.$bvModal.hide("Add-unit");
          this.unit = {
            name: "",
            order_no: "",
          };
        } catch {
          this.$toast({
            type: 'error',
            text: 'Unable to add lab unit'
          })
        } finally {
          this.isbusy = false;
        }
      }
    },

    async editUnitfunc() {
      if (this.$refs.runValidation) {
        this.$refs.runValidation.click();
      }

      if (this.editUnit) {
        try {
          this.isbusy = true;
          let response = await this.$axios.$put(
            `laboratory/lab_unit/${this.uniqueId}/`,

            this.editUnit
          );

          this.$toast({
            type: 'success',
            text: 'Unit edited'
          })
          this.getUnits();
          this.closeEditUnitModal();
        } catch {
          this.$toast.error(``);
          this.$toast({
            type: 'error',
            text: 'Unable to edit unit'
          })
        } finally {
          this.isbusy = false;
        }
      }
    },

    async getUnits(page = 1) {
      try {
        this.busy = true;
        let uri = `laboratory/lab_unit/?page=${page}&size=${this.perPage}`;

        const response = await this.$axios.$get(uri);

        this.units = [];
        console.log(response);

        this.pages = response.total_pages;

        for (const iterator of response.results) {
          let time = iterator.created_at;
          let y = new Date(time).toLocaleDateString();
          let z = new Date(time).toTimeString().substring(0, 5);
          let b = y + ", " + z;
          this.units.push({
            name: iterator.name,

            created_at: b,
            order_no: iterator.order_no,
            id: iterator.id,
          });
        }
        this.busy = false;
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  },
};
</script>

<style>
</style>