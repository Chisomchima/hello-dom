<template>
    <ModalWrapper size="lg" id="nurseTask" title="Add nursing order" @ok="ok()" @show="getData()" @hide="clear()"
        :stacking="false">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <ValidationProviderWrapper name="UHID" :rules="['']">
                            <div class="d-flex">
                                <input :value="uhid" type="text" readonly class="form-control" />
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
import calcAge from '@/mixins/calcAge'

export default {
    props: {
        patient: {
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
            if (Object.keys(this.dataObject.patient).length > 0) {
                let response = calcAge(this.patient.date_of_birth)
                return `${this.dataObject.patient.date_of_birth} (${response.year}Y-${response.month}M-${response.day}D)`
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

        async save() {
            try {
                const data = await this.$api.nursing.createNursingTask(this.dataObject)
                this.$emit('refresh')
                this.$bvModal.hide('nurseTask')
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
            this.$emit('hide')
        },
        getData() {
            this.dataObject.patient = this.patient
            let currentAge = calcAge(this.patient.date_of_birth)
            let verdict = ''
            if (currentAge.year === 0)
                verdict = 'Less than a year'
            else if (currentAge.year === 1)
                verdict = '1 year'
            else
                verdict = `${currentAge.year} years`
            console.log(verdict)
            this.dataObject.patient.age = currentAge
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