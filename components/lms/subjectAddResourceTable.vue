<template>
  <div>
    <UtilsFilterComponent disableVisualization disablePagination @search-input="filter">
      <template #default="{ visualization }">
        <Table
          v-if="visualization === 'list'"
          :items="filteredData"
          :fields="fields"
          :pages="pages"
          :per-page="page_size"
          @page-changed="refresh"
          @single-row="handleSelect"
        >
          <template #grades="{ data }">
            <div class="text-capitalize">
              {{
                data.item.grades
                  ? data.item.grades
                      .replaceAll("'", "")
                      .replaceAll("[", "")
                      .replaceAll("]", "")
                  : ""
              }}
            </div>
          </template>
          <template #subjects="{ data }">
            <div class="text-capitalize">
              {{
                data.item.subjects
                  ? data.item.subjects
                      .replaceAll("'", "")
                      .replaceAll("[", "")
                      .replaceAll("]", "")
                  : ""
              }}
            </div>
          </template>
          <template #format="{ data }">
            <div class="text-uppercase">{{ data.item.format }}</div>
          </template>
          <template #author="{ data }">
            <div class="text-capitalize">
              {{
                data.item.author
                  ? data.item.author
                      .replaceAll("'", "")
                      .replaceAll("[", "")
                      .replaceAll("]", "")
                  : ""
              }}
            </div>
          </template>
        </Table>
      </template>
    </UtilsFilterComponent>
    <div class="d-flex justify-content-end">
      <BaseButton @click="handleAdd"> Add Resources </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedBooks: [],
      search: "",
      currentPage: "",
      page: 1,
      totalRows: 0,
      pages: "",
      data: [],
      fullData: [],
      page_size: 8,
      fields: [
        { key: "check", label: "", sortable: false },
        { key: "name", label: "Book Title", sortable: false },
        { key: "author", label: "Author(s)", sortable: true },
        { key: "format", sortable: true },
        // { key: 'subjects', sortable: true },
        { key: "grades", sortable: true },
      ],
    };
  },
  async fetch() {
    const school = this.$store.getters["school/getSchoolByCode"](this.$route.params.id);
    console.log("store result", school);
    const data = await this.$axios.$get(
      `/schools/v2/school/${school.id}/library/?page=${this.page}&page_size=${this.page_size}&name=${this.search}&author=a`
    );
    this.pages = data.pages;
    this.fullData = data.data;
    this.data = data.data;
  },
  computed: {
    filteredData() {
      if (this.search) {
        return this.data.filter((item) => {
          return this.search
            .toLowerCase()
            .split("")
            .every(
              (v) =>
                item.name.toLowerCase().includes(v) ||
                item.author.toLowerCase().includes(v) ||
                item.subjects.toLowerCase().includes(v)
            );
        });
      } else {
        return this.data;
      }
    },
    // school() {
    //   return this.$store.state.administration.school.id;
    //   return;
    // },
    schoolId() {
      return this.$store.state.administration.school.id;
    },
  },
  watch: {
    // @row-clicked="onRowClicked"

    pages() {
      this.totalRows = this.page_size * this.pages;
    },
  },
  mounted() {
    this.totalRows = this.page_size * this.pages;
  },
  methods: {
    handleSelect(e) {
      this.selectedBooks = e;
      console.log("payloade", e);
    },
    async handleAdd() {
      try {
        await this.$axios.post(
          `/schools/v3/class_subject/${this.$route.params.subject}/resources/`,
          //   `/schools/v2/school/${this.schoolId}/library/`,
          { data: this.selectedBooks }
        );
        this.$emit("refresh");
      } catch (e) {
        console.log(e);
      }
    },
    refresh(page) {
      this.page = page;
      this.$fetch();
    },
    filter(e) {
      this.search = e;
      this.$fetch();
    },
    onRowClicked(e) {
      this.$router.push({
        name: "sms-id-administration-configuration-library-book_id",
        params: { book_id: e.id, id: this.$route.params.id },
        query: { _name: `${e.name}` },
      });
    },
  },
};
</script>

<style scoped>
.new-libray-container-mine {
  cursor: pointer;
  width: 9.4rem;
  min-height: 15rem;
  max-height: 20rem;
  box-shadow: 0px 15px 50px rgb(82 20 24 / 5%);
  /*  border: 3px solid #8ebfe4; */
  background: center no-repeat #6b9abf;
}
</style>
