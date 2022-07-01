<template>
    <div>
        <ModalWrapper size="lg" id="addvital" title="Add Vitals" @ok="addVitals" @show="openForm" @hide="cancel"
            centered hide-footer>

            <div class=" row px-2">

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div>
                        <small class="text-grey text-12">Time Taken</small>
                        <input v-model="time" class="form-control ng-untouched ng-pristine ng-valid"
                            type="datetime-local" />
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <small class="text-grey text-12">Weight (kg)</small><input type="number" v-model="weight"
                        placeholder="Weight" class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Height (cm)</small><input type="number" v-model="height"
                        placeholder="Height" class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">BMI (kg/m<sup>2</sup>)</small><input disabled type="number"
                        v-model="vitals.bmi" placeholder="BMI" class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Systolic B.P</small><input type="number" v-model="vitals.systolic"
                        placeholder="Systolic B.P" class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Diastolic B.P</small><input type="number"
                        v-model="vitals.diastolic" placeholder="Diastolic B.P"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Temperature °F</small><input type="number"
                        v-model="vitals.temperature" placeholder="Temperature"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Respiratory Rate (/min)</small><input type="number"
                        v-model="vitals.respiratory" placeholder="Respiratory Rate"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Heart Rate (BPM)</small><input type="number"
                        v-model="vitals.heart_rate" placeholder="Heart Rate"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Urine Output</small><input type="number"
                        v-model="vitals.urine_output" placeholder="Urine Output"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Blood Sugar (F)</small><input type="number"
                        v-model="vitals.blood_sugar_f" placeholder="Blood Sugar (F)"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Blood Sugar (R)</small><input type="number"
                        v-model="vitals.blood_sugar_r" placeholder="Blood Sugar (R)"
                        class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">SPO2</small><input type="number" v-model="vitals.spo2"
                        placeholder="SPO2" class="form-control ng-untouched ng-pristine ng-valid" />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">AVPU</small>
                    <v-select v-model="vitals.avpu" class="style-chooser" placeholder="AVPU"></v-select>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Trauma</small>
                    <v-select v-model="vitals.trauma" class="style-chooser" placeholder="Trauma"></v-select>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Mobility</small>
                    <v-select v-model="vitals.mobility" class="style-chooser" placeholder="Mobility"></v-select>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Oxygen Supplementation</small>
                    <v-select class="style-chooser" v-model="vitals.oxygen" placeholder="Oxygen Supplementation">
                    </v-select>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 w-100">
                    <small class="text-grey text-12">Fluid intake</small>
                    <v-select v-model="vitals.intake" class="style-chooser" placeholder="Fluid intake"></v-select>
                </div>

                <div class="col-lg-6 col-md-12 col-sm-12">
                    <div class="d-flex text-16 justify-content-between align-items-end">
                        <div class="col-lg-6 col-md-6 pl-0 col-sm-12">
                            <small class="text-grey text-12">Fluid output</small>
                            <v-select v-model="vitals.output" class="style-chooser" placeholder="Fluid output">
                            </v-select>
                        </div>

                        <!-- <div class="col-lg-6 col-md-6 px-0 col-sm-12">
                                <button @click="closeForm" class="btn mx-3 text-14 btn-light">
                                    Cancel
                                </button>

                                <BaseButton :disabled="allow" @click.prevent="addVitals" class="btn-primary">Save
                                </BaseButton>
                            </div> -->
                    </div>
                </div>
            </div>

        </ModalWrapper>
    </div>
</template>

<script>

export default {
    data() {
        return {
            nurseFlag: false,
            chart: {
                vitals: {},
            },
            time: "",
            height: null,
            weight: null,
            vitals: {
                bmi: null,
                height: null,
                weight: null,
                systolic: null,
                diastolic: null,
                temperature: null,
                respiratory: null,
                heart_rate: null,
                urine_output: null,
                blood_sugar_f: null,
                blood_sugar_r: null,
                time: "",
                spo2: null,
                avpu: "",
                trauma: "",
                mobility: "",
                oxygen: "",
                intake: "",
                output: "",
            },
        }
    },
    props: {
        encounterData: {
            type: Object,
            required: true
        }
    },
    mounted(){ 
    },
    watch: {
        height() {
            this.calc();
        },
        weight() {
            this.calc();
        },
        time() {
            this.getDateTime()
        },
        "vitals.time": {
            handler() {
                let x = this.vitals.time;
                let y = new Date(x).toISOString();
                this.time = y;
            },
        },
    },
    methods: {
        calc() {
            let meter = (this.height / 100) ** 2;
            let soln = this.weight / meter;
            this.vitals.bmi = soln.toFixed(2);
        },
        getDateTime() {
            let day = new Date().toISOString();
            let y = day.substring(0, 16);
            this.time = y;
        },
        openForm() {
            let time = new Date().toISOString();
            let y = time.substring(0, 16);
            this.time = y;
            // console.log(y)
        },
        async updateStatus() {
            try {
                let response = await this.$axios.$patch(
                    `/encounters/encounter/${this.encounterData.id}/`,
                    { status: "NS" }
                );
            } catch (error) {
            } finally {
            }
        },
        async addVitals() {
            this.vitals.height = this.height;
            this.vitals.weight = this.weight;
            if (this.height && this.weight) {
                this.vitals.bmi
            }
            else {
                this.vitals.bmi = 0
            }
            this.vitals.time = this.time;

            try {
                let response = await this.$axios.$post(
                    `encounters/${this.encounterData.id}/charts/`,
                    {
                        chart: {
                            vitals: this.vitals,
                        },
                    }
                );
                this.$toast({
                    type: 'success',
                    text: 'Vitals added',
                })
                this.cancel()
                this.updateStatus();
                this.$bvModal.hide('addvital')
                this.$emit("refresh", true);
            } catch (error) {
                this.$toast({
                    type: 'error',
                    text: 'Unable to add vitals',
                })

            } finally {
            }
        },
        cancel() {
            this.time = ''
            this.vitals.bmi = null;
            this.height = null;
            this.weight = null;
            this.vitals.height = null;
            this.vitals.weight = null;
            this.vitals.systolic = null;
            this.vitals.diastolic = null;
            this.vitals.temperature = null;
            this.vitals.respiratory = null;
            this.vitals.heart_rate = null;
            this.vitals.urine_output = null;
            this.vitals.blood_sugar_f = null;
            this.vitals.blood_sugar_r = null;
            this.vitals.spo2 = null;
            this.vitals.avpu = null;
            this.vitals.trauma = null;
            this.vitals.mobility = null;
            this.vitals.oxygen = null;
            this.vitals.intake = null;
            this.vitals.output = null;
        }
    }
}
</script>

<style>

</style>