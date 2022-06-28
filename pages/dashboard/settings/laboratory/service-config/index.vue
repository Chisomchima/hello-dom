<template>
    <div>
        <h5>Service Configurations</h5>
        <UtilsBaseCardTab>
            <UtilsCardTab title="Lab Panel">
                <keep-alive>
                    <SettingsLabPanel />
                </keep-alive>
            </UtilsCardTab>
            <UtilsCardTab title="Lab Observation">
                <keep-alive>
                    <SettingsLabObservations/>
                </keep-alive>
            </UtilsCardTab>
            <UtilsCardTab title="Lab Specimen">
                <keep-alive>
                    <SettingsLabSpecimen/>
                </keep-alive>
            </UtilsCardTab>
        </UtilsBaseCardTab>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>