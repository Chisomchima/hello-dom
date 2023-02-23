<template>
    <ModalWrapper id="addStore" :title="modalTitle" @ok="ok()" @hide="clear()">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Name" :rules="['required']">
                            <input v-model="dataObject.name" type="text" class="form-control" />
                        </ValidationProviderWrapper>
                    </div>

                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Inventory store" :rules="['']">
                            <v-select :reduce="(opt) => opt.id" class="style-chooser text-grey text-14" placeholder="" :options="types"
                                v-model="dataObject.inv_store" label="name">
                            </v-select>
                        </ValidationProviderWrapper>
                    </div>

                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Description" :rules="['']">
                            <textarea rows="2" col="10" v-model="dataObject.description" type="text" class="form-control"></textarea>
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
            default: () => 'Add Store',
        },
    },
    data() {
        return {
            dataObject: {
                inv_store: null,
                name: "",
                description: "",
            },
            title: '',
            types: []
        }
    },
    async created() {
        const { results } = await this.$api.inventory.getStores({ size: 1500, is_pharmacy: true })
        this.types = results
    },
    watch: {
        editData: {
            handler(newVal) {
                if (Object.keys(newVal).length > 0) {
                    this.dataObject.id = newVal.id
                    this.dataObject.name = newVal.name
                    this.dataObject.description = newVal.description
                    this.dataObject.inv_store = newVal.inv_store
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
                const data = await this.$api.pharmacy.createStore(this.dataObject)
                this.$emit('refresh')
                this.$bvModal.hide('addStore')
            } catch (error) {
                console.log(error)
            }
        },
        async edit() {
            try {
                const data = await this.$api.pharmacy.updateStore(
                    this.dataObject,
                    this.dataObject.id
                )
                this.$emit('refresh')
                this.$bvModal.hide('addStore')
            } catch (error) {
                console.log(error)
            }
        },

        clear() {
            this.dataObject = {
                inv_store: null,
                name: "",
                description: "",
            }
        },
    },
}
</script>
  
<style lang="scss" scoped></style>