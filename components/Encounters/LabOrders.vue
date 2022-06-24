<template>
    <div>
        <div class="pt-0 px-0 pb-0 mb-3">
            <div class="text-20 d-flex justify-content-between align-items-center">
                <h4 class="text-grey text-18">Lab Orders</h4>
                <div>
                    <button @click="newLabOrders" class="btn btn-outline-primary text-14">
                        New Lab Order
                    </button>
                </div>
            </div>
        </div>

        <div>
            <b-modal id="Add-laborder" title="Add Lab Order" centered hide-footer ref="orderModal" @hide="closeModal()">
                <!-- <div>
          <h4 class="text-20">Patient Details</h4>
          <hr />
        </div> -->
                <ValidationObserver v-slot="{ validate }">
                    <form class="mx-3">
                        <div class="mt-4">
                            <div class="w-100 d-flex flex-wrap">
                                <div class="mb-2 col-lg-6 pl-0 pr-2 col-md-6 col-sm-6 w-100">
                                    <small class="text-grey text-12">UHID</small>
                                    <div class="d-flex align-items-center">
                                        <input type="text" placeholder="UHID" class="
                        form-control
                        control
                        ng-untouched ng-pristine ng-valid
                      " v-model="patientData.uhid" />

                                        <div class="mx-2" v-if="searchingPatient">
                                            <b-spinner label="loading" variant="primary" type="grow"
                                                style="width: 1.5rem; height: 1.5rem" class="text-center">
                                            </b-spinner>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-2 col-lg-6 px-0 col-md-6 col-sm-6">
                                    <small class="text-grey text-12">Patient Details</small>

                                    <!-- <v-select
                    class="style-chooser text-grey text-14"
                    placeholder="Name"
                    :options="patients"
                    label="name| phone_number"
                  ></v-select> -->
                                    <input type="text" disabled placeholder="Patient Details" v-model="patientFullName"
                                        class="form-control ng-untouched ng-pristine ng-valid" />
                                </div>
                                <div class="mb-2 col-lg-6 pl-0 pr-2 col-md-6 col-sm-6">
                                    <small class="text-grey text-12">D.o.B</small>

                                    <input type="text" v-model="patientData.date_of_birth" disabled placeholder="D.O.B"
                                        class="form-control ng-untouched ng-pristine ng-valid" />
                                </div>
                                <div class="mb-2 col-lg-6 px-0 pl-0 col-md-6 col-sm-6">
                                    <small class="text-grey text-12">Age (Y-M-D)</small>
                                    <div class="d-flex">
                                        <div class="px-1">
                                            <input type="text" disabled placeholder="Year" v-model="year"
                                                class="form-control ng-untouched ng-pristine ng-valid" />
                                        </div>
                                        <div class="px-1">
                                            <input type="text" disabled placeholder="Month" v-model="month"
                                                class="form-control ng-untouched ng-pristine ng-valid" />
                                        </div>
                                        <div class="px-1">
                                            <input type="text" disabled placeholder="Day" v-model="day"
                                                class="form-control ng-untouched ng-pristine ng-valid" />
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-2 col-lg-6 pr-2 pl-0 col-md-6 col-sm-6">
                                    <small class="text-grey text-12">Email</small>

                                    <input type="text" placeholder="Recipient Email" v-model="provisionalEmail"
                                        class="form-control ng-untouched ng-pristine ng-valid" />
                                </div>

                                <div class="mb-2 col-lg-6 px-0 col-md-6 col-sm-6">
                                    <small class="text-grey text-12">Gender</small>
                                    <input type="text" disabled placeholder="Phone No." v-model="patientData.gender"
                                        class="form-control ng-untouched ng-pristine ng-valid" />
                                </div>

                                <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
                                    <small class="text-grey text-12">Sevice Center</small>
                                    <validation-provider rules="required" v-slot="{ errors }">
                                        <v-select class="style-chooser text-grey text-14" placeholder="Service centers"
                                            :options="serviceCenters" v-model="labOrderData.service_center"
                                            label="name"></v-select>
                                        <span class="text-12" style="color: red">{{
                                            errors[0]
                                            }}</span>
                                    </validation-provider>
                                </div>

                                <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
                                    <small class="text-grey text-12">Lab Panels</small>
                                    <validation-provider rules="required" v-slot="{ errors }">
                                        <v-select class="style-chooser text-grey text-14" placeholder="Lab Panels"
                                            :options="labPanels" v-model="labOrderData.lab_panels"
                                            :reduce="(name) => name.id" taggable multiple label="name">
                                        </v-select>
                                        <span class="text-12" style="color: red">{{
                                            errors[0]
                                            }}</span>
                                    </validation-provider>
                                </div>

                                <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12 text-14">
                                    <span class="text-grey"> stat</span>
                                    <input type="checkbox" v-model="labOrderData.stat" placeholder="Phone No."
                                        class="ng-untouched ng-pristine ng-valid" />
                                </div>
                                <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
                                    <small class="text-grey text-12">Comment </small>
                                    <textarea v-model="labOrderData.comments" cols="50" rows="5"
                                        placeholder="Type a comment..." class="
                      p-3
                      text-grey
                      form-control
                      ng-untouched ng-pristine ng-valid
                    "></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="my-3 d-flex justify-content-center">
                            <button @click.prevent="closeModal" class="btn btn-light text-grey mr-5 text-14"
                                style="height: 38px; width: 5rem; text-align: center">
                                Cancel
                            </button>
                            <button @click.prevent="createLabOrder" class="
                  btn
                  text-white text-14
                  mainbtndashboard
                  medbrownparagraph
                  theme-color
                " style="height: 38px; width: 5rem; text-align: center">
                                <span v-if="isbusy">
                                    <b-spinner label="loading" variant="primary" style="width: 1.5rem; height: 1.5rem"
                                        class="text-center">
                                    </b-spinner>
                                </span>
                                <span v-else>Save</span>
                            </button>
                        </div>
                        <div type="button" ref="runValidation" id="runValidation" @click="validate"></div>
                    </form>
                </ValidationObserver>
            </b-modal>
        </div>
        <table-component :paginate="true" :perPage="perPage" :busy="busy" :pages="pages" :items="itemsToShow"
            :totalItems="totalPages" :current-page="currentPage" :dropdownItem="dropdownItem"
            @page-changed="getPatientLabOrders($event)" :fields="fields">
            <!-- <template #actions="{ data }">
              <pre>{{ data }}</pre>
              <button
                class="btn btn-info"
                size="sm"
                @click="data.toggleDetails"
              >
                Details
              </button>
            </template> -->
            <template #row-details="{ data }">
                <!-- <pre>{{ data }}</pre> -->
                <b-card v-if="data.item.lab_panel_orders.length >
                0">

                    <div v-for="(panel, index) in data.item.lab_panel_orders" :key="index">
                        <!-- <pre>{{panel.panel}}</pre> -->
                        <Accordion :activeIndex="0">
                            <AccordionTab :header="panel.panel.name">
                                <p class="my-2 text-capitalize text-14 text-info">
                                    Status: {{ panel.status }}
                                </p>


                                <div class="mb-0 text-capitalize d-flex align-items-center text-14">
                                    <div class="text-14 text-info">
                                        Specimen-type: {{ panel.panel.specimen_type.name }}
                                    </div>

                                    <div style="
                          width: 1rem;
                          height: 1rem;
                          border-radius: 50%;
                          background: green;
                          border: 1px solid #727d71;
                        " :style="`background: ${panel.panel.specimen_type.color}`" class="first pointer ml-2"></div>
                                </div>

                                <div class="table_container table-responsive mt-2 pt-2">
                                    <table-component :paginate="false" :fields="nestedFields" :items="panel.panel.obv">
                                        <template #reference_range="{ data: { item } }">
                                            <div v-for="(seen, index) in item.reference_range" :key="index">
                                                <span>
                                                    {{ seen.name }}
                                                </span>
                                            </div>
                                        </template>
                                        <template #value="{ data: { item } }">
                                            <div>
                                                {{ item.value ? item.value : "No Value recorded" }}
                                            </div>
                                        </template>
                                    </table-component>
                                </div>
                                <p class="my-2 text-capitalize text-14 text-info">
                                    Comments: {{ panel.panel.comments }}
                                </p>
                            </AccordionTab>

                        </Accordion>

                    </div>
                </b-card>
            </template>
        </table-component>
    </div>
