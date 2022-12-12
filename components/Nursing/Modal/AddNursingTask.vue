<template>
    <ModalWrapper size="lg" title="Add nursing task" @ok="ok()" @show="getData()" @hide="clear()" :stacking="false">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <ValidationProviderWrapper name="UHID" :rules="['']">
                            <div class="d-flex">
                                <input v-model="uhid" type="text" class="form-control" />
                                <div class="ml-2 mt-1">
                                    <b-spinner style="width: 1.7rem; height: 1.7rem" v-if="downloading"
                                        variant="primary" label="grow">
                                    </b-spinner>
                                    <div class="text-info icon" v-if="false">
                                        <span @click="findPatient">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16" class="point">
                                                <g fill="currentColor">
                                                    <path
                                                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path
                                                        d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-6 mb-2">
                        <ValidationProviderWrapper name="Patient Name" :rules="['required']">
                            <input :value="name" type="text" class="form-control" readonly />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-6 mb-2">
                        <ValidationProviderWrapper name="D.O.B" :rules="['required']">
                            <input :value="dob" type="text" class="form-control" readonly />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-6 mb-2">
                        <ValidationProviderWrapper name="Gender" :rules="['required']">
                            <input :value="gender" type="text" class="form-control" readonly />
                        </ValidationProviderWrapper>
                    </div>

                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Name" :rules="['']">
                            <input v-model="dataObject.name" type="text" class="form-control" />
                        </ValidationProviderWrapper>
                    </div>

                    <!-- <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Prescribing Physician" :rules="[]">
                            <input v-model="dataObject.prescribing_physician" type="text" class="form-control" />
                        </ValidationProviderWrapper>
                    </div> -->

                    <div class="col-md-12 d-flex ml-0 text-primary text-14">
                        <span class="point" @click="addTask">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                <path fill="currentColor"
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                            Add
                        </span>
                    </div>

                    <div v-for="(task, index) in dataObject.tasks" :key="index"
                        class="row w-100 p-1 mt-2 mx-2 border border-secondary rounded">
                        <div class="
                  col-md-12
                  
                  d-flex
                  justify-content-end
                  ml-0
                  text-danger text-14
                ">
                            <span class="point float" @click="deleteTask(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                                </svg>
                            </span>
                        </div>
                        <!-- <div class="col-md-12 mb-2">
                <ValidationProviderWrapper name="SIG" :rules="['']">
                  <input :value="sigFormatter(drug.direction, drug.duration)" type="text" class="form-control" />
                </ValidationProviderWrapper>
              </div> -->

                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Title" :rules="['']">
                                <input v-model="task.title" type="text" class="form-control" />
                            </ValidationProviderWrapper>
                        </div>

                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Nursing service" :rules="['']">
                                <input v-model="task.nursing_services" type="text" class="form-control" />
                            </ValidationProviderWrapper>
                        </div>

                        <div v-for="(pint, index) in task.inventory" :key="index" class="d-flex col-md-12 mb-2">
                            <div class="col-md-6 px-0 pr-1">
                                <ValidationProviderWrapper name="Store" :rules="['']">
                                    <VSelect v-model="pint.store" :options="stores" :reduce="(opt) => opt.id" label="name">
                                    </VSelect>
                                </ValidationProviderWrapper>
                            </div>

                            <div class="col-md-6 px-0 pl-1">
                                <ValidationProviderWrapper name="Product" :rules="['']">
                                    <VSelect v-model="pint.product" :options="products" :reduce="(opt) => opt.id"
                                        label="name">
                                    </VSelect>
                                </ValidationProviderWrapper>
                            </div>
                        </div>

                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Notes" :rules="['']">
                                <textarea id="" v-model="task.note" class="form-control" name="" cols="30"
                                    rows="2"></textarea>
                            </ValidationProviderWrapper>
                        </div>
                    </div>

                    <div class="col-md-12 d-flex justify-content-end ml-0 text-primary text-14 pt-2">
                        <span class="point" @click="addTask">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                <path fill="currentColor"
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                            Add
                        </span>
                    </div>
                </div>
            </form>
        </ValidationObserver>

        <div>
            <PharmacyFindPatient />
        </div>
    </ModalWrapper>
</template>
  
<script>
import { debounce } from 'lodash'

