<template>
  <div>
    <ModalWrapper
      size="lg"
      id="orderLab"
      title="Observations"
      :arrangement="false"
      :cancelText="`Close`"
      :stacking="false"
      @show="getObservation(pages, filter)"
      @hide="sendData"
      @change="$emit('change', $event)"
    >
      <ValidationObserver ref="form">
        <form>
          <!-- <div
            v-if="observationWithoutPagination.length < 1"
            class="w-25 m-auto"
          >
            <div class="ml-0 py-5 my-5">
              <b-spinner
                variant="success"
                style="width: 6rem; height: 6rem"
                label="Spinning"
              ></b-spinner>
            </div>
          </div> -->
          <div>
            <div>
              <div>
                <div class="d-flex flex-wrap text-white">
                  <div
                    v-for="(item, index) in selectedOBV"
                    :key="index"
                    class="
                      d-flex
                      justify-content-between
                      col-md-2
                      px-1
                      py-1
                      mb-2
                      rounded-sm
                      text-14
                      mx-2
                      bg-success
                    "
                  >
                    <div class="text-truncate text-white">{{ item.name }}</div>
                    <span
                      @click="removeObv(index, item)"
                      class="point text-danger"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="p-3">
                  <input
                    type="text"
                    placeholder=" Type to search..."
                    class="form-control ng-untouched ng-pristine ng-valid"
                    v-model="searchParam"
                  />
                </div>
                <TableComponent
                  :items="observationWithoutPagination"
                  :fields="fields"
                  :pages="pages"
                  :busy="busy"
                  @page-changed="goToNextPage"
                >
                  <template #clear="{ data }">
                    <label class="exercise-option-check blue-check">
                      <input
                        type="checkbox"
                        name="customRadio"
                        @change="
                          selectOBV(
                            $event.target.checked,
                            data.item,
                            data.index
                          )
                        "
                      />
                      <span class="checkmark"></span>
                    </label>
                  </template>
                </TableComponent>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
import { debounce, result } from 'lodash'
export default {
  props: {
    observations: {
      type: Array,
      required: false,
    },
    closeModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    observations() {
      this.selectedOBV = this.observations
    },
    closeModal() {
      if (this.closeModal === true) {
        this.selectedOBV = []
        this.observationWithoutPagination = []
      }
    },
    searchParam: {
      handler: debounce(function (newVal) {
        this.filter.name = newVal
        this.getObservation(1, this.filter)
      }, 1000),
      deep: true,
    },
    'filter.name': {
      handler: debounce(function (newVal) {
        console.log(newVal)
      }, 1000),
      deep: true,
    },
  },
  data() {
    return {
      searchParam: '',
      propsObv: [],
      selectedOBV: [],
      observationWithoutPagination: [],
      pages: 1,
      busy: false,
      filter: {
        size: 10,
        name: '',
      },
      fields: [
        {
          key: 'clear',
          label: '',
          sortable: true,
        },
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'type.name',
          label: 'Type',
          sortable: true,
        },
        {
          key: 'uom',
          label: 'UOM',
          sortable: true,
        },
      ],
    }
  },
  methods: {
    async getObservation(page = 1, e = { size: 10, name: '' }) {
      this.busy = true
      let temp1 = await this.$api.core.observations({
        ...e,
        page: page,
      })
      const formatted = temp1.results.map((el) => ({
        ...el,
        selected: false,
      }))
      this.pages = temp1.total_pages
      this.$emit('fetch_Data', formatted)
      this.observationWithoutPagination = formatted
      this.busy = false
    },
    selectOBV(e, obv, index) {
      if (e) {
        console.log(e, obv)
        if (this.selectedOBV.length !== 0) {
          for (let x = 0; x < this.selectedOBV.length; x++) {
            // Check condition before pushing item into cart
            const exists =
              this.selectedOBV.findIndex((el) => el.id === obv.id) > -1
            if (!exists) {
              // Push item that does not exist into array
              this.selectedOBV.push(obv)
            }
          }
        } else {
          this.selectedOBV.push(obv)
        }
      }
    },
    removeObv(index) {
      this.selectedOBV.splice(index, 1)
    },
    goToNextPage(n) {
      this.getObservation(n, this.filter)
    },
    sendData() {
      this.$emit('sendData', this.selectedOBV)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>