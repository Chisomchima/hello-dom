<template>
    <div>
        <ModalWrapper size="md" id="takespecimen" :title="modalTitle" @clearForm="clear()" @hide="clear()"
            @ok="setStatusToSpecimenRecieved()">
            <ValidationObserver ref="form">
                <form>
                    <div>
                        <h4 class="text-info text-16 p-3">Please confirm this action</h4>

                        <div class="col-md-12 mb-2">
                            <ValidationProviderWrapper name="Comment" :rules="[]">
                                <textarea v-model="comments" cols="20" rows="5" class="form-control"></textarea>
                            </ValidationProviderWrapper>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
        </ModalWrapper>
    </div>
</template>

<script>
// import { DateTime } from 'luxon'
export default {
    data() {
        return {
            comments: '',
            placeholder: 'Type a comment...'
        }
    },
    props: {
        status: '',
        id: '',
        modalTitle: ''
    },
    methods: {
        async setStatusToSpecimenRecieved() {
            try {
                let response = await this.$axios.$patch(
                    `laboratory/lab_panel_order/${this.id}/`,
                    { status: this.status, comments: this.comments }
                );
                this.$emit('refresh')
            } catch {
                this.$toast({
                    type: 'error',
                    text: 'Unable to change status'
                });
            }
        },
        clear() {
            this.comments = ''
        }
    },
}
</script>

<style lang="scss" scoped>
</style>