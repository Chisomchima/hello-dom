<template>
  <div>
    <!-- <BackwardNavigation /> -->
    <div class="row">
      <div class="col text-right my-2">
        <BaseButton v-role="'admin'" @click="addToCalender()"
          >Add to Calender</BaseButton
        >
      </div>
    </div>
    <transition-group name="fade">
      <div
        v-for="(value, index) in events"
        :key="index + value"
        class="card my-3"
      >
        <div class="card-header border-bottom py-4">
          <div class="align-items-center d-flex justify-content-between">
            <div class="card-title fs-21">Event Details</div>
            <button
              v-if="index > 0"
              class="btn btn-borderless-danger btn-primary py-2 px-3"
              @click="removeEvents(index)"
            >
              Remove Event
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-12">
                  <div class="mb-2">
                    <ValidationProviderWrapper
                      name="Title"
                      :rules="['required']"
                      label="Title"
                    >
                      <BaseInput v-model="value.name"></BaseInput>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-3">
                  <div class="mb-2">
                    <ValidationProviderWrapper
                      name="Start Date & Time"
                      :rules="['required']"
                      label="Start Data & Time"
                    >
                      <v-date-picker
                        v-model="value.start_date_time"
                        mode="dateTime"
                        :model-config="modelConfig"
                        class=""
                      >
                        <template #default="{ inputValue, togglePopover }">
                          <div class="d-flex">
                            <button
                              class="
                                btn btn-borderless-primary btn-primary
                                rounded-0
                              "
                              @click="togglePopover()"
                            >
                              <b-icon
                                icon="calendar2-event-fill"
                                aria-label="Help"
                              ></b-icon>
                            </button>
                            <input
                              :value="inputValue"
                              class="form-control ng-valid ng-dirty ng-touched"
                              readonly
                            />
                          </div>
                        </template>
                      </v-date-picker>

                      <!-- <BaseInput v-model="value.start_date_time"></BaseInput> -->
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-3">
                  <div class="mb-2">
                    <ValidationProviderWrapper
                      name="End Date & Time"
                      :rules="['required']"
                      label="End Data & Time"
                    >
                      <v-date-picker
                        v-model="value.end_date_time"
                        mode="dateTime"
                        popover-align="center"
                        popover-placement="bottom"
                        :model-config="modelConfig"
                        class=""
                      >
                        <template #default="{ inputValue, togglePopover }">
                          <div class="d-flex">
                            <button
                              class="
                                btn btn-borderless-primary btn-primary
                                rounded-0
                              "
                              @click="togglePopover()"
                            >
                              <b-icon
                                icon="calendar2-event-fill"
                                aria-label="Help"
                              ></b-icon>
                            </button>
                            <input
                              :value="inputValue"
                              class="form-control ng-valid ng-dirty ng-touched"
                              readonly
                            />
                          </div>
                        </template>
                      </v-date-picker>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-3">
                  <div class="mb-2">
                    <ValidationProviderWrapper
                      name="Event Type"
                      :rules="['required']"
                      label="Event Type"
                    >
                      <BaseInput v-model="value.type"></BaseInput>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-3">
                  <div class="mb-2">
                    <ValidationProviderWrapper
                      name="Location"
                      :rules="['required']"
                      label="Location"
                    >
                      <BaseInput v-model="value.location"></BaseInput>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-2">
                    <label class="form-control-label">Short Description</label>
                    <textarea
                      v-model="value.short_description"
                      class="form-control"
                      placeholder="Enter Short Description"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>

    <div class="text-right mb-4 mt-3">
      <button
        class="btn btn-borderless-primary btn-primary py-2 px-3"
        @click="addEvents"
      >
        Add Event
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD HH:MM', // Uses 'iso' if missing
      },

      events: [
        {
          name: '',
          start_date_time_time: '',
          end_date_time: '',
          type: '',
          location: '',
          short_description: '',
        },
      ],
    }
  },
  methods: {
    addEvents() {
      this.events.push({
        name: '',
        start_date_time: '',
        end_date_time: '',
        type: '',
        location: '',
        short_description: '',
      })
    },
    removeEvents(index) {
      this.events.splice(index, 1)
    },
    async addToCalender() {
      try {
        await this.$axios.$put(
          `./slate-admin/calendar/year/${this.$route.params.year}/`,
          { events: this.events }
        )
        this.$router.push({
          name: 'sms-id-administration-configuration-calender',
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
