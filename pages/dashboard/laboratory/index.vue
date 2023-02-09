<template>
  <div>
    <div class="text-20 d-flex justify-content-between align-items-center mb-3">
      <h4>Lab worklist</h4>
      <div>
        <BaseButton
          class="btn-primary"
          @click="$bvModal.show('labOrderPanel')"
          >New Lab Order
        </BaseButton>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <DashboardLabWorklistFilter @filter="filter(1, $event)" />
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
            @row-clicked="openInvestigation"
            :dropdown-item="['cancel']"
            @cancel="cancelRequestModal($event)"
            @page-changed="filter($event, currentFilter)"
          >
            <template #status="{ data }">
              <div>
                <div style="width: 9rem">
                  <span>
                    <button
                    @click.passive="openSpecimenTaken(data.item)"
                    v-if="data.item.status === 'NEW'"
                    :disabled="data.item.bill.cleared_status === 'UNCLEARED'"
                    class="text-center text-capitalize text-12"
                    :class="
                      data.item.bill.cleared_status === 'UNCLEARED'
                        ? 'btn btn-warning'
                        : 'btn btn-outline-info '
                    "
                   
                  >
                    {{
                      data.item.status === 'NEW'
                        ? 'take specimen'
                        : data.item.status
                    }}
                  </button>
                  </span>
                </div>
                <div>
                  <button
                    v-if="data.item.status === 'recieve specimen'"
                    style="width: 9rem"
                    class="
                      text-center text-capitalize text-12
                      btn btn-outline-info
                      pointer
                    "
                    @click="openFillResult(data.item)"
                  >
                    {{ data.item.status }}
                  </button>
                  <button
                    v-if="data.item.status === 'fill result'"
                    style="width: 8rem"
                    class="
                      text-center text-capitalize text-12
                      btn btn-outline-info
                      pointer
                    "
                    @click="openEditPanel(data.item)"
                  >
                    {{ data.item.status }}
                  </button>
                  <button
                    v-if="data.item.status === 'awaiting approval'"
                    style="width: 9rem"
                    class="
                      text-center text-capitalize text-12
                      btn btn-outline-info
                      pointer
                    "
                    @click="setStatusToApproved(data.item)"
                  >
                    {{ data.item.status }}
                  </button>
                  <div v-if="data.item.status === 'approved'">
                    <div class="d-flex">
                      <span
                        style="width: 1rem"
                        class="text-center text-12 text-info pointer mx-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="24"
                          height="24"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 20 20"
                          @click="save_file(data.item)"
                        >
                          <path
                            fill="currentColor"
                            d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5Zm9 0a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5h8v-.5Zm-8 7v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5Z"
                          />
                        </svg>
                      </span>

                      <span
                        style="width: 1rem"
                        class="text-success text-center mx-3"
                        @click="mailReport(data.item)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="24"
                          height="24"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 36 36"
                        >
                          <path
                            fill="currentColor"
                            d="M33.68 15.26H32v11.45l-7.36-7.36l-1.41 1.41L30.46 28H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0l6.66-6.63h-2.83l-5.24 5.21L5.31 8h14.75l1.15-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V15.24Z"
                            class="
                              clr-i-outline--alerted
                              clr-i-outline-path-1--alerted
                            "
                          />
                          <path
                            fill="currentColor"
                            d="m26.85 1l-5.72 9.91a1.28 1.28 0 0 0 1.1 1.91h11.45a1.28 1.28 0 0 0 1.1-1.91L29.06 1a1.28 1.28 0 0 0-2.21 0Z"
                            class="
                              clr-i-outline--alerted
                              clr-i-outline-path-2--alerted
                              clr-i-alert
                            "
                          />
                          <path fill="none" d="M0 0h36v36H0z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div
                    v-if="data.item.status === 'cancelled'"
                    style="width: 8rem"
                    class="
                      text-center text-capitalize text-12
                      btn btn-outline-info
                      pointer
                    "
                  >
                    {{ data.item.status }}
                  </div>
                </div>
              </div>
            </template>
            <template #panel="{ data }">
              <div class="d-flex align-items-center">
                <div
                  style="
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    background: green;
                    border: 1px solid #727d71;
                  "
                  :style="`background: ${data.item.panel.specimen_type.color}`"
                  class="first pointer"
                ></div>

                <div style="width: 5rem" class="text-12 ml-1 text-truncate">
                  {{ data.item.panel.specimen_type.name }}
                </div>
              </div>
            </template>
            <template #action="{ data }">
              <div>
                <div
                  style="width: 6rem"
                  class="text-center text-12 pointer btn btn-outline-danger"
                  @click="cancelRequestModal(data.item)"
                >
                  Cancel
                </div>
              </div>
            </template>
          </TableComponent>
        </b-overlay>
      </UtilsFilterComponent>
    </div>

    <div class="create_order">
      <DashboardModalLabPanelOrder @refresh="filter()" />
    </div>

    <!-- ***********workflow********* -->
    <div>
      <DashboardModalLabStepsSpecimenHandler
        :id="id"
        :status="status"
        :modal-title="modalTitle"
        @refresh="filter()"
      />
    </div>

    <div>
      <DashboardModalLabStepsResultHandler
        :id="id"
        :lab-order-panel="labOrderPanel"
        :manage-input="manageInput"
        @refresh="filter()"
      />
    </div>

    <div>
      <DashboardModalLabStepsApproval
        :id="id"
        :lab-order-panel="labOrderPanel"
        :status="status"
        @refresh="filter()"
      />
    </div>

    <div>
      <DashboardModalLabStepsCancel
        :lab-order-panel="labOrderPanel"
        @refresh="filter()"
      />
    </div>
    <div>
      <DashboardModalLabStepsComments
        :lab-order-panel="labOrderPanel"
      />
    </div>

    <!-- ********************************* -->
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun'
import FilterLogic from '~/mixins/routeFiltersMixin'
export default {
  mixins: [TableFunc,FilterLogic],
  data() {
    return {
      currentFilter: {},
      itemsToShow: [],
      downloading: false,
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
        {
          key: 'created_at',
          label: 'Order date',
          sortable: true,
          formatter: (value) => {
            return DateTime.fromISO(value).toLocaleString(
              DateTime.DATETIME_SHORT
            )
          },
        },
        { key: 'asn', label: 'ASN', sortable: true },
        { key: 'patient.uhid', label: 'UHID', sortable: true },
        {
          key: 'patient',
          label: 'Patient',
          sortable: true,
          formatter: (val) => {
            return (val.salutation ? val.salutation : '') + ' ' + val.firstname + ' ' + val.lastname
          },
        },
        {
          key: 'panel.lab_unit.name',
          label: 'Lab Unit',
          sortable: true,
        },

        {
          key: 'panel.name',
          label: 'Panel Name',
          sortable: true,
        },
        { key: 'panel', label: 'Specimen Type', sortable: true },

        { key: 'status', label: 'Status', sortable: true },
        { key: 'dots', label: '', sortable: false },
      ],
    }
  },
  methods: {
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
    openInvestigation(e){
      this.$bvModal.show('comments')
      this.labOrderPanel = e
    },
    async mailReport(e) {
      try {
        this.downloading = true
        const response = await this.$axios.$get(
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
        const data = await this.$api.laborder.getLabOrders({
          ...e,
          page,
          worklist: true,
        })
        this.itemsToShow = data.results
        this.pages = data.total_pages
      } catch (error) {
      } finally {
        this.busy = false
      }
    },
    openSpecimenTaken(e) {
      console.log(e)
      this.$bvModal.show('takespecimen')
      this.modalTitle = 'Take Specimen'
      this.status = 'recieve specimen'
      this.id = e.id
    },
    openFillResult(e) {
      console.log(e)
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
    },
    async setStatusToAwaitingApproval() {
      try {
        const response = await this.$axios.$patch(
          `laboratory/lab_panel_order/${this.id}/`,
          { status: 'awaiting approval' }
        )
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

<style>
</style>