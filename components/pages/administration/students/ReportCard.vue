<template>
  <ComingSoon />
  <!-- <div>
        <div class="d-flex d-flex justify-content-between p-3">
            <div class="dropdown">
                <button class="btn btn-light text-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
              View by 100 Records
            </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">25 records</a>
                    <a class="dropdown-item" href="#">50 records</a>
                    <a class="dropdown-item" href="#">100 records</a>
                    <a class="dropdown-item" href="#">Infinity bbbrecords</a>
                </div>
            </div>
            <div>
                <b-btn class="btn-light"> filters</b-btn>
                <b-btn class="btn-primary"> Add attachment</b-btn>
            </div>
        </div>
        <div>
            <Table :items="report_card" :showPagination="false" :allow-redirect="false" />
        </div>
    </div> -->
</template>

<script>
import table from "~/components/table.vue";
export default {
  components: { table },
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      family_list: [],
      report_card: [
        {
          academic_year: "john",
          type: "Medication",
          academic_period: "john",
          class: "john",
          date_uploaded: "2/12/2020",
        },
        {
          academic_year: "john",
          type: "Medication",
          academic_period: "john",
          class: "john",
          date_uploaded: "2/12/2020",
        },
        {
          academic_year: "john",
          type: "Medication",
          academic_period: "john",
          class: "john",
          date_uploaded: "2/12/2020",
        },
      ],
    };
  },
  mounted() {
    if (this.details.families.id) {
      this.family_list = this.details.families.family_members.map((member) => ({
        first_name: member.first_name,
        last_name: member.last_name,

        role: member.role,
        phone_number: member.phone,

        email: member.email,
        primary_contact: member.primary_contact,
      }));
    }
    console.log("family list mounted", delete this.family_list.image);
    console.log(this.details.families.family_members);
  },
  methods: {
    show() {
      console.log("prop", this.details);
    },
  },
};
</script>

<style></style>
