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