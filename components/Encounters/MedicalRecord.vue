<template>
  <div>

    <div>
      <UtilsFilterComponent disable-pagination :disableSearch="true" :disable-visualization="true"
        search-placeholder="Search">
        <template #beforeActions>
          <div>
            <button v-b-toggle.sidebar-backdrop3 class="btn btn-sm btn-outline-secondary">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M96 197.333h320v32H96zm72 101.334h176v32H168zM216 400h80v32h-80zM48 96h416v32H48z" />
                </svg>
              </span>
            </button>
            <b-sidebar id="sidebar-backdrop3" title="Sidebar with backdrop" :backdrop-variant="'dark'" backdrop shadow
              right>
              <div class="p-4">
                <div class="">

                  <div class="col-md-12">
                    <span class="text-12 text-grey">Search</span>
                    <input type="text" class="form-control" placeholder="Search by name" v-model="filter.name" />
                  </div>
                </div>
                <!-- <div class="">
                    
                    <div class="col-md-12">
                      <span class="text-12 text-grey">Date from:</span>
                      <input type="date" class="form-control" :max="maxDate" v-model="filter.dateFrom" />
                    </div>
                    <div class="col-md-12">
                      <span class="text-12 text-grey">Date to:</span>
                      <input type="date" class="form-control" :min="minDate" v-model="filter.dateTo" />
                    </div>
                  </div> -->

                <!-- <div class="col-md-12">
                    <span class="text-12 text-grey">Service centers</span>
                    <VSelect style="font-size: 13px" label="name" class="" v-model="filter.service_center"
                      :placeholder="'Service centers'" :reduce="(option) => option.id" multiple taggable
                      :options="filterSerice">
                    </VSelect>
                  </div> -->
                <!-- <div class="col-md-12">
                    <span class="text-12 text-grey">Modality</span>
                    <VSelect style="font-size: 13px" label="name" class="" v-model="filter.modality"
                      :placeholder="'Lab unit'" :reduce="(option) => option.id" multiple taggable :options="filterModality">
                    </VSelect>
                  </div> -->
              </div>
            </b-sidebar>
          </div>
        </template>
        <template>
          <table-component @row-clicked="openRecord" :pages="pages" :busy="busy" :fields="fields" :items="itemsToShow"
            :perpage="perPage">
            <template #status="{ data }">
              <div class="text-center">
                <span :class="data.item.color" class="badge text-12 text-white px-2 py-1">{{
                  data.item.status
                }}</span>
              </div>
            </template>
          </table-component>
        </template>
      </UtilsFilterComponent>

    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
export default {
  data() {
    return {
      busy: false,
      itemsToShow: [],
      pages: 1,
      page: 1,
      perPage: 12,
      filter: {
        name: ''
      },
      fields: [
        { key: "date", label: "Date", sortable: true },
        { key: "encounter_id", label: "Encounter ID", sortable: true },
        { key: "department", label: "Department", sortable: true },
        { key: "clinic", label: "Clinic", sortable: true },

        { key: "encounter_type", label: "Encounter Type", sortable: true },
        { key: "provider", label: "Provider", sortable: true },
        {
          key: "status", formatter: (val) => {

            if (val === "DS") {
              return val = 'Signed'
            }
          }, label: "Status", sortable: true
        },
        { key: "action", label: "", sortable: false },
      ],
    };
  },
  watch: {
    "filter.name": {
      handler: debounce(function () {
        this.getPatientEncounters()
      }, 1000)
    }
    },
    props: {
      consultationData: {
        type: Object,
        default: () => { },
      },
    },
    mounted() {
      this.getPatientEncounters();
    },
    methods: {
      openRecord(e) {
        let link = window.location.protocol + "//" + window.location.host + `/dashboard/opd/${e.id}`
        window.open(link, "_blank",);
      },
      async getPatientEncounters(page = 1) {
        try {
          this.busy = true;
          let response = await this.$axios.$get(
            `encounters/get_patient_encounter/${this.consultationData.patient.id}`
          );

          console.log(response)

          let temp = response.results;
          this.pages = response.total_pages
          this.itemsToShow = [];

          for (const iterator of temp) {
            let x = iterator.patient;

            x = x.firstname + " " + x.lastname;

            let time = iterator.encounter_datetime;
            let y = new Date(time).toLocaleDateString();
            let z = new Date(time).toTimeString().substring(0, 5);
            let b = y + ", " + z;
            let dept = iterator.clinic.Department
              ? iterator.clinic.Department.name
              : "";

            let badgeColor = "";
            if (iterator.status === "New") {
              badgeColor = "bg-warning";
            } else if (
              iterator.status === "Nurse seen." ||
              iterator.status === "Nurse seen" ||
              iterator.status === "NS"
            ) {
              badgeColor = "bg-info";
            }
            else if (iterator.status === 'DS') {
              badgeColor = "bg-danger"
            }
            else {
              badgeColor = "unknown";
            }

            this.itemsToShow.push({
              name: x,
              encounter_type: iterator.encounter_type,
              encounter_id: iterator.encounter_id,
              provider: iterator.provider.first_name
                ? iterator.provider.first_name + " " + iterator.provider.last_name
                : "",
              clinic: iterator.clinic ? iterator.clinic.name : " ",
              date: iterator.encounter_datetime,
              status: iterator.status,
              department: dept,
              id: iterator.id,
              color: badgeColor,
            });
          }
        } catch {
        } finally {
          this.busy = false;
        }
      },
    },
  };
</script>

<style></style>