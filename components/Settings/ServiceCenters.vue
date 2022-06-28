<template>
    <div>
        <div>
            <UtilsFilterComponent disable-pagination :disable-visualization="true" search-placeholder="Search">
                <template #besideFilterButton>
                    <BaseButton class="btn-outline-primary" @click="$bvModal.show('Add-service')">Add Service Center
                    </BaseButton>
                </template>
                <table-component :paginate="true" @row-clicked="getDetails" :busy="busy" :fields="fields" :pages="pages"
                    :perPage="perPage" :items="itemsToShow" @page-changed="getServiceCenter($event)">
                    <template #edit="{ data }">
                        <div @click="OpenEditServiceModal(data.item)" class="text-start">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="18" height="18"
                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z" />
                                <path fill="currentColor"
                                    d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
                            </svg>
                        </div>
                    </template>
                </table-component>
            </UtilsFilterComponent>
        </div>


        <b-modal id="Add-service" title="Add Service Center" centered hide-footer ref="addServiceModal"
            @hide="closeModal">
            <div>
                <ValidationObserver v-slot="{ validate }">
                    <form>
                        <div class="d-flex justify-content-center mb-3">
                            <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                                <small class="text-grey text-12">Service center *</small>
                                <validation-provider rules="required" v-slot="{ errors }">
                                    <input v-model="name" type="text" placeholder="Service center"
                                        class="form-control ng-untouched ng-pristine ng-valid" />
                                    <span class="text-12" style="color: red">{{
                                    errors[0]
                                    }}</span>
                                </validation-provider>
                            </div>
                        </div>

                        <div class="my-3 d-flex justify-content-center">

                            <button @click.prevent="closeModal" class="btn btn-light text-grey mr-5 text-14"
                                style="height: 38px; width: 5rem; text-align: center">
                                Cancel
                            </button>

                            <BaseButton @click.prevent="addServiceCenter" class="">Save
                            </BaseButton>
                        </div>

                        <div type="button" ref="runValidation" id="runValidation" @click="validate"></div>
                    </form>
                </ValidationObserver>
            </div>
        </b-modal>

        <b-modal id="Edit-service" title="Edit Service Center" centered hide-footer ref="editServiceModal">
            <div>
                <ValidationObserver v-slot="{ validate }">
                    <form>
                        <div class="d-flex justify-content-center mb-3">
                            <div class="mb-2 col-lg-10 px-0 col-md-10 col-sm-10">
                                <small class="text-grey text-12">Service center *</small>
                                <validation-provider rules="required" v-slot="{ errors }">
                                    <input v-model="name" type="text" placeholder="Service center"
                                        class="form-control ng-untouched ng-pristine ng-valid" />
                                    <span class="text-12" style="color: red">{{
                                    errors[0]
                                    }}</span>
                                </validation-provider>
                            </div>
                        </div>

                        <div class="my-3 d-flex justify-content-center">
                            <button @click.prevent="closeEditModal" class="btn btn-light text-grey mr-5 text-14"
                                style="height: 38px; width: 5rem; text-align: center">
                                Cancel
                            </button>
                            <BaseButton @click.prevent="editServiceCenter" class="">Save
                            </BaseButton>
                        </div>

                        <div type="button" ref="runValidation" id="runValidation" @click="validate"></div>
                    </form>
                </ValidationObserver>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            busy: false,
            isbusy: false,
            uniqueId: "",
            perPage: 12,
            pages: 0,
            page: 1,
            name: "",
            fields: [
                { key: "service_name", label: "Center name", sortable: true },
                { key: "edit", label: "Edit" },
            ],
            itemsToShow: [],
        };
    },
    methods: {
        getDetails() { },
        openServiceModal() {
            this.$bvModal.show("Add-service");
        },
        closeModal() {
            this.$bvModal.hide("Add-service");
            this.name = "";
        },
        closeEditModal() {
            this.$bvModal.hide("Edit-service");
        },
        async addServiceCenter() {
            if (this.$refs.runValidation) {
                this.$refs.runValidation.click();
            }
            if (this.name) {
                try {
                    this.isbusy = true;
                    let response = await this.$axios.$post(
                        "laboratory/service_center/",
                        {
                            name: this.name,
                        }
                    );
                    if (response.id) {
                        this.$toast({
                            type: 'success',
                            text: 'Service center added'
                        })
                        this.getServiceCenter();
                        this.$bvModal.hide("Add-service");
                        this.name = "";
                    }
                } catch {
                    this.$toast(
                        {
                            type: 'error',
                            text: `Unable to add service center`
                        });
                } finally {
                    this.isbusy = false;
                }
            }
        },

        async editServiceCenter() {
            if (this.$refs.runValidation) {
                this.$refs.runValidation.click();
            }
            if (this.name) {
                try {
                    this.isbusy = true;
                    let response = await this.$axios.$patch(
                        `laboratory/service_center/${this.uniqueId}/`,
                        {
                            name: this.name,
                        },
                    );
                    if (response.id) {
                        this.$toast({
                            type: 'success',
                            text: 'Service center edited'
                        })
                        this.getServiceCenter();
                        this.$bvModal.hide("Edit-service");
                        this.name = "";
                    }
                } catch {
                    this.$toast(
                        {
                            type: 'error',
                            text: `Unable to edit service center`
                        });
                   
                } finally {
                    this.isbusy = false;
                }
            }
        },

        async getServiceCenter() {
            try {
                this.busy = true;
                let uri = `laboratory/service_center/?page=${this.page}&size=${this.perPage}`;

                const response = await this.$axios.$get(uri);

                let items = response.results;
                this.pages = response.total_pages;
                this.itemsToShow = [];
                for (const iterator of items) {
                    this.itemsToShow.push({
                        service_name: iterator.name,
                        id: iterator.id,
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.busy = false;
            }
        },
        OpenEditServiceModal(e) {
            this.uniqueId = e.id;
            this.name = e.name;
            this.$bvModal.show("Edit-service");
        },
    },
    mounted() {
        this.getServiceCenter();
    },
};
</script>

<style>

</style>