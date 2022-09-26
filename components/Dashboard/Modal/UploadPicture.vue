<template>
  <div>
    <ModalWrapper
      size="md"
      id="uploadpicture"
      title="Upload profile picture"
      submitTitle="Upload"
      @clearForm="clear()"
      @hide="clear()"
      @ok="ok"
    >
      <ValidationObserver ref="form">
        <form>
          <div class="row">
            <div class="col-md-12 mb-2">
              <div class="text-center p-3">
                <b-avatar :src="uploadedFile" size="8rem" />

                <div class="d-flex justify-content-center">
                  <span
                    @click="$refs.file.click()"
                    class="btn-outline-primary btn-sm m-3 point"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      >
                        <path
                          d="M12 12v9m0-9l-2.5 2m2.5-2l2.5 2M5.034 9.117A4.002 4.002 0 0 0 6 17h1"
                        />
                        <path
                          d="M15.83 7.138a5.5 5.5 0 0 0-10.796 1.98S5.187 10 5.5 10.5"
                        />
                        <path d="M17 17a5 5 0 1 0-1.17-9.862L14.5 7.5" />
                      </g>
                    </svg>
                  </span>
                  <span
                    @click="deleteFile"
                    class="btn-outline-danger btn-sm m-3 point"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 16 16"
                    >
                      <g fill="currentColor">
                        <path
                          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div class="input-field">
                <input
                  @change="importData"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  ref="file"
                />
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
// import { DateTime } from 'luxon'
export default {
  data() {
    return {
      pricelist: {
        name: '',
        description: '',
      },
      uploadedFile: null,
      show: false,
      modalTitle: 'Add pricelist',
    }
  },
  watch: {},
  props: {},
  mounted() {},

  methods: {
    importData(e) {
      if (!this.uploadedFile) {
        this.show = true
        this.uploadedFile = e.target.files[0]
        console.log(e)
      }
    },
    deleteFile() {
      this.uploadedFile = null
      this.show = false
    },

    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.pricelist.id) {
          this.editPriceList()
        } else {
          this.addPriceList()
        }
      }
    },
    async addPriceList() {
      let formData = new FormData()
      formData.append('file', this.uploadedFile)

      if (this.uploadedFile != null) {
        try {
          const data = await this.$api.finance_settings.bulkUploadBillableItems(
            formData
          )
          this.$emit('refresh')
          this.$bvModal.hide('addBillableBulk')
        } catch (error) {
          console.log(error)
        }
      }
    },
    async editPriceList() {
      if (await this.$refs.form.validate()) {
        try {
          const data = await this.$api.finance_settings.editPriceList(
            this.pricelist,
            this.pricelist.id
          )
          this.$emit('refresh')
          this.$bvModal.hide('addPriceList')
        } catch (error) {}
      }
    },
    clear() {
      this.uploadedFile = null
    },
  },
}
</script>

<style lang="scss" scoped>
</style>