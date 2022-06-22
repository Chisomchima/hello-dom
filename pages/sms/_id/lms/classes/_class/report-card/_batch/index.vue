<template>
  <div>
    <div class="d-flex align-items-center justify-content-end flex-wrap mb-3">
      <!-- <BackwardNavigation /> -->

      <div class="d-flex align-items-center flex-wrap mb-2">
        <div v-if="showDownloadSheetButton" class="mr-2">
          <!-- <button
            class="btn btn-light d-flex align-items-center py-2 px-3"
            @click="broadsheet()"
          >
            <b-icon icon="cloud-arrow-down" />
            <span class="px-1">Download Broadsheet</span>
          </button> -->

          <div
            class="bg-white d-flex align-items-center py-2 px-3 border rounded"
          >
            Download:
            <div
              class="d-flex align-items-center py-2 px-3 mx-2"
              @click="broadsheet()"
            >
              <Icon
                style="font-size: 25px"
                icon="vscode-icons:file-type-excel2"
              />
            </div>
            <div
              class="d-flex align-items-center py-2 px-3 mx-2"
              @click="downloadPdf()"
            >
              <Icon
                style="font-size: 25px"
                icon="ant-design:file-pdf-filled"
                class="text-danger"
              />
            </div>
          </div>
        </div>
        <!-- <div class="mr-2">
          <button
            class="btn btn-light d-flex align-items-center py-2 px-3"
            @click=""
          >
            <Icon icon="ant-design:file-pdf-twotone" class="custom-icon" />

            <span class="px-1">Download PDF</span>
          </button>
        </div> -->
        <div v-if="showProcessReportCardButton" class="mr-2">
          <BaseButton
            watch-request
            class="d-flex align-items-center py-2 px-3"
            @click="processReportCard()"
          >
            <b-icon icon="check-all" />
            <span class="px-1">Publish Report Card</span>
          </BaseButton>
        </div>
        <div v-if="showUnProcessReportCardButton" class="mr-2">
          <BaseButton
            watch-request
            class="d-flex align-items-center py-2 px-3 custom-btn"
            @click="unPublish"
          >
            <b-icon icon="x-circle-fill" />
            <span class="px-1">Unpublish Report Card</span>
          </BaseButton>
        </div>
      </div>
    </div>
    <UtilsHeaderCard
      :title="data.name"
      :data="data"
      :enable-action="true"
      :display-key="[
        'class',
        'form_teacher',
        'academic_year',
        'academic_period',
        'report_card_template_name',
      ]"
    >
      <template #actions>
        <div class="dropdown">
          <button
            id="dropdownMenuButton"
            class="btn btn-sm px-0 dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Actions
          </button>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            <a
              v-for="(action, index) in actions"
              :key="index"
              class="dropdown-item text-capitalize"
              href="#"
              @click.prevent="$emit(action)"
              >{{ action.split('_').join(' ') }}</a
            >
            <a
              class="dropdown-item text-danger"
              href="#"
              @click.prevent="handleDelete"
              >Delete</a
            >
          </div>
        </div>
      </template>
    </UtilsHeaderCard>

    <UtilsFilterComponent
      disable-visualization
      @search-input="handleSearch"
      @view-by="handleViewBy"
    >
      <template #default>
        <TableComponent
          is-client-pagination
          :current-page="currentPage"
          :options="viewBy"
          :items="computedStudents"
          :fields="fields"
          :busy="false"
          :filter="filter"
          :pages="totalPages"
          :per-page="perpage"
          :dropdown-item="dropdownItem"
          @row-clicked="onRowClicked($event)"
        >
          <template #avatar="{ data }">
            <b-avatar v-if="data.value" :src="data.value"></b-avatar>
            <b-skeleton-icon
              v-else
              icon="person-circle"
              :icon-props="{ fontScale: 2 }"
            ></b-skeleton-icon>
          </template>
          <template #status="{ data }">
            <!-- <b-avatar v-if="data.value" :src="data.value"></b-avatar>
            <b-skeleton-icon
              v-else
              icon="person-circle"
              :icon-props="{ fontScale: 2 }"
            ></b-skeleton-icon> -->
            <span
              v-if="data.value === 'processed'"
              class="text-capitalize badge blue-badge d-inline"
              >Published</span
            >
            <span
              v-if="data.value === 'draft'"
              class="text-capitalize badge grey-badge d-inline"
              >{{ data.value }}</span
            >
            <span
              v-if="data.value === 'completed'"
              class="text-capitalize badge blue-badge d-inline"
              >{{ data.value }}</span
            >
            <span
              v-if="data.value === 'approved'"
              class="text-capitalize badge green-badge d-inline"
              >{{ data.value }}</span
            >
          </template>
        </TableComponent>
      </template>
      <template #besidesViewBy>
        <div class="button-container m-3 d-flex">
          <b-button
            class="mr-3 btn-primary rounded col-5"
            @click="handleStatusFilter('all')"
            >All</b-button
          >
          <b-button
            variant="success"
            class="mr-3 btn-success rounded col"
            @click="handleStatusFilter('approved')"
            >Approved</b-button
          >
          <b-button
            class="mr-3 btn-secondary rounded col-5"
            @click="handleStatusFilter('draft')"
            >Draft</b-button
          >
        </div>
        <!-- <div class="records-count ml-5">
          <span>Filter by: </span>
          <select
            class="records-count"
            @change="handleStatusFilter($event.target.value)"
          >
            <option value="approved">Approved</option>
            <option value="draft">Draft</option>
            <option value="all" selected>All</option>
          </select>
        </div> -->
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  async asyncData({ $axios, route }) {
    try {
      const { data } = await $axios.$get(
        `schools/v2/report_card/batch/${route.params.batch}`
      )
      return { data }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      currentPage: 1,
      viewBy: [5, 10, 20, 50, 100],
      filter: '',
      filterBy: '',
      perpage: 50,
      fields: [
        {
          key: 'avatar',
          label: '',
        },
        {
          key: 'first_name',
        },
        {
          key: 'middle_name',
        },
        {
          key: 'last_name',
        },
        {
          key: 'status',
        },
      ],
      dropdownItem: [
        'edit',
        'view_profile',
        'push_communication',
        'capture_image',
        'upload_image',
      ],
    }
  },
  computed: {
    totalPages() {
      return this.data.students.length / this.perpage
    },
    computedStudents() {
      if (this.filterBy) {
        const filtered = this.data.students.filter(
          (student) => student.status === this.filterBy
        )
        return filtered
      } else {
        return this.data.students
      }
    },
    showProcessReportCardButton() {
      // if (this.data.status === '') {
      //   return true
      // } else {
      //   return false
      // }
      return this.data.students.every(
        (student) => student.status === 'approved'
      )
    },
    showUnProcessReportCardButton() {
      if (this.data.status === 'computed' || this.data.status === 'processed') {
        return true
      } else {
        return false
      }
    },
    showDownloadSheetButton() {
      if (this.data.status === 'computed' || this.data.status === 'processed') {
        return true
      } else {
        return false
      }
      // return this.data.students.every(
      //   (student) => student.status === 'processed'
      // )
    },
    showDownloadPDFButton() {
      if (this.data.status === 'processed') {
        return true
      } else {
        return false
      }
      // return this.data.students.every(
      //   (student) => student.status === 'processed'
      // )
    },
  },
  methods: {
    handleDelete() {
      console.log('default')
    },
    handleStatusFilter(e) {
      switch (e) {
        case 'approved':
          this.filterBy = 'approved'
          break
        case 'draft':
          this.filterBy = 'draft'
          break
        case 'all':
          this.filterBy = ''
          break
        default:
      }
    },
    handleViewBy(e) {
      this.perpage = e
    },
    handleSearch(e) {
      this.filter = e
    },
    onRowClicked(e) {
      this.$router.push({
        name: 'sms-id-lms-classes-class-report-card-batch-student-student',
        params: {
          batch: this.$route.params.batch,
          student: e.class_student_id,
        },
        query: { _name: `${e.first_name} ${e.last_name}` },
      })
    },
    async processReportCard() {
      try {
        await this.$axios.$get(
          `/schools/v3/report_card/batch/${this.$route.params.batch}/process/`
        )
        await this.$nuxt.refresh()
      } catch (error) {
        console.log(error)
      }
    },
    async unPublish() {
      try {
        await this.$axios.post(
          `schools/v3/report_card/batch/${this.$route.params.batch}/unprocess/`
        )
        await this.$nuxt.refresh()
      } catch (error) {
        console.error(error)
      }
    },
    broadsheet() {
      window.open(
        `${process.env.BASE_URL}/schools/v3/report_card/batch/${this.$route.params.batch}/broadsheet`
      )
    },
    downloadPdf() {
      window.open(
        `${process.env.BASE_URL}/schools/v3/report_card/${this.$route.params.batch}/file`
      )
    },
  },
}
</script>

<style scoped>
.custom-icon {
  font-size: 1.2rem;
}
.custom-btn {
  height: 3.4rem;
}
</style>
