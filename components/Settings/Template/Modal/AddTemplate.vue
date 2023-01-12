<template>
    <ModalWrapper size="xl" id="addTemplate" :scrollable="true" :title="modalTitle" @ok="ok()" @hide="clear()">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Title" :rules="['required']">
                            <input v-model="dataObject.title" type="text" class="form-control" />
                        </ValidationProviderWrapper>
                    </div>

                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Description" :rules="['']">
                            <input v-model="dataObject.description" type="text" class="form-control" />
                        </ValidationProviderWrapper>
                    </div>

                    <div class="col-md-12 mb-2 d-flex justify-content-between align-items-center">
                        <div class="
                            ml-0
                            text-primary text-14">
                            <span @click="addSection" class="point">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                    <path fill="currentColor"
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                                Add section
                            </span>
                        </div>
                        <div class="d-flex">
                            <ValidationProviderWrapper name="" :rules="['']">
                                <b-form-checkbox size="lg" switch v-model="dataObject.is_private">
                                </b-form-checkbox>
                            </ValidationProviderWrapper>
                            <div class="text-14 mt-1" v-if="dataObject.is_private">Private</div>
                            <div class="text-14 mt-1" v-else>Public</div>
                        </div>
                    </div>

                   <div class="mx-2 w-100">
                    <div v-for="(section, index) in dataObject.content" :key="index" class="w-100 border py-2 border-secondary rounded mb-3 d-flex flex-wrap">
                        <div class="
                            ml-0
                            text-primary text-14 col-md-12 d-flex justify-content-end mb-2">
                                <span @click="addColumn(index)" class="point">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                        <path fill="currentColor"
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                    </svg>
                                    Add column
                                </span>
                            </div>
                        <div v-for="(col, innerIndex) in section" :key="innerIndex"
                            class="col-md-6 border border-primary p-2 py-3 mb-2 rounded shadow-lg">
                            <div class="d-flex justify-content-end">
                                <div class="point text-danger float" @click="deleteColumn(index, innerIndex)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                                    </svg>
                                </div>
                            </div>
                            
                            <label class="text-grey text-12">Title</label>
                            <input v-model="col.context" type="text" class="form-control" />
                            <label class="text-grey text-12">Type</label>
                            <v-select v-model="col.type" class="style-chooser text-grey text-14"
                                placeholder="Input type" :options="sectionType" label="label" :opt="opt => opt.val">
                            </v-select>
                            <div v-if="col.type">
                                <div v-if="col.type.val === 'dropdown'">
                                    options
                                </div>
                            </div>
                        </div>

                        <div class="d-flex col-md-12 justify-content-end mt-2 mr-3">
                                <div class="d-flex">

                                    <div class="text-14 mt-1" v-if="section.required">Required</div>
                                    <div class="text-14" v-else></div>
                                    <ValidationProviderWrapper name="" :rules="['']">
                                        <b-form-checkbox size="lg" switch v-model="section.required">
                                        </b-form-checkbox>
                                    </ValidationProviderWrapper>
                                </div>
                                <span class="point text-danger" @click="deleteSection(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                                    </svg>
                                </span>
                            </div>
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
        modalTitle: {
            type: String,
            require: false,
            default: () => 'Add Template',
        },
    },
    data() {
        return {
            dataObject: {
                title: "",
                description: "",
                content: [
                    [
                        {
                            context: '',
                            type: null,
                            required: false
                        }
                    ]
                ],
                is_private: false
            },
            sectionType: [{
                label: 'Text',
                val: 'text'
            },
            {
                label: 'Text Area',
                val: 'text-area'
            },
            {
                label: 'Checkbox',
                val: 'checkbox'
            },
            {
                label: 'File',
                val: 'file'
            },
            {
                label: 'Date',
                val: 'date'
            },
            {
                label: 'Dropdown',
                val: 'dropdown'
            }],
            title: '',
            departments: []
        }
    },
    async created() {

    },
    watch: {
        editData: {
            handler(newVal) {
                if (Object.keys(newVal).length > 0) {
                    this.dataObject.id = newVal.id
                    this.dataObject.title = newVal.title
                    this.dataObject.description = newVal.description
                    this.dataObject.content = newVal.content
                    this.dataObject.is_private = newVal.is_private
                }
            },
            immediate: true,
            deep: true,
        },
        modalTitle() {
            this.title = this.modalTitle
        },
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
        addColumn(index) {
            this.dataObject.content[index].push({
                context: '',
                type: null,
                required: false
            })
        },
        addSection() {
            this.dataObject.content.push(
                [
                    {
                        context: '',
                        type: null,
                        required: false
                    }
                ]
            )
        },
        deleteSection(e) {
            this.dataObject.content.length !== 0 && this.dataObject.content.splice(e, 1)
        },
        deleteColumn(index, innerIndex){
            console.log({index}, {innerIndex})
            this.dataObject.content[index][innerIndex].length !== 1 && this.dataObject.content[index].splice(innerIndex, 1)
        },
        async save() {
            try {
                const data = await this.$api.templates.createEncTemplate(this.dataObject)
                this.$emit('refresh')
                this.$bvModal.hide('addTemplate')
            } catch (error) {
                console.log(error)
            }
        },
        async edit() {
            try {
                const data = await this.$api.templates.updateEncTemplate(
                    this.dataObject.id,
                    this.dataObject
                )
                this.$emit('refresh')
                this.$bvModal.hide('addTemplate')
            } catch (error) {
                console.log(error)
            }
        },

        clear() {
            this.dataObject = {
                title: "",
                description: "",
                content: [
                    [
                        [
                            {
                                context: '',
                                type: null,
                                required: false
                            }
                        ]
                    ]
                ],
                is_private: false
            }
        },
    },
}
</script>
  
<style lang="scss" scoped>
.float{
    position: absolute;
    top: -8px;
    right: -5px
}
</style>