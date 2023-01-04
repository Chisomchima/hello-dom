<template>
    <div>
        <div class="d-flex justify-content-end">
            <div class="col-md-4 mb-2">
                <v-select style="height: 35px" v-model="template" class="style-chooser text-grey text-14" placeholder="Templates"
                    :options="presets" label="title">
                </v-select>
            </div>
        </div>
        <TransitionWrapper>
                <EncountersTemplate v-if="selected" @setfile="setFile"  :template="content" />
            <div class="space" v-else>
                <p class="text-center text-info">No template selected, select from the dropdown to chart.</p>
            </div>
        </TransitionWrapper>
    </div>
</template>

<script>
export default {
    data() { 
        return {
            template: null,
            selected: false,
            presets: []
        }
    },
    async created() {
        let response = await this.$api.templates.getEncTemplates({ size: 1000 })
        this.presets = response.results
    },
    computed: {
        content() {
            return this.template
        }
    },
    watch: {
        template(val) {
            if (val !== null) {
                this.selected = true
            }
            else {
                this.selected = false
            }
        }
    },
    methods: {
        setFile(event, index){
            this.template.content[index ? index : 0].value = event.target.value
        }
    }
}

</script>

<style scoped>
.space{
    padding: 5rem;
}
</style>