<template>
    <div>
        <ModalWrapper size="md" id="labOrderPanel" title="Add Lab Order" @clearForm="clear()" @hide="clear()"
            @show="getData()" @ok="save()">
            <ValidationObserver ref="form">
                <form>
                    <div class="row">
                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="UHID" :rules="['required']">
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
                            <ValidationProviderWrapper name="D.O.B" :rules="['required']">
                                <input type="text" class="form-control" :value="patientData.date_of_birth" readonly />
                            </ValidationProviderWrapper>
                        </div>

                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Gender" :rules="['required']">
                                <input :value="patientData.gender" class="form-control" readonly />
                            </ValidationProviderWrapper>
                        </div>

                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Email" :rules="['required']">
                                <input v-model="recipientEmail" type="text" class="form-control" />
                            </ValidationProviderWrapper>
                        </div>

                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Services Center" :rules="['required']">
                                <VSelect v-model="serviceCenter" :options="serviceCenters" label="name"></VSelect>
                            </ValidationProviderWrapper>
                        </div>

                        <div class="col-md-6 mb-2">
                            <ValidationProviderWrapper name="Lap Panel" :rules="['required']">
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
    methods: {
        async getPatientLabOrder() {
            this.searching = true
            const { results: patient } = await this.$api.patient.getPatientbyUHID(this.search)
            console.log(patient[0])
            if (patient.length > 0) {
                this.currentData = patient[0]
                this.patientData = patient[0]
                this.recipientEmail = patient[0].email
                this.patientName = patient[0].salutation + ' ' + patient[0].firstname + " " + patient[0].lastname
            }
            else {
                this.patientName = 'No matching record...'
                this.currentData = {}
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
                if (await this.$refs.form.validate()) {
                    if (this.recipientEmail) {
                        this.currentData.email = this.recipientEmail
                    }
                    const data = await this.$api.laboratory.saveLabOrder({
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
        }
    },
}
</script>

<style lang="scss" scoped>
</style>