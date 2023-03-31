<template>
    <div>
        <ModalWrapper size="lg" id="labOrderPanel" title="Add Lab Order" @clearForm="clear()" @hide="clear()"
            @show="getData()" @ok="save()">
            <ValidationObserver ref="form">
                <form>
                    <div class="row">
                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="UHID" :rules="['']">
                                <div class="d-flex align-items-center">
                                    <input v-model="search" v-debounce:1300ms.cancelonempty="getPatientLabOrder"
                                        :placeholder="placeholder" class="form-control" type="text" />
                                    <div v-if="searching" class="mx-2">
                                        <b-spinner label="loading" variant="primary" type="grow"
                                            style="width: 1.5rem; height: 1.5rem" class="text-center">
                                        </b-spinner>
                                    </div>
                                </div>
                            </ValidationProviderWrapper>
                        </div>
                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Patient Name" :rules="['required']">
                                <input class="form-control" v-model="patientName" type="text" readonly />
                            </ValidationProviderWrapper>
                        </div>
                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="D.O.B" :rules="['']">
                                <input type="text" class="form-control" :value="patientData.date_of_birth" readonly />
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
                                    <ValidationProviderWrapper name="" :rules="['required']">
                                        <input type="number" placeholder="Year" v-model="formDate.year"
                                            class="form-control ng-untouched ng-pristine ng-valid" />
                                    </ValidationProviderWrapper>
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
                                <input :value="patientData.gender" class="form-control" readonly />
                            </ValidationProviderWrapper>
                        </div>

                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Email" :rules="['']">
                                <input v-model="recipientEmail" type="text" class="form-control" />
                            </ValidationProviderWrapper>
                        </div>

                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Services Center" :rules="['required']">
                                <VSelect v-model="serviceCenter" :options="serviceCenters" label="name"></VSelect>
                            </ValidationProviderWrapper>
                        </div>

                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Lab Panel" :rules="['required']">
                                <VSelect v-model="lapPanel" :reduce="(op) => op.id" :multiple="true" label="name"
                                    :options="lapPanels"></VSelect>
                            </ValidationProviderWrapper>
                        </div>

                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Stat" :rules="[]">
                                <input id="" v-model="stat" type="checkbox" name="" />
                            </ValidationProviderWrapper>
                        </div>

                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Comment" :rules="[]">
                                <textarea v-model="comments" cols="30" rows="10" class="form-control"></textarea>
                            </ValidationProviderWrapper>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
        </ModalWrapper>
</div>
</template>

<script>
// import { DateTime } from 'luxon'
export default {
    data() {
        return {
            currentData: {},
            serviceCenters: [],
            lapPanels: [],

            serviceCenter: null,
            lapPanel: [],
            formDate: {
                year: '',
                month: '',
                day: ''
            },
            age: {
                year: '',
                month: '',
                day: '',
            },
            comments: '',
            search: '',
            stat: false,
            patientData: {},
            recipientEmail: '',
            patientName: null,
            searching: false,

            placeholder: 'Type to search'
        }
    },
    computed: {
        fill() {
            return this.age.year ? true : false
        },
    },
    methods: {
        async getPatientLabOrder() {
            this.searching = true
            const { results: patient } = await this.$api.patient.getPatientbyUHID(this.search)

            if (patient.length > 0) {
                this.currentData = patient[0]
                this.patientData = patient[0]
                this.recipientEmail = patient[0].email
                if (patient[0].date_of_birth !== null || patient[0].date_of_birth !== '') {
                    this.calcAge(patient[0].date_of_birth)
                    this.currentData.age = this.age
                }
                else {
                    this.patientData = {}
                    this.currentData.age = {
                        year: '',
                        month: '',
                        day: '',
                    }
                }

                this.patientName = patient[0].salutation + ' ' + patient[0].firstname + " " + patient[0].lastname
            }
            else {
                this.patientName = 'No matching record...'
                this.currentData = patient[0]
                this.patientData = {}
                this.recipientEmail = ''
            }
            this.searching = false
        },
        async getData() {
            try {

                const serviceCenters = await this.$api.laboratory.getServiceCenter({
                    size: 1000,
                })
                this.serviceCenters = serviceCenters.results

                const lapPanels = await this.$api.laboratory.getLabPanel({ size: 1000 })
                this.lapPanels = lapPanels.results
            } catch (error) {
                console.log(error)
            }
        },
        async save() {
            try {
                if (this.currentData.date_of_birth == null || this.currentData.date_of_birth == '') {
                    this.currentData.age = this.formDate
                }
                if (await this.$refs.form.validate()) {
                    if (this.recipientEmail) {
                        this.currentData.email = this.recipientEmail
                    }
                    await this.$api.laboratory.saveLabOrder({
                        service_center: this.serviceCenter,
                        lab_panels: this.lapPanel,
                        patient: this.currentData,
                        comments: this.comments,
                        stat: this.stat,
                    })
                    this.$toast({
                        type: 'success',
                        text: 'Lab order successful'
                    })
                    this.$bvModal.hide('labOrderPanel')
                    this.$emit('refresh')
                }
            } catch (error) {
                console.log(error)
                this.$toast({
                    type: 'error',
                    text: error
                })
            }

        },
        clear() {
            this.patientData = {}
            this.recipientEmail = ''
            this.search = ''
            this.patientName = null
            this.lapPanel = []
            this.comments = ''
            this.stat = false
            this.serviceCenter = null
            this.formDate = {
                year: '',
                month: '',
                day: ''
            }
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

<style lang="scss" scoped></style>