<template>
  <div>
    <UtilsFilterComponent
      @dropdown="setOption"
      disable-pagination
      :dropDownOptions="['Service center', 'Modality']"
      :dropdownFilter="true"
      disable-visualization
    >
    <template #beforeActions>
        <div>
          <div>
            <VSelect
              style="font-size: 13px"
              label="name"
              class="width"
              v-model="filter.entry"
              :placeholder="placeholder"
              :reduce="(option) => option.id"
              :options="options"
            >
            </VSelect>
          </div>
        </div>
      </template>
      <template #besidesViewBy>
        <div class="d-flex">
          <div class="col-md-6">
            <span class="text-12 text-grey">Date from:</span>
            <input
              type="date"
              class="form-control"
              :max="maxDate"
              v-model="filter.dateFrom"
            />
          </div>
          <div class="col-md-6">
            <span class="text-12 text-grey">Date to:</span>
            <input
              type="date"
              class="form-control"
              :min="minDate"
              v-model="filter.dateTo"
            />
          </div>
        </div>
      </template>
      <template #besideFilterButton>
        <BaseButton
          class="btn-outline-primary"
          @click="$bvModal.show('add_imaging')"
          >New Imaging</BaseButton
        >
      </template>
      <template>
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="busy"
          :dropdown-item="['print', 'email', 'cancel']"
          @cancel="cancelImaging($event)"
          @page-changed="pageChange"
        >
          <template #status="{ data }">
            <template v-if="data.item.status === 'NEW'">
              <button
                :disabled="data.item.bill.cleared_status !== 'CLEARED'"
                class="btn btn-outline-primary btn-sm"
              >
                Capture
              </button>
            </template>
            <template v-if="data.item.status === 'CAPTURED'">
              <button
                :disabled="data.item.bill.cleared_status !== 'CLEARED'"
                class="btn btn-outline-warning btn-sm"
              >
                Report
              </button>
            </template>

            <template v-if="data.item.status === 'AWAITING_APPROVAL'">
              <button class="btn btn-sm btn-outline-info text-nowrap">
                AWAITING APPROVAL
              </button>
            </template>
          </template>
          <template #info="{ data }">
            <button class="btn btn-primary" @click="data.toggleDetails">
              Details
            </button>
          </template>
          <template #row-details="{ data }">
            <div class="card">
              <div class="card-body">
                <!-- <h5 class="">Card title</h5> -->
                <h6 class="card-subtitle mb-2 text-muted">
                  Reported by:
                  <span class="text-black">{{
                    formatName(data.item.reported_by)
                  }}</span>
                </h6>
                <h6 class="card-subtitle mb-2 text-muted">
                  Reported on:
                  <span class="text-black">{{
                    formatDate(data.item.reported_on)
                  }}</span>
                </h6>
                <h6 class="card-subtitle mb-2 text-muted">
                  Approved on:
                  <span class="text-black">{{
                    formatName(data.item.approved_by)
                  }}</span>
                </h6>
                <h6 class="card-subtitle mb-3 text-muted">
                  Approved by:
                  <span class="text-black">{{
                    formatDate(data.item.approved_on)
                  }}</span>
                </h6>
                <h6 class="card-subtitle mb-3 text-muted">Report:</h6>
                <p class="card-text" v-html="data.item.report">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </template>
        </TableComponent>
      </template>
    </UtilsFilterComponent>
    <DashboardModalAddPatientImagingOrder
      :data="data"
      @refresh="pageChange()"
    />
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
import modalMsgBox from '~/mixins/modalMsgBox'
export default {
  mixins: [TableFunc, modalMsgBox],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      filter: {
        size: 10,
        by: '',
        entry: '',
        dateFrom: '',
        dateTo: '',
      },
      options: [],
      placeholder: '',
      fields: [
        {
          key: 'img_order.ordered_datetime',
          label: 'Date',
          formatter: (value) => {
            return DateTime.fromISO(value).toFormat('yyyy-LL-dd T')
          },
          sortable: true,
        },
        {
          key: 'img_order.img_id',
          label: 'ASN',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },
        {
          key: 'img_order.service_center.name',
          label: 'Service Center',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },

        {
          key: 'img_order.patient.uhid',
          label: 'UHID',
          // formatter: (val, key, item) => {
          //   return val.ordered_by.first_name + ' ' +val.ordered_by.first_name
          // },
          sortable: true,
        },
        {
          key: 'patient',
          label: 'Patient',
          sortable: true,
          formatter: (val) => {
            return val.salutation + ' ' + val.firstname + ' ' + val.lastname
          },
        },
        { key: 'img_obv.name', label: 'Observation', sortable: true },
        {
          key: 'img_order',
          label: 'Order By',
          formatter: (val, key, item) => {
            return val.ordered_by.first_name + ' ' + val.ordered_by.first_name
          },
          sortable: true,
        },
        { key: 'info', label: 'Show Detail', sortable: true },
        { key: 'dots', label: '', sortable: false },
      ],
    }
  },
  async mounted() {
    await this.pageChange(1)
  },
  watch: {
     'filter.entry'() {
      if (this.filter.by !== '' && this.filter.entry !== null) {
        this.pageChange(1, this.filter)
      }
    },
    'filter.by'() {
      this.filter.entry = null
    },
    'filter.dateFrom'() {
      this.pageChange(1, this.filter)
    },
    'filter.dateTo'() {
      this.pageChange(1, this.filter)
    },
  },
  methods: {
    async pageChange(page = 1,  e = {
        size: 10,
        by: '',
        entry: '',
        dateFrom: '',
        dateTo: '',
      }) {

        const newFilterObject = {
        ...e,
        [e.by]: e.entry,
        page: page,
        patient_uhid: this.data.uhid,
      }
      try {
        this.busy = true
        const data = await this.$api.imaging.getObservationOrder({
          ...newFilterObject
        })
        this.items = data.results
        this.pages = data.total_pages
        this.$nuxt.refresh()
        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },

    setOption(e) {
      this.placeholder = e
      if (e === 'Service center') {
        this.filter.by = 'service_center'
        this.getServiceCenter()
      }
      if (e === 'Modality') {
        this.filter.by = 'modality'
        this.getModality()
      }
    },

     async getServiceCenter() {
      try {
        const { results } = await this.$api.imaging.getServiceCenter({
          size: 1000,
        })
        this.options = results
      } catch (error) {
        console.log(error)
      }
    },
    async getModality() {
      try {
        const { results } = await this.$api.imaging.getLabUnit({
          size: 1000,
        })
        this.options = results
      } catch (error) {
        console.log(error)
      }
    },
    
    async cancelImaging(e) {
      const result = await this.showDeleteMessageBox(
        'Do you want to cancel Imaging Order'
      )
      if (result) {
        await this.$api.imaging.patchObservationOrder(e.id, {
          status: 'CANCELED',
        })
      }
    },

    formatName(obj) {
      if (Object.values(obj).length > 0) {
        return obj.first_name + ' ' + obj.last_name
      }
    },

    formatDate(value) {
      if (value) {
        return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
      }
      return ''
    },
  },
}
</script>

<style lang="scss" scoped>
.width {
  width: 10rem;
  height: 38px;
}
</style>