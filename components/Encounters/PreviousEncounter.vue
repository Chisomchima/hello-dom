<template>
    <div>
        <TransitionWrapper>
            <div>

                <div class="radPI p-3" v-if="fetching">
                    <b-row>
                        <b-col cols="12" class="mt-3">
                            <b-skeleton animation="wave" width="35%"></b-skeleton>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" class="mt-3">
                            <b-skeleton animation="wave" width="85%"></b-skeleton>
                            <b-skeleton animation="wave" width="95%"></b-skeleton>
                            <b-skeleton animation="wave" width="70%"></b-skeleton>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" class="mt-3">
                            <b-skeleton animation="wave" width="85%"></b-skeleton>
                            <b-skeleton animation="wave" width="75%"></b-skeleton>
                            <b-skeleton animation="wave" width="70%"></b-skeleton>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" class="mt-3">
                            <b-skeleton animation="wave" width="75%"></b-skeleton>
                            <b-skeleton animation="wave" width="65%"></b-skeleton>
                            <b-skeleton animation="wave" width="65%"></b-skeleton>
                            <b-skeleton animation="wave" width="65%"></b-skeleton>
                        </b-col>
                    </b-row>
                </div>
                <div v-else>
                    <!-- {{ records }} -->
                    <div v-if="records.length > 0">
                        <div class="p-3 radPI mb-4" v-for="(record, index) in records" :key="index">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h3 class="text-18">{{ record.chart.title }}</h3>
                                    <p class="text-14">Recorded by: {{
                                        record.created_by ? (record.created_by.first_name
                                            + " " + record.created_by.last_name) : ""
                                    }}</p>
                                    <p class="text-14 mb-2">Recorded at: {{
                                        record.created_by ? convDate(record.created_at) :
                                            ""
                                    }}</p>
                                </div>
                                <div v-if="presentUser === record.created_by.id">
                                    <span v-if="!record.edit" class="point" @click="editRecord(index)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
                                            preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725l-.7-.7l1.4 1.4Z" />
                                        </svg>
                                    </span>
                                    <button v-else @click="editRecord(index)"
                                        class="btn btn-outline-danger">Cancel</button>
                                </div>
                            </div>
                            <div v-for="(section, innerIndex) in record.chart.content" :key="innerIndex">
                                <div>
                                    <h3 class="text-16 mb-2 text-bold">{{ section.section }}</h3>
                                </div>
                                <!-- input options -->
                                <div class="d-flex flex-wrap align-items-start">
                                    <div :class="section.cols.length === 1 ? 'col-md-12 px-0' : section.cols.length === 2 ? 'col-md-6 px-0' : section.cols.length === 3 || section.cols.length > 3 ? 'col-md-4 px-0' : ''"
                                        v-for="(col, colIndex) in section.cols" :key="colIndex">
                                        <h3 class="text-14 mb-0">{{ col.header }}</h3>
                                        <div class="">
                                            <div class="" v-for="(field, fieldIndex) in col.form_field"
                                                :key="fieldIndex">
                                                <div class="" v-if="field.type === 'text'">
                                                    <p v-if="!record.edit" class="text-14">
                                                        <span class="">
                                                            {{ field.context }}:
                                                        </span>
                                                        <span class="text-14 ml-1 ">{{
                                                            field.options
                                                        }}</span>
                                                    </p>

                                                    <div v-else class="mx-3">
                                                        <p class="text-14 py-2">{{ field.context }}</p>
                                                        <ValidationProviderWrapper name="" :rules="[]">
                                                            <input v-model="field.options" class="input-special"
                                                                type="text">
                                                        </ValidationProviderWrapper>
                                                    </div>

                                                </div>

                                                <div class="" v-if="field.type == 'dropdown'">
                                                    <p v-if="!record.edit" class="text-14">
                                                        <span v-if="field.context" class="">
                                                            {{ field.context }}:
                                                        </span>
                                                        <span class="text-14 ml-1 ">{{
                                                            field.selected
                                                        }}</span>
                                                    </p>

                                                    <div v-else class="mx-3">
                                                        <div class="py-2">
                                                            <p class="text-14 py-2">{{ field.context }}</p>
                                                            <ValidationProviderWrapper name="" :rules="[]">
                                                                <v-select v-model="field.selected"
                                                                    class="style-chooser text-grey text-14"
                                                                    placeholder="Select" :reduce="(opt) => opt.value"
                                                                    :options="field.options" label="value">
                                                                </v-select>
                                                            </ValidationProviderWrapper>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div v-if="field.type == 'date'">
                                                    <div class="">
                                                        <p v-if="!record.edit" class="text-14">
                                                            <span v-if="field.context" class="">
                                                                {{ field.context }}:
                                                            </span>
                                                            <span class="text-14 ml-1 ">{{
                                                                field.options
                                                            }}</span>
                                                        </p>
                                                        <div v-else>
                                                            <div class="py-2 mx-3">
                                                                <p class="text-14 py-2">{{ field.context }}</p>
                                                                <ValidationProviderWrapper name="" :rules="[]">
                                                                    <input v-model="field.options" class="form-control"
                                                                        type="date">
                                                                </ValidationProviderWrapper>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div v-if="field.type == 'text-area'">
                                                    <div class="">
                                                        <p v-if="!record.edit" class="text-14">
                                                            <span v-if="field.context" class="">
                                                                {{ field.context }}:
                                                            </span>
                                                            <span class="text-14 ml-1 ">{{
                                                                field.options
                                                            }}</span>
                                                        </p>
                                                        <div v-else>
                                                            <div class="py-2 mx-3">
                                                                <p class="text-14 py-2">{{ field.context }}</p>
                                                                <ValidationProviderWrapper name="" :rules="[]">
                                                                    <textarea v-model="field.options" rows="10" col="10"
                                                                        class="form-control"></textarea>
                                                                </ValidationProviderWrapper>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div class="d-flex py-2 align-items-center"
                                                    v-if="field.type == 'checkbox' && field.options">
                                                    <div class="">
                                                        <p v-if="!record.edit" class="text-14">
                                                            <span v-if="field.context" class="">
                                                                {{ field.context }}:
                                                            </span>
                                                            <!-- <span class="text-14 ml-1 ">{{
                                                                field.options
                                                            }}</span> -->
                                                            <b-form-checkbox v-model="field.options" :disabled="true"
                                                                size="lg" switch>
                                                            </b-form-checkbox>
                                                        </p>
                                                        <div class="d-flex py-2 align-items-center" v-else>
                                                            <p class="text-14">{{ field.context }}</p>
                                                            <div class="px-2">
                                                                <ValidationProviderWrapper name="" :rules="[]">
                                                                    <b-form-checkbox v-model="field.options" size="lg"
                                                                        switch>
                                                                    </b-form-checkbox>
                                                                </ValidationProviderWrapper>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <!-- ORDERS -->

                                                <div class="py-0 text-14"
                                                    v-if="field.type == 'diagnosis' && record.chart.diagnosis">
                                                    <span v-if="field.context"> {{ field.context }}:</span>
                                                    <span class="text-14 ml-1 ">{{
                                                        convertToDiagList(record.chart.diagnosis)
                                                    }}</span>

                                                </div>

                                                <div v-if="field.type == 'lab_Order' && col.orders.laboratory !== null && col.orders.laboratory"
                                                    class="py-0 text-14">
                                                    <span v-if="field.context">
                                                        {{ field.context }}:
                                                    </span>

                                                    <span class="text-14 ml-1 ">{{
                                                        convertToLabList(record.chart.orders.laboratory)
                                                    }}</span>

                                                </div>

                                                <div v-if="field.type == 'imaging' && col.orders.imaging !== null && col.orders.imaging"
                                                    class="py-0 text-14">
                                                    <span v-if="field.context">
                                                        {{ field.context }}:
                                                    </span>
                                                    <span class="text-14 ml-1 ">{{
                                                        convertToImgList(record.chart.orders.imaging)
                                                    }}</span>

                                                </div>

                                                <div v-if="field.type == 'prescription' && col.orders.prescription !== null"
                                                    class="py-2">
                                                    <p class="text-14">
                                                        <span v-if="field.context">
                                                            {{ field.context }}:
                                                        </span>
                                                    </p>
                                                    <!-- <p v-for="(pres, index) in record.chart.orders.prescription.details" :key="index" class="text-14 ml-1 ">{{
                                                        convertToPrescription(pres)
                                                    }}</p> -->
                                                    <div v-for="(pres, index) in record.chart.orders.prescription.details"
                                                        :key="index" class="text-14">
                                                        <p>{{ `${pres.generic_drug.name}(${pres.product.name})`}}</p>
                                                        <p>{{ `${pres.unit.name}, ${pres.frequency.name} for
                                                        ${pres.duration.name}`}}</p>
                                                    </div>
                                                </div>

                                                <div v-if="field.type == 'nursing' && col.orders.imaging !== null"
                                                    class="py-0 text-14">

                                                    {{ field.context }}: <span class="text-14 ml-1 ">{{
                                                        col.orders.nursing ? col.orders.nursing.description : ''
                                                    }}</span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div v-if="record.edit" class="d-flex justify-content-end">
                                <button @click.prevent="updateChart(record, index)"
                                    class="btn btn-outline-primary">Save</button>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div class="space" v-if="records.length == 0">
                            <p class="text-center text-info">No previous records.</p>
                        </div>
                    </div>
                </div>


            </div>
        </TransitionWrapper>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { debounce } from 'lodash'
