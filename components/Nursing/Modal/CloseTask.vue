<template>
    <ModalWrapper size="lg" id="closeTask" :cancelText="'Close'" :submitTitle="`Confirm`" title="Close task" @ok="ok()" @hide="clear()"
        :stacking="false">
        <ValidationObserver ref="form">
            <form>
                <div class="row">
                    <p class="text-16 mx-3">Please confirm that you want to close this task</p>
                    <div class="col-md-12 mb-2">
                        <ValidationProviderWrapper name="Disposition" :rules="['required']">
                            <textarea id="" v-model="reason" class="form-control" name="" cols="30" rows="10">
                        </textarea>
                        </ValidationProviderWrapper>
                    </div>
                </div>
            </form>
        </ValidationObserver>
    </ModalWrapper>
</template>
  
<script>
import { DateTime } from 'luxon'
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
                const data = await this.$api.nursing.closeNursingTask(this.$route.params.uid, this.editData.id, {disposition: this.reason})
                // this.$emit('refresh')
                this.$bvModal.hide('closeOrder')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
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