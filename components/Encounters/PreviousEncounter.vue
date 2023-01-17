<template>
    <div>
        <TransitionWrapper>
            <EncountersPreviousReport :template="content" />
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
            if(this.template){
                return {}
            }
            else{
                return {}
            }
        },
        
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
        setFile(event, index) {
            this.template.content[index ? index : 0].value = event.target.value
        }
    }
}

</script>

<style lang="scss" scoped>
.space {
    padding: 5rem;
}

</style>