<template>
    <div>
        <ValidationObserver ref="form">
            <div class="py-3" v-for="(section, index) in template.content" :key="index">
                <div>
                    <h3 class="text-18 mb-3 text-underline">{{ section.section }}</h3>
                </div>

                <div class="d-flex flex-wrap align-items-start">
                    <div :class="section.cols.length === 1 ? 'col-md-12 ' : section.cols.length === 2 ? 'col-md-6' : section.cols.length === 3 || section.cols.length > 3 ? 'col-md-4' : ''"
                        v-for="(col, colIndex) in section.cols" :key="colIndex">
                        <h3 class="text-16 text-grey">{{ col.header }}</h3>
                        <div class="">
                            <div class="" v-for="(field, fieldIndex) in col.form_field" :key="fieldIndex">
                                <p class="text-14 py-2">{{ field.context }}</p>
                                <div class="" v-if="field.type === 'text'">
                                    <div class="">
                                        <ValidationProviderWrapper name="" :rules="[]">
                                            <input v-model="field.options" class="input-special" type="text">
                                        </ValidationProviderWrapper>
                                    </div>
                                </div>

                                <div class="" v-if="field.type == 'dropdown'">
                                    <div class="py-2">
                                        <ValidationProviderWrapper name="" :rules="[]">
                                            <v-select v-model="field.selected" class="style-chooser text-grey text-14"
                                                placeholder="Select" :reduce="(opt) => opt.value"
                                                :options="field.options" label="value">
                                            </v-select>
                                        </ValidationProviderWrapper>
                                    </div>
                                </div>

                                <div v-if="field.type == 'date'">
                                    <div class="">
                                        <ValidationProviderWrapper name="" :rules="[]">
                                            <input v-model="field.options" class="form-control" type="date">
                                        </ValidationProviderWrapper>
                                    </div>
                                </div>

                                <div v-if="field.type == 'text-area'">
                                    <div class="">
                                        <ValidationProviderWrapper name="" :rules="[]">
                                            <textarea v-model="field.options" rows="10" col="10"
                                                class="form-control"></textarea>
                                        </ValidationProviderWrapper>
                                    </div>
                                </div>

                                <div class="d-flex py-2" v-if="field.type == 'checkbox'">
                                    <div class="px-2">
                                        <ValidationProviderWrapper name="" :rules="[]">
                                            <b-form-checkbox v-model="field.options" size="lg" switch>
                                            </b-form-checkbox>
                                        </ValidationProviderWrapper>
                                    </div>
                                </div>

                                <!-- ORDERS -->

                                <div class="py-2" v-if="field.type == 'diagnosis'">
                                    <div class="d-flex">

                                        <button @click.prevent="openDiagnosis" class="btn btn-primary">
                                            <span class="text-capitalize">
                                                {{ `Add ${field.type}` }}
                                            </span>
                                        </button>
                                        <div class="col-md-10 pr-0">
                                            <ValidationProviderWrapper name="" :rules="[]">
                                                <v-select class="style-chooser text-grey text-14" :no-drop="true"
                                                    :multiple="true" v-model="diagList" placeholder="Diagnosis list"
                                                    :options="[]" label="case">
                                                </v-select>
                                            </ValidationProviderWrapper>
                                        </div>
                                    </div>
                                    <hr>
                                </div>

                                <div v-if="field.type == 'lab_Order'" class="py-2" v-show="field.type == 'lab_Order'">
                                    <div class="row">
                                        <div class="col-md-6 mb-2">
                                            <ValidationProviderWrapper name="Services Center" :rules="['']">
                                                <VSelect v-model="labObject.service_center"
                                                    :options="lab_serviceCenters" label="name"></VSelect>
                                            </ValidationProviderWrapper>
                                        </div>

                                        <div class="col-md-6 mb-2">
                                            <ValidationProviderWrapper name="Lab Panel" :rules="['']">
                                                <VSelect v-model="labObject.lab_panels" :reduce="(opt) => opt.id"
                                                    :multiple="true" label="name" :options="labPanels"></VSelect>
                                            </ValidationProviderWrapper>
                                        </div>

                                        <div class="col-md-6 mb-2">
                                            <ValidationProviderWrapper name="Stat" :rules="[]">
                                                <input v-model="labObject.stat" id="" type="checkbox" name="" />
                                            </ValidationProviderWrapper>
                                        </div>

                                        <div class="col-md-12 mb-2">
                                            <ValidationProviderWrapper name="Comment" :rules="[]">
                                                <textarea v-model="labObject.comments" cols="30" rows="5"
                                                    class="form-control"></textarea>
                                            </ValidationProviderWrapper>
                                        </div>
                                    </div>
                                    <hr>
                                </div>

                                <div v-if="field.type == 'imaging'" class="py-2" v-show="field.type == 'imaging'">
                                    <div class="row">
                                        <div class="col-md-6 mb-2">
                                            <ValidationProviderWrapper name="Service Center" :rules="['']">
                                                <VSelect v-model="imagingObject.service_center"
                                                    :reduce="(opt) => opt.id" :options="service_centers" label="name">
                                                </VSelect>
                                            </ValidationProviderWrapper>
                                        </div>

                                        <div class="col-md-6 mb-2">
                                            <ValidationProviderWrapper name="Observations" :rules="['']">
                                                <VSelect v-model="imagingObject.img_obv" :reduce="(opt) => opt.id"
                                                    :multiple="true" :options="observations" label="name">
                                                </VSelect>
                                            </ValidationProviderWrapper>
                                        </div>

                                        <div class="col-md-12 mb-2">
                                            <div class="mb-1">
                                                <ValidationProviderWrapper name="Diagnosis" :rules="['']">
                                                    <VSelect v-model="imagingObject.diagnosis" label="case" multiple
                                                        taggable @open="showModal" :noDrop="true" :closeOnSelect="true">
                                                    </VSelect>
                                                </ValidationProviderWrapper>
                                            </div>
                                        </div>

                                        <!-- <div class="col-md-6 mb-2">
                                            <ValidationProviderWrapper name="Order Physician" :rules="[]">
                                                <input :value="user" type="text" class="form-control" />
                                            </ValidationProviderWrapper>
                                        </div> -->

                                        <div class="col-md-12 mb-2">
                                            <ValidationProviderWrapper name="Referral Facility" :rules="[]">
                                                <input v-model="imagingObject.referral_facility" type="text"
                                                    class="form-control" />
                                            </ValidationProviderWrapper>
                                        </div>

                                        <div class="col-md-12 mb-2">
                                            <ValidationProviderWrapper name="stat" :rules="[]">
                                                <input v-model="imagingObject.stat" id="" type="checkbox" name="" />
                                            </ValidationProviderWrapper>
                                        </div>

                                        <div class="col-md-12 mb-2">
                                            <ValidationProviderWrapper name="Comments" :rules="['']">
                                                <textarea v-model="imagingObject.comments" id="" class="form-control"
                                                    name="" cols="30" rows="5"></textarea>
                                            </ValidationProviderWrapper>
                                        </div>
                                    </div>
                                    <hr>
                                </div>

                                <div v-if="field.type == 'prescription'" class="py-2"
                                    v-show="field.type == 'prescription'">
                                    <div class="row">
                                        <div class="col-md-12 mb-2">
                                            <ValidationProviderWrapper name="Store" :rules="['']">
                                                <VSelect v-model="prescriptionObject.store" :options="stores"
                                                    :reduce="(opt) => opt.id" label="name">
                                                </VSelect>
                                            </ValidationProviderWrapper>
                                        </div>

                                        <div class="col-md-12 mb-2">
                                            <ValidationProviderWrapper name="Prescribing Physician" :rules="[]">
                                                <input :value="user" type="text" class="form-control" />
                                            </ValidationProviderWrapper>
                                        </div>

                                        <div class="col-md-12 d-flex ml-0 text-primary text-14">
                                            <span class="point" @click="addDrug">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                                    <path fill="currentColor"
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                                </svg>
                                                Add
                                            </span>
                                        </div>

                                        <div v-for="(drug, index) in prescriptionObject.details" :key="index"
                                            class="row p-1 mt-2 mx-2 border border-secondary rounded">
                                            <div class="
                                                col-md-12
                                                d-flex
                                                justify-content-end
                                                ml-0
                                                text-danger text-14
                                                ">
                                                <span class="point float" @click="deleteDrug(index)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                        <path fill="currentColor"
                                                            d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div class="col-md-12 mb-2">
                                                <ValidationProviderWrapper name="Medication" :rules="['']">
                                                    <VSelect @option:selected="fetchOPtions($event, index)"
                                                        @option:deselected="getGenericDrugs" v-model="drug.generic_drug"
                                                        :options="generic_drug" :reduce="(opt) => opt.id" label="name">
                                                    </VSelect>
                                                </ValidationProviderWrapper>
                                            </div>
                                            <!-- <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="SIG" :rules="['']">
                <input :value="sigFormatter(drug.direction, drug.duration)" type="text" class="form-control" />
              </ValidationProviderWrapper>
            </div> -->

                                            <div class="col-md-3 mb-2">
                                                <ValidationProviderWrapper name="Dose" :rules="['']">
                                                    <VSelect v-model="drug.dose" :options="doses" :reduce="(opt) => opt"
                                                        label="name">
                                                    </VSelect>
                                                </ValidationProviderWrapper>
                                            </div>
                                            <div class="col-md-3 mb-2">
                                                <ValidationProviderWrapper name="Unit" :rules="['']">
                                                    <VSelect v-model="drug.unit" :options="units"
                                                        :reduce="(opt) => opt.id" label="name">
                                                    </VSelect>
                                                </ValidationProviderWrapper>
                                            </div>
                                            <div class="col-md-3 mb-2">
                                                <ValidationProviderWrapper name="Frequency" :rules="['']">
                                                    <VSelect v-model="drug.frequency" :options="frequencies"
                                                        :reduce="(opt) => opt" label="name">
                                                    </VSelect>
                                                </ValidationProviderWrapper>
                                            </div>

                                            <div class="col-md-3 mb-2">
                                                <ValidationProviderWrapper name="Duration" :rules="['']">
                                                    <VSelect :reduce="(opt) => opt" v-model="drug.duration"
                                                        :options="durations" label="name">
                                                    </VSelect>
                                                </ValidationProviderWrapper>
                                            </div>

                                            <div class="col-md-6 mb-2">
                                                <ValidationProviderWrapper name="Direction" :rules="['']">
                                                    <VSelect :reduce="(opt) => opt.id" v-model="drug.direction"
                                                        :options="directions" label="name">
                                                    </VSelect>
                                                </ValidationProviderWrapper>
                                            </div>

                                            <div class="col-md-6 mb-2">
                                                <ValidationProviderWrapper name="Route" :rules="['']">
                                                    <VSelect v-model="drug.route" :options="routes"
                                                        :reduce="(opt) => opt.id" label="name">
                                                    </VSelect>
                                                </ValidationProviderWrapper>
                                            </div>
                                            <div class="col-md-6 mb-2">
                                                <ValidationProviderWrapper name="Product" :rules="['']">
                                                    <VSelect v-model="drug.product" :options="products"
                                                        :reduce="(opt) => opt" label="name">
                                                    </VSelect>
                                                </ValidationProviderWrapper>
                                            </div>
                                            <div class="col-md-6 mb-2">
                                                <ValidationProviderWrapper name="Dispense quantity" :rules="[]">
                                                    <input
                                                        :value="productLogic(drug.dose, drug.frequency, drug.duration, drug.product)"
                                                        type="number" class="form-control" />
                                                </ValidationProviderWrapper>
                                            </div>
                                            <!-- <div v-if="drug.product" class="col-md-12 mb-2">
                                                <div class="d-flex justify-content-end align-items-center">
                                                    <div class="col-md-6 text-14 text-info text-center">
                                                        Bottle(s)
                                                    </div>
                                                </div>
                                            </div> -->

                                            <div class="col-md-12 mb-2">
                                                <ValidationProviderWrapper name="Notes" :rules="['']">
                                                    <textarea id="" v-model="drug.note" class="form-control" name=""
                                                        cols="30" rows="2"></textarea>
                                                </ValidationProviderWrapper>
                                            </div>
                                        </div>

                                        <div
                                            class="col-md-12 d-flex justify-content-end ml-0 text-primary text-14 pt-2">
                                            <span class="point" @click="addDrug">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                                    <path fill="currentColor"
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                                </svg>
                                                Add
                                            </span>
                                        </div>
                                    </div>
                                    <hr>
                                </div>

                                <div v-if="field.type == 'nursing'" class="py-2" v-show="field.type == 'nursing'">
                                    <div class="row">
                                        <div class="col-md-12 mb-2">
                                            <ValidationProviderWrapper name="Nursing station" :rules="['']">
                                                <VSelect v-model="nursingObject.station" :options="stations"
                                                    :reduce="(opt) => opt.id" label="name">
                                                </VSelect>
                                            </ValidationProviderWrapper>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <ValidationProviderWrapper name="Description" :rules="['']">
                                                <textarea id="" v-model="nursingObject.description" class="form-control"
                                                    name="" cols="30" rows="4"></textarea>
                                            </ValidationProviderWrapper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr>
            </div>
        </ValidationObserver>

        <div class="d-flex justify-content-end">
            <button @click.prevent="saveEncounter" class="btn btn-outline-primary btn-lg">Save chart</button>
        </div>

        <!-- <div>
            <button @click="$emit('routeTopage')" class="btn btn-outline-primary">Test</button>
        </div> -->
        <div>
            <DashboardModalImagingDiagnosis @diagnosis="setImagingDiagnosis" @change="helloWorld"
                :selectedDiagnosis="selected" />
        </div>

        <div>
            <DashboardModalICD10Modal @page-changed="getICD10($event, searchParam)" @incomingDiagnosis="Diag"
                @diagnosis="setDiagnosis" :selectedDiagnosis="diagList" @searchParam="searchByString" :pages="pages"
                :index="role" :options="icdTernCollection" @refresh="getICD10(1, searchParam)"
                :consultationData="consultationData" />
        </div>
    </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun'
