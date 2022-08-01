<template>
  <div>
    <ModalWrapper
      size="md"
      id="addBillableBulk"
      title="Bulk Upload"
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
              
                <span v-show="show" class="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="80"
                    height="80"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 16 16"
                  >
                    <g fill="currentColor">
                      <path
                        d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793L6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                      />
                      <path
                        d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"
                      />
                    </g>
                  </svg>

                  <pre v-if="uploadedFile" class="file-name text-primary">{{uploadedFile.name}}</pre>
                </span>
                <span v-show="!show">
                <p class="text-14 text-info">Select a file to upload</p>
                
                <img width="120" height="120" src="~/assets/img/empty-box.svg" alt=""/></span>
                

                <div class="d-flex justify-content-center">
                    <span @click="$refs.file.click()" class="btn-outline-primary btn-sm mx-2 point">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M16.839 15h-2.865v-3.046a.7.7 0 0 0-.193-.498a.619.619 0 0 0-.468-.205a.619.619 0 0 0-.469.205a.7.7 0 0 0-.193.498v3.047H9.933a.619.619 0 0 0-.468.205a.7.7 0 0 0-.193.498a.7.7 0 0 0 .193.498a.619.619 0 0 0 .468.205h2.718v2.89a.7.7 0 0 0 .193.498a.619.619 0 0 0 .469.205c.183 0 .34-.068.468-.205a.7.7 0 0 0 .193-.498v-2.89h2.865a.62.62 0 0 0 .468-.205a.7.7 0 0 0 .193-.498a.7.7 0 0 0-.193-.498a.619.619 0 0 0-.468-.205Zm.516-9.973L13.33.481l-.44-.479H3.78c-.17 0-.36-.01-.526.017A.827.827 0 0 0 2.742.3c-.281.318-.24.717-.24 1.108v17.185c0 .391-.045.814.24 1.11c.285.296.476.296.843.296H8.61a.62.62 0 0 0 .469-.205a.7.7 0 0 0 .193-.498a.7.7 0 0 0-.193-.498a.619.619 0 0 0-.469-.205H3.845L3.839 1.364h7.275v3.593c0 .391.152.743.391.996c.24.253.57.41.937.41h3.735v4.185a.7.7 0 0 0 .193.498a.619.619 0 0 0 .468.205c.184 0 .34-.069.469-.205a.7.7 0 0 0 .192-.498V5.475l.001-.279l-.145-.169Zm-4.837-.172c-.041-.053-.066-.146-.075-.28V1.52l3.059 3.437H12.76c-.12-.016-.2-.05-.242-.103Z"/></svg>
                    </span>
                    <span @click="deleteFile" class="btn-outline-danger btn-sm mx-2 point">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m19.74 8.33l-5.44-6a1 1 0 0 0-.74-.33h-7A2.53 2.53 0 0 0 4 4.5v15A2.53 2.53 0 0 0 6.56 22h10.88A2.53 2.53 0 0 0 20 19.5V9a1 1 0 0 0-.26-.67ZM14 5l2.74 3h-2a.79.79 0 0 1-.74-.85Zm3.44 15H6.56a.53.53 0 0 1-.56-.5v-15a.53.53 0 0 1 .56-.5H12v3.15A2.79 2.79 0 0 0 14.71 10H18v9.5a.53.53 0 0 1-.56.5Z"/><path fill="currentColor" d="M14 13h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2Z"/></svg>
                    </span>
                </div>
              </div>

              <div class="input-field">
                <input @change="importData" type="file" accept=".xlsx, .xls," ref="file" />
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
  watch: {
   
  },
  props: {
  },
  mounted() {},

  methods: {
    importData(e){
        
         if(!this.uploadedFile){
            this.show = true
        this.uploadedFile = e.target.files[0]
         }
    },
    deleteFile(){
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
        let formData = new FormData
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