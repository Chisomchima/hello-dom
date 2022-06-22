<template>
  <div>
    <div class="card bg-white mb-3">
      <div class="card-header pt-4 pb-0">
        <div
          v-if="$route.fullPath.includes('edit')"
          class="card-title text-light fs-24"
        >
          Edit House
        </div>
        <div v-else class="card-title text-light fs-24">Add a new House</div>
        <hr class="mb-0" />
      </div>
      <div class="card-body">
        <div>
          <div class="mt-1">
            <div class="mb-2">
              <div class="row">
                <div class="col-6">
                  <ValidationProviderWrapper
                    name="House Name"
                    :rules="['required']"
                    label="House Name"
                  >
                    <BaseInput
                      v-model="house.name"
                      placeholder="Enter House Name"
                    ></BaseInput>
                  </ValidationProviderWrapper>
                </div>
                <div class="col-6">
                  <ValidationProviderWrapper
                    name="House Coordinators"
                    :rules="['required']"
                    label="House Coordinators"
                  >
                    <VSelect
                      v-model="house.coordinators"
                      label="name"
                      multiple
                      :options="coordinators"
                    />
                  </ValidationProviderWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4" />
        <div>
          <div class="align-items-center d-flex justify-content-between">
            <div class="card-title">Preview</div>
            <button
              class="btn btn-borderless-primary"
              @click="$bvModal.show('modal')"
            >
              Set Branding
            </button>
          </div>
          <!-- <div class="card-title">Images</div> -->

          <div class="row mt-3">
            <div class="col-md-12 mb-2">
              <UtilsHeaderCardWithColor
                disable-action
                enable-image
                :color="house.icon_data.icon_font_color"
                :img-src="house.icon_data.icon"
                :bg-color="house.icon_data.icon_bg_color"
                :title="house.name"
                :data="house"
                :display-key="['coordinators.name']"
              ></UtilsHeaderCardWithColor>
            </div>
          </div>
        </div>
        <div class="mt-4 d-flex align-items-center justify-content-end">
          <button class="btn btn-light py-2 px-3 ml-2">Cancel</button>
          <button class="btn btn-primary py-2 px-3 ml-2" @click="handleOk">
            Save
          </button>
        </div>
      </div>
    </div>
    <b-modal id="modal" size="xl" title="Slate Media Library" centered>
      <div class="row">
        <div class="col-md-8">
          <div class="row">
            <div
              v-for="(value, index) in imagePath"
              :key="index"
              class="col-2 m-1"
              @click=";(selectedIcon = value), (house.icon_data.icon = value)"
            >
              <img
                :src="value"
                class="img-thumbnail img-class"
                :class="[selectedIcon === value ? 'border-primary' : '']"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="row">
            <div class="col-12">
              <label class="form-control-label">Select Font Color</label>
            </div>
            <div class="col">
              <v-swatches
                v-model="house.icon_data.icon_font_color"
                :swatches="swatches"
                row-length="6"
                shapes="circles"
                show-border
                inline
                popover-x="left"
              ></v-swatches>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label class="form-control-label">Select Background Color </label>
            </div>
            <div class="col">
              <v-swatches
                v-model="house.icon_data.icon_bg_color"
                swatches="text-advanced"
                row-length="6"
                inline
                popover-x="left"
              ></v-swatches>
            </div>
          </div>
        </div>
      </div>
      <UtilsHeaderCardWithColor
        disable-action
        enable-image
        :color="house.icon_data.icon_font_color"
        :img-src="house.icon_data.icon"
        :bg-color="house.icon_data.icon_bg_color"
        :title="house.name"
        :data="house"
        :display-key="['coordinators.name']"
      ></UtilsHeaderCardWithColor>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    editForm: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      color: '',
      swatches: ['#000000', '#FFFFFF'],
      coordinators: [],
      house: {
        name: '',
        coordinators: '',
        icon_data: {
          icon: '',
          icon_bg_color: '',
          icon_font_color: '#ffffff',
        },
      },
      selectedIcon: {
        id: '',
        src: '',
      },
      imagePath: [
        '/house-icons/fox.png',
        '/house-icons/lion.png',
        '/house-icons/monkey.png',
        '/house-icons/tiger.png',
      ],
      category: [],
    }
  },
  watch: {
    editForm: {
      handler(val) {
        if (this.$route.fullPath.includes('edit')) {
          // await this.getCoordinators()
          // debugger;
          this.house.name = val.name
          this.house.coordinators = val.house_staffs.map((item) => ({
            id: item.id,
            name: item.first_name + ' ' + item.last_name,
          }))
          if (Object.values(val.icon_data).length > 0) {
            this.house.icon_data = val.icon_data
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (Object.values(this.house.icon_data).length <= 0) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16)
      this.house.icon_data.icon_bg_color = `#${randomColor}`;
      this.house.icon_data.icon_font_color = `#ffffff`;
    }
    this.getCoordinators()
  },
  methods: {
    async getCoordinators() {
      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )
      const { staffs } = await this.$axios.$get(
        `quiz/v2/school/${school.id}/markers/`
      )
      this.coordinators = staffs
    },
    handleOk() {
      if (!this.$route.fullPath.includes('edit')) {
        this.handleSubmit()
      } else {
        this.handleEdit()
      }
    },
    async handleEdit() {
      try {
        const coordinatorID = this.house.coordinators.map(
          (coordinator) => coordinator.id
        )
       
        const dataObject = {
          ...this.house,
          coordinators: coordinatorID,
          color: this.house.icon_data.icon_bg_color,
        } 

        await this.$axios.$put(
          `/slate-admin/house/${this.$route.params.house}/`,
          dataObject
        )
        // await this.$nuxt.refresh()
        this.$router.push({
          name: 'sms-id-administration-configuration-house-house',
          params: {
            house: this.$route.params.house,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    async handleSubmit() {
      try {
        const school = this.$store.getters['school/getSchoolByCode'](
          this.$route.params.id
        )
        const coordinatorID = this.house.coordinators.map(
          (coordinator) => coordinator.id
        )

        const dataObject = {
          ...this.house,
          coordinators: coordinatorID,
          color: this.house.icon_data.icon_bg_color,
        }

        await this.$axios.$post(
          `/slate-admin/school/${school.id}/houses/`,
          dataObject
        )

        // await this.$nuxt.refresh()
        this.$router.push({
          name: 'sms-id-administration-configuration-house',
        })
      } catch (error) {
        console.log(error)
      }

      //   this.$nuxt.refresh()
    },
  },
}
</script>

<style scoped>
.img-class {
  width: 85px !important;
  height: 85px !important;
  display: block;
}

.modal-dialog {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.modal-content {
  height: auto;
  min-height: 100%;
  border-radius: 0;
}
</style>
