<template>
  <div>
    <div>
      <div v-if="labitems || imgitems">
        <b-row>
          <b-col cols="12" class="mt-4 ml-3">
            <b-skeleton animation="wave" width="70%"></b-skeleton>
            <b-skeleton animation="wave" width="65%"></b-skeleton>
            <b-skeleton animation="wave" width="60%"></b-skeleton>
          </b-col>
          <b-col cols="12" class="mt-3 ml-3">
            <b-skeleton animation="fade" width="70%"></b-skeleton>
            <b-skeleton animation="fade" width="65%"></b-skeleton>
            <b-skeleton animation="fade" width="60%"></b-skeleton>
          </b-col>
          <b-col cols="12" class="mt-3 ml-3">
            <b-skeleton animation="fade" width="30%"></b-skeleton>
            <b-skeleton animation="fade" width="75%"></b-skeleton>
            <b-skeleton animation="fade" width="40%"></b-skeleton>
          </b-col>
          <b-col cols="12" class="mt-3 ml-3">
            <b-skeleton animation="fade" width="70%"></b-skeleton>
            <b-skeleton animation="fade" width="65%"></b-skeleton>
            <b-skeleton animation="fade" width="60%"></b-skeleton>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="text-grey text-18 mb-0">Orders</h4>

          <div class="col-md-8 d-flex justify-content-end">
            <div class="mx-2">
              <button @click="orderLab" class="btn btn-sm btn-outline-primary">
                Laboratory
              </button>
            </div>
            <div class="mx-2">
              <button
                @click="orderImaging"
                class="btn btn-sm btn-outline-primary"
              >
                Imaging
              </button>
            </div>
            <div class="mx-2">
              <button class="btn btn-sm btn-outline-primary">
                Prescription
              </button>
            </div>
          </div>
        </div>

        <br />

        <div class="text-center">
          <div
            v-if="labObvCount != 0"
            class="rounded p-2 mb-3"
            style="min-height: 6.5rem; border: 1px solid #212529"
          >
            <div class="d-flex justify-content-between align-items-center mb-1">
              <p class="mb-0">Lab orders</p>
              <div class="text-16 text-grey">
                <span
                  @click="orderLab"
                  style="position: relative"
                  class="text-primary mx-1 point"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-plus-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"
                    /></svg
                ></span>
              </div>
            </div>

            <div class="d-flex flex-wrap">
              <span v-for="(parent, index) in labServiceOptions" :key="index">
                <span
                  v-for="(child, childIndex) in parent.lab_panels"
                  :key="childIndex"
                >
                  <span
                    v-if="child.selected === true"
                    class="badge-light p-2 text-12 rounded mx-1 text-secondary"
                  >
                    {{ child.name }}
                    <span
                      @click="
                        removeLabOrder({
                          parent: index,
                          child: childIndex,
                          state: child.selected,
                        })
                      "
                      class="text-danger point"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6Zm3.6 5q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4Q8.65 4 6.325 6.325Q4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"
                        />
                      </svg>
                    </span>
                  </span>
                </span>
              </span>
            </div>

            <div class="d-flex justify-content-end align-items-center">
              <div class="text-16 text-grey">
                <span
                  @click="closeLabOrder"
                  style="position: relative"
                  class="text-danger mx-1 point"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 16 16"
                  >
                    <g fill="currentColor">
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </g></svg
                ></span>
              </div>
            </div>
          </div>

          <!-- ********************************** -->

          <div
            v-if="imgObvCount"
            class="rounded p-2"
            style="min-height: 7rem; border: 1px solid #212529"
          >
            <div class="d-flex justify-content-between align-items-center mb-1">
              <p class="mb-0">Imaging orders</p>
              <div class="text-16 text-grey">
                <span
                  @click="orderImaging"
                  style="position: relative"
                  class="text-primary mx-1 point"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-plus-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"
                    /></svg
                ></span>
              </div>
            </div>

            <div class="d-flex flex-wrap">
              <span v-for="(parent, index) in imagingOption" :key="index">
                <span
                  v-for="(child, childIndex) in parent.img_observations"
                  :key="childIndex"
                >
                  <span
                    v-if="child.selected === true"
                    class="badge-light p-2 text-12 rounded mx-1 text-secondary"
                  >
                    {{ child.name }}
                    <span
                      @click="
                        removeImagingOrder({
                          parent: index,
                          child: childIndex,
                          state: child.selected,
                        })
                      "
                      class="text-danger point"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6Zm3.6 5q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4Q8.65 4 6.325 6.325Q4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"
                        />
                      </svg>
                    </span>
                  </span>
                </span>
              </span>
            </div>

            <div class="d-flex justify-content-end align-items-center mb-1">
              <div class="text-16 text-grey">
                <span
                  @click="closeImgOrder"
                  style="position: relative"
                  class="text-danger mx-1 point"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 16 16"
                  >
                    <g fill="currentColor">
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </g></svg
                ></span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <EncountersOrdersLaboratory
            :labServiceOptions="labServiceOptions"
            @fetch_Data="handleProps"
            @toggle="handleToggle"
            @labObj="addLabData"
          />
        </div>

        <div>
          <EncountersOrdersImaging
            :imagingOption="imagingOption"
            @fetch_Imaging_data="handleImagingProps"
            @toggleImaging="handleImagingToggle"
            @imgObj="addImgData"
          />
        </div>

        <!-- <div>
          <EncountersOrdersPrescription />
        </div> -->

        <div
          v-if="labObvCount != 0 || imgObvCount != 0"
          style="height: 38px"
          class="w-100 mt-3 mr-5 text-16 d-flex justify-content-end"
        >
          <BaseButton @click="submitOrders" class="btn-primary mr-3">
            Order
          </BaseButton>
        </div>


              <div v-if="labitems != null" class="p-2">
        <p class="text-16 text-grey">Laboratory orders</p>
        <TableComponent
          :perPage="filter.size"
          :pages="pages"
          :items="labitems"
          :busy="busy"
          :paginate="false"
          :fields="labfields"
          @row-hovered="showToolTip"
          :currentPage="currentPage"
          @sortData="showToolTip"
          @page-changed="filter($event, currentFilter)"
        >
          <template #value.laboratory="{ data }">
            <div>
              {{ labPanelNames(data.item.value.lab_panel_orders) }}
            </div>
          </template>
          <template #value.imaging="{ data }">
            <pre class="d-none">
              {{ data.item }}
            </pre>
          </template>
        </TableComponent>
      </div>

      <div v-if="imgitems != null" class="p-2">
        <p class="text-16 text-grey">Imaging orders</p>
        <TableComponent
          :perPage="filter.size"
          :pages="pages"
          :items="imgitems"
          :busy="busy"
          :paginate="false"
          :fields="imgfields"
          @row-hovered="showToolTip"
          :currentPage="currentPage"
          @sortData="showToolTip"
          @page-changed="filter($event, currentFilter)"
        >
          <template #value.imaging="{ data }">
            <div>
              {{ imgObvNames(data.item.value.img_obv_orders) }}
            </div>
          </template>
        </TableComponent>
      </div>
      </div>

      <!-- ************************************************************ -->

      <div>
        <!-- <div class="p-5 text-center" v-if="emptyState">
          <div class="text-16 text-grey">
            No orders added yet, click the buttons at the top to place an order.
          </div>
          <div class="text-primary my-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="30"
              height="30"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <g fill="currentColor">
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"
                />
              </g>
            </svg>
          </div>
        </div> -->
      </div>


    </div>
  </div>
