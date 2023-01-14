<template>
    <ModalWrapper size="lg" id="nurseTask" title="Add task" @ok="ok()" @show="getData()" @hide="clear" :stacking="false">
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



                    <div class="w-100 p-2 border border-secondary rounded mx-3">
                        <p class="text-16 text-grey mb-1">Instruction</p>
                        <div class="text-14">
                            {{ data.description }}
                        </div>
                    </div>

                    <div class="col-md-12 d-flex ml-0 text-primary py-2 text-14">
                        <span class="point" @click="addTask">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                <path fill="currentColor"
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                            Add task
                        </span>
                    </div>

                    <div v-for="(task, index) in dataObject" :key="index"
                        class="row w-100 p-1 mt-2 mx-3 border border-secondary rounded">

                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Type" :rules="['required']">
                                <VSelect @option:deselected="setSTATE($event)"
                                    @option:selecting="formatDate($event, index)" v-model="task.type" :options="path"
                                    :reduce="(opt) => opt.val" label="name">
                                </VSelect>
                            </ValidationProviderWrapper>
                        </div>
                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Scheduled date" :rules="['required']">
                                <input v-model="task.scheduled_at" :disabled="dataObject[index].type === 'IMMEDIATE'"
                                    type="datetime-local" :min="minDate" class="form-control" />
                            </ValidationProviderWrapper>
                        </div>
                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Notes" :rules="['']">
                                <textarea id="" v-model="task.notes" class="form-control" name="" cols="30"
                                    rows="2"></textarea>
                            </ValidationProviderWrapper>
                        </div>
                        <div v-if="dataObject[index].type === 'IMMEDIATE'" class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Disposition" :rules="['']">
                                <textarea id="" v-model="task.disposition" class="form-control" name="" cols="30"
                                    rows="2"></textarea>
                            </ValidationProviderWrapper>
                        </div>
                        <div v-if="dataObject[index].type === 'IMMEDIATE'" class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Nursing service(s)" :rules="['']">
                                <VSelect v-model="task.nursing_services" :multiple="true" :options="services"
                                    :reduce="(opt) => opt.id" label="name">
                                </VSelect>
                            </ValidationProviderWrapper>
                        </div>
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
                    </div>
                </div>
            </form>
        </ValidationObserver>
    </ModalWrapper>
</template>
  
<script>
import { DateTime } from 'luxon'
import calcAge from '@/mixins/calcAge'
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
            dataObject: [
                {
                    "inventory": [],
                    "nursing_services": [
                    ],
                    "type": "IMMEDIATE",
                    "notes": "",
                    "scheduled_at": "",
                    "disposition": ""
                }
            ],
        }
    },
    watch: {
        // 'dataObject.type[0]': {
        //     handler() {
        //         if (this.dataObject.type === 'IMMEDIATE') {
        //             let today = new Date()
        //             today = today.toISOString()
        //             let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
        //             console.log(x)
        //             this.dataObject.scheduled_at = x
        //         }
        //         else {
        //             this.dataObject.scheduled_at = ''
        //         }
        //     }
        // }
    },
    computed: {
        minDate() {
            let today = new Date()
            today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
            today = today.toISOString().slice(0, 16)
            return today
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
                let response = calcAge(this.patient.date_of_birth)
                return `${this.patient.date_of_birth} (${response.year}Y-${response.month}M-${response.day}D)`
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
        formatDate(e, i) {
            console.log({ e }, i)
            if (e.val === 'IMMEDIATE') {
                let today = new Date()
                today = today.toISOString()
                let x = DateTime.fromISO(today).toFormat('yyyy-LL-dd')
                this.dataObject[i].scheduled_at = x
            }
            else {
                this.dataObject[i].scheduled_at = ''
            }
        },
        setSTATE(e) {
            console.log('ghjhgf2')
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

        async save() {
            try {
                const data = await this.$api.nursing.createTaskBulk(this.dataObject, this.$route.params.uid)
                this.$emit('refresh')
                this.$bvModal.hide('nurseTask')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        deleteTask(e) {
            if (this.dataObject.length !== 1) {
                this.dataObject.splice(e, 1)
            }
        },
        addTask() {
            this.dataObject.push({
                "inventory": [],
                "nursing_services": [
                ],
                "type": "IMMEDIATE",
                "notes": "",
                "scheduled_at": "",
                "disposition": ""
            })
            let today = new Date()
            today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
            today = today.toISOString().slice(0, 16)
            this.dataObject[this.dataObject.length - 1].scheduled_at = today
        },
        clear() {
            this.dataObject = [
                {
                    "inventory": [],
                    "nursing_services": [
                    ],
                    "type": "IMMEDIATE",
                    "notes": "",
                    "scheduled_at": "",
                    "disposition": ""
                }
            ]
            this.$emit('hide')
        },
        getData() {
            this.getProducts()
            this.getStores()
            this.getServices()
            let today = new Date()
            today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
            today = today.toISOString().slice(0, 16)
            this.dataObject[0].scheduled_at = today
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