</template>

<script>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
export default {
    components: { Accordion, AccordionTab },
    data() {
        return {
            text: "",
            assertion: "",
            manageInput: "",
            labOrderPanel: {
                panel: {},
                status: "",
                lab_order: "",
            },
            pages: 0,
            modalTitle: "Order lab panel",
            commitPanel: {
                comments: "",
                obv: [],
            },
            orderPanels: {
                status: "",
                lab_order: "",
                panels: [],
            },
            provisionalEmail: '',
            cancelStatus: "cancelled",
            showOptions: false,
            isbusy: false,
            isbusy2: false,
            busy: false,
            searchingPatient: false,
            clue: false,
            clue2: false,
            // page: 1,
            perpage: 12,
            enabled: false,
            searchParam: {
                status: "NEW",
            },
            genders: [],
            clinics: [],
            providers: [],
            serviceCenters: [],
            labUnits: [],
            labPanels: [],
            mutatedPanels: [],

            currentPage: 1,
            itemsToShow: [],
            labOrderData: {
                patient: {},
                stat: false,
                service_center: null,
                lab_panels: [],
                comments: "",
            },
            year: "",
            month: "",
            day: "",
            patientDetails: "Type UHID to search...",
            nestedFields: [
                { key: "name", label: "Observations", sortable: true },
                { key: "uom", label: "Unit", sortable: true },
                { key: "value", label: "Value", sortable: true },

                { key: "reference_range", label: "Reference Range", sortable: true },
            ],
            fields: [
                { key: "asn", label: "ASN No.", sortable: true },
                { key: "ordered_datetime", label: "Order Date", sortable: true },

                { key: "actions", label: "Info", sortable: false },
            ],
            test: "",
        };
    },
    props: {
        patientData: {
            type: String,
            default: {}
        }
    },
    mounted() {
        // this.getLabOrders();
        // this.getPatientRecord();
    },
    computed: {
        rows() {
            return this.itemsToShow.length;
        },
    },
    props: {
        patientData: {
            type: Object,
            default: {},
        },
    },
    watch: {
        test() {
            let conv = "hdjj";
            conv.toUpperCase();
        },
        "labOrderData.lab_panels": {
            handler() {
                console.log(this.labOrderData.lab_panels);
                this.mutatedPanels = [];
                for (const iterator of this.labOrderData.lab_panels) {
                    this.labPanels.filter((el) => {
                        if (el.id === iterator) {
                            this.mutatedPanels.push(el);
                        }
                    });
                }
            },
        },
    },
    methods: {
        enableButton() {
            this.enabled = !this.enabled;
        },

        resetModal() {
            this.test = "";
            this.patientDetails = "";
            this.year = "";
            this.month = "";
            this.day = "";
            this.labOrderData = {
                patient: {},
                stat: false,
                service_center: null,
                lab_panels: [],
                comments: "",
            };
        },

        newLabOrders() {
            this.$bvModal.show("Add-laborder");
            this.getServiceCenter();
            this.getLabPanels();
            this.patientFullName =
                this.patientData.firstname + " " + this.patientData.lastname;
            this.calcAge(this.patientData.date_of_birth);
            if (this.patientData.email) {
                this.provisionalEmail = this.patientData.email
           }
        },
        // async getPatientLabOrder() {
        //   try {
        //     this.searchingPatient = true;
        //     this.patientDetails = "Searching...";
        //     let response = await this.$axios.$get(
        //       `patient/patients/?uhid=${this.test}`,
        //       {
        //         headers: {
        //           Authorization: `Token ${localStorage.getItem(`HEALTH-TOKEN`)}`,
        //         },
        //       }
        //     );

        //     for (const iterator of response.results) {
        //       this.patientDetails =
        //         iterator.firstname + " " + iterator.lastname
        //           ? iterator.firstname + " " + iterator.lastname
        //           : "No matching record";

        //       this.patientData = iterator;
        //     }
        //     if (response.results < 1) {
        //       this.patientData = {};
        //       this.patientDetails = "No matching records...";
        //       (this.year = ""), (this.month = ""), (this.day = "");
        //       this.labOrderData.patient = {};
        //     }
        //     this.labOrderData.patient = this.patientData;
        //     this.calcAge(this.patientData.date_of_birth);
        //     this.searchingPatient = false;
        //   } catch {
        //   } finally {
        //     this.searchingPatient = false;
        //   }
        // },

        closeModal() {
            this.$bvModal.hide("Add-laborder");

            this.patientDetails = "";
            this.test = "";
            (this.labOrderData = {
                patient: {},
                stat: true,
                service_center: null,
                lab_panels: [],
                comments: "",
            }),
                (this.year = ""),
                (this.month = ""),
                (this.day = "");
        },

        async savePanelOrder() {
            if (this.$refs.runValidation) {
                this.$refs.runValidation.click();
            }
            this.commitPanel.obv = this.labOrderPanel.panel.obv;
            if (this.commitPanel.obv.length > 0) {
                try {
                    this.isbusy = true;
                    let response = await this.$axios.$put(
                        `laboratory/lab_panel_order/${this.labOrderPanel.id}/panel`,
                        this.commitPanel,
                        {
                            headers: {
                                Authorization: `Token ${localStorage.getItem(`HEALTH-TOKEN`)}`,
                            },
                        }
                    );

                    this.setStatusToAwaitingApproval();

                    this.$toast({
                        type: 'success',
                        text: 'Laborder added',
                    })
                    this.getLabOrders();
                    this.cancelPanelOrder();
                } catch {
                    this.$toast({
                        type: 'error',
                        text: 'Unable to create lab panel order',
                    })
                   
                } finally {
                    // this.getEncounters();
                    this.isbusy = false;
                }
            }
        },

        cancelRequestModal(e) {
            console.log(e);
            this.labOrderPanel.id = e.id;
            this.assertion = e.asn;
            this.$bvModal.show("cancelRequest");
        },
        closeCancelModal() {
            this.$bvModal.hide("cancelRequest");
        },
        

        async createLabOrder() {
            if (this.$refs.runValidation) {
                this.$refs.runValidation.click();
            }
            this.patientData.email = this.provisionalEmail 
            this.labOrderData.patient = this.patientData;
            if (this.labOrderData.lab_panels && this.labOrderData.service_center) {
                try {
                    this.isbusy = true;
                    let response = await this.$axios.$post(
                        "laboratory/lab_order/",
                        this.labOrderData,
                        {
                            headers: {
                                Authorization: `Token ${localStorage.getItem(`HEALTH-TOKEN`)}`,
                            },
                        }
                    );
                    this.$toast({
                        type: 'success',
                        text: 'Lab order created',
                    })
                    this.getLabOrders();
                    this.closeModal();
                } catch {
                    this.$toast({
                        type: 'error',
                        text: 'Unable to create lab order',
                    })
                   
                } finally {
                    // this.getEncounters();
                    this.isbusy = false;
                }
            }
        },

        openEditPanel(e) {
            this.$bvModal.show("Edit-laborder");

            for (const iterator of e.panel.obv) {
                if (iterator.type.name === "Options") {
                    this.showOptions = true;
                } else {
                    this.showOptions = false;
                }
                if (
                    iterator.type.name === "Integer" ||
                    iterator.type.name === "Float" ||
                    iterator.type.name === "Text"
                ) {
                    this.text = iterator.type.name;
                }
                if (
                    iterator.type.name === "Integer" ||
                    iterator.type.name === "Float"
                ) {
                    this.manageInput = "number";
                } else {
                    this.manageInput = "text";
                }
            }

            this.labOrderPanel.lab_order = e.lab_order;
            this.labOrderPanel.panel = e.panel;
            this.labOrderPanel.status = e.stats;
            this.labOrderPanel.asn = e.asn;
            this.labOrderPanel.id = e.id;
            this.labOrderPanel.current_status = e.current_status;
            console.log(e);
        },
        cancelPanelOrder() {
            this.$bvModal.hide("Edit-laborder");
        },

        async getLabOrders(page = 1) {
            try {
                this.busy = true;
                let uri = `laboratory/lab_order/?page=${page}&patient_uhid=${this.patientData.uhid}`;

                console.log(uri);

                const response = await this.$axios.$get(uri, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem(`HEALTH-TOKEN`)}`,
                    },
                });

                this.pages = response.total_pages;

                console.log(response.results);
                this.totalPages = response.total_pages;

                this.itemsToShow = [];

                for (const iterator of response.results) {
                    let name =
                        iterator.patient.firstname + " " + iterator.patient.lastname;
                    let no_ = iterator.patient.phone_number;
                    let uhid = iterator.patient.uhid;
                    let time = iterator.ordered_datetime;
                    let y = new Date(time).toLocaleDateString();
                    let z = new Date(time).toTimeString().substring(0, 5);
                    let b = y + ", " + z;

                    let labunit;

                    //   for (const iterator of iterator.lab_panel_orders) {
                    //     labunit = iterator.lab_panel_orders.panel.lab_unit.name;
                    //   }

                    this.itemsToShow.push({
                        patient_name: name,
                        phone_number: no_,
                        uhid: uhid,
                        asn: iterator.asn,
                        stat: iterator.stat,
                        lab_panel_orders: iterator.lab_panel_orders,
                        patient: iterator.patient,
                        service_center: iterator.service_center,
                        ordered_datetime: iterator.ordered_datetime,
                        comments: iterator.comments,
                        ordered_datetime: b,
                    });
                }

                // this.itemsToShow = response.results;
            } catch (error) {
                console.log(error);
            } finally {
                this.busy = false;
            }
        },
        clearSearchParams() {
            this.searchParam.status = null;
        },

        async getServiceCenter() {
            if (this.serviceCenters.length < 1) {
                try {
                    this.clue = true;
                    let uri = `laboratory/service_center/?size=100`;

                    const response = await this.$axios.$get(uri, );

                    this.serviceCenters = response.results;
                    this.clue = false;
                } catch (error) {
                    console.log(error);
                } finally {
                }
            }
        },
        async getLabUnit() {
            if (this.labUnits.length < 1) {
                try {
                    this.clue2 = true;

                    let uri = `laboratory/lab_unit/?size=100`;

                    const response = await this.$axios.$get(uri, );

                    this.labUnits = response.results;
                    this.clue2 = false;
                } catch (error) {
                    console.log(error);
                } finally {
                    this.busy = false;
                }
            }
        },

        async getLabPanels() {
            try {
                let uri = `/laboratory/lab_panel/?size=100`;

                const response = await this.$axios.$get(uri);

                this.labPanels = [];
                let temp = [];
                for (const iterator of response.results) {
                    let time = iterator.created_at;
                    let y = new Date(time).toLocaleDateString();
                    let z = new Date(time).toTimeString().substring(0, 5);
                    let b = y + ", " + z;
                    this.labPanels.push({
                        name: iterator.name,
                        // obv: iterator.obv,
                        // created_at: b,
                        // specimen_type: iterator.specimen_type,
                        // lab_unit: iterator.lab_unit,
                        // active: true,
                        id: iterator.id,
                    });
                }

                this.busy = false;
            } catch (error) {
                console.log(error);
            } finally {
            }
        },

        calcAge(e) {
            // **********calc year***********
            let presentDate = new Date().getFullYear();
            let yearOfBirth = e.substring(0, 4);

            let diff = presentDate - yearOfBirth;
            let x = parseInt(diff);
            if (x === 0) {
                this.year = 0;
                this.month = 0;
            } else {
                this.year = x;
            }

            if (monthOfBirth < month) {
                this.year;
            } else {
                if (this.year === 0) {
                    this.year;
                } else {
                    this.year--;
                }
            }

            // **************calc month***********
            let tempMonth;
            let month = new Date().getMonth();
            let monthOfBirth = parseInt(e.substring(5, 7));
            // tempMonth = monthOfBirth - month
            if (presentDate === yearOfBirth) {
                this.patient.age.month = 0;
            } else {
                tempMonth = 12 - monthOfBirth;
            }

            if (monthOfBirth <= month) {
                this.month = month - monthOfBirth;
                // this.patient.age.month + 1;
            } else if (month + 1 === monthOfBirth) {
                this.month = 0;
            } else {
                this.month = tempMonth + month;
                // this.patient.age.month + 1;
            }

            // **************calc day**************
            let day = new Date().getDate();
            let dayOfBirth = e.substring(8, 10);
            // this.patient.age.day = new Date().getDate();

            if (day > dayOfBirth) {
                this.day = day - dayOfBirth;
            } else if (day === dayOfBirth) {
                this.day = 0;
            } else {
                this.day = day;
            }

            // *********************************
        },
    },
};
</script>

<style scoped>
.border_grey {
    border: 1px solid #414850;
    cursor: pointer;
    border-radius: 3px;
}

.border_grey:hover {
    background: #414850;
    color: #fff;
}

.control {
    text-transform: uppercase;
}
</style>