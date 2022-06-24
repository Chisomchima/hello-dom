<template>
  <div>
    <div>
      <table-component :busy="busy" :fields="fields" :items="itemsToShow">
        <template #status="{ data }">
          <div class="text-center">
            <span :class="data.item.color" class="badge text-white px-2 py-1">{{
              data.item.status
            }}</span>
          </div>
        </template>
      </table-component>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busy: false,
      itemsToShow: [],
      fields: [
        { key: "encounter_id", label: "Encounter ID", sortable: true },

        { key: "date", label: "Date", sortable: true },
        { key: "department", label: "Department", sortable: true },
        { key: "clinic", label: "Clinic", sortable: true },

        { key: "encounter_type", label: "Encounter Type", sortable: true },
        { key: "provider", label: "Provider", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "action", label: "", sortable: false },
      ],
    };
  },
  props: {
    consultationData: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    // this.getPatientEncounters();
  },
  methods: {
    async getPatientEncounters() {
      try {
        this.busy = true;
        let response = await this.$axios.$get(
          `encounters/get_patient_encounter/${this.consultationData.patient.id}`
        );

        let temp = response;
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
            badgeColor = "badge-warning";
          } else if (
            iterator.status === "Nurse seen." ||
            iterator.status === "Nurse seen" ||
            iterator.status === "NS"
          ) {
            badgeColor = "badge-info";
          } else {
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
            date: b,
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

<style>
</style>