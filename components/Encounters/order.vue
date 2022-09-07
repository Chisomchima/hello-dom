<template>
  <div>
    <div>
      <div v-if="false">
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
        </b-row>
      </div>
      <div v-else>
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="text-grey text-18 mb-0"></h4>

          <div>
            <div style="cursor: pointer" id="button-20"></div>
            <div v-if="!click" id="button-22">
              <div class="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-dash-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                  />
                  <path
                    d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                  />
                </svg>
              </div>

              <b-tooltip target="button-22" placement="bottom"
                >Close
              </b-tooltip>
            </div>
          </div>
        </div>

        <br />

        <div class="text-center">
          <div
            class="rounded p-2 mb-3"
            style="min-height: 7rem; border: 1px solid #212529"
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
          </div>

          <!-- ********************************** -->

          <div
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
          style="height: 38px"
          class="w-100 mt-3 mr-5 text-16 d-flex justify-content-end"
        >
          <BaseButton @click="submitOrders" class="btn-primary mr-4">
            Order
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      click: true,
      arr: [],
      imgArr: [],
      labServiceOptions: [],
      imagingOption: [],
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
        prescriptions: {
          prescription_lines: [],
          status: '',
          source: '',
        },
      },
    }
  },
  props: {
    consultationData: {
      type: Object,
      required: false,
    },
  },
  methods: {
    handleProps(list) {
      this.labServiceOptions = list
    },
    handleImagingProps(list) {
      this.imagingOption = list
    },
    handleToggle(obj) {
      const { child, parent, state } = obj
      this.labServiceOptions[parent].lab_panels[child].selected = state
    },
    handleImagingToggle(obj) {
      const { child, parent, state } = obj
      this.imagingOption[parent].img_observations[child].selected = state
    },
    removeLabOrder(obj) {
      const { parent, child, state } = obj
      if ((this.labServiceOptions[parent].lab_panels[child].selected = true)) {
        this.labServiceOptions[parent].lab_panels[child].selected = false
      }
    },
    removeImagingOrder(obj) {
      const { parent, child, state } = obj
      if (
        (this.imagingOption[parent].img_observations[child].selected = true)
      ) {
        this.imagingOption[parent].img_observations[child].selected = false
      }
    },

    addLabData(e) {
      this.requestBody.laboratory.service_center = e.service_center
      this.requestBody.laboratory.comments = e.comments
      this.requestBody.laboratory.stat = e.stat
    },
    addImgData(e) {
      this.requestBody.imaging.service_center = e.service_center
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
          if (newEl.selected === true) {
            arr.push(newEl.id)
          }
        })
      })
      this.requestBody.laboratory.lab_panels = arr
      console.log('laboratory', this.requestBody.laboratory)
      let imgArr = []
      this.imagingOption.forEach((el) => {
        el.img_observations.filter((newEl) => {
          if (newEl.selected === true) {
            imgArr.push(newEl.id)
          }
        })
      })

      this.requestBody.imaging.img_obv = imgArr
      console.log('imaging', this.requestBody.imaging)

      let response = await this.$api.encounter.orderOnEncounter(this.requestBody, this.consultationData.id)
      console.log(response) 
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-secondary {
  color: $COLOR_TWO;
  background-color: $COLOR_FOUR;
  border-color: $COLOR_FOUR;
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