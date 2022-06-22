<template>
  <div>
    <div class="card bg-white mb-3">
      <div class="card-header pt-4 pb-0">
        <div
          v-if="Object.values(editFields).length > 0"
          class="card-title text-light fs-24"
        >
          Edit a Subject
        </div>
        <div v-else class="card-title text-light fs-24">Add a Subject</div>
        <hr class="mb-0" />
      </div>
      <div class="card-body">
        <div>
          <!-- <div class="card-title">Basic Description</div> -->

          <!-- <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gVXBsb2FkZWQgdG8gU1ZHUmVwbyBodHRwczovL3d3dy5zdmdyZXBvLmNvbSAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMjQ2IDQ3MS4xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNDYgNDcxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzkyNjYwMCIgZD0iTTE2OC4xLDI3OS44YzYzLjEtNTYtNy05NS42LTY5LjUtMTI3LjlDMTIuOSwxMDcuNywxNCwzOC44LDg2LjIsMjYuNGM1My40LTkuMiwyNS4zLDM1LjcsNDIuMyw3MQ0KCQljOCwxNi41LDc2LDcuNSw3My0yLjZjLTIuNS04LjMtMzIuNi02LjUtNDIuMy0xOC42Yy02LjUtOC0xLjYtMjUuNC00LjktMzcuNkMxMzguMi0yMC4yLDM1LjgtNyw5LjgsNDUuOQ0KCQljLTMxLjIsNjMuNCwxNy42LDEwMC4xLDY4LjQsMTI4LjlDMTMxLjIsMjA0LjksMTU2LjcsMjI3LjUsMTY4LjEsMjc5Ljh6Ii8+DQoJPHBhdGggZmlsbD0iI0VFMDAwMCIgZD0iTTEwNiwyMjguOGMtMjIuOCwxMi45LTQ0LjgsMzUtNjIuMiw3N0MyLjEsNDA2LjcsNjQuNSw0NjguOSwxMjgsNDcxLjFsLTAuNC0wLjFsMC40LTINCgkJYzMuMi0xNiwxMy43LTcyLjYsMTQuMS0xMzAuNWMwLjQtNTMuNC04LTg1LjUtMjQuMi0xMDAuNkMxMTQuNCwyMzQuNiwxMTAuNCwyMzEuNiwxMDYsMjI4Ljh6Ii8+DQoJPHBhdGggZmlsbD0iI0VFMDAwMCIgZD0iTTIxNC43LDI0NC4xYzUuMSw2LjUtMTMsNTEuNy00MS43LDY3LjJjLTAuOCw2Ni45LTE4LjcsMTM3LjMtMjUuMywxNTkuNGM0My4xLTMuMyw4OC41LTM1LjQsOTYuNy0xMDYuNw0KCQlDMjUwLjcsMzA4LjksMjM4LjEsMjY5LjMsMjE0LjcsMjQ0LjF6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
            alt="Red dot"
          /> -->

          <div class="mt-1">
            <div class="mb-2">
              <div class="row">
                <div class="col-6">
                  <ValidationProviderWrapper
                    name="Subject Name"
                    :rules="['required']"
                    label="Subject Name"
                  >
                    <BaseInput
                      v-model="subject.name"
                      placeholder="Enter Subject Name"
                    ></BaseInput>
                  </ValidationProviderWrapper>
                </div>
                <div class="col-6">
                  <ValidationProviderWrapper
                    name="Subject Code"
                    :rules="['required']"
                    label="Subject Code"
                  >
                    <BaseInput
                      v-model="subject.code"
                      placeholder="Enter Subject Code"
                    ></BaseInput>
                  </ValidationProviderWrapper>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <ValidationProviderWrapper
                    name="Subject Category"
                    :rules="['required']"
                    label="Subject Category"
                  >
                    <VSelect
                      v-model="subject.category"
                      :options="category"
                      label="name"
                      placeholder="Enter Subject Category"
                      class="ng-valid ng-dirty ng-touched"
                    ></VSelect>
                  </ValidationProviderWrapper>
                </div>
                <div class="col-6">
                  <ValidationProviderWrapper
                    name="Sequence Number"
                    :rules="['required']"
                    label="Sequence Number"
                  >
                    <BaseInput
                      v-model="subject.sequence"
                      placeholder="Enter Sequence Number"
                    ></BaseInput>
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
                enable-image
                :color="subject.icon_data.icon_font_color"
                :img-src="subject.icon_data.icon"
                :bg-color="subject.icon_data.icon_bg_color"
                :title="subject.name"
                :data="subject"
                :display-key="['code', 'category.name', 'sequence']"
                disable-action
              ></UtilsHeaderCardWithColor>
            </div>
          </div>
        </div>
        <div class="mt-4 d-flex align-items-center justify-content-end">
          <button class="btn btn-light py-2 px-3 ml-2">Cancel</button>
          <button class="btn btn-primary py-2 px-3 ml-2" @click="addSubject">
            Save
          </button>
        </div>
      </div>
    </div>
    <b-modal
      id="modal"
      size="xl"
      scrollable
      title="Slate Media Library"
      centered
    >
      <div class="row">
        <div class="col-md-8">
          <div class="row overflow-auto" style="max-height: 400px">
            <div
              v-for="(value, index) in imagePath"
              :key="index"
              class="col-2 m-1"
              @click=";(selectedIcon = value), (subject.icon_data.icon = value)"
            >
              <img
                id="image-preview"
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
                v-model="subject.icon_data.icon_font_color"
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
                v-model="subject.icon_data.icon_bg_color"
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
        enable-image
        disable-action
        :color="subject.icon_data.icon_font_color"
        :img-src="subject.icon_data.icon"
        :bg-color="subject.icon_data.icon_bg_color"
        :title="subject.name"
        :data="subject"
        :display-key="['code', 'category.name', 'sequence']"
      ></UtilsHeaderCardWithColor>
    </b-modal>
  </div>
