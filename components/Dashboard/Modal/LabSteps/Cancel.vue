<template>
    <div>
        <ModalWrapper size="md" id="cancelRequest" title="Cancel lab request" :submitTitle="`Yes`" @ok="cancelRequest()">
            <ValidationObserver ref="form">
                <form>
                    <div class="container">
                        <h4 class="text-info text-16 py-3 pl-0 pr-3">
                            Please confirm this action
                        </h4>
                        <p class="text-warning text-14">
                            You are about to set status of lab order
                            <span>{{ labOrderPanel.asn }}</span> to cancelled
                        </p>

                        <div class="mb-2 col-lg-12 px-0 col-md-12 col-sm-12">
                            <small class="text-grey text-12">Comment </small>
                            <textarea v-model="comments" cols="50" rows="5" placeholder="Type a comment..." class="
                p-3
                text-grey
                form-control
                ng-untouched ng-pristine ng-valid
              "></textarea>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
        </ModalWrapper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            comments: ''
        }
    },
    props: {
        status: '',
        labOrderPanel: {
            type: Object,
            required: true
        },
    },
    methods: {
        async cancelRequest() {
            try {
                let response = await this.$axios.$patch(
                    `laboratory/lab_panel_order/${this.labOrderPanel.id}/`,
                    { status: 'CANCELLED', comments: this.comments },
                );
                this.$bvModal.hide("cancelRequest");
                this.$emit('refresh')
                this.$toast({
                    type: 'success',
                    text: `Order cancelled`
                });
            } catch {
                this.$toast({
                    type: 'error',
                    text: `Unable to cancelled`
                });
            }
        },
    },
}
</script>

<style lang="scss" scoped>
</style>