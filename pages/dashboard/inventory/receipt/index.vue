<template>
  <div>
    <div class="text-20 d-flex justify-content-between align-items-center mb-3">
      <h4>Reciepts</h4>
      <div>
        <BaseButton class="btn-primary" @click="$router.push('/dashboard/inventory/receipt/add')"
          >Add Reciept
        </BaseButton>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <DashboardInvoiceListFilter  @filter="filter($event)" />
      </div>
    </div>

    <div class="mt-3">
      <UtilsFilterComponent
        disable-pagination
        :disable-visualization="true"
        search-placeholder="Search"
      >
        <b-overlay
          variant="light"
          spinner-variant="primary"
          spinner-type="grow"
          :show="downloading"
          rounded="sm"
        >
          <TableComponent
            :fields="fields"
            :pages="pages"
            :items="itemsToShow"
            :busy="busy"
            :dropdown-item="['cancel']"
            @row-clicked="$router.push('/dashboard/inventory/receipt/update')"
            @cancel="cancelRequestModal($event)"
            @page-changed="filter($event, currentFilter)"
          >
            <template #status="{ data }">
              <!-- <pre>{{ data }}</pre> -->
              <div>
                <div style="width: 9rem">
                  <span
                    v-if="data.item.status === 'DRAFT'"
                    class="
                      text-14
                      badge-warning
                      rounded
                      text-center
                      p-1
                      w-100
                      text-white
                    "
                    style="margin: 0"
                    >{{ data.item.status }}</span
                  >
                  <span
                    v-if="data.item.status === 'DONE'"
                    class="
                      text-14
                      badge-success
                      rounded
                      text-center
                      p-1
                      text-white
                    "
                    style="margin: 0"
                    >{{ data.item.status }}</span
                  >
                  <span
                    v-else-if="data.item.status === 'OPEN'"
                    class="
                      text-14
                      badge-info
                      rounded
                      text-center
                      p-1
                      text-white
                    "
                  >
                    {{ data.item.status }}
                  </span>
                  <span
                    v-else-if="data.item.status === 'APPROVED'"
                    class="
                      text-14
                      badge-primary
                      rounded
                      text-center
                      p-1
                      text-white
                    "
                  >
                    {{ data.item.status }}
                  </span>
                  <span
                    v-else-if="data.item.status === 'CANCELLED'"
                    class="
                      text-14
                      badge-danger
                      rounded
                      text-center
                      p-1
                      text-white
                    "
                  >
                    {{ data.item.status }}
                  </span>
                </div>
              </div>
            </template>
          </TableComponent>
        </b-overlay>
      </UtilsFilterComponent>
    </div>

    <!-- <div class="create_order">
      <PagesDashboardInventoryReceiptAdd  @refresh="filter()" />
    </div> -->

    <!-- ***********workflow********* -->
    

    <!-- ********************************* -->
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun'
import FilterLogic from '~/mixins/routeFiltersMixin'
import axios from '~/plugins/axios'
export default {
  mixins: [TableFunc, FilterLogic],
  data() {
    return {
      currentFilter: {},
      itemsToShow: [],
      downloading: false,
      audit_log: {},
      labOrderPanel: {
        panel: {},
        status: '',
        lab_order: '',
      },
      showOptions: false,
      manageInput: '',
      id: '',
      modalTitle: '',
      status: '',
      fields: [
        { key: 'move_id', label: 'Move Id', sortable: true },
        {
          key: 'schedule_date',
          label: 'Scheduled Date',
          sortable: true,
        //   formatter: (value) => {
        //     return DateTime.fromISO(value).toLocaleString(
        //       DateTime.DATETIME_SHORT
        //     )
        //   },
        },
        { key: 'destination_location.name', label: 'Location', sortable: true },
        { key: 'vendor.name', label: 'Vendor', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
      ],
    }
  },
 mounted() {
  this.getStockMove()
  },

  methods: {
    openModal(e) {
        console.log(e,this.$bvModal, 'event')
        
        this.$bvModal.show('modal')
    },
    // async showItems(){
    //   try {
        
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    save_file(e) {
      this.downloading = true
      fetch(
        `${process.env.BASE_URL}laboratory/lab_panel_order/${e.id}/reports/download`,
        {
          headers: {
            Authorization: `Token ${this.$store.state.auth.token}`,
          },
        }
      )
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.download = `Lab Report_${e.asn})`
          link.href = objectURL
          this.downloading = false
          link.click()
        })
        .catch((err) => {
          console.log(err)
          this.downloading = false
        })
    },
    openInvestigation(e) {
      this.$bvModal.show('comments')
      this.audit_log = e.audit_log
      this.labOrderPanel = e
    },
    async mailReport(e) {
      try {
        this.downloading = true
        await this.$axios.$get(
          `laboratory/lab_panel_order/${e.id}/reports/mail/`
        )
        this.$toast({
          type: 'success',
          text: 'Mail sent',
        })
        this.downloading = false
      } catch {
        this.$toast({
          type: 'error',
          text: 'Mail not sent, please ensure that a mail address was provided',
        })
      } finally {
        this.downloading = false
      }
    },
    async getStockMove(){
      console.log('hello')
      try {
        this.busy = true
        const data = await this.$api.inventory.getStockMove()
        this.itemsToShow = data.results
        console.log(data, 'itemstoshow')
        this.pages = data.total_pages
      } catch (error) {
        console.log(error, 'error')
      } finally {
        this.busy = false
      }
    },
    async filter(page, e) {
      this.currentFilter = e
      
      try {
        this.busy = true
        const data = await axios.$get('inventory/stock_movements/', {
          ...e,
          page,
        })
        this.itemsToShow = data.results
        console.log(data, this.itemsToShow, 'itemstoshow')
        this.pages = data.total_pages
      } catch (error) {
      } finally {
        this.busy = false
      }
    },
    openSpecimenTaken(e) {
      console.log(e.log, 'event')
      // this.$bvModal.show('takespecimen')
      this.modalTitle = 'Take Specimen'
      this.status = 'recieve specimen'
      this.id = e.id
      this.audit_log = e
    },
    openFillResult(e) {
      this.audit_log = e
      console.log(this.audit_log, e.log, 'event')
      // this.$bvModal.show('takespecimen')
      this.modalTitle = 'Recieve Specimen'
      this.status = 'fill result'
      this.id = e.id

      for (const iterator of e.panel.obv) {
        if (iterator.type.name === 'Options') {
          this.showOptions = true
        } else {
          this.showOptions = false
        }
        if (
          iterator.type.name === 'Integer' ||
          iterator.type.name === 'Float'
        ) {
          this.manageInput = 'number'
        } else {
          this.manageInput = 'text'
        }
      }
    },
    openEditPanel(e) {
      // console.log(e, 'event')
      this.$bvModal.show('fillresult')

      for (const iterator of e.panel.obv) {
        if (iterator.type.name === 'Options') {
          this.showOptions = true
        } else {
          this.showOptions = false
        }
        if (
          iterator.type.name === 'Integer' ||
          iterator.type.name === 'Float'
        ) {
          this.manageInput = 'number'
        } else {
          this.manageInput = 'text'
        }
      }
      // this.fillControl = true;
      // this.approveControl = false;
      // this.enable = true;

      this.labOrderPanel.lab_order = e.lab_order
      this.labOrderPanel.panel = e.panel
      this.labOrderPanel.status = e.stats
      this.labOrderPanel.asn = e.asn
      this.labOrderPanel.id = e.id
      this.labOrderPanel.status = e.status
      this.audit_log = e
    },
    setStatusToApproved(e) {
      this.labOrderPanel = e
      this.id = e.id
      this.audit_log = e.audit_log
      this.$bvModal.show('Edit-laborder')
      for (const iterator of e.panel.obv) {
        if (iterator.type.name === 'Options') {
          this.showOptions = true
        } else {
          this.showOptions = false
        }
        if (
          iterator.type.name === 'Integer' ||
          iterator.type.name === 'Float'
        ) {
          this.manageInput = 'number'
        } else {
          this.manageInput = 'text'
        }
      }
      
    },
    async setStatusToAwaitingApproval() {
      try {
        await this.$axios.$patch(`laboratory/lab_panel_order/${this.id}/`, {
          status: 'awaiting approval',
        })
        this.$bvModal.hide('confirm')
        this.$emit('refresh')
      } catch {
        this.$toast({
          type: 'error',
          text: `Unable to submit for approval`,
        })
      }
    },
    cancelRequestModal(e) {
      this.labOrderPanel = e
      this.status = 'cancelled'
      this.$bvModal.show('cancelRequest')
    },
  },
}
</script>

<style></style>
