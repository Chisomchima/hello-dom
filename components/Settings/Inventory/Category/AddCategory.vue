<template>
    <ModalWrapper id="addCategory" :title="modalTitle" @ok="ok()" @hide="clear()">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Name" :rules="['required']">
                            <input v-model="dataObject.name" type="text" class="form-control" />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Parent" :rules="['']">
                            <v-select class="style-chooser text-grey text-14" placeholder="Parent" :options="parents"
                                v-model="dataObject.parent" :reduce="(opt) => opt.id" label="name">
                            </v-select>
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Description" :rules="['']">
                            <input v-model="dataObject.description" type="text" class="form-control" />
                        </ValidationProviderWrapper>
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
            default: () => 'Add Category',
        },
    },
    data() {
        return {
            dataObject: {
                parent: null,
                name: "",
                description: ""
            },
            title: '',
            parents: [],
        }
    },
    async created() {
        const { results } = await this.$api.inventory.getParents({ size: 1000 })
        this.parents = results
    },
    watch: {
        editData: {
            handler(newVal) {
                if (Object.keys(newVal).length > 0) {
                    this.dataObject.id = newVal.id
                    this.dataObject.name = newVal.name
                    this.dataObject.description = newVal.description
                    this.dataObject.parent = newVal.parent
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
        async save() {
            try {
                const data = await this.$api.inventory.createParents(this.dataObject)
                this.$emit('refresh')
                this.$bvModal.hide('addCategory')
            } catch (error) {
                console.log(error)
            }
        },
        async edit() {
            try {
                const data = await this.$api.inventory.editParent(
                    this.dataObject,
                    this.dataObject.id
                )
                this.$emit('refresh')
                this.$bvModal.hide('addCategory')
            } catch (error) {
                console.log(error)
            }
        },

        clear() {
            this.dataObject = {
                parent: null,
                name: "",
                description: ""
            }
        },
    },
}
</script>
  
<style lang="scss" scoped></style>