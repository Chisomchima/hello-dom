<template>
    <ModalWrapper size="lg" :cancelText="'Close'" :arrangement="false" id="viewpatientTask" title="View nursing order"
        @ok="ok()" @show="getData()" @hide="clear()" :stacking="false">
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



                    <div class="row w-100 p-1 mt-2 mx-2 border border-secondary rounded">


                        <div class="col-md-6 p-2">
                            <span class="text-16 text-grey mb-1">Age:</span>
                            <span class="text-14 mb-0">{{ patient.age }}</span>
                        </div>

                        <div class="col-md-12 pt-2 px-2">
                            <p class="text-16 text-grey mb-1">Instruction</p>
                            <ul class="pl-4">
                                <li class="text-14 p-0 mb-0">{{ data.description }}</li>
                            </ul>
                        </div>

                        <div class="col-md-12 px-0" v-if="taskArray != 0">
                            <p class="text-grey text-16 px-2">Tasks</p>

                            <div v-for="(task, index) in data.tasks" :key="index" class=" col-md-12">
                                <div class="col-md-12 mb-2">
                                    <p class="text-14 text-grey mb-1 text-right">
                                        <span>Scheduled date</span>
                                        <span>{{ convertDate(task.scheduled_at) }}</span>
                                    </p>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <ValidationProviderWrapper name="Nursing service" :rules="['']">
                                        <VSelect v-model="task.nursing_services" :disabled="true" :noDrop="true" :multiple="true"
                                            :options="services" :reduce="(opt) => opt.id" label="name">
                                        </VSelect>
                                    </ValidationProviderWrapper>
                                </div>

                                <div class="col-md-12 mb-2">
                                    <p class="mb-1">
                                        Notes
                                    </p>
                                    <p class="text-14 text-grey mb-1"><span>{{ task.notes }}</span></p>
                                </div>
                                <hr>
                            </div>
                        </div>

                        <div class="col-md-12" v-else>
                            <p class="text-center text-16 text-grey p-4">No tasks assigned yet</p>
                        </div>
                    </div>


                </div>

                <div class="col-md-=12 text-14 text-grey p-0">
                    <span>Date created: </span><span>{{ dateCreated }}</span>
                </div>
                <div class="col-md-=12 text-14 text-grey p-0">
                    <span>Provider: </span><span>{{ createdBy }}</span>
                </div>
            </form>
        </ValidationObserver>
    </ModalWrapper>
</template>
  
<script>
import { DateTime } from 'luxon'
export default {
    props: {
        data: {
            type: Object,
            require: false,
            default: () => ({}),
        },
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
            },
        }
    },
    watch: {
        'editData.scheduled_at': {
            handler() {
                if (this.editData) {
                    let x = DateTime.fromISO(this.editData.scheduled_at).toFormat('yyyy-LL-dd')
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
            return x
        },
        dateCreated() {
            if (this.editData.created_at) {
                let x = DateTime.fromISO(this.editData.created_at).toFormat('yyyy-LL-dd')
                return x
            }
        },
        createdBy() {
            if (this.editData.created_by)
                return (this.editData.created_by.first_name || '') + " " + (this.editData.created_by.last_name || '')
            else {
                return ''
            }
        },
        taskArray() {
            if (this.data.tasks) {
                return this.data.tasks.length
            }

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
        convertDate(date) {
            let x = DateTime.fromISO(date).toFormat('yyyy-LL-dd')
            return x
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
            return
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
                title: "",
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
                scheduled_at: ''
            }
            this.$emit('hide')
        },
        getData() {
            this.getProducts()
            this.getStores()
            this.getServices()
            let today = new Date()
            today = today.toISOString()
            this.dataObject = this.editData
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