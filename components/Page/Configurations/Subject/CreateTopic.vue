<template>
  <b-modal
    id="add-topic"
    ref="modal"
    title="Add Topic"
    centered
    scrollable
    size="lg"
    ok-only
    ok-title="Save"
    @ok="handleOk"
  >
    <ValidationObserver ref="form">
      <div class="card">
        <div class="card-body p-0">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-2">
                  <div class="mb-2">
                    <ValidationProviderWrapper
                      name="SN"
                      :rules="['required']"
                      label="SN"
                    >
                      <BaseInput
                        v-model.number="topic.sequence"
                        type="number"
                        placeholder=""
                      ></BaseInput>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-10">
                  <div class="mb-2">
                    <ValidationProviderWrapper
                      name="Topic Name"
                      :rules="['required']"
                      label="Topic Name"
                    >
                      <BaseInput v-model="topic.name"></BaseInput>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-2">
                    <label class="form-control-label"
                      >General Objective (optional)</label
                    >
                    <textarea
                      v-model="topic.objectives"
                      class="form-control"
                      placeholder="Enter General Objective (optional)"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-header border-bottom py-2 my-2">
            <div class="align-items-center d-flex justify-content-between">
              <div class="card-title font-weight-lighter fs-21">Sub Topics</div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 my-3">
              <transition-group name="fade">
                <div
                  v-for="(value, index) in topic.sub_topics"
                  :key="index + value"
                >
                  <div class="row">
                    <div class="col-12 text-right">
                      <button
                        class="
                          btn
                          text-right
                          btn-borderless-danger btn-primary
                          px-3
                        "
                        @click="removeSubTopics(index)"
                      >
                        Remove SubTopic
                      </button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-2">
                      <div class="mb-2">
                        <ValidationProviderWrapper
                          name="SN"
                          :rules="['required']"
                          label="SN"
                        >
                          <BaseInput
                            v-model.number="value.sequence"
                            type="number"
                            placeholder=""
                          ></BaseInput>
                        </ValidationProviderWrapper>
                      </div>
                    </div>
                    <div class="col-10">
                      <div class="mb-2">
                        <ValidationProviderWrapper
                          name="Topic Name"
                          :rules="['required']"
                          label="Topic Name"
                        >
                          <BaseInput v-model="value.name"></BaseInput>
                        </ValidationProviderWrapper>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="mb-2">
                        <label class="form-control-label"
                          >General Objective (optional)</label
                        >
                        <textarea
                          v-model="value.objectives"
                          class="form-control"
                          placeholder="Enter General Objective (optional)"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
        <div class="text-right mb-4 mt-3">
          <button
            class="btn btn-borderless-primary btn-primary py-2 px-3"
            @click="addSubTopic"
          >
            Add SubTopic
          </button>
        </div>
      </div>
    </ValidationObserver>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      topic: {
        name: '',
        objectives: '',
        sequence: '',
        sub_topics: []
      }
    }
  },
  methods: {
    removeSubTopics(index) {
      this.topic.sub_topics.splice(index, 1)
    },
    addSubTopic() {
      this.topic.sub_topics.push({
        name: '',
        objectives: '',
        sequence: ''
      })
    },
    resetForm() {
      this.topic = { name: '', objectives: '', sequence: '', sub_topics: [] }
    },
    async checkFormValidity() {
      const result = await this.$refs.form.validate()
      return result
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      const result = await this.checkFormValidity()
      if (!result) {
        return
      }
      try {
        await this.$axios.$post(
          `./slate-admin/subject/${this.$route.params.subject}/topics/sub/`,
          this.topic
        )
        this.resetForm()
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.form.reset()
          this.$bvModal.hide('add-topic')
          this.$emit('refresh')
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
