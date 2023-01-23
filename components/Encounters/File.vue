<template>
    <div>
        <TransitionWrapper>
            <EncountersTemplate v-if="flag" @setfile="setFile" :consultationData="consultationData" :template="data" />
            <div class="space" v-else>
                <p class="text-center text-info">No template selected, select from the dropdown to chart.</p>
            </div>
        </TransitionWrapper>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => { },
        },
        consultationData: {
            type: Object,
            default: () => { },
        },
    },
    data() {
        return {
            selected: false,
        }
    },

    computed: {
        flag(){
            if(this.data !== null){
                if(Object.keys(this.data).length > 0){
                return true
            }
            else{
                return false
            }
            }
        }
    },

    methods: {
        setFile(){
            console.log('vghsdhehj')
        }
    }
}

</script>

<style scoped>
.space {
    padding: 5rem;
}
</style>