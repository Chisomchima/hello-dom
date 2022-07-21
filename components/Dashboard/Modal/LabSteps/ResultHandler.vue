<template>
    <div>
        <ModalWrapper size="lg" id="fillresult" title="Fill result" @clearForm="clear()" @hide="clear()"
            @ok="savePanelOrder()">
            <div class="text-capitalize text-18 text-grey">
                <div class="text-center text-underline">
                    {{ labOrderPanel.panel.name }}
                </div>
                <div class="px-4 text-12 mb-3 text-grey text-center">
                    {{ labOrderPanel.asn }}
                </div>
            </div>
            <ValidationObserver ref="form">
                <form>
                    <div>

                        <TableComponent :items="labOrderPanel.panel.obv" :perPage="1000" :fields="fields" :paginate="false">
                            <template #value="{ data }">

                                <div
                                    v-if="data.item.type.name === 'Integer' || data.item.type.name === 'Float' || data.item.type.name === 'Text'">
                                    <ValidationProviderWrapper :rules="['required']">
                                        <div class="p-2">
                                            <input :type="manageInput" placeholder="Value" v-model="data.item.value"
                                            class="form-control ng-untouched ng-pristine ng-valid" />
                                        </div>
                                    </ValidationProviderWrapper>
                                </div>

                                <div v-if="data.item.type.name === 'Options'">
                                    <ValidationProviderWrapper :rules="[]">
                                        <v-select class=" text-14" placeholder="Select option" label="name"
                                            v-model="data.item.value" :options="data.item.values"
                                            :reduce="(option) => option.name"></v-select>
                                    </ValidationProviderWrapper>
                                </div>
                            </template>
                            <template #reference_range="{ data }">
                                <div class="p-2" v-for="(ref,index) in data.item.reference_range" :key="index">
                                    <!-- {{ref.name}} -->
                                    <input type="text" :disabled="enabled" placeholder="Value"
                                    v-model="ref.name"
                                    class="form-control ng-untouched ng-pristine ng-valid" />
                                </div>
                            </template>
                        </TableComponent>


                        <div class="col-md-12  mb-2">
                            <ValidationProviderWrapper name="Comment" :rules="[]">
                                <textarea v-model="commitPanel.comments" cols="20" rows="5"
                                    class="form-control"></textarea>
                            </ValidationProviderWrapper>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
        </ModalWrapper>
        <div>
            <DashboardModalLabStepsConfirmation :id="confirmId" @refresh="refreshme" />
        </div>
    </div>
</template>

<script>
// import { DateTime } from 'luxon'
export default {
    data() {
        return {
            commitPanel: {
                comments: "",
                obv: [],
            },
            confirmId: '',
            placeholder: 'Type a comment...',
            fields: [
                {
                    key: 'name',
                    label: 'Observation',
                    sortable: true,
                },
                {
                    key: 'uom',
                    label: 'UOM',
                    sortable: true,
                },
                { key: 'value', label: 'Value', sortable: true },
                
                { key: 'reference_range', label: 'Reference range', sortable: true },
            ],
        }
    },
    props: {
        id: '',
        labOrderPanel: {
            type: Object,
            required: true
        },
        manageInput: ''
    },
    methods: {
        async savePanelOrder() {
            this.commitPanel.obv = this.labOrderPanel.panel.obv;
            if (await this.$refs.form.validate()) {
                try {
                    this.confirmId = this.labOrderPanel.id
                    this.isbusy = true;
                    let response = await this.$axios.$put(
                        `laboratory/lab_panel_order/${this.labOrderPanel.id}/panel/`,
                        this.commitPanel
                    );

                    this.$toast({
                        type: 'success',
                        text: 'Results updated'
                    });
                    this.$bvModal.show("confirm");
                    this.$emit('refresh')
                } catch {
                    this.$toast({
                        type: 'error',
                        text: 'Unable to add results'
                    });
                }
            }
    
        },
        refreshme() {
            this.$emit('refresh')  
        },
        clear() {
            // this.comments = ''
        }
    },
}
</script>

<style lang="scss" scoped>
</style>