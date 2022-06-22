<template>
  <div class="bg-white p-4">
    <div class="mb-0 bg-white d-flex justify-content-between rounded-top">
      <div>
        <span class="dropdown">
          <button
            id="dropdownMenuButton"
            class="btn bg-light dropdown-toggle"
            type="button "
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            View by: 100 Records
          </button>
          <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" @click="changePageSize(5)">5 records</a>
            <a class="dropdown-item" href="#" @click="changePageSize(10)">10 records</a>
            <a class="dropdown-item" href="#" @click="changePageSize(15)">15 records</a>
          </div>
        </span>
      </div>
      <div class="d-flex justify-content-start">
        <!-- <div class="dropdown">
          <button
            id="dropdownMenuButton"
            class="btn btn-light no-arrow dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            Filters<span class="iconify" data-icon="codicon:list-filter"></span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Status</a>
          </div>
        </div> -->
      </div>
    </div>
    <div class="mt-5 border-top">
      <Table
        :items="newFamily"
        :fields="fields"
        :allow-redirect="false"
        :is-busy="isBusy"
        :pages="pages"
        per-page="10"
        @page-changed="changePage"
      ></Table>
      <div class="d-flex justify-content-end my-3">
        <!-- <div _ngcontent-bjf-c284="" class="my-1 showing-nav mr-3 paginate">
          <span _ngcontent-bjf-c284="" class="mr-4">
            Page {{ pagination.page }} of {{ total_pages }}</span
          >
          <span @click="previousPage">
            <span class="iconify" data-icon="akar-icons:chevron-left"></span>
          </span>
          <span @click="nextPage">
            <span class="iconify" data-icon="akar-icons:chevron-right"> s</span>
          </span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newFamily: {},
      pages: 1,
      pagination: {
        page: 1,
        page_size: 5,
      },
      total_pages: 0,

      isBusy: true,
      fields: [
        { key: "first_name", sortable: true },
        { key: "last_name", sortable: true },
        { key: "grade_level", sortable: true },
        { key: "class", sortable: true },
        { key: "email", sortable: true },
        { key: "status", sortable: false },
      ],
    };
  },
  computed: {
    familyInfo() {
      return this.details.data;
    },
  },

  watch: {
    page: {
      handler() {
        getFamily_students();
      },
    },
  },
  activated() {
    this.getFamily_students();
  },
  mounted() {
    this.getFamily_students();
  },
  methods: {
    previousPage() {
      if (this.pagination.page > 1) {
        this.pagination.page -= 1;
      }
    },
    nextPage() {
      if (this.pagination.page < this.total_pages) {
        this.pagination.page += 1;
      }
    },
    changePageSize(e) {
      this.pagination.page_size = e;
    },
    addFamilyMember() {},
    async getFamily_students(page = 1) {
      const slate_family_id = this.$route.params.family;

      try {
        const response = await this.$axios.get(
          `/slate-admin/family/${slate_family_id}/students/?page=${page}&page_size=${this.pagination.page_size}`
        );
        const data = response.data.data;
        this.newFamily = data.family_students.results;
        this.pages = data.family_students.total_pages;
        console.log("aye", this.newFamily);
        console.log("fsmily students", data.family_students);
        this.isBusy = false;
      } catch (error) {}
    },
    changePage(e) {
      this.isBusy = true;
      this.getFamily_students(e);
    },
  },
};
</script>

<style></style>
