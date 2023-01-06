<template>
    <ModalWrapper size="lg" id="nurseTask" title="Add task" @ok="ok()" @show="getData()" :stacking="false">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <ValidationProviderWrapper name="UHID" :rules="['']">
                            <div class="d-flex">
                                <input :value="uhid" type="text" class="form-control" readonly />
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

                    <!-- <div class="col-md-12 d-flex ml-0 text-primary text-14">
                        <span class="point" @click="addTask">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                <path fill="currentColor"
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                            Add task
                        </span>
                    </div> -->

                    <div class="row w-100 p-1 mt-2 mx-2 border border-secondary rounded">
                        <!-- <div class="
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
                        </div> -->

                        <!-- <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Title" :rules="['']">
                                <input v-model="dataObject.title" type="text" class="form-control" />
                            </ValidationProviderWrapper>
                        </div> -->



                        <div class="col-md-6 p-2">
                            <span class="text-16 text-grey mb-1">Age:</span>
                            <p class="text-14 mb-0">{{ patient.age }}</p>
                        </div>
                        
                        <div class="col-md-12 pt-2 px-2">
                            <p class="text-16 text-grey mb-1">Instruction</p>
                            <ul>
                                <li class="text-14 mb-0">{{ data.description }}</li>
                            </ul>
                        </div>

                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Type" :rules="['required']">
                                <VSelect v-model="dataObject.type" :options="path" :reduce="(opt) => opt.val"
                                    label="name">
                                </VSelect>
                            </ValidationProviderWrapper>
                        </div>
                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Scheduled date" :rules="['required']">
                                <input v-model="dataObject.scheduled_at" :disabled="dataObject.type === 'IMMEDIATE'"
                                    type="date" :min="minDate" class="form-control" />
                            </ValidationProviderWrapper>
                        </div>
                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Notes" :rules="['']">
                                <textarea id="" v-model="dataObject.notes" class="form-control" name="" cols="30"
                                    rows="2"></textarea>
                            </ValidationProviderWrapper>
                        </div>
                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Nursing service" :rules="['']">
                                <VSelect v-model="dataObject.nursing_services" :multiple="true" :options="services"
                                    :reduce="(opt) => opt.id" label="name">
                                </VSelect>
                            </ValidationProviderWrapper>
                        </div>

                        <!-- <div class="col-md-12">
                            <p class="ml-3 mb-2 text-grey text-underline text-16 text-center">Inventory</p>
                        </div> -->
                        <!-- <div v-for="(pint, innerIndex) in dataObject.inventory" :key="innerIndex"
                            class="d-flex col-md-12 mb-2">
                            <div class="col-md-6 px-0 pr-1">
                                <ValidationProviderWrapper name="Store" :rules="['']">
                                    <VSelect v-model="pint.store" :options="stores" :reduce="(opt) => opt.id"
                                        label="name">
                                    </VSelect>
                                </ValidationProviderWrapper>
                            </div>

                            <div class="col-md-6 px-0 pl-1 pr-2">
                                <ValidationProviderWrapper name="Product" :rules="['']">
                                    <VSelect v-model="pint.product" :options="products" :reduce="(opt) => opt.id"
                                        label="name">
                                    </VSelect>
                                </ValidationProviderWrapper>
                            </div>

                            <div class="px-0 text-danger d-flex align-items-center">
                                <span class="point pt-3" @click="deleteInventory(innerIndex)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                        preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                        <g fill="currentColor">
                                            <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd"
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div> -->
                        <!-- <div class="col-md-12 px-0 d-flex justify-content-end align-items-center pr-2">
                            <span @click="addInventory(index)" class="point text-primary text-12">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                    <path fill="currentColor"
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                                Add inventory
                            </span>
                        </div> -->


                    </div>

                    <!-- <div class="col-md-12 d-flex justify-content-end ml-0 text-primary text-14 pt-2">
                        <span class="point" @click="addTask">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                <path fill="currentColor"
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                            Add task
                        </span>
                    </div> -->
                </div>
            </form>
        </ValidationObserver>
    </ModalWrapper>
</template>
  
<script>
import { DateTime } from 'luxon'
export default {
    props: {
        editData: {
            type: Object,
            require: false,
            default: () => ({}),
        },
        patient: {
            type: Object,
            require: false,
            default: () => ({}),
        },
        data: {
            type: Object,
            require: false,
            default: () => ({}),
        },
    },
    data() {
        return {
            selected: [],
            present: false,
            downloading: false,
            generic_drug: [],
            path: [{ name: 'Immediate', val: 'IMMEDIATE' }, { name: 'Scheduled', val: 'SCHEDULED' }],
            doses: [],
            units: [],
            routes: [],
            products: [],
            stores: [],
            services: [],
            dataObject: {
                notes: "",
                type: 'IMMEDIATE',
                nursing_services: [],
                scheduled_at: ''
            },
        }
    },
    watch: {
        'dataObject.type': {
            handler() {
                if (this.dataObject.type === 'IMMEDIATE') {
                    let today = new Date()
                    today = today.toISOString()
                    let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
                    console.log(x)
                    this.dataObject.scheduled_at = x
                }
                else {
                    this.dataObject.scheduled_at = ''
                }
            }
        }
    },
    computed: {
        minDate() {
            let today = new Date()
            today = today.toISOString()
            let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
            console.log(x)
            return x
        },
        name() {
            if (Object.keys(this.patient).length > 0) {
                return (
                    this.patient.salutation +
                    ' ' +
                    this.patient.firstname +
                    ' ' +
                    this.patient.lastname
                )
            }
            return ''
        },
        gender() {
            if (this.patient.gender) {
                return this.patient.gender
            }
            return ''
        },

        dob() {
            if (this.patient.date_of_birth) {
                return this.patient.date_of_birth
            }
            return ''
        },

        email() {
            if (this.patient.email) {
                return this.patient.email
            }
            return ''
        },
        uhid() {
            if (this.patient.uhid) {
                return this.patient.uhid
            }
            return ''
        },
    },
    methods: {
        async ok() {
            if (await this.$refs.form.validate()) {
                this.save()
            }
        },
        setToConfirmed() {

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

        addInventory(index) {
            this.dataObject.inventory.push(
                {
                    product: "",
                    store: ""
                }
            )
        },

        deleteInventory(e) {
            if (this.dataObject.inventory.length !== 1) {
                this.dataObject.inventory.splice(e, 1)
            }
        },

        async save() {
            try {
                const data = await this.$api.nursing.createTask(this.dataObject, this.$route.params.uid)
                this.$emit('refresh')
                this.$bvModal.hide('nurseTask')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        deleteTask(e) {
            if (this.dataObject.tasks.length !== 1) {
                this.dataObject.tasks.splice(e, 1)
            }
        },
        addTask() {
            this.dataObject.tasks.push({
                notes: "",
                type: null,
                nursing_services: [],
                scheduled_at: ''
            })
        },
        clear() {
            this.dataObject = {
                title: "",
                notes: "",
                type: null,
                nursing_services: [],
                inventory: [
                    {
                        product: null,
                        store: null
                    }
                ],
                scheduled_at: ''
            }
            this.uhid = ''
            this.$emit('hide')
        },
        getData() {
            this.getProducts()
            this.getStores()
            this.getServices()
            let today = new Date()
            today = today.toISOString()
            let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
            console.log(x)
            this.dataObject.scheduled_at = x
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
        getServices() {
            this.$api.nursing
                .getServices({ size: 1000 })
                .then((res) => {
                    this.services = res.results
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