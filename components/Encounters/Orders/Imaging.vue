<template>
  <div>
    <ModalWrapper size="lg" id="orderImaging" title="Imaging Order" :arrangement="false"
      :cancelText="`Close`" @hide="save" @show="getData()">
      <ValidationObserver ref="form">
        <form>
          <div class="row">
            <div class="col-md-12 mb-2">
              <ValidationProviderWrapper
                name="Services Center"
                :rules="['required']"
              >
                <VSelect :options="serviceCenter" v-model="obj.service_center" label="name"></VSelect>
              </ValidationProviderWrapper>
            </div>
            <div
              class="col-md-12"
              v-for="(item, index) in imagingOption"
              :key="index"
            >
              <p class="m-3 text-16 text-center">{{ item.modality }}</p>
              <div class="row">
                <div
                  class="col-md-4 mb-2 d-flex align-items-center"
                  v-for="(service, serviceIndex) in item.img_observations"
                  :key="serviceIndex"
                >
                  <input
                    style="height: 20px; width: 20px"
                    id=""
                    type="checkbox"
                    name=""
                    v-model="service.selected"
                    @change="
                      $emit('toggleImaging', { child: serviceIndex, parent: index, state: $event.target.checked})
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
                  cols="30"
                  rows="10"
                  v-model="obj.comments"
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
    imagingOption: {
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
        service_center: null
      },
    }
  },
  methods: {
    async getData() {
      if (this.imagingOption.length) return
      try {
        const services = await this.$api.imaging.getImaging({
          size: 1000,
        })
        const formatted = services.map((el) => ({
          modality: el.modality,
          img_observations: el.img_observations.map((newEl) => ({
            ...newEl,
            selected: false,
          })),
        }))
        this.$emit('fetch_Imaging_data', formatted)
        const serviceCenter = await this.$api.imaging.getServiceCenter({
          size: 1000,
        })
        this.serviceCenter = serviceCenter.results
      } catch (error) {
        console.log(error)
      }
    },
    async save() {
      this.$emit('imgObj', this.obj)
    },

    clear() {},
  },
}
</script>

<style lang="scss" scoped>
</style>