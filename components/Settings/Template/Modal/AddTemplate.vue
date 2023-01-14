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
                                <b-form-checkbox size="lg" switch v-model="dataObject.is_active">
                                </b-form-checkbox>
                            </ValidationProviderWrapper>
                            <div class="text-14 mt-1" v-if="dataObject.is_active">Active</div>
                            <div class="text-14 mt-1" v-else>Disabled</div>
                        </div>
                    </div>

                    <div class="mx-2 w-100">
                        <div v-for="(section, index) in dataObject.content" :key="index"
                            class="w-100 border py-2 border-secondary rounded mb-3 d-flex flex-wrap">
                            <div class="
                            ml-0
                             text-14 w-100 mx-2 d-flex justify-content-between pb-2 mb-3 border-bottom">
                                <div class="header d-flex justify-content-between align-items-end px-2 pb-0">
                                    <div class="w-100 hh d-flex align-items-end">
                                        <span class="point mr-1" @click="closeSection(index)" v-if="section.show">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="m6.7 18l-5.65-5.65l1.425-1.4l4.25 4.25l1.4 1.4Zm5.65 0L6.7 12.35l1.4-1.425l4.25 4.25l9.2-9.2l1.4 1.425Zm0-5.65l-1.425-1.4L15.875 6L17.3 7.4Z" />
                                            </svg>
                                        </span>
                                        <span class="point mr-1" @click="openSection(index)" v-else>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725l-.7-.7l1.4 1.4Z" />
                                            </svg>
                                        </span>
                                        <div class="text-16 px-1" v-if="!section.show">
                                            <p class="mb-0">{{ section.section }}</p>
                                        </div>
                                        <div class="rounded w-100" v-else>
                                            <input @keyup.enter="closeSection(index)" v-model="section.section"
                                                class="formhead2" type="text" />
                                        </div>
                                    </div>

                                    <div class="text-14 hh d-flex align-items-end">


                                        <!-- <span class="text-danger point" @click="deleteSection(index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
                                            </svg>
                                        </span> -->

                                    </div>
                                </div>
                                <div @click="addColumn(index)"
                                    class="point d-flex align-items-center text-14 border rounded p-2 text-primary">
                                    <div>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                                <path fill="currentColor"
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                            </svg>
                                            <span class="text-12">Add column</span>
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div v-for="(col, innerIndex) in section.cols" :key="innerIndex"
                                :class="section.cols.length > 1 ? 'mywidth mx-2 mb-3' : 'w-100 mx-2 mb-3'">
                                <Panel>
                                    <template #header>
                                        <span class="point mr-2" @click="closeMode(index, innerIndex)" v-if="col.show">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="m6.7 18l-5.65-5.65l1.425-1.4l4.25 4.25l1.4 1.4Zm5.65 0L6.7 12.35l1.4-1.425l4.25 4.25l9.2-9.2l1.4 1.425Zm0-5.65l-1.425-1.4L15.875 6L17.3 7.4Z" />
                                            </svg>
                                        </span>
                                        <span class="point mr-2" @click="openMode(index, innerIndex)" v-else>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725l-.7-.7l1.4 1.4Z" />
                                            </svg>
                                        </span>
                                        <div class="w-100 hk text-14">
                                            <div class="text-underline" v-if="!col.show">
                                                {{ col.header }}
                                            </div>
                                            <div v-else>
                                                <input @keyup.enter="closeMode(index, innerIndex)" v-model="col.header"
                                                    :class="section.cols.length > 1 ? 'formhead' : 'formheadef w-25'"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div class="text-14 w-25 d-flex justify-content-end">
                                            <span class="text-danger point" @click="deleteColumn(index, innerIndex)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                    <path fill="currentColor"
                                                        d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
                                                </svg>
                                            </span>

                                        </div>
                                    </template>
                                    <div class="w-100">

                                        <div>
                                            <!-- <label class="text-grey text-12">Name</label> -->
                                            <input v-model="col.context" type="text" placeholder="Enter question"
                                                class="form-control" />
                                            <!-- <label class="text-grey text-12">Form field</label> -->
                                            <!-- <v-select v-model="col.type" class="style-chooser text-grey text-14"
                                                placeholder="Input type" :options="sectionType" label="label"
                                                :opt="opt => opt.val">
                                            </v-select> -->


                                            <div>
                                                <div class="pt-3">
                                                    <!-- <p class="text-14 text-center mb-2">Add options</p> -->



                                                    <div v-for="(option, optionIndex) in col.form_field"
                                                        :key="optionIndex">

                                                        <div v-if="option.type === 'text'" class="w-100  mb-2">
                                                            <!-- Handle textfield -->
                                                            <div class="w-100 d-flex mb-2"
                                                                v-for="(item, itemindex) in option.options"
                                                                :key="itemindex">
                                                                <input v-model="item.value" type="text"
                                                                    placeholder="Enter option" class="form-control" />
                                                                <span class="text-danger ml-2 point"
                                                                    @click="deleteOption(index, innerIndex, optionIndex, itemindex)">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                        height="20" preserveAspectRatio="xMidYMid meet"
                                                                        viewBox="0 0 24 24">
                                                                        <path fill="currentColor"
                                                                            d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div v-if="option.type === 'checkbox'" class="w-100  mb-2">
                                                            <!-- Handle checkbox -->
                                                            <div class="w-100 d-flex mb-2"
                                                                v-for="(item, itemindex) in option.options"
                                                                :key="itemindex">
                                                                <div class="mr-2">
                                                                    <input v-model="item.value" type="checkbox"
                                                                        class="checkbox" />
                                                                </div>
                                                                <span class="text-danger ml-2 point"
                                                                    @click="deleteOption(index, innerIndex, optionIndex, itemindex)">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                        height="20" preserveAspectRatio="xMidYMid meet"
                                                                        viewBox="0 0 24 24">
                                                                        <path fill="currentColor"
                                                                            d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div v-if="option.type === 'text-area'" class="w-100  mb-2">
                                                            <!-- Handle text-area -->
                                                            <div class="w-100 d-flex mb-2"
                                                                v-for="(item, itemindex) in option.options"
                                                                :key="itemindex">
                                                                <div class="w-100">
                                                                    <textarea id="" v-model="item.value"
                                                                        class="form-control" name="" cols="30"
                                                                        rows="1"></textarea>
                                                                </div>
                                                                <span class="text-danger ml-2 point"
                                                                    @click="deleteOption(index, innerIndex, optionIndex, itemindex)">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                        height="20" preserveAspectRatio="xMidYMid meet"
                                                                        viewBox="0 0 24 24">
                                                                        <path fill="currentColor"
                                                                            d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div v-if="option.type === 'date'" class="w-100  mb-2">
                                                            <!-- Handle Date -->
                                                            <div class="w-100 d-flex mb-2"
                                                                v-for="(item, itemindex) in option.options"
                                                                :key="itemindex">
                                                                <div class="w-100">
                                                                    <input v-model="item.value" type="date"
                                                                        class="form-control" />
                                                                </div>
                                                                <span class="text-danger ml-2 point"
                                                                    @click="deleteOption(index, innerIndex, optionIndex, itemindex)">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                        height="20" preserveAspectRatio="xMidYMid meet"
                                                                        viewBox="0 0 24 24">
                                                                        <path fill="currentColor"
                                                                            d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div v-if="option.type === 'dropdown'" class="w-100  mb-2">
                                                            <!-- Handle Dropdown -->
                                                            <div class="w-100 mb-2">
                                                                <VSelect :multiple="true" placeholder="Select option"
                                                                    label="value" :options="option.options">
                                                                </VSelect>
                                                            </div>
                                                            <div class="w-100 d-flex mb-2"
                                                                v-for="(item, itemindex) in option.options"
                                                                :key="itemindex">
                                                                <div class="w-100">
                                                                    <input v-model="item.value" type="text"
                                                                        class="form-control" />
                                                                </div>
                                                                <span class="text-danger ml-2 point"
                                                                    @click="deleteOption(index, innerIndex, optionIndex, itemindex)">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                        height="20" preserveAspectRatio="xMidYMid meet"
                                                                        viewBox="0 0 24 24">
                                                                        <path fill="currentColor"
                                                                            d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div v-if="option.type !== 'dropdown' && option.type !== null"
                                                            class="d-flex justify-content-end mb-3">
                                                            <div @click="printOption(index, innerIndex, optionIndex)"
                                                                class="text-primary point">
                                                                <span class="point">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                        height="20" preserveAspectRatio="xMidYMid meet"
                                                                        viewBox="0 0 16 16">
                                                                        <path fill="currentColor"
                                                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                                                    </svg>
                                                                </span>
                                                                <span class="text-12">
                                                                    Add field
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div v-if="option.type === 'dropdown'"
                                                            class="d-flex justify-content-end mb-3">
                                                            <div @click="printOption(index, innerIndex, optionIndex)"
                                                                class="text-primary point">
                                                                <span class="point">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                        height="20" preserveAspectRatio="xMidYMid meet"
                                                                        viewBox="0 0 16 16">
                                                                        <path fill="currentColor"
                                                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                                                    </svg>
                                                                </span>
                                                                <span class="text-12">
                                                                    Add option
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div class="w-100 d-flex justify-content-end">
                                                            <b-dropdown text="Add form field" variant="outline-primary"
                                                                class="m-2">
                                                                <b-dropdown-item
                                                                    v-for="(form, formindex) in sectionType"
                                                                    :key="formindex"
                                                                    @click="setInputType(index, innerIndex, optionIndex, form)">{{
                                                                        form.label
                                                                    }}</b-dropdown-item>
                                                            </b-dropdown>
                                                        </div>
                                                    </div>




                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- <div class="d-flex justify-content-end mt-2">

                                        <div class="text-14 mt-1 mr-1" v-if="col.required">Required</div>
                                        <div class="text-14" v-else></div>
                                        <ValidationProviderWrapper name="" :rules="['']">
                                            <b-form-checkbox size="lg" switch v-model="col.required">
                                            </b-form-checkbox>
                                        </ValidationProviderWrapper>
                                    </div> -->
                                </Panel>
                            </div>


                            <div class="d-flex col-md-12 justify-content-end mt-2 mr-3">

                                <span class="point text-danger" @click="deleteSection(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                        preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" />
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
import Panel from 'primevue/panel';
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
            editMode: false,
            startCol: false,
            dataObject: {
                title: "",
                description: "",
                content: [
                    {
                        section: 'Section title',
                        show: false,
                        cols: [
                            {
                                header: 'Title',
                                context: '',
                                form_field: [
                                    {
                                        type: null,
                                        options: [
                                            {
                                                value: ''
                                            }
                                        ]
                                    }
                                ],
                                required: false,
                                show: false,

                            }
                        ]
                    }
                ],
                is_active: false
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
        closeSection(index) {
            this.dataObject.content[index].show = false
        },
        openSection(index) {
            this.dataObject.content[index].show = true
        },
        closeMode(index, innerIndex) {
            this.dataObject.content[index].cols[innerIndex].show = false
        },
        openMode(index, innerIndex) {
            this.dataObject.content[index].cols[innerIndex].show = true
        },
        printOption(index, innerIndex, optionIndex) {
            let length = this.dataObject.content[index].cols[innerIndex].form_field[optionIndex].options.length
            this.dataObject.content[index].cols[innerIndex].form_field[optionIndex].options.push({
                // label: `Option ${length + 1}`,
                value: ''
            })
        },
        deleteOption(index, innerIndex, optionIndex, itemindex) {
            this.dataObject.content[index].cols[innerIndex].form_field[optionIndex].options.splice(itemindex, 1)
        },
        setInputType(index, innerIndex, optionIndex, input) {
            this.dataObject.content[index].cols[innerIndex].form_field[optionIndex].options = [{
                value: ''
            }]
            this.dataObject.content[index].cols[innerIndex].form_field[optionIndex].type = input.val
        },
        addColumn(index) {
            if (this.dataObject.content[index].cols.length < 4) {
                this.dataObject.content[index].cols.push({
                    header: 'Title',
                    context: '',
                    form_field: [
                        {
                            type: null,
                            options: [
                                {
                                    value: ''
                                }
                            ]
                        }
                    ],
                    required: false,
                    show: false,
                })
            }
        },
        addSection() {
            this.dataObject.content.push(
                {
                    section: 'Section title',
                    show: false,
                    cols: [
                        {
                            header: 'Title',
                            context: '',
                            form_field: [
                                {
                                    type: null,
                                    options: [
                                        {
                                            value: ''
                                        }
                                    ]
                                }
                            ],
                            required: false,
                            show: false,

                        }
                    ]
                }
            )
        },
        deleteSection(e) {
            this.dataObject.content.length !== 0 && this.dataObject.content.splice(e, 1)
        },
        deleteColumn(index, innerIndex) {
            this.dataObject.content[index].cols[innerIndex].length !== 1 && this.dataObject.content[index].cols.splice(innerIndex, 1)
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
                    {
                        section: 'Section title',
                        show: false,
                        cols: [
                            {
                                header: 'Title',
                                context: '',
                                form_field: [
                                    {
                                        type: null,
                                        options: [
                                            {
                                                value: ''
                                            }
                                        ]
                                    }
                                ],
                                required: false,
                                show: false,

                            }
                        ]
                    }
                ],
                is_active: false
            }
        },
    },
}
</script>
  
<style lang="scss">
.float {
    position: relative;
    top: -20px;
    right: -18px
}

.p-panel .p-panel-header {
    border: 1px solid #dee2e6;
    padding: .5rem;
    background: #f8f9fa;
    color: #495057;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
}

.trouble {
    height: 3px;
}

.mywidth {
    max-width: 47.8%;
    min-width: 47.8%;
}

.formhead {
    outline: 0;
    width: 100%;
    border: 0;
    height: 25px;
    border-bottom: 1px dashed #000;
}

.formheadef {
    outline: 0;
    border: 0;
    height: 25px;
    border-bottom: 1px dashed #000;
}

// .hk {
//     height: 25px;
// }

.formhead2 {
    outline: 0;
    width: 100%;
    border: 0;
    border-bottom: 1px dashed #000;
    height: 35px;
    background: #f8f9fa;
}

.hh {
    height: 35px;
}

.header {
    width: 30rem
}

.checkbox {
    width: 1.5rem;
    height: 1.5rem
}
</style>