export default {
    props: {
        editData: {
            type: Object,
            require: false,
            default: () => ({}),
        },
        role: {
            require: false,
        },
    },
    data() {
        return {
            uhid: '',
            selected: [],
            present: false,
            downloading: false,
            generic_drug: [],
            doses: [],
            units: [],
            routes: [],
            products: [],
            stores: [],
            dataObject: {
                tasks: [
                    {
                        title: "",
                        notes: "",
                        inventory: [
                            {
                                product: "",
                                store: ""
                            }
                        ],
                        nursing_services: [
                            ""
                        ]
                    }
                ],
                name: "",
                status: "COMPLETED",
                patient: {},
            },
        }
    },
    computed: {
        name() {
            if (Object.keys(this.dataObject.patient).length > 0) {
                return (
                    this.dataObject.patient.salutation +
                    ' ' +
                    this.dataObject.patient.firstname +
                    ' ' +
                    this.dataObject.patient.lastname
                )
            }
            return ''
        },
        gender() {
            if (this.dataObject.patient) {
                return this.dataObject.patient.gender
            }
            return ''
        },

        dob() {
            if (this.dataObject.patient) {
                return this.dataObject.patient.date_of_birth
            }
            return ''
        },

        email() {
            if (this.dataObject.patient) {
                return this.dataObject.patient.email
            }
            return ''
        },
    },
    watch: {
        uhid: debounce(async function (newVal) {
            this.downloading = true
            const results = await this.getPatientByUHID(newVal)
            if (results) {
                this.dataObject.patient = results
                this.downloading = false
            } else {
                this.dataObject.patient = {}
                this.downloading = false
            }
        }, 1000),
    },
    methods: {
        async ok() {
            if (await this.$refs.form.validate()) {
                this.save()
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

        findPatient() {
            this.$bvModal.show('findPatient')
        },

        async save() {
            try {
                let prescribeDetails = this.dataObject.details
                let direction = []
                let duration = []
                for (let x = 0; x < prescribeDetails.length; x++) {
                    duration.push(prescribeDetails[x].duration.id)
                    direction.push(prescribeDetails[x].direction.id)
                }

                //  console.log({direction}, {duration})
                var pocket = prescribeDetails

                for (let x = 0; x < prescribeDetails.length; x++) {
                    pocket[x].direction = direction[x]
                    pocket[x].duration = duration[x]
                }
                console.log(pocket)

                const data = await this.$api.pharmacy.orderPrescription({
                    store: this.dataObject.store,
                    patient: this.dataObject.patient,
                    source: this.dataObject.source,
                    prescribing_physician: this.dataObject.prescribing_physician,
                    note: this.dataObject.note,
                    details: pocket,
                })
                this.$emit('refresh')
                this.$bvModal.hide('modal')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        deleteTask(e) {
            if (this.dataObject.details.length !== 1) {
                this.dataObject.details.splice(e, 1)
            }
        },
        addTask() {
            this.dataObject.tasks.push({
                title: "",
                notes: "",
                inventory: [
                    {
                        product: "",
                        store: ""
                    }
                ],
                nursing_services: [
                    ""
                ]
            })
        },
        clear() {
            this.dataObject = {
                tasks: [
                    {
                        title: "",
                        notes: "",
                        inventory: [
                            {
                                product: "",
                                store: ""
                            }
                        ],
                        nursing_services: [
                            ""
                        ]
                    }
                ],
                name: "",
                status: "COMPLETED",
                patient: {},
            }
            this.uhid = ''
            this.$emit('hide')
        },
        getData() {
            this.getProducts()
            this.getStores()
            this.dataObject.prescribing_physician =
                this.$store.state.auth.user.first_name +
                ' ' +
                this.$store.state.auth.user.last_name
        },
        async getPatientByUHID(uhid) {
            try {
                if (uhid.length > 0) {
                    const results = await this.$api.patient.getPatientByUHID(uhid)
                    return results
                }
            } catch (error) {
                console.log(error)
            }
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
    },
}
</script>
  
<style lang="scss" scoped>
textarea.form-control {
    min-height: 50px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
}

.float {
    position: relative;
    top: -3px;
    right: -17px;
}

.shrink {
    height: 2px;
}
</style>