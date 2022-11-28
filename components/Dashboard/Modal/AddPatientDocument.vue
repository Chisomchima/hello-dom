<template>
    <ModalWrapper :submitTitle="`Upload`" id="document" title="Attach Document" @ok="ok()" @hide="clear()" @show="getData">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Title" :rules="['required']">
                            <input v-model="dataObject.title" class="form-control" type="text" />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="File type" :rules="['required']">
                            <VSelect v-model="dataObject.file_type" :reduce="opt => opt.id" :options="fileTypes" label="name"></VSelect>
                        </ValidationProviderWrapper>
                    </div>
                    <div class="d-none">
                        <div class="">
                            <label class="form-control-label">File</label>
                            <input @change="importData" ref="file" type="file" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-12 mb-2 text-center">
                        <div v-if="!uploadedFile" class="d-flex align-items-center justify-content-center pt-3">
                            <button @click.prevent="attachFile" class="btn btn-outline-info">
                                Upload file <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="m14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8m4 18V9h-5V4H6v16h12m-6-8l4 4h-2.5v3h-3v-3H8l4-4Z" />
                                </svg>
                            </button>
                        </div>

                        <div v-if="uploadedFile" class="border border-info p-3 height rounded text-14 m-3">
                            <div>
                                <div>Name: {{ fileInfo.name }}</div>
                                <div>Size: {{ fileInfo.size }}</div>
                            </div>
                            <span class="point float text-danger" @click="removeFile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </ValidationObserver>
    </ModalWrapper>
</template>
  
<script>
export default {
    props: {
        editData: {
            type: Object,
            require: false,
            default: () => ({}),
        },
        patient: {
            type: Object,
            require: true
        },
        modalTitle: {
            type: String,
            require: false,
            default: () => 'Add specimen',
        }
    },
    data() {
        return {
            dataObject: {
                title: '',
                file: null,
                patient: this.patient,
                file_type: null
            },
            fileTypes: [],
            uploadedFile: null,
            fileInfo: {
                name: '',
                size: null,
            }
        }
    },
    watch: {
        editData: {
            handler(newVal) {
                if (Object.keys(newVal).length > 0) {
                    this.dataObject.id = newVal.id
                    this.dataObject.title = newVal.title
                    this.dataObject.patient = newVal.patient
                }
            },
            immediate: true,
            deep: true,
        },
    },
    mounted() {
        this.getData()
    },
    methods: {
        async ok() {
            if (await this.$refs.form.validate()) {
                if (this.dataObject.id) {
                    this.edit()
                } else {
                    this.save()
                }
            }
        },
        attachFile() {
            this.$refs.file.click()
            console.log(this.$refs.file)
        },
        removeFile() {
            this.uploadedFile = null
            this.fileInfo = {
                name: '',
                size: null,
            }
        },
        importData(e) {
            const formatFileSize = function (byte) {
                const sufixes = ['B', 'kB', 'MB', 'GB', 'TB'];
                const i = Math.floor(Math.log(byte) / Math.log(1024));
                return `${(byte / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
            };
            if (!this.uploadedFile) {
                this.fileInfo.size = formatFileSize(e.target.files[0].size)
                this.fileInfo.name = e.target.files[0].name
                this.uploadedFile = e.target.files[0]
            }
        },
        getData() {
            this.dataObject.id = this.editData.id
            this.dataObject.title = this.editData.title
            this.dataObject.patient = this.editData.patient
            this.getFileTypes()
        },
        async save() {
            try {
                let formData = new FormData();
                formData.append('file', this.uploadedFile)
                formData.append('title', this.dataObject.title)
                formData.append('file_type', this.dataObject.file_type)
                formData.append('patient', this.patient.id)
                const data = await this.$api.files.attachDocument(formData)
                this.$emit('refresh')
                this.$bvModal.hide('document')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        async edit() {
            try {
                let formData = new FormData();
                formData.append('file', this.uploadedFile)
                formData.append('title', this.dataObject.title)
                formData.append('patient', this.patient.id)
                const data = await this.$api.files.updateDocument(
                    this.dataObject.id,
                    formData
                )
                this.$emit('refresh')
                this.$bvModal.hide('document')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },

        async getFileTypes() {
            try {
                const { results } = await this.$api.core.getFileTypes({
                    size: 1000,
                })
                this.fileTypes = results
            } catch (error) {
                console.log(error)
            }
        },

        clear() {
            this.$emit('hide')
            this.dataObject = {
                title: '',
                file: null,
                patient: this.patient,
                file_type: null
            }
            this.uploadedFile = null
            this.fileInfo = {
                name: '',
                size: null,
            }
        }
    },
}
</script>
  
<style lang="scss" scoped>
.float {
    position: relative;
    top: -58px;
    right: -203px;
}

.height {
    height: 5rem;
}
</style>