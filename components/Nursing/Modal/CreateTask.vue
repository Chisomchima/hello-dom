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
                        <ValidationProviderWrapper name="D.O.B" :rules="['']">
                            <input :value="dob" type="text" class="form-control" readonly />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="mb-2 col-lg-6 col-md-6 col-sm-6">
                        <small class="text-grey text-12">Age (Y-M-D)</small>
                        <div class="d-flex">
                            <div v-if="fill" class="px-1">
                                <input type="text" disabled placeholder="Year" v-model="age.year"
                                    class="form-control ng-untouched ng-pristine ng-valid" />
                            </div>
                            <div v-if="!fill" class="px-1">
                                <input type="number" placeholder="Year" v-model="formDate.year"
                                    class="form-control ng-untouched ng-pristine ng-valid" />
                            </div>
                            <div v-if="fill" class="px-1">
                                <input type="text" disabled placeholder="Month" v-model="age.month"
                                    class="form-control ng-untouched ng-pristine ng-valid" />
                            </div>
                            <div v-if="!fill" class="px-1">
                                <input type="number" placeholder="Month" v-model="formDate.month"
                                    class="form-control ng-untouched ng-pristine ng-valid" />
                            </div>
                            <div v-if="fill" class="px-1">
                                <input type="text" disabled placeholder="Day" v-model="age.day"
                                    class="form-control ng-untouched ng-pristine ng-valid" />
                            </div>
                            <div v-if="!fill" class="px-1">
                                <input type="number" placeholder="Day" v-model="formDate.day"
                                    class="form-control ng-untouched ng-pristine ng-valid" />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <ValidationProviderWrapper name="Gender" :rules="['required']">
                            <input :value="gender" type="text" class="form-control" readonly />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-6 mb-2">
                        <ValidationProviderWrapper name="Email" :rules="[]">
                            <input :value="email" type="text" class="form-control" readonly />
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
            age: {
                year: '',
                month: '',
                day: '',
            },
            formDate: {
                year: '',
                month: '',
                day: ''
            },
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
            if (Object.keys(this.dataObject.patient).length > 0) {
                return this.dataObject.patient.gender
            }
            return ''
        },

        fill() {
            return this.age.year ? true : false
        },

        // dob() {
        //     if (Object.keys(this.dataObject.patient).length > 0) {
        //         let response = calcAge(this.dataObject.patient.date_of_birth)
        //         return `${this.dataObject.patient.date_of_birth} (${response.year}Y-${response.month}M-${response.day}D)`
        //     }
        //     return ''
        // },

        dob() {
            if (this.dataObject.patient) {
                return this.dataObject.patient.date_of_birth
            }
            return ''
        },

        email() {
            if (Object.keys(this.dataObject.patient).length > 0) {
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
                this.downloading = false
                this.dataObject.patient = results

                if (results.date_of_birth !== null || results.date_of_birth !== '') {
                    this.calcAge(results.date_of_birth)
                    this.dataObject.patient.age = this.age
                }
                else {
                    this.dataObject.patient.age = {
                        year: '',
                        month: '',
                        day: '',
                    }
                }
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
            if (this.dataObject.patient.date_of_birth == null || this.dataObject.patient.date_of_birth == '') {
                this.dataObject.patient.age = this.formDate
            }
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

            this.age = {
                year: '',
                month: '',
                day: ''
            }
            this.formDate = {
                year: '',
                month: '',
                day: ''
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

        calcAge(e) {
            if (typeof (e) == 'string') {
                // **********calc year***********
                let presentDate = new Date().getFullYear()
                let yearOfBirth = e.substring(0, 4)
                let month = new Date().getMonth()
                let monthOfBirth = parseInt(e.substring(5, 7))

                let diff = presentDate - yearOfBirth
                let x = parseInt(diff)
                if (x === 0) {
                    this.age.year = 0
                    this.age.month = 0
                } else {
                    this.age.year = x
                }

                if (monthOfBirth < month) {
                    this.age.year
                } else {
                    if (this.age.year === 0) {
                        this.age.year
                    } else {
                        this.age.year--
                    }
                }

                // **************calc month***********
                let tempMonth

                // tempMonth = monthOfBirth - month
                if (presentDate === yearOfBirth) {
                    this.patient.age.month = 0
                } else {
                    tempMonth = 12 - monthOfBirth
                }

                if (monthOfBirth <= month) {
                    this.age.month = month - monthOfBirth
                    // this.patient.age.month + 1;
                } else if (month + 1 === monthOfBirth) {
                    this.age.month = 0
                } else {
                    this.age.month = tempMonth + month
                    // this.patient.age.month + 1;
                }

                // **************calc day**************
                let day = new Date().getDate()
                let dayOfBirth = e.substring(8, 10)
                // this.patient.age.day = new Date().getDate();

                if (day > dayOfBirth) {
                    this.age.day = day - dayOfBirth
                } else if (day === dayOfBirth) {
                    this.age.day = 0
                } else {
                    this.age.day = day
                }

                // *********************************
            }
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