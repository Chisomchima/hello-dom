<template>
    <div>
        <div v-if="Object.keys(template ? template: {}) > 0">
            <h3 class="text-20">Previous encounter</h3>
            <div v-for="(section, index) in template.content" :key="index">
                <div>
                    <p class="text-center pb-4">{{ section.context }}</p>
                </div>
                <!-- input options -->
                <div class="text-16">
                    {{ section.value }}
                </div>
            </div>
        </div>

        <div class="space" v-else>
            <p class="text-center text-info">No previous records.</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        template: {
            type: Object,
            required: false,
            default: {}
        }
    },
    data() {
        return {
            info: {
                name: ''
            }
        }
    },

    methods: {
        uploadFile() {
            if (this.$refs.fileInput) {
                const uploadField = this.$refs.fileInput[0]
                uploadField.click()
            }
        },
        async setFile(event, index) {
            const file = event.target.files[0]

            this.info.name = file.name
            console.log('skip')

            this.$emit("setfile", event, index)

            // const broadcastForm = new FormData()
            // broadcastForm.append('name', file.name)
            // broadcastForm.append('file', file)
            // broadcastForm.append('type', file.type)
        },
    }
}

</script>

<style scoped>
.space{
    padding: 5rem;
}
</style>