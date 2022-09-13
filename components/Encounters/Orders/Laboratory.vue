<template>
  <div>
    <ModalWrapper
      size="lg"
      id="orderLab"
      title="Lab Order"
      :arrangement="false"
      :cancelText="`Close`"
      @show="getData()"
      @hide="save"
    >
      <ValidationObserver ref="form">
        <form>
          <div v-if="labServiceOptions.length < 1" class="w-25 m-auto">
            <div class="ml-5 py-5 my-5">
              <b-spinner
              variant="success"
              style="width: 6rem; height: 6rem"
              label="Spinning"
            ></b-spinner>
            </div>
          </div>
          <div v-else class="row">
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper
                name="Services Center"
                :rules="['required']"
              >
                <VSelect
                  ref="input"
                  :options="serviceCenter"
                  label="name"
                  v-model="obj.service_center"
                ></VSelect>
              </ValidationProviderWrapper>
            </div>
            <div
              class="col-md-12"
              v-for="(item, index) in labServiceOptions"
              :key="index"
            >
              <p class="m-3 text-16 text-center">{{ item.lab_unit }}</p>
              <div class="row">
                <div
                  class="col-md-4 mb-2 d-flex align-items-center"
                  v-for="(service, serviceIndex) in item.lab_panels"
                  :key="serviceIndex"
                >
                  <input
                    style="height: 20px; width: 20px"
                    id=""
                    type="checkbox"
                    name=""
                    v-model="service.selected"
                    @change="
                      $emit('toggle', {
                        child: serviceIndex,
                        parent: index,
                        state: $event.target.checked,
                      })
                    "
                  />
                  <p class="text-grey text-14 ml-2 mb-0 w-75">
                    {{ service.name }}
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Stat" :rules="[]">
                <input id="" v-model="obj.stat" type="checkbox" name="" />
              </ValidationProviderWrapper>
            </div>

            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper name="Comment" :rules="[]">
                <textarea
                  v-model="obj.comments"
                  cols="30"
                  rows="10"
                  class="form-control"
                ></textarea>
              </ValidationProviderWrapper>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
export default {
  props: {
    labServiceOptions: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      serviceCenter: [],
      obj: {
        stat: false,
        comments: '',
        service_center: null,
      },
    }
  },
  methods: {
    async getData() {
      if (this.labServiceOptions.length) return
      try {
        const services = await this.$api.laboratory.getPanelsByUnit({
          size: 1000,
        })
        const formatted = services.map((el) => ({
          lab_unit: el.lab_unit,
          lab_panels: el.lab_panels.map((newEl) => ({
            ...newEl,
            selected: false,
          })),
        }))
        this.$emit('fetch_Data', formatted)
        this.services = services
        const serviceCenter = await this.$api.laboratory.getServiceCenter({
          size: 1000,
        })
        this.serviceCenter = serviceCenter.results
      } catch (error) {
        console.log(error)
      }
    },
    async save() {
      this.$emit('labObj', this.obj)
    },
    validateForm() {},
  },
}
</script>

<style lang="scss" scoped>
</style>