</template>

<script>
import imageToBase64 from 'image-to-base64/browser'
import imageLink from '~/assets/js/image-link.js'
export default {
  props: {
    editFields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      color: '',
      swatches: ['#000000', '#FFFFFF'],
      subject: {
        name: '',
        code: '',
        category: {},
        sequence: '',
        icon_data: {
          icon_base_64: '',
          icon: '',
          icon_bg_color: '',
          icon_font_color: '#ffffff',
        },
        // icon_data.icon_bg_color: '',
        // color: '',
        // image: ''
      },
      selectedIcon: {
        id: '',
        src: '',
      },
      imagePath: imageLink,
      images: [
        {
          id: 1,
          src: 'Books.svg',
        },
        {
          id: 2,
          src: 'Quiz-1.svg',
        },
        {
          id: 3,
          src: 'Ball.svg',
        },
        { id: 4, src: 'brain.svg' },
      ],
      category: [],
    }
  },
  watch: {},
  mounted() {
    if (Object.values(this.editFields).length <= 0) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16)
      this.subject.icon_data.icon_bg_color = `#${randomColor}`
    } else {
      this.subject = { ...this.editFields }
      this.subject.category = {
        id: this.editFields.category_id,
        name: this.editFields.category_name,
      }
    }
    this.getCategory()
  },
  methods: {
    async getCategory() {
      const { data } = await this.$axios.$get(
        `/slate-admin/grade/${this.$route.params.grade}/`
      )
      // debugger
      this.category = data.category_list
    },
    async addSubject() {
      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )

      try {
        const base64Image = await imageToBase64(this.subject.icon_data.icon)
        this.subject.icon_data.icon_base_64 = base64Image

        // eslint-disable-next-line prefer-const
        // let subjectObj = {
        //   category: this.subject.category.id,
        //   grade: this.$route.params.grade,
        //   ...this.subject,
        // }

        if (Object.values(this.editFields).length > 0) {
          const subjectObj = {
            ...this.subject,
            category: this.subject.category.id,
            grade: this.$route.params.grade,
          }
          delete subjectObj.type
          await this.$axios.$put(
            `slate-admin/subject/${this.subject.id}/`,
            subjectObj
          )

          this.$router.push({
            name: 'sms-id-administration-configuration-grade-grade-subject-subject',
            params: {
              subject: this.subject.id,
            },
            query: {
              _name: 'static',
            },
          })
        } else {
          const subjectObj = {
            ...this.subject,
            category: this.subject.category.id,
            grade: this.$route.params.grade,
          }
          const { data } = await this.$axios.$post(
            `slate-admin/school/${school.id}/subjects/`,
            subjectObj
          )
          console.log('for  m', data)
          this.$router.push({
            name: 'sms-id-administration-configuration-grade-grade-subject-subject',
            params: {
              subject: data.id,
              query: {
                _name: 'static',
              },
            },
          })
        }
      } catch (e) {
        console.log(e)
      }
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
