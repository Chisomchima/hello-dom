<template>
    <div>
        <ModalWrapper size="md" id="confirm" title="Submit for approval" @ok="setStatusToAwaitingApproval()">
            <ValidationObserver ref="form">
                <form>
                    <div class="container">
                        <h4 class="text-info text-16 p-3">
                            Do you want to submit for approval?
                        </h4>
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
        }
    },
    props: {
        status: '',
        id: '',
    },
    methods: {
        async setStatusToAwaitingApproval() {
            try {
                let response = await this.$axios.$patch(
                    `laboratory/lab_panel_order/${this.id}/`,
                    { status: "awaiting approval" }
                );
                this.$bvModal.hide("confirm");
                this.$emit('refresh')
            } catch {
                this.$toast({
                    type: 'error',
                    text: `Unable to submit for approval`
                });
            }
        },
    },
}
</script>

<style lang="scss" scoped>
</style>