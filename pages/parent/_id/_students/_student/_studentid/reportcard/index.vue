<template>
  <div class="p-3">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="page-heading mb-2 mr-2">Report Card</div>
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2 d-flex justify-content-between">
          <button class="btn filterbtn">
            <span> Filter</span>
            <span class="iconify" data-icon="clarity:filter-2-line"></span>
          </button>
        </div>
      </div>
    </div>

    <div class="card class-wrapper p-4">
      <div class="d-flex align-items-center justify-content-between flex-wrap">
        <div class="filter-wrapper mr-2">
          <div class="search-input student-filter-input mb-2">
            <span
              class="iconify icon"
              data-inline="false"
              data-icon="carbon:search"
            ></span>
            <input
              type="text"
              class="form-control rounded-pill w-100"
              placeholder="Search"
            />
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="font-family_brown fs-14 text-black">Sort by:</div>
          <div class="student-filter-input ml-2">
            <select class="form-control">
              <option value="asc" selected>Newest to Oldest</option>
              <option value="dsc">Oldest to Newest</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <Table :items="reportfiles" :fields="fields">
          <template #file_url="{ data }">
            <b-spinner
              v-if="data.item.isdownloading"
              small
              variant="primary"
              label="Spinning"
            ></b-spinner>
            <a v-else href="#" class="text-primary" @click="openViewer(data)">
              <!-- {{ data.item }} -->
              <span
                class="iconify"
                data-icon="eva:eye-fill"
                data-width="20"
                data-height="20"
              ></span>
            </a>
          </template>
          <template #updated_at="{ data }">
            {{ data.item.updated_at ? data.item.updated_at.slice(0, 10) : '' }}
          </template>
          <template #created_on="{ data }">
            {{ data.item.updated_at ? data.item.updated_at.slice(0, 10) : '' }}
          </template>
        </Table>
      </div>

      <b-modal
        id="uploadedFileModal"
        centered
        hide-header-close
        header-class="mt-n3 pt-5"
        hide-footer
        size="lg"
      >
        <template #modal-header="{ close }">
          <div class="d-flex justify-content-between w-100">
            <img
              src="~/assets/lessons/svg/closeIcon.svg"
              alt="close icon"
              class="pointer mr-4"
              @click="close()"
            />

            <button class="btn btn-primary" @click="downloadFile">
              download
            </button>
          </div>
        </template>

        <WebViewer
          ref="webViewer"
          :style="{ height: onFullScreen ? '85vh' : '500px' }"
          :url="fileToView"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'parentdashboard',

  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Title',
          sortable: true,
        },

        // {
        //   key: 'updated_at',

        //   sortable: true,
        // },
        {
          key: 'academic_year',
          sortable: true,
        },
        {
          key: 'academic_period',
          sortable: true,
        },
        {
          key: 'created_on',
          label: 'Published at',
          sortable: true,
        },
        {
          key: 'file_url',
          label: 'View',
          sortable: false,
        },
      ],
      fileToView: '',
      fileToDownload: {},

      data: [],
      isdownloading: false,
      reportfiles: [],
    }
  },

  async fetch() {
    const { data } = await this.$axios.get(
      `util/v2/mobile/reportcards/${this.$route.params.studentid}`
    )

    // this.data = data.data.results

    this.reportfiles = data.data.results.map((item) => {
      console.log('item is, ', item)
      return {
        ...item,
        isdownloading: false,
      }
    })

    console.log('HERREEE', data.data.results)
  },
  mounted() {
    // console.log(this.$route)
  },

  methods: {
    async downloadFile(file) {
      // this.isdownloading = true

      console.log('file is, ', file)

      const report = this.reportfiles.findIndex((item) => item === file.item)

      this.reportfiles[report].isdownloading = true
      try {
        const response = await axios.get(file, { responseType: 'blob' })
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `report.pdf`
        link.click()
        URL.revokeObjectURL(link.href)
        this.isdownloading = false
      } catch (e) {
        this.isdownloading = false
        console.error(e)
      } finally {
        this.reportfiles[report].isdownloading = false
      }
    },
    openViewer(file) {
      this.fileToView = file.item.file_url

      this.fileToDownload = file
      console.log('object', file)

      this.$bvModal.show('uploadedFileModal')
    },
  },
}
</script>

<style scoped>
.exportbtn {
  border: 1px solid #229af2;
  font-family: Brown;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0px;
  text-align: left;
  color: #229af2;

  /* padding: 13px, 26px, 13px, 26px; */
}

.filterbtn {
  background: #dbeaf4;
  color: #229af2;
}
</style>
