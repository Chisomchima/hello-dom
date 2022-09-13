<template>
  <div>
    <BackwardNavigation/>
    <div class="row">
      <div class="col-12 mb-2">
        <div class="d-flex justify-content-between align-items-center">
          <div class="page-heading mb-0">Laboratory Reports</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <ReportsLaboratoryFilter @filter="filter(1, $event)" />
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <UtilsFilterComponent
          :disableSearch="true"
          disable-pagination
          :disable-visualization="true"
          search-placeholder="Search"
        >
          <template #besideFilterButton>
            <div class="d-flex align-items-center">
              <div class="mr-2 mt-1">
                <b-spinner
                  style="width: 1.7rem; height: 1.7rem"
                  v-if="downloading"
                  variant="primary"
                  label="Spinning"
                ></b-spinner>
              </div>
              <button @click="downloadEncLaboratory" class="btn btn-sm btn-outline-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M763.024 260C718.4 141.568 622.465 66.559 477.569 66.559c-184.384 0-313.392 136.912-324.479 315.536C64.178 410.527.002 501.215.002 603.935c0 125.744 98.848 231.968 215.823 231.968h28.448c17.664 0 32-14.32 32-32s-14.336-32-32-32h-28.448c-82.304 0-152.832-76.912-152.832-167.968c0-80.464 56.416-153.056 127.184-165.216l29.04-5.008l-2.592-29.344l-.24-.368c.016-155.872 102.607-273.44 261.184-273.44c127.104 0 198.513 62.624 231.553 169.44l6.832 22.032l23.072.497c118.864 2.496 223.088 98.944 223.088 218.784c0 109.056-72.272 230.592-181.713 230.592h-9.104c-17.664 0-32 14.32-32 32s14.336 32 32 32v-.096c160-4.224 252.24-157.088 252.24-294.496c-.032-147.728-115.792-265.743-260.512-281.312zM646.337 775.47c-8.944-9.344-23.407-9.345-32.335-.001l-70.384 77.648V530.973c0-17.664-14.336-32-32-32s-32 14.336-32 32v322.432l-68.112-75.935c-8.944-9.344-23.44-11.344-32.368-2l-8.065 4.416c-8.944 9.376-8.944 24.48 0 33.823l115.504 127.744c.16.16.193.368.336.528l8.096 8.464c4.496 4.689 10.368 7.01 16.288 6.977c5.872.032 11.776-2.288 16.225-6.977l8.095-8.464c.16-.16.24-.335.368-.528L654.417 811.71c8.945-9.344 8.945-20.447 0-29.823z"
                  />
                </svg>
              </button>
            </div>
          </template>
          <TableComponent
            :fields="fields"
            :pages="pages"
            :items="items"
            :busy="busy"
            @page-changed="filter($event, currentFilter)"
          >
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
            <template #status="{ data }">
              <div>
                <div style="width: 9rem">
                  <button
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
                </div>
                <div>
                  <div
                    v-if="data.item.status === 'recieve specimen'"
                    style="width: 9rem"
                    class="
                      text-center text-capitalize text-12
                      btn btn-outline-info
                      pointer
                    "
                  >
                    {{ data.item.status }}
                  </div>
                  <div
                    v-if="data.item.status === 'fill result'"
                    style="width: 8rem"
                    class="
                      text-center text-capitalize text-12
                      btn btn-outline-info
                      pointer
                    "
                  >
                    {{ data.item.status }}
                  </div>
                  <div
                    v-if="data.item.status === 'awaiting approval'"
                    style="width: 9rem"
                    class="
                      text-center text-capitalize text-12
                      btn btn-outline-info
                      pointer
                    "
                  >
                    {{ data.item.status }}
                  </div>
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
          </TableComponent>
        </UtilsFilterComponent>
      </div>
    </div>
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
      downloading: false,
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
            return val.salutation + ' ' + val.firstname + ' ' + val.lastname
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
      ],
    }
  },
  methods: {
    async filter(page, e) {
      this.currentFilter = e
      try {
        this.busy = true
        const data = await this.$api.reports.laboratoryReport({ ...e, page })
        this.items = data.results
        this.pages = data.total_pages

        this.busy = false
      } catch (error) {
        console.log(error)
      } finally {
        this.busy = false
      }
    },
    async downloadEncLaboratory() {
      this.downloading = true
      const response = await fetch(
        `${process.env.BASE_URL}laboratory/?service_center=${this.currentFilter.service_center ? this.currentFilter.service_center :''}&lab_unit=${
          this.currentFilter.lab_unit ? this.currentFilter.lab_unit : ""
        }&status=${this.currentFilter.status ? this.currentFilter.status : ''}&asn=${
          this.currentFilter.asn ? this.currentFilter.asn : ""
        }&to_excel=${true}&approved_date_before=${
          this.currentFilter.approved_date_before ? this.currentFilter.approved_date_before : ''
        }&approved_date_before=${this.currentFilter.approved_date_before ? this.currentFilter.approved_date_before : ""}`,
        {
          headers: {
            Authorization: `Token ${this.$store.state.auth.token}`,
          },
        }
      )
      if (response.status === 200) {
        const data = await response.blob()
        const objectURL = URL.createObjectURL(data)
        const link = document.createElement('a')
        link.download = `Laboratory Report`
        link.href = objectURL
        this.downloading = false
        // this.filter(1)
        link.click()
      } else if (response.status === 403) {
        this.downloading = false
        this.$toast({
          type: 'info',
          text: `You don't have the permission to perform this action`,
        })
      } else {
        this.downloading = false
        this.$toast({
          type: 'error',
          text: `An error occured`,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>