<template>
  <div>
    <UtilsFilterComponent
      disable-visualization
      @search-input="pageChange(1, $event)"
    >
      <template #besideFilterButton>
        <BaseButton class="btn-primary" @click="$bvModal.show('modal')"
          >Create Report</BaseButton
        >
      </template>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          @page-changed="pageChange"
          @row-clicked="onRowClicked($event)"
        >
          <template #status="{ data: { item } }">
            <div v-if="item.status">
              <span
                v-if="item.status === 'computed'"
                class="text-capitalize badge blue-badge d-inline"
                >{{ item.status }}</span
              >
              <span
                v-else-if="item.status === 'processed'"
                class="text-capitalize badge green-badge d-inline"
              >
                Published
              </span>
              <span v-else class="text-capitalize badge yellow-badge d-inline">
                {{ item.status }}
              </span>
            </div>
          </template>
          <template #triple_actions="{ data: { item } }">
            <b-dropdown
              size="lg"
              variant="link"
              menu-class=""
              class="cutom2"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <span class="iconify" data-icon="bi:three-dots-vertical"></span>
              </template>
              <b-dropdown-item
                v-if="item.status === 'computed' || item.status === 'processed'"
                href="#"
                class=""
                @click="handleSheet(item.id)"
              >
                <Icon icon="icons8:download-2" class="custom-icon" />
                <!-- <b-spinner small label="Small Spinner" type="grow"></b-spinner> -->
                Download Broadsheet</b-dropdown-item
              >
              <b-dropdown-item
                v-if="item.status === 'computed'"
                href="#"
                class=""
                @click="handlePDF"
              >
                <Icon icon="ant-design:file-pdf-twotone" class="custom-icon" />

                Download PDF</b-dropdown-item
              >
              <b-dropdown-item
                v-if="item.status === 'processed' || item.status === 'computed'"
                href="#"
                class=""
                @click="handleUnpublish(item.id)"
              >
                <Icon icon="ic:outline-unpublished" class="custom-icon" />

                Unpublish</b-dropdown-item
              >
              <b-dropdown-item
                href="#"
                class="text-danger"
                @click="handleDelete"
              >
                <span class="text-danger">
                  <Icon icon="ri:delete-bin-6-fill" class="custom-icon" />

                  Delete
                </span>
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </TableComponent>

        <div v-else class="row">
          <div
            v-for="(value, index) in items"
            :key="index"
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
          >
            <UtilsGridViewCard
              :data="value"
              :display-key="['name', 'code', 'type', 'active']"
            ></UtilsGridViewCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>
    <ReportTemplateSetupReportCard />
    <modal-wrapper
      id="unpublish"
      title="Unpublish Template"
      submit-title="Unpublish"
      @ok="unPublish"
    >
      <div>Are you sure you want to unpublish this report card template?</div>
    </modal-wrapper>
  </div>
</template>

<script>
// import { DateTime } from 'luxon'
import { DateTime } from 'luxon'
import axios from 'axios'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
import modalMsgBox from '@/mixins/modalMsgBox'

export default {
  mixins: [TableFunc, modalMsgBox],
  data() {
    return {
      currentPage: 1,
      fields: [
        {
          key: 'name',
        },
        {
          key: 'card_template',
        },
        // {
        //   key: 'academic_year',
        // },
        {
          key: 'academic_period',
        },
        // {
        //   key: 'date_created',
        //   formatter: (value) => {
        //     return DateTime.fromSQL(value).toFormat('DDD')
        //   },
        // },

        {
          key: 'published_date',
          // formatter: (value) => {
          //   return DateTime.fromSQL(value).toFormat('DDD')
          // },
        },
        {
          key: 'status',
        },
        {
          key: 'triple_actions',
          label: '',
          sortable: false,
        },
      ],
    }
  },
  async mounted() {
    await this.pageChange(1)
  },
  methods: {
    handleSheet(e) {
      window.open(
        `${process.env.BASE_URL}/schools/v3/report_card/batch/${e}/broadsheet`
      )
      // dont delete yet
      // try {
      //   const response = await axios.get(
      //     `schools/v3/report_card/batch/${e}/broadsheet`,
      //     { responseType: 'blob' }
      //   )
      //   const blob = new Blob([response.data])
      //   const link = document.createElement('a')
      //   link.href = URL.createObjectURL(blob)
      //   link.download = `file.xlsx`
      //   link.click()
      //   URL.revokeObjectURL(link.href)
      // } catch (e) {
      //   console.error(e)
      // }
    },
    handlePDF() {},
    handleUnpublish(e) {
      this.selectedBatch = e
      this.$bvModal.show('unpublish')
    },
    handleDelete() {},
    async unPublish() {
      try {
        await this.$axios.post(
          `schools/v3/report_card/batch/${this.selectedBatch}/unprocess/`
        )
        this.$bvModal.hide('unpublish')
        this.pageChange(this.currentPage)
      } catch (error) {
        console.error(error)
      }
    },

    async pageChange(page = 1, search = '') {
      this.currentPage = page
      try {
        this.busy = true
        const data = await this.$axios.$get(
          `schools/v2/class/${this.$route.params.class}/report_card/batch?page=${page}&search=${search}&param=all`
        )
        this.items = data.data
        this.pages = data.pages
        this.busy = false
      } catch (error) {
        console.log(error)
        this.busy = false
      }
    },
    onRowClicked(e) {
      console.log(e)
      this.$router.push({
        name: 'sms-id-lms-classes-class-report-card-batch',
        params: {
          batch: e.id,
        },
        query: { _name: `${e.name}` },
      })
    },

    routeToParams() {
      this.$router.push({
        name: 'sms-id-lms-classes-class-report-card',
      })
    },
  },
}
</script>

<style scoped>
.custom-icon {
  font-size: 1.5rem;
}
</style>
