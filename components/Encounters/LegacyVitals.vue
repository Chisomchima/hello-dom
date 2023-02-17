<template>
    <div class="py-3">
        <div v-if="buffering">
            <div class="my-5 mx-5">
                <b-skeleton-table :rows="3" :columns="3"
                    :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
            </div>
        </div>
        <div v-else>
            <div style="cursor: pointer" class="d-flex sleek justify-content-between">
                <div>
                    <h4 class="text-18 mb-0 text-grey">Vitals</h4>
                </div>

            </div>
            <div class="pt-3 transit">
                <div v-if="chartVitals.length > 0" class="table-fix">
                    <table-component :paginate="false" :busy="busy" :items="chartVitals" :fields="fields">
                        <template #created_at="{ data }">
                            <div class="">
                                <span>{{ data.item.created_at }}</span>
                            </div>
                        </template>
                    </table-component>
                </div>
                <div class="vitalsHeight text-center" v-else>
                    <div class="text-16 text-grey">
                        No Vitals added.
                    </div>
                    <div class="text-primary my-3">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="30"
                            preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                            <g fill="currentColor">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
   
<script>
import { DateTime } from 'luxon'
export default {
    data() {
        return {
            buffering: false,
            height: null,
            weight: null,
            step: true,
            kink: false,
            allow: false,
            nurseFlag: false,
            time: "",
            tempData: [],
            form: {},
            hideVitalsForm: false,
            busy: false,
            isLoading: false,
            itemsToShow: [],
            fields: [
                { key: "score", label: "Score", sortable: true },
                {
                    key: "created_at", label: "Time Taken", formatter: (value) => {
                        return DateTime.fromISO(value).toLocaleString(
                            DateTime.DATETIME_SHORT
                        )
                    }, sortable: true
                },
                { key: "systolic", label: "SBP", sortable: true },
                { key: "diastolic", label: "DBP", sortable: true },

                { key: "temperature", label: "Temp", sortable: true },
                { key: "respiratory", label: "RR", sortable: true },
                { key: "heart_rate", label: "HR", sortable: true },
                { key: "height", label: "Height", sortable: true },
                { key: "weight", label: "Weight", sortable: true },
                { key: "bmi", label: "BMI", sortable: true },
                { key: "spo2", label: "SPO2", sortable: true },

                { key: "blood_sugar_f", label: "BS(F)", sortable: true },
                { key: "blood_sugar_r", label: "BS(R)", sortable: true },
                { key: "urine_output", label: "Urine OP", sortable: true },
            ],
        };
    },

    props: {
        consultationData: {
            type: Object,
            default: () => { },
        },
        chartVitals: {
            type: Array,
            default: () => [],
        },
    },
    mounted() {
        //    this.getVitals();
    },

    methods: {

    },

    watch: {
    },
};
</script>
   
<style scoped>
.site-container {
    width: calc(100vw - var(--sidebar-width) - 20px);
    margin-left: var(--sidebar-width);
    min-height: 100vh;
    padding-top: 1rem;
    position: relative;
    z-index: 1;
    padding: 2rem calc(1rem + 12px);
    background-color: #f5f6f7;
}

.trans {
    transition: fade 0.3s;
}

.table-fix {
    max-width: 100%;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

/* .slide-fade-leave-active {
     transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
   } */

.slide-fade-enter,
.slide-fade-leave-active {
    padding-left: 10px;
    opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.vitalsHeight {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 28vh;
}
</style>