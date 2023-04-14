<template>
    <ModalWrapper id="addServiceCenter" :title="modalTitle" @ok="ok()" @hide="clear()">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Name" :rules="['required']">
                            <input v-model="dataObject.name" type="text" class="form-control" />
                        </ValidationProviderWrapper>
                    </div>
                    <!-- <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Type" :rules="['required']">
                            <v-select class="style-chooser text-grey text-14" placeholder="" :options="types"
                                v-model="dataObject.type" label="name">
                            </v-select>
                        </ValidationProviderWrapper>
                    </div> -->
                    <!-- <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Description" :rules="['']">
                            <textarea rows="2" col="10" v-model="dataObject.description" type="text" class="form-control"></textarea>
                        </ValidationProviderWrapper>
                    </div> -->
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
                // type: null,
                name: "",
                // description: "",
                // is_pharmacy: false
            },
            title: '',
            types: [
                'CONSUMPTION',
                'CUSTOMER',
                'INVENTORY LOSS',
                'STORE',
                'SUPPLIER'
            ],
        }
    },
    async created() {
        const { results } = await this.$api.inventory.getParents({ size: 1000 })
        // this.types = results
    },
    watch: {
        editData: {
            handler(newVal) {
                if (Object.keys(newVal).length > 0) {
                    this.dataObject.id = newVal.id
                    this.dataObject.name = newVal.name
                    this.dataObject.description = newVal.description
                    this.dataObject.is_pharmacy = newVal.is_pharmacy
                    this.dataObject.type = newVal.type
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
                await this.$api.medicalReport.createServiceCenter(this.dataObject)
                this.$emit('refresh')
                this.$bvModal.hide('addServiceCenter')
            } catch (error) {
                console.log(error)
            }
        },
        async edit() {
            try {
                const data = await this.$api.medicalReport.editServiceCenter(
                    this.dataObject,
                    this.dataObject.id
                )
                this.$emit('refresh')
                this.$bvModal.hide('addServiceCenter')
            } catch (error) {
                console.log(error)
            }
        },

        clear() {
            this.dataObject = {
                type: null,
                name: "",
                description: "",
                is_pharmacy: false
            }
        },
    },
}
</script>
  
<style lang="scss" scoped></style>