// import utilityFunc from '~/mixins/utilityFunc'
import { debounce } from 'lodash'
export default {
    props: {
        template: {
            type: Object,
            required: true
        },
        consultationData: {
            type: Object,
            required: true
        },
        session: {
            type: Number,
            required: false
        },
    },
    mixins: [TableFunc],
    data() {
        return {
            info: {
                name: ''
            },
            selected: [],
            service_centers: [],
            lab_serviceCenters: [],
            stations: [],
            labPanels: [],
            observations: [],
            icdTernCollection: [],
            diagList: [],
            present: false,
            stores: [],
            generic_drug: [],
            doses: [],
            units: [],
            frequencies: [],
            durations: [],
            directions: [],
            routes: [],
            products: [],
            role: 0,
            searchParam: {
                size: 10,
                search: '',
                type: 'icd10',
            },
            nursingObject: {
                description: '',
                patient: {},
                station: null,
            },
            labObject: {
                service_center: null,
                lab_panels: [],
                patient: {},
                comments: '',
                stat: false,
            },
            imagingObject: {
                img_obv: [],
                diagnosis: [],
                ordering_physician: '',
                referral_facility: '',
                comments: '',
                service_center: null,
                patient: {},
                stat: false,
            },
            prescriptionObject: {
                details: [
                    {
                        generic_drug: null,
                        product: null,
                        dose: null,
                        unit: null,
                        route: null,
                        frequency: null,
                        direction: null,
                        duration: null,
                        dispense_quantity: 1,
                        status: 'FULFILLED IN',
                        note: ''
                    },
                ],
                patient: {},
                source: "OPD",
                prescribing_physician: '',
                store: null,
            },

            orders: {
                laboratory: null,
                imaging: null,
                prescription: null,
                nursing: null
            },
        }
    },

    mounted() {
        this.getData()
        this.template.diagnosis = []
    },
    computed: {
        user() {
            return this.$store.state.auth.user.first_name +
                ' ' +
                this.$store.state.auth.user.last_name
        }
    },

    methods: {
        uploadFile() {
            if (this.$refs.fileInput) {
                const uploadField = this.$refs.fileInput[0]
                uploadField.click()
            }
        },

        async saveEncounter() {
            if (this.template.id || this.template.created_at || this.template.created_by || this.template.updated_at || this.template.updated_by) {
                delete this.template.id
                delete this.template.created_at
                delete this.template.created_by
                delete this.template.updated_at
                delete this.template.updated_by
            }
            let panel = this.labPanels
            let observations = this.observations
            let drug_lines = this.prescriptionObject

            //Patch prescription lines

            if (drug_lines.store !== null && drug_lines.details[0].generic_drug !== null) {
                for (let z = 0; z < drug_lines.details.length; z++) {
                    let temp_product = drug_lines.details[z].product.id
                    let temp_dose = drug_lines.details[z].dose.id
                    let temp_duration = drug_lines.details[z].duration.id
                    let temp_frequency = drug_lines.details[z].frequency.id

                    drug_lines.details[z].product = temp_product
                    drug_lines.details[z].dose = temp_dose
                    drug_lines.details[z].duration = temp_duration
                    drug_lines.details[z].frequency = temp_frequency
                }
            }

            //Helper functions to append copy to chart

            const tray = []
            for (let x = 0; x < this.labObject.lab_panels.length; x++) {
                for (let y = 0; y < panel.length; y++) {
                    if (this.labObject.lab_panels[x] === panel[y].id) {
                        tray.push(panel[y])
                    }
                }
            }
            const imgtray = []
            for (let x = 0; x < this.imagingObject.img_obv.length; x++) {
                for (let y = 0; y < observations.length; y++) {
                    if (this.imagingObject.img_obv[x] === observations[y].id) {
                        imgtray.push(observations[y])
                    }
                }
            }

            //Append laborder object

            if (this.labObject.lab_panels.length > 0 && this.labObject.service_center !== null)
                this.orders.laboratory = this.labObject

            //Append imaging object

            if (this.imagingObject.img_obv.length > 0 && this.imagingObject.service_center !== null)
                this.orders.imaging = this.imagingObject
            //Append prescription object

            if (this.prescriptionObject.store !== null)
                this.orders.prescription = this.prescriptionObject
            //Append nursing object

            if (this.nursingObject.station !== null && this.nursingObject.description !== '')
                this.orders.nursing = this.nursingObject

            const appendOrders = this.orders
            this.template.orders = this.orders

            for (let x = 0; x < this.template.content.length; x++) {
                let temp = this.template.content[x]

                for (let y = 0; y < temp.cols.length; y++) {
                    let cols = temp.cols[y]

                    for (let z = 0; z < cols.form_field.length; z++) {
                        let option = cols.form_field[z]

                        if (option.type === 'lab_Order' || option.type === 'imaging' || option.type === 'prescription' || option.type === 'nursing' || option.type === 'diagnosis') {

                            this.template.content[x].cols[y].orders = appendOrders
                            // this.template.content[x].cols[y].orders.laboratory.lab_list = tray
                            if (option.type === 'lab_order' && this.template.content[x].cols[y].orders.laboratory && tray.length > 0) {
                                this.template.content[x].cols[y].orders.laboratory.lab_list = tray
                            }
                            if (option.type === 'imaging' && this.template.content[x].cols[y].orders.imaging && imgtray.length > 0) {
                                this.template.content[x].cols[y].orders.imaging.img_list = imgtray
                            }
                        }
                    }
                }
            }

            // console.log(this.template)

            if (await this.$refs.form.validate()) {
                let response = this.$api.encounter.saveChartTemplate(this.template, this.consultationData.id)
                if (response) {
                    this.$emit('routeTopage', this.session)
                    this.$toast({
                        type: 'success',
                        text: 'Chart saved',
                    })
                }
            }
            else {
                this.$toast({
                    type: 'info',
                    text: 'Please complete form',
                })
            }

        },
        showMe() {
            this.$emit('routeTopage')
        },
        helloWorld(e) {
            this.present = e
        },
        setImagingDiagnosis(e) {
            this.imagingObject.diagnosis = e
        },
        openDiagnosis() {
            this.$bvModal.show('icd10modal')
        },
        showModal() {
            if (!this.present) {
                this.$bvModal.show('diagnosisModal')
            } else {
                this.present = false
                this.$bvModal.hide('diagnosisModal')
            }
        },

        setDiagnosis(e, i) {
            if (!this.diagnosis[i].comment.includes(e.case)) {
                this.diagnosis[i].comment.push(e.case)
            }
        },

        Diag(e) {
            this.diagList = e
            let arr = e
            let requestBody = []
            for (let x = 0; x < arr.length; x++) {
                let tempObj = {
                    diagnosis: arr[x],
                    status: 'working',
                }
                if (arr[x].confirmed === true) {
                    tempObj.status = 'confirmed'
                }
                delete tempObj.diagnosis.selected
                delete tempObj.diagnosis.confirmed
                requestBody.push(tempObj)
                this.template.diagnosis = requestBody
                // this.orders.diagnosis = requestBody
            }
        },

        async getICD10(page = 1, e) {
            // this.currentFilter = e
            try {
                let response = await this.$api.core.getICD({ page, ...e })
                let array = response.results
                const formatted = array.map((el) => ({
                    ...el,
                    selected: false,
                    confirmed: false,
                }))
                this.icdTernCollection = formatted
                this.pages = response.total_pages
            } catch { }
        },
        searchByString: debounce(function (e) {
            this.searchParam.search = e
            this.getICD10(1, this.searchParam)
        }, 1000),
        searchOptions: debounce(function (e) {
            this.searchParam.search = e
            this.getICD10(1, this.searchParam)
        }, 1000),

        getData() {
            if (this.template.content) {
                for (let x = 0; x < this.template.content.length; x++) {
                    let temp = this.template.content[x]
                    for (let y = 0; y < temp.cols.length; y++) {
                        let cols = temp.cols[y]
                        for (let z = 0; z < cols.form_field.length; z++) {
                            let option = cols.form_field[z]
                            if (option.type === 'lab_Order' && this.lab_serviceCenters.length === 0
                                && this.labPanels.length === 0) {
                                this.getLabServiceCenterandObv()
                                this.labObject.patient = this.consultationData.patient
                            }
                            if (option.type === 'imaging' && this.service_centers.length === 0
                                && this.observations.length === 0) {
                                this.getServiceCenter()
                                this.getObservation()
                                this.imagingObject.patient = this.consultationData.patient
                            }
                            if (option.type === 'prescription' && this.stores.length === 0
                                && this.generic_drug.length === 0 && this.doses.length === 0
                                && this.units.length === 0 && this.frequencies.length === 0
                                && this.durations.length === 0 && this.directions.length === 0
                                && this.routes.length === 0 && this.products.length === 0) {
                                this.prescriptionObject.patient = this.consultationData.patient
                                this.getGenericDrugs()
                                this.getDoses()
                                this.getUnits()
                                this.getFrequencies()
                                this.getDurations()
                                this.getDirections()
                                this.getRoutes()
                                this.getProducts()
                                this.getStores()
                                // this.productLogic()
                            }
                            if (option.type === 'nursing' && this.stations.length === 0) {
                                this.getStations()
                                this.nursingObject.patient = this.consultationData.patient
                            }
                            if (option.type === 'diagnosis' && this.icdTernCollection.length === 0) {
                                this.getICD10()
                            }
                        }
                    }
                }
            }
        },
        deleteDrug(e) {
            if (this.prescriptionObject.details.length !== 1) {
                this.prescriptionObject.details.splice(e, 1)
            }
        },
        addDrug() {
            this.prescriptionObject.details.push({
                generic_drug: null,
                product: '',
                dose: null,
                unit: null,
                route: null,
                frequency: null,
                direction: null,
                duration: null,
                dispense_quantity: 1,
                status: '',
                note: ''
            })
        },
        productLogic(dose, frequency, duration, product) {
            let qty
            if (dose, frequency, duration, product) {
                let dose_multiplier = dose.multiplier
                let frequency_multiplier = frequency.multiplier
                let duration_multiplier = duration.multiplier
                let product_divider = product.divider

                let calc =
                    (dose_multiplier * frequency_multiplier * duration_multiplier) /
                    product_divider
                qty = Math.floor(calc)
                return qty
            }
            else {
                return 1
            }
        },
        fetchOPtions(e, i) {
            this.$api.inventory
                .getProducts({ size: 1500, generic_drug: e.id })
                .then((res) => {
                    this.products = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getServiceCenter() {
            this.$api.imaging
                .getServiceCenter({ size: 1000 })
                .then((res) => {
                    this.service_centers = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        async getLabServiceCenterandObv() {
            try {
                const serviceCenters = await this.$api.laboratory.getServiceCenter({
                    size: 1000,
                })
                this.lab_serviceCenters = serviceCenters.results

                const lapPanels = await this.$api.laboratory.getLabPanel({ size: 1000 })
                this.labPanels = lapPanels.results
            } catch (error) {
                console.log(error)
            }
        },
        getObservation() {
            this.$api.imaging
                .getObservation({ size: 1000 })
                .then((res) => {
                    this.observations = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getGenericDrugs() {
            this.$api.pharmacy
                .getGeneric({ size: 1500 })
                .then((res) => {
                    this.generic_drug = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        getDoses() {
            this.$api.pharmacy
                .getDoses({ size: 1000 })
                .then((res) => {
                    this.doses = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getUnits() {
            this.$api.pharmacy
                .getUnits({ size: 1000 })
                .then((res) => {
                    this.units = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getFrequencies() {
            this.$api.pharmacy
                .getFrequencies({ size: 1000 })
                .then((res) => {
                    this.frequencies = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getDurations() {
            this.$api.pharmacy
                .getDurations({ size: 1000 })
                .then((res) => {
                    this.durations = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getDirections() {
            this.$api.pharmacy
                .getDirections({ size: 1000 })
                .then((res) => {
                    this.directions = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getRoutes() {
            this.$api.pharmacy
                .getRoutes({ size: 1000 })
                .then((res) => {
                    this.routes = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getProducts() {
            this.$api.inventory
                .getProducts({ size: 1000 })
                .then((res) => {
                    this.products = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getStores() {
            this.$api.inventory
                .getStores({ size: 1000, is_pharmacy: true })
                .then((res) => {
                    this.stores = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getStations() {
            this.$api.nursing
                .getStation({ size: 1000 })
                .then((res) => {
                    this.stations = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    }
}

</script>

<style scoped>
.input-special {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #e7e8eb;
    outline: 0;
    height: 36px;
    /* background: #fbfdfe; */
}

.float {
    position: relative;
    top: -3px;
    right: -17px;
}
</style>