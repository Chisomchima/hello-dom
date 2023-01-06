<template>
    <ModalWrapper size="lg" id="createTask" title="Add nursing task" @ok="ok()" @show="getData()" @hide="clear()"
        :stacking="false">
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
                        <ValidationProviderWrapper name="Nursing station" :rules="['']">
                            <VSelect v-model="dataObject.station" :options="stations" :reduce="(opt) => opt.id"
                                label="name">
                            </VSelect>
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Description" :rules="['required']">
                            <textarea id="" v-model="dataObject.description" class="form-control" name="" cols="30"
                                rows="4"></textarea>
                        </ValidationProviderWrapper>
                    </div>
                </div>
            </form>
        </ValidationObserver>
    </ModalWrapper>
</template>
  
<script>
import { debounce } from 'lodash'
import calcAge from '@/mixins/calcAge'
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
            stations: [],
            present: false,
            downloading: false,
            dataObject: {
                description: '',
                patient: {},
                station: null,

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
                let currentAge = calcAge(results.date_of_birth)
                let verdict = ''
                if(currentAge.year === 0)
                    verdict = 'Less than a year'
                 else if(currentAge.year === 1)
                    verdict = '1 year'
                 else 
                    verdict = `${currentAge.year} years`
                console.log(verdict)
                this.dataObject.patient.age = verdict
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
        async save() {
            try {
                const data = await this.$api.nursing.createNursingTask(this.dataObject)
                this.$emit('refresh')
                this.$bvModal.hide('createTask')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },

        clear() {
            this.dataObject = {
                description: '',
                patient: {},
                station: null,
            }
            this.uhid = ''
            this.$emit('hide')
        },
        getData() {
            this.getProducts()
            this.getStores()
            this.getStations()
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