<template>
    <div>
        <h3 class="text-20">{{ template.title }}</h3>
        <div v-for="(section, index) in template.content" :key="index">
            <div>
                <!-- <p class="text-center py-3">{{ section.context }}</p> -->
                <ul>
                    <li>{{ section.context }}</li>
                </ul>
            </div>
            <!-- input options -->
            <div>
                <div v-if="section.type.val == 'text'">
                    <ValidationProviderWrapper name="" :rules="section.required ? ['required'] : ['']">
                        <input v-model="section.value" class="input-special" type="text">
                    </ValidationProviderWrapper>
                </div>
                <div v-if="section.type.val == 'date'">
                    <ValidationProviderWrapper name="" :rules="section.required ? ['required'] : ['']">
                        <input v-model="section.value" class="form-control" type="date">
                    </ValidationProviderWrapper>
                </div>
                <div v-if="section.type.val == 'text-area'">
                    <ValidationProviderWrapper name="" :rules="section.required ? ['required'] : ['']">
                        <textarea v-model="section.value" rows="10" col="10" class="form-control"></textarea>
                    </ValidationProviderWrapper>
                </div>
                <div v-if="section.type.val == 'dropdown'">
                    <ValidationProviderWrapper name="" :rules="section.required ? ['required'] : ['']">
                        <v-select v-model="section.value" class="style-chooser text-grey text-14" placeholder="Select"
                            :options="[]" label="label">
                        </v-select>
                    </ValidationProviderWrapper>
                </div>
                <div class="d-flex justify-content-center" v-if="section.type.val == 'checkbox'">
                    <div>
                        <ValidationProviderWrapper name="" :rules="section.required ? ['required'] : ['']">
                            <b-form-checkbox v-model="section.value" size="lg" switch>
                            </b-form-checkbox>
                        </ValidationProviderWrapper>
                    </div>
                </div>
                <div class="d-flex justify-content-end align-items-end" v-if="section.type.val == 'file'">
                    <ValidationProviderWrapper name="" :rules="section.required ? ['required'] : ['']">
                        <!-- <label for="formFile" class="form-label">Upload</label>
                        <input class="form-control" type="file" id="formFile"/> -->
                        <input @change="setFile($event, index)" ref="fileInput" class="invisible" type="file">
                    </ValidationProviderWrapper>
                    <p v-if="info.name" class="mb-0 mx-3">{{ info.name }}</p>
                    <p v-else class="mb-0 mx-3">Click to attach a file</p>
                    <button class="btn btn-outline-primary rounded" @click="uploadFile">Upload</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        template: {
            type: Object,
            required: true
        }
    },
    data(){
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
.input-special{
    width: 100%;
    border: 0;
    border-bottom: 1px solid #e7e8eb;
    outline: 0;
    height: 36px;
    /* background: #fbfdfe; */
}
</style>