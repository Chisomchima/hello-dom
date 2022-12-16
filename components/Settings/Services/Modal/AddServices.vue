<template>
    <ModalWrapper id="addServices" :title="modalTitle" @ok="ok()" @hide="clear()">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Name" :rules="['required']">

                            <input v-model="dataObject.name" type="text" class="form-control" />
                        </ValidationProviderWrapper>
                    </div>

                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Description" :rules="['']">

                            <input v-model="dataObject.description" type="text" class="form-control" />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Cost price" :rules="['required']">

                            <input v-model="dataObject.cost_price" type="text" class="form-control" />
                        </ValidationProviderWrapper>
                    </div>
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Bill price" :rules="['required']">

                            <input v-model="dataObject.bill_price" type="text" class="form-control" />
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
            default: () => 'Add services',
        },
    },
    data() {
        return {
            dataObject: {
                bill_price: "",
                cost_price: "",
                name: "",
                description: ""
            },
            title: '',
            departments: []
        }
    },
    async created() {
        const { results: departments } = await this.$api.facility.departments({
            size: 1000,
        })
        this.departments = departments
    },
    watch: {
        editData: {
            handler(newVal) {
                if (Object.keys(newVal).length > 0) {
                    this.dataObject.id = newVal.id
                    this.dataObject.name = newVal.name
                    this.dataObject.bill_price = newVal.bill_price
                    this.dataObject.cost_price = newVal.cost_price
                    this.dataObject.description = newVal.description
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
                const data = await this.$api.nursing.createServices(this.dataObject)
                this.$emit('refresh')
                this.$bvModal.hide('addServices')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        async edit() {
            try {
                const data = await this.$api.nursing.editServices(
                    this.dataObject,
                    this.dataObject.id
                )
                this.$emit('refresh')
                this.$bvModal.hide('addServices')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },

        clear() {
            this.dataObject = {
                bill_price: "",
                cost_price: "",
                name: "",
                description: ""
            }
        },
    },
}
</script>
  
<style lang="scss" scoped>

</style>