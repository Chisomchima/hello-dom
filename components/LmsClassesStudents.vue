<template>
  <div>
    <CameraComponent :demo="demo" @myevent="somefunction" />
    <div v-if="showCropper">
      <image-cropper @saved="savedImage" @cancelled="cancelImage" />
    </div>

    <UtilsFilterComponent @search-input="studentsFilter = $event">
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :items="items"
          :fields="fields"
          :busy="$fetchState.pending"
          pages="1"
          :filter="studentsFilter"
          :dropdown-item="dropdownItem"
          @edit="onEdit($event)"
          @capture_image="capture($event)"
          @upload_image="upload($event)"
          @parent_communication="pushComms"
          @view_school_profile="pushProfile"
        >
          <template #house="{ data }">
            <div class="text-center">
              <span
                class="badge"
                :style="{
                  color: data.item.house_color,
                  borderColor: data.item.house_color,
                }"
                >{{ data.value }}</span
              >
            </div>
          </template>
        </TableComponent>
        <div v-else class="row">
          <UtilsStudentGridView
            v-for="(value, index) in items"
            :key="index"
            :data="value.student_info"
            :others="value"
            :image="value.student_info.avatar"
            :display-key="['first_name', 'last_name', 'gender', 'house']"
            @capture="capture"
            @upload="upload"
          ></UtilsStudentGridView>
        </div>
      </template>
    </UtilsFilterComponent>
    <lms-class-student-edit-modal
      title="Edit Student"
      :class-student-id="editData.class_student_id"
      :field="editData.student_info"
      @refresh="$fetch"
    />
  </div>
</template>

<script>
import ImageCropper from '~/components/Utils/ImageCropper.vue'

import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  components: {
    ImageCropper,
  },
  mixins: [TableFunc],
  props: {
    students: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      demo: false,
      studentId: '',
      showCropper: false,

      dropdownItem: [
        'edit',
        'view_school_profile',
        'parent_communication',
        'capture_image',
        'upload_image',
      ],
      fields: [
        {
          key: 'student_info.first_name',
          label: 'First Name',
        },
        { key: 'student_info.last_name', label: 'Surname' },
        { key: 'student_info.gender', label: 'Gender' },
        { key: 'student_info.email', label: 'Email' },
        { key: 'house', label: 'House' },
        { key: 'student_info.phone_number', label: 'Phone Number' },
        { key: 'dots', label: '', sortable: false },
      ],
      studentsFilter: '',
      editData: {},
    }
  },
  async fetch() {
    const { data } = await this.$axios.$get(
      `./schools/v2/lms/class/${this.$route.params.class}/`
    )
    this.items = data.students
    console.log('items', this.items)

    // console.log(data2)
  },

  methods: {
    pushProfile(e) {
      this.$router.push(
        `/sms/${this.$route.params.id}/administration/student/${e.id}`
      )
    },
    pushComms(e) {
      console.log(e)
    },
    async savedImage(image) {
      try {
        await this.$axios.$post(
          `/schools/v3/class/student/${this.studentId}/avatar/`,
          { avatar: image.croppedImageURI }
        )
        this.cancelImage()
        this.$fetch()
      } catch (e) {
        console.log(e)
      }
    },
    cancelImage() {
      this.showCropper = false
    },
    onEdit(e) {
      this.editData = e
      this.$bvModal.show('modal')
    },
    upload(e) {
      this.studentId = e.class_student_id

      this.showCropper = !this.showCropper
    },
    capture(e) {
      this.toggleCamera()
      this.studentId = e.class_student_id
    },
    toggleCamera() {
      this.demo = !this.demo
    },
    async somefunction(e) {
      // const reader = new FileReader()
      // reader.readAsDataURL(e)
      try {
        await this.$axios.$post(
          `/schools/v3/class/student/${this.studentId}/avatar/`,
          { avatar: e }
        )
        this.$fetch()
      } catch (e) {
        console.log(e)
      } finally {
        this.toggleCamera()
      }
      // reader.onload = async function () {
      //   console.log(e)
      // }.bind(this)
      // reader.onerror = function (error) {
      //   console.log('Error: ', error)
      // }
      console.log(e)
    },
  },
}
</script>

<style lang="scss" scoped></style>
