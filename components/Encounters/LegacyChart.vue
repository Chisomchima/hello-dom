<template>
    <div>
        <div class="p-3 text-center">
            <div>
                <EncountersLegacyVitals :chartVitals="legacy.vitals" :consultationData="consultationData" />
                <hr>
            </div>
            <div>
                <EncountersRos :comments="legacy.ros" :consultationData="consultationData" />
                <hr>
            </div>
            <div>
                <EncountersExam :comments="legacy.exam" :consultationData="consultationData" />
                <hr>
            </div>
           <div>
            <EncountersDiagnosis :comments="legacy.diag" :consultationData="consultationData" />
            <hr>
           </div>
           <div>
            <EncountersOrder :orders="legacy.orders" :consultationData="consultationData" />
            <hr>
           </div>
            <div>
                <EncountersPlan :comments="legacy.plan" :consultationData="consultationData" />
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        consultationData:{
            type: Object,
            required: true
        },
        legacy: {
            type: Object,
            required: true
        }
    }

}
</script>

<style></style>