<template>
    <div>
        <div class="text-20 d-flex justify-content-between align-items-center mb-3">
            <h4>Lab worklist</h4>
            <div>
                <BaseButton class="btn-outline-primary" @click="newLabOrders">New Lab Order
                </BaseButton>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <DashboardLabWorklistFilter @filters="getLabOrders(1, $event)" />
            </div>
        </div>

        <div class="mt-3">
            <UtilsFilterComponent disable-pagination :disable-visualization="true" search-placeholder="Search">
                <TableComponent :fields="fields" :pages="pages" :items="itemsToShow" :busy="busy"
                    @page-changed="getLabOrders($event, currentFilter)">
                    <template #status="{ data }">
                        <div>
                            <!-- @click="openSpecimenTaken(data.item)" -->
                            <div v-if="data.item.status === 'NEW'" style="width: 8rem" class="
                text-center text-capitalize text-12
                btn btn-outline-info
                pointer
              ">
                                {{
                                data.item.status === "NEW"
                                ? "take specimen" : data.item.status
                                }}
                            </div>
                            <div>

                                <!-- @click="openFillResult(data.item)" -->
                                <div v-if="data.item.status === 'recieve specimen'" style="width: 8rem" class="
                  text-center text-capitalize text-12
                  btn btn-outline-info
                  pointer
                ">
                                    {{ data.item.status }}
                                </div>
                                <!-- @click="openEditPanel(data.item)" -->
                                <div v-if="data.item.current_status === 'fill result'" style="width: 8rem" class="
                  text-center text-capitalize text-12
                  btn btn-outline-info
                  pointer
                ">
                                    {{ data.item.status }}
                                </div>
                                <div v-if="data.item.status === 'awaiting approval'"
                                    @click="setStatusToApproved(data.item)" style="width: 9rem" class="
                    text-center text-capitalize text-12
                    btn btn-outline-info
                    pointer
                ">
                                    {{ data.item.status }}
                                </div>
                                <div v-if="data.item.status === 'approved'">
                                    <!-- @click="save_file(data.item)" -->
                                    <div class="d-flex">
                                        <span style="width: 3rem" class="
                    text-center text-capitalize text-12
                    text-info
                    pointer
                    ">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"
                                                width="24" height="24" preserveAspectRatio="xMidYMid meet"
                                                viewBox="0 0 20 20">
                                                <path fill="currentColor"
                                                    d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V5h.5A2.5 2.5 0 0 1 18 7.5v5a1.5 1.5 0 0 1-1.5 1.5H15v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 15.5V14H3.5A1.5 1.5 0 0 1 2 12.5v-5A2.5 2.5 0 0 1 4.5 5H5v-.5Zm9 0a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V5h8v-.5Zm-8 7v4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5Z" />
                                            </svg>
                                        </span>

                                    </div>

                                </div>
                                <div v-if="data.item.status === 'cancelled'" style="width: 8rem" class="
                                text-center text-capitalize text-12
                                btn btn-outline-info
                                pointer
                                ">
                                    {{ data.item.status }}
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #panel="{ data }">
                        <div style="
                        width: 2rem;
                        height: 1.9rem;
                        border-radius: 50%;
                        background: green;
                        border: 1px solid #727d71;
                        " :style="`background: ${data.item.panel.specimen_type.color}`" class="first pointer"></div>
                    </template>
                    <template #cancel="{ data }">
                        <div>
                            <!-- @click="cancelRequestModal(data.item)" -->
                            <div style="width: 6rem" class="text-center text-12 pointer btn btn-outline-danger">
                                Cancel
                            </div>
                        </div>

                    </template>
                </TableComponent>
            </UtilsFilterComponent>
        </div>
    </div>
</template>

<script>
import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun'
export default {
    mixins: [TableFunc],
    data() {
        
        return {
            currentFilter: {},
            itemsToShow: [],
            fields: [
                { key: 'asn', label: 'ASN', sortable: true },
                {
                    key: 'created_at',
                    label: 'Order date',
                    sortable: true,
                    formatter: (value) => {
                        return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
                    },
                },
                {
                    key: 'patient',
                    label: 'Patient',
                    sortable: true,
                    formatter: (val) => {
                        return val.salutation + ' ' + val.firstname + ' ' + val.lastname
                    },
                },
                { key: 'patient.uhid', label: 'UHID', sortable: true },
                {
                    key: 'panel.name',
                    label: 'Panel Name',
                    sortable: true,
                },
                { key: 'panel', label: 'Specimen Type', sortable: true },
                
                { key: 'status', label: 'Status', sortable: true },
                { key: 'cancel', label: '', sortable: false },
            ],
        }
    },
    mounted() {
        this.getLabOrders()  
    },
    methods: {
        async getLabOrders(page, e) {
            this.currentFilter = e
            try {
                this.busy = true;
                const data = await this.$api.laborder.getLabOrders({ ...e, page})
                this.itemsToShow = data.results
                this.pages = data.total_pages
            } catch (error){}
            finally {
                this.busy = false;
            }
        },
    }

}
</script>

<style>

</style>