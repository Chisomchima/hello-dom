<template>
  <ModalWrapper
    id="media-modal"
    size="xl"
    title="Slate Media Library"
    @show="copyToLocalData()"
    @ok="save($event)"
  >
    <div class="row">
      <div class="col-md-8">
        <div class="row overflow-auto" style="max-height: 400px">
          <div
            v-for="(value, index) in imagePath"
            :key="index"
            class="col-2 m-1"
            @click=";(selectedIcon = value), (icon_data.icon = value)"
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
              v-model="icon_data.icon_font_color"
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
              v-model="icon_data.icon_bg_color"
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
      :color="icon_data.icon_font_color"
      :img-src="icon_data.icon"
      :bg-color="icon_data.icon_bg_color"
      :title="subject.subject_name"
      :data="subject"
      :display-key="[
        'class_name',
        'subject_code',
        'exercise_count',
        'gradebook_count',
        'lessons_count',
        'students_count'
      ]"
    ></UtilsHeaderCardWithColor>
  </ModalWrapper>
</template>

<script>
import imageToBase64 from 'image-to-base64/browser'
import imageLink from '~/assets/js/image-link.js'
export default {
  props: {
    subject: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imagePath: imageLink,
      swatches: ['#000000', '#FFFFFF'],
      selectedIcon: '',
      icon_data: {
        icon_base_64: '',
        icon: '',
        icon_bg_color: '',
        icon_font_color: '#ffffff'
      }
    }
  },
  methods: {
    copyToLocalData() {
      this.icon_data = {
        icon_base_64: '',
        icon: '',
        icon_bg_color: '',
        icon_font_color: '#ffffff'
      }

      this.icon_data.icon = this.subject.icon_data.icon
      this.icon_data.icon_bg_color = this.subject.icon_data.icon_bg_color
      this.icon_data.icon_font_color = this.subject.icon_data.icon_font_color
      this.icon_data.icon_base_64 = this.subject.icon_data.icon_base_64
    },
    async save(event) {
      try {
        event.preventDefault()
        const base64Image = await imageToBase64(this.subject.icon_data.icon)
        this.icon_data.icon_base_64 = base64Image

        await this.$axios.$put(
          `/schools/v3/class_subject/${this.$route.params.subject}/edit/`,
          { icon_data: { ...this.icon_data } }
        )
        this.$emit('refresh')
        this.$bvModal.hide('media-modal')
      } catch (e) {
        console.log(e)
      }
    }
  }
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
