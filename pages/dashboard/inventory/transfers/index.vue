<template>
    <div>
      <div class="text-20 d-flex justify-content-between align-items-center mb-3">
        <h4>Transfers</h4>
        <div>
          <BaseButton class="btn-primary" @click="$bvModal.show('id')"
          >Add Transfer
        </BaseButton>
        </div>
      </div>
  
      <div class="card">
        <div class="card-body">
          <DashboardInvoiceListFilter :isrecipt= 'false' @filter="filter(1, $event)" />
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
              @row-clicked="openInvestigation"
              @cancel="cancelRequestModal($event)"
              @page-changed="filter($event, currentFilter)"
            >
              <template #status="{ data }">
                <!-- <pre>{{ data }}</pre> -->
                <div>
                  <div style="width: 9rem">
                    <span
                      v-if="data.item.status === 'Draft'"
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
                      v-if="data.item.status === 'Done'"
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
                      v-else-if="data.item.status === 'Open'"
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
                      v-else-if="data.item.status === 'Back Order'"
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
                      v-else-if="data.item.status === 'Cancelled'"
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
  
      <div class="create_order">
      <DashboardModalAddReceipt isreceipt="false" @refresh="filter()" />
    </div>
  
      <!-- ***********workflow********* -->
    
  
      <!-- ********************************* -->
    </div>
  </template>
  
  <script>
  import { DateTime } from 'luxon'
  import TableFunc from '~/mixins/TableCompFun'
  import FilterLogic from '~/mixins/routeFiltersMixin'
  export default {
    mixins: [TableFunc, FilterLogic],
    data() {
      return {
        currentFilter: {},
        itemsToShow: [
          {
            move_id: 'WH/IN/0001',
            scheduled_date: "3/01/2023",
            destination_location: 'Appa, Lagos',
            source_location: 'Ikeja, lagos',
            vendor: 'KK and Sons Limited',
            status: 'Draft',
          },
          {
            move_id: 'WH/IN/0002',
            scheduled_date: 'Tomorrow',
            destination_location: 'Appa, Lagos',
            source_location: 'Ikeja, lagos',
            vendor: 'KK and Sons Limited',
            status: 'Cancelled',
          },
          {
            move_id: 'WH/IN/0003',
            scheduled_date: 'Yesterday',
            destination_location: 'Appa, Lagos',
            source_location: 'Ikeja, lagos',
            vendor: 'KK and Sons Limited',
            status: 'Done',
          },
          {
            move_id: 'WH/IN/0004',
            scheduled_date: 'Tomorrow',
            destination_location: 'Appa, Lagos',
            source_location: 'Ikeja, lagos',
            vendor: 'KK and Sons Limited',
            status: 'Open',
          },
          {
            move_id: 'WH/IN/0005',
            scheduled_date: '3/01/2023',
            destination_location: 'Appa, Lagos',
            source_location: 'Ikeja, lagos',
            vendor: 'KK and Sons Limited',
            status: 'Back Order',
          },
          {
            move_id: 'WH/IN/0006',
            scheduled_date: '3/04/2023',
            destination_location: 'Appa, Lagos',
            source_location: 'Ikeja, lagos',
            vendor: 'KK and Sons Limited',
            status: 'Draft',
          },
          {
            move_id: 'WH/IN/0007',
            scheduled_date: '5/06/2023',
            destination_location: 'Appa, Lagos',
            source_location: 'Ikeja, lagos',
            vendor: 'KK and Sons Limited',
            status: 'Done',
          },
          {
            move_id: 'WH/IN/0008',
            scheduled_date: '4/07/2023',
            destination_location: 'Appa, Lagos',
            source_location: 'Ikeja, lagos',
            vendor: 'KK and Sons Limited',
            status: 'Cancelled',
          },
          {
            move_id: 'WH/IN/0009',
            scheduled_date: 'Tomorrow',
            destination_location: 'Appa, Lagos',
            source_location: 'Ikeja, lagos',
            vendor: 'KK and Sons Limited',
            status: 'Back Order',
          },
        ],
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
            key: 'scheduled_date',
            label: 'Scheduled Date',
            sortable: true,
          //   formatter: (value) => {
          //     return DateTime.fromISO(value).toLocaleString(
          //       DateTime.DATETIME_SHORT
          //     )
          //   },
          },
          { key: 'source_location', label: 'Source Location', sortable: true },
          { key: 'destination_location', label: 'Destination Location', sortable: true },
          { key: 'vendor', label: 'Vendor', sortable: true },
          { key: 'status', label: 'Status', sortable: true },
        ],
      }
    },
    mounted() {
   
  this.getRandomDate()
    },
  
    methods: {
      getRandomDate() {
      const maxDate = Date.now();
      const timestamp = Math.floor(Math.random() * maxDate);
      return new Date(timestamp);
      
  },
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
        this.$bvModal.show('takespecimen')
        this.modalTitle = 'Take Specimen'
        this.status = 'recieve specimen'
        this.id = e.id
        this.audit_log = e
      },
      openFillResult(e) {
        this.audit_log = e
        console.log(this.audit_log, e.log, 'event')
        this.$bvModal.show('takespecimen')
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
        this.audit_log = e.audit_log
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
  