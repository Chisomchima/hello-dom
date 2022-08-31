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
          <h4 class="text-grey text-18 mb-0">Orders</h4>

          <div>
            <div style="cursor: pointer" id="button-20">
              <div class="text-primary">
                <div class="pr-3">
                  <b-dropdown
                    dropleft
                    no-caret
                    id="dropdown-1"
                    class="rounded-0"
                  >
                    <template #button-content>
                      <div class="col-md-2 text-14">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          class="bi bi-plus-square-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"
                          />
                        </svg>
                      </div>
                    </template>

                    <b-dropdown-item
                      v-for="(item, index) in options"
                      :key="index"
                    >
                      <div
                        class="text-capitalize"
                        @click="$emit('dropdown', item)"
                      >
                        {{ item }}
                      </div>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>

              <b-tooltip target="button-20" placement="bottom">
                Create orders
              </b-tooltip>
            </div>
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
        <div v-if="!click" class="mr-3 mb-3">
          <div class="row">
            <div class="col-lg-5 col-md-6 col-sm-6 ml-3">
              <small class="text-grey text-14">Options</small>
              <v-select
                class="text-14 text-capitalize"
                style="height: 35px"
                :options="options"
                v-model="type"
              ></v-select>
            </div>
          </div>
        </div>

        <div v-if="click && emptyState" class="p-5 text-center">
          <div class="text-16 text-grey">
            No Orders created yet, click the
            <span
              style="position: relative; top: -3px"
              class="text-primary mx-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-square-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"
                /></svg
            ></span>
            icon to make an order
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
        </div>

        <transition name="slide-fade">
          <div v-if="imgFlag">
            <EncountersOrdersImaging />
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="labFlag">
            <EncountersOrdersLaboratory />
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="prescriptionFlag">
            <EncountersOrdersPrescription />
          </div>
        </transition>

        <div
          v-if="arr.length > 0"
          style="height: 38px"
          class="w-100 mt-3 mr-5 text-16 d-flex justify-content-end"
        >
          <BaseButton class="btn-primary mr-4">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: false,
      imgFlag: false,
      labFlag: false,
      emptyState: false,
      click: true,
      prescriptionFlag: false,
      options: ['Imaging orders', 'Lab orders', 'Prescription'],
      type: null,
      arr: [],
    }
  },
  watch: {
    type() {
      if (this.type !== null) {
        if (this.type === 'Imaging orders') {
          this.imgFlag = true
          this.click = !this.click
          this.type = null
        } else if (this.type === 'Lab orders') {
          this.labFlag = true
          this.click = !this.click
          this.type = null
        } else if (this.type === 'Prescription') {
          this.prescriptionFlag = true
          this.click = !this.click
          this.type = null
        }
      }
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