import { DateTime } from 'luxon'
export default {
    props: {
        consultationData: {
            type: Object,
            default: () => { },
        },
        fetchRecord: {
            type: Boolean,
            default: () => false,
        }
    },
    data() {
        return {
            records: [],
            fetching: true,
            identity: null,
            currentPage: 1,
            endOfScroll: null
        }
    },
    mounted() {
        this.getEncountersChart()
        debounce(
            window.onscroll = () => {
                let cond = (document.documentElement.scrollTop + window.innerHeight + 2) >= document.documentElement.offsetHeight
                if (cond && this.endOfScroll !== null) {
                    let page = this.currentPage + 1
                    let filter = {
                        size: 1,
                        page: page
                    }
                    try {
                        let response = this.$api.encounter.getEncountersChart(this.consultationData.id, filter)
                        let arr = Promise.resolve(response)
                        arr.then((value) => {
                            // console.log(value)
                            this.currentPage = value.current_page
                            this.endOfScroll = value.next
                            const formatted = value.results.map((el) => ({
                                ...el,
                                edit: false
                            }))
                            // console.log(formatted)
                            for (let x = 0; x < formatted.length; x++) {
                                this.records.push(formatted[x])
                            }

                            // console.log(this.records.length, this.records)
                        })
                    }
                    catch (error) {

                    }

                }

            }
            , 2000)
    },
    computed: {
        user() {
            return this.$store.state.auth.user.first_name +
                ' ' +
                this.$store.state.auth.user.last_name
        },
        presentUser() {
            return this.$store.state.auth.user.id
        }
    },
    watch: {
        fetchRecord: {
            handler(newval) {
                this.getEncountersChart()
                this.$emit('reset')
            }
        }
    },
    methods: {
        async getEncountersChart(
            page = 1,
            e = {
                size: 1,
                page: page
            }
        ) {

            // this.endOfScroll = 'next'

            let response = await this.$api.encounter.getEncountersChart(this.consultationData.id, e)
            if (response) {
                this.currentPage = response.current_page
                this.endOfScroll = response.next
                const formatted = response.results.map((el) => ({
                    ...el,
                    edit: false
                }))
                this.records = formatted
            }
            this.fetching = false
        },

        async updateChart(line, e) {
            // console.log(line)
            // this.identity = line.created_by.id
            let response = await this.$api.encounter.updateSingleChart(line.chart, this.consultationData.id, line.id)
            if (response) {
                this.records[e].edit = false
                this.$toast({
                    type: 'success',
                    text: 'Updated',
                })
            }
        },
        convDate(x) {
            if (typeof (x) === 'string') {
                return DateTime.fromISO(x).toFormat('yy-LL-dd, T')
            }
        },
        editRecord(e) {
            const backup = cloneDeep(this.records[e].chart.content)
            this.records[e].edit = !this.records[e].edit
            this.records[e].chart.content = backup
        },
        convertToImgList(img) {
            let list = img.img_obv_orders.map((el) => (el.img_obv.name))
            // console.log(list)
            let word = list.join(', ')
            return word
        },
        convertToDiagList(diag) {
            let list = diag.map((el) => el.value.diagnosis.case.replaceAll(',', ' ') + " " + `(${el.value.status})`)
            let word = list.join(', ')
            return word
        },
        convertToLabList(lab) {
            let list = lab.lab_panel_orders.map((el) => el.panel.name)
            // console.log(list)
            let word = list.join(', ')
            return word
        },
        convertToPrescription(pres) {
            // console.log({pres}, {index})
            let line = `${pres.generic_drug.name}(${pres.product.name}) ${pres.unit.name}`

            return line
        }
    }
}

</script>

<style lang="scss" scoped>
.space {
    padding: 5rem;
}

.radPI {
    border-radius: 10px;
    box-shadow: 4px 4px 3px 0px #e8e8e8;
    border: 1px solid #e7e8eb
}

.input-special {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #e7e8eb;
    outline: 0;
    height: 36px;
    /* background: #fbfdfe; */
}
</style>