<template>
  <div class="p-md-3">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Gradebook</div>
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2 d-flex justify-content-between">
          <button class="btn exportbtn p-2 mr-3">Export</button>
          <button class="btn filterbtn">
            <span> Filter</span>
            <span class="iconify" data-icon="clarity:filter-2-line"></span>
          </button>
        </div>
      </div>
    </div>

    <div class="card class-wrapper">
      <div
        class="
          d-flex
          align-items-center
          justify-content-between
          flex-wrap
          px-md-5 px-2
          py-4
        "
      >
        <div class="filter-wrapper mr-2">
          <div class="search-input student-filter-input mb-2">
            <span
              class="iconify icon"
              data-inline="false"
              data-icon="carbon:search"
            ></span>
            <input
              type="text"
              class="form-control rounded-pill w-100"
              placeholder="Search"
            />
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="font-family_brown fs-14 text-black">Sort by:</div>
          <div class="student-filter-input ml-2">
            <select class="form-control">
              <option value="asc" selected>Newest to Oldest</option>
              <option value="dsc">Oldest to Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mt-3 mb-5 px-md-5 px-3">
        <div class="fs-24 mb-3 mr-2">Subjects</div>

        <div v-if="Object.entries(items).length < 1 || $fetchState.pending">
          <UtilsEmptyState text="No Gradebook" />
        </div>

        <Accordion
          v-for="(content, index) in Object.entries(items)"
          :key="index"
        >
          <AccordionTab :header="content[0]" class="my-3">
            <PagesParentGradeBookTable :items="content[1]" :fields="fields" />
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
export default {
  components: {
    Accordion,
    AccordionTab,
  },
  layout: 'parentdashboard',

  data() {
    return {
      fields: [
        // {
        //   key: 'Assessments',
        //   sortable: true,
        // },
        {
          key: 'name',
          label: 'Assessment',
          sortable: true,
        },
        {
          key: 'type',
          sortable: true,
        },
        {
          key: 'period_name',
          label: 'Academic Period',
          sortable: true,
        },
        // {
        //   key: 'class_subject.name',
        //   label: 'Subject',
        //   sortable: true,
        // },
        // {
        //   key: 'Score',
        //   sortable: false,
        // },
        {
          key: 'percentage_total',
          sortable: false,
        },
        {
          key: 'max_obtainable_score',
          label: 'Obtainable score',
          sortable: false,
        },

        // {
        //   key: 'Teacher_Comment',
        //   label: "Teacher's Comment",
        //   sortable: false,
        // },
      ],
      items: [],
      subjects: [],
    }
  },

  async fetch() {
    const { data } = await this.$axios.get(
      `util/v2/mobile/gradebooks/${this.$route.params.studentid}`
    )

    this.items = data.data
  },
}
</script>

<style scoped>
.exportbtn {
  border: 1px solid #229af2;
  font-family: Brown;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0px;
  text-align: left;
  color: #229af2;

  /* padding: 13px, 26px, 13px, 26px; */
}

.filterbtn {
  background: #dbeaf4;
  color: #229af2;
}
</style>