<template>
  <div>
    <div class="d-flex d-flex justify-content-end p-3">
      <!-- <div class="dropdown">
        <button
          id="dropdownMenuButton"
          class="btn btn-light text-secondary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          View by 100 record
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">10 records</a>
          <a class="dropdown-item" href="#">20 records</a>
          <a class="dropdown-item" href="#">50 records</a>
          <a class="dropdown-item" href="#">Infinity records</a>
        </div>
      </div> -->
      <div>
        <b-button class="btn-primary" @click="$bvModal.show('modal-attachment')"
          >Add Attachment</b-button
        >
        <!-- <a id="a1" download="file1.txt">    Downlosad text file</a> -->
        <ModalWrapper
          id="modal-attachment"
          title="Add Attachment"
          submit-title="Add"
          @ok="submitAttachment"
        >
          <div class="p-2">
            <div>
              <small class="text-secondary"> Attacment Name</small>
              <input
                v-model="attachment_name"
                type="text"
                placeholder="Enter Name"
                class="w-100"
              />
            </div>

            <div class="mt-4">
              <small class="text-secondary"> Type</small>
              <b-form-select
                v-model="selected"
                :options="options"
              ></b-form-select>
            </div>
            <div
              class="
                border
                mt-4
                d-flex
                align-items-center
                justify-content-center
              "
              :style="{
                height: '200px',
                display: 'flex',
                'flex-direction': 'column',
              }"
            >
              <div class="">
                <Icon icon="ant-design:file-twotone" style="font-size: 4rem" />
              </div>
              <p class="text-center">
                {{ imagesArray ? imagesArray.name : '' }}
              </p>
              <div class="text-center">
                <b-btn
                  class="btn-light text-primary text-center"
                  @click="onClickFileUpload"
                >
                  Upload File</b-btn
                >
              </div>
            </div>
            <input
              ref="fileInput"
              class="invisible"
              type="file"
              name="imagesArray"
              @change="onChange"
            />
          </div>
        </ModalWrapper>
      </div>
    </div>
    <div>
      <Table
        :items="attachments"
        :fields="fields"
        :pages="total_pages"
        :allow-redirect="false"
        @page-changed="refreshPage"
        @iconDelete="showDeleteModal"
      />
    </div>
    <ModalWrapper
      id="delete-attachment"
      title="Delete Attachment"
      variant="danger"
      submit-title="Delete"
      @ok="deleteAttachment"
    >
      <p>
        Are you sure you want to delete this attactment? press 'Cancel' to stop
        this action
      </p>
    </ModalWrapper>
  </div>
</template>

<script>
import table from '~/components/table.vue'
export default {
  components: { table },
  data() {
    return {
      page: 1,
      attachments: [],
      total_pages: 12,
      attachment_name: '',
      selected: '',
      fileId: null,
      imagesArray: '',
      fields: [
        { key: 'file_name', sortable: true },
        { key: 'type', sortable: true },
        { key: 'created_at', label: 'Date Added', sortable: true },

        { key: 'extra_icons', sortable: false },
      ],
      options: [
        { value: null, text: 'Select Type' },
        { value: 'Consent', text: 'Consent' },
        { value: 'Medical', text: 'Medical' },
        { value: 'Feeding', text: 'Feeding' },
        { value: 'Academic', text: 'Academic' },
        { value: 'Certificates', text: 'Certificates' },
        { value: 'Personal', text: 'Personal' },
        { value: 'Finance', text: 'Finance' },
        { value: 'Others', text: 'Others' },
      ],
    }
  },
  async fetch() {
    const {
      data: { data },
    } = await this.$axios.get(
      `/slate-admin/school/${this.schoolid.id}/staff/${this.$route.params.employee}/attachements/?page=${this.page}&page_size=20`
    )
    console.log('real attachments o', data)
    this.total_pages = data.total_pages
    console.log('real shi', data)
    // this.page = data.page
    this.attachments = data.results
  },
  computed: {
    schoolid() {
      return this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )
    },
  },
  activated() {
    this.$fetch()
  },

  methods: {
    refreshPage(e) {
      this.page = e
      this.$fetch()
    },
    showDeleteModal(e) {
      this.$bvModal.show('delete-attachment')
      this.fileId = e
      console.log(this.fileId)
    },
    clearForm() {
      this.imagesArray = ''
      this.selected = ''
      this.attachment_name = ''
    },
    async deleteAttachment() {
      try {
        await this.$axios.post(
          `slate-admin/school/${this.schoolid.id}/staff/${this.$route.params.employee}/attachement/remove/${this.fileId.file_id}//`
        )

        this.$fetch()
        this.$bvModal.hide('delete-attachment')
      } catch (error) {
        console.log(error)
      }
    },
    async submitAttachment() {
      const fd = new FormData()
      fd.append('name', this.attachment_name)
      fd.append('type', this.selected)
      fd.append('file', this.imagesArray)

      try {
        await this.$axios.post(
          `/slate-admin/school/${this.schoolid.id}/staff/${this.$route.params.employee}/attachement/upload/`,
          fd
        )
        this.$bvModal.hide('modal-attachment')
        this.clearForm()
        this.$nuxt.refresh()
      } catch (error) {}
    },
    show() {
      console.log('prop', this.details)
    },
    onChange(event) {
      this.imagesArray = event.target.files[0]
      console.log(this.imagesArray)
      // this.updateAvatar()
    },
    onClickFileUpload() {
      if (this.$refs.fileInput) {
        const uploadField = this.$refs.fileInput
        uploadField.click()
      }
    },
  },
}
</script>

<style></style>
