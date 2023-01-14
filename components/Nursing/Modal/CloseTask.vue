<template>
    <ModalWrapper size="lg" id="closeTask" :cancelText="'Close'" :submitTitle="`Mark as done`" title="Complete task" @ok="ok()" @show="getServices" @hide="clear()"
        :stacking="false">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <p class="text-16 mx-3">Please confirm that you want to mark this task as done</p>
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Disposition" :rules="['required']">
                            <textarea id="" v-model="data.disposition" class="form-control" name="" cols="30" rows="4">
                        </textarea>
                        </ValidationProviderWrapper>
                    </div>

                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Nursing service(s)" :rules="['']">
                                <VSelect v-model="data.nursing_services" :multiple="true" :options="services"
                                    :reduce="(opt) => opt.id" label="name">
                                </VSelect>
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
        patient: {
            type: Object,
            require: false,
            default: () => ({}),
        },
    },
    data() {
        return {
            selected: [],
            reason: '',
            products: [],
            stores: [],
            services: [],
            data: {
                disposition: '',
                nursing_services: []
            }
        }
    },
    watch: {
    },
    computed: {
    },
    methods: {
        async ok() {
            if (await this.$refs.form.validate()) {
                this.save()
            }
        },

        async save() {
            try {
                const data = await this.$api.nursing.closeNursingTask(this.$route.params.uid, this.editData.id, this.data)
                this.$emit('refresh')
                this.$bvModal.hide('closeTask')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },

        getServices() {
            this.$api.nursing
                .getServices({ size: 1000 })
                .then((res) => {
                    this.services = res.results
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        clear() {
            this.reason = ''
        },
    },
}
</script>
  
<style lang="scss" scoped>
textarea.form-control {
    min-height: 50px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
}

.float {
    position: relative;
    top: -3px;
    right: -17px;
}

.shrink {
    height: 2px;
}
</style>