</template>

<script>
import TableCompFun from '~/mixins/TableCompFun'
import arrayBreakdown from '~/mixins/arrayBreakdown'
export default {
  mixins: [TableCompFun, arrayBreakdown],
  data() {
    return {
      click: true,
      labConsole: false,
      imgConsole: false,
      show: false,
      emptyState: true,
      items: [],
      labitems: [],
      imgitems: [],
      pages: 1,
      currentPage: 1,
      labObvCount: 0,
      imgObvCount: 0,
      arr: [],
      imgArr: [],
      labServiceOptions: [],
      imagingOption: [],
      labfields: [
        {
          key: 'created_at',
          label: 'Order date',
          sortable: true,
        },
        {
          key: 'value.laboratory',
          label: 'Laboratory orders',
          sortable: true,
          formatter: (value) => {
            if (value) {
              return value
            } else {
              return ''
            }
          },
        },
        {
          key: 'created_by',
          label: 'Ordered by',
          sortable: true,
          formatter: (value) => {
            return value.first_name + ' ' + value.last_name
          },
        },
      ],
      imgfields: [
        {
          key: 'created_at',
          label: 'Order date',
          sortable: true,
        },
        {
          key: 'value.imaging',
          label: 'Imaging orders',
          sortable: true,
          formatter: (value) => {
            if (value) {
              return value
            } else {
              return ''
            }
          },
        },
        {
          key: 'created_by',
          label: 'Ordered by',
          sortable: true,
          formatter: (value) => {
            return value.first_name + ' ' + value.last_name
          },
        },
      ],
      requestBody: {
        laboratory: {
          comments: '',
          lab_panels: [],
          stat: false,
          service_center: null,
          payment_scheme: null,
        },
        imaging: {
          comments: '',
          img_obv: [],
          stat: false,
          service_center: null,
          payment_scheme: null,
        },
        prescription: {
          prescription_lines: [],
          status: '',
          source: '',
        },
      },
      filter: {
        size: 10,
      },
    }
  },
  props: {
    consultationData: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    this.getOrders()
  },
  watch: {
    labObvCount() {
      if (this.labObvCount === 0) {
        this.requestBody.laboratory.comments = ''
        this.requestBody.laboratory.stat = false
        this.requestBody.laboratory.service_center = null
        this.requestBody.laboratory.payment_scheme = null
      }
    },
    imgObvCount() {
      if (this.imgObvCount === 0) {
        this.requestBody.imaging.comments = ''
        this.requestBody.imaging.stat = false
        this.requestBody.imaging.service_center = null
        this.requestBody.imaging.payment_scheme = null
      }
    },
    labServiceOptions() {
      if (this.imagingOption.length < 1 || this.items.length < 1) {
        this.emptyState = false
      }
    },
    imagingOption() {
      if (this.items.length < 1 || this.labServiceOptions.length < 1) {
        this.emptyState = false
      }
    },
    items() {
      if (this.imagingOption.length < 1 || this.labServiceOptions.length < 1) {
        this.emptyState = false
      }
    },
  },
  methods: {
    async getOrders(page = 1, e = { size: 10 }) {
      this.filter = e
      this.currentPage = page
      try {
        let response = await this.$api.encounter.getOrders(
          { size: 1000 },
          this.consultationData.id
        )
        this.labitems = response.result.laboratory
        this.imgitems = response.result.imaging
        this.busy = false
        // this.pages = response.total_pages
        // this.totalRecords = response.total_count
        // this.currentPage = response.current_page
      } catch {
      } finally {
        this.busy = false
      }
    },
    labPanelNames(e) {
      console.log(e)
      let arr = e
      let newArr = []
      for (let x = 0; x < arr.length; x++) {
        newArr.push(arr[x].panel.name)
      }
      let str = newArr.join(', ')
      return str
    },
    imgObvNames(e) {
      let arr = e
      let newArr = []
      for (let x = 0; x < arr.length; x++) {
        newArr.push(arr[x].img_obv.name)
      }
      let str = newArr.join(', ')
      return str
    },
    handleProps(list) {
      this.labServiceOptions = list
    },
    handleImagingProps(list) {
      this.imagingOption = list
    },
    handleToggle(obj) {
      const { child, parent, state } = obj
      this.labServiceOptions[parent].lab_panels[child].selected = state
      if (state == true) {
        this.labObvCount++
      }
    },
    handleImagingToggle(obj) {
      const { child, parent, state } = obj
      this.imagingOption[parent].img_observations[child].selected = state
      if (state == true) {
        this.imgObvCount++
      }
    },
    removeLabOrder(obj) {
      const { parent, child, state } = obj
      if ((this.labServiceOptions[parent].lab_panels[child].selected = true)) {
        this.labServiceOptions[parent].lab_panels[child].selected = false
        this.labObvCount--
      }
    },
    removeImagingOrder(obj) {
      const { parent, child, state } = obj
      if (
        (this.imagingOption[parent].img_observations[child].selected = true)
      ) {
        this.imagingOption[parent].img_observations[child].selected = false
        this.imgObvCount--
      }
    },
    closeLabOrder() {
      this.labObvCount = 0
      this.labServiceOptions = []
    },
    closeImgOrder() {
      this.imgObvCount = 0
      this.imagingOption = []
    },
    imgSwitch() {
      this.imgConsole = !this.imgConsole
      this.imagingOption = []
    },

    addLabData(e) {
      if (e.service_center) {
        this.requestBody.laboratory.service_center = e.service_center
      } else {
        this.$toast({
          type: 'info',
          text: `Please choose a service center`,
        })
      }

      this.requestBody.laboratory.comments = e.comments
      this.requestBody.laboratory.stat = e.stat
    },
    showToolTip(e) {
      // console.log(e)
      this.show = !this.show
    },
    addImgData(e) {
      if (e.service_center) {
        this.requestBody.imaging.service_center = e.service_center
      } else {
        this.$toast({
          type: 'info',
          text: `Please choose a service center`,
        })
      }

      this.requestBody.imaging.comments = e.comments
      this.requestBody.imaging.stat = e.stat
    },

    orderLab() {
      this.$bvModal.show('orderLab')
    },
    orderImaging() {
      this.$bvModal.show('orderImaging')
    },
    async submitOrders() {
      let arr = []
      this.labServiceOptions.forEach((el) => {
        el.lab_panels.filter((newEl) => {
          if (newEl.selected == true) {
            arr.push(newEl.id)
          }
        })
      })

      let imgArr = []
      this.imagingOption.forEach((el) => {
        el.img_observations.filter((newEl) => {
          if (newEl.selected == true) {
            imgArr.push(newEl.id)
          }
        })
      })
      if (arr.length > 0 || imgArr.length > 0) {
        if (arr.length > 0) {
          this.requestBody.laboratory.lab_panels = arr
        } else {
          this.requestBody.laboratory = null
        }

        if (imgArr.length > 0) {
          this.requestBody.imaging.img_obv = imgArr
        } else {
          this.requestBody.imaging = null
        }

        this.requestBody.prescription = null

        try {
          let submitBody = this.requestBody
          let response = await this.$api.encounter.orderOnEncounter(
            submitBody,
            this.consultationData.id
          )

          this.$toast({
            type: 'success',
            text: `Order created successfully`,
          })
          this.imgConsole = false
          this.labConsole = false
          this.getOrders()
          this.closeLabOrder()
          this.closeImgOrder()
        } catch (error) {
          console.log(error)
        }
      } else {
        this.$toast({
          type: 'warning',
          text: `Please select an observation to place order`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-secondary {
  color: $COLOR_TWO;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

/* .slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} */

.slide-fade-enter,
.slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>