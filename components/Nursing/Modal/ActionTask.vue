<template>
    <ModalWrapper size="lg" :submitTitle="'Mark as done'" id="actionTask" title="Complete task" @ok="ok()"
        @show="getData()" @hide="clear()" :stacking="false">
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

                    <p class="text-16 text-grey ml-3 mb-0 pt-2">Task</p>

                    <div class="col-md-12 pt-2 px-3">

                        <div class="d-flex text-14">

                            <div class="col-md-4">
                                <span class="text-grey">Scheduled by: </span><span>{{ createdBy }}</span>
                            </div>
                            <div class="col-md-4">
                                <span class="text-grey">Date created: </span><span>{{ dateCreated }}</span>
                            </div>
                        </div>
                    </div>


                    <div class="row w-100 p-1 mt-2 mx-3 border border-secondary rounded">

                        <div class="w-100 py-2 px-3 border-bottom">

                            <div class="d-flex justify-content-between text-14">
                                <div class="">
                                    <div class="">
                                        <span class="text-grey">Date created: </span><span>{{ dateCreated }}</span>
                                    </div>

                                    <div class="">
                                        <span class="text-grey">Created by: </span><span>{{ createdBy }}</span>
                                    </div>
                                </div>

                                <div>
                                    <div class="">
                                        <span class="text-grey">Scheduled date: </span><span>{{ scheduleDate }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 my-2">
                            <p class="text-14 mb-1 text-grey">
                                Notes
                            </p>
                            <p class="text-14 mb-1"><span>{{ editData? editData.notes : '' }}</span></p>
                        </div>
                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Disposition" :rules="['required']">
                                <textarea id="" v-model="editData.disposition" class="form-control" name="" cols="30"
                                    rows="4"></textarea>
                            </ValidationProviderWrapper>
                        </div>
                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Nursing service(s)" :rules="['required']">
                                <VSelect v-model="editData.nursing_services" :multiple="true" :options="services"
                                    :reduce="(opt) => opt.id" label="name">
                                </VSelect>
                            </ValidationProviderWrapper>
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
            let x = DateTime.fromISO(this.dataObject.scheduled_at).toFormat('yyyy-LL-dd')
            return x
        },
        performedAt() {
            let x = DateTime.fromISO(this.editData.closed_at).toFormat('yyyy-LL-dd, T')
            return x
        },
        scheduleDate() {
            let x = DateTime.fromISO(this.editData.scheduled_at).toFormat('yyyy-LL-dd, T')
            return x
        },
        createdBy() {
            if (this.editData.scheduled_by)
                return this.editData.scheduled_by.first_name + " " + this.editData.scheduled_by.last_name
            else
                return ''
        },
        performedBy() {
            if (this.editData.closed_by)
                return this.editData.closed_by.first_name + " " + this.editData.closed_by.last_name
            else
                return ''
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
        setToConfirmed() {

        },
        convertDate(date) {
            let x = DateTime.fromISO(date).toFormat('yyyy-LL-dd')
            return x
        },
        convertServices(service) {
            console.log(service)
            let Arr = []
            for (let x = 0; x < service.length; x++) {
                Arr.push(service[x].name)
            }
            let text = Arr.join(', ')
            return text
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
                const data = await this.$api.nursing.closeNursingTask(this.$route.params.uid, this.editData.id, {
                    disposition: this.editData.disposition,
                    nursing_services: this.editData.nursing_services
                })
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