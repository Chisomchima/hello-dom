<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Timetable</div>
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <BaseButton
            class="py-2 px-3"
            @click="
              $bvModal.show('period-modal'),
                ((period.edit = false),
                (period.name = ''),
                (period.id = ''),
                (period.start_time = ''),
                (period.end_time = ''))
            "
            ><b-icon icon="calendar-plus"></b-icon> Add Period</BaseButton
          >
        </div>
      </div>
    </div>

    <UtilsFilterComponent @search-input="searchPeriod = $event">
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :items="data"
          :fields="fields"
          :filter="searchPeriod"
          :pages="1"
          @row-clicked="onRowClicked"
        />
        <div v-else class="row">
          <div
            v-for="(value, index) in data"
            :key="index"
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
          >
            <UtilsGridViewCard
              :data="value"
              :display-key="['name', 'name', 'start_time', 'end_time']"
            ></UtilsGridViewCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>

    <b-modal
      id="period-modal"
      ref="modal"
      :title="period.edit ? 'Edit TimeTable Period' : 'Add TimeTable Period'"
      centered
      ok-only
      ok-title="Save"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <ValidationProviderWrapper
            :name="'Period Name'"
            :rules="['required']"
            :label="'Period Name'"
          >
            <input
              v-model="period.name"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Period Name"
              type="text"
            />
          </ValidationProviderWrapper>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <ValidationProviderWrapper
                :name="'Period Start Time'"
                :rules="['required']"
                :label="'Period Start Time'"
              >
                <div class="row">
                  <div class="col">
                    <b-time v-model="period.start_time" locale="en"></b-time>
                    <!-- <v-date-picker v-model="period.start_time" mode="time" /> -->
                  </div>
                </div>
              </ValidationProviderWrapper>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <ValidationProviderWrapper
                :name="'Period End Time'"
                :rules="['required']"
                :label="'Period End Time'"
              >
                <div class="row">
                  <div class="col">
                    <b-time v-model="period.end_time" locale="en"></b-time>
                    <!-- <v-date-picker v-model="period.end_time" :model-config="modelConfig" mode="time" /> -->
                  </div>
                </div>
              </ValidationProviderWrapper>
            </div>
          </div>
        </div>
      </form>
      <template #modal-footer="{ cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->

        <div class="d-flex w-100 justify-content-between px-5">
          <div>
            <b-button
              size="sm"
              variant="light"
              class="px-5 text-secondary mr-2"
              @click="cancel()"
            >
              Cancel
            </b-button>
          </div>
          <div>
            <b-button size="sm" class="px-5 btn-primary" @click="handleOk">
              Save
            </b-button>
          </div>
        </div>
        <!-- Button with custom close trigger value -->
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { school } from "@/types/school";

export default Vue.extend({
  async asyncData({ $axios, store, route }) {
    const school = store.getters["school/getSchoolByCode"](route.params.id);
    const { data } = await $axios.$get(
      `/slate-admin/school/${school.id}/timetable/periods/?page=1&paginate=false/`
    );
    return {
      school,
      data,
    };
  },
  data() {
    const school = {} as school;
    return {
      period: {
        id: null,
        edit: false,
        name: "",
        start_time: "",
        end_time: "",
      },
      fields: [
        // { key: 'check', sortable: false },
        { key: "name", sortable: false },
        { key: "start_time", label: "Start Time", sortable: true },
        { key: "end_time", label: "End Time", sortable: true },
        // { key: 'active', label: 'status', sortable: true }
      ],
      school,
      searchPeriod: "",
    };
  },
  methods: {
    handleOk(event: any) {
      event.preventDefault();
      // this$bvModal.show('period-modal')
      this.handleSubmit();
    },
    async handleSubmit() {
      try {
        if (!this.period.edit) {
          await this.$axios.$post(
            `/slate-admin/school/${this.school.id}/timetable/periods/`,
            this.period
          );
        } else {
          await this.$axios.$put(
            `/slate-admin/timetable/period/${this.period.id}/`,
            this.period
          );
        }

        await this.$nuxt.refresh();
        this.$bvModal.hide("period-modal");
      } catch (error) {
        console.log(error);
      }
    },

    onRowClicked(event: any) {
      this.$bvModal.show("period-modal");
      this.period.edit = true;
      this.period.id = event.id;
      this.period.name = event.name;
      this.period.start_time = event.start_time;
      this.period.end_time = event.end_time;
    },
  },
});
</script>

<style lang="scss" scoped></style>
