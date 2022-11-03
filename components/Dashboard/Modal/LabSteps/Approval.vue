<template>
  <div>
    <b-modal
      size="lg"
      id="Edit-laborder"
      title="Approve Result"
      centered
      hide-footer
      @hide="cancelPanelOrder"
    >
      <div class="text-capitalize text-18 text-grey">
        <div class="text-center text-underline">
          {{ labOrderPanel.panel.name }}
        </div>
        <div class="px-4 text-12 mb-3 text-grey text-center">
          {{ labOrderPanel.asn }}
        </div>
      </div>

      <div>
        <div>
          <ValidationObserver ref="form">
            <div
              class="
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
            >
              <TableComponent
                :items="labOrderPanel.panel.obv"
                :fields="fields"
                :paginate="false"
              >
                <template #value="{ data }">
                  <!-- <div
                    v-if="
                      data.item.type.name === 'Integer' ||
                      data.item.type.name === 'Float' ||
                      data.item.type.name === 'Text'
                    "
                  >
                    <ValidationProviderWrapper :rules="['required']">
                      <input
                        :type="manageInput"
                        :disabled="disabled"
                        placeholder="Value"
                        v-model="data.item.value"
                        class="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </ValidationProviderWrapper>
                  </div> -->

                    <div
                  v-if="
                    data.item.type.name === 'Text'
                  "
                >
                  <ValidationProviderWrapper :rules="['required']">
                    <div class="p-2">
                      <input
                        type="text"
                        placeholder="Value"
                         :disabled="disabled"
                        v-model="data.item.value"
                        class="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </div>
                  </ValidationProviderWrapper>
                </div>
                <div
                  v-if="
                    data.item.type.name === 'Integer' ||
                    data.item.type.name === 'Float'"
                >
                  <ValidationProviderWrapper :rules="['required']">
                    <div class="p-2">
                      <input
                        type="number"
                        placeholder="Value"
                         :disabled="disabled"
                        v-model="data.item.value"
                        class="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </div>
                  </ValidationProviderWrapper>
                </div>

                  <div
                    class="col-12 px-0"
                    v-if="data.item.type.name === 'Options'"
                  >
                    <ValidationProviderWrapper :rules="[]">
                      <v-select
                        class="text-14 w-100"
                        placeholder="Select option"
                        label="name"
                        v-model="data.item.value"
                        :options="data.item.values"
                        :disabled="enabled"
                        :reduce="(option) => option.name"
                      ></v-select>
                    </ValidationProviderWrapper>
                  </div>
                </template>
                <template #reference_range="{ data }">
                  <div
                    class="p-2"
                    v-for="(ref, index) in data.item.reference_range"
                    :key="index"
                  >
                    <!-- {{ref.name}} -->
                    <input
                      type="text"
                      :disabled="disabled"
                      placeholder="Value"
                      v-model="ref.name"
                      class="form-control ng-untouched ng-pristine ng-valid"
                    />
                  </div>
                </template>
              </TableComponent>

              <div class="my-3">
                <!-- <div v-if="fillControl" class="d-flex justify-content-center">
                                    <button @click.prevent="cancelPanelOrder"
                                        class="btn btn-light text-grey mr-5 text-14"
                                        style="height: 38px; width: 5rem; text-align: center">
                                        Cancel
                                    </button>
                                    <button @click.prevent="savePanelOrder" class="
        btn
        text-white text-14
        btn-success
        " style="height: 38px; width: 5rem; text-align: center">
                                        <span v-if="isbusy">
                                            <b-spinner label="loading" variant="primary"
                                                style="width: 1.5rem; height: 1.5rem" class="text-center">
                                            </b-spinner>
                                        </span>
                                        <span v-else>Save</span>
                                    </button>
                                </div> -->

                <div
                  v-if="approveControl"
                  class="d-flex justify-content-between"
                >
                  <button
                    @click="enableButton"
                    class="btn btn-light text-grey mx-3 text-14"
                    style="height: 38px; width: 5rem; text-align: center"
                  >
                    Edit
                  </button>

                  <button
                    @click="saveAndApprove"
                    class="
                      btn
                      text-white text-14
                      mainbtndashboard
                      medbrownparagraph
                      btn-success
                      mx-3
                    "
                    style="height: 38px; text-align: center"
                  >
                    <span v-if="isbusy2">
                      <b-spinner
                        label="loading"
                        variant="primary"
                        style="width: 1.5rem; height: 1.5rem"
                        class="text-center"
                      >
                      </b-spinner>
                    </span>
                    <span v-else>Approve</span>
                  </button>

                  <button
                    @click.prevent="setStatusToReject"
                    class="
                      btn btn-danger
                      text-white text-14
                      mainbtndashboard
                      medbrownparagraph
                      mx-3
                    "
                    style="height: 38px; width: 5rem; text-align: center"
                  >
                    <span v-if="isbusy">
                      <b-spinner
                        label="loading"
                        variant="primary"
                        style="width: 1.5rem; height: 1.5rem"
                        class="text-center"
                      >
                      </b-spinner>
                    </span>
                    <span v-else>Reject</span>
                  </button>
                </div>

                <div v-if="editMode" class="d-flex justify-content-between">
                  <button
                    @click.prevent="disabledButton"
                    class="btn btn-light text-grey mx-3 text-14"
                    style="height: 38px; width: 5rem; text-align: center"
                  >
                    Cancel
                  </button>

                  <button
                    @click.prevent="savePanelOrder"
                    class="
                      btn
                      text-white text-14
                      mainbtndashboard
                      medbrownparagraph
                      btn-info
                      mx-3
                    "
                    style="height: 38px; text-align: center"
                  >
                    <span v-if="isbusy2">
                      <b-spinner
                        label="loading"
                        variant="primary"
                        style="width: 1.5rem; height: 1.5rem"
                        class="text-center"
                      >
                      </b-spinner>
                    </span>
                    <span v-else>Save</span>
                  </button>
                  <button
                    @click="saveAndApprove"
                    class="
                      btn
                      text-white text-14
                      mainbtndashboard
                      medbrownparagraph
                      btn-success
                      mx-3
                    "
                    style="height: 38px; text-align: center"
                  >
                    <span v-if="isbusy2">
                      <b-spinner
                        label="loading"
                        variant="primary"
                        style="width: 1.5rem; height: 1.5rem"
                        class="text-center"
                      >
                      </b-spinner>
                    </span>
                    <span v-else>Approve</span>
                  </button>
                </div>
              </div>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commitPanel: {
        comments: '',
        obv: [],
      },
      disabled: true,
      isbusy: false,
      fillControl: false,
      approveControl: true,
      editMode: false,
      isbusy2: false,
      rejecting: false,
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
    labOrderPanel: {
      type: Object,
      required: true,
    },
    manageInput: '',
  },
  methods: {
    async savePanelOrder() {
      this.commitPanel.obv = this.labOrderPanel.panel.obv
      if (await this.$refs.form.validate()) {
        try {
          this.isbusy = true
          let response = await this.$axios.$put(
            `laboratory/lab_panel_order/${this.labOrderPanel.id}/panel/`,
            this.commitPanel
          )

          this.$toast({
            type: 'success',
            text: 'Results updated',
          })
          this.$emit('refresh')

          // this.$bvModal.show("confirm");
          this.$bvModal.hide('Edit-laborder')
          this.isbusy = false
        } catch {
          this.$toast({
            type: 'error',
            text: 'Unable to add results',
          })
        }
      }
    },
    async setStatusToSeen() {
      try {
        let response = await this.$axios.$patch(
          `laboratory/lab_panel_order/${this.labOrderPanel.id}/`,
          { status: 'approved' }
        )
        this.$emit('refresh')
        this.$toast({
          type: 'success',
          text: 'Approved',
        })
      } catch {
        this.$toast({
          type: 'error',
          text: 'Unable to approve results',
        })
      }
    },
    async setStatusToReject() {
      try {
        this.rejecting = true
        let response = await this.$axios.$patch(
          `laboratory/lab_panel_order/${this.labOrderPanel.id}/`,
          { status: 'fill result' }
        )
        this.$emit('refresh')
        this.$toast({
          type: 'success',
          text: 'Result rejected',
        })
        this.$bvModal.hide('Edit-laborder')
      } catch {
        this.$toast.error(`Unable to change status`)
      } finally {
        this.rejecting = false
      }
    },
    cancelPanelOrder() {
      this.$bvModal.hide('Edit-laborder')
      this.approveControl = true
      this.disabled = true
      this.editMode = false
      // this.fillControl = true;
    },
    enableButton() {
      this.disabled = false
      this.approveControl = false
      // this.fillControl = false;
      this.editMode = true
    },
    disabledButton() {
      // console.log('yay')
      this.enabled = !this.enabled
      this.approveControl = true
      // this.fillControl = false;
      this.editMode = false
    },
    async saveAndApprove() {
      this.commitPanel.obv = this.labOrderPanel.panel.obv
      if (await this.$refs.form.validate()) {
        try {
          this.isbusy = true
          let response = await this.$axios.$put(
            `laboratory/lab_panel_order/${this.labOrderPanel.id}/panel/`,
            this.commitPanel
          )
          this.$emit('refresh')
          this.$bvModal.hide('Edit-laborder')
          this.isbusy = false
        } catch {}
      }
      this.setStatusToSeen()
    },
  },
}
</script>

<style>
</style>